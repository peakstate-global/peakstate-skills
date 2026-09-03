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
BLOCK_STARTS = ("|", "-", "<", ":::", ">", "!", "[", "a)", "b)", "c)")
FENCE = re.compile(r"^(```|~~~)")


def content_and_insights(body: str):
    """Rewrite the brief body for retrieval, and derive one insight per section.

    Three rules matter. Heading machinery is stripped, so a heading reads as a
    heading. Every quoted source keeps its attribution ON the quote line, even
    when the quote is indented under its footnote definition and runs over
    several lines: a retrieval chunk can be cut anywhere, so a bare quote would
    arrive looking like the author's own conclusion. And a fenced code block is
    copied through untouched, because a rewrite inside one changes the sample.
    """
    out, insights = [], []
    section, want_lede, current_ref = None, False, None
    in_raw = in_code = False
    paras, para = [], []  # the current section's prose, split on blank lines

    def flush():
        """Derive the section's insight from its COMPLETE first paragraph."""
        nonlocal paras, para, want_lede
        if para:
            paras.append(para)
            para = []
        if want_lede and section and paras:
            chosen = next((q for q in paras if not q[0].startswith(BLOCK_STARTS)), paras[0])
            text = re.sub(r"^[>#\-*+|!]+\s*", "", " ".join(chosen)).strip()
            if text:
                insights.append(f"{section}: {first_sentence(text)}")
        paras, want_lede = [], False

    for raw in body.splitlines():
        line = raw.rstrip()
        stripped = line.strip()
        if FENCE.match(stripped):
            in_code = not in_code
            out.append(line)
            continue
        if in_code:  # a code sample is content, never something to rewrite
            out.append(line)
            continue
        h = HEADING.match(line)
        if h:
            title = clean_heading(h.group(2))
            if len(h.group(1)) == 2:
                flush()
                section = title
                want_lede = title.strip().lower() not in SKIP_SECTIONS
            out.append(f"{h.group(1)} {title}")
            current_ref = None
            continue
        ref = REFDEF.match(line)
        if ref:
            current_ref = (ref.group(1), first_sentence(ref.group(2), 90))
            out.append(f"[{ref.group(1)}] {FNMARK.sub(r'[\1]', ref.group(2))}")
            continue
        q = QUOTE.match(stripped)  # stripped: a continuation quote is indented
        if q and current_ref and q.group(1).strip():
            text, _, locator = q.group(1).partition(" -- ")
            where = f", {locator.strip()}" if locator.strip() else ""
            out.append(f"> Quoted from source [{current_ref[0]}]{where}: {text.strip()}")
            continue
        indented = bool(stripped) and raw[:1].isspace()
        if stripped and not indented and not stripped.startswith(("note:", ">")):
            current_ref = None
        out.append(FNMARK.sub(r"[\1]", line))
        if stripped.startswith(":::"):
            in_raw = not in_raw
            continue
        if in_raw:
            continue
        if not stripped:
            if para:
                paras.append(para)
                para = []
        else:
            para.append(stripped)
    flush()
    text = re.sub(r"\n{3,}", "\n\n", "\n".join(out)).strip()
    return text, insights


def to_artefact_markdown(source: str, *, tags, author=None, sidecar_url=None, provenance=None,
                         unsourced_reason=None):
    meta, body = front_matter(source)
    title = meta.get("title")
    if not title:
        sys.exit("the brief has no `title` in its front matter")
    tldr = meta.get("sub") or first_sentence(body.strip().splitlines()[0] if body.strip() else title)
    content, insights = content_and_insights(body)
    lines = ["---", "type: note", f"title: {json.dumps(title, ensure_ascii=False)}"]
    if author:
        lines.append(f"author: {json.dumps(author, ensure_ascii=False)}")
    lines.append("tags: [" + ", ".join(sorted(set(tags))) + "]")
    lines += ["---", "", "## ❤️ TLDR", "", tldr, "", "## ☝ Insights", ""]
    lines += [f"- {i}" for i in insights] or [f"- {tldr}"]
    lines += ["", "# Content", ""]
    if provenance:
        lines += [f"Source of record: {provenance}", ""]
    if sidecar_url:
        lines += [f"SOURCED provenance sidecar: {sidecar_url}", ""]
    elif unsourced_reason:
        # Visible in the artefact, not just in a flag nobody sees again. A brief
        # published without a claim ledger has to READ as unledgered wherever it
        # is later found, or the absence becomes indistinguishable from a brief
        # whose sidecar simply was not looked for.
        lines += [f"No SOURCED sidecar. Published unledgered because: {unsourced_reason}", ""]
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


def can_skip_ingest(prior: dict, content_sha: str, probed_id) -> bool:
    """True only when a CONFIRMED earlier run ingested this exact content.

    An unconfirmed ingest writes no `content_sha`, so it can never match here.
    "I do not know" must never be cached as "done": the repair is the re-run,
    and a re-run that skipped the ingest would report OK over a broken artefact.
    """
    if not (prior.get("artefact_id") and prior.get("content_sha") == content_sha):
        return False
    return probed_id is None or probed_id == prior["artefact_id"]


def same_origin(a: str, b: str) -> bool:
    return (a or "").rstrip("/").lower() == (b or "").rstrip("/").lower()


def sidecar_for(src: Path):
    """The SOURCED sidecar beside the brief. The contract is `<artefact>.sourced`
    on the FULL filename, and a brief is normally audited as its rendered HTML,
    so the html sibling is checked as well as this file's own name."""
    for cand in (src.with_name(src.name + ".sourced"), src.with_suffix(".html.sourced")):
        if cand.exists():
            return cand
    return None


def plural(n: int, word: str) -> str:
    return word if n == 1 else word + "s"


def sidecar_to_artefact(sidecar: Path, brief_title: str, brief_slug: str, tags):
    """Render a .sourced sidecar as its own artefact, so the ledger is reachable.

    A filename is not a link once the brief is a note in the knowledge base:
    there is no sibling there, and a relative href resolves against
    `/artefact/<slug>`, which is a route rather than a directory. The only way a
    reader can reach the evidence is if the evidence is in the knowledge base
    too — so the sidecar is published as a companion artefact and the brief
    points at its URL.

    It is rendered, not attached raw: the quotes and their locators are the part
    worth embedding and searching, and a wall of JSON would be neither.
    """
    d = json.loads(sidecar.read_text(encoding="utf-8"))
    claims, evidence = d.get("claims", []), d.get("evidence", [])
    by_id = {e.get("id"): e for e in evidence}
    counts = {}
    for c in claims:
        counts[c.get("status", "unknown")] = counts.get(c.get("status", "unknown"), 0) + 1
    tally = ", ".join(f"{v} {k}" for k, v in sorted(counts.items())) or "no claims recorded"
    op = d.get("opposed") or {}

    def yaml_str(v):
        return json.dumps(v, ensure_ascii=False)

    lines = ["---", "type: note", f"title: {yaml_str('Provenance — ' + brief_title)}",
             # Never tagged `brief`: reconcile treats a brief-tagged artefact with
             # no nav pointer as drift, and a ledger is reached through its brief
             # rather than attached to the work itself. The topical tags carry
             # over so the evidence is still findable by subject.
             "tags: [" + ", ".join(sorted({t for t in tags if t != "brief"}
                                          | {"provenance", "sourced"})) + "]",
             "---", "", "## ❤️ TLDR", "",
             f"The claim ledger behind the brief “{brief_title}”: {len(claims)} "
             f"load-bearing {plural(len(claims), 'claim')} ({tally}) resting on "
             f"{len(evidence)} quoted {plural(len(evidence), 'passage')}.", "",
             "## ☝ Insights", ""]

    for c in claims:
        if c.get("status") in ("sourced", "inferred", "recalled"):
            lines.append(f"- [{c.get('status').upper()}] {c.get('statement', '').strip()}")
    if not any(l.startswith("- ") for l in lines):
        lines.append(f"- {tally}")

    lines += ["", "# Content", "",
              f"Ledger for [{brief_title}](artefact/{brief_slug}). "
              f"Generated from the SOURCED sidecar `{sidecar.name}`; not written by hand.", ""]
    if op:
        lines += [f"**Adversarial pass:** {op.get('grade', 'not-performed')} on "
                  f"{op.get('at', 'an unrecorded date')}, {op.get('raised', 0)} finding(s), "
                  f"model {op.get('model', 'unnamed')}. {op.get('note', '')}".strip(), ""]

    lines += ["## Claims", ""]
    for c in claims:
        lines += [f"### {c.get('id')} — {c.get('status', 'unknown').upper()}", "",
                  c.get("statement", "").strip(), ""]
        if c.get("basis"):
            lines += [f"*Basis:* {c['basis']}", ""]
        if c.get("would_settle"):
            lines += [f"*What would settle it:* {c['would_settle']}", ""]
        for eid in c.get("evidence", []):
            e = by_id.get(eid)
            if not e:
                continue
            # The attribution rides on the quote line: retrieval chunks the body
            # and can separate a quote from any heading above it.
            lines += [f"> {e.get('quote', '').strip()} — {e.get('locator', 'no locator')}, "
                      f"{e.get('url', 'no URL')} (retrieved {e.get('retrievedAt', 'undated')})", ""]
    return "\n".join(lines)


