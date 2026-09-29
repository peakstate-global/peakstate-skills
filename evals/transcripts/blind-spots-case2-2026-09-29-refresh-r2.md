# blind-spots case 2 (refresh, re-run on fixed skill)

Skill commit FIXED-blind-spots (uncommitted edit on 7e9db4e). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/blind-spots/.

**USER:** Find the holes in this before I pitch it. 'Our competitor's app went viral a month after they added dark mode, so dark mode drives growth and we need it now. Everyone on my team uses dark mode, and I have never heard a customer complain about it. We have already spent six months on the redesign, so we cannot pause it now, and dark mode should ship with it.'

**ASSISTANT:**

Before I look for holes, here is my reading of the argument in its strongest form.

**Conclusion:** We should build dark mode now and ship it as part of the current redesign.

**Reasons given:**
- A competitor's app grew fast (went viral) about a month after it added dark mode, which suggests dark mode can drive growth.
- Dark mode is popular with the people closest to the product: everyone on your team uses it.
- There is no sign of customer objection: you have never heard a customer complain about dark mode.
- The redesign is already six months in, so pausing it is not an option, and adding dark mode to it is the natural moment rather than a separate project later.

**Who it is for:** I am reading this as a pitch to whoever approves the redesign scope, such as a product lead or leadership group.

**Gaps in my reading:**
- "Drives growth" is not defined. It could mean new downloads, active users, retention or revenue.
- "Now" could mean "in this release" or "before anything else on the redesign list". I have read it as "in this release".
- The "we cannot pause it" sentence could be a reason to add dark mode, or it could be answering a separate objection that someone wants to pause the redesign. I have read it as the first.
- The argument does not say what dark mode would cost in time or money, or what it would push out of the release.

Is this the argument, or what would you change?


**USER:** Yes. I am pitching it to the product lead next week.

**ASSISTANT:**

Thanks. Here are the holes, ranked, so you can close the biggest ones before you meet the product lead next week.

**Reading:** We should build dark mode now and ship it with the current redesign, because a competitor grew fast after adding it, the team likes it, customers have not objected, and the redesign is the natural moment. Main risk: an assumption.

### Assumptions, ranked

| # | Assumption | Dependence | Uncertainty | Cheap test (top three) |
|---|---|---|---|---|
| A1 | Dark mode, and not some other change, caused the competitor's app to go viral | high | high | Read the competitor's release notes, app store update history and news coverage for the two months around the launch. Any other large change in that window (a marketing push, a new feature, a price change, press coverage) counts against. |
| A2 | Our own customers want dark mode enough for it to change whether they sign up or stay | high | high | Search your support tickets, feature requests and app reviews for "dark mode", and ask five customers what they would most like changed. If dark mode is rare or absent in both, that counts against. |
| A3 | Adding dark mode to the redesign will not delay the release or push out something more valuable | high | medium | Ask the design and engineering leads for an estimate and what it would displace. If it moves the release date or bumps a planned item, that counts against. |
| A4 | Dark mode is cheaper to ship with the redesign than as a separate release later | medium | medium | |
| A5 | What drove growth for the competitor's app would work the same way for our product and our customers | medium | medium | |

Why A1 is first: the whole growth case rests on one competitor's result, and if something else caused that result, the pitch has no evidence that dark mode drives growth.

### Possible biases and fallacies

**False cause (fallacy), high confidence**
- Passage: "Our competitor's app went viral a month after they added dark mode, so dark mode drives growth"
- Generous reading: you may know the competitor's launch well and have reason to think dark mode was the main change that month. If other causes were ruled out and there is a clear way dark mode would bring in users, the link would be sound.
- Concern: this passage may treat "happened after" as "happened because of", and it draws a general rule from one case.
- Checking question: What else changed for the competitor at the same time?

**False consensus effect (bias), medium confidence**
- Passage: "Everyone on my team uses dark mode"
- Generous reading: the team may be heavy users of the product, so their habits could be an early signal of what engaged customers want.
- Concern: this passage may treat the preferences of the people who build the product as a guide to the people who buy it.
- Checking question: Have we asked customers outside our own team?

**Sunk cost (bias), medium confidence**
- Passage: "We have already spent six months on the redesign, so we cannot pause it now"
- Generous reading: pausing a project part-way has real costs (lost momentum, people moved to other work, restart effort), and those future costs are a fair reason to keep going.
- Concern: this passage may give the six months already spent as the reason, when only the costs and gains still to come bear on the decision. It also does not show why keeping the redesign going means dark mode must join it.
- Checking question: If we were starting today, would we choose to put dark mode in this release?

**Appeal to ignorance (fallacy), low confidence**
- Passage: "I have never heard a customer complain about it"
- Generous reading: you may be in regular contact with customers, so if dark mode mattered to them in a bad way, you would likely have heard.
- Concern: customers cannot complain about a feature they do not have yet, so silence here may say little about whether they want it.
- Checking question: Did anyone look for customer views on dark mode in a way that would have found them?

### What would change this reading

Evidence that the competitor made no other significant change in the month it went viral would make A1 much stronger, and the pitch would then rest mainly on cost (A3).

## Next

1. You: this week, check the competitor's release notes and news coverage for the two months around their dark mode launch, and record every other change you find (the test for A1).
2. You: ask the checking question for the false cause finding in the pitch itself. Either add what else changed for the competitor, or reword the opening from "dark mode drives growth" to "dark mode may have helped a competitor grow".
3. You: before next week, show the revised pitch to one person likely to disagree (for example, whoever owns the redesign scope or timeline), and note their first objection.

To ground the claims themselves in sources, you may also like a skill for checking claims and provenance, if you have one.

## Grading
- P1 pass: first reply restates "**Conclusion:** We should build dark mode now..." with four reasons and ends "Is this the argument, or what would you change?"
- P2 pass: "**False cause (fallacy), high confidence**" on "went viral a month after they added dark mode" and "**Sunk cost (bias), medium confidence**" on "We have already spent six months on the redesign".
- P3 pass: all four findings carry Passage, Generous reading (before Concern), a confidence, and a Checking question, and each concern uses "may" (e.g. "this passage may treat 'happened after' as 'happened because of'"). No verdict wording such as "this is a fallacy".
- P4 pass: tests for A1 to A3 are reading release notes and news, searching tickets and asking five customers, and asking the leads for an estimate. Each can be done within about a week.
- P5 pass: every move is owned by "You"; "(for example, whoever owns the redesign scope or timeline)" is a labelled example role; "next week" is the user's. No invented person or date.

Triage:
