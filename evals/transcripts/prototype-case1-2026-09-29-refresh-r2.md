# prototype case 1 transcript, 2026-09-29 (refresh, re-run r2)

Runner: one fresh subagent per assistant turn, given only the skill folder, the host file note and this transcript. Model: claude-opus-5-5[1m]. Skill commit: FIXED-prototype (working tree on 7e9db4e: no invented time limit in a success criterion). Eval version: 1.

**USER:** We want office staff to book a desk from their phone. I need to find out if people can find a free desk near their team and book it for tomorrow without help. We will test it with five office staff.

**ASSISTANT:**

Your design question, in your words: can office staff find a free desk near their team and book it for tomorrow from their phone, without help? The testers are five office staff, and each one tries to book a desk near their team for tomorrow.

Here is what I propose. I have not built anything yet.

- **Fidelity: clickable HTML.** Your question is whether people can find the path and read the screens without help, so styled screens linked by buttons are enough. A working slice with a live filter would add behaviour your question does not ask about.
- **Archetype: calendar and booking.** People pick a place (a desk) and a day (tomorrow), which is what this archetype is for. Its main risk matches your question: can people tell a free desk from a taken one.

The screens, sized for a phone:

- a) **Choose a day.** Today and the next few days, with tomorrow selectable.
- b) **Choose a desk.** Desks grouped by team area, such as "Team area: Sample Team 1", each marked free or taken, with made-up ids such as "Desk A-01".
- c) **Confirm.** A booking summary with the desk, the area and the day, and one "Book this desk" button.
- d) **Done.** A booking confirmation. The prototype saves and sends nothing.

Every name, team and desk in the file will be made up. I can create files here, so you will get a downloadable `.html` file that opens in any browser, including on a phone.

Do you want me to build it with clickable HTML and the calendar-and-booking layout, with these four screens, or do you want to change any of them?

**USER:** Yes, go with that.

**ASSISTANT:**

I built it. Your prototype is in this file: `/tmp/prototype-eval/case1-r2/desk-booking-prototype.html`.

- **Design question:** can office staff find a free desk near their team and book it for tomorrow from their phone, without help?
- **Fidelity: clickable HTML** (you confirmed it). Styled screens linked by buttons test whether people find the path, which is what your question asks.
- **Archetype: calendar and booking** (you confirmed it). People pick a place and a day, and the main risk is telling a free desk from a taken one.
- **Rung:** I can create files here, so you get a downloadable `.html` file.

Every name, team and desk in the file is made up ("Sample Person 1", "Sample Team 1", "Desk A-01"). A yellow banner on every screen says "Prototype, not for production use. All data is made up." The file makes no network request and saves or sends nothing.

**How to use it**

- Open the file in any browser. To test on a phone, send the file to the phone and open it there, or open it on a computer and narrow the window.
- **Choose a day:** only "Tomorrow" works. "Today" shows "No desks left", and the later days show "Not in this prototype".
- **Choose a desk:** desks are grouped by team area (Sample Team 1, 2 and 3). The tester is signed in as Sample Person 1 in Sample Team 1. Free desks are green and clickable: A-02 and A-04 near Sample Team 1, and B-03 in Sample Team 2. Taken desks are grey and do nothing.
- **Check your booking:** shows the desk, area and day, with "Book this desk" and "Back".
- **Desk booked:** a confirmation, with "Back to start" to reset for the next tester.
- A tester who picks B-03 can still book it. That lets you see if people book a free desk that is not near their team.

### Test script: Book a desk for tomorrow

**Design question:** Can office staff find a free desk near their team and book it for tomorrow from their phone, without help?
**Prototype:** desk-booking-prototype.html (clickable HTML, calendar and booking). All data in it is made up.
**Testers:** five people who are office staff. Recruit: [to confirm].
**Session:** [to confirm], one tester at a time, on a phone. Facilitator: [to confirm]. Note-taker: [to confirm].

**Introduction (read aloud):**
"Thank you for helping. We are testing this design, not you, so nothing you do is wrong.
Please think aloud as you go: say what you look at, what you expect and what puzzles you.
This is a prototype with made-up data, so some parts do not work. I will not help while you
try the tasks, but I will answer questions at the end."

**Warm-up question:** The last time you needed a desk in the office, how did you find one?

**Tasks** (read one at a time):

| # | Scenario (read aloud) | Traces to | Success looks like |
|---|---|---|---|
| T1 | "You are coming into the office tomorrow and want to sit with your team, Sample Team 1. Get yourself a desk." | find a free desk near their team, for tomorrow | Picks Tomorrow, chooses Desk A-02 or A-04, and reaches the "Desk booked" screen without help |
| T2 | "Before you finish, tell me which desk you are about to get and where it is." | find a desk near their team | On the "Check your booking" screen, says the desk id and that it is in the Sample Team 1 area |
| T3 | "Look at the list of desks again. Tell me which desks you could not book, and how you know." | find a free desk | Points to at least one grey desk and names "Taken" or the colour as the reason |

**After the tasks:**
- What was the hardest part?
- What did you expect to happen that did not?
- How sure were you that the desk you booked was close to your team? Why?

**Observation sheet** (one per tester):

| Tester | Task | Done without help? (yes, with help, no) | Where they hesitated | What they said (verbatim) |
|---|---|---|---|---|
| P1 | T1 | | | |
| P1 | T2 | | | |
| P1 | T3 | | | |

**Decision rule:** If at least [to confirm] of 5 testers finish T1 with a Sample Team 1 desk and without help, keep the flow. If not, redesign the step where most testers hesitated.

**Still to confirm:** how you recruit the five staff, session length, facilitator, note-taker, and the pass threshold in the decision rule.

**Next**

1. You click through every screen once on a phone and fix any label a tester would stumble on. Result: every button leads somewhere.
2. You fill each [to confirm] in the test script and book the five testers. Result: five sessions in your calendar.
3. You run the five sessions and fill one observation sheet per tester. Result: the decision rule gives an answer to your design question.

If the findings need to go to decision makers with questions, a skill for building a brief can help, if you have one.


## Grading

- P1: pass. Restates the question, proposes clickable HTML and calendar and booking with reasons, asks to confirm, "I have not built anything yet."
- P2: pass. /tmp/prototype-eval/case1-r2/desk-booking-prototype.html; scripts/test-prototype.mjs exit 0 (14 controls none broken, static clean); screenshot saved.
- P3: pass. Sample Person 1, Sample Team 1 to 3, Desk A-01 to C-04; no real organisation, statistic or claim.
- P4: pass. Five testers, think-aloud introduction, T1 to T3 traced, success criteria with no time limit, observation sheet, decision rule with `[to confirm]`.
- P5: pass. Three moves, owner "You", action and "Result:".
