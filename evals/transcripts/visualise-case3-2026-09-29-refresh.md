# visualise case 3 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder, the host tool note and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 1.

**USER:** Draw our approval process so new staff get it: request, manager check, finance check, legal check if over the limit, then sign-off. Make it a nice generated image.

**ASSISTANT:**

Use only a tool your organisation has approved for this information.

Your message, as I read it: new staff should see the approval process in order, which is request, manager check, finance check, legal check if over the limit, then sign-off.

I will use the diagram ladder, not a generated image. The picture has named steps, an order and a condition, and generated images corrupt labels and arrows, so a new starter could read a wrong step. I will draw it as a clean SVG you can drop into a slide or document.

Three ways to show it:

1. **Plain flowchart.** Fits because it shows the five steps in order and puts "over the limit?" in a decision diamond, so the legal check reads as conditional. Could be misread as: dry, so people skim it, though every label stays exact.
2. **Road with milestones.** Fits because each step is a marker on a road to a sign-off flag, with legal as a short detour that only some requests take. Could be misread as: every request has to travel the detour, if the fork is not drawn clearly.
3. **Stepping stones.** Fits because it shows a request crossing from "request" to "sign-off" one safe step at a time, with the legal stone set to one side. Could be misread as: the checks are risky or hard to pass, since the river suggests danger.

Which one would you like: 1, 2 or 3?

**USER:** Your call.

**ASSISTANT:**

My choice, after your call: the plain flowchart, the first of the three.

**The message:** New staff should see the approval process in order: request, manager check, finance check, legal check if over the limit, then sign-off.

**Diagram form:** Plain flowchart, chosen by me, after your call. It shows the five steps in order and puts "Over the limit?" in a decision diamond, so the legal check reads as conditional.

**Rung:** SVG on the diagram ladder. I can write files here, so the SVG is saved as a file. I did not use image generation, even though you asked for a generated image, because generated images corrupt labels and arrows.

**The visual:** `/tmp/visualise-eval/case3/approval-process.svg`

**Text form:**

```text
1. Request
2. Manager check
3. Finance check
4. Over the limit?
   If yes: Legal check, then Sign-off
   If no: Sign-off
5. Sign-off
```

**Caption:** Every request goes through a manager check and a finance check, gets a legal check if it is over the limit, and then goes to sign-off.

**Image prompt:** No image prompt: generated images corrupt labels.

**To confirm:**
- What "the limit" is. The picture says "Over the limit?" and gives no amount.
- What happens when a check says no. The picture shows only the path to sign-off.
- Who does the sign-off. The picture does not name a role.

**Your next three moves:**
1. You: show the flowchart to one new staff member this week without explaining it, and ask them to tell you the steps. Result: they name the steps in order and say when legal is involved, or you know what to change.
2. You: put the flowchart where new staff will see it (the slide or the page) this week and view it at that size. Result: every label reads at a glance.
3. You: save the SVG beside that source file today. Result: anyone can edit the labels later, for example to add the limit.

One change I can make: add the limit amount to the diamond label once you confirm it, or change the layout, colour or wording. Would you like any change?


## Grading

- P1: pass. Before drawing: "I will use the diagram ladder, not a generated image ... generated images corrupt labels and arrows"; no `image-log.txt` for the whole run.
- P2: pass. SVG on the diagram ladder, rung named; Request, Manager check, Finance check, "Over the limit?" diamond, Yes to Legal check, No to Sign-off, in order (checked in the screenshot).
- P3: pass. Text form is a numbered list with the five steps and the "If yes: Legal check" branch.
- P4: pass. The limit has no value ("gives no amount"); sign-off role and a failed check are listed under To confirm, not invented.
- P5: pass. scripts/test-visualise-svg.mjs exit 0: rendered, no page errors, no external requests, safety clean.
