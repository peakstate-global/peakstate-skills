# blind-spots case 1 (refresh, re-run on fixed skill)

Skill commit FIXED-blind-spots (uncommitted edit on 7e9db4e). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/blind-spots/.

**USER:** Check my argument for blind spots before I send it. 'We should roster a second on-call engineer on weekends. Last quarter 9 of our 11 severity-one incidents started on a weekend. On weekends the single on-call engineer took a median of 70 minutes to respond, against 12 minutes on weekdays. Our contract commits us to a 30-minute response, and each breach costs a $25,000 service credit. We had four breaches last quarter. A second weekend engineer costs about $40,000 a year in on-call allowances.'

**ASSISTANT:**

Use only a tool your organisation has approved for this information, since it includes contract terms and incident data.

Before I look for blind spots, here is how I read your argument in its strongest form.

**Conclusion:** Roster a second on-call engineer on weekends.

**Reasons given:**

- Weekends are where the serious risk sits: 9 of last quarter's 11 severity-one incidents started on a weekend.
- Weekend response is slow: the single on-call engineer took a median of 70 minutes to respond on weekends, against 12 minutes on weekdays.
- Slow response costs money: the contract commits you to a 30-minute response, each breach costs a $25,000 service credit, and you had four breaches last quarter.
- The fix is cheap by comparison: a second weekend engineer costs about $40,000 a year in on-call allowances.

**The comparison I think you intend:** four breaches at $25,000 is $100,000 in one quarter, against $40,000 a year for the second engineer. So the second engineer pays for itself if it prevents even two breaches a year.

**Gaps in my reading:**

- **Audience.** You do not say who receives this. I have assumed it goes to whoever approves the on-call budget or roster, such as an engineering manager or a finance approver.
- **The cost comparison.** You give both numbers but do not put them side by side. I have read the $100,000-a-quarter versus $40,000-a-year comparison as your intended punchline.
- **When the breaches happened.** You do not say whether the four breaches were weekend incidents. I have read the argument as implying they were.

Is this the argument, or what would you change?


**USER:** Yes, that is my argument. It goes to my head of engineering on Friday.

**ASSISTANT:**

**Reading:** Your head of engineering should approve a second weekend on-call engineer, because weekend severity-one incidents get slow responses that breach the 30-minute contract term, and the breaches cost far more than the roster. Main risk: an assumption.

### Assumptions, ranked

| # | Assumption | Dependence | Uncertainty | Cheap test (top three) |
|---|---|---|---|---|
| A1 | The 70-minute weekend median is slow because there is only one engineer, so a second engineer would bring weekend response under 30 minutes | high | high | Pull the timeline for each of last quarter's 9 weekend severity-one incidents and note what the on-call engineer was doing between the page and the first response. If most delays happened with no other incident running (a missed page, travel, sleep, a slow escalation), that counts against it: a second person on the same roster may not fix those. |
| A2 | The four breaches were weekend incidents that a second engineer would have caught in time | high | high | Pull the four breach records and check the day, the response time and the cause of each delay. If two or more were weekday incidents, or were late for a reason a second engineer would not change, that counts against it. |
| A3 | Last quarter's pattern (9 of 11 severity-one incidents on a weekend, four breaches) will continue | high | medium | Count severity-one incidents and breaches by day of week for the previous four quarters. If last quarter is the only one with a heavy weekend share, that counts against it. |
| A4 | Nothing cheaper would fix weekend response, such as a faster escalation path, a paging change, or removing whatever makes weekends produce 9 of 11 incidents (for example, weekend deployments or batch jobs) | medium | medium | |
| A5 | About $40,000 a year in allowances is the full cost, with no extra call-out pay, time off in lieu or roster fatigue to add | medium | medium | |
| A6 | The contract counts a response the way your incident data does (the same start and stop times for the 30 minutes) | medium | low | |

Why A1 is first: the whole saving depends on a second engineer actually closing the gap from 70 minutes to under 30, and nothing in the argument shows what the 70 minutes is made of.

### Possible biases and fallacies

No clear bias or fallacy found. The argument states its figures and its conclusion follows from them if the assumptions above hold; its weak points are unstated links, which sit in the table rather than here.

### What would change this reading

The incident timelines behind A1. If the weekend delays mostly happened while the single engineer was already working another incident, the case becomes strong and simple to defend. If they mostly came from slow acknowledgement with nothing else running, a paging or escalation fix may do the job for much less than $40,000.

## Next

1. **You, before Friday:** pull the timelines for last quarter's 9 weekend severity-one incidents and the four breach records (tests for A1 and A2). Record, for each, why the response took as long as it did and whether the breach fell on a weekend. Result: a short table you can attach to the argument.
2. **You, before Friday:** add one sentence that puts the cost comparison side by side, as your argument currently leaves it implied: four breaches at $25,000 is $100,000 in one quarter, against about $40,000 a year, so the second engineer covers its cost if it prevents two breaches a year. Result: your head of engineering sees the punchline without doing the arithmetic.
3. **You, this week:** show the revised argument to one person likely to disagree, such as whoever manages the current on-call roster, and note their first objection. Result: you hear the strongest pushback before your head of engineering raises it.

If you want the figures themselves checked against their sources before Friday, a skill for checking claims and provenance may help, if you have one.

## Grading
- P1 pass: first reply gives "**Conclusion:** Roster a second on-call engineer on weekends." and four reasons, then "Is this the argument, or what would you change?" before any finding.
- P2 pass: "No clear bias or fallacy found." No fallacy listed at any confidence.
- P3 pass: no bias or fallacy is mentioned, so there is nothing to grade at low confidence (vacuous pass on the plain reading).
- P4 pass: table ranked A1 to A6 with "Dependence" and "Uncertainty" columns (high/high, high/high, high/medium, then medium), and a cheap test for A1, A2 and A3.
- P5 pass: no source, date or named person; "Friday" is the user's; "such as an engineering manager or a finance approver" and "such as whoever manages the current on-call roster" are labelled examples. The "$100,000 in one quarter" figure is arithmetic from the user's own numbers.

Triage:
