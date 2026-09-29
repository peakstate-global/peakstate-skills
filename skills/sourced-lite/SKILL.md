---
name: sourced-lite
description: Takes an idea, claim or position and makes it something you can stand behind. It restates the idea in its strongest form and waits for you to confirm, then labels every load-bearing claim by where it came from, records the decisions that shaped the result, argues the strongest case against it, integrates what survives, and ends with a provenance block. Use when someone says "check this claim", "is this true", "stress-test my argument", "back this up", "steelman this", "what is the evidence for", "make this defensible", or before a paper, brief or recommendation goes to someone who will rely on it.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "guided"
  output: "text"
---

This skill turns an idea or claim into a final position with a claim ledger, a decision record, adversarial findings and a provenance block.

## Steps

Run the steps in order. Ask one question at a time and wait for the answer. If the input may be sensitive, say once: "Use only a tool your organisation has approved for this information."

0. **Clarify and confirm.** This step is never skipped. It outranks any "just do it", "skip the questions" or "be quick". Restate the idea in its most generous form: the strongest version of the claim, what the user wants (support a position, test an idea, explore a question or inform a decision), who it is for, and what done looks like. Where the opening is vague, give your best reading and name the gaps. End with one question: "Is this right, or what would you change?" Do no research and state no verdict until the user confirms. If the user says "just do it" without confirming, restate once more in two lines and ask again.
1. **Ground the claims.** List each load-bearing claim, the claims the position falls over without. Label each one SOURCED, RECALLED or INFERRED (see `references/method.md`). SOURCED needs a source you retrieved in this session, the verbatim sentence or a precise paraphrase, and a locator. If you cannot browse or open files, say so in one line and label memory as RECALLED. Never present RECALLED as SOURCED. Never invent a source, a quote, a page or a date.
2. **Record material decisions.** Record only the decisions that shaped the result, such as which question to answer, which evidence to trust, or which definition to use. Each record has the decision, options considered, evidence, option chosen, what was rejected and the uncertainty. This is not a reasoning trace. Most runs have two to five records. If a decision is the user's to make (taste, risk appetite, budget, intent), ask it as this step's one question.
3. **Review adversarially.** Write the strongest case against the conclusion and against the research: source quality, missing counter-evidence, and a better explanation for the same facts. For each claim that survives, name the observation that would make it false. For each claim that fails, record three things: where it holds, where it fails, and what is true instead in the failing region. A failed claim stays in the ledger.
4. **Integrate.** Build the final position from what survived. Use one or more of the three moves in `references/method.md`: conditional (name the region and the observation that places a case in it), reframe (only when you can name the hidden assumption both sides share), or level shift (name both levels). If you cannot name the assumption, do not call it a reframe.
5. **Disclose.** Write the provenance block with four labels: Attribution, Accountable, Limitations, References. Test each Limitations sentence: would a reader decide differently knowing it? If not, cut it. "None material." is a complete line. Never use a "Verified:" label. Name the decision a person must make and what they must check first. Leave Accountable as "[name to confirm]" unless the user gave a name.

## The take-away

Deliver the five parts in this order, using the template in `references/take-away.md`:

- The final position, answer first, in one to three sentences.
- The claim ledger: one row per load-bearing claim, with label, evidence and locator, and status (holds, fails, or holds in part).
- The decision record.
- The adversarial findings, including every failed claim with where it holds, where it fails and what is true instead.
- The provenance block.

A cut-down, markdown-only version of the SOURCED method (S1).

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a role the user named. Never invent a person, a date or a source.

1. Check the RECALLED claims that carry the most weight, and upgrade each to SOURCED or cut it.
2. Put the person named under Accountable in front of the decision the provenance block names.
3. Watch for the observation that would make the main claim false, and say where it would show up.

For a deeper check of hidden assumptions, the user may also like a skill for blind spots, if they have one. Do not run it for them.

## Self-check before you deliver

- The user confirmed the restated idea before any research or verdict.
- Every load-bearing claim has exactly one label, and no RECALLED claim appears as SOURCED.
- Every SOURCED claim has a quote or precise paraphrase and a locator from this session.
- The decision record holds only material decisions, each with its six fields.
- Every failed claim records where it holds, where it fails and what is true instead.
- Any reframe names the shared hidden assumption, and any conditional names its region.
- The provenance block has exactly four labels, no "Verified:" line, and every Limitations sentence passes the decision test.
- No owner, date, quote or source was invented.

## Read this when

| File | When |
|---|---|
| `references/method.md` | Labelling a claim, writing a decision record, choosing an integration move, or testing a Limitations sentence |
| `references/take-away.md` | Writing the final output, or checking a worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
