# sourced-lite case 2 (refresh r9, a claim that fails review)

Skill commit 349fd3b. Eval version 2. Host Claude Code, model claude-opus-5-5[1m] (subagents spawned with model opus). Each assistant turn ran in a fresh general-purpose subagent whose only instructions were skills/sourced-lite/ plus the conversation so far. Runner note: the second reply ended with an unscripted question (keep open plan with the evidence stated, or change the recommendation), so the runner sent "I don't know, your call." as a third user turn.

**USER:** Open-plan offices increase face-to-face collaboration. I want to back this up for a proposal to move my team to open plan.

**ASSISTANT:**

I'd like to check that I've understood you before I look at any evidence.

**My reading of your idea, in its strongest form:**

- **The claim:** When a team moves from enclosed offices or cubicles to an open-plan layout, its members talk face to face more often.
- **What you want:** Support for a position. You want evidence behind this claim for a proposal to move your team to open plan.
- **Who it is for:** Probably a manager or leadership group who will approve or reject the move. My reading, to confirm: they will rely on the evidence when they decide.
- **What done looks like:** A position you can defend in the proposal, with every claim traced to its source. It also records what the evidence says against the claim, so nobody can surprise you with it later.

**Gaps I've noticed:**

- **The meaning of "collaboration":** It could mean how often people talk face to face, or how good the work they do together is. The evidence may treat these two differently.
- **Your team:** I don't know its size, the type of work it does, or how it sits now (private offices, cubicles or a mix).
- **Your decision:** I don't know if you have already decided on open plan and need backing for it, or if you're still open to changing the proposal depending on what the evidence shows.

Is this right, or what would you change?

**USER:** Yes, that is right. The proposal goes to my manager next week.

**ASSISTANT:**

Checked against the sources, the claim does not hold as a general rule. The strongest direct evidence found the opposite: when two company headquarters moved to more open space, face-to-face interaction fell by about 70 per cent. I searched and fetched the sources in this session. Here is what I found.

