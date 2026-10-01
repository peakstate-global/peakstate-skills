---
name: pyramid-rewrite
description: Rewrites a document so it leads with the answer, then gives the situation, the complication and the question behind it (SCQA), with supporting points grouped under headings that state a point. Keeps every fact and adds none. Use when someone says "rewrite this answer-first", "pyramid this", "make this pyramid style", "put the point first", "bottom line up front", "SCQA", "restructure this email or report", or pastes a draft whose conclusion is buried at the end.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "direct"
  output: "text"
---

This skill rewrites a pasted document answer-first, in situation, complication, question and answer (SCQA) order, and keeps its meaning exactly.

## Steps

The pasted document is the input. If it holds names, customer data, health, staff or other sensitive detail, say once: "Use only a tool your organisation has approved for this information."

1. **Find the answer.** The answer is the one thing the writer wants the reader to know or do: a recommendation, conclusion, request or decision (S1, S2). If the document states it anywhere, use it, and ask nothing. If it states none, ask one question and wait: "What is the one thing you want the reader to know or do?" If the user answers "your call" or has not decided, never choose for the writer. Lead with the decision or action the text asks of the reader, and mark it `[No recommendation in the source]`. If the text asks for no decision either, lead with its most important statement, marked `[Assumed main point: please confirm]`.
2. **Find S, C and Q.** Situation: what the reader already knows or accepts. Complication: what changed, went wrong or needs a choice. Question: the question the answer responds to. Take each from the text (S1). If the text has no situation or no complication, write "none in the source" in the map for that element and invent nothing.
3. **Rewrite.** Put the answer first, in one or two sentences. Then the situation and complication, short. Then the supporting points, most important first, grouped under headings that state a point, not a topic (S2, S3). Use `references/method.md` for the rules. If the text already leads with its answer, say so, keep its order, and make only small wording or grouping changes. "No change" is a valid result.
4. **Keep the meaning.** Every fact, number, date, name, caveat and condition in the input stays, unchanged. Add no fact, owner, date, source, reason or calculation. A calculated figure appears only if it is labelled "calculated from the text". An unknown the reader will need is a visible placeholder such as `[to confirm: approver]`. Anything you know from memory rather than the text is labelled RECALLED. Keep the writer's spelling and domain terms.
5. **Show it.** Give the whole rewrite, then the SCQA map, then at most five "What moved" bullets, then the Next step line. Use the template in `references/take-away.md`.
6. **Act on a follow-up.** Apply the edit, show the whole rewrite again with the same map, and keep step 4. If the edit asks for a person, date or fact the input did not give (an approver, an owner, a deadline), do not invent one: add a placeholder or ask who, in one line.

## The take-away

The rewrite, the SCQA map (each element with the text it came from, or "none in the source"), up to five "What moved" bullets, and one Next step line. The template and a worked before-and-after example are in `references/take-away.md`.

## Next

Next step: one line at the end of every reply. Name the one thing the user should check: a placeholder to fill, an assumed main point to confirm, or the first sentence to read aloud. Never invent an owner or a date.

## Self-check before you deliver

- The first sentence of the rewrite states the answer, or a marked `[No recommendation in the source]` or `[Assumed main point: please confirm]` lead; no recommendation appears that the writer did not make.
- At most one clarifying question was asked, only because the text states no answer.
- Every fact, number, date, name and caveat in the input is in the rewrite, unchanged; nothing is added except marked placeholders and labelled calculations.
- The SCQA map has a row for each of S, C, Q and A, each with its source text or "none in the source".
- Headings state a point, and supporting points run most important first.
- A follow-up edit shows the whole rewrite again and invents no person, date or fact.
- The reply ends with one Next step line, not three moves.

## Read this when

| File | When |
|---|---|
| `references/method.md` | Finding the answer, building SCQA, writing headings and grouping points |
| `references/take-away.md` | Writing the reply, or checking the worked before-and-after example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.

## Reference: method.md

# Method: answer-first rewriting

Each entry carries a source id that resolves in `SOURCES.md`. "Skill rule" marks a rule from this skill, not a library.

## The pyramid

- Present the ideas as a pyramid under one single point. Thinking set out this way is easy for a reader to grasp. (S1)
- The main point can be a summary, a conclusion, a recommendation, or the action the reader needs to take. Write it in as few words as possible. (S2)
- Order the rest from most to least important. (S2)
- For a long document, put a summary or a list of recommendations at the front. (S2)

## SCQA: situation, complication, question, answer

