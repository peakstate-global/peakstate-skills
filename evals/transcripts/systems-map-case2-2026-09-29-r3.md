# systems-map case 2 transcript, 2026-09-29 (re-run after review)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: c1e7d03. Eval version: 2.

**USER:** Map the system behind adoption of our onboarding app. Usage rose for three months, then went flat.

**ASSISTANT:**

Use only a tool your organisation has approved for this information.

Usage rose for three months and then went flat. That is a pattern over time, so a systems map fits it.

What have you tried since usage went flat, and what happened after each attempt? If you have rough numbers, such as active users by month or sign-ups against people who kept using the app, include them too.

**USER:** It rose from 50 to 400 weekly users from March to May and has been flat since. We ran training sessions the whole time.

**ASSISTANT:**

Thanks. Weekly users went from 50 in March to 400 in May, and have stayed flat since then. Training sessions ran the whole time, so training did not stop the plateau.

Here is a first list of variables for the map. Each one can go up or down.

- **Weekly users.** Your measure: 50 in March, 400 in May, flat since.
- **Training sessions delivered.** You ran training the whole time.
- **People told about the app by colleagues.** This is my suggestion. Growth from 50 to 400 often comes from people telling each other.
- **People who could use the app but do not yet.** This is my suggestion. It is the pool that new users come from, and it shrinks as more people start.
- **Value people get from the app after their first week.** This is my suggestion. If the value is low, people stop using the app, even when new people start.
- **People who stop using the app.** This is my suggestion. A flat line can hide new users joining at the same rate as others leave.

Is this list right? Correct, remove or add any variable in one reply. If you know roughly how many people could use the app in total, include that number too.

**USER:** Mostly right, but I don't know whether more training sessions raise or lower support tickets. Leave that one open. And when support tickets go up, we schedule more training sessions.

**ASSISTANT:**

Thanks. I have added **support tickets** as a seventh variable and kept the other six. You gave me two links:

- Training sessions to support tickets. You do not know the direction, so the polarity stays `?` and `[to confirm]`.
- Support tickets to training sessions. When tickets go up, you schedule more training, so the polarity is `+`.

Here are those two links with the other links I suggest. `+` means both variables move the same way. `-` means they move opposite ways. A delay means the effect takes weeks to show.

| From | To | Polarity | Delay | Rated by |
|---|---|---|---|---|
| training sessions delivered | support tickets | ? [to confirm] | [to confirm] | you (link), sign open |
| support tickets | training sessions delivered | + | [to confirm] | you |
| training sessions delivered | weekly users | + | yes | suggested: training helps new people start using the app, some weeks after the session |
| weekly users | people told about the app by colleagues | + | no | suggested: more users means more people who mention the app to a colleague |
| people told about the app by colleagues | weekly users | + | yes | suggested: people who hear about it start using it, some time later |
| weekly users | people who could use the app but do not yet | - | no | suggested: each new user leaves one less person in the pool |
| people who could use the app but do not yet | weekly users | + | no | suggested: a bigger pool gives more people who can still start |
| value people get after their first week | people who stop using the app | - | yes | suggested: when the app is useful, fewer people drop it |
| people who stop using the app | weekly users | - | no | suggested: every person who stops lowers the count |
| training sessions delivered | value people get after their first week | + | yes | suggested: trained people know how to get more out of the app |
| weekly users | support tickets | + | no | suggested: more users means more questions and problems |

Two links matter most for the flat line. The pool link and the stop link can each hold usage flat, in different ways. Please look at those two closely.

Are these links right? Confirm, correct or remove any link in one reply. If you have a view on whether training raises or lowers support tickets, give it too, but it is fine to leave it open.

**USER:** I don't know, your call.

**ASSISTANT:**

Thanks. I will use my suggested links as they stand, but every link you did not give me stays marked "suggested", and the training-to-tickets link keeps its `?`. You gave me two links: the link from training to support tickets (sign open) and the link from support tickets to training (`+`).

Here are the closed loops in that map. I typed each loop by counting its `-` links: an even count makes it reinforcing (R), an odd count makes it balancing (B).

- **R1: weekly users -> people told about the app by colleagues -> weekly users.** Reinforcing, zero `-` links. Users tell colleagues, and those colleagues start using the app. This loop may explain much of the rise from 50 to 400.
- **B1: weekly users -> people who could use the app but do not yet -> weekly users.** Balancing, one `-` link. Each new user shrinks the pool of people who can still start, so growth slows as the pool empties.
- **R2: training sessions delivered -> weekly users -> support tickets -> training sessions delivered.** Reinforcing, zero `-` links. Training brings in users, more users raise more tickets, and more tickets lead you to schedule more training.
- **R3: training sessions delivered -> value people get after their first week -> people who stop using the app -> weekly users -> support tickets -> training sessions delivered.** Reinforcing, two `-` links. Training raises value, so fewer people stop, so the user count and the tickets stay higher, so training continues.
- **?1: training sessions delivered -> support tickets -> training sessions delivered.** Type unknown until the link from training to support tickets is confirmed. If training raises tickets, this loop is reinforcing. If training lowers tickets, it is balancing.

