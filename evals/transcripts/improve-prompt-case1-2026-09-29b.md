# improve-prompt eval transcript — Case 1: "looks good but change X" (re-run, eval-version 2)

Re-run after fixing the Case 1 edit fixture: the original edit request ("at most five
bullet points") duplicated a constraint already present in the worked example in
`references/take-away.md`, so it did not exercise the edit-and-redisplay loop. The new
edit request ("start with a one-line overview sentence before the bullets") is not in
the worked example.

Runner: fresh subagent, instructed with only `skills/improve-prompt/` (SKILL.md and its
references), no other context. Model: claude-sonnet-5.

---

**User:** "Improve this prompt: 'Summarise the attached quarterly sales report for the regional managers so they know what to focus on next quarter.'"

**Skill:** This prompt asks for a quarterly sales report summary for regional managers.

```
Summarise the quarterly sales report below for the regional managers. They will use it to decide what to focus on next quarter.

Write at most five bullet points, most important first, in plain English. Use only the report below. If a figure is missing, write [to confirm].

<report>
[to confirm: paste the quarterly sales report here]
</report>
```

| Change | Why |
|---|---|
| Named the audience and what they will do with the summary | Context lets the model choose what matters (S1) |
| Added length, order and style | Stated expectations shape the output (S3) |
| Put the report between markers, after the instructions | Separates the material from the instructions (S1, S2) |
| Added "use only the report" and a placeholder rule | Names the source and stops invented numbers (S4) |
| Added a placeholder for the report text | The prompt refers to an attached report that is not present in the chat | Skill rule |

Reply yes to run it, tell me what to change, or say no.

---

**User:** "Looks good but change it so the summary starts with a one-line overview sentence before the bullets."

**Skill:**

```
Summarise the quarterly sales report below for the regional managers. They will use it to decide what to focus on next quarter.

Start with one plain-English sentence giving the overall picture, then write at most five bullet points, most important first, in plain English. Use only the report below. If a figure is missing, write [to confirm].

<report>
[to confirm: paste the quarterly sales report here]
</report>
```

| Change | Why |
|---|---|
| Named the audience and what they will do with the summary | Context lets the model choose what matters (S1) |
| Added length, order and style | Stated expectations shape the output (S3) |
| Put the report between markers, after the instructions | Separates the material from the instructions (S1, S2) |
| Added "use only the report" and a placeholder rule | Names the source and stops invented numbers (S4) |
| Added a placeholder for the report text | The prompt refers to an attached report that is not present in the chat | Skill rule |
| Added a one-line overview sentence before the bullets | Requested edit | Skill rule |

Reply yes to run it, tell me what to change, or say no.

---

**User:** "Yes, run it."

**Skill:** The chat has no report attached, so this cannot run on real data — the report text was never supplied, only referred to.

Next step: paste the quarterly sales report so the summary can run on real numbers.

---

## Grading

- P1: pass — first reply shows the improved prompt in a code block and a change table with one row per change and a reason; no run output.
- P2: pass — first reply ends asking to confirm, edit or reject; no clarifying question asked (goal and audience were evident).
- P3: pass — after the edit request, the whole edited prompt is shown again in a code block with the one-line overview sentence added before the bullets, and confirmation is asked again; no run output.
- P4: pass — only after "Yes, run it." does a reply contain a run result, and it invents no sales figures — it states plainly that the report was not attached.
