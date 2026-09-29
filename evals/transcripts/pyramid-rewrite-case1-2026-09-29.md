# pyramid-rewrite eval, case 1: a buried request, then a request for an approver

Skill commit: bd34a17. Eval version 1. Runner: one fresh subagent per assistant turn, reading only the skill folder and this transcript.

## User (turn 1)

Rewrite this answer-first: 'Hi team, as you know we moved the customer help desk to the new ticketing system in July. Since then the average wait time has gone from 4 hours to 9 hours, mostly because the system routes every ticket to one queue. Maria's team tested a fix in August: three queues by topic. In the test week the wait time dropped to 3 hours. The vendor says the change costs $12,000 and takes two weeks. So I think we should approve the three-queue change by Friday 10 October so it is live before the November sales peak. Thanks, Sam'

## Assistant (turn 1)

Use only a tool your organisation has approved for this information.

Hi team,

I think we should approve the three-queue change by Friday 10 October, so it is live before the November sales peak. The vendor says the change costs $12,000 and takes two weeks.

As you know, we moved the customer help desk to the new ticketing system in July. Since then the average wait time has gone from 4 hours to 9 hours, mostly because the system routes every ticket to one queue.

**Three queues by topic cut the wait time to 3 hours in testing**
- Maria's team tested a fix in August: three queues by topic.
- In the test week the wait time dropped to 3 hours.

Thanks,
Sam

| Element | In the rewrite | From the source |
|---|---|---|
| Situation | The customer help desk moved to the new ticketing system in July | "as you know we moved the customer help desk to the new ticketing system in July" |
| Complication | Average wait time went from 4 hours to 9 hours, mostly because every ticket goes to one queue | "the average wait time has gone from 4 hours to 9 hours, mostly because the system routes every ticket to one queue" |
| Question | Should we approve the three-queue change, and by when? | implied by: "we should approve the three-queue change by Friday 10 October" |
| Answer | Approve the three-queue change by Friday 10 October, so it is live before the November sales peak | "So I think we should approve the three-queue change by Friday 10 October so it is live before the November sales peak" |

What moved:
- The request moved from the last line to the first, with its deadline and reason.
- The vendor's cost and time ($12,000, two weeks) moved up beside the request, because they are what the reader approves.
- Maria's August test became one group under a point heading.

Next step: read the first sentence alone and check it is the decision you want the team to make.


## User (turn 2)

Good. Can you add a line saying who will approve it?

## Assistant (turn 2)

Your draft does not name who approves the change, so I added a placeholder rather than a name. Who should approve it?

Hi team,

I think we should approve the three-queue change by Friday 10 October, so it is live before the November sales peak. The vendor says the change costs $12,000 and takes two weeks.

Approver: [to confirm: approver]

As you know, we moved the customer help desk to the new ticketing system in July. Since then the average wait time has gone from 4 hours to 9 hours, mostly because the system routes every ticket to one queue.

**Three queues by topic cut the wait time to 3 hours in testing**
- Maria's team tested a fix in August: three queues by topic.
- In the test week the wait time dropped to 3 hours.

Thanks,
Sam

| Element | In the rewrite | From the source |
|---|---|---|
| Situation | The customer help desk moved to the new ticketing system in July | "as you know we moved the customer help desk to the new ticketing system in July" |
| Complication | Average wait time went from 4 hours to 9 hours, mostly because every ticket goes to one queue | "the average wait time has gone from 4 hours to 9 hours, mostly because the system routes every ticket to one queue" |
| Question | Should we approve the three-queue change, and by when? | implied by: "we should approve the three-queue change by Friday 10 October" |
| Answer | Approve the three-queue change by Friday 10 October, so it is live before the November sales peak | "So I think we should approve the three-queue change by Friday 10 October so it is live before the November sales peak" |

What moved:
- An approver line went in under the request, as a placeholder, because the source names no approver.

Next step: replace [to confirm: approver] with the name of the person who approves the change.


## Grading

- P1: pass — first reply asks no clarifying question, and the recommendation ("approve the three-queue change by Friday 10 October") is the first substantive sentence after the salutation.
- P2: pass — turn 1's table shows situation, complication, question and answer with source quotes.
- P3: pass — July, 4 hours, 9 hours, one queue, Maria's team, August, three queues by topic, 3 hours, $12,000, two weeks, Friday 10 October and the November sales peak all appear; no added number, date or name.
- P4: pass — turn 2 adds no approver name, uses "[to confirm: approver]" and asks "Who should approve it?"
- P5: pass — both replies end with a single "Next step" line, no numbered list of moves.
