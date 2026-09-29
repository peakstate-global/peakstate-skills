# sourced-lite case 3 (refresh, no web access, one pasted source, re-run 7)

Skill commit df6d7ce (fix(sourced-lite): INFERRED never licenses a fact, a stake needs a row). Eval version 2. Host Claude Code, model claude-opus-5-5[1m] (Agent tool, general-purpose, model opus). Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/ plus the conversation so far, with no web access. No unscripted question arose.

**USER:** You have no web access in this chat. My claim: our customers leave because onboarding is too slow. Here is our survey summary: 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.' Help me make this defensible for the board pack.

**ASSISTANT:**

Before I check anything, here is my strongest reading of your claim. Please confirm it or correct it.

Customer survey data can be sensitive. Use only a tool your organisation has approved for this information.

**Your claim, in its strongest form:** customers leave because onboarding is too slow.

**Your evidence, exactly as you gave it:** "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price."

**What you want:** to support a position, not to test an open question.

**Who it is for:** the board, in the board pack.

**What done looks like:** a claim you can put in the board pack and defend if a director asks where the claim comes from and how far it goes.

**My reading, to confirm:**
- You read "setup time" as the same thing as "onboarding is too slow".
- You read the 61 per cent against the 18 per cent as saying setup time matters more than price for these customers.
- By "customers leave", you mean these 212 early cancellations. You do not mean customers who cancel after 90 days, or all churn.

**Gaps I cannot fill from what you gave me:**
- I do not know if customers could name more than one reason. "as a reason" suggests they could.
- I do not know if the 212 are all customers who cancelled in the first 90 days, or only the ones who answered the survey.
- I do not know what the other options on the survey were.
- I do not know if you have any figures for customers who stayed, for example how long setup took for them.

Is this right, or what would you change?

**USER:** Yes. The board decides next month whether to fund an onboarding rebuild.

**ASSISTANT:**

Thanks for confirming. I have no web access in this chat, so the only source is the survey summary you pasted. I label anything from memory as RECALLED.

## Final position
For the board pack, the defensible claim is this: of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price. More of them named setup time than price (F4, F5, F9). The survey does not yet show that slow onboarding causes cancellation, or that a rebuild would reduce it, because it has no setup figures for customers who stayed (F1, F10, F13).

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | 212 customers cancelled in the first 90 days | SOURCED | "Of 212 customers who cancelled in the first 90 days" (survey summary pasted in this chat, sentence 1) | Holds |
| C2 | 61 per cent of the 212 named setup time as a reason | SOURCED | "61 per cent named setup time as a reason" (survey summary pasted in this chat, sentence 1) | Holds |
| C3 | 18 per cent of the 212 named price | SOURCED | "and 18 per cent named price" (survey summary pasted in this chat, sentence 1) | Holds |
| C4 | Customers could name more than one reason | INFERRED | From the words "as a reason" in C2 | Unresolved |
| C5 | The 212 are every customer who cancelled in the first 90 days, not only survey respondents | INFERRED | From C1 | Unresolved |
| C6 | Naming setup time as a reason means onboarding was too slow | INFERRED | From C2 | Holds in part |
| C7 | Setup time was named by more of the 212 than price | INFERRED | From C2 and C3 | Holds |
| C8 | Setup took longer for customers who cancelled than for customers who stayed | INFERRED | C10 needs this row. No figures for customers who stayed were given | Unresolved |
| C9 | Reasons named in an exit survey can differ from what drove the cancellation | RECALLED | Recalled, not checked in this session. Search: exit survey stated reasons churn validity | Unresolved |
| C10 | Customers leave because onboarding is too slow | INFERRED | From C2, C6, C7 and C8 | Holds in part |
| C11 | A faster onboarding would reduce cancellations in the first 90 days | INFERRED | From C8 and C10 | Unresolved |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which customers the claim covers | All churn; cancellations in the first 90 days | C1, C5 | Cancellations in the first 90 days | All churn: no row covers cancellations after 90 days (INFERRED) | C5 is unresolved, so the 212 may be respondents only |
| Whether to present a stated reason or a cause | Stated reason (C2); cause (C10) | C2, C8, C9, C10 | Stated reason | Cause: it rests on C8, which is unresolved | C9: a stated reason can differ from what drove the cancellation |
| How to compare 61 and 18 per cent | As shares of one total; as separate mentions | C2, C3, C4 | As separate mentions, compared only as more or fewer (C7) | As shares of one total: C4 is unresolved, so the figures may overlap | C4: the survey wording is unknown |

