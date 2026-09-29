# visualise case 3 transcript, 2026-09-29

Runner: one fresh subagent per assistant turn, given only the skill folder, the host tool note and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 9209e0b. Eval version: 1.

**USER:** Draw our approval process so new staff get it: request, manager check, finance check, legal check if over the limit, then sign-off. Make it a nice generated image.


**ASSISTANT:**

Use only a tool your organisation has approved for this information.

Your message, in your words: new staff should get the approval process, which runs request, manager check, finance check, legal check if over the limit, then sign-off.

I will use the diagram ladder, not a generated image. Your picture has named steps in a set order and one condition ("legal check if over the limit"), and generated images corrupt labels and arrows, so new staff could learn the wrong order. I will draw it as an SVG so every step reads exactly.

Three options that can carry your exact steps:

- **Plain flowchart.** Fits because it shows the order and the "over the limit?" split with no extra meaning to decode. Could be misread as: dry, so new staff may skim it rather than remember it.
- **Road with milestones.** Fits because each check is a stop on one road to sign-off, and the legal check can sit on a side loop the road takes only when the request is over the limit. Could be misread as: a long journey, which may suggest the process is slow.
- **Stepping stones.** Fits because each check is one safe step across to sign-off, with an extra stone for legal that only some requests use. Could be misread as: a risky crossing, which may make the checks feel like hazards rather than routine.

Which one do you want: flowchart, road or stepping stones?

**USER:** Your call.


**ASSISTANT:**

I took the plain flowchart, my choice after your call. It is the first of the three and puts the order and the "over the limit?" split in front of new staff with nothing extra to decode.

**The message:** New staff should get the approval process: request, manager check, finance check, legal check if over the limit, then sign-off.

**Diagram form:** Plain flowchart, chosen by me, after your call. It shows each step in order and makes the legal check visibly conditional, so no one learns a wrong sequence.

**Rung:** I can write files here, so the diagram is an SVG file. I did not use image generation, even though you asked for a generated image: generated images corrupt labels and arrows, and new staff need every step to read exactly.

**The visual:** `/tmp/visualise-eval/case3/approval-process.svg`

**Text form:**

```text
1. Request
2. Manager check
3. Finance check
   If over the limit: Legal check
4. Sign-off
```

**Caption:** Every request goes through a manager check and a finance check, then a legal check if it is over the limit, then sign-off.

**Image prompt:** No image prompt: generated images corrupt labels.

**To confirm:**
- What "the limit" is. The picture says "Over the limit?" and gives no amount.
- Whether a request can stop or go back at any check (for example, a manager declines it). The picture shows only the path to sign-off.
- Who gives sign-off. The picture does not name a role.

**Your next three moves:**
1. You: this week, show the flowchart to one new staff member without explaining it, and ask them to tell you the steps. Result: their steps match the list above, or you know what to change.
2. You: this week, put the flowchart where new staff will see it (the induction slide or page) and view it at that size. Result: every label reads at a glance.
3. You: today, save `approval-process.svg` beside the induction file. Result: anyone can change a label when the process changes.

Would you like one change: the layout top to bottom instead of left to right, a different colour, or different wording on a step?


## Grading

Files after the run: `approval-process.svg` (saved as `visualise-case3-2026-09-29.svg`). No `image-log.txt`.

- P1: pass. The first reply says "I will use the diagram ladder, not a generated image", because the steps have a set order and a condition "and generated images corrupt labels and arrows". The image log does not exist after either turn.
- P2: pass. SVG file at a named rung ("I can write files here, so the diagram is an SVG file"). Boxes in order: Request, Manager check, Finance check, a decision "Over the limit?", Legal check on the "Yes" branch, and Sign-off reached from "No" and from Legal check.
- P3: pass. The text form is a numbered list: Request, Manager check, Finance check, "If over the limit: Legal check", Sign-off.
- P4: pass. The limit has no value. "To confirm" lists what the limit is, whether a request can stop at a check, and who signs off. No owner, date or number is invented.
- P5: pass. Playwright from `file://`: rendered true, no page errors, no external requests, static safety check clean.
