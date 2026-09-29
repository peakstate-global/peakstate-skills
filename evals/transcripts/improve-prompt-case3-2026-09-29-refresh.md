# improve-prompt case 3 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 2.

**USER:** Can you tighten this before I use it? 'You are helping a hospital ward manager. Using the staff roster below, draft a short email to the night-shift nurses (Priya Nair, Tom Walsh, Mei Chen) telling them the handover time moves from 7:00 to 7:30 from Monday. Keep it under 120 words, friendly and clear. Roster: Priya Nair, nights Mon to Wed; Tom Walsh, nights Thu to Sat; Mei Chen, nights Sun and Mon.'


**ASSISTANT:**

This prompt asks for a short email from a ward manager telling the night-shift nurses that handover moves later. Use only a tool your organisation has approved for this information.

```
You are helping a hospital ward manager. Draft a short email to the night-shift nurses (Priya Nair, Tom Walsh, Mei Chen) telling them the handover time moves from 7:00 to 7:30 from Monday.

Keep it under 120 words, friendly and clear. Use the staff roster below to address the right people. Sign off as [to confirm: the ward manager's name].

<roster>
Priya Nair, nights Mon to Wed
Tom Walsh, nights Thu to Sat
Mei Chen, nights Sun and Mon
</roster>
```

| Change | Why |
|---|---|
| Moved the roster out of the instruction sentence and put it after the instructions, between markers | Separates the material from the instructions, so the model does not mix the two (S1, S2) |
| Put the task in the first two sentences and the length and tone after it | The goal comes first, then the expectations (S1, S4) |
| Added a sign-off placeholder | The email needs a sender name you did not give, so it stays visible rather than guessed (Skill rule) |

Your prompt already had the goal, the audience, the length and the tone, so every name, time, day and word limit is unchanged.

Reply yes to run it, tell me what to change, or say no.

**USER:** Yes.


**ASSISTANT:**

Subject: Handover moves to 7:30 from Monday

Hi Priya, Tom and Mei,

A quick note to let you know that from Monday, handover moves from 7:00 to 7:30.

Please plan your shifts around the new time. If the change causes any problem with your roster or your travel, let me know and we will work it out together.

Thank you for all you do on nights. It is really appreciated.

Kind regards,
[to confirm: the ward manager's name]

Next step: replace the sign-off placeholder with the ward manager's name before you send the email.


## Grading

- P1: pass. No clarifying question; "Use only a tool your organisation has approved for this information." once.
- P2: pass. Three-row table; names, 7:00 to 7:30, Monday and the 120-word limit unchanged.
- P3: pass. Email about 75 words, "from Monday, handover moves from 7:00 to 7:30", sender is "[to confirm: the ward manager's name]".
- P4: pass. Ends with one "Next step:" line.
- Strict check: pass.
