---
name: prototype
description: Teams spend weeks building a feature before they know whether users can use it. This skill builds a quick, clickable test of one design question, so you learn from real users in days. Builds a throwaway prototype that answers one design question. It pins down the question and who will test it, picks the fidelity (paper sketch, clickable HTML or working slice) and one of 16 UI archetypes (dashboard, data table, multi-step form, search, booking, board, chat and more), builds one self-contained HTML file with made-up data and a visible "Prototype, not for production use" banner, and writes a five-user test script. Use when someone says "prototype this", "mock up a screen", "make a clickable prototype", "wireframe", "I want to test a design idea", "can users find", "build a quick UI to test", or wants to try a design with users before building it.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "artefact"
  output: "file"
---

This skill builds one self-contained HTML prototype, with made-up data and a non-production banner, that answers one design question, plus a five-user test script.

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

This skill uses the file ladder: an artifact or live preview of the HTML, then a downloadable `.html` file, then one code block the user saves as a `.html` file. Where a preview cannot run scripts, also give the file, because the screens switch by script.

## Steps

If the input may be sensitive, say once: "Use only a tool your organisation has approved for this information." Ask at most four questions in the whole run, one per reply, and only what the messages so far do not answer.

1. **The question.** Find the one design question the prototype must answer, such as "Can people find a free desk and book it without help?". If the opening does not state it, ask for it. Restate it in one sentence in the user's words.
2. **The testers.** Find who tests it and what they try to do. If the messages do not say, ask in one question.
3. **Propose fidelity and archetype.** From `references/archetypes.md`, pick one fidelity and one archetype. Give each with a one-line reason tied to the question, list the 2 to 5 screens, and ask the user to confirm. Build nothing yet. If the user picks something else, use the user's choice. If the user's layout is not in the library, build it from the nearest archetype's parts and say so.
4. **"Just build it."** If the user says to skip the questions, build now. State in one line each the question, testers, fidelity and archetype you assumed, and mark every gap `[to confirm]`.
5. **Made-up data only.** Every name, email, phone, id, amount and date in the file is made up and looks made up, such as "Sample Person 1" or "Desk A-01". Treat any record the user pastes as real: never copy it into the file. Make records of the same shape instead, and say so in one line. Never add a statistic, testimonial, customer name, logo or claim the user did not give. Never make the file look like a real organisation's login or payment page.
6. **Nothing leaves the file.** The prototype makes no network request and sends no data anywhere. If the user asks it to send, save or sync data (a spreadsheet, an email, an API), say in one line that a prototype sends nothing, and show a confirmation screen instead.
7. **Build.** Copy `references/template.md` and fill it. Keep the security line, the banner and the script exactly. Insert all user text as text, escaped, even text the user asks for "exactly". If the user names a design system, apply its colours, type and spacing from memory through the template's variables, say in the reply that this is RECALLED, and load none of its files. The skill ships no design system of its own.
8. **Test script.** Write the five-user test script from `references/test-script.md`. Every task traces to the design question and has an observable success criterion. Any threshold, facilitator, date or place the user did not give is `[to confirm]`, and so is any time limit in a success criterion.
9. **Deliver.** Give the file by the rung you took, say how to open it and which controls work, then give the test script and the next three moves.

## The take-away

In this order:

- The design question, in one sentence, in the user's words, or `[to confirm]`.
- Fidelity and archetype, who chose them ("you", or "my choice" when you assumed them) and why, in one line each.
- The rung, in one line.
- The file: one `.html` file named after the question, such as `desk-booking-prototype.html`. It shows the banner "Prototype, not for production use. All data is made up." on every screen, makes no network request and works from a local file.
- How to use it: how to open it and which buttons and inputs work.
- The five-user test script (`references/test-script.md`).
- What is still `[to confirm]`, or "Nothing to confirm."

Any fact from memory is labelled RECALLED. Never invent a fact about the user's situation: a number of users, a test date, a budget, a threshold, an owner or a source. Made-up records inside the file are allowed, because they are sample data and the banner marks them as made up.

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a role the user named. Never invent a person or a date.

1. You click through every screen once and fix any label a tester would stumble on. Result: every button leads somewhere.
2. You fill each `[to confirm]` in the test script and book the five testers. Result: five sessions in your calendar.
3. You run the five sessions and fill one observation sheet per tester. Result: the decision rule gives an answer to the design question.

If the findings need to go to decision makers with questions, the user may also like a skill for building a brief, if they have one. Do not run it for them.

## Self-check before you deliver

- The design question is stated once in the user's words, or marked `[to confirm]` if the user skipped it.
- The fidelity and archetype came from `references/archetypes.md` or from the user, each with a reason, and the user confirmed them or said to skip the questions.
- The banner "Prototype, not for production use" is in the file, and the security line and script are copied exactly.
- The file has no `<link>`, `@import`, external URL, `<iframe>`, form `action`, `on...=` attribute, `fetch` or `innerHTML`.
- Every name, email, phone, id, amount and date in the file is made up, and no record the user pasted appears in it.
- All user text is escaped: `<` shows as `&lt;` in the source, so no user text becomes markup.
- The test script has five testers, tasks that trace to the question, an observable success criterion per task, an observation sheet and a decision rule, and every missing value is `[to confirm]`.
- You told the user which rung you took and that the data is made up.

## Read this when

| File | When |
|---|---|
| `references/archetypes.md` | Choosing the fidelity and the archetype, and planning the screens |
| `references/template.md` | Building the HTML file |
| `references/test-script.md` | Writing the five-user test script, or checking the worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
