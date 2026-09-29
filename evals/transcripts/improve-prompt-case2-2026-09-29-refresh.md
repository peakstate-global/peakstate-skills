# improve-prompt case 2 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 2.

**USER:** Make this prompt better: 'write something about the new leave policy'


**ASSISTANT:**

Before I improve this prompt, I need two things it does not say yet:

- **Goal:** what should the output be, and what is it for? For example, an announcement email, an intranet summary, or an FAQ.
- **Audience:** who will read it? For example, all staff, people managers, or the HR team.

If you would rather I choose, say "your call" and I will pick the most likely reading and show it in the change table.

**USER:** It is an email to all staff. Your call on the rest.


**ASSISTANT:**

This prompt asks for an email to all staff about the new leave policy.

```
You are helping the HR team write an email to all staff about the new leave policy.

Write an email that tells staff what the new leave policy is, what changes for them, and when it starts. Use only the policy details below. If a detail is missing, write [to confirm] in its place.

Write it in plain English and a friendly, clear tone. Keep it under 250 words. Include:
1. A subject line.
2. One opening sentence that says the policy has changed.
3. The main changes, as short bullet points.
4. The start date.
5. Who to contact with questions.

<policy>
[to confirm: paste the new leave policy or its main points here]
</policy>

Start date: [to confirm: the date the policy starts]
Contact for questions: [to confirm: the person or team staff should contact]
```

| Change | Why |
|---|---|
| Said the output is an email to all staff, in the first sentence | Puts the task and its purpose first (S1, S4) |
| Added a role line for the HR team | Gives the email a point of view and a register (S1) |
| Assumed purpose: tell staff what changes and when it starts | You left this to me, so I picked the most likely reading. |
| Assumed tone and length: plain English, friendly, under 250 words | You left this to me, so I picked the most likely reading. |
| Numbered the parts of the email in order | Splits the task so each part comes in the right order (S3) |
| Put the policy between markers, after the instructions, and said to use only it | Separates the material from the instructions and names the source (S1, S2, S4) |
| Added placeholders for the policy, the start date and the contact | The prompt needs these facts and you did not give them, so nothing is guessed (Skill rule) |

Reply yes to run it, tell me what to change, or say no.

**USER:** No, don't run it. I'll stick with my own version.



**ASSISTANT:**

Next step: if you keep your own version, add "an email to all staff" to it, so the output is the right format for the right readers.


## Grading

- P1: pass. Two questions (goal, audience), no improved prompt.
- P2: FAIL. The improved prompt opens "You are helping the HR team write an email", an owner the user never gave, not a placeholder or an Assumed row. Skill fault: the method library's "Give a role" row did not say to use only a role the user gave. Fixed in references/method.md and the worked example in references/take-away.md; re-run as -r2.
- P3: pass. After the rejection, only a Next step line; no run, no argument.
- P4: pass. One row per change with a reason; several cite (S1) to (S4).
