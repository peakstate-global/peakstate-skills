## A brief is one file — the runtime is inlined

**`build-brief.mjs` inlines `brief.css` and `brief.js` into the page it writes.**
A delivered brief is a single self-contained HTML file of roughly 240KB that
fetches nothing, works offline, works from Google Drive, works emailed on its
own, and never tells a third party it was opened. There is nothing to copy beside
it and nothing to keep in sync.

**This replaced a three-rung loader — local files, then CDN copies verified by
Subresource Integrity, then a notice — and it is worth knowing why, because the
old design looks more careful.** Every rung had a failure the reader could
neither diagnose nor fix: assets left behind when the file moved out of its
folder; a moved tag orphaning the integrity hashes of every brief already sent,
so the browser fetched the bytes and then refused them; a commit not yet pushed;
a firewall; a plane. All of that machinery existed to deliver ~100KB that fits
inside the document. **A brief that has to phone home is not a document.** It
gets mailed, dropped in Drive and opened offline like one, so it has to behave
like one.

The cost is real and small: a brief freezes its runtime at build time. That was
already true — an old brief kept whatever `brief.js` sat beside it — and the fix
is unchanged, rebuild it from the markdown.

- **Do not copy `brief.css` / `brief.js` next to a brief.** They are already in
  it. A stray pair beside a brief is confusing, not helpful.
- **`render(src, { link: true })`** restores the linked form. One use only:
  hand-authoring inside a chat tool that has no filesystem to inline from.

**Retrofitting a brief that already exists** — most briefs worth fixing predate
inlining and no longer have their markdown, so re-rendering is not an option:

    python3 <skill-dir>/assets/inline-brief.py <brief.html> [more.html ...]
    python3 <skill-dir>/assets/inline-brief.py --check <brief.html>

It swaps only the two tags that load the runtime and **asserts the document body
is unchanged before it writes**, so it cannot alter what a delivered brief says.
Idempotent: a second run reports `already ok`. Saved answers live in
localStorage under the brief id, which it does not touch.

### The portable cut — hosts with no developer machine

**claude.ai, Claude Cowork and Copilot Cowork all run bundled scripts, so none of
them needs the model to type the runtime out.** Build the drop-in folder and install
that:

    python3 <skill-dir>/assets/make-portable.py <dest>          # a folder
    python3 <skill-dir>/assets/make-portable.py <dest> --zip    # + a zip for claude.ai

Five files, ~175KB: the short `portable/SKILL.md`, `brief-template.html`, the runtime
pair, and `inline-brief.py`. There the model authors the HTML from the template and
runs `python3 inline-brief.py <file>` — so a brief built on a chat host is still one
self-contained file, and the inlining costs no output tokens at all. Emitting 153KB
of CSS and JS by hand would be roughly 42,000 tokens of exact transcription, which is
why the script does it.

Where to put it: `Documents/Cowork/skills/peakstate-brief/` in OneDrive for Copilot
Cowork, which discovers it at the start of the next session; Settings › Capabilities
for claude.ai, which takes the zip. Copilot Cowork allows one `SKILL.md` plus twenty
companion files at 10MB — the cut uses four, and `make-portable.py --self-check`
asserts it stays inside both limits.

**A host with no shell at all** still works: author from the template and deliver it
as-is, but **say in the delivery message that it loads its runtime from a CDN**, so
the reader needs the network the first time they open it. That is the one property
the cut can lose.
