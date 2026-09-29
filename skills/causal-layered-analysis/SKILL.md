---
name: causal-layered-analysis
description: Runs Sohail Inayatullah's Causal Layered Analysis (CLA) on an issue. It goes down four layers (litany, systemic causes, worldview, myth and metaphor), looks sideways at contrasting perspectives at each layer, then builds alternative futures back up from new metaphors, with a side-by-side comparison. Runs in interactive mode (you pick the threads at each layer) or auto mode (it picks four threads with a deliberate spread and runs to the end). Use when someone says "causal layered analysis", "CLA", "run a CLA", "strategic foresight", "alternative futures", "deconstruct this issue", "what are the deeper drivers of", "what metaphor are we living in", or wants a new strategic narrative.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "guided"
  output: "text"
---

This skill takes an issue down the four layers of Causal Layered Analysis and back up again, and delivers one to four alternative futures with a side-by-side comparison.

## Steps

Say once, in the first reply: "Use only a tool your organisation has approved for this information." Then run the steps in order. Ask one question at a time and wait for the answer.

CLA does not predict. It opens up alternatives (S2). Move down through the layers, sideways across perspectives at each layer, then back up. Do not stay at one layer (S1). Deeper layers are deeper, not better.

1. **Frame the question.** If the user gave a topic, restate it in three lines: the question, who is affected, and the horizon. Ask one question: is this the question, or how would you sharpen it? If there is no topic, ask for one, with who is affected and the horizon. A good CLA question is contested, matters to people with different worldviews, and has a horizon the user cares about. If the question is about the user's own life, say you will use the inner layers in `references/method.md`, and name all four in that reply: how you present yourself, your inner voices and habits, your inner worldview, and your core story. If it is purely about money or markets, warn that every view shares the same money discourse, so the worldview layer is harder to open.
2. **Choose the mode.** Skip this step if the user already named a mode. Otherwise ask one question: interactive (you stop at each layer and the user picks one to three threads) or auto (you pick four threads at each layer under the spread rule and run to the end)? Default to interactive if the user does not say. Never switch mode mid-run unless the user asks.
3. **Litany.** Write four to eight short headlines of the issue as the media and everyday talk tell it, pro and con. Mark them "illustrative", since they are not quoted from a source. Give the one or two numbers most often cited, labelled RECALLED, or `[to confirm]` if you do not know them. Name the default fix at this layer. Then give five to eight sideways framings: the headline as a different political, religious or cultural lens would write it, each labelled with its lens. Checkpoint A.
4. **Systemic causes.** For each thread carried, give three to six drivers and two or three incentives that keep the issue in place, using STEEP (social, technological, economic, environmental, political) (S4). Name the usual fix at this layer. Then give five to eight sideways diagnoses from contrasting lenses. On a personal question, every driver, incentive, inner voice and habit the user did not state is a candidate cause to explore: write it as a question, or as one marked candidate: "A possible reading to test: ... `[to confirm]`". Each Drivers or Incentives line is wholly a question or wholly one candidate. Never lead with an unmarked clause, even a general mechanism, before the question or the marker. The sideways diagnoses follow the same rule: write each one as "A possible reading to test: [lens] would say ... `[to confirm]`" or as a question, never as "you do X". Checkpoint B.
5. **Worldview.** For each thread carried, name the paradigm that makes that diagnosis feel real. Ask whose voice it centres and whose it leaves out, and what it treats as universal that is really local. Then give five to eight alternative worldviews, one short paragraph each: how this worldview sees the problem, and what it says the future is for. Cover the range rules in `references/method.md`. Checkpoint C.
6. **Myth and metaphor.** For each worldview carried, name its operating metaphor, the myth or archetype under it, and the feeling it creates. Then give six to ten alternative metaphors across the metaphor families in `references/method.md`, one sentence each: what it makes the issue about, and which worldview it lives in. Checkpoint D.
7. **Build back up.** For each metaphor carried, build one stack: the metaphor as an image; the worldview it implies; four to seven systemic levers (policy, organisational, personal); a new litany of three to five headlines from a future where it came true, plus one or two new metrics; and two to four first moves for this quarter. Keep the stacks separate. Each layer must follow from the one below it.
8. **Deliver.** Write the take-away, then offer a second loop (see `references/method.md`).

