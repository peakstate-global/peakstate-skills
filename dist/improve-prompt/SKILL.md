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

## Reference: method.md

# Improvement library

Use only the entries a prompt needs. A strong prompt may need one change or none. Each entry has what to check, the change to make, and its source id.

## The four parts of a prompt

A prompt can hold four parts: the goal, the context, the expectations and the source (S4).

| Part | Check | Change |
|---|---|---|
| Goal | Does it say what the output is and what it is for? | Put the task and its purpose in the first sentence (S1, S4) |
| Context | Does it say who the audience is and why the task matters? | Add the audience and the reason, so the model can decide the details itself (S1) |
| Expectations | Does it say the length, format, tone and reading level? | State each one the user cares about as a plain instruction (S3) |
| Source | Does it say what material to use? | Name the pasted text, file or data to work from, and say to use only that (S4) |

## Other changes

| Change | When | Source |
|---|---|---|
| Say what to do, not what to avoid | The prompt is a list of "do not" rules | (S1) |
| Separate instructions from material | Pasted text sits in the middle of the instructions. Put the material after the instructions, between clear markers such as tags or headings | (S1, S2) |
| Give a role | The task needs a point of view or a register, such as a ward manager writing to staff. One line: "You are helping a...". Use only a role the user gave; if they did not say who writes or sends it, leave the role out or write [to confirm: who sends this] | (S1) |
| Add an example | The output must follow a pattern the words do not make clear. One short example of the shape, never of invented content | (S3) |
| Split the task | The prompt asks for several outputs at once. Number the parts in the order they should come | (S3) |
| Add a constraint | A limit matters (length, what to leave out, what to use only) and is not stated | (S3) |
| Add a placeholder | The prompt needs a fact the user did not give. Write `[to confirm: what is missing]`, never a guessed value | Skill rule, no source |

## The colleague test

Before you show the improved prompt, read it as a capable colleague with no context on the task. If they would need to ask a question to do the task, the prompt needs that answer, or a placeholder for it (S1).

## What not to change

- Facts, names, numbers, dates and quoted text the user gave.
- The user's tone, unless the tone is the problem.
- Length for its own sake. A longer prompt is better only when each added line changes the output.

## Reference: take-away.md

# Reply template

## Before the yes

    [One line on what the prompt is for, and the sensitive-information line if it applies.]

    [The improved prompt, whole, in one code block.]

    | Change | Why |
    |---|---|
    | [What changed] | [Reason] (Sn) |
    | Assumed [goal or audience]: [reading] | You left this to me, so I picked the most likely reading. |
    | [Or, when nothing changed:] No change | [Why it already works] |

    Reply yes to run it, tell me what to change, or say no.

After an edit, use the same template: the whole edited prompt, a row for each new change, and the same question.

## After the yes

    [The output of the confirmed prompt. A missing input or tool is stated in one line, never faked. Placeholders stay visible.]

    Next step: [one thing to check or fill in the output].

## After a no

    Next step: [the one change from the table worth keeping in your version, or "none needed"].

# Worked example

The user pasted: "Summarise the attached report for the managers."

The reply:

    This prompt asks for a report summary for managers.

    Summarise the report below for the managers. They will use it to [to confirm: what the managers will decide with it].

    Write at most five bullet points, most important first, in plain English. Use only the report. If a number is missing, write [to confirm].

    <report>
    [to confirm: paste the report here]
    </report>

(The prompt above goes in one code block in the real reply.)

    | Change | Why |
    |---|---|
    | Added a placeholder for what the managers will do with it | Context lets the model choose what matters, and the purpose was not given (S1) |
    | Added length, order and style | Stated expectations shape the output (S3) |
    | Put the report between markers, after the instructions | Separates the material from the instructions (S1) |
    | Added "use only the report" and a placeholder rule | Names the source and stops invented numbers (S4) |

    Reply yes to run it, tell me what to change, or say no.

The report was not attached. After a yes, the run reply says so in one line, writes no summary, and ends: "Next step: paste the report so the summary runs on real numbers."

## Sources

# Sources

All entries retrieved 29 September 2026.

[S1] Anthropic. (n.d.). *Prompting best practices*. Claude Platform Docs. Retrieved September 29, 2026, from https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

[S2] OpenAI. (n.d.). *Prompt engineering*. OpenAI API documentation. Retrieved September 29, 2026, from https://developers.openai.com/api/docs/guides/prompt-engineering

[S3] Google. (n.d.). *Prompt design strategies*. Gemini API, Google AI for Developers. Retrieved September 29, 2026, from https://ai.google.dev/gemini-api/docs/prompting-strategies

[S4] Microsoft. (n.d.). *Get started writing prompts in Microsoft Copilot*. Microsoft Support. Retrieved September 29, 2026, from https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-writing-prompts-in-microsoft-365-copilot
