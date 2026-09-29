# improve-prompt eval, case 2: goal and audience not evident, then a rejection

Skill commit: 2a23071. Eval version 1. Runner: one fresh subagent per assistant turn, reading only the skill folder and this transcript.

## User (turn 1)

Make this prompt better: 'write something about the new leave policy'

## Assistant (turn 1)

Before I improve it, I need two things the prompt does not say:

- **Goal:** What is the piece for? For example, an announcement email, an intranet FAQ, or a summary for managers.
- **Audience:** Who will read it? For example, all staff, people managers, or new starters.

## User (turn 2)

It is an email to all staff. Your call on the rest.

## Assistant (turn 2)

This prompt asks for an email to all staff about the new leave policy.

```
You are helping an organisation write to its staff. Write an email to all staff that announces the new leave policy, so every reader knows what has changed, when it starts and what they need to do.

Use only the policy details below. Do not add any rule, date or number that is not in them. If a detail is missing, write [to confirm] in its place.

Write in plain English, in a clear and friendly tone. Keep it under 250 words. Give it a subject line, then:
1. One sentence on what is changing and when it starts.
2. The main changes, as short bullet points.
3. What staff need to do, if anything, and who to contact with questions.

<policy details>
[to confirm: paste the new leave policy or its key changes here]
[to confirm: the date the policy starts]
[to confirm: who staff contact with questions]
</policy details>
```

| Change | Why |
|---|---|
| Stated the task and its purpose in the first sentence | The goal tells the model what the output is for (S1, S4) |
| Named the audience: all staff | You gave this; context lets the model choose the right detail (S1) |
| Assumed goal: an email that announces the policy and tells staff what changes and what to do | You left this to me, so I picked the most likely reading. |
| Added a one-line role | Sets the register of an organisation writing to its own people (S1) |
| Added "use only the policy details" and the [to confirm] rule | Names the source and stops invented rules or dates (S4) |
| Added tone, length and a numbered structure | Stated expectations shape the output (S3) |
| Put the policy details between markers, after the instructions, as placeholders | You did not give the policy content, so it stays visible to fill in (S1, S2) |

Reply yes to run it, tell me what to change, or say no.

## User (turn 3)

No, don't run it. I'll stick with my own version.

## Assistant (turn 3)

Next step: if you keep your own version, the one change worth adding is "use only the policy details below, and write [to confirm] where a detail is missing", so the email does not invent rules or dates.
