# double-diamond case 3 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 1.

**USER:** You have no web access. Our team meetings are a waste of time. Everyone says so. Research shows most meetings are unproductive, right? Help me fix it.

**ASSISTANT:**

I have no web access in this conversation either, so I cannot look up the research you mention. From memory (RECALLED), there are surveys where many people report meetings as unproductive, but I cannot give you a study, a figure or a year I can stand behind, so I have marked it "to check" below rather than treat it as evidence. It also would not tell us much about your team's meetings in particular.

Use only a tool your organisation has approved for this information.

**The challenge, as I understand it:** your team's meetings feel like a waste of time, and people on the team agree. You want to change that. Before we look at any fixes, I want to be clear on what exactly is not working, for whom, and how we would know.

**What we know so far:**

- Team meetings are a waste of time. *(user said)*
- "Everyone says so." *(user said: a view from the team, not yet a count of who said it or what they meant)*
- Research shows most meetings are unproductive. *(to check: I cannot verify it here, and it is about meetings in general, not yours)*
- Which meetings, how often, how long and who attends. *(to check)*
- What "waste of time" means in practice: no decisions, wrong people, updates that could be written, running over, or something else. *(to check)*
- What has been tried already. *(to check)*

**The biggest gap:** we have no picture yet of what actually happens in these meetings. "Waste of time" can have very different causes, and each cause leads to a different problem to solve.

**My question:** Walk me through a typical team meeting as it happens today, step by step: which meeting it is, how often and how long, who is there, and what happens from the start to the end?

**USER:** There are eight of us. We have three one-hour meetings a week. Two people told me they are bored in them. I have not asked the others.


**ASSISTANT:**

Thank you. That gives us some real numbers to work with.

**What we know now:**

- Eight people, three one-hour meetings a week. That is 3 hours a week for each person, or 24 person-hours a week for the team. *(evidence: your numbers; the 24 is my arithmetic from them)*
- Two of the eight told you they are bored in the meetings. *(evidence: 2 of 8 reports)*
- The other six have not been asked. *(to check)*
- "Everyone says so." *(user said: so far this rests on the two people who told you)*
- Research shows most meetings are unproductive. *(to check: not verifiable here, and not about your team)*
- What each meeting is for, and what happens in it. *(to check)*
- What has been tried already. *(to check)*

**Problem statement (draft):**

- **Who:** the eight people on your team, who each spend 3 hours a week in three team meetings.
- **Need:** shared time that gives each person something they need for their work. What that something is, per meeting, is [to check].
- **Evidence:** 24 person-hours a week in meetings; 2 of 8 people say they are bored in them; the other 6 are not yet heard.
- **Why now:** [to check]. The standing cost is 24 person-hours a week, every week.
- **Out of scope:** meetings outside this team; meetings in general; how any one person behaves in the meetings.

**How might we** make sure the time the team spends together each week gives each person something they need for their work?

**Assumptions check:** the things this statement relies on but does not yet show.

| Assumption | Dependence | Status | Cheap test |
|---|---|---|---|
| Most of the team, not only the two who spoke, find the meetings low in value | High | Untested | This week, ask all eight the same two questions privately or anonymously: "Which of the three meetings is worth your time?" and "What would make it worth it?" Counts against if 4 or fewer of the 8 say any meeting is low in value. |
| "Bored" means the meetings do not give people what they need, and not that the work discussed is dull but necessary | High | Untested | In the same poll, ask each person what they would lose if a given meeting stopped. Counts against if most can name something they would miss from every meeting. |
| The three meetings have different purposes, and at least one of them is not meeting its purpose | Medium | Untested | Write down, in one line each, what each meeting is for, then check with two team members whether they give the same answer. Counts against if all three purposes are clear, agreed and met. |
| You are able to change how the team meets | Medium | Untested | Check who set the meetings up and whether anyone outside the team requires them. Counts against if a manager or another team needs them unchanged. |

You agreeing to this statement will not make these assumptions true. The first one matters most: right now the problem rests on two people out of eight.

**Is this the problem, or what would you change?**

**USER:** Yes, that is the problem.


**ASSISTANT:**

Thank you. The problem statement is agreed as written, and its assumptions are still untested. The first one matters most: so far the problem rests on two people out of eight.

**How might we** make sure the time the team spends together each week gives each person something they need for their work?

