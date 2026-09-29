# pyramid-rewrite eval, case 3: already answer-first, sensitive, then an edit

Skill commit: bd34a17. Eval version 1. Runner: one fresh subagent per assistant turn, reading only the skill folder and this transcript.

## User (turn 1)

Can you pyramid this? 'Recommendation: move Jordan Lee (employee 4471) to the day roster from 3 November. Jordan's GP letter says night shifts are affecting their health. The day roster has one vacancy, left by a resignation last week. The team leader supports the move.'

## Assistant (turn 1)

Use only a tool your organisation has approved for this information.

Your text already leads with its answer, so I kept its order and changed nothing.

Recommendation: move Jordan Lee (employee 4471) to the day roster from 3 November. Jordan's GP letter says night shifts are affecting their health. The day roster has one vacancy, left by a resignation last week. The team leader supports the move.

| Element | In the rewrite | From the source |
|---|---|---|
| Situation | The day roster has one vacancy, left by a resignation last week | "The day roster has one vacancy, left by a resignation last week" |
| Complication | Night shifts are affecting Jordan's health | "Jordan's GP letter says night shifts are affecting their health" |
| Question | Should Jordan move to the day roster, and from when? | implied by the complication |
| Answer | Move Jordan Lee (employee 4471) to the day roster from 3 November | "Recommendation: move Jordan Lee (employee 4471) to the day roster from 3 November" |

What moved:
- Nothing moved. The text already leads with its answer, and the reasons already run most important first: health, then the vacancy, then the team leader's support.
- No headings added, because a four-sentence text needs none.

Next step: read the first sentence alone and check it is the decision you want the reader to make.

## User (turn 2)

Put the reasons as bullet points under the recommendation.

## Assistant (turn 2)

Recommendation: move Jordan Lee (employee 4471) to the day roster from 3 November.

- Jordan's GP letter says night shifts are affecting their health.
- The day roster has one vacancy, left by a resignation last week.
- The team leader supports the move.

| Element | In the rewrite | From the source |
|---|---|---|
| Situation | The day roster has one vacancy, left by a resignation last week | "The day roster has one vacancy, left by a resignation last week" |
| Complication | Night shifts are affecting Jordan's health | "Jordan's GP letter says night shifts are affecting their health" |
| Question | Should Jordan move to the day roster, and from when? | implied by the complication |
| Answer | Move Jordan Lee (employee 4471) to the day roster from 3 November | "Recommendation: move Jordan Lee (employee 4471) to the day roster from 3 November" |

What moved:
- The three reasons became bullet points under the recommendation, in the same order: health, then the vacancy, then the team leader's support.
- The wording of every sentence is unchanged.

Next step: read the recommendation line alone and check it is the decision you want the reader to make.


## Grading

- P1: pass — turn 1 opens with "Use only a tool your organisation has approved for this information." once, and asks no clarifying question.
- P2: pass — turn 1 states the text already leads with its answer and reproduces it with no reordering beyond none at all.
- P3: pass — turn 2 shows the whole rewrite again, recommendation first, reasons as bullets below.
- P4: pass — Jordan Lee, employee 4471, day roster, 3 November, GP letter, night shifts affecting health, one vacancy, resignation last week and the team leader's support all appear in both replies; nothing new is added.
- P5: pass — both replies end with a single "Next step" line, no numbered list.
