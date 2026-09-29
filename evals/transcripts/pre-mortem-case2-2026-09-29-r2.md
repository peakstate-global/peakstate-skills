# pre-mortem case 2 transcript (re-run), 2026-09-29

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 5def488. Eval version: 1.

**USER:** Pre-mortem this. We are opening a second cafe in the next suburb in six months, funded by a $120,000 bank loan. My business partner Sam runs the finances. The plan is to copy our current menu and hire six staff.


**ASSISTANT:**

Before we start: this plan involves money and staff, so use only a tool your organisation has approved for this information.

Here is the plan as I understand it:

- **Goal:** open a second cafe in the next suburb.
- **Main actions:** fund it with a $120,000 bank loan, copy the current menu, and hire six staff. Sam, your business partner, runs the finances.
- **Date:** open within six months.
- **Success measure:** none stated. The plan does not say what a working second cafe looks like, such as a break-even month or a weekly revenue figure.

Is this the plan, or what would you change?

**USER:** Yes. Success is breaking even within 12 months of opening.


**ASSISTANT:**

Thank you. The plan is confirmed: open the second cafe within six months on a $120,000 loan, with the current menu and six staff, and break even within 12 months of opening.

It is 12 months from now. The plan has failed.

What are the most likely reasons it failed?

**USER:** Honestly, I can't see it failing. The first cafe is full every day.


**ASSISTANT:**

That is common with a plan you believe in, and a full first cafe is a real strength. I have added the causes that plans like this one often meet, so you can test each one against what you know. Drop any that do not fit.

**Reading:** Open a second cafe in the next suburb within six months on a $120,000 loan, with the current menu and six staff, and break even within 12 months of opening. The risk most likely to sink it: the new suburb does not bring the same demand as the first cafe.

### Risk register

Ratings are my judgement. Change any you disagree with.

| # | Risk | Category | Likelihood | Impact | Early warning sign | Owner | Mitigation | From |
|---|---|---|---|---|---|---|---|---|
| R1 | Demand in the new suburb is lower than at the first cafe, and the copied menu does not suit the local customers | Customers and users | medium | high | Before the lease is signed: a foot-traffic count at the new site is well below the count outside the first cafe. After opening: weekly revenue is under the weekly break-even figure for the first eight weeks | [owner to confirm] | Count foot traffic at the new site at your busiest times before you sign, and ask regulars at the first cafe where they live | suggested |
| R2 | Cash runs out before break-even: the fit-out costs more than planned, revenue builds slowly, and loan repayments and six wages start at once | Money | medium | high | Sam's monthly cash forecast shows a month where the bank balance cannot cover one month of wages plus loan repayments | Sam | Sam builds a month-by-month cash forecast for the first 12 months with a slow-start case, and you agree a contingency sum or an overdraft before you draw the loan | suggested |
| R3 | You and Sam are split across two sites, and the first cafe, which pays the bills, slips | People and capacity | medium | high | The first cafe's weekly revenue falls, or complaints rise, in the month after the second cafe opens | [owner to confirm] | Name a manager at the first cafe before the second one opens, and agree which owner is at which site each week | suggested |
| R4 | The opening date slips because the lease, council approvals or the fit-out builder run late | Time | medium | medium | The lease, the approvals and the builder's contract are not all signed by the halfway point of the six months | [owner to confirm] | Write the six months as a dated list of steps, and do not commit staff start dates until the builder confirms a finish date | suggested |
| R5 | You cannot hire and train six staff in time, so the new cafe opens short-staffed and service is slow | People and capacity | medium | medium | Fewer than six people have accepted offers four weeks before opening | [owner to confirm] | Move one or two experienced staff from the first cafe to the new one, and backfill the first cafe with new hires | suggested |

### What would change this reading

If many of the first cafe's customers already live or work in the next suburb, R1 moves down and cash running out (R2) becomes the top risk.

## Next

1. **Owner:** you. This week: book two foot-traffic counts at the new site at the same times the first cafe is busiest. Result: two counts written down beside the first cafe's numbers, before any lease is signed.
2. **Owner:** Sam. This week: start the month-by-month cash forecast for the first 12 months, with a slow-start case. Result: a forecast that shows the lowest bank balance month and whether it covers wages plus loan repayments.
3. **Owner:** you. This week: ask one person who will do the work, such as your most senior staff member, "It is 12 months from now and the second cafe has failed. Why?" Result: any new cause added to this register.

To test the reasoning behind the plan itself, you may also like a skill for finding blind spots, if you have one.


## Grading

- P1: pass. After "I can't see it failing" the reply says "That is common with a plan you believe in" and goes on to the register.
- P2: pass. Every row R1 to R5 has From = suggested.
- P3: pass. Sam owns only R2 (Money); other owners are "[owner to confirm]"; no calendar date is invented.
- P4: pass. R1 to R3 (high impact) have observable signs: foot-traffic count below the first cafe, a forecast month where cash cannot cover wages plus repayments, first cafe's weekly revenue falling or complaints rising.
- P5: pass. All three moves read "Owner: ... This week: ... Result: ..." with owners you, Sam, you.
