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
