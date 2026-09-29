# sourced-lite case 3 (refresh, no web access, re-run 5 on the repaired skill)

Skill commit PENDING (7e9db4e with the restructure of 1e361d8, plus a repaired references/take-away.md: the file was 1MB of one repeated line and is now the 57-line template and worked example in the new finding-line shape). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/ plus the conversation so far.

**USER:** You have no web access in this chat. My claim: our customers leave because onboarding is too slow. Here is our survey summary: 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.' Help me make this defensible for the board pack.

**ASSISTANT:**

Before I test anything, I want to check I have your claim right. Because this is customer survey data, use only a tool your organisation has approved for this information.

**The strongest version of your claim, as I read it**

Slow onboarding is a real driver of early customer cancellations, and fixing setup time is worth the board's attention.

**What you gave me, restated exactly**

- Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.

**What you want**

You want to support a position: turn "our customers leave because onboarding is too slow" into a statement you can defend in front of the board.

**Who it is for**

The board, as part of the board pack.

**What done looks like**

A short, board-ready position that says what the survey does and does not show, with each claim labelled by where it came from, the strongest case against it, and a provenance block.

**My reading, to confirm**

- My reading, to confirm: you treat "named setup time as a reason" as evidence that slow onboarding causes customers to leave.
- My reading, to confirm: "onboarding" and "setup time" mean the same thing here.

**Gaps I can see in the opening**

- The survey covers customers who cancelled in the first 90 days. Your claim says "our customers" with no time limit. Do you mean early cancellations only, or all cancellations?
- I do not know if customers could name more than one reason.
- I do not know how the survey was run, for example how many people were asked and how many answered, or whether reasons were a pick-list or free text.
- I do not know if the board needs a decision from this (for example, funding an onboarding fix) or only an explanation of churn.

Is this right, or what would you change?

**USER:** Yes. The board decides next month whether to fund an onboarding rebuild.

**ASSISTANT:**

Thank you. The board decides next month whether to fund an onboarding rebuild, so I have tested the claim against that decision. I have no web access in this chat, so the only source is the survey summary you pasted. Every other row below is my own inference and is labelled INFERRED.

## Final position

Among the 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason and 18 per cent named price, so setup time is a named reason for early cancellations and was named more often than price (F4, F5, F6). The survey does not yet show that slow onboarding causes those cancellations, that it explains cancellations after 90 days, or that a rebuild would keep these customers (F1, F2, F7, F9, F10). For the board: the survey supports putting onboarding on the agenda for early cancellations, and the case to fund a rebuild needs the three checks under "Decision for a person" first (F11).

## Claim ledger

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | 61 per cent of early cancellers named setup time as a reason | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" (your survey summary, pasted in this chat) | Holds |
| C2 | 18 per cent of early cancellers named price as a reason | SOURCED | "and 18 per cent named price" (your survey summary, pasted in this chat) | Holds |
| C3 | Setup time was named by more early cancellers than price | INFERRED | From C1 and C2 | Holds |
| C4 | Slow onboarding causes customers to cancel in the first 90 days | INFERRED | From C1 | Holds in part |
| C5 | Customers who cancel after 90 days leave for the same reasons | INFERRED | From C1 only; the survey covers the first 90 days | Unresolved |
| C6 | The 212 respondents represent all customers who cancelled in the first 90 days | INFERRED | Not stated in the summary; response rate and survey method not given | Unresolved |
| C7 | Customers could name more than one reason | INFERRED | Not stated in the summary | Unresolved |
| C8 | A customer who was a poor fit for the product could also name setup time as a reason | INFERRED | Rival explanation for C1 | Unresolved |
| C9 | An onboarding rebuild would cut setup time enough to keep these customers | INFERRED | From C4; no data on a rebuild | Unresolved |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which claim to defend | "Our customers leave because onboarding is too slow"; "Setup time is a named reason for early cancellations" | C1, C5 | Setup time is a named reason for early cancellations | The all-customers claim: C1 covers only the first 90 days, and C5 is unresolved | Cancellations after 90 days may follow the same pattern, which would widen the claim (C5) |
| How to read "named setup time as a reason" | As a cause of cancellation; as a stated reason | C1, C4, C8 | As a stated reason | As a cause: C8 gives a rival reading of the same answers, and C4 holds only in part | Setup time may be the real cause, which C8 cannot rule out on its own (INFERRED) |
| What the survey can support for the board | Fund the rebuild now; put onboarding on the agenda and check before funding | C4, C6, C9 | Put onboarding on the agenda and check before funding | Fund now: C9 is unresolved and C6 leaves the sample unknown | The checks may take longer than the board's timeline allows (INFERRED) |

## Adversarial findings

F1 [C4] "Slow onboarding causes customers to cancel in the first 90 days" + [C8] "A customer who was a poor fit for the product could also name setup time as a reason" → Strongest case against: naming a reason is not the same as that reason causing the cancellation, and a poor-fit customer could give the same answer. (INFERRED)
F2 [C6] "The 212 respondents represent all customers who cancelled in the first 90 days" → Against the research: if the 212 are only the customers who chose to answer, the percentages describe answerers, not all early cancellers. (INFERRED)
F3 [C1] "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" → Against the research: this is one internal survey, with no second source in the ledger to confirm it. (INFERRED)
F4 [C1] "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" → C1 would be false if the raw survey responses gave a different count for setup time.
F5 [C2] "and 18 per cent named price" → C2 would be false if the raw survey responses gave a different count for price.
F6 [C3] "Setup time was named by more early cancellers than price" → C3 would be false if the raw responses showed price named as often as setup time or more often.
F7 [C4] "Slow onboarding causes customers to cancel in the first 90 days" → C4 holds in part. Holds: setup time is a reason early cancellers gave. Fails: as a cause, because C8 is not ruled out. Instead: setup time is a stated reason for early cancellation, and its causal weight is untested. (INFERRED)
F8 [C5] "Customers who cancel after 90 days leave for the same reasons" → C5 unresolved. Would be settled by: the same question asked of customers who cancelled after 90 days. Not used in the final position.
F9 [C6] "The 212 respondents represent all customers who cancelled in the first 90 days" → C6 unresolved. Would be settled by: the number of customers who cancelled in the first 90 days and the number asked, compared with the 212 who answered. Not used in the final position.
F10 [C7] "Customers could name more than one reason" + [C8] "A customer who was a poor fit for the product could also name setup time as a reason" + [C9] "An onboarding rebuild would cut setup time enough to keep these customers" → C7, C8 and C9 unresolved. Would be settled by, in turn: the survey question format; setup time for customers who cancelled compared with customers who stayed; a trial of a faster setup on a group of new customers. Not used in the final position.
F11 From F4, F6, F7 and F10 → Integration, conditional. Region where the claim holds: customers who cancel in the first 90 days, read as a stated reason. Observation that places a case in it: did the customer cancel within 90 days and name setup time? Outside that region, and for the funding case, the claim waits on the checks in F9 and F10. (INFERRED)

## Provenance

Attribution:  Prepared by you with help from an AI assistant, from your pasted survey summary only.
Accountable:  [name to confirm]
Limitations:  The survey summary does not state the response rate, how the question was asked, or whether customers could name more than one reason (C6, C7). No data covers cancellations after 90 days (C5). No data shows that a rebuild would cut setup time or keep customers (C9).
References:   Internal survey summary of customers who cancelled in the first 90 days, n = 212 [pasted in this session; author, title, date and survey method not given].

Decision for a person: whether to fund the onboarding rebuild, after checking the response rate (C6), the question format (C7), and setup time for customers who cancelled compared with customers who stayed (C8).

A cut-down, markdown-only version of the SOURCED method (S1).

## Next

1. **You:** this week, ask whoever ran the survey for the response rate and the exact question format. Result: C6 and C7 move from unresolved to holds or fails.
2. **You:** put the person you name under Accountable in front of the funding decision, with the three checks above. Result: a named owner signs off the board paper.
3. **You:** compare setup time for customers who cancelled with customers who stayed, using your own records. Result: if the two groups show the same setup time, C4 fails and the case for a rebuild weakens; this shows in your onboarding records.

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

## Grading
- P1 pass: restates "Slow onboarding is a real driver of early customer cancellations", repeats the survey figures exactly, and ends "Is this right, or what would you change?" before any analysis.
- P2 pass: the take-away opens "I have no web access in this chat, so the only source is the survey summary you pasted". No fact from memory appears; every non-survey row is INFERRED.
- P3 pass: C1 and C2 are SOURCED with the pasted sentence quoted and "your survey summary, pasted in this chat" as the locator. References: "Internal survey summary of customers who cancelled in the first 90 days, n = 212 [pasted in this session; author, title, date and survey method not given]."
- P4 pass: three decision records, each with decision, options considered, evidence (ledger ids only), chosen, rejected and uncertainty. None reads as a reasoning trace.
- P5 pass: "Accountable:  [name to confirm]". The next moves name only "You" and "whoever ran the survey", with no invented person, date or source.
- Strict check: findings hold only the 11 numbered lines, and every quoted string is in its cited row (script check, 13 quotes, 0 misses). Every number in the take-away is the user's (212, 61, 18, 90 days). Notes, not fails: F10 covers three rows (C7, C8, C9) in one line, where step 3 asks for one line per row; the stray line "A cut-down, markdown-only version of the SOURCED method (S1)." is copied from SKILL.md.
