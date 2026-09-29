**USER:** Check my argument for blind spots before I send it. 'We should roster a second on-call engineer on weekends. Last quarter 9 of our 11 severity-one incidents started on a weekend. On weekends the single on-call engineer took a median of 70 minutes to respond, against 12 minutes on weekdays. Our contract commits us to a 30-minute response, and each breach costs a $25,000 service credit. We had four breaches last quarter. A second weekend engineer costs about $40,000 a year in on-call allowances.'


**ASSISTANT:**

Before I look for blind spots, I want to be sure I am reading the argument you mean to send. Your text includes contract terms and incident data, so use only a tool your organisation has approved for this information.

**My reading of the argument, in its strongest form:**

- **Conclusion:** Roster a second on-call engineer on weekends.
- **Reason 1:** Weekends are where the serious incidents happen. Last quarter, 9 of the 11 severity-one incidents started on a weekend.
- **Reason 2:** Weekend response is slow. The single weekend on-call engineer took a median of 70 minutes to respond, against 12 minutes on weekdays.
- **Reason 3:** Slow response costs money. The contract commits you to a 30-minute response, each breach costs a $25,000 service credit, and you had four breaches last quarter ($100,000 in one quarter, by my arithmetic).
- **Reason 4:** The fix is cheap by comparison. A second weekend engineer costs about $40,000 a year in on-call allowances.
- **The implied chain:** a second engineer brings weekend response under 30 minutes, that prevents most breaches, and the credits saved are far larger than the $40,000 cost.

**Who it is for:** I assume someone who approves on-call budget or rosters, such as an engineering or operations manager. Tell me if the reader is someone else.

**Gaps in the text as written:**

- The argument does not say how a second engineer shortens response. It could mean a backup when the first engineer misses the page, or two people splitting the weekend, or something else.
- It does not say whether the four breaches were all weekend incidents.
- It does not say what the decision-maker is asked to approve, for example a trial for one quarter or a permanent change.

Is this the argument, or what would you change?

**USER:** Yes, that is my argument. It goes to my head of engineering on Friday.


**ASSISTANT:**

**Reading:** Roster a second on-call engineer on weekends, because weekend severity-one incidents get a slow response that breaches the 30-minute contract term, and the breaches cost far more than the roster. Main risk: an assumption, namely that a second engineer is what fixes the slow response.

The cost case itself is strong. Four breaches at $25,000 is $100,000 in one quarter, and the roster costs about $40,000 a year, so it pays for itself if it prevents two breaches a year. The argument lives or dies on whether the second engineer actually prevents them.

### Assumptions, ranked

| # | Assumption | Dependence | Uncertainty | Cheap test (top three) |
|---|---|---|---|---|
| A1 | A second engineer brings weekend response under 30 minutes (the 70 minutes is caused by having one person on call, not by paging, alert delay, access or travel) | high | high | Walk the timelines of the 9 weekend severity-one incidents and split each delay into "page not acknowledged", "acknowledged but not yet working" and "already busy on another incident". If most of the delay sits somewhere a second person would not help, such as a misrouted page or a late alert, that counts against. |
| A2 | Last quarter's weekend share is typical and will continue (9 of 11 is a pattern, not a one-off) | high | high | Count severity-one incidents by day of week for the previous three or four quarters. If the weekend share sits near 2 in 7 (about 29 per cent), that counts against. |
| A3 | The four breaches were weekend response-time breaches that a faster response would have prevented | high | medium | Pull the four breach records and check the day and the clause breached. If fewer than two were weekend response breaches, the roster may not pay back and that counts against. |
| A4 | The 70-minute median and the four breaches describe the same set of incidents | medium | high | |
| A5 | No cheaper fix gets response under 30 minutes, such as an escalation to a named backup after 15 minutes without a full second roster | medium | high | |
| A6 | $40,000 is the full cost, with no extra fatigue, attrition or difficulty finding volunteers for the second slot | medium | medium | |
| A7 | The head of engineering weighs service credits as the main cost, rather than, say, customer trust or engineer burnout | low | medium | |

Why A1 is first: the whole saving depends on the second engineer changing the response time, and the text gives no mechanism for how it would.

A note on A4, because your head of engineering may spot it. If 9 weekend severity-one incidents had a median response of 70 minutes, then at least 5 of them took 70 minutes or more, which would mean at least 5 breaches of a 30-minute term, not 4. The figures may still be right (for example, the median may cover all weekend incidents, not only severity-one, or one breach may have been waived), but it is worth reconciling before Friday.

### Possible biases and fallacies

**Correlation as cause (fallacy), low confidence**
- Passage: "On weekends the single on-call engineer took a median of 70 minutes to respond, against 12 minutes on weekdays."
- Generous reading: the word "single" points at a plausible mechanism. On weekdays other people are around to pick up a missed page, and on weekends nobody is. If that is where the delay comes from, the comparison is sound.
- Concern: this passage may treat "one person on call" and "slow response" as cause and effect because they occur together. Weekdays and weekends differ in other ways too, such as people being away from a laptop, travel time, and who is in the escalation chain.
- Checking question: What else differs between weekday and weekend response, apart from the number of people on call?

**Recency bias (bias), low confidence**
- Passage: "Last quarter 9 of our 11 severity-one incidents started on a weekend."
- Generous reading: last quarter may simply be the most recent complete data, and it may match earlier quarters. If it does, one quarter is a fair summary.
- Concern: this passage may rest a permanent roster change on one quarter and 11 incidents, where a small count can swing a lot from quarter to quarter.
- Checking question: Does the weekend share hold across the last year, not only the last quarter?

### What would change this reading

If the incident timelines show the 70 minutes is mostly time before the page reached anyone (a paging or alerting fault), the answer is to fix the alerting, not to add a second engineer, and the case would need to be rewritten.

## Next

1. You: before Friday, walk the 9 weekend incident timelines (A1) and pull the four breach records (A3). Result: a short table showing where the minutes went and which breaches a faster response would have prevented.
2. You: reconcile the 70-minute median with the four breaches (A4), and either correct the figure or add one line explaining the difference. Result: the numbers in the note agree with each other.
3. You: show the revised argument to one person who disagrees with it, such as a current on-call engineer who might prefer a different fix, and note their first objection. Result: one objection answered in the note before it goes to your head of engineering.

To ground the figures themselves in sources, you may also like a skill for checking claims and provenance, if you have one.

