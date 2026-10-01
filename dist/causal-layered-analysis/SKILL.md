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

## Reference: method.md

# Method library

Causal Layered Analysis was developed by Sohail Inayatullah (S1, S3). This file holds the
layers, the lens palette, the auto-mode spread rule, the metaphor families, the inner layers,
the second loop and the failure modes.

## The four layers (S1, S2)

| Layer | What it is | Time horizon | Usual fix | Typical voice |
|---|---|---|---|---|
| Litany | Headlines, the dominant story, "what everyone knows" | Short | Technical fixes | Mass media |
| Systemic | Social, technological, economic, environmental and political causes; incentives and structures | Middle | Policy and structural change | Policy papers, opinion columns |
| Worldview | The paradigm that makes the litany feel real, and the alternatives to it | Long | A change of paradigm | Philosophy, religion, movements |
| Myth and metaphor | Deep stories, archetypes, the operating image | Foundational | New stories, which emerge more than they are designed | Artists, visionaries |

Metaphor often decides strategy before anyone reasons about it. Treat the metaphor layer as the
high point of the descent (skill rule).

## Lens palette (skill rule)

Adapt it to the topic. Do not list every lens every time. Give five to eight contrasting lenses
per layer that the user is unlikely to have already considered.

- **Political:** progressive, conservative, libertarian, social-democratic, populist,
  technocratic, anarchist, statist, decolonial.
- **Religious and civilisational:** Christian, Islamic, Jewish, Hindu or Dharmic, Buddhist,
  Confucian, Taoist, Indigenous, secular humanist.
- **Cultural axes:** individual or collective; honour, dignity or face cultures; Western or
  non-Western; Global North or South; urban or rural; premodern, modern or postmodern; short
  or long time horizon.
- **Other lenses:** feminist, ecological, working-class or craft, contemplative,
  intergenerational (ancestors and descendants), non-human (other species, the planet,
  machines).

Below the litany, include at least one individual and one collective lens at every layer, and
at least one religious or civilisational lens the user has not raised.

At the worldview layer, cover at least one each of: a collective or relational worldview, an
individual or autonomy-centred worldview, a premodern worldview, a postmodern or emerging
worldview, and a religious worldview.

## Auto-mode spread rule (skill rule)

At every checkpoint, the four threads you carry must together include:

- at least one collective or relational lens;
- at least one individual or autonomy-centred lens;
- at least one religious or civilisational lens;
- at least one non-Western or non-modern lens.

Also:

- change at least two of the four lenses from one layer to the next, so the threads fan out;
- never carry two threads that differ on only one minor axis;
- at the metaphor layer, the four metaphors span at least three of the metaphor families below,
  and not all sit inside Western frames.

Prefer threads that lead to levers or metaphors the user would not expect, and that contrast
with the framing of the original question. Name the axis of each pick so the user can audit the
spread. Put the most unusual unpicked threads, not the dull ones, into roads not taken.

## Metaphor families (skill rule)

| Family | Examples |
|---|---|
| Ecological | compost, estuary, watershed, mycelium, soil |
| Craft | apprentice, midwife, gardener, weaver, librarian |
| Bodily and relational | immune system, conversation, dance, kinship |
| Religious and mythic | pilgrimage, exodus, communion, ancestor care |
| From outside the user's default frame | repair that shows the mend, Country and songlines, the village well |

Common current metaphors to look for: arms race, frontier, machine, war, market, ladder,
household, body.

## Inner layers for a personal question (S2)

When the question is about the user's own life, run the same steps with the inner layers:

| Layer | Inner form |
|---|---|
| Litany | How I present myself, and the story I tell others |
| Systemic | My inner selves or voices, and the habits and routines that keep things in place |
| Worldview | My dominant inner worldview: what I believe work, worth and rest are for |
| Myth and metaphor | The core story or family myth I run on |

