#!/usr/bin/env python3
"""pi coding agent reader — JSONL sessions under ~/.pi/agent/sessions.

    ~/.pi/agent/sessions/--<cwd with / replaced by ->--/<timestamp>_<uuid>.jsonl

Written against the format pi ships with itself (`docs/session-format.md` inside
`@earendil-works/pi-coding-agent`), version 3. Older files are migrated to v3 by pi when it
loads them, so a file on disk may still be v1 or v2; the fields this reader uses —
`type`, `message.role`, `message.content`, `id`, `parentId` — are common to all three.

**Branches are the thing to get right.** From v2 pi stores a TREE: entries link by
`id`/`parentId`, and `/tree` or `/fork` can leave abandoned branches in the same file. Read
in file order and those dead turns count as real ones. This follows `parentId` back from the
last entry instead, which yields the branch actually in play and nothing else.

Set PI_SESSION_DIR to read a session directory elsewhere; `pi --session-dir` writes one.
"""
import json
import os

SESSIONS = os.environ.get("PI_SESSION_DIR") or os.path.expanduser("~/.pi/agent/sessions")


def _text(content):
    """Text out of a content field that is either a plain string or a block list."""
    if isinstance(content, str):
        return content
    return "\n".join(
        b.get("text", "") for b in (content or [])
        if isinstance(b, dict) and b.get("type") == "text"
    )


def active_branch(entries):
    """The entries on the live branch, oldest first.

    Walk parentId from the last entry to the root. Anything not on that chain was abandoned
    by a fork or a branch switch and is not part of the conversation that happened.
    """
    by_id = {e["id"]: e for e in entries if e.get("id")}
    if not by_id:
        return []
    chain, node = [], entries[-1]
    seen = set()
    while node is not None and node.get("id") not in seen:
        seen.add(node.get("id"))
        chain.append(node)
        node = by_id.get(node.get("parentId"))
    return list(reversed(chain))


def read_session(path):
    """(cwd, session_id, entries-on-the-active-branch) for one session file."""
    cwd = session_id = None
    entries = []
    try:
        fh = open(path, errors="replace")
    except OSError:
        return None, None, []
    with fh:
        for line in fh:
            try:
                d = json.loads(line)
            except ValueError:
                continue                # a torn line from a live session; skip it
            if d.get("type") == "session":
                cwd, session_id = d.get("cwd"), d.get("id")
            elif d.get("type") == "message":
                entries.append(d)
    return cwd, session_id, active_branch(entries)


def iter_events():
    """Yield normalised events in conversation order. Contract: see readers/__init__.py."""
    if not os.path.isdir(SESSIONS):
        raise SystemExit(
            f"no pi sessions at {SESSIONS}. "
            "Set PI_SESSION_DIR, or RETRO_READER to another agent's reader."
        )
    files = []
    for proj in sorted(os.listdir(SESSIONS)):
        d = os.path.join(SESSIONS, proj)
        if os.path.isdir(d):
            files.extend(sorted(os.path.join(d, f) for f in os.listdir(d)
                                if f.endswith(".jsonl")))
    if not files:
        raise SystemExit(f"{SESSIONS} holds no session files yet — nothing to analyse.")

    for path in files:
        cwd, session_id, entries = read_session(path)
        project = os.path.basename(cwd or "") or os.path.basename(path)
        session = session_id or os.path.basename(path)[:-6]
        tools, bash = [], []
        for e in entries:
            m = e.get("message") or {}
            role, ts = m.get("role"), e.get("timestamp")
            if role == "user":
                text = _text(m.get("content")).strip()
                if not text:
                    continue
                yield {"kind": "human", "project": project, "session": session,
                       "ts": ts, "text": text, "tools": [], "bash": []}
                tools, bash = [], []
            elif role == "assistant":
                for b in (m.get("content") or []):
                    if isinstance(b, dict) and b.get("type") == "toolCall":
                        tools.append(b.get("name", "?"))
                        args = b.get("arguments") or {}
                        cmd = args.get("command") or args.get("cmd")
                        if cmd:
                            bash.append(str(cmd)[:300])
                yield {"kind": "assistant", "project": project, "session": session,
                       "ts": ts, "text": _text(m.get("content")),
                       "tools": list(tools), "bash": list(bash)}
            elif role == "bashExecution":
                # A command the PERSON ran with `!`, not the agent. It is not a turn, but it
                # is work that happened before the next reply, so it counts toward the checks.
                bash.append(str(m.get("command") or "")[:300])
            # toolResult, custom, branchSummary and compactionSummary are machinery, not turns.


def selftest():
    """No pi sessions exist on this machine yet, so the fixture is the documented shape."""
    import tempfile
    global SESSIONS
    with tempfile.TemporaryDirectory() as d:
        proj = os.path.join(d, "--Users-someone-repo--")
        os.makedirs(proj)
        rows = [
            {"type": "session", "version": 3, "id": "s1", "cwd": "/Users/someone/repo"},
            {"type": "message", "id": "a1", "parentId": None, "timestamp": "2026-09-05T00:00:00Z",
             "message": {"role": "user", "content": "build the thing"}},
            {"type": "message", "id": "b1", "parentId": "a1", "timestamp": "2026-09-05T00:00:01Z",
             "message": {"role": "assistant", "content": [
                 {"type": "thinking", "thinking": "hidden"},
                 {"type": "text", "text": "done"},
                 {"type": "toolCall", "id": "t1", "name": "bash",
                  "arguments": {"command": "pytest -q"}}]}},
            # An abandoned fork off a1: same parent, never continued.
            {"type": "message", "id": "z9", "parentId": "a1", "timestamp": "2026-09-05T00:00:02Z",
             "message": {"role": "user", "content": "SHOULD NOT APPEAR"}},
            {"type": "message", "id": "c1", "parentId": "b1", "timestamp": "2026-09-05T00:00:03Z",
             "message": {"role": "toolResult", "toolCallId": "t1", "toolName": "bash",
                         "content": [{"type": "text", "text": "2 passed"}], "isError": False}},
            {"type": "message", "id": "d1", "parentId": "c1", "timestamp": "2026-09-05T00:00:04Z",
             "message": {"role": "user", "content": [{"type": "text", "text": "no, wrong"}]}},
        ]
        with open(os.path.join(proj, "20260905_s1.jsonl"), "w") as fh:
            for r in rows:
                fh.write(json.dumps(r) + "\n")
        SESSIONS = d
        got = list(iter_events())

    kinds = [e["kind"] for e in got]
    assert kinds == ["human", "assistant", "human"], kinds
    assert got[0]["project"] == "repo", got[0]["project"]
    assert got[1]["text"] == "done", "thinking blocks are not the assistant's text"
    assert got[1]["tools"] == ["bash"] and got[1]["bash"] == ["pytest -q"]
    assert got[2]["text"] == "no, wrong", "block-list user content is read"
    assert all("SHOULD NOT APPEAR" not in e["text"] for e in got), \
        "an abandoned fork must not be read as a turn"
    print("selftest ok")


if __name__ == "__main__":
    selftest()
