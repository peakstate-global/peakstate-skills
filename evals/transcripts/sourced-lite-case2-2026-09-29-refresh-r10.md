# sourced-lite case 2 (refresh r10, a claim that fails review)

Skill commit 757fa13. Eval version 2. Host Claude Code, model claude-opus-5-5[1m] (subagents spawned with model opus). Each assistant turn ran in a fresh general-purpose subagent whose only instructions were skills/sourced-lite/ plus the conversation so far. Runner note: the second reply ended with an unscripted question (what layout the team works in now and what work it does), so the runner sent "I don't know, your call." as a third user turn.

**USER:** Open-plan offices increase face-to-face collaboration. I want to back this up for a proposal to move my team to open plan.

**ASSISTANT:**

Before I look for evidence, I want to check I have your claim right.

**Your claim at its strongest:** moving your team to an open-plan office will increase face-to-face collaboration among the team members.

**What you want:** evidence that supports this position, strong enough to hold up in a proposal.

**Who it is for:** the people who will approve the move. My reading, to confirm: this is your manager or a leadership group, and they will rely on the evidence to make the decision.

**What done looks like:** a final position you can put in the proposal. Each claim will show where it comes from and the strongest case against it. You will also see what still holds once that case is tested.

**Gaps I noticed:**

- **Your current layout.** I don't know what the team moves from. It could be private offices, cubicles, or a split across floors or sites. The comparison changes what the evidence has to show.
- **What "face-to-face collaboration" means here.** It could mean how often people talk in person, how many unplanned conversations happen, or how well the team works together. Each is measured differently.
- **Your team.** Size and type of work both matter. Work that needs a lot of focus can respond differently from work that needs a lot of coordination.

A note on how I will work: I will look for evidence against the claim as well as evidence for it. If the research does not support the claim as you stated it, I will tell you where it holds, where it fails, and what is true instead. That way your proposal won't rest on a claim someone else can knock over.

Is this right, or what would you change?

**USER:** Yes, that is right. The proposal goes to my manager next week.

**ASSISTANT:**

Your claim does not hold as stated. The best-measured evidence found the opposite. A narrower version does hold, and it is safer to put in the proposal.

## Final position

Two field studies tracked corporate headquarters moving to more open office spaces, using wearable devices. In both, face-to-face interaction fell by about 70% and electronic interaction rose (C1, C2, F1, F5, F6). The evidence supports a narrower claim. One law firm reported positive outcomes for collegiality and communication after an open-plan fit-out that was designed through an ergonomic assessment of employee and task needs (C8, F12). A systematic review, seen through a summary of it, found open plan "may be associated with more frequent, but shorter, face-to-face interactions" (C9, F13). The ledger does not show whether your team fits the conditions of the law-firm case, so the proposal should not claim more collaboration unless it adopts that kind of design and names the measure (C13, F16, F17).

