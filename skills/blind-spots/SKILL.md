---
name: blind-spots
description: Reads an argument, plan or recommendation and finds what it quietly depends on. It confirms its reading of the argument first, then ranks the unstated assumptions with a cheap test for the top three, and names possible cognitive biases and logical fallacies, each with the quoted passage, the most generous reading, a confidence and a question that would check it. Use when someone says "find the holes in this", "what am I missing", "check my assumptions", "is there a fallacy here", "what are my blind spots", "poke holes in my argument", "is this biased", or before an argument goes to someone who will decide on it.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "guided"
  output: "text"
---

This skill turns a pasted argument into a ranked assumptions table and a short list of possible biases and fallacies, each one quoted, read generously and paired with a checking question.

## Steps

Run the steps in order. Ask one question at a time and wait for the answer. If the input may be sensitive, say once: "Use only a tool your organisation has approved for this information."

0. **Read and confirm.** This step is never skipped, even after "just give me the list". Restate the argument in its strongest form: the conclusion, the reasons given, and who it is for. Where the opening is vague, give your best reading and name the gaps. End with one question: "Is this the argument, or what would you change?" List no assumption, bias or fallacy until the user confirms.
1. **Surface the assumptions.** List what must be true for the conclusion to follow that the argument does not state or support. Rate each one for dependence (how far the conclusion falls if it is false) and uncertainty (how likely it is to be false), each high, medium or low. Rank by dependence first, then uncertainty. For each of the top three, give one cheap test the user could run within about a week. Method: `references/method.md`.
2. **Check for possible biases.** Read the argument against `references/biases.md`. A bias is a pattern in how the author reached the view. Report one only where a quoted passage shows the tell-tale wording or pattern.
3. **Check for possible fallacies.** Read the argument against `references/fallacies.md`. A fallacy is a gap between the reasons and the conclusion. Report one only where a quoted passage itself draws the faulty inference (a "so", "because", "therefore" or a stated conclusion). A link the argument leaves unstated is an assumption: it goes in the table from step 1, not here. Never count one gap twice.
4. **Hold the findings to the bar.** For every bias or fallacy finding: quote the passage; give the most generous reading first (what the author most plausibly meant, and when that would be sound); then say what the concern "may" be, never that the argument "is" fallacious; give a confidence (high, medium or low); and give the checking question. Drop any finding you cannot quote. Report no fallacy or bias to fill a list. A sound argument can have none. If no finding is medium or high confidence, open the section with the plain line "No clear bias or fallacy found." and one line on why the reasoning holds; any low-confidence finding follows as a question worth asking, not a charge. Never label the author, only the passage.

## The take-away

Deliver the four parts in this order, using the template in `references/take-away.md`:

- The one-line reading: the argument's conclusion and whether its main risk sits in an assumption, a bias, a fallacy or none of these.
- The assumptions table, ranked, with a cheap test for each of the top three.
- Possible biases and fallacies, each with quote, generous reading, concern, confidence and checking question. When none is medium or high confidence, the section opens with "No clear bias or fallacy found."
- What would change this reading: the one fact that would most change the assessment.

If you cannot browse or open files, say so in one line. Any fact from memory is labelled RECALLED, including a general claim inside a concern, a reading or a cheap test (such as why shops close or what a change costs). Or phrase it as something to check ("check whether ..."). Never invent a study, author, year, quote or URL.

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a role the user named. Never invent a person, a date or a source.

1. Run the cheap test for the top-ranked assumption and record what it shows.
2. Ask the checking question for the highest-confidence finding, or reword the passage it came from. If no bias or fallacy finding reaches medium confidence, base this move on the top-ranked assumption instead: name the assumption and its cheap test.
3. Show the revised argument to one person who disagrees with it, and note their first objection.

To ground the claims themselves in sources, the user may also like a skill for checking claims and provenance, if they have one. Do not run it for them.

## Self-check before you deliver

- The user confirmed the restated argument before any finding.
- Every assumption has a dependence and an uncertainty rating, the table is ranked, and each of the top three has a cheap test.
- Every bias or fallacy finding quotes the passage from the user's text, and no finding repeats a gap already in the assumptions table.
- Every finding gives the generous reading before the concern and says "may", never "is".
- Every finding has a confidence and a checking question.
- No finding was added to fill a list. If none is medium or high confidence, the section opens with "No clear bias or fallacy found."
- No person is labelled; only passages are.
- No source, study, owner or date was invented, and memory is labelled RECALLED.

## Read this when

| File | When |
|---|---|
| `references/method.md` | Rating and ranking assumptions, writing a cheap test, or writing a generous reading |
| `references/biases.md` | Checking the argument for possible cognitive biases (step 2) |
| `references/fallacies.md` | Checking the argument for possible logical fallacies (step 3) |
| `references/take-away.md` | Writing the final output, or checking a worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