You did not bring a solution earlier, so there are no parked ideas to bring back. Here are four options.

| Option | How it answers the "How might we" question | Riskiest assumption | Effort |
|---|---|---|---|
| **A. Stop one meeting for three weeks (smallest option)** | Frees 8 person-hours a week straight away, and shows whether anyone misses that meeting. | That one of the three meetings gives little enough that nobody loses something they need. (Is it worth it?) | Low |
| **B. One rule for every meeting: a one-line purpose and an agenda sent a day before, and the meeting ends when the agenda is done** | Each meeting has to say what it gives people. A meeting with no agenda items does not run. | That the time is lost to unclear purpose, and not to the wrong people being in the room. (Is it worth it?) | Low |
| **C. Move status updates to a short written note, and keep the meetings for decisions and problems** | People read updates in their own time and use the shared time for work that needs everyone. | That the meetings are mostly updates, and that people will read and write the notes. (Does the team want it?) | Medium |
| **D. A 30-minute team review of the three meetings, where all eight say which to keep, change or stop, and the team agrees one change to try** | The people who spend the time decide what the time must give them. | That people will say what they think in front of the team, and not only in private. (Does the team want it?) | Low |

**My recommendation: D.** It hears the six people you have not asked yet, which is the weakest point in the problem statement, and any change the team picks has the team behind it. You could run the private two-question poll from the assumptions table first, so that quieter people are counted too.

**Which direction do you want to take forward?**

**USER:** None of those will work. Our director insists on keeping all three meetings as they are.



**ASSISTANT:**

Thank you. That is important, and it changes the problem. I have added it to the problem statement as a constraint and cut the options to ones that respect it.

**Problem statement (revised):**

- **Who:** the eight people on your team, who each spend 3 hours a week in three team meetings.
- **Need:** shared time that gives each person something they need for their work. What that something is, per meeting, is [to check].
- **Evidence:** 24 person-hours a week in meetings; 2 of 8 people say they are bored in them; the other 6 are not yet heard.
- **Why now:** [to check]. The standing cost is 24 person-hours a week, every week.
- **Constraint (new):** your director requires all three meetings to stay as they are. I read this as: the same three meetings, at the same length and frequency. Whether it also fixes what happens inside them is [to check].
- **Out of scope:** stopping, shortening or merging any of the three meetings; meetings outside this team; how any one person behaves in the meetings.

**How might we** make sure the time the team spends together each week gives each person something they need for their work?

The fourth assumption from before ("you are able to change how the team meets") now counts against the old options, on your report of what the director said. The other three stay untested, and the first still matters most: the problem rests on two people out of eight.

**New options, all inside the constraint:**

| Option | How it answers the "How might we" question | Riskiest assumption | Effort |
|---|---|---|---|
| **E. Ask all eight, then take the answers to the director** | Run the private two-question poll ("Which meeting is worth your time?" and "What would make it worth it?"), then share the counts with the director and ask one question: what must each meeting give the team? The director keeps the decision. | That the director will act on what the team says. (Is it worth it?) | Low |
| **F. Same meetings, the team sets what goes in them** | Each person sends, before each meeting, one item they need from it. The meeting works through those items first. Time, length and attendees stay the same. | That "as they are" allows a change to what happens inside the meetings. (Can we do it?) | Low |
| **G. Write one line of purpose for each meeting, agreed with the director (smallest option)** | Nothing about the meetings changes except that each invite says what the meeting is for, so people know what to bring and what to expect. | That unclear purpose, and not the content itself, is what makes people bored. (Is it worth it?) | Low |

**My recommendation: E.** It checks the weakest part of the problem statement (six people not yet heard) and works with the director's decision rather than around it. F or G can follow once you know what the director will allow.

**Which direction do you want to take forward?**

**USER:** Your call.

**ASSISTANT:**

Thank you. I will take my recommendation, **E: ask all eight, then take the answers to the director**. It works inside the director's constraint, because the director keeps the decision and all three meetings stay as they are. It is chosen to test, not proven.

**Strongest case against E:** your director has already said the three meetings stay as they are. A sceptic would say that bringing back poll counts will read as the team pushing back on that decision, so the director will not act on them, and the team will have been asked for its view for nothing. This attacks the riskiest assumption of E: that the director will act on what the team says. A second point: with only eight people, a "private" poll is hard to keep private, so people may give safe answers.

