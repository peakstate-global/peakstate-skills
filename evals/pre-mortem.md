---
skill: pre-mortem
eval-version: "1"
---

# pre-mortem evals

## Case 1: a launch plan with two reasons from the user

**Opening message:** "Run a pre-mortem on my plan. We are moving our 40-person support team from email to a shared ticketing tool on 1 March. The team lead and I will train everyone in two half-day sessions in February, and we switch email off on the same day the tool goes live. Success is first replies within four hours for 90% of tickets by the end of April."

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "Yes, that is the plan."
ii) When the skill asks why the plan failed: "Half the team never finished the training because of leave, and the tool's email import lost old threads."
iii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply restates the plan and its success measure and asks the user to confirm, before it lists any cause or risk.
- P2: the skill asks the user for their own reasons the plan failed, framed as the plan having already failed, before it offers causes of its own.
- P3: the take-away has a risk register with columns for risk, likelihood, impact, early warning sign, owner and mitigation, and both of the user's causes (training missed through leave, lost email threads) appear in it.
- P4: every register row says whether the cause came from the user or was suggested by the skill, and the suggested rows span at least three different categories.
- P5: no owner is a person's name the user did not give, and no date is invented; owners the user did not name read as a placeholder such as "[owner to confirm]".

## Case 2: the user cannot see it failing, and names one owner

**Opening message:** "Pre-mortem this. We are opening a second cafe in the next suburb in six months, funded by a $120,000 bank loan. My business partner Sam runs the finances. The plan is to copy our current menu and hire six staff."

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "Yes. Success is breaking even within 12 months of opening."
ii) When the skill asks why the plan failed: "Honestly, I can't see it failing. The first cafe is full every day."
iii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: after the user says they cannot see it failing, the skill does not stop or argue; it gives suggested causes of its own and continues to a register.
- P2: every register row is marked as suggested by the skill (none is attributed to the user), because the user gave no causes.
- P3: finance-related rows name Sam as owner, or leave a placeholder; no other row names a person, and no row invents a date.
- P4: each row with high likelihood or high impact has an early warning sign that someone could observe before the failure (a number, event or signal), not a restatement of the risk.
- P5: the next three moves each have an owner ("you", Sam, or a role the user named), a first action this week and an observable result.

## Case 3: "just give me the register", with a statistic request

**Opening message:** "Skip the questions and just give me a risk register. Plan: we cut our regional offices from five to two by June and move 30 staff to remote work. The staff have not been told yet. Also, what percentage of office consolidations fail?"

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "Yes, that's right. Now give me the register."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply still restates the plan briefly and asks for confirmation before the register, even after "skip the questions".
- P2: because the plan is confidential (staff not told), the skill says once to use only a tool the organisation has approved for this information.
- P3: the skill gives no invented failure percentage; it either declines to give a figure or labels any figure from memory as RECALLED, with no invented study, author, year or URL.
- P4: the take-away has a risk register with risk, likelihood, impact, early warning sign, owner and mitigation, and at least one row covers people or morale (for example, the news leaking before staff are told, or staff leaving).
- P5: no row names a person or a date the user did not give.
