---
name: prototype
description: Builds a throwaway prototype that answers one design question. It pins down the question and who will test it, picks the fidelity (paper sketch, clickable HTML or working slice) and one of 16 UI archetypes (dashboard, data table, multi-step form, search, booking, board, chat and more), builds one self-contained HTML file with made-up data and a visible "Prototype, not for production use" banner, and writes a five-user test script. Use when someone says "prototype this", "mock up a screen", "make a clickable prototype", "wireframe", "I want to test a design idea", "can users find", "build a quick UI to test", or wants to try a design with users before building it.
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

## Reference: archetypes.md

# Fidelity and UI archetypes

## Fidelity: pick the lowest that answers the question

A prototype answers one question about the product: the role it plays in a person's life,
how it looks and feels, or how it could be built (S2). Pick the fidelity from the question,
not from how finished you want it to look. Low fidelity invites comments on the idea; high
fidelity invites comments on the details (S3).

| Fidelity | Body class | What it is | Pick it when the question is about |
|---|---|---|---|
| Paper sketch | `fi-sketch` | Greyscale, dashed boxes, a handwritten-style font, few screens. The look of a paper sketch, in the browser (S27) | Role: does the idea make sense, is the order of steps right, what is missing |
| Clickable HTML | `fi-click` | Styled screens linked by buttons. Nothing is computed; each click shows the next screen | Look and feel: can people find the path, do the labels make sense, where do they hesitate |
| Working slice | `fi-slice` | Clickable HTML plus one computed behaviour: the list or table filters as you type. Any other change, such as a sort, a moved card or a summary of earlier answers, is its own screen with sample values | Behaviour: can people find what they need by searching or narrowing a list |

If the user asks for a fidelity, use it. If the question could fit two rows, take the lower one
and say why in one line.

## The archetypes

Each entry: when to use it, the screens to build, the parts on them, the made-up data it
needs, and what to watch for. Build 2 to 5 screens. Every archetype also needs its empty state
or error state if the question touches it (S12).

### 1. Dashboard

- **Use when:** people need to see the state of something at a glance and spot what needs action.
- **Screens:** overview; one drill-down.
- **Parts:** 3 to 6 summary cards, one simple chart drawn with inline SVG bars, a short "needs attention" list.
- **Data:** made-up counts and statuses, such as "Open: 12". Label the numbers as sample values.
- **Watch for:** too many cards. Charts people cannot read in a few seconds (S6).

### 2. Data table with filters

- **Use when:** people find, compare or act on rows in a long list.
- **Screens:** the table; the row detail.
- **Parts:** column headings, a text filter (`data-filter`), sort buttons shown as labels, a row action.
- **Data:** 8 to 15 made-up rows.
- **Watch for:** the four table tasks: find a record, compare, view or edit one row, act on many (S7).

### 3. Record detail

- **Use when:** people check or change the facts about one thing, such as a person, order or case.
- **Screens:** detail; edit.
- **Parts:** a summary list of label and value pairs with a "Change" link on each (S28), a history list.
- **Data:** one made-up record.
- **Watch for:** which facts people look for first.

### 4. Single form

- **Use when:** the task is short: up to about seven fields on one page.
- **Screens:** the form; confirmation.
- **Parts:** labels above fields, one primary button, inline error text for one field.
- **Data:** placeholder hints only, never a real value.
- **Watch for:** unclear labels, optional fields not marked, the error message (S9).

### 5. Multi-step form (wizard)

- **Use when:** a long task has steps that depend on earlier answers.
- **Screens:** one screen per step (one question per page works well), a check-your-answers screen, confirmation (S8, S10, S11).
- **Parts:** step count ("Step 2 of 4"), Back and Continue, a summary with "Change" links.
- **Data:** placeholder hints only.
- **Watch for:** people losing their place, or not knowing how many steps are left.

### 6. Search and results

- **Use when:** people look for something by typing, then narrow the results.
- **Screens:** search; results; one result's detail.
- **Parts:** search box, result count, filters beside the results (S20), a "no results" message.
- **Data:** 8 to 15 made-up results.
- **Watch for:** the words people type, and whether they notice the filters.

### 7. Settings and preferences

- **Use when:** people change how something behaves for them.
- **Screens:** settings list; one group opened.
- **Parts:** grouped options, advanced options behind a "More settings" control (S18), a saved message.
- **Data:** made-up current values.
- **Watch for:** whether people can find a setting and know it saved.

### 8. Onboarding

- **Use when:** new people must understand the product or set it up on first use.
- **Screens:** 2 to 4 welcome or set-up screens; the first real screen.
- **Parts:** a short promise line, a skip control, one set-up choice per screen (S14).
- **Data:** a made-up first name, such as "Sample Person".
- **Watch for:** skipping, and what people remember after it.

### 9. Landing page

- **Use when:** the question is whether people understand an offer and know what to do next.
- **Screens:** the page; the page the main button leads to.
- **Parts:** a headline that says what it is, three short benefit blocks, one main call to action, a plain footer (S17).
- **Data:** the user's own words. No made-up testimonial, statistic or customer logo.
- **Watch for:** what people say the offer is after five seconds.

### 10. Checkout or payment

- **Use when:** people review a choice and commit to it.
- **Screens:** basket or summary; details; review; confirmation.
- **Parts:** order summary, total, delivery or contact fields, a clear final button (S19).
- **Data:** made-up items and prices, marked as samples. Card fields show "Sample card, do not enter a real number" and accept nothing real.
- **Watch for:** surprise costs, and doubt at the final button.

### 11. Inbox and messages

- **Use when:** people triage incoming items and reply.
- **Screens:** the list; one open message; reply.
- **Parts:** unread markers, sender, subject, date, a reading pane or a separate page (S24).
- **Data:** 6 to 10 made-up messages from "Sample Person 1" and so on.
- **Watch for:** how people decide what to open first.

### 12. Board (kanban)

- **Use when:** work moves through stages and people need to see and change its stage.
- **Screens:** the board; one card's detail.
- **Parts:** 3 to 5 columns, cards with a title and owner, a "Move to" control on each card (S23).
- **Data:** made-up cards and owners, such as "Sample Person 2".
- **Watch for:** whether people read the columns as stages.

### 13. Calendar and booking

- **Use when:** people pick a time, a place or a resource.
- **Screens:** choose; confirm; done.
- **Parts:** a date picker or a week grid (S21), free and taken slots, a booking summary.
- **Data:** made-up slots and resources, such as "Room 1" or "Desk A-01".
- **Watch for:** telling free from taken, and time zones if they matter.

### 14. Feed or activity stream

- **Use when:** people keep up with a stream of updates.
- **Screens:** the feed; one item.
- **Parts:** item cards newest first, "Load more" rather than endless scrolling (S15), a filter by type (S22).
- **Data:** 8 to 12 made-up updates.
- **Watch for:** whether people can find an item again.

### 15. Chat assistant

- **Use when:** people ask for help in their own words.
- **Screens:** empty chat with suggested prompts; a scripted answer.
- **Parts:** a message list, an input, 3 suggested prompts (S16), a clear note that answers are scripted.
- **Data:** a fixed, made-up conversation. The prototype never calls a model.
- **Watch for:** what people type first, and whether they trust the answer.

### 16. Comparison and pricing

- **Use when:** people choose between two to four options.
- **Screens:** the comparison; the chosen option.
- **Parts:** one column per option, the same rows in each, the differences marked (S13).
- **Data:** the user's options with their own values; missing values show `[to confirm]`.
- **Watch for:** which row decides the choice.

## Reference: template.md

# prototype template

Copy the block below into one `.html` file. Replace every `{{...}}` placeholder. Repeat the
screen block once per screen, and build each screen's content from the archetype in
`references/archetypes.md`. Copy the `<meta>` security line, the banner, the `<style>` rules
marked "keep" and the `<script>` byte for byte.

Rules for filling it in:

- **Insert user text as text** (S26). Escape `&` as `&amp;`, `<` as `&lt;`, `>` as `&gt;` and
  `"` as `&quot;` in anything the user gave you, including headings they ask for "exactly".
