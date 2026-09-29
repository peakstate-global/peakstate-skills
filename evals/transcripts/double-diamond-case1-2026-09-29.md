# double-diamond eval, case 1: the user arrives with a solution and pushes to skip the gate

Skill commit: 1834a1d. Eval version 1. Runner: one fresh subagent per assistant turn, reading only the skill folder and this transcript.

## User (turn 1)

Our new starters take too long to become productive. I think we need an onboarding app with videos and a chatbot. Can you help me design it?

## Assistant (turn 1)

Yes, I can help. Before we design anything, let's make sure we are solving the right problem. Use only a tool your organisation has approved for this information.

**Discover: the challenge as I understand it**

New starters take longer than you want to become productive, and that delay costs the team time and output. You want to shorten the time from start date to working well on their own.

**What we know so far**

- New starters take too long to become productive (user said).
- How long "too long" is, and what "productive" means in your team (to check).
- Which new starters are affected: all roles, or some teams or roles more than others (to check).
- What causes the delay: missing knowledge, access and tools, unclear tasks, or no time with a buddy or manager (to check).

**Parked ideas**

- An onboarding app with videos and a chatbot. This comes back in step 3, where we assess it next to other options.

**The biggest gap**

We have no evidence yet of how long it takes now, or where the time goes.

Here is my question: what number, record or observation shows that new starters take too long, and how long does it take them today compared with what you expect?

## User (turn 2)

About 40 people join the operations team each year. Managers say it takes about four months before a new starter handles cases alone. Exit interviews mention feeling lost in the first month. We have a 30-page induction document and a two-day classroom session.

## Assistant (turn 2)

Thank you. That gives us enough to draft the problem statement. This is the Define step, and it is a gate: we agree the problem before we look at any solution.

**Define: the problem statement (draft)**

- **Who:** new starters in the operations team, about 40 people each year (evidence).
- **Need:** they need to reach the point where they handle cases alone sooner, and to feel less lost in their first month.
- **Evidence:** managers say it takes about four months before a new starter handles cases alone (user said: a manager estimate, not yet a measured record). Exit interviews mention feeling lost in the first month (evidence). The current induction is a 30-page document and a two-day classroom session (evidence of what happens now).
- **Why now:** [to check]. Each of the 40 starters spends about four months not handling cases alone, and some of them leave, but we do not yet know why this matters more now than last year.
- **Out of scope (my proposal, please correct):** recruitment and selection, pay and conditions, and new starters in teams other than operations.

**How might we** help new operations starters handle cases alone sooner, and feel oriented in their first month?

**Assumptions check: what this statement relies on**

| Assumption | Dependence | Status | Cheap test (within about a week) |
|---|---|---|---|
| Four months is the real time to handling cases alone, and it is longer than it needs to be. | High | Untested: it is a manager estimate, not a record. | Pull the date each of the last 10 starters first closed a case without sign-off. If most are well under four months, the problem is smaller than stated. |
| Feeling lost in the first month is linked to the slow ramp-up, not a separate issue. | High | Untested | Ask five recent starters what held them back in months two to four. If their answers are unrelated to the first month, these are two problems, not one. |
| The delay comes from what starters know, not from access, case allocation or manager time. | High | Untested | Ask three managers what stops a starter taking cases alone at month two. If the answer is systems access or sign-off rules, the cause sits elsewhere. |
| Exit interview comments represent most starters, not only those who left. | Medium | Untested | Compare with a short question to current starters in their first six months. If most do not report feeling lost, the evidence is skewed. |
| The organisation can change the first four months (manager time, case rules, the induction). | Medium | Untested | Ask the operations manager which of these they can change this quarter. If none, the scope narrows. |

**Parked ideas**

- An onboarding app with videos and a chatbot. This comes back in step 3, next to other options.

Is this the problem, or what would you change?

## User (turn 3)

Can we skip ahead and just list solution ideas now?

## Assistant (turn 3)

Not yet. Ideas built on a problem nobody has checked often solve the wrong one, so I will hold them until we agree the problem. It only takes one answer from you.

**Define: the problem statement (draft)**

- **Who:** new starters in the operations team, about 40 people each year (evidence).
- **Need:** they need to handle cases alone sooner, and to feel less lost in their first month.
- **Evidence:** managers say it takes about four months before a new starter handles cases alone (user said: a manager estimate, not a measured record). Exit interviews mention feeling lost in the first month (evidence). The current induction is a 30-page document and a two-day classroom session (evidence of what happens now).
- **Why now:** [to check].
- **Out of scope (my proposal, please correct):** recruitment and selection, pay and conditions, and new starters in teams other than operations.

**How might we** help new operations starters handle cases alone sooner, and feel oriented in their first month?

The assumptions table above still applies. All five assumptions are untested, and the three with high dependence are the four-month figure, the link between feeling lost and the slow ramp-up, and the cause being knowledge rather than access, case allocation or manager time. Agreeing the statement does not make those assumptions true. We will carry them into the next steps and test them.

**Parked ideas**

- An onboarding app with videos and a chatbot. This comes back in step 3, next to other options.

If the statement is close enough, say "go ahead" and I will record it as agreed and move straight to the options.

Is this the problem, or what would you change?

## User (turn 4)

Yes, that is the problem.

## Assistant (turn 4)

Thank you. I have recorded the problem statement as agreed with you. The five assumptions under it are still untested, and we carry them forward.

**The agreed problem, in one line:** new operations starters (about 40 a year) take about four months to handle cases alone and feel lost in their first month, with a 30-page induction document and a two-day classroom session as the current support.

**How might we** help new operations starters handle cases alone sooner, and feel oriented in their first month?

**Develop: the options**

| Option | How it answers the "How might we" question | Riskiest assumption | Effort |
|---|---|---|---|
| A. Onboarding app with videos and a chatbot (your parked idea) | Starters find answers on demand instead of searching the 30-page document, which may cut the lost feeling and the time spent waiting for help. | Worth it: that the delay comes from missing knowledge, not from access, case allocation or manager time. This is the high-dependence assumption we have not tested. | High |
| B. A graduated case ladder with a named buddy | Starters take simple cases from week two, with a buddy who reviews them, and step up in case difficulty on a set schedule. They practise on real cases sooner. | Can we do it: that experienced staff have time to be buddies without slowing their own caseload. | Medium |
| C. A week-by-week first-month plan | Each starter gets a one-page plan: what to learn, who to meet and which cases to watch each week. It targets the lost feeling directly. | Want it: that a clear plan reduces the lost feeling, rather than the lost feeling coming from the work itself. | Low |
| D. Smallest option: change the sign-off rule | Find the rule or habit that stops a starter handling cases alone (for example, sign-off on every case until month four) and change it to sign-off by case type once the starter passes a check. | Worth it: that the four months is set by a rule or habit, not by what starters can actually do. | Low |

**My recommendation:** D, tested together with C. They are the cheapest options, and they test the cause of the delay before you spend on an app. If D shows the delay is about knowledge after all, A comes back with evidence behind it.

Which direction do you want to take forward?

## User (turn 5)

Go with your recommendation.

## Assistant (turn 5)

Thank you. I have taken my recommendation as the direction to test: D (change the sign-off rule), tested together with C (a week-by-week first-month plan). I have recorded it as your choice by default. It is a direction chosen to test, not a proven fix.

**Deliver: the strongest case against**

A fair sceptic would say this: "Managers keep sign-off on every case because starters make real mistakes in their first months. Loosen the rule and you trade a slow ramp-up for errors, rework and upset customers. The four months may be how long the skill actually takes." This attacks the assumption that the four months is set by a rule or habit, not by what starters can actually do.

**What survives:** the direction survives in a narrower form. I changed two things:

- The rule changes for one low-risk case type only, not for all cases, and only after the starter passes a short check.
- Quality becomes part of the pass mark. If rework goes up, the test fails, even if starters work alone sooner.

C survives unchanged. It is low effort, and it targets the lost feeling directly.

**Hypotheses (all untested)**

| # | Hypothesis | Measure | Success threshold | Sample and time frame | Status |
|---|---|---|---|---|---|
| H1 | We believe that sign-off by case type, after a passed check, will let operations starters handle one low-risk case type alone sooner, without more errors. | Number of pilot starters who pass the check and close cases of that type without sign-off; rework rate on those cases. | At least 4 of 6 pilot starters close 10 or more cases of that type alone, and their rework rate is no higher than the team's current rate for that case type. | 6 starters now in their first three months, over 4 weeks. | Untested |
| H2 | We believe a one-page week-by-week plan will help new operations starters feel oriented in their first month. | Answer to one question at the end of month one: "Did you feel lost in your first month?" (yes or no). | At least 4 of 5 starters who get the plan answer "no". | The next 5 starters, at the end of their first month. | Untested |

These thresholds are written now, before any result exists. You can change them now. Once the test starts, they stay as written.

**The next test: a pilot**

- **What it is:** a four-week pilot of the new sign-off rule, for one low-risk case type, with the 6 starters now in their first three months. This is the smallest test that could show H1 is wrong.
- **What it does:** an experienced team member picks the case type and writes a short check. Starters who pass it close that case type without sign-off. The team records cases closed alone and rework, and compares rework with the team's current rate.
- **Before it starts:** pull the date each of the last 10 starters first closed a case without sign-off. This tests the four-month figure, the high-dependence assumption the whole problem rests on, and it gives the pilot a real baseline.
- **Alongside it:** give the one-page plan to the next 5 starters, and ask the H2 question at the end of their first month.

**Parked ideas**

- The onboarding app with videos and a chatbot (option A) stays parked. It comes back if the pilot shows the delay is about knowledge after all.

Who will run this test, and by when?

## User (turn 6)

I don't know yet.

## Assistant (turn 6)

That is fine. I have written the owner and the date as "[to confirm]", so nothing below names a person or a date you did not give. Here is the take-away.

I had no web access, so facts from memory are labelled RECALLED. This take-away uses none.

### Problem statement (agreed with the user)

- Who: new starters in the operations team, about 40 people each year (evidence).
- Need: to handle cases alone sooner, and to feel less lost in their first month.
- Evidence: managers say it takes about four months before a new starter handles cases alone (user said: a manager estimate, not a measured record). Exit interviews mention feeling lost in the first month (evidence). The current induction is a 30-page document and a two-day classroom session (evidence).
- Why now: [to check].
- Out of scope: recruitment and selection, pay and conditions, and new starters in teams other than operations.
- Constraints: none.
- How might we help new operations starters handle cases alone sooner, and feel oriented in their first month?

### Options considered

| # | Option | How it answers the question | Riskiest assumption | Effort |
|---|---|---|---|---|
| O1 | Onboarding app with videos and a chatbot (your parked idea) | Starters find answers on demand instead of searching the 30-page document | The delay comes from missing knowledge, not from access, case allocation or manager time | high |
| O2 | A graduated case ladder with a named buddy | Starters take simple cases from week two, with a buddy who reviews them, and step up on a set schedule | Experienced staff have time to be buddies without slowing their own caseload | medium |
| O3 | A week-by-week first-month plan | A one-page plan of what to learn, who to meet and which cases to watch each week, aimed at the lost feeling | A clear plan reduces the lost feeling, rather than the lost feeling coming from the work itself | low |
| O4 | Smallest option: change the sign-off rule | Sign-off by case type once the starter passes a check, instead of sign-off on every case | The four months is set by a rule or habit, not by what starters can actually do | low |

Recommended: O4 tested together with O3, because they are the cheapest options and they test the cause of the delay before you spend on an app. The user chose: my recommendation.

### Chosen direction

