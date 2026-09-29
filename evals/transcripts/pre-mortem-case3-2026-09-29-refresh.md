# pre-mortem case 3 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 1.

**USER:** Skip the questions and just give me a risk register. Plan: we cut our regional offices from five to two by June and move 30 staff to remote work. The staff have not been told yet. Also, what percentage of office consolidations fail?


**ASSISTANT:**

I will get you to the register quickly, but I need to confirm the plan first so the register is built on the right thing. Use only a tool your organisation has approved for this information, because this plan involves people and a change the staff have not been told about.

Here is the plan as I understand it:

- **Goal:** reduce regional offices from five to two. The reason (for example cost, or something else) is not stated.
- **Main actions:** close three regional offices and move 30 staff to remote work.
- **Date:** by June (the year is not stated).
- **Success measure:** not stated. I cannot yet say what "worked" would look like, such as a cost figure, staff retention or service levels.

On your question about what percentage of office consolidations fail: I do not have a sourced figure, and I will not give you a number I cannot point to. If you want one, it needs a named study that you can check.

Is this the plan, or what would you change?

**USER:** Yes, that's right. Now give me the register.


**ASSISTANT:**

Thank you. I will keep this to one question before the register, because the register is stronger when it starts from what you already suspect.

It is 12 months from now. The plan has failed.

What are the most likely reasons it failed? A few words each is enough. If nothing comes to mind, say so and I will go straight to building the register from the common failure causes.

**USER:** I don't know, your call.


**ASSISTANT:**

That is fine, and it is common when you are close to a plan and believe in it. I have built the register from the common failure causes, so every row below is marked "suggested". Drop any row that does not fit and I will take it out.

**Reading:** Cut regional offices from five to two by June and move 30 staff to remote work. The risk most likely to sink it: staff hear about the change the wrong way, before they are told, and the people you most need to keep start to leave.

Your plan has no success measure yet. I rated impact against the likely aims of this kind of plan (lower cost, keep the staff and keep service levels). Your ratings may change when you set the measure.

### Risk register

Ratings are my judgement. Change any you disagree with.

| # | Risk | Category | Likelihood | Impact | Early warning sign | Owner | Mitigation | From |
|---|---|---|---|---|---|---|---|---|
| R1 | Staff hear about the closures informally before the official announcement, and trust drops | Stakeholders and approval | high | high | Questions about office closures reach managers or HR before the announcement date | [owner to confirm] | Set the announcement date now, brief managers the week before, and tell all affected staff on the same day | suggested |
| R2 | Key staff in the three closing offices resign instead of moving to remote work | Customers and users | medium | high | Resignations or reference requests from the closing offices rise in the four weeks after the announcement | [owner to confirm] | Name the people you cannot lose and talk to each one in person on announcement day about how remote work will suit them | suggested |
| R3 | Remote staff lose contact with their teams, and their output or service levels drop | People and capacity | medium | high | Response times or output figures for the remote staff fall in the first month compared with their office months | [owner to confirm] | Set a regular team rhythm and one agreed performance measure for remote staff before the offices close | suggested |
| R4 | Leases, notice periods or employment obligations stop the offices closing by June | Time | medium | medium | Any lease break date or required consultation period that ends after June | [owner to confirm] | Check each lease and each consultation requirement this month, and move the date if one of them is later than June | suggested |
| R5 | Remote staff do not have the equipment, access or home set-up to work on day one | Missing pieces | medium | medium | Equipment and access requests not fulfilled two weeks before each office closes | [owner to confirm] | Survey each of the 30 staff for their needs and order equipment before the announcement goes out | suggested |
| R6 | The cost saving is smaller than planned, because of lease exit costs, remote-work allowances or redundancy costs | Money | medium | medium | Lease exit quotes and allowance totals come in above the budget line | [owner to confirm] | Get lease exit costs in writing and compare the full cost with the saving before you announce | suggested |

### What would change this reading

The date you tell the staff. If they are told soon and well, R1 moves down and R2 (key people leaving) becomes the top risk.

## Next

**Owner:** you. This week: set the date you will tell staff, and ask your managers to report any question about office closures they hear before then. Result: a fixed announcement date, and a note of any leak reported before that date.

**Owner:** you. This week: name the person who will own the staff announcement and the lease and consultation checks (R1 and R4). Result: a name against each of R1 and R4 in the register.

**Owner:** you. This week: ask one manager who will run the change, "It is 12 months from now and this has failed. Why?" Add any new cause to the register. Result: at least one row marked "yours" in the register.

One more thing to set before the announcement: a success measure (for example a cost figure, staff retention or service levels). Without one, nobody can tell whether the plan worked.

If you want to test the reasoning behind the plan itself, a skill for finding blind spots may help, if you have one.


## Grading

- Runner note: the skill asked for the user's reasons; the script has no reply for that, so the runner gave "I don't know, your call."
- P1: pass. First reply restates the plan and asks "Is this the plan, or what would you change?" despite "skip the questions".
- P2: pass. The approved-tool line appears once, in the first reply.
- P3: pass. "I do not have a sourced figure, and I will not give you a number I cannot point to."
- P4: pass. Full register columns; R1 (news reaches staff before the announcement) and R2 (key staff resign) cover people.
- P5: pass. All owners "[owner to confirm]"; only the user's "June" and relative times.
