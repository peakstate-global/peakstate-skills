#!/usr/bin/env python3
"""Pair each assistant turn with the human turn that answered it.

The record this writes is the retro's unit of analysis: what the assistant said, what the
human said back, how much work sat between them, and whether any of it was checked. What
counts as a turn is the reader's problem (scripts/readers/); the pairing, the check
detection and the record shape are agent-agnostic and live here.

Usage: extract-turns.py <out.jsonl> [days] [--reader NAME]
       RETRO_READER=<name> also selects a reader.
"""
import json
import os
import re
import sys
from datetime import datetime, timedelta, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import readers  # noqa: E402

# A turn "ran a check" if the assistant executed something that can fail on its own terms.
# Naming the tools rather than guessing keeps this honest across languages.
CHECK = re.compile(r"\b(pytest|npm (run )?test|vitest|jest|tsc\b|typecheck|eslint|ruff|mypy|"
                   r"npm run build|next build|cargo (test|build)|go test|playwright|curl -|"
                   r"lighthouse|shellcheck|bash -n|validate|gate)\b", re.I)


def parse_ts(ts):
    try:
        return datetime.fromisoformat((ts or "").replace("Z", "+00:00"))
    except (ValueError, AttributeError):
        return None


def pair(events, cutoff=None):
    """Yield one record per human turn that replied to something the assistant said.

    The first human turn of a session is skipped on purpose: it opens the conversation
    rather than responding to anything, so it cannot say whether the assistant did well.
    """
    session = None
    said, tools, bash, human_i = [], [], [], 0
    for ev in events:
        if ev.get("session") != session:
            session, said, tools, bash, human_i = ev.get("session"), [], [], [], 0
        if ev["kind"] == "human":
            human_i += 1
            ts = parse_ts(ev.get("ts"))
            if human_i > 1 and said and (cutoff is None or (ts and ts >= cutoff)):
                yield {
                    "id": f"{session}:{human_i}", "project": ev.get("project"),
                    "ts": ev.get("ts"),
                    "assistant_said": "\n".join(said)[-3000:],
                    "human_replied": (ev.get("text") or "")[:2500],
                    "n_tool_calls": len(tools),
                    "check_ran": bool(CHECK.search(" ".join(bash))),
                }
            said, tools, bash = [], [], []
        else:
            if (ev.get("text") or "").strip():
                said.append(ev["text"])
            tools.extend(ev.get("tools") or [])
            bash.extend(ev.get("bash") or [])


def main():
    args = [a for a in sys.argv[1:] if a != "--reader"]
    name = None
    if "--reader" in sys.argv:
        name = sys.argv[sys.argv.index("--reader") + 1]
        args = [a for a in args if a != name]
    out_path = args[0]
    cutoff = (datetime.now(timezone.utc) - timedelta(days=int(args[1]))) if len(args) > 1 else None

    reader = readers.load(name)
    n = 0
    with open(out_path, "w") as out:
        for rec in pair(reader.iter_events(), cutoff):
            out.write(json.dumps(rec, ensure_ascii=False) + "\n")
            n += 1
    print(f"human turns {n} (reader: {reader.__name__.rsplit('.', 1)[-1]})", file=sys.stderr)


def selftest():
    """The pairing is the only agent-agnostic logic here, so it is the only thing to check."""
    ev = [
        {"kind": "human", "session": "s1", "project": "p", "ts": None, "text": "open"},
        {"kind": "assistant", "session": "s1", "project": "p", "ts": None,
         "text": "did it", "tools": ["Bash"], "bash": ["pytest -q"]},
        {"kind": "human", "session": "s1", "project": "p", "ts": None, "text": "no, wrong"},
        {"kind": "human", "session": "s2", "project": "p", "ts": None, "text": "open again"},
        {"kind": "assistant", "session": "s2", "project": "p", "ts": None,
         "text": "ok", "tools": [], "bash": ["ls"]},
        {"kind": "human", "session": "s2", "project": "p", "ts": None, "text": "thanks"},
    ]
    got = list(pair(ev))
    assert len(got) == 2, f"one record per replying turn, got {len(got)}"
    assert got[0]["human_replied"] == "no, wrong"
    assert got[0]["check_ran"] is True, "pytest counts as a check"
    assert got[1]["check_ran"] is False, "ls does not"
    assert got[1]["id"].startswith("s2:"), "a session boundary resets the counter"
    # The opening turn of each session answers nothing and must not be paired.
    assert all("open" not in r["human_replied"] for r in got)
    print("selftest ok")


if __name__ == "__main__":
    if "--selftest" in sys.argv:
        selftest()
    else:
        main()
