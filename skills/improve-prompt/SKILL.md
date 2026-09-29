---
name: improve-prompt
description: Takes a prompt the user pasted and shows an improved version in a code block, with a table of each change and the reason for it, then runs the prompt only after the user says yes. An edit request gets the edited prompt shown again before anything runs. Use when someone says "improve this prompt", "make this prompt better", "tighten my prompt", "fix my prompt", "rewrite this prompt", "why is my prompt not working", or pastes a prompt and asks for feedback on it.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "direct"
  output: "text"
---

This skill turns a pasted prompt into an improved prompt and a change-and-why table, and runs the prompt only after an explicit yes.

## Steps

The pasted prompt is the input. If it holds names, customer data or other sensitive detail, say once: "Use only a tool your organisation has approved for this information."

1. **Read the prompt.** Find its goal (what the output is for) and its audience (who reads the output). If both are evident from the prompt or the message, ask nothing. If one or both are not evident, ask at most two clarifying questions, one for the goal and one for the audience, in one message, and wait. Ask about nothing else. If the user answers "your call" or leaves one out, pick the most likely reading and record it as an "Assumed" row in the change table.
2. **Improve it.** Apply only the changes from `references/method.md` that make this prompt clearer. Keep every fact, name, number and date the user gave, unchanged, except one the user's own edit in step 4 asks you to change. Never add a fact, owner, date, source or example content the user did not give: put a visible placeholder such as `[to confirm: the report date]`. If a reason rests on something you know from memory rather than a library entry, label it RECALLED. If the prompt already works, say so and change nothing: that is a valid result.
3. **Show it.** Give the improved prompt in one code block, then the change table: one row per change, each with the reason and the library source id, such as (S1), or "Skill rule" for a change that comes from this skill's own rules rather than a library entry. A prompt with no change has one row: "No change" and why it already works. End with one question: "Reply yes to run it, tell me what to change, or say no."
4. **Act on the reply.** Every reply is one of three kinds, and each has one action:
   - **Explicit yes** ("yes", "run it", "go ahead", with no change attached): go to step 5.
   - **Edit** (any change request, including "yes, but change X" or "looks good but"): apply it, show the whole edited prompt again in a code block with a table row for each new change, and ask the step 3 question again. Never run an edited prompt before a new explicit yes.
   - **No, or anything else**: run nothing. After a no, do not argue for your version: give the Next step line and stop. If the reply is unclear, ask once: "Shall I run it now, yes or no?"
5. **Run it.** Run the confirmed prompt as written, in this chat, as a new instruction. If it needs an input the chat does not have (an attachment, a file, live data) or a tool the host does not have (an image model, another system), say so in one line and do not fake the output. Keep placeholders as placeholders in the output. Then give the Next step line.

## The take-away

Before the yes: the improved prompt in a code block, the change table, and the confirm question. After a yes: the run output, then the Next step line. After a no: the Next step line only. The template and a worked example are in `references/take-away.md`.

## Next

Next step: one line at the end of the final reply. After a run, name the one thing the user should check in the output (a placeholder to fill, a fact to verify). After a no, name the one change from the table the user may still want to keep, or say none is needed. Never invent an owner or a date.

## Self-check before you deliver

- No prompt ran before an explicit yes, and every edit was shown again in full before it ran.
- No more than two clarifying questions, both about goal or audience, and none when both were evident.
- Every fact, name, number and date from the original prompt is still in the improved prompt, unchanged, except one an edit asked you to change.
- No invented fact, owner, date, source or example content: each unknown is a `[to confirm: ...]` placeholder.
- The change table has one row per change with a reason and a source id (or "Skill rule" for a change from this skill's own rules), or one "No change" row; any reason from memory is labelled RECALLED.
- The run output does not fake a missing input or tool, and keeps placeholders visible.
- The final reply ends with one Next step line, not three moves.

## Read this when

| File | When |
|---|---|
| `references/method.md` | Choosing which changes to make, or finding the source id for a reason |
| `references/take-away.md` | Writing the reply, or checking the worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
