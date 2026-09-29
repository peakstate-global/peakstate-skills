# stakeholder-map case 2 transcript, 2026-09-29 (refresh re-run r2)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e plus the uncommitted stakeholder-map gender fix. Eval version: 1.

**USER:** Map the stakeholders for closing our Hobart office. It's the regional manager, the lease holder, the 12 staff there and the union delegate.

**ASSISTANT:**

Power and interest ratings about named people are sensitive. Share this map only with the people who need it, and use only a tool your organisation has approved for this information.

I have the change (closing the Hobart office) and four stakeholders: the regional manager, the lease holder, the 12 staff there, and the union delegate.

One question before I rate anyone: who makes the final decision to close the Hobart office? For example, is it the regional manager, someone above the regional manager, or a board?

**USER:** Close it by June and move the staff to hybrid work.

**ASSISTANT:**

Thanks. The change is now: close the Hobart office by June and move the 12 staff to hybrid work. Who makes the final decision is still open, so I will mark it `[to confirm]` on the map for now.

Here are my suggested ratings for each stakeholder. Each one is "suggested" until you confirm it.

| Stakeholder | Power | Interest | Reason (suggested) |
|---|---|---|---|
| Regional manager | high | high | The office is in their region, so they are likely to run or approve the closure. |
| Lease holder | high | low | They control the lease the office must exit by June, but the change touches them only through the lease. |
| The 12 staff | low | high | Their workplace changes to hybrid work, but they do not decide the closure. |
| Union delegate | high | high | They represent the staff and could slow or block the change. |

Are these ratings right? Reply in one message with any you want to change, for example "lease holder: high interest".

**USER:** Your call, I don't really know.

**ASSISTANT:**

That is fine. I will keep all four ratings as they are, and each one stays marked "suggested" on the map, so you can check them later with someone who knows these stakeholders.

| Stakeholder | Power | Interest | Rated by |
|---|---|---|---|
| Regional manager | high | high | suggested |
| Lease holder | high | low | suggested |
| The 12 staff | low | high | suggested |
| Union delegate | high | high | suggested |

Next question: what does each stakeholder care about most in this change? For example, the lease holder might care about the exit date or the terms of the lease. If you do not know for someone, say so, and I will mark that concern `[to confirm]` with a question you could ask them.

**USER:** No idea for the lease holder or the delegate. Staff will care about their jobs.

**ASSISTANT:**

Thanks. I will use "their jobs" for the staff as you said it. The lease holder and the union delegate are `[to confirm]`, and so is the regional manager, because we have not covered the regional manager's concern yet. Here is the full map.

Power and interest ratings about named people are sensitive. Share this map only with the people who need it, and use only a tool your organisation has approved for this information.

**Change:** close the Hobart office by June and move the 12 staff to hybrid work. **Decides:** [to confirm].

| Stakeholder | Power | Interest | Rated by | Quadrant | Cares about | Message |
|---|---|---|---|---|---|---|
| Regional manager | high | high | suggested: the office is in their region, so they are likely to run or approve the closure | Manage closely | [to confirm]: "What matters most to you in how we close the Hobart office?" | "The Hobart office closes by June and the 12 staff move to hybrid work. I want your input on the plan before we set the key dates." [depends on: concern to confirm] |
| Lease holder | high | low | suggested: they control the lease the office must exit by June | Keep satisfied | [to confirm]: "What do you need from us to end the lease by June?" | "We plan to leave the Hobart office by June. Please tell us what you need from us to end the lease on that timeline." [depends on: concern to confirm] |
| The 12 staff | low | high | suggested: their workplace changes, but they do not decide the closure | Keep informed | Their jobs | "The Hobart office closes by June, and your job moves to hybrid work. You will hear the next update on [date to confirm], and you can raise any concern with [contact to confirm]." |
| Union delegate | high | high | suggested: they represent the staff and could slow or block the change | Manage closely | [to confirm]: "What would you need to see in this plan to support it for your members?" | "The Hobart office closes by June and the 12 staff move to hybrid work. I want to hear your view on the plan early, before it is final." [depends on: concern to confirm] |

There is no file tool here, so the SVG is in a code block for you to save as a `.svg` file. "(s)" means the ratings are suggested.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 560" font-family="sans-serif" font-size="14">
  <rect width="640" height="560" fill="#ffffff"/>
  <text x="340" y="28" text-anchor="middle" font-weight="bold">Close the Hobart office by June</text>
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
  <circle cx="440" cy="110" r="6" fill="#222"/>
  <text x="452" y="115">Regional manager (s)</text>
  <circle cx="440" cy="170" r="6" fill="#222"/>
  <text x="452" y="175">Union delegate (s)</text>
  <circle cx="130" cy="120" r="6" fill="#222"/>
  <text x="142" y="125">Lease holder (s)</text>
  <circle cx="440" cy="400" r="6" fill="#222"/>
  <text x="452" y="405">The 12 staff (s)</text>
</svg>
```

**What you do not know yet:**

- Who makes the final decision to close the Hobart office.
- What the regional manager, the lease holder and the union delegate care about most.
- The date of the next update to staff, and who staff raise concerns with.
- All eight ratings (power and interest for each of the four stakeholders) are suggested, none confirmed.

**Next**

1. **Owner: you.** This week, show the map to one person who knows these stakeholders, such as the regional manager, and ask them to check the ratings and the three unknown concerns. Result: each rating is marked "you" or changed, with any change noted.
2. **Owner: you.** This week, find out who decides the closure and send that person their message. If it is the regional manager, send the message above. Result: you have their reply noted.
3. **Owner: you.** This week, set how often each quadrant hears from you (for example, the regional manager and union delegate often, the lease holder at key lease steps, staff on a fixed schedule), and put the first staff update in the calendar. Result: the first update is booked.

If you plan to share this map beyond the people running the closure, tell me and I will make a version with the messages and the plan but without the ratings. A version with roles only would still identify the regional manager and the union delegate, because each role is held by one person.

## Grading

- P1: pass. Reply 1 gives the sensitivity warning and asks one question (who makes the final decision).
- P2: pass. Every rating in the take-away is "suggested: ..." and every grid label carries "(s)"; "You have confirmed none of them."
- P3: pass. Lease holder and union delegate "Cares about" are "[to confirm]" with a question to ask each.
- P4: pass. Each of the four has a message; lease holder and delegate messages end "[depends on: concern to confirm]".
- P5: pass. Text table plus SVG ("the SVG is in a code block"); no image generation; three moves owned by "you".
