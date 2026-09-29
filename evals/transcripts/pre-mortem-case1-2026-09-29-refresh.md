# pre-mortem case 1 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 1.

**USER:** Run a pre-mortem on my plan. We are moving our 40-person support team from email to a shared ticketing tool on 1 March. The team lead and I will train everyone in two half-day sessions in February, and we switch email off on the same day the tool goes live. Success is first replies within four hours for 90% of tickets by the end of April.


**ASSISTANT:**

Before we look for failure, I want to be sure I have the plan right.

- **Goal:** move your 40-person support team from email to a shared ticketing tool.
- **Main actions:** you and the team lead train everyone in two half-day sessions in February; email is switched off the same day the tool goes live.
- **Date:** go-live and email switch-off on 1 March.
- **Success measure:** first replies within four hours for 90% of tickets by the end of April.

One gap: the plan does not say what first-reply time is today, so there is no baseline to show whether April is an improvement or a return to normal.

Is this the plan, or what would you change?

**USER:** Yes, that is the plan.



**ASSISTANT:**

Thank you. Now picture this.

It is 12 months from now. The plan has failed.

What are the most likely reasons it failed?

**USER:** Half the team never finished the training because of leave, and the tool's email import lost old threads.



**ASSISTANT:**

**Reading:** Move the 40-person support team from email to a shared ticketing tool on 1 March, with email switched off the same day. The risk most likely to sink it: half the team never finishes training because of leave.

### Risk register

Your two reasons are R1 and R2. I added R3 to R5 from common failure causes for this kind of change; drop any that do not fit your situation. Ratings are my judgement. Change any you disagree with.

| # | Risk | Category | Likelihood | Impact | Early warning sign | Owner | Mitigation | From |
|---|---|---|---|---|---|---|---|---|
| R1 | Half the team never finishes the two training sessions because of leave | People and capacity | high | high | Leave booked in February overlaps a session date for more than a few people, or attendance is under 80% two weeks before go-live | you and the team lead | Check the February leave calendar before you set the session dates, and add a catch-up session or recording for anyone who misses one | yours |
| R2 | The tool's email import loses old threads | Technology and data | medium | high | A trial import of one mailbox shows fewer threads in the tool than in the mailbox | [owner to confirm] | Run a trial import in February and compare thread counts; keep the old mailbox read-only rather than deleted | yours |
| R3 | Customers keep writing to the old email address after it is switched off, and their messages go unanswered | Customers and users | medium | high | Customer emails still arrive at the old address in the last week of February, or bounce counts rise after 1 March | [owner to confirm] | Forward the old address into the tool instead of switching it off, and tell customers the new route before go-live | suggested |
| R4 | The tool has a problem on day one and there is nothing to fall back to, because email goes off the same day | Time | medium | high | The end-to-end test (a ticket in, a reply out) has not passed a week before go-live | [owner to confirm] | Keep email running in parallel for the first two weeks, or move switch-off to a later date | suggested |
| R5 | Nobody can show whether 90% of first replies were within four hours, because there is no baseline and no report set up | Missing pieces | medium | medium | The first-reply report does not exist in the tool on 1 March, or no one has measured today's first-reply time by the end of February | [owner to confirm] | Measure current first-reply time in February and build the report before go-live | suggested |

### What would change this reading

If the February leave calendar shows most of the team available for both sessions, R1 drops, and switching email off on the same day as go-live (R3 and R4) becomes the top risk.

## Next

1. **Owner:** you. This week: open the February leave calendar and mark who is away on the likely session dates. Result: a list of names who need a catch-up session.
2. **Owner:** you and the team lead. This week: book the two sessions around that leave and add one catch-up slot. Result: every one of the 40 people has a session date in the calendar.
3. **Owner:** you. This week: ask one person on the support team, "It is 12 months from now and the move to the ticketing tool failed. Why?" Result: any new cause is added to the register.

To test the reasoning behind the plan itself, you may also like a skill for finding blind spots, if you have one.


## Grading

- P1: pass. First reply restates goal, actions, date and success measure and asks "Is this the plan, or what would you change?"
- P2: pass. Turn 2: "It is 12 months from now. The plan has failed. What are the most likely reasons it failed?" before any cause.
- P3: pass. Register has risk, likelihood, impact, early warning sign, owner, mitigation; R1 (training missed through leave) and R2 (import lost old threads).
- P4: pass. "From" column: R1, R2 "yours"; R3 to R5 "suggested" in Customers and users, Time, Missing pieces.
- P5: pass. Owners are "you and the team lead" (user gave) or "[owner to confirm]"; no invented date.
