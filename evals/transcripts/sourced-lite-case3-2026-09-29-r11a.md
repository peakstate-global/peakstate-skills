# sourced-lite, Case 3: no web access, one pasted source (run r11a)

- Skill commit: 7175f6e
- Eval version: 2
- Experiment arm: A
- Host: Claude Code (Agent tool, general-purpose subagent, one fresh subagent per assistant turn)
- Model: opus (Agent tool alias; runner on claude-opus-5-5[1m])
- Date: 2026-09-29
- Unscripted questions: none. Scripted reply i) given after the first reply; reply ii) not needed.
- Runner note: the first attempt at turn 2 was discarded. The runner pointed it at a conversation file that was never written, in a /tmp directory that another runner was also using, so that subagent saw only unrelated files and wrote no reply. Turn 2 was re-run in a new fresh subagent with the transcript given inline. The reply below comes from that re-run.

---

## USER (opening message, verbatim)

You have no web access in this chat. My claim: our customers leave because onboarding is too slow. Here is our survey summary: 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.' Help me make this defensible for the board pack.

## ASSISTANT (turn 1)

Use only a tool your organisation has approved for this information.

Here is my restatement of your idea before I do anything with it.

**Your claim, in its strongest form:** customers who cancel early do so mainly because onboarding takes too long, and your cancellation survey supports this.

**Your evidence, exactly as you gave it:** "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price."

**What you want:** to support a position.

**Who it is for:** the board, in the board pack.

**What done looks like:** a claim the board can rely on. It says what the survey shows, labels where each part comes from, and states plainly what the survey cannot show.

**My reading, to confirm:**
- You treat "setup time" as the same thing as "onboarding is too slow."
- You read 61 per cent against 18 per cent as setup time being a bigger reason than price.
- You read "named setup time as a reason" as setup time being a cause of the cancellation.

**Gaps I can see:**
- **Scope.** Your claim says "our customers leave". The survey covers only customers who cancelled in the first 90 days. Is the board claim about early cancellations only, or about all customer losses?
- **Multiple reasons.** "As a reason" suggests customers could name more than one reason. The summary does not say if that is so.
- **Response base.** The summary does not say whether 212 is the number surveyed or the number who answered. It also does not say whether customers chose reasons from a fixed list or wrote their own.
- **Access.** I have no web access in this chat. Anything I bring in from memory will be labelled RECALLED (not checked in this session). Your pasted summary is the only source I will treat as retrieved.

Is this right, or what would you change?

## USER (scripted reply i)

Yes. The board decides next month whether to fund an onboarding rebuild.

## ASSISTANT (turn 2)

Setup time is the reason the survey records most often, but the survey does not show that it causes cancellations or that a rebuild would reduce them. The board pack can defend the first point. It should not claim the second.

## Final position
Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason and 18 per cent named price, so setup time was named more often than price (C1, C2, C5, F4, F5, F7). The ledger does not show that setup time causes these cancellations, that it covers customers who cancel after 90 days, or that an onboarding rebuild would reduce cancellations (C4, F1, F7, F11). The board decides next month whether to fund an onboarding rebuild. The case for funding becomes strong only if customers with longer setup times turn out to cancel in the first 90 days more often than customers with shorter setup times (C6, F9, F11).

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" (survey summary pasted by the user in this chat, first clause) | Holds |
| C2 | 18 per cent named price | SOURCED | "and 18 per cent named price." (survey summary pasted by the user in this chat, second clause) | Holds |
| C3 | Setup time is the same thing as onboarding being too slow | INFERRED | The user's reading, tested against C1 | Unresolved |
| C4 | Our customers leave because onboarding is too slow | INFERRED | The user's claim, tested against C1, C3 and C5 | Holds in part |
| C5 | Setup time was named by more of the 212 than price | INFERRED | From C1 and C2 | Holds |
| C6 | The board decides next month whether to fund an onboarding rebuild | SOURCED | "The board decides next month whether to fund an onboarding rebuild." (user message in this chat) | Holds |
| C7 | An onboarding rebuild would reduce early cancellations | INFERRED | The premise of the funding decision in C6. No row supports it | Unresolved |
| C8 | The summary does not say whether customers could name more than one reason, whether 212 is the number surveyed or the number who answered, or whether reasons came from a fixed list | INFERRED | From the text of C1 and C2, which state none of these | Unresolved |
| C9 | A customer can name setup time as a reason when another cause, such as poor fit, drove the cancellation | INFERRED | A rival reading of C1 | Unresolved |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which claim to test | All customer losses; cancellations in the first 90 days | C1, C4 | Cancellations in the first 90 days | All customer losses: C1 covers only the first 90 days | Later cancellations may have different reasons, and no row covers them (INFERRED) |
| How to read "named setup time as a reason" | As a cause of cancellation; as a reason customers reported | C1, C8, C9 | As a reason customers reported | As a cause: C1 records what customers named, and C9 is an open rival reading (INFERRED) | C8 is unresolved, so the percentages may not be shares of one reason each |
| Which term to use in the board claim | "Onboarding too slow"; "setup time" | C1, C3 | "Setup time", the survey's own term | "Onboarding too slow": C3 is unresolved | The survey's setup time item may cover more or less than onboarding (C3) |

