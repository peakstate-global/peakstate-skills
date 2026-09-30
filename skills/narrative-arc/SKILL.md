---
name: narrative-arc
description: Designs the narrative arc of a deck, talk, workshop or article before any slide or paragraph is written. It works out the audience, the job they hire the piece to do, their pains and misunderstandings, where they are and where the piece takes them, then a spine in which every section states its premise and moves the reader from one thing they would say to another. Use when someone says "plan this deck", "outline this talk", "what's the narrative", "the story feels clunky", "reflow this deck", "structure this article", "give me a spine", or starts any deck or long article with no agreed outline.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "guided"
  output: "text"
---

This skill designs the arc of a deck or article first, so every section earns its place by moving the audience one step from where they are to where the piece should leave them.

## Steps

The topic, any draft and any notes on the audience are the input. If they hold names, customer data, staff or other sensitive detail, say once: "Use only a tool your organisation has approved for this information."

1. **Name the audience.** Who is in the room or reading, what they already know, and what they are responsible for. One audience per piece. If there are two, ask which one the piece is for, and name the other as out of scope.
2. **Name the job to be done.** The job the audience hires this piece to do: the progress they want to make in their own work, not the topic (S2). Write it as "When [situation], they want to [progress], so they can [outcome]."
3. **Map where they start.** List the beliefs they arrive with, the pains they feel and the common misunderstandings, then write beside each belief what it costs them. Keep only beliefs that send effort in the wrong direction. Label each one OBSERVED (the user or a source says so) or INFERRED (your reasoning). Ask the user to confirm any INFERRED belief that the arc leans on, because a wrong belief costs its section the hook.
4. **Name the shift.** One sentence: from what they would say now to what they can say at the end. The audience is the hero and the piece is the mentor (S1). Then say the one action they take after it: where to start.
5. **Build the spine.** Order the sections so each one corrects one starting belief or builds a capability the next section needs. For every section write three things: its premise in one sentence, what the audience says on the way in, and what they can say on the way out. The way out of one section is the way in to the next. Teach the vocabulary before you apply it. End on where to start, not on a method. Use the template in `references/arc-sheet.md`.
6. **Test the spine.** Read only the premises, top to bottom: they must read as the argument of the whole piece. Check that every starting belief is answered by a named section, and that no section moves nobody. Cut or merge any section that fails.
7. **Write the terms sheet.** List every term the piece will use that is not plain English, and decide for each one: keep it, or replace it with plain words. Keep a term only if it earns its place. For each kept term, write what it means here and where the piece introduces it: early, visually, with a metaphor or an example, before its first use. An id such as D1 is fine when its letter means something and the id is reused wherever that item appears. List the replaced terms too, each with the plain words used instead. In a deck, the sheet becomes the hidden terms slide (the peakstate-deck skill says how).
8. **Get the spine and the terms sheet approved before building.** Show the arc sheet and the terms sheet, and ask for sign-off. Nothing is drafted until both are agreed.
9. **Build to the spine.** For a deck, the slides carry the claims, and the speaker notes carry the narrative: each note says what its slide claims and gives the line that carries the audience from the last slide into this one and on to the next. The first slide of each section names the belief it answers. For an article, the headings state each section's premise, and the first sentence of each section links from the last one. Only add text that adds value.
10. **Score the draft.** `/draft-eval` is the bar for an article draft: it scores every section against the rubric before anyone reviews it.

## The take-away

The arc sheet: the audience, the job to be done, the starting map (belief, what it costs, OBSERVED or INFERRED, and the section that answers it), the shift in one sentence, where to start, and the spine table (section, premise, from, to). The template and a worked example are in `references/arc-sheet.md`.

## Next

Your next three moves:

- Confirm or correct each INFERRED belief.
- Read the premises alone, top to bottom, and say whether they make the argument.
- Approve the spine, then build to it.

## Self-check before you deliver

- The audience is one named group, with what they know and what they are responsible for.
- The job to be done is written as progress the audience wants, not as the topic.
- Every starting belief has its cost and its label, and is answered by a named section.
- Every section has a premise, a from and a to, and each section's to is the next one's from.
- Read alone, the premises make the argument of the whole piece.
- The spine ends on where to start, and nothing is drafted before the user approves it.
- The terms sheet lists every term that is not plain English, kept or replaced, and each kept term has a slide or section that introduces it before its first use.
- In the built piece, deck notes carry the linking narrative and every slide's text adds value.

## Read this when

| File | When |
|---|---|
| `references/arc-sheet.md` | Writing the arc sheet, or checking the worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
