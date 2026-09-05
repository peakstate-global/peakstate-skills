#!/usr/bin/env python3
"""Claude Code reader — the on-disk transcript format under CLAUDE_CONFIG_DIR.

Everything Claude-Code-shaped lives here and nowhere else: the projects directory, the
per-session `.jsonl` files, and the event vocabulary (`type`, `isMeta`, `isSidechain`,
`toolUseResult`, `message.content` blocks).

Machine-generated text is the trap this file mostly exists to handle. Measured 2026-08-30:
background-agent completion notices, pasted quiz/brief JSON and compaction summaries were
41.8% of everything that looked like a user turn, and 84% of the long ones, because they
are long and full of framework vocabulary. Every filter in is_human() was found by a reader
agent noticing contamination, not by writing the filter first — so a new reader for another
agent should expect to grow its own list rather than inherit this one.
"""
import glob
import json
import os

ROOT = os.path.join(
    os.environ.get("CLAUDE_CONFIG_DIR") or os.path.expanduser("~/.claude"), "projects"
)


def text_of(msg):
    """The plain text of a message, with tool calls and results left out."""
    c = msg.get("content")
    if isinstance(c, str):
        return c
    return "\n".join(
        b.get("text", "") for b in c or []
        if isinstance(b, dict) and b.get("type") == "text"
    )


def is_human(ev):
    """True only for text a person typed. See the module docstring for why this is long."""
    if ev.get("type") != "user" or ev.get("isMeta") or ev.get("isSidechain"):
        return False
    if "toolUseResult" in ev or ev.get("attachment"):
        return False
    m = ev.get("message") or {}
    c = m.get("content")
    if isinstance(c, list) and any(
        isinstance(b, dict) and b.get("type") == "tool_result" for b in c
    ):
        return False
    t = text_of(m).strip()
    if not t:
        return False
    if t.startswith(("<command-name>", "<local-command", "Caveat:", "[SYSTEM NOTIFICATION")):
        return False
    if "task-notification" in t or "<system-reminder>" in t[:200]:
        return False
    if t.startswith("{") and any(k in t[:400] for k in ('"kind"', '"brief"', '"answers"')):
        return False
    if t.startswith("<") and t.endswith(">"):
        return False
    if t.startswith("This session is being continued from a previous"):
        return False
    return True


def iter_events():
    """Yield normalised events in file order. Contract: see readers/__init__.py."""
    if not os.path.isdir(ROOT):
        raise SystemExit(
            f"no Claude Code transcripts at {ROOT}. "
            "Set CLAUDE_CONFIG_DIR, or RETRO_READER to another agent's reader."
        )
    for pdir in sorted(os.listdir(ROOT)):
        full = os.path.join(ROOT, pdir)
        if not os.path.isdir(full):
            continue
        for f in sorted(glob.glob(os.path.join(full, "*.jsonl"))):
            events = []
            try:
                with open(f, errors="replace") as fh:
                    for line in fh:
                        try:
                            d = json.loads(line)
                        except ValueError:
                            continue        # a torn line from a live session; skip it
                        if d.get("type") in ("user", "assistant"):
                            events.append(d)
            except OSError:
                continue
            # Four is the floor a session must clear to hold one complete exchange.
            # Below that there is nothing to pair and the file is noise.
            if len(events) < 4:
                continue
            session = os.path.basename(f)[:-6]
            for ev in events:
                if is_human(ev):
                    yield {
                        "kind": "human", "project": pdir, "session": session,
                        "ts": ev.get("timestamp"),
                        "text": text_of(ev.get("message") or {}).strip(),
                        "tools": [], "bash": [],
                    }
                elif ev.get("type") == "assistant" and not ev.get("isSidechain"):
                    m = ev.get("message") or {}
                    tools, bash = [], []
                    for b in (m.get("content") or []):
                        if isinstance(b, dict) and b.get("type") == "tool_use":
                            tools.append(b.get("name", "?"))
                            if b.get("name") == "Bash":
                                bash.append(str((b.get("input") or {}).get("command", ""))[:300])
                    yield {
                        "kind": "assistant", "project": pdir, "session": session,
                        "ts": ev.get("timestamp"), "text": text_of(m),
                        "tools": tools, "bash": bash,
                    }
