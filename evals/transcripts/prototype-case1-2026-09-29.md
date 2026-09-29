# prototype eval, case 1: a clear design question with testers named

## User (turn 1)

We want office staff to book a desk from their phone. I need to find out if people can find a free desk near their team and book it for tomorrow without help. We will test it with five office staff.

## Assistant (turn 1)

Your design question: can office staff find a free desk near their team and book it for tomorrow from their phone, without help? Five office staff will test it.

Here is what I propose. Please confirm it, or tell me what to change, before I build anything.

- **Fidelity: clickable HTML.** Your question is whether people can find the path and read the labels without help, so styled screens linked by buttons are enough. Nothing needs to compute.
- **Archetype: calendar and booking.** People pick a date and a resource (a desk), which is what this archetype is for. It also shows free and taken desks side by side, which is the thing testers must tell apart.

The screens, sized for a phone:

- i) Choose the day, with "Tomorrow" as one option.
- ii) Choose a desk: a floor list with made-up desks such as "Desk A-01", each marked free or taken, and the made-up team area "Sample Team 1" marked so testers can see which desks are near their team.
- iii) Confirm: a booking summary showing the desk, the area and the date, with a "Book desk" button.
- iv) Done: a confirmation screen saying the desk is booked.

All names, desks and dates will be made up. The file will show a banner that says "Prototype, not for production use. All data is made up." I will save it as one `.html` file under `/tmp/prototype-eval/case1/`, and I will write a five-user test script to go with it.

Does this fidelity, archetype and set of screens suit you?

## User (turn 2)

Yes, go with that.

## Assistant (turn 2)

I have built the prototype, and a five-user test script for it is below.

- **Design question:** Can office staff find a free desk near their team and book it for tomorrow from their phone, without help?
- **Fidelity: clickable HTML** (you confirmed it). Your question is about finding the path and reading the labels, so linked screens are enough.
- **Archetype: calendar and booking** (you confirmed it). Testers pick a date and a desk, and they must tell free desks from taken desks.
- **Rung:** I can create files here but I have no live preview, so the prototype is a downloadable `.html` file.

**The file:** `/tmp/prototype-eval/case1/desk-booking-prototype.html`

All names, desks and dates in it are made up. The banner "Prototype, not for production use. All data is made up." shows on every screen. The file makes no network request and sends no data anywhere.

**How to use it:**

- Open the file in a phone browser, or open it in a desktop browser and narrow the window to phone width.
- On "Book a desk", tap **Tomorrow**. "Today" and "Pick another day" are shown but do not work in this prototype.
- On "Choose a desk for tomorrow", desks sit in three areas. The "Sample Team 1 area" has a "Your team" tag and a blue border. Free desks are green and you can tap them. Taken desks are grey and crossed out, and you cannot tap them.
- Two free desks are near the team (Desk A-03 and Desk A-05). Two free desks are on another floor (Desk C-02 and Desk C-07), so you can see if a tester books a desk far from their team.
- Tap a free desk to see "Check your booking". **Book desk** goes to "Desk booked". **Choose a different desk** goes back to the desk list.
- **Back** and **Back to start** return to the earlier screens.

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

**Warm-up question:** The last time you came into the office, how did you find somewhere to sit?

**Tasks** (read one at a time). Before T1, tell the tester: "In this test, your team is Sample Team 1."

| # | Scenario (read aloud) | Traces to | Success looks like |
|---|---|---|---|
| T1 | "You are coming into the office tomorrow and you want to sit near your team. Get yourself a desk." | find a free desk near their team, book it for tomorrow, without help | Chooses Tomorrow, taps Desk A-03 or Desk A-05, and reaches "Desk booked" without help |
| T2 | "Before you put your phone away, tell me where you will sit tomorrow and why you picked it." | near their team | Reads the desk and the Sample Team 1 area aloud, and says it is near their team |
| T3 | "Look at the desks again. Which ones could you not have booked, and how can you tell?" | find a free desk | Points to a taken desk and names the grey colour, the "Taken" label or the crossed-out text as the sign |

**After the tasks:**
- What was the hardest part?
- What did you expect to happen that did not?
- How sure are you that you would be sitting near your team tomorrow? Why?

**Observation sheet** (one per tester):

| Tester | Task | Done without help? (yes, with help, no) | Where they hesitated | What they said (verbatim) |
|---|---|---|---|---|
| P1 | T1 | | | |
| P1 | T2 | | | |
| P1 | T3 | | | |

**Decision rule:** If at least [to confirm] of 5 testers finish T1 without help and book a desk in the Sample Team 1 area, keep the flow. If not, redesign the step where most testers hesitated. If testers book Desk C-02 or Desk C-07, change how the team area is marked.

**Still to confirm:** how you recruit the testers, the session length, the facilitator, the note-taker, and the pass threshold in the decision rule.

## Next

1. You tap through every screen once on a phone and fix any label a tester would stumble on. Result: every button leads somewhere.
2. You fill in each [to confirm] in the test script and book the five office staff. Result: five sessions in your calendar.
3. You run the five sessions and fill in one observation sheet per tester. Result: the decision rule answers the design question.

If the findings need to go to decision makers with questions, a skill for building a brief could help, if you have one.

## Grading

Graded against `evals/prototype.md` v1. Skill commit 1c53fba. File checked with `node scripts/test-prototype.mjs prototype-case1-2026-09-29.html` run from a Playwright scratch folder; screenshot `prototype-case1-2026-09-29.png`.

- P1 pass: turn 1 restates the question, proposes "clickable HTML" and "calendar and booking", each with a reason tied to finding and booking a desk without help, lists four screens, asks "Does this fidelity, archetype and set of screens suit you?", and creates no file.
- P2 pass: one file `desk-booking-prototype.html`. Test output: banner "Prototype, not for production use. All data is made up." visible, externalRequests [], pageErrors [], dialogs [], 18 data-go controls with none broken, static clean. Screenshot saved.
- P3 pass: the visible text holds only "Sample Team 1/2/4", "Desk A-01" and similar, "Floor 2/3" and "Sample date, Day 2". No organisation name, statistic or claim.
- P4 pass: five office staff, the read-aloud think-aloud introduction, three task scenarios each with a "Traces to" column naming part of the question and a "Success looks like" criterion, an observation sheet, and a decision rule with "[to confirm]" for the threshold. Recruit, session, facilitator and note-taker are "[to confirm]".
- P5 pass: three moves, each owned by "You", with a first action (tap through, fill and book, run the sessions) and a "Result:" line.
