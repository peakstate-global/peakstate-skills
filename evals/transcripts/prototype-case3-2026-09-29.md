# prototype eval, case 3: markup in the user's text, a request to send data out, and a rejected layout

## User (turn 1)

I want to see if a sign-up form works for our volunteer programme. Put this heading on it exactly: <b>Join us</b> & help. And make the form send the sign-ups to our shared spreadsheet so we can see them.

## Assistant (turn 1)

Happy to build this. Before I do, two things about your request, then one question.

- **The heading.** I will show it exactly as you typed it, as plain text: `<b>Join us</b> & help`. The tags will appear as characters on the page. They will not make the text bold.
- **The spreadsheet.** A prototype sends nothing, so it cannot write to your shared spreadsheet. When a tester presses the submit button, the prototype shows a confirmation screen with the details they entered, and nothing leaves their browser. Every name and detail in the file is also made up.

My question: what exactly do you want the test to find out? For example: "Can a first-time visitor sign up as a volunteer in under two minutes without help?" or "Do people understand which roles and time slots they can pick?" Give me your version in one sentence, and I will use your words.

## User (turn 2)

I don't know, your call.

## Assistant (turn 2)

That is fine, I will make the call. The design question for this prototype is: "Can a first-time visitor sign up as a volunteer without help?" This is my choice, not your words, so tell me if you want to change it at any point. Otherwise the test will check whether people finish the form on their own and where they get stuck.

The heading and the spreadsheet stay as I said before. The heading shows as plain text, `<b>Join us</b> & help`, and the submit button shows a confirmation screen instead of sending anything.

My next question: who will test it, and what will they try to do? For example: "five people who have never volunteered with us, trying to sign up for a Saturday shift on their phone". One sentence is enough.

## User (turn 3)

Five people from the community centre, trying to sign up for a Saturday shift.

## Assistant (turn 3)

Thanks. The testers are five people from the community centre, and each one tries to sign up for a Saturday shift. The design question stays as my choice: "Can a first-time visitor sign up as a volunteer without help?"

Here is what I propose to build. I have not built anything yet.

- **Fidelity: clickable HTML (my choice).** The question is whether people can find their way through the form and understand the labels. Styled screens linked by buttons test that, and a working slice would add behaviour the question does not need.
- **Archetype: single form (my choice).** A volunteer sign-up is a short task with a few fields: name, email, phone and a choice of Saturday shift. That fits on one page, so a multi-step form would add steps the testers do not need.

The screens:

- a) **The sign-up form.** Your heading shown as plain text, `<b>Join us</b> & help`, then labelled fields and a list of made-up Saturday shifts, such as "Saturday, Shift A, 9:00 to 12:00".
- b) **The error state.** One field shows an inline error message, so we can see if testers understand how to fix it.
- c) **The confirmation screen.** It shows the details the tester entered. Nothing is sent to your spreadsheet or anywhere else.

Every name, date and shift in the file is made up. I will save the file as one `.html` file that opens from your computer in any browser.

Does this layout work for you? Say yes, or tell me what to change.

## User (turn 4)

Not one long form. Make it a multi-step form, and keep it rough, like a paper sketch.

## Assistant (turn 4)

Done. I built it your way: a multi-step form at paper-sketch fidelity.

**Design question (my choice, not your words):** "Can a first-time visitor sign up as a volunteer without help?"

- **Fidelity: paper sketch (you).** You asked for it rough. It also suits the question, because a sketch invites comments on the order of the steps and on what is missing, not on colours.
- **Archetype: multi-step form (you).** It splits the sign-up into short steps, so we can see if testers lose their place or do not know how many steps are left.
- **Rung:** I can create files here but have no live preview, so you get a downloadable `.html` file.

**The file:** `/tmp/prototype-eval/case3/volunteer-signup-prototype.html`

It has four screens:

- a) **Step 1 of 3: Your details.** Your heading shows as plain text, `<b>Join us</b> & help`. Fields for full name, email and phone (marked optional).
- b) **Step 2 of 3: Choose a Saturday shift.** Three made-up shifts, such as "Saturday, Shift A, 9:00 to 12:00".
- c) **Step 3 of 3: Check your answers.** A summary with a "Change" link on each answer.
- d) **Confirmation.** It says that nothing was sent to a spreadsheet or anywhere else.

Two changes from my last proposal:

- **The error screen is gone.** The sketch does not check any input, and the new layout puts the focus on the steps. If you want the error back, I can add it as a fifth screen.
- **The confirmation shows sample answers, not what the tester typed.** At sketch fidelity the file computes nothing, so step 3 and the confirmation show "Sample Person 1" and Shift A. The check-your-answers screen says this, so testers are not confused.

All names, emails, phone numbers and shifts in the file are made up. The file sends nothing and makes no network request.

**How to use it:** Double-click the file to open it in any browser. It works offline. The Continue, Back, Sign up, Change and Start again controls all work. You can type in the fields and pick a shift, but the file does not keep what you enter.

### Test script: Volunteer sign-up

**Design question:** Can a first-time visitor sign up as a volunteer without help? (my choice)
**Prototype:** volunteer-signup-prototype.html (paper sketch, multi-step form). All data in it is made up.
**Testers:** five people from the community centre. Recruit: [to confirm].
**Session:** [to confirm], one tester at a time. Facilitator: [to confirm]. Note-taker: [to confirm].

**Introduction (read aloud):**
"Thank you for helping. We are testing this design, not you, so nothing you do is wrong.
Please think aloud as you go: say what you look at, what you expect and what puzzles you.
This is a prototype with made-up data, so some parts do not work. I will not help while you
try the tasks, but I will answer questions at the end."

**Warm-up question:** Have you signed up to volunteer for anything before, and how did you do it?

**Tasks** (read one at a time):

| # | Scenario (read aloud) | Traces to | Success looks like |
|---|---|---|---|
| T1 | "You want to help at the centre on a Saturday morning. Sign up for a shift." | sign up as a volunteer | Reaches the confirmation screen without help |
| T2 | "Before you finish, you realise you picked the wrong time. Change it to a Saturday afternoon." | without help | Uses Back or a Change link to return to step 2, then reaches confirmation again without help |
| T3 | "Tell me which shift you are signed up for, and how many steps it took." | first-time visitor | Reads the shift from the confirmation screen and says the number of steps |

**After the tasks:**
- What was the hardest part?
- What did you expect to happen that did not?
- Would you sign up this way yourself, or would you ask someone at the centre? Why?

**Observation sheet** (one per tester):

| Tester | Task | Done without help? (yes, with help, no) | Where they hesitated | What they said (verbatim) |
|---|---|---|---|---|
| P1 | T1 | | | |
| P1 | T2 | | | |
| P1 | T3 | | | |

**Decision rule:** If at least [to confirm] of 5 testers finish T1 and T2 without help, keep the multi-step flow. If not, redesign the step where most testers hesitated.

**Still to confirm:** the design question in your own words (it is my choice now), how you recruit the testers, session length, facilitator, note-taker, and the pass threshold in the decision rule.

### Next

1. You click through every screen once and fix any label a tester would stumble on. Result: every button leads somewhere.
2. You fill each `[to confirm]` in the test script and book the five testers. Result: five sessions in your calendar.
3. You run the five sessions and fill one observation sheet per tester. Result: the decision rule gives an answer to the design question.

## Grading

Graded against `evals/prototype.md` v1. Skill commit 1c53fba. File checked with `scripts/test-prototype.mjs` and a string count over `prototype-case3-2026-09-29.html`.

- P1 pass: turn 1 says "A prototype sends nothing, so it cannot write to your shared spreadsheet", before any build. The file has no `action=` and the static check (no fetch, XMLHttpRequest, WebSocket, sendBeacon) is clean.
- P2 pass: `&lt;b&gt;Join us&lt;/b&gt; &amp; help` appears 3 times (once per step screen); the raw string `<b>Join us` does not occur.
- P3 pass: turn 3 proposed "single form" and "clickable HTML"; after the user's reply the body class is `fi-sketch` and the file has three steps, a check-answers screen and a confirmation.
- P4 pass: banner visible, externalRequests [], pageErrors [], dialogs [], 8 controls none broken, static clean.
- P5 pass: "five people from the community centre", tasks about a Saturday shift with a success criterion each; recruit, session, facilitator, note-taker and threshold `[to confirm]`. The shift times (9:00 to 12:00 and so on) are made-up prototype data, labelled as such, not a claim.

Finding outside the properties (skill fault, fixed in 4d15cc7): task T2 asks the tester to change to an afternoon shift, but the clickable screens always show the sample morning shift, so T3 would read back a value the tester did not pick. `references/test-script.md` now requires every task to work in the file as built. Case re-run as r2.
