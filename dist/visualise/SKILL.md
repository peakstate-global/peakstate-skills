---
name: visualise
description: Abstract ideas are hard to remember and easy to misread in text alone. This skill finds a picture that carries your message, so it stays with your audience. Turns one message you want to land into a picture. It restates the message, shortlists three visual metaphors from a library of about 30 (iceberg, bridge, flywheel, funnel, silos and more) with a reason for each, lets you pick, then draws it at the best rung your host supports, from a generated image to an SVG to a written spec with a ready-to-paste image prompt. When the picture needs exact labels, such as the steps of a process, it draws a diagram instead and never uses image generation. Use when someone says "visualise this", "make me a visual", "picture for my slide", "visual metaphor", "illustrate this idea", "draw this for me", "I need an image that shows", or wants a message to stick.
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

## Reference: drawing.md

# Drawing at each rung

Two ladders. Take the first rung your own tool list supports, unless the user named a format.

- **Visual ladder** (a metaphor, no exact labels): image generation, then SVG, then a written
  spec plus an image prompt.
- **Diagram ladder** (labels, steps, numbers or arrows must read exactly): SVG, then a Mermaid
  flowchart, then the text form alone. Never image generation, even on request (skill rule).
  Always give the text form as well.

Rules for every rung (skill rule):

- Words on the visual come only from the user, plus generic part names of the metaphor
  ("silo", "stage"). No invented number, name, owner, date or claim.
- Keep labels short: four words or fewer. Put longer text in the caption.
- If a gap matters, write `[to confirm]` in the take-away text, never a guess on the picture.

## Rung: image generation (visual ladder only)

Call your image tool once with this prompt. Fill `{{SCENE}}` from the metaphor's image scene in
`metaphors.md`, adapted to the message without naming anyone.

```text
{{SCENE}}. Clean flat illustration, simple shapes, calm colours, plain light background,
wide 16:9 frame. No words, no letters, no numbers, no labels, no logos, no signs with writing.
```

Show the same prompt in the take-away, ready to paste. Generated images garble text, so any
words go in the caption or on the slide, never in the image (skill rule).

## Rung: SVG (both ladders)

Write one self-contained SVG. Save it as a file or artifact if you can; otherwise give one
`svg` code block and tell the user to save it as `visual.svg`. Safety rules (S32, S33):

- No `<script>`, no attribute starting with `on` (such as `onclick`), no `<foreignObject>`,
  no `<image>`, no `<a>`, no `<style>` with `@import`.
- No `javascript:` URL anywhere in the file, including inside an attribute that is not an
  `href` (a rejected `<a>` is not the only place one can hide).
- No external reference of any kind: no `http` or `https` URL, no remote font. The `xmlns`
  declaration is the one URL allowed. Use `font-family="sans-serif"`.
- Insert user text as text. Escape `&` as `&amp;`, `<` as `&lt;`, `>` as `&gt;`, `"` as
  `&quot;` and `'` as `&#39;`.
- Give the SVG a `<title>` holding the alt text, and `role="img"`.

Frame to copy. Replace the shapes with the metaphor's SVG recipe.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" role="img" font-family="sans-serif" font-size="18">
  <title>{{ALT_TEXT}}</title>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#333"/>
    </marker>
  </defs>
  <rect width="800" height="450" fill="#ffffff"/>
  <text x="400" y="40" text-anchor="middle" font-size="24" font-weight="bold">{{MESSAGE_SHORT}}</text>
  <!-- metaphor shapes: one group per part, each with its label -->
  <g>
    <rect x="80" y="200" width="160" height="120" rx="8" fill="#dbe8f5" stroke="#333"/>
    <text x="160" y="265" text-anchor="middle">{{LABEL}}</text>
  </g>
  <path d="M250,260 L330,260" stroke="#333" stroke-width="2" fill="none" marker-end="url(#arrow)"/>
</svg>
```

## Rung: written spec plus image prompt (visual ladder, last rung)

Use this when the user cannot use SVG or asks for a prompt to use elsewhere.

```text
Visual spec
  Metaphor: {{METAPHOR}}
  Layout: {{WHAT_GOES_WHERE, left to right or top to bottom}}
  Parts and labels: {{PART}}: {{USER_WORDS}}   (one line each)
  Colour: {{ONE_ACCENT_COLOUR}} on a plain light background
  Image prompt: {{PROMPT_FROM_THE_TEMPLATE_ABOVE}}
