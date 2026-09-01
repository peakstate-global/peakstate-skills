# Skills in this repo

One line per skill. Every one follows the [Agent Skills](https://agentskills.io)
`SKILL.md` standard, so it works in Claude Code, GitHub Copilot, Cursor, Gemini
CLI and anything else that reads the format.

| Skill | What it does | Portable without a filesystem? |
|---|---|---|
| [peakstate-brief](skills/peakstate-brief/) | Builds an interactive HTML brief the reader answers in the browser — tick-off questions, inline answers that persist, selection comments, and one-click Copy/Download of the responses as JSON | **Yes.** `assets/brief-standalone.html` loads the runtime from a version-pinned CDN, so a chat tool or Microsoft 365 Copilot CoWork can produce a working brief with nothing to copy. See [INSTALL.md](skills/peakstate-brief/INSTALL.md) |

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
