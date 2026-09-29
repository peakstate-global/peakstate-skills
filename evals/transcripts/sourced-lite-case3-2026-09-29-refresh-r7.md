# sourced-lite case 3 (refresh, no web access, one pasted source, re-run 6 on the fixed skill)

Skill commit 05d8e4b (FIXED-sourced-lite: one no-new-facts rule covering claim cells and the provenance block, integration-line grammar `F# [F#, F#] → ...`, quotation marks reserved for verbatim source words, worked example F1 corrected). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/ plus the conversation so far.

**USER:** You have no web access in this chat. My claim: our customers leave because onboarding is too slow. Here is our survey summary: 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.' Help me make this defensible for the board pack.

**ASSISTANT:**

Use only a tool your organisation has approved for this information.

Before I test anything, here is my reading of what you want. I will do no research and give no verdict until you confirm it.

**The claim, in its strongest form:** Customers leave because onboarding is too slow.

**Your evidence, exactly as you gave it:** "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price."

**What you want:** To support a position. You want the claim to hold up in front of the board, so that directors can rely on it.

**Who it is for:** The board, as part of the board pack.

**What done looks like:** A final position you can stand behind. It comes with a claim ledger showing where each claim comes from, the strongest case against it, and a provenance block the board can read.

**My reading, to confirm:**

- You treat "setup time" in the survey as the same thing as "onboarding is too slow" in your claim.
- You treat "customers who cancelled in the first 90 days" as standing for "our customers who leave" in general.
- You read setup time as a bigger reason than price because 61 per cent is higher than 18 per cent.

**Gaps I can see in the opening:**

- The summary does not say whether customers could name more than one reason.
- The summary does not say how the 212 customers were surveyed, or how many cancelling customers did not respond.
- The summary does not cover customers who left after 90 days.
- I have no web access in this chat. Anything I bring from memory will be labelled RECALLED, and I will not present it as sourced.

Is this right, or what would you change?

**USER:** Yes. The board decides next month whether to fund an onboarding rebuild.

**ASSISTANT:**

Thanks for confirming. You told me the board decides next month whether to fund an onboarding rebuild, so the position below is written for that decision. I have no web access in this chat. The survey summary you pasted is the only retrieved source, and anything from memory is labelled RECALLED.

## Final position
For the board pack, the claim you can defend is this: of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price. That puts setup time ahead of price for early cancellations (F3, F4, F7, F13). The survey summary does not support the wording "onboarding is too slow". It also does not support extending the claim to customers who left after 90 days (F5, F6).

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" (survey summary pasted in this chat, first clause) | Holds |
| C2 | Of the same 212 customers, 18 per cent named price | SOURCED | "and 18 per cent named price" (survey summary pasted in this chat, second clause) | Holds |
| C3 | Setup time in the survey is the same thing as onboarding being too slow | INFERRED | Your reading, confirmed in this chat, tested against C1 | Holds in part |
| C4 | Customers who cancelled in the first 90 days stand for all customers who leave | INFERRED | Your reading, confirmed in this chat, tested against C1 | Holds in part |
| C5 | More of the cancelling customers named setup time than named price | INFERRED | From C1 and C2 | Holds |
| C6 | Setup time was the main reason for the customers who named it | INFERRED | From C1. The summary does not say whether customers could name more than one reason, or whether they ranked their reasons | Unresolved |
| C7 | The 212 customers are all the customers who cancelled in the first 90 days, not only those who answered | INFERRED | From C1. The summary gives no response count | Unresolved |
| C8 | Customers can name a visible step, such as setup, when the underlying cause of cancellation is something else | RECALLED | Recalled, not checked in this session. Search: exit survey stated reasons versus actual churn drivers | Unresolved |
| C9 | An onboarding rebuild would reduce cancellations in the first 90 days | INFERRED | The decision you put to the board, tested against C1 to C8 | Unresolved |
| C10 | Customers leave because onboarding is too slow | INFERRED | Your claim, tested against C1 to C8 | Holds in part |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which wording of the claim goes to the board | "Customers leave because onboarding is too slow"; "61 per cent of customers who cancelled in the first 90 days named setup time as a reason" | C1, C3, C4, C10 | The second wording | The first wording goes beyond C1 in scope (C4) and in wording (C3) | If setup time was the main reason (C6) and the 212 are the full group (C7), a stronger wording may hold (INFERRED) |
| How to state the comparison with price | "Setup time is a bigger reason than price"; "More customers named setup time than named price" | C1, C2, C5, C6 | "More customers named setup time than named price" | "Bigger reason" needs the weight of each reason, which is unresolved (C6) | C6 is unresolved |
| What the survey tells the board about funding the rebuild | It shows a rebuild will cut cancellations; it shows where early cancellers point, and the effect of a rebuild stays open | C1, C5, C8, C9 | It shows where early cancellers point, and the effect of a rebuild stays open | The ledger holds nothing on the effect of a rebuild (C9), and stated reasons may differ from causes (C8) | C8 is recalled, and C9 is untested |

