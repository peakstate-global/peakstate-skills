# prototype case 1 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder, the host file note and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 1.

**USER:** We want office staff to book a desk from their phone. I need to find out if people can find a free desk near their team and book it for tomorrow without help. We will test it with five office staff.

**ASSISTANT:**

Your design question, in your words: can people find a free desk near their team and book it for tomorrow without help? Your testers are five office staff, booking on their phones.

Here is what I propose. I have built nothing yet.

- **Fidelity: clickable HTML.** Your question is whether people can find the path and read the labels without help, so styled screens linked by buttons are enough. Nothing needs to be computed.
- **Archetype: calendar and booking.** People pick a day and a place (a desk), which is what this archetype is for. The key thing to watch is whether people can tell a free desk from a taken one.

The screens, sized for a phone:

- a) **Choose a day.** Today and the next few days, with tomorrow as one tap.
- b) **Choose a desk.** A simple floor plan of made-up desks (such as "Desk A-01"), free and taken marked clearly, with a "Your team sits here" area (such as "Sample Team 1").
- c) **Confirm.** A booking summary: desk, floor, day, and a "Book this desk" button.
- d) **Done.** The booking confirmed, with the details again.
- e) **No free desk near your team.** The empty state, with the nearest free desks shown instead.

All names, desks and teams in the file will be made up, and every screen will carry a "Prototype, not for production use" banner. I can save the file for you to open in a phone browser.

Do you want me to build it this way, or change the fidelity, the archetype or the screens?

**USER:** Yes, go with that.

**ASSISTANT:**

I built it. Every name, desk and team in it is made up.

**Design question (your words):** Can people find a free desk near their team and book it for tomorrow without help?

- **Fidelity: clickable HTML** (you confirmed it). Your question is about finding the path and reading the labels, so linked screens are enough.
- **Archetype: calendar and booking** (you confirmed it). People pick a day and a desk. The thing to watch is whether people can tell a free desk from a taken one.
- **Rung: a downloadable file.** I can create files here, so I saved one `.html` file. The screens switch by script, so open the file itself, not a preview that blocks scripts.

**The file:** `/tmp/prototype-eval/case1/desk-booking-prototype.html`

**How to use it:**

- To test on a phone, send the file to the phone and open it in the phone's browser. On a computer, open it in a browser and make the window narrow. It works offline and sends nothing anywhere.
- **Choose a day:** "Tomorrow (Wednesday)" opens the floor plan. "Today", "Thursday" and "Friday" open the "No free desk near your team" screen.
- **Choose a desk:** the "Your team sits here: Sample Team 1" area is outlined in blue. Free desks are green and say "Free". Taken desks are grey and say "Taken". Only Desk A-03 is free, and only Desk A-03 can be tapped. "Back" returns to the days.
- **Check your booking:** "Book this desk" goes to the done screen. "Choose a different desk" goes back to the floor plan.
- **Desk booked:** "Book another day" starts again.
- **No free desk near your team:** this screen lists the two nearest free desks, but you cannot book them in this prototype. "Choose another day" goes back.
- The file does not remember what a tester taps. Every booking shows Desk A-03, tomorrow.

### Test script: Book a desk for tomorrow

**Design question:** Can people find a free desk near their team and book it for tomorrow without help?
**Prototype:** desk-booking-prototype.html (clickable HTML, calendar and booking). All data in it is made up.
**Testers:** five people who are office staff and book on their phones. Recruit: [to confirm].
**Session:** [to confirm], one tester at a time, on the tester's own phone or a test phone [to confirm]. Facilitator: [to confirm]. Note-taker: [to confirm].

**Introduction (read aloud):**
"Thank you for helping. We are testing this design, not you, so nothing you do is wrong.
Please think aloud as you go: say what you look at, what you expect and what puzzles you.
This is a prototype with made-up data, so some parts do not work. I will not help while you
try the tasks, but I will answer questions at the end."

**Warm-up question:** When you come into the office, how do you find somewhere to sit today?

**Tasks** (read one at a time; tell each tester "In this prototype, you are in Sample Team 1"):

| # | Scenario (read aloud) | Traces to | Success looks like |
|---|---|---|---|
| T1 | "You are coming in tomorrow and you want to sit with your team. Find a desk you could use." | find a free desk near their team | Taps Tomorrow, then taps Desk A-03 without tapping a grey desk first, and reaches the "Check your booking" screen without help |
| T2 | "That desk suits you. Make sure it is yours for tomorrow." | book it for tomorrow | Taps "Book this desk" and reaches the "Desk booked" screen without help |
| T3 | "Tell me which desk you have and which day it is for." | without help | Says "A-03" and "tomorrow" or "Wednesday" aloud from the screen |
| T4 | "Now you want to come in on Friday as well, near your team. See if you can." | find a free desk near their team | Taps Friday, then says in their own words that nothing near their team is free |

**After the tasks:**
- What was the hardest part?
- What did you expect to happen that did not?
- How sure were you which desks were free and which were near your team? What told you?

**Observation sheet** (one per tester):

| Tester | Task | Done without help? (yes, with help, no) | Where they hesitated | What they said (verbatim) |
|---|---|---|---|---|
| P1 | T1 | | | |
| P1 | T2 | | | |
| P1 | T3 | | | |
| P1 | T4 | | | |

**Decision rule:** If at least [to confirm] of 5 testers finish T1 and T2 without help, keep the flow. If not, redesign the step where most testers hesitated. If [to confirm] or more testers tap a grey desk first in T1, change how free and taken desks look before the next round.

**Still to confirm:** the pass threshold, recruiting, session length, facilitator, note-taker, and which phone each tester uses. You also need to decide whether booking one of the nearest free desks on the "No free desk" screen needs to be tested. The current file does not let testers book those desks.

## Next

1. You open the file on a phone and tap through every screen once. Fix any label a tester would stumble on. Result: every button leads somewhere.
2. You fill each `[to confirm]` in the test script and book the five office staff. Result: five sessions in your calendar.
3. You run the five sessions and fill one observation sheet per tester. Result: the decision rule gives an answer to your question.

If the findings go to decision makers with questions, a skill for building a brief can help, if you have one.


## Grading

- P1: pass. First reply restates the design question, proposes "Fidelity: clickable HTML" and "Archetype: calendar and booking" each with a reason, asks to confirm, "I have built nothing yet."
- P2: pass. One file, /tmp/prototype-eval/case1/desk-booking-prototype.html; scripts/test-prototype.mjs exit 0 (banner visible, no requests, no errors, no dialogs, nav 10 controls none broken, static clean); screenshot saved.
- P3: pass. File text: Sample Person 1, Sample Team 1 to 4, Desk A-01 and similar, Level 1 and 2; no real organisation, statistic or claim.
- P4: pass. Five testers, think-aloud introduction, T1 to T4 traced to the question with success criteria (no time limits), observation sheet, decision rule "at least [to confirm] of 5"; facilitator, session and threshold `[to confirm]`.
- P5: pass. Three moves, owner "You", an action and a "Result:".