The Situation, Complication, Question framework finds the question in the reader's mind; the answer is the point at the top of the pyramid. (S1)

| Element | What it holds | Test |
|---|---|---|
| Situation | What the reader already knows or accepts | The reader would nod, not ask "really?" |
| Complication | What changed, went wrong or needs a choice | It makes the question arise |
| Question | The question the reader now has | The answer responds to exactly this |
| Answer | The main point: conclusion, recommendation, request or decision | It stands alone as the first sentence |

- In an answer-first rewrite the answer comes first, then the situation and complication as short background. The question is often left implied in the text, but it always appears in the map. (S1, S2)
- If the source has no situation or no complication, the map says "none in the source". Never write one to fill the gap. (Skill rule)

## Headings and grouping

- Headings describe the main ideas under them. (S2)
- Start a heading with its keywords and keep it short. Avoid a question as a heading, because it pushes the main idea to the end. (S3)
- A heading states the point of its section ("Three queues cut the wait to 3 hours"), not only its topic ("Test results"). A point heading must use only facts in that section. (S3, Skill rule)
- Group supporting points under the heading they support; each group holds points of one kind (reasons, steps or options), not a mix. (Skill rule)
- A short text of three or four sentences needs no headings: answer first, then the rest in order of importance. (Skill rule)

## Meaning

- A restructure moves sentences; it does not change what they say. Every fact, number, date, name, caveat and condition stays. (Skill rule)
- If the writer has not decided, the rewrite says so. The lead is the decision the reader must make, never a recommendation the writer did not make. (Skill rule)
- A figure you calculate (a total, a difference) appears only when labelled "calculated from the text". (Skill rule)
- An owner, approver or date the text does not give is a placeholder, such as `[to confirm: approver]`. (Skill rule)

## Reference: take-away.md

# Reply template

    [Sensitive-information line, once, only if it applies.]

    [The whole rewrite. The first sentence is the answer, or a marked lead.]

    | Element | In the rewrite | From the source |
    |---|---|---|
    | Situation | [text, or "none in the source"] | [the source words it came from] |
    | Complication | [text, or "none in the source"] | [the source words] |
    | Question | [the question the answer responds to] | [implied by: source words] |
    | Answer | [the first sentence] | [the source words, or "no recommendation in the source"] |

    What moved:
    - [up to five bullets, such as "The request moved from the last line to the first."]
    - [or, when the text already leads with its answer: "Nothing moved. The text already leads with its answer."]

    Next step: [one thing to check: a placeholder, an assumed lead, or the first sentence].

After a follow-up edit, use the same template: the whole rewrite again, the map, what moved in this edit, and the Next step line.

# Worked example

The user pasted:

> Our store has used paper stock counts since 2019. Counts take two staff a full day each month, and last quarter three counts had errors over 5%. A barcode scanner trial in the back room found errors under 1% and took half a day. Scanners cost $2,400 for the store. We recommend buying scanners before the December stocktake.

The reply:

    We recommend buying barcode scanners, at $2,400 for the store, before the December stocktake.

    Our store has used paper stock counts since 2019. Last quarter three counts had errors over 5%, and each count takes two staff a full day each month.

    **A scanner trial cut errors to under 1%**
    - The trial ran in the back room.
    - Errors were under 1%.
    - The count took half a day.

    | Element | In the rewrite | From the source |
    |---|---|---|
    | Situation | Paper stock counts since 2019 | "used paper stock counts since 2019" |
    | Complication | Errors over 5% in three counts; two staff a full day | "three counts had errors over 5%" |
    | Question | Should we change how we count stock? | implied by the complication |
    | Answer | Buy scanners before the December stocktake | "We recommend buying scanners before the December stocktake" |

    What moved:
    - The recommendation moved from the last line to the first, with its cost.
    - The trial results became one group under a point heading.

    Next step: read the first sentence alone and check it is the decision you want.

## Sources

# Sources

All entries retrieved 29 September 2026.

[S1] Minto Books International. (n.d.). *Barbara Minto: The Minto Pyramid Principle and SCQ Framework*. Retrieved September 29, 2026, from https://www.barbaraminto.com/

[S2] Australian Government. (2024, September 6). *Inverted pyramid structure*. Style Manual. Retrieved September 29, 2026, from https://www.stylemanual.gov.au/structuring-content/types-structure/inverted-pyramid-structure

[S3] Australian Government. (2025, April 1). *Headings*. Style Manual. Retrieved September 29, 2026, from https://www.stylemanual.gov.au/structuring-content/headings
