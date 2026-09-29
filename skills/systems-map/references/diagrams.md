# Diagrams

Use the diagram ladder: SVG, then a Mermaid flowchart, then the text notation alone. Never use
image generation, even when asked. Always give the text notation as well.

Rules for every rung:

- Variable names exactly as in the links table, short.
- Every arrow carries its polarity: `+`, `-` or `?`. A delay adds `||` to the arrow label.
- Each loop carries its label (R1, B1, or "?1" for type unknown) near its centre.
- Mark a suggested link with " (s)" on its label, so the reader sees what is not confirmed.
- Insert user text as text. In SVG, escape `&`, `<`, `>` and `"`. In Mermaid, remove `"`,
  `|`, `[`, `]`, `(` and `)` from a node label (skill rule).
- No external requests, no remote fonts, no `<script>`, no event-handler attributes.

## Text notation (always)

One link per line, then one line per loop (S2).

```text
Links
  [from] --(+)--> [to]
  [from] --(-)--> [to]
  [from] --(+ ||)--> [to]        delay on this link
  [from] --(?)--> [to]           polarity [to confirm]

Loops
  R1: [a] -> [b] -> [c] -> [a]   reinforcing, [n] "-" links (even)
  B1: [a] -> [d] -> [a]          balancing, [n] "-" links (odd)
  ?1: [a] -> [e] -> [a]          type unknown until [e] -> [a] is confirmed
```

## Mermaid flowchart (S5)

```mermaid
flowchart LR
  A[{{VARIABLE_A}}] -->|+| B[{{VARIABLE_B}}]
  B -->|- delay| C[{{VARIABLE_C}}]
  C -->|+| A
  K[Loops: B1 balancing, one minus link]
```

## SVG (first rung)

Place the variables on a circle, one `<text>` each, and join them with curved paths that end
in the arrow marker. Put the polarity sign near each arrow head and the loop label in the
middle. Copy the frame and add one `<path>` and one sign per link.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" font-family="sans-serif" font-size="14">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#222"/>
    </marker>
  </defs>
  <rect width="640" height="480" fill="#ffffff"/>
  <text x="320" y="28" text-anchor="middle" font-weight="bold">{{TITLE}}</text>
  <text x="320" y="90" text-anchor="middle">{{VARIABLE_A}}</text>
  <text x="500" y="260" text-anchor="middle">{{VARIABLE_B}}</text>
  <text x="140" y="260" text-anchor="middle">{{VARIABLE_C}}</text>
  <path d="M360,100 Q480,140 495,240" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="470" y="170">+</text>
  <path d="M470,270 Q320,340 170,270" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="320" y="330" text-anchor="middle">- ||</text>
  <path d="M145,240 Q160,140 280,100" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="170" y="170">+</text>
  <text x="320" y="200" text-anchor="middle" font-weight="bold">B1</text>
</svg>
```
