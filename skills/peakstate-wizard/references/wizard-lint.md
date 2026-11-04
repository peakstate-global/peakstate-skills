# The wizard lint

Write this block out as `wizard-lint.py` in the wizard folder, unchanged, and run it after every
build:

    python3 wizard-lint.py <name>.md

It reads the companion source and every `<segment>.sh` the Terminal pages name. A `FAIL` line
blocks delivery: fix the wizard and run it again. A `CHECK` line is for you to judge by hand, and
says why. It exits 0 only when nothing fails.

What it checks, mechanically:

| Rule | The check |
|---|---|
| The page is a tabbed brief | `tabs: parts` and a `brief-id` in the front matter; the add-on block is present |
| Every stage says what to have, how long, and where to stop | Each part lede has `Have ready:`, `Takes about` and `Safe to stop` or `Do not stop` |
| Stable step ids | Every step has an explicit `{#s-...}` id, used once |
| Every step opens with a Why block | The marker comes first, then `**Why:**` with one or two sentences |
| The hands audit | Every Hands and Terminal step has `**Why this is yours (rung N, ...):**`, with a rung that fits the kind |
| Warning first | A step marked irreversible has `**Warning:**` straight after its Why lines |
| Date gates and decisions | A Date gate has a real `data-date`; a Decision is a `## Qn` section |
| Secrets only in the terminal | No secret-shaped value and no password field in the companion |
| Segments | Each one exists, is executable, has 1 to 6 stages with the preflight first, one page per stage, every hook, a second `safety_check` inside a stage at or after `DANGER_FROM` when it is set, no xtrace (`set -x`, `set -eux`, `set -o xtrace`, `bash -x`), and passes `bash -n` and `shellcheck` |
| Secrets stay off the screen and out of argv | No `echo` or `printf` of a secret-named variable unless the line sends it to a file or a pipe; no `Bearer $...`, `-u $...`, `--user $...` or `--password $...` on a command line |
| Background jobs | A segment that starts one gives an exact stop command on its pages and never says Ctrl-C |
| Data loss on a typo | A fail message that advises deleting something is listed as a `CHECK` |

It cannot judge whether a Why block is concrete, whether a lower rung would work, or whether a
menu path is current. Those stay with you (`references/hands-audit.md`).

```python
#!/usr/bin/env python3
"""wizard-lint: the mechanical rules of a peakstate-wizard companion and its segments.

    python3 wizard-lint.py <wizard>.md

Reads the companion source and every <segment>.sh beside it. Prints one line per
problem and exits 1 if any rule fails. CHECK lines are for a person to read and
never fail the run. Stdlib only. Written out by the peakstate-wizard skill.
"""
import datetime, re, shutil, subprocess, sys
from pathlib import Path

KINDS = {"Read", "Hands", "Terminal", "Claude", "Date gate", "Decision"}
RUNGS = {"Hands": {4, 5}, "Terminal": {3, 4, 5}}
SKIP_IDS = {"s-answers", "s-definitions", "s-provenance", "s-references", "s-contents"}
MARKER = re.compile(r'^<p class="wz-step" data-kind="([^"]+)"([^>]*)></p>$')
ATTR = re.compile(r'(data-[a-z-]+)="([^"]*)"')
HEAD = re.compile(r"^## (.+?)(?:\s*\{#(s-[a-z0-9-]+)\})?(?:\s*::.*)?$")
SECRET = [re.compile(p) for p in (r"\bsk-[A-Za-z0-9_-]{16,}", r"\bghp_[A-Za-z0-9]{20,}",
          r"\bAKIA[0-9A-Z]{16}\b", r"-----BEGIN [A-Z ]*PRIVATE KEY-----",
          r"\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}", r"<input[^>]*type=\"?password")]
BACKGROUND = re.compile(r"\bnohup\b|\bdisown\b|&\s*$", re.M)
FENCE = re.compile(r"^ {0,3}(`{3,}|~{3,})")
XTRACE = re.compile(r"(?:^|[;&|({]|\s)(?:set|(?:ba)?sh)\s+(?:-[A-Za-z]*x[A-Za-z]*|-o\s+xtrace)\b|^#!.*\s-[A-Za-z]*x", re.M)
SHOW = re.compile(r"\b(echo|printf)\b.*\$\{?\w*(key|pass|token|secret)", re.I)
SENT = re.compile(r"(?<![0-9&])>>?(?!&)|(?<!\|)\|(?!\|)")
ARGV = re.compile(r"Bearer\s+\$|(^|\s)(-u|--user|--password|--pass|--token)(\s+|=)[\"']?[^\s\"']*\$")


def paragraphs(lines):
    out, cur = [], []
    for l in lines + [""]:
        if l.strip():
            cur.append(l.strip())
        elif cur:
            out.append(" ".join(cur)); cur = []
    return out


def sentences(text):
    return len(re.findall(r"(?:\.|!|\?)(?:\s|$)", text))


def parse(md):
    """Parts and sections, with fenced code kept in the body but never parsed as headings."""
    parts, fence = [], None
    for l in md.split("\n"):
        m = FENCE.match(l)
        if m:
            fence = None if fence and m.group(1)[0] == fence else (fence or m.group(1)[0])
        if not fence and not m and l.startswith("# "):
            parts.append({"title": l[2:].strip(), "lede": [], "secs": []})
        elif not fence and not m and l.startswith("## ") and parts:
            parts[-1]["secs"].append({"head": l, "body": []})
        elif parts:
            (parts[-1]["secs"][-1]["body"] if parts[-1]["secs"] else parts[-1]["lede"]).append(l)
    return parts


def lint(src):
    md = src.read_text(encoding="utf-8")
    errs, checks, ids, pages = [], [], set(), {}
    fm = md.split("\n---", 1)[0] if md.startswith("---") else ""
    if "\ntabs: parts" not in fm:
        errs.append("front matter: needs 'tabs: parts' (parts are stages, sections are steps)")
    if "\nbrief-id:" not in fm:
        errs.append("front matter: needs a stable 'brief-id'")
    if "WIZARD_ADDON v1" not in md:
        errs.append("the companion add-on block is missing")
    for p in SECRET:
        if p.search(md):
            errs.append(f"secret-shaped value or password field in the companion ({p.pattern})")
    parts = parse(md)
    if not parts:
        errs.append("no '# ' parts: each stage is a part")
    for part in parts:
        lede = (paragraphs(part["lede"]) or [""])[0]
        if not re.search(r"Have ready: .+\.", lede) or not re.search(r"Takes about [^.]+\.", lede):
            errs.append(f"part '{part['title']}': the lede needs 'Have ready: ...' and 'Takes about ...'")
        if not re.search(r"Safe to stop|Do not stop", lede):
            errs.append(f"part '{part['title']}': the lede needs a 'Safe to stop' or 'Do not stop' line")
        for sec in part["secs"]:
            m = HEAD.match(sec["head"])
            name, sid = (m.group(1), m.group(2)) if m else (sec["head"], None)
            if name.strip() in ("Answers", "Definitions", "References", "Contents") or sid in SKIP_IDS:
                continue
            where = f"step '{name.strip()}'"
            if not sid:
                errs.append(f"{where}: needs an explicit stable id, such as {{#s-name}}")
            elif sid in ids:
                errs.append(f"{where}: id {sid} is used twice")
            ids.add(sid)
            paras = paragraphs(sec["body"])
            mk = MARKER.match(paras[0]) if paras else None
            if not mk:
                errs.append(f"{where}: the first line must be the <p class=\"wz-step\" data-kind=...></p> marker")
                continue
            kind, attrs = mk.group(1), dict(ATTR.findall(mk.group(2)))
            if kind not in KINDS:
                errs.append(f"{where}: unknown kind {kind!r}")
                continue
            rest = paras[1:]
            why = rest[0] if rest else ""
            if not why.startswith("**Why:**"):
                errs.append(f"{where}: the step must open with a **Why:** block")
            elif not 1 <= sentences(why[8:]) <= 2 or len(why) < 50:
                errs.append(f"{where}: the Why block needs one or two concrete sentences")
            nxt = 2
            if kind in RUNGS:
                hm = re.match(r"\*\*Why this is yours \(rung (\d)\b[^)]*\):\*\* \S", rest[1] if len(rest) > 1 else "")
                if not hm:
                    errs.append(f"{where}: a {kind} step needs '**Why this is yours (rung N, ...):**' after the Why block")
                elif int(hm.group(1)) not in RUNGS[kind]:
                    errs.append(f"{where}: rung {hm.group(1)} is not a {kind} rung ({sorted(RUNGS[kind])}); a lower rung is a Claude step")
                nxt = 3
            if attrs.get("data-irreversible") == "true" and not (len(rest) >= nxt and rest[nxt - 1].startswith("**Warning:**")):
                errs.append(f"{where}: an irreversible step states its **Warning:** first, straight after the Why lines")
            if kind == "Date gate":
                try:
                    datetime.date.fromisoformat(attrs.get("data-date", ""))
                except ValueError:
                    errs.append(f"{where}: a Date gate needs data-date=\"YYYY-MM-DD\"")
            if kind == "Decision" and not re.match(r"(Q\d+\b|Your Q\d+ answer)", name):
                errs.append(f"{where}: a Decision step is a question section, '## Qn ...'")
            if kind == "Terminal":
                seg, n = attrs.get("data-segment"), attrs.get("data-stage", "")
                if not seg or not n.isdigit():
                    errs.append(f"{where}: a Terminal step needs data-segment and data-stage")
                else:
                    pages.setdefault(seg, []).append((int(n), "\n".join(sec["body"])))
    for seg, got in pages.items():
        errs += lint_segment(src.parent / f"{seg}.sh", seg, got, checks)
    return errs, checks


def lint_segment(sh, seg, got, checks):
    errs, where = [], f"segment {seg}"
    if not sh.is_file():
        return [f"{where}: {sh.name} is missing beside the companion"]
    text = sh.read_text(encoding="utf-8")
    names = re.search(r"^NAMES=\(\"\"((?:\s+\"[^\"]*\")+)\s*\)", text, re.M)
    stages = re.findall(r"\"([^\"]*)\"", names.group(1)) if names else []
    if not 1 <= len(stages) <= 6:
        errs.append(f"{where}: NAMES must list 1 to 6 stages, found {len(stages)}")
    elif not stages[0].startswith("Preflight"):
        errs.append(f"{where}: stage 1 must be the preflight (its name starts 'Preflight')")
    nums = sorted(n for n, _ in got)
    if nums != list(range(1, len(stages) + 1)):
        errs.append(f"{where}: the companion has pages for stages {nums}, the script has {len(stages)}")
    for i in range(1, len(stages) + 1):
        for fn in (f"require_{i}", f"stage_{i}"):
            if not re.search(rf"^{fn}\(\)", text, re.M):
                errs.append(f"{where}: {fn}() is missing")
    if f'SEGMENT="{seg}"' not in text:
        errs.append(f"{where}: SEGMENT must be \"{seg}\" to match the companion")
    for need in ("WIZARD_SEGMENT_LIB v1", "safety_check()", "restore_safe()", "verify_end_state()", "SAFE_BY_HAND=", 'main "$@"'):
        if need not in text:
            errs.append(f"{where}: {need} is missing (copy the library and fill every hook)")
    authored = text.split("# ── STAGES", 1)[-1]
    danger = re.search(r"^DANGER_FROM=(\d+)", text, re.M)
    if danger and int(danger.group(1)) > 0:
        bodies = re.findall(r"^stage_(\d+)\(\)\s*\{\s*\n(.*?)^\}", authored, re.M | re.S)
        if not any(int(n) >= int(danger.group(1)) and re.search(r"^\s+safety_check\s*$", b, re.M) for n, b in bodies):
            errs.append(f"{where}: DANGER_FROM is set, so a stage at or after stage {danger.group(1)} must run safety_check again right before the dangerous moment")
    if XTRACE.search(text):
        errs.append(f"{where}: xtrace is on (set -x, set -o xtrace or bash -x), which prints every secret the script handles")
    for l in re.sub(r"\\\n\s*", " ", authored).splitlines():   # a backslash-continued command is one line
        if l.lstrip().startswith("#"):
            continue
        if SHOW.search(l) and not SENT.search(l):
            errs.append(f"{where}: an echo or printf shows a secret-named variable on screen: {l.strip()[:100]}")
        if ARGV.search(l):
            errs.append(f"{where}: a secret on a command line, where ps can list it; pass it on stdin or in a 600 file: {l.strip()[:100]}")
        if re.search(r"fail [^\n]*\b(delete|rm |erase|wipe|start again from scratch)", l, re.I):
            checks.append(f"{where}: a fail message advises deleting something; check a typo cannot be the cause: {l.strip()[:100]}")
    if BACKGROUND.search(authored):
        body = "\n".join(b for _, b in got)
        if "Ctrl-C" in body:
            errs.append(f"{where}: it starts a background job, so the pages must not say Ctrl-C; give the exact stop command")
        if not re.search(r"`[^`]*\b(kill|stop)\b[^`]*`", body):
            errs.append(f"{where}: it starts a background job, so a page must give the exact stop command in backticks")
    r = subprocess.run(["bash", "-n", str(sh)], capture_output=True, text=True)
    if r.returncode:
        errs.append(f"{where}: bash -n failed: {r.stderr.strip()[:200]}")
    if shutil.which("shellcheck"):
        r = subprocess.run(["shellcheck", "--severity=warning", str(sh)], capture_output=True, text=True)
        if r.returncode:
            errs.append(f"{where}: shellcheck failed:\n{r.stdout.strip()[:600]}")
    else:
        checks.append(f"{where}: shellcheck is not installed, so only bash -n ran")
    if not sh.stat().st_mode & 0o100:
        errs.append(f"{where}: not executable (chmod +x {sh.name})")
    return errs


def main(argv):
    if len(argv) != 1 or not Path(argv[0]).is_file():
        print("usage: wizard-lint.py <wizard>.md"); return 64
    errs, checks = lint(Path(argv[0]))
    for e in errs:
        print("FAIL", e)
    for c in checks:
        print("CHECK", c)
    print(f"wizard lint {'FAILED' if errs else 'PASS'}: {len(errs)} problem(s), {len(checks)} to check by hand")
    return 1 if errs else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
```
