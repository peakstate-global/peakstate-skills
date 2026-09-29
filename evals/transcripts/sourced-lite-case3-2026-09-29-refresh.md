# sourced-lite case 3 (refresh)

Skill commit 7e9db4e. Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/.

**USER:** You have no web access in this chat. My claim: our customers leave because onboarding is too slow. Here is our survey summary: 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.' Help me make this defensible for the board pack.

**ASSISTANT:**

Use only a tool your organisation has approved for this information.

Before I test anything, here is my reading of what you want. I will do no checking and give no verdict until you confirm it.

**The claim, in its strongest form:** Slow onboarding is the main driver of early churn. Of 212 customers who cancelled in their first 90 days, 61 per cent named setup time as a reason, more than three times the 18 per cent who named price. So faster onboarding is the lever most likely to cut early cancellations.

**What you want:** to support a position, not to explore an open question. You want the claim made defensible, so that it holds up when a director pushes on it.

**Who it is for:** the board, in the board pack.

**What done looks like:** a final position the board can rely on, stated at the strength the evidence allows. Each load-bearing claim is labelled by where it came from, the strongest case against it is written out, and a provenance block says what is and is not backed.

**Gaps in my reading, which I will carry into the test unless you tell me otherwise:**

- **Scope.** Your claim says "our customers leave". The survey covers only customers who cancelled in the first 90 days. I read the claim as being about early churn only.
- **"Too slow" and "setup time".** The survey records that people named setup time as a reason. I read "onboarding is too slow" as the same thing, but a board member may ask whether setup time means speed, effort or complexity.
- **"A reason" and "the reason".** The 61 and 18 per cent do not add to 100, so I assume respondents could name more than one reason. That makes setup time the most named reason, not necessarily the main one.
- **The survey itself.** I do not know how many cancelling customers there were in total, how many answered, or how the reasons were collected (a fixed list or free text).
- **Access.** I have no web access in this chat, so the pasted survey summary is my only retrieved source. Anything else I bring in will come from memory and be labelled as such.

Is this right, or what would you change?


**USER:** Yes. The board decides next month whether to fund an onboarding rebuild.

**ASSISTANT:**

Thank you. That adds the decision the board is making: whether to fund an onboarding rebuild next month. I have tested the claim against that decision.

I have no web access in this chat, so the pasted survey summary is my only retrieved source. Anything from memory is labelled RECALLED.

## Final position

Among customers who cancelled in their first 90 days, setup time is the most often named reason of the two the survey reports: 61 per cent named it, against 18 per cent for price. That supports making onboarding the board's first churn lever to test, but it does not yet show that a rebuild will cut cancellations, because the survey records stated reasons, not causes, and nothing measures what a faster setup would change. The defensible ask is funding tied to evidence that slow setups come before cancellations, not a rebuild justified by the survey alone.

## Claim ledger

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Of 212 customers who cancelled in the first 90 days, 61% named setup time as a reason and 18% named price. | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price." (Survey summary pasted in this chat, first message) | Holds |
| C2 | Setup time is the most named reason for early cancellation. | INFERRED | From C1. The summary reports only two reasons. | Holds in part |
| C3 | Slow onboarding causes customers to leave. | INFERRED | From C1. A named reason is a self-report, not a measured cause. | Holds in part |
| C4 | The 212 respondents represent all customers who cancelled early. | INFERRED | Not stated in the summary. Total cancellations, response rate and question format are unknown. | Unresolved |
| C5 | The finding describes why "our customers leave" in general. | INFERRED | From C1. The survey covers only the first 90 days. | Fails |
| C6 | Customers in exit surveys often name a reason that is easy to give, such as effort or setup, rather than fit or value. | RECALLED | Recalled, not checked in this session. Search: exit survey stated reasons reliability churn; stated versus revealed churn drivers SaaS. | Unresolved |
| C7 | A faster onboarding would cut early cancellations enough to justify the rebuild. | INFERRED | From C2 and C3. No data on setup duration or on the effect of a change. | Unresolved |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which churn the claim covers | All churn; early churn (first 90 days) | C1, C5 | Early churn | All churn: the survey says nothing about customers who leave after 90 days | Later churn may have different drivers and be larger in revenue terms |
| What the 61% is allowed to mean | The cause of churn; the main reason; the most named stated reason | C1, C2, C3, C6 | The most named stated reason of the two reported | Cause: self-report does not show cause. Main reason: respondents could name more than one reason, and other reasons are not reported | If the survey used a fixed list with setup time first, the figure may be inflated by the question design |
| What the board paper asks for | Fund the full rebuild on the survey; fund a staged rebuild with a test gate; ask for no funding until more data | C1 to C7 | Staged funding with a test gate | Full rebuild: rests on C7, which is unresolved. No funding: ignores a strong and consistent signal in C1 | The internal data needed for the gate may not exist, which would slow the decision |

## Adversarial findings

- Strongest case against: Customers who were never a good fit find setup hard because the product does not match their need. They name setup time because it is the concrete pain they felt, but a faster setup would only let them discover the mismatch sooner. On that reading, the lever is who you sell to, not onboarding, and a rebuild would spend the budget without moving churn.
- Against the research: The only source is a single internal summary with no response rate, no total number of early cancellations and no description of how reasons were collected. Only two reasons are reported, so the board cannot see whether another reason, such as missing features or poor fit, was named more often than setup time. There is no comparison with customers who stayed, so we cannot tell whether retained customers also found setup slow.

One line per ledger row:

- C1 would be false if the underlying survey data gives different counts from the summary, for example if 61 per cent is a share of responses rather than of the 212 customers.
- C2 holds in part. Holds: setup time was named more than three times as often as price. Fails: the summary reports only two reasons, so "most named" overall is not shown. Instead: setup time is the most named of the two reasons reported, and the full reason list is needed to claim more.
- C3 holds in part. Holds: early cancellers themselves link their leaving to setup time. Fails: a stated reason does not show cause, and poor fit is a rival explanation for the same answers. Instead: setup time is strongly associated with early cancellation in customers' own account, and cause needs behavioural data such as setup duration for cancelled against retained customers.
- C4 unresolved. Would be settled by: the total number of early cancellations in the period, the response rate, and whether reasons came from a fixed list or free text. Not used in the final position.
- C5 fails. Holds: for customers who cancel in the first 90 days. Fails: for customers who leave later, whom the survey does not cover. Instead: the paper should say "early churn" throughout and state that later churn drivers are not measured here.
- C6 unresolved. Would be settled by: checking the research on exit-survey reliability, or comparing stated reasons with account data in your own records. Not used in the final position.
- C7 unresolved. Would be settled by: showing that customers with long setups cancel at a higher rate than customers with short setups, or a small pilot of a faster setup path. Not used in the final position.

Integration move: conditional. Onboarding is the right lever in the region of customers whose setup was slow and who were otherwise a fit for the product. The observation that places a customer in that region: did the account take longer than the median time to reach first real use, and did it match your target customer profile? If most early cancellers sit in that region, the rebuild case is strong. If most sit outside it, the lever is fit, not speed.

## Provenance

    Attribution:  Prepared by the user with help from an AI assistant, from one pasted internal survey summary.
    Accountable:  [name to confirm]
    Limitations:  The survey's response rate, total early cancellations and question format are unknown, so the 61 per cent may not represent all early cancellers.
                  The summary reports only two reasons, so setup time is not shown to be the most named reason overall.
                  No data links setup duration to cancellation, so the effect of a rebuild on churn is not backed.
                  The point about exit-survey reliability (C6) is recalled, not checked in this session.
    References:   Internal cancellation survey summary, n = 212 [pasted in this session; author, title and date not given].

Decision for a person: whether to fund the full onboarding rebuild or a staged rebuild with a test gate, after checking the survey's response rate and full reason list, and whether customers who cancelled early had longer setups than customers who stayed.

## Next

1. You: ask the team that ran the survey for the full reason list, the total number of early cancellations and the response rate this week. Result: C2 and C4 move to holds or fails, and the board paper can state the figures without a caveat.
2. You: put the person you name as accountable in front of the funding decision above, with the setup-duration comparison attached. Result: the board sees a named owner and a decision that rests only on backed claims.
3. You: pull setup duration for cancelled and retained customers from your account data this week. If cancelled customers did not have longer setups, that is the observation that would make the onboarding claim false, and it would show up in that comparison before any money is spent.

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

## Grading

- P1 pass: "I will do no checking and give no verdict until you confirm it. ... Is this right, or what would you change?"
- P2 pass: "I have no web access in this chat, so the pasted survey summary is my only retrieved source. Anything from memory is labelled RECALLED."; C6 is "RECALLED | Recalled, not checked in this session".
- P3 pass: C1 is SOURCED with the pasted sentence quoted and "(Survey summary pasted in this chat, first message)"; References: "Internal cancellation survey summary, n = 212 [pasted in this session; author, title and date not given]".
- P4 pass: all three decision rows fill Decision, Options considered, Evidence, Chosen, Rejected and why, Uncertainty; none is a step-by-step trace.
- P5 pass: "Accountable:  [name to confirm]"; the next moves name "the team that ran the survey" and "the person you name as accountable", no named person or source. "this week" is graded as a relative timing suggestion, not an invented date, on the plain reading of "date".

Triage:
