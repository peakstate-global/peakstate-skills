## Template changes

If a brief needs a genuinely new interaction, extend
`assets/brief-template.html` here (keep it dependency-free and backwards
compatible with stored state) — improvements then benefit every future brief.

## Verifying template changes

**The renderer has its own check, and it needs nothing installed:**

    node <skill-dir>/assets/test-build-brief.mjs

It renders `assets/test-brief.md`, which holds one section per block type, and
asserts the four hard requirements, the block shapes, that every internal anchor
resolves, that a footnote with no target fails the build, that a fixed colour on
SVG text or a locally re-declared `.diag` rule fails the build, and that two
renders of one source are identical. Run it after any change to
`build-brief.mjs`.

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

`brief.css` / `brief.js` are **inlined into each brief at build time**, so an old
brief keeps running its old runtime forever — a fixed bug will look unfixed in the
file the reader actually has. **Rebuild it from its markdown**, with the same
`brief-id` and the same output path, then hard-refresh (⌘⇧R). Stored answers,
comments and edits are keyed on the `brief-id` in localStorage, not on the file,
so they survive the rebuild.

**If the reader has a copy elsewhere — Drive, an inbox, their desktop — send them
the rebuilt file.** There is no way to upgrade a copy in place any more, and that
is the trade the inlining makes: a brief that cannot be silently patched is also
a brief that cannot silently break.
