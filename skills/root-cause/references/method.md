# Method

## Problem statement

Write one short paragraph, then the is and is-not lines. An "is / is not" comparison is a
common problem-definition tool (S5).

| Question | Is | Is not (where it could happen but does not) |
|---|---|---|
| What | the defect or event, in observable terms | similar things that are fine |
| Where | the place, system, product line or team | places that are fine |
| When | first seen, how often, the pattern | times that are fine |
| How much | count, cost, people affected | |

- Describe events and actions, never people. "The run was started twice", not a name.
- The is-not column is where the clues are: what differs between the "is" and the "is not"
  cases often points at the cause.
- Mark each gap "[to confirm]". Never fill a gap with a guess.

## Containment

Containment limits the harm while the cause is still unknown. It is not the fix (S5).

- Ask: who or what is still being harmed, and what stops that today?
- Typical moves: hold or pause the process, add a manual check, roll back the last change,
  quarantine the affected items, tell the people affected.
- Give each containment an end: it stays until the first fix has passed its rollback trigger
  period.
- If the harm has stopped and cannot recur before the fix, write "No containment needed:"
  and the reason. Never leave the step out.

## Choosing the tool

| Situation | Tool | Why |
|---|---|---|
| Counts or costs by category exist | Pareto | Sorting shows the few categories that carry most of the total (S4) |
| Several causes may combine | Fishbone | The categories stop the team missing a whole kind of cause (S3) |
| One failure, one likely chain | 5 Whys | Each why moves one step past the symptom (S1) |

Run Pareto first when counts exist, then a fishbone or a 5 Whys on the top one or two
categories.

## 5 Whys

- Ask why about the last answer, not about the original symptom (S2).
- Five is a guide, not a rule. Stop when the answer is a cause the team can act on in a
  process, a tool, a rule or a check. Stop earlier if the next why leaves the team's control;
  say so.
- **Never stop at a person.** When an answer is "someone did X" or "someone forgot", the
  next why asks what let X happen, or what made X likely: a missing check, a confusing screen,
  a rushed handover, no second approval. People act on the information and tools they have;
  you can fix the system, not the person (S6).
- A chain that ends at a person is also weak analysis: it stops too soon, and a different
  person would fail the same way (S2).
- Mark each link "known" or "to check". A chain built only on guesses is a hypothesis.
- If two answers are plausible at one step, branch the chain or switch to a fishbone.

## Fishbone

Put the problem at the head. Use these six branches (S3):

- **People**: training, workload, handover, staffing. Conditions, never a named person.
- **Process**: steps, rules, approvals, sequence, missing checks.
- **Tools**: software, machines, equipment, integrations.
- **Materials**: inputs, data, parts, supplier content.
- **Measurement**: how the problem or the output is checked, and how late it is seen.
- **Environment**: timing, calendar, location, load, external conditions.

Drop a branch with nothing on it rather than filling it. Circle the two or three causes the
facts point to most; these become the suspected causes.

## Pareto

- Sort categories by count or cost, largest first. Add the cumulative share (S4).
- Name the one or two categories that make up most of the total. Work on those first.
- Group "other" last, whatever its size.
- A Pareto table shows where the problem is concentrated, not why. Run a fishbone or 5 Whys
  on the top category.

## Suspected causes and evidence

For each suspected cause, write (S5):

- **Confirms it:** the observation, log, count or test that would show it is the cause.
- **Rules it out:** the observation that would show it is not.

Timing alone ("it started after the change") is a lead, not proof. A cause stays suspected
until the confirming evidence is in. A suspected cause can also be "not known yet" when the
facts do not point anywhere; say what would narrow it.

## The first fix

Choose the smallest change that acts on the top suspected cause. Prefer a change that makes
the error hard to repeat (a check, a lock, a default) over a reminder or more training.

- **Reach:** what the change touches and who it affects. Start small where you can: one team,
  one run, one site (S7).
- **Reversal:** exactly how to undo it, and how long that takes. Mark the time "[to confirm]" unless the user gave it.
- **Rollback trigger:** the result that shows it failed, with a number and a period where you
  can, such as "any duplicate payment in the next two runs" or "error rate above 2% in the
  first hour". If it fires, reverse the fix and keep the containment (S7).
- **Worked result:** the result that shows it worked, over the same period.
