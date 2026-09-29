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

0. **Clarify and confirm.** This step is never skipped. It outranks any "just do it", "skip the questions" or "be quick". Restate the idea in its most generous form: the strongest version of the claim, what the user wants (support a position, test an idea, explore a question or inform a decision), who it is for, and what done looks like. Where the opening is vague, give your best reading and name the gaps. Restate the user's numbers exactly as given. Do not rank, total or compare them beyond what the user said. For example, the user writes "40 per cent named cost and 15 per cent named speed": write "40 per cent named cost and 15 per cent named speed", not "cost is the top reason". If you read a ranking or cause into the numbers, write it as "My reading, to confirm: ...". End with one question: "Is this right, or what would you change?" Do no research and state no verdict until the user confirms. If the user says "just do it" without confirming, restate once more in two lines and ask again.
1. **Ground the claims.** List each load-bearing claim, the claims the position falls over without. Label each one SOURCED, RECALLED or INFERRED (see `references/method.md`). SOURCED needs a source you retrieved in this session, the verbatim sentence or a precise paraphrase, and a locator. If you cannot browse or open files, say so in one line and label memory as RECALLED. Never present RECALLED as SOURCED. Never invent a source, a quote, a page or a date. The ledger is the only way a fact enters the take-away. To use any fact later, give it a row first, marked unresolved if you cannot ground it.
2. **Record material decisions.** Record only the decisions that shaped the result, such as which question to answer, which evidence to trust, or which definition to use. Each record has the decision, options considered, evidence, option chosen, what was rejected and the uncertainty. The evidence field holds ledger ids only. Every other field names an option or gives a reason that cites ledger ids. A reason that goes beyond what those rows say ends with (INFERRED). No other fact appears. This is not a reasoning trace. Most runs have two to five records. If a decision is the user's to make (taste, risk appetite, budget, intent), ask it as this step's one question.
3. **Review adversarially.** The findings are numbered lines, F1, F2 and on, built only from ledger rows. Each line has one fixed shape:

   `F1 [C2] "<words copied exactly from row C2>" → <conclusion>`

   - The quoted words appear character for character in that row: the evidence cell for a SOURCED row, the claim cell for any other row. A line may quote more than one row.
   - The conclusion says only what the quoted words say, or it ends with (INFERRED). It adds no new fact: no number, name, date, study detail, or statement about what a source or firm says or does. A fact you want to use gets a ledger row first.
   - There is no finding without a ledger row, and no prose outside the lines. Context or colour you would like to add goes nowhere.

   Write lines for the strongest case against the conclusion and against the research: source quality, sources with a stake, missing counter-evidence, a rival explanation. Then one line per ledger row, none skipped. A row that holds gets "would be false if <observation>", where the observation is something to check, not a new fact. A row that fails or holds only in part gets "Holds: ... Fails: ... Instead: ...". A row you cannot ground or test gets "unresolved. Would be settled by ...". A failed or unresolved row stays in the ledger.
4. **Integrate.** Write the integration as the last finding line, citing the findings it builds on. Use one or more of the three moves in `references/method.md`: conditional (name the region and the observation that places a case in it), reframe (only when you can name the hidden assumption both sides share), or level shift (name both levels). Then write the final position from what survived. It cites the findings it rests on by id, such as (F2, F7), adds no fact they do not hold, and never rests on an unresolved row.
5. **Disclose.** Write the provenance block with four labels: Attribution, Accountable, Limitations, References. Test each Limitations sentence: would a reader decide differently knowing it? If not, cut it. "None material." is a complete line. Never use a "Verified:" label. Name the decision a person must make and what they must check first. Leave Accountable as "[name to confirm]" unless the user explicitly names the person accountable. A person named only as the audience, a reviewer or an approver is not the accountable person.

## The take-away

Deliver the five parts in this order, using the template in `references/take-away.md`:

- The final position, answer first, in one to three sentences, citing findings by id.
- The claim ledger: one row per load-bearing claim, with label, evidence and locator, and status (holds, fails, holds in part, or unresolved).
- The decision record, built from ledger ids.
- The adversarial findings, one fixed-shape line each, ending with the integration line.
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
- Every load-bearing claim has exactly one label, no RECALLED claim appears as SOURCED, and every SOURCED claim has a quote or precise paraphrase and a locator from this session.
- The decision record holds only material decisions, each with its six fields, and its evidence field holds ledger ids only.
- Every finding line has the shape `F# [C#] "quote" → conclusion`, the quote appears exactly in that row, a conclusion beyond the quote ends with (INFERRED), and nothing sits in the findings outside a numbered line. No fact appears in the findings, the decision record or the final position unless a ledger row holds it.
- Every ledger row has a finding line. The final position cites findings by id and rests on no unresolved row.
- Any reframe names the shared hidden assumption, and any conditional names its region.
- The provenance block has exactly four labels, no "Verified:" line, and every Limitations sentence passes the decision test.
- No owner, date, quote or source was invented, and Accountable names a person only if the user named them as accountable.

## Read this when

| File | When |
|---|---|
| `references/method.md` | Labelling a claim, writing a decision record, choosing an integration move, or testing a Limitations sentence |
| `references/take-away.md` | Writing the final output, or checking a worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
