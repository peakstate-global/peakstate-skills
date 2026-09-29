# sourced-lite, Case 3: no web access, one pasted source (run r13)

- Skill commit: b45db36
- Eval version: 2
- Host: Claude Code (Agent tool, general-purpose subagent, one fresh subagent per assistant turn)
- Model: opus (Agent tool alias; runner on claude-opus-5-5[1m])
- Date: 2026-09-29
- Unscripted questions: none. Scripted reply i) given after the first reply; reply ii) not needed.
- Runner note: each writer prompt asked for a final "RUNNER-NOTE:" line reporting checker runs. It is stripped from the replies below and recorded under RUNNER: checker. The turn-2 writer received the turn-1 reply by file path (/tmp/r13-case3/turn1.md, verbatim copy) rather than inline.

---

## USER

You have no web access in this chat. My claim: our customers leave because onboarding is too slow. Here is our survey summary: 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.' Help me make this defensible for the board pack.

## ASSISTANT

Use only a tool your organisation has approved for this information.

Before I build anything, here is my reading of what you are asking. Tell me if I have it right.

**Your claim, in its strongest form.** Slow onboarding is a reason customers leave. Your evidence is this survey summary: "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price."

**What you want.** You want to support a position, not test an open question. You want the claim worded and backed so that it holds up in front of a board.

**Who it is for.** The board, through the board pack.

**What done looks like.** A short statement for the board pack that says no more than the evidence supports. Each fact in it points to where it came from, and a provenance block names what is not yet backed.

**My reading, to confirm.** You read the 61 per cent as showing that setup time drives early cancellation more than price does. I have not assumed this. The summary gives the two figures side by side and does not rank them.

**Gaps I can see in the claim as worded:**

- **Scope.** The survey covers customers who cancelled in the first 90 days. "Our customers leave" could also mean customers who leave later. Do you mean only early cancellations, or all churn?
- **Terms.** Your claim says "onboarding is too slow". The survey says "setup time". I will keep these as two separate terms unless you tell me setup time is how you measure onboarding.
- **Multiple reasons.** The summary says "a reason", so a customer may have named more than one. I will not treat the 61 per cent and the 18 per cent as shares of one total.
- **Coverage.** The summary does not say how many cancelling customers were asked, or how the reasons were collected (a fixed list or free text).
- **No web access.** Anything I add beyond your summary, such as typical churn patterns, comes from memory. It will be labelled RECALLED, not SOURCED.

Is this right, or what would you change?

RUNNER: checker (turn 1): 0 checker runs started (writer: step 0 requires confirmation before any take-away is drafted).

## USER

Yes. The board decides next month whether to fund an onboarding rebuild.

## ASSISTANT

Thanks, that's confirmed. The board decides next month whether to fund an onboarding rebuild, so I've kept the wording to what the survey summary supports. Your summary is the only source I had, and I had no web access.

