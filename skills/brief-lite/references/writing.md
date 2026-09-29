# Writing the brief

## Pyramid order (S1)

- The one-sentence answer comes first: what you recommend, or what you need the readers to
  decide. A reader who stops after one line still knows the point.
- Each section heading states its point as a sentence, such as "The four-day roster cut
  overtime", not a topic label such as "Overtime".
- Under each heading, give the support for that point and nothing else. Put the sections in
  the order a reader needs them to answer the questions.
- Situation, complication, question, answer is a good order for the opening paragraph when
  the reader needs context first.

## Plain English (S6)

- One idea per sentence. Short sentences, active voice, present tense.
- Use the reader's words. Define a term the first time you use it.
- Australian spelling.

## Questions

- Number them Q1, Q2 and so on, in the order the reader should answer them. Two to eight
  questions is a good range. Put the question that blocks the most first.
- The Q number is only a label. Each question also has an id, `q-` plus a short slug such as
  `q-default-roster`, and saved answers are stored against it. Keep the id on every rebuild,
  even when the question moves. Never renumber ids.
- Lead with the plain ask. Then one line that starts "My assumption:" and ends with "If
  wrong:" and what would change. The reader can answer "yes" to the assumption quickly.
- Ask only what the reader can answer. Never ask a reader to look up a fact you could find.
- Never assign an owner, a date or an amount the user did not give. Ask for it as a
  question, or show it as "[to confirm]".

## Facts, footnotes and references (S7)

- Every fact from a source gets a numbered footnote. The footnote links to a numbered entry
  in the References section, and the entry links back.
- Write each reference in APA 7 when you have author, date, title and where it came from.
  When a field is not known, write a descriptive entry and state which field is missing.
- Only list sources the user gave you or that you opened in this session. Never invent a
  source, a quote, a page, a URL or a date.
- A fact you state from memory is labelled `[RECALLED]` in the text, has no footnote, and is
  not in References. Suggest in your reply that the user checks it before the brief goes out.

## Comments

Readers select text and type a note. Comments are single notes: no threads, replies or
follow-ups. The script shows comment text with `textContent`, never as markup (S4).

## When responses come back

The reader clicks Copy responses and pastes the JSON to you, or sends the downloaded
`<brief-id>-responses-<date>.json` file. The shape (S5):

| Field | What it holds |
|---|---|
| `brief` | The brief id from `data-brief-id` |
| `title`, `exported` | The page title and the export time |
| `answers[]` | `id` (such as `q-default-roster`), `question` (its heading text), `resolved` (true when answered), `ticked` (always false here), `answer` |
| `comments[]` | `selected_text`, `near_question` (the `q` or `s` id it sits in, or null), `comment`, `highlight` (always `"yellow"`), `anchored` (true when the text is still marked on the page) |
| `notes`, `edits`, `drafts` | Always empty arrays, kept so tools that read the fuller brief format read this one too |

Read the answers by id, act on each comment where it sits, and say what changed. Rebuild
with the same brief id, the same question ids and the same file path, and overwrite the old
file. Some browsers keep a local file's saved answers against its exact path, so a rebuild
saved under a new name opens empty. The responses you already have are the record: if the
reader needs to see an earlier answer again, quote it in the rebuilt brief.
