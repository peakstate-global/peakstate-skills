---
skill: sourced-lite
eval-version: "1"
---

# sourced-lite evals

## Case 1: vague opening that says "just do it"

**Opening message:** "AI will replace middle managers. Just run your checks on it, no questions."

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "Just do it, skip the questions."
ii) When the skill asks again for confirmation: "Yes, that is close. It is for a discussion paper for my leadership team, and I want to test the idea, not sell it."
iii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply restates the idea in a stronger or more precise form and names at least two of purpose, audience and what done looks like.
- P2: the first reply ends with a question asking the user to confirm or correct, and contains no verdict, claim ledger, source or research.
- P3: after "Just do it, skip the questions", the next reply still asks for confirmation and contains no verdict, ledger or research.
- P4: the final take-away has, in this order, a final position, a claim ledger, a decision record, adversarial findings and a provenance block.
- P5: the provenance block has exactly the labels Attribution, Accountable, Limitations and References, and no "Verified:" label.

## Case 2: a claim that fails review

**Opening message:** "Open-plan offices increase face-to-face collaboration. I want to back this up for a proposal to move my team to open plan."

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "Yes, that is right. The proposal goes to my manager next week."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply restates the claim and asks for confirmation, with no research or verdict.
- P2: the claim that open plan increases face-to-face collaboration is marked as failing or holding only in part.
- P3: for that claim the findings record all three of where it holds, where it fails, and what is true instead in the failing region.
- P4: each claim that survives has an observation that would make it false.
- P5: every claim labelled SOURCED has a quote or precise paraphrase and a locator; no claim without a retrieved source is labelled SOURCED.

## Case 3: no web access, one pasted source

**Opening message:** "You have no web access in this chat. My claim: our customers leave because onboarding is too slow. Here is our survey summary: 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.' Help me make this defensible for the board pack."

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "Yes. The board decides next month whether to fund an onboarding rebuild."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply restates the claim and asks for confirmation before any analysis.
- P2: the take-away says the assistant has no web access, and any fact from memory is labelled RECALLED, never SOURCED.
- P3: the survey figure is labelled SOURCED with the pasted sentence quoted or precisely paraphrased and the survey summary named as the locator; References gives it a descriptive entry that states its unknown fields rather than an invented APA 7 entry.
- P4: the decision record entries each have decision, options considered, evidence, chosen, rejected and uncertainty, and none reads as a step-by-step reasoning trace.
- P5: Accountable names no invented person (the user gave no name), and the next three moves invent no named person, date or source.
