---
name: peakstate-brief
description: Build an interactive HTML brief the reader answers in the browser — numbered questions with answer boxes, tick-off sections, selection comments, and one-click Copy responses JSON to paste back into chat. Use whenever delivering a plan, proposal, review or set of questions the reader is meant to answer or sign off, not just a file literally named "questions".
---

# peakstate-brief (portable)

**This is the cut for hosts with no developer machine** — claude.ai, Claude Cowork,
Copilot Cowork. It carries the template and the runtime, so a brief built here is
still one self-contained file. The full skill, with the markdown renderer and its
generated contents, evidence blocks and bibliography, lives at
<https://github.com/peakstate-global/peakstate-skills/tree/main/skills/peakstate-brief>.

Five files, and you need all of them: `SKILL.md`, `brief-template.html`, `brief.css`,
`brief.js`, `inline-brief.py`.

## When this applies

**Any HTML file where the reader is meant to answer something is a brief** — including
a plan or design doc that ends in open questions. A plain HTML page with an "Open
questions" list and no way to answer it is the failure this exists to prevent.

**A brief with no questions is still a legitimate brief.** A findings write-up may ask
nothing; the top bar then reads "0 questions for you", which tells the reader the
document is to be read, not filled in. Never invent questions to fill the section.

## Build it in two steps

**Step 1 — author the HTML from `brief-template.html`.** Fill `{{TITLE}}` and
`{{BRIEF_ID}}`, then replace the two live SAMPLE sections in `<main>` with your own and
delete the `<!-- SAMPLE -->` markers. Never strip the template down to an empty `<main>`:
its worked section and worked question are what make the four hard requirements render.

**Step 2 — inline the runtime, so the brief is one file:**

    python3 inline-brief.py my-brief.html

It swaps the two tags that load `brief.css` and `brief.js` for the files themselves, and
**asserts the document body is unchanged before it writes**, so it cannot alter what the
brief says. Running it twice reports `already ok`.

**No shell on this host?** Deliver the file as authored and **say so in the delivery
message**: it loads its runtime from a CDN, so the reader needs the network the first
time they open it. That is the one property this cut can lose, and a reader opening it
on a plane is the case it fails.

## The four hard requirements — check all four before delivering

1. **Numbered questions.** Each is `<section class="q" data-q="Qn">` with a visible
   `<span class="qid">Qn</span>` in its heading, numbered `Q1, Q2…` so the reader can
   answer by number in chat.
2. **An answer box under every question.** The runtime injects one into every
   `section.q`, so your job is to make each question a real `section.q`.
3. **`brief.js` present and `<main>` present**, which is what gives selection comments.
4. **`data-brief-id` on `<body>`**, which is what gives the copy and download buttons and
   the saved answers. **Keep it identical across regenerations** or the reader's answers
   are orphaned.

Add a **References section with numbered footnotes** whenever the brief rests on sources
outside itself. It is not optional.

## The markup

    <section class="brief-section" id="s-findings" data-sec="findings">
      <div class="sec-head">
        <label class="tick"><input type="checkbox" aria-label="Mark section read"></label>
        <h3>What we found</h3>
      </div>
      <div class="sec-body">
        <p>Prose, tables, lists — ordinary HTML.</p>
      </div>
    </section>

    <section class="q" id="s-q1" data-q="Q1">
      <div class="q-head">
        <label class="tick"><input type="checkbox" aria-label="Mark Q1 resolved"></label>
        <h3><span class="qid">Q1</span> Confirm: the January figures exclude GST?</h3>
      </div>
      <div class="q-body">
        <p class="assume"><b>My assumption:</b> they are ex-GST.
           <b>If wrong:</b> every total in section 3 moves by 10%.</p>
        <ul class="options"><li><b>a)</b> Ex-GST.</li><li><b>b)</b> Inc-GST.</li></ul>
      </div>
    </section>

**Headings:** one `<h1>` in `<header class="brief-title">`, `<h2 class="part">` for each
major part, `<h3>` for every section. A brief whose only headings are section titles has
no skimmable shape.

**A part heading takes a `<span class="pnum">Part one</span>` and is followed by a
`<p class="partlede">`.** The first part renders as the boxed summary page when you wrap
it in `<div class="summary-page">…</div>`.

**Contents go above the summary page**, never inside it: a list of sections inside a boxed
verdict reads as part of the verdict. **Definitions go inside it** — the words a brief
turns on are read before the verdict that uses them.

## House style

- **No box around an ordinary section.** A heading, a hairline rule, the page background.
  Do not add a border, background or radius back on. A box means "read this as one unit",
  which is why only tables, `pre`, `details.example`, the answer box, the summary page and
  the provenance block have one.
- **Prose is serif, UI chrome is sans.** Keep that split in anything you add.
- **Show it rather than describe it.** A UI decision gets a static mockup built inline with
  `<style>` and markup; enumerable options get a table, one row each; a flow gets an inline
  SVG. A reader scans before reading, so what survives a scan is worth more than prose.
- **SVG text must inherit its colour.** Never put a fixed fill on `<text>`; `brief.css`
  sets `main svg text { fill: currentColor }`, and a hardcoded colour is invisible in dark
  mode. Colour through `var(--accent)`, `var(--muted)`, `var(--line)` or `currentColor` —
  never a hex.
- **Never load a font, an image or a script from the network.** A brief is one file.
- **Table cells wrap and never truncate.** No `text-overflow: ellipsis`, no clipping
  `max-width`. Highlight rows or cells with `hl-focus` (look here), `hl-warn` (the defect)
  or `hl-info` (context), and always put a `.legend` above the table saying what each
  colour means in that table.

## Writing the questions

- **Every question is answerable from its own text.** Name the study, the number, the
  person, and what changes if the answer is no. An id like "confirm RT-02" is a lookup the
  reader has to do for you. Test: could they answer it on a phone with nothing else open?
- **Lead with the ask in plain English, assumption-first.** The heading is the whole
  question — "Confirm: M=No means second-hand, GST claimed under Div 66?" — never a topic
  label like "GST flag semantics".
- **First thing in the body is the `.assume` block**, then one or two sentences on the
  confusion you found, then options as `a)` / `b)` where the choices are enumerable.
- **Evidence goes in `<details class="example">`, collapsed**, under a
  `<p class="ex-label">Examples</p>`. The `<summary>` is a one-line human summary carrying
  the discriminating values.
- **Number examples `E1…` globally**, never restarting per question.

## References and footnotes

    <p>Opus 5 is priced at half of Fable 5<sup class="fn"><a href="#ref1">1</a></sup>.</p>

    <section class="brief-section" id="s-references" data-sec="references">
      <div class="sec-head">
        <label class="tick"><input type="checkbox" aria-label="Mark section read"></label>
        <h3>References</h3>
      </div>
      <div class="sec-body">
        <ol class="reflist">
          <li id="ref1"><span class="apa">Simmons, P. (n.d.). <i>Opus 5: no-hype review</i>
            [Video]. YouTube. Retrieved July 25, 2026, from https://…</span>
            <blockquote class="pull">"$5 per million input and $25 per million output."
              <span class="qref">Transcript, 04:12</span></blockquote>
          </li>
        </ol>
      </div>
    </section>

- **Full APA 7 entries with the URL**, alphabetical by first element, numbered in that
  order. No date is `(n.d.)` plus a retrieval date — never invent one to look complete.
- **Quote the passage that proves the claim**, verbatim, with its locator. If you cannot,
  the claim is your inference: label it as such in the body rather than footnoting it.
- **Say how many sources the brief rests on and where the gaps are.** A silently
  incomplete evidence base is worse than a stated one.

## What the runtime already does — never rebuild it

Tick-off per section and per question, with an animated collapse and a progress counter
that links to the next unresolved question · an answer box injected into every question and
saved as the reader types · select-to-comment with five highlighter colours, a sixth chip
that clears, a comments drawer, and draft rescue on every keystroke · copy and download
buttons that export `{id, question, resolved, answer}` plus comments, drafts, notes and
edited documents as JSON · a red dot on those buttons whenever the file holds unsent work ·
per-item note fields via `<textarea data-note="key" data-note-label="label">` · a copy
button on every `<pre>` · theme and width toggles, persisted · tooltips from `data-tip`.

**Never use the `title` attribute** — it is slow, unstyleable and hides the shortcut.

## When the answers come back

The reader pastes the JSON into chat. `ticked: true` with an empty `answer` means the
assumption was accepted as stated; a non-empty `answer` is the reply regardless. Comments
are keyed by `selected_text` — find the passage before acting. Entries under `drafts` were
typed but never saved, so read them and confirm before acting on them.

**Then regenerate the same file, same `brief-id`, same path**, with resolved questions
removed or marked, and put the first forty characters of each comment you have acted on in
`data-addressed` on `<body>`, separated by `||`, so the reader is not asked to send it
twice.
