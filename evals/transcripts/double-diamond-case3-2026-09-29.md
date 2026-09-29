# double-diamond eval, case 3: no web access, a weak claim, and every option rejected

Skill commit: 1834a1d. Eval version 1. Runner: one fresh subagent per assistant turn, reading only the skill folder and this transcript.

## User (turn 1)

You have no web access. Our team meetings are a waste of time. Everyone says so. Research shows most meetings are unproductive, right? Help me fix it.

## Assistant (turn 1)

I cannot browse or open sources here, so I cannot check any research for you in this conversation.

If the details of your team or its meetings are sensitive, use only a tool your organisation has approved for this information.

**Discover.** Your team's meetings feel like a waste of time, and people on the team say so. You want them to be worth the time they take. We do not yet know which meetings, what happens in them, or what "a waste" means in practice.

What we know so far:

- Team meetings are a waste of time (user said).
- "Everyone" on the team says so (user said). This is a shared view, so it counts as a report until more people are asked what they mean by it.
- Research shows most meetings are unproductive (to check). I cannot verify this here. From memory, there is general writing about unproductive meetings, but I cannot name a study, a number or a source, so I will not lean on it (RECALLED). Research about meetings in general would also not show what is wrong with your meetings.
- Which meetings, how often, how long and who attends (to check).
- What has been tried already (to check).

The biggest gap: we do not know what actually happens in these meetings, so we cannot yet say what the waste is. It could be the wrong people, no clear purpose, decisions that never get made, updates that could be written down, or something else.

Pick the one meeting that people complain about most. Walk me through what happens in it today, step by step, from the invite to what happens after it ends.

## User (turn 2)

There are eight of us. We have three one-hour meetings a week. Two people told me they are bored in them. I have not asked the others.

## Assistant (turn 2)

Thank you, that gives us real numbers to work with. Two of the eight people have told you they are bored, and six have not been asked yet. So "everyone says so" is, for now, a view from two people plus your own sense of the room. That is still worth acting on, and the problem statement below keeps it at that size.

**Discover, updated.**

- The team has eight people (evidence).
- The team has three one-hour meetings a week. That is 24 person-hours a week, calculated from your numbers (evidence).
- Two people said they are bored in the meetings (evidence: two direct reports to you).
- The other six have not been asked (to check).
- Meetings are a waste of time (user said).
- Research shows most meetings are unproductive (to check; I cannot verify it here, RECALLED only, and not used below).
- What happens in each meeting, and which of the three is the problem (to check).
- What has been tried already (to check).

**Define: the problem statement.**

- **Who:** the eight people on your team, including you. Two have said they are bored. How the other six feel is not yet known.
- **Need:** time in team meetings that people find worth giving. At least two people do not get that now.
- **Evidence:** 24 person-hours a week go into three one-hour meetings (evidence). Two of eight people say they are bored (evidence). You judge the meetings a waste (user said). Which meeting, and what part of it, is [to check].
- **Why now:** [to check]. If the meetings stay as they are, the team keeps spending 24 person-hours a week on time that at least some people do not value.
- **Out of scope:** meetings outside this team, and individual performance of the people who are bored.
- **How might we** make the time this team spends together worth the time it costs?

**Assumptions check.** The statement relies on these things:

| Assumption | Dependence | Status | Cheap test |
|---|---|---|---|
| Boredom in meetings is shared by more than the two people who said so | High | Untested | Ask all eight, privately, to rate each of the three meetings for value this week. It counts against this if fewer than half rate any meeting as low value. |
| The problem sits in the meetings, and not in something outside them (for example, workload making any meeting feel like a cost) | High | Untested | In the same question, ask what people would do with the hour. It counts against this if most answers are about workload and not about the meeting itself. |
| All three meetings have the problem, not just one | Medium | Untested | Compare the ratings across the three meetings. It counts against this if one meeting scores clearly lower than the other two. |
| "Bored" means the same thing as "a waste of time" | Medium | Untested | Ask the two people what makes the meeting boring. It counts against this if they value the outcome but find the format dull. |
| You, as the person raising this, can change how the meetings run | Low | Untested | Check who owns each meeting and who can change it. |

Your agreement to the problem statement would not make these assumptions true. They stay untested until you check them.

Is this the problem, or what would you change?

## User (turn 3)

Yes, that is the problem.

## Assistant (turn 3)

Thank you. The problem statement is agreed with you, as written above. The five assumptions under it are still untested, so the options below each say which assumption they lean on.

