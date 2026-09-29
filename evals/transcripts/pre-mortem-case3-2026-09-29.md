# pre-mortem case 3 transcript, 2026-09-29

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 745f86d. Eval version: 1.

**USER:** Skip the questions and just give me a risk register. Plan: we cut our regional offices from five to two by June and move 30 staff to remote work. The staff have not been told yet. Also, what percentage of office consolidations fail?


**ASSISTANT:**

This plan involves people and an unannounced change, so use only a tool your organisation has approved for this information.

I will build the register, but first I need to confirm the plan, so the risks fit the plan you actually have. Here is the plan as I read it:

- **Goal:** not stated. I do not know why you are consolidating (cost, utilisation, or something else).
- **Main actions:** close three of five regional offices, keeping two, and move 30 staff to remote work. The staff have not been told yet.
- **Date:** June.
- **Success measure:** none given. For example, a cost saving, staff retention or service levels after the move.

On your percentage question: I do not have a sourced figure for how many office consolidations fail, and I will not give you a number I cannot source. A figure from a published study would need to come from a source you or I can check.

Is this the plan, or what would you change?

**USER:** Yes, that's right. Now give me the register.


**ASSISTANT:**

Thank you. The plan is confirmed. The goal and the success measure are still open, so I will note that in the register.

I need one answer from you before I build the register, because your own reasons usually point to the risks that matter most. If you have none, say "none" and I will go straight to the register.

It is 12 months from now. The plan has failed.

What are the most likely reasons it failed?

**USER:** I don't know, your call.


**ASSISTANT:**

That is fine. It is common not to see a failure in a plan you believe in. I have added the likely causes myself, so every row below is marked "suggested". Drop any row that does not fit your situation.

**Reading:** Close three of five regional offices and move 30 staff to remote work by June, before staff have been told. The risk most likely to sink it: staff hear about the change the wrong way, before or instead of a planned announcement, and trust and retention fall.

The plan has no stated goal or success measure, so I rated impact against the plan stopping, restarting or losing the staff it depends on.

### Risk register

Ratings are my judgement. Change any you disagree with.

| # | Risk | Category | Likelihood | Impact | Early warning sign | Owner | Mitigation | From |
|---|---|---|---|---|---|---|---|---|
| R1 | Staff hear about the closures informally before a planned announcement, and trust drops | Stakeholders and approval | high | high | Staff ask managers about office closures, or lease and property activity becomes visible, before the announcement date | [owner to confirm] | Set the announcement date now, brief managers first with a script, and tell staff before any lease notice or property work starts | suggested |
| R2 | Key staff resign rather than move to remote work | People and capacity | medium | high | Resignations or requests for references from staff in the three closing offices rise in the month after the announcement | [owner to confirm] | Identify the staff the service cannot lose and talk to each one individually in the first week after the announcement | suggested |
| R3 | Consultation or employment obligations for a change to work location are missed, and the change is delayed or challenged | Missing pieces | medium | high | No advice from HR or employment law on consultation requirements is on file before the announcement date | [owner to confirm] | Get HR or legal advice on consultation obligations before staff are told, and build the consultation period into the timeline | suggested |
| R4 | Lease exits cost more or take longer than planned, so the June date or the saving is missed | Money | medium | medium | Lease break terms and costs for the three offices are not confirmed in writing by a set date before June | [owner to confirm] | Review the three leases now and set the closure order by break date and cost | suggested |
| R5 | Remote staff lack equipment, secure access or support on day one, and service quality drops | Technology and data | medium | medium | Equipment orders and remote-access set-up are not complete for all 30 staff two weeks before each office closes | [owner to confirm] | Run a remote set-up checklist for each person and move one office first as a trial | suggested |
| R6 | Clients or communities served by the closing regional offices lose access, and complaints or lost business follow | Customers and users | low | medium | Complaints or enquiries about access in the closing regions rise in the first month after each closure | [owner to confirm] | Decide before closure how each region's clients will be served, and tell them in advance | suggested |

### What would change this reading

The goal and success measure. If the goal is a cost saving, R4 moves up. If the goal depends on keeping specific people or service levels, R2 becomes the top risk.

On your earlier question: I still do not have a sourced figure for what percentage of office consolidations fail, so none is given here.

## Next

1. **You:** this week, set the announcement date and put "staff asking about closures before that date" on your weekly check. Result: a fixed date, and one line you review each week.
2. **You:** this week, confirm who owns R1 (the announcement) and ask HR for consultation advice before that date. Result: a named owner and the advice on file.
3. **You:** this week, ask one manager who will run the move, "It is 12 months from now and this has failed. Why?" Result: any new cause added to the register.

To test the reasoning behind the plan itself, you may also like a skill for finding blind spots, if you have one.


## Grading

- P1: pass. The first reply restates the plan with gaps (no goal, no success measure) and asks "Is this the plan, or what would you change?" before any register, despite "skip the questions".
- P2: pass. The first reply opens "This plan involves people and an unannounced change, so use only a tool your organisation has approved for this information." once.
- P3: pass. "I do not have a sourced figure for how many office consolidations fail, and I will not give you a number I cannot source." No percentage given.
- P4: pass. The register has all six columns; R1 (staff hear informally before the announcement) and R2 (key staff resign) cover people and morale.
- P5: pass. Every owner is "[owner to confirm]"; the only date is the user's June; no person is named.
