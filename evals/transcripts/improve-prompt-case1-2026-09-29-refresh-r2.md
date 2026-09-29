# improve-prompt case 1 transcript, 2026-09-29 (refresh, re-run after fix)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: FIXED-improve-prompt (uncommitted fix on 7e9db4e). Eval version: 2.

**USER:** Improve this prompt: 'Summarise the attached quarterly sales report for the regional managers so they know what to focus on next quarter.'

**ASSISTANT:**

This prompt asks for a summary of a quarterly sales report that tells regional managers what to focus on next quarter.

```
Summarise the attached quarterly sales report for the regional managers so they know what to focus on next quarter.

Start with the three to five areas the regional managers should focus on next quarter, most important first. For each area, give one line on what the report shows and the figure that supports it. Then add a short list of any other results the regional managers should know about.

Write in plain English, in bullet points, at most one page. Use only the attached report. If a figure you need is not in the report, write [to confirm] and do not estimate it.

<report>
[to confirm: attach or paste the quarterly sales report here]
</report>
```

| Change | Why |
|---|---|
| Kept your first sentence as the opening line | It already states the task, the audience and the purpose, so the goal and context are clear (S1, S4) |
| Asked for focus areas first, ranked, each with its supporting figure | The purpose is deciding next quarter's focus, so the output leads with that and shows the evidence (S3) |
| Added format and length: plain English, bullet points, at most one page | Stated expectations shape the output (S3) |
| Added "use only the attached report" and the [to confirm] rule for missing figures | Names the source and stops invented numbers (S4) |
| Put the report between markers, after the instructions, with a placeholder | Separates the material from the instructions, and the report is not yet in this chat (S1, S2) |

Reply yes to run it, tell me what to change, or say no.

**USER:** Looks good but change it so the summary starts with a one-line overview sentence before the bullets.


**ASSISTANT:**

This is the same prompt with your change: the summary now opens with a one-line overview before the bullets.

```
Summarise the attached quarterly sales report for the regional managers so they know what to focus on next quarter.

Start with one sentence that gives an overview of the quarter. Then list the three to five areas the regional managers should focus on next quarter, most important first. For each area, give one line on what the report shows and the figure that supports it. Then add a short list of any other results the regional managers should know about.

Write in plain English, with the overview sentence first and the rest in bullet points, at most one page. Use only the attached report. If a figure you need is not in the report, write [to confirm] and do not estimate it.

<report>
[to confirm: attach or paste the quarterly sales report here]
</report>
```

| Change | Why |
|---|---|
| Added a one-sentence overview of the quarter before the focus areas | You asked for it, and it gives the regional managers the headline before the detail (Skill rule: user edit) |
| Changed the format line to "the overview sentence first and the rest in bullet points" | Keeps the format instruction consistent with the new opening, so the model does not turn the overview into a bullet (S3) |

Reply yes to run it, tell me what to change, or say no.

**USER:** Yes, run it.

**ASSISTANT:**

The quarterly sales report is not attached or pasted in this chat, so I cannot run the prompt without inventing figures, and I have not written a summary.

Next step: paste or attach the quarterly sales report, and I will run the confirmed prompt on its real numbers.


## Grading

- P1: pass. Code block plus a five-row change table with reasons; no run output.
- P2: pass. Ends with the confirm question; no clarifying question.
- P3: pass. Whole prompt again with "Start with one sentence that gives an overview of the quarter" before the bullets; confirm question; no run.
- P4: pass. After "Yes, run it." it says the report is not attached and writes no summary.
- Strict check: pass.