def sidecar_gate(src: Path, sidecar_url, no_sidecar):
    """Refuse to publish a brief with no claim ledger. Returns an error, or None.

    A brief in the knowledge base is retrieved later, by an agent, out of the
    context that produced it — so whatever it asserts arrives with no way back to
    the evidence unless the sidecar travels with it. That is the moment the
    provenance is worth the most and the moment nobody is around to add it.

    So the ledger is a precondition of publishing, not a nicety, and the escape
    hatch costs a sentence: --no-sidecar "reason" publishes anyway and prints the
    reason into the artefact, so an unledgered brief is visibly unledgered rather
    than merely quiet. A gate with no escape gets worked around; a gate whose
    escape is recorded gets used honestly.
    """
    if sidecar_url and no_sidecar:
        return (f"FAILED\n  a sidecar was found ({sidecar_url}) and --no-sidecar was also given.\n"
                "  Drop --no-sidecar; the ledger is there.")
    if sidecar_url or no_sidecar:
        return None
    return "\n".join([
        "FAILED",
        f"  no SOURCED sidecar for {src.name}, and none given with --sidecar-url.",
        "",
        "  A published brief outlives the thread that wrote it. Without the ledger,",
        "  every claim in it is unattributable the moment it is retrieved.",
        "",
        "  Create one:",
        f"    /sourced {src.with_suffix('.html')}",
        f"  which writes {src.with_suffix('.html').name}.sourced beside it. Then re-run.",
        "",
        "  Or publish unledgered, on the record:",
        '    --no-sidecar "why this brief has no claim ledger"',
    ])


def resolve_target(nav, user_id: str, action, project):
    """(project_id, action_id, error-lines). Both paths are scoped to the owner:
    an action is only usable once its parent project is confirmed to be theirs,
    or the verb would attach one user's brief to another user's work."""
    if action:
        st, rows = nav.get("project_actions", {"id": f"eq.{action}", "select": "id,project_id"})
        if st != 200 or not rows:
            return None, None, [f"action {action} not found (status {st})", "nothing was written"]
        st2, owned = nav.resolve_project(user_id, rows[0]["project_id"])
        if st2 != 200 or not owned:
            return None, None, [f"action {action} does not belong to this user (status {st2})",
                                "nothing was written"]
        return rows[0]["project_id"], rows[0]["id"], None
    st, rows = nav.resolve_project(user_id, project)
    if st != 200 or not rows:
        return None, None, [f"project {project!r} not found for this user (status {st})",
                            "nothing was written"]
    return rows[0]["id"], None, None


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
    sidecar_file = None if a.sidecar_url else sidecar_for(src)
    if err := sidecar_gate(src, a.sidecar_url or sidecar_file, a.no_sidecar):
        print(err, file=sys.stderr)
        return 1

    title = meta["title"]
    slug = slugify(title)
    prima = prima_module()
    env = prima.load_env()
    prima_base = env["PRIMA_BASE"].rstrip("/")

    # The brief's reference has to be a URL the reader can follow. An auto-detected
    # sidecar is a file on someone's disk, so it is published as its own artefact
    # first and the brief points at that. Sidecar before brief, for the same reason
    # the artefact precedes the pointer: nothing may reference what does not exist.
    sidecar_slug = slugify("Provenance — " + title) if sidecar_file else None
    sidecar_url = a.sidecar_url or (f"{prima_base}/artefact/{sidecar_slug}" if sidecar_slug else None)

    artefact_md = to_artefact_markdown(
        source_text, tags=tags, author=a.author, sidecar_url=sidecar_url,
        provenance=a.provenance, unsourced_reason=a.no_sidecar,
    )
    if a.convert_only:
        print(artefact_md)
        return 0
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
    if not same_origin(origin, env.get("PRIMA_BASE", "")):
        return report("FAILED", [
            f"origin mismatch: the connection names {origin}, the PRIMA client writes to "
            f"{env.get('PRIMA_BASE')}",
            "the pointer would carry a uuid that does not exist on the origin it names",
            "nothing was written"])
    if not conn[0].get("enabled"):
        print("warning: the PRIMA connection is disabled; the link is written but nav "
              "renders no card until an operator enables it")
    project_id, action_id, err = resolve_target(nav, user_id, a.action, a.project)
    if err:
        return report("FAILED", err)

    opid = operation_id(origin, action_id or project_id, slug)
    prior = ledger_read().get(opid, {})
    if a.dry_run:
        return report("OK (dry run)", [f"operation {opid}", f"slug {slug}", f"origin {origin}",
                                       f"project {project_id}", f"action {action_id}",
                                       f"artefact markdown {len(artefact_md)} chars",
                                       f"ledger: {prior or 'no prior attempt'}"])

    # ---- The ledger goes in before the brief that cites it. Same discipline as
    # artefact-before-pointer: a link to something not yet published is a link
    # that is wrong for as long as the second write takes, or forever if it
    # fails. Its ingest upserts by slug, so a re-run is free.
    sidecar_note = None
    if sidecar_file:
        s_status, s_payload = prima_ingest(
            env, f"{sidecar_slug}.md",
            sidecar_to_artefact(sidecar_file, title, slug, tags))
        if s_status == 200 and isinstance(s_payload, dict) and s_payload.get("videoId"):
            sidecar_note = (f"{sidecar_url} ({s_payload.get('mode')} · "
                            f"{s_payload.get('insights')} insights)")
        else:
            return report("FAILED", [
                f"the claim ledger did not publish (HTTP {s_status})",
                "nothing was written: the brief is not published either, because it would",
                "have carried a link to a ledger that is not there.",
                f"detail: {str(s_payload)[:200]}"])

    # ---- PRIMA first. An artefact with no nav row is recoverable; the reverse
    # is a card pointing at nothing, so the pointer is never written first.
    content_sha = hashlib.sha256(artefact_md.encode()).hexdigest()
    existing, probe_err = prima_probe(prima, env, slug)
    artefact_id = (existing or {}).get("id") or None
    ingest_note = None
    # No attachment_id required: recovering a PARTIAL must do the nav half ONLY,
    # which is exactly what the partial report promises.
    if can_skip_ingest(prior, content_sha, artefact_id):
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
    confirmed = not (ingest_note or "").startswith("UNCONFIRMED")
    ledger_write(opid, {"slug": slug, "artefact_id": artefact_id, "origin": origin,
                        # An UNCONFIRMED ingest records NO content hash, so the next
                        # run re-ingests instead of reporting OK over a half-built artefact.
                        "content_sha": content_sha if confirmed else None,
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
    if sidecar_note:
        lines.append(f"ledger: {sidecar_note}")
    elif a.no_sidecar:
        lines.append(f"ledger: none — published unledgered: {a.no_sidecar}")
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
        "## Wrapped\n\n| a | b |\n\nA sentence that the author\nwrapped over two lines. Second.\n\n"
        "## Sample\n\n```python\n# heading-looking [^9] line\n## not a heading\n```\n\n"
        "Plain prose closes it.\n\n"
        "## References\n\n[^1]: Smith, J. (2024). A work. Publisher.\n"
        "    > the quoted claim carries on\n    > over a second line -- p. 12\n"
        "[^2]: Jones, A. (2023). Another. Press.\n> the flush quote -- p. 3\nnote: context\n"
    )
    out = to_artefact_markdown(src, tags=["brief", "x"], sidecar_url="brief.sourced")
    assert "type: note" in out and 'title: "A test brief"' in out, out
    assert "tags: [brief, x]" in out, out
    assert "One standfirst sentence." in out, out
    assert "## Finding\n" in out, "heading machinery survived"
    body = out.split("\n# Content\n", 1)[1]  # "## Contents" also contains "# Content"
    assert "{#s-f1}" not in out and "::" not in body, out
    assert "- Finding: The finding sentence." in out, out
    assert "> Quoted from source [2], p. 3: the flush quote" in out, "citation boundary lost"
    assert "source[1]" in out, "footnote marker not rewritten"
    assert "SOURCED provenance sidecar: brief.sourced" in out and '"quote"' not in out

    # P1: a quote indented under its footnote definition, over several lines,
    # keeps its attribution on EVERY line instead of becoming a bare blockquote.
    assert "> Quoted from source [1]: the quoted claim carries on" in out, out
    assert "> Quoted from source [1], p. 12: over a second line" in out, out
    assert "\n> the quoted claim" not in out and "\n    > the quoted claim" not in out, out

    # P2: the insight is derived from the whole section, not the first line, and
    # a section that opens with a table still yields one.
    assert "- Wrapped: A sentence that the author wrapped over two lines." in out, out

    # P2: a fenced code block is copied through untouched.
    assert "# heading-looking [^9] line" in body and "## not a heading" in body, body
    assert "- Sample: Plain prose closes it." in out, out

    assert slugify("Where briefs live") == "where-briefs-live"
    a = operation_id("https://p", "proj", "s")
    assert a == operation_id("https://p", "proj", "s") and a != operation_id("https://q", "proj", "s")
    m, body_src = front_matter(src)
    assert m["title"] == "A test brief" and body_src.lstrip().startswith("## Contents")

    # P1: an UNCONFIRMED ingest is never cached as done, so the next run retries.
    sha = "abc"
    confirmed = {"artefact_id": "u1", "content_sha": sha}
    unconfirmed = {"artefact_id": "u1", "content_sha": None}
    assert can_skip_ingest(confirmed, sha, None) and can_skip_ingest(confirmed, sha, "u1")
    assert not can_skip_ingest(confirmed, sha, "OTHER"), "a different artefact must re-ingest"
    assert not can_skip_ingest(unconfirmed, sha, None), "unconfirmed cached as done"
    assert not can_skip_ingest(unconfirmed, sha, "u1"), "unconfirmed cached as done"
    assert not can_skip_ingest({}, sha, None) and not can_skip_ingest(confirmed, "other", None)

    # P1: an origin the PRIMA client does not write to is rejected.
    assert same_origin("https://example.test/", "https://example.test")
    assert not same_origin("https://example.test", "https://staging.example.test")

    # P1: an action belonging to another user is refused, not attached.
    class FakeNav:
        """action A1 belongs to project P1, which belongs to user OWNER."""
        def get(self, path, params):
            assert path == "project_actions"
            return (200, [{"id": "A1", "project_id": "P1"}]) if params["id"] == "eq.A1" else (200, [])
        def resolve_project(self, user_id, project):
            return (200, [{"id": "P1", "name": "n"}]) if (user_id, project) == ("OWNER", "P1") else (200, [])
    nav = FakeNav()
    assert resolve_target(nav, "OWNER", "A1", None) == ("P1", "A1", None)
    pid, aid, err = resolve_target(nav, "INTRUDER", "A1", None)
    assert (pid, aid) == (None, None) and "does not belong" in err[0], err
    assert resolve_target(nav, "OWNER", None, "P1")[:2] == ("P1", None)

    # P2: the documented sidecar name is `<artefact>.sourced` on the full
    # filename. It returns a Path, not a name: the file has to be READ now, to
    # render the ledger artefact, not merely mentioned.
    import tempfile
    with tempfile.TemporaryDirectory() as d:
        md = Path(d) / "b.md"
        md.write_text("x")
        assert sidecar_for(md) is None
        (Path(d) / "b.html.sourced").write_text("{}")
        assert sidecar_for(md).name == "b.html.sourced"
        (Path(d) / "b.md.sourced").write_text("{}")
        assert sidecar_for(md).name == "b.md.sourced"

    # P4: the ledger renders as its own artefact, because a filename is not a
    # link once the brief is a note and there is no sibling to be relative to.
    with tempfile.TemporaryDirectory() as d:
        sc = Path(d) / "b.html.sourced"
        sc.write_text(json.dumps({
            "claims": [{"id": "c1", "status": "sourced", "statement": "The sky is blue.",
                        "evidence": ["e1"], "would_settle": "a grey sky"}],
            "evidence": [{"id": "e1", "quote": "the sky is blue", "locator": "p. 1",
                          "url": "https://example.org/x", "retrievedAt": "2026-09-03"}],
            "opposed": {"grade": "cross-model-fresh-thread", "raised": 1, "model": "m"},
        }))
        art = sidecar_to_artefact(sc, "A brief", "a-brief", ["brief"])
        assert 'title: "Provenance — A brief"' in art
        assert "tags: [provenance, sourced]" in art, \
            "never tagged `brief`: reconcile would read a ledger as an unlinked brief"
        assert "[SOURCED] The sky is blue." in art, "claims become insights, so they embed"
        assert "https://example.org/x" in art and "p. 1" in art, "quote carries its own locator"
        assert "cross-model-fresh-thread" in art, "the adversarial grade travels"
        assert "artefact/a-brief" in art, "the ledger links back to its brief"

    # P3: a brief cannot reach the knowledge base without a claim ledger, and an
    # unledgered one says so in the artefact rather than looking merely quiet.
    src = Path("b.md")
    assert sidecar_gate(src, "b.html.sourced", None) is None, "a sidecar passes"
    assert sidecar_gate(src, None, "no external sources") is None, "a stated reason passes"
    refusal = sidecar_gate(src, None, None)
    assert refusal and refusal.startswith("FAILED"), "no ledger and no reason is refused"
    assert "/sourced" in refusal and "--no-sidecar" in refusal, "the refusal names both ways out"
    both = sidecar_gate(src, "b.html.sourced", "reason")
    assert both and "Drop --no-sidecar" in both, "claiming no ledger while one exists is refused"

    ledgered = to_artefact_markdown("---\ntitle: T\n---\nBody.\n", tags=["brief"],
                                    sidecar_url="b.html.sourced")
    assert "SOURCED provenance sidecar: b.html.sourced" in ledgered
    bare = to_artefact_markdown("---\ntitle: T\n---\nBody.\n", tags=["brief"],
                                unsourced_reason="notes only, no external sources")
    assert "Published unledgered because: notes only, no external sources" in bare, \
        "the reason travels in the artefact, where a later reader will find it"

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
    p.add_argument("--no-sidecar", metavar="REASON",
                   help="publish without a claim ledger; the reason is printed into the artefact")
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
