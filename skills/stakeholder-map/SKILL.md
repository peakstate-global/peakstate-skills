---
name: stakeholder-map
description: Guides you through a stakeholder map for a change or a decision. It lists who is affected or can decide, rates each one's power and interest (marking which ratings you confirmed and which it suggested), records what each cares about, places them on a power and interest grid, and writes one message for each person or group. It draws the grid as a diagram and always as a text table, and warns that ratings about named people are sensitive. Use when someone says "stakeholder map", "map the stakeholders", "power interest grid", "who do I need to get on board", "stakeholder analysis", "who should I keep informed", or plans a change that needs buy-in.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "guided"
  output: "diagram"
---

This skill builds a power and interest grid for a change, with what each stakeholder cares about and one message for each, as a diagram and a text table.

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

This skill uses the diagram ladder: an SVG file or artifact, then a Mermaid quadrant chart, then a text grid. Never use image generation for the grid, because generated images corrupt labels and positions. Always give the text table as well, whatever rung you take. Templates: `references/diagrams.md`.

## Steps

In the first reply, say once: "Power and interest ratings about named people are sensitive. Share this map only with the people who need it, and use only a tool your organisation has approved for this information." Then run the steps in order. Ask one question at a time and wait for the answer.

If the user asks to skip the questions, build the whole take-away in one pass from what they gave: every rating is "suggested", every unknown is `[to confirm]`, and the warning stays. Then offer to confirm the ratings.

1. **Name the change.** Ask one question: what change or decision is the map for, and who decides.
2. **List the stakeholders.** Ask one question: who is affected, who decides, and who could block it. Accept names, roles or groups. Keep each as the user wrote it. Never assume a stakeholder's gender from a name or a role: refer to each by name or role, or use "they", unless the user used a pronoun for that person.
3. **Rate power and interest.** For each stakeholder, suggest high or low power and high or low interest, with a one-line reason from what the user said (S1). Ask the user to confirm or correct them in one reply. A rating the user gives or confirms is marked "you". Every other rating stays "suggested", including after "your call" or "I don't know". Never mark a suggested rating as confirmed.
4. **Find what each cares about.** Ask one question: what does each stakeholder care about most in this change? What the user says is used as given. An unknown concern is `[to confirm]`, with a question the user could ask that person. Do not guess a concern and state it as fact.
5. **Write one message each.** One or two sentences per stakeholder, aimed at what they care about and fitted to their quadrant (S2). Use `references/method.md`. When the concern is `[to confirm]`, write the message from the change itself and mark it "[depends on: concern to confirm]".
6. **Draw the grid.** Place each stakeholder on the grid at the best rung of the ladder, and give the text table. Say in one line which rung you took.

If the user plans to share the map widely, say that ratings of named people should stay with the people who need them, and offer a version safe to share: the messages and the plan without the ratings. A role-only version (roles without names, ratings kept) is safe only when each role is held by several people; when a role is unique in the organisation (a CIO, a named director's title), say the rating still identifies that person, and offer to drop the ratings instead. See `references/method.md`.

## The take-away

Deliver these parts in this order, using the template in `references/take-away.md`:

- The sensitivity warning, in one line.
- The change and who decides.
- The text table: stakeholder, power, interest, rated by ("you" or "suggested"), quadrant, what they care about, message.
- The diagram at the rung you took.
- What you do not know yet: every `[to confirm]` item and every suggested rating.

If you cannot browse or open files, say so in one line. Any fact from memory is labelled RECALLED. Never invent a concern, a rating source, an owner or a date.

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a role the user named. Never invent a person or a date.

1. Check each suggested rating and `[to confirm]` concern with someone who knows that stakeholder. If there are none, show the map to one such person and note any change.
2. Send or say the message to the stakeholder with the most power over the change, and note their reply.
3. Set how often each quadrant hears from you, and put the first update in the calendar.

If you need to prepare a hard conversation with one of these people, the user may also like a skill for that, if they have one. Do not run it for them.

## Self-check before you deliver

- The sensitivity warning is in the first reply and in the take-away.
- Each reply before the take-away asked at most one question, unless the user asked to skip them.
- Every rating says "you" or "suggested", and no suggested rating is called confirmed.
- No concern is stated as fact unless the user gave it; unknowns are `[to confirm]`.
- No reply calls a stakeholder "he" or "she" unless the user did; each is named, given a role, or "they".
- Every stakeholder has one message, and a message that rests on an unknown concern is marked.
- The text table is present, the diagram rung is named, and no image generation was used.
- The three next moves have an owner, a first action this week and an observable result, with no invented person or date.

## Read this when

| File | When |
|---|---|
| `references/method.md` | Rating power and interest, choosing the quadrant strategy, writing messages, or sharing the map |
| `references/diagrams.md` | Drawing the grid at any rung of the ladder |
| `references/take-away.md` | Writing the final output, or checking the worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