Next, the archetype. These two are the best fit:

- **Limits to growth (suggested, the stronger fit).** Its sign is growth, then a flat line, while the same effort continues. Your words match: usage "rose from 50 to 400 weekly users from March to May and has been flat since", and "we ran training sessions the whole time". R1 is the growth loop, and B1 (the shrinking pool) is the limit. The drop-off through "people who stop using the app" may be a second limit. The usual leverage is to find and ease the limit, not to push the growth loop harder.
- **Shifting the burden (suggested, the weaker fit).** Its sign is a quick fix that eases a symptom each time, while a slower real fix is put off. Your words: "when support tickets go up, we schedule more training sessions". Training may be the quick fix for tickets, while the real fix (for example, a change to the app that removes the cause of the tickets) waits. The evidence is thin, because nobody knows yet whether training raises or lowers tickets.

Which archetype fits your situation best: limits to growth, shifting the burden, neither, or is it my call?

**USER:** None of those fit, I think.

**ASSISTANT:**

Thanks. I have recorded the archetype as **no standard archetype fits**. The map is still complete without one, so I will work from the loops themselves.

**Suggested leverage point (a hypothesis): send the reasons people stop using the app to the people who can change the app.**

- **Level on Meadows' list:** level 6, the structure of information flows (who has access to what).
- **Why this point:** the training sessions ran the whole time, and weekly users still stayed flat at 400. So more of the same training is unlikely to move the line. The flat line can come from two loops: B1 (the pool of people who could start is empty) or the drop-off (new users join at the same rate as others stop). At the moment nobody sees which one it is. The support tickets tell you about people who are still using the app. The people who stop leave no signal, so the value link (value after the first week to people who stop) has no feedback path to anyone who can raise that value.
- **The small test:** for a short period, ask each person who has stopped using the app one question: "What made you stop?" Before you start, write down what you expect to see. If most answers name a problem with the app itself, the drop-off is the limit and the app is the place to act. If most people say they never needed the app, or few people have stopped at all, B1 (an empty pool) is the more likely limit. The length of the test and the number of people to ask are `[to confirm]`.

This is a hypothesis. It is not a proven fix, and it rests on suggested links that you have not confirmed yet.

Can you act on this yourself, or who could? For example, who can see which people have stopped using the app, and who can make changes to the app?

**USER:** I don't know, your call.



**ASSISTANT:**

Thanks. I have not set an owner for the leverage point, because you have not named one yet. The next moves below are yours, and two things stay `[to confirm]`: who can see which people have stopped using the app, and who can change the app.

Here is the full map.

**Pattern over time:** weekly users rose from 50 in March to 400 in May, and have been flat since. Training sessions ran the whole time.

| From | To | Polarity | Delay | Rated by |
|---|---|---|---|---|
| training sessions delivered | support tickets | ? [to confirm] | [to confirm] | you (the link); the sign is open |
| support tickets | training sessions delivered | + | [to confirm] | you |
| training sessions delivered | weekly users | + | yes | suggested: training helps new people start using the app, some weeks after the session |
| weekly users | people told about the app by colleagues | + | no | suggested: more users means more people who mention the app to a colleague |
| people told about the app by colleagues | weekly users | + | yes | suggested: people who hear about the app start using it, some time later |
| weekly users | people who could use the app but do not yet | - | no | suggested: each new user leaves one less person in the pool |
| people who could use the app but do not yet | weekly users | + | no | suggested: a bigger pool gives more people who can still start |
| value people get after their first week | people who stop using the app | - | yes | suggested: when the app is useful, fewer people drop it |
| people who stop using the app | weekly users | - | no | suggested: every person who stops lowers the count |
| training sessions delivered | value people get after their first week | + | yes | suggested: trained people know how to get more out of the app |
| weekly users | support tickets | + | no | suggested: more users means more questions and problems |

**Loops**

- R1: weekly users -> people told about the app by colleagues -> weekly users. Reinforcing, zero `-` links. Users tell colleagues, and those colleagues start using the app.
- B1: weekly users -> people who could use the app but do not yet -> weekly users. Balancing, one `-` link. Each new user shrinks the pool of people who can still start, so growth slows as the pool empties.
- R2: training sessions delivered -> weekly users -> support tickets -> training sessions delivered. Reinforcing, zero `-` links. Training brings in users, more users raise more tickets, and more tickets lead you to schedule more training.
- R3: training sessions delivered -> value people get after their first week -> people who stop using the app -> weekly users -> support tickets -> training sessions delivered. Reinforcing, two `-` links. Training raises value, so fewer people stop, so users and tickets stay higher, so training continues.
- ?1: training sessions delivered -> support tickets -> training sessions delivered. Type unknown until the link from training sessions delivered to support tickets is confirmed. If training raises tickets, the loop is reinforcing. If training lowers tickets, the loop is balancing.

```text
Links
  training sessions delivered --(?)--> support tickets                               polarity [to confirm]
  support tickets --(+)--> training sessions delivered
  training sessions delivered --(+ ||)--> weekly users                               suggested
  weekly users --(+)--> people told about the app by colleagues                      suggested
  people told about the app by colleagues --(+ ||)--> weekly users                   suggested
  weekly users --(-)--> people who could use the app but do not yet                  suggested
  people who could use the app but do not yet --(+)--> weekly users                  suggested
  value people get after their first week --(- ||)--> people who stop using the app  suggested
  people who stop using the app --(-)--> weekly users                                suggested
  training sessions delivered --(+ ||)--> value people get after their first week    suggested
  weekly users --(+)--> support tickets                                              suggested

Loops
  R1: weekly users -> people told about the app by colleagues -> weekly users   reinforcing, 0 "-" links (even)
  B1: weekly users -> people who could use the app but do not yet -> weekly users   balancing, 1 "-" link (odd)
  R2: training sessions delivered -> weekly users -> support tickets -> training sessions delivered   reinforcing, 0 "-" links (even)
  R3: training sessions delivered -> value people get after their first week -> people who stop using the app -> weekly users -> support tickets -> training sessions delivered   reinforcing, 2 "-" links (even)
  ?1: training sessions delivered -> support tickets -> training sessions delivered   type unknown until training sessions delivered -> support tickets is confirmed
```

I can write files here, so the diagram is an SVG file: `/tmp/systems-map-eval/r3/case2/onboarding-app-adoption.svg`. In the diagram, "(s)" marks a suggested link, `||` marks a delay, and `?` marks the open polarity.

**Archetype:** no standard archetype fits. Evidence: you said "None of those fit". Limits to growth was the nearest match, because usage "rose from 50 to 400 weekly users from March to May and has been flat since" while "we ran training sessions the whole time". You did not accept it, so the map works from the loops alone.

**Leverage point (hypothesis):** send the reasons people stop using the app to the people who can change the app. Level 6 on Meadows' list: the structure of information flows (who has access to what). Why: the flat line can come from B1 (the pool of people who could start is empty) or from the drop-off in R3 (new users join at the same rate as others stop). Support tickets come only from people who still use the app, so nobody sees why people stop. This point gives the value link a feedback path to someone who can raise the value. Small test: ask each person who has stopped using the app one question, "What made you stop?", for a period `[to confirm]` and with a number of people `[to confirm]`. Write down what you expect to see before you start. If most answers name a problem with the app, the drop-off is the limit and the app is the place to act. If most people say they never needed the app, or few people have stopped at all, B1 (an empty pool) is the more likely limit. This is a hypothesis, not a proven fix, and it rests on suggested links.

**What you do not know yet:**

- The `?` link: whether training sessions delivered raise or lower support tickets, and so whether ?1 is reinforcing or balancing.
- The delays on both of your links between training sessions delivered and support tickets.
- Nine suggested links: every row in the table marked "suggested". You left them to my call, so none of them is confirmed.
- How many people could use the app in total, which shows how empty the pool in B1 is.
- Who can see which people have stopped using the app, and who can change the app.
- The length of the small test and the number of people to ask.

## Next

1. **Owner: you.** This week, show the suggested links, and the training-to-tickets link, to one person who works inside the onboarding process, and ask them to mark each link right or wrong. Result: a marked-up links table with each change noted.
2. **Owner: you.** This week, find out who can see which people have stopped using the app, and write down what you expect the "What made you stop?" answers to show. Result: a list of people who have stopped, and your written prediction, ready before the first question goes out.
3. **Owner: you.** This week, pick one number that shows whether the pattern is changing, such as people who stop using the app per week, and record it on the same day each week. Result: the first entry in a weekly record next to the weekly users count.

## Grading

Strict rule for this round: any number or fact not in the user's input and not marked `[to confirm]` fails.

- P1: pass. Training sessions delivered to support tickets is "? [to confirm]" in the links table and "--(?)-->" in the text notation.
- P2: pass. The loop through that link is "?1 ... Type unknown until the link from training sessions delivered to support tickets is confirmed"; no loop through it is typed R or B.
- P3: pass. "Archetype: no standard archetype fits", with limits to growth named as the nearest match and not accepted.
- P4: pass. Level 6 leverage point labelled a hypothesis, with a small test ("What made you stop?"); text notation; SVG at a named rung (/tmp/systems-map-eval/r3/case2/, no script or event handlers; the only references are 11 internal `url(#arrow)` markers).
- P5: pass. The only figures are the user's (50, 400, March to May). The small test's length and the number of people to ask are `[to confirm]`, and "What you do not know yet" lists them. Owners are "you". The weekly cadence in next move 3 follows the user's own weekly-users measure and sets no count or length.
- Runner note: the skill asked a second time to confirm the links and asked who can act; the script had no reply for either, so the runner answered "I don't know, your call."