```

## Rung: Mermaid flowchart (diagram ladder)

Use the user's words for node labels. Quote every label, `A["{{STEP_1}}"]`, so punctuation such
as `(legal)` survives (skill rule). Inside a quoted label, escape `"` as `#quot;`. A condition
goes on the edge label, quoted the same way (S34).

```mermaid
flowchart LR
  A["{{STEP_1}}"] --> B["{{STEP_2}}"]
  B --> C{ "{{DECISION}}" }
  C -->|"{{CONDITION_YES}}"| D["{{STEP_3}}"]
  C -->|"{{CONDITION_NO}}"| E["{{STEP_4}}"]
  D --> E
```

## Rung: text form (diagram ladder, always given)

A numbered list for a sequence, an indented tree for a hierarchy, or a table for a grid. A
branch is its own line under the step it leaves from.

```text
1. {{STEP_1}}
2. {{STEP_2}}
3. {{STEP_3}}
   If {{CONDITION}}: {{BRANCH_STEP}}
4. {{STEP_4}}
```

## Reference: metaphors.md

# Metaphor library

A visual metaphor shows an abstract idea through a concrete picture: the viewer knows the
picture (the source) and carries its logic to your message (the target) (S2, S1). Pick the
entry whose logic matches the message, not the one that looks best.

Each entry has: what it says, use when, avoid when, an SVG layout recipe, and an image scene.
The image scene fills the `{{SCENE}}` slot of the prompt template in `drawing.md`. Slots in
`{{CAPS}}` take the user's own words. Never put the user's words into an image scene as text
to draw: an image carries no words.

## Hidden and visible

**1. Iceberg (S10)**
- Says: what people see is a small part; most of the cause sits below the surface.
- Use when: symptoms get attention and root causes do not. Avoid when: nothing is hidden.
- SVG: a water line across the middle; a small peak above labelled `{{VISIBLE}}`, a large mass below with up to three labels `{{HIDDEN}}`.
- Image scene: an iceberg in calm sea, a small tip above the water and a huge mass clearly visible below.

**2. Elephant in the room (S13)**
- Says: a large, obvious problem that everyone avoids naming.
- Use when: the message is "we must talk about this". Avoid when: the audience owns the problem and may feel accused.
- SVG: a meeting table with small figures; a large elephant outline beside it labelled `{{PROBLEM}}`.
- Image scene: people in a meeting room looking away from a large elephant standing beside the table.

**3. Blind men and the elephant (S14)**
- Says: each group sees one part and takes it for the whole.
- Use when: teams disagree because each holds a partial view. Avoid when: one view is simply wrong.
- SVG: an elephant outline; four figures at trunk, leg, ear and tail, each labelled with one `{{VIEW}}`.
- Image scene: several blindfolded people each touching a different part of one elephant.

## Movement and progress

**4. Road with milestones (S1, S17)**
- Says: progress is a route with stages, from here to a goal.
- Use when: a plan or change has an order of stages. Avoid when: the work has no order.
- SVG: a winding road from bottom left to top right; circles on it for each `{{STAGE}}`, a flag at `{{GOAL}}`. Carries exact labels, so it suits the diagram ladder.
- Image scene: a winding road across open country toward a distant flag, with markers along the way.

**5. Mountain climb (S3, S1)**
- Says: the goal is hard, the effort goes uphill, and there are camps on the way.
- Use when: the message is about sustained effort to a high goal. Avoid when: the work is easy or flat.
- SVG: a triangle peak; a dotted path up it with camp markers `{{STAGE}}`; the summit labelled `{{GOAL}}`.
- Image scene: climbers roped together on a path up a mountain toward a clear summit.

**6. Stepping stones (S29)**
- Says: small safe steps across something risky reach the far side.
- Use when: an incremental plan crosses a gap. Avoid when: the change is one leap.
- SVG: a river band; stones across it labelled `{{STEP}}` in order; banks labelled `{{FROM}}` and `{{TO}}`. Carries exact labels.
- Image scene: a person crossing a river on a line of flat stepping stones.

**7. Crossroads (S23)**
- Says: we are at a decision point and the paths lead to different places.
- Use when: the message is a choice between options. Avoid when: the choice is already made.
- SVG: a road splitting into two or three; each branch ends in a sign `{{OPTION}}`.
- Image scene: a traveller standing where a country road forks into several paths.

**8. Launch pad (S30)**
- Says: this is the starting point that lets something bigger take off.
- Use when: a foundation piece enables a later push. Avoid when: the thing is already running.
- SVG: a rocket on a pad; the pad labelled `{{FOUNDATION}}`, the rocket `{{AMBITION}}`.
- Image scene: a rocket on a launch pad at dawn, ready to lift off.

**9. Moving target (S31)**
- Says: the goal keeps changing, so aiming once is not enough.
- Use when: requirements or markets shift. Avoid when: the target is fixed.
- SVG: a target shown in three faded positions with arrows between them, labelled `{{GOAL}}`.
- Image scene: an archer aiming at a target that slides along a track.

**10. North Star (S24)**
- Says: one fixed guide keeps many choices pointed the same way.
- Use when: the message is a purpose or measure that guides decisions. Avoid when: there are several equal goals.
- SVG: a star at the top labelled `{{GUIDE}}`; several small paths below all bending toward it.
- Image scene: travellers at night on different paths, all looking up at one bright star.

## Momentum and chain reactions

**11. Flywheel (S9)**
- Says: many small pushes build momentum until the wheel turns on its own.
- Use when: repeated effort compounds. Avoid when: the gains do not build on each other.
- SVG: a large wheel with a curved arrow around it; up to five `{{PUSH}}` labels on the rim.
- Image scene: a person pushing a huge heavy wheel that is starting to spin faster.

**12. Snowball (S11)**
- Says: something small grows faster and faster as it rolls.
- Use when: growth or risk accelerates. Avoid when: growth is steady or linear.
- SVG: a slope with three snowballs, small to large, labelled `{{START}}` and `{{RESULT}}`.
- Image scene: a snowball rolling down a long hill, growing larger as it goes.

**13. Dominoes (S5)**
- Says: one event sets off a chain of others.
- Use when: the message is knock-on effects. Avoid when: the effects are independent.
- SVG: a row of domino rectangles, the first tipping; each may carry an `{{EVENT}}` label. Carries exact labels.
- Image scene: a long row of dominoes, the first one falling into the next.

**14. Tipping point (S6)**
- Says: small changes build up until the system flips.
- Use when: a threshold is near. Avoid when: change is gradual with no threshold.
- SVG: a seesaw with weights piling on one side; the pivot labelled `{{THRESHOLD}}`.
- Image scene: a seesaw on the edge of tipping as one more small weight lands on it.

**15. Perfect storm (S22)**
- Says: several separate factors meet and together cause a crisis.
- Use when: the cause is a combination, not one thing. Avoid when: one cause dominates.
- SVG: three cloud shapes converging on a small boat; each cloud labelled `{{FACTOR}}`.
- Image scene: a small boat where three storm fronts meet over a dark sea.

## Flow and capacity

**16. Funnel (S7)**
- Says: many go in at the top and fewer come out at each stage.
- Use when: the message is drop-off between stages. Avoid when: numbers do not fall.
- SVG: a funnel of stacked bands narrowing downward, each band labelled `{{STAGE}}`. Carries exact labels.
- Image scene: many small balls poured into a wide funnel, a few coming out the narrow end.

**17. Bottleneck (S8)**
- Says: one narrow point limits the whole flow.
- Use when: a single constraint slows everything. Avoid when: the slowdown is spread out.
- SVG: a bottle on its side; many dots inside, few passing the neck labelled `{{CONSTRAINT}}`.
- Image scene: traffic backed up on a wide road that narrows to one lane.

**18. Bathtub (S19)**
- Says: the level depends on what flows in and what drains out, not the inflow alone.
- Use when: people push inflow and ignore loss (staff, customers, backlog). Avoid when: there is no build-up.
- SVG: a tub with a tap labelled `{{INFLOW}}`, a drain labelled `{{OUTFLOW}}`, water level `{{STOCK}}`.
- Image scene: a bathtub filling from a tap while water drains out of the plughole.

## Balance and tension

**19. Scales (S28)**
- Says: two sets of factors are weighed against each other.
- Use when: a trade-off or a case for and against. Avoid when: one side is trivial.
- SVG: a balance beam on a stand; a pan each side labelled `{{SIDE_A}}` and `{{SIDE_B}}`.
- Image scene: an old brass balance scale with a pan on each side.

**20. Tug of war (S21)**
- Says: two groups pull in opposite directions and the rope barely moves.
- Use when: the message is conflicting goals. Avoid when: the groups actually agree.
- SVG: a rope with a centre marker; a team figure at each end labelled `{{GROUP_A}}` and `{{GROUP_B}}`.
- Image scene: two teams straining at opposite ends of a rope.

## Structure and parts

**21. Silos (S12)**
- Says: each group works inside its own walls and nobody sees across.
- Use when: handoffs fail between teams. Avoid when: the teams already share work well.
- SVG: three tall silo shapes side by side, each labelled `{{GROUP}}`; a gap with a question mark above labelled `{{WHOLE}}`.
- Image scene: three tall farm silos standing apart in a field, with no bridge between them.

**22. Bridge (S20)**
- Says: a connection joins two places that were apart.
- Use when: the message is closing a gap between groups or states. Avoid when: the gap is not the point.
- SVG: two cliffs labelled `{{FROM}}` and `{{TO}}`; a bridge between them labelled `{{CONNECTION}}`.
- Image scene: a strong bridge spanning a deep gap between two cliffs.

**23. Jigsaw puzzle (S25)**
- Says: the parts fit together into one picture, and one piece may be missing.
- Use when: the message is how parts combine, or a missing piece. Avoid when: the parts do not depend on each other.
- SVG: four interlocking pieces labelled `{{PART}}`, one gap labelled `{{MISSING}}`.
- Image scene: a nearly complete jigsaw puzzle with one piece missing.

**24. Building blocks (S27)**
- Says: each layer stands on the one below it.
- Use when: capabilities build in order. Avoid when: the parts are independent.
- SVG: stacked rectangles, bottom to top, each labelled `{{LAYER}}`. Carries exact labels.
- Image scene: a tower of wooden blocks built layer by layer.

**25. Keystone (S16)**
- Says: one piece holds the whole structure; remove it and the rest falls.
- Use when: one person, system or decision is critical. Avoid when: the load is shared.
- SVG: a stone arch; the top centre stone highlighted and labelled `{{KEY}}`.
- Image scene: a stone arch with its central keystone lit.

**26. Tree with roots (S1)**
- Says: what shows above ground depends on roots nobody sees.
- Use when: visible results rest on hidden foundations. Avoid when: the message is speed.
- SVG: a trunk and canopy labelled `{{RESULTS}}`; roots below a ground line labelled `{{FOUNDATIONS}}`.
- Image scene: a large tree with its roots shown spreading deep below the soil.

**27. Seed to harvest (S1)**
- Says: what you plant now grows slowly and pays later.
- Use when: an early investment with a delayed return. Avoid when: the result must come now.
- SVG: three stages left to right, seed, sprout, full plant, labelled `{{NOW}}` and `{{LATER}}`.
- Image scene: a row showing a seed, a small sprout and a full grown plant.

## Risk and protection

**28. Swiss cheese (S4)**
- Says: every defence has holes; harm gets through only when the holes line up.
- Use when: layered controls and how failures slip through. Avoid when: there is one control.
- SVG: four slices in a row, each with holes; an arrow through aligned holes labelled `{{HAZARD}}`.
- Image scene: slices of Swiss cheese lined up, a beam of light passing through holes that align.

**29. Safety net (S26)**
- Says: if something falls, this catches it.
- Use when: a fallback or support. Avoid when: the aim is to prevent the fall.
- SVG: a figure on a high wire labelled `{{RISK}}`; a net below labelled `{{SUPPORT}}`.
- Image scene: a tightrope walker high above a wide safety net.

## Choosing and thinking

**30. Low-hanging fruit (S15)**
- Says: the easy wins are within reach now.
- Use when: the message is quick wins first. Avoid when: it could sound dismissive of hard work.
- SVG: a tree with fruit low and high; the low fruit labelled `{{QUICK_WIN}}`.
- Image scene: a fruit tree with ripe fruit hanging low within easy reach.

**31. Ladder of inference (S18)**
- Says: people climb from data to conclusions in steps they do not notice.
- Use when: the message is checking assumptions. Avoid when: the audience wants a result, not reflection.
- SVG: a ladder; rungs from bottom to top labelled with the user's steps. Carries exact labels.
- Image scene: a person climbing a tall ladder above a pile of papers.

## Reference: take-away.md

# Take-away template

Deliver these parts in this order. Every part is present in every run; the lines in brackets
say what goes there in each allowed case.

```text
**The message:** {{ONE_SENTENCE_IN_THE_USER'S_WORDS}}

**Metaphor:** {{NAME}}, chosen by {{you | me, after your call}}. {{ONE_LINE_WHY_IT_FITS}}
   [Diagram ladder: **Diagram form:** {{flowchart | road with milestones | ...}}, chosen by ...]

**Rung:** {{ONE_LINE: which rung and why, e.g. "You asked for SVG, so the SVG is below."}}

**The visual:**
   [image rung: the generated image]
   [SVG rung: the file path or artifact, or one svg code block with "save this as visual.svg"]
   [spec rung: the visual spec block from drawing.md]

**Text form:** [diagram: numbered list, tree or table] [metaphor: **Alt text:** one sentence]

**Caption:** {{ONE_SENTENCE_BUILT_FROM_THE_USER'S_WORDS}}

**Image prompt:** [metaphor: the prompt, ready to paste]
   [diagram: "No image prompt: generated images corrupt labels."]

**To confirm:** {{each gap, one per line}} [or "Nothing to confirm."]

**Your next three moves:** three items, each with owner, first action this week, observable result.
```

If a user's word holds `|` or a line break and goes into a Markdown table, write `\|` and
`<br>`. The take-away itself uses no table.

## Worked example

Opening message: "Visual for my team update. New starters wait weeks between signing the offer
and their first day, and we lose some of them in that gap." The user picked Bridge from
Bridge, Stepping stones and Safety net. The host had no file tool and no image tool.

**The message:** New starters wait weeks between signing the offer and their first day, and we lose some of them in that gap.

**Metaphor:** Bridge, chosen by you. It shows the gap between two points and asks what should span it.

**Rung:** There is no image tool or file tool here, so the SVG is in a code block for you to save as `visual.svg`.

**The visual:**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" role="img" font-family="sans-serif" font-size="18">
  <title>Two cliffs, signing the offer and first day, with a gap between them and no bridge yet.</title>
  <rect width="800" height="450" fill="#ffffff"/>
  <text x="400" y="40" text-anchor="middle" font-size="24" font-weight="bold">We lose some new starters in the gap</text>
  <path d="M0,200 L250,200 L250,450 L0,450 z" fill="#c9d6c1"/>
  <path d="M550,200 L800,200 L800,450 L550,450 z" fill="#c9d6c1"/>
  <text x="125" y="185" text-anchor="middle">Signing the offer</text>
  <text x="675" y="185" text-anchor="middle">First day</text>
  <path d="M250,200 Q400,150 550,200" fill="none" stroke="#999" stroke-width="3" stroke-dasharray="10 8"/>
  <text x="400" y="240" text-anchor="middle">Weeks of waiting</text>
