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

`assets/test-sync.mjs` covers the publish sync — that an unpublished brief makes
no request and posts no message, that publishing leaves the copied JSON
byte-identical, that a comment written offline is held and sent on reconnection,
and that two devices commenting on one brief both end up with both comments. It
serves the fixture over HTTP and frames it, because that is the shape the sync
runs in. **Run it after any change to the sync section of `brief.js`.**

    node test-sync.mjs /tmp/bt      # same setup as the smoke test, same repo trick

## What the host page owes a published brief

The document is served inside a sandboxed frame with no `allow-same-origin`, so
it cannot call the review endpoint itself. It does not try. The page that frames
it makes the request; the document owns the protocol. Four messages, all
`{ v: 1, type }`:

| Direction | Message | Meaning |
|---|---|---|
| doc → parent | `brief-sync-hello` `{briefId, slug}` | ready; carries no reader data, sent to `*` |
| parent → doc | `brief-sync-init` | the host names its origin; everything after goes there alone |
| doc → parent | `brief-sync-put` `{id, briefId, slug, base, next}` | forward `base`/`next` to `PUT /api/briefs/<briefId>/review` |
| parent → doc | `brief-sync-res` `{id, ok, store, overCap}` | the 200 body, or `ok: false` on any error |

The host adds `project` and `versionId` — it knows them from its own route, so
they are not stamped into the document. Nothing is sent until the host answers
the hello, so a brief framed by a page that does not implement this is a brief
that behaves exactly as an unpublished one.

Each save is a probe and then a write. The probe re-sends the last store
unchanged, which the server's tie rule resolves to what it already holds: a read
that commits nothing. Failing a write is safe — `base` is left alone and the next
round re-applies the same intent.

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
