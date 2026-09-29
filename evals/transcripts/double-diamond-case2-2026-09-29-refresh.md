# double-diamond case 2 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 1.

**USER:** Visits to our local library branch dropped about 30% in two years. The council wants a plan. Where do we start?


**ASSISTANT:**

We start by being clear about the problem before anyone proposes a fix. That is step 1, Discover.

**The challenge, as I understand it:** visits to your local library branch have fallen by about 30% over two years. The council wants a plan to respond. Before we plan anything, we need to know who stopped coming, and why.

**What we know so far:**

| Item | Label |
|---|---|
| Visits fell by about 30% over two years | evidence (a figure you gave; source and exact count to check) |
| The council wants a plan | user said |
| How "visits" are counted (door counter, loans, events, logins) | to check |
| Which groups of users visit less, and which visit the same or more | to check |
| Whether use moved to another channel (e-books, online services, another branch) | to check |
| What has changed at the branch or nearby in the two years (hours, staff, programmes, transport, population) | to check |
| What has been tried already | to check |

**The biggest gap:** we do not know who the drop comes from. A 30% fall could be one group that stopped coming, or everyone coming a little less, or people who now use the library online instead of in person. Each of those is a different problem.

Who has visited less over these two years, and is there any group that visits the same or more?

**USER:** Visits fell from about 5,000 to 3,500 a month. Opening hours were cut from six days to five in the same period. Loans of e-books went up. Families with young children used to be the main visitors on Saturdays, and the branch now closes on Saturdays.

**ASSISTANT:**

Thank you. That moves us a long way, so we can go to step 2, Define. I will write the problem statement for you to check before we talk about any fix.

**What we know now:**

| Item | Label |
|---|---|
| Visits fell from about 5,000 to 3,500 a month (a 30% drop, about 1,500 visits a month) | evidence (figures you gave) |
| Opening days were cut from six to five in the same period, and Saturday is the day that closed | evidence (a change you reported) |
| E-book loans went up | evidence (you reported the rise; the size is to check) |
| Families with young children were the main Saturday visitors | user said (how this is known is to check) |
| How many of the lost visits were Saturday visits | to check |
| Whether those families now come on weekdays, use e-books, go to another branch, or have stopped | to check |

**Problem statement (draft):**

- **Who:** families with young children who used the branch mainly on Saturdays, plus any other regular users who now visit less.
- **Need:** a way to use the library that fits the times they are free. Since Saturday closed, many of them appear to have no time they can come.
- **Evidence:** monthly visits fell from about 5,000 to 3,500 over two years (evidence). Saturday opening stopped in the same period (evidence). Families were the main Saturday users (user said). E-book loans rose (evidence), which may mean some use moved online rather than stopped.
- **Why now:** the council wants a plan, and the longer families go without a time they can visit, the harder the habit may be to win back.
- **Out of scope:** the reasons for the cut in opening hours and the budget behind it; other branches; the design of the e-book service.
- **How might we:** How might we give families with young children a time and a way to use the library that fits their week?

**Assumptions this statement relies on:**

| Assumption | Dependence | Status | Cheap test |
|---|---|---|---|
| Most of the lost 1,500 monthly visits were Saturday visits by families | High | untested | Compare the door count by day of week for a month before and a month after the Saturday closure. It counts against this if less than half the drop is from Saturday. |
| The families stopped because of the closure, not for another reason (children older, moved away, other options nearby) | High | untested | Ask 10 to 15 families at a weekday session or through the branch mailing list why they come less. It counts against this if fewer than half name the Saturday closure. |
| The rise in e-book loans is not the same people replacing visits (so the drop is a real loss of use, not only a shift) | Medium | untested | Check whether the e-book rise is in children's titles and in accounts that used to borrow in person. It counts against this if most new e-book loans are children's titles from those accounts. |
| The count of "visits" was measured the same way over both years | Medium | untested | Ask staff whether the counter, its position or the counting method changed. It counts against this if any change happened in the period. |
| The council can change how the branch serves families within its current budget | Low | unresolved | No test possible yet: a statement from the council of what it can and cannot change would make one possible. |

The statement is only a draft. Its biggest weak point is the first two assumptions: we have not yet seen that the drop is mostly Saturday families, or that the closure is why they left.

Is this the problem, or what would you change?

**USER:** Yes, that is the problem.


**ASSISTANT:**

Thank you. The problem statement is agreed with you, so we can go to step 3, Develop. Your agreement fixes the problem we are solving. It does not make the assumptions true, so the first two (that the drop is mostly Saturday families, and that the closure is why they left) are still untested.

**How might we:** How might we give families with young children a time and a way to use the library that fits their week?

You did not bring any ideas of your own, so there are no parked ideas to add. Here are five options, from the smallest to the largest.

| Option | How it answers the question | Riskiest assumption | Effort |
|---|---|---|---|
| **A. Swap the closed day (smallest option).** Keep five days, but close the quietest weekday instead of Saturday. | Gives families their Saturday back, with no extra opening hours. | Is it worth it: that families come back on Saturday, and that fewer people lose out on the new closed day than gain on Saturday. | Low |
| **B. A regular Saturday family session.** Open for a short fixed block (for example two or three hours) one or two Saturdays a month, built around a story time or play session. | Gives families a known weekend time, at part of the cost of a full day. | Do they want it: that a part-time Saturday is enough to bring the habit back. | Medium |
| **C. Late weekday opening for families.** Stay open later on one weekday, with a session aimed at children after school or care. | Gives families a time outside work and school hours without reopening Saturday. | Do they want it: that families with young children can come on a weekday evening. | Medium |
| **D. Take the library to where families are on weekends.** A pop-up at a Saturday market, playgroup or sports ground, plus a hold-and-collect point families can use when the branch is closed. | Gives families a way to borrow and join in on a Saturday without the branch being open. | Can we build it: that the branch has the staff and a partner site to run it. | Medium to high |
| **E. Point families to the digital library.** Promote children's e-books and online story times through schools, childcare centres and the branch mailing list. | Gives families a way to use the library at any time, from home. | Is it worth it: that online use meets the need the Saturday visits met (the council may still count it as a loss of visits). | Low |

**My recommendation: A, swap the closed day.** It stays inside the current five days and so inside the current budget, and it is also the most direct test of the two high-dependence assumptions: if families do not come back when Saturday reopens, the closure was not the main cause.

Which direction do you want to take forward?

**USER:** Go with your recommendation.


**ASSISTANT:**

Thank you. The direction we take to test is **A, swap the closed day**: keep five days, but close the quietest weekday instead of Saturday. It is "chosen to test", not proven. This is step 4, Deliver.

**The strongest case against it**

A fair sceptic would say: "Families have had Saturdays closed for some time, and some have moved to e-books, another branch or other weekend habits. Opening on Saturday again will not bring them back quickly, and the people who use the closed weekday (for example older residents or groups that come on that day) lose their day for a small gain." This attacks the first two assumptions: that most of the lost visits were Saturday families, and that the closure is why they left. It also raises a cost question: Saturday staffing may cost more than weekday staffing (RECALLED, general knowledge about weekend pay rates; to check with the council for this branch).

**What survives, and what I changed**

The direction survives, but in a narrower form:

- It becomes a **time-limited trial of 8 weeks**, announced as a trial, not a permanent change. That makes it easy to reverse if families do not come back.
- The weekday to close is chosen from the **door count by day of week** for the last three months, not by feel. The same data also tests the first assumption before the trial starts.
- The users of the closed weekday are told in advance where and when else they can use the library.
- Before the trial starts, the Saturday staffing cost is checked with the council, so the trial does not fail on budget half-way through.

**Hypotheses** (status: untested)

The thresholds below are my draft, written now before any result exists. You can change them now, but not after the trial starts.

