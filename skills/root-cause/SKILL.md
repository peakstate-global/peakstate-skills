---
name: root-cause
description: Guides a team from a symptom to a root cause and a safe first fix. It writes a precise problem statement (what, where, when, how much, what it is not), sets containment to stop the harm now, picks the right tool (5 Whys for one chain, fishbone for many causes, Pareto when counts exist), names two or three suspected causes with the evidence that would confirm each, and ends with a first fix that states its reach, how to reverse it and the result that triggers a rollback. It draws the cause analysis as a diagram and always as a text tree. Use when someone says "find the root cause", "why does this keep happening", "run a 5 whys", "draw a fishbone", "do a post-incident review", "what went wrong", "fix this for good", or brings a defect, incident, complaint trend or repeated failure.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "guided"
  output: "diagram"
---

This skill turns a symptom into a problem statement, containment, a cause diagram with a text tree, two or three suspected causes with confirming evidence, and a first fix with reach, reversal and a rollback trigger.

## Adapt to your host

Hosts differ, and the same host differs by plan and by organisation. Before you
make the output, check what you can do here.

1. List the tools you can call right now, such as code execution, file creation,
   image generation or a live preview (an artifact or a canvas).
2. Take the first rung of the ladder below that your tools support. Trust your
   own tool list over any host name or table.
3. Tell the user in one line which rung you took and why. For example: "There is
   no file tool here, so the SVG is in a code block for you to save."
4. If the user names a format, use that format instead of the ladder.

### Ladder

This skill uses the diagram ladder: an SVG file or artifact, then a Mermaid block, then a text tree or table. Never use image generation for the diagram, because generated images corrupt labels and arrows. Always give the text tree as well, whatever rung you take. Templates: `references/diagrams.md`.

## Steps

Run the steps in order. Ask one question at a time and wait for the answer. If the input may be sensitive, say once: "Use only a tool your organisation has approved for this information." Containment (step 2) and the rollback trigger (step 6) are never skipped, even after "just give me the fix": they are what stops a wrong fix doing more harm. If the user asks to skip them, keep them to one or two lines each.

1. **State the problem.** Restate the symptom as a problem statement: what, where, when, how much, and what it is not (where it could happen but does not). Describe events and actions, never people: "the run was started twice", not a name. Mark each gap "[to confirm]". Ask one question for the most important gap, and name no cause until the user answers. Method: `references/method.md`.
2. **Contain the harm.** Say what stops or limits the harm now, before any cause is known: a hold, a manual check, a rollback, a notice to the people affected. If the harm has stopped, write "No containment needed:" and the reason. Ask one question: what is in place now, or can the user do the proposed containment today.
3. **Pick the tool.** Use Pareto when the user has counts by category, fishbone when several causes may combine, and 5 Whys for one chain. Pareto first, then fishbone or 5 Whys on the top category. Tell the user in one line which tool and why. Do not ask.
4. **Run it.** Build the chain or the diagram from the user's facts. Mark each link as "known" (the user said it) or "to check". A 5 Whys chain stops at a cause the team can act on in a process, a tool, a rule or a check. It never stops at a person: when an answer is "someone did X", the next why asks what let X happen or made X likely. Fishbone categories: people, process, tools, materials, measurement, environment. The people branch holds conditions such as training, workload or handover, never a named person.
5. **Name the suspected causes.** Give two or three. For each, give the evidence that would confirm it and the evidence that would rule it out. A cause stays "suspected" until that evidence is in, even when the timing fits.
6. **Choose the first fix.** Pick the smallest fix that acts on the top suspected cause. Give its reach (what and who it changes), how to reverse it, and the result, with a number and a time where you can, that shows it worked or triggers a rollback.

## The take-away

Deliver the parts in this order, using the template in `references/take-away.md`:

- The problem statement, with what it is not.
- Containment, or "No containment needed:" and the reason.
- The tool used and why, in one line.
- The diagram at the rung you took, and the text tree or table.
- Two or three suspected causes, each with confirming and ruling-out evidence.
- The first fix: the change, its reach, how to reverse it, and the rollback trigger.

If you cannot browse or open files, say so in one line. Any fact from memory is labelled RECALLED. Never invent a study, statistic, source, owner or date. Every action, in containment, the fix and the next moves, is done by "you" or a role the user named, never a role you made up. In the diagram and text tree, mark a link "[known]" only when the user stated it; anything you inferred is "[to check]".

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a role the user named. Never invent a person, a date or a source.

1. Put the containment in place, or confirm it is in place, and record that it holds.
2. Collect the evidence for the top suspected cause and record whether it confirms or rules it out.
3. If step 2 confirmed the cause, make the first fix at its stated reach and watch the rollback trigger for the stated period. If step 2 ruled it out, re-rank the remaining suspected causes, pick the fix for the new top cause, and repeat from step 2.

To check the reasoning for hidden assumptions, the user may also like a skill for finding blind spots, if they have one. Do not run it for them.

## Self-check before you deliver

- The problem statement has what, where, when, how much and what it is not, with gaps marked "[to confirm]".
- Containment comes before the causes, or "No containment needed:" gives the reason.
- No chain stops at a person, and no person is named as a cause or as the target of the fix.
- Each suspected cause has confirming and ruling-out evidence, and none is called proven without it.
- The first fix has its reach, how to reverse it and a rollback trigger.
- The text tree or table is present, and no image generation was used for the diagram.
- No source, statistic, owner or date was invented, and memory is labelled RECALLED.
- Every doer in containment, the fix and the next moves is "you" or a role the user named, and every time or amount you estimated is marked "[to confirm]".

## Read this when

| File | When |
|---|---|
| `references/method.md` | Writing the problem statement, containment, choosing and running the tool, or writing the first fix |
| `references/diagrams.md` | Drawing the fishbone, 5 Whys chain or Pareto table at any rung of the ladder |
| `references/take-away.md` | Writing the final output, or checking a worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
