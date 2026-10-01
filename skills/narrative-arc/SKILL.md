---
name: narrative-arc
description: Designs the narrative arc of a deck, talk, workshop or article before any slide or paragraph is written. It works out the audience, the job they hire the piece to do, their pains and misunderstandings, where they are and where the piece takes them, then the emotional journey from how they feel arriving to how they feel leaving, then a spine in which every section states its premise and moves the reader from one thing they would say and feel to another. Use when someone says "plan this deck", "outline this talk", "what's the narrative", "the story feels clunky", "reflow this deck", "structure this article", "give me a spine", or starts any deck or long article with no agreed outline.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.3"
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
5. **Map the emotional journey.** Beliefs change only once the audience feels understood, so plan the feelings as well as the arguments. Name how they feel arriving (wary, cynical, anxious, bored, quietly afraid) and how they should feel leaving. Then plan three moves:
   - **Understanding comes first.** Before any promise, a section states their concerns in their own words, better than they would put them, and agrees with what is true in each (S3, "confirm their suspicions"). A promise made before that moment sounds like a sales pitch, and the room stops listening.
   - **Contrast what is with what could be.** Move back and forth between the reality they know and the better state the piece offers, so the gap pulls them forward (S1).
   - **Earn the close.** End on hope or resolve they have reached themselves. A dream at the start is believed only if the audience can see you do not believe the brochure version either; if the piece opens on one, open on the brochure version and close on the earned one.
   Each fear or objection gets one move, chosen on purpose: confirm what is true, justify a past failure that was not their fault, allay a fear with evidence and stories, encourage the dream, or face a shared problem together (S3). Never tell an audience not to be afraid.
6. **Build the spine.** Order the sections so each one corrects one starting belief or builds a capability the next section needs. For every section write four things: its premise in one sentence, what the audience says on the way in, what they can say on the way out, and what they feel by the end of it. The way out of one section is the way in to the next. Teach the vocabulary before you apply it. End on where to start, not on a method. Then, before any building, name the shape of each section's idea (a journey is a map, a spread is a curve, a filter is a funnel, a ladder shows every rung) so the build draws that shape, and plan one device per slide, varied across the piece: a guess before a reveal, a surprise, a callback, a live challenge, or curiosity. Use the template in `references/arc-sheet.md`.
7. **Test the spine.** Read only the premises, top to bottom: they must read as the argument of the whole piece. Then read only the feelings, top to bottom: they must read as a journey with no jump the room cannot make, and the understanding moment must come before the first promise. Check that every starting belief is answered by a named section, that no section moves nobody, and that each idea is modelled once: two sections that model the same idea with different axes or terms get merged. Cut or merge any section that fails.
8. **Write the terms sheet.** List every term the piece will use that is not plain English, and decide for each one: keep it, or replace it with plain words. Keep a term only if it earns its place. For each kept term, write what it means here and where the piece introduces it: early, visually, with a metaphor or an example, before its first use. An id such as D1 is fine when its letter means something (A for AI) and the id is reused wherever that item appears; each framework gets one look, used everywhere and unlike every other framework's. Once introduced, a term may be reused later; where it returns, let context clues imply its meaning. List the replaced terms too, each with the plain words used instead. In a deck, the sheet becomes the hidden terms slide (the peakstate-deck skill says how).
9. **Get the spine and the terms sheet approved before building.** Show the arc sheet and the terms sheet, and ask for sign-off. Nothing is drafted until both are agreed.
10. **Build to the spine.** For a deck, the slides carry the claims, and the speaker notes carry the narrative: each note says what its slide claims and gives the line that carries the audience from the last slide into this one and on to the next. The first slide of each section names the belief it answers. For an article, the headings state each section's premise, and the first sentence of each section links from the last one. Only add text that adds value.
11. **Score the draft.** `/draft-eval` is the bar for an article draft: it scores every section against the rubric before anyone reviews it.

## The take-away

The arc sheet: the audience, the job to be done, the starting map (belief, what it costs, OBSERVED or INFERRED, and the section that answers it), the shift in one sentence, the emotional journey (arriving, leaving, and where the understanding moment sits), where to start, and the spine table (section, premise, from, to, feel). The template and a worked example are in `references/arc-sheet.md`.

## Next

Your next three moves:

- Confirm or correct each INFERRED belief.
- Read the premises alone, top to bottom, and say whether they make the argument.
- Approve the spine, then build to it.

## Self-check before you deliver

- The audience is one named group, with what they know and what they are responsible for.
- The job to be done is written as progress the audience wants, not as the topic.
- Every starting belief has its cost and its label, and is answered by a named section.
- Every section has a premise, a from and a to, and each section's to is the next one's from; each idea has one model and a named shape, and the planned devices vary.
- Read alone, the premises make the argument and the feelings make a journey, with the audience's concerns stated fairly before any promise.
- The spine ends on where to start, and nothing is drafted before the user approves it.
- The terms sheet lists every term that is not plain English, kept or replaced, and each kept term has a slide or section that introduces it before its first use.
- In the built piece, deck notes carry the linking narrative and every slide's text adds value.

## Read this when

| File | When |
|---|---|
| `references/arc-sheet.md` | Writing the arc sheet, or checking the worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
