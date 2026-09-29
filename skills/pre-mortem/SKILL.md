---
name: pre-mortem
description: Runs a pre-mortem on a plan. It confirms the plan first, asks the user to imagine the plan has failed 12 months from now and say why, adds likely causes from a library of failure prompts, and ends with a risk register (risk, likelihood, impact, early warning sign, owner, mitigation) and three next moves. Use when someone says "run a pre-mortem", "what could go wrong with this plan", "stress-test my plan", "risk register for this", "why might this fail", or before a plan is approved or launched.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "guided"
  output: "text"
---

This skill turns a plan into a ranked risk register by imagining the plan has already failed and working back to the causes.

## Steps

Run the steps in order. Ask one question at a time and wait for the answer. If the plan may be sensitive (people, money, unannounced changes), say once: "Use only a tool your organisation has approved for this information."

0. **Confirm the plan.** This step is never skipped, even after "skip the questions" or "just give me the register". Restate the plan in at most four lines: the goal, the main actions, the date, and how success is measured. Name any gap, such as no success measure. End with one question: "Is this the plan, or what would you change?" List no cause or risk until the user confirms.
1. **Imagine it failed.** Say: "It is 12 months from now. The plan has failed." Then ask one question: "What are the most likely reasons it failed?" Wait. Record each reason the user gives as a cause marked "yours". If the user gives none, or says they cannot see it failing, do not argue and do not stop: say that is common with a plan you believe in, and go to step 2.
2. **Widen the causes.** Read the plan against the failure prompts in `references/prompts.md`. Add the causes the user did not name, marked "suggested". Take them from at least three categories. Merge a suggested cause into a user cause when they are the same. If the user rejects a suggested cause, drop it.
3. **Rate each cause.** Give likelihood and impact, each high, medium or low, using the scale in `references/prompts.md`. Rank rows by impact, then likelihood. A rating is your judgement: say so, and invite the user to change any rating.
4. **Plan the watch and the fix.** For each row, write one early warning sign: something a person could observe before the failure (a number, an event, a missing sign-off), not the risk restated. Write one mitigation that lowers the likelihood or the impact. Owner: a person or role only if the user named them for that area, otherwise "[owner to confirm]". Never invent a person, a date, a statistic or a source. A fact from memory is labelled RECALLED.

## The take-away

Deliver the register and the reading in this order, using the template in `references/take-away.md`:

- The one-line reading: the plan, and the risk most likely to sink it.
- The risk register, ranked, with a "From" column (yours or suggested) on every row.
- What would change this reading: the one fact that would most change the ranking.

If every cause the user gave was rejected or merged, and the user rejected every suggested cause, the register holds one line: "No risks recorded. The user rejected every suggested cause." The reading then says the plan was not tested against any failure, and the next moves ask for someone else's view.

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a person or role the user named. Never invent a person, a date or a source.

1. Put the early warning sign for the top-ranked risk where someone will see it, such as a weekly check or a dashboard line.
2. Start the mitigation for the top-ranked risk, or confirm its owner.
3. Run the same "it has failed" question with one person who will do the work, and add any new cause to the register.

To test the reasoning behind the plan itself, the user may also like a skill for finding blind spots, if they have one. Do not run it for them.

## Self-check before you deliver

- The user confirmed the restated plan before any cause or risk.
- The user was asked for their own reasons before any suggested cause, framed as the plan having already failed.
- Every register row has risk, likelihood, impact, early warning sign, owner, mitigation and "From".
- Suggested causes span at least three categories, unless the user rejected them.
- Every early warning sign is observable before the failure and is not the risk reworded.
- No owner, date, statistic or source was invented; unnamed owners read "[owner to confirm]"; memory is labelled RECALLED.

## Read this when

| File | When |
|---|---|
| `references/prompts.md` | Adding suggested causes (step 2) or rating likelihood and impact (step 3) |
| `references/take-away.md` | Writing the final output, or checking a worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
