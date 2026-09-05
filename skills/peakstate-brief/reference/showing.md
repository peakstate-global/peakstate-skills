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
  - **Leave `<text>` unstyled and let it inherit — the build enforces this.** SVG
    text defaults to black and does *not* inherit the page colour, so a diagram
    that looks right in light mode is invisible in dark. `brief.css` fixes it
    globally (`main svg text { fill: currentColor }`), and `build-brief.mjs`
    **refuses to render** a brief whose SVG text carries a fixed colour, or whose
    own `<style>` re-declares `.diag`, `.cap` or `main svg text`. Only
    `var(--…)`, `currentColor`, `none` and `inherit` pass. You cannot forget this
    one; you can only be stopped by it.
  - **Still look at it in dark mode before delivering.** Click the theme toggle in
    the top bar. The gate catches fixed colours, not a chart whose contrast is
    merely poor, and this failure is invisible to an author working in light mode
    and total for a reader who is not.
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
  a sentence. **A table's left edge aligns exactly with the prose above it** — an
  inset table reads as a nested thing rather than as the evidence for the paragraph
  it follows.
- **In a legend, a swatch sits closer to its own label than to the next pair.**
  Proximity is what says which label belongs to which colour, so a flat row with one
  even gap makes the reader guess. The runtime wraps each pair, so this holds without
  being authored.
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