## Final position
The ledger does not support "open plan increases face-to-face collaboration" as a general rule. In two field studies of company headquarters moving to more open space, face-to-face interaction fell by about 70% and electronic interaction rose (C1, C2, C3, F1, F5, F6, F7). A review reports that interaction rose in two other settings: creative workers in Malaysia, and a study in Tehran. The review links this difference to culture (C6, C7, C8, F4, F10, F11, F12). So the proposal cannot rely on "more face-to-face collaboration" as the benefit of the move (C9, F13, F14).

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | In two field studies of headquarters that moved to more open space, the volume of face-to-face interaction fell by about 70% in both cases, and electronic interaction rose | SOURCED | "Contrary to common belief, the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases, with an associated increase in electronic interaction." Also: "open architecture appeared to trigger a natural human response to socially withdraw from officemates and interact instead over email and IM" (Bernstein & Turban, 2018, https://doi.org/10.1098/rstb.2017.0239, Abstract; full text read via Europe PMC, PMC6030579) | Holds |
| C2 | In the first study, the 52 participants spent 72% less time interacting face to face | SOURCED | "the 52 participants now spent 72% less time interacting F2F" (Bernstein & Turban, 2018, Study 1 results, Volume of interaction) | Holds |
| C3 | In the second study, the people tracked spent between 67% and 71% less time interacting face to face | SOURCED | "spent between 67% (Model 1, 12.79/17.99) and 71% (Model 2, 9.81/14.63) less time interacting F2F" (Bernstein & Turban, 2018, Study 2 results, Volume of interactions) | Holds |
| C4 | Both studies took place at the global headquarters of a company, and the second company was a Fortune 500 multinational | SOURCED | "was conducted at the global headquarters of OpenCo1"; "This second empirical study was also a quasi-field experiment at a Fortune 500 multinational and was conducted at the global headquarters of OpenCo2" (Bernstein & Turban, 2018, sections Study 1 and Study 2) | Holds |
| C5 | A review states that removing boundaries decreases the collaboration of the people in the space, citing earlier studies | SOURCED | "Removing boundaries decreases the occupants' collaboration" (Gerlitz & Hülsbeck, 2023, https://doi.org/10.1007/s11301-022-00316-2, full text via Europe PMC, PMC9815683, the passage that cites Kim and De Dear 2013) | Holds in part |
| C6 | The same review reports that a study of programmers and designers in creative mobile industries in Malaysia found more social interaction and creative output in open-plan offices | SOURCED | "studied employees in creative mobile industries (programmers and designers) in Malaysia. The findings show an increase in social interaction and creative output in OPO." (Gerlitz & Hülsbeck, 2023, the passage on Samani et al. 2017) | Holds |
| C7 | The same review reports a study from Tehran that concludes open-plan offices increase interaction | SOURCED | "A similar study from Teheran concludes that OPO increases interaction and employees experience a more democratic working culture" (Gerlitz & Hülsbeck, 2023, same passage) | Holds |
| C8 | The review says these contradictory results appear to be related to cultural differences | SOURCED | "The contradictory results of these two studies appear to be related to cultural differences." (Gerlitz & Hülsbeck, 2023, same passage) | Holds in part |
| C9 | Moving a team to open plan increases face-to-face collaboration | INFERRED | Your claim, tested against C1 to C8 | Fails |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| What "collaboration" means in this test | Volume of face-to-face interaction; quality of joint work | C1, C2, C3, C6 | Volume of face-to-face interaction | Quality of joint work: C1 to C3 measure volume, and no row measures quality (INFERRED) | Your manager may care most about quality, and the ledger does not test quality (INFERRED) |
| Which evidence to weight most | The direct before-and-after measurement (C1 to C4); the review's summaries of other studies (C5 to C8) | C1, C4, C5, C6, C7 | C1 to C4 as the main evidence, with C5 to C8 as context on where results differ | Equal weight for C6 and C7: they are second-hand reports in a review, and I did not retrieve the original studies (INFERRED) | C1 comes from one paper with two sites (C1, C4) |
| What the proposal should now recommend | Keep open plan and state this evidence openly; change the basis or the recommendation | C1, C8, C9 | Your decision (see my question at the end) | None yet | Depends on your team's setting, which C4 and C6 describe only for the studies |

## Adversarial findings
F1 [C9] Moving a team to open plan increases face-to-face collaboration + [C1] "Contrary to common belief, the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases" → Strongest case against: the only direct before-and-after measurement in the ledger found the opposite of the claim at both sites. (INFERRED)
F2 [C1] "open architecture appeared to trigger a natural human response to socially withdraw from officemates and interact instead over email and IM" → Rival explanation: if a team reports more collaboration after a move, the extra contact may be email and messaging, not face to face. (INFERRED)
F3 [C2] "the 52 participants now spent 72% less time interacting F2F" + [C4] Both studies took place at the global headquarters of a company → Against the research: the evidence comes from two headquarters sites, and the first study had 52 participants, so a team that differs in size or type of work may respond differently. (INFERRED)
F4 [C5] A review states that removing boundaries decreases the collaboration of the people in the space, citing earlier studies + [C6] "The findings show an increase in social interaction and creative output in OPO." → Missing counter-evidence exists: the same review that supports the case against also reports a setting where interaction rose. (INFERRED)
F5 [C1] "the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases" → C1 would be false if other before-and-after measurements of moves to open plan found face-to-face interaction held steady or rose.
F6 [C2] "the 52 participants now spent 72% less time interacting F2F" → C2 would be false if the badge data had counted a different time window before and after the move.
F7 [C3] "spent between 67% (Model 1, 12.79/17.99) and 71% (Model 2, 9.81/14.63) less time interacting F2F" → C3 would be false if a re-analysis of the second study's data found no drop.
F8 [C4] Both studies took place at the global headquarters of a company, and the second company was a Fortune 500 multinational → C4 would be false if the paper's site descriptions named a different kind of workplace.
F9 [C5] "Removing boundaries decreases the occupants' collaboration" → C5 holds in part. Holds: as the review's summary of the studies it cites. Fails: the review reports exceptions (C6, C7). Instead: removing boundaries decreased collaboration in the studies the review cites, and interaction rose in the Malaysia and Tehran studies. (INFERRED)
F10 [C6] "The findings show an increase in social interaction and creative output in OPO." → C6 would be false if the original Malaysia study, read directly, did not report this increase.
F11 [C7] "A similar study from Teheran concludes that OPO increases interaction" → C7 would be false if the original Tehran study, read directly, did not reach this conclusion.
F12 [C8] "The contradictory results of these two studies appear to be related to cultural differences." → C8 holds in part. Holds: as the review's explanation. Fails: "appear to be" is a suggestion, and no row tests culture as the cause. Instead: culture is a possible explanation, not a tested one. (INFERRED)
F13 [C9] Moving a team to open plan increases face-to-face collaboration → C9 fails. Holds: in the settings the review reports from Malaysia and Tehran (C6, C7). Fails: at both headquarters sites, where face-to-face interaction fell by about 70% (C1). Instead: the direction of the effect depended on the setting in the ledger's evidence. (INFERRED)
F14 [F1, F9, F12, F13] → Integration, conditional. Region: a team like those in the headquarters studies (C4) can expect less face-to-face interaction and more email and messaging. A team like the creative workers in the Malaysia study (C6) may see more interaction. Observation that places a case in it: after a trial move, measure whether face-to-face contact goes up or down against the team's current baseline. (INFERRED)

## Provenance
**Attribution:** An AI assistant wrote this at your request, from sources it retrieved in this session.

**Accountable:** [name to confirm]

**Limitations:**
- I did not retrieve the original studies behind C5 to C8. The review reports them second-hand.
- The ledger does not test the quality of collaboration, only its volume.
- Your team's size, type of work and current layout are unknown. So the ledger cannot say which region of F14 your team is in.

**References:**
- Bernstein, E. S., & Turban, S. (2018). The impact of the 'open' workspace on human collaboration. *Philosophical Transactions of the Royal Society B: Biological Sciences, 373*(1753), 20170239. https://doi.org/10.1098/rstb.2017.0239
- Gerlitz, A., & Hülsbeck, M. (2023). The productivity tax of new office concepts: A comparative review of open-plan offices, activity-based working, and single-office concepts. *Management Review Quarterly*, 1–31 [volume and issue not shown in the retrieved record]. https://doi.org/10.1007/s11301-022-00316-2

**Decision for a person:** Your manager must decide whether to approve the move. Before that, someone must check whether your team's setting is more like the headquarters studies (C4) or the creative-worker study (C6).

A cut-down, markdown-only version of the SOURCED method (S1).

## Next
- **Get the original studies:** You find and read the original Malaysia and Tehran studies this week. Then C6 and C7 either become first-hand evidence or leave the ledger.
- **Name who is accountable:** You name the person accountable for the move this week, and give that person the headquarters finding (C1) before the proposal goes in.
- **Watch the measure that could prove this wrong:** You record how often your team meets face to face now, before any move. If the count rises after a trial move, that is the observation that would put your team in the other region of F14.

If you want a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

The next step depends on a decision only you can make. Given this evidence, do you want the proposal to keep recommending open plan and state the evidence openly, or do you want to change what the proposal recommends?

Sources:
- [Bernstein & Turban (2018), The impact of the 'open' workspace on human collaboration](https://doi.org/10.1098/rstb.2017.0239)
- [Gerlitz & Hülsbeck (2023), The productivity tax of new office concepts](https://pmc.ncbi.nlm.nih.gov/articles/PMC9815683/)

**USER:** I don't know, your call.

**ASSISTANT:**

My call is to change what the proposal rests on. Ask your manager for a trial move to open plan, with your team's face-to-face contact counted before and after. Drop "more face-to-face collaboration" as the benefit the move promises.

**Why:**
- The claim the proposal was built on fails in the ledger (C9, F13). The one direct before-and-after measurement found that face-to-face interaction fell by about 70% at both headquarters sites (C1, F1).
- The review reports that interaction rose in two other settings, the creative workers in Malaysia and a study in Tehran (C6, C7). The ledger cannot say which of these settings your team is closer to (F14). A count before and after a trial move is the observation F14 names for placing your team.
- If the proposal keeps the original claim and states the evidence openly, it asks your manager to approve a benefit that the ledger does not support (C9, F13). That proposal argues against itself (INFERRED).

## Final position (updated)
The ledger does not support "open plan increases face-to-face collaboration" as a general rule. In two field studies of company headquarters that moved to more open space, face-to-face interaction fell by about 70% (C1, F1, F5). The review reports settings where interaction rose (C6, C7, F10, F11). So the proposal can defend a trial move measured against the team's current face-to-face baseline, but not a promised increase (C9, F13, F14).

## Decision record (updated row)
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| What the proposal should now recommend | Keep open plan and state this evidence openly; change the basis to a trial move measured against a face-to-face baseline | C1, C6, C7, C9 | Change the basis: a trial move, measured against the team's current face-to-face baseline | Keep open plan with the evidence stated: its stated benefit rests on C9, which fails against C1 | The ledger tests only the volume of face-to-face contact. Any other reason for the move would need its own rows before the proposal could use it (INFERRED) |

The other two decision rows, the claim ledger, the findings and the references are unchanged.

## Provenance (changed lines only)
**Accountable:** [name to confirm]

**Decision for a person:** Your manager must decide whether to approve a trial move. Before that, someone must record how often the team meets face to face now, so the trial has a baseline to compare against.

This recommendation comes from the ledger. You still decide whether it goes to your manager, and the person accountable for the move still has to be named.

## Next
1. **Record the baseline:** This week, you count how often your team meets face to face now. The result is the number the trial is measured against.
2. **Get the original studies:** You find and read the original Malaysia and Tehran studies. After that, C6 and C7 either become first-hand evidence or leave the ledger.
3. **Watch the measure that could prove this wrong:** After a trial move, compare the count with the baseline. If the count rises, your team is in the other region of F14, and the case for a permanent move gets stronger.

If you have a reason for the move other than face-to-face contact, such as cost or space, tell me what it is. I will ground it as its own rows before the proposal uses it.

## Grading

Sources checked by the grader this session: full text of Bernstein & Turban (Europe PMC, PMC6030579) and Gerlitz & Hülsbeck (Europe PMC, PMC9815683). Every quote in C1 to C8 appears verbatim in those texts. Gerlitz & Hülsbeck is volume 36 of Management Review Quarterly, which the reference says was "not shown".

- P1 pass: turn 1 restates the claim in a stronger form, names purpose, audience and what done looks like, and ends "Is this right, or what would you change?", with no source, ledger or verdict.
- P2 pass: C9 (the user's claim) has status "Fails", and the final position says the ledger does not support it "as a general rule".
- P3 pass: F13 gives "Holds: in the settings the review reports from Malaysia and Tehran (C6, C7). Fails: at both headquarters sites ... (C1). Instead: the direction of the effect depended on the setting".
- P4 pass: every row with status Holds has a "would be false if" line (C1 F5, C2 F6, C3 F7, C4 F8, C6 F10, C7 F11); the two holds-in-part rows (C5, C8) carry Holds/Fails/Instead (F9, F12), graded as in r7 and r8.
- P5 pass: C1 to C8 are SOURCED with verbatim quotes (checked above) and section locators; C9 is INFERRED, not SOURCED.
- P6 FAIL. Hard fails: (a) F6 says "C2 would be false if the badge data had counted a different time window". No row says the study used badges, so this states what the source did from outside the ledger. (b) C1's claim cell says "two field studies of headquarters", but its quoted evidence (two abstract sentences) holds neither "field studies" nor "headquarters"; C4 holds headquarters. Both final positions then say "company headquarters" citing C1, C2, C3 (turn 2) and C1 (turn 3), none of which hold that fact, and neither cites C4. Minor notes: C5's claim cell "citing earlier studies" rests on the locator, not the quote; the turn-2 lead sentence ("two company headquarters") carries no id; the Gerlitz reference marks the volume unknown when the record shows 36. The rest checks out: F3's 52 participants (C2), F14's regions (C4, C6), the Limitations lines and the turn-3 "at both headquarters sites (C1, F1)" wording, which repeats defect (b).
