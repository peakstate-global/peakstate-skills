#!/usr/bin/env python3
"""Check every skill under skills/ against the skill contract.

The contract is the folder shape, the fixed front matter and the body sections
a knowledge-worker skill must have. The leak guard (check-no-leaks.py) looks
for things that must not be published; this script looks for the shape a skill
must have. Stdlib only. It parses the one front-matter shape the contract
allows, not general YAML.

    python3 scripts/check-skill-contract.py            # every skill not exempt
    python3 scripts/check-skill-contract.py skills/x   # one or more skills
    python3 scripts/check-skill-contract.py --list     # names the check covers
    python3 scripts/check-skill-contract.py --selftest

A new skill is covered by default. Only the skills in EXEMPT, which predate the
contract, are skipped, and they are skipped by name so the gap stays visible.
"""
import re
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SNIPPET = Path(__file__).resolve().parent / "host-snippet.md"

# Skills written before the contract. Never add a new skill here.
EXEMPT = {"peakstate-brief", "peakstate-retro"}

MAX_LINES, MAX_BYTES, MAX_COMPANIONS = 500, 20 * 1024, 8
TOP_KEYS = ["name", "description", "license", "metadata"]
META_KEYS = ["author", "source", "version", "profile", "output"]
META_FIXED = {"author": "Peak State Global",
              "source": "https://github.com/peakstate-global/peakstate-skills"}
PROFILES = {"guided", "direct", "artefact"}
OUTPUTS = {"text", "file", "diagram", "visual"}
LADDER_FOR = {"file": "file ladder", "diagram": "diagram ladder", "visual": "visual ladder"}
ADAPT, LADDER = "Adapt to your host", "Ladder"
FINAL = ("Sources for the libraries in this skill: SOURCES.md. "
         "Open it only if the user asks where an entry comes from.")
NAME_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
FENCE_RE = re.compile(r"^ {0,3}(`{3,}|~{3,})")
ITEM_RE = re.compile(r"^(?:[-*+]|\d+[.)])\s+\S")


def norm(text):
    """CRLF to LF, trailing whitespace off every line, blank edges trimmed."""
    lines = [l.rstrip() for l in text.replace("\r\n", "\n").replace("\r", "\n").split("\n")]
    while lines and not lines[0]:
        lines.pop(0)
    while lines and not lines[-1]:
        lines.pop()
    return "\n".join(lines)


def unquote(v):
    if len(v) >= 2 and v[0] == v[-1] and v[0] in "\"'":
        return v[1:-1], True
    return v, False


def front_matter(lines, errs):
    """Returns (fields, metadata, body lines) for the fixed shape, or None."""
    if not lines or lines[0] != "---":
        errs.append("SKILL.md does not open with a --- front-matter line")
        return None
    try:
        end = lines.index("---", 1)
    except ValueError:
        errs.append("front matter is not closed with ---")
        return None
    top, meta, order, in_meta = {}, {}, [], False
    for l in lines[1:end]:
        if not l.strip():
            continue
        if l.startswith("  ") and in_meta:
            k, sep, v = l.strip().partition(":")
            if not sep or not v.strip():
                errs.append(f"metadata line is not 'key: \"value\"': {l.strip()!r}")
                continue
            v, quoted = unquote(v.strip())
            if not quoted:
                errs.append(f"metadata.{k} must be a quoted string")
            if k in meta:
                errs.append(f"metadata.{k} appears twice")
            meta[k] = v
            continue
        k, sep, v = l.partition(":")
        if l.startswith(" ") or not sep:
            errs.append(f"front-matter line outside the fixed shape: {l!r}")
            continue
        in_meta = k == "metadata"
        if k in top:
            errs.append(f"front-matter key {k} appears twice")
        order.append(k)
        top[k] = unquote(v.strip())[0]
    if sorted(order) != sorted(TOP_KEYS) or len(order) != len(TOP_KEYS):
        errs.append(f"top-level keys must be exactly {TOP_KEYS}, found {order}")
    if "metadata" in top and top["metadata"]:
        errs.append("metadata must be a block of indented keys")
    if sorted(meta) != sorted(META_KEYS):
        errs.append(f"metadata keys must be exactly {META_KEYS}, found {list(meta)}")
    return top, meta, lines[end + 1:]


def sections(body):
    """Split the body into (preamble, [(heading, lines)]) on ## headings,
    ignoring anything inside a fenced block."""
    pre, secs, fence = [], [], None
    for l in body:
        m = FENCE_RE.match(l)
        if fence:
            if m and m.group(1)[0] == fence[0] and len(m.group(1)) >= len(fence) \
                    and not l.strip()[len(m.group(1)):]:
                fence = None
        elif m:
            fence = m.group(1)
        elif l.startswith("## "):
            secs.append((l[3:].strip(), []))
            continue
        (secs[-1][1] if secs else pre).append((l, fence is not None or bool(m)))
    return pre, secs


def check_skill(skill, snippet=None):
    """Every breach of the contract in one skill folder, as strings."""
    errs, skill = [], Path(skill)
    if skill.is_symlink():
        return [f"{skill.name}: the skill folder is a symlink, symlinks are not allowed"]
    snippet = norm(SNIPPET.read_text(encoding="utf-8") if snippet is None else snippet)
    name = skill.name
    if not NAME_RE.match(name):
        errs.append(f"folder name {name!r} is not kebab-case")

    # 3.1 folder shape
    companions, refs = [], []
    for p in sorted(skill.rglob("*")):
        rel = p.relative_to(skill).as_posix()
        if p.is_symlink():
            errs.append(f"{rel}: symlinks are not allowed")
            continue
        if any(part.startswith(".") for part in p.relative_to(skill).parts):
            errs.append(f"{rel}: hidden files are not allowed")
            continue
        if p.is_dir():
            if rel != "references":
                errs.append(f"{rel}/: the only folder allowed is references/")
            continue
        if p.suffix != ".md":
            errs.append(f"{rel}: only .md files are allowed")
        elif rel == "SKILL.md":
            continue
        elif rel != "SOURCES.md" and not re.fullmatch(r"references/[^/]+\.md", rel):
            errs.append(f"{rel}: not SKILL.md, SOURCES.md or references/*.md")
        if rel.startswith("references/"):
            refs.append(rel)
        companions.append(rel)
    if len(companions) > MAX_COMPANIONS:
        errs.append(f"{len(companions)} companion files, the cap is {MAX_COMPANIONS}")
    if not (skill / "SOURCES.md").is_file():
        errs.append("SOURCES.md is missing")
    sk = skill / "SKILL.md"
    if not sk.is_file() or sk.is_symlink():
        return errs + ["SKILL.md is missing"]
    raw = sk.read_bytes()
    text = raw.decode("utf-8", errors="replace")
    lines = [l.rstrip() for l in text.replace("\r\n", "\n").split("\n")]
    nlines = len(lines) - (1 if lines and lines[-1] == "" else 0)
    if nlines > MAX_LINES:
        errs.append(f"SKILL.md is {nlines} lines, the cap is {MAX_LINES}")
    if len(raw) > MAX_BYTES:
        errs.append(f"SKILL.md is {len(raw)} bytes, the cap is {MAX_BYTES}")

    # 3.2 front matter
    fm = front_matter(lines, errs)
    if fm is None:
        return errs
    top, meta, body = fm
    if top.get("name") != name:
        errs.append(f"name {top.get('name')!r} does not match the folder {name!r}")
    desc = top.get("description", "")
    if not desc or len(desc) > 1024:
        errs.append("description must be 1 to 1024 characters on one line")
    if top.get("license") != "Apache-2.0":
        errs.append("license must be Apache-2.0")
    for k, v in META_FIXED.items():
        if k in meta and meta[k] != v:
            errs.append(f"metadata.{k} must be {v!r}")
    if "version" in meta and not re.fullmatch(r"\d+(\.\d+)*", meta["version"]):
        errs.append("metadata.version must look like \"0.1\"")
    profile, output = meta.get("profile"), meta.get("output")
    if profile not in PROFILES:
        errs.append(f"metadata.profile must be one of {sorted(PROFILES)}")
    if output not in OUTPUTS:
        errs.append(f"metadata.output must be one of {sorted(OUTPUTS)}")

    # 3.3 body sections, in order
    pre, secs = sections(body)
    lead = [l for l, _ in pre if l.strip()]
    if len(lead) != 1 or lead[0].startswith("#"):
        errs.append("the body must open with one sentence before the first ## heading")
    want = ([ADAPT] if output in LADDER_FOR else []) + [
        "Steps", "The take-away", "Next", "Self-check before you deliver"] + (
        ["Read this when"] if refs else [])
    got = [h for h, _ in secs]
    if got != want:
        errs.append(f"## headings must be exactly {want} in that order, found {got}")
    by = {h: ls for h, ls in secs if got.count(h) == 1}

    if output == "text" and ADAPT in got:
        errs.append(f"'## {ADAPT}' is forbidden when output is text")
    if ADAPT in by:
        ls = by[ADAPT]
        subs = [i for i, (l, f) in enumerate(ls) if not f and l.startswith("### ")]
        ladders = [i for i in subs if ls[i][0][4:].strip() == LADDER]
        if len(ladders) != 1:
            errs.append(f"'## {ADAPT}' must hold exactly one '### {LADDER}', found {len(ladders)}")
        else:
            i = ladders[0]
            if norm("\n".join(l for l, _ in ls[:i])) != snippet:
                errs.append(f"'## {ADAPT}' text differs from scripts/host-snippet.md")
            ladder_text = "\n".join(l for l, _ in ls[i + 1:]).lower()
            if output in LADDER_FOR and LADDER_FOR[output] not in ladder_text:
                errs.append(f"'### {LADDER}' must name the {LADDER_FOR[output]}")
    if "Steps" in by and not any(re.match(r"^\d+\.\s", l) for l, f in by["Steps"] if not f):
        errs.append("'## Steps' has no numbered steps")
    if "Next" in by:
        nxt = "\n".join(l for l, _ in by["Next"])
        need = "Next step" if profile == "direct" else "Your next three moves"
        if need not in nxt:
            errs.append(f"'## Next' must carry '{need}' for the {profile} profile")
    if "Self-check before you deliver" in by:
        n = sum(1 for l, f in by["Self-check before you deliver"] if not f and ITEM_RE.match(l))
        if not 5 <= n <= 8:
            errs.append(f"self-check has {n} items, it needs 5 to 8")
    if "Read this when" in by:
        rt = "\n".join(l for l, _ in by["Read this when"])
        if "|" not in rt:
            errs.append("'## Read this when' must be a table")
        for r in refs:
            if r not in rt:
                errs.append(f"'## Read this when' does not name {r}")
    last = next((l for l in reversed(lines) if l.strip()), "")
    if last != FINAL:
        errs.append("the final line is not the exact SOURCES.md line")
    return errs


def contract_skills(root=ROOT):
    d = root / "skills"
    return sorted(p for p in d.iterdir() if (p.is_dir() or p.is_symlink())
                  and not p.name.startswith(".")
                  and p.name not in EXEMPT)


# ---------------------------------------------------------------- selftest

GOOD_SNIPPET = "Hosts differ.\n\n1. List your tools.\n2. Take the first rung.\n"


def good_skill(output="file", profile="guided", refs=True):
    fm = ("---\nname: demo-skill\ndescription: Makes a demo. Use when asked for a demo.\n"
          "license: Apache-2.0\nmetadata:\n  author: \"Peak State Global\"\n"
          "  source: \"https://github.com/peakstate-global/peakstate-skills\"\n"
          f"  version: \"0.1\"\n  profile: \"{profile}\"\n  output: \"{output}\"\n---\n")
    adapt = ("" if output == "text" else
             f"## Adapt to your host\n\n{GOOD_SNIPPET}\n### Ladder\n\n"
             f"This skill uses the {LADDER_FOR[output]}: SVG, then a table.\n\n")
    nxt = "Next step: share it." if profile == "direct" else "Your next three moves:\n\n1. a\n2. b\n3. c"
    read = ("## Read this when\n\n| File | When |\n|---|---|\n"
            "| references/lib.md | picking an entry |\n\n") if refs else ""
    body = (f"This skill produces a demo.\n\n{adapt}## Steps\n\n1. **Ask.** One question.\n"
            "2. **Make.** The thing.\n\n```md\n## Not a heading\n```\n\n"
            "## The take-away\n\nSee the template.\n\n"
            f"## Next\n\n{nxt}\n\n## Self-check before you deliver\n\n"
            "- one\n- two\n- three\n- four\n- five\n\n" + read + FINAL + "\n")
    files = {"SKILL.md": fm + body, "SOURCES.md": "[S1] A. (2020). T.\n"}
    if refs:
        files["references/lib.md"] = "# Lib\n"
    return files


def selftest():
    fails = []

    def run(label, files, expect, snippet=GOOD_SNIPPET, extra=None):
        with tempfile.TemporaryDirectory() as t:
            s = Path(t) / "demo-skill"
            for rel, content in files.items():
                p = s / rel
                p.parent.mkdir(parents=True, exist_ok=True)
                (p.write_bytes if isinstance(content, bytes) else p.write_text)(content)
            if extra:
                extra(s)
            errs = check_skill(s, snippet)
        joined = "\n".join(errs)
        if expect is None:
            ok = not errs
        else:
            ok = expect in joined
        if not ok:
            fails.append(f"{label}: expected {expect or 'pass'}, got {errs or 'pass'}")

    def edit(old, new, then=None, **kw):
        f = good_skill(**kw)
        for o, n in [(old, new)] + ([then] if then else []):
            assert o in f["SKILL.md"], o
            f["SKILL.md"] = f["SKILL.md"].replace(o, n, 1)
        return f

    # Pass cases, every output and profile shape.
    run("good file skill", good_skill(), None)
    run("good diagram skill", good_skill("diagram"), None)
    run("good visual skill", good_skill("visual"), None)
    run("good text direct skill, no references", good_skill("text", "direct", False), None)
    run("CRLF skill passes", {**good_skill(), "SKILL.md": good_skill()["SKILL.md"].replace("\n", "\r\n")}, None)
    run("trailing whitespace in the snippet passes",
        edit("1. List your tools.\n", "1. List your tools.   \n"), None)
    run("snippet file with CRLF passes", good_skill(), None, GOOD_SNIPPET.replace("\n", "\r\n"))

    # 3.1 folder shape
    big = good_skill()
    big["SKILL.md"] = big["SKILL.md"].replace(FINAL, "x\n" * 500 + FINAL)
    run("over 500 lines", big, "lines, the cap is 500")
    fat = good_skill()
    fat["SKILL.md"] = fat["SKILL.md"].replace(FINAL, "y" * 21000 + "\n" + FINAL)
    run("over 20KB", fat, "bytes, the cap is 20480")
    run("non-md file", {**good_skill(), "references/t.html": "<p>"}, "only .md files")
    run("hidden file", {**good_skill(), ".DS_Store": "x"}, "hidden files")
    run("stray folder", {**good_skill(), "assets/x.md": "x"}, "only folder allowed")
    run("md outside the layout", {**good_skill(), "NOTES.md": "x"}, "not SKILL.md, SOURCES.md")
    many = good_skill()
    for i in range(8):
        many[f"references/r{i}.md"] = "x"
    run("over 8 companions", many, "companion files, the cap is 8")
    nosrc = good_skill()
    del nosrc["SOURCES.md"]
    run("no SOURCES.md", nosrc, "SOURCES.md is missing")
    run("symlink", good_skill(), "symlinks are not allowed",
        extra=lambda s: (s / "references" / "link.md").symlink_to(s / "SOURCES.md"))
    with tempfile.TemporaryDirectory() as t:
        real = Path(t) / "real-skill"
        for rel, content in good_skill().items():
            (real / rel).parent.mkdir(parents=True, exist_ok=True)
            (real / rel).write_text(content)
        link = Path(t) / "demo-skill"
        link.symlink_to(real, target_is_directory=True)
        errs = check_skill(link, GOOD_SNIPPET)
        if not any("skill folder is a symlink" in e for e in errs):
            fails.append(f"symlinked skill folder: expected rejection, got {errs or 'pass'}")

    # 3.2 front matter
    run("no front matter", edit("---\nname", "name"), "does not open with")
    run("extra top key", edit("license:", "tags: x\nlicense:"), "top-level keys must be exactly")
    run("missing license", edit("license: Apache-2.0\n", ""), "top-level keys must be exactly")
    run("wrong license", edit("Apache-2.0", "MIT"), "license must be Apache-2.0")
    run("name mismatch", edit("name: demo-skill", "name: other"), "does not match the folder")
    run("long description", edit("Makes a demo.", "x" * 1030), "1 to 1024")
    run("unquoted metadata", edit('version: "0.1"', "version: 0.1"), "must be a quoted string")
    run("extra metadata key", edit('  output:', '  tier: "1"\n  output:'), "metadata keys must be exactly")
    run("wrong author", edit("Peak State Global", "Someone"), "metadata.author")
    run("bad profile", edit('profile: "guided"', 'profile: "chatty"'), "metadata.profile")
    run("bad output", edit('output: "file"', 'output: "pdf"'), "metadata.output")
    run("nested metadata value", edit('  output: "file"', '  output:\n    - "file"'), "metadata line")

    # 3.3 body sections
    run("no lead sentence", edit("This skill produces a demo.\n\n", ""), "open with one sentence")
    run("lead is a heading", edit("This skill produces a demo.", "# Demo"), "open with one sentence")
    run("missing snippet heading on a file skill",
        edit("## Adapt to your host\n", "## Host notes\n"), "## headings must be exactly")
    run("snippet heading on a text skill",
        {**good_skill("text", "direct", False),
         "SKILL.md": good_skill("text", "direct", False)["SKILL.md"].replace(
             "## Steps", f"## Adapt to your host\n\n{GOOD_SNIPPET}\n### Ladder\n\nx\n\n## Steps")},
        "forbidden when output is text")
    run("snippet drifted", edit("2. Take the first rung.", "2. Take any rung."), "differs from scripts/host-snippet.md")
    run("missing ladder heading", edit("### Ladder\n", ""), "exactly one '### Ladder', found 0")
    run("duplicate ladder heading", edit("### Ladder\n", "### Ladder\n\n### Ladder\n"), "found 2")
    run("ladder names the wrong ladder", edit("file ladder", "visual ladder"), "must name the file ladder")
    run("duplicate heading", edit("## The take-away", "## Steps\n\n1. x\n\n## The take-away"), "## headings must be exactly")
    run("sections out of order", edit("## Next\n\nYour next three moves:\n\n1. a\n2. b\n3. c\n\n", "",
        then=("## Steps", "## Next\n\nYour next three moves:\n\n## Steps")), "in that order")
    run("heading inside a fence is ignored",
        edit("```md\n## Not a heading\n```", "~~~\n## Adapt to your host\n## Steps\n~~~"), None)
    run("unclosed fence swallows the rest", edit("```md\n## Not a heading\n```", "```md\n## x"), "## headings must be exactly")
    run("steps not numbered", edit("1. **Ask.**", "- **Ask.**", then=("2. **Make.**", "- **Make.**")),
        "no numbered steps")
    run("guided without three moves", edit("Your next three moves:", "Then:"), "Your next three moves")
    run("direct without next step",
        {**good_skill("text", "direct", False), "SKILL.md": good_skill("text", "direct", False)["SKILL.md"]
         .replace("Next step: share it.", "Share it.")}, "'Next step'")
    run("self-check too short", edit("- five\n", ""), "self-check has 4 items")
    run("self-check too long", edit("- five\n", "- five\n- 6\n- 7\n- 8\n- 9\n"), "self-check has 9 items")
    run("read-this-when missing with references", edit("## Read this when", "## Library"), "## headings must be exactly")
    run("read-this-when does not name a reference", edit("| references/lib.md |", "| lib |"),
        "does not name references/lib.md")
    run("final line changed", edit(FINAL, FINAL + " Thanks."), "final line")
    run("text after the final line", edit(FINAL + "\n", FINAL + "\n\nBye.\n"), "final line")

    for f in fails:
        print("FAIL", f)
    print(f"selftest {'FAILED' if fails else 'passed'}")
    return 1 if fails else 0


def main(argv):
    if "--selftest" in argv:
        return selftest()
    if "--list" in argv:
        print("\n".join(p.name for p in contract_skills()))
        return 0
    targets = [Path(a) for a in argv if not a.startswith("-")] or contract_skills()
    bad = 0
    for s in targets:
        if s.name in EXEMPT:
            print(f"{s.name}: exempt (predates the contract)")
            continue
        errs = check_skill(s)
        for e in errs:
            print(f"{s.name}: {e}", file=sys.stderr)
        bad += bool(errs)
    print(f"contract check {'failed' if bad else 'clean'}: {len(targets)} skill(s)")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
