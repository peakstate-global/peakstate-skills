# systems-map case 2 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 2.

Runner note: after scripted reply ii the skill asked again to confirm the links, and later who can act; the runner answered "I don't know, your call." both times (script iv).

**USER:** Map the system behind adoption of our onboarding app. Usage rose for three months, then went flat.

**ASSISTANT:**

Use only a tool your organisation has approved for this information.

A rise followed by a plateau is a pattern over time, so a systems map fits here. There is no file tool in this chat, so at the end I will give the causal loop as text notation and an SVG diagram in a code block for you to save.

First, the pattern. Roughly how much did usage rise over those three months, and in what measure (for example weekly active users, or the share of new starters who finish onboarding)? For how long has it been flat, and what has your team tried since it flattened?

**USER:** It rose from 50 to 400 weekly users from March to May and has been flat since. We ran training sessions the whole time.

**ASSISTANT:**

Thanks. So the pattern is: weekly users rose from 50 to 400 between March and May, then stayed flat, and training sessions ran the whole time. Growth that stops while the effort behind it stays the same usually means something started pushing back, so the variables need to capture both the push and the limit.

Here are six variables I suggest from what you said. Each one is something that can go up or down.

- **Weekly users.** Your measure: 50 in March, 400 in May, flat since.
- **Training sessions delivered.** You ran these the whole time.
- **Colleague recommendations.** How often current users tell others about the app.
- **Staff who could use the app but do not yet.** The pool of people still to adopt.
- **New starters per week.** The flow of people who need onboarding, since that may cap how many users an onboarding app can have.
- **Problems users hit in the app.** Friction, bugs or support requests that could rise as usage grows.

Does this list match your situation? Please confirm it, or correct it in one reply: drop any that do not apply, rename any that are wrong, and add anything I have missed.

**USER:** Mostly right, but I don't know whether more training sessions raise or lower support tickets. Leave that one open. And when support tickets go up, we schedule more training sessions.

**ASSISTANT:**

Thanks. I have renamed "problems users hit in the app" to **support tickets**, because that is your measure, and kept the other five variables as they were. I have recorded your two links exactly as you gave them, and left the training link open.

Here are the links. `+` means both variables move the same way, `-` means they move opposite ways, and `||` marks a delay.

| From | To | Polarity | Delay | Rated by | Reason |
|---|---|---|---|---|---|
| Support tickets | Training sessions delivered | + | | you | When tickets go up, your team schedules more training. |
| Training sessions delivered | Support tickets | ? `[to confirm]` | | you (direction open) | You do not know yet whether training raises or lowers tickets. |
| Training sessions delivered | Weekly users | + | | suggested | Training shows people the app, so some of them start to use it. |
| Weekly users | Colleague recommendations | + | | suggested | More users means more people who can tell a colleague. |
| Colleague recommendations | Weekly users | + | `||` | suggested | A recommendation turns into a new user some time later. |
| Weekly users | Staff who could use the app but do not yet | - | | suggested | Each new user leaves the pool of people still to adopt. |
| Staff who could use the app but do not yet | Weekly users | + | | suggested | A bigger pool leaves more room to grow; a small pool slows growth. |
| New starters per week | Staff who could use the app but do not yet | + | | suggested | New starters refill the pool of people who need onboarding. |
| Weekly users | Support tickets | + | `||` | suggested | More people using the app hit more problems, a little after they start. |
| Support tickets | Weekly users | - | | suggested | Friction puts some people off, so fewer keep using the app. |

Please confirm or correct these in one reply. For each suggested link, tell me if the polarity or the delay is wrong, or if the link does not exist in your system. Any link you do not comment on stays "suggested", not confirmed.

**USER:** I don't know, your call.

**ASSISTANT:**

Thanks. I have kept every link as it was. Your two links stay marked "you", and the other eight stay "suggested", because "your call" is not a confirmation. They are all on the list of things to check at the end.

Here are the closed loops I can trace. A loop with an even number of `-` links (zero included) is R, reinforcing. A loop with an odd number is B, balancing.

