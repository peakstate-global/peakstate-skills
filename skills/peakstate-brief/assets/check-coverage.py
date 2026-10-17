#!/usr/bin/env python3
"""check-coverage.py: does every point the reader made have a home in the next round?

    python3 check-coverage.py <brief.md> <responses.json> [--rounds <file>]

Run it after building the next round and before delivering it (it refuses a
source edited since its last build, because the round history would be stale). It lists every
answer and every comment in the responses payload, says where each one is dealt
with, and exits 1 if any has no home. Exit 2 means the inputs do not belong
together (a different brief-id) or could not be read.

An ANSWER (by question id) has a home when one of these holds:
  i)   the source has a section headed `## Your Qn answer...`;
  ii)  the `## Qn` section still exists and its text changed since the round the
       answer was given against (read from the `<brief>.html.rounds.json`
       sidecar the build writes; the payload's `build` token names the round);
  iii) a `replies:` entry in the front matter matches the answer's text.
A tick with no words confirms the assumption as stated, so it needs no home.

A COMMENT has a home when a `replies:` entry matches it: the first forty
characters of the comment, whitespace collapsed and lower-cased, the same rule
brief.js uses to show the reply. A comment that came back with a follow-up needs
a NEW reply (different words from the one the reader already saw).

Drafts, notes and document edits are listed in the summary line only; read
them, but they do not fail the check.

Zero dependencies.
"""
import hashlib
import json
import re
import sys
from pathlib import Path


def key40(text):
    """The runtime's addrKey: collapse whitespace, trim, lower-case, 40 chars."""
    return re.sub(r"\s+", " ", text or "").strip().lower()[:40]


def matches(key, rkey):
    return bool(key) and bool(rkey) and (key.startswith(rkey) or rkey.startswith(key))


def parse_md(src):
    """Front matter dict and the list of (id, heading) for every ## section."""
    src = src.replace("\r\n", "\n").lstrip("﻿")
    meta, body = {}, src
    m = re.match(r"---\n([\s\S]*?)\n---\n?", src)
    if m:
        for line in m.group(1).split("\n"):
            kv = re.match(r"([A-Za-z0-9_-]+):\s*(.*)$", line.strip())
            if kv:
                meta[kv.group(1)] = kv.group(2)
        body = src[m.end():]
    secs, fence = [], None
    for line in body.split("\n"):
        t = line.strip()
        f = re.match(r"(`{3,}|~{3,})", t)
        if fence:
            if f and t.startswith(fence) and re.fullmatch(r"[`~]+", t):
                fence = None
            continue
        if f:
            fence = f.group(1)
            continue
        h = re.match(r"##\s+(.*?)(?:\s*\{#([^}]+)\})?(?:\s*::\s*.*)?$", t)
        if h and not t.startswith("###"):
            title, explicit = h.group(1), h.group(2)
            q = re.match(r"Q(\d+)\s+", title)
            sid = explicit or ("s-q" + q.group(1) if q else None)
            secs.append((sid, title))
    return meta, secs


def main(argv):
    args = [a for a in argv if not a.startswith("--")]
    rounds_path = None
    if "--rounds" in argv:
        i = argv.index("--rounds")
        rounds_path = Path(argv[i + 1])
        args = [a for a in args if a != argv[i + 1]]
    if len(args) != 2:
        print(__doc__.strip().split("\n\n")[1])
        return 2
    md, payload_path = Path(args[0]), Path(args[1])
    try:
        meta, secs = parse_md(md.read_text(encoding="utf-8"))
        payload = json.loads(payload_path.read_text(encoding="utf-8"))
    except (OSError, ValueError) as e:
        print("cannot read inputs: %s" % e)
        return 2
    bid = meta.get("brief-id")
    if bid and payload.get("brief") and payload["brief"] != bid:
        print("responses are for brief %r, the source is %r" % (payload["brief"], bid))
        return 2
    try:
        replies = json.loads(meta["replies"]) if meta.get("replies") else []
    except ValueError:
        print("replies: in the front matter is not valid JSON")
        return 2
    rkeys = [(key40(r.get("match")), r.get("reply") or "") for r in replies if isinstance(r, dict)]

    rounds_path = rounds_path or md.with_name(md.stem + ".html.rounds.json")
    rounds = []
    if rounds_path.exists():
        rounds = json.loads(rounds_path.read_text(encoding="utf-8")).get("rounds", [])
    current = rounds[-1] if rounds else None
    src_hash = hashlib.sha256(re.sub(r"\r\n?", "\n", md.read_text(encoding="utf-8")).encode()).hexdigest()[:12]
    if current and src_hash not in current.get("builds", []):
        print("%s changed since it was last built, so the round history is stale. Build it, then run this again." % md)
        return 2
    build = payload.get("build")
    given = next((r for r in rounds if build and build in r.get("builds", [])), None)
    if given is None and not build and len(rounds) > 1:
        given = rounds[-2]  # an older payload with no build token: assume the round before this one

    ids = {sid for sid, _ in secs if sid}
    rows = []
    for a in payload.get("answers", []):
        text = (a.get("answer") or "").strip()
        qid = a.get("id", "")
        if not text:
            if a.get("ticked"):
                rows.append(("answer", qid, "(ticked, no words)", True, "assumption confirmed"))
            continue
        n = qid[1:] if qid[:1].upper() == "Q" else qid
        home = None
        own = next((t for _, t in secs if re.match(r"Your Q%s answer\b" % re.escape(n), t, re.I)), None)
        if own:
            home = "section: " + own
        elif "s-q" + n in ids and given and current and given is not current:
            was = given.get("sections", {}).get("s-q" + n, {}).get("hash")
            now = current.get("sections", {}).get("s-q" + n, {}).get("hash")
            if was and now and was != now:
                home = "Q%s revised since round %s" % (n, given.get("round"))
        if not home and any(matches(key40(text), rk) for rk, _ in rkeys):
            home = "replies:"
        rows.append(("answer", qid, text, bool(home), home or "no home"))

    for c in payload.get("comments", []):
        text = (c.get("comment") or "").strip()
        if not text:
            continue
        follow = [f for f in (c.get("follow_up") or []) if f.strip()]
        hits = [r for rk, r in rkeys if matches(key40(text), rk)]
        if follow:
            hits = [r for r in hits if r != (c.get("reply") or "")]
        label = '"%s": %s' % ((c.get("selected_text") or "")[:30], text)
        rows.append(("comment", c.get("near_question") or "-", label + (" (+follow-up)" if follow else ""),
                     bool(hits), "replies:" if hits else "no home"))

    width = 70
    print("%-8s %-6s %-9s %-*s %s" % ("kind", "id", "status", width, "text", "home"))
    for kind, rid, text, ok, home in rows:
        t = re.sub(r"\s+", " ", text)
        t = t if len(t) <= width else t[: width - 3] + "..."
        print("%-8s %-6s %-9s %-*s %s" % (kind, rid, "covered" if ok else "UNCOVERED", width, t, home))
    missing = [r for r in rows if not r[3]]
    extra = ", ".join("%d %s" % (len(payload.get(k) or []), k) for k in ("drafts", "notes", "edits") if payload.get(k))
    print("\n%d of %d covered.%s" % (len(rows) - len(missing), len(rows),
                                    " Also read: " + extra + "." if extra else ""))
    if not rounds and any(r[0] == "answer" for r in rows):
        print("No round history at %s, so a revised question cannot count as a home. Build first." % rounds_path)
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
