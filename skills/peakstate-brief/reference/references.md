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

### The house reference format — a plain alphabetical bibliography

**You still author quotes under each source. They no longer render at the back.** The
markdown is unchanged: one footnote definition per source, its APA entry, then every
passage it supports as a `> ` line with `-- locator`. What changed is where they come
out. Each quote is now shown in the **evidence block of the section that leans on it**,
in context, next to the argument it supports — instead of being stacked at the end where
the reader has to hold the claim in their head while they go and find it.

**So the References section is a bibliography and looks like one:**

- **Alphabetical by first element**, and numbered in that order. **The number a reader
  sees is a position in the list, not the `[^n]` key you authored with** — the renderer
  computes the mapping once so the markers and the list cannot disagree. Keep writing
  `[^1]`, `[^2]` in whatever order suits you.
- **Every footnote marker lands on the entry**, not on a per-quote anchor, because the
  quote itself is already on screen in the section the reader is standing in.
- **APA hanging indent, no rail, no quotes.** The rail said "quoted aside"; a
  bibliography is not one.
- **`qN` in a marker is still validated.** `[^2q6]` against a source carrying four
  quotes is a build error, so a marker cannot claim evidence that does not exist.

**Nothing about checkability is given up, and that is the test this had to pass.** The
verbatim passage, its locator and its link to the source are all still there, one screen
closer to the claim. If you cannot find a passage to sit under an entry, the claim was
an inference and must be relabelled in the body — unchanged.

Where a source could not be retrieved, or was retrieved but its body could not be read,
say so in a `note:` line on that entry rather than quietly omitting the quote. Same for a
community forum thread or any non-authoritative source: the note says what it is, so a
reader knows not to lean on it.
