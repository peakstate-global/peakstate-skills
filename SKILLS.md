# Skills in this repo

One line per skill. Every one follows the [Agent Skills](https://agentskills.io)
`SKILL.md` standard, so it works in Claude Code, GitHub Copilot, Cursor, Gemini
CLI and anything else that reads the format.

| Skill | What it does | Portable without a filesystem? |
|---|---|---|
| [peakstate-brief](skills/peakstate-brief/) | Builds an interactive HTML brief the reader answers in the browser — tick-off questions, inline answers that persist, selection comments, and one-click Copy/Download of the responses as JSON | **Yes.** `assets/make-portable.py` writes a five-file drop-in cut — a short `SKILL.md`, the template, the runtime pair and an inliner — for hosts with no developer machine, so a brief built in a chat tool is still one self-contained file. See [INSTALL.md](skills/peakstate-brief/INSTALL.md) |
| [peakstate-retro](skills/peakstate-retro/) | Reads your own coding-agent session history (Claude Code, Codex or pi) and reports how you actually work: repeated requests, correction loops, skill and hook candidates, and tooling you built but do not use. User-triggered only | **No.** It reads local transcript files and runs its own scripts, so it needs a developer machine |
| [sourced-lite](skills/sourced-lite/) | Restates an idea or claim in its strongest form and waits for you to confirm it, then labels each claim by where it came from, records the decisions that shaped the result, argues the case against it, and ends with a final position and a provenance block. A cut-down version of the SOURCED method | **Yes.** Markdown only |
| [brief-lite](skills/brief-lite/) | Builds one self-contained HTML brief that opens with the answer, asks numbered questions with answer boxes, takes simple comments on selected text, footnotes its sources, and exports the responses with Copy or Download in the same JSON shape as peakstate-brief | **Yes.** Markdown only |
| [blind-spots](skills/blind-spots/) | Confirms its reading of an argument, then ranks the unstated assumptions with a cheap test for the top three, and names possible cognitive biases and logical fallacies, each with the quoted passage, the most generous reading, a confidence and a checking question | **Yes.** Markdown only |
| [root-cause](skills/root-cause/) | Guides a team from a symptom to a problem statement, containment, a 5 Whys, fishbone or Pareto analysis drawn as a diagram and a text tree, two or three suspected causes with confirming evidence, and a first fix with reach, reversal and a rollback trigger | **Yes.** Markdown only |

## Conventions every skill here follows

- **No install location is assumed.** A skill addresses its own bundled files as
  `<skill-dir>/…`, resolved from wherever it was loaded — never a hardcoded home
  path. It installs as a plugin, as a project `.claude/skills/` folder, at user
  level, on Windows, or in OneDrive.
- **No Unix shell is assumed.** Instructions say "copy X to Y", not `cp`.
- **Versioned assets are pinned to a git tag, never a branch**, so a document
  already in someone's hands keeps rendering the way it did when it was made.
- **`scripts/check-no-leaks.py` enforces the first two** at commit time, along
  with dead relative links and shellcheck. Run the rules alone with
  `python3 scripts/check-no-leaks.py --selftest`.
- **`scripts/release-check.sh` is the hand-off gate.** It runs every selftest, the
  leak guard over the tree, `scripts/check-skill-contract.py` (the folder, front-matter
  and section contract every new skill meets), `scripts/check-inventory.py` (every
  folder is in `skills/PUBLIC` and has a row here) and a markdown-only portable cut of
  each new skill. Evals live in [evals/](evals/README.md).
