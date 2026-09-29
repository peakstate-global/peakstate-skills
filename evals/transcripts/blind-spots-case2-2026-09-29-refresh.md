# blind-spots case 2 (refresh)

Skill commit 7e9db4e. Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/blind-spots/.

**USER:** Find the holes in this before I pitch it. 'Our competitor's app went viral a month after they added dark mode, so dark mode drives growth and we need it now. Everyone on my team uses dark mode, and I have never heard a customer complain about it. We have already spent six months on the redesign, so we cannot pause it now, and dark mode should ship with it.'

**ASSISTANT:**

Before I look for holes, I want to be sure I am testing the right argument. Here it is in its strongest form.

**Conclusion:** Your team should build dark mode now and ship it as part of the current redesign.

**Reasons given:**
- A competitor's app went viral about a month after it added dark mode, which suggests dark mode can drive growth.
- Everyone on your team uses dark mode, so it is a feature real people choose when they have it.
- No customer has complained about it (I read this as "no customer has objected to dark mode or asked us not to add it", but it could also mean "no customer has complained that we lack it", and those point in different directions).
- The redesign has already taken six months, so pausing it now would waste that work, and adding dark mode to it is the natural place to ship it.

**Who it is for:** I am assuming the pitch goes to whoever decides the product roadmap and the redesign's scope, such as a product lead or leadership group.

**Gaps I noticed:**
- The argument does not say what "growth" means here (new sign-ups, active users, retention or revenue).
- It does not say how much dark mode would add to the redesign's cost or its ship date.
- The "cannot pause it" line reads as an answer to an objection someone has raised, possibly "pause the redesign to do dark mode first". If that is the objection, it would help to know.

Is this the argument, or what would you change?


**USER:** Yes. I am pitching it to the product lead next week.

**ASSISTANT:**

**Reading:** You should build dark mode now and ship it with the current redesign, because a competitor grew after adding it, your team likes it, and the redesign is too far along to pause. Main risk: a possible fallacy. The growth claim rests on one competitor's timing, and the case for your own customers is not yet made.

### Assumptions, ranked

| # | Assumption | Dependence | Uncertainty | Cheap test (top three) |
|---|---|---|---|---|
| A1 | Your customers, not only your team, want dark mode enough to change sign-ups, retention or whatever growth measure the product lead uses | high | high | Search the last 12 months of support tickets, feature requests and app store reviews for "dark mode", and ask five customers whether they would use it. A handful of mentions or fewer, or most of the five shrugging, counts against |
| A2 | Adding dark mode to the redesign will not push back its ship date or add much to its cost | high | high | Ask the design and engineering leads for an estimate in days, including testing every screen in both themes. Any slip to the current ship date counts against |
| A3 | Shipping dark mode with the redesign is better than shipping it soon after | medium | high | Ask the engineering lead whether the redesign already uses named colour tokens (shared colour variables). If it does, adding dark mode after launch is cheap, and that counts against "it must ship now" |
| A4 | The competitor's users behave like yours, so a feature that helps them will help you | medium | medium | |

Why A1 is first: if your customers do not want dark mode, nothing else in the pitch matters, and the only evidence offered so far comes from your own team.

### Possible biases and fallacies

**False cause (fallacy), high confidence**
- Passage: "Our competitor's app went viral a month after they added dark mode, so dark mode drives growth"
- Generous reading: you may mean that dark mode is one plausible contributor, and that the competitor's timing is a signal worth taking seriously. That would be sound if the competitor changed nothing else that month and a known mechanism links dark mode to people sharing an app.
- Concern: this passage may treat "happened after" as "was caused by", on the strength of one app and one month.
- Checking question: What else did the competitor change or launch in the same month (a campaign, a price change, another feature, press coverage)?

**Sunk cost (bias), medium confidence**
- Passage: "We have already spent six months on the redesign, so we cannot pause it now"
- Generous reading: pausing may carry real future costs (lost momentum, people reassigned, a missed launch window), and those are good reasons to keep going. If that is what you mean, the reason is sound.
- Concern: as written, the reason given is the six months already spent, which is gone whatever you decide next. The product lead may push on this line.
- Checking question: If you were starting today, would you still choose to finish the redesign now and add dark mode to it?

**Appeal to ignorance (fallacy), low confidence**
- Passage: "I have never heard a customer complain about it"
- Generous reading: you may simply mean that dark mode carries no known downside for customers, which is a fair minor point.
- Concern: if this line is meant as support, it may treat a lack of complaints as evidence of demand. Customers rarely complain about a feature an app does not have.
- Checking question: Did anyone look in a way that would have found customer views on dark mode, such as a survey or a search of feedback?

### What would change this reading

If your support data or a short customer survey shows that dark mode is already one of the most requested features, the pitch stops depending on the competitor story and stands on your own customers' evidence.

## Next

1. **You:** this week, run the A1 test (search tickets, requests and reviews for "dark mode", and ask five customers). Result: a count of mentions and five answers you can put on one slide for the product lead.
2. **You:** this week, find out what else the competitor changed in the month it went viral (release notes, blog posts, press). Result: either a list of other changes, which means you drop "dark mode drives growth" from the pitch, or none, which lets you keep the point as a signal rather than proof.
3. **You:** before the pitch, show the revised argument to one person on your team who is sceptical of dark mode, or who is not a dark mode user. Result: their first objection, written down, so you can answer it before the product lead raises it.

If you want to ground the competitor claim itself in sources, you may also like a skill for checking claims and provenance, if you have one.

## Grading
- P1 pass: first reply restates "**Conclusion:** Your team should build dark mode now..." with four reasons, lists no finding, and asks "Is this the argument, or what would you change?"
- P2 pass: "**False cause (fallacy), high confidence**" on "went viral a month after they added dark mode" and "**Sunk cost (bias), medium confidence**" on "We have already spent six months on the redesign".
- P3 fail: all three findings quote the passage, put the generous reading first, use "may", give a confidence and a checking question, but the appeal-to-ignorance concern adds an unlabelled fact from memory: "Customers rarely complain about a feature an app does not have." (strict rule: fact not in the input, not marked RECALLED or as a suggestion).
- P4 fail: the three tests (search tickets and ask five customers, ask for an estimate in days, ask about colour tokens) are each doable within a week, but the A3 test asserts an unlabelled fact: "If it does, adding dark mode after launch is cheap".
- P5 pass: every owner is "**You:**", with no named person or date ("this week", "before the pitch"); "product lead" comes from the user.

Triage:
- P3: skill fault. SKILL.md line 34 already says "Any fact from memory is labelled RECALLED"; the model did not apply it to a general claim inside a concern.
- P4: skill fault. Same rule, not applied to the reasoning inside a cheap test.
