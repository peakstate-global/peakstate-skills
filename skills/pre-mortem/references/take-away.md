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
