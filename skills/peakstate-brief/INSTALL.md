# Installing peakstate-brief

The skill is one `SKILL.md` plus the files in `assets/`. **A delivered brief is a single
self-contained HTML file** — the renderer inlines `brief.css` and `brief.js` into the page it
writes, so nothing sits beside it and nothing is fetched when it opens. Where you install the
skill decides only how the runtime gets into that file.

Three ways, in order of what the host can do:

| Host | How the runtime gets in |
| --- | --- |
| Anything with Node (Claude Code, Cursor, Gemini CLI, Copilot in VS Code) | `build-brief.mjs` inlines it |
| Anything with a shell but no Node (claude.ai, Claude Cowork, Copilot Cowork) | author from the template, then `inline-brief.py` inlines it |
| A chat tool with no shell at all (ChatGPT, Copilot chat) | it is not inlined; the file loads a pinned CDN copy on first open |

## 1. An agent with a filesystem and Node

Put this folder anywhere the tool discovers skills — a user-level skills directory, a project's
`.claude/skills/`, or a plugin. Nothing inside the skill assumes a location: it resolves its own
files from `<skill-dir>/assets/`, wherever the `SKILL.md` was loaded from.

    node <skill-dir>/assets/build-brief.mjs my-brief.md      # -> my-brief.html

The output is one file of roughly 190KB that works offline, from Drive, from an email
attachment, and on a plane. Do **not** copy `brief.css` or `brief.js` next to it: they are
already in it, and a stray pair beside a brief is confusing rather than helpful.

## 2. A host with a shell but no Node — use the portable cut

claude.ai, Claude Cowork and Copilot Cowork all run bundled scripts, so the runtime never has to
be typed out. Build the drop-in folder:

    python3 <skill-dir>/assets/make-portable.py <dest>          # a folder
    python3 <skill-dir>/assets/make-portable.py <dest> --zip    # + a zip for claude.ai

Five files, about 175KB: a short `SKILL.md`, `brief-template.html`, the runtime pair, and
`inline-brief.py`. There the model authors the HTML from the template and runs
`python3 inline-brief.py <file>`, which swaps the two loader tags for the files themselves and
asserts the document body is unchanged before it writes.

- **claude.ai** — upload the zip at Settings › Capabilities. Custom skills are per user; there is
  no org-wide distribution. Code execution must be on.
- **Claude Cowork** — install the folder as a skill; it has a shell in a Linux VM.
- **Microsoft 365 Copilot Cowork** — drop the folder at `Documents/Cowork/skills/peakstate-brief/`
  in OneDrive. It is discovered at the start of your next session and shows as a chip in the side
  panel; there is no install step and no terminal. The limits are **50 custom skills, 1 MB per
  `SKILL.md`, 20 companion files, and 10 MB per skill** — the cut uses four companion files, and
  `make-portable.py --self-check` asserts it stays inside both caps.

## 3. A chat tool with no shell — the CDN fallback

Attach `SKILL.md` and `assets/brief-template.html`, then ask for a brief. Nothing can inline the
runtime, so the file keeps the template's loader: it looks for `brief.css` / `brief.js` beside
itself, and falls back to a version-pinned CDN copy when they are not there.

**Say so when you deliver it.** A brief built this way needs the network the first time the
reader opens it, which is the one property this route loses. Answers still live in that browser's
own localStorage and the brief's content is never sent anywhere; only the two static assets are
fetched.

## The CDN pin

The template pins a **commit SHA**, never `@main`, and carries a Subresource Integrity hash for
each file:

    https://cdn.jsdelivr.net/gh/peakstate-global/peakstate-skills@<sha>/skills/peakstate-brief/assets/brief.js

A pinned SHA means a brief generated today still renders the same way after the runtime changes.
It also means the fallback is frozen at that commit: a template-authored brief runs the runtime
as it was when the pin was set, not as it is now. That is the trade, and it is why routes 1 and 2
are preferred wherever the host can manage them.

**Bumping the pin** — do it when the runtime gains something worth publishing, and never move an
existing pin, because briefs already in someone's hands point at it:

    openssl dgst -sha384 -binary brief.css | openssl base64 -A
    openssl dgst -sha384 -binary brief.js  | openssl base64 -A

Then verify what the CDN actually serves rather than trusting the paste — a mistyped hash and a
genuinely wrong file look identical to the browser, and a stale hash is a hard failure rather
than a warning:

    curl -s https://cdn.jsdelivr.net/gh/peakstate-global/peakstate-skills@<sha>/skills/peakstate-brief/assets/brief.js \
      | openssl dgst -sha384 -binary | openssl base64 -A

Both values must appear verbatim in `brief-template.html`, alongside the same `<sha>`. To check
the pin currently in the template against the repo, hash the pinned commit's own copies:

    git show <sha>:skills/peakstate-brief/assets/brief.js | openssl dgst -sha384 -binary | openssl base64 -A
