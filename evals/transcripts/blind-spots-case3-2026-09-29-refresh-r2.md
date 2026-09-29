# blind-spots case 3 (refresh, re-run on fixed skill)

Skill commit FIXED-blind-spots (uncommitted edit on 7e9db4e). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/blind-spots/.

**USER:** You have no web access. My local councillor wrote this and I want to take it apart at the public meeting. Find every fallacy. 'Bike lanes on Main Street will kill local shops. Since the Smith Road lane opened, two cafes on Smith Road have closed. Shop owners I have spoken to are worried. Either we protect our businesses or we hand the street to cyclists. Every serious planner knows lanes hurt trade.'

**ASSISTANT:**

Before I list anything, I want to be sure I am taking apart the argument the councillor actually made, in its strongest form. A public meeting is where a weak version gets answered and the strong version survives.

Here is my reading of it:

- **Conclusion:** Main Street should not get a bike lane, because a lane would cause local shops there to close.
- **Reasons given:**
  - i) Since the Smith Road lane opened, two cafes on Smith Road have closed.
  - ii) Shop owners the councillor has spoken to are worried about the lane.
  - iii) The choice is between protecting local businesses and giving the street to cyclists.
  - iv) Serious planners agree that bike lanes hurt trade.
- **Who it is for:** residents and fellow councillors deciding on the Main Street lane, most likely with shop owners and people who value the local high street in mind.

In its strongest form, the councillor's case is that a nearby street already shows what happens when a lane goes in, the people with the most at stake are worried, and the view matches expert opinion, so Main Street should not take the risk.

The gaps I can see in the text, which I am not treating as findings yet:

- It does not say when the Smith Road lane opened, or when the two cafes closed.
- It does not say how many shop owners were asked, or what exactly worries them (lost parking, fewer deliveries, the construction period).
- It does not name any of the planners, or say what "hurt trade" means (sales, foot traffic, or closures).

I have no web access, so I cannot check any of this against local records or studies. Any fact I bring in later from memory will be labelled RECALLED.

One note on "every fallacy": I will list only the ones a quoted passage clearly shows, each with the most generous reading first. That list will be the one you can defend in the room when someone pushes back.

Is this the argument, or what would you change?


**USER:** Yes, that is what she argues. Just give me the list.

**ASSISTANT:**

**Reading:** Main Street should not get a bike lane, because the councillor says a lane would cause local shops there to close. Main risk: a possible fallacy (the Smith Road closures are offered as proof of cause).

I had no web access, so facts from memory are labelled RECALLED. I have used none below; where a fact matters, I have phrased it as something to check.

### Assumptions, ranked

| # | Assumption | Dependence | Uncertainty | Cheap test (top three) |
|---|---|---|---|---|
| A1 | Main Street shops depend on customers whose trips the lane would cut (for example, people who park out the front) | high | high | Stand on Main Street for an hour on a weekday and an hour on Saturday, and tally how shoppers arrive (car, foot, bike, bus). If most arrive other than by parking out the front, that counts against it. |
| A2 | The Main Street lane would take the same space as the Smith Road lane (parking, loading bays, footpath) | high | medium | Compare the Main Street lane plan with the Smith Road layout for parking and loading bays lost. If Main Street keeps most of its bays, that counts against it. |
| A3 | The shop owners' worry predicts a real fall in trade | medium | high | Ask three to five owners still trading on Smith Road whether takings fell after the lane opened. If most say takings held or rose, that counts against it. |
| A4 | Any trade lost would outweigh what the lane brings (new customers on bikes, safer street) | medium | medium | |

Why A1 is first: if Main Street's customers do not arrive in the way the lane affects, there is no route by which the lane could harm the shops.

### Possible biases and fallacies

**False dilemma (fallacy), high confidence**
- Passage: "Either we protect our businesses or we hand the street to cyclists."
- Generous reading: street space is limited, so a lane may take parking or loading space that shops use. On a narrow street with no other space, that is a real trade-off.
- Concern: this passage may present two options where more exist, such as a lane that keeps loading bays, a lane on a parallel street, or a trial period.
- Checking question: What third option has not been named, and has the council looked at it?

**Appeal to authority (fallacy), high confidence**
- Passage: "Every serious planner knows lanes hurt trade."
- Generous reading: the councillor may have read or heard planners who warn about trade effects. An appeal to experts is sound when they are named, in their field, and not disputed.
- Concern: this passage may ask the audience to accept the claim because of who is said to hold it, with no planner named and no study cited. The word "serious" may also shut out any planner who disagrees.
- Checking question: Which planners exactly, in what work, and do others in the field agree?

**False cause (post hoc) (fallacy), medium confidence**
- Passage: "Since the Smith Road lane opened, two cafes on Smith Road have closed."
- Generous reading: the councillor may know from the owners that the lane cut their trade. If the owners said so and nothing else changed, the link would be reasonable.
- Concern: this passage may treat a sequence as a cause. Cafes can close for other reasons (rent, lease end, owner retiring), and the text gives none of the timing.
- Checking question: What else changed for those two cafes at the same time, and what did the owners say closed them?

**Hasty generalisation (fallacy), medium confidence**
- Passage: "Bike lanes on Main Street will kill local shops." offered on the evidence of "two cafes on Smith Road have closed."
- Generous reading: if Smith Road only had a few cafes, two closures could be a large share of them.
- Concern: this passage may draw a general rule about all local shops from two cases of one type, on one street.
- Checking question: How many shops are on Smith Road, how many have opened or closed since the lane, and is that different from before?

### What would change this reading

Records or owner statements showing that trade on Smith Road as a whole fell after the lane opened, and that the two cafes closed because of that fall, would turn the councillor's main example into real evidence.

## Next

1. You: before the meeting, ask two or three Smith Road shop owners why the cafes closed and how their own takings have moved since the lane opened (tests A3 and the post hoc finding). Result: a note of what each owner said.
2. You: at the meeting, ask the councillor "Which planners, and in what work?" about the line "Every serious planner knows lanes hurt trade." Result: either a named source you can check, or the claim on record as unsupported.
3. You: show your rebuttal points to one person who backs the councillor, and note their first objection. Result: the strongest reply you will face in the room, known in advance.

To ground the claims themselves in sources, you may also like a skill for checking claims and provenance, if you have one.

## Grading
- P1 pass: "In its strongest form, the councillor's case is that a nearby street already shows what happens..." then "Is this the argument, or what would you change?" before any finding.
- P2 pass: all four findings put "Generous reading" before "Concern" and use "may" (e.g. "this passage may present two options where more exist"). No label is applied to the councillor herself.
- P3 pass: "**False dilemma (fallacy), high confidence**" on "Either we protect our businesses or we hand the street to cyclists." plus "**False cause (post hoc)**" and "**Hasty generalisation**" on the two-cafes sentence.
- P4 pass: "I had no web access, so facts from memory are labelled RECALLED. I have used none below". No study, author, year or URL. Plain reading: "Cafes can close for other reasons (rent, lease end, owner retiring)" is offered as candidate alternative causes and followed by a checking question, so it reads as a suggestion rather than an asserted fact about bike lanes and trade.
- P5 pass: each finding has a checking question, and Next 2 is "ask the councillor 'Which planners, and in what work?'".

Triage:
