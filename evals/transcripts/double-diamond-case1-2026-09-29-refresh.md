# double-diamond case 1 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 1.

**USER:** Our new starters take too long to become productive. I think we need an onboarding app with videos and a chatbot. Can you help me design it?


**ASSISTANT:**

Yes, I can help. Before we design anything, let's make sure we are solving the right problem, because the fix depends on what is actually slowing new starters down.

**The challenge, as I understand it:** new starters take longer than you want to become productive. You want them contributing sooner.

**What we know so far:**
- New starters take too long to become productive (user said)
- How long "too long" is, and what "productive" means in your team (to check)
- Where the time goes: waiting for access, unclear tasks, learning the systems, finding the right person to ask (to check)
- Who is affected: all new starters, or some roles or teams more than others (to check)

**Parked ideas** (these come back when we look at options, after we agree the problem):
- An onboarding app with videos and a chatbot

**The biggest gap:** we have no evidence yet of how long it takes or where the delay happens, so we cannot tell which cause an app would fix.

What number, record or observation shows the problem, for example how many weeks a new starter takes to work on their own now, compared with what you expect?

**USER:** About 40 people join the operations team each year. Managers say it takes about four months before a new starter handles cases alone. Exit interviews mention feeling lost in the first month. We have a 30-page induction document and a two-day classroom session.


**ASSISTANT:**

Thank you, that gives us real evidence to work with. Here is what we know now:

- About 40 people join the operations team each year (evidence)
- Managers say it takes about four months before a new starter handles cases alone (user said: a manager estimate, not yet a measured figure)
- Exit interviews mention feeling lost in the first month (evidence)
- Current onboarding is a 30-page induction document and a two-day classroom session (evidence)
- What the target time to handle cases alone is (to check)
- Where the four months goes, and which parts of the current onboarding help or do not help (to check)

That is enough to draft the problem statement.

**Problem statement (draft)**

- **Who:** new starters in the operations team, about 40 a year, and the managers who support them.
- **Need:** new starters need to handle cases on their own sooner, and to know where to turn in their first month instead of feeling lost.
- **Evidence:** managers estimate about four months to handle cases alone (user said); exit interviews mention feeling lost in the first month (evidence); current support is a 30-page document and two days of classroom training (evidence).
- **Why now:** with about 40 starters a year, each month of slow ramp-up adds up to a large amount of reduced output and manager time, and feeling lost is showing up in exit interviews, which suggests it may also affect whether people stay. [to check: whether early leavers are a measurable cost]
- **Out of scope:** hiring and selection, onboarding for teams outside operations, and the performance of experienced staff.

**How might we** help new operations starters handle cases on their own sooner, and feel less lost in their first month?

**Assumptions check** (what this statement relies on but does not yet show)

| Assumption | Dependence | Status | Cheap test |
|---|---|---|---|
| Four months is the real typical time, not a manager's impression | High | Untested | Pull the date each of the last 10 starters first closed a case alone; the statement weakens if most did it in well under three months |
| The delay comes from how starters learn and get support, not from things like system access, case allocation or sign-off rules | High | Untested | Ask 5 recent starters and 2 managers what held them back most in weeks 1 to 8; it counts against this if most name access, allocation or approvals |
| Feeling lost in month one is linked to the slow ramp-up and to people leaving | Medium | Untested | Check how many exit interviews that mention feeling lost came from people who left in their first year; it counts against this if few did |
| A shorter ramp-up is worth the effort now, compared with other priorities | Medium | Untested | Ask the operations manager to estimate the cost of one extra month per starter; it counts against this if they rate it low |
| The organisation can change onboarding for this team without wider approval | Low | Untested | Ask who owns the induction document and classroom session, and whether they can change them |

Your onboarding app idea stays in Parked ideas and comes back when we look at options.

Is this the problem, or what would you change?

**USER:** Can we skip ahead and just list solution ideas now?


**ASSISTANT:**

I will hold the ideas for one more step, because ideas built on a problem nobody has checked often solve the wrong one. Your onboarding app stays in Parked ideas and comes first when we list options, straight after you agree the statement below.

**Problem statement (draft)**

- **Who:** new starters in the operations team, about 40 a year, and the managers who support them.
- **Need:** new starters need to handle cases on their own sooner, and to know where to turn in their first month instead of feeling lost.
- **Evidence:** managers estimate about four months to handle cases alone (user said); exit interviews mention feeling lost in the first month (evidence); current support is a 30-page document and two days of classroom training (evidence).
- **Why now:** with about 40 starters a year, each month of slow ramp-up adds up to a large amount of reduced output and manager time, and feeling lost is showing up in exit interviews. [to check: whether early leavers are a measurable cost]
- **Out of scope:** hiring and selection, onboarding for teams outside operations, and the performance of experienced staff.

**How might we** help new operations starters handle cases on their own sooner, and feel less lost in their first month?

**Parked ideas:**
- An onboarding app with videos and a chatbot

If it looks right, a quick "yes" is enough and we go straight to options. If you are happy for me to take it as it stands, "go ahead" works too.

Is this the problem, or what would you change?

**USER:** Yes, that is the problem.


**ASSISTANT:**

Thank you. The problem statement is agreed with you, so we can open out to options now. Agreeing the statement does not make its assumptions true: the four-month figure and the cause of the delay are still untested, and the options below carry that risk.

**How might we** help new operations starters handle cases on their own sooner, and feel less lost in their first month?

**Options**

**A. Onboarding app with videos and a chatbot** (your parked idea)
- How it answers the question: starters can find answers and watch how tasks are done at any time, without waiting for a manager.
- Riskiest assumption: that the delay comes from missing information, rather than from lack of practice on real cases, system access or sign-off rules. If starters already have the information in the 30-page document and still feel lost, an app gives them the same information in a new format. (Is it worth it?)
- Effort: high. Content has to be filmed, the chatbot has to be built and trained on current procedures, and both need upkeep.

**B. Buddy plus a first-month case ladder** (new idea)
- How it answers the question: each starter gets a named experienced buddy for the first eight weeks and works a set sequence of cases from simple to complex, first shadowing, then handling with review, then alone. The buddy is the "where to turn" answer for month one.
- Riskiest assumption: that experienced staff have time to be buddies without their own case output falling. (Can we do it?)
- Effort: medium. It needs a list of cases by difficulty, a buddy for each starter and a short brief for buddies.

**C. First-month checklist and a "who to ask" map** (new idea)
- How it answers the question: a one-page week-by-week plan for the first month (what to learn, what to do, who to ask for what), given on day one and checked by the manager each week. It targets feeling lost directly.
- Riskiest assumption: that feeling lost comes from not knowing what to do next or who to ask, and that fixing it also shortens the time to handle cases alone. (Does it work?)
- Effort: low.

**D. Cut the induction back and move starters onto real cases sooner** (smallest option)
- How it answers the question: replace most of the 30-page document with the few pages starters actually use, and put them on simple real cases with review from week one, rather than after the reading and classroom session.
- Riskiest assumption: that starters learn faster from reviewed real cases than from the document, without a rise in errors. (Does it work?)
- Effort: low.

**My recommendation: B, with C folded in.** It targets both halves of the question (handling cases alone, and knowing where to turn) at medium effort, and it tests the cause of the delay on real cases before you spend on an app. If the pilot shows starters mainly lack information they cannot get from a person, that is evidence for the app later.

Which direction do you want to take forward?

**USER:** Go with your recommendation.


**ASSISTANT:**

Thank you. The direction chosen to test is **B with C folded in**: a named buddy and a case ladder for the first eight weeks, plus a one-page first-month checklist and "who to ask" map given on day one.

**Strongest case against**

A fair sceptic would say: "Buddies cost experienced staff time, and the four-month ramp-up may not be about learning at all. If starters wait on system access, case allocation or sign-off rules, a buddy and a ladder change nothing, and your best people lose output for eight weeks." This attacks two assumptions: that the delay comes from how starters learn and get support (high dependence, untested), and that buddies have the time (the riskiest assumption of option B).

**What survives and what I changed**

- The direction survives, narrowed. It starts as a pilot with a small group of starters, not the whole year's intake.
- Before the pilot, run the cheap test on the cause: ask 5 recent starters and 2 managers what held them back most in weeks 1 to 8. If most name access, allocation or approvals, fix those first and pause the buddy pilot.
- The pilot also tracks buddy case output, so the cost is measured, not assumed.
- The pilot records the date each starter first handles a case alone, which also tests the four-month estimate.

**Hypotheses** (thresholds set now, before any result; you can change them now, never after the test)

| # | We believe... | Measure | Success threshold | Time frame or sample | Status |
|---|---|---|---|---|---|
| H1 | a buddy, a case ladder and a first-month checklist for new operations starters will cut the time to handle cases alone | Weeks from start date to first case handled alone, with no review | Median of 10 weeks or fewer (against the managers' estimate of about 16 weeks) | The next 6 starters, followed for 16 weeks | untested |
| H2 | the checklist and "who to ask" map will cut feeling lost in month one | Starters who answer "I knew what to do next and who to ask" as agree or strongly agree at the end of week 4 | 5 of 6 or more | The same 6 starters, week 4 | untested |
| H3 | buddies can support a starter without a large drop in their own output | Buddy cases closed per week, against their own average for the 8 weeks before | A drop of no more than 15% | The buddies for the same 6 starters, weeks 1 to 8 | untested |

The 10-week and 15% figures are my proposals, not numbers from your data. If you want different thresholds, say so now.

**Next test**

- Type: pilot.
- What: the next 6 operations starters get a buddy, the case ladder and the first-month checklist. Record each starter's date of first case handled alone, a week-4 check-in question, and buddy output. This tests H1 first, with H2 and H3 alongside. The cause check with 5 recent starters and 2 managers runs in the week before the pilot starts.
- It could show H1 is wrong: if the median time to handle cases alone stays above 10 weeks, the buddy and ladder did not shorten the ramp-up enough.

Who will run this test, and by when?

**USER:** I don't know yet.


**ASSISTANT:**

That is fine. I have left the owner and date as "[to confirm]" below, so you can fill them in once you know. Here is the full take-away.

### Problem statement (agreed with the user)

- Who: new starters in the operations team, about 40 a year, and the managers who support them.
- Need: new starters need to handle cases on their own sooner, and to know where to turn in their first month instead of feeling lost.
- Evidence: about 40 people join the operations team each year (evidence); managers estimate about four months before a new starter handles cases alone (user said: a manager estimate, not a measured figure); exit interviews mention feeling lost in the first month (evidence); current onboarding is a 30-page induction document and a two-day classroom session (evidence); the target time to handle cases alone (to check).
- Why now: with about 40 starters a year, each month of slow ramp-up adds up to reduced output and manager time, and feeling lost is showing up in exit interviews. Whether early leavers are a measurable cost is to check.
- Out of scope: hiring and selection, onboarding for teams outside operations, and the performance of experienced staff.
- Constraints: none.
- How might we help new operations starters handle cases on their own sooner, and feel less lost in their first month?

### Options considered

| # | Option | How it answers the question | Riskiest assumption | Effort |
|---|---|---|---|---|
| O1 | Onboarding app with videos and a chatbot (your parked idea) | Starters find answers and see how tasks are done at any time, without waiting for a manager | The delay comes from missing information, not from lack of practice, system access or sign-off rules | high |
| O2 | Buddy plus a first-month case ladder | A named buddy for eight weeks and a set sequence of cases from shadowing to handling alone | Experienced staff have time to be buddies without their own output falling | medium |
| O3 | First-month checklist and a "who to ask" map | A one-page week-by-week plan given on day one and checked weekly, aimed at feeling lost | Feeling lost comes from not knowing what to do next or who to ask, and fixing it also shortens the ramp-up | low |
| O4 | Cut the induction back and move starters onto real cases sooner (smallest option) | Keep the few pages starters use and start reviewed real cases from week one | Starters learn faster from reviewed real cases than from the document, without more errors | low |

Recommended: O2 with O3 folded in, because it targets both halves of the question at medium effort and tests the cause of the delay before spending on an app. The user chose: my recommendation.

### Chosen direction

A named buddy and a case ladder for the first eight weeks, plus a one-page first-month checklist and "who to ask" map given on day one, chosen to test.

- Strongest case against: buddies cost experienced staff time, and if starters are held back by system access, case allocation or sign-off rules, a buddy and a ladder change nothing while your best people lose output. This attacks A2 (the cause of the delay) and A6 (buddies have the time).
- What survived: the direction holds, narrowed to a pilot with a small group rather than the whole year's intake. The cause check with recent starters and managers runs first; if most name access, allocation or approvals, fix those first and pause the pilot. The pilot also measures buddy output and each starter's date of first case handled alone.

### Assumptions

| # | Assumption | Dependence | Status | Cheap test |
|---|---|---|---|---|
| A1 | Four months is the real typical time, not a manager's impression | high | untested | Pull the date each of the last 10 starters first closed a case alone; most doing it in well under three months counts against |
| A2 | The delay comes from how starters learn and get support, not from system access, case allocation or sign-off rules | high | untested | Ask 5 recent starters and 2 managers what held them back most in weeks 1 to 8; most naming access, allocation or approvals counts against |
| A3 | Feeling lost in month one is linked to the slow ramp-up and to people leaving | medium | untested | Check how many exit interviews that mention feeling lost came from people who left in their first year; few counts against |
| A4 | A shorter ramp-up is worth the effort now, compared with other priorities | medium | untested | Ask the operations manager to estimate the cost of one extra month per starter; a low estimate counts against |
| A5 | The organisation can change onboarding for this team without wider approval | low | untested | Ask who owns the induction document and classroom session, and whether they can change them; needing sign-off from outside the team counts against |
| A6 | Experienced staff have time to be buddies without a large drop in their own output | high | untested | Ask 3 likely buddies to estimate the hours a week they could give for eight weeks; fewer than 2 hours each counts against |

### Hypotheses (thresholds set before the test; do not change them after the results)

| # | We believe... | Measure | Success threshold | Time frame or sample | Status |
|---|---|---|---|---|---|
| H1 | a buddy, a case ladder and a first-month checklist for new operations starters will cut the time to handle cases alone | Weeks from start date to first case handled alone, with no review | Median of 10 weeks or fewer | The next 6 starters, followed for 16 weeks | untested |
| H2 | the checklist and "who to ask" map for new operations starters will cut feeling lost in month one | Starters who agree or strongly agree with "I knew what to do next and who to ask" at the end of week 4 | 5 of 6 or more | The same 6 starters, week 4 | untested |
| H3 | buddies for new operations starters can give support without a large drop in their own output | Buddy cases closed per week, against their own average for the 8 weeks before | A drop of no more than 15% | The buddies for the same 6 starters, weeks 1 to 8 | untested |

The 10-week and 15% thresholds are my proposals, not figures from your data. You can change them before the pilot starts, never after.

### Next test

- Type: pilot
- What: the next 6 operations starters get a buddy, the case ladder and the first-month checklist. Record each starter's date of first case handled alone, the week-4 question and buddy output. It tests H1 first, with H2 and H3 alongside. The cause check (A2) runs in the week before the pilot starts.
- Owner: [to confirm]
- Date: [to confirm]

Method: the Double Diamond, from the Design Council (S1).

## Next

1. **Book the pilot.** Owner: you. First action this week: decide who will run the pilot and which start date the next operations intake falls on, then replace both "[to confirm]" entries. Result: a named owner and a date written on the plan, with the three thresholds next to them where the team can see them.
2. **Lock the thresholds with someone.** Owner: you. First action this week: show H1 to H3 and their thresholds to one person who will hold you to them, such as the operations manager. Result: a note that they agreed the thresholds as written, dated before the pilot starts.
3. **Run the cause check.** Owner: you. First action this week: ask 5 recent starters and 2 managers what held them back most in weeks 1 to 8 (A2, the highest-dependence assumption that is not supported). Result: a tally of the answers, and a decision to run the pilot as planned or fix access, allocation or approvals first.

To check the assumptions or the case against in more depth, you may also like a skill for finding blind spots or a skill for checking claims and provenance, if you have one.


## Grading

- P1: pass. Turns 1 to 3 list the app only under "Parked ideas"; options appear only after "Yes, that is the problem."
- P2: pass. The skip reply says "I will hold the ideas for one more step", shows the problem statement again and asks "Is this the problem, or what would you change?", with no solution.
- P3: pass. Turn 2 has a five-row assumptions check before the Define question.
- P4: pass. Take-away has problem statement, options considered, chosen direction, assumptions table, hypotheses with thresholds, and next test with owner and date.
- P5: pass. "Owner: [to confirm]" and "Date: [to confirm]".
- Strict check: pass. Thresholds (10 weeks, 15%) are labelled "my proposals, not figures from your data"; "about 16 weeks" restates the managers' four-month estimate; "such as the operations manager" is a labelled example.
