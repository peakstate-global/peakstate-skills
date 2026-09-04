#!/usr/bin/env python3
"""Assemble the portable cut of this skill — the folder you drop into a host
with no developer machine.

    python3 make-portable.py ~/OneDrive/Documents/Cowork/skills
    python3 make-portable.py /tmp/out --zip

Five files land in <dest>/peakstate-brief/: the short SKILL.md, the template,
the runtime pair, and inline-brief.py. That is one SKILL.md plus four companion
files, against Copilot Cowork's limit of twenty, and ~230KB against its 10MB.

ponytail: a copy loop, not a build. The portable SKILL.md is written by hand
because it is a different document for a different reader, not a subset that
could be sliced out of the full one; everything else is copied verbatim, so
there is no second source of truth to drift.
"""

import shutil
import sys
import zipfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
SKILL = HERE.parent

FILES = [
    (SKILL / "portable" / "SKILL.md", "SKILL.md"),
    (HERE / "brief-template.html", "brief-template.html"),
    (HERE / "brief.css", "brief.css"),
    (HERE / "brief.js", "brief.js"),
    (HERE / "inline-brief.py", "inline-brief.py"),
]


def build(dest: Path) -> Path:
    out = dest / "peakstate-brief"
    out.mkdir(parents=True, exist_ok=True)
    for src, name in FILES:
        if not src.is_file():
            raise SystemExit(f"missing: {src}")
        shutil.copy2(src, out / name)
    return out


def self_check() -> int:
    """The cut is only portable if it stays inside the tightest host's limits."""
    import tempfile

    with tempfile.TemporaryDirectory() as tmp:
        out = build(Path(tmp))
        files = sorted(p for p in out.iterdir() if p.is_file())
        assert len(files) == 5, f"expected 5 files, got {len(files)}"
        assert (out / "SKILL.md").is_file(), "no SKILL.md"
        # One SKILL.md plus companions, and the companion cap is the binding one.
        assert len(files) - 1 <= 20, "over Copilot Cowork's 20-companion-file limit"
        total = sum(p.stat().st_size for p in files)
        assert total <= 10 * 1024 * 1024, "over the 10MB per-skill limit"
        # The runtime has to travel, or inline-brief.py has nothing to inline.
        for name in ("brief.css", "brief.js", "brief-template.html", "inline-brief.py"):
            assert (out / name).stat().st_size > 1000, f"{name} looks truncated"
        print(f"self-check passed — {len(files)} files, {total // 1024}KB")
    return 0


def main() -> int:
    if "--self-check" in sys.argv:
        return self_check()
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    if not args:
        print(__doc__.strip().splitlines()[0])
        print("usage: make-portable.py <dest-dir> [--zip]")
        return 2
    out = build(Path(args[0]).expanduser())
    size = sum(p.stat().st_size for p in out.iterdir() if p.is_file())
    print(f"wrote {out} — 5 files, {size // 1024}KB")
    if "--zip" in sys.argv:
        z = out.with_suffix(".zip")
        with zipfile.ZipFile(z, "w", zipfile.ZIP_DEFLATED) as zf:
            for p in sorted(out.iterdir()):
                if p.is_file():
                    zf.write(p, f"peakstate-brief/{p.name}")
        print(f"wrote {z} — upload this one to claude.ai › Settings › Capabilities")
    return 0


if __name__ == "__main__":
    sys.exit(main())
