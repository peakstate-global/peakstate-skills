---
name: peakstate-brief
description: Build interactive HTML briefs/question files the user answers in the browser — tick-off questions, inline locally-persisted answers, selection comments, one-click "Copy responses" / "Download responses" JSON to paste back to Claude. Use whenever delivering an HTML file that asks the user questions or presents reviewable findings/sections — question files, review briefs, AND any plan / proposal / design doc that contains questions or needs sign-off. If the file poses even one question the user is meant to answer, it is a brief.
---

# peakstate-brief — interactive question/review HTML files

## When this applies (read first — the common miss)

**Any HTML file where the user is meant to answer something is a brief** — not
just files literally named "questions". This explicitly includes a **plan,
proposal, or design report that ends with open questions / decisions to make**.
Delivering such a plan as plain HTML with an "Open questions" section and no way
to answer it inline is the exact failure this skill exists to prevent. If your
output has a question in it, it goes through this skill — full stop. (A pure
read-only report with zero questions may stay plain HTML under the "visual HTML
report" rule; the moment it asks anything, it's a brief.)

## One document — never split a plan from its questions

A plan/proposal/design doc and its questions are **the same file**. Do NOT
produce a visual report plus a separate "questions" brief — that's two files the
user has to reconcile, and the report half has no way to answer anything. Build
the whole plan AS one brief: the visual content (cards, tables, diagrams) as
free markup or `section.brief-section` blocks, and each question as an inline
`section.q` in the same document. One file, one `data-brief-id`, one delivered
`file://` URL. Rich custom styling is fine — add a `<style>` block that reuses
brief.css's CSS variables (`--bg --fg --card --line --accent --muted …`) so the
visual extras stay theme-aware (light/dark/system) and cohesive with the brief
chrome, instead of a bespoke dark-only palette.

**House style: no box around a section.** `section.brief-section` and `section.q`
render as a heading with a hairline rule under it, on the page background — no
card, no border, no shadow. A card around every block turns a brief into a stack
of tiles and buries the reading order. Boxes are reserved for things the reader
acts on or reads as data: `details.example`, tables, `pre`, the answer textarea.
Do not add a border, background or radius back onto a section in a custom
`<style>` block. Prose is serif, UI chrome is sans; keep that split in any
extras you add.

## Show it — a brief is an HTML page, so use the page

**Reach for a visual before a paragraph, every time one would land faster.** The
brief is rendered HTML in a browser, not a text file: it can draw the thing being
decided. A reader scans a brief before they read it, so anything that survives a
scan — a table, a diagram, a rendered mockup, a colour-coded comparison — is
worth more than the same content in prose.

- **A UI decision gets a mockup, not a description.** If the question is what a
  screen, component, state or layout should be, build a small static rendering of
  it inline with `<style>` and markup, and put the options side by side. Asking
  someone to picture two layouts from a paragraph each is asking them to do the
  work the file exists to do. Label it plainly as a static illustration — it is a
  picture of the thing, not the working thing.
- **Enumerable options render as a visual comparison**, not as a list of
  sentences. A row per option and a column per property scans in seconds; three
  paragraphs do not.
- **A process, a flow or a topology gets a diagram.** Inline SVG or CSS boxes and
  arrows, no image files and no external assets, so the brief stays one portable
  file.
- **Data that has a shape gets a chart, not just a table.** A trend over time, a
  distribution, a share of a whole, a before/after gap, a ranking — these are read
  in one glance from a chart and reconstructed line by line from a table. Give the
  chart when the shape *is* the point, and keep the table when the reader needs the
  exact figures; a chart above its own table is often the right answer.
  - **Hand-roll it in inline SVG.** No Chart.js, no D3, no CDN — a brief is one
    self-contained file and a chart that needs the network is a blank rectangle in
    the environments this skill exists to work in. Bar, column, line, dot plot,
    stacked proportion and small multiples are all a few `<rect>`, `<line>`,
    `<polyline>` and `<text>` elements. A `viewBox` with no fixed width scales to
    the column.
  - **Colour through the CSS variables**, never hardcoded hex: `var(--accent)`,
    `var(--muted)`, `var(--line)`, or `currentColor`, so the chart reads in light,
    dark and system. A dark-only chart in a light brief is worse than no chart.
  - **Label the marks directly** rather than through a legend the eye has to hop
    to, put the units in the axis title, and start a bar axis at zero — a truncated
    axis makes a small difference look decisive, which is the one thing a brief
    must never do to its own evidence.
  - **State what the chart cannot show.** A tiny sample, a missing period, an
    estimate among measurements — say it in a caption under the chart, not only in
    the prose beside it.
  - **Give every chart a text equivalent**, either the table it came from or one
    sentence naming the takeaway, so the point survives print, a screen reader and a
    reader who does not trust pictures.
- **Before and after belong next to each other**, in one table or one pair of
  panels, with the changed cells highlighted using `hl-focus` / `hl-warn` /
  `hl-info` and a `.legend` naming what each colour means here.
- **Numbers go in a table with the units in the header**, never scattered through
  a sentence.
- **Structure the prose too.** Bold the load-bearing clause, break a wall of text
  into short paragraphs with meaningful subheadings, and let `<details>` hold the
  evidence a reader only sometimes wants.

**Stay inside the house style while doing it.** Theme extras with brief.css's CSS
variables (`--bg --fg --card --line --accent --muted …`) so light, dark and system
all work; keep prose serif and UI chrome sans; never put a border, background or
radius back around a `section`. Boxes are for things the reader acts on or reads
as data. Never load a font, an image or a script from the network — a brief is one
self-contained file, and a mockup that needs the internet is not a mockup.

**The test:** could the reader answer the question from the visuals alone, and
read the prose only to check? If not, the visual is decoration and the prose is
still doing all the work.

## Hard requirements — every brief MUST render all four (verify before delivering)

1. **Numbered questions** — each question is `<section class="q" data-q="Qn">`
   with a visible `<span class="qid">Qn</span>` in its `<h2>`, numbered `Q1, Q2…`
   so the user can answer by number in chat.
2. **A response textarea under every question** — the runtime auto-injects one
   into each `section.q`; your job is to make sure each question is a real
   `section.q` (not a bare `<h2>`), so it gets one.
3. **Selection-comment system** — provided by the runtime; requires `brief.js`
   loaded and `<main>` present. Never omit the script.
4. **Copy + download icon buttons** — one combo control in the runtime top bar;
   require `brief.js` + `data-brief-id` on `<body>`. Edited documents ride in
   the same payload under `edits`.
5. **A References section with numbered footnotes** — whenever the brief rests on
   sources outside itself (documents, videos, transcripts, papers, web pages, other
   repo files). See the next section; it is not optional and not a nice-to-have.

6. **One H1, H2 parts, H3 sections** — see "Heading structure" below. A brief
   whose only headings are section titles has no skimmable shape.
7. **A Contents section**, first in `<main>` after the title block, on any brief
   with more than about four sections.

Self-check before sending: open the file, confirm you can see the H1 title block,
the Contents, numbered questions with a "Your answer" box under each, the comments /
width / theme / copy+download icons top-right, and — if the brief cites anything —
footnote markers that jump to a References section carrying the quoted passages.
If any is missing, you didn't build it as a brief — fix it.

**A brief with no questions is a legitimate brief.** A research write-up, a findings
report or a delivered plan may ask nothing. Do not invent questions to fill the
section — the runtime prints **"0 questions for you"** in the top bar, which tells the
reader this document is to be read, not filled in.

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

## Contents — a brief over about four sections gets one

First section in `<main>` after the title block, `data-sec="toc"`, so it ticks off and
collapses like anything else. Nest an `<ol>` per part inside `<nav class="toc">`, one
`<li>` per section, each with a `<span class="tnote">` saying in a few words what is in
it — a bare list of section names tells the reader nothing they cannot see by scrolling.

Link to `#part-n` for parts and `#s-<slug>` for sections, which means **every section
needs an `id`** as well as its `data-sec`. Check every anchor resolves before sending;
a dead ToC link is worse than no ToC.

## References and footnotes — every sourced claim is traceable

A brief that asserts things the reader can't verify is an opinion piece. If the
brief draws on ANY source outside itself, it carries a References section and
numbered footnotes. Non-negotiable parts:

- **APA 7 entry, with the URL.** Hanging indent is handled by `.apa`. Formats:
  - Video: `Author, A. [Channel Name]. (2026, July 25). *Title of video* [Video]. YouTube. https://…`
  - Web page: `Author, A. (2026, July 25). *Title of page*. Site Name. https://…`
  - No date → `(n.d.)` plus `Retrieved July 25, 2026, from https://…` — never invent
    a publication date to make the entry look complete.
  - Internal/unpublished source (a repo file, a DB row, a transcript with no public
    URL) → cite it as such: `Internal corpus. (2026, July 25). *videos.transcript*
    [Database record]. Row id …` and say so in an `.apa-note`.
- **Quoted passages that prove the claim**, inside the reference entry. Verbatim,
  in `<blockquote class="pull">`, each with its own `id` so a footnote can point at
  the exact quote rather than the whole source. Attribute with a `<span class="qref">`
  carrying the timestamp / page / cell / line. If you cannot quote a passage that
  supports a claim, the claim is your inference — label it as such in the body
  rather than footnoting it.
- **Numbered footnote markers in the body**, at the end of the sentence or table
  cell they support: `…half of Fable 5<sup class="fn"><a href="#ref1-q1">1</a></sup>`.
  Number references `1…n` in first-citation order. A footnote may be cited many
  times; point repeated citations at the most relevant quote in that reference.
- **The runtime handles the jump**: it reveals collapsed `<details>` and ticked-off
  sections before scrolling, highlights the target, and adds a `↩` back-link on each
  reference to its first citation. Don't hand-roll any of that.

Markup:

    <p>Opus 5 is priced at half of Fable 5<sup class="fn"><a href="#ref1-q1">1</a></sup>.</p>

    <section class="brief-section" data-sec="references">
      <div class="sec-head">
        <label class="tick"><input type="checkbox" aria-label="Mark section read"></label>
        <h2>References</h2>
      </div>
      <div class="sec-body">
        <ol class="reflist">
          <li id="ref1">
            <span class="apa">Simmons, P. (n.d.). <i>Opus 5: No-hype full review &amp; testing</i>
              [Video]. YouTube. Retrieved July 25, 2026, from
              <a href="https://www.youtube.com/watch?v=…">https://www.youtube.com/watch?v=…</a></span>
            <blockquote class="pull" id="ref1-q1">"$5 per million input and $25 per million output.
              Whereas Fable 5 is $10 per million input and $50 per million output."
              <span class="qref">Transcript, benchmark walkthrough</span></blockquote>
          </li>
        </ol>
      </div>
    </section>

**Say how many sources the brief rests on, and where the gaps are.** If the user
expected five sources and you found three, state that in the brief — a silently
incomplete evidence base is worse than a stated one.

### The house reference format — APA entry, then its quotes beneath it

**One `<li>` per source, never one per quote.** The APA entry comes first, then every
passage that source supports, stacked underneath it as `<blockquote class="pull">`
elements with their own ids (`ref7-q4`) and a `<span class="qref">` naming where in the
source it sits — the section heading, page, timestamp or cell. A source cited eleven
times has eleven blockquotes under one entry, numbered `q1…q11`.

This is the format, and it is not optional, because it is what makes the References
section *checkable* rather than decorative: the reader lands on the exact sentence the
footnote was claiming, not on a link to a page they now have to search. It also makes
the author's own overreach visible — if you cannot find a passage to sit under the
entry, the claim was an inference and must be relabelled in the body.

Where a source could not be retrieved, or was retrieved but its body could not be read,
say so in an `<span class="apa-note">` on that entry rather than quietly omitting the
quote. Same for a community forum thread or any non-authoritative source: the note says
what it is, so a reader knows not to lean on it.

## How to build one

Any HTML file that asks the user questions (or presents sections to review) MUST
be built from `assets/brief-template.html` in this skill directory. All
interactivity lives in the reusable drop-in runtime — **never regenerate that
logic inline**:

- **Copy `brief.css` and `brief.js` from `<skill-dir>/assets/` into `<output-dir>/`
  when you can** — by whatever means the host has (`cp` on macOS/Linux, `copy` in
  `cmd.exe`, `Copy-Item` in PowerShell, or a plain file copy). Do not assume a
  Unix shell. `<skill-dir>` is the directory holding this SKILL.md, resolved from
  wherever the skill was loaded — never a hardcoded home path.
  **This step is now an optimisation, not a precondition.** The template loads
  those two files if they are beside the brief and falls back to the pinned CDN
  copies if they are not, so a brief works either way. Copy them when you can:
  it is faster, works offline, and no third party sees the brief being opened.
- Author ONLY content: fill `{{TITLE}}`, `{{BRIEF_ID}}` (stable slug;
  localStorage key — keep identical across regenerations so saved answers
  survive), and **replace the two live SAMPLE sections** in the template's
  `<main>` with your real sections/questions (delete the `<!-- SAMPLE -->`
  markers). The template ships one worked `section.brief-section` + one
  numbered `section.q` so a generated file renders all four requirements
  immediately — never strip them down to an empty `<main>`. The runtime
  self-initializes and injects the top bar / progress / copy + download buttons / answer
  textareas / toast itself.
- Integration into any pre-existing HTML page = the same two tags:
  `<link rel="stylesheet" href="brief.css">` + `<script src="brief.js"></script>`
  plus `data-brief-id` on `<body>`.

Deliver the result per the global rule: full `file:///…` URL in a fenced code
block.

## One template, every environment — how the runtime loads

**There is one template. It works whether or not the assets are beside it**, so
you never have to decide which build to produce. `brief-template.html` carries a
short bootstrap in its `<head>` that tries three things in order:

| Order | Source | When it wins | Cost |
|---|---|---|---|
| 1 | `brief.css` / `brief.js` beside the file | They were copied, or the reader saved them there | Nothing fetched, works offline, no third party sees the brief open |
| 2 | The pinned CDN copies, verified by Subresource Integrity | The brief was generated with no filesystem, emailed on its own, or moved out of its folder | Two requests on first open, then the browser caches them |
| 3 | A visible notice naming the two files to save beside it | Neither is reachable | The brief is still complete and readable, just not interactive |

**Local first, CDN second — not the other way round.** Preferring the CDN would
mean failing a network request before using a perfectly good file sitting right
there: slower on every open, broken offline, and a request to a third party every
time anyone opens any brief. The fallback exists for when the local files are
genuinely absent, which is exactly the case a chat tool or CoWork produces.

**Copy the whole `<head>` bootstrap verbatim from `brief-template.html`. Never
retype it, and never retype the integrity hashes.** They pin a specific published
version, so a wrong character means the CDN copy is refused. That failure is safe
— the reader gets the notice rather than a blank page — but it costs them the
interactivity. If the pinned tag ever moves, recompute both hashes
(`openssl dgst -sha384 -binary <file> | openssl base64 -A`) and update the
template.

**Never point a delivered brief at a moving branch.** The tag is pinned so a brief
made today still renders the way it did when it was made.

### Attaching the skill to a chat tool

**For ChatGPT, Copilot chat, or Microsoft 365 Copilot CoWork, attach two files:
this `SKILL.md` and `assets/brief-template.html`.** That is the whole skill for
those hosts. The model fills in the content and emits one HTML file; because the
template already knows how to reach its runtime, the result works when the reader
opens it, with nothing to copy and no second build to choose.

CoWork reads a skill's `SKILL.md` from `Documents/Cowork/Skills/<skill-name>/` in
OneDrive and needs no install step. Its handling of a skill's other bundled files
is undocumented, which is the second reason the template stands alone.

## End-of-phase brief — required section order

A brief closing a work phase (see global CLAUDE.md § How I work) uses these
sections, in this order. Keep it scannable — the user is assessing, not reading
a paper.

1. **Verdict** — one paragraph, plain language, honest answer first. "Partially"
   and "no" are acceptable answers.
2. **Delivered** — what was built, where it lives, what it does. Link
   everything; embed players/previews so it can be assessed without leaving the
   page.
3. **Evidence** — numbers before and after, with the noise floor stated so a
   real gain is distinguishable from variance.
4. **Decisions you made** — every judgement call taken without asking, and why.
   The audit trail; the most closely read section.
5. **What didn't work** — failed attempts, dead ends, things that came out
   worse. A brief with no failures is hiding something.
6. **My config steps** — numbered, exact, each with why you couldn't do it.
   "None" is a good answer.
7. **Open recommendations** — decisions awaiting the user's call.
8. **Review** — one `section.q` per aspect the user would have an opinion on,
   named specifically (not "the UI"), each with its OK / Needs work tick and
   answer box.
9. **Next phase readiness** — what's unblocked, what's still waiting.

## Editable documents — when the reader rewrites, not just comments

**A brief carrying a draft the reader is meant to CHANGE uses a `[data-doc]` block, not a question
with a textarea.** Comments are right for "this line is wrong"; an editable document is right for an
article, a policy, a spec or a page of copy where the reader wants to fix the wording in place and
hand it back. Asking someone to describe an edit in a comment box is asking them to write the diff
by hand.

    <div data-doc="article-body" data-doc-label="Article (a) body">
      <script type="text/markdown">
# The heading

The body, in markdown, exactly as it should ship.
      </script>
    </div>

- **The source of truth is the `<script type="text/markdown">`**, which the browser never renders,
  so the original always survives and Revert always works. Do not write the rendered HTML yourself;
  the runtime renders it.
- **The runtime injects the whole editor** — the toolbar, the Raw MD toggle, Done, Revert, the
  "edited" flag and the heading rail. Author only the markdown.
- **Click the text to edit it. There is no Edit button.** Clicking a sentence in the rendered
  document starts editing with the caret at the character you clicked, the way nav's project
  Description box works. Escape or Done ends editing; ⌘Enter / ⌘S also finish.
- **The toolbar is sticky and context-aware**, mirroring nav's: H1 H2 H3, bold, italic,
  strikethrough, inline code, code block, bulleted and numbered lists, blockquote, body text,
  horizontal rule, link and unlink, table controls, copy-as-markdown. A button lights up when the
  caret is inside what it applies — H1 is highlighted inside a heading, B inside bold.
- **Tables are supported both ways.** The table button opens a sub-toolbar (insert 3×3, add or
  delete a row or column) which also opens itself whenever the caret lands in a table. GFM pipe
  tables render, and serialise back to pipe tables.
- **Raw MD is one click away**, and swaps back with "Rich editor". Both modes edit the same
  markdown string, so the switch is a conversion, never a merge.
- **The heading rail is nav's MiniTocSidebar**: thin bars down the document's right edge, one per
  heading, width by level (H1 widest); the bar for the heading you are reading is highlighted as
  you scroll; hovering the rail opens a flyout of the titles, and clicking either scrolls there.
  Hidden under 900px and in print.
- **Markdown stays the stored form.** Every keystroke serialises the DOM back to markdown, so the
  responses JSON and Revert compare markdown to markdown. Edits persist to localStorage on every
  keystroke.
- **Edits ride in the responses JSON** under `edits: [{id, label, original, edited}]`, both sides,
  so the author diffs rather than re-reads. An untouched document is omitted entirely.
- **One `data-doc` per document, with a stable id** — it is the localStorage key, so keep it
  identical across regenerations or saved edits are orphaned.
- The renderer and the serialiser cover headings, emphasis, links, inline and fenced code, lists,
  blockquotes, rules and GFM pipe tables. Anything outside that set is normalised to its nearest
  markdown equivalent rather than passed through as HTML.
- **Why it is not TipTap:** a brief is one self-contained file opened from disk, so there is no
  bundler and no network. nav does this job with TipTap v3 + tiptap-markdown; here the same
  behaviour is rebuilt on `contenteditable` + `execCommand`, ported from
  `src/components/ui/{MarkdownEditor,RichTextEditor,MiniTocSidebar}.tsx`. Read those files before
  changing the editor — the click-to-caret offset walk, the 112px active-heading fold and the
  180ms flyout delay are all lifted from them deliberately.

**Selection comments still work inside an editable document**, so a reader can mark up in reading
view and rewrite in edit view, and both come back in the same payload.

## Definitions block — put the vocabulary at the top

**When a brief turns on words the reader and the writer may use differently, open with a Terms
block.** Contested, ambiguous or newly-coined words are the commonest reason a brief gets answered
at cross purposes, and the fix is cheap: say what each word means *here*, before anything rests on
it. Borrowed from the SOURCED definitions block, so a brief and a position paper teach one layout.

**Use it when** the brief coins a term, uses a word two parties define differently, or asks a
question whose answer depends on which sense of a word is meant. **Skip it** for a brief with no
such words — an empty Definitions block is worse than none.

Two halves, in this order, inside one `section.brief-section`:

    <section class="brief-section" data-sec="definitions">
      <div class="sec-head">
        <label class="tick"><input type="checkbox" aria-label="Mark section read"></label>
        <h2>Definitions</h2>
      </div>
      <div class="sec-body">

        <p class="defs-h">Not used here</p>
        <div class="defs-out">
          <div class="term"><s>Decline</s> <span class="to">→</span> <b>depreciation</b> · <b>displacement</b>
            <span class="why">used for two things that move on different clocks</span></div>
        </div>

        <p class="defs-h">Used here</p>
        <div class="defs-in">
          <div class="term">
            <div class="fam">needs</div>
            <h4>Risk</h4>
            <ul>
              <li><span class="k">In this brief</span> the exposure created by something that might go wrong</li>
              <li><span class="k">Needs</span> a <b>likelihood</b> and an <b>impact</b> — neither is a kind of risk</li>
            </ul>
            <div class="foot">Bears on Q3 · Q7</div>
          </div>
        </div>

      </div>
    </section>

- **`defs-out` is what the brief sets aside.** One line each: the word struck through, the word
  used instead in bold, and a short `why`. Never a paragraph — if it needs one, it belongs in
  `defs-in` as a term the brief does use.
- **`defs-in` is what the brief uses.** The `fam` tag names the relation and is optional; the
  SOURCED families are `split`, `needs`, `disambiguate`, `gap`, `rename`, `normative`.
- **`foot` says which questions the term bears on**, so a reader can see why the word was worth
  defining. Drop it rather than leave it vague.
- **Never tell the reader their usage is wrong.** The block says what the words mean *in this
  brief*. A definition good enough to borrow travels; an instruction seeds resistance.

Pure CSS — the runtime does nothing with it, so the block ticks off and collapses like any other
section.

**The six SOURCED families**, if the brief uses the `fam` tag. Each names the condition the word is
in, so the tag is a diagnosis the author can check rather than an instruction they have to derive:
`umbrella` (covers several kinds of itself) · `compound` (needs every part supplied together) ·
`overloaded` (two unrelated meanings, one spelling) · `unmeasured` (names something nobody
measured) · `imprecise` (vague where an exact term exists) · `judgement` (says what ought to be, so
no evidence settles it).

## Closing a comment the reader made

**A regenerated brief declares what it has already acted on, so nothing is carried back twice.**
Put the first forty characters of each addressed comment on `<body>`, separated by `||`:

    <body data-brief-id="my-brief" data-addressed="the umbrella term is not non-pre||overloaded">

Matching is on a normalised prefix of the comment text, because the comment is the only stable
identifier there is: it lives in the reader's browser, not in the file, so the file cannot carry an
id it never saw. A matched comment renders struck through and greyed, stays readable, and is
**dropped from the exported JSON**. Nothing is deleted, and the reader can still see what they
said.

**Do this every time you regenerate a brief in response to comments.** Leaving them unmarked makes
the reader re-send the same points, which is the round-trip this feature exists to remove.

## Question-writing rules (as important as the widgets)

- **Every question is answerable from its own text — never a bare id.** Name the study
  (author, year, what it measured, its n), the number at stake, the person or thing, and what
  changes if the answer is no. "Confirm RT-02" or "E7-007/010/011/018 were struck" is not a
  question, it is a lookup the reader has to do for you. Ids go in small print at the end for
  traceability. Test: could the reader answer it on a phone without opening another file?
  (2026-08-26: a sixteen-question brief phrased as claim ids and red-team ids got two answers
  and the reply "no context, just machine-optimised IDs". Fourteen decisions lost to format.)
- **Lead with the ask in plain English, assumption-first.** The `<h2>` is the
  complete question a non-technical reader can answer at a glance:
  "Confirm: M=No on a purchase row means second-hand purchase, GST claimed
  under Div 66 when sold — and what does X mean?" — never a topic label like
  "GST flag semantics".
- First element of the body is the `.assume` block: **My assumption:** … /
  **If wrong:** what changes. Then 1–2 sentences on the confusion point found.
  Then concrete options (a/b/c) where choices are enumerable.
- Evidence goes under a `<p class="ex-label">Examples</p>` label, each example
  in `<details class="example">`, **collapsed by default**. The `<summary>` is a
  one-line human summary that never collapses: example number, item/name, the
  discriminating values, cell ref — e.g.
  `E1 Digga broom (PSS0100) — M=Yes — X=X  BAS 2026_4!A7:AF10`. Full verbatim
  table inside `.tblwrap`.
- **Table cells wrap; they never truncate.** brief.css wraps every `th`/`td` by
  default — never add `text-overflow: ellipsis`, `overflow: hidden`, or a
  `max-width` that clips a cell in your own `<style>` block. A clipped cell hides
  content the reader has no way to recover, and re-rendering the file to read one
  cell is not an acceptable workaround. Verbatim data tables inside `.tblwrap`
  keep single-line rows (readable via that wrapper's horizontal scroll) — add
  `class="wrap"` to any long-prose cell there to wrap it instead. `class="num"`
  right-aligns numerics, `class="nowrap"` pins a short cell to one line.
- **Large tables: pinned + highlighted.** `.tblwrap` scrolls both axes
  (65vh cap) with the header row AND first column pinned automatically — put
  the identifying value (row no. / code / name) in the FIRST column; add class
  `nopin` to `.tblwrap` only if the first column isn't an identifier. When the
  reader must focus on specific rows/columns/cells, highlight them with
  `hl-focus` (the thing to look at), `hl-warn` (the defect/contradiction),
  `hl-info` (supporting context) on `tr`/`td`/`th` (column = class on each td),
  and put a `.legend` directly above the table naming what each colour means
  in THIS table. A cell-level highlight always overrides its row's highlight
  (e.g. `hl-warn` cell inside an `hl-focus` row renders warn) — rely on it: `<div class="legend"><span class="chip hl-warn"></span>blank
  status cell …</div>`. Never highlight without a legend; never more than
  three colours per table.
- Number every question `Q1…` (`data-q`) and every example `E1…`
  (`<span class="dp">En</span>`) — E-numbers globally unique across the whole
  brief (never restart per question, never bracket-style `[1]`) so the user can
  answer by number in chat as an alternative to the JSON.

## What the template runtime already provides (do not reimplement)

- Tick-off per question AND per non-question section → collapses it (header
  stays, toggle back anytime); progress counter in the sticky top bar.
- Answer `<textarea class="answer">` under each question — **auto-injected by the
  runtime** into every `section.q` that doesn't already have one, so you never have
  to add it (add one manually only to control its exact placement). Persisted to
  localStorage as the user types.
- **Copy icon on every code block** → the runtime injects a top-right copy
  button into every `<pre>` (copies its `<code>`/text content, ✓ + toast on
  success). Just write plain `<pre><code>…</code></pre>` — never hand-roll a
  copy button.
- **Copy + download combo button** → JSON of `{id, question, resolved, answer}`
  pairs plus all selection comments, all drafts and all note fields. The download
  half writes `<brief-id>-responses-<YYYY-MM-DD>.json`, for a brief read offline or
  answers worth keeping as a file. Both are icon-only with hover tooltips.
- **Comments drawer** (speech-bubble icon, or press `C`) → every comment and every
  unsaved draft in one scrollable list, with Show / Edit / Delete per row and
  Resume / Discard per draft. A comment whose highlight could not be restored is
  listed with a **not highlighted** badge rather than disappearing — the drawer is
  what makes a lost highlight cosmetic instead of a lost thought.
- **Draft rescue** — text typed into a comment popup is persisted on every
  keystroke. Clicking away, pressing Escape, or reloading keeps it as a draft in the
  drawer and in the exported JSON under `drafts`. Only the explicit **Discard**
  button throws it away.
- **Keyboard in the comment popup** — `Cmd/Ctrl+Enter` saves, `Escape` closes and
  keeps the draft.
- **Tooltips carry their shortcut.** Every top-bar control renders a CSS tooltip
  from `data-tip` naming what it does and its key (`Copy responses JSON · ⌘C`).
  Never use the `title` attribute — it is slow, unstyleable and hides the shortcut.
- **Comment anchoring survives element boundaries.** Selections flatten to a
  whitespace-normalised string with an index map back into the text nodes, so a quote
  crossing a `<strong>` or spanning two paragraphs anchors as one comment and
  re-anchors on reload. The occurrence index is stored, so a repeated phrase
  re-anchors onto the copy that was actually selected.
- **Per-item note fields** — put `<textarea data-note="unique-key"
  data-note-label="human label">` anywhere (under an audio sample, a mockup, a
  table row) and the runtime persists it to localStorage and exports it under
  `notes: [{id, label, note}]`. Use these when the reader needs to jot against
  many items without one question per item. **Cmd/Ctrl-C with nothing selected (and focus
  outside a field) copies the same JSON.**
- Select any text → popover with a comment textarea; saved comments render as
  `<mark>` highlights, click to edit/delete; re-anchored on reload by
  whitespace-insensitive text match; unanchorable ones still survive in the JSON
  (`{selected_text, near_question, comment}`).
- **Selecting text still copies normally.** The popover deliberately does not
  focus its textarea on a fresh selection (focusing collapses the selection and
  would break Cmd-C), so the user can copy the selection, use the popover's
  "Copy text" button, or click into the box to comment. Never add an autofocus
  or a `removeAllRanges()` to that path. Escape closes the popover.
- Table cells wrap and never truncate (see the question-writing rules above).
- Top-bar icon toggles: theme switcher (system → light → dark, default system)
  and fixed-width vs full-width; both persisted browser-wide (`briefUI` key).
- Progress reads "n/N questions resolved" and **is itself a jump-link to the next
  unresolved question** (advances as each is resolved; becomes plain text once all
  are) — so a long brief never has to be scrolled to find what's outstanding.
  **Resolved = an answer has been typed OR the question has been ticked** — typing
  an answer *is* resolving it, and the counter updates live as you type. The tick
  remains meaningful on its own: it's how a question is resolved by accepting the
  stated assumption without typing anything. Light + dark theme, print-safe,
  `cursor: pointer` affordances, no external network assets.

## Receiving answers back

The user pastes the JSON into chat. Each answer carries `resolved` (answered OR
ticked — matches the on-screen counter), `ticked` (the checkbox alone), and
`answer`. Treat `ticked: true` with an empty `answer` as "assumption confirmed as
stated"; a non-empty `answer` is the reply regardless of `ticked`. Do **not** read
`resolved: false` as "unanswered" when `answer` is non-empty — that combination
can only come from a brief generated before this contract, and the answer still
stands. Comments are keyed by `selected_text` +
`near_question` — locate the passage before acting on the comment. A comment with
`anchored: false` lost its highlight and was recovered from the drawer; treat it
exactly like any other. Entries under `drafts` are text the reader typed but never
saved — read them, but confirm before acting, since they may be abandoned thoughts. After
processing, update whatever register/doc the questions came from and, if
questions remain, regenerate the SAME brief file (same `{{BRIEF_ID}}`, same
path) with resolved questions removed or marked, so their saved state stays
meaningful.

## SOURCED — run it when it is available, and show your working

**If the `sourced` skill is installed, run it on any brief that makes claims a reader
might act on** — research, analysis, findings, anything citing outside sources. A brief
is exactly the artefact SOURCED exists for. It is not needed for a brief that only asks
questions about the reader's own data.

What that adds to the document:

- **A `.sourced` sidecar beside the HTML**, same basename plus `.sourced`. It carries
  every load-bearing claim with its status (sourced / inferred / recalled), the evidence
  rows with source hashes and archive URLs, the decision log, and the record of the
  adversarial pass.
- **A Provenance statement section**, immediately **before** References, built from the
  sidecar's `disclosure` object rather than written by hand. Use a `<dl class="provblock">`
  with the four labels as `<dt>`: **Attribution · Accountable · Limitations · References**.
- **A "What I could not verify" section** before it, if anything failed to ground. Lead
  with how many sources the brief rests on, then a table of the weak claims, each with
  what you would do about it.

### Attribution links — make the toolchain checkable

**Attribution names the tools, and links them wherever a public URL exists.** A reader
who wants to know how a document was made should be one click away, not one search away.

- **Link each skill that shaped the brief.** This skill lives at
  <https://github.com/peakstate-global/peakstate-skills/tree/main/skills/peakstate-brief>.
  The SOURCED standard publishes its own canonical URL — take it from that skill's
  sidecar `$schema` namespace rather than typing it from memory, so the link tracks the
  standard if it moves. If a skill has no public URL, name it in plain text — never
  invent one, and never link a private host from a document that may travel.
- **Link the sidecar relatively**, never absolutely: `<a href="my-brief.html.sourced">`.
  It sits beside the HTML, so a relative link survives being moved, copied or emailed
  as a pair. An absolute `file:///Users/...` path breaks for every reader but you, and
  leaks a local directory structure into a document that may go outside.
- **Name the model, harness and version** in C2PA's `softwareAgent` shape, and say which
  model ran the adversarial pass and at what grade. "Reviewed" without naming the
  reviewer is the thing SOURCED's U rule exists to prevent.

## Template changes

If a brief needs a genuinely new interaction, extend
`assets/brief-template.html` here (keep it dependency-free and backwards
compatible with stored state) — improvements then benefit every future brief.

## Verifying template changes

`assets/smoke-test.mjs` drives `assets/test-fixture.html` with Playwright and
covers the lot: ticks, persistence, the comment popover and drawer, JSON export,
and the whole document editor (click-to-edit, caret placement, toolbar states,
Raw MD, tables, the heading rail). **Run it after any runtime edit.**

    mkdir -p /tmp/bt && cp assets/{brief.css,brief.js} /tmp/bt/
    cp assets/test-fixture.html /tmp/bt/test.html
    # smoke-test.mjs resolves playwright from ITS OWN location, so run it from a
    # repo that has playwright installed:
    cp assets/smoke-test.mjs <a-repo-with-playwright>/ && node smoke-test.mjs /tmp/bt

All booleans true + `errors: []` = pass. The fixture must keep its `[data-doc]`
block: the editor half of the suite is skipped when a page has none, and a
skipped check reads exactly like a passing one.

## Updating an existing brief's runtime

`brief.css` / `brief.js` are **copied next to each brief**, so an old brief keeps
running its old runtime forever — a fixed bug will look unfixed in the file the
reader actually has. When a brief is reopened after a runtime change, copy both
assets over its folder again and hard-refresh (⌘⇧R); the page caches the script.
Stored answers, comments and edits are keyed independently and survive the swap.