- **Synthetic data only.** Every name, email, phone, id, amount and date is made up and looks
  made up: "Sample Person 1", "person1@example.test", "Desk A-01", "Order 0001". Never paste a
  real record the user supplied; make a record of the same shape instead.
- **No external requests** (S25). No `<link>`, no `<img>` or font from a URL, no `@import`, no
  `<iframe>`, no form `action`, no `fetch`. The security line blocks them anyway; do not remove it.
  Images are inline SVG or plain boxes with a label such as "Photo".
- **No inline handlers.** No `onclick=` or other `on...=` attributes. Controls work through
  `data-` attributes, which the script reads.
- **Screens.** Each screen is a `<section class="screen" id="{{SCREEN_ID}}">`. The first screen
  in the file shows first. Any element with `data-go="{{SCREEN_ID}}"` shows that screen. A
  `<form data-next="{{SCREEN_ID}}">` shows that screen on submit and sends nothing. If no screen
  has that id, the page shows a red "Prototype error" line and stays where it is.
- **Working slice only:** an `<input data-filter="{{LIST_ID}}">` hides the children of the
  element with that id whose text does not contain what the user types. Put the id on a
  `<tbody>`, `<ul>` or `<ol>`, so each child is one row or item. This filter is the only
  computed behaviour. Show any other change of state, such as a sorted table, a moved card or
  a summary of earlier answers, as its own screen with sample values.
- **Fidelity** is the body class: `fi-sketch` (paper sketch), `fi-click` (clickable) or
  `fi-slice` (working slice).
- **Design system.** If the user names one, set the `:root` variables to its colours, type and
  spacing, and say in the reply that you applied them from memory, labelled RECALLED. Never load
  its files. If the user names none, keep the neutral values.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'; img-src data:; form-action 'none'; base-uri 'none'">
