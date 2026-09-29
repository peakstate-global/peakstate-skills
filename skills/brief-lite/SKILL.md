---
name: brief-lite
description: Builds one self-contained HTML brief that readers answer in their browser. It opens with the answer, sets out the sections in pyramid order, asks numbered questions with answer boxes, lets readers comment on selected text, footnotes its sources, and exports the responses with Copy responses or Download responses. Use when someone says "make a brief", "build a brief", "I need decisions from my team", "put these questions to my manager", "get sign-off on this", "a document people can answer", or needs readers to answer questions about a proposal, plan or decision.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "artefact"
  output: "file"
---

This skill builds one self-contained HTML brief with the answer first, numbered questions with answer boxes, simple comments, footnoted references and exportable responses.

## Adapt to your host

Hosts differ, and the same host differs by plan and by organisation. Before you
make the output, check what you can do here.

1. List the tools you can call right now, such as code execution, file creation,
   image generation or a live preview (an artifact or a canvas).
2. Take the first rung of the ladder below that your tools support. Trust your
   own tool list over any host name or table.
3. Tell the user in one line which rung you took and why. For example: "There is
   no file tool here, so the SVG is in a code block for you to save."
4. If the user names a format, use that format instead of the ladder.

### Ladder

This skill uses the file ladder: an artifact or live preview of the HTML, then a downloadable `.html` file, then one code block the user saves as a `.html` file. Where a preview cannot run scripts, also give the file, because the answer boxes need the script.

## Steps

If the input may be sensitive, say once: "Use only a tool your organisation has approved for this information."

1. **Intake.** Ask at most four questions, one at a time, and only the ones the opening message does not already answer: what you need from the readers (a decision, sign-off or input), who reads it, the facts and sources to include, and the questions you want answered. If the user says "just build it", build now with what you have. Show every missing fact as "[to confirm]". Never invent an owner, a date, an amount or a source.
2. **Write the answer first.** Write one sentence that says what you recommend or what the readers must decide. Then write the sections in pyramid order: each heading states its point, and the text under it supports that point (S1, see `references/writing.md`).
3. **Write the questions.** Number them Q1, Q2 and so on, and give each a stable id such as `q-default-roster` that no rebuild changes. Each leads with the plain ask, then one line: "My assumption: ... If wrong: ...". Ask only what the reader can answer.
4. **Footnote the facts.** Every fact from a source gets a numbered footnote that links to a numbered entry in References. Only list sources the user gave you or that you opened in this session. Label a fact from memory "[RECALLED]", with no footnote.
5. **Build the file.** Copy the block in `references/template.md`, fill the placeholders, and repeat the section, question and reference blocks as needed. Insert user text as text: escape `&`, `<`, `>` and `"`. Copy the style and script byte for byte. Name the file after the brief id, such as `rostering-options-2026-09-29.html`.
6. **Deliver.** Give the file by the rung you took. Tell the user how to open it, that answers and comments save in that browser, and how responses come back: Copy responses, or Download responses when copy fails or the storage banner shows.

## The take-away

One `.html` file with, in order: the title, the one-sentence answer, the sections in pyramid order, the numbered questions with answer boxes, and the References. It has a Comments panel, a progress count, and Copy responses and Download responses buttons. It makes no external requests and works from a local file. The template is in `references/template.md`. When responses come back, read them with the field table in `references/writing.md`.

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a role the user named. Never invent a person, a date or a source.

1. You open the file and check every "[to confirm]" and "[RECALLED]" item before it goes out.
2. You send the file to the readers with the date you need their answers by.
3. You paste the responses back here, and the brief is revised with the same brief id.

If the brief needs a deeper check of its claims, the user may also like a skill for grounding claims, if they have one. Do not run it for them.

## Self-check before you deliver

- The file opens with the title and the one-sentence answer, and every section heading states a point.
- Every question is numbered, has its own answer box, and states an assumption first.
- No owner, date, amount, source, quote or URL was invented; gaps show as "[to confirm]" and memory facts as "[RECALLED]".
- Every footnote links to a References entry, and every entry links back.
- The script and style are copied byte for byte, and user text is escaped.
- The file has no `<link>`, remote font, external image or `on...=` attribute.
- The body carries a `data-brief-id`. A rebuilt brief keeps that id, every question and section id, and the file path.
- You told the user which ladder rung you took and how responses come back.

## Read this when

| File | When |
|---|---|
| `references/template.md` | Building the HTML file |
| `references/writing.md` | Writing the answer, sections, questions and references, or reading responses that come back |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
