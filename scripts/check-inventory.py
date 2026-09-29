#!/usr/bin/env python3
"""Every skill folder is listed in skills/PUBLIC and has a SKILLS.md row, and
every name in either list has a folder. Stdlib only.

    python3 scripts/check-inventory.py
    python3 scripts/check-inventory.py --selftest
"""
import re
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ROW = re.compile(r"^\|\s*\[[^\]]+\]\(skills/([^/)]+)/?\)")


def inventory(root):
    d = root / "skills"
    folders = {p.name for p in d.iterdir() if p.is_dir() and not p.name.startswith(".")}
    public = {l.strip() for l in (d / "PUBLIC").read_text().splitlines()
              if l.strip() and not l.lstrip().startswith("#")}
    rows = {m.group(1) for l in (root / "SKILLS.md").read_text().splitlines()
            if (m := ROW.match(l))}
    errs = [f"{n}: folder not in skills/PUBLIC" for n in sorted(folders - public)]
    errs += [f"{n}: folder has no SKILLS.md row" for n in sorted(folders - rows)]
    errs += [f"{n}: in skills/PUBLIC but has no folder" for n in sorted(public - folders)]
    errs += [f"{n}: SKILLS.md row but no folder" for n in sorted(rows - folders)]
    return errs


def selftest():
    fails = []

    def case(label, folders, public, rows, expect):
        with tempfile.TemporaryDirectory() as t:
            r = Path(t)
            for f in folders:
                (r / "skills" / f).mkdir(parents=True)
            (r / "skills").mkdir(exist_ok=True)
            (r / "skills" / "PUBLIC").write_text("# comment\n" + "".join(p + "\n" for p in public))
            (r / "SKILLS.md").write_text("| Skill | What |\n|---|---|\n" + "".join(
                f"| [{n}](skills/{n}/) | does |\n" for n in rows))
            errs = inventory(r)
        if (expect is None and errs) or (expect and not any(expect in e for e in errs)):
            fails.append(f"{label}: expected {expect or 'pass'}, got {errs or 'pass'}")

    case("all three agree", ["a", "b"], ["a", "b"], ["a", "b"], None)
    case("folder not public", ["a", "b"], ["a"], ["a", "b"], "b: folder not in skills/PUBLIC")
    case("folder without row", ["a", "b"], ["a", "b"], ["a"], "b: folder has no SKILLS.md row")
    case("public without folder", ["a"], ["a", "c"], ["a"], "c: in skills/PUBLIC but has no folder")
    case("row without folder", ["a"], ["a"], ["a", "d"], "d: SKILLS.md row but no folder")
    for f in fails:
        print("FAIL", f)
    print(f"selftest {'FAILED' if fails else 'passed'}")
    return 1 if fails else 0


def main(argv):
    if "--selftest" in argv:
        return selftest()
    errs = inventory(ROOT)
    for e in errs:
        print(e, file=sys.stderr)
    print(f"inventory {'failed' if errs else 'clean'}")
    return 1 if errs else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
