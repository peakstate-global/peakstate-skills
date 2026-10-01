---
name: hard-conversation-prep
description: Prepares a difficult conversation with a colleague, manager, report, client or peer. It confirms the situation first, turns judgements into observable behaviour, and ends with an opening line, the situation, behaviour and impact (SBI), one clear request, and the likely replies with answers. Use when someone says "help me prepare for a hard conversation", "how do I raise this with", "I need to give tough feedback", "how do I tell my manager", "script this conversation", or before a conversation they are dreading.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "guided"
  output: "text"
---

This skill turns a situation someone is dreading into an opening line, a situation-behaviour-impact statement with one request, and answers to the replies they are likely to hear.

## Steps

Run the steps in order. Ask one question at a time and wait for the answer. This skill handles people issues, so say once, in the first reply: "Use only a tool your organisation has approved for this information." If the situation involves harassment, discrimination, a safety risk or a formal process, say once that the organisation's formal process or HR comes first and this preparation does not replace it, then continue if the user wants to.

0. **Confirm the situation.** This step is never skipped. Restate in at most four lines: who the other person is to the user, what happened, and what the user wants from the conversation. Name any gap. End with one question: "Is this right, or what would you change?" Write no script until the user confirms.
1. **Get one specific instance.** SBI needs a real moment. If the user has not given one with a when and a what, ask one question: "Tell me about one specific time: when was it, and what exactly did they do or say?" Never invent an instance. If the user's words already hold an observable act (such as "cut me off in the client call"), keep that act in the Behaviour line and mark only the missing detail "[to confirm: ...]". If the user gives nothing observable, the Situation and Behaviour lines read "[specific example to confirm]" and the reading says to find one before the conversation.
2. **Separate behaviour from story.** Write Situation (when and where), Behaviour (what a camera would record) and Impact (the effect on the user, the team or the work), using `references/method.md`. Turn every judgement word ("lazy", "rude", "always", "doesn't care") into the observable act behind it. The other person's intent is unknown: never state it as fact. Add one question that asks for their view. If the user gave the incident and the desired change but not the effect, ask once: "What has this cost you, the team or the work?" If the user still does not say, the Impact line reads "[impact to confirm]".
3. **Shape the request.** Offer one request: a specific action the other person could do, in positive words, that they could say no to. Ask the user once whether it is what they want. If the user wants to change nothing and only wants to be heard, accept that and do not offer again: the Request line reads "No request beyond being heard: [what the user wants them to know]." Add what the user will do if the answer is no, only if the user said it. If the user says a "no" is not an option here, this is a requirement, not a request: state it plainly as a requirement, plus its consequence if the user gave one, using `references/method.md`. Never dress a non-negotiable requirement up as an offer the other person could decline.
4. **Prepare the replies.** Pick three to five likely replies from `references/replies.md` that fit this situation and this relationship. For each, write an answer the user could say that listens first, then returns to the behaviour and the request (or to being heard). Never argue with the other person's right to decide something that is theirs to decide.
5. **Write the opening line.** At most two sentences. It names the topic and why the user is raising it, and invites a conversation. It holds no verdict about character or motive.

## The take-away

Deliver the parts in this order, using the template in `references/take-away.md`:

- The opening line.
- Situation, Behaviour, Impact, the question about their view, and the Request.
- The likely replies table, each reply with an answer.
- What the user does not know yet, and what would change the plan.

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a person or role the user named. Never invent a person, a date or a source. Write every move in this shape: "**Owner:** [who]. This week: [first action]. Result: [what someone could see]."

1. Book a private time for the conversation, or ask the other person when suits them.
2. Say the opening line and the Behaviour line out loud once, and cut any word that judges.
3. After the conversation, write down what was agreed, or what you learned about their view, and when you will check in.

To prepare the facts or the argument behind the conversation, the user may also like a skill for finding blind spots, if they have one. Do not run it for them.

## Self-check before you deliver

