# Single-file skills

Each folder here holds one skill as a single `SKILL.md`, with its reference files and sources inlined.
Use these where a host or marketplace accepts one Markdown file per skill.

They are build outputs. The source of each skill is its folder under [`skills/`](../skills/), where
`SKILL.md` opens its `references/` files at the steps that need them, so that `SKILL.md` alone is not
the complete skill. Edit the source, then rebuild into an empty folder with
`python3 scripts/make-portable.py skills/<name> <empty-folder> --md-only --single-file`.
It writes `<empty-folder>/<name>/SKILL.md`. Copy that file over `dist/<name>/SKILL.md`.
