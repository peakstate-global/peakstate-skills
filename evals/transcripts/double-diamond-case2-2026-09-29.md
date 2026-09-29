# double-diamond eval, case 2: a clear run through to a test

Skill commit: 1834a1d. Eval version 1. Runner: one fresh subagent per assistant turn, reading only the skill folder and this transcript.

## User (turn 1)

Visits to our local library branch dropped about 30% in two years. The council wants a plan. Where do we start?

## Assistant (turn 1)

We start in Discover, by finding out what is behind the drop before anyone plans a fix.

Here is the challenge as I understand it. Visits to your local library branch have fallen by about 30% over two years. The council wants a plan to respond.

What we know so far:

- Visits to the branch fell about 30% over two years. (evidence)
- The council wants a plan. (user said)
- How "visits" are counted, for example door counts, loans or program attendance. (to check)
- Which groups of people visit less, and which still come. (to check)
- Whether other branches or nearby councils saw the same drop. (to check)
- What has changed at the branch or around it in those two years, such as hours, services, staffing or transport. (to check)
- What has been tried already. (to check)

The biggest gap is who stopped coming. A 30% drop can come from one group leaving almost completely or from everyone coming a little less, and those are different problems.

Who has stopped visiting the branch, or visits less often, and which groups still come as much as before?

## User (turn 2)

Visits fell from about 5,000 to 3,500 a month. Opening hours were cut from six days to five in the same period. Loans of e-books went up. Families with young children used to be the main visitors on Saturdays, and the branch now closes on Saturdays.

## Assistant (turn 2)

That gives us enough to write the problem statement. We are now in Define, and no fixes come in until you agree the problem.

**Problem statement**

- **Who:** families with young children who used to visit the branch, mostly on Saturdays. Other groups may also visit less, and that is [to check].
- **Need:** a time and a way to use the branch that fits their week. Since the branch now closes on Saturdays, they may no longer have one.
- **Evidence:**
  - Monthly visits fell from about 5,000 to about 3,500, a drop of about 1,500 a month. (evidence)
  - Opening days went from six to five in the same period, and the branch now closes on Saturdays. (evidence)
  - E-book loans went up. (evidence)
  - Families with young children were the main Saturday visitors. (user said)
- **Why now:** the council wants a plan. The cost of leaving it, for example to the branch's budget or its future, is [to check].
- **Out of scope:** the growth in e-book loans (we treat it as a fact, not as the problem), other branches, and the library service's total budget.

**How might we** help families with young children get back the time with the branch that they lost?

**Assumptions check.** The statement relies on these things, and it does not yet show them.

| Assumption | Dependence | Status | Cheap test |
|---|---|---|---|
| Most of the drop of about 1,500 visits a month is the lost Saturday visitors. | High | Untested | Pull daily visit counts from before the change. If Saturdays averaged well under 1,500 visits a month, the Saturday closure cannot explain most of the drop. |
| Families with young children still want to visit in person. | High | Untested | Ask 10 parents at a local playgroup or child care centre whether they would visit, and when. If most say they have moved to other options by choice, the need is weaker than stated. |
| The families have not simply moved to another branch or to e-books. | Medium | Untested | Check whether junior or family card holders from this branch now borrow at other branches. If most do, they still use the library, only somewhere else. |
| Visits were counted the same way across the two years. | Medium | Untested | Ask branch staff whether the door counter or the counting method changed. If it did, part of the drop may not be real. |
| The council is able and willing to act on how the branch serves families. | Medium | Untested | Ask the council officer who wants the plan what can change and what is fixed. If nothing about the branch can change, the problem needs a different scope. |

If you agree the statement, that does not make these assumptions true. We keep them open until the tests say otherwise.

Is this the problem, or what would you change?

## User (turn 3)

Yes, that is the problem.

## Assistant (turn 3)

The problem statement is agreed, so we move to Develop and look at options.

**Problem statement (agreed with the user).** Families with young children who used to visit the branch, mostly on Saturdays, may no longer have a time to use it that fits their week. Monthly visits fell from about 5,000 to about 3,500 while opening days went from six to five and Saturdays closed.

**How might we** help families with young children get back the time with the branch that they lost?

You brought no solution ideas earlier, so there are no parked ideas to bring back. Here are four options.