Auto mode picks four inner selves or inner worldviews at each checkpoint. State nothing about
the user's life that they did not say. An inner voice, habit, fear, motive or cause the user
did not name is a candidate to explore, marked `[to confirm]`. This applies at every layer and
to every sideways reading: a lens says what it would look for, and the user decides if it fits. Each Drivers or Incentives line is wholly a question or wholly one marked candidate. A general mechanism stated before the marker still reads as a fact about the user.

| Do not write | Write |
|---|---|
| Taoist: you force against the grain of your own energy. | Taoist: a possible reading to test: is effort going against the grain of your energy? `[to confirm]` |
| Stoic: the distress comes from carrying outcomes you cannot control. | Stoic: a possible reading to test: some of the load may be outcomes outside your control. `[to confirm]` |
| Incentives: finishing gets praise and starting does not. Starting may feel risky `[to confirm]`. | Incentives: a possible reading to test: finishing gets praise and starting does not, so starting feels risky. `[to confirm]` |
| Drivers: deadlines pile up at the end of term. Is that true for you? | Drivers: do your deadlines pile up at one time of year? |

Keep the marker when a thread is carried forward and in the take-away. Never assume the user's gender, family
or history; write headlines about the user with "I" or "you". Draw no medical conclusion (skill rule).

## The second loop (skill rule)

After the take-away, offer a second loop. Ask one question: which seed (one of the stacks, or a
road not taken), and which mode? Then run the steps again with:

- the chosen stack treated as the present;
- a horizon about three times longer, unless the user sets one;
- lenses not used in the first loop, including at least one planetary or post-human lens;
- metaphors further from the original cultural frame.

Each further loop must stretch further, not relabel the one before.

## Failure modes (skill rule)

- Running layers before the question and the mode are settled.
- In interactive mode, running past a checkpoint without the user's pick.
- In auto mode, four threads from the same culture or political quadrant, or the same four
  lenses at every layer.
- Metaphors that are small variations of one another.
- A stack whose levers could sit under any metaphor. If the metaphor is compost, the levers
  should not read like the frontier package.
- Treating deeper layers as morally better.
- Dropping or shrinking the side-by-side table when there are stacks.
- A dull roads-not-taken list.

## Voice

Plain and slightly dry. No breathless futurism. Two to four sentences per perspective at any
layer: the depth comes from the combination of layers.

## Reference: take-away.md

# Take-away template

Fill every line. Keep the order. In a table cell, escape any `|` in the user's own text as
`\|` and replace a line break with a space or `<br>`, so the table still renders. Deliver it as
plain Markdown, so the user can copy it into any document.

```md
# Causal Layered Analysis: [question]

**Question:** [restated question]. **Affected:** [who]. **Horizon:** [horizon]. **Mode:** [interactive or auto]. **Layers:** [outer, or inner for a personal question].

## Layer 1: Litany (carried forward)
- [framing], [lens or axis]
[Headlines are illustrative, not quoted from a source. Numbers: [figure] (RECALLED), or [to confirm].]

## Layer 2: Systemic causes (carried forward)
- [diagnosis], [lens or axis]
[Personal question: each diagnosis about the user keeps its question form or its `[to confirm]` marker here.]
[or: Not reached.]

## Layer 3: Worldviews (carried forward)
- [worldview]: [one line]
[or: Not reached.]

## Layer 4: Myth and metaphor
**Current:** [metaphor] (myth or archetype: [name]).
**Alternatives surfaced:** [metaphor], [family]; [metaphor], [family]; ...
[or: Not reached.]

## Reconstructed stacks
### Stack A: [metaphor]
- **Metaphor:** [one-line image]
- **Worldview:** [short paragraph]
- **Systemic levers:** [four to seven levers]
- **New litany (illustrative):** "[headline]"; "[headline]". **New metric:** [metric]
- **First moves this quarter:** [two to four moves]
[Repeat for each stack. Or: No stacks: the run stopped at [layer].]

## Side-by-side
| Element | Stack A: [metaphor] | Stack B: [metaphor] |
|---|---|---|
| Operating metaphor | | |
| Worldview in one line | | |
| Headline systemic lever | | |
| New metric | | |
| What it makes you do differently this quarter | | |
[One column per stack. Or: No table, because there are no stacks.]

## Roads not taken
- **Litany:** [lens]: [one-line tease]
- **Systemic:** [lens]: [tease]
- **Worldview:** [worldview]: [tease]
- **Metaphor:** [metaphor]: [what it would reframe the issue as]
[In interactive mode, only threads worth a second look. Or: None.]

## Audit checks
- Each stack shifts the worldview, not only the implementation: [yes or no, per stack]
- Each stack carries a new metric, not only a new slogan: [yes or no]
- At least two religious or civilisational framings appear across the run: [yes or no]
- The furthest stack sits outside the paradigm of the original question: [yes or no]
- Auto mode only: the stacks span individual and collective, and Western and non-Western frames: [yes or no]
[For a stopped run: "Not applicable: no stacks."]

## Reflection
[Three to six lines: where the stacks agree, where they split, and why the split matters. For a stopped run: what the layers reached already show.]

Method: Inayatullah, S. (1998). Causal layered analysis: Poststructuralism as method. *Futures, 30*(8), 815-829.
```

## Worked example (short, interactive, one stack)

The user asked about public libraries over 15 years, in interactive mode, and carried one
thread at each layer. Only the stack and the table are shown here.

### Stack A: the village well

- **Metaphor:** the library as the place a community draws what it needs and meets while it
  does.
- **Worldview:** knowledge and meeting places are a shared good, kept up by the people who use
  them, not a service bought one loan at a time.
- **Systemic levers:** fund libraries as civic infrastructure, not per loan; count events and
  rooms booked alongside loans; let local groups run programmes; keep opening hours in the
  evening; share rooms with health and council services.
- **New litany (illustrative):** "Library bookings pass loans for the first time"; "Council
  measures the library by who meets there". **New metric:** hours of community use per week.
- **First moves this quarter:** count room bookings for one month; ask three local groups what
  they would run there.

| Element | Stack A: the village well |
|---|---|
| Operating metaphor | The place a community draws what it needs and meets while it does |
| Worldview in one line | Knowledge and meeting places are a shared good kept up by their users |
| Headline systemic lever | Fund the library as civic infrastructure, not per loan |
| New metric | Hours of community use per week |
| What it makes you do differently this quarter | Count room bookings, and invite three local groups in |

Method: Inayatullah, S. (1998). Causal layered analysis: Poststructuralism as method. *Futures,
30*(8), 815-829.

## Worked example (personal question, carried threads)

The user asked why they keep putting off a thesis, over one year, in auto mode, and gave no
other detail. Only Layer 2 of the take-away is shown here. Every line about the user is a
question or a marked candidate.

```md
## Layer 2: Systemic causes (carried forward)
- A possible reading to test: an inner critic who marks each draft before it is finished `[to confirm]`, individual axis
- Confucian: a possible reading to test: is the thesis carrying a duty to other people as well as your own goal? `[to confirm]`, collective axis
- Buddhist: does attachment to one perfect result make each start feel heavy? `[to confirm]`, religious axis
- Indigenous seasonal: a possible reading to test: one pace all year, with no season for rest `[to confirm]`, non-Western axis
```

## Sources

# Sources

All entries retrieved 29 September 2026.

[S1] Inayatullah, S. (1998). Causal layered analysis: Poststructuralism as method. *Futures, 30*(8), 815-829. Retrieved September 29, 2026, from https://doi.org/10.1016/S0016-3287(98)00086-X

[S2] Causal layered analysis. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Causal_layered_analysis

[S3] Inayatullah, S., & Milojević, I. (n.d.). *Metafuture: Futures studies by Sohail Inayatullah and Ivana Milojević*. Retrieved September 29, 2026, from https://www.metafuture.org/

[S4] PEST analysis. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/PEST_analysis