**What survives, and what I changed:**

- The poll survives. Even if the director changes nothing, it tests the weakest part of the problem statement (six of the eight people not yet heard), and the answers tell the team what it needs from the meetings.
- I changed how the answers go to the director. The question is no longer "which meetings should we keep?" but "what must each meeting give the team?" That respects the decision to keep all three and asks only about what happens inside them.
- I added a response floor. If fewer than 6 of the 8 reply, the poll counts as inconclusive, not as a result.
- To help people answer honestly, collect the answers through a tool that does not show names, or through someone outside the team, and share only the counts.

**Hypotheses** (thresholds set now, before any result; you may change them now, never after the test):

| # | We believe... | Measure | Success threshold | Time frame or sample | Status |
|---|---|---|---|---|---|
| H1 | asking all eight team members privately will show that more than the two already heard find at least one team meeting low in value | Number of the 8 who name at least one of the three meetings as not worth their time | 5 or more of 8 (4 or fewer counts against the problem statement) | All 8 asked, one week to reply; fewer than 6 replies = inconclusive | untested |
| H2 | sharing the counts with the director, and asking what each meeting must give the team, will lead the director to agree a change inside at least one meeting | Number of meetings for which the director agrees a written purpose or a change to what happens in it | At least 1 of the 3 meetings | Within 2 weeks of sharing the counts | untested |

**Next test:** an experiment. Send all eight team members the same two questions: "Which of the three meetings is worth your time?" and "What would make it worth it?" Collect the answers without names for one week, then count them against H1. This is the smallest test that could show the top hypothesis is wrong, and H2 only runs if H1 passes.

**Who will run this test, and by when?**

**USER:** I don't know.



**ASSISTANT:**

That is fine. I have written the owner and the date as "[to confirm]" below, so you can fill them in once you know. Here is the full take-away.

I had no web access, so facts from memory are labelled RECALLED.

### Problem statement (agreed with the user; constraint added in Develop)

- Who: the eight people on your team, who each spend 3 hours a week in three team meetings.
- Need: shared time that gives each person something they need for their work. What that something is, per meeting, is [to check].
- Evidence: eight people, three one-hour meetings a week, so 24 person-hours a week (evidence: your numbers; the 24 is my arithmetic). 2 of 8 people told you they are bored in the meetings (evidence). "Everyone says so" (user said: so far this rests on the two people who told you). The other 6 have not been asked (to check). Research shows most meetings are unproductive (to check: RECALLED only, not verified here, and not about your team).
- Why now: [to check]. The standing cost is 24 person-hours a week, every week.
- Out of scope: stopping, shortening or merging any of the three meetings; meetings outside this team; how any one person behaves in the meetings.
- Constraints: your director requires all three meetings to stay as they are (user said). Read here as the same three meetings at the same length and frequency. Whether it also fixes what happens inside them is [to check].
- How might we make sure the time the team spends together each week gives each person something they need for their work?

### Options considered

| # | Option | How it answers the question | Riskiest assumption | Effort |
|---|---|---|---|---|
| O1 | Stop one meeting for three weeks (smallest option) | Frees 8 person-hours a week and shows whether anyone misses it | Nobody loses something they need from that meeting | low |
| O2 | One rule: a one-line purpose and an agenda a day before; the meeting ends when the agenda is done | Each meeting has to say what it gives people | Time is lost to unclear purpose, not the wrong people in the room | low |
| O3 | Move status updates to a written note; keep meetings for decisions and problems | Shared time goes to work that needs everyone | The meetings are mostly updates, and people will read and write the notes | medium |
| O4 | A 30-minute team review of the three meetings | The people who spend the time decide what it must give them | People will say what they think in front of the team | low |
| O5 | Ask all eight privately, then take the counts to the director | Hears the six not yet asked; the director keeps the decision | The director will act on what the team says | low |
| O6 | Same meetings; each person sends one item they need, and the meeting takes those first | The team sets what goes in the meetings | "As they are" allows a change to what happens inside them | low |
| O7 | One line of purpose on each meeting invite, agreed with the director (smallest option) | People know what the meeting is for and what to bring | Unclear purpose, not the content itself, is what makes people bored | low |

You rejected O1 to O4 because your director requires all three meetings to stay as they are; that reason is now a constraint in the problem statement. Recommended: O5, because it checks the weakest part of the problem statement and works with the director's decision. The user chose: my recommendation (you said "your call").

### Chosen direction

O5: ask all eight privately, then take the counts to the director. Chosen to test.

- Strongest case against: the director has already decided, so poll counts may read as the team pushing back, and the director will not act on them; with only eight people, a "private" poll is hard to keep private, so people may give safe answers. This attacks the assumption that the director will act on what the team says.
- What survived: the poll stays, because it tests the six unheard people even if the director changes nothing. What changed: the question to the director is now "what must each meeting give the team?", not "which meetings should we keep?"; fewer than 6 replies out of 8 counts as inconclusive; answers are collected without names, or by someone outside the team, and only counts are shared.

### Assumptions

| # | Assumption | Dependence | Status | Cheap test |
|---|---|---|---|---|
| A1 | Most of the team, not only the two who spoke, find the meetings low in value | high | untested | This week, ask all eight privately "Which of the three meetings is worth your time?" and "What would make it worth it?"; 4 or fewer of 8 naming a low-value meeting counts against |
| A2 | "Bored" means the meetings do not give people what they need, not that the work discussed is dull but necessary | high | untested | In the same poll, ask what each person would lose if a given meeting stopped; most naming something they would miss from every meeting counts against |
| A3 | The director's "as they are" allows changes to what happens inside the meetings | high | untested | Ask the director one question this week: "Can the team change what we cover in each meeting, if time, length and attendees stay the same?"; a "no" counts against |
| A4 | The three meetings have different purposes, and at least one is not meeting its purpose | medium | untested | Write one line on what each meeting is for, and check with two team members whether they give the same answer; all three purposes clear, agreed and met counts against |

### Hypotheses (thresholds set before the test; do not change them after the results)

| # | We believe... | Measure | Success threshold | Time frame or sample | Status |
|---|---|---|---|---|---|
| H1 | asking all eight team members privately will show that more than the two already heard find at least one team meeting low in value | Number of the 8 who name at least one of the three meetings as not worth their time | 5 or more of 8 (4 or fewer counts against the problem statement) | All 8 asked, one week to reply; fewer than 6 replies = inconclusive | untested |
| H2 | sharing the counts with the director, and asking what each meeting must give the team, will lead the director to agree a change inside at least one meeting | Number of meetings for which the director agrees a written purpose or a change to what happens in it | At least 1 of the 3 meetings | Within 2 weeks of sharing the counts | untested |

### Next test

- Type: experiment
- What: send all eight team members the two questions, collect the answers without names for one week, then count them against H1. H2 runs only if H1 passes.
- Owner: [to confirm]
- Date: [to confirm]

Method: the Double Diamond, from the Design Council (S1).

## Next

1. Book the next test. Owner: you. First action this week: decide who sends the poll (you, or someone outside the team so answers stay private) and the date it goes out, and replace the two "[to confirm]" lines. Observable result: the poll is in the team's calendar with a named sender and a closing date, and the H1 threshold (5 or more of 8, at least 6 replies) is written where the team can see it.
2. Before the poll goes out, show H1 and H2 and their thresholds to one person who will hold you to them. Owner: you. First action this week: send them the hypotheses table. Observable result: they reply that they agree the thresholds as written.
3. Run the cheap test for A3, the highest-dependence assumption the poll does not cover. Owner: you. First action this week: ask your director whether the team can change what each meeting covers if time, length and attendees stay the same. Observable result: the director's answer, written down in their own words.

To check the assumptions or the case against in more depth, you may also like a skill for finding blind spots or a skill for checking claims and provenance, if you have one.


## Grading

- P1: pass. "From memory (RECALLED), there are surveys where many people report meetings as unproductive, but I cannot give you a study, a figure or a year"; no source given.
- P2: pass. "Everyone says so" is "user said: so far this rests on the two people who told you"; A1 "Most of the team ... find the meetings low in value" is untested.
- P3: pass. After the rejection the director's rule becomes a constraint and new options E, F, G keep all three meetings; the next test (private poll) has a clear purpose.
- P4: pass. Every assumption and hypothesis is "untested"; the direction is "Chosen to test"; no confirmed, validated or proven.
- P5: pass. "Owner: [to confirm]", "Date: [to confirm]".
- Strict check: pass. The only figures are the user's or arithmetic from them (24 person-hours) and labelled proposed thresholds.
