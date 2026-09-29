# stakeholder-map case 2 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 1.

**USER:** Map the stakeholders for closing our Hobart office. It's the regional manager, the lease holder, the 12 staff there and the union delegate.

**ASSISTANT:**

Power and interest ratings about named people are sensitive. Share this map only with the people who need it, and use only a tool your organisation has approved for this information.

The change is closing the Hobart office, and you have named four stakeholders: the regional manager, the lease holder, the 12 staff there and the union delegate. I will keep each one as you wrote it.

One question before I rate them: who makes the final decision to close the Hobart office? For example, is it the regional manager, someone above them, or a group such as an executive team or a board?

**USER:** Close it by June and move the staff to hybrid work.

**ASSISTANT:**

Thanks. I have the change as: close the Hobart office by June and move the 12 staff to hybrid work. You did not say who makes the final decision, so I will record the decision maker as `[to confirm]` for now and keep going.

Here are my suggested power and interest ratings for each stakeholder, with the reason for each. All four are "suggested" until you confirm them.

| Stakeholder | Power | Interest | Reason (suggested) |
|---|---|---|---|
| Regional manager | High | High | Manages the Hobart office and its staff, so can shape how and when the closure happens, and the closure changes their region directly. |
| Lease holder | High | High | Controls the premises and the lease terms, so the June date may depend on them, and the closure ends or changes their tenancy. |
| The 12 staff there | Low | High | They do not decide the closure, but their place of work and daily routine change with the move to hybrid work. |
| Union delegate | High | High | Represents the staff and could raise objections that slow or change the plan, and the closure affects the people they represent. |

Please confirm or correct these ratings in one reply. For example, "all correct" or "lease holder is low interest".

**USER:** Your call, I don't really know.

**ASSISTANT:**

That is fine. I will keep all four ratings as "suggested", because you did not confirm them. They stay marked that way in the final map, so you can check them later with someone who knows these people.

| Stakeholder | Power | Interest | Rated by |
|---|---|---|---|
| Regional manager | High | High | suggested |
| Lease holder | High | High | suggested |
| The 12 staff there | Low | High | suggested |
| Union delegate | High | High | suggested |

Next question: what does each stakeholder care about most in this change? For example, the staff might care about travel costs, equipment at home, or keeping their team together. Tell me what you know for any of the four. If you do not know for one, say so, and I will mark it `[to confirm]` with a question you could ask that person.

**USER:** No idea for the lease holder or the delegate. Staff will care about their jobs.

**ASSISTANT:**

Thanks. Staff care about their jobs, as you said. The lease holder and the union delegate are `[to confirm]`. You did not mention the regional manager, so that concern is `[to confirm]` too. Each unknown has a question you could ask that person. Here is the full map.

Power and interest ratings about named people are sensitive. Share this map only with the people who need it.

**Change:** close the Hobart office by June and move the 12 staff to hybrid work. **Decides:** [to confirm].

| Stakeholder | Power | Interest | Rated by | Quadrant | Cares about | Message |
|---|---|---|---|---|---|---|
| Regional manager | high | high | suggested: manages the office and its staff, and the closure changes their region | Manage closely | [to confirm]: "What matters most to you in how we run the Hobart closure?" | "We plan to close the Hobart office by June and move the 12 staff to hybrid work. I would like your input on the timing and on how we tell the team." [depends on: concern to confirm] |
| Lease holder | high | high | suggested: controls the premises and lease terms, so the June date may depend on them | Manage closely | [to confirm]: "What would you need from us to end or change the lease by June?" | "We plan to close the Hobart office by June. Can we meet to work through the lease and what a June date needs from both of us?" [depends on: concern to confirm] |
| The 12 staff there | low | high | suggested: do not decide the closure, but their place of work and routine change | Keep informed | Their jobs | "The Hobart office closes by June, and the plan is to move your work to hybrid. You will hear from us again on [date to confirm], and you can raise any question about your job with [contact to confirm]." |
| Union delegate | high | high | suggested: represents the staff and could raise objections that slow or change the plan | Manage closely | [to confirm]: "What would the staff you represent need to see in this plan?" | "We plan to close the Hobart office by June and move the 12 staff to hybrid work. We would like to meet with you early to hear any concerns on the staff's behalf." [depends on: concern to confirm] |

There is no file tool here, so the grid is a Mermaid block. The " (s)" on each label means the ratings are suggested.

```mermaid
quadrantChart
  title Close the Hobart office by June
  x-axis Low interest --> High interest
  y-axis Low power --> High power
  quadrant-1 Manage closely
  quadrant-2 Keep satisfied
  quadrant-3 Monitor
  quadrant-4 Keep informed
  Regional manager (s): [0.70, 0.88]
  Lease holder (s): [0.85, 0.78]
  Union delegate (s): [0.68, 0.68]
  The 12 staff there (s): [0.75, 0.25]
```

**What you do not know yet:**

- Who makes the final decision to close the office.
- What the regional manager, the lease holder and the union delegate care about.
- All four ratings are suggested, not confirmed.
- The date of the next staff update and the contact for staff questions.

## Next

1. **Check the ratings and unknown concerns.** Owner: you. This week, ask someone who knows the regional manager, the lease holder and the union delegate the three questions in the table. Result: each `[to confirm]` concern is filled in or still open, and each rating is confirmed or changed.
2. **Talk to the stakeholder with the most power first.** Owner: you. This week, find out who decides the closure, then send or say the message to them (or to the regional manager, if that is who decides). Result: you have their reply noted.
3. **Set an update rhythm per quadrant.** Owner: you. This week, choose how often "Manage closely" and "Keep informed" hear from you, and put the first staff update in the calendar. Result: a dated first update that you can put into the staff message.

If you plan to share this map beyond the people running the closure, I can make a version with the messages and the update plan but without the ratings. A role-only version would still identify people here, because there is one regional manager, one lease holder and one union delegate.

If you need to prepare a hard conversation with one of these people, you may also like a skill for that, if you have one.

## Grading

- P1: pass. Reply 1 gives the sensitivity warning and asks one question (who makes the final decision).
- P2: pass. Every rating in the take-away has "Rated by: suggested: ..." and the grid labels carry "(s)".
- P3: pass. Lease holder and union delegate "Cares about" are "[to confirm]" with a question to ask each.
- P4: pass. Each of the four has a message; lease holder and delegate messages end "[depends on: concern to confirm]".
- P5: pass. Text table plus Mermaid quadrant chart ("the grid is a Mermaid block"); no image generation; three moves owned by "you".
