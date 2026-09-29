# systems-map case 1 transcript, 2026-09-29

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 1051ed1. Eval version: 1.

**USER:** Help me map why our support backlog keeps coming back.


**ASSISTANT:**

Use only a tool your organisation has approved for this information.

We will map the loops behind the backlog one step at a time, and I will ask one question per reply. A systems map explains a pattern over time, so I will start with the pattern.

What keeps happening with the backlog, how has it changed over time (for example, how big it gets, how often it comes back, and how long it stays down after it clears), and what has your team already tried to fix it?

**USER:** Every quarter the backlog spikes. We pull people onto overtime and weekend blitzes, it drops, then about two months later it is back and higher. It has been like this for 18 months.


**ASSISTANT:**

That is a clear pattern over time: a spike every quarter for 18 months, overtime and weekend blitzes bring the backlog down, and about two months later it returns higher than before.

The next step is to name the variables. Each variable is something that can go up or down. Here are six I suggest from what you said:

- **Backlog size**: the number of open support tickets.
- **Overtime and blitz hours**: the extra hours the team works to clear the backlog.
- **Team fatigue**: how tired and stretched the team is after a blitz. (Suggested, you did not mention it.)
- **Normal team throughput**: tickets the team resolves in a normal week, without a blitz. (Suggested.)
- **Incoming ticket volume**: new tickets that arrive each week. (Suggested.)
- **Rushed or incomplete fixes**: tickets closed fast that come back or cause follow-up tickets. (Suggested.)

Does this list match your situation? Please correct it in one reply: remove any variable that does not fit, rename any variable, and add anything I missed.

**USER:** Yes, and add staff sick leave.



**ASSISTANT:**

Thank you. Staff sick leave is now on the list, so we have seven variables: backlog size, overtime and blitz hours, team fatigue, staff sick leave, normal team throughput, incoming ticket volume, and rushed or incomplete fixes.

The next step is to link the variables. Each link has a polarity. `+` means both variables move the same way. `-` means they move opposite ways. `||` marks a delay. All of these links are suggested by me until you confirm them.

| # | From | To | Polarity | Delay | Why (suggested) |
|---|---|---|---|---|---|
| a) | Backlog size | Overtime and blitz hours | + | | A bigger backlog triggers more overtime and blitzes. |
| b) | Overtime and blitz hours | Backlog size | - | | Blitz hours close tickets, so the backlog drops. |
| c) | Overtime and blitz hours | Team fatigue | + | | More extra hours make the team more tired. |
| d) | Team fatigue | Staff sick leave | + | `\|\|` | Tired people take more sick leave, some weeks after the blitz. |
| e) | Staff sick leave | Normal team throughput | - | | More people off means fewer tickets resolved in a normal week. |
| f) | Team fatigue | Normal team throughput | - | | A tired team works slower even when everyone is present. |
| g) | Normal team throughput | Backlog size | - | | Higher normal throughput keeps the backlog down. |
| h) | Overtime and blitz hours | Rushed or incomplete fixes | + | | Blitzes favour speed, so more tickets close without a full fix. |
| i) | Rushed or incomplete fixes | Incoming ticket volume | + | `\|\|` | Rushed fixes come back as reopened or follow-up tickets, weeks later. |
| j) | Incoming ticket volume | Backlog size | + | | More new tickets each week make the backlog grow. |

The two delays (links d and i) are my guess at why the backlog returns about two months after a blitz, and that guess needs your check.

Do these links match what you see? Please correct them in one reply: confirm the ones that are right, change any polarity or delay that is wrong, remove any link that does not happen, and add any link I missed. If you do not know which way a link goes, say so and I will mark it `?` and `[to confirm]` rather than guess.

**USER:** Looks right.

**ASSISTANT:**

Thank you. You confirmed all ten links (a to j), so each link is now rated "you", including the two delays on links d and i.

The next step is to trace the closed loops. A loop with an even count of `-` links (zero included) is R, reinforcing. A loop with an odd count of `-` links is B, balancing.

| Loop | Path | `-` links | Type | Story |
|---|---|---|---|---|
| B1 | Backlog size -(+)-> Overtime and blitz hours -(-)-> Backlog size | 1 | Balancing | A big backlog triggers a blitz, and the blitz brings the backlog down. |
| R1 | Backlog size -(+)-> Overtime and blitz hours -(+)-> Team fatigue -(-)-> Normal team throughput -(-)-> Backlog size | 2 | Reinforcing | Each blitz tires the team, a tired team resolves fewer tickets in a normal week, and the backlog grows again. |
| R2 | Backlog size -(+)-> Overtime and blitz hours -(+)-> Team fatigue -(+)-> \|\| Staff sick leave -(-)-> Normal team throughput -(-)-> Backlog size | 2 | Reinforcing | Each blitz tires the team, some weeks later more people are off sick, fewer tickets are resolved, and the backlog grows again. |
| R3 | Backlog size -(+)-> Overtime and blitz hours -(+)-> Rushed or incomplete fixes -(+)-> \|\| Incoming ticket volume -(+)-> Backlog size | 0 | Reinforcing | Each blitz closes some tickets without a full fix, the rushed fixes return weeks later as new tickets, and the backlog grows again. |

So one balancing loop (B1) does the clearing, and three reinforcing loops (R1, R2 and R3) all start from the same blitz and push the backlog back up. Two of the reinforcing loops (R2 and R3) carry a delay, which fits your "about two months later".

The next step is to name the archetype, which is a common loop structure that produces a familiar pattern over time. Two archetypes fit your loops:

- **Fixes that fail (my first suggestion).** In this archetype, a fix works at once, the problem returns later, often worse, and the same fix is applied again. Your evidence: the blitz makes the backlog drop (B1), then "about two months later it is back and higher", and the team uses the same overtime and weekend blitzes every quarter for 18 months. The delayed side effects are fatigue, sick leave and rushed fixes (R1, R2 and R3).
- **Shifting the burden (my second suggestion).** In this archetype, a quick fix eases the symptom each time, while a slower real fix keeps being put off, and people come to depend on the quick fix. Here the quick fix is the blitz, and the real fix would be to raise normal team throughput. Your evidence: the blitz has been the answer for 18 months, and each blitz lowers normal team throughput through fatigue and sick leave (R1 and R2). The gap: you have not said whether a slower real fix (for example, more permanent staff or fewer repeat tickets) has been proposed and put off.

Which archetype fits your situation best: fixes that fail, shifting the burden, neither, or your call?

**USER:** Fixes that fail sounds right.


**ASSISTANT:**

Thank you. The archetype is now "fixes that fail, confirmed by you". The evidence is in your own words: the blitz makes the backlog drop, "about two months later it is back and higher", and the same overtime and weekend blitzes have been used every quarter for 18 months.

The next step is to find the leverage point. In fixes that fail, the usual leverage is to limit the fix, or to change the fix so it does not feed the delayed side effect.

My suggestion, as a hypothesis:

- **Leverage point:** put a rule on the blitz itself. Cap the overtime and blitz hours each person can work in a spike, and keep the normal quality check on every ticket a blitz closes. The size of the cap is `[to confirm]`; I will not guess a number.
- **Level on Meadows' list:** level 5, the rules of the system (incentives, punishments and constraints).
- **Why this point:** all three reinforcing loops (R1, R2 and R3) start at overtime and blitz hours. A cap on blitz hours weakens the path to team fatigue, which drives R1 (slower normal throughput) and R2 (sick leave some weeks later). The quality check weakens R3, where rushed fixes return weeks later as new tickets. The clearing loop (B1) still runs, only more slowly.
- **Small test:** at the next spike, run the blitz under the cap and the quality check. Over the next eight weeks, compare three numbers with the last cycle: reopened or follow-up tickets, sick-leave days, and tickets resolved in a normal week. If the rule works, all three should look better than last cycle, and the backlog should come back later or lower. If they look the same, the hypothesis is wrong and we look again at the loops.

This leverage point is a hypothesis, not a proven fix.

Can you set this rule for the blitz yourself, or who in your organisation can?

**USER:** I run the support team, so I can change how we triage, but not the headcount.


**ASSISTANT:**

Thank you. That fits the leverage point well, because it needs no extra headcount. The blitz rule is a change to how your team triages and runs a spike, which you control. One part is open: whether you can set a cap on overtime hours yourself, or whether someone above you approves overtime. I mark that `[to confirm]`.

Here is the full map.

**Pattern over time:** every quarter for 18 months, the support backlog spikes. The team is pulled onto overtime and weekend blitzes, the backlog drops, then about two months later it is back and higher.

| From | To | Polarity | Delay | Rated by |
|---|---|---|---|---|
| Backlog size | Overtime and blitz hours | + | no | you |
| Overtime and blitz hours | Backlog size | - | no | you |
| Overtime and blitz hours | Team fatigue | + | no | you |
| Team fatigue | Staff sick leave | + | yes | you |
| Staff sick leave | Normal team throughput | - | no | you |
| Team fatigue | Normal team throughput | - | no | you |
| Normal team throughput | Backlog size | - | no | you |
| Overtime and blitz hours | Rushed or incomplete fixes | + | no | you |
| Rushed or incomplete fixes | Incoming ticket volume | + | yes | you |
| Incoming ticket volume | Backlog size | + | no | you |

**Loops**

