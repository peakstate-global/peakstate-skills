#!/usr/bin/env python3
"""Pair each assistant turn with the human turn that answered it.

The record this writes is the retro's unit of analysis: what the assistant said, what the
human said back, how much work sat between them, and whether any of it was checked. What
counts as a turn is the reader's problem (scripts/readers/); the pairing, the check
detection and the record shape are agent-agnostic and live here.

Usage: extract-turns.py <out.jsonl> [days] [--reader NAME] [--project PAT[,PAT...]]
       RETRO_READER=<name> also selects a reader. --project may be repeated; a project
       matches on case-insensitive substring, so `--project my-app` finds it under every
       agent's labelling.
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


def pair(events, cutoff=None, projects=None):
    """Yield one record per human turn that replied to something the assistant said.

    The first human turn of a session is skipped on purpose: it opens the conversation
    rather than responding to anything, so it cannot say whether the assistant did well.
    """
    session = None
    said, tools, bash, human_i = [], [], [], 0
    for ev in events:
        # Filter here rather than at the reader: dropping a whole session keeps the pairing
        # intact, whereas dropping individual events would leave a human turn paired with an
        # assistant turn from a different conversation.
        if not readers.matches(ev.get("project"), projects):
            continue
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


def parse_argv(argv):
    """Positional out-path and days, plus repeatable --reader/--project flags."""
    name, projects, positional, i = None, [], [], 0
    while i < len(argv):
        a = argv[i]
        if a == "--reader" and i + 1 < len(argv):
            name = argv[i + 1]
            i += 2
        elif a == "--project" and i + 1 < len(argv):
            projects.append(argv[i + 1])
            i += 2
        elif a.startswith("--"):
            i += 1
        else:
            positional.append(a)
            i += 1
    return positional, name, readers.split_patterns(projects)


def main():
    positional, name, projects = parse_argv(sys.argv[1:])
    out_path = positional[0]
    cutoff = (datetime.now(timezone.utc) - timedelta(days=int(positional[1]))) \
        if len(positional) > 1 else None

    reader = readers.load(name)
    n = 0
    with open(out_path, "w") as out:
        for rec in pair(reader.iter_events(), cutoff, projects):
            out.write(json.dumps(rec, ensure_ascii=False) + "\n")
            n += 1
    scope = f", projects: {'|'.join(projects)}" if projects else ""
    print(f"human turns {n} (reader: {reader.__name__.rsplit('.', 1)[-1]}{scope})",
          file=sys.stderr)


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

    # An agent name typed by a person must reach its module, and an ambiguous one must not
    # be guessed at — "c" matches both claude_code and codex.
    assert readers.resolve("claude") == "claude_code"
    assert readers.resolve("claude-code") == "claude_code"
    assert readers.resolve("codex") == "codex"
    assert readers.resolve("c") == "c", "an ambiguous prefix stays unresolved and is reported"
    assert readers.resolve("nope") == "nope"

    # A project filter drops whole sessions, never individual events — pairing a human turn
    # with an assistant turn from another conversation would be worse than filtering nothing.
    mixed = ev + [
        {"kind": "human", "session": "s3", "project": "other", "ts": None, "text": "open"},
        {"kind": "assistant", "session": "s3", "project": "other", "ts": None,
         "text": "hi", "tools": [], "bash": []},
        {"kind": "human", "session": "s3", "project": "other", "ts": None, "text": "no"},
    ]
    assert len(list(pair(mixed))) == 3
    assert [r["project"] for r in pair(mixed, projects=["other"])] == ["other"]
    assert list(pair(mixed, projects=["nothing-matches"])) == []
    assert len(list(pair(mixed, projects=[]))) == 3, "no patterns means everything"

    assert readers.matches("-Users-x-LOCAL-DEV-my-app", ["my-app"])
    assert readers.matches("my-app", ["MY-APP"]), "matching is case-insensitive"
    assert not readers.matches("other-app", ["my-app"])
    assert readers.split_patterns(["a,b", "c"]) == ["a", "b", "c"]
    print("selftest ok")


if __name__ == "__main__":
    if "--selftest" in sys.argv:
        selftest()
    else:
        main()
