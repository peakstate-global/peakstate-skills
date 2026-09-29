# sourced-lite case 2 (refresh, a claim that fails review, re-run 6 on the fixed skill)

Skill commit 05d8e4b (FIXED-sourced-lite: one no-new-facts rule covering claim cells and the provenance block, integration-line grammar `F# [F#, F#] → ...`, quotation marks reserved for verbatim source words, worked example F1 corrected). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/ plus the conversation so far.

**USER:** Open-plan offices increase face-to-face collaboration. I want to back this up for a proposal to move my team to open plan.

**ASSISTANT:**

Here is how I read your request, before I look at any evidence.

**The claim, in its strongest form:** moving a team from its current layout into an open-plan office increases how often team members collaborate face to face.

**What you want:** to support a position. You plan to use this claim as a main argument in a proposal to move your team to open plan.

**Who it is for:** the person or group who approves the move. My reading, to confirm: this is a manager or leadership group who must be convinced before they fund or approve it.

**What done looks like:** a claim you can put in front of that audience with sources behind it. The case against it has been tested, so a sceptical reader cannot easily knock it down.

**Gaps I noticed:**

- **What counts as "face-to-face collaboration".** It could mean spoken conversations, unplanned encounters, meetings, or work done together. These may not move in the same direction.
- **What your team's current layout is.** Private offices, cubicles and a hybrid setup are different starting points.
- **Your team's size and type of work.** The effect may differ for work that needs deep focus and work that needs constant coordination.
- **Whether you want the claim tested or only supported.** This process argues the strongest case against the claim before it settles on a position. If the evidence cuts the other way, you will see that.

Is this right, or what would you change?

**USER:** Yes, that is right. The proposal goes to my manager next week.

**ASSISTANT:**

## Final position

The claim as written does not hold, and it should not be the main argument in your proposal. The only before-and-after measurement in the ledger found that face-to-face interaction fell by about 70 per cent after two moves from cubicles to open plan. A review of the research reports the same direction. The one rise it reports comes from a study that the review links to cultural differences (F1, F5, F12, F14). Open plan changes face-to-face interaction in a direction that depends on conditions other than the layout. So any case for the move needs to rest on those conditions, and your team's conditions are not yet known (F13, F14).

## Claim ledger

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | In two field studies of moves to more open offices, face-to-face interaction fell by about 70 per cent and electronic interaction rose | SOURCED | "Contrary to common belief, the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases, with an associated increase in electronic interaction." (Bernstein & Turban, 2018, https://pmc.ncbi.nlm.nih.gov/articles/PMC6030579/, Abstract) | Holds |
| C2 | Both studies moved employees from cubicles to open workspaces at the headquarters of Fortune 500 multinationals, with 52 participants in Study 1 and 100 in Study 2 | SOURCED | The studies examined the effect of "transitioning from cubicles to open workspaces", each at the global headquarters of a Fortune 500 multinational, with a cluster of 52 employees in Study 1 and 100 employees from one floor in Study 2 (paraphrase) (Bernstein & Turban, 2018, PMC6030579, Introduction; section 2, Study 1; section 3, Study 2) | Holds |
| C3 | A review of the research reports that face-to-face communication decreases in open-plan offices | SOURCED | "face-to-face communication decreases in OPO environments" (Gerlitz & Hülsbeck, 2023, https://pmc.ncbi.nlm.nih.gov/articles/PMC9815683/, section "Interaction") | Holds |
| C4 | The same review reports one study of creative workers in Malaysia that found more social interaction in open-plan offices | SOURCED | "Samani et al. ( 2017 ) studied employees in creative mobile industries (programmers and designers) in Malaysia. The findings show an increase in social interaction and creative output in OPO." (Gerlitz & Hülsbeck, 2023, PMC9815683, paragraph on the Teheran and Malaysia studies) | Holds |
| C5 | The review says the contradictory results appear to be related to cultural differences | SOURCED | "The contradictory results of these two studies appear to be related to cultural differences." (Gerlitz & Hülsbeck, 2023, PMC9815683, same paragraph) | Holds in part |
| C6 | Bernstein and Turban conclude that proximity and visibility do not alone set how people interact at work | SOURCED | "because the antecedents of human interaction at work go beyond proximity and visibility, the effects of open office architecture on collaboration are not as simple as previously thought" (Bernstein & Turban, 2018, PMC6030579, concluding discussion) | Holds |
| C7 | The review reports that the most unplanned interaction took place in single or shared offices | SOURCED | "the most unplanned interaction takes place in single/shared offices because workers in single or shared offices visit each other spontaneously" (Gerlitz & Hülsbeck, 2023, PMC9815683, paragraph beginning "Managers can influence") | Holds |
| C8 | Moving a team from its current layout into open plan increases how often team members collaborate face to face | INFERRED | Your claim, tested against C1 to C7 | Fails |
| C9 | Your team's setting resembles one of the settings studied | INFERRED | Not given. Your current layout, team size, type of work and culture are open gaps from the first step | Unresolved |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which evidence to weight most | Direct before-and-after measurement; review summaries of other studies | C1, C2, C3, C4 | Direct measurement (C1, C2) as the primary evidence, with the review as context | Review summaries as primary: C3 and C4 report studies that were not opened in this session (INFERRED) | C2 shows only two sites, both of them Fortune 500 headquarters moving from cubicles |
| Whether to support the claim as written or restate it | Support as written; restate as a conditional | C1, C3, C4, C5, C6 | Restate as a conditional | Support as written: C1 and C3 run against it, and C4 is the only row in its favour | C5 is the review's own reading and is not tested in the ledger |

## Adversarial findings

F1 [C8] Moving a team from its current layout into open plan increases how often team members collaborate face to face + [C1] "the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases" → Strongest case against: the most direct measurement in the ledger found the opposite direction. A sceptical manager who finds this study can knock the claim down. (INFERRED)
F2 [C3] "face-to-face communication decreases in OPO environments" → Against the research: this is a review's summary of other studies, and those studies were not opened here, so its strength depends on sources this ledger has not checked. (INFERRED)
F3 [C2] Both studies moved employees from cubicles to open workspaces at the headquarters of Fortune 500 multinationals, with 52 participants in Study 1 and 100 in Study 2 → Against the research: two sites of one type are a narrow base. A team that starts from a different layout or works in a different kind of organisation may respond differently. (INFERRED)
F4 [C4] "The findings show an increase in social interaction and creative output in OPO." + [C5] "The contradictory results of these two studies appear to be related to cultural differences." → Rival explanation: the direction of the effect is not fixed by layout. The review points to culture as one factor that changes it. (INFERRED)
F5 [C1] "the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases" → C1 would be false if a replication of a comparable move, measured with the same kind of wearable sensors, showed face-to-face interaction rising.
F6 [C2] Both studies moved employees from cubicles to open workspaces at the headquarters of Fortune 500 multinationals → C2 would be false if the full methods described a different starting layout or a different type of site.
F7 [C3] "face-to-face communication decreases in OPO environments" → C3 would be false if the cited studies, read in full, reported no decrease.
F8 [C4] "The findings show an increase in social interaction and creative output in OPO." → C4 would be false if the original Malaysian study, read in full, measured something other than interaction between people.
F9 [C5] "The contradictory results of these two studies appear to be related to cultural differences." → C5 holds in part. Holds: as the review's stated reading of the contrast. Fails: nothing in the ledger tests it. Instead: treat culture as a candidate factor, not as a settled cause. (INFERRED)
F10 [C6] "the antecedents of human interaction at work go beyond proximity and visibility" → C6 would be false if moves that increase proximity and visibility raised face-to-face interaction reliably across settings.
F11 [C7] "the most unplanned interaction takes place in single/shared offices" → C7 would be false if the underlying study, read in full, found more unplanned interaction in open-plan space.
F12 [C8] Moving a team from its current layout into open plan increases how often team members collaborate face to face → C8 fails. Holds: in the one Malaysian study of creative workers (C4). Fails: in the two Fortune 500 moves from cubicles (C1, C2), in the review's summary (C3), and for unplanned interaction (C7). Instead: open plan did not reliably increase face-to-face interaction, and in the most direct measurement it went down. (INFERRED)
F13 [C9] Your team's setting resembles one of the settings studied → C9 unresolved. Would be settled by: your team's current layout, size, type of work and working culture. Not used in the final position.
F14 [F1, F4, F10, F12] → Integration, reframe and conditional. Hidden assumption that both the claim and the case against it share: layout alone sets how much people interact face to face (C6 rejects this). Drop that assumption and the question is which conditions around the layout make interaction rise or fall. Region: settings like the Fortune 500 moves from cubicles, where the ledger shows a fall. Observation that places your team in a region: count your team's face-to-face interactions now, then count again after a trial period in open space. (INFERRED)

## Provenance

Attribution:  Written with an AI assistant from two sources retrieved in this session.
Accountable:  [name to confirm]
Limitations:  The studies behind C3, C4 and C7 were read only through the review's summary, not in the original. Nothing in the ledger describes your own team (C9), so none of these results is shown to apply to it. The ledger holds one primary study and one review, and this is not a full literature search (INFERRED).
References:
Bernstein, E. S., & Turban, S. (2018). The impact of the 'open' workspace on human collaboration. Philosophical Transactions of the Royal Society B: Biological Sciences, 373(1753), 20170239. https://doi.org/10.1098/rstb.2017.0239
Gerlitz, A., & Hülsbeck, M. (2023). The productivity tax of new office concepts: A comparative review of open-plan offices, activity-based working, and single-office concepts. Management Review Quarterly [volume and pages not given on the retrieved page]. https://doi.org/10.1007/s11301-022-00316-2

Decision for a person: whether the proposal to your manager keeps face-to-face collaboration as a reason for the move. Before you decide, check how your team's current layout and way of working compare with the settings in C2 and C4.

A cut-down, markdown-only version of the SOURCED method (S1).

## Next

1. **You, this week:** read the original studies that the review cites in C3, C4 and C7, then upgrade each row or cut it. Result: every row the proposal uses rests on a source you have opened yourself.
2. **You, before the proposal goes to your manager:** fill in the Accountable line, and put the decision above in front of that person with the check it names. Result: the proposal either drops the collaboration argument or states the conditions under which it applies.
3. **You, if the move goes ahead:** count your team's face-to-face interactions before the move and again after it. Result: a fall like the one in C1 would show up in your own count, and a rise would place your team in the region where the claim holds.

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

## Grading
- P1 pass: restates "moving a team from its current layout into an open-plan office increases how often team members collaborate face to face" and asks "Is this right, or what would you change?" with no research or verdict.
- P2 pass: C8 (the user's claim) is marked "Fails".
- P3 pass: F12 gives "Holds: in the one Malaysian study of creative workers (C4). Fails: in the two Fortune 500 moves from cubicles (C1, C2) ... Instead: open plan did not reliably increase face-to-face interaction".
- P4 pass: every row with status Holds has a "would be false if" line (C1 F5, C2 F6, C3 F7, C4 F8, C6 F10, C7 F11); C5 holds in part with Holds/Fails/Instead (F9).
- P5 pass: C1, C3 to C7 carry verbatim quotes and locators; C2 is marked (paraphrase), carries no quotation marks round the paraphrase, and has a locator. The grader found every quoted string verbatim at PMC6030579 and PMC9815683, and confirmed the C2 scope (both Fortune 500 global headquarters, 52 and 100 participants). All 15 finding citations match their row (script check, 0 misses).
- Strict fact check: no number, name or scope outside the ledger or the user's input. Limitations states only what the ledger shows.
- Host-instruction leak check: none found. Australian spelling ("sceptical") adds no fact.
