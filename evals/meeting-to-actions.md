---
skill: meeting-to-actions
eval-version: "2"
---

# meeting-to-actions evals

## Case 1: a transcript with an unowned action and an undated action

**Opening message:** "Turn this into actions please. Transcript, project sync, Tuesday: SAM: OK so we're agreed, the pilot moves from the Parramatta office to the Penrith office. LEE: Yes, agreed. SAM: Lee, can you book the Penrith training room for the pilot week? LEE: Sure, I'll do it by Thursday. SAM: We also need someone to update the rollout plan with the new site. Nobody's picked that up yet. RIA: And I'll ask IT whether the Penrith network can handle the load. SAM: One worry: if the network can't cope we lose the pilot week. RIA: Also, do we still need the vendor on site, or can they dial in? SAM: Let's park that one."

**Scripted replies**, in order, each with when to give it:

i) If the skill asks anything: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the reply asks no clarifying question and gives the full output in one pass.
- P2: the decisions list holds "the pilot moves from the Parramatta office to the Penrith office", and no other item is listed as a decision.
- P3: the action "update the rollout plan with the new site" has owner `[NO OWNER]` and date `[NO DATE]`; no person or role is assigned to it.
- P4: Lee's booking action keeps the timing as the transcript gave it ("by Thursday"), and Ria's IT action has owner Ria and date `[NO DATE]`; no calendar date appears that the transcript did not give.
- P5: the open question about the vendor (on site or dial in) and the risk (the network cannot cope, so the pilot week is lost) each appear once, in their own sections.
- P6: the reply ends with one "Next step" line and no list of three moves.

## Case 2: tentative agreement, sensitive detail, then the user assigns an owner

**Opening message:** "My notes from the budget meeting, can you pull out the actions? - Q3 spend is 8% over. - Leaning towards cutting the conference budget, not final. - Finance to send the revised forecast by 15 October. - Discussed Dana Wu's sick leave, she is off until November, cover needed for her accounts. - Someone should check the contract renewal dates. - Risk: the supplier price rise in January."

**Scripted replies**, in order, each with when to give it:

i) After the first output: "Priya will check the contract renewal dates."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply says once "Use only a tool your organisation has approved for this information." (the notes name a person's sick leave) and asks no clarifying question.
- P2: the conference budget cut is not listed as a decision. It appears as an open question or as proposed, not agreed.
- P3: the first output has "Finance" as owner and "15 October" as date for the forecast; "check the contract renewal dates" has `[NO OWNER]` and `[NO DATE]`; "cover needed for her accounts" has `[NO OWNER]`.
- P4: after "Priya will check the contract renewal dates.", the reply shows the whole output again with Priya as owner of that action, its date still `[NO DATE]`, and the owner marked as added by the user in the chat rather than from the notes.
- P5: the January supplier price rise appears under risks, and no risk, owner or date appears that the notes and the chat did not give.
- P6: each reply ends with one "Next step" line and no list of three moves.

## Case 3: no notes given, then notes with no decisions and no risks

**Opening message:** "Can you do the meeting actions for my 2pm?"

**Scripted replies**, in order, each with when to give it:

i) When the skill asks for the notes or transcript: "Here: we went through the new starter checklist. Jo will draft the welcome email. Ahmed will set up the laptops before the start date. We did not agree whether the buddy should be from the same team. That was it."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply asks exactly one question, for the notes or transcript, and gives no output and invents no meeting content.
- P2: after the notes, the decisions section says in words that the notes record no decisions; it is not left blank and no decision is invented.
- P3: the risks section says in words that the notes record no risks; no risk is invented.
- P4: Jo owns the welcome email with `[NO DATE]`; Ahmed owns the laptops with the timing "before the start date" as given, and no calendar date is added.
- P5: the buddy question (same team or not) appears as an open question.
- P6: the final reply ends with one "Next step" line and no list of three moves.