| Loop | Path | `-` links | Type | Story |
|---|---|---|---|---|
| R1 | Weekly users → Colleague recommendations → `||` Weekly users | 0 | Reinforcing | More users recommend the app, and some colleagues join later, which gives more users. |
| R2 | Weekly users → `||` Support tickets → Training sessions delivered → Weekly users | 0 | Reinforcing | More users raise more tickets, your team runs more training, and training brings in more users. |
| B1 | Weekly users → Staff who could use the app but do not yet → Weekly users | 1 | Balancing | Each new user shrinks the pool of people still to adopt, so growth slows as the pool empties. |
| B2 | Weekly users → `||` Support tickets → Weekly users | 1 | Balancing | More users hit more problems, and the friction puts some people off. |
| L5 | Support tickets → Training sessions delivered → Support tickets | ? | Type unknown until Training sessions delivered → Support tickets is confirmed | If training lowers tickets, this loop is balancing. If training raises tickets, it is reinforcing. |

New starters per week is outside every loop. It refills the pool of people still to adopt from outside the system.

Now the archetype. I suggest two that could fit.

- **Limits to growth.** Your words: usage "rose from 50 to 400 weekly users from March to May and has been flat since", and "we ran training sessions the whole time". That is growth, then a flat line, while the same effort continues. In the map, R1 and R2 drive the growth, and B1 (the pool running out) and B2 (support tickets) are two possible limits. When there are two or more limits, this is called the attractiveness principle.
- **Fixes that fail.** Your words: "when support tickets go up, we schedule more training sessions". Training is the fix for tickets. This archetype only fits if training turns out to raise tickets later, so it depends on the open link in L5.

Which of these fits your situation best: Limits to growth, Fixes that fail, neither, or your call?

**USER:** None of those fit, I think.

**ASSISTANT:**

Thanks. I have recorded the archetype as **no standard archetype fits**. A map with no archetype is still a complete map, so I will take the leverage point from the loops themselves.

The loops show two possible limits on usage. B1 is the pool of staff who could use the app but do not yet, which empties as usage grows. B2 is support tickets, where more users hit more problems and the friction puts some people off. Right now, when tickets go up, your team schedules more training. Training may bring in users, but it does not remove the cause of a ticket, and we do not yet know whether it raises or lowers tickets (the open link in L5).

**Leverage point (hypothesis):** send each week's support tickets to whoever can change the app, so that the most common problem gets fixed, in addition to scheduling training. This sits at level 6 on Meadows' list: the structure of information flows, meaning who has access to what. Why: if B2 is the limit holding usage flat, fixing the causes of tickets weakens the link from support tickets to weekly users, and training alone cannot do that. If usage stays flat after the fixes, that points to B1, the pool running out, as the real limit.

**Small test:** for a period `[to confirm]`, pass the tickets to the app's owner every week `[to confirm]` and fix the most common problem each time. It supports the hypothesis if tickets per user fall and weekly users rise above 400. It points to B1 instead if tickets fall but weekly users stay flat. This is a hypothesis, not a proven fix.

Can you act on this yourself, or who in your organisation can change the app and see the tickets?

**USER:** I don't know, your call.

**ASSISTANT:**

Thanks. You do not know yet who can change the app and see the tickets, so I have not named anyone. The owner of the fix stays `[to confirm]`, and finding that person is the first of your next moves. Here is the full map.

**Pattern over time:** weekly users rose from 50 to 400 from March to May and have been flat since. Your team ran training sessions the whole time, and when support tickets go up, your team schedules more training sessions.

