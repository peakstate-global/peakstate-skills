## The markdown source format

**Front matter, then parts, then sections.** Everything else is ordinary
markdown. The structural layer is deliberately small, because the only parts a
brief needs that markdown has no word for are the parts the runtime keys off.

    ---
    title: Where briefs live
    head-title: Where briefs live — PRIMA as the library, nav as the pointer
    brief-id: prima-nav-docs-2026-08
    eyebrow: Design proposal · 18 August 2026
    sub: The standfirst, one sentence on what the brief is about.
    replies: [{"match": "first forty chars of a comment", "reply": "what you said back"}]
    ---

`title` is the `<h1>`; `head-title` is the browser tab and defaults to `title`.
`brief-id` is the localStorage key, so **keep it identical across
regenerations**. `consumed:` is a token you change on every regeneration that acts on
the reader's answers — it is the only thing that clears the unsent-work marker.
`highlights:` is a JSON array of highlights the document now carries itself.
`replies:` is a JSON array of `{match, reply}` and becomes `data-replies` on
`<body>`: `match` is the first forty characters of a comment the reader made and
`reply` is your answer to it, which the runtime shows in a thread on that comment
(see "Replying to a comment the reader made"). `addressed:` is the older form,
still accepted, and becomes `data-addressed`: the same matching with no words.
`define: every-use` links every eligible use of a defined term rather than the first
use per section (`first-use` is the default and can be written out). `notes: per-fact`
switches the brief to one footnote per fact rather than per source (see "Per-fact notes" in
`references.md`); without it nothing changes. `tabs: parts` lays the brief out as tabs, one
per part (see "Tabbed layout" below); without it nothing changes. The publish
tooling writes its own state back as `visibility:` and the `publish-*` keys
(`publish-slug`, `publish-project`, `publish-project-uid`, `publish-brief-uid`,
`publish-short-id`, `publish-tenant`); leave those to it.

**An unknown front matter key fails the build**, naming the key and listing the known
ones. A misspelt option would otherwise do nothing and say nothing. A tool that starts
reading a new key adds it to `KNOWN_KEYS` in `build-brief.mjs` in the same change.

| Source | Renders as |
| --- | --- |
| `# The verdict` | `<h2 class="part" id="part-1"><span class="pnum">Part one</span> …` |
| the paragraph straight after a `#` | `<p class="partlede">` |
| the FIRST `#` part and its sections | wrapped in `<div class="summary-page">` — the boxed summary. A brief with no named parts gets no wrapper. |
| `## Recommendation` | `<section class="brief-section" id="s-recommendation" data-sec="recommendation">` |
| `## Contents` with an empty body | the generated `<nav class="toc">` |
| `## Answers` holding a definition list | `<dl class="answers">`, lifted to sit under the standfirst and above the contents |
| `## Q1 Should a brief be a new type?` | `<section class="q" id="s-q1" data-q="Q1">` with its `<span class="qid">` |
| `## Title {#s-f1}` | the same section with an explicit id |
| `## Title :: what is in it` | adds the `<span class="tnote">` in the contents |
| `## Q1 … :: short label \| what is in it` | shortens the contents link as well |
| `My assumption: …` then `If wrong: …` | `<p class="assume">` with both labels bold |
| `a) …` and `b) …` lines | `<ul class="options">` with `<b>a)</b>`. The word `Recommended` (bold, bracketed or with a colon) inside an option renders as a `.rec` badge in place, and the item gets `class="is-rec"`; write it once, on one option |
| `[^3]` and `[^3q2]` | `<sup class="fn"><a href="#ref3-q1">3</a></sup>` and `#ref3-q2` |
| `[^fx]`, with `notes: per-fact` | `<sup class="fn fact"><a href="#note-fx">1</a></sup>`, numbered by first appearance on the page |
| `[^fx]: [^3] [^3q2] [^5]`, with `notes: per-fact` | one entry of the generated Notes list, `<ol class="factnotes">`, rendered where the first such line sits |
| `[^3]` where source 3 has no quote | `#ref3`, the entry itself. A marker pointing at a quote that does not exist is a build error. |
| `:::verdict` … `:::` | `<div class="verdict">` with markdown rendered inside |
| `:::html` … `:::` | passed through verbatim |
| `:::draft` … `:::` | `<div class="draft" data-draft>` with markdown rendered inside: a boxed message the reader sends on (an email, a chat post). The runtime adds a copy button that writes `text/html` and `text/plain`, so it pastes formatted into a rich editor and as plain text into a terminal |
| `data-href` on a `.defs-in .term` card | a "Read the brief" link in that term's tooltip, and the address printed under the card on paper. Only an `https:` or a relative URL is kept; the builder drops any other value (`javascript:`, `data:`, `http:`, `//host`) and keeps the card |
| `:::gallery` … `:::`, one `![caption](src)` per line | `<div class="gallery">` of captioned `<figure>` thumbnails, 3 across on a desktop, 2 on a tablet, 1 on a phone, more in full width. `:::gallery pairs` holds two across (four in full width) so a before-and-after pair shares a row. The lightbox steps through that gallery only. A line starting with `<` (a hand-written `<figure>`) passes through; any other line fails the build |
| a block starting with `<` | passed through verbatim |
| inline `<span class="hl-warn">…</span>` | passed through, in prose, a list item or a table cell. Allowlist: `span b i em strong s del ins sub sup kbd abbr mark small wbr br`, carrying at most a `class`. Anything else escapes to visible text |

**The contents list is generated, never authored.** Every section gets an `id`
automatically, entries are numbered continuously across parts, and a renamed
section cannot leave a dead anchor behind. Put `## Contents` anywhere and leave its
body empty; it always renders above the summary page.

**Three sections are placed by the renderer rather than by the source order.** The
contents go above the summary page, and a section whose id is `s-definitions` is
moved *into* it — the words a brief turns on are read before the verdict that uses
them. The third is the answers block, a section whose id is `s-answers`, which is
lifted higher still: under the standfirst and above the contents, so a reader who
reads nothing else leaves with every answer. Like the contents, it is kept out of
the contents list, because a list that points at something above itself sends the
reader backwards. Author all three wherever they read best in the markdown.

**A part lede that cites a source gets its own evidence block**, the same collapsed
quotes block a section gets, listing only the sources that lede leans on. Without it
the summary page — usually a lede and nothing else — would be the one place in a
brief where a footnote marker has no quote under it, and it is the part most likely
to be copied out on its own.

**References are footnote definitions**, and the renderer builds the house format
from them — one `<li>` per source, the APA entry first, every quote stacked
beneath it with its own anchor. A `--` on a quote line carries the locator; a
`note:` line becomes the `.apa-note`.

    ## References

    [^1]: Simmons, P. (n.d.). *Opus 5: No-hype full review* [Video]. YouTube.
        Retrieved July 25, 2026, from https://www.youtube.com/watch?v=…
        > "$5 per million input and $25 per million output." -- Transcript, 04:12
        > "Fable 5 is $10 per million input." -- Transcript, 04:31
    [^2]: Internal corpus. (2026, July 25). *videos.transcript* [Database record]. Row 118.
        note: Retrieved from the working database; no public URL.

**A footnote marker with no matching quote fails the build.** That is the whole
reason footnotes are structural rather than prose: a dead reference link is found
by the renderer, not by the reader.

**A definition list becomes the provenance block.** A term line followed by a
`: definition` line renders as `<dl>`, and inside the section whose id is
`s-provenance` it renders as `<dl class="provblock">` — the SOURCED four-label
shape, with no markup to write by hand.

**Tabbed layout: `tabs: parts`.** Use it for a long brief with several
parallel subjects, each holding several sections, where a reader wants one
subject at a time rather than one long scroll. Write the brief exactly as
before; the key changes only how the screen lays it out.

- **Tabs are the `#` parts, in source order, in one row.** The selected tab
  rises out of a baseline that runs the width of the page. A long label wraps
  inside its tab; the row never wraps and never reorders. The bar sticks under
  the top bar, and every jump lands below it.
- **Sub-tabs are the `##` sections of the selected part**, in source order,
  wrapping onto more rows when needed. The label is the section's contents
  label: the short label from `## Heading :: Short label | note` if given, else
  the heading, with the `Q1:` prefix on a question. A part with one section has
  no sub-tab row.
- **One section shows at a time**, under its part heading and lede, with
  Previous and Next buttons that name their targets and step through every
  section in source order, across parts.
- **The contents list is not rendered**, because the tabs and the gutter rail
  already list every section; an authored `## Contents` is dropped and
  `brief-lint.py` does not require one. **The answers block** and any section
  before the first `#` part stay visible above the tab bar.
- **Links still work.** A `#s-...` link, a footnote, the gutter rail, the
  progress link and a comment in the drawer all switch to the tab that holds
  their target first. The address bar carries the selected section's id, so a
  reload returns to the same tab.
- **Print and PDF show every section, untabbed.**
- **A brief with no `#` part fails the build** under `tabs: parts`, because
  there is nothing to make a tab from. The only accepted value is `parts`.

The fixture `assets/test-tabs-brief.md` is a small worked example.

**Anything with no markdown equivalent goes in a `:::html` block.** A styled
table with `hl-focus` rows, an inline SVG diagram, a `<details class="example">`,
a classed paragraph. This is the escape hatch, and using it is not a defeat: the
markdown still carries the document, and the bespoke markup stays verbatim.
