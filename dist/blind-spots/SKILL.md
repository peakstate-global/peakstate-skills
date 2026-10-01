---
name: blind-spots
description: Reads an argument, plan or recommendation and finds what it quietly depends on. It confirms its reading of the argument first, then ranks the unstated assumptions with a cheap test for the top three, and names possible cognitive biases and logical fallacies, each with the quoted passage, the most generous reading, a confidence and a question that would check it. Use when someone says "find the holes in this", "what am I missing", "check my assumptions", "is there a fallacy here", "what are my blind spots", "poke holes in my argument", "is this biased", or before an argument goes to someone who will decide on it.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "guided"
  output: "text"
---

This skill turns a pasted argument into a ranked assumptions table and a short list of possible biases and fallacies, each one quoted, read generously and paired with a checking question.

## Steps

Run the steps in order. Ask one question at a time and wait for the answer. If the input may be sensitive, say once: "Use only a tool your organisation has approved for this information."

0. **Read and confirm.** This step is never skipped, even after "just give me the list". Restate the argument in its strongest form: the conclusion, the reasons given, and who it is for. Where the opening is vague, give your best reading and name the gaps. End with one question: "Is this the argument, or what would you change?" List no assumption, bias or fallacy until the user confirms.
1. **Surface the assumptions.** List what must be true for the conclusion to follow that the argument does not state or support. Rate each one for dependence (how far the conclusion falls if it is false) and uncertainty (how likely it is to be false), each high, medium or low. Rank by dependence first, then uncertainty. For each of the top three, give one cheap test the user could run within about a week. Method: `references/method.md`.
2. **Check for possible biases.** Read the argument against `references/biases.md`. A bias is a pattern in how the author reached the view. Report one only where a quoted passage shows the tell-tale wording or pattern.
3. **Check for possible fallacies.** Read the argument against `references/fallacies.md`. A fallacy is a gap between the reasons and the conclusion. Report one only where a quoted passage itself draws the faulty inference (a "so", "because", "therefore" or a stated conclusion). A link the argument leaves unstated is an assumption: it goes in the table from step 1, not here. Never count one gap twice.
4. **Hold the findings to the bar.** For every bias or fallacy finding: quote the passage; give the most generous reading first (what the author most plausibly meant, and when that would be sound); then say what the concern "may" be, never that the argument "is" fallacious; give a confidence (high, medium or low); and give the checking question. Drop any finding you cannot quote. Report no fallacy or bias to fill a list. A sound argument can have none. If no finding is medium or high confidence, open the section with the plain line "No clear bias or fallacy found." and one line on why the reasoning holds; any low-confidence finding follows as a question worth asking, not a charge. Never label the author, only the passage.

## The take-away

Deliver the four parts in this order, using the template in `references/take-away.md`:

- The one-line reading: the argument's conclusion and whether its main risk sits in an assumption, a bias, a fallacy or none of these.
- The assumptions table, ranked, with a cheap test for each of the top three.
- Possible biases and fallacies, each with quote, generous reading, concern, confidence and checking question. When none is medium or high confidence, the section opens with "No clear bias or fallacy found."
- What would change this reading: the one fact that would most change the assessment.

If you cannot browse or open files, say so in one line. Any fact from memory is labelled RECALLED, including a general claim inside a concern, a reading or a cheap test (such as why shops close or what a change costs). Or phrase it as something to check ("check whether ..."). Never invent a study, author, year, quote or URL.

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a role the user named. Never invent a person, a date or a source.

1. Run the cheap test for the top-ranked assumption and record what it shows.
2. Ask the checking question for the highest-confidence finding, or reword the passage it came from. If no bias or fallacy finding reaches medium confidence, base this move on the top-ranked assumption instead: name the assumption and its cheap test.
3. Show the revised argument to one person who disagrees with it, and note their first objection.

To ground the claims themselves in sources, the user may also like a skill for checking claims and provenance, if they have one. Do not run it for them.

## Self-check before you deliver