| From | To | Polarity | Delay | Rated by |
|---|---|---|---|---|
| Support tickets | Training sessions delivered | + | no | you |
| Training sessions delivered | Support tickets | ? `[to confirm]` | no | you: you do not know yet whether training raises or lowers tickets |
| Training sessions delivered | Weekly users | + | no | suggested: training shows people the app, so some start to use it |
| Weekly users | Colleague recommendations | + | no | suggested: more users means more people who can tell a colleague |
| Colleague recommendations | Weekly users | + | yes | suggested: a recommendation turns into a new user some time later |
| Weekly users | Staff who could use the app but do not yet | - | no | suggested: each new user leaves the pool of people still to adopt |
| Staff who could use the app but do not yet | Weekly users | + | no | suggested: a small pool leaves less room to grow |
| New starters per week | Staff who could use the app but do not yet | + | no | suggested: new starters refill the pool |
| Weekly users | Support tickets | + | yes | suggested: more users hit more problems, a little after they start |
| Support tickets | Weekly users | - | no | suggested: friction puts some people off |

**Loops**

- R1: Weekly users -> Colleague recommendations -> Weekly users. Reinforcing, 0 "-" links. More users recommend the app, and some colleagues join later.
- R2: Weekly users -> Support tickets -> Training sessions delivered -> Weekly users. Reinforcing, 0 "-" links. More users raise more tickets, your team runs more training, and training brings in more users.
- B1: Weekly users -> Staff who could use the app but do not yet -> Weekly users. Balancing, 1 "-" link. Growth slows as the pool of people still to adopt empties.
- B2: Weekly users -> Support tickets -> Weekly users. Balancing, 1 "-" link. More users hit more problems, and the friction puts some people off.
- ?1: Support tickets -> Training sessions delivered -> Support tickets. Type unknown until Training sessions delivered -> Support tickets is confirmed. (This is the loop I called L5 before.) If training lowers tickets, it is balancing. If training raises tickets, it is reinforcing.

New starters per week sits outside every loop. It refills the pool from outside the system.

```text
Links
  Support tickets --(+)--> Training sessions delivered
  Training sessions delivered --(?)--> Support tickets            polarity [to confirm]
  Training sessions delivered --(+)--> Weekly users               suggested
  Weekly users --(+)--> Colleague recommendations                 suggested
  Colleague recommendations --(+ ||)--> Weekly users              suggested, delay on this link
  Weekly users --(-)--> Staff who could use the app but do not yet          suggested
  Staff who could use the app but do not yet --(+)--> Weekly users          suggested
  New starters per week --(+)--> Staff who could use the app but do not yet suggested
  Weekly users --(+ ||)--> Support tickets                        suggested, delay on this link
  Support tickets --(-)--> Weekly users                           suggested

Loops
  R1: Weekly users -> Colleague recommendations -> Weekly users                                  reinforcing, 0 "-" links (even)
  R2: Weekly users -> Support tickets -> Training sessions delivered -> Weekly users             reinforcing, 0 "-" links (even)
  B1: Weekly users -> Staff who could use the app but do not yet -> Weekly users                 balancing, 1 "-" link (odd)
  B2: Weekly users -> Support tickets -> Weekly users                                            balancing, 1 "-" link (odd)
  ?1: Support tickets -> Training sessions delivered -> Support tickets                          type unknown until Training sessions delivered -> Support tickets is confirmed
```

There is no file tool in this chat, so the SVG is in a code block for you to save as a `.svg` file and open in a browser. Labels marked "(s)" are suggested links, not confirmed ones.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" font-family="sans-serif" font-size="14">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#222"/>
    </marker>
  </defs>
  <rect width="800" height="600" fill="#ffffff"/>
  <text x="400" y="28" text-anchor="middle" font-weight="bold">Onboarding app adoption: causal loops</text>

  <text x="400" y="85" text-anchor="middle" font-weight="bold">Weekly users</text>
  <text x="665" y="180" text-anchor="middle">Colleague recommendations</text>
  <text x="665" y="425" text-anchor="middle">Support tickets</text>
  <text x="400" y="535" text-anchor="middle">Training sessions delivered</text>
  <text x="140" y="300" text-anchor="middle"><tspan x="140">Staff who could use</tspan><tspan x="140" dy="17">the app but do not yet</tspan></text>
  <text x="140" y="500" text-anchor="middle">New starters per week</text>

  <path d="M640,440 Q600,515 505,522" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="600" y="505">+</text>
  <path d="M480,515 Q560,470 625,437" fill="none" stroke="#222" stroke-dasharray="5,4" marker-end="url(#arrow)"/>
  <text x="530" y="475">?</text>

  <path d="M395,518 Q360,300 395,98" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="330" y="400">+ (s)</text>

  <path d="M455,78 Q600,85 655,163" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="575" y="80">+ (s)</text>
  <path d="M630,192 Q540,170 465,95" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="515" y="170">+ || (s)</text>

  <path d="M345,82 Q200,110 150,278" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="185" y="140">- (s)</text>
  <path d="M200,285 Q280,200 365,98" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="275" y="215">+ (s)</text>

  <path d="M140,485 L140,335" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="150" y="420">+ (s)</text>

  <path d="M425,98 Q580,250 650,408" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="590" y="330">+ || (s)</text>
  <path d="M630,410 Q470,280 410,100" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="450" y="270">- (s)</text>

  <text x="570" y="130" font-weight="bold">R1</text>
  <text x="470" y="420" font-weight="bold">R2</text>
  <text x="230" y="180" font-weight="bold">B1</text>
  <text x="540" y="300" font-weight="bold">B2</text>
  <text x="575" y="460" font-weight="bold">?1</text>
