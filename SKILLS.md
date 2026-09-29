# Skills in this repo

One line per skill. Every one follows the [Agent Skills](https://agentskills.io)
`SKILL.md` standard, so it works in Claude Code, GitHub Copilot, Cursor, Gemini
CLI and anything else that reads the format.

| Skill | What it does | Portable without a filesystem? |
|---|---|---|
| [peakstate-brief](skills/peakstate-brief/) | Builds an interactive HTML brief the reader answers in the browser — tick-off questions, inline answers that persist, selection comments, and one-click Copy/Download of the responses as JSON | **Yes.** `assets/make-portable.py` writes a five-file drop-in cut — a short `SKILL.md`, the template, the runtime pair and an inliner — for hosts with no developer machine, so a brief built in a chat tool is still one self-contained file. See [INSTALL.md](skills/peakstate-brief/INSTALL.md) |
| [peakstate-retro](skills/peakstate-retro/) | Reads your own coding-agent session history (Claude Code, Codex or pi) and reports how you actually work: repeated requests, correction loops, skill and hook candidates, and tooling you built but do not use. User-triggered only | **No.** It reads local transcript files and runs its own scripts, so it needs a developer machine |

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
