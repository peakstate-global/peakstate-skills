# sourced-lite case 2 (refresh, re-run 4 on restructured skill)

Skill commit PENDING (structural edit on 7e9db4e: findings and decision record built only from ledger rows; each finding is `F# [C#] "quote" → conclusion`; the final position cites findings by id). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/ plus the conversation so far.

**USER:** Open-plan offices increase face-to-face collaboration. I want to back this up for a proposal to move my team to open plan.

**ASSISTANT:**

Here is my reading of your idea, before I do any research.

**The claim at its strongest:** moving your team from its current layout to an open-plan office will lead to more face-to-face collaboration among team members, and this makes the move worth proposing.

**What you want:** to support a position. You have already decided you favour the move, and you want evidence that backs the proposal.

**Who it is for:** my reading, to confirm, is a decision-maker above you (a manager, facilities or leadership) who has to approve the move.

**What done looks like:** my reading, to confirm, is a short, defensible evidence base you can put in the proposal. Every claim in it would have a named source, and it would be clear where the evidence is strong and where it is weak.

**Gaps I have noticed:**
- What your team works in now: separate offices, cubicles, a mix, or partly remote.
- What "face-to-face collaboration" means for you. It could be unplanned conversations, working sessions, or quick questions across desks.
- Whether collaboration is the whole case, or one reason among others such as cost, space or culture.
- Whether you want the evidence only if it supports the move, or an honest test of the claim, even if the result goes against the proposal. The method I use will argue the strongest case against the claim either way.

Is this right, or what would you change?

**USER:** Yes, that is right. The proposal goes to my manager next week.

**ASSISTANT:**

Your confirmed claim is that moving your team to open plan will increase face-to-face collaboration, and you want support for it in a proposal to your manager. I have checked it, and the evidence I found cuts against it.

## Final position
The evidence I could retrieve does not support the claim as stated. In the two measured moves to open plan, face-to-face interaction fell by about 70 per cent and electronic interaction rose (F1, F5). A collaboration case for your proposal could hold only where the move brings together people who now sit far apart. That rests on a recalled mechanism you would need to check first, so do not make it the core of the proposal yet (F10, F11, F12).

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | In two moves to open plan, face-to-face interaction fell and electronic interaction rose | SOURCED | "the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases, with an associated increase in electronic interaction" (Bernstein & Turban, 2018, abstract, https://pmc.ncbi.nlm.nih.gov/articles/PMC6030579/) | Holds |
| C2 | The C1 evidence comes from two small field studies at corporate headquarters, measured with wearable sensors and server data | SOURCED | "In two intervention-based field studies of corporate headquarters transitioning to more open office spaces, we empirically examined—using digital data from advanced wearable devices and from electronic communication servers"; Study 1: "a cluster of 52 (roughly 40%) agreed to participate"; Study 2: "100 employees from a single floor" (Bernstein & Turban, 2018, abstract and methods, https://pmc.ncbi.nlm.nih.gov/articles/PMC6030579/) | Holds |
| C3 | Collaboration is the usual reason given for open plan | SOURCED | "The justification for the implementation of open-plan offices is often put forward as to increase workplace collaboration" (Wong, 2019, p. 470, https://academic.oup.com/occmed/article/69/7/470/5666196) | Holds |
| C4 | A systematic review linked open plan to worse team-member relations | SOURCED (secondary: Wong's report of the review, the review itself not opened) | Wong reports that Richardson et al. found "an association of open-plan offices with a statistically significant decline in team-member relations and lower friendship opportunities" (Wong, 2019, p. 470, https://academic.oup.com/occmed/article/69/7/470/5666196) | Holds |
| C5 | A 2021 systematic review found no evidence that open plan improves social interaction | RECALLED | Recalled, not checked in this session. It appeared only in a search-result summary, and the source page refused access. Search: James Delfabbro King 2021 open-plan cellular office systematic review | Unresolved |
| C6 | People who sit closer together talk face to face more often | RECALLED | Recalled, not checked in this session. Search: Allen curve communication distance | Holds in part |
| C7 | Moving your team to open plan will increase face-to-face collaboration | INFERRED | Your claim, tested against C1, C2 and C6 | Holds in part |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which claim to test | The general claim as you stated it; a narrower claim about your team only; switch to other benefits such as cost or space | C1, C3, C7 | Test the general claim, then name where it could still hold | Narrow to your team only: your team's current layout is not known, so C7 cannot be placed yet (INFERRED). Switch to other benefits: no ledger row holds evidence on cost or space (INFERRED) | Your team's current layout could put it in the region where C6 applies |
| Which evidence to weight most | Direct before-and-after measurement (C1); reviews (C4, C5); the proximity mechanism (C6) | C1, C2, C4, C5, C6 | C1, because it measured interaction "using digital data from advanced wearable devices and from electronic communication servers" (C2) | C5: not opened in this session. C6: recalled, not checked. C4: a secondary report | C1 covers two firms with small samples (C2) |

## Adversarial findings
F1 [C1] "the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases" → Strongest case against: in both measured moves, open plan cut face-to-face interaction, the reverse of C7 (INFERRED).
F2 [C4] "a statistically significant decline in team-member relations" → Strongest case against: a review associates open plan with worse team relations, which works against a collaboration case (INFERRED).
F3 [C3] "often put forward as to increase workplace collaboration" → Against the research: C3 reports that the reason is common. It gives no measure that the reason holds (INFERRED).
F4 [C2] "a cluster of 52 (roughly 40%) agreed to participate" + [C2] "100 employees from a single floor" → Against the research: C1 rests on small samples at two firms, so it may not carry over to your team (INFERRED).
F5 [C1] "the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases, with an associated increase in electronic interaction" → C1 would be false if a before-and-after measurement at other firms showed face-to-face interaction rising after a move to open plan.
F6 [C2] "In two intervention-based field studies of corporate headquarters" → C2 would be false if the full paper reported more than two sites or a larger measured sample.
F7 [C3] "The justification for the implementation of open-plan offices is often put forward as to increase workplace collaboration" → C3 would be false if the business cases for open-plan moves mostly gave other reasons, such as cost.
F8 [C4] "an association of open-plan offices with a statistically significant decline in team-member relations and lower friendship opportunities" → C4 would be false if the Richardson et al. review, once opened, did not report this association.
F9 [C5] "A 2021 systematic review found no evidence that open plan improves social interaction" → C5 unresolved. Would be settled by opening the James, Delfabbro and King (2021) abstract. Not used in the final position.
F10 [C6] "People who sit closer together talk face to face more often" → C6 holds in part. Holds: where distance between people is the barrier to talking (INFERRED). Fails: as a forecast for open-plan moves, where C1 recorded a fall. Instead: in those moves, the withdrawal in C1 outweighed any gain from sitting closer (INFERRED).
F11 [C7] "Moving your team to open plan will increase face-to-face collaboration" → C7 holds in part. Holds: possibly, where the move brings together people who now sit on other floors or sites (C6, INFERRED). Fails: in moves like those in C1, where face-to-face interaction fell. Instead: expect less face-to-face interaction and more electronic interaction (C1).
F12 From F1, F4, F10 and F11 → Integration, conditional. Region A: your team now sits in one building, in offices or cubicles near each other. There, C1 is the closest evidence and predicts less face-to-face interaction. Region B: your team is now split across floors or sites. There, the move could raise face-to-face interaction through proximity, but only on the recalled mechanism in C6. Observation that places your team in a region: where each team member sits now, and how far apart they are (INFERRED).

## Provenance
Attribution:  Prepared with an AI assistant, from sources retrieved in this session and recalled material labelled as such.
Accountable:  [name to confirm]
Limitations:  C4 is Wong's report of a systematic review, and I did not open the review itself. C6, the only support for a pro-move case, is recalled and not checked in this session. Your team's current layout is not known, and it decides which region in F12 applies.
References:   Bernstein, E. S., & Turban, S. (2018). The impact of the 'open' workspace on human collaboration. Philosophical Transactions of the Royal Society B: Biological Sciences, 373(1753), 20170239. https://doi.org/10.1098/rstb.2017.0239
              Wong [initials not retrieved]. (2019). Evidence for the open-plan office. Occupational Medicine, 69(7), 470. https://doi.org/10.1093/occmed/kqz116

Decision for a person: whether to put the proposal to your manager with collaboration as the reason, after checking where your team sits now and how far apart team members are.

A cut-down, markdown-only version of the SOURCED method (S1).

## Next
1. You: this week, check C6 (the proximity mechanism) and C5 (the 2021 review). Upgrade each to SOURCED or cut it. If C6 does not hold up, the collaboration case has no support left.
2. You: before the proposal goes to your manager next week, name the person accountable for it. Put the collaboration decision in front of that person, together with the check the provenance block names.
3. You: write down where each team member sits now. If the team already sits together in one building, you are in Region A, the case that C1 predicts goes against the claim, and the collaboration argument should come out of the proposal.

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

## Grading
- P1 pass: restates "moving your team from its current layout to an open-plan office will lead to more face-to-face collaboration" and ends "Is this right, or what would you change?", with no research or verdict.
- P2 pass: C7 "Moving your team to open plan will increase face-to-face collaboration" has status "Holds in part", and the final position says the evidence "does not support the claim as stated".
- P3 pass: F11 "C7 holds in part. Holds: possibly, where the move brings together people who now sit on other floors or sites ... Fails: in moves like those in C1 ... Instead: expect less face-to-face interaction and more electronic interaction (C1)."
- P4 pass: each row with status Holds (C1, C2, C3, C4) has a "would be false if" line (F5, F6, F7, F8).
- P5 pass: C1 to C4 are SOURCED with quotes and locators (PMC abstract and methods; Wong p. 470). The grader found every quote at its source (PMC page fetched; the OUP page confirmed both Wong sentences and the Richardson attribution). C5, seen only in a search summary, is RECALLED, not SOURCED. Strict check: all finding quotes appear in their rows (0 misses), and the findings hold only numbered lines.
