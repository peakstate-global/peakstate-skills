# sourced-lite case 3 (refresh, re-run on fixed skill)

Skill commit FIXED-sourced-lite (uncommitted edit on 7e9db4e). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/.

**USER:** You have no web access in this chat. My claim: our customers leave because onboarding is too slow. Here is our survey summary: 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.' Help me make this defensible for the board pack.

**ASSISTANT:**

Before I start, here is how I read what you want. Customer survey data can be sensitive, so use only a tool your organisation has approved for this information.

**The claim, in its strongest form:** Slow onboarding is the main reason customers cancel early. Your survey supports this: of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price. So setup time was named more than three times as often as price.

**What you want:** Support a position. You want the board to accept slow onboarding as the leading driver of early cancellation, and you want the claim to hold up under questioning.

**Who it is for:** The board, through the board pack.

**What done looks like:** A claim you can put in the board pack at the strength the evidence allows. It comes with a claim ledger, the decisions that shaped it, the strongest case against it, and a provenance block. If the evidence supports a narrower claim than "customers leave because onboarding is too slow", you get the narrower claim.

**Gaps I can see in the opening:**

- **Scope.** Your survey covers only customers who cancelled in the first 90 days. Your claim is about "our customers" in general. I read it as early cancellation unless you tell me otherwise.
- **"Too slow" versus "setup time".** The survey records that setup time was named as a reason. It does not say whether customers meant slow, complicated, or effortful. I will treat these as possibly different.
- **The decision behind it.** I assume the board pack asks for something, such as funding to speed up onboarding. If so, the claim needs to be strong enough for that decision, and I will test it against that.
- **Evidence limits.** I have no web access in this chat. The only retrieved source is the survey summary you pasted. Anything else I bring in, such as general research on churn or survey method, will be labelled RECALLED, not SOURCED.

Is this right, or what would you change?


**USER:** Yes. The board decides next month whether to fund an onboarding rebuild.

**ASSISTANT:**

Thanks. The claim is being tested against one decision: whether the board funds an onboarding rebuild next month. I have no web access in this chat, so the survey summary you pasted is the only SOURCED evidence, and anything from memory is labelled RECALLED.

## Final position
Among customers who cancelled in their first 90 days, a majority (61 per cent of 212) named setup time as a reason, more than three times the share that named price (18 per cent). That makes setup time a strong candidate driver of early cancellation. The survey does not show that slow onboarding causes cancellation, that it explains cancellation after 90 days, or that a rebuild would reduce it. So the board pack should present the rebuild as a funded bet with a measured target, not as a proven fix.

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | 61 per cent of 212 customers who cancelled in the first 90 days named setup time as a reason | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" (survey summary pasted in this chat, sentence 1) | Holds |
| C2 | Setup time was named more often than price among early cancellers | SOURCED | "...61 per cent named setup time as a reason, and 18 per cent named price" (survey summary pasted in this chat, sentence 1) | Holds |
| C3 | Setup time is a leading driver of early cancellation | INFERRED | From C1 and C2 | Holds in part |
| C4 | Our customers, in general, leave because onboarding is too slow | INFERRED | From C1 and C3, extended beyond the survey's scope | Fails |
| C5 | Customers who named "setup time" meant that setup was too slow, not too complex or too effortful | INFERRED | From the wording of C1 only | Unresolved |
| C6 | An onboarding rebuild would reduce early cancellation | INFERRED | From C3 | Unresolved |
| C7 | Reasons given in exit surveys are an unreliable guide to the real cause of cancellation, because people explain a decision after they make it and non-respondents may differ | RECALLED | Recalled, not checked in this session. Search: exit survey stated reasons churn validity; non-response bias cancellation surveys | Holds |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Scope of the claim | All customers; customers who cancel in the first 90 days | C1, C4 | First-90-day cancellers | All customers, because the survey covers none of the later cancellations | Later cancellation may share the same driver, and this data cannot say either way |
| What "setup time" means | Treat it as "too slow"; treat it as "setup was a problem" of unknown kind | C1, C5 | Setup was a problem of unknown kind | "Too slow", because the summary does not give the question wording or free-text answers | If customers meant complexity, a faster rebuild could miss the problem |
| Strength of the claim for a funding decision | "Slow onboarding causes churn, so fund the rebuild"; "Setup time is the strongest candidate, so fund the rebuild as a bet with a target"; "Do not claim a driver until more data exists" | C1, C2, C3, C6, C7 | Strongest candidate, fund as a bet with a target | The causal claim, because a survey of stated reasons cannot show cause (C7); holding back, because 61 against 18 is a signal the board should see | Other reasons not in the summary may have been named more often than setup time |
| Which evidence to trust | Pasted survey only; survey plus recalled research on churn | C1, C2, C7 | Survey as the only SOURCED evidence; recalled research used only to limit the claim | Using recalled research to support the claim, because it was not checked in this session | The recalled point in C7 may be weaker or stronger than stated |

## Adversarial findings
- **Strongest case against:** Customers who never got value from the product may blame setup because it is the most visible friction, not the cause. Poor fit or low usage would produce both the cancellation and the complaint about setup. The survey talks only to people who left, so it cannot show whether retained customers found setup just as slow. If they did, setup time does not separate those who stay from those who leave.
- **Against the research:** There is one source, it is internal, and its method is unknown. The summary does not say whether 212 is every early canceller or only those who answered, what the response rate was, how the question was worded, whether "setup time" was a listed option or free text, or what other reasons were offered. Customers could name more than one reason, so the 61 per cent may overlap with other reasons that the summary does not report.

One line per ledger row:
- C1 would be false if: the underlying survey data shows a different count or share, or 212 turns out to be a different population from "cancelled in the first 90 days".
- C2 would be false if: the price figure was drawn from a different question or base from the setup-time figure, so the two shares cannot be compared.
- C3 holds in part. Holds: as the most-cited of the two reasons reported, among early cancellers who answered the survey. Fails: as a demonstrated cause, because stated reasons do not establish cause (C7) and there is no comparison with retained customers. Instead: setup time is the strongest candidate driver on this evidence, and it becomes a driver once customers with faster setup are shown to cancel less.
- C4 fails. Holds: for customers who cancel in the first 90 days, as a candidate driver (C3). Fails: for customers who cancel after 90 days, because the survey does not cover them. Instead: for later cancellation, the reason is unknown from this data.
- C5 unresolved. Would be settled by: the survey's question wording and any free-text answers about setup. (not used in the final position)
- C6 unresolved. Would be settled by: early-cancellation rates compared across customers whose setup was fast and slow, or a pilot of a faster setup with a control group. (not used in the final position)
- C7 would be false if: a check of the research on exit surveys finds that stated reasons track actual cancellation causes closely.

**Integration (conditional):** The claim holds in one region: customers who cancel within 90 days of signing up, for whom setup time is the strongest candidate driver. The observation that places a customer in that region is the cancellation date relative to the sign-up date. The causal step, and so the case for the rebuild, holds only where customers with faster setup are observed to cancel less. That observation does not exist yet, which is why the final position asks the board for a bet with a target rather than a proven fix.

## Provenance
Attribution:  Prepared by you with help from an AI assistant, in one chat session with no web access.
Accountable:  [name to confirm]
Limitations:  The survey summary is the only retrieved source, and its method is not given (population, response rate, question wording, other reasons offered). A board member would weigh the 61 per cent differently knowing this. The point that exit-survey reasons are an unreliable guide to cause (C7) is recalled, not checked in this session.
References:   Internal survey summary of customers who cancelled in the first 90 days, n = 212 [pasted in this session; author, title, date, question wording and response rate not given].

Decision for a person: whether to fund the onboarding rebuild, after checking the full reason breakdown and question wording from the survey, and whether early-cancellation rates differ between customers with fast and slow setup.

## Next
1. **You:** this week, get the full survey output (question wording, response rate, every reason and its share). Observable result: C5 is settled, and you know whether any reason was named more often than setup time.
2. **You:** this week, pull setup duration and cancellation status for recent customers and compare early-cancellation rates for fast and slow setup. Observable result: C3 is upgraded from candidate to driver, or it is not, before the board meets.
3. **The person named under Accountable:** put the funding decision to the board with a stated target, such as a set reduction in first-90-day cancellations, and the date it will be measured. Observable result: the rebuild is judged against that target, not against the survey.

Watch for the observation that would make the main claim false: retained customers reporting slow setup at the same rate as those who cancelled. It would show up in the comparison in step 2.

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

## Grading
- P1 pass: first reply restates the claim ("Slow onboarding is the main reason customers cancel early", taken from the user's own words and survey) and ends "Is this right, or what would you change?" before any analysis.
- P2 pass: the take-away says "I have no web access in this chat" and "Attribution: ... in one chat session with no web access". The one memory fact, C7, is labelled "RECALLED | Recalled, not checked in this session".
- P3 pass: "C1 ... | SOURCED | 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason' (survey summary pasted in this chat, sentence 1)". The References entry is "Internal survey summary ... [pasted in this session; author, title, date, question wording and response rate not given]".
- P4 pass: all four decision rows fill Decision, Options considered, Evidence, Chosen, Rejected and why, and Uncertainty, for example "Scope of the claim | All customers; customers who cancel in the first 90 days | C1, C4 | First-90-day cancellers | ...". None reads as a reasoning trace.
- P5 pass: "Accountable: [name to confirm]". The next moves name "You" and "The person named under Accountable", and give no calendar date and no source. Plain reading: "this week" is relative timing, not an invented date.

Triage:
