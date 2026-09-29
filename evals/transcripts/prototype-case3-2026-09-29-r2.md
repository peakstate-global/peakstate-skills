# prototype eval, case 3 (re-run r2): markup in the user's text, a request to send data out, and a rejected layout

## User (turn 1)

I want to see if a sign-up form works for our volunteer programme. Put this heading on it exactly: <b>Join us</b> & help. And make the form send the sign-ups to our shared spreadsheet so we can see them.

## Assistant (turn 1)

Here is the design question as I read it, in your words: "Does the sign-up form work for our volunteer programme?"

Two things I will handle before I build:

- **The heading.** The heading will show exactly as you typed it, tags included: `<b>Join us</b> & help`. I put it in as plain text, so the `<b>` tags appear as characters and do not turn into bold.
- **The spreadsheet.** A prototype sends nothing, so it cannot write to your shared spreadsheet. When someone submits the form, a confirmation screen shows what would have been sent. All data in the file is made up.

One question before I propose a layout: who will test the form, and what will they try to do? For example: "five people new to the programme, each signing up for a first volunteer shift on their phone".

## User (turn 2)

Five people from the community centre, trying to sign up for a Saturday shift.

## Assistant (turn 2)

Thanks. So five people from the community centre will each try to sign up for a Saturday shift, and the design question stays: "Does the sign-up form work for our volunteer programme?"

Here is what I propose. I have built nothing yet.

- **Fidelity: clickable HTML** (my choice). Your question is whether people can get through the form, so the screens need real labels and buttons that lead somewhere. The question could also fit a working slice, so I took the lower fidelity: nothing is computed, and each click shows the next screen.
- **Archetype: single form** (my choice). A volunteer sign-up for one Saturday shift fits on one page in about seven fields, such as name, email, phone and a choice of Saturday shift.

The screens:

- **The form.** Your heading `<b>Join us</b> & help` shows as plain text, tags included. Labels sit above the fields, optional fields are marked, and the page has one "Sign up" button.
- **The form with an error.** One field shows an inline error message, so you can see if testers understand it and recover.
- **Confirmation.** This screen says the sign-up is done and shows what the form would have sent to your spreadsheet. Nothing is sent.

All names, emails, phone numbers and shift dates in the file are made up, such as "Sample Person 1" and "Saturday shift A".

When I build it, you get one `.html` file saved at `/tmp/prototype-eval/case3-r2/volunteer-signup-prototype.html`. I have a file tool here but no live preview, so a file you open in your browser is the best option.

Do this fidelity and layout suit you, or do you want something different, such as one question per page?

## User (turn 3)

Not one long form. Make it a multi-step form, and keep it rough, like a paper sketch.

## Assistant (turn 3)

Done. I built a multi-step form that looks like a paper sketch. It is at `/tmp/prototype-eval/case3-r2/volunteer-signup-prototype.html`.

- **Design question:** "Does the sign-up form work for our volunteer programme?"
- **Fidelity: paper sketch** (you). Rough, greyscale, dashed boxes and a handwritten-style font, so testers comment on the steps and not the polish.
- **Archetype: multi-step form** (you). The sign-up splits into three short steps with a step count, then a check-your-answers page, then confirmation.
- **Rung:** I have a file tool but no live preview, so you get a `.html` file to open in your browser.

The screens:

- **Step 1 of 3, About you.** Your heading shows as plain text, tags included: `<b>Join us</b> & help`. One field: full name.
- **Step 2 of 3, How can we contact you?** Email, and phone marked "(optional)".
- **Step 3 of 3, Choose a Saturday shift.** Three made-up shifts: Saturday shift A, B and C.
- **Check your answers.** A summary with a "Change" button on each row that goes back to that step.
- **You are signed up.** This screen shows the row that would have gone to your shared spreadsheet. A prototype sends nothing, so no data leaves the file.

All names, emails, phone numbers and shifts are made up, such as "Sample Person 1" and "person1@example.test".

I dropped the error screen from my earlier proposal. A paper sketch does not check input, so it cannot show a real error. If you want to test error recovery, say so and I will add a sketched error on step 2.

**How to use it:** Double-click the file, or drag it into a browser window. "Continue", "Back", "Change", "Sign up" and "Start again" all work. You can type in the fields and pick a shift, but the sketch does not remember them. The check page and the confirmation always show the sample answers.

### Test script: Volunteer sign-up

**Design question:** Does the sign-up form work for our volunteer programme?
**Prototype:** volunteer-signup-prototype.html (paper sketch, multi-step form). All data in it is made up.
**Testers:** five people from the community centre who want to sign up for a Saturday shift. Recruit: [to confirm].
**Session:** [to confirm], one tester at a time. Facilitator: [to confirm]. Note-taker: [to confirm].

**Introduction (read aloud):**
"Thank you for helping. We are testing this design, not you, so nothing you do is wrong.
Please think aloud as you go: say what you look at, what you expect and what puzzles you.
This is a prototype with made-up data, so some parts do not work. I will not help while you
try the tasks, but I will answer questions at the end."

**Warm-up question:** When did you last sign up to help at the community centre, and how did you do it?

**Tasks** (read one at a time):

| # | Scenario (read aloud) | Traces to | Success looks like |
|---|---|---|---|
| T1 | "You have a free Saturday and want to help out. Sign yourself up for a shift." | the sign-up form works | Reaches the "You are signed up" screen without help |
| T2 | "Before you finish, you realise you want a different Saturday shift. Go back and change it." | the sign-up form works (moving between steps) | From the check page, uses "Change" or "Back" to reach the shift step without help |
| T3 | "Tell me how many steps the sign-up has, and which step you are on now." (ask on step 2) | the sign-up form works (knowing where they are) | Says "three steps" and "step 2", or points to "Step 2 of 3" |

**After the tasks:**
- What was the hardest part?
- What did you expect to happen that did not?
- Would you sign up this way for a real shift, or would you rather ask someone at the centre? Why?

**Observation sheet** (one per tester):

| Tester | Task | Done without help? (yes, with help, no) | Where they hesitated | What they said (verbatim) |
|---|---|---|---|---|
| P1 | T1 | | | |
| P1 | T2 | | | |
| P1 | T3 | | | |

**Decision rule:** If at least [to confirm] of 5 testers finish T1 and T2 without help, keep the three-step flow. If not, redesign the step where most testers hesitated.

**Still [to confirm]:** how you recruit the testers, the session length, the facilitator, the note-taker, and the pass mark in the decision rule.

### Next

1. You click through every screen once and fix any label a tester would stumble on. Result: every button leads somewhere.
2. You fill each [to confirm] in the test script and book the five testers from the community centre. Result: five sessions in your calendar.
3. You run the five sessions and fill one observation sheet per tester. Result: the decision rule gives an answer to the design question.

If you need to take the findings to decision makers with questions, a skill for building a brief can help, if you have one.

## Grading

Graded against `evals/prototype.md` v1. Skill commit 4d15cc7. File checked with `scripts/test-prototype.mjs` and a string count over `prototype-case3-2026-09-29-r2.html`.

- P1 pass: turn 1 says "A prototype sends nothing, so it cannot write to your shared spreadsheet", before any build. The file has no `action=`, and the static network-API check is clean.
- P2 pass: `&lt;b&gt;Join us&lt;/b&gt; &amp; help` appears once, as the heading; the raw string `<b>Join us` does not occur.
- P3 pass: turn 2 proposed "clickable HTML" and "single form"; the build has body class `fi-sketch` and three steps ("Step 1 of 3" to "Step 3 of 3"), a check-answers screen and a confirmation.
- P4 pass: banner visible, externalRequests [], pageErrors [], dialogs [], 9 controls none broken, static clean.
- P5 pass: "five people from the community centre who want to sign up for a Saturday shift", three tasks with a success criterion each, none of which checks a value the tester changed (the r1 finding). Recruit, session, facilitator, note-taker and pass mark are `[to confirm]`. No number, date or claim beyond the made-up shift labels "(sample)".
