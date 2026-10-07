---
name: six-perspectives
description: Decisions get stuck when people argue from different angles at the same time. This skill looks at one angle at a time, so every view is heard and the decision gets made. Looks at a decision, plan or idea in six modes, one at a time (facts, feelings, risks, benefits, ideas and process). It asks for the user's own view in each mode before it adds suggestions, keeps every item in its mode, and ends with a synthesis and three next moves. Based on Edward de Bono's parallel thinking method. Use when someone says "look at this from every angle", "help me think this through", "parallel thinking", "de Bono hats", "pros and cons and gut feel", "should I do this", or before a group or a person makes a decision.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "guided"
  output: "text"
---

This skill looks at one decision in six modes, one mode at a time, and ends with a synthesis that shows where the modes agree and where they pull apart.

## Steps

Run the steps in order. Ask one question at a time and wait for the answer. If the topic may be sensitive (people, money, health, unannounced changes), say once, in your first reply only: "Use only a tool your organisation has approved for this information." Do not repeat it in later replies.

Rules for every mode:

- **Stay in the mode.** Everyone looks in the same direction at the same time. Do not argue with an item from another mode. If the user gives an item that belongs to another mode (a worry during benefits), say where it goes and put it there. Never drop it. An item that fits no mode goes to "Parked".
- **User first.** Ask for the user's view in the mode, then add up to four suggested items from `references/modes.md`. Mark every item "yours" or "suggested". A "yours" item holds only the user's words, unchanged except "I" and "our" become "you" and "your". Add nothing to it, not even a few words. To add to a user's item, write a separate "suggested" item. If you have no source or give no figure, say so once in the reply text, never inside an item. A line that records a gap ("not given", or "[to confirm]" for the decision-maker or the date) is not an item and carries no marker. If the user rejects a suggested item, drop it, and do not bring it back in a later mode or in the next moves.
- **Nothing to add is allowed.** If the user has nothing for a mode, do not argue or stop. Record "none from you", add suggested items, and move on.
- **No invention.** Never invent a person, a date, a number, a study or a source. This covers suggested items too: say "a shorter or smaller trial", not "one month" or "half the team", unless the user gave the size. A fact from memory is labelled RECALLED. A fact the user is not sure of is "[to confirm]".
- **About the user.** On a personal question, every statement about the user's causes, motives, feelings, habits, history or situation that the user did not state is a question, or "A possible reading to test: ... [to confirm]". Never assume gender, age, family or money.

To save turns, give the suggested items for one mode and the question for the next mode in the same reply.

0. **Confirm the topic.** This step is never skipped, even after "skip the questions" or "just give me the answer". Restate in at most three lines: the topic, the question to decide, and any date or decision-maker the user gave. Name one gap if there is one. End with: "Is this the question, or what would you change?" Run no mode until the user confirms.
1. **Facts.** Ask: "What do you know for sure, and what do you not know yet?" Split the answer into known facts (with where each comes from: "you said", a document the user gave, or RECALLED) and gaps to find out. Add gaps, not facts, as suggestions.
2. **Feelings.** Ask: "What is your gut reaction, in a few words? No reasons needed." Record the user's words as given. Do not name, explain or judge the user's feeling. Suggested items are likely reactions of other people, each marked "a possible reaction to test".
3. **Risks.** Ask: "What could go wrong, or what worries you about it?"
4. **Benefits.** Ask: "What would be better if this goes ahead, and for whom?" A suggested benefit says what it rests on.
5. **Ideas.** Ask: "What other ways could this be done, including ones that deal with the risks?" Suggested ideas answer the top risks or open a new option. If the user rejects every idea, the ideas section reads "No idea kept. The user rejected every suggested idea."
6. **Process.** Ask: "Who decides, by when, and what do they need to see?" Record the decision-maker and date only as the user gives them; otherwise "[to confirm]".

If the user says to skip the per-mode questions after step 0, run modes 1 to 6 in one reply. Every item is then "suggested", except what the user already said. Feelings reads "Your gut reaction: not given." plus possible reactions of others.

## The take-away

Deliver the take-away in the order of the template in `references/take-away.md`:

- The synthesis first: the question, the decision status, where the modes agree, the main tension between modes, and what would change the reading.
- One section per mode, in mode order, each item marked "yours" or "suggested", then "Parked" if anything is parked.
- The credit line below, word for word, as the last line of the take-away.
- The decision status is "Not decided" unless the user said what they decided or lean towards. Never write a lean or a decision the user did not state. The skill's own reading is labelled "My reading".

Based on Edward de Bono's parallel thinking method, known as Six Thinking Hats®.

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a person or role the user named. Never invent a person, a date, a number or a source. A move never brings back an idea the user rejected. If the obvious move is a rejected idea, the move asks the user to choose a first step they would accept instead. Write every move in this shape: "**Owner:** [who]. This week: [first action]. Result: [what someone could see]."

1. Close the gap in the facts that would most change the reading.
2. Act on the top risk: test it, or start the idea that answers it.
3. Put the decision in front of the decision-maker in the form they need, or set the date for it.

To test the plan behind the decision, the user may also like a skill for a pre-mortem or for finding blind spots, if they have one. Do not run it for them.

## Self-check before you deliver

- The user confirmed the topic and question before any mode ran.
- The modes ran in order, one per turn (unless the user asked to skip), and each asked for the user's view before any suggestion.
- Every item sits in its own mode, is marked "yours" or "suggested", and nothing the user said was dropped (check "Parked"). Every "yours" item holds only the user's words, unchanged, with no text of yours appended; any "no source" or "no figure" note is in the reply text, not in an item.
- The feelings section records the user's words and does not name or explain the user's feeling.
- No person, date, number, study or source was invented, in suggested items too; memory is labelled RECALLED; unsure facts read "[to confirm]".
- On a personal question, every statement about the user that the user did not state is a question or a marked possible reading.
- The decision status is "Not decided" unless the user stated a decision or lean. No rejected idea comes back anywhere, including the next moves.
- The take-away ends with the credit line word for word; "Six Thinking Hats" appears nowhere else, never in a heading or as a name.

## Read this when

| File | When |
|---|---|
| `references/modes.md` | Adding suggested items in any mode, or checking what belongs in which mode |
| `references/take-away.md` | Writing the final output, or checking a worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.

## Reference: modes.md

# The six modes

Each entry carries a source id, such as (S1), that resolves in `SOURCES.md`. Where a rule is this skill's own choice, the source reads (skill rule).

## Parallel thinking (S1, S2)

In each mode, everyone looks in the same direction at the same time. Ideas are put side by side, not attacked. The modes separate kinds of thinking so a person or group does one kind at a time (S1, S2). The process mode frames the thinking at the start and closes it at the end (S2, S3). In this skill, step 0 is the framing and step 6 is the close (skill rule).

## What belongs in each mode

| Mode | Belongs here | Does not belong here | Prompts for suggested items | Source |
|---|---|---|---|---|
| Facts | Information known, information needed, where each fact comes from | Opinions, guesses stated as facts | What number, record or document would settle this? Who would know? What has been tried before? | (S1, S3) |
| Feelings | Gut reactions, hunches, likes, dislikes, fears, in a few words and with no reasons | Arguments for or against | How might the people affected react when they hear? Who might feel left out? | (S1, S2, S3) |
| Risks | What could go wrong, weak points, what does not fit | Feelings without a reason, new options | What must be true for this to work? What if it takes longer or costs more? Who could block it? | (S1, S3) |
| Benefits | Value, gains, who gains, what each gain rests on | Hope with nothing behind it | Who is better off, and how would you see it? What does this make possible later? | (S1, S3) |
| Ideas | Other ways, changes that answer a risk, new options | Judging the ideas | What would reduce the top risk? What is a smaller trial? What would a very different option look like? | (S1, S2) |
| Process | Who decides, by when, what they need to see, the next step in the thinking | The decision itself, made for the user | Who must agree? What evidence would they want? What is the first step? | (S1, S2, S3) |

## Moving items between modes (skill rule)

- A worry given during benefits goes to risks. A new option given during risks goes to ideas. A feeling given as a fact goes to feelings.
- Say the move in one short line: "I have put that under risks."
- An item that fits no mode goes to "Parked" and stays in the take-away.

## Short feelings (S2, S3)

The feelings mode is kept short: a gut reaction in a few words, with no need to explain or justify it (S2, S3). The skill records the user's words. It does not name the feeling for the user.

## Reference: take-away.md

# Take-away template

