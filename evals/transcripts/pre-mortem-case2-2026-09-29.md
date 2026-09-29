# pre-mortem case 2 transcript, 2026-09-29

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 745f86d. Eval version: 1.

**USER:** Pre-mortem this. We are opening a second cafe in the next suburb in six months, funded by a $120,000 bank loan. My business partner Sam runs the finances. The plan is to copy our current menu and hire six staff.


**ASSISTANT:**

This plan involves a loan and staff, so use only a tool your organisation has approved for this information.

Here is the plan as I read it:

- Goal: open a second cafe in the next suburb.
- Main actions: fund it with a $120,000 bank loan, copy the current menu, and hire six staff. Sam runs the finances.
- Date: opening in six months.
- Success measure: none stated. The plan does not say what a good result looks like, such as a monthly revenue figure, a break-even month or a loan repayment milestone.

Is this the plan, or what would you change?

**USER:** Yes. Success is breaking even within 12 months of opening.


**ASSISTANT:**

Thanks. The plan is to open a second cafe in the next suburb within six months, funded by a $120,000 bank loan. You copy the current menu and hire six staff, and Sam runs the finances. Success means the new cafe breaks even within 12 months of opening.

It is 12 months from now. The plan has failed.

What are the most likely reasons it failed?

**USER:** Honestly, I can't see it failing. The first cafe is full every day.


**ASSISTANT:**

That is common with a plan you believe in, and a full first cafe is a real strength. So I have read the plan against a set of common failure causes and added the ones that fit. Every row below is marked "suggested", because you did not name it. Drop any row you think does not apply.

**Reading:** Open a second cafe in the next suburb in six months on a $120,000 loan, and break even within 12 months of opening. The risk most likely to sink it: the new cafe earns less, or earns later, than the loan repayments and running costs need.

### Risk register

Ratings are my judgement. Change any you disagree with.

| # | Risk | Category | Likelihood | Impact | Early warning sign | Owner | Mitigation | From |
|---|---|---|---|---|---|---|---|---|
| R1 | The new cafe's sales do not cover wages, rent and loan repayments early enough, and cash runs short before break-even | Money | high | high | Weekly sales at the new cafe stay under the break-even figure for four weeks in a row in the first three months | Sam | Before the loan is signed, Sam builds a month-by-month cash forecast to the worst month, and the loan or a reserve covers the losses until break-even | suggested |
| R2 | Demand in the next suburb is lower, or different, from the first suburb, so the copied menu does not sell the same way | Customers and users | medium | high | A count of passing foot traffic at the new site at peak times is well below the same count at the first cafe | [owner to confirm] | Count foot traffic and talk to local people before signing the lease, and keep the menu open to change in the first months | suggested |
| R3 | The first cafe slips while the owners' time goes into the new one, and the business that funds the loan earns less | People and capacity | medium | high | The first cafe's weekly sales or review scores drop after work on the new site starts | [owner to confirm] | Name one person to run the first cafe day to day during the set-up and first months | suggested |
| R4 | Six good staff cannot be hired and trained in time, so the new cafe opens short-staffed or with poor service | People and capacity | medium | medium | Fewer than six people are hired a month before opening | [owner to confirm] | Start hiring early, and train new staff at the first cafe before the new one opens | suggested |
| R5 | The fit-out, permits or loan approval run late, and rent and repayments start before the doors open | Time | medium | medium | The loan is not approved, or permits are not granted, by the halfway point of the six months | [owner to confirm] | Build slack into the six months, and ask for a rent-free fit-out period in the lease | suggested |

### What would change this reading

If Sam's cash forecast shows that the $120,000 covers the fit-out and all losses up to break-even with room to spare, R1 moves down and R2 (demand in the new suburb) becomes the top risk.

## Next

1. You: put the early warning sign for R1 where it will be seen. Ask Sam to set the weekly break-even sales figure for the new cafe this week, so that a weekly check against it is ready before opening.
2. Sam: start the R1 mitigation. This week, Sam drafts the month-by-month cash forecast to the worst month, and you both see whether the loan and reserve cover it.
3. You: ask Sam, or one person who will work in the new cafe, "It is 12 months from now and the plan has failed. Why?" Add any new cause to this register.

To test the reasoning behind the plan itself, you may also like a skill for finding blind spots, if you have one.


## Grading

- P1: pass. After "I can't see it failing" the reply says "That is common with a plan you believe in" and goes straight to the register.
- P2: pass. The reply says "Every row below is marked 'suggested'" and R1 to R5 all read suggested.
- P3: pass. Sam owns only R1 (Money); all other owners are "[owner to confirm]"; no calendar date is invented.
- P4: pass. R1 to R3 (high likelihood or high impact) have observable signs: weekly sales under break-even four weeks running, foot-traffic count below the first cafe, first cafe's weekly sales or review scores dropping.
- P5: fail. Moves 1 and 2 have an owner, a first action this week and a result, but move 3 ("You: ask Sam, or one person ... Add any new cause") gives no first action this week and no stated result.
