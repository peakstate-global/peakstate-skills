---
name: double-diamond
description: Takes a fuzzy challenge through Discover, Define, Develop and Deliver, with a gate that holds back every solution until the user confirms the problem statement. Ends with the problem statement, the options considered, the chosen direction, an assumptions table, hypotheses each with a success threshold set before the test, and the next test with its owner and date. Use when someone says "help me work out what to do about", "where do we start", "we need to fix", "I think we need a new app or process", "design thinking", "double diamond", "frame this problem", or brings a challenge that has no clear problem statement yet.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "guided"
  output: "text"
---

This skill turns a fuzzy challenge into a confirmed problem statement, a chosen direction and a pre-registered next test.

## Steps

Run the steps in order. Ask one question at a time and wait for the answer. If the input may be sensitive, say once: "Use only a tool your organisation has approved for this information."

The gate: offer, assess or recommend no solution until the user confirms the problem statement in step 2. If the user brings a solution, add it to a "Parked ideas" list in one line and say it comes back in step 3. This holds even after "skip ahead" or "just give me ideas".

1. **Discover.** Restate the challenge in two or three lines. List what is known so far, each item labelled "user said", "evidence" (a number, record or observation the user gave) or "to check". Name the biggest gap. End with one question about that gap: who is affected, what happens now, what the evidence is, or what has been tried. Method: `references/method.md`.
2. **Define (gate).** Write the problem statement: who is affected, what they need, the evidence, why it matters now, and what is out of scope. Add one "How might we" question. Then run the built-in assumptions check: three to five things the statement relies on, each with how much the statement depends on it (high, medium or low) and a status (see below). End with one question: "Is this the problem, or what would you change?" If the user changes it, revise and ask again. If the user asks to skip, say in one line that ideas built on an unchecked problem often solve the wrong one, show the statement again and ask again. If the user answers "your call" or "go ahead", treat the statement as agreed and record "agreed by default" in the take-away. The user agreeing to the statement does not make its assumptions true.
3. **Develop.** Give three to five options: the parked ideas, at least one new idea, and one smallest option (do less, stop doing something, or change one rule). For each: how it answers the "How might we" question, its riskiest assumption, and the effort (low, medium or high). Recommend one, with one line on why. End with one question: "Which direction do you want to take forward?" If the user rejects every option, add the reason to the problem statement as a constraint, give two or three new options that respect it and ask once more. If the user still takes none, or says "your call", take your recommendation if one respects the constraint; otherwise record "No direction chosen yet" and go to step 4.
4. **Deliver (gate).** Run the built-in strongest case against: the best argument a sceptic would make against the chosen direction, and the assumption it attacks. Say what survives and what you changed. If it defeats the direction, say so, take the next option and run the case against once more; if that also fails, record "No direction chosen yet". If no direction is chosen, write the case against the problem statement's riskiest assumption instead. Then write one to three hypotheses, each with a measure, a success threshold and a time frame or sample size. Write the threshold now, before any result exists; the user may change it now, never after the test. If no direction is chosen, the hypothesis and the test are about the riskiest assumption in the problem statement instead. Pick the next test: an experiment, a prototype or a pilot, the smallest one that could show the top hypothesis is wrong. End with one question: "Who will run this test, and by when?"
5. **Hand over.** Deliver the take-away. Use the owner and date only as the user gave them; otherwise write "[to confirm]".

Statuses, used everywhere in the output:

- An assumption is "supported" only by evidence the user gave, and the evidence is named. Otherwise it is "untested", or "unresolved" when no cheap test exists yet. Every assumption gets one of the three. An "unresolved" assumption carries "No test possible yet: [what would make one possible]" in place of a cheap test.
- A hypothesis is always "untested" until its test has run. A direction is "chosen to test", never "proven".
- Never write "confirmed", "validated" or "proven" about an assumption, a hypothesis or a direction.

## The take-away

Deliver the six parts in this order, using the template in `references/take-away.md`:

- The problem statement and the "How might we" question, marked "agreed with the user" or "agreed by default".
- The options considered, with the recommendation and the user's choice.
- The chosen direction, the strongest case against it and what survived; or "No direction chosen yet" and why.
- The assumptions table, each row with dependence, status and a cheap test.
- The hypotheses, each with measure, success threshold, time frame or sample, and status "untested".
- The next test: its type, what it does, owner and date.

End with the credit line: "Method: the Double Diamond, from the Design Council (S1)."

If you cannot browse or open files, say so in one line. Any fact from memory is labelled RECALLED. Never invent a study, author, year, statistic, quote or URL. Never assume the user's country, season, holidays or local rules: if one matters, mark it [to confirm].

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a role the user named. Never invent a person, a date or a source.

1. Book the next test: name the owner and the date if they are "[to confirm]", and write down the threshold where the team can see it.
2. Before the test starts, show the hypotheses and thresholds to one person who will hold you to them, and record that they agreed the thresholds as written.
3. Run the cheap test for the highest-dependence assumption that is not "supported", and record what it shows.

To check the assumptions or the case against in more depth, the user may also like a skill for finding blind spots or a skill for checking claims and provenance, if they have one. Do not run them for the user.

## Self-check before you deliver

- No option, idea or recommendation appeared before the user agreed the problem statement; parked ideas were only listed.
- The problem statement names who, the need, the evidence, why now and what is out of scope, and has a "How might we" question.
- The assumptions check ran before the Define question, and every assumption has a dependence and one of the three statuses.
- The strongest case against ran before the hypotheses, and says what survived or what changed.
- Every hypothesis has a measure, a threshold, a time frame or sample, and status "untested"; the thresholds were written before any result.
- Nothing is labelled confirmed, validated or proven.
- The owner and date came from the user, or read "[to confirm]"; no source, statistic, person, date or local fact (country, season, holidays) was invented, and memory is labelled RECALLED.
- The take-away ends with the Design Council credit line.

## Read this when

| File | When |
|---|---|
| `references/method.md` | Writing a problem statement, the assumptions check, options, the case against, a hypothesis or a test |
| `references/take-away.md` | Writing the final output, or checking a worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.

## Reference: method.md

# Method

The Double Diamond has four stages in two diamonds. Each diamond opens out (divergent thinking) and then narrows to a decision (convergent thinking). The first diamond finds the right problem: Discover, then Define. The second finds the right solution: Develop, then Deliver. (S1, S2)

## Discover: what to ask about

Ask about the gap that most limits the problem statement. One question at a time. (S1)

| Gap | Question |
|---|---|
| Who | Who is affected most, and who is not affected? |
| What happens now | Walk me through what happens today, step by step. |
| Evidence | What number, record or observation shows the problem? Since when? |
| Tried already | What has been tried, and what happened? |
| Why now | Why does this matter now rather than last year? |

Label every known item: "user said" (a view or report), "evidence" (a number, record or observation the user gave) or "to check". A view that "everyone" holds, drawn from a few people, is "user said" until more people are asked.

## Define: the problem statement

Fill every line. If a line is unknown, write "[to check]". (S1, S3)

- **Who:** the people affected.
- **Need:** what they need and do not get.
- **Evidence:** what shows it, labelled as above.
- **Why now:** the cost of leaving it.
- **Out of scope:** what this problem is not.
- **How might we:** one question that suggests a solution is possible but names none. "How might we help new starters handle cases alone sooner?" is good. "How might we build an onboarding app?" names a solution and is not. (S3)

## Define: the assumptions check

List three to five things that must be true for the problem statement to hold, and which it does not show. For each: (S4, S5)

- **Dependence:** high, medium or low. How far the statement falls if this is false.
- **Status:** "supported" (name the evidence the user gave), "untested", or "unresolved" (no cheap test exists yet).
- **Cheap test:** one action within about a week, and the result that would count against it. For an "unresolved" assumption, write "No test possible yet: [what would make one possible]" instead.

Common kinds: the people named are the ones affected; the evidence is typical; the cause is the one assumed; the need is worth meeting now; the organisation can act on it. (S5)

## Develop: options

Open out before you narrow. Give three to five options: (S1, S2)

- the parked ideas the user brought, assessed now on the same terms as the rest;
- at least one new idea;
- one smallest option: do less, stop doing something, or change one rule.

For each option: how it answers the "How might we" question, its riskiest assumption (does the user want it, can we build it, is it worth it), and the effort. (S5) Recommend one. When the user rejects every option, the reason is new information: add it to the problem statement as a constraint before giving new options.

## Deliver: the strongest case against

Write the best argument a fair sceptic would make against the chosen direction, in two or three lines, and name the assumption it attacks. Then say what survives. If the direction survives in part, narrow it. If it does not survive, take the next option. (S4)

## Deliver: hypotheses and the threshold

Write each hypothesis in this form: (S5)

> We believe [change] for [who] will [result]. It passes if [measure] reaches [threshold] within [time frame or sample].

- Set the threshold before any result exists, and write it down. A threshold set after the results can be fitted to them, so it proves nothing. (S6)
- A threshold is a number the user can observe: a count, a share, a time. "Improves" is not a threshold.
- Status stays "untested" until the test has run. Passing one test supports a hypothesis; it does not prove it.

## Deliver: the next test

Pick the smallest test that could show the top hypothesis is wrong. (S1, S5)

| Type | Use when | Example |
|---|---|---|
| Experiment | One change, one measure, a short run | Change one thing for half the group for two weeks and compare |
| Prototype | People need to see or use the idea before they can react | A paper version shown to five users |
| Pilot | The idea works on a small scale and must hold in real use | One team or one site for a month |

The owner and the date come from the user. If the user has not named them, write "[to confirm]".

## Reference: take-away.md

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
| A1 | ... | high | supported ([the evidence]) / untested / unresolved | [action within a week; the result that counts against it]; or, if unresolved: "No test possible yet: [what would make one possible]" |

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

## Sources

# Sources

All entries retrieved 29 September 2026.

[S1] Design Council. (n.d.). *The Double Diamond*. Retrieved September 29, 2026, from https://www.designcouncil.org.uk/our-resources/the-double-diamond/

[S2] Design Council. (n.d.). *Framework for innovation*. Retrieved September 29, 2026, from https://www.designcouncil.org.uk/our-resources/framework-for-innovation/

[S3] IDEO.org. (n.d.). How might we. In *Design Kit*. Retrieved September 29, 2026, from https://www.designkit.org/methods/how-might-we.html

[S4] US Government. (2009). *A tradecraft primer: Structured analytic techniques for improving intelligence analysis* (Key Assumptions Check, p. 7; Devil's Advocacy, p. 17). Retrieved September 29, 2026, from https://www.cia.gov/resources/csi/static/Tradecraft-Primer-apr09.pdf

[S5] Bland, D. J., & Osterwalder, A. (2019). *Testing business ideas*. Wiley. Retrieved September 29, 2026, from https://www.strategyzer.com/library/testing-business-ideas-book

[S6] Center for Open Science. (n.d.). *Preregistration*. Retrieved September 29, 2026, from https://www.cos.io/initiatives/prereg
