# sourced-lite case 3 (refresh, re-run 4 on restructured skill)

Skill commit PENDING (structural edit on 7e9db4e: findings and decision record built only from ledger rows; each finding is `F# [C#] "quote" → conclusion`; the final position cites findings by id). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/ plus the conversation so far. Case 3 subagents were told to use no web or network tool.

**USER:** You have no web access in this chat. My claim: our customers leave because onboarding is too slow. Here is our survey summary: 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.' Help me make this defensible for the board pack.

**ASSISTANT:**

Use only a tool your organisation has approved for this information.

Here is my reading of what you want to do, before I test anything.

**The claim in its strongest form:** customers who cancel early are leaving partly because onboarding takes too long, and the survey gives evidence for this.

**Your numbers, as you gave them:** of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.

**What you want:** to support a position, so that the board can rely on it.

**Who it is for:** the board, in the board pack.

**What done looks like:** a statement you can put in the board pack, with a claim ledger, the strongest case against it, and a provenance block.

**Gaps I see in the opening:**

- **Scope.** Your claim says "our customers leave". The survey covers customers who cancelled in the first 90 days. I don't know if you mean all churn or only early churn.
- **Terms.** Your claim says "onboarding is too slow". The survey says "setup time". I don't know if these mean the same thing in your business.
- **Wording of the survey.** I don't know the exact question, whether customers could name more than one reason, or how many of the 212 answered.
- **The ask.** I don't know if the board is being asked to decide something, such as funding onboarding work, or only to note the finding.

**My reading, to confirm:** you read the two figures as showing that setup time matters more to early cancellers than price does, and you read "named as a reason" as "caused them to leave". I have not assumed either of these yet.

Is this right, or what would you change?

**USER:** Yes. The board decides next month whether to fund an onboarding rebuild.

**ASSISTANT:**

I have no web access in this chat, so anything from memory is labelled RECALLED.

## Final position
Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason and 18 per cent named price. So early cancellers named setup time more often than price (F4, F5, F6, F14). The survey does not show that slow onboarding causes early cancellations, or that an onboarding rebuild would reduce them (F1, F7, F11). Put it to the board as a stated reason for early churn, not as proof that the rebuild will pay off.

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | 61 per cent of early cancellers named setup time as a reason | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" (survey summary pasted in this chat, first clause) | Holds |
| C2 | 18 per cent of early cancellers named price | SOURCED | "and 18 per cent named price" (survey summary pasted in this chat, second clause) | Holds |
| C3 | Early cancellers named setup time more often than price | INFERRED | From C1 and C2 | Holds |
| C4 | Slow onboarding causes early cancellations | INFERRED | From C1 | Holds in part |
| C5 | Setup time in the survey means onboarding in the business | INFERRED | From C1 and your opening claim | Unresolved |
| C6 | The survey speaks to all customers who leave | INFERRED | From C1 | Fails |
| C7 | The percentages cover all 212 cancellers | INFERRED | From C1 | Unresolved |
| C8 | An onboarding rebuild would reduce early cancellations | INFERRED | From C4 | Unresolved |
| C9 | Stated reasons in exit surveys can differ from what drove the behaviour | RECALLED | Recalled, not checked in this session. Search: exit survey stated reasons versus actual churn drivers | Unresolved |
| C10 | Customers who are a poor fit take longer to set up and also leave | INFERRED | A rival reading of C1 | Unresolved |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which customers the claim covers | All customers who leave; customers who cancel in the first 90 days | C1, C6 | Customers who cancel in the first 90 days | All customers who leave: C6 fails, because C1 covers only the first 90 days | Later churn could share the same reason, which this survey cannot show (INFERRED) |
| How to read "named setup time as a reason" | As the cause of cancelling; as a stated reason | C1, C4, C9, C10 | As a stated reason | As the cause: C4 holds only in part, and C9 and C10 give ways the stated reason and the cause can differ | Usage data for the 212 could support the cause reading (INFERRED) |
| Which question to answer for the board | Is setup time a stated reason for early churn; will a rebuild reduce early churn | C3, C4, C8 | Is setup time a stated reason for early churn | Will a rebuild reduce early churn: C8 is unresolved | The board's funding question is the second one, so this answer does not settle it (INFERRED) |

