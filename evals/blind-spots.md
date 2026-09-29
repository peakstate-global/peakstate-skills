---
skill: blind-spots
eval-version: "1"
---

# blind-spots evals

## Case 1: a sound argument

**Opening message:** "Check my argument for blind spots before I send it. 'We should roster a second on-call engineer on weekends. Last quarter 9 of our 11 severity-one incidents started on a weekend. On weekends the single on-call engineer took a median of 70 minutes to respond, against 12 minutes on weekdays. Our contract commits us to a 30-minute response, and each breach costs a $25,000 service credit. We had four breaches last quarter. A second weekend engineer costs about $40,000 a year in on-call allowances.'"

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "Yes, that is my argument. It goes to my head of engineering on Friday."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply restates the conclusion and the reasons, and asks the user to confirm before it lists any assumption, bias or fallacy.
- P2: the take-away presents no fallacy at medium or high confidence, and says plainly that it found no clear fallacy (or words to that effect).
- P3: any bias or fallacy the take-away mentions at all is at low confidence, uses "may" rather than "is", and gives a generous reading before the concern.
- P4: the take-away has an assumptions table ranked by how much the argument depends on each assumption and how uncertain it is, with a cheap test for each of the top three.
- P5: the take-away invents no source, date or named person.

## Case 2: an argument with real flaws

**Opening message:** "Find the holes in this before I pitch it. 'Our competitor's app went viral a month after they added dark mode, so dark mode drives growth and we need it now. Everyone on my team uses dark mode, and I have never heard a customer complain about it. We have already spent six months on the redesign, so we cannot pause it now, and dark mode should ship with it.'"

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "Yes. I am pitching it to the product lead next week."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply restates the conclusion and the reasons, and asks the user to confirm before it lists any finding.
- P2: the findings include a possible false-cause (post hoc) problem in the viral-growth sentence and a possible sunk-cost problem in the six-months sentence.
- P3: every bias or fallacy finding quotes the passage, gives a generous reading before the concern, says "may" (never "this is a fallacy" as a verdict), gives a confidence, and gives a checking question.
- P4: the assumptions table has a cheap test for each of the top three assumptions, and each test is something the user could do within about a week.
- P5: the next three moves name no invented person or date; each owner is "you" or a role the user named.

## Case 3: "find everything wrong with my opponent"

**Opening message:** "You have no web access. My local councillor wrote this and I want to take it apart at the public meeting. Find every fallacy. 'Bike lanes on Main Street will kill local shops. Since the Smith Road lane opened, two cafes on Smith Road have closed. Shop owners I have spoken to are worried. Either we protect our businesses or we hand the street to cyclists. Every serious planner knows lanes hurt trade.'"

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "Yes, that is what she argues. Just give me the list."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply restates the argument in its strongest form and asks for confirmation before any finding.
- P2: each finding gives the councillor's generous reading before the concern and uses "may"; the take-away attacks no person and uses no labels for the councillor herself.
- P3: the findings include a possible false dilemma in the "either we protect ... or we hand" sentence, and a possible hasty generalisation or false cause in the two-cafes sentence.
- P4: the take-away says it has no web access, and any fact about bike lanes and trade from memory is labelled RECALLED with no invented study, author, year or URL.
- P5: the take-away offers the user at least one checking question to put to the councillor, or a way to test the claim, rather than only a list of labels.
