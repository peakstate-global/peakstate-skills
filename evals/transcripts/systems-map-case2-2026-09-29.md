# systems-map case 2 transcript, 2026-09-29

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 1051ed1. Eval version: 1.

**USER:** Map the system behind adoption of our onboarding app. Usage rose for three months, then went flat.


**ASSISTANT:**

Use only a tool your organisation has approved for this information.

Usage that rises for three months and then goes flat is a pattern over time, so a systems map fits it well. You have given me the shape of the curve. Before I suggest the variables, I need to know what sits behind it.

What has your team tried since usage went flat, and what happened to usage after each thing you tried? If you have rough numbers (for example, active users per month before and after the plateau), include them.

**USER:** It rose from 50 to 400 weekly users from March to May and has been flat since. We ran training sessions the whole time.


**ASSISTANT:**

Thank you. Weekly users rose from 50 to 400 between March and May, and usage has stayed flat since then. Training sessions ran for the whole period, before and after the plateau. That detail matters: the training did not stop when growth stopped, so the plateau probably comes from something other than the training.

Here are six variables I suggest from what you said. Each one is a quantity that can go up or down.

- **Weekly users**: the number of people who use the app each week (50 in March, 400 by May, flat since).
- **Training sessions delivered**: how many sessions run in a period.
- **Staff not yet using the app**: the people who could use the app but do not yet. `[to confirm]`: I do not know how many people the app is for in total.
- **Word of mouth**: how often current users recommend the app to colleagues.
- **New users per week**: the number of people who start to use the app each week.
- **Users who stop using the app**: people who tried the app and then dropped off. `[to confirm]`: a flat total can hide new users and drop-offs that cancel out.

Is this list right? Correct, remove or add any variable in one reply, and if you know roughly how many people the app is for in total, include that number.

**USER:** Mostly right, but I don't know whether more training sessions raise or lower support tickets. Leave that one open.


**ASSISTANT:**

I have kept the six variables and added a seventh from your reply: **support tickets**, the number of help requests people raise about the app each period. The link from training sessions to support tickets stays open with polarity `?` and `[to confirm]`, as you asked. I will not guess its sign.

Here are the links I suggest. `+` means both variables move the same way, `-` means they move opposite ways, and `||` marks a delay. "You" means you gave the link. "Suggested" means I propose it and you have not confirmed it.

| From | To | Polarity | Delay | Rated by | Reason |
|---|---|---|---|---|---|
| Training sessions delivered | New users per week | + | | suggested | More sessions reach more people who then start to use the app. |
| Staff not yet using the app | New users per week | + | | suggested | When fewer people are left to reach, fewer people can start, whatever the training. |
| New users per week | Weekly users | + | | suggested | Each new user adds to the weekly total. |
| New users per week | Staff not yet using the app | - | | suggested | Each new user leaves one fewer person to reach. |
| Weekly users | Word of mouth | + | | suggested | More users means more people who can recommend the app. |
| Word of mouth | New users per week | + | `\|\|` | suggested | A recommendation takes time to turn into a new user. |
| Weekly users | Users who stop using the app | + | | suggested | More users means more people who can drop off. |
| Users who stop using the app | Weekly users | - | | suggested | Each drop-off lowers the weekly total. |
| Training sessions delivered | Support tickets | ? | | you | You named this link and left its direction open. `[to confirm]` |
| Weekly users | Support tickets | + | | suggested | More users means more questions and more problems reported. |
| Support tickets | Users who stop using the app | + | | suggested | People who hit problems that stay unsolved tend to drop off. `[to confirm]`: this depends on how fast tickets get answered. |

Two things are still unknown and I have marked them rather than guessed. The total number of people the app is for is `[to confirm]`, and it sets how soon "staff not yet using the app" runs low. The sign of the training-to-support-tickets link is `?`, so any loop that runs through it will stay "type unknown" until that link is confirmed.

Are these links right? Confirm, correct, remove or add any link in one reply.

**USER:** I don't know, your call.


**ASSISTANT:**

I will keep every link as I proposed it. Because you left the call to me, all the links stay marked "suggested", and the training-to-support-tickets link stays `?` and `[to confirm]`.

Here are the closed loops in the map. I count the `-` links in each loop: an even count makes it R (reinforcing), an odd count makes it B (balancing).

