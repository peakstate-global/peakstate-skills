# systems-map case 2 transcript, 2026-09-29 (re-run)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 0d11fab. Eval version: 2.

**USER:** Map the system behind adoption of our onboarding app. Usage rose for three months, then went flat.


**ASSISTANT:**

Use only a tool your organisation has approved for this information.

I can create files here, so the finished map will come as an SVG file, with the causal loop in text notation as well.

A rise for three months and then a flat line is a pattern over time, so a systems map fits. To start, one question: what has happened to usage since it went flat (steady, slowly falling, or bouncing around), roughly what numbers are involved, and what has your team already tried to get it growing again?

**USER:** It rose from 50 to 400 weekly users from March to May and has been flat since. We ran training sessions the whole time.


**ASSISTANT:**

Thank you. So the pattern is: weekly users rose from 50 to 400 between March and May, and have stayed flat at about 400 since, while training sessions ran the whole time. The training stayed the same across both periods, so something other than training probably changed when growth stopped.

Here are six variables I suggest from what you said. Each one is something that can go up or down:

- **Weekly users of the app** (50 in March, 400 from May).
- **Training sessions run** (steady the whole time, from what you said).
- **Word of mouth from current users** (colleagues who tell other colleagues to use it).
- **People who could use the app but do not yet** (the pool still left to reach).
- **New people who need onboarding** (if the app serves new starters, this sets how many people can ever need it).
- **Friction in using the app** (bugs, slow steps, missing features or support waits that grow as more people use it).

Does this list match your situation? Please correct, remove or add variables in one reply. If you know roughly how many people could use the app in total, add that number too, because it tells us how much of the pool 400 users already covers.
**USER:** Mostly right, but I don't know whether more training sessions raise or lower support tickets. Leave that one open. And when support tickets go up, we schedule more training sessions.


**ASSISTANT:**

Thank you. I have kept all six variables and added a seventh from your reply, **support tickets raised**. I recorded your two points as follows:

- Support tickets raised → training sessions run is `+`, rated "you", because you schedule more training sessions when tickets go up.
- Training sessions run → support tickets raised is `?` and `[to confirm]`, rated "you", because you do not know which way it goes. I will not guess a sign for it.

Here are the links I suggest. `+` means both variables move the same way. `-` means they move opposite ways. `||` marks a delay.

| From | To | Polarity | Delay | Rated by | Reason |
|---|---|---|---|---|---|
| Support tickets raised | Training sessions run | + | | you | You schedule more sessions when tickets rise. |
| Training sessions run | Support tickets raised | ? `[to confirm]` | | you | Direction unknown, left open. |
| Training sessions run | Weekly users of the app | + | | suggested | Training shows people how to start using the app. |
| Weekly users of the app | Word of mouth from current users | + | | suggested | More users means more people telling colleagues. |
| Word of mouth from current users | Weekly users of the app | + | `||` | suggested | Colleagues try the app some time after they hear about it. |
| Weekly users of the app | People who could use the app but do not yet | - | | suggested | Each new user comes out of the pool, so the pool shrinks. |
| People who could use the app but do not yet | Weekly users of the app | + | | suggested | A smaller pool leaves fewer people to win, so growth slows. |
| New people who need onboarding | People who could use the app but do not yet | + | | suggested | New starters refill the pool. |
| Weekly users of the app | Friction in using the app | + | `||` | suggested | More users find more bugs and wait longer for support. |
| Friction in using the app | Weekly users of the app | - | `||` | suggested | Friction makes some people stop using the app. |
| Weekly users of the app | Support tickets raised | + | | suggested | More users raise more tickets. |
| Friction in using the app | Support tickets raised | + | | suggested | Each bug or slow step turns into tickets. |

Please confirm or correct these links in one reply. You can change a sign, add or remove a delay, delete a link, or add one I missed. Anything you do not change stays "suggested".
**USER:** I don't know, your call.


**ASSISTANT:**

That is fine. I have kept every link from my table as "suggested", because you did not confirm them. The two links you gave stay as they were: support tickets raised → training sessions run is `+` (you), and training sessions run → support tickets raised is `?` and `[to confirm]`.

Here are the closed loops in the map. A loop with an even count of `-` links (zero included) is R, reinforcing. A loop with an odd count is B, balancing.

| Loop | Path | `-` links | Type | Story |
|---|---|---|---|---|
| R1 | Weekly users → word of mouth → weekly users (`||`) | 0 | Reinforcing | More users tell more colleagues, who start using the app some time later. |
| R2 | Weekly users → support tickets → training sessions → weekly users | 0 | Reinforcing | More users raise more tickets, you run more training, and training brings in more users. |
| R3 | Weekly users → friction (`||`) → support tickets → training sessions → weekly users | 0 | Reinforcing | More users create more friction, friction raises tickets, and tickets trigger more training. |
| B1 | Weekly users → people who could use the app but do not yet → weekly users | 1 | Balancing | Each new user shrinks the pool, so there are fewer people left to win. |
| B2 | Weekly users → friction (`||`) → weekly users (`||`) | 1 | Balancing | More users find more bugs and support waits, and some of them stop using the app. |
| U1 | Training sessions → support tickets → training sessions | 0 known, 1 `?` | Type unknown until training sessions run → support tickets raised is confirmed | If training cuts tickets, this loop balances; if training raises tickets, it reinforces. |

