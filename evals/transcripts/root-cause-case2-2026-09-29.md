# root-cause eval, case 2: many causes, and counts exist

Skill commit: ed2883f. Eval version 1. Runner: one fresh subagent per assistant turn, reading only the skill folder and this transcript.

## User (turn 1)

Customer returns on our online store are up. Last month we had 212 returns: 96 wrong size, 51 damaged in transit, 30 not as pictured, 20 changed mind, 15 other. Help me find the root cause.

## Assistant (turn 1)

Let's start by pinning down the problem before we look for causes.

**Problem statement (draft)**
Customers of the online store returned 212 orders last month, and that total is higher than usual. The returns split into five reasons: wrong size 96, damaged in transit 51, not as pictured 30, changed mind 20, other 15.

| Question | Is | Is not (where it could happen but does not) |
|---|---|---|
| What | Returned orders, 212 last month, across five reasons | [to confirm] product lines or categories with few or no returns |
| Where | The online store | [to confirm] other channels (a physical shop, a marketplace), if you have them |
| When | Last month | [to confirm] the normal level before the rise, and the month it started going up |
| How much | 212 returns; returns as a share of orders [to confirm] | |

Gaps: the baseline and when the rise started; total orders last month (so we know if the return rate rose or just the order volume); which products the returns are on. All [to confirm].

I will not name a cause yet. Your five counts will drive the analysis, but a count only shows where returns cluster, and the clue to the cause is usually in what changed.

**One question:** how many returns did you have in a normal month before the rise, and if you have them, split by the same five reasons?

## User (turn 2)

Returns were about 120 a month for the year before. The rise started in July. It is across all product lines, but mostly clothing. We changed our size chart supplier in June and started a new courier in July.

## Assistant (turn 2)

Thanks. That gives the problem a clear start date and two changes that line up with it.

**Problem statement (updated)**
Customers of the online store returned 212 orders last month, against about 120 a month for the year before, so about 92 more than normal. The rise started in July. Returns went up across all product lines, but most of the rise is in clothing. Two changes came just before or at the start of the rise: a new size chart supplier in June and a new courier in July.

| Question | Is | Is not (where it could happen but does not) |
|---|---|---|
| What | Returned orders: wrong size 96, damaged in transit 51, not as pictured 30, changed mind 20, other 15 | [to confirm] which of the five reasons were already high before July |
| Where | The online store, all product lines, mostly clothing | Non-clothing lines rose less [to confirm by how much] |
| When | From July, continuing last month | The year before July, at about 120 a month |
| How much | 212 last month against about 120 normal; returns as a share of orders [to confirm] | |

The two changes are leads from timing, not causes yet. Timing alone does not prove a cause, so I will test both against your counts in the next step.

**Containment (to limit the harm now, before we know the cause)**
Customers are still receiving orders that may not fit or may arrive damaged. These moves are small and each can be undone:

- **Size:** on the clothing lines with the most returns, check the new size chart against the garment measurements, and put back the old chart on any product where the two disagree.
- **Transit damage:** check a sample of the new courier's deliveries and damage claims, and add packaging protection on the items that arrive damaged most often.
- **Customers:** add a short note on clothing pages asking customers to check the measurements, not only the size label.

Each move stays in place until the first fix has passed its rollback check.

**One question:** is any of this in place now, and which of these moves can you do today?

## User (turn 3)

Nothing. Each return costs us about $18 in postage and handling.

## Assistant (turn 3)

Thanks. At about $18 a return, last month's 212 returns cost about $3,816, and the roughly 92 returns above normal cost about $1,656 a month. That is the harm that continues until something changes.

**Problem statement**
Customers of the online store returned 212 orders last month, against about 120 a month for the year before July. The rise started in July and is across all product lines, mostly clothing. A new size chart supplier started in June and a new courier started in July. Each return costs about $18 in postage and handling.
Is not: the year before July (about 120 a month); non-clothing lines rose less [to confirm by how much].
Gaps: the pre-July split by the five reasons [to confirm]; total orders per month, so we know if the return rate rose or only the order count [to confirm]; whether any clothing is still on the old size chart or any orders still go by the old courier [to confirm].

**Containment (now, before the cause is known)**
Nothing is in place, so I suggest you start these today. Each one ends when the first fix has passed its rollback check.
- You: on the 10 clothing products with the most wrong-size returns, compare the new size chart with the garment measurements, and put back the old chart wherever the two disagree.
- You: pack the item types that arrive damaged most often with extra protection until the courier question is settled.
- You: add a short line on clothing pages asking customers to check the measurements, not only the size label.

**Tool:** Pareto first, because you have counts by reason, then a fishbone on the top two reasons, because two changes (the size chart and the courier) may combine.

**Diagram (SVG file, because I can write files here)**
I saved the fishbone at `/tmp/root-cause-eval/case2/returns-fishbone.svg`. Open it in any browser. The text versions follow.

**Pareto table (last month)**

| Reason | Count | Share | Cumulative | Cost at $18 |
|---|---|---|---|---|
| Wrong size | 96 | 45.3% | 45.3% | $1,728 |
| Damaged in transit | 51 | 24.1% | 69.3% | $918 |
| Not as pictured | 30 | 14.2% | 83.5% | $540 |
| Changed mind | 20 | 9.4% | 92.9% | $360 |
| Other | 15 | 7.1% | 100% | $270 |

Wrong size and damaged in transit carry about 69% of returns, and they are the two reasons that match your two changes. The table shows where returns cluster, not why.

**Fishbone (text tree)**
```text
Problem: returns up from about 120 to 212 a month since July
├─ People: packing handover to the new courier [to check]
├─ Process: no check of the size chart against garments before publishing [to check]; packaging not changed for the new courier [to check]
├─ Tools: new courier's handling of parcels (suspected) [to check]
├─ Materials: new size chart content from the June supplier (suspected) [to check]; product photos against the item [to check]
├─ Measurement: pre-July split by reason unknown; return rate per order unknown
└─ Environment: order volume or season change in July [to check]
```
Known: the 212 count and its split, the 120 baseline, the July start, the June and July changes, the $18 cost. Everything marked [to check] is a lead, not a finding.

**Suspected causes**
1. **The new size chart does not match the garments.** Confirms it: wrong-size returns before July were well below 96 a month, and last month's wrong-size returns sit on products where the new chart differs from the garment measurements. Rules it out: wrong-size returns were already near 96 a month before July, or they rose as much on products where the new chart matches the garments.
2. **The new courier damages more parcels.** Confirms it: damaged-in-transit returns before July were well below 51 a month, and the damage reports come from the new courier's deliveries. If any orders still go by the old courier, their damage rate is lower. Rules it out: damage returns were already near 51 a month before July, or the damage rate is the same on both couriers.
3. **More orders, same return rate.** Confirms it: orders rose from July by about the same share as returns (about 75%). Rules it out: returns per 100 orders rose from July. This one matters because it would change the fix from "repair the chart and courier" to "returns are growing with sales".

None of these is proven. The timing fits causes 1 and 2, but timing is a lead only.

**First fix (acts on cause 1)**
- **Change:** correct the new size chart against the measured garments on the 10 clothing products with the most wrong-size returns, and add one check before any chart entry goes live: its measurements must match the garment's.
- **Reach:** those 10 product pages and the chart publishing step. No other products, and no courier change.
- **Reversal:** restore the previous chart version on those 10 products and drop the check; well under an hour.
- **Worked if:** wrong-size returns on those 10 products fall by at least half over four weeks, compared with the same products last month.
- **Rollback if:** wrong-size returns on those 10 products do not fall, or rise, over four weeks, or the returns flip direction (for example "too small" becomes "too large"), which points to over-correction. Then reverse the fix and keep the containment.

The half-in-four-weeks target is my proposed threshold, not a benchmark. Change it if you know your normal wrong-size level.

**Your next three moves**
1. You: today, check the new chart against the garments on the top 10 wrong-size products, and put the old chart back where they disagree. Result: a list of products where the chart and the garment differ.
2. You: this week, pull the pre-July return counts by reason and the monthly order totals. Result: each suspected cause confirmed or ruled out on its "before July" test.
3. You: make the first fix on the 10 products and watch wrong-size returns on them for four weeks. Result: the fix passes or triggers its rollback.

If you want to check this reasoning for hidden assumptions, a skill for finding blind spots would suit, if you have one.
