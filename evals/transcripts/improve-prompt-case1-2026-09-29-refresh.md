# improve-prompt case 1 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 2.

**USER:** Improve this prompt: 'Summarise the attached quarterly sales report for the regional managers so they know what to focus on next quarter.'


**ASSISTANT:**

This prompt asks for a summary of a quarterly sales report that helps regional managers choose what to focus on next quarter.

```
Summarise the quarterly sales report below for the regional managers, so they know what to focus on next quarter.

Write at most five bullet points, most important first, in plain English. For each point, say what the report shows and what it means for next quarter's focus. Use only the report. If a number you need is missing, write [to confirm].

<report>
[to confirm: paste or attach the quarterly sales report here]
</report>
```

| Change | Why |
|---|---|
| Kept the task, the audience and the purpose in the first sentence | The goal and the reason let the model decide what matters (S1, S4) |
| Added length, order and plain English | Stated expectations shape the output (S3) |
| Asked for what the report shows and what it means for next quarter | Ties each point to the managers' decision, which is the stated purpose (S1) |
| Put the report between markers, after the instructions, with a placeholder | Separates the material from the instructions, and the report is not in the chat yet (S1, S2) |
| Added "use only the report" and a placeholder rule for missing numbers | Names the source and stops invented figures (S4) |

Reply yes to run it, tell me what to change, or say no.

**USER:** Looks good but change it so the summary starts with a one-line overview sentence before the bullets.


**ASSISTANT:**

Here is the prompt with a one-line overview added before the bullets.

```
Summarise the quarterly sales report below for the regional managers, so they know what to focus on next quarter.

Start with a one-line overview sentence. Then write at most five bullet points, most important first, in plain English. For each point, say what the report shows and what it means for next quarter's focus. Use only the report. If a number you need is missing, write [to confirm].

<report>
[to confirm: paste or attach the quarterly sales report here]
</report>
```

| Change | Why |
|---|---|
| Added a one-line overview sentence before the bullets | You asked for it. It gives the managers the headline before the detail, and a stated format shapes the output (S3) |

Reply yes to run it, tell me what to change, or say no.

**USER:** Yes, run it.


**ASSISTANT:**

The quarterly sales report is not in this chat, so I cannot write the summary without inventing figures.

[to confirm: paste or attach the quarterly sales report here]

Next step: paste or attach the quarterly sales report so the summary runs on the real figures.


## Grading

- P1: pass. Improved prompt in a code block and a five-row change table with reasons; no run output.
- P2: pass. Ends "Reply yes to run it, tell me what to change, or say no."; no clarifying question.
- P3: pass. Whole prompt shown again with "Start with a one-line overview sentence" before the bullets, confirm question again, no run output.
- P4: pass. After "Yes, run it." the reply says the report is not in the chat and writes no summary or figures.
- Strict check: pass.
