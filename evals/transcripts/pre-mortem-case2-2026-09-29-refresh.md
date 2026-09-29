# pre-mortem case 2 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 1.

**USER:** Pre-mortem this. We are opening a second cafe in the next suburb in six months, funded by a $120,000 bank loan. My business partner Sam runs the finances. The plan is to copy our current menu and hire six staff.


**ASSISTANT:**

Before we look for what could go wrong, let me check I have the plan right. It involves a loan and hiring, so use only a tool your organisation has approved for this information.

- **Goal:** open a second cafe in the next suburb.
- **Main actions:** copy the current menu, hire six staff, fund it with a $120,000 bank loan, with Sam running the finances.
- **Date:** open in six months.
- **Success measure:** not stated. There is no target for sales, break-even date or loan repayment, so we cannot yet say what "failed" would look like.

Is this the plan, or what would you change?

**USER:** Yes. Success is breaking even within 12 months of opening.


**ASSISTANT:**

Thanks. So the plan is to open a second cafe in the next suburb in six months, funded by a $120,000 bank loan, and success means breaking even within 12 months of opening.

It is 12 months from now. The plan has failed.

What are the most likely reasons it failed?

**USER:** Honestly, I can't see it failing. The first cafe is full every day.


**ASSISTANT:**

That is common with a plan you believe in, and a full first cafe is a real strength. So I will add the likely causes myself, from a set of failure prompts, and you can drop any that do not fit.

**Reading:** Open a second cafe in the next suburb in six months on a $120,000 bank loan, and break even within 12 months of opening. The risk most likely to sink it: the cash runs out before the new cafe reaches break-even, because the loan and six wages start before the new suburb's customers do.

### Risk register

Ratings are my judgement. Change any you disagree with.

| # | Risk | Category | Likelihood | Impact | Early warning sign | Owner | Mitigation | From |
|---|---|---|---|---|---|---|---|---|
| R1 | The new cafe earns less, or later, than planned, and the cash runs out before break-even | Money | high | high | By the end of month 2 after opening, weekly sales are below the weekly figure the break-even forecast needs | Sam | Build a month-by-month cash forecast with a slow-start case, and hold a cash reserve or agreed overdraft that covers the worst month before opening | suggested |
| R2 | Customers in the next suburb do not come the way they do at the first cafe, and the copied menu does not suit them | Customers and users | medium | high | Before the lease is signed, a foot-traffic count at the new site at peak times is well below the count at the first cafe | [owner to confirm] | Count foot traffic and check the cafes already near the site before signing, and adjust the menu or prices for that suburb | suggested |
| R3 | The owners are split across two sites, and the first cafe, which pays the bills, slips | People and capacity | medium | high | The first cafe's weekly sales fall in the first month after the second one opens | [owner to confirm] | Hire or promote a manager for one of the two sites before opening, so each cafe has a lead every day | suggested |
| R4 | Fewer than six good staff are hired and trained in time | People and capacity | medium | medium | Fewer than six hires confirmed four weeks before opening | [owner to confirm] | Start recruiting at month 3, and move one trained staff member from the first cafe to the new one | suggested |
| R5 | The opening date slips because the fit-out, the lease or the council approvals run late, while loan repayments have already started | Time | medium | medium | Council approvals or the fit-out contract not signed by the end of month 2 | [owner to confirm] | Get approvals and a fixed fit-out date before committing to an opening date, and plan a month of slack into the six months | suggested |

### What would change this reading

If the $120,000 already includes a working-capital buffer for the first months of trading, R1 moves down and the new suburb's demand (R2) becomes the top risk.

## Next

1. **Owner:** Sam. This week: write the weekly sales figure the new cafe needs to break even, and add it as a line to a weekly check. Result: a written break-even number that the weekly sales are compared against from the first week of opening.
2. **Owner:** Sam. This week: draft the month-by-month cash forecast with a slow-start case. Result: a forecast that shows the lowest cash month and whether the loan covers it.
3. **Owner:** you. This week: ask one person who will do the work, such as your best barista, "It is 12 months from now and the second cafe has failed. Why?" Result: any new cause added as a row in this register.

To test the reasoning behind the plan itself, you may also like a skill for finding blind spots, if you have one.


## Grading

- P1: pass. After "I can't see it failing" the skill adds its own causes and builds the register.
- P2: pass. All five rows are "suggested".
- P3: pass. R1 (money) owner Sam; others "[owner to confirm]"; only relative times (month 2, four weeks before opening).
- P4: pass. High rows have observable signs: weekly sales below the break-even figure by month 2, a foot-traffic count, the first cafe's weekly sales falling.
- P5: pass. Moves 1 and 2 owner Sam, move 3 owner you; each has "This week" and "Result".