## Final position
Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason and 18 per cent named price (C1, C2, F4, F5). These are reasons customers named, not a measured cause, and they cover only cancellations in the first 90 days, so the claim that our customers leave because onboarding is too slow holds only in part (C4, F1, F7). What cancelling customers named and what a rebuild would change are two different levels, and no row that holds covers the second (F12).

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" (survey summary pasted by the user in this chat, first clause) | Holds |
| C2 | Of the same 212 customers, 18 per cent named price | SOURCED | "Of 212 customers who cancelled in the first 90 days, ... and 18 per cent named price." (survey summary pasted by the user in this chat, last clause) | Holds |
| C3 | A customer could name more than one reason | INFERRED | From C1: the summary says "a reason", not "the reason" | Unresolved |
| C4 | Our customers leave because onboarding is too slow | INFERRED | The user's claim, tested against C1, C2, C5 and C6 | Holds in part |
| C5 | Setup time is how onboarding speed is measured | INFERRED | The user's term is "onboarding"; C1 uses "setup time". The user has not linked the two terms | Unresolved |
| C6 | Reasons customers state when they cancel can differ from the causes that behaviour data shows | RECALLED | Recalled, not checked in this session. Search: exit survey stated reasons versus behavioural churn drivers | Unresolved |
| C7 | The summary gives no count of customers asked, no collection method, and names only two reasons | INFERRED | From the full pasted text in C1 and C2 | Holds |
| C8 | An onboarding rebuild would reduce cancellations in the first 90 days | INFERRED | From C1 and C4 | Unresolved |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which customers the claim covers | All customers who leave; customers who cancelled in the first 90 days | C1, C2, C4 | Customers who cancelled in the first 90 days | All customers who leave: C1 and C2 cover only customers who cancelled in the first 90 days | Reasons for leaving after 90 days may differ (INFERRED) |
| Which term to use | "Onboarding is too slow"; "setup time" | C1, C5 | "Setup time" | "Onboarding is too slow": C5 is unresolved | If setup time is only part of onboarding, a rebuild may change more or less than C1 measures (INFERRED) |
| Cause or stated reason | "Leave because"; "named as a reason" | C1, C4, C6 | "Named as a reason" | "Leave because": C1 records what customers named, and C6 is unresolved | If C6 is checked and fails, the cause wording may be supportable (INFERRED) |
| How to show setup time and price | Side by side; ranked as the main reason | C1, C2, C3, C7 | Side by side | Ranked as the main reason: C7 shows only two reasons are named, and C3 is unresolved | Reasons the summary does not name may have been named as often (INFERRED) |

## Adversarial findings
F1 [C4] Our customers leave because onboarding is too slow + [C1] "named setup time as a reason" → Strongest case against: C1 records a reason customers named, covers only customers who cancelled in the first 90 days, and uses "setup time", so the claim as worded goes beyond the ledger. (INFERRED)
F2 [C6] Reasons customers state when they cancel can differ from the causes that behaviour data shows + [C1] "61 per cent named setup time as a reason" → Against the research: if C6 holds, the 61 per cent would not show that shorter setup would have kept those customers. (INFERRED)
F3 [C7] The summary gives no count of customers asked, no collection method, and names only two reasons + [C1] "61 per cent named setup time as a reason" → Against the research: the board cannot tell from the summary how the reasons were collected or how other reasons compare, which limits how much weight the 61 per cent can carry. (INFERRED)
F4 [C1] "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" → C1 would be false if a recount of the underlying survey responses did not give 61 per cent of 212 naming setup time.
F5 [C2] "and 18 per cent named price." → C2 would be false if the same recount did not give 18 per cent naming price.
F6 [C3] A customer could name more than one reason → C3 unresolved. Would be settled by the survey form showing whether customers could give more than one reason. Not used in the final position.
F7 [C4] Our customers leave because onboarding is too slow → C4 holds in part. Holds: among customers who cancelled in the first 90 days, 61 per cent named setup time as a reason (C1). Fails: no row covers customers who leave after 90 days, "because" goes beyond a named reason (C6), and "onboarding" is not linked to "setup time" (C5). Instead: setup time is the reason 61 per cent of 90-day cancellers named. (INFERRED)
F8 [C5] Setup time is how onboarding speed is measured → C5 unresolved. Would be settled by the user stating whether setup time is the measure of onboarding speed. Not used in the final position.
F9 [C6] Reasons customers state when they cancel can differ from the causes that behaviour data shows → C6 unresolved. Would be settled by retrieving research on stated cancellation reasons versus behaviour. Not used in the final position.
F10 [C7] The summary gives no count of customers asked, no collection method, and names only two reasons → C7 would be false if the full survey report states the count, the method and the other reasons.
F11 [C8] An onboarding rebuild would reduce cancellations in the first 90 days → C8 unresolved. Would be settled by comparing 90-day cancellations for new customers given a shorter setup against new customers without it. Not used in the final position.
F12 [F1, F2, F4, F7, F11] → Integration, level shift. The two levels are what cancelling customers said (C1, C2) and what causes cancellation or would reduce it (C4, C6, C8). The first does not reduce to the second, because a named reason is a report, not a test of what changes the outcome. The survey supports telling the board what 90-day cancellers named, and it supports a test of whether shorter setup reduces cancellations; it does not by itself show that a rebuild will. (INFERRED)

