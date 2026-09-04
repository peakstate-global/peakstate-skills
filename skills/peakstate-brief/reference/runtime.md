## What the template runtime already provides (do not reimplement)

- Tick-off per question AND per non-question section → **animates** it closed over
  .22s (header stays, toggle back anytime); progress counter in the sticky top bar.
  **Clicking the heading toggles it too** — the whole head is a target, with
  `cursor: pointer` to say so, and a drag-selection inside a heading leaves the tick
  alone and opens the comment popover instead.
- **The tick box is hidden until the head is hovered or focused, and stays visible
  once checked** — at which point the heading holds its offset, so the box never
  lands on the first word. The hover region extends past the box on the left, or the
  pointer crosses in and out of it and the box flickers.
- **A dirty marker on the copy+download combo** whenever the document holds something
  not yet copied back: a typed answer, a comment, a highlight, an unsaved draft or an
  edited document. Clean is stored as a **signature of the state**, not a flag, so a
  reload cannot show clean over changed content.
  - **It marks the pair, not one half of it.** Both buttons send the work back, so a
    dot on only one says the other does not. One element carries it: the buttons' own
    borders turn red, a red dot sits off the combo's top right corner, and a red glow
    surrounds the pair. **No ring is drawn around the group** — a hard ring outside the
    border is a second edge, and two edges on one control read as two controls.
  - **Copy, download or ⌘C turns the dot green with a white tick and the borders
    green. The glow stays red.** Two signals answer two different questions: green says
    "I copied it", red says "Claude has not read it yet". The tooltip changes with the
    state. The green tick is recorded against the signature it copied, so one more
    keystroke returns the control to red.
  - **Only a regenerated brief clears it. The reader never can.** Copying is not
    evidence the work arrived: a clipboard can be lost, a paste forgotten, a tab
    closed. So the FILE declares what has been taken — `consumed:` in the front matter
    changes when the brief is regenerated after the responses were read — and seeing a
    new token is what marks the state clean. Copying and downloading leave the marker
    exactly where it was.
    **Set `consumed:` to a fresh value every time you regenerate a brief in response to
    a reader's answers.** Forgetting it leaves the marker up on work you have already
    acted on, which trains the reader to ignore it.
  - **Its tooltip is a sentence saying what to do and why the marker is there**, not a
    label. It is measured against the pair's box, so it opens below them with its right
    edge on theirs and grows down and to the left: it can never clip the top of the
    viewport or cross the right edge. Hovering either button shows it, and both
    buttons' own tooltips stand down while it is up, so only one is ever on screen.
- Answer `<textarea class="answer">` under each question — **auto-injected by the
  runtime** into every `section.q` that doesn't already have one, so you never have
  to add it (add one manually only to control its exact placement). Persisted to
  localStorage as the user types.
- **Copy icon on every code block** → the runtime injects a top-right copy
  button into every `<pre>` (copies its `<code>`/text content, ✓ + toast on
  success). Just write plain `<pre><code>…</code></pre>` — never hand-roll a
  copy button.
- **Copy summary as markdown** → the copy icon on the summary page puts the verdict
  on the clipboard as markdown, and **appends a short References list of only the
  sources that part cites**, numbered as they are numbered on the page. The collapsed
  evidence block is dropped from the paste rather than flattened into it.
- **Copy + download combo button** → JSON of `{id, question, resolved, answer}`
  pairs plus all selection comments, all drafts and all note fields. The download
  half writes `<brief-id>-responses-<YYYY-MM-DD>.json`, for a brief read offline or
  answers worth keeping as a file. Both are icon-only with hover tooltips.
- **Comments drawer** (speech-bubble icon, or press `C`) → every comment and every
  unsaved draft in one scrollable list, with Show / Edit / Delete per row and
  Resume / Discard per draft. A comment whose highlight could not be restored is
  listed with a **not highlighted** badge rather than disappearing — the drawer is
  what makes a lost highlight cosmetic instead of a lost thought.
- **Draft rescue** — text typed into a comment popup is persisted on every
  keystroke. Clicking away, pressing Escape, or reloading keeps it as a draft in the
  drawer and in the exported JSON under `drafts`. Only the explicit **Discard**
  button throws it away.
- **Keyboard in the comment popup** — `Cmd/Ctrl+Enter` saves, `Escape` closes and
  keeps the draft.
- **Tooltips carry their shortcut.** Every top-bar control renders a CSS tooltip
  from `data-tip` naming what it does and its key (`Copy responses JSON · ⌘C`).
  **Never use the `title` attribute** — it is slow, unstyleable and hides the
  shortcut. The smoke suite asserts a rendered brief contains zero of them, which is
  how three survivors were found: the progress link, a resolved comment mark, and
  fifty footnote markers. A footnote took `aria-label` rather than a tooltip, because
  a superscript link into the references needs no hover hint.