- The user confirmed the restated argument before any finding.
- Every assumption has a dependence and an uncertainty rating, the table is ranked, and each of the top three has a cheap test.
- Every bias or fallacy finding quotes the passage from the user's text, and no finding repeats a gap already in the assumptions table.
- Every finding gives the generous reading before the concern and says "may", never "is".
- Every finding has a confidence and a checking question.
- No finding was added to fill a list. If none is medium or high confidence, the section opens with "No clear bias or fallacy found."
- No person is labelled; only passages are.
- No source, study, owner or date was invented, and memory is labelled RECALLED.

## Read this when

| File | When |
|---|---|
| `references/method.md` | Rating and ranking assumptions, writing a cheap test, or writing a generous reading |
| `references/biases.md` | Checking the argument for possible cognitive biases (step 2) |
| `references/fallacies.md` | Checking the argument for possible logical fallacies (step 3) |
| `references/take-away.md` | Writing the final output, or checking a worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.

## Reference: biases.md

# Cognitive biases

A bias is a pattern in how a view was reached, not proof the view is wrong. Report one only when a quoted passage shows the tell-tale wording, and always as "may". Each entry carries a source id, such as (S3), that resolves in `SOURCES.md`.

Columns: name, definition, tell-tale wording, example, checking question, source.

## Evidence and belief

| Bias | Definition | Tell-tale wording | Example | Checking question | Source |
|---|---|---|---|---|---|
| Confirmation bias | Seeking or weighting evidence that fits the view already held | "This proves", "as expected", only supporting cases cited | Citing three wins for a method and no trials of it | What evidence would count against this, and was it looked for? | S4 |
| Belief bias | Judging an argument by whether its conclusion is liked, not by its reasoning | "It makes sense, so" | Accepting a weak study because it backs the plan | Would the reasoning convince you if the conclusion were the opposite? | S7 |
| Anchoring | Staying close to a first number or idea when estimating | "Starting from", a figure repeated without a basis | Budget set at last year's figure plus 5 per cent | Where did the first number come from, and what if it were half or double? | S3 |
| Availability | Judging how likely something is by how easily examples come to mind | "I keep hearing", "everyone knows", a recent story | Fearing flights after a crash in the news | How often does this happen in a count, not in memory? | S3 |
| Vividness | Giving a striking story more weight than dull but larger data | One detailed anecdote carries the case | One angry customer email outweighs a survey of 500 | What do the numbers say without the story? | S1 |
| Recency bias | Weighting the latest events over the longer record | "Lately", "this month", "the last few" | Changing a supplier after one bad week in five good years | Does the pattern hold across the full record? | S7 |
| Negativity bias | Weighting bad news more than equal good news | Losses listed in detail, gains in passing | A plan dropped over one risk while ten benefits go unweighed | Would an equal-sized gain get the same weight? | S7 |
| Illusory correlation | Seeing a link between two things that are not linked | "Whenever X, Y happens" | Believing sales rise on days with team meetings | How many times did X happen without Y, and Y without X? | S1 |
| Clustering illusion | Seeing a pattern in random runs | "Three in a row", "a streak" | Calling a new trend from three good weeks | How often would a run like this happen by chance? | S7 |

## Probability and numbers

| Bias | Definition | Tell-tale wording | Example | Checking question | Source |
|---|---|---|---|---|---|
| Representativeness | Judging a case by how typical it looks, ignoring the odds | "It looks just like", "a classic case of" | Picking a hire because they resemble a past star | What share of people who look like this actually turn out that way? | S3 |
| Base-rate neglect | Ignoring how common something is overall | Case detail with no overall rate | Trusting a 95 per cent accurate test for a rare condition | How common is this before we look at the case? | S3 |
| Insensitivity to sample size | Treating a small sample as if it were large | "In our pilot of four", percentages from tiny counts | "Half our users hate it" from two replies | How many cases is this, and would the result hold with ten times as many? | S3 |
| Neglect of probability | Ignoring how likely an outcome is, only how bad or good it would be | "What if", worst case with no odds | Spending heavily against a very rare risk while a common one goes unmanaged | How likely is this, per year or per case? | S7 |
| Zero-risk bias | Preferring to remove a small risk entirely over a larger cut in a big risk | "Eliminate", "zero" | Removing a minor risk instead of halving a major one | Which option cuts the most total harm? | S7 |
| Scope neglect | Valuing a problem the same whatever its size | Same effort or price for very different sizes | The same budget asked to protect 100 or 10,000 accounts | Would the answer change if the number were ten times bigger? | S7 |
| Overconfidence | Being more sure than the evidence allows | "Certainly", "no doubt", narrow ranges | "It will take exactly six weeks" | What range would you bet on, and how often have past estimates missed? | S1 |
| Dunning-Kruger effect | People with little skill in an area overrating their skill in it | "It's simple", "anyone can" | A newcomer calling a migration trivial | What would an expert in this area say is hard? | S7 |

## Plans and time

| Bias | Definition | Tell-tale wording | Example | Checking question | Source |
|---|---|---|---|---|---|
| Planning fallacy | Underestimating time and cost of one's own plan | "Should only take", a best-case timeline | A three-month plan with no slack after two late projects | How long did the last three similar pieces of work take? | S7 |
| Optimism bias | Expecting good outcomes more than the odds support | "It will work", risks absent | A launch plan with no fallback | What is the base rate of success for work like this? | S7 |
| Sunk cost | Continuing because of what is already spent, not what is to come | "We've already spent", "can't waste" | Finishing a failing build because of the six months behind it | If we were starting today, would we choose this? | S7 |
| Escalation of commitment | Adding more to a failing course to justify the earlier choice | "Double down", "see it through" | Doubling a budget after missed targets | What result would make us stop, and has it happened? | S7 |
| Status quo bias | Preferring the current state because it is current | "It's always been", "no need to change" | Keeping a tool nobody likes because it is installed | If we had neither, which would we pick? | S7 |
| Normalcy bias | Assuming things will carry on as they have, despite warning signs | "It'll be fine", "never happened before" | Ignoring early signs of a supplier failing | What would we see if things were about to change, and do we see it? | S7 |
| Loss aversion | Weighting losses more than equal gains | "We can't afford to lose" | Refusing a bet with twice the upside of its downside | Would we take the mirror image of this deal? | S7 |
| Framing effect | Reacting to how a choice is worded, not what it is | "90 per cent success" against "10 per cent failure" | Approving a plan framed as saving jobs, rejecting the same plan framed as losing some | Does the decision change if we state it the other way? | S7 |
| Hyperbolic discounting | Preferring smaller rewards now over larger ones later, beyond what is reasonable | "Quick win", "right now" | Choosing a patch over a fix that pays back in two months | What does each option give over the full period? | S7 |
| Pro-innovation bias | Overrating a new thing and missing its limits | "Game-changer", "transform" | Rolling out a new tool to all teams before a trial | Where has this failed or been dropped, and why? | S7 |
| Automation bias | Trusting a system's output over contrary evidence | "The system says", "the model shows" | Accepting a forecast that contradicts the order book | What would we conclude without the tool? | S7 |

## People and groups

