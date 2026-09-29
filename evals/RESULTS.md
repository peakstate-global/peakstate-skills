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
| 2026-09-29 | brief-lite | 1: clear request, readers must decide | Claude Code | claude-opus-5-5[1m] | 99f3d14 | 1 | transcripts/brief-lite-case1-2026-09-29.md | P1 pass, P2 pass, P3 pass, P4 pass, P5 pass, P6 pass | |
| 2026-09-29 | brief-lite | 2: "just build it" with gaps | Claude Code | claude-opus-5-5[1m] | 99f3d14 | 1 | transcripts/brief-lite-case2-2026-09-29.md | P1 pass, P2 pass, P3 pass, P4 pass | |
| 2026-09-29 | brief-lite | 3: sources and a recalled fact | Claude Code | claude-opus-5-5[1m] | 99f3d14 | 1 | transcripts/brief-lite-case3-2026-09-29.md | P1 pass, P2 pass, P3 pass, P4 pass | |
| 2026-09-29 | blind-spots | 1: a sound argument | Claude Code | claude-opus-5-5[1m] | 7429a78 | 1 | transcripts/blind-spots-case1-2026-09-29.md | P1 pass, P2 fail, P3 pass, P4 pass, P5 pass | P2 skill fault: only low-confidence findings, but no plain "no clear bias or fallacy" line. Fixed in 648ab70 |
| 2026-09-29 | blind-spots | 2: an argument with real flaws | Claude Code | claude-opus-5-5[1m] | 7429a78 | 1 | transcripts/blind-spots-case2-2026-09-29.md | P1 pass, P2 pass, P3 pass, P4 pass, P5 pass | |
| 2026-09-29 | blind-spots | 3: "find everything wrong with my opponent" | Claude Code | claude-opus-5-5[1m] | 7429a78 | 1 | transcripts/blind-spots-case3-2026-09-29.md | P1 pass, P2 pass, P3 pass, P4 pass, P5 pass | |
| 2026-09-29 | blind-spots | 1: a sound argument (re-run) | Claude Code | claude-opus-5-5[1m] | 648ab70 | 1 | transcripts/blind-spots-case1-2026-09-29-r2.md | P1 pass, P2 fail, P3 pass, P4 pass, P5 pass | P2 skill fault: a medium-confidence false cause on a passage that draws no inference, repeating assumption A1. Fixed in 5f29d30: an unstated link is an assumption, never counted twice |
| 2026-09-29 | blind-spots | 1: a sound argument (re-run 2) | Claude Code | claude-opus-5-5[1m] | 5f29d30 | 1 | transcripts/blind-spots-case1-2026-09-29-r3.md | P1 pass, P2 pass, P3 pass, P4 pass, P5 pass | |
| 2026-09-29 | blind-spots | 2: an argument with real flaws (re-run on final commit) | Claude Code | claude-opus-5-5[1m] | 5f29d30 | 1 | transcripts/blind-spots-case2-2026-09-29-r2.md | P1 pass, P2 pass, P3 pass, P4 pass, P5 pass | |
| 2026-09-29 | blind-spots | 3: "find everything wrong with my opponent" (re-run on final commit) | Claude Code | claude-opus-5-5[1m] | 5f29d30 | 1 | transcripts/blind-spots-case3-2026-09-29-r2.md | P1 pass, P2 pass, P3 pass, P4 pass, P5 pass | |
| 2026-09-29 | root-cause | 1: the obvious answer is to blame a person | Claude Code | claude-opus-5-5[1m] | ed2883f | 1 | transcripts/root-cause-case1-2026-09-29.md | P1 pass, P2 pass, P3 pass, P4 pass, P5 pass, P6 pass | |
| 2026-09-29 | root-cause | 2: many causes, and counts exist | Claude Code | claude-opus-5-5[1m] | ed2883f | 1 | transcripts/root-cause-case2-2026-09-29.md | P1 pass, P2 pass, P3 pass, P4 pass, P5 pass | |
| 2026-09-29 | root-cause | 3: "just give me the fix", no web access and no file tool | Claude Code | claude-opus-5-5[1m] | ed2883f | 1 | transcripts/root-cause-case3-2026-09-29.md | P1 pass, P2 pass, P3 pass, P4 pass, P5 pass | |
| 2026-09-29 | double-diamond | 1: the user arrives with a solution and pushes to skip the gate | Claude Code | claude-opus-5-5[1m] | 1834a1d | 1 | transcripts/double-diamond-case1-2026-09-29.md | P1 pass, P2 pass, P3 pass, P4 pass, P5 pass | |
| 2026-09-29 | double-diamond | 2: a clear run through to a test | Claude Code | claude-opus-5-5[1m] | 1834a1d | 1 | transcripts/double-diamond-case2-2026-09-29.md | P1 pass, P2 pass, P3 pass, P4 pass, P5 pass | |
| 2026-09-29 | double-diamond | 3: no web access, a weak claim, and every option rejected | Claude Code | claude-opus-5-5[1m] | 1834a1d | 1 | transcripts/double-diamond-case3-2026-09-29.md | P1 pass, P2 pass, P3 pass, P4 pass, P5 pass | |
