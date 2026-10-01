---
name: meeting-to-actions
description: Turns meeting notes or a transcript into four lists in one pass: decisions, actions (each with an owner and a date), open questions and risks. It takes every item from the notes, never invents an owner or a date, and marks a gap as [NO OWNER] or [NO DATE] so the team can see what still needs someone. Use when someone says "turn this into actions", "pull out the actions", "what did we decide", "write up the minutes", "action items from this meeting", "summarise this transcript into next steps", or pastes meeting notes or a transcript.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "direct"
  output: "text"
---

This skill turns meeting notes or a transcript into decisions, actions with owners and dates, open questions and risks, taking every item from the notes.

## Steps

The notes or transcript are the input. If they hold names with personal detail (health, leave, performance, pay), customer data or other sensitive detail, say once: "Use only a tool your organisation has approved for this information."

1. **Check you have notes.** If the user gave no notes or transcript, ask one question and wait: "Please paste the notes or transcript." Do not guess what the meeting covered. If the input is there, ask nothing and go on.
2. **Sort every item.** Read the whole input once. Put each item in one list, using `references/method.md`:
   - **Decisions:** only what the meeting agreed (S1). "Leaning towards", "probably" or "not final" is not a decision: put it in open questions, marked "Proposed, not agreed".
   - **Actions:** a task someone must do.
   - **Open questions:** a question raised and not answered, or parked.
   - **Risks:** a worry about what could go wrong, as the notes say it.
   - **Updates noted:** a status, fact or figure the notes report that is not a decision, an action, a question or a risk (such as "Q3 spend is 8% over"). Keep it in the notes' words. Nothing in the input is dropped.
3. **Fill owner and date from the notes only.** The owner is the person, role or team the notes say will do it (S2, S3). If nobody is named, or the notes say "someone" or "nobody has picked it up", write `[NO OWNER]`. The date is the timing the notes give, in their words ("by Thursday", "before the start date"). If there is none, write `[NO DATE]`. Never turn a relative timing into a calendar date. If the notes name two owners, keep both and add an open question: "Who leads this?" (S4).
4. **Keep the words.** Every name, number, date and place stays as written. Add no item, owner, date, reason or risk. A list with no items says so in words, such as "No decisions recorded in the notes." Anything you know from memory rather than the notes is labelled RECALLED and kept out of the four lists.
5. **Show it.** Give the four lists in the order above, using `references/take-away.md`, then the Next step line.
6. **Act on a follow-up.** When the user adds an owner, a date or an item in the chat, show the whole output again with the change, and mark that field "(added by you)". Keep step 3 for every field the user did not give.

## The take-away

Five sections in this order: Decisions, Actions (a table with action, owner, date and where it came from), Open questions, Risks, Updates noted. Every section is present, with "None recorded in the notes." when empty. The template and a worked example are in `references/take-away.md`.

## Next

Next step: one line at the end of every reply. Name the one gap that most needs a person, such as the first `[NO OWNER]` action, or say "Send the list to the attendees to check." when there is no gap. Never invent an owner or a date. If the actions need wider follow-up, the user may also like a skill for building a brief, if they have one. Do not run it for them.

## Self-check before you deliver

- At most one question was asked, and only because no notes were given.
- Every decision was agreed in the notes; tentative items sit in open questions, marked "Proposed, not agreed".
- Every action has an owner and a date from the notes or the chat, or `[NO OWNER]` or `[NO DATE]`.
- No relative timing became a calendar date, and no item, owner, date or risk was added.
- Every one of the five sections is present, with "None recorded in the notes." when it has no items.
- A follow-up shows the whole output again and marks what the user added.
- The reply ends with one Next step line, not three moves.

## Read this when

| File | When |
|---|---|
| `references/method.md` | Deciding which list an item goes in, or how to write an owner or a date |
| `references/take-away.md` | Writing the reply, or checking the worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.

## Reference: method.md

# Sorting rules

Each rule carries a source id. Rules marked (skill rule) are this skill's own choice.

## Which list

| Signal in the notes | List | Source |
|---|---|---|
| "agreed", "decided", "approved", "we will", a vote or a clear yes from the group | Decisions | (S1) |
| "leaning towards", "probably", "not final", "subject to", one person's preference | Open questions, marked "Proposed, not agreed" | (skill rule) |
| A task: "X will", "can you", "needs to", "someone should" | Actions | (S2) |
| A question not answered, "park that", "take it offline", "come back to" | Open questions | (S1) |
| "worry", "risk", "if X happens", "could slip", "concern" | Risks | (skill rule) |
| Discussion with no outcome | Leave out, unless it holds a question or a risk | (S1) |

Minutes record what was decided, not every word said (S1). One item goes in one list. If an
item is both an action and a risk (for example "check the network, or we lose the week"),
put the task under actions and the worry under risks, in the notes' words.

## Owner

- The owner is the person, role or team the notes say will do it: "I'll", "Lee will",
  "Finance to" (S2, S3).
- A request that the person accepts ("Can you?" "Sure") makes that person the owner.
- A request with no answer, "someone should", "we need someone" or "nobody has picked it up"
  gives `[NO OWNER]`. Do not pick the most likely person. (skill rule)
- Two people named: keep both, and add the open question "Who leads this?", because one
  person should be accountable for each task (S4).
- An owner the user names in the chat is written with "(added by you)". (skill rule)

## Date

- The date is the timing in the notes, in their words: "by Thursday", "15 October",
  "before the start date" (S3).
- No timing gives `[NO DATE]`. "Soon", "ASAP" and "next week" are kept as written, not
  turned into a date. (skill rule)
- Never turn a weekday or a relative timing into a calendar date, even when the meeting
  date is known: the reader can do it, and a wrong conversion looks like a real deadline.
  (skill rule)

## Where it came from

Each action row names where it came from: a speaker and a short quote from a transcript,
or the note line. For an item the user added in the chat, write "added by you in the chat".
(skill rule)

## Reference: take-away.md

# Reply template

Keep every heading, in this order. Write "None recorded in the notes." under a heading with
no items. In the Actions table, escape any `|` in the notes' own text as `\|` and replace a
line break with a space or `<br>`, so the table still renders.

    [Sensitive-information line, once, only if it applies.]

    ### Decisions
    - [what was agreed, in the notes' words]

    ### Actions
    | Action | Owner | Date | From the notes |
    |---|---|---|---|
    | [task] | [name, role or team, or [NO OWNER]] | [timing as written, or [NO DATE]] | [speaker and short quote, or the note line, or "added by you in the chat"] |

    ### Open questions
    - [question not answered, or "Proposed, not agreed: ..."]

    ### Risks
    - [the worry, as the notes say it]

    ### Updates noted
    - [a status, fact or figure that is not a decision, action, question or risk, in the notes' words]

    Next step: [the one gap that most needs a person, or "Send the list to the attendees to check."]

After a follow-up, give the whole output again in the same template. Mark each field the user
added with "(added by you)".

# Worked example

The user pasted:

> Library committee. Membership is up 12% this quarter. Agreed: the summer reading programme
> starts on 5 January. Mei will print the posters by the end of the month. Somebody needs to
> ask the council about hall hire. Do we charge for the craft sessions? No answer yet. Worry:
> not enough volunteers in week two.

The reply:

    ### Decisions
    - The summer reading programme starts on 5 January.

    ### Actions
    | Action | Owner | Date | From the notes |
    |---|---|---|---|
    | Print the posters | Mei | by the end of the month | "Mei will print the posters by the end of the month" |
    | Ask the council about hall hire | [NO OWNER] | [NO DATE] | "Somebody needs to ask the council about hall hire" |

    ### Open questions
    - Do we charge for the craft sessions?

    ### Risks
    - Not enough volunteers in week two.

    ### Updates noted
    - Membership is up 12% this quarter.

    Next step: find an owner for asking the council about hall hire.

## Sources

# Sources

All entries retrieved 29 September 2026.

[S1] Minutes. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Minutes

[S2] Action item. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Action_item

[S3] SMART criteria. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/SMART_criteria

[S4] Responsibility assignment matrix. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Responsibility_assignment_matrix
