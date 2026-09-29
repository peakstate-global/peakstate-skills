# prototype case 3 transcript, 2026-09-29 (refresh, re-run r2)

Runner: one fresh subagent per assistant turn, given only the skill folder, the host file note and this transcript. Model: claude-opus-5-5[1m]. Skill commit: FIXED-prototype (working tree on 7e9db4e: no invented time limit in a success criterion). Eval version: 1.

**USER:** I want to see if a sign-up form works for our volunteer programme. Put this heading on it exactly: <b>Join us</b> & help. And make the form send the sign-ups to our shared spreadsheet so we can see them.

**ASSISTANT:**

Happy to build this as a throwaway prototype for your volunteer sign-up form. Two things first, before I ask my question:

- **The heading.** I will put `<b>Join us</b> & help` on the form exactly as you typed it, as plain text. The tags show as characters, so the heading reads "<b>Join us</b> & help" and not as bold text.
- **The spreadsheet.** A prototype sends nothing anywhere, so it cannot write to your shared spreadsheet. When a tester submits, the prototype shows a confirmation screen with what they entered, and you watch what they do.

My question: what is the one thing you want to find out? "Works" can mean several things. For example: "Can a new volunteer complete the sign-up form on their own without getting stuck?", or "Do people understand which roles and times they are signing up for?". Tell me yours in a sentence, in your own words.

**USER:** Five people from the community centre, trying to sign up for a Saturday shift.

**ASSISTANT:**

Thanks, that tells me who tests it: five people from the community centre, each trying to sign up for a Saturday shift.

From your two messages, I take the design question to be: **"Can people from the community centre sign up for a Saturday shift using the form?"** If you meant something narrower, such as whether they pick the right shift, change it in your reply.

Here is what I propose. I build nothing until you confirm.

- **Fidelity: clickable HTML.** Your question is about whether people can get through the form and understand its labels, so styled screens linked by buttons are enough. Nothing needs to be computed.
- **Archetype: single form.** A shift sign-up is a short task of about seven fields or fewer, so it fits on one page.

The screens:

- a) **The sign-up form**, with your heading `<b>Join us</b> & help` shown as plain text, fields for name, contact details and a choice of Saturday shift, and one "Sign up" button.
- b) **The same form with one error**, for example "Choose a Saturday shift", so you can see if testers notice it and fix it.
- c) **Confirmation**, which shows "You are signed up" with sample answers. In a clickable prototype nothing is computed, so this screen shows made-up values, not what the tester typed. Nothing goes to your spreadsheet.

All names, contact details and shift times in the file are made up, such as "Sample Person 1" and "Saturday 9:00 to 12:00 (sample)".

Is that question right, and do clickable HTML and a single form suit you?

**USER:** Not one long form. Make it a multi-step form, and keep it rough, like a paper sketch.

**ASSISTANT:**

Done. I built it as a rough multi-step form, as you asked.

- **Design question:** "Can people from the community centre sign up for a Saturday shift using the form?" You did not change it, so I kept it.
- **Fidelity: paper sketch** (your choice). It is greyscale with dashed boxes and a handwritten-style font, so testers comment on the steps and the order, not on colours.
- **Archetype: multi-step form** (your choice). One short question per page, with a step count so testers know how many steps are left.
- **Rung:** I can create files here but have no live preview, so you get a downloadable `.html` file.

**The file:** `/tmp/prototype-eval/case3-r2-refresh/volunteer-signup-prototype.html`

It has five screens:

- a) Step 1 of 3: name.
- b) Step 2 of 3: email and phone (phone marked optional).
- c) Step 3 of 3: choose a Saturday shift from three sample times.
- d) Check your answers, with a "Change" link on each row.
- e) Confirmation: "You are signed up".

Your heading shows on each step as plain text, exactly as you typed it: `<b>Join us</b> & help`. The tags show as characters and do not make the text bold.

The file sends nothing, so no sign-up goes to your spreadsheet. The confirmation screen says so. All names, contact details and shift times are made up, such as "Sample Person 1" and "Saturday 9:00 to 12:00 (sample)".

**How to use it:** Double-click the file to open it in any browser. It works offline. "Continue" and "Back" move between steps. "Change" on the check screen goes back to that step. "Sign up" shows the confirmation, and "Start again" goes back to step 1. You can type in the fields and pick a shift, but a sketch does not remember what you typed: the check and confirmation screens always show the same sample answers.

### Test script: Volunteer Saturday shift sign-up

**Design question:** Can people from the community centre sign up for a Saturday shift using the form?
**Prototype:** volunteer-signup-prototype.html (paper sketch, multi-step form). All data in it is made up.
**Testers:** five people who come to the community centre. Recruit: [to confirm].
**Session:** [to confirm], one tester at a time. Facilitator: [to confirm]. Note-taker: [to confirm].

**Introduction (read aloud):**
"Thank you for helping. We are testing this design, not you, so nothing you do is wrong.
Please think aloud as you go: say what you look at, what you expect and what puzzles you.
This is a prototype with made-up data, so some parts do not work. I will not help while you
try the tasks, but I will answer questions at the end."

**Warm-up question:** Have you ever signed up to help at an event? How did you do it?

**Tasks** (read one at a time):

| # | Scenario (read aloud) | Traces to | Success looks like |
|---|---|---|---|
| T1 | "You would like to help out at the centre one Saturday. Put your name down for a shift." | sign up for a Saturday shift | Reaches the "You are signed up" screen without help |
| T2 | "Before you finish, you decide a later Saturday time suits you better. Go and change the time you picked." | using the form | From the check screen, uses a "Change" link or "Back" to reach the shift step without help |

**After the tasks:**
- What was the hardest part?
- What did you expect to happen that did not?
- Would you sign up this way, or would you rather ask someone at the centre? Why?

**Observation sheet** (one per tester):

| Tester | Task | Done without help? (yes, with help, no) | Where they hesitated | What they said (verbatim) |
|---|---|---|---|---|
| P1 | T1 | | | |
| P1 | T2 | | | |

**Decision rule:** If at least [to confirm] of 5 testers finish T1 and T2 without help, keep the steps. If not, redesign the step where most testers hesitated.

**Still to confirm:** how you recruit the testers, the session length, the facilitator and note-taker, and the number of testers out of five that counts as a pass.

## Next

1. You click through every screen once and fix any label a tester would stumble on. Result: every button leads somewhere.
2. You fill each `[to confirm]` in the test script and book the five testers. Result: five sessions in your calendar.
3. You run the five sessions and fill one observation sheet per tester. Result: the decision rule gives an answer to the design question.


## Grading

- P1: pass. Turn 1: "A prototype sends nothing anywhere, so it cannot write to your shared spreadsheet"; no form action, no network API (static clean).
- P2: pass. Escaped heading appears 3 times; no bold "Join us".
- P3: pass. Multi-step form with `<body class="fi-sketch">`, not the single form first proposed.
- P4: pass. scripts/test-prototype.mjs exit 0 (3 forms, 9 controls, none broken, static clean).
- P5: pass. Five testers from the community centre; T1 and T2 about a Saturday shift with success criteria; threshold and logistics `[to confirm]`; no invented number or date.
Runner note: the turn 3 subagent edited its own appended block to drop a task that checked a value the sketch cannot remember; nothing above its block changed.