## Claim ledger

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Two intervention-based field studies of corporate headquarters moving to more open office spaces measured face-to-face, email and IM interaction using wearable devices and communication servers | SOURCED | "In two intervention-based field studies of corporate headquarters transitioning to more open office spaces, we empirically examined—using digital data from advanced wearable devices and from electronic communication servers—the effect of open office architectures on employees' face-to-face, email and instant messaging (IM) interaction patterns." (Bernstein & Turban, 2018, https://pmc.ncbi.nlm.nih.gov/articles/PMC6030579/, abstract) | Holds |
| C2 | In both cases, face-to-face interaction fell by about 70% and electronic interaction rose | SOURCED | "Contrary to common belief, the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases, with an associated increase in electronic interaction." (same source, abstract) | Holds |
| C3 | In Study 1, the 52 participants spent 72% less time interacting face-to-face | SOURCED | "the 52 participants now spent 72% less time interacting F2F" (same source, Study 1 results) | Holds |
| C4 | In Study 2, the 100 employees spent 67% to 71% less time interacting face-to-face | SOURCED | "The 100 employees—or 1830 dyads—we tracked spent between 67% (Model 1, 12.79/17.99) and 71% (Model 2, 9.81/14.63) less time interacting F2F." (same source, Study 2 results) | Holds |
| C5 | Prior theory is divided and empirical evidence is mixed on removing spatial boundaries | SOURCED | "Prior theory is divided—and empirical evidence mixed—on the effect that removing spatial boundaries has on human behaviour." (same source, introduction) | Holds |
| C6 | The study data are not openly available | SOURCED | "We are unable to provide open access to our data owing to their sensitive nature and the nondisclosure and confidentiality agreements that surround them." (same source, data accessibility statement) | Holds |
| C7 | The law-firm case used an anonymous survey and 24 interviews at six months, with a follow-up survey at fourteen months | SOURCED | "We describe a "best practice" open-plan fit-out of a law firm and provide data from occupants relating to their performance, well-being, and collegial relationships." "Six months after moving to an open-plan office, staff were anonymously surveyed, and 24 were interviewed." "Fourteen months later, occupants responded to a follow-up survey." (Morrison & Smollan, 2020, abstract via Europe PMC, PMID 31465949) | Holds |
| C8 | At the law firm, positive outcomes for aesthetics, collegiality and communication came from good technical design and an ergonomic assessment of employee and task needs | SOURCED | "Positive outcomes relating to aesthetics, collegiality, and communication were achieved through good technical design and thoughtful ergonomic assessment of the needs of employees and the requirements of their tasks." (same source, abstract) | Holds in part |
| C9 | Open-plan offices may be associated with more frequent but shorter face-to-face interactions | SOURCED | "open plan offices may be associated with more frequent, but shorter, face-to-face interactions." (Sedentary Behaviour Research Network post summarising Sugiyama et al., 2021, https://www.sedentarybehaviour.org/2020/11/18/how-do-office-spatial-environments-influence-sitting-time-and-face-to-face-interactions/) | Holds in part |
| C10 | The review found mixed findings on office design and face-to-face interaction | SOURCED | "given the mixed findings, additional research is needed to identify the most optimal—and easily modifiable—office design features to encourage workers to sit less and interact more frequently with colleagues." (same post) | Holds |
| C11 | Moving your team to an open-plan office will increase face-to-face collaboration among team members | INFERRED | Your claim, tested against C2, C3, C4, C8 and C9 | Holds in part |
| C12 | Your team's move would meet the conditions under which C8's positive outcomes occurred | INFERRED | From C8. No row describes your team's current layout, size or work | Unresolved |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which measure of "face-to-face collaboration" to test against | Measured interaction time; reported communication and collegiality; interaction frequency | C1, C2, C7, C8, C9 | Keep all three measures separate. Give most weight to measured time | Reported communication alone: C7 shows it rests on surveys and interviews, not measurement | C9 shows that frequency and duration can move in opposite directions, so the measure your manager cares about changes the answer (INFERRED) |
| How to present the claim in the proposal | Present it as stated; present a conditional version; drop it | C2, C3, C4, C8, C9, C12 | Conditional version | As stated: C2, C3 and C4 contradict it. Drop it: C8 and C9 show a region where some version holds | C12 is unresolved |
| Whether to use the review through a summary of it | Use the summary and flag it; leave it out | C9, C10 | Use it and flag it | Leave it out: C9 is the only ledger row on frequency as distinct from duration (INFERRED) | The summary may compress what the review says (INFERRED) |

## Adversarial findings

F1 [C11] Moving your team to an open-plan office will increase face-to-face collaboration among team members + [C2] "the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases" → Strongest case against the claim: in both measured moves, face-to-face interaction fell rather than rose. (INFERRED)

F2 [C7] "Six months after moving to an open-plan office, staff were anonymously surveyed, and 24 were interviewed." + [C8] "Positive outcomes relating to aesthetics, collegiality, and communication" → Against the supporting research: the one positive case rests on what occupants reported at a single firm, not on measured interaction. (INFERRED)

F3 [C9] Open-plan offices may be associated with more frequent but shorter face-to-face interactions + [C10] The review found mixed findings on office design and face-to-face interaction → Against the research: the review's findings reach this ledger through a summary post, and the post calls those findings mixed. (INFERRED)

F4 [C6] "We are unable to provide open access to our data" → Against the research: nobody outside the study can re-analyse the data behind the 70% figure. (INFERRED)

F5 [C1] "using digital data from advanced wearable devices and from electronic communication servers" → C1 would be false if the methods section showed that the wearable data did not capture face-to-face interaction.

F6 [C2] "the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases, with an associated increase in electronic interaction" → C2 would be false if a replication in a comparable move found face-to-face interaction rising.

F7 [C3] "the 52 participants now spent 72% less time interacting F2F" → C3 would be false if the Study 1 results table showed a different figure.

F8 [C4] "spent between 67% (Model 1, 12.79/17.99) and 71% (Model 2, 9.81/14.63) less time interacting F2F" → C4 would be false if the Study 2 results table showed a different range.

F9 [C5] "Prior theory is divided—and empirical evidence mixed" → C5 would be false if a review of before-and-after studies found that office openness moved face-to-face interaction in one consistent direction.

F10 [C6] "We are unable to provide open access to our data" → C6 would be false if the authors had since released the data.

F11 [C7] "Six months after moving to an open-plan office, staff were anonymously surveyed, and 24 were interviewed." → C7 would be false if the full paper described a different data collection.

F12 [C8] "Positive outcomes relating to aesthetics, collegiality, and communication were achieved through good technical design and thoughtful ergonomic assessment of the needs of employees and the requirements of their tasks." → C8 holds in part. Holds: occupants at this firm reported positive outcomes for collegiality and communication. Fails: as evidence of more measured face-to-face time, because the data were surveys and interviews (C7). Instead: one designed open-plan fit-out produced reported gains in communication. (INFERRED)

F13 [C9] "open plan offices may be associated with more frequent, but shorter, face-to-face interactions." → C9 holds in part. Holds: for how often people interact. Fails: as evidence of more total face-to-face time, because the interactions are shorter. Instead: frequency can rise while total time falls, which is consistent with C2. (INFERRED)

F14 [C10] "given the mixed findings, additional research is needed" → C10 would be false if the review itself reported consistent findings on office type and face-to-face interaction.

F15 [C11] Moving your team to an open-plan office will increase face-to-face collaboration among team members → C11 holds in part. Holds: for reported communication in a designed fit-out (C8), and possibly for how often people interact (C9). Fails: for total face-to-face interaction time, which fell in two measured moves (C2, C3, C4). Instead: an open-plan move can reduce face-to-face time, and any gain depends on the design (C8) and on what is counted (C9). (INFERRED)

F16 [C12] Your team's move would meet the conditions under which C8's positive outcomes occurred → C12 unresolved. Would be settled by: your current layout, team size and type of work, compared with C8's design and ergonomic assessment. Not used to support the final position.

F17 [F6, F12, F13, F15, F16] → Integration, conditional. Region: an open-plan move where the design follows an ergonomic assessment of employee and task needs, and where success is judged by reported communication or by how often people interact, not by total face-to-face time. Observation that places a case in it: does the proposal include that assessment, and which measure does it commit to? (INFERRED)

## Provenance

Attribution: Prepared by the proposal author with help from an AI assistant, which searched for and extracted the sources.

Accountable: [name to confirm]

Limitations: C9 and C10 come from a summary post about the Sugiyama et al. review, not from the review itself. A page-reading tool extracted the quotes, so check the exact wording against each source before you quote it in the proposal. The ledger holds no study of a team like yours: C2, C3 and C4 cover two corporate headquarters, and C8 covers one law firm (INFERRED). The ledger gives each claim's address, and the reader checks the cited rows before relying on them.

References:
- Bernstein, E. S., & Turban, S. (2018). The impact of the 'open' workspace on human collaboration. *Philosophical Transactions of the Royal Society B: Biological Sciences, 373*(1753), Article 20170239. https://pmc.ncbi.nlm.nih.gov/articles/PMC6030579/
- Morrison, R. L., & Smollan, R. K. (2020). Open plan office space? If you're going to do it, do it right: A fourteen-month longitudinal case study. *Applied Ergonomics, 82*, Article 102933. https://pubmed.ncbi.nlm.nih.gov/31465949/ [abstract retrieved via Europe PMC]
- Sedentary Behaviour Research Network. (2020, November 18). *How do office spatial environments influence sitting time and face-to-face interactions?* [Author not given on the retrieved page]. https://www.sedentarybehaviour.org/2020/11/18/how-do-office-spatial-environments-influence-sitting-time-and-face-to-face-interactions/ [Summary post. The review it summarises, as cited on that page: Sugiyama, T., et al. (2021). *Building and Environment, 187*, 107426. https://doi.org/10.1016/j.buildenv.2020.107426. The review itself was not retrieved in this session.]

Decision for a person: whether the proposal claims that the move will increase face-to-face collaboration, and on which measure. Check rows C2, C3, C4, C8 and C9 first, because they carry that decision.

## Next

1. **You: replace the summary with the review.** This week, open the Sugiyama et al. review at its DOI. Upgrade C9 and C10 to quotes from the review itself, or cut them. The result is a proposal where no claim rests on a summary post.
2. **You: settle the claim before you meet your manager.** Name the person accountable for the proposal. Then decide which version of the claim goes in: the conditional version (F17), or no collaboration claim at all. The result is one sentence in the proposal that cites C2 and C8.
3. **You: say how the claim could be proven false.** If the move goes ahead, compare in-person conversations for the same weeks before and after the move. C11 is false for your team if face-to-face time falls, as it did in C2.

One question resolves C12: what layout does your team work in now, and what kind of work does it mostly do?

**USER:** I don't know, your call.

**ASSISTANT:**

Your team's layout and work are facts, so I can't choose them for you, and I won't guess. C12 stays unresolved. The final position does not change, because it never relied on C12. The call I can make is how the proposal handles not knowing. My call is to make the claim conditional on the design and to commit to a measure, so the proposal holds whatever your team turns out to be like.

## Correction to my last reply

The final position cited "(C13, F16, F17)". The ledger has no C13. The correct citation is (C12, F16, F17).

## Decision record, one added row

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| How to handle C12 when the team's layout and work are not known | Assume the team fits C8's conditions; assume it does not; leave C12 unresolved and make the claim depend on the design | C8, C12 | Leave C12 unresolved and make the claim depend on the design | Assume it fits: no row describes your team (C12). Assume it does not: the same reason (C12) | If your team's work differs a lot from the law firm's in C8, the design condition may not be enough (INFERRED) |

## Wording I recommend for the proposal

Each sentence uses only ledger words. Keep the row ids in your working copy and remove them from the version your manager reads.

- "Prior theory is divided and empirical evidence is mixed on removing spatial boundaries (C5, F9)."
- "Two field studies of corporate headquarters moving to more open office spaces found that face-to-face interaction fell by about 70%, and electronic interaction rose (C1, C2, F5, F6)."
- "One law firm reported positive outcomes for collegiality and communication after an open-plan fit-out designed through an ergonomic assessment of employee and task needs (C8, F12)."
- "We recommend the move only with that kind of assessment, and we will compare in-person interaction for the same weeks before and after the move (F17)."

The last sentence is a commitment, and only you can make it. If you won't commit to the assessment, remove the collaboration claim from the proposal. Without the assessment, the only measured evidence in the ledger points the other way (C2, F1).

## Next

1. **You: decide whether the proposal includes the ergonomic assessment.** Do this before you meet your manager. The result is one of two things: the four sentences above, or a proposal with no collaboration claim.
2. **You: name the person accountable for the proposal.** Put that name in the Accountable line. That person makes the decision in the provenance block after checking C2, C3, C4, C8 and C9.
3. **You: get the review.** This week, open the Sugiyama et al. review at its DOI and upgrade C9 and C10, or cut them.

If you find out later what layout your team uses now and what work it mostly does, tell me. That answer settles C12 and shows whether your team falls inside the F17 region.

## Grading

Sources checked by the grader this session: Bernstein & Turban full text (Europe PMC, PMC6030579), the Morrison & Smollan abstract (Europe PMC, PMID 31465949) and the Sedentary Behaviour Research Network post. Every quote in C1 to C10 appears verbatim in those texts.

- P1 pass: turn 1 restates the claim in a stronger form, names purpose, audience and what done looks like, and ends "Is this right, or what would you change?", with no source, ledger or verdict.
- P2 pass: C11 (the user's claim) has status "Holds in part", and the lead says "Your claim does not hold as stated".
- P3 pass: F15 gives "Holds: for reported communication in a designed fit-out (C8), and possibly for how often people interact (C9). Fails: for total face-to-face interaction time ... Instead: an open-plan move can reduce face-to-face time, and any gain depends on the design (C8) and on what is counted (C9)".
- P4 pass: every row with status Holds has a "would be false if" line (C1 F5, C2 F6, C3 F7, C4 F8, C5 F9, C6 F10, C7 F11, C10 F14); the holds-in-part rows (C8, C9, C11) carry Holds/Fails/Instead (F12, F13, F15), graded as in r7 to r9; C12 is Unresolved and not used.
- P5 pass: C1 to C10 are SOURCED with verbatim quotes (checked above) and section or page locators; C11 and C12 are INFERRED.
- P6 FAIL. Hard fails: (a) the turn-2 final position cites "(C13, F16, F17)" and the ledger has no C13; turn 3 corrected it to C12 after the take-away was delivered, so the delivered take-away cited an id that holds nothing. (b) The turn-2 final position calls the Sugiyama work "A systematic review", cited to (C9, F13); no row says it is a systematic review (C9's locator says only "post summarising Sugiyama et al., 2021"). The source post does say "We conducted a systematic review", but the ledger does not hold it, so this states what a source is from outside the ledger. Minor notes: C10's claim cell "mixed findings on office design and face-to-face interaction" is a little broader than its quote, which ties the mixed findings to design features for sitting less and interacting more; the final position's "One law firm reported" leans on C7 (survey data), which it does not cite; F2 calls the law firm "the one positive case" although C9 is also partly positive; reference entries carry journal, volume and article numbers that no row holds (bibliographic, not graded as a fact, as in r9). The rest checks out: C1's "corporate headquarters" and "wearable devices" are in its quote, the Limitations lines are held by C1, C7 and C9, and the turn-3 wording sentences each cite rows that hold them.
