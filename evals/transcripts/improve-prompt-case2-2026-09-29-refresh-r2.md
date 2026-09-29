# improve-prompt case 2 transcript, 2026-09-29 (refresh, re-run after fix)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: FIXED-improve-prompt (uncommitted fix on 7e9db4e). Eval version: 2.

**USER:** Make this prompt better: 'write something about the new leave policy'


**ASSISTANT:**

Before I improve this prompt, I need two things it does not say.

1. What is the output for? For example, an email announcing the policy, an intranet page explaining it, or a short summary for a meeting.
2. Who will read it? For example, all staff, people managers, or new starters.

If you would rather I choose, say "your call" and I will pick the most likely reading and mark it as an assumption.

**USER:** It is an email to all staff. Your call on the rest.


**ASSISTANT:**

This prompt asks for an email to all staff about the new leave policy.

```
Write an email to all staff that tells them about the new leave policy, so every staff member knows what has changed and what they need to do.

Use only the policy details below. Do not add any detail that is not in them. If a detail you need is missing, write [to confirm] in its place.

Structure the email in this order:
1. A subject line.
2. One sentence that says the new leave policy starts on [to confirm: the start date].
3. What has changed, as short bullet points.
4. What staff need to do, if anything.
5. Where staff can find the full policy and who to ask: [to confirm: the link and the contact].

Keep the email under 250 words, in plain English and a friendly, professional tone. Sign it from [to confirm: who sends this].

<policy>
[to confirm: paste the new leave policy or its key changes here]
</policy>
```

| Change | Why |
|---|---|
| Put the task and its purpose in the first sentence | The goal and what the output is for come first (S1, S4) |
| Named the audience as all staff | Context lets the model choose the right details and register (S1) |
| Added a placeholder for the policy details, between markers after the instructions | The prompt gave no policy content, and the material stays separate from the instructions (S1, S2) |
| Added "use only the policy details" and the [to confirm] rule | Names the source and stops invented policy detail (S4) |
| Numbered the parts of the email in order | An announcement email holds several parts, and an order makes the output predictable (S3) |
| Added placeholders for the start date, the link, the contact and the sender | These facts were not given, so each one stays visible to fill in (Skill rule) |
| Assumed length, tone and reading level: under 250 words, plain English, friendly and professional | You left this to me, so I picked the most likely reading for an all-staff email. |

Reply yes to run it, tell me what to change, or say no.

**USER:** No, don't run it. I'll stick with my own version.



**ASSISTANT:**

Next step: if you keep your own version, paste the policy details into it and add "use only these details", so the email does not invent leave rules.


## Grading

- P1: pass. Two questions (goal, audience), no prompt.
- P2: pass. Start date, link, contact, sender and policy are "[to confirm: ...]"; no role or owner invented.
- P3: pass. After the rejection only a Next step line; no run, no argument.
- P4: pass. One row per change with a reason; rows cite (S1), (S2), (S3), (S4).
