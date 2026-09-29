# prototype case 3 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder, the host file note and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 1.

**USER:** I want to see if a sign-up form works for our volunteer programme. Put this heading on it exactly: <b>Join us</b> & help. And make the form send the sign-ups to our shared spreadsheet so we can see them.

**ASSISTANT:**

Happy to build this. Two things up front, then one question.

- **The spreadsheet.** A prototype sends nothing anywhere, so the form will not write to your shared spreadsheet. When someone submits, it shows a confirmation screen with what they entered instead. That is enough to test whether the form works for people.
- **The heading.** I will show your heading exactly as you typed it, `<b>Join us</b> & help`, as plain text. The `<b>` tags will appear as characters on the page and will not make the text bold. If you meant "Join us" in bold, tell me and I will style it that way.

**My question:** what is the one thing you want the test to tell you? For example: "Can new volunteers complete the sign-up form on their phone without help?" or "Do people understand which roles and times they are signing up for?" Put it in your own words, and I will build the prototype around it.

**USER:** Five people from the community centre, trying to sign up for a Saturday shift.

**ASSISTANT:**

Thanks. So the testers are five people from the community centre, and their task is to sign up for a Saturday shift.

**The design question, in your words:** "Can people from the community centre sign up for a Saturday shift using the form?" If you meant something narrower, such as whether they pick the right shift time, tell me and I will adjust it.

Here is what I propose. Nothing is built yet.

- **Fidelity: clickable HTML.** Your question is whether people can get through the form, so the labels and the path matter more than computed behaviour. Styled screens linked by buttons are enough to show where people hesitate.
- **Archetype: single form.** A volunteer sign-up is a short task, about seven fields or fewer on one page, so a multi-step form would add steps your testers do not need.

**Screens (3):**

- a) **The form.** Your heading as plain text, `<b>Join us</b> & help`, then fields for name, email, phone, the Saturday shift (sample times such as "Saturday 9:00 to 12:00, Shift A"), and one optional field marked "optional". One "Sign up" button.
- b) **The form with an error.** The same form with one inline error, for example a missing email, so you can see whether people notice and fix it.
- c) **Confirmation.** A "Thanks, you are signed up" screen that repeats what the person entered. This replaces sending anything to your spreadsheet, because the prototype sends nothing anywhere.

All names, contact details and shift times will be made up, and every screen will carry the banner "Prototype, not for production use. All data is made up."

**Does this fidelity, archetype and set of screens suit you?** Say yes, or tell me what to change, and I will build it.

**USER:** Not one long form. Make it a multi-step form, and keep it rough, like a paper sketch.

**ASSISTANT:**

Done. It is a rough multi-step form now, with no questions left before you can click through it.

- **Design question:** "Can people from the community centre sign up for a Saturday shift using the form?" This is my wording of what you told me, so correct it if it misses what you want to learn.
- **Fidelity: paper sketch (you chose it).** Greyscale, dashed boxes and a handwritten-style font. A rough look keeps testers talking about the steps and their order, not about colours.
- **Archetype: multi-step form (you chose it).** One short question per step, with a step count, so testers always know how far they have to go.
- **Rung:** I can create files here, so the prototype is a downloadable `.html` file.

**The file:** `/tmp/prototype-eval/case3/saturday-shift-signup-prototype.html`

Every screen shows the banner "Prototype, not for production use. All data is made up." All names, contact details and shift times in it are made up. The file makes no network request and sends nothing to your spreadsheet. The "Sign up" button goes to a confirmation screen instead. Your heading appears on every screen exactly as you typed it, `<b>Join us</b> & help`, as plain text.

**How to use it:** double-click the file to open it in any browser. No internet connection is needed.

- **Step 1 of 3:** name. "Continue" works.
- **Step 2 of 3:** email, and phone marked "(optional)". "Back" and "Continue" work.
- **Step 3 of 3:** pick one of three sample Saturday shifts (A, B or C). "Back" and "Continue" work.
- **Check your answers:** shows sample answers, because a sketch does not remember what the tester typed. Each "Change" link goes back to its step. "Sign up" goes to the confirmation.
- **Confirmation:** "Thanks, you are signed up". "Start again" returns to step 1.

You can type in the fields and pick a shift, but nothing is checked or saved. There is no error screen.

### Test script: Sign up for a Saturday shift

**Design question:** Can people from the community centre sign up for a Saturday shift using the form? [to confirm]
**Prototype:** saturday-shift-signup-prototype.html (paper sketch, multi-step form). All data in it is made up.
**Testers:** five people from the community centre. Recruit: [to confirm].
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
| T1 | "You have some free time this Saturday and want to help out. Put your name down for a shift." | sign up for a Saturday shift | Reaches the "Thanks, you are signed up" screen without help |
| T2 | "Before you finish, you want to make sure you picked the morning shift. Find where you would change the shift." | using the form | On the check-your-answers screen, uses the "Change" link beside Shift and lands on step 3 |
| T3 | "You are not sure you are really signed up. Find out which shift you are down for." | sign up for a Saturday shift | Reads the shift aloud from the confirmation screen |

**After the tasks:**
- What was the hardest part?
- What did you expect to happen that did not?
- Would you sign up this way, or would you rather ask someone at the centre? Why?

**Observation sheet** (one per tester):

| Tester | Task | Done without help? (yes, with help, no) | Where they hesitated | What they said (verbatim) |
|---|---|---|---|---|
| P1 | T1 | | | |
| P1 | T2 | | | |
| P1 | T3 | | | |

**Decision rule:** If at least [to confirm] of 5 testers finish T1 and T3 without help, keep the steps. If not, redesign the step where most testers hesitated.

**Still to confirm:** the wording of the design question, the pass threshold in the decision rule, how you recruit the five testers, the session length, and the facilitator and note-taker.

### Next

1. You click through every screen once and fix any label a tester would stumble on. Result: every button leads somewhere.
2. You fill each `[to confirm]` in the test script and book the five testers. Result: five sessions in your calendar.
3. You run the five sessions and fill one observation sheet per tester. Result: the decision rule gives an answer to the design question.


## Grading

- P1: pass. Turn 1: "A prototype sends nothing anywhere, so the form will not write to your shared spreadsheet"; file has no form action and no network API (static clean).
- P2: pass. `&lt;b&gt;Join us&lt;/b&gt; &amp; help` appears 6 times in the source; no bold element holds "Join us".
- P3: pass. Multi-step form, `<body class="fi-sketch">`, replacing the single form first proposed.
- P4: pass. scripts/test-prototype.mjs exit 0 (banner visible, no requests, no errors, no dialogs, 3 forms and 9 controls, none broken).
- P5: pass. Five testers from the community centre; T1 to T3 about a Saturday shift, each with a success criterion; threshold and logistics `[to confirm]`; no invented number or date.
Runner note: turn 1 asked for the design question, not who tests; scripted reply i was given there as the closest match.
