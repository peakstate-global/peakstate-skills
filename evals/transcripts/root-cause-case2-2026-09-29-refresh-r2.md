# root-cause case 2 (refresh, re-run on fixed skill)

Skill commit FIXED-root-cause (uncommitted edit on 7e9db4e). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/root-cause/.

**USER:** Customer returns on our online store are up. Last month we had 212 returns: 96 wrong size, 51 damaged in transit, 30 not as pictured, 20 changed mind, 15 other. Help me find the root cause.

**ASSISTANT:**

I have file tools here, so I will draw the cause diagram as an SVG file in /tmp/root-cause-eval/case2/ once we reach that step, with a text tree alongside it.

First, here is the problem as I understand it, before we look at any cause.

**Problem statement**
Customer returns on the online store rose last month, to 212 returns. By stated reason: wrong size 96, damaged in transit 51, not as pictured 30, changed mind 20, other 15. Wrong size is the largest single reason, at about 45% of returns.

| Question | Is | Is not |
|---|---|---|
| What | 212 returns last month, across five stated reasons | [to confirm]: reasons or products that did not rise |
| Where | the online store | [to confirm]: product lines, sizes, warehouses or couriers with no rise |
| When | last month | [to confirm]: when the rise started, and whether earlier months were lower |
| How much | 212 returns | [to confirm]: the return rate (returns per order), and the baseline it rose from |

Gaps: the baseline and the return rate [to confirm]; when the rise started [to confirm]; which products or categories the returns come from [to confirm]; what is not affected [to confirm].

I will not name a cause yet. One question first, because it decides where we look:

**What did a normal month look like before this: how many returns, out of how many orders, and in which month did the rise start?**


**USER:** Returns were about 120 a month for the year before. The rise started in July. It is across all product lines, but mostly clothing. We changed our size chart supplier in June and started a new courier in July.

**ASSISTANT:**

Thanks, that fills the biggest gap. Here is the problem statement updated with what you told me.

**Problem statement**
Returns on the online store rose from about 120 a month over the previous year to 212 last month, about 92 more than normal (roughly 77% up). The rise started in July. It shows across all product lines, but most of it is in clothing. Last month by stated reason: wrong size 96, damaged in transit 51, not as pictured 30, changed mind 20, other 15.

| Question | Is | Is not |
|---|---|---|
| What | 212 returns last month, against about 120 a month before | [to confirm]: which reasons did not rise (for example "changed mind") |
| Where | all product lines, mostly clothing | [to confirm]: product lines with little or no rise |
| When | from July onward | the year before July, at about 120 a month |
| How much | about 92 returns a month above normal | [to confirm]: return rate per order, in case order volume also changed |

Two changes sit close to the start of the rise: a new size chart supplier in June, and a new courier in July. I am treating both as leads only, not causes, until we have evidence.

Gaps: order volume and return rate since July [to confirm]; the reason breakdown for a normal month before July [to confirm]; whether the rise is in clothing only or in all lines at the same rate [to confirm].

**Containment (now, before the cause is known)**
Customers are still receiving items that come back, so here is what could limit that today, without waiting for the cause:

- **Size:** you put a short note on the clothing pages with the top wrong-size returns, telling customers the size guide is under review and pointing them to a fit contact before they order.
- **Damage:** you or your packing staff photograph each packed parcel before it goes to the new courier, and log any "damaged in transit" return against its parcel, so damage claims can go back to the courier.
- **Returns desk:** you record, for every return from today, the product, the size ordered, the reason, and the courier, so the next steps have clean counts.

Each of these stays in place until the first fix has passed its rollback period.

**Which of these can you put in place today, or is something like this already running?**


**USER:** Nothing. Each return costs us about $18 in postage and handling.

**ASSISTANT:**

Thanks. With nothing in place yet, containment is the first thing to start, and the $18 a return puts a price on waiting: the roughly 92 extra returns a month cost about $1,656 a month above normal, and all 212 returns last month cost about $3,816.

I drew the cause diagram as an SVG file, because I have file tools here: /tmp/root-cause-eval/case2/returns-fishbone.svg. The text tree is below as well.

**Problem statement**
Returns on the online store rose from about 120 a month over the previous year to 212 last month, about 92 more than normal. The rise started in July. It shows across all product lines, but most of it is in clothing. Last month by stated reason: wrong size 96, damaged in transit 51, not as pictured 30, changed mind 20, other 15. At about $18 a return, the returns above normal cost about $1,656 a month.
Is not: the year before July, at about 120 a month.
Gaps: order volume and return rate per order since July [to confirm]; the reason breakdown for a normal month before July [to confirm]; which product lines had little or no rise [to confirm].

**Containment (now, before the cause is known)**
Nothing is in place yet, so these are the three moves to start today. Each stays until the first fix has passed its rollback period.
- **Size:** you add a short note to the clothing pages with the most wrong-size returns, saying the size guide is under review and giving a fit contact before ordering.
- **Damage:** you or your packing staff photograph each packed parcel before it goes to the new courier, and match any "damaged in transit" return to its parcel, so damage can be claimed back from the courier.
- **Returns desk:** you record, for every return from today, the product, the size ordered, the reason and the courier. This record is also the evidence for the causes below.

**Tool:** Pareto first, because you have counts by reason; then a fishbone on the top two reasons, because two changes (size chart and courier) may combine.

**Diagram** (SVG file, because I have file tools here): /tmp/root-cause-eval/case2/returns-fishbone.svg

**Pareto table (last month)**

| Reason | Count | Share | Cumulative |
|---|---|---|---|
| Wrong size | 96 | 45% | 45% |
| Damaged in transit | 51 | 24% | 69% |
| Not as pictured | 30 | 14% | 84% |
| Changed mind | 20 | 9% | 93% |
| Other | 15 | 7% | 100% |

Wrong size and damaged in transit together make up about 69% of returns. We do not yet know which reasons rose since July, because the breakdown for a normal month is [to confirm].

**Text tree (fishbone on wrong size and damaged in transit)**

```text
Problem: returns up from ~120 to 212 a month since July, mostly wrong size and damaged in transit
├─ Process: size chart not checked against garments before publishing [to check]; packing unchanged for the new courier [to check]
├─ Tools: new courier from July [known] (suspected); parcel handling in transit [to check]
├─ Materials: new size chart supplier from June [known] (suspected); chart measurements differ from garments [to check]
├─ Measurement: no per-return record of product, size and courier [known]; return reasons are customer-stated only [to check]
└─ Environment: order volume change since July [to check]; range or season change in July [to check]
```

The People branch is left out, because nothing you told me points to it.

**Suspected causes**
1. **The new size chart does not match the garments.** Confirms it: wrong-size returns before July were well below 96 a month; the wrong-size returns sit on clothing items whose chart came from the new supplier; and the chart's measurements differ from the same garments measured from stock. Rules it out: wrong-size returns were already near 96 a month before July, or items with the old and the new chart have the same wrong-size rate.
2. **The new courier damages more parcels.** Confirms it: damaged-in-transit returns before July were well below 51 a month, and the damaged parcels from July went with the new courier. Rules it out: damaged-in-transit returns were near 51 a month before July, or the damaged parcels are spread across couriers at the same rate.
3. **More orders, not a higher return rate.** Confirms it: orders per month rose by about the same share as returns (about 77%) from July. Rules it out: orders stayed about flat, so the return rate per order rose.

The June size chart change and the July rise are close in time, but timing is a lead, not proof. All three stay suspected until the evidence is in.

**First fix**
- **Change:** put the previous size chart back on the one clothing line with the most wrong-size returns, and leave the new chart everywhere else.
- **Reach:** the size chart pages for that one clothing line, and the customers who order from it, for four weeks.
- **Reversal:** republish the new supplier's chart on that line; the time depends on how your store publishes charts [to confirm].
- **Worked if:** wrong-size returns per 100 orders on that line fall by at least a third over four weeks, compared with the four weeks before.
- **Rollback if:** wrong-size returns per 100 orders on that line stay the same or rise over four weeks. Then reverse the fix and keep the containment.

**Your next three moves**
1. You: start the three containment moves this week, and the returns record first. Result: every return from today has its product, size, reason and courier logged, and parcel photos exist for new-courier shipments.
2. You: pull last year's monthly returns by reason and orders per month, and compare them with July to now. Result: a count that shows which reasons rose, and whether the return rate per order rose, which confirms or rules out causes 1, 2 and 3.
3. You: if step 2 confirms cause 1, make the first fix on that one clothing line and watch the rollback trigger for four weeks. If step 2 rules cause 1 out, re-rank the remaining causes (for example, the courier if damage returns rose), pick the fix for the new top cause, and repeat from step 2.

To check this reasoning for hidden assumptions, you may also like a skill for finding blind spots, if you have one.

## Grading
- P1 pass: sorted Pareto table with a Cumulative column (45%, 69%, 84%, 93%, 100%); "Wrong size and damaged in transit together make up about 69% of returns" and "then a fishbone on the top two reasons". Plain reading: pointing the fishbone at the top two counts as saying where to look first.
- P2 pass: text tree fishbone on wrong size and damaged in transit with Process, Tools, Materials, Measurement, Environment; "The People branch is left out, because nothing you told me points to it."
- P3 pass: three causes with "Confirms it:" / "Rules it out:"; "timing is a lead, not proof. All three stay suspected until the evidence is in."
- P4 pass: containment block precedes the causes; first fix has "Reach:", "Reversal: ... [to confirm]", "Rollback if: wrong-size returns per 100 orders on that line stay the same or rise over four weeks."
- P5 fail: an owner role the user never named: "**Damage:** you or your packing staff photograph each packed parcel before it goes to the new courier" (also in the earlier turn).
Other strict checks: 45%, 77%, $1,656 and $3,816 are arithmetic on the user's figures; "four weeks" and "a third" are proposals inside the fix.

Triage: P5 skill fault. SKILL.md already says every action is done by "you" or a role the user named; the model broke a clear rule.
