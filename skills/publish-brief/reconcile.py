#!/usr/bin/env python3
"""reconcile: report drift between Navigator's PRIMA pointers and PRIMA itself.

It reads. It changes nothing unless `--repair --confirm` is given, and even then
it only removes pointers to an artefact it has PROVEN absent.

The one rule that shapes the whole design: a 404 from the agent-surface client is
NOT evidence of absence. A brief is ingested as a `note`, which is owner-commentary
class, and that client sits at the public-corpus ceiling, so it is told "not found"
for an artefact that is perfectly fine. Existence is therefore decided on the
determinate read path, and where that path is unavailable the finding is `unknown`
with its reason, never `missing`.

Usage:
  reconcile.py [--user <uuid>] [--nav-env <file>] [--json]
  reconcile.py --repair              # print exactly what would change, change nothing
  reconcile.py --repair --confirm    # apply it
  reconcile.py --self-check          # offline asserts over the classifier

Configuration is publish_brief's: NAV_SUPABASE_URL, NAV_SERVICE_KEY, NAV_USER_ID.
The determinate PRIMA read uses PRIMA_SUPABASE_URL / PRIMA_SUPABASE_KEY, or the
knowledge base's own local env file if this machine has one.

Exit codes follow the sibling verb: 0 clean · 3 drift or unknowns found · 1 failed.
"""

from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import publish_brief as pb  # clients, ledger, report, exit codes — all reused

PRIMA_ROWS = "videos"  # the artefact table on the knowledge base's own database


# ------------------------------------------------------------ the read paths

def prima_reader(env):
    """(Nav-shaped client | None, why-not). The determinate path: the knowledge
    base's own database, which can tell absent apart from out-of-class. The agent
    surface cannot, so it is never used to decide absence."""
    url = env.get("PRIMA_SUPABASE_URL")
    key = env.get("PRIMA_SUPABASE_KEY")
    if not (url and key):
        local = getattr(pb.prima_module(), "ENV_FILE", "")
        if local and os.path.exists(local):
            src = pb.prima_module()._parse_env(local)
            url = url or src.get("NEXT_PUBLIC_SUPABASE_URL")
            key = key or src.get("SUPABASE_SERVICE_ROLE_KEY")
    if not (url and key):
        return None, ("no determinate read path: set PRIMA_SUPABASE_URL and "
                      "PRIMA_SUPABASE_KEY. The agent-surface client cannot distinguish "
                      "an absent artefact from one above its class ceiling")
    return pb.Nav(url, key), None


def fetch_artefacts(reader, ids):
    """{uuid: row} for the ids that exist. A non-200 raises rather than being read
    as absence."""
    found = {}
    ids = sorted(set(ids))
    for i in range(0, len(ids), 40):
        batch = ids[i:i + 40]
        st, rows = reader.get(PRIMA_ROWS, {
            "id": "in.(" + ",".join(batch) + ")",
            "select": "id,slug,title,type,tags",
        })
        if st != 200 or not isinstance(rows, list):
            raise RuntimeError(f"the knowledge base returned {st} for an existence read")
        for r in rows:
            found[r["id"]] = r
    return found


def fetch_briefs(reader):
    st, rows = reader.get(PRIMA_ROWS, {"tags": "cs.{brief}", "select": "id,slug,title", "limit": "500"})
    if st != 200 or not isinstance(rows, list):
        raise RuntimeError(f"the knowledge base returned {st} listing brief-tagged artefacts")
    return rows


# ------------------------------------------------------------- the classifier

def target_of(row):
    return (row["project_id"], row.get("action_id"))


def classify(*, pointers, artefacts, absent_known, briefs, connection, ledger,
             nav_attachment_ids, unknown_reason=None):
    """Pure. Returns a list of findings: (class, severity, subject, detail).

    `artefacts` maps uuid -> row for every artefact PROVEN to exist.
    `absent_known` is True only when the determinate read path ran, so an id
    missing from `artefacts` really is absent. False means `unknown`.
    `briefs` is None when brief-tagged artefacts could not be enumerated.
    """
    out = []
    current_origin = (connection or {}).get("base_url")

    for row in pointers:
        ref, origin = row["external_ref"], row.get("external_origin")
        if ref in artefacts:
            art = artefacts[ref]
            if (row.get("filename") or "").strip() != (art.get("title") or "").strip():
                out.append(("metadata", "warn", row["id"],
                            f"pointer says {row.get('filename')!r}, the artefact is titled "
                            f"{art.get('title')!r}"))
        elif absent_known:
            out.append(("dangling", "drift", row["id"],
                        f"artefact {ref} does not exist at {origin}"))
        else:
            out.append(("unknown", "unknown", row["id"],
                        f"artefact {ref} could not be checked: {unknown_reason}"))

        if not connection:
            out.append(("origin", "warn", row["id"],
                        f"no connection row for this owner, so {origin} cannot be confirmed "
                        f"as a knowledge base they are connected to"))
        elif not pb.same_origin(origin or "", current_origin or ""):
            out.append(("origin", "warn", row["id"],
                        f"points at {origin}; the owner's connection is now {current_origin}. "
                        f"This is a link to a different deployment — never repointed"))

    # A re-ingest under a new uuid leaves the old pointer beside the new one: same
    # target, same title, two refs. The unique indexes cannot see this, because
    # the refs differ.
    by_title = {}
    for row in pointers:
        by_title.setdefault(
            (target_of(row), row.get("external_origin"), (row.get("filename") or "").strip()), []
        ).append(row)
    for (target, origin, name), rows in sorted(by_title.items(), key=lambda kv: str(kv[0])):
        refs = sorted({r["external_ref"] for r in rows})
        if len(refs) > 1:
            out.append(("duplicate", "drift", ",".join(sorted(r["id"] for r in rows)),
                        f"{len(refs)} different artefacts share the title {name!r} on one target: "
                        f"{', '.join(refs)}"))

    if briefs is None:
        out.append(("unlinked", "unknown", "-",
                    f"brief-tagged artefacts could not be listed: {unknown_reason}"))
    else:
        linked = {r["external_ref"] for r in pointers}
        for art in sorted(briefs, key=lambda a: a.get("slug") or ""):
            if art["id"] not in linked:
                out.append(("unlinked", "warn", art["id"],
                            f"brief {art.get('slug')!r} is in the knowledge base with no pointer "
                            f"from this owner's work"))

    for opid, rec in sorted(ledger.items()):
        art = rec.get("artefact_id")
        if not art:
            continue
        if not rec.get("attachment_id"):
            out.append(("ledger", "drift", opid,
                        f"publish never finished: artefact {art} was ingested and no pointer was "
                        f"written. Re-run the publish verb; it does the pointer half only"))
        elif rec["attachment_id"] not in nav_attachment_ids:
            out.append(("ledger", "drift", opid,
                        f"pointer {rec['attachment_id']} is gone but the artefact remains. A "
                        f"deleted project or action takes its pointers with it; re-run the "
                        f"publish verb to link the artefact somewhere that still exists"))
        if rec.get("content_sha") is None:
            out.append(("ledger", "warn", opid,
                        f"artefact {art} was left UNCONFIRMED by its last publish; its derived "
                        f"insights may be incomplete. Re-run the publish verb"))
    return out


def repair_plan(findings):
    """Only what has been PROVEN safe: pointers to an artefact confirmed absent."""
    return [f for f in findings if f[0] == "dangling"]


# --------------------------------------------------------------------- runner

def load_env(nav_env):
    env = dict(os.environ)
    if nav_env:
        for k, v in pb.prima_module()._parse_env(nav_env).items():
            env.setdefault(k, v)
    return env


def run(a) -> int:
    env = load_env(a.nav_env)
    if not (env.get("NAV_SUPABASE_URL") and env.get("NAV_SERVICE_KEY")):
        return pb.report("FAILED", ["NAV_SUPABASE_URL / NAV_SERVICE_KEY are not set"])
    user_id = a.user or env.get("NAV_USER_ID")
    if not user_id:
        return pb.report("FAILED", ["--user or NAV_USER_ID is required"])

    nav = pb.Nav(env["NAV_SUPABASE_URL"], env["NAV_SERVICE_KEY"])
    st, pointers = nav.get("project_attachments", {
        "user_id": f"eq.{user_id}", "attachment_mode": "eq.external", "external_kind": "eq.prima",
        "select": "id,project_id,action_id,filename,external_ref,external_origin,created_at",
        "order": "created_at",
    })
    if st != 200 or not isinstance(pointers, list):
        return pb.report("FAILED", [f"could not read the pointers: status {st}"])
    # Unscoped by owner on purpose: the ledger is a machine-wide record with no
    # owner column, so "does this pointer row still exist" must be asked of the
    # whole table or another owner's entry reads as a deleted pointer.
    st2, all_rows = nav.get("project_attachments", {"select": "id", "limit": "100000"})
    if st2 != 200:
        return pb.report("FAILED", [f"could not read the attachment ids: status {st2}"])
    nav_ids = {r["id"] for r in all_rows}
    stc, conn = nav.connection(user_id)
    connection = conn[0] if stc == 200 and conn else None

    reader, why_not = prima_reader(env)
    artefacts, briefs, absent_known = {}, None, False
    if reader:
        try:
            artefacts = fetch_artefacts(reader, [p["external_ref"] for p in pointers])
            briefs = fetch_briefs(reader)
            absent_known = True
        except RuntimeError as e:
            why_not, artefacts, briefs = str(e), {}, None

    findings = classify(pointers=pointers, artefacts=artefacts, absent_known=absent_known,
                        briefs=briefs, connection=connection, ledger=pb.ledger_read(),
                        nav_attachment_ids=nav_ids, unknown_reason=why_not)

    if a.json:
        print(json.dumps({"pointers": len(pointers), "determinate": absent_known,
                          "findings": [dict(zip(("class", "severity", "subject", "detail"), f))
                                       for f in findings]}, indent=2))
    else:
        print(f"\n{len(pointers)} pointer(s) for {user_id}")
        print(f"existence check: {'determinate' if absent_known else 'INDETERMINATE — ' + (why_not or '')}")
        if connection:
            print(f"connection: {connection['base_url']} "
                  f"({'enabled' if connection.get('enabled') else 'disabled'})")
        else:
            print("connection: none for this owner")
        if not findings:
            print("\nno drift")
        for cls, sev, subject, detail in findings:
            print(f"  [{cls}/{sev}] {subject}: {detail}")

    plan = repair_plan(findings)
    if a.repair:
        if not plan:
            print("\nrepair: nothing is proven safe to remove")
        else:
            print(f"\nrepair would DELETE {len(plan)} pointer row(s) from the planner, and "
                  f"nothing from the knowledge base:")
            for _, _, subject, detail in plan:
                print(f"  delete project_attachments {subject} — {detail}")
            if not a.confirm:
                print("  nothing was changed. Add --confirm to apply.")
            else:
                for _, _, subject, _ in plan:
                    s, payload = pb._json_request(
                        f"{nav.base}/project_attachments?id=eq.{subject}",
                        headers={**nav.headers, "Prefer": "return=minimal"}, method="DELETE")
                    print(f"  deleted {subject}" if s in (200, 204)
                          else f"  FAILED to delete {subject}: {s} {str(payload)[:120]}")

    if not findings:
        return 0
    return 3


# --------------------------------------------------------------- self-check

