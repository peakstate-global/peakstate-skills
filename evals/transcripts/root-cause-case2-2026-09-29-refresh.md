# root-cause case 2 (refresh)

Skill commit 7e9db4e. Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/root-cause/.

**USER:** Customer returns on our online store are up. Last month we had 212 returns: 96 wrong size, 51 damaged in transit, 30 not as pictured, 20 changed mind, 15 other. Help me find the root cause.

**ASSISTANT:**

Let's start by pinning down the problem precisely, before we name any cause. Here is the problem statement as far as your facts take it.

**Problem statement (draft)**

Customer returns on the online store reached 212 last month. By reason: 96 wrong size, 51 damaged in transit, 30 not as pictured, 20 changed mind, 15 other.

| Question | Is | Is not (where it could happen but does not) |
|---|---|---|
| What | 212 returns in one month, 96 of them for wrong size | [to confirm] reasons that did not rise |
| Where | the online store | [to confirm] other channels (in store, marketplaces), and whether the returns cluster in particular products, categories or carriers |
| When | last month | [to confirm] when the rise started, and whether it is steady or came in one jump |
| How much | 212 returns | [to confirm] the usual monthly count, and the number of orders, so we can see the return rate and not only the count |

Gaps: every "[to confirm]" item above.

The biggest gap is the baseline. "Up" could mean more returns because you sold more, or a higher share of orders coming back, and those point in very different directions.

**My question:** Roughly how many returns did you have in a normal month before this, and how many orders did you ship last month compared with that normal month?


**USER:** Returns were about 120 a month for the year before. The rise started in July. It is across all product lines, but mostly clothing. We changed our size chart supplier in June and started a new courier in July.

**ASSISTANT:**

Thank you, that gives us the baseline and the start date. Here is the updated problem statement.

**Problem statement**

Customer returns on the online store rose from about 120 a month (the year before) to 212 last month, an increase of about 92 returns, or roughly 77%. The rise started in July. It is across all product lines, but mostly in clothing. Last month by reason: 96 wrong size, 51 damaged in transit, 30 not as pictured, 20 changed mind, 15 other.

| Question | Is | Is not (where it could happen but does not) |
|---|---|---|
| What | more returns, the largest reasons being wrong size (96) and damaged in transit (51) | [to confirm] which reasons stayed at their usual level |
| Where | the online store, all product lines, mostly clothing | [to confirm] how much of the rise is outside clothing |
| When | from July, and still high last month | the year before July (about 120 a month) |
| How much | 212 returns last month, against about 120 a month before | [to confirm] orders shipped, so we can compare the return rate and not only the count |

Gaps: the number of orders shipped each month; the count by reason before July; how the rise splits between clothing and other lines.

Two changes happened close to the start of the rise: a new size chart supplier in June and a new courier in July. I note them as leads to test, not as causes yet. Timing alone does not prove a cause.

**Containment (now, before the cause is known)**

Returns cost you money and customers every week, so it is worth limiting the harm while we look for the cause. My proposal:

- **Wrong size:** if you still have the size chart you used before June, put it back on the clothing pages for now. If you do not, add a short note on clothing pages that asks customers to check the garment measurements before they order.
- **Damaged in transit:** for the next few weeks, check a sample of parcels before they go to the courier, and add extra protection to items that break or crush easily. If your contract allows it, send fragile items with the previous courier.
- **End point:** keep these in place until the first fix has passed its rollback period.

**My question:** Is any of this already in place, and which of these can you start today?


**USER:** Nothing. Each return costs us about $18 in postage and handling.

**ASSISTANT:**

Thank you. With nothing in place yet, containment is the first thing to start, and the $18 figure shows why. Here is the full analysis.

**Problem statement**

Customer returns on the online store rose from about 120 a month (the year before) to 212 last month, about 92 more returns, or roughly 77%. The rise started in July. It is across all product lines, but mostly in clothing. Last month by reason: 96 wrong size, 51 damaged in transit, 30 not as pictured, 20 changed mind, 15 other. At about $18 a return, returns cost about $3,816 last month, and the rise above the old level costs about $1,656 a month.

Is not: the year before July (about 120 a month); product lines other than clothing carry less of the rise.

Gaps: orders shipped each month, so we can compare the return rate and not only the count [to confirm]; the count by reason before July [to confirm]; how the rise splits between clothing and other lines [to confirm].

**Containment (now, before the cause is known)**

Nothing is in place, so the harm continues at about $1,656 a month above the old level. Start these today:

- **Wrong size:** you put the pre-June size chart back on the clothing pages. If you no longer have it, add a note on clothing pages that asks customers to check the garment measurements before they order.
- **Damaged in transit:** whoever packs orders checks a sample of parcels before they go to the courier, and adds extra protection to items that break or crush easily. If your contract allows it, send fragile items with the previous courier.
- **End point:** keep both in place until the first fix has passed its rollback period.

**Tool:** Pareto first, because you have counts by reason; then a fishbone on the rise, because two changes (size chart and courier) may combine.

**Diagram** (SVG file, because I can write files here): `/tmp/root-cause-eval/case2/returns-fishbone.svg`. Suspected causes are in bold.

**Pareto table (last month)**

| Category | Count | Share | Cumulative |
|---|---|---|---|
| Wrong size | 96 | 45% | 45% |
| Damaged in transit | 51 | 24% | 69% |
| Not as pictured | 30 | 14% | 83% |
| Changed mind | 20 | 9% | 93% |
| Other | 15 | 7% | 100% |

Wrong size and damaged in transit together make up 69% of returns. Work on those two first.

**Text tree (fishbone)**

```text
Problem: returns up ~77% since July (about 120 to 212 a month)
├─ Process: packing not changed for the new courier [to check]
├─ Materials: new size chart from June supplier (suspected) [to check]; product photos vs goods [to check]
├─ Environment: new courier from July (suspected) [to check]; more orders shipped [to check]
├─ Measurement: return rate unknown (no order count yet); reasons are picked by the customer [known]
└─ People: packers trained on the new courier's packing rules [to check]
```

**Suspected causes**

1. **The new size chart (from June) does not match the garments.**
   Confirms it: measure a sample of the top-returned clothing items and the new chart gives different measurements; or wrong-size returns before July were well below 96 a month.
   Rules it out: the chart matches the measured garments, and wrong-size returns were already near 96 a month before July.
2. **The new courier (from July) damages more parcels, or needs packing you have not changed.**
   Confirms it: damaged-in-transit returns rose from July and are almost all on the new courier.
   Rules it out: damaged-in-transit returns were already near 51 a month before July, or items sent with the previous courier show the same damage rate.
3. **You shipped more orders, so the count rose but the return rate did not.**
   Confirms it: orders shipped rose by a similar share (about 77%) from July.
   Rules it out: orders shipped stayed about flat, so a higher share of orders came back.

Timing points at causes 1 and 2, but timing alone is a lead, not proof. Cause 1 is on top because wrong size is the largest category and it is mostly clothing.

**First fix**

- **Change:** correct the size chart for the 10 clothing products with the most wrong-size returns, using garment measurements you take yourself.
- **Reach:** the size chart on those 10 product pages, and the customers who order those products.
- **Reversal:** put the current chart back on those pages; a few minutes per page.
- **Worked if:** wrong-size returns on those 10 products fall by at least half within four weeks, compared with the four weeks before the change.
- **Rollback if:** wrong-size returns on those 10 products do not fall, or rise, over the first two weeks. Then reverse the fix and keep the containment.

**Your next three moves**

1. You: put the containment above in place this week. Result: the pre-June chart (or the measurement note) is live on clothing pages, and fragile parcels get the extra check.
2. You: pull orders shipped and returns by reason for each month from January to now, and split damaged-in-transit returns by courier. Result: a table that confirms or rules out causes 1, 2 and 3.
3. You: if step 2 confirms cause 1, make the first fix on the 10 products and watch the rollback trigger for four weeks. If step 2 rules it out, re-rank the remaining causes, pick the fix for the new top cause, and repeat from step 2.

To check this reasoning for hidden assumptions, you may also like a skill for finding blind spots, if you have one.

## Grading
- P1 pass: sorted Pareto table with a Cumulative column (45%, 69%, 83%, 93%, 100%) and "Wrong size and damaged in transit together make up 69% of returns. Work on those two first."
- P2 fail: the fishbone is present (hand-written SVG plus text tree with Process, Materials, Environment, Measurement, People), but it states a fact not in the user's input as known: "reasons are picked by the customer [known]".
- P3 pass: three causes, each with "Confirms it:" and "Rules it out:"; June and July changes kept as leads: "timing alone is a lead, not proof."
- P4 pass: containment precedes causes; first fix has "Reach:", "Reversal: put the current chart back on those pages" and "Rollback if:".
- P5 pass: all three moves are owned by "You"; no invented source or date. Plain reading: "whoever packs orders" in containment names no role or person, so it is not an invented owner. Derived figures ($3,816, $1,656, 77%) are arithmetic on the user's numbers.

Triage: P2 skill fault, diagrams.md reserves "[known]" for established facts and the model used it for an assumption about the returns form.
