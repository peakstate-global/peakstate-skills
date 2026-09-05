#!/usr/bin/env python3
"""Extract genuine human prompts to a compact JSONL, one {p, m} per line.

Replaces the inline jq that used to sit in step 2 of SKILL.md. That worked, but it hard-coded
Claude Code's event shape into the instructions, so a second agent could not be supported
without rewriting the method. This routes through scripts/readers/ instead.

Transcripts run to hundreds of megabytes. This exists so the retro reads THIS file rather
than the raw history: never pull transcripts into an agent's context.

Usage: read-prompts.py <out.jsonl> [days] [--reader NAME] [--chars N]
                       [--project PAT[,PAT...]]
"""
import json
import os
import sys
from datetime import datetime, timedelta, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import readers  # noqa: E402


def _ts(ts):
    try:
        return datetime.fromisoformat((ts or "").replace("Z", "+00:00"))
    except (ValueError, AttributeError):
        return None


def main():
    argv = sys.argv[1:]

    def opt(flag, default=None):
        return argv[argv.index(flag) + 1] if flag in argv else default

    name = opt("--reader")
    chars = int(opt("--chars", 600))
    projects = readers.split_patterns(
        [argv[i + 1] for i, a in enumerate(argv) if a == "--project" and i + 1 < len(argv)]
    )
    consumed = {name, opt("--chars"), *projects,
                *[argv[i + 1] for i, a in enumerate(argv) if a == "--project" and i + 1 < len(argv)]}
    positional = [a for a in argv if not a.startswith("--") and a not in consumed]
    out_path = positional[0]
    cutoff = (datetime.now(timezone.utc) - timedelta(days=int(positional[1]))) \
        if len(positional) > 1 else None

    reader = readers.load(name)
    n = 0
    with open(out_path, "w") as out:
        for ev in reader.iter_events():
            if ev["kind"] != "human":
                continue
            if not readers.matches(ev.get("project"), projects):
                continue
            if cutoff is not None:
                ts = _ts(ev.get("ts"))
                if ts is None or ts < cutoff:
                    continue
            text = (ev.get("text") or "").strip()
            if not text:
                continue
            out.write(json.dumps({"p": ev.get("project"), "m": text[:chars]},
                                 ensure_ascii=False) + "\n")
            n += 1
    scope = f", projects: {'|'.join(projects)}" if projects else ""
    print(f"prompts {n} (reader: {reader.__name__.rsplit('.', 1)[-1]}{scope})", file=sys.stderr)


if __name__ == "__main__":
    main()
