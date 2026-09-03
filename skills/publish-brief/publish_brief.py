#!/usr/bin/env python3
"""publish-brief: ingest a brief's markdown into PRIMA, then link it to a nav row.

Two writes to two systems with no transaction between them. The order is fixed
and it is the whole safety design: PRIMA first, nav second. A nav row that
points at nothing (a broken card) is impossible, because the pointer is only
written once the artefact's uuid is known. The reverse (an artefact with no nav
row) is possible, reported as PARTIAL, and fixed by running the verb again.

Usage:
  publish_brief.py <brief.md> --project <uuid|name> [--action <uuid>]
                   [--user <uuid>] [--tags a,b] [--author NAME]
                   [--sidecar-url URL] [--nav-env <file>] [--dry-run]
  publish_brief.py <brief.md> --convert-only     # print the artefact markdown
  publish_brief.py --self-check                  # offline asserts

Configuration, all from the environment (or the file given by --nav-env):
  NAV_SUPABASE_URL   PostgREST origin of the nav database.
  NAV_SERVICE_KEY    nav service-role key. `project_attachments` has no
                     insert path for an external pointer on the PAT API, so
                     this writes the row directly.
  PRIMA_INGEST_URL   optional override of PRIMA's ingest webhook.
PRIMA's own credentials come from the `prima` skill, which this reuses.

Exit codes: 0 both writes landed · 3 partial · 1 failed before anything landed.
"""

from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

LEDGER = Path.home() / ".claude" / "state" / "publish-brief.json"
INGEST_TIMEOUT = 75  # PRIMA's ingest route caps at 60s; outlast it, then probe.
UA = "publish-brief/1.0 (+claude-code)"


# ---------------------------------------------------------------- prima reuse

