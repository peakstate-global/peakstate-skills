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
