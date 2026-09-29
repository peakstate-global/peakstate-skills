**USER:** You have no web access in this chat. My claim: our customers leave because onboarding is too slow. Here is our survey summary: 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.' Help me make this defensible for the board pack.

**ASSISTANT:**

Use only a tool your organisation has approved for this information.

Before I test anything, here is my reading of what you want. Please confirm it or correct it.

**The claim, in its strongest form:** Slow onboarding is the leading reason customers cancel early. In your exit survey of 212 customers who cancelled within their first 90 days, 61 per cent named setup time as a reason. Only 18 per cent named price. So setup time outranks price by more than three to one.

**What you want:** You want to support a position you already hold, so that it holds up when the board questions it.

**Who it is for:** Your board, reading it in the board pack.

**What done looks like:** You get a claim you can print in the board pack. It will come with:

- a ledger showing where each part of the claim comes from
- the strongest objections, answered
- a short provenance note saying what the evidence can and cannot support

**Gaps I can see in the opening:**

- **Scope.** Your claim says "our customers leave". The survey only covers cancellations in the first 90 days. I would narrow the claim to early churn unless you have data on later cancellations.
- **Who answered.** I need to know whether 212 is every customer who cancelled in that window, or only the customers who answered the survey.
- **Question format.** "Named as a reason" suggests customers could pick more than one reason. If so, the percentages overlap and do not add to 100. That is fine, but the board pack should say so.
- **Wording.** "Setup time" and "onboarding too slow" may not mean the same thing to a customer. I will treat the survey's own wording as the evidence.
- **Cause versus stated reason.** The survey records what customers said. It does not show that faster onboarding would keep them.

I have no web access in this chat, so everything I add from general knowledge will be labelled as recalled, not sourced. Your survey summary is the only sourced evidence.

Is this right, or what would you change?

**USER:** Yes. The board decides next month whether to fund an onboarding rebuild.

**ASSISTANT:**

Thanks. Here is the tested version. I have no web access, so your survey summary is the only sourced evidence, and anything from general knowledge is labelled recalled.

## Final position

Among customers who cancelled in their first 90 days, setup time was named as a reason by 61 per cent, against 18 per cent for price, so slow onboarding is the most commonly stated reason for early churn in the data we have. The survey shows what cancelling customers said, not what would have kept them, so the board pack should present the rebuild as a bet on the leading stated reason, funded with a retention target the board can check.

## Claim ledger

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time and 18 per cent named price. | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price." (survey summary pasted by you in this chat) | Holds |
| C2 | Setup time is the reason named most often by early cancellers. | INFERRED | From C1. The summary gives only two reasons. If customers could name several reasons, another reason could also pass 61 per cent. | Holds in part |
| C3 | "Setup time" in the survey means the same as "onboarding is too slow". | INFERRED | From C1 and the survey wording. Setup time could include the customer's own effort, data migration or integration work, not only our onboarding process. | Holds in part |
| C4 | The 212 respondents represent all early cancellers. | RECALLED | Recalled, not checked in this session: exit surveys usually get partial responses, and the customers who answer can differ from those who do not. Check: total early cancellations in the same period, and the response rate. | Unknown |
| C5 | Our customers leave because onboarding is too slow. | INFERRED | From C1 to C4. | Fails as stated |
| C6 | A faster onboarding would reduce early churn. | INFERRED | From C1 and C3. No data in this chat tests it. | Untested |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Scope of the claim | All churn; early churn (first 90 days) | C1 covers only the first 90 days | Early churn | All churn, because no data covers later cancellations | Later churn may have different causes |
| What to call the finding | "Cause of churn"; "most common stated reason" | C1, C4, C6 | Most common stated reason | "Cause", because a survey of stated reasons cannot show cause | A board member may read "stated reason" as weaker than it is |
| How to frame the price comparison | "Three to one"; the two percentages side by side | C1, C2 | The two percentages side by side, with a note on whether reasons could overlap | "Three to one", because it implies a clean ranking the summary may not support | The full reason list may change the ranking |

## Adversarial findings

- **Strongest case against:** Customers who were a poor fit for the product may find setup long because the product does not suit them. Then setup time is a symptom of poor fit, and a faster onboarding would move them to cancel at day 120 instead of day 60.
- **Against the research:** It is one internal survey with no response rate, no full list of reasons and no comparison group of customers who stayed. Stated exit reasons are often the easiest reason to give, not the deciding one (recalled, not checked in this session).
- **C1 would be false if:** the raw survey file shows a different count or different percentages.
- **C2 would be false if:** the full reason list shows another reason named by more than 61 per cent.
- **C3 would be false if:** free-text answers under "setup time" mostly describe the customer's own internal delays, not our process.
- **C6 would be false if:** customers who completed setup quickly cancel within 90 days at about the same rate as those whose setup was slow. Your product data can show this now.
- **C5 fails.** Holds: as the most common stated reason among customers who cancelled in the first 90 days. Fails: as a claim about all customers, and as a claim of cause. Instead: slow setup is the leading stated reason for early cancellation, and whether it drives churn is still to be shown.
- **Integration (level shift):** Two levels are in play. At the level of what customers report, setup time clearly leads. At the level of what changes their behaviour, we have no evidence yet. The survey level does not reduce to the behaviour level, because a stated reason can be real to the customer and still not be the thing that, fixed, keeps them. The board pack should state the first level as fact and fund the second as a test.

## Provenance

    Attribution:  Written by you with help from an AI assistant, from one internal survey summary.
    Accountable:  [name to confirm]
    Limitations:  The survey response rate and the full list of reasons are unknown, so the ranking of setup time as the top reason is not confirmed.
                  No data here links setup speed to retention, so the survey does not show that a rebuild would reduce churn.
                  The claim covers only cancellations in the first 90 days.
    References:   Internal cancellation survey summary, first 90 days, n = 212 [as pasted in this chat; title, owner and date to confirm].

    Decision for a person: whether to fund the onboarding rebuild, after checking the survey response rate, the full reason list, and early churn rates by setup duration in product data.

## Next

1. **You:** this week, pull the survey's response rate and full reason list, and confirm whether customers could name more than one reason. Result: C2 and C4 move to holds or fails.
2. **You:** put the person named under Accountable in front of the funding decision, with the three checks above attached. Result: the board pack names who answers for the claim.
3. **You:** this week, ask your data team for 90-day churn rates split by how long setup took. Result: if fast-setup customers churn at about the same rate, the causal case for the rebuild fails before the board meets.