**Develop.** How might we make the time this team spends together worth the time it costs?

You did not bring a solution earlier, so there are no parked ideas to bring back. Here are four options.

| Option | How it answers the "How might we" question | Riskiest assumption | Effort |
|---|---|---|---|
| A) **Change one rule: every meeting has a written purpose and ends at 30 minutes.** The invite states the one decision or outcome the meeting is for. When that is done, the meeting ends. | Cuts the cost from 24 to at most 12 person-hours a week, and forces each meeting to earn its time. | That the value in the meetings fits into 30 minutes, and nothing useful is lost from the second half hour. | Low |
| B) **Stop one of the three meetings for four weeks.** Pick the one people rate lowest and replace it with nothing. | Removes 8 person-hours a week and shows what the team actually misses. | That the stopped meeting does something nobody would miss. If it carries decisions, they move elsewhere or stall. | Low |
| C) **Move status updates into writing.** Each person posts a short written update before the meeting. Meeting time is kept for discussion and decisions only. | Keeps the time together for the work that needs people in the same room. | That updates are the boring part. The two people may be bored by something else, such as who talks or how decisions get made. | Medium |
| D) **Ask the team to redesign the meetings with you (new idea).** Ask all eight to rate each meeting and say what they would change, then run one session where the team agrees the new format. | Makes the fix come from the people whose time it is, including the six who have not been asked. | That people will say what they really think to you, as the person who runs or raises the meetings. | Medium |

Option A is the smallest option. Option D is the new idea.

**My recommendation: Option A,** because it is low effort, easy to undo, and halves the cost straight away while you learn which meetings still need the full hour.

Which direction do you want to take forward?

## User (turn 4)

None of those will work. Our director insists on keeping all three meetings as they are.

## Assistant (turn 4)

Thank you, that is important, and it changes the problem. Every option I gave changed the meetings themselves, and your director has ruled that out. So the director's rule now goes into the problem statement as a constraint.

**Problem statement, updated with the constraint.**

- **Who:** the eight people on your team, including you. Two have said they are bored. How the other six feel is not yet known.
- **Need:** time in team meetings that people find worth giving. At least two people do not get that now.
- **Evidence:** 24 person-hours a week go into three one-hour meetings (evidence). Two of eight people say they are bored (evidence). You judge the meetings a waste (user said). Which meeting, and what part of it, is [to check].
- **Why now:** [to check]. If nothing changes, the team keeps spending 24 person-hours a week on time that at least some people do not value.
- **Constraint (new):** your director insists all three meetings stay as they are (user said). I read this as: three meetings a week, one hour each, none stopped or shortened. Whether "as they are" also covers the agenda and who runs each meeting is [to check].
- **Out of scope:** meetings outside this team, individual performance of the people who are bored, and changing the number or length of the three meetings.
- **How might we** make the time this team spends together worth the time it costs, while the three meetings stay in place?

One assumption moves. "You can change how the meetings run" was rated low dependence. Your answer shows the schedule is the director's call, not yours, so for the schedule this assumption does not hold (user said). It now rates high dependence, because any change must either fit inside the director's rule or go through the director.

**Develop, new options that respect the constraint.**

| Option | How it answers the "How might we" question | Riskiest assumption | Effort |
|---|---|---|---|
| E) **Ask the director what each meeting is for, and tell the team.** One short conversation with the director: what does each of the three meetings need to produce? Then share the answer with the team at the start of the next meeting. This is the smallest option: it changes no rule and no meeting. | People may find time worth giving once they know what it is for. It also shows whether the director sees a purpose the team does not. | That the boredom comes from not knowing the purpose. If the purpose is clear and the meetings are still dull, this changes nothing. | Low |
| F) **Gather the team's view, then take it to the director.** Ask all eight, privately, to rate each of the three meetings for value and say what one thing would make it worth the hour. Bring the results to the director as information, not as a request to cut meetings. | Tests the high-dependence assumption that the boredom is shared, and gives the director evidence from the team rather than a view from two people. | That the director will act on what the team says. If the director's position is fixed whatever the evidence, the team has been asked and nothing follows. | Low |
| G) **Change what happens inside the hour, not the hour itself (new idea).** Keep all three meetings at one hour. Rotate who chairs each one, and have the chair send one question or decision the meeting must answer the day before. | Changes the experience of the time without changing the schedule the director has set. | That the director's "as they are" covers only the schedule, not who chairs or what the agenda holds. This is [to check] and may rule the option out. | Medium |

