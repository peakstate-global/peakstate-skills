# sourced-lite case 2 (refresh, claim that fails review, re-run 5 on the repaired skill)

Skill commit PENDING (7e9db4e with the restructure of 1e361d8, plus a repaired references/take-away.md: the file was 1MB of one repeated line and is now the 57-line template and worked example in the new finding-line shape). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/ plus the conversation so far.

**USER:** Open-plan offices increase face-to-face collaboration. I want to back this up for a proposal to move my team to open plan.

**ASSISTANT:**

Before I look at any evidence, I want to check that I have your idea right.

**The claim, in its strongest form:** moving your team from its current layout to an open-plan office will increase the amount of face-to-face collaboration between team members, and that gain is a good enough reason to make the move.

**What you want:** to support a position. You have already decided that open plan is the direction, and you want evidence that holds up when someone else reads the proposal.

**Who it is for:** my reading, to confirm: the person or group who approves the move, such as your manager, facilities or a leadership team. You have not said who this is yet.

**What done looks like:** my reading, to confirm: a short, defensible section of the proposal. It states the claim, shows the evidence for it with sources, and is honest about where the evidence is weaker, so that nobody can knock the proposal over with one counter-study.

**Gaps I noticed:**

- You have not said what the team works in now: private offices, cubicles, a mix, or mostly remote. The comparison depends on the starting point.
- "Face-to-face collaboration" can mean unplanned conversations, planned meetings, or how well the team actually works together. These are different things to measure.
- You have not said whether collaboration is the only reason for the move, or one of several (for example cost or space).
- My reading, to confirm: if the evidence turns out mixed, you would rather know that now and build the strongest honest version of the proposal than find out after a reader pushes back.

Is this right, or what would you change?

**USER:** Yes, that is right. The proposal goes to my manager next week.

**ASSISTANT:**

Thanks for confirming. I have checked the evidence, and it does not support the claim as you stated it. The claim needs to change before your manager reads it next week.

## Final position

The claim that open plan increases face-to-face collaboration fails as a general claim. In the one sensor study of two firms that I retrieved, face-to-face interaction fell by about 70 per cent after the move to open plan (F1, F5). A narrower claim holds in part. In one research lab, a new building with shared informal spaces, such as a central cafeteria and open meeting areas, raised the share of contact between different groups (F8, F9, F14). The defensible proposal is to invest in shared spaces where people meet away from their desks, and to make no promise that open desks alone will add collaboration (F13, F16).