All of R1, R2, R3, B1 and B2 rest on suggested links, so each loop is only as sound as those links.

Two system archetypes could fit. Here is the evidence for each, in your words:

- **Limits to growth** (the stronger fit, in my view). Usage "rose from 50 to 400 weekly users from March to May and has been flat since", while "we ran training sessions the whole time". That is growth, then a flat line, while the same effort goes on. The growth loops are R1 and R2. The limits would be B1 (the pool of people left to reach) and B2 (friction). With two limits, this variant is called the attractiveness principle. Its usual leverage is to find and ease the limit, not to push the growth loop harder.
- **Fixes that fail** (a weaker fit, and only if one link turns out a certain way). "When support tickets go up, we schedule more training sessions" is a fix applied each time the problem shows. This archetype fits only if training in fact raises tickets later, which is the `?` link you left open. Until that link is known, I cannot say this archetype is present.

Which fits your situation: limits to growth, fixes that fail, neither, or your call?
**USER:** None of those fit, I think.


**ASSISTANT:**

Thank you. I have recorded the archetype as "no standard archetype fits". The map is still complete without one, so I will find the leverage point from the loops themselves.

The loops suggest one place to start. Usage stopped growing while training stayed the same, so a limit (a balancing loop) probably holds usage flat. The map has two candidate limits: B1, the pool of people left to reach, and B2, friction that makes some users stop. Both rest on suggested links, and we do not yet know which one is binding.

**Leverage point (a hypothesis): ease the friction that current users meet.** Find the two or three most common causes of support tickets and fix them, rather than adding more training.

- **Level on Meadows' list:** level 8, the strength of a balancing feedback loop. Fixing friction weakens B2, the loop that pulls usage back down.
- **Why this point:** the usual move when growth stops is to ease the limit, not to push the growth loop harder. More training pushes the growth side (R2) and, through the open `?` link, may also add tickets. Friction is also the limit you can see now, in your support tickets.
- **Small test:** for four weeks, fix the top two ticket causes. Each week, record weekly users, tickets per 100 users, and how many users stopped using the app. Write down what you expect before you start.
  - If weekly users rise above 400, friction was a real limit.
  - If tickets fall but weekly users stay near 400, friction was not the binding limit, and the pool (B1) is the next suspect.

This point is a hypothesis, not a proven fix.

Can you act on this, or who can?

**USER:** I don't know, your call.



**ASSISTANT:**

That is fine. I have kept the owner as "you", because you did not name anyone else. If someone else fixes the causes of support tickets (for example, the team that builds the app), you can pass the test to them. Here is your finished map.

**Pattern over time:** weekly users of the onboarding app "rose from 50 to 400 weekly users from March to May and has been flat since". Over the whole period, "we ran training sessions the whole time", and "when support tickets go up, we schedule more training sessions".

| From | To | Polarity | Delay | Rated by |
|---|---|---|---|---|
| Support tickets raised | Training sessions run | + | no | you |
| Training sessions run | Support tickets raised | ? [to confirm] | no | you |
| Training sessions run | Weekly users of the app | + | no | suggested: training shows people how to start using the app |
| Weekly users of the app | Word of mouth from current users | + | no | suggested: more users means more people telling colleagues |
| Word of mouth from current users | Weekly users of the app | + | yes | suggested: colleagues try the app some time after they hear about it |
| Weekly users of the app | People who could use the app but do not yet | - | no | suggested: each new user comes out of the pool |
| People who could use the app but do not yet | Weekly users of the app | + | no | suggested: a smaller pool leaves fewer people to win |
| New people who need onboarding | People who could use the app but do not yet | + | no | suggested: new starters refill the pool |
| Weekly users of the app | Friction in using the app | + | yes | suggested: more users find more bugs and wait longer for support |
| Friction in using the app | Weekly users of the app | - | yes | suggested: friction makes some people stop using the app |
| Weekly users of the app | Support tickets raised | + | no | suggested: more users raise more tickets |
| Friction in using the app | Support tickets raised | + | no | suggested: each bug or slow step turns into tickets |

**Loops**

- R1: weekly users -> word of mouth -> weekly users. Reinforcing, 0 "-" links. More users tell more colleagues, who start using the app some time later.
- R2: weekly users -> support tickets -> training sessions -> weekly users. Reinforcing, 0 "-" links. More users raise more tickets, you run more training, and training brings in more users.
- R3: weekly users -> friction -> support tickets -> training sessions -> weekly users. Reinforcing, 0 "-" links. More users create more friction, friction raises tickets, and tickets trigger more training.
- B1: weekly users -> people who could use the app but do not yet -> weekly users. Balancing, 1 "-" link. Each new user shrinks the pool, so there are fewer people left to win.
- B2: weekly users -> friction -> weekly users. Balancing, 1 "-" link. More users meet more bugs and support waits, and some of them stop using the app.
- ?1 (called U1 in my earlier reply): training sessions -> support tickets -> training sessions. Type unknown until training sessions run -> support tickets raised is confirmed. If training cuts tickets, this loop balances. If training raises tickets, it reinforces.

