#!/usr/bin/env python3
"""What each agent's history actually holds, before a retro is run over it.

A bare `/peakstate-retro` asks which agents to include, and an uninformed choice is a wasted
run: an agent may not be installed, may have no sessions yet, or may hold thousands of
sessions that are one-shot and therefore have nothing to pair. This answers all three
cheaply — file counts and modification times only, no parsing.

Usage: survey-sources.py [days]
"""
import os
import sys
import time

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import readers  # noqa: E402

# Said once here rather than discovered again per run. Both are properties of how the agent
# is USED, not of its file format, so they do not belong in the readers themselves.
NOTES = {
    "codex": "driven headlessly — 'user' turns are the orchestrator's, and sessions are "
             "one-shot, so very few pair",
    "pi": "tree-structured; abandoned forks are skipped",
}


def main():
    days = int(sys.argv[1]) if len(sys.argv) > 1 else None
    cutoff = time.time() - days * 86400 if days else None

    rows = []
    for name in readers.names():
        try:
            paths = readers.load(name).files()
        except SystemExit as exc:              # a reader that cannot even look
            rows.append((name, 0, 0, "-", str(exc).split("\n")[0][:60]))
            continue
        mtimes = []
        for p in paths:
            try:
                mtimes.append(os.path.getmtime(p))
            except OSError:
                pass
        recent = [m for m in mtimes if cutoff is None or m >= cutoff]
        span = "-"
        if mtimes:
            fmt = "%Y-%m-%d"
            span = f"{time.strftime(fmt, time.localtime(min(mtimes)))}..{time.strftime(fmt, time.localtime(max(mtimes)))}"
        rows.append((name, len(paths), len(recent), span, NOTES.get(name, "")))

    head = f"{'reader':<14}{'sessions':>9}{'in window':>11}  {'span':<24}note"
    print(head)
    print("-" * len(head))
    for name, total, recent, span, note in rows:
        state = "" if total else "  (nothing to analyse)"
        print(f"{name:<14}{total:>9}{recent:>11}  {span:<24}{note}{state}")
    if days:
        print(f"\nwindow: last {days} days")


if __name__ == "__main__":
    main()
