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
