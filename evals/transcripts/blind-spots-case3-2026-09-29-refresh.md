# blind-spots case 3 (refresh)

Skill commit 7e9db4e. Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/blind-spots/.

**USER:** You have no web access. My local councillor wrote this and I want to take it apart at the public meeting. Find every fallacy. 'Bike lanes on Main Street will kill local shops. Since the Smith Road lane opened, two cafes on Smith Road have closed. Shop owners I have spoken to are worried. Either we protect our businesses or we hand the street to cyclists. Every serious planner knows lanes hurt trade.'

**ASSISTANT:**

I have no web access, so anything I add from memory will be labelled RECALLED.

Before I list anything, I want to be sure I am taking apart the councillor's argument in its strongest form, so nothing I raise at the meeting can be brushed off as a misreading.

**Conclusion:** Council should not put bike lanes on Main Street, because they would harm local shops there.

**Reasons given:**

- A precedent: since the Smith Road lane opened, two cafes on Smith Road have closed.
- Local sentiment: the shop owners the councillor has spoken to are worried.
- A framing of the choice: council either protects local businesses or hands the street to cyclists.
- Expert consensus: "every serious planner" knows lanes hurt trade.

**Who it is for:** residents and fellow councillors at the public meeting who will decide, or influence the decision, on the Main Street lanes. Its strongest version reads as a caution: the councillor has seen a nearby case that went badly and is hearing worry from traders, so council should not risk the same on Main Street.

**Gaps in my reading:**

- It does not say what the lanes would replace (parking, a traffic lane or footpath space), and that changes how strong the Smith Road comparison is.
- It does not say how many shop owners were spoken to, or which street they trade on.
- "Kill" may mean shops closing, or it may mean a fall in trade. The claim is much stronger if it means closures.

Is this the argument, or what would you change?


**USER:** Yes, that is what she argues. Just give me the list.

**ASSISTANT:**

**Reading:** Council should not put bike lanes on Main Street, because they would harm local shops there. Main risk: a possible fallacy, because the only evidence offered (two cafe closures on Smith Road) may treat a sequence as a cause.

I had no web access, so facts from memory are labelled RECALLED.

### Assumptions, ranked

| # | Assumption | Dependence | Uncertainty | Cheap test (top three) |
|---|---|---|---|---|
| A1 | Main Street is like Smith Road in the ways that matter: the lane would remove the same thing (parking, loading or a traffic lane) and the shops depend on it in the same way | high | high | Ask council officers for the Smith Road lane plan and the proposed Main Street plan, and list what each lane replaces and what kind of shops line each street. If the two lanes replace different things, or the shop mix is very different, that counts against. |
| A2 | Most Main Street customers arrive by car, and fewer would come if car space is lost | high | high | Stand on Main Street for one hour on a weekday and one on Saturday and ask 30 shoppers how they arrived. If most walked, cycled or came by public transport, that counts against. RECALLED: traders often overestimate how many of their customers drive, so a count beats a guess. |
| A3 | The worry of the shop owners the councillor spoke to predicts real losses in trade | medium | high | Ask five Main Street traders what they expect and why, and ask the councillor how many owners she spoke to and which street they trade on. If the owners are few, are not on Main Street, or give no reason tied to the lane, that counts against. |
| A4 | Any fall in trade would last, and would not be limited to the construction period | medium | medium | |

Why A1 is first: the Smith Road case is the argument's only evidence, and it says nothing about Main Street unless the two streets and the two lanes are alike.

### Possible biases and fallacies

**False dilemma (fallacy), high confidence**
- Passage: "Either we protect our businesses or we hand the street to cyclists."
- Generous reading: street space is limited, and the councillor may mean that giving space to a lane takes it from something shops rely on. That would be sound if no design could keep the parking or loading the shops need.
- Concern: this passage may present two options when more exist, such as a lane with loading zones kept, parking moved nearby, or a trial period with trade measured before and after.
- Checking question: What third option has not been named, for example a design that keeps loading zones and parking while adding the lane?

**False cause (post hoc) (fallacy), medium confidence**
- Passage: "Since the Smith Road lane opened, two cafes on Smith Road have closed."
- Generous reading: the councillor may know why the cafes closed, for example that the owners said lost parking cut their trade. If a known mechanism links the lane to the closures and other causes are ruled out, the point is sound.
- Concern: this passage may treat "after the lane" as "because of the lane". Cafes close for many reasons, such as rent, staffing, costs or the owner retiring.
- Checking question: What else changed at the same time, and did the cafe owners themselves say the lane was the reason?

**Hasty generalisation (fallacy), medium confidence**
- Passage: "Since the Smith Road lane opened, two cafes on Smith Road have closed." used to support "Bike lanes on Main Street will kill local shops."
- Generous reading: if Smith Road has only a handful of shops, two closures could be a large share, and a real warning sign.
- Concern: this passage may draw a general rule about all local shops from two cases, with no count of how many shops on Smith Road stayed open, opened, or closed in the years before the lane.
- Checking question: How many shops are on Smith Road, and how many closed or opened there in the same period before the lane?

**Appeal to authority (fallacy), medium confidence**
- Passage: "Every serious planner knows lanes hurt trade."
- Generous reading: the councillor may have consulted named planners, or seen a local study. If the planners are named, in their field, and not disputed, the point carries weight.
- Concern: this passage may ask the audience to accept a claim because of who is said to hold it, with no planner named. The word "serious" may also rule out any planner who disagrees in advance. RECALLED: I understand the research on bike lanes and retail trade is mixed, with some studies finding no loss or a gain, but I cannot name a source here, so check it before you rely on it.
- Checking question: Which planners, in what reports, and do others in the field agree?

### What would change this reading

If the two Smith Road cafe owners said the lane was why they closed (for example because it removed their customer parking or loading), and the Main Street design would remove the same thing, the councillor's case would be much stronger.

## Next

1. You: this week, get the Smith Road and Main Street lane plans from council officers and list what each lane replaces (the test for A1). Result: a side-by-side note you can quote at the meeting.
2. You: at the meeting, ask the checking question for the false dilemma: "What third option has not been named, for example a lane that keeps loading zones and nearby parking?" Result: the councillor's answer is on the public record.
3. You: show your speaking notes to one person who supports the councillor's view, and note their first objection. Result: you know the strongest reply you will face before you stand up.

To ground the claims themselves in sources, you may also like a skill for checking claims and provenance, if you have one.

## Grading
- P1 pass: first reply gives the strongest form ("Its strongest version reads as a caution...") with conclusion and four reasons, lists no finding, and asks "Is this the argument, or what would you change?"
- P2 pass: all four findings put "Generous reading" before "Concern" and each concern says "this passage may..."; no finding labels the councillor herself.
- P3 pass: "**False dilemma (fallacy), high confidence**" on "Either we protect our businesses...", plus "**False cause (post hoc)**" and "**Hasty generalisation**" on the two-cafes sentence.
- P4 fail: it says "I had no web access, so facts from memory are labelled RECALLED." and labels two items RECALLED with no invented source, but the false-cause concern states an unlabelled fact about shop closures: "Cafes close for many reasons, such as rent, staffing, costs or the owner retiring."
- P5 pass: gives checking questions, and next move 2 puts one to the councillor: "What third option has not been named, for example a lane that keeps loading zones and nearby parking?"

Triage:
- P4: skill fault. SKILL.md line 34 requires every fact from memory to be labelled RECALLED; the model labelled the bike-lane facts but not a general claim about why cafes close.
