# brief-lite case 2 (refresh)

Skill commit 7e9db4e. Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/brief-lite/.

**USER:** Just build a brief asking my manager to approve a budget for a new laptop fleet. No questions, just build it.

**ASSISTANT:**

I built the brief now, as you asked. There is no live preview here, so I saved it as a file you can open: `/tmp/brief-lite-eval/case2/laptop-fleet-budget-2026-09-29.html`

Use only a tool your organisation has approved for this information.

**What is in it**

- **Title:** Approve a budget for a new laptop fleet.
- **The answer first:** "Please approve a budget of [to confirm] to replace [to confirm] laptops with a new fleet."
- **Three sections, each heading states its point:**
  - The current laptops need replacing because [to confirm] (how many, how old, what problems).
  - The new fleet costs [to confirm] in total (number of laptops, price each, supplier, what the total includes).
  - A decision by [to confirm] lets the rollout start on time (rollout plan, what happens to the old laptops).
- **Four questions for your manager, each with an answer box:**
  - Q1. Do you approve a budget of [to confirm] for a new laptop fleet?
  - Q2. Does anyone else need to approve or see this request, such as finance or IT?
  - Q3. Do you prefer to replace all the laptops at once, or in stages?
  - Q4. What else do you need to see before you decide?
- **References:** empty for now. You gave me no sources, so the brief says so. I did not invent any figures, dates or suppliers.

You did not give me the amount, the number of laptops, the reason, the supplier or the decision date. Every one of those shows as "[to confirm]". Fill them in before the brief goes out, or send me the facts and I rebuild it with the same file name.

**How it works**

- Open the file in any browser. It works offline and makes no external requests.
- Your manager types answers in the boxes and can select any text to add a comment. Answers and comments save in that browser only.
- To send answers back, your manager clicks **Copy responses** and pastes the result to you. If copy fails, or a red banner says the browser will not keep answers, they click **Download responses** and send you the `.json` file.

**Next**

1. You open the file and replace every "[to confirm]" before it goes out.
2. You send the file to your manager with the date you need an answer by.
3. You paste the responses back here, and I revise the brief with the same brief id.

## Grading
- P1 pass: first reply builds with zero questions, "I built the brief now, as you asked."
- P2 pass: HTML shows "Please approve a budget of [to confirm] to replace [to confirm] laptops", "The supplier is [to confirm]", "A decision by [to confirm]", References "No sources were given for this brief."; the only concrete items ("warranty, accessories or set-up", "finance or IT") are labelled as examples.
- P3 pass: "Q1. Do you approve a budget of [to confirm] for a new laptop fleet?" with a "Your answer" textarea, preceded by "My assumption: You can approve this amount within your own delegation."
- P4 pass: "Open the file in any browser" and "your manager clicks **Copy responses** and pastes the result to you ... they click **Download responses** and send you the `.json` file."

Triage:
