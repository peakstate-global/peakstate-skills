## Editable documents — when the reader rewrites, not just comments

**A brief carrying a draft the reader is meant to CHANGE uses a `[data-doc]` block, not a question
with a textarea.** Comments are right for "this line is wrong"; an editable document is right for an
article, a policy, a spec or a page of copy where the reader wants to fix the wording in place and
hand it back. Asking someone to describe an edit in a comment box is asking them to write the diff
by hand.

    <div data-doc="article-body" data-doc-label="Article (a) body">
      <script type="text/markdown">
# The heading

The body, in markdown, exactly as it should ship.
      </script>
    </div>

- **The source of truth is the `<script type="text/markdown">`**, which the browser never renders,
  so the original always survives and Revert always works. Do not write the rendered HTML yourself;
  the runtime renders it.
- **The runtime injects the whole editor** — the toolbar, the Raw MD toggle, Done, Revert, the
  "edited" flag and the heading rail. Author only the markdown.
- **Click the text to edit it. There is no Edit button.** Clicking a sentence in the rendered
  document starts editing with the caret at the character you clicked, the way nav's project
  Description box works. Escape or Done ends editing; ⌘Enter / ⌘S also finish.
- **The toolbar is sticky and context-aware**, mirroring nav's: H1 H2 H3, bold, italic,
  strikethrough, inline code, code block, bulleted and numbered lists, blockquote, body text,
  horizontal rule, link and unlink, table controls, copy-as-markdown. A button lights up when the
  caret is inside what it applies — H1 is highlighted inside a heading, B inside bold.
- **Tables are supported both ways.** The table button opens a sub-toolbar (insert 3×3, add or
  delete a row or column) which also opens itself whenever the caret lands in a table. GFM pipe
  tables render, and serialise back to pipe tables.
- **Raw MD is one click away**, and swaps back with "Rich editor". Both modes edit the same
  markdown string, so the switch is a conversion, never a merge.
- **The heading rail is nav's MiniTocSidebar**: thin bars down the document's right edge, one per
  heading, width by level (H1 widest); the bar for the heading you are reading is highlighted as
  you scroll; hovering the rail opens a flyout of the titles, and clicking either scrolls there.
  Hidden under 900px and in print.
- **Markdown stays the stored form.** Every keystroke serialises the DOM back to markdown, so the
  responses JSON and Revert compare markdown to markdown. Edits persist to localStorage on every
  keystroke.
- **Edits ride in the responses JSON** under `edits: [{id, label, original, edited}]`, both sides,
  so the author diffs rather than re-reads. An untouched document is omitted entirely.
- **One `data-doc` per document, with a stable id** — it is the localStorage key, so keep it
  identical across regenerations or saved edits are orphaned.
- The renderer and the serialiser cover headings, emphasis, links, inline and fenced code, lists,
  blockquotes, rules and GFM pipe tables. Anything outside that set is normalised to its nearest
  markdown equivalent rather than passed through as HTML.
- **Why it is not TipTap:** a brief is one self-contained file opened from disk, so there is no
  bundler and no network. nav does this job with TipTap v3 + tiptap-markdown; here the same
  behaviour is rebuilt on `contenteditable` + `execCommand`, ported from
  `src/components/ui/{MarkdownEditor,RichTextEditor,MiniTocSidebar}.tsx`. Read those files before
  changing the editor — the click-to-caret offset walk, the 112px active-heading fold and the
  180ms flyout delay are all lifted from them deliberately.

**Selection comments still work inside an editable document**, so a reader can mark up in reading
view and rewrite in edit view, and both come back in the same payload.
