---
name: systems-map
description: Guides you through mapping the system behind a problem that keeps coming back. It describes the pattern over time, lists the variables, links them into causal loops with a polarity on every link (marking which links you confirmed and which it suggested), names the system archetype that fits, if one does, and suggests one leverage point with a small test. It writes the causal loop in text notation always and draws it as a diagram at the best rung your host supports. Use when someone says "systems map", "causal loop", "causal loop diagram", "system archetype", "systems thinking", "why does this keep happening", "vicious circle", "find the leverage point", or describes a fix that keeps failing.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "guided"
  output: "diagram"
---

This skill maps the causal loops behind a recurring problem, names the system archetype that fits, and suggests one leverage point to test, as text notation and a diagram.

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

This skill uses the diagram ladder: an SVG file or artifact, then a Mermaid flowchart, then the text notation alone. Never use image generation for a causal loop, even when the user asks for it: generated images corrupt labels, arrows and polarity signs. Say so in one line and offer the SVG instead. Always give the text notation as well, whatever rung you take. Templates: `references/diagrams.md`.

## Steps

Say once, in the first reply: "Use only a tool your organisation has approved for this information." Then run the steps in order. Ask one question at a time and wait for the answer.

If the user asks to skip the questions, build the whole take-away in one pass from what they gave: a link the user stated is "you", every link you add is "suggested", every unknown is `[to confirm]`, the archetype is "suggested", and the leverage point is a hypothesis. Then offer to confirm the links.

1. **Describe the pattern.** Ask one question: what keeps happening, how has it changed over time, and what has been tried? A systems map explains a pattern over time, not a single event (S2). If the user describes a one-off failure, say a root-cause method fits better, and carry on only if they want the map.
2. **List the variables.** Suggest four to eight variables from what the user said. Each is a noun phrase that can go up or down ("backlog size", not "the backlog problem") (S2). Ask the user to confirm or correct the list in one reply. Keep every variable the user adds.
3. **Link them.** Suggest each causal link with a polarity and a one-line reason, and ask the user to confirm or correct them in one reply. `+` means both move the same way; `-` means they move opposite ways; `||` marks a delay (S2). A link the user gives or confirms is marked "you". Every other link stays "suggested", including after "your call". A link whose direction nobody knows gets polarity `?` and `[to confirm]`: never guess a sign and state it as fact.
4. **Find the loops.** Trace each closed loop. Count its `-` links: an even count (zero included) makes it R, reinforcing; an odd count makes it B, balancing (S2). A loop with any `?` link is "type unknown until [link] is confirmed". Number them R1, B1 and so on.
5. **Name the archetype.** Compare the loops with `references/archetypes.md`. Suggest the one or two that fit best, each with the evidence from the user's own words, and ask one question: which fits? The user may pick one, pick none, or say "your call". Record the archetype as "confirmed by you", "suggested" or "no standard archetype fits". A map with no archetype is still a complete map.
6. **Find the leverage point.** Suggest one leverage point from the archetype's usual leverage, or from the loops when no archetype fits. Name its level on Meadows' list in `references/archetypes.md` (S3). Ask one question: can you act on this, or who can? Fit the point to what the user can change. The leverage point is always a hypothesis, with a small test that would show within a few weeks whether it works. Never call it proven.
7. **Draw the map.** Write the text notation, then draw the diagram at the best rung of the ladder. Say in one line which rung you took.

## The take-away

Deliver these parts in this order, using the template in `references/take-away.md`:

- The pattern over time, in the user's words and numbers.
- The links table: from, to, polarity, delay, rated by ("you" or "suggested").
- The loops: each with its number, type (R, B or unknown) and a one-line story.
- The causal loop in text notation, then the diagram at the rung you took.
- The archetype, with its status and the evidence it rests on.
- The leverage point: what it is, its level on Meadows' list, why, and the small test. Labelled a hypothesis.
- What you do not know yet: every `[to confirm]` item, every `?` link and every suggested link.

If you cannot browse or open files, say so in one line. Any fact from memory is labelled RECALLED. Never invent a number, an owner, a date or a source.

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a role the user named. Never invent a person or a date.

1. Check the suggested links and every `?` link with someone who works inside the system, and note any change.
2. Run the small test of the leverage point, and write down what you expect to see before you start.
3. Pick the one variable that shows whether the pattern is changing, and start recording it on a regular day.

If the problem is a single failure rather than a pattern, the user may also like a skill for root-cause analysis, if they have one. Do not run it for them.

## Self-check before you deliver

- Each reply before the take-away asked at most one question, unless the user asked to skip them.
- Every link has a polarity (`+`, `-` or `?`) and says "you" or "suggested"; no suggested link is called confirmed.
- Every loop type follows the count of `-` links, and a loop with a `?` link is typed unknown.
- The archetype status is one of "confirmed by you", "suggested" or "no standard archetype fits", with evidence from the user's words.
- The leverage point names its level on Meadows' list, is labelled a hypothesis and has a small test.
- The text notation is present, the diagram rung is named, and no image generation was used.
- No number, owner, date or source is invented; the three next moves have an owner, a first action this week and an observable result.

## Read this when

| File | When |
|---|---|
| `references/archetypes.md` | Naming the archetype, or choosing a leverage point and its level on Meadows' list |
| `references/diagrams.md` | Writing the text notation, or drawing the loop as Mermaid or SVG |
| `references/take-away.md` | Writing the final output, or checking the worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