**My recommendation: Option F,** because it respects the director's rule, tests the assumption the whole problem statement leans on most, and gives you something concrete to bring to the director instead of a complaint.

Which direction do you want to take forward?

## User (turn 5)

Your call.

## Assistant (turn 5)

Thank you. I will take my recommendation, Option F, because it respects the director's rule. It is chosen to test, not proven. The problem statement stays as updated in turn 4, with the director's rule as a constraint.

**Deliver: the strongest case against Option F.**

A fair sceptic would say: "The director has already said the meetings stay as they are. A survey will not move a fixed position. It only raises the team's hopes, and when nothing changes, people trust the process less than before." This attacks the assumption that the director will act on what the team says. That assumption is untested.

A second point from the same sceptic: people may not rate the meetings honestly if you collect the answers and they know you will show them to the director. This attacks the assumption that the ratings will reflect what people really think. That assumption is also untested.

**What survives, and what I changed.** Option F survives in part. Even if the director does not move, the survey still tests the highest-dependence assumption in the problem statement: whether the boredom is shared beyond two people. So the survey stays. I changed three things:

- Before the survey, ask the director one question: "If the team's ratings show a problem, would you consider changes inside the hour, such as the agenda or who chairs?" This borrows the useful part of Option E. The answer tells you, before anyone is surveyed, whether the results can lead anywhere.
- Make the ratings anonymous, and tell the team that only totals go to the director.
- Tell the team at the start that the three meetings will stay, so nobody expects them to be cut.

**Hypotheses.** I set these thresholds now, before any result exists. You may change them now. Do not change them after the results come in.

| # | We believe... | Measure | Success threshold | Time frame or sample | Status |
|---|---|---|---|---|---|
| H1 | asking all eight people privately will show that low value is shared beyond the two who said they are bored | Number of people who rate at least one of the three meetings 1 or 2 on a scale of 1 to 5 | At least 4 of 8, with at least 6 of 8 responding | One week | untested |
| H2 | the director, shown the team's totals, will agree to at least one change inside the hour | Number of changes the director agrees to try (for example agenda, chair, or a question sent the day before) | At least 1 | Within two weeks of sharing the totals | untested |

If fewer than 4 of 8 rate any meeting low, H1 fails. That would mean the problem is smaller than the problem statement says, and the next move is to talk with the two people who are bored, not to change the meetings.

**Next test.**

- Type: experiment.
- What: first, ask the director the one question above. Then send all eight people an anonymous form. The form asks them to rate each of the three meetings from 1 to 5 for value, and to name the one thing that would make each meeting worth the hour. Keep it open for one week. This tests H1. If the director said yes to the question, share the totals with the director to test H2.
- Owner: [to confirm]
- Date: [to confirm]

Who will run this test, and by when?

## User (turn 6)

I don't know.

## Assistant (turn 6)

That is fine. The owner and the date stay as "[to confirm]" in the take-away below, and the first move under "Next" is to settle them.

I had no web access, so facts from memory are labelled RECALLED.

### Problem statement (agreed with the user)

- Who: the eight people on your team, including you. Two have said they are bored. How the other six feel is not yet known.
- Need: time in team meetings that people find worth giving. At least two people do not get that now.
- Evidence: the team has eight people and three one-hour meetings a week, which is 24 person-hours a week (evidence). Two of eight people say they are bored (evidence). The meetings are a waste of time (user said). "Everyone says so" (user said; two people have said so directly). Research shows most meetings are unproductive (to check; RECALLED only, not verified and not used). Which meeting, and what part of it, is the problem (to check).
- Why now: [to check]. If nothing changes, the team keeps spending 24 person-hours a week on time that at least some people do not value.
- Out of scope: meetings outside this team, individual performance of the people who are bored, and changing the number or length of the three meetings.
- Constraints: your director insists all three meetings stay as they are (user said, added in Develop). Read as three meetings a week, one hour each, none stopped or shortened. Whether this also covers the agenda and who chairs is [to check].
- How might we make the time this team spends together worth the time it costs, while the three meetings stay in place?

### Options considered

