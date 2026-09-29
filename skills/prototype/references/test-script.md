# Five-user test script

Five people find most of the problems a small test can find; test again after you fix them
(S1). Ask people to think aloud while they work (S4). Write tasks as short scenarios with a
goal and a reason, in the tester's words, never the words on the screen (S5).

Rules:

- Every task traces to the design question. A task that does not is cut.
- Every task has a success criterion someone can observe: what the tester does or says.
- Every task works in the file as built. A paper sketch or clickable file does not remember
  what the tester types or picks, so never ask the tester to check a value they changed.
- The decision rule says what result answers the design question. Use the user's threshold. If
  the user gave none, write the rule with `[to confirm]` in place of the number.
- Facilitator, dates, place, incentives and recording: use what the user said, or `[to confirm]`.
- Never promise anonymity or payment the user did not mention.

## Template

```md
### Test script: {{TITLE}}

**Design question:** {{THE QUESTION, in the user's words}}
**Prototype:** {{file name}} ({{fidelity}}, {{archetype}}). All data in it is made up.
**Testers:** five people who {{who tests it}}. Recruit: {{how, or [to confirm]}}.
**Session:** {{length, or [to confirm]}}, one tester at a time. Facilitator: {{name or [to confirm]}}. Note-taker: {{name or [to confirm]}}.

**Introduction (read aloud):**
"Thank you for helping. We are testing this design, not you, so nothing you do is wrong.
Please think aloud as you go: say what you look at, what you expect and what puzzles you.
This is a prototype with made-up data, so some parts do not work. I will not help while you
try the tasks, but I will answer questions at the end. {{Recording line from the user, or
delete this sentence}}"

**Warm-up question:** {{one question about how they do this today}}

**Tasks** (read one at a time):

| # | Scenario (read aloud) | Traces to | Success looks like |
|---|---|---|---|
| T1 | {{a goal and a reason, in the tester's words}} | {{part of the design question}} | {{what you observe}} |
| T2 | ... | ... | ... |

**After the tasks:**
- What was the hardest part?
- What did you expect to happen that did not?
- {{one question on the design question itself}}

**Observation sheet** (one per tester):

| Tester | Task | Done without help? (yes, with help, no) | Where they hesitated | What they said (verbatim) |
|---|---|---|---|---|
| P1 | T1 | | | |

**Decision rule:** {{what result answers the question, such as "If at least [to confirm] of 5
testers finish T1 without help, keep the layout; if not, redesign the step where most
hesitated."}}
```

In the observation sheet, type a `|` inside a cell as `\|` and write a line break as `<br>`,
so the table stays one row per tester and task.

## Worked example

The user said: "Can people renew a library book online without calling us? We'll test with
five library members." The user gave no time limit, facilitator or dates.

```md
### Test script: Renew a library book

**Design question:** Can people renew a library book online without calling us?
**Prototype:** renew-book.html (clickable HTML, multi-step form). All data in it is made up.
**Testers:** five people who are library members. Recruit: [to confirm].
**Session:** [to confirm], one tester at a time. Facilitator: [to confirm]. Note-taker: [to confirm].

**Introduction (read aloud):**
"Thank you for helping. We are testing this design, not you, so nothing you do is wrong.
Please think aloud as you go: say what you look at, what you expect and what puzzles you.
This is a prototype with made-up data, so some parts do not work. I will not help while you
try the tasks, but I will answer questions at the end."

**Warm-up question:** When did you last renew a book, and how did you do it?

**Tasks** (read one at a time):

| # | Scenario (read aloud) | Traces to | Success looks like |
|---|---|---|---|
| T1 | "You have a book due back soon and you have not finished it. Keep it for longer." | renew online | Reaches the confirmation screen without help |
| T2 | "Check the new date you need to return it by." | without calling us | Reads the new due date aloud from the screen |

**After the tasks:**
- What was the hardest part?
- What did you expect to happen that did not?
- Would you still call the library for this? Why?

**Observation sheet** (one per tester):

| Tester | Task | Done without help? (yes, with help, no) | Where they hesitated | What they said (verbatim) |
|---|---|---|---|---|
| P1 | T1 | | | |

**Decision rule:** If at least [to confirm] of 5 testers finish T1 and T2 without help, keep
the flow. If not, redesign the step where most testers hesitated.
```
