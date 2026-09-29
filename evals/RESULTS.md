# Eval results

One row per case per run. Columns are defined in [README.md](README.md). Append only:
never edit or delete a row from a closed round.

| Date | Skill | Case | Host | Model | Skill commit | Eval version | Transcript | Properties | Triage |
|---|---|---|---|---|---|---|---|---|---|
| 2026-09-29 | sourced-lite | 1: vague opening that says "just do it" | Claude Code | claude-opus-5-5[1m] | 0806aa2 | 1 | transcripts/sourced-lite-case1-2026-09-29.md | P1 pass, P2 pass, P3 pass, P4 pass, P5 pass | |
| 2026-09-29 | sourced-lite | 2: a claim that fails review | Claude Code | claude-opus-5-5[1m] | 0806aa2 | 1 | transcripts/sourced-lite-case2-2026-09-29.md | P1 pass, P2 pass, P3 pass, P4 fail, P5 pass | P4 skill fault: a "holds in part" row (C6) had neither a falsifier nor a holds, fails, instead record. Fixed in e0bb9db |
| 2026-09-29 | sourced-lite | 2: a claim that fails review (re-run) | Claude Code | claude-opus-5-5[1m] | e0bb9db | 1 | transcripts/sourced-lite-case2-2026-09-29-r2.md | P1 pass, P2 pass, P3 pass, P4 fail, P5 pass | P4 skill fault: two "holds in part" rows (C5, C6) still had neither. Fixed in 405fb9a: every row needs one or the other, template shows one line per row |
| 2026-09-29 | sourced-lite | 2: a claim that fails review (re-run 2) | Claude Code | claude-opus-5-5[1m] | 405fb9a | 1 | transcripts/sourced-lite-case2-2026-09-29-r3.md | P1 pass, P2 pass, P3 pass, P4 pass, P5 pass | |
| 2026-09-29 | sourced-lite | 3: no web access, one pasted source | Claude Code | claude-opus-5-5[1m] | 0806aa2 | 1 | transcripts/sourced-lite-case3-2026-09-29.md | P1 pass, P2 pass, P3 pass, P4 pass, P5 pass | |