| # | Option | How it answers the question | Riskiest assumption | Effort |
|---|---|---|---|---|
| O1 | Every meeting has a written purpose and ends at 30 minutes (smallest option, first round) | Cuts the cost to at most 12 person-hours a week | The value fits into 30 minutes | low |
| O2 | Stop one of the three meetings for four weeks | Removes 8 person-hours a week and shows what the team misses | Nobody would miss the stopped meeting | low |
| O3 | Move status updates into writing | Keeps meeting time for discussion and decisions | Updates are the boring part | medium |
| O4 | Ask the team to redesign the meetings with you (new idea, first round) | The fix comes from the people whose time it is | People will say what they really think to you | medium |
| O5 | Ask the director what each meeting is for, and tell the team (smallest option, second round) | People may value time once they know its purpose | The boredom comes from not knowing the purpose | low |
| O6 | Gather the team's view privately, then take it to the director | Tests whether the boredom is shared, and gives the director evidence from the team | The director will act on what the team says | low |
| O7 | Change what happens inside the hour: rotate the chair, send one question the day before (new idea, second round) | Changes the experience without changing the schedule | "As they are" covers only the schedule | medium |

You rejected O1 to O4 because the director insists all three meetings stay as they are. That reason became the constraint above, and O5 to O7 respect it.

Recommended: O6, because it respects the director's rule and tests the assumption the problem statement leans on most. The user chose: my recommendation ("your call").

### Chosen direction

Gather the team's view privately, then take it to the director (O6), chosen to test.

- Strongest case against: the director's position is fixed, so a survey only raises the team's hopes and costs trust when nothing changes (attacks A3). A second point: people may not rate honestly if they know the results go to the director (attacks A4).
- What survived: the survey stays, because it still tests A1 even if the director does not move. Three changes: ask the director one question first ("If the team's ratings show a problem, would you consider changes inside the hour, such as the agenda or who chairs?"); make the ratings anonymous, with only totals going to the director; tell the team at the start that the three meetings will stay.

### Assumptions

| # | Assumption | Dependence | Status | Cheap test |
|---|---|---|---|---|
| A1 | Boredom in meetings is shared by more than the two people who said so | high | untested | The anonymous form this week; fewer than 4 of 8 rating any meeting 1 or 2 counts against it |
| A2 | The problem sits in the meetings, not in something outside them such as workload | high | untested | Add "what would you do with the hour?" to the form; most answers about workload counts against it |
| A3 | The director will act on what the team says, and "as they are" leaves room for changes inside the hour | high | untested | Ask the director the one question above this week; a "no" counts against it |
| A4 | People will rate honestly when the results go to the director | medium | untested | Compare the two known bored people's views with the totals; if the totals show no low ratings at all, treat this as suspect |
| A5 | All three meetings have the problem, not just one | medium | untested | Compare ratings across the three meetings; one meeting scoring clearly lower counts against it |
| A6 | "Bored" means the same as "a waste of time" | medium | untested | Ask the two people what makes the meeting boring; if they value the outcome but find the format dull, it counts against it |

### Hypotheses (thresholds set before the test; do not change them after the results)

| # | We believe... | Measure | Success threshold | Time frame or sample | Status |
|---|---|---|---|---|---|
| H1 | asking all eight people privately will show that low value is shared beyond the two who said they are bored | Number of people who rate at least one of the three meetings 1 or 2 on a scale of 1 to 5 | At least 4 of 8, with at least 6 of 8 responding | One week | untested |
| H2 | the director, shown the team's totals, will agree to at least one change inside the hour | Number of changes the director agrees to try | At least 1 | Within two weeks of sharing the totals | untested |

### Next test

- Type: experiment
- What: ask the director the one question first. Then send all eight people an anonymous form that rates each meeting from 1 to 5 for value and asks for the one thing that would make it worth the hour. Keep it open for one week (tests H1). If the director said yes, share the totals with the director (tests H2).
- Owner: [to confirm]
- Date: [to confirm]

Method: the Double Diamond, from the Design Council (S1).

## Next

1. **Book the next test.** Owner: you. First action this week: decide who sends the form and asks the director. It may be you, or someone the director trusts. Write the owner and date in place of "[to confirm]", and put the H1 threshold (4 of 8) where the team can see it. Result: a named owner and a date on the test.
2. **Get someone to hold you to the thresholds.** Owner: you. First action this week: show H1 and H2 to one person who will hold you to them, before the form goes out. Result: a note that they agreed the thresholds as written.
3. **Test the highest-dependence assumption first.** Owner: you. First action this week: ask the director the one question (A3). This is cheap, and the answer decides whether H2 can be tested at all. Result: a recorded yes or no from the director.

To check the assumptions or the case against in more depth, you may also like a skill for finding blind spots or a skill for checking claims and provenance, if you have one.