| Bias | Definition | Tell-tale wording | Example | Checking question | Source |
|---|---|---|---|---|---|
| Authority bias | Giving an opinion more weight because of who holds it | "The CEO thinks", a title in place of a reason | Adopting a plan because a senior person likes it | What is the reason, stated without the title? | S7 |
| Bandwagon effect | Adopting a view because many others hold it | "Everyone is doing it", "the industry is moving" | Buying a platform because competitors did | Why is it right for us, apart from who else has it? | S7 |
| Halo effect | Letting one good trait colour judgement of unrelated traits | "They're great, so" | Trusting a vendor's security because its design is polished | What evidence do we have on this trait alone? | S7 |
| In-group bias | Favouring people seen as one's own group | "Our people", "they don't get it" | Rating an internal idea above a better external one | Would we rate this the same if another team proposed it? | S7 |
| False consensus effect | Overestimating how many people share one's views | "Everyone wants", "nobody likes" | "Everyone in the office likes the new layout, so clients will" | Have we asked people outside our own group? | S7 |
| Mirror imaging | Assuming others think and act as we would | "They would never", "if I were them" | Assuming a competitor will price the way we would | What do we know about their goals and limits? | S1 |
| Groupthink | A group reaching agreement by suppressing doubt | "We all agree", no dissent recorded | A unanimous decision with no risks raised | Who argued the other side, and what did they say? | S7 |
| Curse of knowledge | Forgetting what others do not know | "Obviously", jargon, skipped steps | A guide that assumes the reader knows the system | Could a newcomer follow this without help? | S7 |
| Fundamental attribution error | Explaining others' actions by character and ignoring the situation | "They're lazy", "careless" | Blaming staff for errors caused by a bad form | What in the situation could cause this behaviour? | S7 |
| Self-serving bias | Crediting success to oneself and failure to outside causes | "We delivered", "the market let us down" | Wins are the team's, losses are bad luck | Would we explain a rival's result the same way? | S7 |
| IKEA effect | Valuing something more because we built it | "Our framework", pride in the build | Keeping an in-house tool worse than a free one | Would we buy this if someone else offered it? | S7 |
| Not-invented-here | Rejecting ideas from outside the group | "That won't work here" | Dismissing a proven practice from another sector | What would have to be different here for it to fail? | S7 |
| Outcome bias | Judging a decision by its result, not by the information at the time | "It worked, so it was right" | Praising a risky bet that happened to pay off | Was it a good decision with what was known then? | S7 |
| Hindsight bias | Seeing past events as more predictable than they were | "We should have known", "it was obvious" | Blaming a team for missing a signal nobody saw at the time | What did the record show before the event? | S1 |
| Choice-supportive bias | Remembering one's past choices as better than they were | Past choice described only by its benefits | Recalling a vendor pick as flawless despite early problems | What did the record say about this choice at the time? | S7 |

## Reference: fallacies.md

# Logical fallacies

A fallacy is a gap between the reasons and the conclusion. Many of these patterns are sound in the right context, so each entry says when the pattern can be sound. Report one only when a quoted passage shows it, only after the generous reading, and always as "may". Each entry carries a source id, such as (S6), that resolves in `SOURCES.md`.

Columns: name, definition, tell-tale wording, example, when it can be sound, checking question, source.

## Cause and evidence

| Fallacy | Definition | Tell-tale wording | Example | When it can be sound | Checking question | Source |
|---|---|---|---|---|---|---|
| False cause (post hoc) | Concluding A caused B because B followed A | "After", "since", "then" | "Sales rose after the rebrand, so the rebrand worked" | A known mechanism links them and other causes are ruled out | What else changed at the same time? | S6, S5 |
| Correlation as cause (cum hoc) | Concluding A causes B because they occur together | "Linked to", "goes with" | "Staff who use the app are happier, so the app makes staff happy" | A trial or natural experiment isolates A | Could B cause A, or a third thing cause both? | S6 |
| Hasty generalisation | Drawing a general rule from too few or unusual cases | "Always", "every time", one or two cases | "Two graduates quit, so the graduate programme fails" | The cases are many and chosen fairly | How many cases, and are they typical? | S6 |
| Suppressed evidence (cherry picking) | Leaving out evidence that would weaken the conclusion | Only supporting data cited, no range | Quoting the best quarter only | The omitted evidence is truly irrelevant | What does the full data set show? | S6 |
| Texas sharpshooter | Drawing the target around the data after seeing it | A pattern found after the fact | Choosing the metric that improved once results were in | The measure was set before the data came in | Was this measure chosen before the result was known? | S6 |
| Appeal to ignorance | Treating a lack of evidence against as evidence for | "Nobody has shown", "no sign of a problem" | "No supplier has raised an issue, so the contract terms suit them" | A search that would have found the evidence was done | Did anyone look in a way that would have found it? | S6 |
| Gambler's fallacy | Expecting a random event to "even out" | "Due", "bound to" | "We've lost three bids, so we're due a win" | Events are not independent | Are these events linked, or independent chances? | S6 |

## Structure of the argument

