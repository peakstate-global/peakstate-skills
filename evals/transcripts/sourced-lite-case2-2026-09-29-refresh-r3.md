# sourced-lite case 2 (refresh, re-run 2 on fixed skill)

Skill commit FIXED-sourced-lite (second uncommitted edit on 7e9db4e). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/.

**USER:** Open-plan offices increase face-to-face collaboration. I want to back this up for a proposal to move my team to open plan.

**ASSISTANT:**

Before I look at any evidence, here is my reading of what you want. Please check it.

**The claim, in its strongest form:** Moving your team from its current layout to an open-plan office will increase the amount of face-to-face collaboration between team members. The effect will be large enough to matter for how the team works.

**What you want:** Support for a position. You have already decided you favour open plan, and you want evidence that makes the proposal defensible. I will still test the claim against the strongest case against it. If the evidence turns out weak or mixed, you will hear that before the proposal goes out, not after.

**Who it is for:** My best guess is the person or group who approves office changes, for example your manager, facilities or a leadership team.

**What done looks like:** A final position you can put in the proposal, a claim ledger that shows where each claim comes from, the main counter-arguments with what survives them, and a provenance block.

**Gaps I noticed:**
- I do not know your team's current layout: private offices, cubicles, a mix, or remote or hybrid work. The comparison changes the answer.
- "Collaboration" could mean face-to-face conversations, the quality of the work, or speed on shared tasks. Your claim says face-to-face, so I will use that unless you tell me otherwise.
- I do not know if the proposal needs to show that collaboration will increase, or only that the move is a good decision overall. For the second, costs such as noise and focus time matter too.

Is this right, or what would you change?


**USER:** Yes, that is right. The proposal goes to my manager next week.

**ASSISTANT:**

Thanks for confirming. I searched the web and opened the sources below in this session. Where a page was blocked, I say so in the ledger.

The short version first: the evidence does not back the claim as written. The best field study found the opposite, so a proposal that promises more face-to-face collaboration will be easy for your manager to challenge.

## Final position

Moving a co-located team to open plan is more likely to reduce face-to-face interaction than to increase it: the strongest before-and-after field evidence found a drop of about 70%, with people moving to email and instant messaging instead. The claim that open plan increases face-to-face collaboration holds only in a narrow region, such as a team that is now split across floors or buildings, and even there the evidence is thin. If you still want the move, argue it on other grounds (cost, space, flexibility) and do not rest the proposal on collaboration.

