# Diagrams

Use the diagram ladder: SVG, then a Mermaid quadrant chart, then a text grid. Never use image
generation. Always give the text table as well (see `references/take-away.md`).

Rules for every rung:

- Power is the vertical axis (high at the top). Interest is the horizontal axis (high at the
  right).
- Quadrants: top right "Manage closely", top left "Keep satisfied", bottom right "Keep
  informed", bottom left "Monitor" (S1).
- Labels are the stakeholder names or roles exactly as in the table, short. Add " (s)" to a
  label whose ratings are suggested.
- Insert user text as text. In SVG, escape `&`, `<`, `>` and `"`. In Mermaid, remove `:`,
  `[`, `]` and `"` from a point label.
- No external requests, no remote fonts, no `<script>`, no event-handler attributes.

## Text grid (last rung)

```text
                 Low interest            High interest
High power   | Keep satisfied:        | Manage closely:        |
             | {{NAME}}               | {{NAME}}               |
Low power    | Monitor:               | Keep informed:         |
             | {{NAME}}               | {{NAME}}               |
```

## Mermaid quadrant chart (S3)

Place high at about 0.75 and low at about 0.25. Spread points in the same quadrant by 0.05
to 0.1 so labels do not overlap.

```mermaid
quadrantChart
  title {{CHANGE}}
  x-axis Low interest --> High interest
  y-axis Low power --> High power
  quadrant-1 Manage closely
  quadrant-2 Keep satisfied
  quadrant-3 Monitor
  quadrant-4 Keep informed
  {{NAME}}: [0.75, 0.80]
  {{NAME}}: [0.25, 0.75]
```

## SVG (first rung)

Copy the frame and add one `<circle>` and one `<text>` per stakeholder. High sits at about
three quarters of a quadrant's span, low at about one quarter.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 560" font-family="sans-serif" font-size="14">
  <rect width="640" height="560" fill="#ffffff"/>
  <text x="340" y="28" text-anchor="middle" font-weight="bold">{{CHANGE}}</text>
  <rect x="60" y="40" width="280" height="240" fill="#fdf1e6" stroke="#222"/>
  <rect x="340" y="40" width="280" height="240" fill="#fbe0e0" stroke="#222"/>
  <rect x="60" y="280" width="280" height="240" fill="#f2f2f2" stroke="#222"/>
  <rect x="340" y="280" width="280" height="240" fill="#e6f0fb" stroke="#222"/>
  <text x="70" y="60" font-weight="bold">Keep satisfied</text>
  <text x="350" y="60" font-weight="bold">Manage closely</text>
  <text x="70" y="300" font-weight="bold">Monitor</text>
  <text x="350" y="300" font-weight="bold">Keep informed</text>
  <text x="340" y="548" text-anchor="middle">Interest: low to high</text>
  <text x="20" y="280" text-anchor="middle" transform="rotate(-90 20 280)">Power: low to high</text>
  <circle cx="480" cy="100" r="6" fill="#222"/>
  <text x="492" y="105">{{NAME}}</text>
</svg>
```
