**USER:** Check my argument for blind spots before I send it. 'We should roster a second on-call engineer on weekends. Last quarter 9 of our 11 severity-one incidents started on a weekend. On weekends the single on-call engineer took a median of 70 minutes to respond, against 12 minutes on weekdays. Our contract commits us to a 30-minute response, and each breach costs a $25,000 service credit. We had four breaches last quarter. A second weekend engineer costs about $40,000 a year in on-call allowances.'


**ASSISTANT:**

Before I look for blind spots, I want to be sure I am reading the argument you mean to send. Incident and contract figures can be sensitive, so use only a tool your organisation has approved for this information.

Here is the argument in its strongest form, as I read it.

**Conclusion:** the team should roster a second on-call engineer on weekends.

**Reasons given:**

- Weekends are where the serious incidents happen: 9 of last quarter's 11 severity-one incidents started on a weekend.
- Weekend response is much slower: the single on-call engineer took a median of 70 minutes to respond on weekends, against 12 minutes on weekdays.
- Slow response has a direct price: the contract commits you to a 30-minute response, and each breach costs a $25,000 service credit.
- That price is already being paid: there were four breaches last quarter, which is $100,000 in service credits in one quarter.
- The fix is cheap by comparison: a second weekend engineer costs about $40,000 a year in on-call allowances.

**The implied case:** a second engineer would bring weekend response under 30 minutes, avoid most of those breaches, and so pay for itself many times over.

**Gaps in the opening, with my best reading:**

- **Who it is for.** The text does not say. My best reading is a budget holder, such as an engineering or operations manager, who approves on-call costs.
- **Where the four breaches happened.** The text does not say whether they were on weekends. My reading is that you mean they were.
- **The period for the cost comparison.** Breaches are given per quarter and the engineer cost per year. My reading is that you intend the comparison as roughly $400,000 a year at risk against $40,000 a year.

Is this the argument, or what would you change?

**USER:** Yes, that is my argument. It goes to my head of engineering on Friday.


**ASSISTANT:**

**Reading:** The team should roster a second on-call engineer on weekends, because weekend severity-one response is slow, slow response breaches a 30-minute contract term at $25,000 a breach, and the extra engineer costs about $40,000 a year. Main risk: an assumption.

### Assumptions, ranked

| # | Assumption | Dependence | Uncertainty | Cheap test (top three) |
|---|---|---|---|---|
| A1 | The weekend delay comes from having only one engineer, so a second engineer brings weekend response under 30 minutes | high | high | Pull the timeline for each of the four breaches and note where the minutes went: page sent, page acknowledged, engineer at a keyboard. If most of the delay sits between the page and the acknowledgement, and the engineer was not already busy on another incident, a second person on the same rota may be slow in the same way. That result counts against. |
| A2 | The four breaches started on weekends, so weekend cover would have prevented them | high | medium | Check the start day and time of the four breach incidents in the incident log. If two or more started on a weekday, the saving from weekend cover is half or less of the $100,000. That result counts against. |
| A3 | The weekend share of severity-one incidents (9 of 11) holds beyond last quarter | high | medium | Count severity-one incidents by weekday and weekend for the three or four quarters before last. If the weekend share falls to about two in seven, the share of days that are weekends, last quarter may have had a one-off cause, such as a weekend deploy or one faulty component. That result counts against. |
| A4 | No cheaper change fixes weekend response, such as a stricter acknowledgement target, better alerting, or an automatic escalation to a backup after 15 minutes | medium | medium | |
| A5 | Customers claim every service credit they are owed, so each breach is a real $25,000 cost | medium | low | |
| A6 | $40,000 a year in allowances is the full cost, with nothing added for call-out pay, fatigue or a larger rota to fill the extra weekend slot | low | medium | |

Why A1 is first: the whole saving depends on a second engineer changing the response time, and the figures you give show the delay but not its cause. A median of 70 minutes across roughly 13 weekends looks more like slow acknowledgement than two incidents at once, which would be rare with 9 incidents in a quarter. A breach timeline shows which one it is.

A6 sits last because the margin is wide. Even at double or triple the $40,000, the cost stays well under the credits at risk.

### Possible biases and fallacies

No clear bias or fallacy found. Each reason is a stated figure, the conclusion follows if the assumptions above hold, and the gaps that matter (cause of the delay, where the breaches fell, whether the pattern holds) are missing facts, which the table already covers.

### What would change this reading

A breach timeline showing that the weekend engineer was free when paged but slow to acknowledge would change this reading most. The problem would then be how weekend on-call works, not how many people are on it, and a cheaper fix such as automatic escalation (A4) could do the same job.

### Next

1. **You:** run the breach-timeline test for A1 before Friday. Record, for each of the four breaches, the minutes from page to acknowledgement and whether the engineer was already on another incident.
2. **You:** check the start day of the four breaches (A2) and, if they were on weekends, say so in the argument. The head of engineering will likely ask it first, and one added sentence answers it.
3. **You:** show the revised argument to one person who disagrees with it, such as someone on the current weekend rota, and note their first objection.

To ground the figures themselves in sources, you may also like a skill for checking claims and provenance, if you have one.