| Option | How it answers the "How might we" question | Riskiest assumption | Effort |
|---|---|---|---|
| a) Swap the closed day (smallest option). Keep five days, but close on the quietest weekday instead of Saturday. | Families get their Saturday back with no extra opening hours. | Most of the lost visits are Saturday visits, and the weekday that closes loses fewer visits than Saturday brings back. (Worth it?) | Low to medium. It needs a roster and staff agreement change, but no new budget. |
| b) A short Saturday family session. Open for three hours on Saturday mornings with a story time or play session. | Families get a set weekly time built around them. | Families will come back for a short, set session rather than a full day. (Do they want it?) | Medium. It adds hours and needs staff to run the session. |
| c) One late weekday opening for families. Open until 7 pm on one weekday, with an after-school or early-evening family session. | Families who work or have school runs get a weekday time that fits. | Families with young children can and will visit on a weeknight. (Do they want it?) | Medium. It adds hours on one day. |
| d) A pop-up library where families already go on Saturdays. Take a small collection and a story time to a market, playgroup or sports ground once or twice a month. | The branch meets families in their Saturday routine, even while the building is closed. | A pop-up brings families back to the library, not only to one event. (Is it worth it?) | Medium to high. It needs transport, a collection, staff and a venue. |

**My recommendation is option a), swap the closed day**, because it costs no extra hours and it tests the high-dependence assumption directly: if Saturday visits do not come back, the Saturday closure is not the main cause.

Which direction do you want to take forward?

## User (turn 4)

Go with your recommendation.

## Assistant (turn 4)

We take option a), swap the closed day, as the direction chosen to test, and we move to Deliver.

**Chosen direction (chosen to test).** Keep five opening days, and close on the quietest weekday instead of Saturday.

**The strongest case against.** A sceptic would say this: the families who lost their Saturday two years ago have built new routines, such as e-books, another branch or weekend sport, so reopening on Saturday will not bring many of them back. Meanwhile the weekday that closes has its own regular visitors, for example older residents or carers with toddlers, and the branch loses them instead. The net result could be fewer visits, with a different group of people left out. This attacks the high-dependence assumption that most of the drop of about 1,500 visits a month is lost Saturday visitors who would return.

**What survives, and what I changed.** The direction survives in part. It costs no extra hours and the council can reverse it, so it is still the cheapest way to test the Saturday assumption. I changed three things:

- Pick the weekday from the data. Before the swap, pull daily visit counts for the last three months and close the day with the lowest average.
- Run it as a time-limited pilot of 8 weeks, with a stop rule, and do not present it as a permanent change.
- Measure the net change in visits and the visits lost on the closed weekday, and not only the Saturday count.

**Hypotheses.** All three are untested. I set these thresholds now, before any result exists. You may change them now, but not after the pilot starts.

| # | Hypothesis | Measure | Success threshold | Time frame | Status |
|---|---|---|---|---|---|
| H1 | We believe opening on Saturday instead of the quietest weekday will bring back visits, for families with young children in particular. | Total monthly visits at the branch | At least 4,000 visits a month on average, up from about 3,500 (a recovery of at least one third of the drop of about 1,500) | The 8 weeks of the pilot | Untested |
| H2 | We believe Saturday opening will draw more visits than the closed weekday used to draw. | Average visits per Saturday, compared with the average visits on the closed weekday in the three months before the pilot | Saturday average is at least 1.5 times the old weekday average | The 8 Saturdays of the pilot | Untested |
| H3 | We believe the people who come back on Saturdays are mainly families with young children. | Share of Saturday visitors who are families with young children, by a staff head count at the door or by junior card use | At least 40% of Saturday visitors | 4 Saturdays during the pilot | Untested |

**Stop rule.** If H1 and H2 both fail at the end of the 8 weeks, return to the old roster and go back to the problem statement. That result would count against the assumption that the Saturday closure explains most of the drop.

**The next test.** A pilot at this branch for 8 weeks:

- Before the pilot, pull the daily visit counts and choose the closed weekday. Tell regular visitors on that weekday at least two weeks ahead.
- During the pilot, open on Saturday, close on the chosen weekday, and record daily visits the same way as before. Run the door head count on 4 Saturdays.
- At the end, compare the results with the three thresholds above, as written.

H1 is the top hypothesis, and this pilot is the smallest test that could show it is wrong, because the net monthly count shows whether Saturday opening brings back more visits than the closed weekday loses.

Who will run this test, and by when?

## User (turn 5)

The branch manager will run it, starting 3 November.

## Assistant (turn 5)

The pilot has an owner and a start date, so here is the take-away for the branch Saturday pilot.

I had no web access, so facts from memory are labelled RECALLED. This take-away uses none.

### Problem statement (agreed with the user)

- Who: families with young children who used to visit the branch, mostly on Saturdays. Other groups may also visit less (to check).
- Need: a time and a way to use the branch that fits their week, now that the branch closes on Saturdays.
- Evidence: monthly visits fell from about 5,000 to about 3,500, a drop of about 1,500 a month (evidence); opening days went from six to five and the branch now closes on Saturdays (evidence); e-book loans went up (evidence); families with young children were the main Saturday visitors (user said).
- Why now: the council wants a plan (user said). The cost of leaving it is to check.
- Out of scope: the growth in e-book loans, other branches, and the library service's total budget.
- Constraints: none.
- How might we help families with young children get back the time with the branch that they lost?

