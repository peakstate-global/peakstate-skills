# stakeholder-map case 1 transcript, 2026-09-29 (refresh re-run r2)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e plus the uncommitted stakeholder-map gender fix. Eval version: 1.

**USER:** I need a stakeholder map for moving our team's expense claims to a new app.

**ASSISTANT:**

Power and interest ratings about named people are sensitive. Share this map only with the people who need it, and use only a tool your organisation has approved for this information.

Let's start with the change itself. In a sentence or two, what exactly is changing with the expense claims move (for example, which app you are leaving and which one you are moving to, and roughly when), and who makes the final decision on it?

**USER:** We want everyone on the new app by 1 March, and the finance director signs off the go-live.

**ASSISTANT:**

Thanks. So the change is moving the team's expense claims to a new app, with everyone on it by 1 March, and the finance director signs off the go-live.

Next, who is involved? List the people or groups who are affected by the move, who decide on it, and who could block it. Names, roles or groups are all fine, and I will keep each one as you write it.

**USER:** Helen Park, finance director. Marco Rossi, head of sales, whose team claims the most. The payroll team. The 40 sales reps.

**ASSISTANT:**

Thanks. That gives four stakeholders: Helen Park, Marco Rossi, the payroll team and the 40 sales reps.

Here are my suggested ratings, each with the reason from what you told me. All four are "suggested" until you confirm them.

| Stakeholder | Power | Interest | Reason |
|---|---|---|---|
| Helen Park, finance director | High | High | Signs off the go-live, so the move cannot happen without Helen, and owning the sign-off means following it closely. |
| Marco Rossi, head of sales | High | High | Leads the team that claims the most, so the move depends on Marco's team adopting it, and the change affects that team more than any other. |
| The payroll team | Low | High | You listed them as affected, but you have not said they can stop the move. I assume the change alters how claims reach them, which is my guess, not something you said. |
| The 40 sales reps | Low | High | They are the people who must be on the new app by 1 March, but no single rep decides or can block it alone. |

Do these ratings look right? Reply with any you want to change (for example, "payroll is high power because they control reimbursement"), or say they all stand.

**USER:** Helen: high power, high interest. Marco: high power, low interest. Payroll: low power, high interest. Sales reps: low power, high interest.

**ASSISTANT:**

Thanks. All four ratings are now marked "you", because you confirmed them. One changed from my suggestion: Marco Rossi is high power and low interest, not high interest.

| Stakeholder | Power | Interest | Rated by | Quadrant |
|---|---|---|---|---|
| Helen Park, finance director | High | High | you | Manage closely |
| Marco Rossi, head of sales | High | Low | you | Keep satisfied |
| The payroll team | Low | High | you | Keep informed |
| The 40 sales reps | Low | High | you | Keep informed |

Next, what does each stakeholder care about most in this move? For example, one thing each for Helen Park, Marco Rossi, the payroll team and the sales reps. If you do not know for one of them, say so, and I will mark it to confirm with a question you could ask them.

**USER:** Helen cares about audit risk. Marco cares about reps not losing selling time. Payroll wants fewer manual fixes. Reps want to be paid back faster.

**ASSISTANT:**

Thanks. That gives me everything I need, so here is the full map.

Power and interest ratings about named people are sensitive. Share this map only with the people who need it.

**Change:** move the team's expense claims to a new app, with everyone on it by 1 March. **Decides:** Helen Park, finance director, signs off the go-live.

| Stakeholder | Power | Interest | Rated by | Quadrant | Cares about | Message |
|---|---|---|---|---|---|---|
| Helen Park, finance director | high | high | you | Manage closely | Audit risk | "Before you sign off the go-live, I want your view on which audit checks the new app must pass, so we can test them with you before 1 March." |
| Marco Rossi, head of sales | high | low | you | Keep satisfied | Reps not losing selling time | "Your reps move to the new expense app by 1 March. Tell me if any timing would cut into selling time, and I will work around it." |
| The payroll team | low | high | you | Keep informed | Fewer manual fixes | "The new expense app goes live by 1 March. Tell me which manual fixes you make most often now, so we can check the new app against them, and you will hear from me again on [date to confirm]." |
| The 40 sales reps | low | high | you | Keep informed | Being paid back faster | "Expense claims move to a new app by 1 March, and one aim is to get your claims paid back faster. You will hear from me again on [date to confirm], and you can send me any question before then." |

There is no file tool here and I cannot open files, so the grid is an SVG in a code block for you to save as a .svg file.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 560" font-family="sans-serif" font-size="14">
  <rect width="640" height="560" fill="#ffffff"/>
  <text x="340" y="28" text-anchor="middle" font-weight="bold">Expense claims move to the new app</text>
  <rect x="60" y="40" width="280" height="240" fill="#fdf1e6" stroke="#222"/>
  <rect x="340" y="40" width="280" height="240" fill="#fbe0e0" stroke="#222"/>
  <rect x="60" y="280" width="280" height="240" fill="#f2f2f2" stroke="#222"/>
  <rect x="340" y="280" width="280" height="240" fill="#e6f0fb" stroke="#222"/>
  <text x="70" y="60" font-weight="bold">Keep satisfied</text>
  <text x="350" y="60" font-weight="bold">Manage closely</text>
  <text x="70" y="300" font-weight="bold">Monitor</text>
  <text x="350" y="300" font-weight="bold">Keep informed</text>
  <text x="340" y="548" text-anchor="middle">Interest: low to high</text>
  <text x="20" y="280" text-anchor="middle" transform="rotate(-90 20 280)">Power: low to high</text>
  <circle cx="420" cy="110" r="6" fill="#222"/>
  <text x="432" y="115">Helen Park</text>
  <circle cx="140" cy="110" r="6" fill="#222"/>
  <text x="152" y="115">Marco Rossi</text>
  <circle cx="420" cy="400" r="6" fill="#222"/>
  <text x="432" y="405">Payroll team</text>
  <circle cx="420" cy="450" r="6" fill="#222"/>
  <text x="432" y="455">40 sales reps</text>
</svg>
```

**What you do not know yet:** Nothing: you confirmed every rating and concern. The only open items are the two follow-up dates in the payroll and sales rep messages, marked [date to confirm].

## Next

1. **Owner: you.** This week, show the map to one person who knows these stakeholders well and note any rating or concern they would change. Result: a map checked by a second person, with any changes recorded.
2. **Owner: you.** This week, send or say Helen Park's message and ask which audit checks the new app must pass. Result: Helen's reply, and a list of audit checks to test before 1 March.
3. **Owner: you.** This week, set how often each quadrant hears from you (for example, Helen often, Marco briefly and periodically, payroll and the sales reps on a regular update), and put the first update in the calendar. Result: the two [date to confirm] dates filled in and a first update booked.

If you need to prepare a hard conversation with one of these people, you may also like a skill for that, if you have one.

## Grading

- P1: pass. Reply 1 gives the sensitivity warning ("Share this map only with the people who need it") and asks one question.
- P2: pass. Replies 2 to 4 each ask one thing (stakeholders, confirm ratings, concerns).
- P3: pass. Take-away table has four rows, each with power, interest, rated by, quadrant, cares about and message.
- P4: pass. Messages aim at audit checks (Helen), selling time (Marco), manual fixes (payroll), paid back faster (reps).
- P5: pass. "the grid is an SVG in a code block" plus the text table; no image generation.
- P6: pass. Warning repeated; three moves owned by "you", each with an action this week and a result; "[date to confirm]" only; no gendered pronoun in any reply ("Helen's reply", "Marco's team").