- The user confirmed the situation before any script.
- The approved-tool line appears once in the first reply.
- Situation and Behaviour keep every observable act the user gave; only a missing detail reads "[to confirm: ...]". Impact holds the effect the user gave, or "[impact to confirm]" if asked once and still not given.
- Behaviour has no judgement word and no claim about intent; intent appears only as a question.
- The Request is one specific, positive action the other person could decline, or reads "No request beyond being heard" when the user declined to make one, or states a requirement plus its consequence when the user said a "no" is not an option.
- The opening line is at most two sentences and labels no character or motive.
- There are three to five likely replies, each with an answer.
- No person, date, fact or source was invented.

## Read this when

| File | When |
|---|---|
| `references/method.md` | Writing Situation, Behaviour, Impact, the request, and the question about their view (steps 2 and 3) |
| `references/replies.md` | Choosing likely replies and writing answers (step 4) |
| `references/take-away.md` | Writing the final output, or checking a worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.

## Reference: method.md

# Method

Each entry carries a source id, such as (S1), that resolves in `SOURCES.md`.

## Situation, Behaviour, Impact (S1)

| Part | What it holds | Example |
|---|---|---|
| Situation | When and where, specific enough that both people recall the same moment | "In Thursday's client call" |
| Behaviour | What the person did or said, as a camera would record it. No adjectives about the person, no guess at why | "You answered the client's pricing question before I had finished my answer" |
| Impact | The effect on the speaker, the team or the work. Speak for yourself: "I", "the team", "the report" | "The client asked me afterwards which price was right, and I had to follow up in writing" |
| Intent (question) | Ask what the person meant or what got in the way, because the gap between intent and impact is where most misreading sits | "What was going on for you that day?" |

Turning judgement into behaviour (S1):

| Judgement | Ask | Behaviour |
|---|---|---|
| "lazy", "doesn't care" | What did they do or not do, and when? | "Handed in the roster two days after it was due" |
| "rude" | What were the words or actions? | "Said 'that's not my problem' and left the call" |
| "always", "never" | Which times, exactly? | "Three of the last four Mondays" |
| "undermined me" | What did people see happen? | "Changed the plan I had agreed with the client, without telling me" |

## Three conversations in one (S2)

A hard conversation carries three conversations at once. Prepare for each:

- **What happened:** each person has a different version. Treat yours as one view, and plan to ask for theirs. Move from blame (whose fault) to contribution (what each person did that led here).
- **Feelings:** name your own feeling briefly if it matters to the impact; do not make the other person responsible for it.
- **Identity:** the conversation may threaten how either person sees themself ("I am competent", "I am fair"). Expect defensiveness to come from here, not from the facts.

## The request (S3)

- One action, specific enough that both people would agree whether it happened. "Hand in the roster by Wednesday noon, or tell me by Tuesday if it will be late", not "be more reliable".
- Positive words: ask for what you want done, not for what to stop.
- A request can be declined. If a "no" is not acceptable, it is a requirement, not a request. State it as "Requirement: [what must happen]", plainly, and add "Consequence: [what follows]" only if the user stated one. Never write a requirement as if it were an offer the other person could decline.
- If the user does not want to ask for anything, record "No request beyond being heard" and do not press. Being heard is a legitimate aim.

## The opening line (S2, S1)

Two sentences at most: the topic, and why you are raising it, then an invitation. "I want to talk about how we share client calls, because Thursday's left the client unsure. Can we agree how we split questions?" No verdict, no "we need to talk about your attitude".

## Reference: replies.md

# Likely replies

Each entry carries a source id, such as (S1), that resolves in `SOURCES.md`. Pick three to five that fit the situation and the relationship. Fit the answer to the user's own words.

The pattern for every answer: acknowledge what they said, ask or listen, then return to the behaviour and the request (S2).

