---
name: visualise
description: Turns one message you want to land into a picture. It restates the message, shortlists three visual metaphors from a library of about 30 (iceberg, bridge, flywheel, funnel, silos and more) with a reason for each, lets you pick, then draws it at the best rung your host supports, from a generated image to an SVG to a written spec with a ready-to-paste image prompt. When the picture needs exact labels, such as the steps of a process, it draws a diagram instead and never uses image generation. Use when someone says "visualise this", "make me a visual", "picture for my slide", "visual metaphor", "illustrate this idea", "draw this for me", "I need an image that shows", or wants a message to stick.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "artefact"
  output: "visual"
---

This skill turns one message into a visual metaphor or, when labels must be exact, a diagram, drawn at the best rung your host supports.

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

A metaphor with no exact labels uses the visual ladder: your own image generation tool, then SVG (a file, an artifact, or a code block to save), then a written spec plus a ready-to-paste image prompt. The user may force SVG or an image. A picture whose labels, steps, numbers or arrows must read exactly uses the diagram ladder instead: SVG, then a Mermaid flowchart, then a text list or table. Never use image generation on the diagram ladder, even when the user asks for it: generated images corrupt labels and arrows. Say so in one line and draw the SVG. Decide the rung from your own tool list, never from the name of the host. Rules and templates: `references/drawing.md`.

## Steps

Say once, in the first reply: "Use only a tool your organisation has approved for this information." Ask at most four questions in the whole run, one per reply.

1. **Find the one message.** If the opening states it, restate it in one sentence in the user's words and go on to step 2 in the same reply. If not, ask one question: what should the viewer think or feel after one look? Note where the visual will appear (slide, document, poster) only if the user said so.
2. **Choose the ladder.** Check whether the picture must carry exact labels: named steps, a sequence, numbers, dates, people or arrows that must read correctly. If yes, say in one line that you will use the diagram ladder and why. Otherwise use the visual ladder. A user's request for a generated image does not change a diagram-ladder decision.
3. **Shortlist three.** Pick three entries from `references/metaphors.md` that fit the message. For each, give its name, one line on why it fits this message, and one line on what it could make a viewer misread. For the diagram ladder, pick metaphors whose layout can carry the exact labels (a road with milestones, stepping stones), or offer a plain flowchart as one of the three. Ask the user to pick one. Draw nothing yet.
4. **Handle the pick.** If the user picks one, use it. If the user says "your call", use the first and say it was your choice. If the user rejects all three, offer three more, or use the user's own metaphor, or a plain diagram. Never draw a metaphor the user rejected.
5. **Draw it.** Say in one line which rung you took and why. Draw at that rung with `references/drawing.md`. Use only the user's words and the generic part names of the metaphor on the visual. Never add a number, name, owner, date or claim the user did not give. A gap stays `[to confirm]` in the text, never on the picture as a guess.
6. **Deliver.** Give the take-away, then offer one change (layout, colour or wording) and wait.

## The take-away

Use the template in `references/take-away.md`. It has these parts, in this order:

- The message, in one sentence, in the user's words.
- The metaphor or diagram form, who chose it ("you" or "my choice after your call") and why it fits.
- The rung, in one line.
- The visual: the generated image, the SVG (file path or code block), or the written spec.
- The text form: for a diagram, the steps as a numbered list, tree or table. For a metaphor, the alt text.
- A caption of one sentence, built from the user's words.
- The image prompt, ready to paste, for a metaphor. For a diagram, the line "No image prompt: generated images corrupt labels."
- What is still `[to confirm]`, or "Nothing to confirm."

If you cannot open files or browse, say so in one line. Any fact from memory is labelled RECALLED. Never invent a number, an owner, a date or a source.

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a role the user named. Never invent a person or a date.

1. Show the visual to one person from the audience without explaining it, and ask what it says to them. Result: their words match the message, or you know what to change.
2. Put the visual where it will be used (the slide, the page or the paper) and check it reads at that size. Result: every label is readable at a glance.
3. Keep the image prompt or the SVG with the source file, so anyone can redraw it. Result: the prompt or the SVG sits beside the file.

If the visual is going into a document that asks readers questions, the user may also like a skill for building a brief, if they have one. Do not run it for them.

## Self-check before you deliver

- Once the message is known: the reply that shortlists metaphors restated the message and offered exactly three options with a reason each, and drew nothing. If step 1 had to ask what the viewer should think or feel, the first reply is that question alone.
- The rung line names the rung and why, and the rung came from your own tool list or the user's named format.
- A picture with exact labels used the diagram ladder, and no image generation was used for it, even on request.
- Every image prompt asks for no words, letters or labels in the image.
- The SVG has no `<script>`, no `on` attributes, no `<foreignObject>`, no `<image>`, no `<a>`, no `javascript:` URL, no external reference, and user text is escaped.
- The visual, caption and alt text hold only the user's words and generic metaphor parts: no invented number, name, owner, date or source.
- A diagram also has its text form, and the take-away lists what is still `[to confirm]`.
- The three next moves have an owner, a first action this week and an observable result.

## Read this when

| File | When |
|---|---|
| `references/metaphors.md` | Shortlisting the three metaphors, or when the user rejects them all |
| `references/drawing.md` | Drawing at any rung: image prompt, SVG, written spec, Mermaid or text form |
| `references/take-away.md` | Writing the final output, or checking the worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
