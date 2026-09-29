**USER:** Check my argument for blind spots before I send it. 'We should roster a second on-call engineer on weekends. Last quarter 9 of our 11 severity-one incidents started on a weekend. On weekends the single on-call engineer took a median of 70 minutes to respond, against 12 minutes on weekdays. Our contract commits us to a 30-minute response, and each breach costs a $25,000 service credit. We had four breaches last quarter. A second weekend engineer costs about $40,000 a year in on-call allowances.'


**ASSISTANT:**

Before I look for blind spots, I want to confirm that I have read your argument correctly. Incident and contract figures can be sensitive, so use only a tool your organisation has approved for this information.

**My reading of the argument, in its strongest form**

- **Conclusion:** the team should roster a second on-call engineer on weekends.
- **Reason 1, where the risk is:** weekends carry most of the serious incidents. Last quarter, 9 of the 11 severity-one incidents started on a weekend.
- **Reason 2, where the gap is:** weekend response is much slower. The single weekend on-call engineer took a median of 70 minutes to respond, against 12 minutes on weekdays.
- **Reason 3, what the gap costs:** the contract commits you to a 30-minute response, each breach costs a $25,000 service credit, and there were four breaches last quarter. That is $100,000 in credits for the quarter.
- **Reason 4, the price of the fix:** a second weekend engineer costs about $40,000 a year in on-call allowances.
- **The implied case:** a second engineer brings weekend response back under 30 minutes, the breaches stop or mostly stop, and $40,000 a year buys back far more than it costs in service credits.

**Gaps in the text as written**

- The argument does not say who it is for. I have read it as a budget request to a manager or head of engineering who approves on-call spend.
- The argument does not state the comparison it rests on. It gives a quarterly breach cost and a yearly engineer cost but never puts the two side by side, so I have supplied that step above.
- The argument does not say how many of the four breaches happened on a weekend. I have read it as saying most or all of them did.

Is this the argument, or what would you change?

**USER:** Yes, that is my argument. It goes to my head of engineering on Friday.


**ASSISTANT:**

**Reading:** The team should roster a second weekend on-call engineer, because weekend severity-one incidents get a slow response that breaches the 30-minute contract term, and $40,000 a year costs less than the service credits. Main risk: an assumption. The argument shows that weekend response is slow, but it does not show that a second engineer would make it fast.

### Assumptions, ranked

| # | Assumption | Dependence | Uncertainty | Cheap test (top three) |
|---|---|---|---|---|
| A1 | The weekend delay comes from one engineer carrying the load (for example, already busy on another incident), so a second engineer brings response under 30 minutes | high | high | Pull the 9 weekend severity-one records and note, for each, why response took as long as it did: engineer already on another incident, or engineer free but slow to acknowledge, reach a laptop or get access. If most delays happened while the engineer was free, that counts against. |
| A2 | The four breaches were weekend incidents caused by slow response, and not by something a second engineer would not fix | high | high | List the four breaches with their day and the cause the contract report gives. If two or more were on a weekday, or were caused by alerting or paging failures, that counts against. |
| A3 | Last quarter's pattern will continue at a level that pays for the engineer | medium | medium | Count severity-one incidents and breaches by weekday and weekend for the three quarters before last. Break-even is $40,000 ÷ $25,000 = 1.6 breaches avoided a year. If earlier quarters show fewer than about two weekend breaches a year, that counts against. |
| A4 | $40,000 in on-call allowances is the full cost (no extra call-out pay, overtime, time off in lieu or a new hire) | medium | medium | |
| A5 | No cheaper change gets the same result, such as a faster paging and escalation rule, or a backup engineer paged only when the first one is already busy | medium | medium | |

Why A1 is first: the whole saving depends on the second engineer cutting response time, and the text gives no evidence on why weekend response is slow.

### Possible biases and fallacies

**False cause (fallacy), medium confidence**
- Passage: "On weekends the single on-call engineer took a median of 70 minutes to respond, against 12 minutes on weekdays."
- Generous reading: the passage most plausibly means that one engineer cannot cover several serious incidents at once on a weekend. That is sound if the slow responses happened while the engineer was already busy on another incident.
- Concern: this passage may treat the single engineer as the cause of the gap, when weekdays also differ in other ways. On a weekday, people are at their desks, online and near their colleagues. A second engineer at home on a weekend may be just as slow to respond.
- Checking question: What else changes between a weekday and a weekend response, apart from how many engineers are on call?

**Insensitivity to sample size (bias), low confidence**
- Passage: "Last quarter 9 of our 11 severity-one incidents started on a weekend."
- Generous reading: 9 of 11 is far above the share you would expect if incidents fell evenly across the week (weekends are 2 of 7 days, so about 3 of 11). A gap that large is unlikely to be chance, even from one quarter.
- Concern: this passage may rest a yearly spending decision on one quarter of 11 incidents.
- Checking question: Does the weekend share hold across the previous three quarters?

### What would change this reading

The reason for each slow weekend response in the incident log. If the engineer was already busy on another incident in most of them, the case is strong. If the engineer was free but slow, a second engineer may not fix it, and a paging or access fix may do more for less.

## Next

1. You: before Friday, pull the 9 weekend severity-one records and the 4 breach records, and note the day and the cause of each delay. The result is a count that confirms or rules out A1 and A2.
2. You: add one sentence to the argument that answers the checking question on the 70-minute passage, or reword that passage so it states the cause you found. The result is a revised argument that says why a second engineer fixes the delay.
3. You: show the revised argument to one person who disagrees with it (for example, whoever owns the on-call budget), and note their first objection. The result is the objection your head of engineering is most likely to raise, answered before Friday.

To ground the figures themselves in sources, you may also like a skill for checking claims and provenance, if you have one.