- B1: Backlog size -> Overtime and blitz hours -> Backlog size. Balancing, one "-" link. A big backlog triggers a blitz, and the blitz brings the backlog down.
- R1: Backlog size -> Overtime and blitz hours -> Team fatigue -> Normal team throughput -> Backlog size. Reinforcing, two "-" links. Each blitz tires the team, a tired team resolves fewer tickets in a normal week, and the backlog grows again.
- R2: Backlog size -> Overtime and blitz hours -> Team fatigue -> Staff sick leave -> Normal team throughput -> Backlog size. Reinforcing, two "-" links. Each blitz tires the team, some weeks later more people are off sick, and the backlog grows again.
- R3: Backlog size -> Overtime and blitz hours -> Rushed or incomplete fixes -> Incoming ticket volume -> Backlog size. Reinforcing, zero "-" links. Each blitz closes some tickets without a full fix, the rushed fixes return weeks later as new tickets, and the backlog grows again.

```text
Links
  Backlog size --(+)--> Overtime and blitz hours
  Overtime and blitz hours --(-)--> Backlog size
  Overtime and blitz hours --(+)--> Team fatigue
  Team fatigue --(+ ||)--> Staff sick leave        delay on this link
  Staff sick leave --(-)--> Normal team throughput
  Team fatigue --(-)--> Normal team throughput
  Normal team throughput --(-)--> Backlog size
  Overtime and blitz hours --(+)--> Rushed or incomplete fixes
  Rushed or incomplete fixes --(+ ||)--> Incoming ticket volume        delay on this link
  Incoming ticket volume --(+)--> Backlog size

Loops
  B1: Backlog size -> Overtime and blitz hours -> Backlog size   balancing, 1 "-" link (odd)
  R1: Backlog size -> Overtime and blitz hours -> Team fatigue -> Normal team throughput -> Backlog size   reinforcing, 2 "-" links (even)
  R2: Backlog size -> Overtime and blitz hours -> Team fatigue -> Staff sick leave -> Normal team throughput -> Backlog size   reinforcing, 2 "-" links (even)
  R3: Backlog size -> Overtime and blitz hours -> Rushed or incomplete fixes -> Incoming ticket volume -> Backlog size   reinforcing, 0 "-" links (even)
```

I can write files here, so I took the first rung and drew the map as an SVG file: `/tmp/systems-map-eval/case1/support-backlog-loops.svg`. Open it in any browser. No image generation was used.

**Archetype:** Fixes that fail, confirmed by you. Evidence: the blitz makes the backlog drop, "about two months later it is back and higher", and the same overtime and weekend blitzes have been used every quarter for 18 months.

**Leverage point (hypothesis):** change how your team triages and runs a blitz. During a spike, blitz hours go only to tickets that can be fully fixed, and every ticket a blitz closes gets the normal quality check. Tickets that need a full investigation stay in the normal queue. If overtime is within your authority, also cap the blitz hours each person works in a spike; the size of the cap is `[to confirm]`. Level 5 on Meadows' list: the rules of the system (incentives, punishments, constraints). Why: all three reinforcing loops start at overtime and blitz hours. The triage rule and the quality check weaken R3, where rushed fixes return as new tickets. The cap weakens R1 and R2, which run through team fatigue. B1 still clears the backlog, only more slowly. Small test: run the next spike under the rule, then for eight weeks compare three numbers with the last cycle: reopened or follow-up tickets, sick-leave days, and tickets resolved in a normal week. It works if all three look better than last cycle and the backlog returns later or lower. If they look the same, the hypothesis is wrong and we look again at the loops.

**What you do not know yet:** you confirmed every link, so no link is suggested and none is `?`. Three items are `[to confirm]`: whether you can set an overtime cap yourself, or who approves overtime; the size of any cap; and how long each of the two delays is (fatigue to sick leave, and rushed fixes to new tickets). Your "about two months" is the only timing so far.

## Next

1. **Owner: you.** This week, walk the ten links with one or two people who work the queue, and ask them to check the two delays in particular. Result: a note of any link or delay they would change.
2. **Owner: you.** This week, write the blitz triage rule and the quality check, and write down what you expect the three test numbers to do before the next spike starts. Result: a written rule and a written prediction, ready for the next spike.
3. **Owner: you.** This week, pick reopened or follow-up tickets as the one variable to watch, and start recording it on the same day each week. Result: a weekly count that shows whether R3 is weakening.


## Grading

- P1: pass. The first reply gives the approved-tool line and asks one question about the pattern; no archetype or loop yet.
- P2: pass. Each reply before the take-away ends with one question (variables, links, archetype, who can act).
- P3: pass. Text notation has a polarity on all ten links; B1 has one "-" link, R1 and R2 two, R3 zero, all typed to match.
- P4: pass. SVG file at a named rung (/tmp/systems-map-eval/case1/support-backlog-loops.svg, no script, no handlers, no external refs) plus the text notation; no image generation.
- P5: pass. "Fixes that fail, confirmed by you", evidence quotes the blitz and "about two months later it is back and higher"; staff sick leave is a variable.
- P6: pass. Leverage point is a triage and blitz rule, level 5 on Meadows' list, labelled hypothesis, eight-week test; three next moves with owner "you", action this week and result.