## Claim ledger

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | In two firms, face-to-face interaction fell after a move to open plan | SOURCED | "the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases, with an associated increase in electronic interaction" (Bernstein and Turban, 2018, https://pmc.ncbi.nlm.nih.gov/articles/PMC6030579/, Abstract) | Holds |
| C2 | The samples in that study were small | SOURCED | "a cluster of 52 (roughly 40%) agreed to participate"; "100 employees from a single floor, which was roughly 45% of the employees on that floor" (same article, descriptions of Study 1 and Study 2) | Holds |
| C3 | The authors say proximity alone does not produce interaction | SOURCED | "the antecedents of human interaction at work go beyond proximity and visibility" (same article, Discussion) | Holds |
| C4 | In one research lab, a move to a new building raised contact between groups | SOURCED | "In the new building, 76.1% of pairs were cross-group, increased from 58.8% in the old building." (Brown et al., 2014, https://arxiv.org/abs/1406.6829, results for Figure 4) | Holds |
| C5 | That new building was designed around shared informal spaces | SOURCED | "a central cafeteria area located away from the office spaces"; "lots of open areas and mini conference rooms without doors" (same paper, section "Aims in design of the new building") | Holds |
| C6 | The lab study's authors warn it may not generalise | SOURCED | "this is just one sample of one organization, and should not be taken as representative" (same paper, limitations discussion before Conclusions) | Holds |
| C7 | A systematic review links open-plan offices to weaker team relations | SOURCED | "decline in team-member relations and lower friendship opportunities" (Wong, 2019, https://academic.oup.com/occmed/article/69/7/470/5666196, reporting Richardson et al.'s review) | Holds in part |
| C8 | A longitudinal field study found worse team-member relations after a move to open offices | RECALLED | Recalled, not checked in this session. Search: Brennan Chugh Kline 2002 traditional versus open office design longitudinal field study | Unresolved |
| C9 | Moving your team to open plan will increase face-to-face collaboration | INFERRED | From C1, C3, C4 and C5 | Fails |
| C10 | Shared informal spaces away from desks can raise contact between groups | INFERRED | From C4, C5 and C6 | Holds in part |
| C11 | Your team's current layout and way of working decide which result applies to you | INFERRED | From C3 and C6 | Unresolved |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which evidence to trust | Studies that measured interaction with sensors; secondary summaries | C1, C4, C7, C8 | Sensor studies (C1, C4) as the main evidence | Secondary summaries: C7 reports a review second-hand and C8 is recalled, so neither carries the position alone | Both sensor studies are small or single-site (C2, C6) |
| What "face-to-face collaboration" means here | Total volume of face-to-face interaction; contact between different groups | C1, C4 | Report each measure separately | Treating them as one measure: C1 measured volume and C4 measured the cross-group share, so combining them would hide that the results point in opposite directions (INFERRED) | A reader may care about only one of the two measures (INFERRED) |
| What the proposal should claim | Keep the claim as stated; narrow it to shared spaces; drop collaboration as a reason | C9, C10 | Narrow it to shared spaces | Keep as stated: C9 fails. Drop it: C10 holds in part, so some collaboration case survives | C10 rests on one lab (C6) |

## Adversarial findings

F1 [C9] "Moving your team to open plan will increase face-to-face collaboration" + [C1] "the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases" → Strongest case against the conclusion: the retrieved evidence measured a fall, not a rise.
F2 [C2] "a cluster of 52 (roughly 40%) agreed to participate" + [C6] "this is just one sample of one organization, and should not be taken as representative" → Against the research: both sensor studies are small, so neither settles the question alone. (INFERRED)
F3 [C7] "decline in team-member relations and lower friendship opportunities" → Against the research: this reaches the review second-hand through a short article, so its detail is not checked here. (INFERRED)
F4 [C4] "In the new building, 76.1% of pairs were cross-group" + [C1] "with an associated increase in electronic interaction" → Rival explanation: the two studies may differ because they measured different things, total volume in one and the cross-group share in the other. (INFERRED)
F5 [C1] "the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases" → C1 would be false if a repeat sensor study of a similar move showed face-to-face interaction rising.
F6 [C2] "100 employees from a single floor, which was roughly 45% of the employees on that floor" → C2 would be false if the full article reported a larger sample than these descriptions.
F7 [C3] "the antecedents of human interaction at work go beyond proximity and visibility" → C3 would be false if the Discussion, read in full, concluded that proximity alone drove the result.
F8 [C4] "In the new building, 76.1% of pairs were cross-group, increased from 58.8% in the old building." → C4 would be false if the underlying data showed the cross-group share fell or stayed level.
F9 [C5] "a central cafeteria area located away from the office spaces" + [C5] "lots of open areas and mini conference rooms without doors" → C5 would be false if the building plans showed these spaces were not part of the design.
F10 [C6] "should not be taken as representative" → C6 would be false if the authors elsewhere claimed the result applies to other organisations.
F11 [C7] "decline in team-member relations and lower friendship opportunities" → C7 holds in part. Holds: as a report of what the review found. Fails: as a checked reading of the review itself. Instead: open the Richardson et al. review before citing it. (INFERRED)
F12 [C8] "A longitudinal field study found worse team-member relations after a move to open offices" → C8 unresolved. Would be settled by: retrieving the 2002 study and quoting its result. Not used in the final position.
F13 [C9] "Moving your team to open plan will increase face-to-face collaboration" → C9 fails. Holds: nowhere in the retrieved evidence for open desks. Fails: in the two firms of C1. Instead: shared spaces away from desks are the part with support (C10). (INFERRED)
F14 [C10] "Shared informal spaces away from desks can raise contact between groups" → C10 holds in part. Holds: in the one lab of C4 and C5. Fails: as a general rule, because of C6. Instead: treat it as a trial to run and measure in your team. (INFERRED)
F15 [C11] "Your team's current layout and way of working decide which result applies to you" → C11 unresolved. Would be settled by: stating where your team sits now and how much of its work needs other groups. Not used in the final position.
F16 From F1, F5, F8, F9 and F14 → Integration, conditional. Region: interaction at or near desks, where the evidence shows a fall, versus interaction in shared spaces people walk to, where one lab showed more contact between groups. Observation that places a case in it: where do the conversations you want actually happen, at desks or in a shared space? (INFERRED)

## Provenance

Attribution:  Prepared by you with help from an AI assistant, which retrieved the sources and drafted this analysis.
Accountable:  [name to confirm]
Limitations:  The case for shared spaces rests on one research lab (C4 to C6), and neither study examined a team like yours (C11). The 2002 longitudinal study (C8) is recalled, not checked, and the systematic review (C7) is reported second-hand.
References:
- Bernstein, E. S., & Turban, S. (2018). The impact of the 'open' workspace on human collaboration. Philosophical Transactions of the Royal Society B: Biological Sciences, 373(1753), 20170239. https://pmc.ncbi.nlm.nih.gov/articles/PMC6030579/
- Brown, C., Efstratiou, C., Leontiadis, I., Quercia, D., Mascolo, C., Scott, J., & Key, P. (2014). The architecture of innovation: Tracking face-to-face interactions with ubicomp technologies [Preprint]. arXiv. https://arxiv.org/abs/1406.6829
- Wong, M. (2019). Evidence for the open-plan office. Occupational Medicine, 69(7), 470. https://academic.oup.com/occmed/article/69/7/470/5666196

Decision for a person: whether the proposal asks for open desks or for shared spaces, after checking where your team's useful conversations happen today (C11).

A cut-down, markdown-only version of the SOURCED method (S1).

## Next

1. You: this week, retrieve the 2002 longitudinal study (C8) and the Richardson et al. review (C7). Result: each row is upgraded to SOURCED with a quote, or cut.
2. You: this week, confirm who is accountable for the proposal, then put the decision above in front of that person. Your manager reads the proposal, but that alone does not make your manager accountable. Result: a named person in the Accountable line.
3. You: this week, note where your team's cross-team conversations happen now, at desks or in shared spaces. Result: you know which side of the conditional in F16 your team sits on. If a trial of shared spaces later shows no rise in contact, the narrowed claim (C10) is false for your team.

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

## Grading
- P1 pass: restates "moving your team from its current layout to an open-plan office will increase the amount of face-to-face collaboration" and ends "Is this right, or what would you change?", with no research or verdict.
- P2 pass: C9 "Moving your team to open plan will increase face-to-face collaboration" has status Fails, and F13 reads "C9 fails".
- P3 pass: F13 records "Holds: nowhere in the retrieved evidence for open desks. Fails: in the two firms of C1. Instead: shared spaces away from desks are the part with support (C10)." All three parts are present; the "Holds" part names an empty region.
- P4 pass: every row with status Holds (C1 to C6) has a "would be false if" line (F5 to F10). The rows that hold in part have Holds, Fails, Instead records (F11, F14), and Next move 3 gives the falsifier for C10: "If a trial of shared spaces later shows no rise in contact, the narrowed claim (C10) is false for your team."
- P5 pass: C1 to C7 are SOURCED with quotes and locators. The grader found every quote at its source and locator (PMC abstract, Study 1, Study 2 and Discussion; arXiv full text; Wong p. 470 via WebFetch). C8 is RECALLED, not SOURCED. Reference metadata for all three sources matches.
- Strict check: findings hold only the 16 numbered lines, and every quoted string is in its cited row (script check, 19 quotes, 0 misses). Every number in the take-away is in a ledger row. Notes, not fails: F1's conclusion "the retrieved evidence measured a fall, not a rise" generalises beyond its C1 quote without (INFERRED), since C4 measured a rise in the cross-group share; the stray line "A cut-down, markdown-only version of the SOURCED method (S1)." is copied from SKILL.md.