### Checkpoints A to D

- **Interactive mode:** stop at each checkpoint. Ask one question: which one to three threads to carry forward? The user may also name a lens you missed. Wait.
- **Auto mode:** pick four threads under the spread rule in `references/method.md`, and name the axis each one represents. Put the interesting threads you did not pick into "roads not taken" for that layer. Carry on without asking.
- **"Your call" in interactive mode:** pick one to three threads yourself, say they are your picks, and carry on.
- **The user rejects every option:** offer one fresh set that differs from the first. If they reject that too, do not pick for them. Ask one question: name a framing in your own words, or stop here? If they stop, deliver the take-away with every layer after the last checkpoint passed marked "not reached", and no stacks.

### Honesty rules

- Headlines at the litany layer, and all new litanies, are illustrative. Never present one as a real quote.
- A number or fact from memory is labelled RECALLED. If you do not know it, write `[to confirm]`. Never invent a statistic, a source, an owner or a date.
- On a personal question, state nothing about the user's life that they did not tell you. This includes drivers, incentives, inner voices, habits, fears, motives and causes, at every layer: main threads, sideways framings and diagnoses, worldviews, metaphors, stacks and the reflection. Write each one the user did not give as a question, or as a labelled candidate: "A possible reading to test: ... `[to confirm]`". A lens reading is a candidate too: "a Stoic lens would ask whether ...", never "you carry ...". The marker stays on the thread when it is carried forward and when it appears in the take-away. Do not assume the user's gender, role, family or history, or how often something happens to them. Write headlines and litanies about the user with "I" or "you", never "he" or "she". Put gaps as `[to confirm]` or as questions. Draw no medical, legal or financial conclusion. If burnout, stress or health is in the question, say to talk to a doctor or other qualified professional if it affects their health.

## The take-away

Deliver these parts in this order, using the template in `references/take-away.md`:

- The question, who is affected, the horizon and the mode.
- The threads carried at each layer, each with its lens or axis. A layer not reached says "not reached".
- The current metaphor and the alternatives surfaced.
- One stack per metaphor carried (one to three in interactive mode, four in auto mode), or "No stacks: the run stopped at [layer]."
- The side-by-side table, one column per stack, with the five required rows: operating metaphor, worldview in one line, headline systemic lever, new metric, and what it makes the user do differently this quarter. Omit the table only when there are no stacks, and say so.
- Roads not taken, by layer (always in auto mode; in interactive mode, the threads the user dropped that are worth a second look).
- The audit checks and a three to six line reflection on where the stacks agree and where they split.
- The method credit line from the template.

If you cannot browse or open files, say so in one line.

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a role the user named. Never invent a person or a date.

1. Take the stack that most surprised you and try one of its first moves, and note what changed.
2. Show the side-by-side table to one person who holds a different worldview, and write down which stack they would pick and why.
3. Watch for one headline from the new litany, or one new metric, and record the first time you see it happen.

Then offer the second loop. If the user wants to stress-test an existing argument or strategy rather than open up an issue, the user may also like a skill for challenging a thesis with CLA, if they have one. Do not run it for them.

## Self-check before you deliver

- The question and the mode were settled before any layer analysis, and each reply before that asked at most one question.
- Interactive mode stopped at every checkpoint; auto mode carried exactly four threads at each layer and named each axis.
- Each stack has a metaphor, a worldview, levers, a new litany with a new metric, and first moves, and its levers follow from its metaphor.
- The side-by-side table has the five required rows and one column per stack, or the take-away says why there are no stacks.
- Illustrative headlines are marked, numbers from memory say RECALLED, and nothing unknown is stated as fact. On a personal question, every statement about the user's causes, motives, habits or history that the user did not give is a question or is marked `[to confirm]`, in every layer, with no unmarked lead-in clause on any Drivers or Incentives line, in the sideways lists and in the take-away.
- A layer not reached is marked "not reached", and no stack is built past where the run stopped.
- The method credit to Sohail Inayatullah is present, and the three next moves have an owner, a first action this week and an observable result.

## Read this when

| File | When |
|---|---|
| `references/method.md` | Choosing lenses, applying the auto-mode spread rule, picking metaphor families, running the inner layers, or offering a second loop |
| `references/take-away.md` | Writing the final output, or checking the worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