## Adversarial findings
F1 [C10] Customers leave because onboarding is too slow → Strongest case against: the survey records reasons that customers named, not the cause of cancellation, and it covers only the first 90 days. (INFERRED)
F2 [C8] Customers can name a visible step, such as setup, when the underlying cause of cancellation is something else → Against the research: one internal survey of self-reported reasons is the only source, and a cause that first shows up at setup would produce the same answers. (INFERRED)
F3 [C1] "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" → C1 would be false if a count of the raw survey responses gave a different share for setup time.
F4 [C2] "and 18 per cent named price" → C2 would be false if a count of the raw survey responses gave a different share for price.
F5 [C3] Setup time in the survey is the same thing as onboarding being too slow → C3 holds in part. Holds: customers named setup time as a reason (C1). Fails: the summary does not say customers found setup slow, and it does not use the word onboarding. Instead: the defensible wording is "named setup time as a reason". (INFERRED)
F6 [C4] Customers who cancelled in the first 90 days stand for all customers who leave → C4 holds in part. Holds: for customers who cancelled in the first 90 days (C1). Fails: for customers who left after 90 days, whom the summary does not cover. Instead: the ledger has no evidence on later leavers. (INFERRED)
F7 [C5] More of the cancelling customers named setup time than named price → C5 would be false if the percentages in C1 and C2 came from different groups of respondents.
F8 [C6] Setup time was the main reason for the customers who named it → C6 unresolved. Would be settled by the survey question wording: whether customers could name more than one reason, and whether they ranked them. Not used in the final position.
F9 [C7] The 212 customers are all the customers who cancelled in the first 90 days, not only those who answered → C7 unresolved. Would be settled by the number of customers who cancelled in the period and the number who answered. Not used in the final position.
F10 [C8] Customers can name a visible step, such as setup, when the underlying cause of cancellation is something else → C8 unresolved. Would be settled by comparing each customer's stated reason with that customer's own record, such as whether they finished setup. Not used in the final position.
F11 [C9] An onboarding rebuild would reduce cancellations in the first 90 days → C9 unresolved. Would be settled by giving some new customers a faster setup and comparing their 90-day cancellations with the rest. Not used in the final position.
F12 [C10] Customers leave because onboarding is too slow → C10 holds in part. Holds: 61 per cent of customers who cancelled in the first 90 days named setup time as a reason (C1), and more of them named setup time than named price (C5). Fails: as a claim about all customers who leave (C4), and as a claim that setup is "too slow" (C3). Instead: the wording in F5, limited to the region in F6. (INFERRED)
F13 [F5, F6, F7, F12] → Integration, conditional. Region: customers who cancel in the first 90 days. Observation that places a case in it: the customer's cancellation date is within 90 days of their start date. Inside that region, more customers named setup time than named price. Outside it, the ledger has no evidence either way. (INFERRED)

## Provenance
Attribution:  You supplied the claim and the survey summary, and an AI assistant drafted this analysis from them.
Accountable:  [name to confirm]
Limitations:  The survey summary is the only retrieved source, and the summary does not give the response count (C7) or say whether customers could name more than one reason (C6). The point that stated reasons can differ from causes is recalled, not checked in this session (C8). Nothing in the ledger shows what a rebuild would do to cancellations (C9).
References:   Internal survey summary of customers who cancelled in the first 90 days, n = 212 [pasted in this session; author, title and date not given].

Decision for a person: whether to fund the onboarding rebuild. Before that, check the survey question wording (C6), the response count (C7), and how the raw responses were coded as "setup time".

## Next
1. You: this week, pull the survey question wording and the response count, and use them to settle C6 and C7. Result: each of the two rows moves to holds or fails.
2. You: put the person you name under Accountable in front of the funding decision. Show them the three checks listed under Decision for a person. Result: a named person signs off the board pack wording.
3. You: watch the 90-day cancellation records for customers who finished setup quickly. If those customers cancel at the same rate as the rest, the main claim is false for them. Result: a signal you can see before and after any rebuild.

For a deeper check of hidden assumptions, you could also use a skill for blind spots, if you have one.

## Grading
- P1 pass: restates the claim and the pasted figures exactly, and asks "Is this right, or what would you change?" before any analysis.
- P2 pass: "I have no web access in this chat"; the one memory fact, C8, is RECALLED.
- P3 pass: C1 and C2 are SOURCED with the pasted sentence quoted verbatim and "survey summary pasted in this chat" as the locator; References gives "Internal survey summary ... [pasted in this session; author, title and date not given]".
- P4 pass: three decision rows, each with all six fields, none a reasoning trace.
- P5 pass: Accountable is "[name to confirm]"; the next moves name only "You" and invent no person, date or source.
- Strict fact check: all 12 finding citations match their row (script check, 0 misses). No number or scope beyond the user's input. Limitations states only what the ledger shows.
- Host-instruction leak check: none found. "per cent" comes from the user's own input.
