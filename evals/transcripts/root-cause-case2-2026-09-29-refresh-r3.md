# root-cause case 2 (refresh, re-run 2 on fixed skill)

Skill commit FIXED-root-cause (second uncommitted edit on 7e9db4e). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/root-cause/.

**USER:** Customer returns on our online store are up. Last month we had 212 returns: 96 wrong size, 51 damaged in transit, 30 not as pictured, 20 changed mind, 15 other. Help me find the root cause.

**ASSISTANT:**

Good, you already have counts by category, which will help a lot. Before we look for a cause, let me pin down the problem, so we fix the right thing.

**Problem statement (draft)**

Last month the online store received 212 customer returns: 96 wrong size, 51 damaged in transit, 30 not as pictured, 20 changed mind and 15 other. Returns are higher than before [to confirm: by how much, and compared with which month].

| Question | Is | Is not (where it could happen but does not) |
|---|---|---|
| What | Customer returns, 212 last month, across five reasons | [to confirm] Any return reason that has stayed flat |
| Where | The online store | [to confirm] Other sales channels, if you have any; product lines or sizes with normal returns |
| When | Last month | [to confirm] When the rise started, and whether earlier months were normal |
| How much | 212 returns | [to confirm] Orders shipped last month, so we can see the return rate |

Gaps:
- The baseline: returns in a normal month [to confirm]
- Orders shipped last month, so 212 becomes a rate [to confirm]
- When the rise started [to confirm]
- Which products, sizes or carriers the returns come from [to confirm]

I will not name a cause yet. A rise in the count can come from more orders rather than more problems, so the baseline matters most.

**One question:** In a normal month before the rise, how many returns did you get, and how many orders did you ship then and last month?


**USER:** Returns were about 120 a month for the year before. The rise started in July. It is across all product lines, but mostly clothing. We changed our size chart supplier in June and started a new courier in July.

**ASSISTANT:**

Thank you. That fills the biggest gaps. Here is the problem statement updated with your answers.

**Problem statement**

Customer returns on the online store rose from about 120 a month over the previous year to 212 last month, a rise of about 92 returns (about 77%). The rise started in July. It is across all product lines, but most returns are clothing. Last month's 212 returns were 96 wrong size, 51 damaged in transit, 30 not as pictured, 20 changed mind and 15 other. Two changes came just before or at the start of the rise: a new size chart supplier in June and a new courier in July.

| Question | Is | Is not (where it could happen but does not) |
|---|---|---|
| What | Returns, 212 last month against about 120 a month before | [to confirm] Any return reason that did not rise |
| Where | The online store, all product lines, mostly clothing | [to confirm] Product lines or sizes with normal returns |
| When | From July onwards | The year before July (about 120 a month) |
| How much | About 92 extra returns a month | |

Gaps:
- Orders shipped each month, so the rise is a rate and not only a count [to confirm]
- The split by return reason before July, so we can see which reasons rose [to confirm]
- Whether all orders go with the new courier, or only some [to confirm]

The size chart and courier changes are leads because of their timing. They are not causes yet. We test them after containment.

**Containment (now, before the cause is known)**

Customers are still getting items that do not fit or arrive damaged. These steps limit that harm while we look for the cause:

- You add a short note to clothing product pages asking customers who are between sizes, or who bought from you before June, to check the measurements or contact you before ordering.
- You add extra padding or a stronger box for orders going with the new courier, for items that can be damaged.
- You start recording, for each return, the product, the size, the courier and the order date, so the evidence for each lead builds from today.

These stay in place until the first fix has passed its rollback period.

**One question:** Is any of this already in place, and can you start these three steps today?


**USER:** Nothing. Each return costs us about $18 in postage and handling.

**ASSISTANT:**

Thank you. So nothing is in place yet, and every extra return costs you about $18. That makes the containment worth starting today. Here is the full picture.

I can write files here, so the fishbone is an SVG file at `/tmp/root-cause-eval/case2/returns-fishbone.svg`. The text tree and the Pareto table are below as well.

**Problem statement**

Customer returns on the online store rose from about 120 a month over the previous year to 212 last month. That is about 92 extra returns a month (about 77% more). The rise started in July. It is across all product lines, but most returns are clothing. Last month's 212 returns were 96 wrong size, 51 damaged in transit, 30 not as pictured, 20 changed mind and 15 other. At about $18 each, last month's returns cost about $3,816, against about $2,160 in a normal month, so the rise costs about $1,656 a month. Two changes came just before or at the start of the rise: a new size chart supplier in June and a new courier in July.

Is not: the year before July (about 120 returns a month).

Gaps:
- Orders shipped each month, so the rise is a rate and not only a count [to confirm]
- The split by return reason before July, so we can see which reasons rose [to confirm]
- Whether all orders go with the new courier, or only some [to confirm]
- Whether you still have the old size chart [to confirm]

**Containment (now, before the cause is known)**

Nothing is in place yet, so you start these today:

- You add a short note to clothing product pages asking customers who are between sizes to check the garment measurements or contact you before they order.
- You add extra padding or a stronger box for fragile items that go with the new courier.
- You record, for each new return, the product, the size, the courier and the order date.

These stay in place until the first fix has passed its rollback period.

**Tool:** Pareto first, because you have counts by reason. Then a fishbone on the top reasons, because more than one cause may combine.

**Pareto table**

| Category | Count | Share | Cumulative |
|---|---|---|---|
| Wrong size | 96 | 45% | 45% |
| Damaged in transit | 51 | 24% | 69% |
| Not as pictured | 30 | 14% | 83% |
| Changed mind | 20 | 9% | 93% |
| Other | 15 | 7% | 100% |

Wrong size and damaged in transit make up about 69% of last month's returns. We work on those two first.

**Text tree (fishbone)**

```text
Problem: returns up about 92 a month since July (212 against about 120)
├─ Process: packing not changed for the new courier [to check]
├─ Tools: new courier damages more parcels (suspected) [to check]
├─ Materials: new size chart does not match the garments (suspected) [to check]; photos differ from the items [to check]
├─ Measurement: no product, size or courier recorded per return [known]
└─ Environment: more orders since July, so the return rate may not have changed (suspected) [to check]
```

There is no People branch, because nothing in the facts points to training, workload or handover.

**Suspected causes**

1. The new size chart (from June) gives measurements that do not match the garments. Confirms it: wrong-size returns were well below 96 a month before July, and most wrong-size returns since July are on items that show the new chart, or a garment you measure does not match its chart. Rules it out: wrong-size returns were about the same share before July, or the new chart matches the garments you measure. Note that the chart changed in June and the rise started in July, so check whether the new chart went live on the pages later than the supplier change.
2. The new courier (from July) damages more parcels. Confirms it: damaged-in-transit returns were much lower than 51 a month before July, or, if some orders still go with another carrier, the damage rate per order is higher with the new courier. Rules it out: damaged returns were near 51 a month before July too.
3. You shipped more orders from July, and the return rate did not change. Confirms it: orders shipped rose by about the same share as returns (about 77%). Rules it out: orders shipped stayed near their level before July.

Timing makes causes 1 and 2 good leads, but they stay suspected until the evidence is in.

**First fix** (make it only if the evidence confirms cause 1)

- Change: on the clothing items with the most wrong-size returns, you put back the old size chart, or correct the new chart to the measurements you take from the garment.
- Reach: the top 10 clothing items by wrong-size returns [to confirm the number], for four weeks. It changes what customers see on those product pages only.
- Reversal: you put the new chart back on those pages; about an hour [to confirm].
- Worked if: wrong-size returns on those items fall by at least half in four weeks [to confirm], while wrong-size returns on the other clothing items stay about the same.
- Rollback if: after four weeks, wrong-size returns on those items are no lower than on the other clothing items, or sales of those items fall clearly [to confirm the threshold]. Then you put the new chart back and keep the containment.

If the evidence points to cause 2 instead, the same pattern applies to the courier: move a share of orders back to your old carrier for four weeks and compare damage per order.

**Your next three moves**

1. You: start the three containment steps today. Result: the note is live on clothing pages, fragile parcels ship with extra padding, and each new return has product, size, courier and date recorded.
2. You: this week, pull orders shipped and returns by reason for each month from January to now, and measure five top-returned garments against the new size chart. Result: you can say whether wrong-size and damaged returns rose as a rate, and whether the chart matches the garments.
3. You: if move 2 confirms the size chart, make the first fix on the top items and watch the rollback trigger for four weeks. If move 2 rules it out, re-rank the other suspected causes, pick the fix for the new top cause, and repeat move 2.

To check this reasoning for hidden assumptions, you may also like a skill for finding blind spots, if you have one.

## Grading
- P1 pass: Pareto table sorted with "Cumulative" column (45%, 69%, 83%, 93%, 100%) and "Wrong size and damaged in transit make up about 69% of last month's returns. We work on those two first."
- P2 pass: "Text tree (fishbone)" with Process, Tools, Materials, Measurement, Environment branches, plus "There is no People branch" explained.
- P3 pass: three suspected causes each with "Confirms it:"; "Timing makes causes 1 and 2 good leads, but they stay suspected until the evidence is in."
- P4 pass: containment precedes causes; first fix has "Reach: the top 10 clothing items ... [to confirm the number]", "Reversal: you put the new chart back", "Rollback if: after four weeks, wrong-size returns on those items are no lower".
- P5 pass: every owner is "You"; no invented source; dollar and percentage figures are arithmetic on the user's own numbers (212, about 120, about $18).
- Strict check pass: "Measurement: no product, size or courier recorded per return [known]" restates the user's "Nothing" in reply to whether per-return recording was in place; "about an hour [to confirm]" is marked; "four weeks" is a labelled trial window inside the proposed fix.

Triage:
