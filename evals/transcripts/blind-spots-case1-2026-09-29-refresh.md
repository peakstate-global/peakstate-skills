# blind-spots case 1 (refresh)

Skill commit 7e9db4e. Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/blind-spots/.

**USER:** Check my argument for blind spots before I send it. 'We should roster a second on-call engineer on weekends. Last quarter 9 of our 11 severity-one incidents started on a weekend. On weekends the single on-call engineer took a median of 70 minutes to respond, against 12 minutes on weekdays. Our contract commits us to a 30-minute response, and each breach costs a $25,000 service credit. We had four breaches last quarter. A second weekend engineer costs about $40,000 a year in on-call allowances.'

**ASSISTANT:**

Use only a tool your organisation has approved for this information.

Before I look for blind spots, here is my reading of your argument in its strongest form.

**Conclusion:** Roster a second on-call engineer on weekends.

**Reasons given:**
- Weekends are where the serious incidents happen: 9 of last quarter's 11 severity-one incidents started on a weekend.
- Weekend response is slow: the single on-call engineer took a median of 70 minutes to respond, against 12 minutes on weekdays.
- Slow response costs money: the contract commits you to a 30-minute response, each breach costs a $25,000 service credit, and you had four breaches last quarter.
- The fix is cheap by comparison: a second weekend engineer costs about $40,000 a year in on-call allowances.

**The implied comparison:** four breaches at $25,000 is $100,000 in one quarter. If that rate held, it would be about $400,000 a year, against $40,000 a year for the second engineer. So the second engineer would pay for itself if it prevented roughly two breaches a year. That arithmetic is my reading; your text does not state it.

**Gaps in my reading:**
- **Audience.** You do not say who will decide. I have assumed a manager who owns both the on-call budget and the contract, and who will judge the case mainly on cost.
- **Which breaches.** I have read the four breaches as weekend breaches, but the text does not say so.
- **Time period.** The breach cost is for one quarter and the engineer cost is for a year. I have read you as expecting last quarter to be typical.

Is this the argument, or what would you change?


**USER:** Yes, that is my argument. It goes to my head of engineering on Friday.

**ASSISTANT:**

**Reading:** Roster a second on-call engineer on weekends, because weekend severity-one incidents are common, weekend response is far slower than the 30-minute contract, and four $25,000 breaches in one quarter dwarf a $40,000 annual cost. Main risk: an assumption.

### Assumptions, ranked

| # | Assumption | Dependence | Uncertainty | Cheap test (top three) |
|---|---|---|---|---|
| A1 | A second rostered engineer would bring weekend response under 30 minutes | high | high | Pull the incident log for last quarter's weekend severity-one incidents and note, for each slow response, why it was slow: engineer already busy on another incident, page missed, travel time, or slow diagnosis. If most slow responses happened while the single engineer was free, a second person on the roster may not fix the delay, and that counts against. |
| A2 | The four breaches were weekend incidents | high | medium | Check the date and time of each of the four breaches. If two or fewer started on a weekend, the second engineer would have prevented at most half the credits, and that counts against. |
| A3 | No cheaper fix gets weekend response under 30 minutes | medium | high | List two cheaper options (for example, an automatic escalation to a backup if the page is not acknowledged in 10 minutes, or fixing whatever makes weekends produce 9 of 11 incidents) and price each one in an hour with your on-call lead. If either costs well under $40,000 and targets the cause found in A1, that counts against. |
| A4 | Four breaches a quarter is a typical rate, not an unusual quarter | medium | medium | |
| A5 | $40,000 in on-call allowances is the full cost, and the team can staff a second weekend roster without fatigue or attrition | low | medium | |

Why A1 is first: the whole case rests on the second engineer fixing the slow response, and the argument gives the size of the delay but not its cause. The cost case has a wide margin (the engineer pays for itself at about two breaches a year, against four in one quarter), so A4 and A5 would have to be badly wrong to change the conclusion.

### Possible biases and fallacies

No clear bias or fallacy found. The argument states its numbers, draws no inference beyond them, and the conclusion follows if the assumptions above hold.

**Insensitivity to sample size (bias), low confidence**
- Passage: "Last quarter 9 of our 11 severity-one incidents started on a weekend."
- Generous reading: weekends are about two days in seven, so 9 of 11 is far above what chance would suggest, and even a small count is a strong signal when the gap is that large.
- Concern: this passage may treat one quarter's 11 incidents as a stable weekend pattern.
- Checking question: How many cases is this, and would the weekend share hold across the last four quarters?

### What would change this reading

The reason weekend response took a median of 70 minutes. If the single engineer was usually free but slow to acknowledge or reach a laptop, the fix is an escalation rule or a response standard, not a second person, and your head of engineering is likely to ask exactly this.

## Next

1. **You**, before Friday: go through last quarter's weekend incident log and record why each response over 30 minutes was slow. Result: a one-line cause for each slow response, which either supports A1 or points to a cheaper fix.
2. **You**, this week: check the dates of the four breaches and add one sentence to the argument saying how many were weekend incidents. Result: the $100,000 figure is tied to the weekend problem, not assumed to be.
3. **You**, before Friday: show the revised argument to one on-call engineer who might disagree with it, and note their first objection. Result: you hear the likely pushback before your head of engineering raises it.

To ground the figures themselves in sources, you may also like a skill for checking claims and provenance, if you have one.

## Grading
- P1 pass: first reply gives "**Conclusion:** Roster a second on-call engineer on weekends." and four reasons, lists no assumption, bias or fallacy, and ends "Is this the argument, or what would you change?" (its "Gaps in my reading" are reading gaps, and the derived $400,000 figure is labelled "That arithmetic is my reading").
- P2 pass: "No clear bias or fallacy found." The only item is at low confidence.
- P3 pass: "Insensitivity to sample size (bias), low confidence", generous reading ("9 of 11 is far above what chance would suggest") precedes "this passage may treat one quarter's 11 incidents as a stable weekend pattern."
- P4 pass: table ranked A1 high/high, A2 high/medium, A3 medium/high, with cheap tests for A1 to A3 (incident-log causes, breach dates, price two cheaper options) and blank for A4 and A5.
- P5 pass: no source, date or person invented; "Friday" and "head of engineering" come from the user, and every owner is "**You**". Plain reading: "about two days in seven" is arithmetic, not an outside fact.

Triage:
