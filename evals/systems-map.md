---
skill: systems-map
eval-version: "2"
---

# systems-map evals

## Case 1: a full run on a problem that keeps coming back

**Opening message:** "Help me map why our support backlog keeps coming back."

**Scripted replies**, in order, each with when to give it:

i) When the skill asks what keeps happening or how it has changed over time: "Every quarter the backlog spikes. We pull people onto overtime and weekend blitzes, it drops, then about two months later it is back and higher. It has been like this for 18 months."
ii) When the skill asks to confirm or correct the variables: "Yes, and add staff sick leave."
iii) When the skill asks to confirm or correct the links: "Looks right."
iv) When the skill asks which archetype fits: "Fixes that fail sounds right."
v) When the skill asks who can act or what the user can change: "I run the support team, so I can change how we triage, but not the headcount."
vi) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply asks one question about the pattern and does not yet name an archetype or draw a loop.
- P2: each reply before the take-away asks at most one question.
- P3: the take-away has the causal loop in text notation, with a polarity (`+` or `-`) on every link, and labels each loop R (reinforcing) or B (balancing) so that a loop with an even number of `-` links is R and an odd number is B.
- P4: the take-away has a diagram at a named rung (SVG or Mermaid) as well as the text notation, and uses no image generation.
- P5: the take-away names "Fixes that fail" as confirmed by the user, with the evidence from the user's words (overtime blitz, the backlog returning), and includes sick leave as a variable.
- P6: the take-away gives one leverage point within triage (what the user said they can change), names its level on Meadows' list, labels it a hypothesis, and gives a small test; then three next moves, each with an owner, a first action this week and an observable result, with no invented person or date.

## Case 2: a link the user cannot confirm, and no archetype fits

**Opening message:** "Map the system behind adoption of our onboarding app. Usage rose for three months, then went flat."

**Scripted replies**, in order, each with when to give it:

i) When the skill asks what keeps happening or how it has changed over time: "It rose from 50 to 400 weekly users from March to May and has been flat since. We ran training sessions the whole time."
ii) When the skill asks to confirm or correct the variables or the links: "Mostly right, but I don't know whether more training sessions raise or lower support tickets. Leave that one open. And when support tickets go up, we schedule more training sessions."
iii) When the skill asks which archetype fits: "None of those fit, I think."
iv) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the link between training sessions and support tickets is shown with an unknown polarity (`?` or `[to confirm]`), never as `+` or `-`.
- P2: any loop that runs through that link is typed as unknown (not R or B) until the polarity is confirmed.
- P3: after "None of those fit", the take-away records that no standard archetype fits (or lists a suggestion clearly marked as not confirmed), and never states an archetype as confirmed.
- P4: the take-away still gives one leverage point labelled a hypothesis with a small test, the text notation, and a diagram at a named rung.
- P5: the numbers in the take-away are only the user's (50, 400, March to May); no other figure, owner or date is invented.

## Case 3: skip the questions, then ask for a generated image

**Opening message:** "Skip the questions. Just draw me the causal loop for this: the more our sales team discounts, the more deals close this quarter, but the lower our margin, so finance cuts the marketing budget, so fewer leads come in, so sales discounts more to hit target."

**Scripted replies**, in order, each with when to give it:

i) After the take-away: "Can you make it a picture with a generated image instead?"
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply gives the whole take-away without waiting: text notation plus a diagram at a named rung. Each link the user stated in the opening is marked as the user's, and every link the skill added is marked as suggested; none of the added links is called confirmed.
- P2: the loop discounting, margin, marketing budget, leads, back to discounting is labelled R (reinforcing): its links are discounting to margin `-`, margin to marketing budget `+`, marketing budget to leads `+`, leads to discounting `-`, which is two `-` links.
- P3: any archetype named is marked as suggested, with the evidence it rests on, not as confirmed.
- P4: after the image request, the reply does not use image generation for the causal loop, says why (generated images corrupt labels and arrows) and offers or keeps the SVG or Mermaid form.
- P5: the leverage point is labelled a hypothesis and comes with a small test.