| # | Hypothesis | Measure | Success threshold | Time frame |
|---|---|---|---|---|
| H1 | We believe opening on Saturday instead of the quietest weekday will bring back visits to the branch. | Total monthly visits (same counter, same method as the last two years) | At least 4,000 in the second month of the trial (about a third of the lost 1,500 a month back) | 8 weeks |
| H2 | We believe the swap gains more visits on Saturday than it loses on the closed weekday. | Average Saturday visits in the trial compared with average visits on the chosen weekday in the three months before | Saturday visits at least 1.5 times the old weekday visits | 8 weeks (8 Saturdays) |
| H3 | We believe the Saturday return is mainly families with young children. | Share of Saturday visitors who are adults with young children, from a staff head count at three fixed times each Saturday | At least half | 4 Saturdays within the trial |

**The next test**

An **experiment**: one change (swap the closed day), one main measure (monthly visits), a short run (8 weeks) at this one branch. Before it starts, pull the door count by day of week for the three months before, to set the baseline and pick the weekday to close. If H1 fails, that is a strong sign the Saturday closure was not the main cause of the drop, and the problem statement needs another look.

Who will run this test, and by when?

**USER:** The branch manager will run it, starting 3 November.


**ASSISTANT:**

Thank you. The branch manager runs the trial, starting 3 November. This is step 5, Hand over. Here is the full take-away.

I had no web access, so facts from memory are labelled RECALLED.

### Problem statement (agreed with the user)

- Who: families with young children who used the branch mainly on Saturdays, plus any other regular users who now visit less.
- Need: a way to use the library that fits the times they are free. Since Saturday closed, many of them appear to have no time they can come.
- Evidence: monthly visits fell from about 5,000 to 3,500 over two years (evidence); opening days were cut from six to five, and Saturday is the day that closed (evidence); families with young children were the main Saturday visitors (user said); e-book loans went up (evidence; the size is to check); how many of the lost visits were Saturday visits (to check).
- Why now: the council wants a plan, and the longer families go without a time they can visit, the harder the habit may be to win back.
- Out of scope: the reasons for the cut in opening hours and the budget behind it; other branches; the design of the e-book service.
- Constraints: none.
- How might we give families with young children a time and a way to use the library that fits their week?

### Options considered

| # | Option | How it answers the question | Riskiest assumption | Effort |
|---|---|---|---|---|
| O1 | Swap the closed day (smallest option): keep five days, but close the quietest weekday instead of Saturday | Gives families their Saturday back, with no extra opening hours | Is it worth it: families come back on Saturday, and fewer people lose out on the new closed day than gain on Saturday | low |
| O2 | A regular Saturday family session: a short fixed block one or two Saturdays a month, built around story time or play | Gives families a known weekend time, at part of the cost of a full day | Do they want it: a part-time Saturday is enough to bring the habit back | medium |
| O3 | Late weekday opening for families: open later on one weekday, with a session for children after school or care | Gives families a time outside work and school hours without reopening Saturday | Do they want it: families with young children can come on a weekday evening | medium |
| O4 | Take the library to where families are on weekends: a pop-up at a market, playgroup or sports ground, plus a hold-and-collect point | Gives families a way to borrow and join in on a Saturday without the branch being open | Can we build it: the branch has the staff and a partner site to run it | medium to high |
| O5 | Point families to the digital library through schools, childcare centres and the mailing list | Gives families a way to use the library at any time, from home | Is it worth it: online use meets the need the Saturday visits met | low |

Recommended: O1, because it stays inside the current five days and budget, and it is the most direct test of the two high-dependence assumptions. The user chose: my recommendation.

### Chosen direction

Swap the closed day (O1), chosen to test, as an 8-week trial.

- Strongest case against: families have had Saturdays closed for some time and some have moved to e-books, another branch or other weekend habits, so reopening Saturday will not bring them back quickly, while the users of the closed weekday lose their day for a small gain. This attacks A1 and A2. It also raises cost: Saturday staffing may cost more than weekday staffing (RECALLED, general knowledge about weekend pay rates; to check with the council for this branch).
- What survived: the direction, in a narrower form. It is a time-limited 8-week trial, announced as a trial and easy to reverse. The weekday to close is chosen from the door count by day of week for the last three months. Users of that weekday are told in advance where and when else they can use the library. The Saturday staffing cost is checked with the council before the start.

### Assumptions

| # | Assumption | Dependence | Status | Cheap test |
|---|---|---|---|---|
| A1 | Most of the lost 1,500 monthly visits were Saturday visits by families | high | untested | Compare the door count by day of week for a month before and a month after the Saturday closure; less than half the drop coming from Saturday counts against it |
| A2 | The families stopped because of the closure, not for another reason (children older, moved away, other options nearby) | high | untested | Ask 10 to 15 families at a weekday session or through the mailing list why they come less; fewer than half naming the Saturday closure counts against it |
| A3 | The rise in e-book loans is not the same people replacing visits | medium | untested | Check whether the e-book rise is in children's titles from accounts that used to borrow in person; most new e-book loans coming from those accounts counts against it |
| A4 | Visits were counted the same way over both years | medium | untested | Ask staff whether the counter, its position or the counting method changed; any change in the period counts against it |
| A5 | The council can change how the branch serves families within its current budget | low | unresolved | No test possible yet: a statement from the council of what it can and cannot change would make one possible |

### Hypotheses (thresholds set before the test; do not change them after the results)

| # | We believe... | Measure | Success threshold | Time frame or sample | Status |
|---|---|---|---|---|---|
| H1 | opening on Saturday instead of the quietest weekday, for the branch's users, will bring back visits | Total monthly visits (same counter, same method as the last two years) | At least 4,000 in the second month of the trial | 8 weeks | untested |
| H2 | the swap, for the branch's users, will gain more visits on Saturday than it loses on the closed weekday | Average Saturday visits in the trial against average visits on the chosen weekday in the three months before | Saturday visits at least 1.5 times the old weekday visits | 8 weeks (8 Saturdays) | untested |
| H3 | reopening Saturday, for families with young children, will bring them back as the main Saturday visitors | Share of Saturday visitors who are adults with young children, from a staff head count at three fixed times each Saturday | At least half | 4 Saturdays within the trial | untested |

### Next test

- Type: experiment
- What: close the quietest weekday instead of Saturday for 8 weeks at this one branch, and measure monthly visits against the baseline (tests H1, with H2 and H3 measured in the same run). Before the start, pull the door count by day of week for the last three months to set the baseline and pick the weekday. If H1 fails, the Saturday closure was probably not the main cause, and the problem statement needs another look.
- Owner: the branch manager
- Date: starting 3 November

Method: the Double Diamond, from the Design Council (S1).

### Next

1. Book the test. Owner: the branch manager. First action this week: pull the door count by day of week for the last three months, pick the weekday to close, and write the three thresholds where the team can see them. Observable result: a baseline sheet and the chosen weekday, on file before 3 November.
2. Get the thresholds held. Owner: the branch manager. First action this week: show H1 to H3 and their thresholds to one person at the council who will hold the branch to them. Observable result: a written note that this person agreed the thresholds as written.
3. Test the highest-dependence assumption. Owner: the branch manager. First action this week: run the A1 check (door count by day of week, a month before and a month after the Saturday closure). Observable result: the share of the lost visits that came from Saturday, recorded before the trial starts.

One point to check: 8 weeks from 3 November ends about 29 December, which runs into the summer school holidays. Family visiting patterns may change in that period, so it is worth deciding now whether the trial dates stay as they are.

To check the assumptions or the case against in more depth, you may also like a skill for finding blind spots or a skill for checking claims and provenance, if you have one.


## Grading

- P1: pass. First reply asks "Who has visited less..." and proposes nothing.
- P2: pass. "The strongest case against it" comes before the hypotheses, followed by "What survives, and what I changed".
- P3: pass. H1 to H3 each have a measure, a numeric threshold and a time frame; heading "thresholds set before the test; do not change them after the results".
- P4: pass. "Owner: the branch manager", "Date: starting 3 November", "Type: experiment".
- P5: pass. "Method: the Double Diamond, from the Design Council (S1)."
- Strict check: FAIL. The closing note says the trial "runs into the summer school holidays", which assumes a country and season the user never gave, unlabelled. Skill fault; fixed in double-diamond SKILL.md (never assume country, season, holidays or local rules; mark [to confirm]) and re-run as -r2.