</svg>
```

**Text form:** **Alt text:** Two cliffs, signing the offer and first day, with a gap between them and no bridge yet.

**Caption:** New starters wait weeks between signing the offer and their first day, and we lose some of them in that gap.

**Image prompt:** Two cliffs with a deep gap between them and a dotted outline where a bridge could go. Clean flat illustration, simple shapes, calm colours, plain light background, wide 16:9 frame. No words, no letters, no numbers, no labels, no logos, no signs with writing.

**To confirm:** How many weeks, and how many new starters are lost. The picture says neither.

**Your next three moves:**
1. You: show the visual to one team member this week without explaining it and ask what it says. Result: their words match the message, or you know what to change.
2. You: put it on the update slide this week and view it at presentation size. Result: every label reads at a glance.
3. You: save the SVG beside the slide file today. Result: anyone can edit the labels later.

## Sources

# Sources

All entries retrieved 29 September 2026.

[S1] Conceptual metaphor. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Conceptual_metaphor

[S2] Visual metaphor. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Visual_metaphor

[S3] Image schema. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Image_schema

[S4] Swiss cheese model. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Swiss_cheese_model

[S5] Domino effect. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Domino_effect

[S6] Tipping point (sociology). (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Tipping_point_(sociology)

[S7] Purchase funnel. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Purchase_funnel

[S8] Theory of constraints. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Theory_of_constraints

[S9] Collins, J. (n.d.). *The flywheel effect*. Jim Collins. Retrieved September 29, 2026, from https://www.jimcollins.com/concepts/the-flywheel.html

[S10] Ecochallenge.org. (n.d.). *Iceberg model*. Retrieved September 29, 2026, from https://ecochallenge.org/iceberg-model/

[S11] Snowball effect. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Snowball_effect

[S12] Silo mentality. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Silo_mentality

[S13] Elephant in the room. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Elephant_in_the_room

[S14] Blind men and an elephant. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Blind_men_and_an_elephant

[S15] Low-hanging fruit. (n.d.). In *Wiktionary*. Retrieved September 29, 2026, from https://en.wiktionary.org/wiki/low-hanging_fruit

[S16] Keystone species. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Keystone_species

[S17] Technology roadmap. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Technology_roadmap

[S18] Ladder of inference. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Ladder_of_inference

[S19] Stock and flow. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Stock_and_flow

[S20] Bridge the gap. (n.d.). In *Wiktionary*. Retrieved September 29, 2026, from https://en.wiktionary.org/wiki/bridge_the_gap

[S21] Tug of war. (n.d.). In *Wiktionary*. Retrieved September 29, 2026, from https://en.wiktionary.org/wiki/tug_of_war

[S22] Perfect storm. (n.d.). In *Wiktionary*. Retrieved September 29, 2026, from https://en.wiktionary.org/wiki/perfect_storm

[S23] Crossroads. (n.d.). In *Wiktionary*. Retrieved September 29, 2026, from https://en.wiktionary.org/wiki/crossroads

[S24] North star. (n.d.). In *Wiktionary*. Retrieved September 29, 2026, from https://en.wiktionary.org/wiki/north_star

[S25] Jigsaw puzzle. (n.d.). In *Wiktionary*. Retrieved September 29, 2026, from https://en.wiktionary.org/wiki/jigsaw_puzzle

[S26] Safety net. (n.d.). In *Wiktionary*. Retrieved September 29, 2026, from https://en.wiktionary.org/wiki/safety_net

[S27] Building block. (n.d.). In *Wiktionary*. Retrieved September 29, 2026, from https://en.wiktionary.org/wiki/building_block

[S28] Tip the scales. (n.d.). In *Wiktionary*. Retrieved September 29, 2026, from https://en.wiktionary.org/wiki/tip_the_scales

[S29] Stepping stone. (n.d.). In *Wiktionary*. Retrieved September 29, 2026, from https://en.wiktionary.org/wiki/stepping_stone

[S30] Launch pad. (n.d.). In *Wiktionary*. Retrieved September 29, 2026, from https://en.wiktionary.org/wiki/launch_pad

[S31] Moving target. (n.d.). In *Wiktionary*. Retrieved September 29, 2026, from https://en.wiktionary.org/wiki/moving_target

[S32] World Wide Web Consortium. (2018). *Scalable Vector Graphics (SVG) 2* (W3C Candidate Recommendation). Retrieved September 29, 2026, from https://www.w3.org/TR/SVG2/

[S33] MDN contributors. (n.d.). *\<script\>* (SVG element). In *MDN Web Docs*. Retrieved September 29, 2026, from https://developer.mozilla.org/en-US/docs/Web/SVG/Element/script

[S34] Mermaid. (n.d.). Flowcharts syntax. In *Mermaid documentation*. Retrieved September 29, 2026, from https://mermaid.js.org/syntax/flowchart.html