## Claim ledger

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Moving your team to open plan will increase face-to-face collaboration | INFERRED | Your claim, tested against C2 to C6 | Fails (holds only in a narrow region) |
| C2 | In two companies that moved to more open offices, face-to-face interaction fell by about 70% | SOURCED | "Contrary to common belief, the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases, with an associated increase in electronic interaction." (Bernstein & Turban, 2018, abstract, via Harvard DASH record https://dash.harvard.edu/entities/publication/890a4d8f-e65b-4c5e-a9d9-884fb1526fab) | Holds |
| C3 | The study measured behaviour directly, before and after the move, and did not rely on surveys | SOURCED | "In two intervention-based field studies of corporate headquarters transitioning to more open office spaces, we empirically examined, using digital data from advanced wearable devices and from electronic communication servers, the effect of open office architectures on employees' face-to-face, email and instant messaging (IM) interaction patterns." (same source, abstract) | Holds |
| C4 | A systematic review found that open-plan offices lower performance and that several studies report less face-to-face communication | SOURCED | Abstract: "Open-plan offices can reduce real-estate costs but lead to lower performance levels, thereby imposing a tax on productivity which outweighs the initial cost savings." The review lists Brennan et al. (2002): "face-to-face communication decreases in OPO environments." (Gerlitz & Hülsbeck, 2024, abstract and results, https://link.springer.com/article/10.1007/s11301-022-00316-2) | Holds |
| C5 | Some studies did find more interaction after open plan | SOURCED | Precise paraphrase: the same review reports that Samani et al. (2017) and Samani and Alavi (2020) found increased interaction in creative industries in Malaysia and Tehran, and attributes this to cultural differences in power distance. (Gerlitz & Hülsbeck, 2024, results section) | Holds in part |
| C6 | Open plan is linked to worse team-member relations | SOURCED | An editorial summarises the Richardson et al. review as finding an "association of open-plan offices with a statistically significant decline in team-member relations and lower friendship opportunities" (Wong, 2019, https://academic.oup.com/occmed/article/69/7/470/5666196). Secondary citation: I did not open Richardson et al. | Holds |
| C7 | A second systematic review found communication results inconsistent (two positive, two negative, five no association) | RECALLED | Seen only in a search summary. The page for James, Delfabbro and King (2021) returned "403 Forbidden", so I could not check it. Search: James Delfabbro King 2021 open-plan cellular systematic review SAGE Open | Unresolved |
| C8 | People talk more when they sit closer together, so bringing a split team onto one floor could raise face-to-face contact | RECALLED | Recalled, not checked in this session (the Allen curve research on distance and communication). Search: Allen curve distance communication frequency | Unresolved |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| What "collaboration" means in the test | Face-to-face volume; quality of joint work; speed on shared tasks | Your claim says face-to-face; you confirmed my reading | Face-to-face volume | Quality and speed: not what your claim says, and C2 and C3 do not measure them | Your manager may care more about output than about conversation counts |
| Which evidence to weight most | Measured behaviour before and after a move; staff surveys; vendor and design-industry reports | C2, C3 use wearables and server data; C4 is a peer-reviewed review | Measured before-and-after behaviour, then peer-reviewed reviews | Surveys: self-report of interaction is less direct. Industry reports: the seller has a stake | C2 covers two companies only, so your workplace could differ |
| What the move is compared against | Private offices or cubicles on one floor; a team split across floors or sites; a hybrid team | You did not tell me the current layout | A co-located team in offices or cubicles, the setting in C2 | Split team and hybrid: I cannot confirm either, so I name them as conditions instead | If your team is split or mostly remote, C8 matters more and the answer could change |

## Adversarial findings

- Strongest case against my conclusion: C2 is two companies, and people may adjust over a longer period than the study followed. A team that chose the move and has good quiet rooms and norms might behave differently from staff moved by head office. C5 shows the effect is not universal.
- Against the research: I could not open the full text of C2, the James review (C7) or Richardson et al. (C6), so study sizes and follow-up periods are not in this ledger. C5 comes through a review's summary, not the original studies. I found no rigorous study showing a rise in face-to-face interaction in a co-located Western team, but I did not search exhaustively.
- C1 fails. Holds: possibly where a team now sits across floors or sites and the move brings people who need to talk into one space (C8, unresolved), and in the settings in C5. Fails: for a team already on one floor, where the best measured evidence (C2) shows a drop of about 70%. Instead: in that region, open plan tends to shift talk to email and chat, so face-to-face contact falls.
- C2 would be false if: the full paper showed the drop was limited to one group or reversed later in the follow-up period.
- C3 would be false if: the methods section showed the face-to-face data came from self-report rather than wearable devices.
- C4 would be false if: the review's included studies, read in full, mostly reported no change in face-to-face communication.
- C5 holds in part. Holds: in the creative-industry settings in Malaysia and Tehran that the review describes. Fails: as a general rule, since the same review lists more studies showing a decrease. Instead: outside those settings, expect a decrease or no change.
- C6 would be false if: Richardson et al., read directly, found no significant decline in team-member relations.
- C7 unresolved. Would be settled by: opening James, Delfabbro and King (2021) and reading the communication results table. Not used in the final position.
- C8 unresolved. Would be settled by: retrieving the Allen curve research and a study of teams consolidated from separate floors. Not used in the final position, which mentions the split-team case only as a condition.

## Provenance

Attribution:  Prepared by the user with help from an AI assistant that searched and read the sources listed.
Accountable:  [name to confirm]
Limitations:  I do not know your team's current layout, and the answer depends on it: a split or hybrid team could fall in the region where C1 might hold. The full text of Bernstein and Turban (2018) was blocked, so the study sizes and follow-up period are not checked. The James et al. (2021) review and the Allen curve research are recalled, not checked in this session.
References:
Bernstein, E. S., & Turban, S. (2018). The impact of the "open" workspace on human collaboration. Philosophical Transactions of the Royal Society B: Biological Sciences, 373(1753), Article 20170239. https://doi.org/10.1098/rstb.2017.0239
Gerlitz, A., & Hülsbeck, M. (2024). The productivity tax of new office concepts: A comparative review of open-plan offices, activity-based working, and single-office concepts. Management Review Quarterly, 74, 745–775. https://doi.org/10.1007/s11301-022-00316-2
Wong, M. (2019). Evidence for the open-plan office. Occupational Medicine, 69(7), 470. https://academic.oup.com/occmed/article/69/7/470/5666196

Decision for a person: whether the proposal to your manager keeps collaboration as its main reason for the move, after checking where your team sits now and whether people who need to talk are currently separated.

## Next

1. You: this week, write down where each team member sits now and who works with whom. Result: you know whether your team is in the region where C1 might hold (split across floors or sites) or where it fails (already co-located).
2. You: before the proposal goes to your manager, choose a main reason other than face-to-face collaboration, or narrow the claim to the split-team case, and put the person named under Accountable in front of that decision. Result: a proposal your manager cannot knock over with the 70% finding.
3. You: if the move goes ahead, count face-to-face conversations and email or chat volume for two weeks before and after. Result: you see directly whether your team repeats the drop in C2, which is the observation that would make the final position false for your team.

If you want to test the hidden assumptions in the proposal further, a skill for finding blind spots may help, if you have one.

## Grading
- P1 pass: the first reply restates the claim ("will increase the amount of face-to-face collaboration ... large enough to matter") and ends "Is this right, or what would you change?" with no research or verdict. The audience is marked "My best guess". "You have already decided you favour open plan" follows from the user's "I want to back this up for a proposal".
- P2 pass: C1 status is "Fails (holds only in a narrow region)".
- P3 pass: "C1 fails. Holds: possibly where a team now sits across floors or sites ... Fails: for a team already on one floor ... Instead: in that region, open plan tends to shift talk to email and chat".
- P4 pass: each surviving row has a line: "C2 would be false if", "C3 would be false if", "C4 would be false if", "C6 would be false if". C5 has the three-part record, and C7 and C8 are unresolved with what would settle them.
- P5 pass: C2 to C6 each carry a quote or a marked "Precise paraphrase" and a locator (DASH URL plus abstract, Springer URL plus abstract or results, OUP URL). C7 and C8, which have no retrieved source, are RECALLED. Plain reading: "C4 is a peer-reviewed review" in the decision record rests on the journal named in C4's retrieved locator, so it is not an invented study detail.

Triage:
