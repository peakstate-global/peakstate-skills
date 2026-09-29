# stakeholder-map case 2 transcript, 2026-09-29

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: e490dea. Eval version: 1.

**USER:** Map the stakeholders for closing our Hobart office. It's the regional manager, the lease holder, the 12 staff there and the union delegate.

**ASSISTANT:**

Power and interest ratings about named people are sensitive. Share this map only with the people who need it, and use only a tool your organisation has approved for this information.

The change is closing the Hobart office, and I have four stakeholders from you: the regional manager, the lease holder, the 12 staff there and the union delegate. I will keep each one as you wrote it.

Who makes the final decision to close the Hobart office?

**USER:** Close it by June and move the staff to hybrid work.

**ASSISTANT:**

Thank you. The change is now: close the Hobart office by June and move the 12 staff to hybrid work. You did not say who makes the final decision, so I will show "Decides" as `[to confirm]` on the map. Tell me at any time and I will add it.

Here are my suggested ratings for each stakeholder. Each one is "suggested" until you confirm it.

| Stakeholder | Power | Interest | Why I suggest this |
|---|---|---|---|
| Regional manager | high | high | Runs the region that holds the office, so can shape or slow the closure, and the result lands on their team. |
| Lease holder | high | low | The lease terms can decide whether a June exit is possible and what it costs, but the move to hybrid work does not affect them. |
| The 12 staff there | low | high | They lose their workplace and change how they work, but they do not decide the closure. |
| Union delegate | high | high | Can raise consultation duties or a dispute that delays the June date, and speaks for the staff on the change. |

Are these ratings right? Confirm them, or correct any power or interest rating in one reply.

**USER:** Your call, I don't really know.

**ASSISTANT:**

That is fine. I will keep all four ratings as I suggested them, and each one stays marked "suggested" on the map, so you can check them later with someone who knows these people.

| Stakeholder | Power | Interest | Rated by |
|---|---|---|---|
| Regional manager | high | high | suggested |
| Lease holder | high | low | suggested |
| The 12 staff there | low | high | suggested |
| Union delegate | high | high | suggested |

What does each stakeholder care about most in closing the Hobart office and moving to hybrid work? If you do not know for one of them, say so, and I will mark that concern `[to confirm]` with a question you could ask them.

**USER:** No idea for the lease holder or the delegate. Staff will care about their jobs.


**ASSISTANT:**

Thank you. I have used "their jobs" for the staff as you gave it. The lease holder and the union delegate are `[to confirm]`. You did not name a concern for the regional manager, so that one is `[to confirm]` too. Here is the full map.

Power and interest ratings about named people are sensitive. Share this map only with the people who need it, and use only a tool your organisation has approved for this information.

**Change:** close the Hobart office by June and move the 12 staff to hybrid work. **Decides:** [to confirm].

| Stakeholder | Power | Interest | Rated by | Quadrant | Cares about | Message |
|---|---|---|---|---|---|---|
| Regional manager | high | high | suggested: runs the region that holds the office, so can shape or slow the closure, and the result lands on their team | Manage closely | [to confirm]: "What would make this closure work for you and your region?" | "We plan to close the Hobart office by June and move the 12 staff to hybrid work. Can we meet to agree the steps and the timing with you?" [depends on: concern to confirm] |
| Lease holder | high | low | suggested: the lease terms can decide whether a June exit is possible and what it costs | Keep satisfied | [to confirm]: "What do you need from us to end or change the lease by June?" | "We plan to leave the Hobart office by June. Please tell us what the lease needs from us to do that." [depends on: concern to confirm] |
| The 12 staff there | low | high | suggested: they lose their workplace and change how they work, but do not decide the closure | Keep informed | Their jobs | "The Hobart office closes by June, and the plan is to move all 12 of you to hybrid work. You will hear from us again on [to confirm: date of next update], and you can raise a concern with [to confirm: contact person] at any time." |
| Union delegate | high | high | suggested: can raise consultation duties or a dispute that delays the June date, and speaks for the staff | Manage closely | [to confirm]: "What must happen for you to support this change for your members?" | "We plan to close the Hobart office by June and move the 12 staff to hybrid work. Before we set the steps, we want your input on how we consult the staff." [depends on: concern to confirm] |

I can write files here, so the grid is an SVG file: `/tmp/stakeholder-map-eval/case2/hobart-office-grid.svg`. The text grid below shows the same positions. "(s)" marks a suggested rating.

```text
                 Low interest            High interest
High power   | Keep satisfied:        | Manage closely:          |
             | Lease holder (s)       | Regional manager (s)     |
             |                        | Union delegate (s)       |
Low power    | Monitor:               | Keep informed:           |
             | (none)                 | The 12 staff there (s)   |
```

**What you do not know yet:**

- Who decides the closure.
- What the regional manager, the lease holder and the union delegate care about.
- The date of the next staff update, and who staff contact with a concern.
- All eight power and interest ratings are suggested. No rating is confirmed yet.

## Next

1. **Owner: you.** This week, show the map to one person who knows these four stakeholders, such as the regional manager, and ask them to check each suggested rating. Result: each rating is marked "you" or changed, and you note the changes.
2. **Owner: you.** This week, send the union delegate their message and ask the `[to confirm]` question. The union delegate is rated high power, so their reply can change the June date. Result: you have the delegate's reply and their concern in writing.
3. **Owner: you.** This week, set how often each quadrant hears from you, and put the first staff update in the calendar. Result: the staff message has a real date in place of `[to confirm]`.

If you want to prepare a hard conversation with one of these people, such as the union delegate, you may have a separate skill for that.


## Grading

- P1: pass. The first reply opens with the ratings warning and asks one question (who decides).
- P2: pass. After "Your call", every row reads "suggested: ..." and the take-away says "No rating is confirmed yet."
- P3: pass. Lease holder and union delegate concerns are "[to confirm]" with a question to ask each.
- P4: pass. All four have a message; lease holder, delegate and regional manager messages end "[depends on: concern to confirm]".
- P5: pass. Table, SVG file named with the rung, text grid, no image generation; three moves with owner "you".