| Fallacy | Definition | Tell-tale wording | Example | When it can be sound | Checking question | Source |
|---|---|---|---|---|---|---|
| False dilemma | Presenting two options when more exist | "Either ... or", "the only choice" | "Either we cut costs or we close" | The two options truly exhaust the choices | What third option has not been named? | S6, S5 |
| Slippery slope | Claiming one step will lead to an extreme without showing each link | "Next thing", "where will it end" | "Allow one remote day and nobody will come in" | Each step has a known mechanism and evidence | What makes each step lead to the next? | S6 |
| Begging the question | Using the conclusion as a premise | Reason restates the claim | "This is the best plan because it is the right one" | Never sound as proof; fine as a definition | Is the reason independent of the conclusion? | S6, S5 |
| Equivocation | Shifting the meaning of a word part-way through | A key word used twice | "Growth" meaning users, then revenue | The meaning is fixed and stated | Does this word mean the same thing each time? | S6 |
| Composition | Assuming what is true of parts is true of the whole | "Each ... so the whole" | "Every team is efficient, so the company is" | The property carries over, such as weight | Does this property add up across the parts? | S6 |
| Division | Assuming what is true of the whole is true of each part | "The company is ..., so each ..." | "The firm is profitable, so every product is" | The property carries down | Is this true of each part on its own? | S6 |
| False analogy | Arguing from a comparison that differs in the way that matters | "Just like", "no different from" | "Running a country is like running a household budget" | The two cases share the feature that drives the conclusion | Where do the two cases differ, and does it matter here? | S6 |
| Affirming the consequent | If A then B; B; so A | "Which is exactly what we'd see if" | "If demand rose, sales rise; sales rose, so demand rose" | Other causes of B are ruled out | What else could produce B? | S6 |
| Denying the antecedent | If A then B; not A; so not B | "Since we didn't ..., it won't" | "If we advertise, sales rise; we won't advertise, so sales won't rise" | A is the only route to B | Could B happen another way? | S6 |
| Middle ground | Assuming the midpoint between two positions is correct | "Meet in the middle", "the truth lies between" | Splitting a safety standard between two proposals | Both positions are equally well supported | Is the middle supported on its own evidence? | S6 |

## Relevance and persuasion

| Fallacy | Definition | Tell-tale wording | Example | When it can be sound | Checking question | Source |
|---|---|---|---|---|---|---|
| Straw man | Answering a weaker version of the other view | "So you're saying", "they want to" | "They want flexible hours, so they don't want to work" | Never sound as a reply; check the real view | Would the other side agree this is their view? | S6, S5 |
| Ad hominem | Attacking the person rather than the argument | "Of course they'd say", "what would they know" | "Ignore the report, the author is junior" | A person's interest or record is relevant to trusting their testimony, not their argument | Is the argument sound regardless of who made it? | S6, S5 |
| Tu quoque | Rejecting a criticism because the critic does the same | "You do it too" | "You can't criticise our overspend, yours was worse" | Never answers the criticism itself | Is the criticism true, whoever made it? | S6 |
| Appeal to authority | Accepting a claim because of who said it, outside their field or against consensus | "Experts agree", "any expert will tell you" | "A famous CEO says remote work fails" | The authority is in their field, named, and not disputed | Who exactly, in what field, and do others in it agree? | S6, S5 |
| Appeal to the people | Accepting a claim because many believe it | "Everyone knows", "most people" | "Most managers prefer it, so it works" | The claim is about what people prefer | Is this about what is true, or what is popular? | S6 |
| Appeal to tradition | Accepting a claim because it has long been done | "We've always", "tried and true" | "We've always had annual reviews, so they work" | Long use is evidence it has survived real tests | Has it been tested against the alternatives? | S6 |
| Appeal to emotion | Using feelings in place of reasons | Fear, pity or pride words carry the point | "Think of the families who will suffer" with no data | Feelings are relevant to the decision, such as staff wellbeing | What is the reason, stated without the emotion? | S6 |
| Appeal to consequences | Judging a claim true or false by whether its results are wanted | "That can't be true, it would mean" | "Costs can't be rising, or we'd miss budget" | The question is what to do, not what is true | Is this about whether it is true, or whether we like it? | S6 |
| Red herring | Bringing in an unrelated point to shift attention | "But what about", a change of topic | Answering a cost question with a staff story | The new point does bear on the conclusion | How does this point bear on the conclusion? | S6 |
| Genetic fallacy | Judging a claim by where it came from | "That idea came from", "just a consultant's idea" | "It came from a competitor, so it's wrong" | The origin bears on reliability, such as a known bad source | Is the claim sound regardless of its origin? | S6 |
| No true Scotsman | Redefining a group to exclude a counter-example | "No real", "no genuine" | "No real leader would use a checklist" | The definition was fixed before the example | Was this definition set before the counter-example? | S6 |
| Complex question | A question that assumes an unproven claim | "Why does X fail", "when did you stop" | "Why is the new process slower?" before it is measured | The assumption is established | Is the claim inside the question established? | S6 |
| Special pleading | Applying a rule to others but exempting one's own case | "This is different", "except for us" | "Deadlines matter, but our team is a special case" | A relevant difference is named and shown | What difference justifies the exception? | S6 |

## Reference: method.md

# Method

Each entry carries a source id, such as (S1), that resolves in `SOURCES.md`.

## Finding assumptions (S2, S1)

An assumption is something that must be true for the conclusion to follow, and that the argument does not state or support. Find them with these prompts:

- What must be true about the cause? (That A, not something else, produced B.)
- What must be true about the sample? (That the cases seen stand for the cases that matter.)
- What must stay the same? (Costs, people, the market, the rules.)
- What must the audience already accept? (A value, a definition, a goal.)
- What is the option not considered? (Doing nothing, a cheaper fix, a different order.)

Write each one as a plain statement that could be true or false: "Weekend incidents will keep the same rate next quarter", not "stability".

## Rating and ranking (S2)

| Rating | High | Medium | Low |
|---|---|---|---|
| Dependence | The conclusion fails if this is false | The conclusion weakens | The conclusion barely moves |
| Uncertainty | There is a clear reason to doubt it, or no evidence either way | Some support, some doubt | Well supported in the text or common ground |

Rank by dependence first, then uncertainty. High dependence with high uncertainty goes to the top. Say in one line why the top assumption sits where it does.

## Cheap tests (S2)

A cheap test is one action the user can take within about a week that would show the assumption is false if it is. Good tests:

- Count something that already exists (a log, a report, a spreadsheet).
- Ask three to five of the people the assumption is about.
- Look for one case where the assumption failed.
- Compare with a before, a group without the change, or a neighbour.

Each test names what result would count against the assumption.

## The generous reading (S8, S5)

Before any concern, write what the author most plausibly meant, in the form that makes the passage strongest, and when that reading would be sound. Many patterns that look like fallacies are reasonable in context: an appeal to an expert is sound when the expert is in their field and not disputed; a slippery slope is sound when each step has a known mechanism. If the generous reading is sound, drop the finding or keep it at low confidence.

## Confidence

| Level | Use when |
|---|---|
| High | The passage shows the pattern clearly, and the generous reading does not remove it |
| Medium | The pattern is likely, but the generous reading could remove it with one fact |
| Low | The passage fits the pattern only on a strict reading; worth a question, not a claim |

## Wording

- Say "may": "This sentence may treat a sequence as a cause."
- Name the passage, never the person: "the second sentence", not "the author is biased".
- A finding without a quote is not a finding. Drop it.
- A fact that is simply missing (a mechanism, a cost, whether a trend holds) is an assumption, not a fallacy. Put it in the table once.
- A sound argument can have no findings. Say so rather than reaching.

## Reference: take-away.md

# Take-away template

Fill every line. Keep the order. If a part is empty, say so in one line; never leave it out.