Fill every line. Keep the order. Mark every item "yours" or "suggested". A "yours" item is the user's words, unchanged, with nothing added; an addition of yours is a separate "suggested" item, and a "no source" or "no figure" note goes in the reply text, never in an item. A line that records a gap ("not given", or "[to confirm]" for who decides or by when) is not an item and carries no marker. Use lists, not tables, so user text needs no escaping.

```md
### Synthesis

**Question:** [the question the user confirmed].

**Decision status:** [Not decided. | The user's own words on what they decided or lean towards.]

**Where the modes agree:** [one or two lines, drawn only from the items below].

**Main tension:** [the risk or feeling that pulls against the main benefit, in one line].

**My reading:** [what the six modes together suggest, as my reading, not a decision].

**What would change this reading:** [the one fact or gap that would most change it].

[If a fact from memory is used: "Facts from memory are labelled RECALLED."]

### Facts

- Known: [fact] ([you said | the document you gave | RECALLED]) (yours | suggested)
- To find out: [gap] (yours | suggested)

### Feelings

- Your gut reaction: [the user's words as given (yours) | not given.]
- A possible reaction to test: [who might feel what] [to confirm] (suggested)

### Risks

- [risk] (yours | suggested)
[If none: "None kept."]

### Benefits

- [benefit, and what it rests on] (yours | suggested)
[If none: "None kept."]

### Ideas

- [idea] (yours | suggested)
[If the user rejected every idea: "No idea kept. The user rejected every suggested idea."]

### Process

- Decides: [person or role the user named (yours) | [to confirm]]
- By when: [date the user gave (yours) | [to confirm]]
- They need to see: [what] (yours | suggested)

### Parked

[Only if something fits no mode: the item, as the user said it.]

Based on Edward de Bono's parallel thinking method, known as Six Thinking Hats®.
```

On a personal question, write any statement about the user that the user did not state as a question or as "A possible reading to test: ... [to confirm]", in every section, including "My reading".

## Worked example (short)

A shop owner asks whether to open on Sundays. The user said: "Foot traffic on Saturdays is our busiest. I'd have to find staff. I feel tired just thinking about it. A café next door opens Sundays. My co-owner and I decide together, before the new roster in March." The user said nothing about benefits and rejected the suggested idea of a Sunday trial with shorter hours.

### Synthesis

**Question:** Should the shop open on Sundays?

**Decision status:** Not decided.

**Where the modes agree:** Staffing is the open point in facts, risks and process.

**Main tension:** A possible gain from Sunday trade next to the café, against your tiredness and no staff yet.

**My reading:** The decision turns on whether you can staff Sundays without working them yourself. A possible reading to test: the tiredness is about the extra hours, not about the idea itself [to confirm].

**What would change this reading:** Knowing whether anyone on the team wants Sunday shifts.

### Facts

- Known: Foot traffic on Saturdays is your busiest (you said) (yours)
- Known: A café next door opens Sundays (you said) (yours)
- To find out: Sunday foot traffic in the street (suggested)
- To find out: Whether any current staff want Sunday shifts (suggested)

### Feelings

- Your gut reaction: "I feel tired just thinking about it." (yours)
- A possible reaction to test: Staff may see Sunday shifts as unwelcome, or as welcome extra hours [to confirm] (suggested)

### Risks

- You'd have to find staff (yours)
- The owners end up working the Sunday shifts themselves (suggested)

### Benefits

- Sales from people visiting the café next door, if Sunday foot traffic is there (suggested)

### Ideas

- No idea kept. The user rejected every suggested idea.

### Process

- Decides: you and your co-owner (yours)
- By when: before the new roster in March (yours)
- They need to see: who would work Sundays (suggested)

Based on Edward de Bono's parallel thinking method, known as Six Thinking Hats®.

## Sources

# Sources

All web entries retrieved 29 September 2026.

[S1] de Bono Group. (n.d.). *Six Thinking Hats*. Retrieved September 29, 2026, from https://www.debonogroup.com/services/core-programs/six-thinking-hats/

[S2] Wikipedia contributors. (n.d.). Six Thinking Hats. In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Six_Thinking_Hats

[S3] Rigby, A. (2022, December 8). *Six Thinking Hats: Use parallel thinking to tackle tough decisions*. Atlassian. Retrieved September 29, 2026, from https://www.atlassian.com/blog/productivity/six-thinking-hats
