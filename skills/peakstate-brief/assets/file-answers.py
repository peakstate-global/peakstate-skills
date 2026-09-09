#!/usr/bin/env python3
"""File a downloaded responses JSON beside the brief it belongs to.

A brief's answers live in the reader's browser, so the file on disk never changes
when it is answered, and nothing downstream can tell an answered brief from an
unanswered one. The Download button already writes a payload naming its own brief,
so the only missing step is filing it: this moves each downloaded payload to
`<brief>.answers.json`, beside the HTML, where anything can read it.

    python3 file-answers.py                     # ~/Downloads into the current repo
    python3 file-answers.py --root ~/LOCAL-DEV  # search wider
    python3 file-answers.py --dry-run

Answered state after this runs is a file test, not a guess: a brief has been
answered when its sidecar exists, and the sidecar says when and to which questions.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

BRIEF_ID = re.compile(rb'data-brief-id\s*=\s*["\']([^"\']+)["\']')
# ponytail: skip anything heavy or generated. Widen only if a brief ever lands
# somewhere none of these cover.
SKIP = {"node_modules", ".git", ".next", "dist", "build", ".venv", "__pycache__"}


def brief_id_of(path: Path) -> str | None:
    """The brief id declared on <body>.

    Read whole rather than by the first few KB: a built brief inlines its CSS and JS
    into <head>, so <body> routinely starts a quarter of a megabyte in, and a head
    read finds nothing on every real brief.
    """
    try:
        found = BRIEF_ID.search(path.read_bytes())
    except OSError:
        return None
    return found.group(1).decode("utf-8", "replace") if found else None


def find_briefs(root: Path) -> dict[str, Path]:
    """Every brief under root, by its id. A regenerated brief keeps its id and path,
    so the newest file wins where two copies of one brief exist."""
    briefs: dict[str, Path] = {}
    for path in root.rglob("*.html"):
        if SKIP & set(path.parts):
            continue
        found = brief_id_of(path)
        if not found:
            continue
        known = briefs.get(found)
        if known is None or path.stat().st_mtime > known.stat().st_mtime:
            briefs[found] = path
    return briefs


def payloads(downloads: Path) -> list[tuple[Path, dict]]:
    """Downloaded responses files, oldest first, so a later answer overwrites an
    earlier one for the same brief rather than the other way round."""
    out = []
    for path in sorted(downloads.glob("*-responses-*.json"), key=lambda p: p.stat().st_mtime):
        try:
            data = json.loads(path.read_text())
        except (json.JSONDecodeError, OSError):
            continue
        if isinstance(data, dict) and data.get("brief"):
            out.append((path, data))
    return out


def answered_count(data: dict) -> int:
    return sum(1 for a in data.get("answers", []) if a.get("resolved"))


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--downloads", default=str(Path.home() / "Downloads"))
    ap.add_argument("--root", default=".", help="where to look for the briefs")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument(
        "--keep", action="store_true", help="copy instead of moving the download"
    )
    args = ap.parse_args()

    downloads = Path(args.downloads).expanduser()
    root = Path(args.root).expanduser().resolve()
    found = payloads(downloads)
    if not found:
        print(f"no responses files in {downloads}")
        return 0

    briefs = find_briefs(root)
    filed = orphans = 0
    for path, data in found:
        brief_id = data["brief"]
        target = briefs.get(brief_id)
        if target is None:
            print(f"  ? {path.name}: no brief with id {brief_id!r} under {root}")
            orphans += 1
            continue
        sidecar = target.with_suffix(target.suffix + ".answers.json")
        answered = answered_count(data)
        total = len(data.get("answers", []))
        print(f"  -> {sidecar.relative_to(root)}  {answered}/{total} answered")
        if args.dry_run:
            continue
        # Written whole, never merged: the payload is the reader's complete state at
        # the moment they exported it, so a merge would resurrect answers they cleared.
        sidecar.write_text(json.dumps(data, indent=2) + "\n")
        if not args.keep:
            path.unlink()
        filed += 1

    tail = f", {orphans} with no matching brief" if orphans else ""
    print(f"{filed} filed{tail}" + (" (dry run)" if args.dry_run else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
