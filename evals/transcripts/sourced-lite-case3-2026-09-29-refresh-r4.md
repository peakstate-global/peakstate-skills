# sourced-lite case 3 (refresh, re-run 3 on fixed skill)

Skill commit FIXED-sourced-lite (third uncommitted edit on 7e9db4e: step 0 number-restatement example, take-away template and worked example carry ledger ids or labels on every fact). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/.

**USER:** You have no web access in this chat. My claim: our customers leave because onboarding is too slow. Here is our survey summary: 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.' Help me make this defensible for the board pack.

**ASSISTANT:**

Use only a tool your organisation has approved for this information.

Before I test anything, here is my reading of what you want. Please check it.

**The claim, in its strongest form:** a slow onboarding process causes a material share of our customers to cancel, so faster onboarding would reduce cancellations.

**Your evidence, as you gave it:** "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price."

**What you want:** to support a position, so it holds up in front of the board.

**Who it is for:** the board, through the board pack.

**What done looks like:** a claim the board pack can state, with each part labelled by where it came from, the strongest objection answered, and the limits stated plainly.

**My reading, to confirm:**

- I read "setup time" in the survey as the same thing as "onboarding" in your claim.
- I read "our customers leave" as covering customers who cancel in the first 90 days. The survey says nothing about customers who cancel later.
- I read "too slow" as a cause of cancelling. The survey records a reason customers named, which is a different thing from a cause.

**Gaps I cannot fill from what you sent:**

- Is the 212 everyone who cancelled in the first 90 days, or only those who answered the survey?
- Could a customer name more than one reason?
- What does "setup time" cover in your product, and how long does setup take now?

One note: I have no web access in this chat. Anything I add from outside your survey will be labelled as recalled from memory, never as a source.

Is this right, or what would you change?

**USER:** Yes. The board decides next month whether to fund an onboarding rebuild.

**ASSISTANT:**

Thank you. The board decides next month whether to fund an onboarding rebuild, so I have framed the take-away around that decision.

Three gaps from my last message are still open: whether the 212 is every early canceller or only those who answered, whether customers could name more than one reason, and what "setup time" covers. I took my own call on each, and the decision record says which way I went and why. I have no web access in this chat, so the only retrieved source is the survey summary you pasted. Anything else is labelled RECALLED or INFERRED.

## Final position

In your survey, 61 per cent of 212 customers who cancelled in the first 90 days named setup time as a reason, and 18 per cent named price (C1, C2). The board pack can defend "setup time is a reason early cancellers name more often than price" (C5), but it cannot yet defend "customers leave because onboarding is too slow", because the survey records stated reasons from early cancellers only and has no comparison with customers who stayed (C4, C5). Whether a rebuild would reduce cancellations is untested (C6), so the defensible ask is to fund the rebuild with a stated measure of success, or to fund a smaller test first.

## Claim ledger

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | 61 per cent of the 212 early cancellers named setup time as a reason | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" (survey summary, pasted in this chat, first sentence) | Holds |
| C2 | 18 per cent of the same 212 named price | SOURCED | "and 18 per cent named price" (survey summary, pasted in this chat, first sentence) | Holds |
| C3 | "Setup time" in the survey means the same thing as "onboarding" in your claim | INFERRED | My reading of C1 against your wording; not confirmed | Holds in part |
| C4 | Slow onboarding explains why customers leave in general | INFERRED | From C1; the survey covers only cancellations in the first 90 days (C1) | Holds in part |
| C5 | Naming setup time as a reason shows that slow setup caused the cancellation | INFERRED | From C1 and C2; the survey records reasons customers named, not causes | Holds in part |
| C6 | A faster onboarding process would reduce cancellations | INFERRED | From C1 and C5; no data on retained customers or on a change to setup time | Unresolved |
| C7 | Exit-survey reasons can understate price, because a process reason is easier to give than "it cost too much" | RECALLED | Recalled, not checked in this session. Search: "exit survey stated reasons churn price understated" | Unresolved |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| What the 212 stands for | Every customer who cancelled in the first 90 days; only those who answered the survey | C1 | Treat 212 as the respondents only, and say so in the pack | "Every canceller": the summary does not say it, and assuming it would overstate coverage if the response rate is low | If the response rate is low, the 61 per cent may not describe all early cancellers (INFERRED) |
| Whether reasons can overlap | Single reason per customer; more than one reason allowed | C1, C2 | Assume more than one reason was allowed, so 61 and 18 are not added or compared as shares of one whole | "Single reason": the wording "named setup time as a reason" suggests a list (INFERRED) | If only one reason was allowed, the reading of C5 gets slightly stronger, not weaker (INFERRED) |
| Which claim goes to the board | "Customers leave because onboarding is too slow"; "setup time is a reason early cancellers name more often than price" | C1, C2, C4, C5 | The narrower claim | The broad claim: it goes past the 90-day window (C4) and treats a stated reason as a cause (C5) | A board member may read the narrow claim as weaker support for the rebuild (INFERRED) |
| What to ask the board for | Fund the full rebuild now; fund the rebuild with a success measure; fund a smaller test first | C6 | Present the choice between the last two, with the rebuild tied to a measure | "Fund now, no measure": it rests on C6, which is unresolved | This is the board's call on risk appetite and budget, not mine |

## Adversarial findings

- Strongest case against the conclusion: early cancellers who name setup time may be customers who were a poor fit for the product. For a poor-fit customer, setup feels slow because the product does not match their needs, and a faster onboarding process would not keep them (INFERRED). The survey cannot tell these two stories apart, because it has no data on customers who stayed (C5, C6).
- Against the research: there is one source, an internal survey summary with no stated author, date, response rate or question wording (C1, C2). Stated reasons can understate price (C7, RECALLED). There is no counter-evidence in the ledger, because none was available in this chat. That is an absence of checking, not an absence of counter-evidence.

One line per ledger row:

- C1 would be false if: the underlying survey data shows a different share, or the 61 per cent was calculated on a different base from the 212.
- C2 would be false if: the underlying survey data shows a different share for price, or price was split across several options (for example "price" and "value for money") that the 18 per cent does not combine.
- C3 holds in part. Holds: where "setup time" means the time from sign-up to first real use, which your onboarding process controls. Fails: where "setup time" means effort on the customer's side, such as data migration or internal approvals, which a faster onboarding process does not remove. Instead: in that region, the lever is product design or customer preparation, not onboarding pace.
- C4 holds in part. Holds: for customers who cancel in the first 90 days (C1). Fails: for customers who cancel after 90 days, whom the survey does not cover. Instead: for later cancellations, the reasons are unknown from this evidence, and the pack should say so.
- C5 holds in part. Holds: setup time is a reason early cancellers name, and they name it more often than price (C1, C2). Fails: as proof of cause, because there is no comparison with customers who stayed and no measure of how long setup actually took. Instead: setup time is a strong, stated signal of friction, which justifies testing a faster onboarding process.
- C6 unresolved. Would be settled by: comparing actual setup duration for customers who cancelled against customers who stayed, or by a pilot that cuts setup time for one group and compares 90-day cancellations. Not used in the final position.
- C7 unresolved. Would be settled by: checking published research on exit-survey reliability, or by comparing stated reasons with plan level or discount history in your own data. Not used in the final position.

## Provenance

Attribution:  Drafted with an AI assistant from a survey summary the user pasted into the chat; no other source was retrieved.
Accountable:  [name to confirm]
Limitations:  The response rate and question wording of the survey are unknown, so the 61 per cent may not describe all early cancellers. The survey covers only cancellations in the first 90 days. There is no comparison with customers who stayed, so the survey shows a stated reason, not a cause. The point about exit surveys understating price (C7) is recalled, not checked in this session.
References:   Internal survey summary of customers who cancelled in the first 90 days, n = 212 [pasted in this session; author, title, date, response rate and question wording not given].

Decision for a person: the board decides whether to fund the onboarding rebuild outright or fund a test first, after checking the survey's response rate and whether setup duration differs between customers who cancelled and customers who stayed.

This is a cut-down, markdown-only version of the SOURCED method.

## Next

1. You: this week, pull the survey's response rate and question wording, and add both to the reference. Result: the pack states what the 212 covers, and the first Limitations sentence either stays or goes.
2. You: this week, ask whoever owns your customer data to compare actual setup duration for customers who cancelled in the first 90 days against customers who stayed. Result: C6 moves from unresolved to holds or fails before the board meets.
3. You: before the board pack goes out, put the person named under Accountable in front of the funding decision above. Result: the pack names who stands behind the claim. After any rebuild, watch 90-day cancellations for customers who went through the new onboarding: if they do not fall, C5's reading of setup time as the lever is wrong, and that result shows up in your cancellation data.

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

## Grading
- P1 pass: restates the claim and quotes the survey sentence verbatim under "Your evidence, as you gave it", with no ranking added; interpretations are under "My reading, to confirm". Ends "Is this right, or what would you change?" before any analysis. The previous fail ("most often named reason") is gone.
- P2 pass: "I have no web access in this chat". The one memory fact, C7, is "RECALLED | Recalled, not checked in this session".
- P3 pass: C1 SOURCED with "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" (survey summary, pasted in this chat, first sentence). References: "Internal survey summary ... n = 212 [pasted in this session; author, title, date, response rate and question wording not given]".
- P4 pass: four rows, each with the six fields, none a step-by-step trace.
- P5 pass: "Accountable:  [name to confirm]". Next moves name "you" and "whoever owns your customer data", no named person, date or source.