def prima_module():
    """The `prima` skill's client. Its credentials, token minting and base URL
    are reused; only the two writes below are ours, because prima.py's helpers
    sys.exit on an HTTP error and a distributed write has to report instead."""
    path = Path(os.environ.get("PRIMA_SKILL") or Path.home() / ".claude" / "skills" / "prima" / "prima.py")
    if not path.exists():
        sys.exit(f"the prima skill is not installed at {path} (set PRIMA_SKILL)")
    spec = importlib.util.spec_from_file_location("prima_client", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def _json_request(url, *, data=None, headers=None, method=None, timeout=30):
    """(status, parsed-or-text). Never raises for an HTTP status."""
    body = json.dumps(data).encode() if data is not None else None
    hdrs = {"User-Agent": UA, **(headers or {})}
    if body is not None:
        hdrs["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=body, headers=hdrs, method=method)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as res:
            raw = res.read().decode()
            return res.status, (json.loads(raw) if raw.strip() else None)
    except urllib.error.HTTPError as e:
        raw = e.read().decode()[:800]
        try:
            return e.code, json.loads(raw)
        except ValueError:
            return e.code, raw
    except TimeoutError as e:
        return -1, f"timed out after {timeout}s: {e}"
    except urllib.error.URLError as e:
        # A socket timeout arrives wrapped in URLError, and it is the one
        # transport failure that does NOT prove the write was never made.
        if isinstance(e.reason, TimeoutError) or "timed out" in str(e.reason):
            return -1, f"timed out after {timeout}s: {e.reason}"
        return 0, str(e)
    except OSError as e:
        return 0, str(e)


# ------------------------------------------------------- markdown conversion

FM = re.compile(r"\A---\r?\n(.*?)\r?\n---\r?\n", re.S)
HEADING = re.compile(r"^(#{1,6})\s+(.*?)\s*$")
REFDEF = re.compile(r"^\[\^(\d+)[a-z0-9]*\]:\s*(.+)$")
QUOTE = re.compile(r"^>\s?(.*)$")
FNMARK = re.compile(r"\[\^(\d+)[a-z0-9]*\]")


def front_matter(text: str):
    m = FM.match(text)
    if not m:
        return {}, text
    meta = {}
    for line in m.group(1).splitlines():
        if ":" in line and not line.startswith(" "):
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip()
    return meta, text[m.end():]


def clean_heading(title: str) -> str:
    """`Title {#s-x} :: contents label | note` is brief-renderer machinery."""
    title = re.sub(r"\s*\{#[^}]*\}", "", title)
    return title.split("::")[0].strip()


def first_sentence(text: str, limit: int = 220) -> str:
    text = re.sub(r"[*`]", "", text).strip()  # emphasis only; snake_case is content
    cut = re.split(r"(?<=[.!?])\s", text, maxsplit=1)[0]
    return (cut[: limit - 1] + "…") if len(cut) > limit else cut


SKIP_SECTIONS = {"contents", "provenance", "references"}


def content_and_insights(body: str):
    """Rewrite the brief body for retrieval, and derive one insight per section.

    Two rewrites matter. Heading machinery is stripped, so a heading reads as a
    heading. And every quoted source keeps its attribution ON the quote line:
    a retrieval chunk can be cut anywhere, including between a quote and the
    reference entry above it, so a bare quote would arrive looking like the
    author's own conclusion.
    """
    out, insights = [], []
    section, want_lede, current_ref, in_raw = None, False, None, False
    for raw in body.splitlines():
        line = raw.rstrip()
        h = HEADING.match(line)
        if h:
            title = clean_heading(h.group(2))
            out.append(f"{h.group(1)} {title}")
            section = title if len(h.group(1)) == 2 else section
            want_lede = len(h.group(1)) == 2 and title.strip().lower() not in SKIP_SECTIONS
            current_ref = None
            continue
        ref = REFDEF.match(line)
        if ref:
            current_ref = (ref.group(1), first_sentence(ref.group(2), 90))
            out.append(f"[{ref.group(1)}] {FNMARK.sub(r'[\1]', ref.group(2))}")
            continue
        q = QUOTE.match(line)
        if q and current_ref and q.group(1).strip():
            text, _, locator = q.group(1).partition(" -- ")
            where = f", {locator.strip()}" if locator.strip() else ""
            out.append(f"> Quoted from source [{current_ref[0]}]{where}: {text.strip()}")
            continue
        if line.strip() and not line.startswith(("note:", ">")):
            current_ref = None
        out.append(FNMARK.sub(r"[\1]", line))
        stripped = line.strip()
        if stripped.startswith(":::"):
            in_raw = not in_raw
        if want_lede and not in_raw and stripped and not stripped.startswith(
                ("|", "-", "<", ":::", ">", "!", "[", "a)", "b)", "c)")):
            insights.append(f"{section}: {first_sentence(line)}")
            want_lede = False
    text = re.sub(r"\n{3,}", "\n\n", "\n".join(out)).strip()
    return text, insights


def to_artefact_markdown(source: str, *, tags, author=None, sidecar_url=None, provenance=None):
    meta, body = front_matter(source)
    title = meta.get("title")
    if not title:
        sys.exit("the brief has no `title` in its front matter")
    tldr = meta.get("sub") or first_sentence(body.strip().splitlines()[0] if body.strip() else title)
    content, insights = content_and_insights(body)
    lines = ["---", "type: note", f"title: {json.dumps(title)}"]
    if author:
        lines.append(f"author: {json.dumps(author)}")
    lines.append("tags: [" + ", ".join(sorted(set(tags))) + "]")
    lines += ["---", "", "## ❤️ TLDR", "", tldr, "", "## ☝ Insights", ""]
    lines += [f"- {i}" for i in insights] or [f"- {tldr}"]
    lines += ["", "# Content", ""]
    if provenance:
        lines += [f"Source of record: {provenance}", ""]
    if sidecar_url:
        lines += [f"SOURCED provenance sidecar: {sidecar_url}", ""]
    lines += [content, ""]
    return "\n".join(lines)


# --------------------------------------------------------------- the ledger

def ledger_read() -> dict:
    try:
        return json.loads(LEDGER.read_text())
    except (FileNotFoundError, ValueError):
        return {}


def ledger_write(opid: str, record: dict) -> None:
    all_records = ledger_read()
    all_records[opid] = {**all_records.get(opid, {}), **record}
    LEDGER.parent.mkdir(parents=True, exist_ok=True)
    tmp = LEDGER.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(all_records, indent=2, sort_keys=True))
    tmp.replace(LEDGER)


def operation_id(origin: str, target_id: str, slug: str) -> str:
    """Derived only from the inputs, so a retry after a timeout computes the
    same id without having to remember anything."""
    return hashlib.sha256(f"{origin}|{target_id}|{slug}".encode()).hexdigest()[:16]


def slugify(title: str) -> str:
    """PRIMA's own rule, so the artefact can be probed before it is written."""
    s = re.sub(r"[^a-z0-9]+", "-", title.lower())
    return s.strip("-")


# ------------------------------------------------------------------- PRIMA

def prima_probe(prima, env, slug: str):
    """(artefact | None, confirmed). `confirmed` False means the probe itself
    failed, which is never evidence that the artefact is absent."""
    url = env["PRIMA_BASE"].rstrip("/") + f"/api/v2/artefacts/{urllib.parse.quote(slug)}"
    try:
        headers = {"Authorization": f"Bearer {prima.token(env)}"}
    except SystemExit as e:
        return None, f"cannot mint a PRIMA token: {e}"
    status, payload = _json_request(url, headers=headers, timeout=30)
    if status == 200 and isinstance(payload, dict):
        return payload, None
    if status == 404:
        # A brief is ingested as `note`, which is class C1. The prima skill's
        # client is C0, so it is TOLD 404 whether or not the artefact exists.
        # A 404 here is therefore no evidence of absence, and the caller must
        # never read it as one.
        return None, "404 — indeterminate: this client's class ceiling cannot see a note"
    return None, f"probe returned {status}: {str(payload)[:200]}"


def prima_ingest(env, filename: str, content: str):
    url = os.environ.get("PRIMA_INGEST_URL") or env["PRIMA_BASE"].rstrip("/") + "/api/ingest"
    secret = env.get("INGEST_SECRET")
    if not secret:
        return 0, "INGEST_SECRET is not available"
    return _json_request(
        url,
        data={"filename": filename, "content": content},
        headers={"Authorization": f"Bearer {secret}"},
        timeout=INGEST_TIMEOUT,
    )


# --------------------------------------------------------------------- nav

class Nav:
    """The external pointer row, written straight to PostgREST.

    ponytail: nav has no API that creates an external attachment — the PAT
    route uploads bytes. Ceiling is one endpoint: the day nav grows
    `POST /api/ext/attachment` with `externalKind`, this class becomes a
    bearer-token POST and the service key goes away.
    """

    def __init__(self, base: str, key: str):
        self.base = base.rstrip("/") + "/rest/v1"
        self.headers = {"apikey": key, "Authorization": f"Bearer {key}"}

    def get(self, path: str, params: dict):
        url = f"{self.base}/{path}?" + urllib.parse.urlencode(params)
        return _json_request(url, headers=self.headers, timeout=20)

    def connection(self, user_id: str):
        return self.get("prima_connections", {"user_id": f"eq.{user_id}", "select": "*"})

    def resolve_project(self, user_id: str, project: str):
        key = "id" if re.fullmatch(r"[0-9a-f-]{36}", project) else "name"
        return self.get("projects", {key: f"eq.{project}", "user_id": f"eq.{user_id}", "select": "id,name"})

    def find_link(self, *, project_id, action_id, ref, origin):
        params = {
            "project_id": f"eq.{project_id}",
            "attachment_mode": "eq.external",
            "external_kind": "eq.prima",
            "external_ref": f"eq.{ref}",
            "external_origin": f"eq.{origin}",
            "action_id": f"eq.{action_id}" if action_id else "is.null",
            "select": "id,filename",
        }
        return self.get("project_attachments", params)

    def insert_link(self, row: dict):
        url = f"{self.base}/project_attachments"
        return _json_request(
            url, data=row, headers={**self.headers, "Prefer": "return=representation"}, timeout=20
        )


# -------------------------------------------------------------------- report

def report(outcome: str, lines, next_step=None) -> int:
    print(f"\n{outcome}")
    for line in lines:
        print(f"  {line}")
    if next_step:
        print(f"  next: {next_step}")
    return {"OK": 0, "PARTIAL": 3}.get(outcome.split()[0], 1)


def run(a) -> int:
    src = Path(a.brief)
    source_text = src.read_text(encoding="utf-8")
    meta, _ = front_matter(source_text)
    tags = ["brief"] + [t.strip().lower() for t in (a.tags or "").split(",") if t.strip()]
    sidecar_url = a.sidecar_url
    if not sidecar_url:
        for cand in (src.with_suffix(src.suffix + ".sourced"), src.with_suffix(".sourced.json")):
            if cand.exists():
                sidecar_url = cand.name  # referenced, never inlined
                break
    artefact_md = to_artefact_markdown(
        source_text, tags=tags, author=a.author, sidecar_url=sidecar_url, provenance=a.provenance
    )
    if a.convert_only:
        print(artefact_md)
        return 0

    title = meta["title"]
    slug = slugify(title)
    prima = prima_module()
    env = prima.load_env()
    origin = None

    # ---- nav side: resolve the target and the origin BEFORE writing to PRIMA.
    nav_env = dict(os.environ)
    if a.nav_env:
        for line in Path(a.nav_env).read_text().splitlines():
            if line.strip() and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                nav_env.setdefault(k.strip(), v.strip())
    if not (nav_env.get("NAV_SUPABASE_URL") and nav_env.get("NAV_SERVICE_KEY")):
        return report("FAILED", ["NAV_SUPABASE_URL / NAV_SERVICE_KEY are not set", "nothing was written"])
    nav = Nav(nav_env["NAV_SUPABASE_URL"], nav_env["NAV_SERVICE_KEY"])
    user_id = a.user or nav_env.get("NAV_USER_ID")
    if not user_id:
        return report("FAILED", ["--user or NAV_USER_ID is required", "nothing was written"])
    status, conn = nav.connection(user_id)
    if status != 200 or not conn:
        return report("FAILED", [f"no prima_connections row for {user_id} (status {status})",
                                 "the origin is only knowable from that row", "nothing was written"])
    origin = conn[0]["base_url"]
    if not conn[0].get("enabled"):
        print("warning: the PRIMA connection is disabled; the link is written but nav "
              "renders no card until an operator enables it")
    if a.action:
        st, rows = nav.get("project_actions", {"id": f"eq.{a.action}", "select": "id,project_id"})
        if st != 200 or not rows:
            return report("FAILED", [f"action {a.action} not found (status {st})", "nothing was written"])
        project_id, action_id = rows[0]["project_id"], rows[0]["id"]
    else:
        st, rows = nav.resolve_project(user_id, a.project)
        if st != 200 or not rows:
            return report("FAILED", [f"project {a.project!r} not found for this user (status {st})",
                                     "nothing was written"])
        project_id, action_id = rows[0]["id"], None

    opid = operation_id(origin, action_id or project_id, slug)
    prior = ledger_read().get(opid, {})
    if a.dry_run:
        return report("OK (dry run)", [f"operation {opid}", f"slug {slug}", f"origin {origin}",
                                       f"project {project_id}", f"action {action_id}",
                                       f"artefact markdown {len(artefact_md)} chars",
                                       f"ledger: {prior or 'no prior attempt'}"])

    # ---- PRIMA first. An artefact with no nav row is recoverable; the reverse
    # is a card pointing at nothing, so the pointer is never written first.
    content_sha = hashlib.sha256(artefact_md.encode()).hexdigest()
    existing, probe_err = prima_probe(prima, env, slug)
    artefact_id = (existing or {}).get("id") or None
    ingest_note = None
    # No attachment_id required: recovering a PARTIAL must do the nav half ONLY,
    # which is exactly what the partial report promises.
    unchanged = prior.get("content_sha") == content_sha and prior.get("artefact_id")
    if unchanged and (existing is None or artefact_id == prior["artefact_id"]):
        # The ledger, not the probe, is the fast path: the probe is blind to a
        # note at this class ceiling, so re-ingesting every run would re-embed
        # an unchanged document each time. The ingest stays idempotent either
        # way — it upserts by slug and keeps the artefact's uuid.
        artefact_id = prior["artefact_id"]
        ingest_note = "unchanged since the last run; not re-ingested"
    else:
        status, payload = prima_ingest(env, f"{slug}.md", artefact_md)
        if status == 200 and isinstance(payload, dict) and payload.get("videoId"):
            artefact_id = payload["videoId"]
            slug = payload.get("slug", slug)
            ingest_note = (f"{payload.get('mode')} · {payload.get('insights')} insights · "
                           f"{payload.get('chunks')} chunks")
        else:
            # The ingest did not answer cleanly. It may still have landed: the
            # route runs to 60s and embedding is the slow part. Probe before
            # deciding anything.
            after, after_err = prima_probe(prima, env, slug)
            if not after and (status == -1 or status >= 500):
                # The request reached PRIMA and did not answer cleanly, so the
                # write may or may not have landed, and the probe cannot say.
                # Reporting this as failed would be the swallow.
                return report("PARTIAL", [
                    f"PRIMA ingest is UNCONFIRMED: status {status} {str(payload)[:200]}",
                    f"probe: {after_err or 'artefact not visible'}",
                    "no nav link was written, because no artefact uuid is known",
                    f"operation {opid}",
                ], "run the same command again — the ingest upserts by slug, so a second "
                   "landing cannot create a second artefact")
            if not after:
                return report("FAILED", [
                    f"PRIMA ingest failed before the request was made: {str(payload)[:200]}",
                    f"probe after the failure: {after_err or 'artefact absent'}",
                    "nothing was written to PRIMA and nothing to nav",
                ], "fix PRIMA, then run the same command again — it is idempotent")
            artefact_id = after["id"]
            ingest_note = (f"UNCONFIRMED: the ingest call returned {status}, but the artefact "
                           f"exists. Its derived insights may be incomplete.")
    if not artefact_id:
        return report("FAILED", [f"no artefact uuid available (probe: {probe_err})", "nothing was written"])
    ledger_write(opid, {"slug": slug, "artefact_id": artefact_id, "origin": origin,
                        "content_sha": content_sha,
                        "project_id": project_id, "action_id": action_id, "title": title})

    # ---- nav second.
    artefact_url = f"{origin.rstrip('/')}/artefact/{slug}"
    st, found = nav.find_link(project_id=project_id, action_id=action_id, ref=artefact_id, origin=origin)
    if st == 200 and found:
        attachment_id, created = found[0]["id"], False
    else:
        row = {"project_id": project_id, "user_id": user_id, "action_id": action_id,
               "filename": title[:255], "file_size": 0, "mime_type": "text/markdown",
               "is_cover": False, "attachment_mode": "external", "external_kind": "prima",
               "external_ref": artefact_id, "external_origin": origin}
        st, payload = nav.insert_link(row)
        if st in (200, 201) and isinstance(payload, list) and payload:
            attachment_id, created = payload[0]["id"], True
        elif st == 409:  # a concurrent run won the unique index; adopt its row
            st2, found = nav.find_link(project_id=project_id, action_id=action_id,
                                       ref=artefact_id, origin=origin)
            if st2 != 200 or not found:
                return report("PARTIAL", [
                    f"PRIMA artefact {artefact_id} ({slug}) is live: {artefact_url}",
                    f"nav rejected the link as a duplicate but no row can be read back (status {st2})",
                    f"operation {opid}",
                ], "re-run the verb; it will skip the ingest and retry only the nav link")
            attachment_id, created = found[0]["id"], False
        else:
            return report("PARTIAL", [
                f"PRIMA artefact {artefact_id} ({slug}) is live: {artefact_url}",
                f"nav link NOT created: status {st} {str(payload)[:300]}",
                f"operation {opid}, recorded in {LEDGER.name}",
                "the artefact is live in PRIMA; no nav card exists and nothing points at nothing",
            ], "fix nav, then run the same command again — it will only do the nav half")
    ledger_write(opid, {"attachment_id": attachment_id})

    lines = [f"artefact {artefact_id} ({slug}) — {artefact_url}",
             f"attachment {attachment_id} on project {project_id}"
             + (f" action {action_id}" if action_id else "")
             + ("" if created else " (already linked; no duplicate created)"),
             f"operation {opid}", f"ingest: {ingest_note}"]
    if ingest_note and ingest_note.startswith("UNCONFIRMED"):
        return report("PARTIAL", lines, "run the verb again to re-ingest and complete the derived insights")
    return report("OK", lines)


# --------------------------------------------------------------- self-check

def self_check() -> int:
    src = (
        "---\ntitle: A test brief\nsub: One standfirst sentence.\n---\n\n"
        "## Contents\n\n# Part one\n\n"
        "## Finding {#s-f1} :: short label | note\n\nThe finding sentence. More prose.\n\n"
        "As shown by the source[^1].\n\n"
        "## References\n\n[^1]: Smith, J. (2024). A work. Publisher.\n"
        "> the quoted claim -- p. 12\nnote: context\n"
    )
    out = to_artefact_markdown(src, tags=["brief", "x"], sidecar_url="brief.sourced")
    assert "type: note" in out and 'title: "A test brief"' in out, out
    assert "tags: [brief, x]" in out, out
    assert "One standfirst sentence." in out, out
    assert "## Finding\n" in out, "heading machinery survived"
    assert "{#s-f1}" not in out and "::" not in out.split("# Content")[1], out
    assert "- Finding: The finding sentence." in out, out
    assert "> Quoted from source [1], p. 12: the quoted claim" in out, "citation boundary lost"
    assert "source[1]" in out, "footnote marker not rewritten"
    assert "SOURCED provenance sidecar: brief.sourced" in out and '"quote"' not in out
    assert slugify("Where briefs live") == "where-briefs-live"
    a = operation_id("https://p", "proj", "s")
    assert a == operation_id("https://p", "proj", "s") and a != operation_id("https://q", "proj", "s")
    m, body = front_matter(src)
    assert m["title"] == "A test brief" and body.lstrip().startswith("## Contents")
    print("publish-brief: all checks passed")
    return 0


def main() -> int:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("brief", nargs="?", help="the brief's markdown source")
    p.add_argument("--project", help="nav project uuid or exact name")
    p.add_argument("--action", help="nav action uuid (implies its parent project)")
    p.add_argument("--user", help="nav user uuid; defaults to NAV_USER_ID")
    p.add_argument("--tags", help="extra PRIMA tags, comma separated")
    p.add_argument("--author")
    p.add_argument("--provenance", help="the source of record, e.g. 'repo path @ commit'")
    p.add_argument("--sidecar-url", help="URL of the SOURCED sidecar; never inlined")
    p.add_argument("--nav-env", help="env file holding NAV_SUPABASE_URL / NAV_SERVICE_KEY")
    p.add_argument("--convert-only", action="store_true", help="print the artefact markdown, write nothing")
    p.add_argument("--dry-run", action="store_true", help="resolve everything, write nothing")
    p.add_argument("--self-check", action="store_true")
    a = p.parse_args()
    if a.self_check:
        return self_check()
    if not a.brief:
        p.error("a brief markdown file is required")
    if not (a.project or a.action or a.convert_only):
        p.error("--project or --action is required")
    return run(a)


if __name__ == "__main__":
    sys.exit(main())
