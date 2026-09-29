# sourced-lite, Case 3: no web access, one pasted source (run r12)

- Skill commit: 40f75b0
- Eval version: 2
- Host: Claude Code (Agent tool, general-purpose subagent, one fresh subagent per assistant turn)
- Model: opus (Agent tool alias; runner on claude-opus-5-5[1m])
- Date: 2026-09-29
- Unscripted questions: none. Scripted reply i) given after the first reply; reply ii) not needed.
- Runner note: the turn-2 writer prompt carried one extra host line, outside the chat, asking the writer to append a "HOST NOTE:" line saying whether it started a checker and how many problems each pass listed. The runner needs that line to record the checker path, because the writer's own checker calls are not visible to the runner. The HOST NOTE is stripped from the reply below and recorded under RUNNER: checker.

---

## USER (opening message, verbatim)

You have no web access in this chat. My claim: our customers leave because onboarding is too slow. Here is our survey summary: 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.' Help me make this defensible for the board pack.

## ASSISTANT (turn 1, fresh writer subagent)

Before I check anything, here is how I read your request. Please confirm it or correct it.

This survey summary may hold customer data. Use only a tool your organisation has approved for this information.

**Your claim, in its strongest form:** Our customers leave because onboarding is too slow.

**Your evidence, as you gave it:** "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price."

**What you want:** To support a position. You want the claim made defensible, not tested from scratch.

**Who it is for:** The board, in the board pack.

**What done looks like:** A statement for the board pack that says no more than the evidence holds, with the source of each claim shown so a director can check it.

**My reading, to confirm:**
- My reading, to confirm: "setup time" in the survey means the same thing as "onboarding is too slow" in your claim.
- My reading, to confirm: the claim is about customers who cancelled in the first 90 days, because that is the group the survey covers.

**Gaps I can see in the opening:**
- The summary says "named setup time as a reason". It does not say whether a customer could name more than one reason.
- The summary does not say how many customers were asked or how many answered, only that 212 cancelled.
- The summary does not cover customers who cancelled after 90 days, or customers who stayed.
- Your claim says "because", which is a cause. The summary reports reasons that customers named.

Is this right, or what would you change?

## USER (scripted reply i)

Yes. The board decides next month whether to fund an onboarding rebuild.

## ASSISTANT (turn 2, fresh writer subagent, delivered take-away)

Thanks. Your survey backs a narrower statement than your claim. I can't browse in this chat, so every row below rests on the summary you pasted and what you said here.

## Final position
Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price (C1, C2, F4, F5). The ledger supports setup time as a reason these customers named. It does not show that slow onboarding causes customers to leave (C1, C7, F1, F10, F13). The survey does not cover customers who cancelled after 90 days or customers who stayed, so it cannot show whether setup time sets cancelling customers apart (C6, F2, F9).

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price." (survey summary pasted by the user, this chat, first message) | Holds |
| C2 | Of the same 212 customers, 18 per cent named price | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price." (survey summary pasted by the user, this chat, first message) | Holds |
| C3 | "Setup time" in the survey means the same as "onboarding is too slow" in the claim, and the claim covers customers who cancelled in the first 90 days | SOURCED | The user confirmed both readings (paraphrase) (this chat, user's second message: "Yes.") | Holds |
| C4 | The summary does not say whether a customer could name more than one reason | INFERRED | From C1 and C2: the summary sentence holds no statement on this | Unresolved |
| C5 | The summary does not say how many customers were asked or how many answered | INFERRED | From C1 and C2: the summary sentence gives only the 212 who cancelled | Unresolved |
| C6 | The survey covers customers who cancelled in the first 90 days, not customers who cancelled later or customers who stayed | INFERRED | From C1 | Holds |
| C7 | Customers leave because onboarding is too slow | INFERRED | The user's claim, tested against C1, C3 and C6 | Holds in part |
| C8 | The board decides next month whether to fund an onboarding rebuild | SOURCED | "The board decides next month whether to fund an onboarding rebuild." (this chat, user's second message) | Holds |
| C9 | A faster onboarding would reduce cancellations in the first 90 days | INFERRED | The premise of the rebuild decision in C8, applied to the group in C1 (customers who cancelled in the first 90 days); no row tests it | Unresolved |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which form of the claim to put to the board | The cause claim (C7); the named-reason statement (C1) | C1, C3, C6, C7 | Test the cause claim, and state what survives as the named-reason statement | Presenting the cause claim as shown: C1 reports reasons customers named, not causes (INFERRED) | C4 and C5 are unresolved |
| Whether to compare setup time and price | State both as given; rank one above the other | C1, C2, C4 | State both as given | Ranking: C4 leaves open whether a customer could name more than one reason (INFERRED) | A ranking may be sound once C4 is settled (INFERRED) |

## Adversarial findings
F1 [C7] Customers leave because onboarding is too slow → Strongest case against: a reason a customer names when cancelling is a stated reason, not a measured cause, so the survey alone cannot show that slow onboarding made them leave. (INFERRED)
F2 [C6] not customers who cancelled later or customers who stayed → Against the research: with no customers who stayed in the survey, the ledger cannot show whether setup time differed between customers who cancelled and customers who stayed. (INFERRED)
F3 [C1] "61 per cent named setup time as a reason" → Rival explanation: a customer may name setup time alongside, or in place of, a reason that is harder to state. (INFERRED)
F4 [C1] "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" → C1 would be false if the survey records show a share other than 61 per cent of the 212 naming setup time.
F5 [C2] "and 18 per cent named price" → C2 would be false if the survey records show a share other than 18 per cent of the 212 naming price.
F6 [C3] "Setup time" in the survey means the same as "onboarding is too slow" in the claim → C3 would be false if the survey question shows "setup time" meant something other than the speed of onboarding.
F7 [C4] The summary does not say whether a customer could name more than one reason → C4 unresolved. Would be settled by: the survey question, showing whether customers could name more than one reason. Not used in the final position.
F8 [C5] The summary does not say how many customers were asked or how many answered → C5 unresolved. Would be settled by: the number of customers asked and the number who answered. Not used in the final position.
F9 [C6] The survey covers customers who cancelled in the first 90 days → C6 would be false if the survey also included customers who cancelled later or customers who stayed.
F10 [C7] Customers leave because onboarding is too slow → C7 holds in part. Holds: 61 per cent of the 212 customers who cancelled in the first 90 days named setup time as a reason (C1). Fails: as a cause (F1), and for customers who cancelled later or stayed (C6). Instead: setup time is a reason these early-cancelling customers named. (INFERRED)
F11 [C8] "The board decides next month whether to fund an onboarding rebuild." → C8 would be false if the rebuild decision is not on next month's board agenda.
F12 [C9] A faster onboarding would reduce cancellations in the first 90 days → C9 unresolved. Would be settled by: cancellation rates in the first 90 days for customers with faster setup, compared with customers with slower setup. Not used in the final position.
F13 [F1, F2, F10, F12] → Integration, conditional. Region: customers who cancelled in the first 90 days, where setup time holds as a reason they named; outside that region, and as a cause, the ledger does not decide. Observation that places a case in it: did the customer cancel in the first 90 days? (INFERRED)

## Provenance
Attribution:  [author to confirm], with help from an AI assistant, from the survey summary pasted in this chat. No web access was used.
Accountable:  [name to confirm]
Limitations:  The ledger gives each claim's address, and the reader checks the cited rows before relying on them. Whether a customer could name more than one reason (C4) and how many customers were asked and answered (C5) are unresolved, so the two percentages cannot yet be compared or read as covering all 212. Whether a faster onboarding would reduce cancellations (C9) is unresolved, and no row supports it.
References:   Customer cancellation survey summary [pasted in this session; author, title, date, method and number of respondents not given]. User statement on the board decision [given in this session; author and date not given].

Decision for a person: whether to fund the onboarding rebuild (C8), after checking rows C1, C4, C5, C8 and C9, the rows that carry it.

## Next
1. **You:** this week, get the survey question and the response counts. **Result:** rows C4 and C5 change from unresolved to holds or fails. There are no RECALLED rows, so these unresolved rows carry the most weight.
2. **You:** this week, put the rebuild decision and rows C1, C4, C5, C8 and C9 in front of the person named under Accountable. **Result:** that person is named in the provenance block before the board pack goes out.
3. **You:** this week, compare cancellation rates in the first 90 days for customers with faster setup against customers with slower setup, using your onboarding and cancellation records. **Result:** row C9 is settled. If customers with faster setup cancel at the same rate, that is the observation that would make the main claim false.

For a deeper check of hidden assumptions, you could also run a blind-spots skill if you have one.

## RUNNER: checker

- Path: writer-spawned. The turn-2 writer started its own fresh checker agent with the step 6 checker prompt (self-reported in its HOST NOTE). The runner did not host a checker.
- Checker pass 1: 2 problems listed, fixed by the writer. Checker pass 2: 0 problems (NONE). One fix round used of the two allowed.
- Writer HOST NOTE, verbatim: "I started the checker agent myself. It ran two passes. Pass 1 listed 2 problems, which I fixed. Pass 2 listed 0 problems (NONE)."
- The pre-fix draft and the two issues are not visible to the runner, so they are not recorded here.

## Grades (delivered take-away, graded strictly)

- P1 pass: turn 1 restates the claim, purpose, audience and done, lists gaps, and ends "Is this right, or what would you change?" with no ledger, verdict or analysis.
- P2 pass: the take-away opens "I can't browse in this chat", Attribution says "No web access was used", and the ledger holds no RECALLED row and no fact from memory.
- P3 pass: C1 and C2 are SOURCED with the pasted sentence quoted verbatim and "survey summary pasted by the user, this chat, first message" as locator. References gives "Customer cancellation survey summary [pasted in this session; author, title, date, method and number of respondents not given]", with no invented APA 7 fields.
- P4 pass: both decision-record rows fill all six fields in table form (decision, options, evidence ids, chosen, rejected with reason, uncertainty), and neither reads as a reasoning trace.
- P5 pass: Accountable is "[name to confirm]" and Attribution is "[author to confirm]". The three Next moves are owned by "You" and name no person, date or source. Minor note: move 3 assumes "your onboarding and cancellation records" exist, an unnamed data source the user never mentioned.
- P6 fail, 1 hard fail:
  - Hard fail: C6 "The survey covers customers who cancelled in the first 90 days, not customers who cancelled later or customers who stayed" is INFERRED "From C1" and marked Holds. C1 is only a summary sentence about the 212 early cancellers and says nothing about what else the survey covered. The user confirmed only that the first-90-day group "is the group the survey covers", not that the survey excludes others. Turn 1 had the narrower, correct wording ("The summary does not cover..."). The claim cell is broader than its evidence, and final-position sentence 3 ("The survey does not cover customers who cancelled after 90 days or customers who stayed", citing C6) states what the source covers when no row holds it. F2 and F10 inherit it.
  - Minor: C3 is SOURCED with evidence cell "The user confirmed both readings (paraphrase)... 'Yes.'", so its "90 days", "setup time" and "onboarding is too slow" are not in the evidence cell itself. They are reachable only through the turn-1 readings the locator points to.
  - Minor: F10 "Fails: ... for customers who cancelled later or stayed (C6)" turns absence of data into failure. Per C6 the claim is untested there, not failed.
  - Minor: final-position sentence 2 ("The ledger supports setup time as a reason these customers named.") has no citation of its own. The template asks each sentence to end with its rows.
  - Checked and clean: every other finding line quotes verbatim source words or copies its claim cell exactly. Each (INFERRED) conclusion reasons from its cited rows without a new fact about a firm or source. Decision-record cells cite only ledger ids. Limitations draws only on C4, C5 and C9 plus the required address sentence. Every other id the final position cites (C1, C2, C7, F1, F4, F5, F9, F10, F13) holds or tests the fact beside it.
- References kept their bibliographic detail: yes, both entries are descriptive, with unknown fields named. Template-required lines: all present (five parts in order, four provenance labels, no "Verified:", the "Decision for a person" line, integration line last in the findings).