```md
**Reading:** [the conclusion in one sentence]. Main risk: [an assumption | a possible bias | a possible fallacy | none found].

[If no web or file access: "I had no web access, so facts from memory are labelled RECALLED."]

### Assumptions, ranked

| # | Assumption | Dependence | Uncertainty | Cheap test (top three) |
|---|---|---|---|---|
| A1 | [plain statement that could be true or false] | high | high | [one action within a week; the result that would count against it] |
| A2 | ... | ... | ... | [test] |
| A3 | ... | ... | ... | [test] |
| A4 | ... | ... | ... | |

Why A1 is first: [one line].

### Possible biases and fallacies

[If no finding is medium or high confidence, open with this line, then any low-confidence blocks:]
No clear bias or fallacy found. [One line on why the reasoning holds together.]

[One block per finding, highest confidence first:]

**[Name] (bias | fallacy), [high | medium | low] confidence**
- Passage: "[exact quote from the user's text]"
- Generous reading: [what the author most plausibly meant, and when that would be sound]
- Concern: this passage may [the pattern, in plain words].
- Checking question: [the question from the library, fitted to the passage]

### What would change this reading

[The one fact that, if found, would most change the assessment.]
```

## Worked example (short)

Argument: "We should move the monthly report to a dashboard. The report takes two days to build, and at the last review three of five managers said they only read the summary page."

**Reading:** The report should become a dashboard because it costs two days a month and most readers only use the summary. Main risk: an assumption.

### Assumptions, ranked

| # | Assumption | Dependence | Uncertainty | Cheap test (top three) |
|---|---|---|---|---|
| A1 | Managers will open a dashboard as often as they read the report | high | high | Ask the five managers how they would use it; two or more saying "I would not open it" counts against |
| A2 | A dashboard takes less than two days a month to maintain | high | medium | Price the build and upkeep with the data team; more than two days a month counts against |
| A3 | The summary page is the part that drives decisions | medium | medium | Check the last three decisions for which page they cited |
| A4 | The three managers speak for the other readers | medium | low | |

Why A1 is first: the saving is worthless if the dashboard goes unread.

### Possible biases and fallacies

No clear bias or fallacy found. The saving and the reader count are stated, and the conclusion follows if the assumptions above hold.

**Hasty generalisation (fallacy), low confidence**
- Passage: "three of five managers said they only read the summary page"
- Generous reading: five managers may be the whole readership, in which case three of five is the full picture, not a sample.
- Concern: if the report has other readers, this passage may generalise from a small group.
- Checking question: How many people read the report, and are these five typical of them?

### What would change this reading

If the report feeds a board pack or an audit, the full report may still be needed whatever the managers read.

## Sources

# Sources

All entries retrieved 29 September 2026.

[S1] Heuer, R. J., Jr. (1999). *Psychology of intelligence analysis*. Center for the Study of Intelligence, Central Intelligence Agency. Retrieved September 29, 2026, from https://www.cia.gov/resources/csi/static/Pyschology-of-Intelligence-Analysis.pdf

[S2] US Government. (2009). *A tradecraft primer: Structured analytic techniques for improving intelligence analysis* (Key Assumptions Check, p. 7). Retrieved September 29, 2026, from https://www.cia.gov/resources/csi/static/Tradecraft-Primer-apr09.pdf

[S3] Tversky, A., & Kahneman, D. (1974). Judgment under uncertainty: Heuristics and biases. *Science, 185*(4157), 1124–1131. https://doi.org/10.1126/science.185.4157.1124

[S4] Nickerson, R. S. (1998). Confirmation bias: A ubiquitous phenomenon in many guises. *Review of General Psychology, 2*(2), 175–220. https://doi.org/10.1037/1089-2680.2.2.175

[S5] Hansen, H. (2024). Fallacies. In E. N. Zalta & U. Nodelman (Eds.), *The Stanford encyclopedia of philosophy*. Retrieved September 29, 2026, from https://plato.stanford.edu/entries/fallacies/

[S6] Dowden, B. (n.d.). Fallacies. In *Internet encyclopedia of philosophy*. Retrieved September 29, 2026, from https://iep.utm.edu/fallacy/

[S7] List of cognitive biases. (2026, September 24). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/List_of_cognitive_biases

[S8] Principle of charity. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Principle_of_charity
