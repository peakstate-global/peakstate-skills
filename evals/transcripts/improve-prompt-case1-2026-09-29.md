# improve-prompt eval, case 1: "looks good but change X"

Skill commit: 2a23071. Eval version 1. Runner: one fresh subagent per assistant turn, reading only the skill folder and this transcript.

## User (turn 1)

Improve this prompt: 'Summarise the attached quarterly sales report for the regional managers so they know what to focus on next quarter.'

## Assistant (turn 1)

This prompt asks for a summary of a quarterly sales report that tells the regional managers what to focus on next quarter.

```
Summarise the quarterly sales report below for the regional managers. They will use the summary to decide what to focus on next quarter.

Write at most five bullet points in plain English, most important first. Each bullet names one area to focus on and the result in the report that supports it. Use only the report. If a number you need is not in the report, write [to confirm].

<report>
[to confirm: paste the quarterly sales report here]
</report>
```

| Change | Why |
|---|---|
| Said what the managers will do with the summary, in the first two sentences | Stating the goal and the audience lets the model choose what matters (S1, S4) |
| Added length, order and plain English | Stated expectations shape the output (S3) |
| Asked each bullet to link a focus area to a result in the report | Makes "what to focus on" checkable against the report (S3) |
| Put the report between markers, after the instructions | Separates the material from the instructions (S1, S2) |
| Added "use only the report" and a placeholder rule | Names the source and stops invented numbers (S4) |

Reply yes to run it, tell me what to change, or say no.

## User (turn 2)

Looks good but change it so the summary is at most five bullet points.

## Assistant (turn 2)

The prompt already limits the summary to at most five bullet points, in the first line of the second paragraph, so I have left the wording as it is. Here is the whole prompt again.

```
Summarise the quarterly sales report below for the regional managers. They will use the summary to decide what to focus on next quarter.

Write at most five bullet points in plain English, most important first. Each bullet names one area to focus on and the result in the report that supports it. Use only the report. If a number you need is not in the report, write [to confirm].

<report>
[to confirm: paste the quarterly sales report here]
</report>
```

| Change | Why |
|---|---|
| No change for this request | "Write at most five bullet points" is already the first instruction after the goal, so a stated length limit is in place (S3) |

Reply yes to run it, tell me what to change, or say no.

## User (turn 3)

Yes, run it.

## Assistant (turn 3)

I cannot run the summary yet: the quarterly sales report is not in this chat, so the prompt still holds the placeholder `[to confirm: paste the quarterly sales report here]` and I have written no bullet points rather than invent sales results.

Next step: paste the quarterly sales report into the chat so the summary runs on the real numbers.
