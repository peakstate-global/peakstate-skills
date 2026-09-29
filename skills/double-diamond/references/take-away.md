# Take-away template

Fill every line. Keep the order. If a part is empty, say so in one line; never leave it out.

```md
[If no web or file access: "I had no web access, so facts from memory are labelled RECALLED."]

### Problem statement ([agreed with the user | agreed by default])

- Who: ...
- Need: ...
- Evidence: ... [label each item: user said | evidence | to check]
- Why now: ...
- Out of scope: ...
- Constraints: [any the user added in Develop, or "none"]
- How might we: ...?

### Options considered

| # | Option | How it answers the question | Riskiest assumption | Effort |
|---|---|---|---|---|
| O1 | ... | ... | ... | low / medium / high |

Recommended: O[n], because [one line]. The user chose: O[n] | my recommendation | none.

### Chosen direction

[The direction, chosen to test.] | No direction chosen yet: [why].

- Strongest case against: [the argument, and the assumption it attacks]
- What survived: [what still holds, and what changed]

### Assumptions

| # | Assumption | Dependence | Status | Cheap test |
|---|---|---|---|---|
| A1 | ... | high | supported ([the evidence]) / untested / unresolved | [action within a week; the result that counts against it] — or, if unresolved: "No test possible yet: [what would make one possible]" |

### Hypotheses (thresholds set before the test; do not change them after the results)

| # | We believe... | Measure | Success threshold | Time frame or sample | Status |
|---|---|---|---|---|---|
| H1 | [change] for [who] will [result] | ... | [a number] | ... | untested |

### Next test

- Type: experiment | prototype | pilot
- What: [what it does, and which hypothesis it tests]
- Owner: [as the user gave it | [to confirm]]
- Date: [as the user gave it | [to confirm]]

Method: the Double Diamond, from the Design Council (S1).
```

## Worked example (short)

Challenge: "Our customers keep calling to ask where their order is."

### Problem statement (agreed with the user)

- Who: online customers in the first week after ordering.
- Need: to know when their order will arrive without calling.
- Evidence: 600 "where is my order" calls a month (evidence); customers find the tracking email confusing (user said).
- Why now: the calls take two staff full time.
- Out of scope: delivery speed itself.
- Constraints: none.
- How might we help customers know when their order will arrive without calling us?

### Options considered

| # | Option | How it answers the question | Riskiest assumption | Effort |
|---|---|---|---|---|
| O1 | Rewrite the tracking email | Clearer date in the email they already get | Customers open the email | low |
| O2 | Text message on dispatch | Reaches customers who miss email | Customers give a mobile number | medium |
| O3 | Stop sending the courier's generic email | One message instead of two | The courier email causes the confusion | low |

Recommended: O1, because it is cheap and reaches every customer. The user chose: my recommendation.

### Chosen direction

Rewrite the tracking email, chosen to test.

- Strongest case against: customers who call may never open the email, so a better email changes nothing (attacks A2).
- What survived: the rewrite stays, and the test also counts email opens among callers.

### Assumptions

| # | Assumption | Dependence | Status | Cheap test |
|---|---|---|---|---|
| A1 | Most calls ask only for a delivery date | high | supported (call log sample of 50) | Not needed: already supported by the call log sample |
| A2 | Callers opened the tracking email first | high | untested | Ask the next 20 callers; fewer than 10 opening it counts against |

### Hypotheses (thresholds set before the test; do not change them after the results)

| # | We believe... | Measure | Success threshold | Time frame or sample | Status |
|---|---|---|---|---|---|
| H1 | a clearer email for online customers will cut calls | "Where is my order" calls | 25% fewer than the same weeks last month | 4 weeks | untested |

### Next test

- Type: experiment
- What: send the new email to half of orders for four weeks and compare call rates (tests H1)
- Owner: [to confirm]
- Date: [to confirm]

Method: the Double Diamond, from the Design Council (S1).
