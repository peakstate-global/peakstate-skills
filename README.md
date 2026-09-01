# peakstate-skills

Portable [Agent Skills](https://agentskills.io) from Peak State Global. One
`SKILL.md` per skill, plus whatever it bundles — no install location assumed, no
Unix shell assumed, nothing pointing at one person's machine.

See [SKILLS.md](SKILLS.md) for what is in here.

## Install

### As a plugin (Claude Code)

```bash
/plugin marketplace add peakstate-global/peakstate-skills
/plugin install peakstate-skills
```

Skills arrive namespaced, e.g. `/peakstate-skills:peakstate-brief`.

### As a folder (any agent that reads SKILL.md)

Clone it, then put a skill's folder wherever your tool discovers skills — a
user-level skills directory, a project's `.claude/skills/`, or for Microsoft 365
Copilot CoWork, `Documents/Cowork/Skills/` in OneDrive.

```bash
git clone https://github.com/peakstate-global/peakstate-skills.git
```

### In a chat tool with no filesystem

Attach or paste the skill's `SKILL.md` and ask for what it builds. Where a skill
ships a browser runtime, it also ships a standalone build that loads from a
version-pinned CDN, so a single self-contained file works with nothing to copy.

## Contributing

The commit guard (`scripts/check-no-leaks.py`, wired through `.githooks/`) blocks
the things that quietly break a public skill: a hardcoded install path, a dead
relative link, a shell script shellcheck rejects, and anything that looks like a
credential. Enable the hooks after cloning:

```bash
git config core.hooksPath .githooks
```

## Licence

MIT — see [LICENSE](LICENSE).
