# Brief structure — headings, indentation, standfirst, summary, contents

How a brief is laid out on the page, and the rules that keep a long one navigable.
Split out of SKILL.md so the brief-writing task does not carry it in context every run.

## Indentation stops at the H3 section

**The H3 section is the deepest indentation level in a brief. Nothing nests
further without a stated reason.** The staircase (title → part → section → body)
is what makes the page scannable; a fourth step is noise, and it usually arrives
by accident from a browser default rather than by a decision. A `<figure>` is the
worst offender — the browser's own stylesheet gives it 40px of left AND right
margin, which pushed charts and their captions in past the prose that introduced
them.

**Where the extra indent was saying "these two things are one thing", say it with
a box instead.** `figure` now draws the existing card treatment — `var(--card)`
on a `var(--line)` hairline with a 10px radius, the same vocabulary as
`.summary-page` and `.provblock` — around the chart and its `figcaption`
together, at the section's own left edge. Do not invent a second box style, and
do not add margin or padding to push content further right.

## Heading structure — H1 once, H2 parts, H3 sections

**Three levels, always in this order.** A brief is a document, not a list of cards, and
the heading levels are what let a reader skim it, print it, or hear it read aloud in
the right order.

- **`<h1>`, exactly once**, inside `<header class="brief-title">` at the top of `<main>`,
  with an `.eyebrow` kicker above it and a `.sub` standfirst below. The kicker carries
  the document type and date; the standfirst says in one sentence what the brief is about.
- **`<h2 class="part">` opens each major part.** Use one per subject the brief covers —
  if a brief answers two questions, that is two parts. Give it a `<span class="pnum">`
  ("Part one") and follow it with a `<p class="partlede">`. Optional on a single-subject
  brief; **required the moment there is more than one subject**.
- **`<h3>` is every tickable section's heading**, inside `.sec-head` or `.q-head`.

**Never put the part name in the section heading too.** A section called "Part 2 — the
four setups" sitting under an H2 called "Part two" gives the reader two competing claims
to the same label, and the real H2 stops registering as structure. The section heading
names the section only.

**Do not add a `max-width` to anything in the title block.** `main` already holds the
measure; a second, narrower cap makes the standfirst look accidentally indented against
the body text beneath it.

## Every claim in the title and standfirst is paid off at every level below

**The heading and the standfirst are a promise, and each claim in them must be answered in the
opening line of the part that owns it, in the section under that part, and in the detail under
that section.** A reader stops at whichever level satisfies them, so a claim that only resolves
three screens down has been made to three readers and kept for one.

- **Name the claims before you write the body.** List the assertions in the title and standfirst.
  Each one gets an owning part; that part's `partlede` answers it in a sentence; the section
  under it answers it with the evidence.
- **The words must repeat.** If the standfirst says "four levers", the section says "four
  levers" — not "the practical read". A reader scanning for the phrase they were promised will
  not translate your synonym.
- **A claim you cannot pay off is cut from the standfirst**, not softened. A hedge in a promise
  reads as a promise.
- **The test:** read only the standfirst, then only the part ledes, then only the section
  headings. Each pass alone must answer the title. Three passes that each need the next one are
  a document with no summary, however good the prose is.

Measured on the endogenous-DMT brief, 2026-09-04: a standfirst claiming the measured findings
were "more useful than the DMT story" named the derived levers but never said what had been
measured. It took two rounds of reader comments to surface, because each round fixed the
sentence rather than the level below it.

## The summary block restates the question before answering it

**By the time the summary is on screen the title has scrolled away, so the block
has to carry the question as well as the answer.** The first part of a brief is
rendered as a boxed summary page, and a reader arrives at it with the contents
above and the H1 gone. A confident "No, and nobody has ever checked" with nothing
naming what was asked is an answer to a question the reader can no longer see.

- **The first sentence of the part lede restates the question in its own words**,
  then answers it. Not the title verbatim — the question as a person would ask it.
- **This is a sibling of the payoff rule above, not a repeat of it.** That rule
  says every claim in the standfirst gets answered further down. This one says the
  summary must be readable cold, with nothing above it in view.
- **The test:** delete everything above the summary box and read what is left. If
  you cannot tell what was asked, the block is not finished.

Measured 2026-09-04: a brief whose summary opened "No, and nobody has ever
checked" was screenshotted mid-page with the question nowhere on screen.

## Contents — a brief over about four sections gets one

First thing in `<main>` after the title block, `data-sec="toc"`, so it ticks off and
collapses like anything else. **Its position is the renderer's call, not yours** — a
`## Contents` written inside part one is hoisted out of the summary page and rendered
above it, so the box holds the verdict and nothing else. Nest an `<ol>` per part inside `<nav class="toc">`, one
`<li>` per section, each with a `<span class="tnote">` saying in a few words what is in
it — a bare list of section names tells the reader nothing they cannot see by scrolling.

Link to `#part-n` for parts and `#s-<slug>` for sections, which means **every section
needs an `id`** as well as its `data-sec`. Check every anchor resolves before sending;
a dead ToC link is worse than no ToC.