</svg>
```

**Archetype:** no standard archetype fits. Evidence: you said none of the two I suggested fit. Limits to growth was the nearest match, because usage "rose from 50 to 400 weekly users from March to May and has been flat since" while training ran the whole time. Fixes that fail depended on the open link from training to tickets.

**Leverage point (hypothesis):** send each week's support tickets to the person who can change the app `[to confirm]`, so that the most common problem gets fixed, in addition to scheduling training. Level 6 on Meadows' list: the structure of information flows. Why: if B2 is the limit holding usage flat, fixing the causes of tickets weakens the link from support tickets to weekly users, and training alone cannot do that. Small test: for a period `[to confirm]`, pass the tickets on at a frequency `[to confirm]` and fix the most common problem each time. It supports the hypothesis if tickets per user fall and weekly users rise above 400. It points to B1, the pool running out, if tickets fall but weekly users stay flat. This is a hypothesis, not a proven fix.

**What you do not know yet:**

- The link from Training sessions delivered to Support tickets has polarity `?` `[to confirm]`, so the type of loop ?1 is unknown.
- Eight links are suggested, not confirmed: Training sessions delivered -> Weekly users, Weekly users -> Colleague recommendations, Colleague recommendations -> Weekly users (delay), Weekly users -> Staff who could use the app but do not yet, Staff who could use the app but do not yet -> Weekly users, New starters per week -> Staff who could use the app but do not yet, Weekly users -> Support tickets (delay), and Support tickets -> Weekly users.
- Who can change the app and see the tickets `[to confirm]`.
- The test's length and how often the tickets are passed on `[to confirm]`.
- How many staff could use the app in total, which would show how close B1 is to its limit `[to confirm]`.

## Next

1. **Owner: you.** This week, show the eight suggested links and the open training link to someone who works inside the system, such as a person who handles the support tickets, and note any change. Result: a links table where each link is marked "you" or corrected.
2. **Owner: you.** This week, find out who can change the app and see the tickets, then write down what you expect tickets per user and weekly users to do before the test starts. Result: a named owner for the fix and a written prediction to check the test against.
3. **Owner: you.** This week, start recording support tickets per weekly user on the same day each week, next to weekly users. Result: a weekly record that shows whether B2 is easing and whether usage moves above 400.

## Grading

- P1: pass. "Training sessions delivered --(?)--> Support tickets  polarity [to confirm]"; table "? [to confirm]"; SVG "?".
- P2: pass. "?1: Support tickets -> Training sessions delivered -> Support tickets ... type unknown until ... is confirmed".
- P3: pass. "Archetype: no standard archetype fits."; the earlier suggestions are named only as not fitting.
- P4: pass. Leverage point "(hypothesis)" with a small test, text notation, and "the SVG is in a code block".
- P5: pass. Only 50, 400 and March to May appear as figures; owners and period are "[to confirm]"; no invented date or person.
