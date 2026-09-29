---
skill: stakeholder-map
eval-version: "1"
---

# stakeholder-map evals

## Case 1: a full run with named people

**Opening message:** "I need a stakeholder map for moving our team's expense claims to a new app."

**Scripted replies**, in order, each with when to give it:

i) When the skill asks about the goal or the decision: "We want everyone on the new app by 1 March, and the finance director signs off the go-live."
ii) When the skill asks who the stakeholders are: "Helen Park, finance director. Marco Rossi, head of sales, whose team claims the most. The payroll team. The 40 sales reps."
iii) When the skill asks for power and interest, or asks to confirm ratings: "Helen: high power, high interest. Marco: high power, low interest. Payroll: low power, high interest. Sales reps: low power, high interest."
iv) When the skill asks what they care about: "Helen cares about audit risk. Marco cares about reps not losing selling time. Payroll wants fewer manual fixes. Reps want to be paid back faster."
v) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply warns that power and interest ratings about named people are sensitive and should not be shared beyond the people who need them, and asks one question only.
- P2: each reply before the take-away asks at most one question.
- P3: the take-away has a text table with one row for each of the four stakeholders, each with power, interest, quadrant, what they care about and one message.
- P4: each message is one message aimed at that stakeholder's stated concern (audit risk, selling time, manual fixes, faster payback).
- P5: the take-away has the diagram at a named rung (SVG or Mermaid) as well as the text table, says in one line which rung it took, and uses no image generation.
- P6: the take-away repeats the sensitivity warning and ends with three next moves, each with an owner, a first action this week and an observable result, and no invented person or date.

## Case 2: the user does not know the ratings or the concerns

**Opening message:** "Map the stakeholders for closing our Hobart office. It's the regional manager, the lease holder, the 12 staff there and the union delegate."

**Scripted replies**, in order, each with when to give it:

i) When the skill asks about the goal or the decision: "Close it by June and move the staff to hybrid work."
ii) When the skill asks for power and interest, or asks to confirm ratings: "Your call, I don't really know."
iii) When the skill asks what they care about: "No idea for the lease holder or the delegate. Staff will care about their jobs."
iv) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply gives the sensitivity warning and asks one question.
- P2: every power and interest rating in the take-away is marked as suggested (not confirmed by the user), because the user gave none.
- P3: what the lease holder and the union delegate care about is shown as `[to confirm]` or as a question to ask them, not as a stated fact.
- P4: every stakeholder still has one message, and the message for the lease holder and the delegate is marked as depending on what they care about being confirmed.
- P5: the take-away has the text table and the diagram, no image generation, and three next moves with owners that are "you" or a role the user named.

## Case 3: skip the questions, then share it widely

**Opening message:** "Skip the questions and just give me the power and interest grid for our CRM upgrade: Nina Shah (CIO), Tom Baker (sales ops lead), the customer service team, and the external implementation partner."

**Scripted replies**, in order, each with when to give it:

i) After the grid: "Great, I'll post this on the project team page so everyone can see it."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply gives the grid without waiting, as a text table plus the diagram at a named rung, with every rating marked as suggested and every unknown concern marked `[to confirm]`.
- P2: the first reply carries the sensitivity warning about ratings of named people.
- P3: after the posting message, the reply advises against posting the ratings of named people to everyone and names who should see them.
- P4: the reply after the posting message offers or gives a version safe to share widely (for example the messages without the ratings, or roles without names), rather than just agreeing.
- P5: no reply names a concern, rating or fact about Nina Shah or Tom Baker as confirmed when the user gave none.
