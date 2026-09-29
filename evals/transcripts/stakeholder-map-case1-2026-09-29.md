# stakeholder-map case 1 transcript, 2026-09-29

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: e490dea. Eval version: 1.

**USER:** I need a stakeholder map for moving our team's expense claims to a new app.

**ASSISTANT:**

Power and interest ratings about named people are sensitive. Share this map only with the people who need it, and use only a tool your organisation has approved for this information.

The change is clear: your team moves its expense claims to a new app. I will ask one question at a time, then build the grid, the table and one message for each stakeholder.

Who makes the final decision on this move? For example, it could be you, your manager, finance or a budget holder.

**USER:** We want everyone on the new app by 1 March, and the finance director signs off the go-live.

**ASSISTANT:**

Thanks. The change is moving your team's expense claims to the new app, with everyone on it by 1 March, and the finance director signs off the go-live.

Who is affected by this move, and who could block or slow it? Names, roles or groups are all fine, for example the staff who submit claims, the managers who approve them, finance or IT.

**USER:** Helen Park, finance director. Marco Rossi, head of sales, whose team claims the most. The payroll team. The 40 sales reps.


**ASSISTANT:**

Thanks. Here are my suggested ratings for each stakeholder. Each one is marked "suggested" until you confirm or correct it.

| Stakeholder | Power | Interest | Reason (from what you said) |
|---|---|---|---|
| Helen Park, finance director | high | high | She signs off the go-live, so she can stop or delay it. |
| Marco Rossi, head of sales | high | high | His team claims the most, so the move depends on his team taking it up. |
| The payroll team | low | high | You named them as affected, but they have no role in the sign-off. |
| The 40 sales reps | low | high | They are the biggest group of people who submit claims, and each one alone cannot stop the move. |

Are these ratings right? Confirm them all in one reply, or tell me which ones to change.

**USER:** Helen: high power, high interest. Marco: high power, low interest. Payroll: low power, high interest. Sales reps: low power, high interest.

**ASSISTANT:**

Thanks. All four ratings are now yours, and I have changed Marco to low interest.

| Stakeholder | Power | Interest | Rated by | Quadrant |
|---|---|---|---|---|
| Helen Park, finance director | high | high | you | Manage closely |
| Marco Rossi, head of sales | high | low | you | Keep satisfied |
| The payroll team | low | high | you | Keep informed |
| The 40 sales reps | low | high | you | Keep informed |

What does each of these stakeholders care about most in this move? If you do not know for someone, say so, and I will mark it to confirm with a question you could ask them.

**USER:** Helen cares about audit risk. Marco cares about reps not losing selling time. Payroll wants fewer manual fixes. Reps want to be paid back faster.


**ASSISTANT:**

Power and interest ratings about named people are sensitive. Share this map only with the people who need it, and use only a tool your organisation has approved for this information.

**Change:** move the team's expense claims to the new app, with everyone on it by 1 March. **Decides:** Helen Park, finance director, who signs off the go-live.

| Stakeholder | Power | Interest | Rated by | Quadrant | Cares about | Message |
|---|---|---|---|---|---|---|
| Helen Park, finance director | high | high | you | Manage closely | Audit risk | "Before you sign off the go-live, can we agree what the new app must show you on audit risk, so you can judge it on that?" |
| Marco Rossi, head of sales | high | low | you | Keep satisfied | Reps not losing selling time | "Your reps move their expense claims to the new app by 1 March. I will keep what we ask of them short, so they do not lose selling time." |
| The payroll team | low | high | you | Keep informed | Fewer manual fixes | "The move to the new app by 1 March aims to cut the manual fixes you make on claims. We will update you at [when: to confirm], and you can raise a concern with me at any time." |
| The 40 sales reps | low | high | you | Keep informed | Being paid back faster | "By 1 March you will submit your expense claims in the new app, which aims to pay you back faster. We will update you at [when: to confirm], and you can raise a concern with me at any time." |

I can write files here, so the grid is an SVG file: `/tmp/stakeholder-map-eval/case1/stakeholder-map.svg`. The same placement as text:

```text
                 Low interest            High interest
High power   | Keep satisfied:        | Manage closely:        |
             | Marco Rossi            | Helen Park             |
Low power    | Monitor:               | Keep informed:         |
             | (none)                 | Payroll team,          |
             |                        | 40 sales reps          |
```

**What you do not know yet:** you confirmed every rating and gave every concern. Two things are still open. First, how often the payroll team and the sales reps will hear from you, so the "[when: to confirm]" in their messages needs a date or a rhythm. Second, the messages say the app aims to cut manual fixes and pay reps back faster. Check that the app does both before you send those messages.

**Next**

1. **Owner: you.** This week, show the map to one person who knows Helen and Marco well, and ask if either rating is wrong. Result: a note of any change, or a note that there was none.
2. **Owner: you.** This week, send or say the message to Helen Park, who signs off the go-live. Result: her answer on what she needs to see on audit risk.
3. **Owner: you.** This week, set how often each quadrant hears from you, and put the first update to the payroll team and the sales reps in your calendar. Result: a dated first update in the calendar, and the "[when: to confirm]" in both messages filled in.

If you plan to share this map beyond the people running the move, I can make a version without the ratings, or with roles in place of names.


## Grading

- P1: pass. The first reply opens with the ratings warning and asks one question ("Who makes the final decision on this move?").
- P2: pass. Turns 2 to 4 each end with one question: who is affected, confirm the ratings, what each cares about.
- P3: pass. The take-away table has four rows, each with power, interest, rated by, quadrant, cares about and message.
- P4: pass. Messages address audit risk (Helen), selling time (Marco), manual fixes (payroll) and paying back faster (reps).
- P5: pass. "I can write files here, so the grid is an SVG file" plus the text grid; no image generation.
- P6: pass. The take-away repeats the warning; three moves each "Owner: you. This week, ... Result: ..."; no invented person or date.