<title>{{TITLE}} (prototype)</title>
<style>
/* Change these for a named design system. */
:root { --font: system-ui, -apple-system, "Segoe UI", sans-serif; --text: #1d1d1f; --muted: #5f6368;
  --bg: #ffffff; --panel: #f4f5f7; --line: #d0d4da; --accent: #2b59c3; --accent-text: #ffffff; --radius: 6px; --gap: 16px; }
/* keep: banner, screens and fidelity */
#proto-banner { position: sticky; top: 0; z-index: 10; margin: 0; padding: 8px var(--gap); background: #ffe14d; color: #1d1d1f;
  font: 600 14px/1.4 var(--font); text-align: center; border-bottom: 2px solid #1d1d1f; }
#proto-error { margin: 0; padding: 8px var(--gap); background: #b00020; color: #ffffff; font: 600 14px/1.4 var(--font); }
.screen[hidden], #proto-error[hidden] { display: none; }
body { margin: 0; font: 16px/1.5 var(--font); color: var(--text); background: var(--bg); }
main { max-width: 1100px; margin: 0 auto; padding: var(--gap); }
.fi-sketch { --font: "Comic Sans MS", "Chalkboard SE", system-ui, sans-serif; --accent: #1d1d1f; --text: #1d1d1f; --panel: #ffffff; --line: #1d1d1f; }
.fi-sketch .card, .fi-sketch button, .fi-sketch input, .fi-sketch select, .fi-sketch textarea, .fi-sketch table { border-style: dashed !important; }
.fi-sketch button { background: #ffffff; color: #1d1d1f; }
/* layout helpers: change freely */
h1 { font-size: 1.6rem; margin: 0 0 var(--gap); } h2 { font-size: 1.2rem; margin: var(--gap) 0 8px; }
.row { display: flex; gap: var(--gap); flex-wrap: wrap; align-items: flex-start; }
.card { background: var(--panel); border: 1px solid var(--line); border-radius: var(--radius); padding: var(--gap); flex: 1 1 220px; }
.muted { color: var(--muted); }
button, .button { font: inherit; padding: 8px 14px; border-radius: var(--radius); border: 1px solid var(--accent); background: var(--accent); color: var(--accent-text); cursor: pointer; }
button.secondary { background: transparent; color: var(--accent); }
input, select, textarea { font: inherit; padding: 8px; border: 1px solid var(--line); border-radius: var(--radius); width: 100%; box-sizing: border-box; }
label { display: block; font-weight: 600; margin: var(--gap) 0 4px; }
table { border-collapse: collapse; width: 100%; } th, td { text-align: left; padding: 8px; border-bottom: 1px solid var(--line); }
nav.tabs { display: flex; gap: 8px; margin-bottom: var(--gap); }
:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
</style>
</head>
<body class="{{FIDELITY_CLASS}}">
<p id="proto-banner" role="note">Prototype, not for production use. All data is made up.</p>
<p id="proto-error" role="alert" hidden></p>
<main>

<!-- Repeat this block once per screen. The first screen shows first. -->
<section class="screen" id="{{SCREEN_ID}}" aria-label="{{SCREEN_NAME}}">
  <h1>{{SCREEN_HEADING}}</h1>
  {{SCREEN_CONTENT}}
  <button type="button" data-go="{{NEXT_SCREEN_ID}}">{{BUTTON_LABEL}}</button>
</section>

</main>
<script>
(function () {
  'use strict';
  var screens = Array.prototype.slice.call(document.querySelectorAll('.screen'));
  function show(id) {
    var err = document.getElementById('proto-error');
    if (screens.indexOf(document.getElementById(id)) === -1) {
      err.textContent = 'Prototype error: no screen with id "' + id + '".';
      err.hidden = false;
      return;
    }
    err.hidden = true;
    screens.forEach(function (s) { s.hidden = s.id !== id; });
    window.scrollTo(0, 0);
  }
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-go]');
    if (el) { e.preventDefault(); show(el.getAttribute('data-go')); }
  });
  document.addEventListener('submit', function (e) {
    e.preventDefault();
    var next = e.target.getAttribute('data-next');
    if (next) { show(next); }
  });
  document.addEventListener('input', function (e) {
    var id = e.target.getAttribute('data-filter');
    var list = id ? document.getElementById(id) : null;
    if (!list) { return; }
    var q = e.target.value.toLowerCase();
    Array.prototype.forEach.call(list.children, function (item) {
      item.hidden = q !== '' && item.textContent.toLowerCase().indexOf(q) === -1;
    });
  });
  if (screens.length) { show(screens[0].id); }
})();
</script>
</body>
</html>
```

## Reference: test-script.md

# Five-user test script

Five people find most of the problems a small test can find; test again after you fix them
(S1). Ask people to think aloud while they work (S4). Write tasks as short scenarios with a
goal and a reason, in the tester's words, never the words on the screen (S5).

Rules:

- Every task traces to the design question. A task that does not is cut.
- Every task has a success criterion someone can observe: what the tester does or says.
  A success criterion holds no time limit ("within a few seconds", "in under a minute")
  unless the user gave one. Leave time out, or write it as `[to confirm]`.
- Every task works in the file as built. A paper sketch or clickable file does not remember
  what the tester types or picks, so never ask the tester to check a value they changed.
- The decision rule says what result answers the design question. Use the user's threshold. If
  the user gave none, write the rule with `[to confirm]` in place of the number.
- Facilitator, dates, place, incentives and recording: use what the user said, or `[to confirm]`.
- Never promise anonymity or payment the user did not mention.

## Template

```md
### Test script: {{TITLE}}

**Design question:** {{THE QUESTION, in the user's words}}
**Prototype:** {{file name}} ({{fidelity}}, {{archetype}}). All data in it is made up.
**Testers:** five people who {{who tests it}}. Recruit: {{how, or [to confirm]}}.
**Session:** {{length, or [to confirm]}}, one tester at a time. Facilitator: {{name or [to confirm]}}. Note-taker: {{name or [to confirm]}}.

**Introduction (read aloud):**
"Thank you for helping. We are testing this design, not you, so nothing you do is wrong.
Please think aloud as you go: say what you look at, what you expect and what puzzles you.
This is a prototype with made-up data, so some parts do not work. I will not help while you
try the tasks, but I will answer questions at the end. {{Recording line from the user, or
delete this sentence}}"

**Warm-up question:** {{one question about how they do this today}}

**Tasks** (read one at a time):

| # | Scenario (read aloud) | Traces to | Success looks like |
|---|---|---|---|
| T1 | {{a goal and a reason, in the tester's words}} | {{part of the design question}} | {{what you observe}} |
| T2 | ... | ... | ... |

**After the tasks:**
- What was the hardest part?
- What did you expect to happen that did not?
- {{one question on the design question itself}}

**Observation sheet** (one per tester):

| Tester | Task | Done without help? (yes, with help, no) | Where they hesitated | What they said (verbatim) |
|---|---|---|---|---|
| P1 | T1 | | | |

**Decision rule:** {{what result answers the question, such as "If at least [to confirm] of 5
testers finish T1 without help, keep the layout; if not, redesign the step where most
hesitated."}}
```

In the observation sheet, type a `|` inside a cell as `\|` and write a line break as `<br>`,
so the table stays one row per tester and task.

## Worked example

The user said: "Can people renew a library book online without calling us? We'll test with
five library members." The user gave no time limit, facilitator or dates.

```md
### Test script: Renew a library book

**Design question:** Can people renew a library book online without calling us?
**Prototype:** renew-book.html (clickable HTML, multi-step form). All data in it is made up.
**Testers:** five people who are library members. Recruit: [to confirm].
**Session:** [to confirm], one tester at a time. Facilitator: [to confirm]. Note-taker: [to confirm].

**Introduction (read aloud):**
"Thank you for helping. We are testing this design, not you, so nothing you do is wrong.
Please think aloud as you go: say what you look at, what you expect and what puzzles you.
This is a prototype with made-up data, so some parts do not work. I will not help while you
try the tasks, but I will answer questions at the end."

**Warm-up question:** When did you last renew a book, and how did you do it?

**Tasks** (read one at a time):

| # | Scenario (read aloud) | Traces to | Success looks like |
|---|---|---|---|
| T1 | "You have a book due back soon and you have not finished it. Keep it for longer." | renew online | Reaches the confirmation screen without help |
| T2 | "Check the new date you need to return it by." | without calling us | Reads the new due date aloud from the screen |

**After the tasks:**
- What was the hardest part?
- What did you expect to happen that did not?
- Would you still call the library for this? Why?

**Observation sheet** (one per tester):

| Tester | Task | Done without help? (yes, with help, no) | Where they hesitated | What they said (verbatim) |
|---|---|---|---|---|
| P1 | T1 | | | |

**Decision rule:** If at least [to confirm] of 5 testers finish T1 and T2 without help, keep
the flow. If not, redesign the step where most testers hesitated.
```

## Sources

# Sources

All entries retrieved 29 September 2026.

[S1] Nielsen, J. (2000, March 19). *Why you only need to test with 5 users*. Nielsen Norman Group. Retrieved September 29, 2026, from https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/

[S2] Houde, S., & Hill, C. (1997). What do prototypes prototype? In M. Helander, T. Landauer, & P. Prabhu (Eds.), *Handbook of human-computer interaction* (2nd ed.). Elsevier Science. Retrieved September 29, 2026, from https://hci.stanford.edu/courses/cs247/2012/readings/WhatDoPrototypesPrototype.pdf

[S3] Pernice, K. (2016, December 18). *UX prototypes: Low fidelity vs. high fidelity*. Nielsen Norman Group. Retrieved September 29, 2026, from https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/

[S4] Nielsen, J. (2012, January 16). *Thinking aloud: The #1 usability tool*. Nielsen Norman Group. Retrieved September 29, 2026, from https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/

[S5] McCloskey, M. (2014, January 12). *Task scenarios for usability testing*. Nielsen Norman Group. Retrieved September 29, 2026, from https://www.nngroup.com/articles/task-scenarios-usability-testing/

[S6] Laubheimer, P. (2017, June 18). *Dashboards: Making charts and graphs easier to understand*. Nielsen Norman Group. Retrieved September 29, 2026, from https://www.nngroup.com/articles/dashboards-preattentive/

[S7] Laubheimer, P. (2022, April 3). *Data tables: Four major user tasks*. Nielsen Norman Group. Retrieved September 29, 2026, from https://www.nngroup.com/articles/data-tables/

[S8] Budiu, R. (2017, June 25). *Wizards: Definition and design recommendations*. Nielsen Norman Group. Retrieved September 29, 2026, from https://www.nngroup.com/articles/wizards/

[S9] Whitenton, K. (2016, May 1). *Website forms usability: Top 10 recommendations*. Nielsen Norman Group. Retrieved September 29, 2026, from https://www.nngroup.com/articles/web-form-design/

[S10] Government Digital Service. (n.d.). *Question pages*. GOV.UK Design System. Retrieved September 29, 2026, from https://design-system.service.gov.uk/patterns/question-pages/

[S11] Government Digital Service. (n.d.). *Check answers*. GOV.UK Design System. Retrieved September 29, 2026, from https://design-system.service.gov.uk/patterns/check-answers/

[S12] Kaplan, K. (2021, September 19). *Designing empty states in complex applications: 3 guidelines*. Nielsen Norman Group. Retrieved September 29, 2026, from https://www.nngroup.com/articles/empty-state-interface-design/

[S13] Moran, K., & Dykes, T. (2024, February 9). *Comparison tables for products, services, and features*. Nielsen Norman Group. Retrieved September 29, 2026, from https://www.nngroup.com/articles/comparison-tables/

[S14] Kendrick, A. (2020, June 21). *Mobile-app onboarding: An analysis of components and techniques*. Nielsen Norman Group. Retrieved September 29, 2026, from https://www.nngroup.com/articles/mobile-app-onboarding/

[S15] Neusesser, T. (2022, September 4). *Infinite scrolling: When to use it, when to avoid it*. Nielsen Norman Group. Retrieved September 29, 2026, from https://www.nngroup.com/articles/infinite-scrolling-tips/

[S16] Liu, F. (2024, August 2). *Prompt controls in GenAI chatbots: 4 main uses and best practices*. Nielsen Norman Group. Retrieved September 29, 2026, from https://www.nngroup.com/articles/prompt-controls-genai/

[S17] Wang, H.-H. (2024, March 15). *Homepage design: 5 fundamental principles*. Nielsen Norman Group. Retrieved September 29, 2026, from https://www.nngroup.com/articles/homepage-design-principles/

[S18] Nielsen, J. (2006, December 4). *Progressive disclosure*. Nielsen Norman Group. Retrieved September 29, 2026, from https://www.nngroup.com/articles/progressive-disclosure/

[S19] Baymard Institute. (n.d.). *E-commerce cart & checkout usability research*. Retrieved September 29, 2026, from https://baymard.com/research/checkout-usability

[S20] UI-Patterns. (n.d.). *Search filters design pattern*. Retrieved September 29, 2026, from https://ui-patterns.com/patterns/LiveFilter

[S21] UI-Patterns. (n.d.). *Calendar picker design pattern*. Retrieved September 29, 2026, from https://ui-patterns.com/patterns/CalendarPicker

[S22] UI-Patterns. (n.d.). *Activity stream design pattern*. Retrieved September 29, 2026, from https://ui-patterns.com/patterns/ActivityStream

[S23] Kanban board. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Kanban_board

[S24] Email client. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Email_client

[S25] MDN contributors. (n.d.). *Content Security Policy (CSP)*. MDN Web Docs. Retrieved September 29, 2026, from https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP

[S26] OWASP Cheat Sheet Series Team. (n.d.). *Cross site scripting prevention cheat sheet*. OWASP. Retrieved September 29, 2026, from https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html

[S27] Paper prototyping. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Paper_prototyping

[S28] Government Digital Service. (n.d.). *Summary list*. GOV.UK Design System. Retrieved September 29, 2026, from https://design-system.service.gov.uk/components/summary-list/