## Adversarial findings
F1 [C4] "Slow onboarding causes early cancellations" + [C9] "Stated reasons in exit surveys can differ from what drove the behaviour" → Strongest case against: a customer who names setup time has not shown that setup time made them cancel (INFERRED).
F2 [C10] "Customers who are a poor fit take longer to set up and also leave" → Against the research: a rival explanation fits the same figures, and under it a faster onboarding would not keep these customers (INFERRED).
F3 [C1] "Of 212 customers who cancelled in the first 90 days" + [C7] "The percentages cover all 212 cancellers" → Against the research: the evidence is one internal survey of cancellers only, with no group of retained customers to compare against, and the share who answered is not known (INFERRED).
F4 [C1] "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" → C1 would be false if the raw responses showed a share other than 61 per cent naming setup time.
F5 [C2] "and 18 per cent named price" → C2 would be false if the raw responses showed a share other than 18 per cent naming price.
F6 [C3] "Early cancellers named setup time more often than price" → C3 would be false if the two percentages turn out to use different bases.
F7 [C4] "Slow onboarding causes early cancellations" → C4 holds in part. Holds: setup time is a stated reason for 61 per cent of early cancellers (C1). Fails: as a cause, because naming a reason does not show it drove the decision (C9, C10). Instead: setup time is a stated reason that early cancellers named more often than price (C3) (INFERRED).
F8 [C5] "Setup time in the survey means onboarding in the business" → C5 unresolved. Would be settled by the exact survey question and your definition of onboarding. Not used in the final position.
F9 [C6] "The survey speaks to all customers who leave" → C6 fails. Holds: for customers who cancelled in the first 90 days (C1). Fails: for customers who leave later, whom the survey does not cover. Instead: for later leavers, this evidence gives no reason either way (INFERRED).
F10 [C7] "The percentages cover all 212 cancellers" → C7 unresolved. Would be settled by the number of the 212 who answered the reason question. Not used in the final position.
F11 [C8] "An onboarding rebuild would reduce early cancellations" → C8 unresolved. Would be settled by comparing early cancellation for customers onboarded through a faster process with customers onboarded through the current one. Not used in the final position.
F12 [C9] "Stated reasons in exit surveys can differ from what drove the behaviour" → C9 unresolved. Would be settled by checking published research on exit surveys, or by comparing the reasons the 212 named with their usage data. Not used in the final position.
F13 [C10] "Customers who are a poor fit take longer to set up and also leave" → C10 unresolved. Would be settled by comparing setup time and customer fit across cancelled and retained customers. Not used in the final position.
F14 From F4, F7, F9 and F11 → Integration, conditional. Region: customers who cancel in the first 90 days, read as stated reasons. There, setup time was named more often than price. Outside that region (later churn, causes, and the rebuild's effect) the survey does not reach. Observation that places a case in it: the customer cancelled within 90 days and named setup time in the survey (INFERRED).

## Provenance
Attribution:  Prepared by you with help from an AI assistant, from the survey summary you pasted, with no web access.
Accountable:  [name to confirm]
Limitations:  The summary does not give the survey question, whether customers could name more than one reason, or how many of the 212 answered (C5, C7). Nothing here tests whether a rebuild would reduce early cancellations (C8). The point that stated reasons can differ from causes is recalled, not checked in this session (C9).
References:   Internal survey summary of customers who cancelled in the first 90 days, n = 212 [pasted in this session; author, title and date not given].

Decision for a person: the board decides next month whether to fund the onboarding rebuild. First check the exact survey question, how many of the 212 answered, and whether "setup time" means the onboarding the rebuild would change.

A cut-down, markdown-only version of the SOURCED method (S1).

## Next

1. **Owner: you.** This week, pull the survey question wording and the response count for the 212. Result: C5 and C7 move from unresolved to holds or fails.
2. **Owner: you.** This week, put a name under Accountable and put the funding decision in front of that person with the three checks above. Result: a named person signs off the board pack wording.
3. **Owner: you.** This week, compare setup time and early cancellation across cancelled and retained customers in your own data. Result: you can see whether early cancellation rises with setup time, which is the observation that would weaken or support the causal reading (F1, F13).

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

## Grading
- P1 pass: restates the claim, gives the numbers exactly as the user gave them, puts any ranking or cause under "My reading, to confirm", and ends "Is this right, or what would you change?" before any analysis.
- P2 pass: "I have no web access in this chat, so anything from memory is labelled RECALLED." The one memory fact, C9, is "RECALLED | Recalled, not checked in this session".
- P3 pass: C1 SOURCED with "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" (survey summary pasted in this chat, first clause). References: "Internal survey summary of customers who cancelled in the first 90 days, n = 212 [pasted in this session; author, title and date not given]".
- P4 pass: three records, each with decision, options considered, evidence (ids only), chosen, rejected and uncertainty; none is a step-by-step trace.
- P5 pass: "Accountable:  [name to confirm]". The next moves name only "you", with no invented person, date or source. Strict check: all finding quotes appear in their rows (0 misses); every number in the take-away is the user's.