## Provenance
Attribution:  Prepared by the user with help from an AI assistant, which had no web access in this chat.
Accountable:  [name to confirm]
Limitations:  The pasted survey summary (C1, C2) gives no count of customers asked, no collection method and only two reasons (C7). Whether customers could name more than one reason is unresolved (C3), and so is whether setup time measures onboarding (C5). The gap between stated reasons and causes is recalled, not checked in this session (C6). Whether a rebuild would reduce cancellations is unresolved (C8). A fresh checker read this take-away three times; the third run listed two phrases, both fixed here, and the fixed draft has not been re-checked. The ledger gives each claim's address, and the reader checks the cited rows before relying on them.
References:   Internal customer cancellation survey summary [pasted in this session; author, title, date, collection method and number of customers asked not given].

Decision for a person: whether to fund the onboarding rebuild, after checking rows C1, C2, C7 and C8, the rows that carry it.

## Next
1. **Check the recalled and unresolved rows first.** Owner: you. First action this week: get the survey form and the raw responses. Result: C3 and C7 are settled, which shows whether customers could name more than one reason, how many were asked, and which other reasons appeared. Then retrieve research for C6, and upgrade it to SOURCED or cut it.
2. **Name the accountable person.** Owner: you. First action this week: name the person accountable for the funding recommendation, and put the decision in front of them with rows C1, C2, C7 and C8. Result: the Accountable line carries a name, not "[name to confirm]".
3. **Watch for what would make the main claim false.** Owner: you. First action this week: decide where 90-day cancellation data will be compared for new customers given a shorter setup and new customers without it (F11). Result: if cancellations do not fall for the shorter-setup group, the case that setup time drives early cancellation weakens.

If you want to test hidden assumptions more deeply, a blind-spots skill can help, if you have one.

RUNNER: checker (turn 2): writer-run path (the writer started its own checkers). 3 checker runs started; run 1 listed 2 issues, run 2 listed 1 issue, run 3 listed 2 issues. Cap of three reached; the writer applied run 3's fixes without a fourth check and named this in Limitations. Checker outputs are not visible to the runner.

---

## Grading (runner, strict)

- P1 PASS: turn 1 restates the claim, names purpose, audience and done, keeps both numbers verbatim, puts the ranking under "My reading, to confirm", and ends "Is this right, or what would you change?" with no analysis.
- P2 PASS: Attribution says the assistant "had no web access in this chat" (the preamble repeats it); the one memory fact, C6, is labelled RECALLED and no RECALLED fact appears as SOURCED.
- P3 PASS: C1 and C2 are SOURCED with the pasted sentence quoted verbatim (C2 with a marked elision) and locator "survey summary pasted by the user in this chat"; References is descriptive and names author, title, date, collection method and count asked as not given.
- P4 PASS: four decision records, each with all six fields; evidence fields hold ledger ids only; none is a step-by-step trace.
- P5 PASS: Accountable is "[name to confirm]"; all three next moves have owner "you", no invented person, no calendar date (only the template's "this week"), no named source.
- P6 PASS (0 hard fails): every finding sentence, final-position sentence, claim cell and provenance line checked; no statement of what a source or firm is, does, sells or wants beyond a cited row; each final-position id holds the fact beside it (C1/C2 hold the figures, F1/F7 hold the 90-day scope and "holds in part", F12 holds the level shift); claim cells match evidence (C2 "the same 212 customers" is in C2's own evidence cell).
  - Minor: F7 header cites only [C4], but its body uses C1, C5 and C6, cited inline in brackets rather than in the header list.
  - Minor: final-position sentence 3 cites only F12 and no row; sentence 2 cites F7, whose Fails clause leans on unresolved C5 and C6 (the sentence itself does not need them).
  - Minor: F10's observation presumes a "full survey report" exists; F4's "underlying survey responses" likewise. Both are framed as checks, not facts.
  - Minor: References calls the survey "Internal"; this comes from the user's "our survey summary", not from a ledger row.
- References: kept bibliographic detail at the level the source allows, and states unknown fields. Template-required lines: none lost (all five parts, four provenance labels, "Decision for a person" line, integration line last).
