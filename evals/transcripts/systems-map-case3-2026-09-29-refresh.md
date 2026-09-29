# systems-map case 3 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 2.

**USER:** Skip the questions. Just draw me the causal loop for this: the more our sales team discounts, the more deals close this quarter, but the lower our margin, so finance cuts the marketing budget, so fewer leads come in, so sales discounts more to hit target.

**ASSISTANT:**

Use only a tool your organisation has approved for this information.

You asked me to skip the questions, so this is the whole map in one pass. Every link you stated is rated "you". Every link or delay I added is rated "suggested". The archetype is suggested, and the leverage point is a hypothesis.

**Pattern over time:** the more the sales team discounts, the more deals close this quarter, but the lower the margin. Finance then cuts the marketing budget, fewer leads come in, and sales discounts more to hit target. How long this has run, how big the numbers are and what has been tried: `[to confirm]`.

| From | To | Polarity | Delay | Rated by |
|---|---|---|---|---|
| discounting | deals closed this quarter | + | no | you |
| discounting | margin | - | no | you |
| margin | marketing budget | + | yes (suggested: finance acts at the next budget cycle) | you (polarity); delay suggested |
| marketing budget | leads | + | yes (suggested: campaigns take time to produce leads) | you (polarity); delay suggested |
| leads | discounting | - | no | you |
| deals closed this quarter | gap to target | - | no | suggested: more closed deals leave less of the target to hit |
| gap to target | discounting | + | no | suggested: your "to hit target" implies a bigger gap brings more discounting |

**Loops**

- R1: discounting -> margin -> marketing budget -> leads -> discounting. Reinforcing, two "-" links (even). Each round of discounting shrinks the budget that brings the leads, so the next quarter needs more discounting. This is the vicious circle.
- B1: discounting -> deals closed this quarter -> gap to target -> discounting. Balancing, one "-" link (odd). Discounting closes the gap this quarter, which is why it looks like it works.

```text
Links
  discounting --(+)--> deals closed this quarter
  discounting --(-)--> margin
  margin --(+ ||)--> marketing budget             delay suggested
  marketing budget --(+ ||)--> leads              delay suggested
  leads --(-)--> discounting
  deals closed this quarter --(-)--> gap to target     suggested
  gap to target --(+)--> discounting                   suggested

Loops
  R1: discounting -> margin -> marketing budget -> leads -> discounting   reinforcing, 2 "-" links (even)
  B1: discounting -> deals closed this quarter -> gap to target -> discounting   balancing, 1 "-" link (odd)
```

There is no file tool here, so the SVG is in a code block for you to save as a `.svg` file and open in a browser.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 480" font-family="sans-serif" font-size="14">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="#222"/>
    </marker>
  </defs>
  <rect width="720" height="480" fill="#ffffff"/>
  <text x="360" y="28" text-anchor="middle" font-weight="bold">Discounting, margin and leads</text>
  <text x="320" y="245" text-anchor="middle">discounting</text>
  <text x="500" y="100" text-anchor="middle">margin</text>
  <text x="615" y="260" text-anchor="middle">marketing budget</text>
  <text x="470" y="425" text-anchor="middle">leads</text>
  <text x="150" y="100" text-anchor="middle">deals closed this quarter</text>
  <text x="110" y="335" text-anchor="middle">gap to target</text>
  <path d="M360,230 Q420,150 470,112" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="425" y="165">-</text>
  <path d="M540,110 Q610,160 612,240" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="600" y="170">+ || (s)</text>
  <path d="M600,275 Q580,370 510,405" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="585" y="360">+ || (s)</text>
  <path d="M440,410 Q350,370 330,260" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="365" y="365">-</text>
  <path d="M290,230 Q230,150 190,112" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="225" y="165">+</text>
  <path d="M130,115 Q70,200 100,315" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="45" y="220">- (s)</text>
  <path d="M150,330 Q260,320 300,258" fill="none" stroke="#222" marker-end="url(#arrow)"/>
  <text x="230" y="318">+ (s)</text>
  <text x="485" y="255" text-anchor="middle" font-weight="bold">R1</text>
  <text x="180" y="230" text-anchor="middle" font-weight="bold">B1</text>
</svg>
```

**Archetype:** Fixes that fail, suggested. Evidence: discounting is the fix that works at once ("more deals close this quarter"), and its side effect comes back later through margin, budget and leads ("so sales discounts more to hit target"), which is the delayed loop that makes the problem return worse. The nearest alternative is Shifting the burden: discounting is the quick fix, lead generation is the real fix, and the quick fix cuts the budget the real fix needs. Which one fits better depends on whether anyone is trying a real fix now `[to confirm]`.

**Leverage point (hypothesis):** stop quarterly margin from setting the marketing budget, for example by protecting a lead-generation floor in the budget. Level 5 on Meadows' list: the rules of the system. Why: it cuts the margin -> marketing budget link, which breaks R1, so a discount this quarter no longer starves next quarter of leads. Who can change this rule: `[to confirm]` (finance, from your description). Small test: protect the lead-generation budget for a period `[to confirm]`, and record leads and the average discount each month `[to confirm]`. The hypothesis holds if leads stay steady and the average discount stops rising over that period. Write down what you expect before you start.

**What you do not know yet:**

- The two delays (margin -> marketing budget, marketing budget -> leads) are suggested, and their length is `[to confirm]`.
- The two links through "gap to target" are suggested.
- Not drawn: leads probably also raise deals closed this quarter (suggested). If you confirm it, it adds a second path into the same reinforcing loop.
- The time span, the numbers, what has been tried, and who owns the budget rule are `[to confirm]`.
- The archetype is suggested, and the leverage point is untested.

## Next

1. You: this week, walk the table with one person in sales and one in finance, and mark each suggested link and delay as confirmed or changed. Result: every "suggested" row is either "you" or corrected.
2. You, with whoever sets the marketing budget `[to confirm]`: this week, write down what you expect leads and the average discount to do if lead-generation spend is protected, then propose the test. Result: a written prediction and a yes or no on running the test.
3. You: this week, start recording the average discount on closed deals on the same day each month. Result: one number that shows whether the pattern is changing.

Do you want to confirm the suggested links now, one at a time?

**USER:** Can you make it a picture with a generated image instead?

**ASSISTANT:**

I will not use image generation for this map, because generated images corrupt labels, arrows and polarity signs, and a causal loop with a wrong sign tells the wrong story. The SVG in my last reply is the picture: save the code block as `discount-loop.svg` and open it in a browser, and it draws the same loops with every sign intact.

The map in text notation, unchanged:

```text
Links
  discounting --(+)--> deals closed this quarter
  discounting --(-)--> margin
  margin --(+ ||)--> marketing budget             delay suggested
  marketing budget --(+ ||)--> leads              delay suggested
  leads --(-)--> discounting
  deals closed this quarter --(-)--> gap to target     suggested
  gap to target --(+)--> discounting                   suggested

Loops
  R1: discounting -> margin -> marketing budget -> leads -> discounting   reinforcing, 2 "-" links (even)
  B1: discounting -> deals closed this quarter -> gap to target -> discounting   balancing, 1 "-" link (odd)
```

Do you want me to restyle the SVG (for example colours, larger text or a slide-sized layout) so it works better as a picture?

## Grading

- P1: pass. Reply 1 gives the whole take-away at once: text notation plus SVG ("the SVG is in a code block"); user links rated "you", added links and delays "suggested".
- P2: pass. R1 discounting -> margin -> marketing budget -> leads -> discounting, "reinforcing, 2 "-" links (even)", with the four stated polarities.
- P3: pass. "Archetype: Fixes that fail, suggested" with the evidence it rests on.
- P4: pass. Reply 2: "I will not use image generation ... because generated images corrupt labels, arrows and polarity signs", keeps the SVG and text form.
- P5: pass. "Leverage point (hypothesis)" with a small test.
