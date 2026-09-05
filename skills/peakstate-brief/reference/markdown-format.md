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
    addressed: first forty chars of a comment||another one
    ---

`title` is the `<h1>`; `head-title` is the browser tab and defaults to `title`.
`brief-id` is the localStorage key, so **keep it identical across
regenerations**. `consumed:` is a token you change on every regeneration that acts on
the reader's answers — it is the only thing that clears the unsent-work marker.
`highlights:` is a JSON array of highlights the document now carries itself. `addressed` becomes `data-addressed` on `<body>` (see "Closing a
comment the reader made").

| Source | Renders as |
| --- | --- |
| `# The verdict` | `<h2 class="part" id="part-1"><span class="pnum">Part one</span> …` |
| the paragraph straight after a `#` | `<p class="partlede">` |
| the FIRST `#` part and its sections | wrapped in `<div class="summary-page">` — the boxed summary. A brief with no named parts gets no wrapper. |
| `## Recommendation` | `<section class="brief-section" id="s-recommendation" data-sec="recommendation">` |
| `## Contents` with an empty body | the generated `<nav class="toc">` |
| `## Q1 Should a brief be a new type?` | `<section class="q" id="s-q1" data-q="Q1">` with its `<span class="qid">` |
| `## Title {#s-f1}` | the same section with an explicit id |
| `## Title :: what is in it` | adds the `<span class="tnote">` in the contents |
| `## Q1 … :: short label \| what is in it` | shortens the contents link as well |
| `My assumption: …` then `If wrong: …` | `<p class="assume">` with both labels bold |
| `a) …` and `b) …` lines | `<ul class="options">` with `<b>a)</b>` |
| `[^3]` and `[^3q2]` | `<sup class="fn"><a href="#ref3-q1">3</a></sup>` and `#ref3-q2` |
| `[^3]` where source 3 has no quote | `#ref3`, the entry itself. A marker pointing at a quote that does not exist is a build error. |
| `:::verdict` … `:::` | `<div class="verdict">` with markdown rendered inside |
| `:::html` … `:::` | passed through verbatim |
| a block starting with `<` | passed through verbatim |
| inline `<span class="hl-warn">…</span>` | passed through, in prose, a list item or a table cell. Allowlist: `span b i em strong s del ins sub sup kbd abbr mark small wbr br`, carrying at most a `class`. Anything else escapes to visible text |

**The contents list is generated, never authored.** Every section gets an `id`
automatically, entries are numbered continuously across parts, and a renamed
section cannot leave a dead anchor behind. Put `## Contents` anywhere and leave its
body empty; it always renders above the summary page.

**Two sections are placed by the renderer rather than by the source order.** The
contents go above the summary page, and a section whose id is `s-definitions` is
moved *into* it — the words a brief turns on are read before the verdict that uses
them. Author them wherever they read best in the markdown.

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

**Anything with no markdown equivalent goes in a `:::html` block.** A styled
table with `hl-focus` rows, an inline SVG diagram, a `<details class="example">`,
a classed paragraph. This is the escape hatch, and using it is not a defeat: the
markdown still carries the document, and the bespoke markup stays verbatim.
