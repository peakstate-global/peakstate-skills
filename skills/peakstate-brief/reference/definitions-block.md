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
- **A term earns `defs-out` only if using it would make a claim wrong or ambiguous. Needing a
  caveat is not enough.** The test is on the `why` line: read it alone, and if it is a
  *definition of the term*, the term belongs in `defs-in`; if it names a *failure the word
  causes* — smuggles in an unobserved mechanism, covers two mechanisms with one spelling — it
  belongs in `defs-out`. `defs-out` looks rigorous, so it attracts words that only needed a
  footnote, and banning a word the reader already understands costs them vocabulary and buys
  nothing. Default to `defs-in` with a `Watch` bullet carrying the caveat.
- **`defs-in` is what the brief uses.** The `fam` tag names the relation and is optional; the
  SOURCED families are `split`, `needs`, `disambiguate`, `gap`, `rename`, `normative`. A term
  kept in play but carrying a trap takes a `Watch` bullet alongside its `In this brief` line.
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
