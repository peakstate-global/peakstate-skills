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