def self_check() -> int:
    ptr = lambda i, ref, **kw: {"id": i, "project_id": "P", "action_id": None,
                                "filename": "A brief", "external_ref": ref,
                                "external_origin": "https://kb.example", **kw}
    conn = {"base_url": "https://kb.example", "enabled": True}
    art = {"x1": {"id": "x1", "slug": "a-brief", "title": "A brief"}}

    def classes(**kw):
        base = dict(pointers=[], artefacts={}, absent_known=True, briefs=[], connection=conn,
                    ledger={}, nav_attachment_ids=set(), unknown_reason="no reader")
        base.update(kw)
        return [f[0] for f in classify(**base)]

    # A present artefact with matching metadata is silent.
    assert classes(pointers=[ptr("a", "x1")], artefacts=art) == [], classes(
        pointers=[ptr("a", "x1")], artefacts=art)
    # Absence is only ever reported when the determinate read ran.
    assert classes(pointers=[ptr("a", "x1")]) == ["dangling"]
    got = classes(pointers=[ptr("a", "x1")], absent_known=False, briefs=None)
    assert got == ["unknown", "unlinked"], got
    assert "dangling" not in got, "a 404 from a class-limited client must never read as absence"
    # Divergent metadata, without claiming absence.
    assert classes(pointers=[ptr("a", "x1", filename="Old name")], artefacts=art) == ["metadata"]
    # Two artefacts under one title on one target is the re-ingest duplicate.
    assert "duplicate" in classes(
        pointers=[ptr("a", "x1"), ptr("b", "x2")],
        artefacts={**art, "x2": {"id": "x2", "slug": "s", "title": "A brief"}})
    # The same artefact on a project and on one of its actions is legitimate.
    assert "duplicate" not in classes(
        pointers=[ptr("a", "x1"), ptr("b", "x1", id="b", action_id="ACT")], artefacts=art)
    # An unlinked brief is found, and a linked one is not.
    assert classes(briefs=[{"id": "x1", "slug": "a-brief"}]) == ["unlinked"]
    assert classes(pointers=[ptr("a", "x1")], artefacts=art,
                   briefs=[{"id": "x1", "slug": "a-brief"}]) == []
    # A link made against another deployment is reported, never repointed.
    assert "origin" in classes(pointers=[ptr("a", "x1", external_origin="https://other.example")],
                               artefacts=art)
    assert "origin" in classes(pointers=[ptr("a", "x1")], artefacts=art, connection=None)
    # Ledger states: unfinished publish, deleted pointer, unconfirmed ingest.
    led = {"op1": {"artefact_id": "x1", "content_sha": "s"}}
    assert classes(ledger=led) == ["ledger"]
    led2 = {"op1": {"artefact_id": "x1", "attachment_id": "gone", "content_sha": "s"}}
    assert classes(ledger=led2) == ["ledger"]
    assert classes(ledger={"op1": {"artefact_id": "x1", "attachment_id": "a", "content_sha": None}},
                   nav_attachment_ids={"a"}) == ["ledger"]
    # Only a proven absence is ever repairable.
    findings = classify(pointers=[ptr("a", "x1")], artefacts={}, absent_known=False, briefs=None,
                        connection=conn, ledger={}, nav_attachment_ids=set(),
                        unknown_reason="no reader")
    assert repair_plan(findings) == [], "an unknown must never be offered for deletion"
    print("reconcile: all checks passed")
    return 0


def main() -> int:
    p = argparse.ArgumentParser(description="report drift between the planner's pointers and the knowledge base")
    p.add_argument("--user")
    p.add_argument("--nav-env")
    p.add_argument("--json", action="store_true")
    p.add_argument("--repair", action="store_true", help="print the removals; change nothing without --confirm")
    p.add_argument("--confirm", action="store_true")
    p.add_argument("--self-check", action="store_true")
    a = p.parse_args()
    return self_check() if a.self_check else run(a)


if __name__ == "__main__":
    sys.exit(main())