- **Comment anchoring survives element boundaries.** Selections flatten to a
  whitespace-normalised string with an index map back into the text nodes, so a quote
  crossing a `<strong>` or spanning two paragraphs anchors as one comment and
  re-anchors on reload. The occurrence index is stored, so a repeated phrase
  re-anchors onto the copy that was actually selected.
- **Per-item note fields** — put `<textarea data-note="unique-key"
  data-note-label="human label">` anywhere (under an audio sample, a mockup, a
  table row) and the runtime persists it to localStorage and exports it under
  `notes: [{id, label, note}]`. Use these when the reader needs to jot against
  many items without one question per item. **Cmd/Ctrl-C with nothing selected (and focus
  outside a field) copies the same JSON.**
- Select any text → popover with **five highlighter colour chips, then a sixth
  chip that clears** — and a comment
  textarea; saved comments render as `<mark>` highlights, click to edit/delete;
  re-anchored on reload by whitespace-insensitive text match; unanchorable ones
  still survive in the JSON (`{selected_text, near_question, comment, highlight}`).
- **Highlights can be baked into the file, so they stop belonging to one browser.**
  A reader's marks live in localStorage, which does not follow them to another machine
  and does not survive the file being sent to somebody else. Once you have read them
  back, write them into the front matter as `highlights:` — a JSON array of
  `{text, hl, nth, comment, near}` — and the regenerated brief arrives already
  painted. **The file is the record**: deleting a baked highlight in the browser holds
  until the next regeneration, exactly as an addressed comment behaves. A baked
  highlight the reader already has is not duplicated; matching is on the text plus its
  occurrence index.
- **A sixth control ends the row: a circle with an X, which removes the highlight.**
  On a mark with no words it deletes the record; on a commented mark it keeps the
  comment and drops the colour. On a fresh selection it just closes.
- **A colour with no comment is a complete action.** Clicking a chip on a fresh
  selection with an empty box highlights and closes in one gesture, because
  flagging a passage is a different job from replying to it — that is why the
  chips are named by colour and carry no meaning. Type words first and a chip
  only sets the colour, leaving the box open. Clicking a chip on an existing
  highlight recolours it immediately.
- **The sixth chip takes the highlight off.** It is a circle with an × at the end
  of the row, same size and hit area as a colour, keyboard reachable, and it does
  the obvious thing at each of the three points it can be pressed: on a fresh
  selection it just closes; on an existing mark with no words it unpaints and
  deletes the record; on an existing mark that HAS a comment it unpaints and keeps
  the comment, which then travels in the JSON with `highlight: null` and is not
  re-painted on reload. Picking a colour again puts the highlight back.
- **The copy button carries a red dot whenever the document holds unsent work** —
  a typed answer, a note, a saved comment, a highlight, an unsaved draft, or an
  edited document block. Copying or downloading the responses clears it; the next
  change brings it back. Clean is stored as a signature of the state, not a flag,
  so a reload can never claim clean while the reader keeps typing. The dot's
  tooltip is a sentence saying what to do and why, opening below the button and
  growing down and to the left.
- **A section head ticks itself when clicked.** The whole heading row is the
  target and shows `cursor: pointer`; a drag that leaves a selection is a comment,
  not a tick, and is left alone.
- **The chips are not `hl-focus` / `hl-warn` / `hl-info`.** Those are table roles
  with a legend contract; reusing them here would make a legend ambiguous. The
  highlighter has its own `--hp-*` tokens, per theme, with the text colour
  inherited so no hue needs its own foreground.
- **Selecting text still copies normally.** The popover deliberately does not
  focus its textarea on a fresh selection (focusing collapses the selection and
  would break Cmd-C), so the user can copy the selection, use the popover's
  "Copy text" button, or click into the box to comment. Never add an autofocus
  or a `removeAllRanges()` to that path. Escape closes the popover.
- Table cells wrap and never truncate (see the question-writing rules above).
- Top-bar icon toggles: theme switcher (system → light → dark, default system)
  and fixed-width vs full-width; both persisted browser-wide (`briefUI` key).
- Progress reads "n/N questions resolved" and **is itself a jump-link to the next
  unresolved question** (advances as each is resolved; becomes plain text once all
  are) — so a long brief never has to be scrolled to find what's outstanding.
  **Resolved = an answer has been typed OR the question has been ticked** — typing
  an answer *is* resolving it, and the counter updates live as you type. The tick
  remains meaningful on its own: it's how a question is resolved by accepting the
  stated assumption without typing anything. Light + dark theme, print-safe,
  `cursor: pointer` affordances, no external network assets.
