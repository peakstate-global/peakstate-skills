---
title: Renderer fixture brief
brief-id: renderer-fixture
addressed: a comment with a "quoted" phrase in it||another one
eyebrow: Fixture · 3 September 2026 · exercises every block
sub: Every block type `build-brief.mjs` knows about, in one file, so a regression shows up as a failing assertion rather than a broken brief.
---

## Contents

# The blocks

Each section below holds one block type, so a failure names the block that broke.

## Prose and inline marks {#s-prose} :: bold, italics, code, links, footnotes

A paragraph with **bold**, *italics*, `inline code`, a
[link](https://example.com/docs) and a footnote at the end of the
sentence[^1]. A second footnote points at the second quote under the same
source[^1q2].

Unicode has to survive untouched: café, naïve, 20 °C, ±3 %, — em dash, 中文,
emoji 🌏, and the mathematical set {a, b} with a & ampersand and a < less-than.

A code span may itself hold backticks: `` `not a fence` ``.

## Nested numbering {#s-lists} :: ordered inside ordered, bullets inside ordered

1. The first step, which has sub-steps.
   1. The first sub-step.
   2. The second sub-step.
2. The second step, whose text wraps across
   two source lines and should join into one item.
3. The third step, with bullets under it.
   - A bullet.
   - Another bullet.

## Tables {#s-tables} :: GFM pipe tables with escaped pipes

| Migration | What it did | Why it matters |
| --- | --- | --- |
| `043` | Made `storage_path` nullable | An attachment no longer has to hold bytes |
| `039` | Added `drive_file_id` | The precedent exists and is in production |
| `072` | Added a nullable column named `a \| b` | Escaped pipes stay in the cell |
| <span class="hl-warn">Highlighted</span> | An allowlisted inline tag renders | <script>alert(1)</script> and `<span>` in a code span stay literal |

## Code fences {#s-code} :: a fence holding a shorter fence

````
```
echo "a fence inside a fence"
```
````

## Long block quote {#s-quote} :: multi-paragraph, joined per paragraph

> The first paragraph of a long quotation, which runs over several source
> lines and should come back as one paragraph rather than one blockquote per
> line, because a per-line blockquote is unreadable at length.
>
> The second paragraph of the same quotation. It stays inside the same
> blockquote element, separated only by a blank quoted line.

## Containers and raw HTML {#s-raw} :: the escape hatch for bespoke markup

:::verdict
**A container renders its body as markdown**, so a highlighted block still
reads as prose in the source.
:::

:::html
<div class="legend"><span class="chip hl-focus"></span>raw markup passes through
untouched, for a diagram or a styled table</div>
:::

# Decisions

The question shapes, which carry the assumption block and the options list.

## Q1 Should the markdown source ship beside the delivered HTML?

My assumption: yes, the `.md` sits next to the `.html` and both are committed.
If wrong: only the HTML is delivered and the markdown becomes a build artefact
nobody can find.

The markdown is the thing PRIMA ingests, so losing it costs the structure the
whole change was made to keep[^2]. A source with no pull quote is still citable,
so its marker lands on the entry itself[^3].

a) Ship both, side by side.
b) Ship the HTML only, keep the markdown in the repo.

## Q2 Is a generated contents list acceptable?

My assumption: yes, generated from the part and section headings.

## References

[^1]: Ramsden, A. (2026, August 18). *Where briefs live*. Internal design
    proposal. https://example.com/where-briefs-live
    > "PRIMA holds the document, nav holds the pointer." -- Standfirst
    > "The expensive-sounding parts are cheap." -- Standfirst, second sentence
[^2]: Internal corpus. (2026, September 3). *peakstate-brief SKILL.md*
    [Repository file]. skills/peakstate-brief/SKILL.md
    note: An internal file with no public URL, cited as such.
    > "A brief that asserts things the reader can't verify is an opinion piece." -- References section
[^3]: Australian Bureau of Statistics. (2026). *A source cited with no pull
    quote*. ABS. https://example.com/no-quote

## Provenance

Attribution
: Drafted by Claude (Opus 5) in Claude Code. Built with the peakstate-brief skill.

Accountable
: This is a renderer fixture, not a document anyone should act on.

Limitations
: None material.

References
: No external sources. The two entries above are fixtures.