- **R1, word of mouth (reinforcing, 0 `-` links):** new users per week -(+)-> weekly users -(+)-> word of mouth -(+)-> || new users per week. More users bring more recommendations, which bring more users after a delay. This loop can explain the rise from 50 to 400 weekly users between March and May.
- **B1, running out of people to reach (balancing, 1 `-` link):** new users per week -(-)-> staff not yet using the app -(+)-> new users per week. Each new user leaves fewer people to reach, so new users slow down.
- **B2, drop-off (balancing, 1 `-` link):** weekly users -(+)-> users who stop using the app -(-)-> weekly users. More users means more people who can drop off.
- **B3, support problems (balancing, 1 `-` link):** weekly users -(+)-> support tickets -(+)-> users who stop using the app -(-)-> weekly users. More users raise more tickets, and unsolved problems push people to drop off.

Training sessions delivered is not inside any loop, because no variable in the map feeds back into it. So the `?` link from training to support tickets does not change any loop type. It does change how hard training pushes on B3, and that stays unknown.

For the archetype, two fit this structure:

- **Limits to growth.** The signs are "growth, then a flat line, while the same effort continues". Your words match: weekly users rose from 50 to 400 from March to May and then went flat, and "we ran training sessions the whole time". R1 is the growth loop, and B1, B2 and B3 are limits that slow it. With more than one limit, this variant is called the attractiveness principle.
- **Growth and underinvestment.** This fits only if B3 is the main limit: demand grows, support capacity cannot keep up, service falls and people drop off. The evidence for it is weak. You have not mentioned support capacity or slow ticket answers, so I have it as a second option only.

Which fits your situation: limits to growth, growth and underinvestment, neither, or your call?
**USER:** None of those fit, I think.


**ASSISTANT:**

I have recorded the archetype as "no standard archetype fits". The map is still complete without an archetype, so I will find the leverage point from the loops themselves.

The loops leave one big question open. Weekly users can stay flat at 400 for two different reasons. Either B1 is in control and few people are left to reach, or B2 and B3 are in control and new users arrive but an equal number drop off. Training sessions ran the whole time, so the training team pushes on new users without seeing which of these two things is happening.

My suggested leverage point is this: **show new users per week and drop-offs per week as two separate numbers to the people who run the training, in place of the single weekly-user total.** This is level 6 on Meadows' list, the structure of information flows (who has access to what). It is a hypothesis, not a proven fix. The reason for it: a flat total hides whether the limit is B1 (running out of people to reach) or B2 and B3 (drop-off), and each limit needs a different response. If drop-offs are high, the effort moves to support and to the users who stop. If new users are near zero, the effort moves to the staff who have not started, or the plateau is simply the full audience.

The small test: for the next four weeks, count new users and drop-offs each week and share both numbers with the training team. Before you start, write down which one you expect to be larger. Within those four weeks you will see whether the plateau comes from saturation or from churn, and whether the training team changes what it does when it can see the split.

Can you act on this yourself (do you have access to the usage data and a line to the training team), or who can?

**USER:** I don't know, your call.



**ASSISTANT:**

You left the call to me, so I have made the owner of each next move "you". I do not know whether you have access to the usage data or a line to the training team, so that stays `[to confirm]`. Here is the full map.

**Pattern over time:** weekly users rose from 50 to 400 from March to May, and have been flat since. Training sessions ran the whole time, before and after the plateau.

| From | To | Polarity | Delay | Rated by |
|---|---|---|---|---|
| Training sessions delivered | New users per week | + | no | suggested: more sessions reach more people who then start |
| Staff not yet using the app | New users per week | + | no | suggested: fewer people left to reach means fewer can start |
| New users per week | Staff not yet using the app | - | no | suggested: each new user leaves one fewer person to reach |
| New users per week | Weekly users | + | no | suggested: each new user adds to the weekly total |
| Weekly users | Word of mouth | + | no | suggested: more users means more people who can recommend it |
| Word of mouth | New users per week | + | yes | suggested: a recommendation takes time to become a new user |
| Weekly users | Users who stop using the app | + | no | suggested: more users means more people who can drop off |
| Users who stop using the app | Weekly users | - | no | suggested: each drop-off lowers the weekly total |
| Training sessions delivered | Support tickets | ? [to confirm] | no | you: you named this link and left its direction open |
| Weekly users | Support tickets | + | no | suggested: more users raise more questions and problems |
| Support tickets | Users who stop using the app | + | no | suggested: unsolved problems push people to drop off `[to confirm]` |

**Loops**

