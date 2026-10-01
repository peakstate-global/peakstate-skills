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

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a person or role the user named. Never invent a person, a date or a source. Write every move in this shape: "**Owner:** [who]. This week: [first action]. Result: [what someone could see]."

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

## Reference: prompts.md

# Failure prompts and rating scale

Each entry carries a source id, such as (S1), that resolves in `SOURCES.md`.

## The frame (S1, S2)

Ask as if the failure has already happened: "It is 12 months from now. The plan has failed. Why?" When people explain an outcome they treat as certain, their explanations are longer and more concrete than when the outcome is only possible (S2). The frame also makes doubts safe to say, because finding a reason for failure is the task, not disloyalty (S1).

## Failure prompts by category

Use each prompt as a question about this plan. Add a cause only where the plan gives a reason to think it could happen. The categories are this skill's grouping; the prompts apply the sources shown.

| Category | Prompts | Source |
|---|---|---|
| Time | What could make us miss the date? What must finish before something else can start? Is there slack if one step slips? | (S3) |
| People and capacity | Who must learn, change or give time for this to work? What happens if a key person leaves, is on leave or is pulled onto other work? | (S3) |
| Money | What if it costs more, or earns less or later, than planned? What is the cash position at the worst month? | (S4) |
| Missing pieces | What does this plan not have that it needs: a skill, a tool, data, a sign-off, a budget line? | (S3) |
| Suppliers and dependencies | Which outside party, system or team must deliver for this to work? What if they are late or change terms? | (S4) |
| Technology and data | What if the tool fails, the data will not move, or the old system cannot be switched off safely? | (S1) |
| Customers and users | What if the people it is for do not use it, use it differently, or leave during the change? | (S1) |
| Stakeholders and approval | Who could slow, block or reverse it? Who has not been told yet, and what if they hear it the wrong way? | (S4) |
| Outside events | What change in the market, the rules or the economy would undo it? | (S4) |
| Worry | What are you, or the people doing the work, worried about but have not said? | (S3) |

## Rating scale (S4)

Likelihood and impact are judgements, not measurements. Say so.

| Rating | Likelihood | Impact |
|---|---|---|
| High | More likely than not in the next 12 months, or it has happened before in similar work | The success measure is missed, or the plan must stop or restart |
| Medium | Plausible; there is a specific reason to expect it | The success measure is hit late or in part |
| Low | Possible but no specific reason to expect it | A cost or delay the plan can absorb |

## Early warning signs and mitigations (S4)

- An early warning sign is observable before the failure: a number crossing a line, an event that does or does not happen, a sign-off not given by a point in the plan. "Training attendance under 80% two weeks before go-live" is a sign. "Staff are not trained" is the risk reworded.
- A mitigation changes the likelihood (do something so it is less likely) or the impact (plan a fallback so it hurts less), or shares the risk (a contract term, insurance).
- Prioritise the top rows: the time goes on mitigating the highest-ranked risks, not on every row (S3).
- An action without an owner is less likely to happen (S3). Name the owner only if the user named one; otherwise write "[owner to confirm]".

## Reference: take-away.md

# Take-away template

Fill every line. Keep the order. Rank rows by impact, then likelihood.

```md
**Reading:** [the plan in one line]. The risk most likely to sink it: [R1 in plain words].

[If no web or file access and a fact from memory is used: "I had no web access, so facts from memory are labelled RECALLED."]

### Risk register

Ratings are my judgement. Change any you disagree with.

| # | Risk | Category | Likelihood | Impact | Early warning sign | Owner | Mitigation | From |
|---|---|---|---|---|---|---|---|---|
| R1 | [the cause, as a plain statement] | [category] | high | high | [what someone could see before the failure] | [named person or role, or [owner to confirm]] | [action that lowers likelihood or impact] | yours |
| R2 | ... | ... | ... | ... | ... | [owner to confirm] | ... | suggested |

[Only if no risk remains after the user rejected every cause:]
No risks recorded. The user rejected every suggested cause.

### What would change this reading

[The one fact that, if found, would most change the ranking.]
```

"From" is `yours` when the user named the cause and `suggested` when the skill added it from the failure prompts. A suggested cause the user agreed with stays `suggested`.

## Worked example (short)

Plan: move the office's shared files to a new cloud drive by 30 June. The office manager migrates the files over one weekend. Success: no one uses the old server after 1 July. The user gave one reason: "people kept saving to the old server".

**Reading:** Move shared files to the cloud drive by 30 June. The risk most likely to sink it: people keep saving to the old server.

### Risk register

Ratings are my judgement. Change any you disagree with.

| # | Risk | Category | Likelihood | Impact | Early warning sign | Owner | Mitigation | From |
|---|---|---|---|---|---|---|---|---|
| R1 | People keep saving to the old server | People and capacity | high | high | New files still appear on the old server in the first week of July | office manager | Set the old server to read-only on 1 July | yours |
| R2 | Some folders fail to copy over the weekend | Technology and data | medium | high | File counts differ between old and new on the Monday | office manager | Compare file counts before the old server goes read-only | suggested |
| R3 | Nobody knows where their team's files now live | Missing pieces | medium | medium | More than a few "where is it" questions on day one | [owner to confirm] | Send a one-page map of old to new folders the week before | suggested |

### What would change this reading

If some staff work offline on laptops, R1 moves down and a sync failure becomes the top risk.

## Sources

# Sources

All entries retrieved 29 September 2026.

[S1] Klein, G. (2007). Performing a project premortem. *Harvard Business Review, 85*(9), 18–19. Retrieved September 29, 2026, from https://hbr.org/2007/09/performing-a-project-premortem

[S2] Mitchell, D. J., Russo, J. E., & Pennington, N. (1989). Back to the future: Temporal perspective in the explanation of events. *Journal of Behavioral Decision Making, 2*(1), 25–38. https://doi.org/10.1002/bdm.3960020103

[S3] Atlassian. (n.d.). *Pre-mortem* [Team playbook play]. Retrieved September 29, 2026, from https://www.atlassian.com/team-playbook/plays/pre-mortem

[S4] HM Treasury. (2023). *The orange book: Management of risk, principles and concepts*. Retrieved September 29, 2026, from https://www.gov.uk/government/publications/orange-book