## Adversarial findings
F1 [C4] Our customers leave because onboarding is too slow → Strongest case against: the ledger holds only reasons reported by customers who cancelled in the first 90 days. It cannot show a cause or cover later cancellations. (INFERRED)
F2 [C8] The summary does not say whether customers could name more than one reason, whether 212 is the number surveyed or the number who answered, or whether reasons came from a fixed list → Against the research: this is one summary with no stated method. If a fixed list prompted setup time, or if customers could name several reasons, the percentages cannot be read as shares of the main reason. (INFERRED)
F3 [C9] A customer can name setup time as a reason when another cause, such as poor fit, drove the cancellation → Rival explanation: the same 61 per cent is consistent with setup time being the most visible friction rather than the driver. (INFERRED)
F4 [C1] "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" → C1 would be false if the underlying responses show a different share naming setup time.
F5 [C2] "and 18 per cent named price." → C2 would be false if the underlying responses show a different share naming price.
F6 [C3] Setup time is the same thing as onboarding being too slow → C3 unresolved. Would be settled by the exact wording of the setup time item in the survey. Not used in the final position.
F7 [C4] Our customers leave because onboarding is too slow + [C1] "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" + [C5] Setup time was named by more of the 212 than price → C4 holds in part. Holds: as a reason named by 61 per cent of the 212 early cancellers. Fails: for customers who cancel after 90 days, and as a statement of cause (F1). Instead: among the 212, setup time was named more often than price. (INFERRED)
F8 [C5] Setup time was named by more of the 212 than price → C5 would be false if either percentage in C1 or C2 is wrong.
F9 [C6] "The board decides next month whether to fund an onboarding rebuild." → C6 would be false if the decision date or the scope of the funding request changes.
F10 [C7] An onboarding rebuild would reduce early cancellations → C7 unresolved. Would be settled by comparing first-90-day cancellation rates for customers with longer and shorter setup times. Not used in the final position.
F11 [F1, F2, F3, F7, F10] → Integration, conditional. Region: setup time is a defensible board claim as the most often named reported reason among first-90-day cancellers. It supports funding a rebuild only where setup time predicts cancellation. Observation that places a case in it: do customers with longer setup times cancel in the first 90 days at a higher rate than customers with shorter setup times? (INFERRED)

## Provenance
Attribution:  Drafted by an AI assistant with you, from the survey summary and the board context you gave in this chat.
Accountable:  [name to confirm]
Limitations:  The survey method is not stated. It is unclear whether customers could name several reasons, what 212 counts, or whether reasons came from a fixed list (C8). No row shows that an onboarding rebuild would reduce cancellations (C7). It is unresolved whether "setup time" means the same as onboarding (C3). The ledger gives the address of each claim, and the reader checks the cited rows before relying on them.
References:   Customer cancellation survey summary [pasted in this session; author, title, date, survey method and response base not given].

Decision for a person: whether to fund an onboarding rebuild, after checking rows C1, C3, C7 and C8, the rows that carry it.

## Evidence check
| Phrase in the output | Where | Row | Ledger words that hold it |
|---|---|---|---|
| 212 | Final position | C1 | "Of 212 customers who cancelled in the first 90 days" |
| first 90 days | Final position | C1 | "customers who cancelled in the first 90 days" |
| 61 per cent | Final position | C1 | "61 per cent named setup time as a reason" |
| setup time | Final position | C1 | "named setup time as a reason" |
| 18 per cent | Final position | C2 | "and 18 per cent named price." |
| price | Final position | C2 | "and 18 per cent named price." |
| named more often than price | Final position | C5 | Setup time was named by more of the 212 than price |
| cause | Final position | C4 | Our customers leave because onboarding is too slow |
| an onboarding rebuild would reduce cancellations | Final position | C7 | An onboarding rebuild would reduce early cancellations |
| board, next month, fund an onboarding rebuild | Final position | C6 | "The board decides next month whether to fund an onboarding rebuild." |
| customers with longer setup times | Final position | F10 | comparing first-90-day cancellation rates for customers with longer and shorter setup times |
| fixed list | F2, Limitations | C8 | whether reasons came from a fixed list |
| poor fit | F3 | C9 | another cause, such as poor fit, drove the cancellation |
| after 90 days | F7 | C1 | "customers who cancelled in the first 90 days" |

## Next
1. **You: get the survey method (C8, C3).** This week, get the survey form and the response count from whoever ran the survey. The result: C8 and C3 are settled, and the board pack states the response base and the exact setup time wording.
2. **You: test whether setup time predicts early cancellation (C7, F11).** This week, ask for first-90-day cancellation rates for customers with longer and shorter setup times. The result: a comparison that places the rebuild case inside or outside the region in F11.
3. **You: put the claim in front of the person accountable before the board meets.** Put the final position and the decision named in the provenance block in front of that person. The result: someone is named under Accountable, and that person has checked rows C1, C3, C7 and C8.

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

---

## Grading (strict)

- **P1: pass.** Turn 1 restates the claim ("Your claim, in its strongest form") and ends "Is this right, or what would you change?" with no analysis before the confirmation.
- **P2: fail.** The take-away (turn 2) never says the assistant has no web access. The word "web" appears only in turn 1 ("I have no web access in this chat"), and the Attribution and Limitations lines are silent on it. The second clause holds: no fact from memory appears, and nothing is labelled SOURCED except the pasted survey (C1, C2) and the user's own message (C6).
- **P3: pass.** C1 and C2 are SOURCED with the pasted sentence quoted verbatim, located as "survey summary pasted by the user in this chat, first clause / second clause". References holds a descriptive entry that names its unknown fields ("author, title, date, survey method and response base not given") and invents no APA 7 fields.
- **P4: pass.** Three decision-record rows, each with decision, options considered, evidence, chosen, rejected with reason, and uncertainty. None reads as a step-by-step trace.
- **P5: pass.** Accountable is "[name to confirm]". The next three moves name no person ("whoever ran the survey", "the person accountable"), no calendar date and no new source. Minor note: "This week" in moves 1 and 2 is an invented deadline, a relative timeframe rather than a date.
- **P6: fail (1 hard fail).**
  - Hard fail 1: F6 says C3 "would be settled by the exact wording of the setup time item in the survey". No row holds that the survey has a setup-time item. C8 states the opposite is unknown (the summary does not say whether reasons came from a fixed list), so this is a statement of what the source is that no cited row holds.
  - Minor: Final position sentence 3 ("The board decides next month whether to fund an onboarding rebuild.") carries no citation of its own. C6 holds it but is cited only on the next sentence.
  - Minor: The Final position cites C7's substance ("that an onboarding rebuild would reduce cancellations") but cites C4, F1, F7 and F11 instead of C7. F11 does mention the rebuild, so the fact is reachable.
  - Minor: F7 says C4 "Fails: for customers who cancel after 90 days". The evidence shows only that no row covers them (F1 says "cannot ... cover"), so "fails" is broader than its evidence.
  - Minor: C9 ("A customer can name setup time as a reason when another cause, such as poor fit, drove the cancellation") is a general behavioural claim with evidence "a rival reading of C1". It is labelled INFERRED and phrased as a possibility, so it is not graded as a new fact.
  - Evidence-check slips (sixth part, not graded under P6): four listed phrases do not appear in the copied words beside them. These are "named more often than price" (C5 reads "named by more of the 212 than price"), "an onboarding rebuild would reduce cancellations" (C7 reads "reduce early cancellations"), "customers with longer setup times" (F10 reads "longer and shorter setup times") and "after 90 days" (C1 reads "in the first 90 days"). One borderline slip: "cause" is held only as a substring of "because" in C4.
  - Checked with no problem found: every other finding sentence, the Attribution, Limitations and References lines, and the claim cells C1 to C8.

**Result: 2 properties fail (P2, P6). P6 has 1 hard fail.** P6 minor notes: 4. Evidence-check slips: 4, plus 1 borderline.
