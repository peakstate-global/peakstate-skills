---
skill: visualise
eval-version: "1"
---

# visualise evals

Runner setup for every case: the host has an image generation tool. The runner tells each
turn's subagent that its tool list includes one extra tool, called through Bash:
`/tmp/visualise-eval/bin/generate-image "<prompt>" <output.png>`. The tool appends the prompt
to `/tmp/visualise-eval/case<N>/image-log.txt` and writes a placeholder PNG. Each case has
its own working folder, `/tmp/visualise-eval/case<N>/`, for any file the skill makes. An
empty or missing `image-log.txt` means the image tool was not called.

## Case 1: the host has image generation, and the message is a metaphor

**Opening message:** "I need a picture for my all-hands slide. The message: small fixes to our onboarding each week add up, and the gains build on each other."

**Scripted replies**, in order, each with when to give it:

i) When the skill offers metaphors to pick from: "The flywheel, if it is on your list. If not, your first one."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply restates the one message and offers exactly three metaphors, each with a reason tied to the message, then asks the user to pick. It draws nothing and calls no tool that makes an image.
- P2: after the pick, the reply names the rung it took (image generation) in one line, and `image-log.txt` holds exactly one prompt.
- P3: the prompt in `image-log.txt` asks for no words, letters or labels in the image, and the take-away shows that same prompt ready to paste.
- P4: the take-away has alt text and a caption, and neither holds a number, name, date or claim that is not in the user's messages.
- P5: the take-away ends with three next moves, each with an owner ("you" or a role the user named), a first action this week and an observable result.

## Case 2: the user forces SVG although the host has image generation

**Opening message:** "Make me a visual for the board paper: our three teams each fix their own part of the customer complaint process, and nobody owns the whole thing. I want an SVG, not an AI image."

**Scripted replies**, in order, each with when to give it:

i) When the skill offers metaphors to pick from: "Silos, if it is on your list. If not, your first one."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply offers exactly three metaphors, each with a reason, and asks the user to pick before it draws anything.
- P2: the visual is an SVG (a saved `.svg` file in the case folder or an `svg` code block), the rung line says the user asked for SVG, and `image-log.txt` is empty or missing.
- P3: the SVG renders in Chromium from `file://` with no page error, and holds no `<script>`, no attribute starting with `on`, no `<foreignObject>`, no `<image>`, and no `http`, `https` or `@import` reference other than the `xmlns` declaration.
- P4: every word in the SVG is either the user's words or a generic part name of the metaphor (for example "silo"); it has no number, team name, owner or date that the user did not give.
- P5: the take-away has alt text, a caption, a ready-to-paste image prompt for use elsewhere, and three next moves with an owner, a first action this week and an observable result.

## Case 3: a labelled diagram, and the user asks for a generated image

**Opening message:** "Draw our approval process so new staff get it: request, manager check, finance check, legal check if over the limit, then sign-off. Make it a nice generated image."

**Scripted replies**, in order, each with when to give it:

i) When the skill offers options to pick from: "Your call."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: before drawing, a reply says the steps need exact labels, so the skill uses the diagram ladder and not image generation, with a one-line reason (generated images corrupt labels or arrows). `image-log.txt` is empty or missing for the whole run.
- P2: the diagram is SVG or Mermaid at a named rung, and holds all five steps in the user's words (request, manager check, finance check, legal check, sign-off) in that order, with legal check shown as a branch taken only when the request is over the limit.
- P3: the take-away also gives the process as text (a numbered list, tree or table) with the same five steps and the branch.
- P4: the limit is never given a value; it stays "the limit" or is marked `[to confirm]`. No owner, date or other number is invented.
- P5: if the diagram is SVG, it renders in Chromium from `file://` with no page error and passes the P3 safety checks of case 2. If it is Mermaid, the block parses (a `flowchart` or `graph` header and one edge per line).
