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

Use the user's words for node labels. Remove `"`, `|`, `[`, `]`, `(`, `)`, `{` and `}` from a
label (skill rule). A condition goes on the edge label (S34).

```mermaid
flowchart LR
  A[{{STEP_1}}] --> B[{{STEP_2}}]
  B --> C{ {{DECISION}} }
  C -->|{{CONDITION_YES}}| D[{{STEP_3}}]
  C -->|{{CONDITION_NO}}| E[{{STEP_4}}]
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