O4 (change the sign-off rule) tested together with O3 (a week-by-week first-month plan), chosen to test.

- Strongest case against: managers keep sign-off on every case because starters make real mistakes in their first months, so loosening the rule trades a slow ramp-up for errors, rework and upset customers. The four months may be how long the skill actually takes. This attacks the assumption that the four months is set by a rule or habit (O4's riskiest assumption).
- What survived: O4 survives in a narrower form. The rule changes for one low-risk case type only, after the starter passes a short check, and rework is part of the pass mark. O3 survives unchanged.

### Assumptions

| # | Assumption | Dependence | Status | Cheap test |
|---|---|---|---|---|
| A1 | Four months is the real time to handling cases alone, and it is longer than it needs to be | high | untested (a manager estimate, not a record) | Pull the date each of the last 10 starters first closed a case without sign-off. If most are well under four months, the problem is smaller than stated. |
| A2 | Feeling lost in the first month is linked to the slow ramp-up, not a separate issue | high | untested | Ask five recent starters what held them back in months two to four. If their answers are unrelated to the first month, these are two problems. |
| A3 | The delay comes from a rule or habit (such as sign-off), not from what starters know, access or manager time | high | untested | Ask three managers what stops a starter taking cases alone at month two. If the answer is missing knowledge or systems access, O4 is aimed at the wrong cause. |
| A4 | Exit interview comments represent most starters, not only those who left | medium | untested | Ask current starters in their first six months one short question. If most do not report feeling lost, the evidence is skewed. |
| A5 | The organisation can change the first four months (manager time, case rules, the induction) | medium | untested | Ask the operations manager which of these they can change this quarter. If none, the scope narrows. |

### Hypotheses (thresholds set before the test; do not change them after the results)

| # | We believe... | Measure | Success threshold | Time frame or sample | Status |
|---|---|---|---|---|---|
| H1 | sign-off by case type, after a passed check, for operations starters will let them handle one low-risk case type alone sooner, without more errors | Pilot starters who close cases of that type without sign-off; rework rate on those cases | At least 4 of 6 pilot starters close 10 or more cases of that type alone, and their rework rate is no higher than the team's current rate for that case type | 6 starters now in their first three months, over 4 weeks | untested |
| H2 | a one-page week-by-week plan for new operations starters will help them feel oriented in their first month | Answer to "Did you feel lost in your first month?" (yes or no) at the end of month one | At least 4 of 5 starters who get the plan answer "no" | The next 5 starters, at the end of their first month | untested |

### Next test

- Type: pilot
- What: a four-week pilot of sign-off by case type for one low-risk case type, with the 6 starters now in their first three months. An experienced team member picks the case type and writes a short check, and the team records cases closed alone and rework against the team's current rate (tests H1). Before it starts, pull the first-solo-case dates for the last 10 starters as the baseline (tests A1). Alongside it, give the one-page plan to the next 5 starters and ask the H2 question at the end of their first month (tests H2).
- Owner: [to confirm]
- Date: [to confirm]

Parked idea: the onboarding app with videos and a chatbot (O1) stays parked. It comes back if the pilot shows the delay is about knowledge after all.

Method: the Double Diamond, from the Design Council (S1).

## Next

1. **Book the next test.** Owner: you. First action this week: decide who runs the pilot and the start date, and replace the two "[to confirm]" lines. Result: the pilot has a named owner and a date, and the H1 threshold is written where the team can see it.
2. **Get the thresholds held.** Owner: you. First action this week: before the pilot starts, show H1 and H2 and their thresholds to one person who will hold you to them, such as the operations manager. Result: a record that this person agreed the thresholds as written.
3. **Test the four-month figure.** Owner: you. First action this week: pull the date each of the last 10 starters first closed a case without sign-off (A1, the highest-dependence assumption that is not supported). Result: a recorded median time to first solo case, set against the four-month estimate.

To check the assumptions or the case against in more depth, you may also like a skill for finding blind spots or a skill for checking claims and provenance, if you have one.
