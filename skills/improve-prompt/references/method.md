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
| Give a role | The task needs a point of view or a register, such as a ward manager writing to staff. One line: "You are helping a..." | (S1) |
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