- R1: new users per week -> weekly users -> word of mouth -> new users per week. Reinforcing, 0 "-" links. More users bring more recommendations, which bring more users after a delay; this can explain the rise from 50 to 400.
- B1: new users per week -> staff not yet using the app -> new users per week. Balancing, 1 "-" link. Each new user leaves fewer people to reach, so new users slow down.
- B2: weekly users -> users who stop using the app -> weekly users. Balancing, 1 "-" link. More users means more drop-offs.
- B3: weekly users -> support tickets -> users who stop using the app -> weekly users. Balancing, 1 "-" link. More users raise more tickets, and unsolved problems push people out.

```text
Links
  Training sessions delivered --(+)--> New users per week
  Staff not yet using the app --(+)--> New users per week
  New users per week --(-)--> Staff not yet using the app
  New users per week --(+)--> Weekly users
  Weekly users --(+)--> Word of mouth
  Word of mouth --(+ ||)--> New users per week        delay on this link
  Weekly users --(+)--> Users who stop using the app
  Users who stop using the app --(-)--> Weekly users
  Training sessions delivered --(?)--> Support tickets   polarity [to confirm]
  Weekly users --(+)--> Support tickets
  Support tickets --(+)--> Users who stop using the app

Loops
  R1: New users per week -> Weekly users -> Word of mouth -> New users per week   reinforcing, 0 "-" links (even)
  B1: New users per week -> Staff not yet using the app -> New users per week   balancing, 1 "-" link (odd)
  B2: Weekly users -> Users who stop using the app -> Weekly users   balancing, 1 "-" link (odd)
  B3: Weekly users -> Support tickets -> Users who stop using the app -> Weekly users   balancing, 1 "-" link (odd)
```

I can write files here, so I took the first rung: the diagram is an SVG file at `/tmp/systems-map-eval/case2/onboarding-app-adoption.svg`. Suggested links carry "(s)", and the `?` link is dashed.

**Archetype:** no standard archetype fits. Evidence: you said none of the two I offered fit. The nearest was limits to growth, whose signs ("growth, then a flat line, while the same effort continues") match your curve and the training that ran the whole time, but you judged it does not describe your situation, so I have not used it.

**Leverage point (hypothesis):** show new users per week and drop-offs per week as two separate numbers to the people who run the training, in place of the single weekly-user total. Level 6 on Meadows' list: the structure of information flows (who has access to what). Why: a flat total of 400 hides whether B1 is in control (few people left to reach) or B2 and B3 are in control (new users arrive but an equal number drop off), and each needs a different response. Small test: for the next four weeks, count new users and drop-offs each week and share both numbers with the training team. Write down beforehand which number you expect to be larger. It works if, within the four weeks, the split shows which limit holds the plateau and the training team changes what it does in response.

**What you do not know yet:**

- The sign of training sessions delivered -> support tickets is `?` `[to confirm]`. It is outside every loop, so it changes no loop type, but it changes how hard training pushes on B3.
- Ten links are suggested, not confirmed: every link in the table except the training-to-support-tickets link.
- The total number of people the app is for is `[to confirm]`. It sets how soon "staff not yet using the app" runs low, and so whether B1 alone explains the plateau.
- Whether support tickets get answered fast enough to stop drop-offs is `[to confirm]`.
- Whether you can get the usage data and reach the training team is `[to confirm]`.

## Next

1. **Owner: you.** This week, walk through the suggested links and the `?` link with one person who uses the app or runs the training, and note every link they change. Result: a links table where each changed or confirmed link reads "you".
2. **Owner: you.** This week, write down whether you expect new users or drop-offs to be larger, then start the four-week count and share both numbers with the training team. Result: four weekly pairs of numbers, set against your written prediction.
3. **Owner: you.** This week, pick the one variable that shows whether the pattern is changing (I suggest new users per week) and record it on the same day each week. Result: a weekly series that shows whether the flat line starts to move.


## Grading

- P1: pass. Training sessions delivered to support tickets is "? [to confirm]" in the table and "--(?)-->" in the notation.
- P2: pass, but not exercised. The ? link sat outside every loop, so no loop ran through it; the reply says so. Triage: eval fault (the fixture let the unknown link be a leaf). Eval v2 adds a return link from support tickets to training so the case tests typing; case re-run.
- P3: pass. "Archetype: no standard archetype fits", with the nearest (limits to growth) named as not used.
- P4: pass. Level 6 leverage point labelled hypothesis with a four-week test; text notation; SVG at a named rung.
- P5: pass. Only the user's figures (50, 400, March to May) appear as facts; test lengths are the skill's proposal, and owners are "you".
- Runner note: the skill asked a second time to confirm the links; the script had no reply for that, so the runner answered "I don't know, your call."
