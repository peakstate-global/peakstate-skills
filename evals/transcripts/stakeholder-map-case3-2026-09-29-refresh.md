# stakeholder-map case 3 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 1.

**USER:** Skip the questions and just give me the power and interest grid for our CRM upgrade: Nina Shah (CIO), Tom Baker (sales ops lead), the customer service team, and the external implementation partner.

**ASSISTANT:**

Power and interest ratings about named people are sensitive. Share this map only with the people who need it, and use only a tool your organisation has approved for this information.

You asked me to skip the questions, so this is the whole map in one pass. You gave me names and roles only, so every rating below is "suggested", every concern is `[to confirm]`, and every message rests on the change itself.

**Change:** the CRM upgrade. **Decides:** [to confirm].

| Stakeholder | Power | Interest | Rated by | Quadrant | Cares about | Message |
|---|---|---|---|---|---|---|
| Nina Shah (CIO) | high | high | suggested: as CIO, a system upgrade sits in her portfolio and she can likely approve or stop it | Manage closely | [to confirm]: "What would make this upgrade a success for you?" | "The CRM upgrade is under way, and I want your input on the key choices before we lock them in." [depends on: concern to confirm] |
| Tom Baker (sales ops lead) | low | high | suggested: sales ops works in the CRM every day, but you did not say he holds decision rights | Keep informed | [to confirm]: "What does sales ops need the upgraded CRM to do that it does not do now?" | "The CRM upgrade will change the system your team works in. I will update you at each step, and you can raise any concern with me directly." [depends on: concern to confirm] |
| Customer service team | low | high | suggested: the team likely uses the CRM daily, so the upgrade changes their work | Keep informed | [to confirm]: "What part of the CRM matters most to how you serve customers?" | "The CRM you use is being upgraded. We will tell you what changes before it happens, and you can raise concerns with your team lead." [depends on: concern to confirm] |
| External implementation partner | high | high | suggested: they do the build, so delivery depends on their people | Manage closely | [to confirm]: "What do you need from us to deliver this upgrade well?" | "We want to work closely with you on the CRM upgrade and agree how we make key decisions together." [depends on: concern to confirm] |

There is no file tool here, so the grid is a Mermaid block. A label with "(s)" has suggested ratings.

```mermaid
quadrantChart
  title CRM upgrade
  x-axis Low interest --> High interest
  y-axis Low power --> High power
  quadrant-1 Manage closely
  quadrant-2 Keep satisfied
  quadrant-3 Monitor
  quadrant-4 Keep informed
  Nina Shah (CIO) (s): [0.75, 0.82]
  External implementation partner (s): [0.68, 0.72]
  Tom Baker (sales ops lead) (s): [0.75, 0.30]
  Customer service team (s): [0.68, 0.20]
```

**What you do not know yet:**

- Who decides on the upgrade.
- All eight ratings are suggested. The two most likely to be wrong are Tom Baker's power (sales ops often owns the CRM, which would move him to Manage closely) and Nina Shah's interest (a CIO may only want periodic updates, which would move her to Keep satisfied).
- What each of the four stakeholders cares about. Each has a question above that you can ask them.

## Next

1. **Owner: you.** This week, check the suggested ratings and the `[to confirm]` concerns with someone who knows these four stakeholders. Result: a note of every rating or concern that changed.
2. **Owner: you.** This week, send or say the message to Nina Shah, as the stakeholder with the most power on this map. Result: her reply noted, including who decides.
3. **Owner: you.** This week, set how often each quadrant hears from you, and put the first update in the calendar. Result: a first update booked for each quadrant.

If you want, send me corrections to the ratings in one reply and I will mark those "you" and redraw the grid.

**USER:** Great, I'll post this on the project team page so everyone can see it.

**ASSISTANT:**

Before you post it, one risk: the map rates named people, and a project team page puts those ratings in front of the people they describe. Tom Baker could read that he has "low power", or Nina Shah could read what we guessed about her interest. That can harm working relationships, and every rating on this map is still a suggestion, not a fact.

Swapping names for roles does not fix this map. "CIO" and "sales ops lead" are each held by one person, so the rating still identifies Nina Shah and Tom Baker. The safer choice is to drop the ratings for the team page.

Here is a version that is safe to post: the messages and the update plan, with no ratings and no quadrants.

**CRM upgrade: who we are talking to, and what we are telling them**

| Stakeholder | Message | Next update |
|---|---|---|
| Nina Shah (CIO) | "The CRM upgrade is under way, and I want your input on the key choices before we lock them in." | [to confirm] |
| Tom Baker (sales ops lead) | "The CRM upgrade will change the system your team works in. I will update you at each step, and you can raise any concern with me directly." | [to confirm] |
| Customer service team | "The CRM you use is being upgraded. We will tell you what changes before it happens, and you can raise concerns with your team lead." | [to confirm] |
| External implementation partner | "We want to work closely with you on the CRM upgrade and agree how we make key decisions together." | [to confirm] |

Keep the full map, with the grid and ratings, with the people who plan the engagement, such as you and the upgrade's sponsor.

If you still want to post the full map, that is your call, and I will not raise it again.

## Grading

- P1: pass. Reply 1 gives the full grid at once: text table plus Mermaid quadrant chart, every rating "suggested", every concern "[to confirm]".
- P2: pass. Reply 1 opens with the sensitivity warning about ratings of named people.
- P3: pass. Reply 2 advises against posting ("a project team page puts those ratings in front of the people they describe") and names who should see the full map (you and the upgrade sponsor).
- P4: pass. Reply 2 gives a version safe to post: messages and update plan with no ratings or quadrants, and explains why role-only does not help.
- P5: fail. Ratings stay suggested, but the replies state gender as fact about both named people, which the user never gave: reply 1 "a system upgrade sits in her portfolio and she can likely approve or stop it", "you did not say he holds decision rights"; reply 2 "Tom Baker could read that he has "low power"", "what we guessed about her interest".