| Reply type | Sounds like | Answer pattern | Source |
|---|---|---|---|
| Denial of the facts | "That's not what happened." | "You may see it differently. Here is what I saw: [behaviour]. How do you see it?" | (S2) |
| Counter-blame | "Well, you never give me the data on time." | "That may be part of it, and I want to hear it. Can we take that next, after we agree on [request]?" | (S2) |
| Justification | "I had three other deadlines that day." | "That helps me understand. What would let you still meet [request], or tell me early when you can't?" | (S1) |
| Emotion | Tears, anger, silence | Pause. "I can see this is hard. Do you want to keep going now or pick it up tomorrow?" | (S2) |
| Too-quick agreement | "Sure, fine, won't happen again." | "Thanks. So we are both clear: [request]. What might get in the way?" | (S3) |
| Minimising | "It's not a big deal." | "It may not look big from where you sit. The impact on me was [impact]." | (S1) |
| Authority or priorities (talking upward) | "I need to move people where the business needs them." | "That is your call to make. What I am asking is [request], so I can plan around it." | (S2) |
| Intent defence | "I didn't mean it that way." | "I believe you. The impact was still [impact], and that is why I raised it." | (S1) |
| A "no" to the request | "I can't commit to that." | "What could you commit to?" Then, only if the user said it: what they will do next. | (S3) |

## Reference: take-away.md

# Take-away template

Fill every line. Keep the order.

```md
### Opening line

"[At most two sentences: the topic, why you are raising it, an invitation.]"

### What you will say

- **Situation:** [when and where, from the instance the user gave, or [specific example to confirm]]
- **Behaviour:** [what a camera would record, no judgement word, or [specific example to confirm]]
- **Impact:** [the effect on you, the team or the work, or [impact to confirm] if the user was asked once and still did not say]
- **Their view (ask):** "[a question about what was going on for them]"
- **Request:** "[one specific, positive action they could decline]"
  [Or, if the user declined to make one:] No request beyond being heard: [what the user wants them to know].
  [Or, if the user said a "no" is not an option:] Requirement: [what must happen]. Consequence: [what follows, only if the user stated it].
- **If they say no:** [only what the user said they will do; otherwise leave this line out]

### Likely replies

| They might say | You could say |
|---|---|
| "[reply]" | "[answer: acknowledge, ask or listen, return to the behaviour and the request]" |
| ... | ... |

### What you do not know yet

[Their intent and version of events, plus any gap such as a missing instance. The one fact that would most change this plan.]
```

## Worked example (short)

A team lead prepares to talk to a report whose timesheets are late. Instance given: last Friday's timesheet was due at 5pm and arrived on Monday at 11am, and payroll had to re-run.

### Opening line

"I want to talk about timesheets, because last week's late one caused a payroll re-run. Can we work out what would make Fridays easier?"

### What you will say

- **Situation:** Last Friday, when timesheets were due at 5pm.
- **Behaviour:** Your timesheet arrived on Monday at 11am.
- **Impact:** Payroll had to re-run the pay batch, and I spent an hour on it with them.
- **Their view (ask):** "What got in the way on Friday?"
- **Request:** "Could you submit it by 5pm on Friday, or message me by 3pm if you can't?"

### Likely replies

| They might say | You could say |
|---|---|
| "Friday afternoons are when the client calls come in." | "That helps. Would doing it at lunch on Friday work, or earlier in the week?" |
| "It was only once." | "It may feel that way. The impact was a full re-run, and that is why I raised it." |
| "Sure, no problem." | "Thanks. So we are clear: by 5pm, or a message by 3pm. What might get in the way?" |

### What you do not know yet

Why it was late. If Friday client calls are a regular clash, the request may need to change to a different day.

## Sources

# Sources

All entries retrieved 29 September 2026.

[S1] Center for Creative Leadership. (2025, August 19). *Use Situation-Behavior-Impact (SBI) to understand intent*. Retrieved September 29, 2026, from https://www.ccl.org/articles/leading-effectively-articles/closing-the-gap-between-intent-vs-impact-sbii/

[S2] Stone, D., Patton, B., & Heen, S. (2000). *Difficult conversations: How to discuss what matters most* [Audiobook]. Random House Audio. Retrieved September 29, 2026, from https://www.penguinrandomhouse.com/books/331191/difficult-conversations-by-douglas-stone-bruce-patton-and-sheila-heen/

[S3] Nonviolent Communication. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Nonviolent_Communication