### Options considered

| # | Option | How it answers the question | Riskiest assumption | Effort |
|---|---|---|---|---|
| O1 | Swap the closed day: keep five days, close on the quietest weekday instead of Saturday (smallest option) | Families get their Saturday back with no extra opening hours | Most lost visits are Saturday visits, and the closed weekday loses fewer visits than Saturday brings back | low to medium |
| O2 | A short Saturday family session: three hours on Saturday mornings with a story time or play session | Families get a set weekly time built around them | Families will come back for a short, set session | medium |
| O3 | One late weekday opening until 7 pm with a family session | Families with work or school runs get a weekday time that fits | Families with young children can and will visit on a weeknight | medium |
| O4 | A pop-up library at a market, playgroup or sports ground once or twice a month | The branch meets families in their Saturday routine | A pop-up brings families back to the library, not only to one event | medium to high |

Recommended: O1, because it adds no hours and tests the high-dependence Saturday assumption directly. The user chose: my recommendation.

### Chosen direction

Swap the closed day: open on Saturday and close on the quietest weekday, chosen to test as an 8-week pilot.

- Strongest case against: families have built new routines (e-books, another branch, weekend sport) and will not come back, while the regular visitors of the closed weekday are lost, so net visits could fall. This attacks A1, that most of the drop is lost Saturday visitors who would return.
- What survived: the direction stays because it adds no hours and the council can reverse it. Three changes: choose the weekday from the last three months of daily visit counts; run it as an 8-week pilot with a stop rule; measure net visits and the visits lost on the closed weekday, not only Saturdays.

### Assumptions

| # | Assumption | Dependence | Status | Cheap test |
|---|---|---|---|---|
| A1 | Most of the drop of about 1,500 visits a month is the lost Saturday visitors. | high | untested | Pull daily visit counts from before the change. If Saturdays averaged well under 1,500 visits a month, the closure cannot explain most of the drop. |
| A2 | Families with young children still want to visit in person. | high | untested | Ask 10 parents at a local playgroup or child care centre whether they would visit, and when. If most have moved to other options by choice, the need is weaker than stated. |
| A3 | The families have not simply moved to another branch or to e-books. | medium | untested | Check whether junior or family card holders from this branch now borrow at other branches. If most do, they still use the library, only somewhere else. |
| A4 | Visits were counted the same way across the two years. | medium | untested | Ask branch staff whether the door counter or counting method changed. If it did, part of the drop may not be real. |
| A5 | The council is able and willing to change how the branch serves families. | medium | untested | Ask the council officer who wants the plan what can change and what is fixed. If the roster cannot change, the pilot cannot run. |
| A6 | The regular visitors of the closed weekday will mostly shift to other days, not stop coming. | medium | untested | Ask regulars on the chosen weekday, when you give them notice, whether they could come on another day. If most say no, the net gain will be small. |

### Hypotheses (thresholds set before the test; do not change them after the results)

| # | We believe... | Measure | Success threshold | Time frame or sample | Status |
|---|---|---|---|---|---|
| H1 | opening on Saturday instead of the quietest weekday, for families with young children, will bring back visits | Total monthly visits at the branch | At least 4,000 a month on average, up from about 3,500 | The 8 weeks of the pilot | untested |
| H2 | Saturday opening will draw more visits than the closed weekday used to draw | Average visits per Saturday, against the closed weekday's average in the three months before the pilot | At least 1.5 times the old weekday average | The 8 Saturdays of the pilot | untested |
| H3 | the people who come back on Saturdays are mainly families with young children | Share of Saturday visitors who are families with young children, by staff head count or junior card use | At least 40% | 4 Saturdays during the pilot | untested |

Stop rule: if H1 and H2 both fail at the end of the 8 weeks, go back to the old roster and back to the problem statement.

### Next test

- Type: pilot
- What: for 8 weeks, open on Saturday and close on the weekday with the lowest average visits over the last three months, counting daily visits the same way as before and running the door head count on 4 Saturdays. It tests H1 first, then H2 and H3.
- Owner: the branch manager
- Date: starting 3 November

Method: the Double Diamond, from the Design Council (S1).

## Next

1. The branch manager pulls the last three months of daily visit counts this week, picks the closed weekday, and writes the three thresholds where the branch team can see them. The result: a named weekday and the thresholds on display before 3 November.
2. You show the hypotheses, thresholds and stop rule to the council officer who wants the plan, before 3 November. The result: a record that the officer agreed the thresholds as written.
3. The branch manager runs the cheap test for A1 this week: pull the daily counts from before the Saturday closure and add up the Saturday visits. The result: a monthly Saturday figure to set beside the drop of about 1,500. If it is well under 1,500, raise it before the pilot starts.

To check the assumptions or the case against in more depth, you may also like a skill for finding blind spots or a skill for checking claims and provenance, if you have one.