```text
Links
  Support tickets raised --(+)--> Training sessions run
  Training sessions run --(?)--> Support tickets raised                          polarity [to confirm]
  Training sessions run --(+)--> Weekly users of the app                         suggested
  Weekly users of the app --(+)--> Word of mouth from current users              suggested
  Word of mouth from current users --(+ ||)--> Weekly users of the app           suggested, delay on this link
  Weekly users of the app --(-)--> People who could use the app but do not yet   suggested
  People who could use the app but do not yet --(+)--> Weekly users of the app   suggested
  New people who need onboarding --(+)--> People who could use the app but do not yet   suggested
  Weekly users of the app --(+ ||)--> Friction in using the app                  suggested, delay on this link
  Friction in using the app --(- ||)--> Weekly users of the app                  suggested, delay on this link
  Weekly users of the app --(+)--> Support tickets raised                        suggested
  Friction in using the app --(+)--> Support tickets raised                      suggested

Loops
  R1: Weekly users -> Word of mouth -> Weekly users                                   reinforcing, 0 "-" links (even)
  R2: Weekly users -> Support tickets -> Training sessions -> Weekly users            reinforcing, 0 "-" links (even)
  R3: Weekly users -> Friction -> Support tickets -> Training sessions -> Weekly users   reinforcing, 0 "-" links (even)
  B1: Weekly users -> People who could use the app but do not yet -> Weekly users     balancing, 1 "-" link (odd)
  B2: Weekly users -> Friction -> Weekly users                                        balancing, 1 "-" link (odd)
  ?1: Training sessions -> Support tickets -> Training sessions                       type unknown until Training sessions run -> Support tickets raised is confirmed
```

I can create files here, so I took the first rung of the ladder: an SVG file. It is saved at `/tmp/systems-map-eval/r2/case2/onboarding-adoption-map.svg`. In the diagram, blue links are the two you gave, and black links marked "(s)" are suggested. `||` marks a delay.

**Archetype:** no standard archetype fits. Evidence: you said "None of those fit, I think." The nearest one was limits to growth, because usage grew and then went flat while training continued. You did not recognise it in your situation, so the map stands without an archetype.

**Leverage point (hypothesis):** fix the two or three most common causes of support tickets, rather than adding more training. Level 8 on Meadows' list: the strength of balancing feedback loops. Why: it weakens B2, the loop where friction pulls usage back down, and it does not depend on the open `?` link between training and tickets. Small test: for four weeks, fix the top two ticket causes. Each week, record weekly users, tickets per 100 users, and how many users stopped using the app. Write down what you expect before you start. If weekly users rise above 400, friction was a real limit. If tickets fall but weekly users stay near 400, friction was not the binding limit, and the pool (B1) is the next suspect. This is a hypothesis, not a proven fix.

**What you do not know yet:**

- Training sessions run -> support tickets raised: polarity `?`, [to confirm]. This also leaves the type of loop ?1 unknown.
- The other ten links in the table are suggested, not confirmed. So loops R1, R2, R3, B1 and B2 are only as sound as those links.
- How many people could use the app in total: [to confirm]. This tells you how much of the pool 400 users already covers, and so whether B1 is close to its limit.
- Who can fix the causes of support tickets: [to confirm]. The owner is "you" until you name someone.

## Next

1. **Owner: you.** This week, show the links table to one person who handles the app's support tickets or runs the training, and ask them to mark each suggested link and the `?` link as right, wrong or unsure. Result: a marked-up table, with any changes noted.
2. **Owner: you.** This week, pull the recent support tickets, pick the top two causes, and write down what you expect weekly users and tickets per 100 users to do over four weeks once they are fixed. Result: a written prediction and a list of the two causes to fix.
3. **Owner: you.** This week, choose one fixed day of the week and start recording weekly users on it, alongside tickets per 100 users. Result: a weekly record that shows whether usage moves off 400.


## Grading

- P1: pass. Training sessions run to support tickets raised is "? [to confirm]" in the table and "--(?)-->" in the notation.
- P2: pass. The loop training sessions, support tickets, training sessions runs through the ? link and is typed "?1 ... type unknown until Training sessions run -> Support tickets raised is confirmed"; no loop through it is typed R or B.
- P3: pass. "Archetype: no standard archetype fits", with limits to growth named as the nearest and not used.
- P4: pass. Level 8 leverage point labelled hypothesis with a four-week test; text notation; SVG at a named rung (/tmp/systems-map-eval/r2/case2/, no script, handlers or external refs).
- P5: pass. Only the user's figures (50, 400, March to May) appear as facts; owners are "you".
- Runner note: the skill asked a second time to confirm the links and asked who can act; the script had no reply for either, so the runner answered "I don't know, your call."
