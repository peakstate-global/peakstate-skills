# sourced-lite eval, Case 3 (no web access, one pasted source), refresh r9

skill commit 349fd3b · eval version 2 · host Claude Code · model claude-opus-5-5[1m] (each assistant turn a fresh general-purpose subagent, model opus) · runner Claude Code, 2026-09-29

---

**USER:** You have no web access in this chat. My claim: our customers leave because onboarding is too slow. Here is our survey summary: 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.' Help me make this defensible for the board pack.

**ASSISTANT:**

Before I build anything, I want to check I have your claim right. I'll restate it in its strongest form.

**Your claim, in its strongest form:** customers cancel because onboarding is too slow, and slow setup is a real driver of early churn that the board should act on.

**Your evidence, exactly as you gave it:** "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price."

**My reading, to confirm:** you are treating "named setup time as a reason" as the same thing as "onboarding is too slow", and you are reading 61 per cent against 18 per cent as showing that setup time matters more than price. Your summary does not state either of those things, so both need your confirmation.

**What you want:** support for a position. You already hold the view, and you want it to be defensible.

**Who it is for:** the board, as part of the board pack.

**What done looks like:** a position the board can rely on, with a claim ledger, the strongest case against it, and a provenance block. The board pack gets the version that survives that review, even if it is narrower than your original claim.

**Gaps I can see:**

- Your claim says "our customers leave", but the survey covers only customers who cancelled in the first 90 days. The claim may need to say "early cancellations" instead.
- I do not know whether customers could name more than one reason. The 61 per cent and 18 per cent figures suggest they could.
- I do not know how many of the 212 answered the survey, or how the survey asked about reasons.
- I have no web access in this chat. Any outside fact I bring in, such as general churn benchmarks, will be labelled RECALLED (from memory, not checked this session). Only your survey summary counts as SOURCED.

Is this right, or what would you change?

**USER (scripted reply i):** Yes. The board decides next month whether to fund an onboarding rebuild.

**ASSISTANT:**

Thanks for confirming. You said the board decides next month whether to fund an onboarding rebuild, so I built everything below around that decision. I have no web access in this chat. The only source is the survey summary you pasted, and I used no facts from memory.

## Final position
Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason and 18 per cent named price, so the summary shows setup time named more often than price (C1, C2, F4, F5, F6). The survey records the reasons early cancellers gave. It does not show that slow onboarding causes customers to leave, and it does not show whether a rebuild would reduce cancellations (C3, C6, F1, F6, F9). For the funding decision next month, present setup time as the reason early cancellers named more often than price, and present the effect of a rebuild as the open question the board is paying to answer (C8, F11, F12).

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price." (survey summary, pasted in this chat, first message) | Holds |
| C2 | Of 212 customers who cancelled in the first 90 days, 18 per cent named price | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price." (survey summary, pasted in this chat, first message) | Holds |
| C3 | Our customers leave because onboarding is too slow | INFERRED | Your claim, tested against C1, C2 and C4 | Holds in part |
| C4 | Naming setup time as a reason means onboarding is too slow | INFERRED | Your reading of C1. The survey question wording is not in the ledger | Unresolved |
| C5 | Customers could name more than one reason | INFERRED | From the words "a reason" in C1. The survey form is not in the ledger | Unresolved |
| C6 | A faster onboarding would reduce cancellations in the first 90 days | INFERRED | From C1 and C3. No before-and-after or comparison data is in the ledger | Unresolved |
| C7 | The ledger holds no figures for customers who did not cancel | INFERRED | From C1 and C2, which cover only customers who cancelled | Holds |
| C8 | The board decides next month whether to fund an onboarding rebuild | SOURCED | "The board decides next month whether to fund an onboarding rebuild." (your reply in this chat) | Holds |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which population the claim covers | All customers who leave; customers who cancelled in the first 90 days | C1, C2, C3 | Customers who cancelled in the first 90 days | All customers who leave: C1 and C2 cover only cancellations in the first 90 days | Later cancellations may have different reasons, and none are in the ledger (INFERRED) |
| How to read "setup time" | As "onboarding is too slow"; as the survey's own words | C1, C4 | The survey's own words | "Onboarding is too slow": C4 is unresolved until the question wording is known | The survey question may have asked about slowness directly, and that would settle C4 (INFERRED) |
| What the board pack claims | Slow onboarding causes churn; setup time is the reason early cancellers named more often than price | C1, C2, C3, C6, C8 | Setup time named more often than price by early cancellers | Causal claim: C6 is unresolved and C7 shows no comparison group | A comparison with customers who stayed could strengthen or weaken the case (C7) |

## Adversarial findings
F1 [C3] Our customers leave because onboarding is too slow → Strongest case against: a named reason is what a customer reported when cancelling. It is not a measured cause, so "because" goes past what the survey shows (INFERRED).
F2 [C1] "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" + [C7] The ledger holds no figures for customers who did not cancel → Against the research: one internal summary with no comparison group means that customers who stayed could name setup time just as often, and nothing in the ledger rules that out (INFERRED).
F3 [C4] Naming setup time as a reason means onboarding is too slow → Rival explanation: customers who found the product a poor fit could report setup time as the reason, and that would point to fit rather than onboarding speed (INFERRED).
F4 [C1] "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" → C1 would be false if the raw survey responses showed a different share of the 212 naming setup time.
F5 [C2] "and 18 per cent named price." → C2 would be false if the raw survey responses showed a different share of the 212 naming price.
F6 [C3] Our customers leave because onboarding is too slow + [C1] "61 per cent named setup time as a reason" + [C2] "18 per cent named price." → C3 holds in part. Holds: among the 212 who cancelled in the first 90 days, 61 per cent named setup time as a reason. Fails: "our customers" is wider than cancellations in the first 90 days, and "because" claims a cause (F1). Instead: early cancellers named setup time more often than price, 61 per cent against 18 per cent. (INFERRED)
F7 [C4] Naming setup time as a reason means onboarding is too slow → C4 unresolved. Would be settled by the exact survey question and its answer options. Not used in the final position.
F8 [C5] Customers could name more than one reason → C5 unresolved. Would be settled by the survey form. Not used in the final position.
F9 [C6] A faster onboarding would reduce cancellations in the first 90 days → C6 unresolved. Would be settled by comparing the 90-day cancellation rates of customers with short setup times and customers with long setup times. Not used in the final position.
F10 [C7] The ledger holds no figures for customers who did not cancel → C7 would be false if you supply survey or setup-time data for customers who stayed.
F11 [C8] "The board decides next month whether to fund an onboarding rebuild." → C8 would be false if the funding decision is not on next month's board agenda.
F12 [F1, F6, F9] → Integration, conditional. Region: the funding case is strong where customers with long setup times cancel in the first 90 days at a higher rate than customers with short setup times, and it rests only on reported reasons where they do not. Observation that places a case in it: the 90-day cancellation rate, split by setup time. (INFERRED)

## Provenance
Attribution:  Drafted by an AI assistant from a survey summary the user pasted in this chat, for the user's board pack.
Accountable:  [name to confirm]
Limitations:  The only source is a one-sentence survey summary (C1, C2). The survey wording, the answer options and whether customers could name more than one reason are unknown (C4, C5). No data on customers who stayed is in the ledger, so the summary supports a named reason and does not support a cause (C7, F2).
References:   Internal survey summary of customers who cancelled in the first 90 days, n = 212 [pasted in this session; author, title and date not given].

Decision for a person: whether to fund the onboarding rebuild next month, after checking the survey question wording and the 90-day cancellation rate split by setup time.

## Next
1. You: this week, get the survey question and answer options from whoever ran the survey. The observable result is that C4 and C5 move from unresolved to holds or fails.
2. You: this week, name the person accountable for the board paper, and put the decision above in front of that person with this ledger attached. The observable result is a name under Accountable.
3. You: before the board meets, ask for the 90-day cancellation rate split by setup time, taken from your customer records. If customers with long setup times do not cancel more often than customers with short setup times, the rebuild case weakens, and this split is where that would show.

For a deeper check of hidden assumptions, you could also use a skill for blind spots, if you have one.

---

Runner note: the skill asked nothing beyond the first confirmation, so scripted reply ii was not used. No unscripted questions.

## Grading (strict)

- **P1 pass.** The first reply restates the claim "in its strongest form", quotes the evidence, and ends "Is this right, or what would you change?" with no analysis before confirmation.
- **P2 pass.** The take-away opens "I have no web access in this chat ... I used no facts from memory"; no fact carries RECALLED and none from memory is labelled SOURCED.
- **P3 pass.** C1 and C2 are SOURCED with the pasted sentence quoted verbatim, locator "survey summary, pasted in this chat, first message"; References gives a descriptive entry stating "author, title and date not given", no invented APA 7 fields.
- **P4 pass.** Three decision-record rows, each with decision, options considered, evidence, chosen, rejected-and-why and uncertainty; each is a one-line table row, not a reasoning trace.
- **P5 pass.** Accountable reads "[name to confirm]"; the three next moves name "whoever ran the survey" and "your customer records", with relative timing ("this week", "before the board meets"), so no invented person, date or source.
- **P6 pass, with minor notes and no hard fail.** Every finding line cites a row. Every (INFERRED) line reasons from C1, C2, C7 or C8 and adds no fact about what the firm or the survey is, does, sells or wants. F3's poor-fit rival is framed as "could", a hypothesis. F2's word "internal" is held by the user's "our survey". Every final-position id holds the fact beside it: C1/C2/F4/F5/F6 hold the 61 and 18 per cent comparison, C3/C6/F1/F6/F9 hold "not a cause, rebuild effect unknown", C8/F11 hold the funding decision and F12 holds the open question. The provenance block's claims map to C1, C2, C4, C5, C7 and F2. The claim cells are no broader than their evidence.
  - Minor note a) The References entry "n = 212" states a sample size. The ledger holds 212 as the base of the percentages. The first reply itself said it did not know how many of the 212 answered, so "n = 212" is slightly broader than the evidence.
  - Minor note b) The final position's "the open question the board is paying to answer" characterises the funding decision (C8) as buying an answer. That is framing and no row holds it, but it is a recommendation, not a fact about a firm or source.
  - Minor note c) C3 (the user's own claim) is labelled INFERRED with "Your claim" as evidence. The label is defensible as the claim under test, but INFERRED usually marks the assistant's reasoning.
