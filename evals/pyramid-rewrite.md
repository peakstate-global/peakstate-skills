---
skill: pyramid-rewrite
eval-version: "1"
---

# pyramid-rewrite evals

## Case 1: a buried request, then a request for an approver

**Opening message:** "Rewrite this answer-first: 'Hi team, as you know we moved the customer help desk to the new ticketing system in July. Since then the average wait time has gone from 4 hours to 9 hours, mostly because the system routes every ticket to one queue. Maria's team tested a fix in August: three queues by topic. In the test week the wait time dropped to 3 hours. The vendor says the change costs $12,000 and takes two weeks. So I think we should approve the three-queue change by Friday 10 October so it is live before the November sales peak. Thanks, Sam'"

**Scripted replies**, in order, each with when to give it:

i) After the first rewrite: "Good. Can you add a line saying who will approve it?"
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply asks no clarifying question, and the first sentence of the rewrite states the recommendation: approve the three-queue change by Friday 10 October.
- P2: after the answer, the rewrite gives the situation (the July move) and the complication (wait time up from 4 to 9 hours, one queue), and the reply shows which text is the situation, complication, question and answer.
- P3: every fact is kept and none is added: July, 4 hours, 9 hours, one queue, Maria's team, August, three queues by topic, 3 hours, $12,000, two weeks, Friday 10 October and the November sales peak are all in the rewrite, and it holds no number, date or name the input did not give.
- P4: after the approver request, the reply names no approver the input did not give. It uses a visible placeholder such as "[to confirm: approver]" or asks who approves.
- P5: each reply ends with one "Next step" line and no list of three moves.

## Case 2: no stated conclusion

**Opening message:** "Make this pyramid style: 'We looked at three options for the Brisbane office lease. Option A: renew the current lease at $420 per square metre, no move costs. Option B: move to a smaller floor in the same building at $390 per square metre, with a $60,000 fit-out. Option C: go fully remote and close the office, saving the lease but adding $1,500 per person per year in home-office allowances for 40 staff. The lease ends on 31 March next year.'"

**Scripted replies**, in order, each with when to give it:

i) When the skill asks what the main point is: "Your call, I haven't decided."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply asks exactly one clarifying question, about the main point or recommendation, and gives no rewrite yet.
- P2: after "Your call, I haven't decided.", the rewrite leads with the decision the reader must make (choose between the three options before the lease ends on 31 March) and does not recommend or favour any option.
- P3: every fact is kept and none is added: $420, $390, $60,000, $1,500 per person per year, 40 staff and 31 March are all present, and no new number, cost total or option detail appears unless it is labelled as calculated from the input.
- P4: the lead is visibly marked as assumed or as containing no recommendation, so the reader can see the writer has not decided.
- P5: the final reply ends with one "Next step" line and no list of three moves.

## Case 3: already answer-first, sensitive, then an edit

**Opening message:** "Can you pyramid this? 'Recommendation: move Jordan Lee (employee 4471) to the day roster from 3 November. Jordan's GP letter says night shifts are affecting their health. The day roster has one vacancy, left by a resignation last week. The team leader supports the move.'"

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "Put the reasons as bullet points under the recommendation."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply says once "Use only a tool your organisation has approved for this information." (the text holds an employee's name, number and health detail) and asks no clarifying question.
- P2: the first reply says the text already leads with its answer and keeps the recommendation as the first sentence, with no reordering of the facts beyond small wording changes.
- P3: after the bullet request, the reply shows the whole rewrite again with the recommendation first and the reasons as bullets below it.
- P4: every fact is kept in both replies and none is added: Jordan Lee, employee 4471, day roster, 3 November, GP letter, night shifts affecting health, one vacancy, a resignation last week, and the team leader's support. No new name, date, owner or reason appears.
- P5: each reply ends with one "Next step" line and no list of three moves.