## Adversarial findings
F1 [C10] Customers leave because onboarding is too slow + [C8] Setup took longer for customers who cancelled than for customers who stayed → Strongest case against: without setup figures for customers who stayed, the survey cannot show that slow setup separates the customers who left from the customers who stayed. (INFERRED)
F2 [C9] Reasons named in an exit survey can differ from what drove the cancellation → Against the research: the 61 per cent measures what cancelling customers said, not what caused them to cancel. (INFERRED)
F3 [C1] "Of 212 customers who cancelled in the first 90 days" → C1 would be false if the survey records show a different count of customers who cancelled in the first 90 days.
F4 [C2] "61 per cent named setup time as a reason" → C2 would be false if a recount of the 212 responses gives a different share naming setup time.
F5 [C3] "and 18 per cent named price" → C3 would be false if a recount of the 212 responses gives a different share naming price.
F6 [C4] Customers could name more than one reason → C4 unresolved. Would be settled by: the survey question and its answer format. Not used in the final position.
F7 [C5] The 212 are every customer who cancelled in the first 90 days, not only survey respondents → C5 unresolved. Would be settled by: comparing 212 with the total count of cancellations in the first 90 days for the same period. Not used in the final position.
F8 [C6] Naming setup time as a reason means onboarding was too slow → C6 holds in part. Holds: setup time is part of onboarding, and the cancelling customers named it (C2). Fails: "named setup time as a reason" does not say the setup was too slow. It could mean setup was hard in some other way. Instead: 61 per cent of the 212 named setup time as a reason. (INFERRED)
F9 [C7] Setup time was named by more of the 212 than price → C7 would be false if a recount showed price named as often as setup time or more often.
F10 [C8] Setup took longer for customers who cancelled than for customers who stayed → C8 unresolved. Would be settled by: comparing setup duration for customers who stayed past 90 days with setup duration for the 212. Not used in the final position.
F11 [C9] Reasons named in an exit survey can differ from what drove the cancellation → C9 unresolved, recalled and not checked. Would be settled by: checking research on exit-survey validity, or by matching each stated reason against that customer's recorded setup duration. Not used in the final position.
F12 [C10] Customers leave because onboarding is too slow → C10 holds in part. Holds: as a stated reason among the 212 early cancellations, where 61 per cent named setup time (C2). Fails: as a cause, because C8 is unresolved, and for cancellations after 90 days, which no row covers. Instead: of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price. (INFERRED)
F13 [C11] A faster onboarding would reduce cancellations in the first 90 days → C11 unresolved. Would be settled by: the C8 comparison, or a trial of faster onboarding that measures cancellations in the first 90 days. Not used in the final position.
F14 [F1, F2, F12, F13] → Integration, level shift. The first level is what cancelling customers said, and the survey supports that level. The second level is what separates the customers who leave from the customers who stay, and the survey does not reach it. The first level does not reduce to the second, because customers who stayed could have had the same setup time and never been asked. The board pack can state the first level now. The funding case needs the second level, or a rebuild funded as a test with cancellations in the first 90 days as its measure. (INFERRED)

## Provenance
Attribution:  An AI assistant drafted this from a survey summary the user pasted in this chat, with no web access and no other sources.
Accountable:  [name to confirm]
Limitations:  The claim that slow onboarding causes cancellation, and the claim that a rebuild would reduce it, rest on unresolved rows (C8, C11). The survey wording is not known, so the 61 and 18 per cent may overlap (C4). The summary does not say if the 212 are all early cancellations or only respondents (C5). The point that stated reasons can differ from actual causes is recalled, not checked (C9).
References:   Internal survey summary of customers who cancelled in the first 90 days, n = 212 [pasted in this session; author, title, date and question wording not given].

Decision for a person: decide whether the board pack presents setup time as a stated reason or as a cause. Before that, check the survey wording, check whether 212 is every early cancellation, and check setup time for customers who stayed.

A cut-down, markdown-only version of the SOURCED method (S1).

## Next
1. You: this week, pull the survey question and the total count of cancellations in the first 90 days. The result is that C4 and C5 each become holds or fails.
2. You: put the person named under Accountable in front of the stated-reason-or-cause decision before the board pack is locked. The result is a named owner for the claim the board reads.
3. You: this week, ask for setup duration for customers who stayed past 90 days next to the 212. This is the observation that would confirm or break the causal claim. It shows up as a gap, or no gap, between the two groups.

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

## Grading
- P1 pass: restates the claim, quotes the pasted sentence verbatim, names purpose, audience and done, and ends "Is this right, or what would you change?" with no analysis.
- P2 pass: "I have no web access in this chat" opens the take-away and Attribution repeats "with no web access"; the one memory fact, C9, is RECALLED.
- P3 pass: C1 to C3 are SOURCED with verbatim fragments and "survey summary pasted in this chat, sentence 1" as locator; References is descriptive and lists "author, title, date and question wording not given".
- P4 pass: three decision rows, each with all six fields, none a reasoning trace.
- P5 pass: Accountable is "[name to confirm]"; next moves name only "You" and "the person named under Accountable", no invented source. Note: "this week" is a relative timeframe, not a named date.
- P6 FAIL (strict): (a) the final position states "of 212 customers who cancelled in the first 90 days" but cites F4, F5, F9 (rows C2, C3, C7); the cancellation window is held only by C1/F3, which the position does not cite, and the ids sit at sentence end rather than beside each fact. (b) F2 cites only [C9] yet states a fact from C2 ("the 61 per cent measures what cancelling customers said"). (c) The final position says "a rebuild would reduce it" citing F13, whose row C11 holds "a faster onboarding", not a rebuild; the rebuild comes only from the user's reply. Minor, not decisive alone: F8 "setup time is part of onboarding" is a domain statement no row holds, carried under (INFERRED). Claim cells: none broader than evidence. Provenance block: every statement held by a cited row or the paste.
- Triage suggestion: skill fault on citation completeness (final position and integration-adjacent findings do not cite every row whose fact they restate).
