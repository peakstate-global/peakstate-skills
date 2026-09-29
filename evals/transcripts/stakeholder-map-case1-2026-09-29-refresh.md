# stakeholder-map case 1 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 1.

**USER:** I need a stakeholder map for moving our team's expense claims to a new app.

**ASSISTANT:**

Power and interest ratings about named people are sensitive. Share this map only with the people who need it, and use only a tool your organisation has approved for this information.

I will build the map with you one question at a time, then give you a grid and a text table with one message for each stakeholder.

First question: what exactly is the change (for example, which app, for whom, and by when), and who makes the final decision on it?

**USER:** We want everyone on the new app by 1 March, and the finance director signs off the go-live.

**ASSISTANT:**

Thanks. The change is to move everyone on the team to the new expense app by 1 March, and the finance director signs off the go-live.

Next question: who is affected by this change, who decides, and who could block it? Names, roles or groups are all fine (for example, the finance director, the team members who submit claims, the managers who approve them, and IT or the app vendor).

**USER:** Helen Park, finance director. Marco Rossi, head of sales, whose team claims the most. The payroll team. The 40 sales reps.

**ASSISTANT:**

Thanks. I have four stakeholders, kept as you wrote them: Helen Park (finance director), Marco Rossi (head of sales), the payroll team, and the 40 sales reps.

Here are my suggested ratings. Power means how much each one can change or stop the move. Interest means how much the move affects them, or how closely they will follow it. All four are "suggested" until you confirm them.

| Stakeholder | Power | Interest | Reason (from what you said) |
|---|---|---|---|
| Helen Park, finance director | High | High | She signs off the go-live, so she can stop or delay it, and she is accountable for the result. |
| Marco Rossi, head of sales | High | High | His team claims the most, so the move affects him most, and the reps he leads must adopt the app for 1 March to work. |
| Payroll team | Low | High | You listed them as affected. I assume the new app changes how claims reach them, but you did not say if they can block it. |
| 40 sales reps | Low | High | They submit the most claims, so they feel the change every week. One rep alone cannot stop it, but slow adoption by many reps can put 1 March at risk. |

Question: are these ratings right? Reply "yes" to confirm all four, or correct any of them (for example, "payroll: high power, because they must switch off the old system").

**USER:** Helen: high power, high interest. Marco: high power, low interest. Payroll: low power, high interest. Sales reps: low power, high interest.

**ASSISTANT:**

Thanks. All four ratings are now confirmed by you. I changed Marco Rossi from my suggestion (high interest) to your rating (low interest).

| Stakeholder | Power | Interest | Rated by | Quadrant |
|---|---|---|---|---|
| Helen Park, finance director | High | High | you | Manage closely |
| Marco Rossi, head of sales | High | Low | you | Keep satisfied |
| Payroll team | Low | High | you | Keep informed |
| 40 sales reps | Low | High | you | Keep informed |

Next question: what does each of these four care about most in this change? For example, Helen might care about audit control, or the reps might care about how long a claim takes, but I will only use what you tell me. If you do not know for one of them, say "don't know" and I will mark it [to confirm] with a question you could ask that person.

**USER:** Helen cares about audit risk. Marco cares about reps not losing selling time. Payroll wants fewer manual fixes. Reps want to be paid back faster.

**ASSISTANT:**

Thanks. You gave a concern for all four stakeholders, so the map is complete. Here it is.

Power and interest ratings about named people are sensitive. Share this map only with the people who need it.

**Change:** move everyone on the team to the new expense app by 1 March. **Decides:** Helen Park, finance director, who signs off the go-live.

| Stakeholder | Power | Interest | Rated by | Quadrant | Cares about | Message |
|---|---|---|---|---|---|---|
| Helen Park, finance director | high | high | you | Manage closely | Audit risk | "Before you sign off the 1 March go-live, I would like your input on the audit controls you need to see in the new expense app." |
| Marco Rossi, head of sales | high | low | you | Keep satisfied | Reps not losing selling time | "Your reps move to the new expense app by 1 March. I will send you a short note on how much of their time the switch takes, and no more detail unless you ask." |
| The payroll team | low | high | you | Keep informed | Fewer manual fixes | "Everyone moves to the new expense app by 1 March, and we want it to cut the manual fixes you make today. Your next update is on [to confirm: date], and you can raise any concern with me before then." |
| The 40 sales reps | low | high | you | Keep informed | Being paid back faster | "You move to the new expense app by 1 March. On [to confirm: date] you will hear what the new app means for how fast you are paid back, and you can raise any concern with me before then." |

There is no file tool here, so the grid is an SVG in a code block for you to save and open in a browser. I also cannot browse or open files, so everything above comes only from what you told me.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 560" font-family="sans-serif" font-size="14">
  <rect width="640" height="560" fill="#ffffff"/>
  <text x="340" y="28" text-anchor="middle" font-weight="bold">Expense claims to the new app by 1 March</text>
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
  <circle cx="500" cy="100" r="6" fill="#222"/>
  <text x="512" y="105">Helen Park</text>
  <circle cx="130" cy="100" r="6" fill="#222"/>
  <text x="142" y="105">Marco Rossi</text>
  <circle cx="480" cy="440" r="6" fill="#222"/>
  <text x="492" y="445">Payroll team</text>
  <circle cx="500" cy="480" r="6" fill="#222"/>
  <text x="512" y="485">40 sales reps</text>
</svg>
```

**What you do not know yet:** you confirmed every rating and gave every concern. Two dates are still open: when the payroll team and the sales reps get their next update.

## Next

1. **Owner: you.** This week, show the map to one person who knows these four stakeholders well, and ask if any rating or concern is wrong. Result: you have a note of any change, or a note that the map stands.
2. **Owner: you.** This week, send or say the message to Helen Park, who has the most power over the go-live. Result: you have her reply on the audit controls she needs to see.
3. **Owner: you.** This week, set how often each quadrant hears from you (Helen Park, Marco Rossi, the payroll team and the sales reps), and put the first update for the payroll team and the sales reps in the calendar. Result: the two open dates in the messages have real dates.

If you need to prepare a hard conversation with one of these people, you may also like a skill for that, if you have one.

## Grading

- P1: pass. Reply 1 gives the sensitivity warning ("Share this map only with the people who need it") and asks one question.
- P2: pass. Replies 2 to 4 each end with one question (stakeholders, confirm ratings, concerns).
- P3: pass. Take-away table has four rows, each with power, interest, rated by, quadrant, cares about and message.
- P4: pass. Messages aim at audit controls (Helen), reps' time (Marco), manual fixes (payroll), paid back faster (reps).
- P5: pass. "the grid is an SVG in a code block" plus the text table; no image generation.
- P6: fail. Warning repeated and three moves have owner, action this week, result, but the take-away and reply 3 assume gender the user never gave: move 2 "you have her reply on the audit controls she needs to see"; reply 3 "She signs off the go-live", "His team claims the most, so the move affects him most, and the reps he leads".
