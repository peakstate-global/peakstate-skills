# improve-prompt eval, case 3: a strong prompt, few changes, sensitive input

Skill commit: 2a23071. Eval version 1. Runner: one fresh subagent per assistant turn, reading only the skill folder and this transcript.

## User (turn 1)

Can you tighten this before I use it? 'You are helping a hospital ward manager. Using the staff roster below, draft a short email to the night-shift nurses (Priya Nair, Tom Walsh, Mei Chen) telling them the handover time moves from 7:00 to 7:30 from Monday. Keep it under 120 words, friendly and clear. Roster: Priya Nair, nights Mon to Wed; Tom Walsh, nights Thu to Sat; Mei Chen, nights Sun and Mon.'

## Assistant (turn 1)

This prompt asks for a short email from a ward manager telling three night-shift nurses about a new handover time. It holds staff names and roster details, so use only a tool your organisation has approved for this information.

Your prompt already works well: it gives a role, the goal, the audience, the change, and a length and tone. I made two small changes.

```
You are helping a hospital ward manager. Using the staff roster below, draft a short email to the night-shift nurses (Priya Nair, Tom Walsh, Mei Chen) telling them the handover time moves from 7:00 to 7:30 from Monday. Keep it under 120 words, friendly and clear. Sign the email as [to confirm: the ward manager's name].

<roster>
Priya Nair, nights Mon to Wed
Tom Walsh, nights Thu to Sat
Mei Chen, nights Sun and Mon
</roster>
```

| Change | Why |
|---|---|
| Put the roster after the instructions, between `<roster>` markers | Separates the material from the instructions, so the model does not read the roster as part of the task (S1, S2) |
| Added a sign-off line with a placeholder for the manager's name | A colleague would ask who the email is from; the name was not given, so it stays a placeholder rather than a guess (S1) |

Reply yes to run it, tell me what to change, or say no.

## User (turn 2)

Yes.

## Assistant (turn 2)

Subject: Handover time changes from Monday

Hi Priya, Tom and Mei,

From Monday, the night-shift handover moves from 7:00 to 7:30.

Please plan your shifts around the new time. If the change causes a problem with your roster, let me know and we will work it out together.

Thank you for everything you do on nights.

Kind regards,
[to confirm: the ward manager's name]

Next step: replace the placeholder with the ward manager's name before you send the email.
