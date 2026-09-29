# pre-mortem case 1 transcript, 2026-09-29

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 745f86d. Eval version: 1.

**USER:** Run a pre-mortem on my plan. We are moving our 40-person support team from email to a shared ticketing tool on 1 March. The team lead and I will train everyone in two half-day sessions in February, and we switch email off on the same day the tool goes live. Success is first replies within four hours for 90% of tickets by the end of April.


**ASSISTANT:**

Before we look for causes, I want to check that I have the plan right. If any of this is sensitive (people, money, or a change not yet announced), use only a tool your organisation has approved for this information.

- **Goal:** move your 40-person support team from email to a shared ticketing tool.
- **Main actions:** you and the team lead train everyone in two half-day sessions in February, and email switches off on the same day the tool goes live.
- **Date:** go-live on 1 March.
- **Success measure:** first replies within four hours for 90% of tickets by the end of April.

Two gaps I can see. The plan does not say what first-reply time is today, so there is no baseline to show whether April is an improvement. It also does not say what happens if the tool has problems on 1 March, since email is off from that day.

Is this the plan, or what would you change?

**USER:** Yes, that is the plan.


**ASSISTANT:**

Thanks. Now picture this.

It is 12 months from now. The plan has failed.

What are the most likely reasons it failed?

**USER:** Half the team never finished the training because of leave, and the tool's email import lost old threads.

**ASSISTANT:**

Thanks. I have recorded both of your reasons as causes marked "yours". I then read the plan against a set of failure prompts and added the causes you did not name, marked "suggested". If any suggested cause does not fit your situation, tell me and I will drop it.

**Reading:** Move the 40-person support team from email to a shared ticketing tool on 1 March, with first replies within four hours for 90% of tickets by the end of April. The risk most likely to sink it: a large part of the team is not trained at go-live, on the same day email is switched off.

### Risk register

Ratings are my judgement. Change any you disagree with.

| # | Risk | Category | Likelihood | Impact | Early warning sign | Owner | Mitigation | From |
|---|---|---|---|---|---|---|---|---|
| R1 | Half the team does not finish the training because of leave | People and capacity | high | high | Fewer than 36 of the 40 staff booked into one of the two sessions when the leave calendar for February is checked | you and the team lead | Check the February leave calendar now, record both sessions, and run one catch-up session in the last week before go-live; pair each untrained person with a trained buddy for the first two weeks | yours |
| R2 | There is no fallback if the tool has problems on 1 March, because email switches off the same day | Time | medium | high | No written, tested plan for how the team replies to customers if the tool is down, one week before go-live | [owner to confirm] | Keep the support inbox receiving and forwarding into the tool for the first two weeks, and write a one-page "tool is down" procedure before go-live | suggested |
| R3 | The tool's email import loses old threads, so staff reply without the customer's history | Technology and data | medium | high | A trial import of one month of the mailbox shows a different thread count in the tool than in email | [owner to confirm] | Run a trial import in February and compare thread counts; keep the old mailbox read-only (not deleted) so staff can search it | yours |
| R4 | Customers keep writing to old addresses or replying to old email threads, and those messages never become tickets | Customers and users | high | medium | Messages still arrive in the old inbox after 1 March and have no matching ticket | [owner to confirm] | Forward every old support address into the tool, and set an auto-reply that confirms receipt and gives the new contact route | suggested |
| R5 | There is no baseline for first-reply time, so no one can show whether April is better or worse than today | Missing pieces | high | medium | No current first-reply figure is written down before 1 March | [owner to confirm] | In February, pull a sample of recent email threads and record today's first-reply time and the share answered within four hours | suggested |

### What would change this reading

How many of the 40 staff are on leave in February. If almost everyone is available for a session, R1 drops and the same-day switch-off with no fallback (R2) becomes the top risk.

## Next

1. **Owner: you.** This week, put the R1 early warning sign where you will see it: a simple count of staff booked into a session against the February leave calendar, checked weekly until go-live. Result: you know the training gap before 1 March, not after.
2. **Owner: you and the team lead.** This week, start the R1 mitigation: set the date for a catch-up session and arrange for both sessions to be recorded. Result: every staff member has a way to finish training before go-live, even if they are on leave for the main sessions.
3. **Owner: you.** This week, ask one support team member who will use the tool every day: "It is 12 months from now and the move to the ticketing tool has failed. Why?" Add any new cause to the register. Result: the register includes the view of someone who does the work.

To test the reasoning behind the plan itself, you may also like a skill for finding blind spots, if you have one.


## Grading

- P1: pass. The first reply restates goal, actions, date and success measure ("first replies within four hours for 90% of tickets by the end of April") and ends "Is this the plan, or what would you change?" with no cause listed.
- P2: pass. Turn 2 says "It is 12 months from now. The plan has failed. What are the most likely reasons it failed?" before any suggested cause.
- P3: pass. The register has Risk, Likelihood, Impact, Early warning sign, Owner and Mitigation columns; R1 (training missed through leave) and R3 (email import loses old threads) are the user's causes.
- P4: pass. Every row has a From value; suggested rows R2, R4, R5 are Time, Customers and users, and Missing pieces.
- P5: pass. Owners are "you and the team lead" (both named by the user) or "[owner to confirm]"; the only date is the user's 1 March, and timings are relative ("last week before go-live").
