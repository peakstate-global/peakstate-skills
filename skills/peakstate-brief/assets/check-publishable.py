#!/usr/bin/env python3
"""Scan a rendered brief for material that must not be published.

    python3 check-publishable.py <brief.html|brief.md> [more ...]
    python3 check-publishable.py --json <brief.html>      machine-readable findings
    python3 check-publishable.py --terms <file> <brief>   extra private terms, one per line
    python3 check-publishable.py --self-check             run the built-in cases

A brief is written for one reader who already knows everything about the author.
Publishing it sends it to a stranger. This finds the sentences that only make
sense to the first reader, and the ones that give away things the second reader
has no business seeing.

Four classes, refuse by default:

  personal   the author and their family, their health metrics, their money,
             their nav objectives and checkpoints, employer-internal detail
  tooling    how the brief was made: corpus searches, named skills, agent
             mechanics, absolute paths, private repo names
  secret     tokens, client ids, database refs, internal hosts, login-walled URLs
  others     other people's private material: clients, testimonials, job
             applications, anything out of the vault

The exit code is NOT the interface. A caller wants the findings, so it can offer
sanitise / block / publish-anyway on each one. Exit 1 only means "findings
exist", and exit 2 means the scan itself failed.

Every finding carries a `suggestion`: a concrete replacement where one is
mechanically derivable, and None where the only honest answer is to cut the
sentence. Most are None on purpose. A scanner that invents a rewrite for a
sentence about someone's HRV is worse than one that says "delete this".

Names of real people cannot live in this file, because this repo is public.
Put them one per line in ~/.claude/brief-private-terms.txt (or pass --terms).
Blank lines and #-comments are ignored; each line is matched whole-word,
case-insensitively.
"""

import argparse
import json
import os
import re
import sys
from pathlib import Path

DEFAULT_TERMS = Path.home() / ".claude" / "brief-private-terms.txt"

# Regions of a rendered brief that are machinery, not content. Blanked out, line
# for line, so every line_no still matches the file on disk.
#
# Non-greedy pairs, not a tag counter. A rendered brief inlines the whole runtime,
# and that runtime contains the strings "<script", "<style" and "<body" inside JS
# and CSS. Counting tags leaves the depth stuck open and silently swallows the
# document — which is a scanner that reports every brief clean. Pairing to the
# first real closing tag is what a browser does, and it is right for the same
# reason: an escaped `<\/script>` in a JS string is not a closing tag.
SKIP_REGION = re.compile(r"<(script|style)\b[^>]*>.*?</\1\s*>", re.S | re.I)


class Rule:
    """One pattern, one class, one explanation.

    `gate` is a second pattern that must also match the line. It is what keeps
    the metric words quiet when a brief discusses sleep as a research topic
    rather than as the author's own number.
    """

    def __init__(self, cls, pattern, why, suggest=None, gate=None, flags=re.I):
        self.cls = cls
        self.pattern = re.compile(pattern, flags)
        self.why = why
        self.suggest = suggest
        self.gate = re.compile(gate, flags) if gate else None


def _redact_path(m):
    """An absolute home path -> the part from LOCAL-DEV onward, else None."""
    parts = m.group(0).split("/")
    for anchor in ("LOCAL-DEV", "Documents", "Downloads"):
        if anchor in parts:
            tail = parts[parts.index(anchor) + 1 :]
            if tail:
                return "/".join(tail)
    return None


# The author's own metrics. Gated: these words are ordinary research vocabulary,
# and only become private when the sentence attaches them to a person.
POSSESSIVE = r"\b(?:your|my|his|her|their|you're|I'm)\b|\bbaseline\b|\bsits (?:at|around)\b|\bcurrently\b|\btarget(?:s|ing)?\b|\baverag(?:e|es|ing)\b"

RULES = [
    # ---- 1. the author and their family -------------------------------------
    Rule("personal", r"\bfulfil?l?ment\s+(?:baseline|score|rating)\b",
         "the author's own fulfilment score"),
    Rule("personal", r"\bfulfil?l?ment\b[^.]{0,40}?\b\d{1,2}\s*/\s*10\b",
         "the author's own fulfilment score"),
    Rule("personal", r"\b\d{1,2}\s*/\s*10\b",
         "a self-rating score, which is the author's own check-in data",
         gate=r"\bfulfil|\bscore|\bcheck-?in|\benergy|\bmood"),
    Rule("personal", r"\b(?:HRV|heart[- ]rate variability)\b",
         "a personal health metric", gate=POSSESSIVE),
    Rule("personal", r"\bbody fat\b",
         "a personal body-composition metric", gate=POSSESSIVE),
    Rule("personal", r"\bsleep\b",
         "sleep as the author's own metric rather than as a research topic",
         gate=r"\b(?:your|my|his|her)\s+sleep\b|\bsleep\s+(?:baseline|target)\b"),
    Rule("personal", r"\b\d{1,2}\s*[-–]\s*\d{1,2}\s*(?:good\s+)?hours?\b",
         "a personal sleep figure",
         gate=r"\bsleep\b|\bnight\b"),
    # Life Foundations and the nav vocabulary. This is the private coaching model
    # and naming it tells a stranger the brief came out of a coaching system.
    Rule("personal", r"\b(?:Vibration|Coupling|Health|Wealth|Calling)\s+(?:foundation|objective|strand)\b",
         "a Life Foundation, which is private coaching vocabulary", flags=0),
    Rule("personal", r"\bLife Foundations?\b", "private coaching vocabulary"),
    Rule("personal", r"\b(?:Expression|Character)\b",
         "a named strand of a Life Foundation",
         gate=r"\bfoundation\b|\bVibration\b", flags=0),
    Rule("personal", r"\bnav\s+(?:objective|action|project|checkpoint|memory|entry|data)\w*\b",
         "the author's nav app data"),
    Rule("personal", r"\bPS memory\b", "the author's nav app memory store"),
    Rule("personal", r"\bkey results?\b|\bOKRs?\b",
         "the author's private objectives"),
    Rule("personal", r"\b(?:your|my|his|her)\s+(?:\w+\s+){0,2}objectives?\b",
         "the author's private objectives"),
    Rule("personal", r"\bcheckpoints?\b",
         "a nav check-in record", gate=r"\bnav\b|\blogged\b|\bthis year\b"),
    Rule("personal", r"\bWord of (?:the )?Year\b", "private coaching vocabulary"),
    # money
    Rule("personal", r"\b(?:salary|base pay|day rate|net worth|remuneration|pay band|super(?:annuation)? balance)\b",
         "the author's own money"),
    # Money only when the sentence attaches it to a person. A brief about the
    # gold price is full of dollar figures and none of them are anybody's.
    Rule("personal", r"\$\s?\d[\d,.]*\s*(?:[KkMm]\b|million|billion)?",
         "a money figure attached to the author",
         gate=r"\bsalary\b|\bbase pay\b|\bpay band\b|\bmy (?:rate|fee|pay|salary)\b"
              r"|\byour (?:rate|fee|pay|salary)\b|\bnet worth\b|\bday rate\b"
              r"|\btake-home\b|\bpaid me\b|\bI (?:earn|charge|invoice)\b"),
    Rule("personal", r"\bgrade\b", "the author's employment grade",
         gate=r"\bband\b|\bpay\b|\bsalary\b"),
    # employer-internal
    Rule("personal", r"\b(?:CBA|Commonwealth Bank|Aware Super|QSuper|Office of the CIO)\b",
         "a named employer and employer-internal detail", flags=0),
    Rule("personal", r"\bAndrew\b|\bRamsden\b", "the author named", flags=0),

    # ---- 2. tooling exhaust --------------------------------------------------
    Rule("tooling", r"\bPRIMA\b", "the author's private library named", flags=0),
    Rule("tooling", r"\bcorpus\b",
         "a search of the author's private library described as method"),
    Rule("tooling", r"\b(?:searched|search(?:ing)?|queried)\s+(?:the\s+)?(?:library|corpus|artefacts?)\b",
         "the retrieval mechanics of a private library"),
    Rule("tooling", r"\b\d{2,4}[-–+]?\s*(?:plus\s*)?artefacts?\b",
         "the size of the author's private library"),
    Rule("tooling", r"/(?:Users|home)/[A-Za-z0-9._-]+(?:/[^\s\"'<>)\]]+)*",
         "an absolute path from the author's machine", suggest=_redact_path),
    Rule("tooling", r"(?<![\w/])/(?:nav-pull|nav-push|driver|to-driver|flush|prima|to-prima|sourced|impeccable|handoff|commit|merge|push|prune|options|voice|wizard|prototype|to-spec|to-tickets|implement|share-brief|brief-comments|publish-brief|localhost)\b",
         "a named skill or slash command, which is workflow narration"),
    Rule("tooling", r"\bpeakstate-(?:brief|deck|skills)\b|\birama-skills\b|\bXCOACH\b",
         "a private repo or skill name", flags=0),
    Rule("tooling", r"\badversarial (?:pass|review|reviewer)\b|\bsub-?agent\b|\bfresh thread\b|\bcross-model pass\b",
         "agent mechanics behind the brief"),
    Rule("tooling", r"\bClaude Code\b|\bcodex\b|\bOpus 5\b|\bclaude-opus\b",
         "the tooling the brief was written with", flags=0),
    Rule("tooling", r"\blocalStorage\b|\blocalhost:\d+\b",
         "local runtime detail"),

    # ---- 3. secrets and private infrastructure -------------------------------
    Rule("secret", r"\b(?:sk|pk|ory_[a-z]+|ghp|gho|github_pat|xox[baprs])[-_][A-Za-z0-9_-]{12,}",
         "what looks like an API token or key", flags=0),
    Rule("secret", r"\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}", "a JWT", flags=0),
    Rule("secret", r"\b[A-Z0-9_]*(?:TOKEN|SECRET|API_KEY|CLIENT_ID|PASSWORD)\b\s*[:=]\s*\S+",
         "an assigned credential", flags=0),
    Rule("secret", r"\b[a-z]{20}\.supabase\.co\b", "a Supabase project ref"),
    Rule("secret", r"https?://[A-Za-z0-9.-]*\b(?:peakstate\.global|irama\.org)\b[^\s\"'<>)\]]*",
         "a login-walled internal URL"),
    Rule("secret", r"\b(?:nav|prima|publish|status|zero|wealth|book|books)\.(?:peakstate\.global|irama\.org)\b",
         "an internal hostname"),
    Rule("secret", r"\bMARIPOSA\b|\bOry Hydra\b|\bFAS\b|\bFleet Agent Surface\b",
         "private infrastructure", flags=0),

    # ---- 4. other people's private material ----------------------------------
    Rule("others", r"\bObsidian\b|\bPRIMA \(iCloud\)\b", "the author's private vault", flags=0),
    Rule("others", r"\btestimonials?\b", "a client testimonial"),
    Rule("others", r"\bcover letters?\b|\bjob applications?\b|\bthe CV\b|\bmy CV\b",
         "job-application material"),
    Rule("others", r"\bclient (?:name|list|work|engagement)\b", "a client's private material"),
]


def load_terms(path):
    """Extra private terms, one per line. Missing file is not an error."""
    if not path or not Path(path).exists():
        return []
    lines = Path(path).read_text(encoding="utf-8").splitlines()
    terms = [l.strip() for l in lines if l.strip() and not l.lstrip().startswith("#")]
    return [
        Rule("personal", r"\b" + re.escape(t) + r"\b", "a private term from the local terms list")
        for t in terms
    ]


def content_lines(text):
    """Yield (line_no, line) skipping <script> and <style> regions.

    A rendered brief carries the whole runtime inlined. Scanning it produces
    nothing but noise, and skipping the regions rather than the lines keeps
    every line_no true to the file on disk.
    """
    text = SKIP_REGION.sub(lambda m: "\n" * m.group(0).count("\n"), text)
    for i, line in enumerate(text.splitlines(), 1):
        if line.strip():
            yield i, line


def scan_text(text, rules):
    """Findings for one document.

    Each line is matched against itself joined to the next content line, because
    markdown wraps a sentence across lines and half of what matters here is a
    phrase ("fulfilment baseline", "your Vibration objective"). Only matches
    that *start* on the current line are kept, so nothing is reported twice and
    line_no is always the line the reader has to go and edit.
    """
    findings = []
    lines = list(content_lines(text))
    for idx, (line_no, line) in enumerate(lines):
        # join only to the physically next line: a blank line ends a paragraph,
        # and joining across one invents phrases the document never contained.
        nxt = ""
        if idx + 1 < len(lines) and lines[idx + 1][0] == line_no + 1:
            nxt = lines[idx + 1][1]
        hay = line + "\n" + nxt
        for rule in rules:
            if rule.gate and not rule.gate.search(hay):
                continue
            for m in rule.pattern.finditer(hay):
                if m.start() >= len(line):
                    continue
                matched = " ".join(m.group(0).split())
                if len(matched) > 120:
                    matched = matched[:117] + "..."
                findings.append({
                    "line_no": line_no,
                    "matched_text": matched,
                    "class": rule.cls,
                    "why": rule.why,
                    "suggestion": rule.suggest(m) if rule.suggest else None,
                })
    findings.sort(key=lambda f: (f["line_no"], f["matched_text"]))
    return findings


def scan_file(path, rules):
    return scan_text(Path(path).read_text(encoding="utf-8", errors="replace"), rules)


def print_table(path, findings):
    if not findings:
        print(f"{path}: clean")
        return
    print(f"\n{path}: {len(findings)} finding(s)")
    print(f"  {'line':>6}  {'class':<8}  {'match':<44}  why / suggestion")
    print(f"  {'-'*6}  {'-'*8}  {'-'*44}  {'-'*40}")
    for f in findings:
        match = f["matched_text"].replace("\t", " ")
        if len(match) > 44:
            match = match[:41] + "..."
        print(f"  {f['line_no']:>6}  {f['class']:<8}  {match:<44}  {f['why']}")
        if f["suggestion"]:
            print(f"  {'':>6}  {'':<8}  {'':<44}  -> {f['suggestion']}")


# --------------------------------------------------------------------------
# self-check

CASE_CLEAN = """# Awe and the built environment

Ceiling height changes how people think. A 2007 study found that a higher
ceiling primes abstract processing, and a lower one primes the concrete.

Infrasound below 20 Hz is inaudible, and a 2003 concert study reported that
roughly a fifth of listeners felt unease they could not account for.

## What this means

Sacred architecture has used height for a very long time.
"""

CASE_NEAR_MISS = """# Sleep research

Sleep pressure builds across the waking day. The literature on sleep and
memory consolidation is large and the replication record is reasonable.
Slow-wave sleep is when most of it happens.
"""

CASE_PERSONAL = """Your Vibration foundation names Expression, and your fulfilment
baseline sits around 4/10 on ordinary days.
"""

# The two fixtures below are assembled from parts rather than written out. This
# repo is public and its leak guard blocks an absolute home path and a private
# app domain — correctly, and it cannot tell a test fixture from a real leak.
# Fixtures that trip the guard on every commit get deleted, so they are built
# instead, and the guard stays honest.
_HOME = "/" + "Users" + "/someone"
_HOST = "nav" + "." + "peakstate" + ".global"

CASE_TOOLING = f"""I searched the corpus and PRIMA held nothing on this.
The source is at {_HOME}/LOCAL-DEV/notes/docs/research/x.md and I ran
/nav-pull first. Adversarial pass: same-model fresh thread.
"""

CASE_SECRET = f"""Set NAV_TOKEN=ory_at_abcdefghijklmnop1234 and point it at
https://{_HOST}/api/v1/bundle before you start.
"""


def self_check():
    rules = RULES
    failures = []

    def check(name, text, want_classes, want_empty=False):
        got = scan_text(text, rules)
        classes = {f["class"] for f in got}
        if want_empty:
            if got:
                failures.append(f"{name}: expected zero findings, got {got}")
            return
        missing = set(want_classes) - classes
        if missing:
            failures.append(f"{name}: missing classes {sorted(missing)}; got {sorted(classes)}")

    # 1. a brief with none of the four classes is clean
    check("clean brief", CASE_CLEAN, [], want_empty=True)
    # 2. the near miss: sleep as a research topic, not as a personal metric
    check("near miss (sleep as topic)", CASE_NEAR_MISS, [], want_empty=True)
    # 3. the three positives
    check("personal", CASE_PERSONAL, ["personal"])
    check("tooling", CASE_TOOLING, ["tooling"])
    check("secret", CASE_SECRET, ["secret"])

    # the personal case must name all three of its private things
    got = " ".join(f["matched_text"].lower() for f in scan_text(CASE_PERSONAL, rules))
    for want in ("vibration foundation", "expression", "fulfilment"):
        if want not in got:
            failures.append(f"personal case: did not catch {want!r}")

    # a path finding must offer a usable replacement
    paths = [f for f in scan_text(CASE_TOOLING, rules) if f["matched_text"].startswith("/Users/")]
    if not paths:
        failures.append("tooling case: no absolute path finding")
    elif paths[0]["suggestion"] != "notes/docs/research/x.md":
        failures.append(f"path suggestion wrong: {paths[0]['suggestion']!r}")

    # <script> regions are machinery, not content
    noisy = "<script>\nvar salary = 'your HRV baseline';\n</script>\nclean line\n"
    if scan_text(noisy, rules):
        failures.append("script region was scanned")
    # ...and line numbers survive the skip
    after = scan_text(noisy.replace("clean line", "I searched the corpus"), rules)
    if not after or after[0]["line_no"] != 4:
        failures.append(f"line number after a skipped region is wrong: {after}")

    # a real rendered brief inlines a runtime that mentions "<script" in its own
    # source. Tag counting never recovers from that and reports the document
    # clean; pairing to the first real close tag does.
    hostile = (
        "<p>I searched the corpus.</p>\n"
        "<script>\n"
        "var s = '<script' + '>'; var b = '<body>';\n"
        "</script>\n"
        "<p>Your Vibration foundation.</p>\n"
    )
    got = scan_text(hostile, rules)
    if not any(f["line_no"] == 5 for f in got):
        failures.append(f"content after an inlined runtime was swallowed: {got}")
    if any("var s" in f["matched_text"] for f in got):
        failures.append("runtime source was scanned as content")

    for f in failures:
        print(f"FAIL  {f}")
    print(f"\n{'FAILED' if failures else 'PASS'}  {len(failures)} failure(s)")
    return 1 if failures else 0


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("files", nargs="*", help="rendered briefs (.html) or their markdown")
    ap.add_argument("--json", action="store_true", help="emit findings as JSON")
    ap.add_argument("--terms", default=os.environ.get("BRIEF_PRIVATE_TERMS", DEFAULT_TERMS),
                    help="file of extra private terms, one per line")
    ap.add_argument("--self-check", action="store_true", help="run the built-in cases")
    args = ap.parse_args()

    if args.self_check:
        return self_check()
    if not args.files:
        ap.error("give at least one file, or --self-check")

    rules = RULES + load_terms(args.terms)
    report = {}
    for path in args.files:
        try:
            report[path] = scan_file(path, rules)
        except OSError as e:
            print(f"{path}: cannot read: {e}", file=sys.stderr)
            return 2

    if args.json:
        json.dump(report, sys.stdout, indent=2)
        print()
    else:
        for path, findings in report.items():
            print_table(path, findings)
        total = sum(len(f) for f in report.values())
        print(f"\n{total} finding(s) across {len(report)} file(s)")

    return 1 if any(report.values()) else 0


if __name__ == "__main__":
    sys.exit(main())
