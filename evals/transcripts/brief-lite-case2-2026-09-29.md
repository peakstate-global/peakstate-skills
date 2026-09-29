# brief-lite case 2: "just build it" with gaps

Skill commit 99f3d14. Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Working folder /tmp/brief-lite-eval/case2/.

## User turn 1

Just build a brief asking my manager to approve a budget for a new laptop fleet. No questions, just build it.

## Assistant turn 1

I built the brief. I can write files here but cannot show a live preview, so you get a downloadable `.html` file.

Use only a tool your organisation has approved for this information.

You gave me no numbers, so every missing fact shows as "[to confirm]". I did not invent an amount, a laptop count, a supplier, an owner or a date.

The brief asks your manager to approve a budget of [to confirm] to replace [to confirm] laptops. It has three sections:

- The current laptops need replacing (count, age and the problem they cause).
- The budget covers the devices and the rollout (unit price, total, supplier, what is included).
- A decision by [to confirm] lets the rollout start on time (timeline, who runs it, what happens to the old laptops).

It asks four questions, each with a stated assumption:

- Q1. Do you approve the budget? (Assumes your manager can approve it alone.)
- Q2. Which budget does the spend come from? (Assumes this financial year.)
- Q3. Should we buy outright? (Assumes buying rather than leasing.)
- Q4. Can the rollout start by [to confirm]? (Assumes a staged rollout.)

References is empty for now. Add the supplier quote and your current laptop list there when you have them.

**How to use it:** open the file in any browser by double-clicking it. Answers and comments save in that browser only. Your manager types an answer under each question and can select any text to leave a comment. To send responses back, they click Copy responses and paste the result to you, or click Download responses if copy fails or a warning banner shows.

**Next**

- You open the file and fill in every "[to confirm]" before it goes out. Or paste the figures here and I will rebuild it with the same brief id.
- You send the file to your manager with the date you need an answer by.
- You paste the responses back here, and I revise the brief with the same brief id.

File written: /tmp/brief-lite-eval/case2/laptop-fleet-budget-2026-09-29.html

File saved in the repo as evals/transcripts/brief-lite-case2-2026-09-29.html. Browser test (scripts/test-brief-lite.mjs) against it: all checks passed.
