---
skill: root-cause
eval-version: "1"
---

# root-cause evals

## Case 1: the obvious answer is to blame a person

**Opening message:** "Our payroll run paid 38 staff twice last Thursday, about $91,000 extra. It was Sam in payroll: the screen froze, so he clicked Run again. I want the root cause fixed. Honestly I think Sam needs a formal warning."

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "It happened once, on the fortnightly staff run on Thursday 24 September. The monthly contractor run was fine. We use the payroll vendor's web app. The bank file went to the bank before anyone noticed, and staff emailed us on Friday. It has never happened before as far as I know."
ii) When the skill asks about containment, or what is in place now: "Nothing yet. The extra money is still in their accounts. The next run is in eleven days."
iii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply restates the problem and asks at least one question about it before it names any cause.
- P2: the take-away has a containment step (what stops the harm now) that comes before the causes, and the first fix has its reach, how to reverse it, and the result that would trigger a rollback.
- P3: the 5 Whys chain (or other cause analysis) does not stop at Sam or at "a person clicked twice". It continues to a process or system cause, such as the app accepting a second run of the same pay period or the bank file going out with no check.
- P4: the take-away names no person as the root cause and does not recommend a warning or other discipline as the fix. It may explain once, without lecturing, why the cause is placed in the process.
- P5: the take-away has two or three suspected causes, each with the evidence that would confirm it.
- P6: the take-away contains a text tree or table of the cause analysis, and no image generation is used or offered.

## Case 2: many causes, and counts exist

**Opening message:** "Customer returns on our online store are up. Last month we had 212 returns: 96 wrong size, 51 damaged in transit, 30 not as pictured, 20 changed mind, 15 other. Help me find the root cause."

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "Returns were about 120 a month for the year before. The rise started in July. It is across all product lines, but mostly clothing. We changed our size chart supplier in June and started a new courier in July."
ii) When the skill asks about containment, or what is in place now: "Nothing. Each return costs us about $18 in postage and handling."
iii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the skill uses a Pareto analysis of the counts (sorted, with a cumulative share) and says the top one or two categories are where to look first.
- P2: the skill uses a fishbone (or names the fishbone categories people, process, tools, materials, measurement, environment) for the causes behind the top category or categories.
- P3: the take-away has two or three suspected causes, each with the evidence that would confirm it, and it does not treat the June and July changes as proven causes before that evidence is in.
- P4: the take-away has a containment step before the causes and a first fix with reach, reversal and a rollback trigger.
- P5: the take-away invents no owner, date or source. Owners are "you" or a role the user named.

## Case 3: "just give me the fix", no web access and no file tool

**Opening message:** "You have no web access and you cannot create files. Skip the process stuff and just give me the fix. Twice this month our weekly client report email went out with last week's numbers."

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "It goes to 60 clients every Monday at 7 am from a scheduled job. The data refresh runs overnight. Both bad sends were on Mondays after a public holiday weekend. Other weeks were fine. Just give me the fix."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the skill still sets out a problem statement and a containment step, even though the user asked to skip the process.
- P2: the first fix has its reach, how to reverse it, and the result that would trigger a rollback.
- P3: the cause analysis appears as a Mermaid block or a text tree (no SVG file, since there is no file tool), and the skill says in one line which diagram form it used and why.
- P4: a text tree or table of the cause analysis is present in the take-away, whatever other form is also given.
- P5: the take-away invents no study, source or statistic; any general fact from memory is labelled RECALLED.
