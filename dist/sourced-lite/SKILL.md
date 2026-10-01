---
name: sourced-lite
description: Claims often go out on weak or unchecked evidence, and the reader cannot tell which parts to trust. Takes an idea, claim or position and shows what it rests on, so you can decide whether to stand behind it. It restates the idea in its strongest form and waits for you to confirm, then labels every load-bearing claim by where it came from, records the decisions that shaped the result, argues the strongest case against it, integrates what survives, and ends with a provenance block. Use when someone says "check this claim", "is this true", "stress-test my argument", "back this up", "steelman this", "what is the evidence for", "make this defensible", or before a paper, brief or recommendation goes to someone who will rely on it.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "guided"
  output: "text"
---

This skill turns an idea or claim into a final position with a claim ledger, a decision record, adversarial findings and a provenance block. It is a cut-down, markdown-only version of the SOURCED method (S1). It labels each claim and gives its address. It does not guarantee every phrase is exact, so the reader checks the citations that carry their decision.

## Steps

Run the steps in order. Ask one question at a time and wait for the answer. If the input may be sensitive, say once: "Use only a tool your organisation has approved for this information."

0. **Clarify and confirm.** This step is never skipped. It outranks any "just do it", "skip the questions" or "be quick". Restate the idea in its most generous form: the strongest version of the claim, what the user wants (support a position, test an idea, explore a question or inform a decision), who it is for, and what done looks like. Where the opening is vague, give your best reading and name the gaps. Restate the user's numbers exactly as given. Do not rank, total or compare them beyond what the user said. For example, the user writes "40 per cent named cost and 15 per cent named speed": write "40 per cent named cost and 15 per cent named speed", not "cost is the top reason". If you read a ranking or cause into the numbers, write it as "My reading, to confirm: ...". End with one question: "Is this right, or what would you change?" Do no research and state no verdict until the user confirms. If the user says "just do it" without confirming, restate once more in two lines and ask again.
1. **Ground the claims.** List each load-bearing claim, the claims the position falls over without. Label each one SOURCED, RECALLED or INFERRED (see `references/method.md`). SOURCED needs a source you retrieved in this session, the verbatim sentence or a precise paraphrase, and a locator. Words in quotation marks are always verbatim from the source. A paraphrase has no quotation marks and ends (paraphrase). A claim cell says no more and no less than its evidence: if the source says "public companies", the claim does not say "US public companies". Build a SOURCED claim cell from its evidence cell: every name, number, date, place and kind of organisation in the claim appears in the evidence cell or its locator. Anything else you know about that source is a separate row. If you cannot browse or open files, say so in one line and label memory as RECALLED. Never present RECALLED as SOURCED. Never invent a source, a quote, a page or a date. The ledger is the only way a fact enters the take-away. To use any fact later, give it a row first, marked unresolved if you cannot ground it.
2. **Record material decisions.** Record only the decisions that shaped the result, such as which question to answer, which evidence to trust, or which definition to use. Each record has the decision, options considered, evidence, option chosen, what was rejected and the uncertainty. The evidence field holds ledger ids only. Every other field names an option or gives a reason that cites ledger ids. A reason that goes beyond what those rows say ends with (INFERRED). No other fact appears. This is not a reasoning trace. Most runs have two to five records. If a decision is the user's to make (taste, risk appetite, budget, intent), ask it as this step's one question.
3. **Review adversarially.** The findings are numbered lines, F1, F2 and on, built only from ledger rows. Each line has one fixed shape:

   `F1 [C2] "<verbatim source words from C2's evidence cell>" → <conclusion>`
   `F1 [C2] <words copied from C2's claim cell> → <conclusion>`

   - Use the first form for a SOURCED row with a verbatim quote, copied character for character. Use the second form, with no quotation marks, for any other row. A line may cite more than one row, and it cites every row whose fact it uses.
   - The integration line is the one exception to this shape (step 4).
   - The conclusion says only what the quoted words say, or it ends with (INFERRED). It adds no new fact: no number, name, date, study detail, or statement about what a source or firm is, says, sells or does. A fact you want to use gets a ledger row first.
   - (INFERRED) marks reasoning from the cited rows. It never licenses a fact. "The trial's sponsor sells four-day-week consulting" is a fact, even inside an (INFERRED) conclusion, so it needs a row.
   - There is no finding without a ledger row, and no prose outside the lines. Context or colour you would like to add goes nowhere.

   Write lines for the strongest case against the conclusion and against the research: source quality, sources with a stake, missing counter-evidence, a rival explanation. A stake is a fact. Before a line says a source has a stake, give the stake its own row, RECALLED if you cannot check it. Then one line per ledger row, none skipped. A row that holds gets "would be false if <observation>", where the observation is something to check, not a new fact. A row that fails or holds only in part gets "Holds: ... Fails: ... Instead: ...". A row you cannot ground or test gets "unresolved. Would be settled by ...". A failed or unresolved row stays in the ledger.
4. **Integrate.** Write the integration as the last finding line, in this shape: `F# [F2, F5] → Integration, <move>. <conclusion> (INFERRED)`. It cites findings, not rows. Use one or more of the three moves in `references/method.md`: conditional (name the region and the observation that places a case in it), reframe (only when you can name the hidden assumption both sides share), or level shift (name both levels). Then write the final position from what survived. It uses the ledger's words, not the user's, and never rests on an unresolved row. Each sentence ends with the ids that hold its facts: the row each fact comes from and the finding that tests it, such as (C1, F3). Check that each cited id holds the fact. If none does, cut the fact.
5. **Disclose.** Write the provenance block with four labels: Attribution, Accountable, Limitations, References. A reference gives only what its locator or retrieved page shows, and names an unknown field as unknown. Test each Limitations sentence: would a reader decide differently knowing it? If not, cut it. "None material." is a complete line. Never use a "Verified:" label. Name the decision a person must make, and the row ids they must check first: the rows that carry that decision. Say in Limitations, in one sentence, that the ledger gives each claim's address and the reader checks the cited rows before relying on them. Leave Accountable as "[name to confirm]" unless the user explicitly names the person accountable. A person named only as the audience, a reviewer or an approver is not the accountable person.
6. **Get a fresh check, then deliver.** Draft the whole take-away first. You cannot see your own slips, because you have read the sources, so the check needs a reader who has not. If your host can start a separate agent, or a new conversation with no history, give it the drafted take-away, word for word, and the checker prompt below, and nothing else: no sources, notes or summary. Apply every problem it lists. Fix each one by citing the row that holds the detail, adding a row that holds it, or cutting the phrase. Do not keep a flagged phrase on your own judgement: the checker has not read the sources, and that is the point. Change nothing else, and keep every line the template requires. Run a fresh checker on the fixed draft, and repeat until it returns NONE or has run three times. Name anything still open in Limitations. If your host cannot start one, deliver the take-away, then give the checker prompt in its own block and ask the user to paste it, with the take-away, into a new chat before they rely on the result.

   Checker prompt: "You see only this document. Do not use outside knowledge and do not browse. List every phrase in the final position, the finding lines, the claim cells, the decision record and Limitations that states a name, number, date, place, method, source type, scope or fact that the ledger row it cites does not contain in its claim or evidence cell. If a line cites no row, check it against every row. Also list every cited id that does not hold the fact beside it. In References, check only that each entry names a source in the ledger, not its bibliographic details. For each problem give the phrase, where it is, the cited id, and why. If there are none, say NONE."

## The take-away

Deliver the five parts in this order, using the template in `references/take-away.md`:

- The final position, answer first, in one to three sentences, citing the rows and findings that hold each fact.
- The claim ledger: one row per load-bearing claim, with label, evidence and locator, and status (holds, fails, holds in part, or unresolved).
- The decision record, built from ledger ids.
- The adversarial findings, one fixed-shape line each, ending with the integration line.
- The provenance block.

## Next

Your next three moves. Each has an owner, a first action this week and an observable result. The owner is "you" or a role the user named. Never invent a person, a date or a source.

1. Check the RECALLED claims that carry the most weight, and upgrade each to SOURCED or cut it.
2. Put the person named under Accountable in front of the decision the provenance block names.
3. Watch for the observation that would make the main claim false, and say where it would show up.

For a deeper check of hidden assumptions, the user may also like a skill for blind spots, if they have one. Do not run it for them.

## Self-check before you deliver

- The user confirmed the restated idea before any research or verdict, and a fresh checker read the draft, or the user has the checker prompt.
- Every load-bearing claim has exactly one label, no RECALLED claim appears as SOURCED, and every SOURCED claim has a quote or precise paraphrase and a locator from this session.
- The decision record holds only material decisions, each with its six fields, and its evidence field holds ledger ids only.
- Every finding line has the shape `F# [C#] "verbatim source words" → conclusion` or `F# [C#] claim-cell words → conclusion`, except the last, integration line, `F# [F#, F#] → Integration, <move>. ... (INFERRED)`. Cited words appear exactly in that row, quotation marks hold only verbatim source words, a conclusion beyond the cited words ends with (INFERRED), and nothing sits in the findings outside a numbered line.
- Every ledger row has a finding line. Each final-position sentence cites the row and finding that hold its facts, and rests on no unresolved row. Every SOURCED claim cell uses only names, numbers, dates and places from its evidence cell. No (INFERRED) conclusion states what a source or firm is, does, sells or wants unless a cited row holds it.
- Any reframe names the shared hidden assumption, and any conditional names its region.
- The provenance block has exactly four labels, no "Verified:" line, and every Limitations sentence passes the decision test.
- No owner, date, quote or source was invented, and Accountable names a person only if the user named them as accountable. No new facts anywhere. Every factual phrase in the output, including ledger claim cells, the decision record, the findings, the final position and the provenance block, is held by a ledger row, or is labelled INFERRED. A claim cell is no broader or narrower than its evidence. Limitations states only what the ledger shows, or a gap labelled INFERRED. Never add a place, date, country, spelling convention or scope that neither the user nor a source gave.

## Read this when

| File | When |
|---|---|
| `references/method.md` | Labelling a claim, writing a decision record, choosing an integration move, or testing a Limitations sentence |
| `references/take-away.md` | Writing the final output, or checking a worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.

## Reference: method.md

# Method library

Each entry carries a source id, such as (S1), that resolves in `SOURCES.md`.

## Claim labels (S1)

| Label | Use when | What the ledger must show |
|---|---|---|
| SOURCED | You retrieved the source in this session | The verbatim sentence in quotation marks, or a precise paraphrase with no quotation marks ending (paraphrase), and a locator (URL plus section, page or paragraph) |
| RECALLED | The fact comes from memory or training, not a retrieval | "Recalled, not checked in this session" and what to search to check it |
| INFERRED | It is your own conclusion from other claims | The claims it rests on, by ledger number |

- A load-bearing claim is one the position falls over without. Label only those.
- With no web or file access, say so once and label memory RECALLED.
- A RECALLED claim is legitimate. Presenting it as SOURCED is the failure.
- A source the user pasted into the chat counts as retrieved in this session.

## Decision record (S2)

Record a decision only when it shaped the result a reader will see. Skip routine choices and never narrate your thinking.

| Field | What it holds |
|---|---|
| Decision | The question that had to be settled, in one line |
| Options considered | Two or three real options |
| Evidence | The ledger ids that bore on it, and nothing else |
| Chosen | The option taken |
| Rejected, and why | Each option not taken, with the reason in one clause that cites ledger ids, or ends (INFERRED) |
| Uncertainty | What could still make the choice wrong |

## Adversarial review (S3)

- Every finding is one line: `F# [C#] "<verbatim source words from the evidence cell>" → <conclusion>` for a SOURCED row with a verbatim quote, or `F# [C#] <words copied from the claim cell> → <conclusion>` with no quotation marks for any other row. The integration line is last and cites findings: `F# [F2, F5] → Integration, <move>. ... (INFERRED)`. A conclusion beyond the cited words ends with (INFERRED). A new fact gets a ledger row before it can appear.
- Argue against the conclusion first, then against the research: weak or single sources, sources with a stake, missing counter-evidence, and a rival explanation for the same facts. A stake or a rival fact you want to name is a ledger row first.
- For each claim that survives, write the observation that would make it false. A claim with no such observation is not a claim you can test; say so.
- A claim that fails, or holds only in part, is not deleted. Record:
  - **Holds:** the region where it is still true.
  - **Fails:** the region where it breaks, citing the row that shows it.
  - **Instead:** what is true in the failing region.
- A claim you cannot ground or test either way is **unresolved**. Keep it in the ledger with what would settle it, and do not use it to support the final position.

## Integration moves (S1)

| Move | Use when | You must name |
|---|---|---|
| Conditional | Each side holds in a different region | The region, and the observation that places a case in it |
| Reframe | Both sides share a hidden assumption, and dropping it removes the trade-off | The assumption itself. Unnamed, it is not a reframe |
| Level shift | Both are true at different levels of description | The two levels, and why one does not reduce to the other |

## Provenance block (S1, S4)

    Attribution:  Who wrote it, and that an AI assistant helped, in one sentence.
    Accountable:  The person the user named as accountable, or "[name to confirm]".
    Limitations:  What is not backed, and how far each claim is from its source, using only what the ledger shows.
    References:   The sources, full APA 7 entries, alphabetical.

- **Decision test:** keep a Limitations sentence only if a reader would decide differently knowing it. "None material." is a complete line.
- Never add a "Verified:" label. A review adds accountability, not accuracy.
- A reference lists only sources retrieved in this session. RECALLED facts go in Limitations, not References.
- If a full APA 7 entry is not possible, such as for a pasted internal extract with no author, title or date, write a descriptive entry and state each unknown field, for example: "Internal staff survey summary [pasted in this session; author, title, date and sample size not given]." Give a sample size only if the source states it.

## Reference: take-away.md

# Take-away template

Fill every part. Keep the order. Entries follow the method library (S1).

    ## Final position
    <The answer in one to three sentences. Each sentence ends with the rows and findings that hold its facts, such as (C1, F2). Conditions go in the sentence, not a footnote.>

    ## Claim ledger
    | # | Claim | Label | Evidence and locator | Status |
    |---|---|---|---|---|
    | C1 | ... | SOURCED | "<verbatim quote>" (<URL>, <section>), or <paraphrase> (paraphrase) (<URL>, <section>) | Holds |
    | C2 | ... | RECALLED | Recalled, not checked in this session. Search: <terms> | Holds in part |
    | C3 | ... | INFERRED | From C1 and C2 | Fails |
    | C4 | ... | RECALLED | Recalled, not checked in this session. Search: <terms> | Unresolved |

    ## Decision record
    | Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
    |---|---|---|---|---|---|
    | ... | <option>; <option> | C1, C3 | <option> | <option>: <reason citing C2> | <what could make it wrong, citing a row, or ending (INFERRED)> |

    ## Adversarial findings
    F1 [C2] <words copied from C2's claim cell> → Strongest case against: ... (INFERRED)
    F2 [C1] "<verbatim source words from C1>" + [C3] <words from C3's claim cell> → Against the research: ... (INFERRED)
    F3 [C1] "<verbatim source words from C1>" → C1 would be false if <an observation to check>.
    F4 [C2] <words from C2's claim cell> → C2 holds in part. Holds: ... Fails: ... Instead: ... (INFERRED)
    F5 [C3] <words from C3's claim cell> → C3 fails. Holds: ... Fails: ... Instead: ... (INFERRED)
    F6 [C4] <words from C4's claim cell> → C4 unresolved. Would be settled by: ... Not used in the final position.
    F7 [F3, F4] → Integration, conditional. Region: ... Observation that places a case in it: ... (INFERRED)

    ## Provenance
    Attribution:  ...
    Accountable:  [name to confirm]
    Limitations:  ...
    References:   ...

    Decision for a person: <the decision>, after checking rows <C#, C#>, the rows that carry it.

Words in quotation marks are verbatim source words from a SOURCED row's evidence cell. Words from a claim cell carry no quotation marks. The findings hold nothing but these lines, and the integration line, citing findings, is always the last one. Every claim cell and every Limitations sentence says only what its row or the ledger shows.

## Worked example (short)

The user asks whether a four-day week raises output. They confirm they want to test the idea for a leadership paper. The quotes below are placeholders for what a real retrieval returns.

    | C1 | A four-day week kept output steady in one trial | SOURCED | "output held steady across the six-month trial" (<trial report URL>, results) | Holds |
    | C2 | In shift work, output tracks staffed hours | RECALLED | Recalled, not checked in this session. Search: shift work output staffed hours | Holds |
    | C3 | A four-day week raises output everywhere | INFERRED | The user's claim, tested against C1 and C2 | Fails |

    F1 [C3] A four-day week raises output everywhere + [C1] "output held steady across the six-month trial" + [C2] In shift work, output tracks staffed hours → C3 fails. Holds: nowhere in the ledger. Fails: in the trial, output held steady rather than rising (C1), and in shift work output tracks staffed hours (C2). Instead: output held steady in the one trial, and fewer staffed hours in shift work would lower output. (INFERRED)
    F2 [C1] "output held steady across the six-month trial" → C1 would be false if a repeat trial in similar roles showed output falling.
    F3 [C2] In shift work, output tracks staffed hours → C2 would be false if shift teams on a four-day week held output with no extra staff.
    F4 [F1, F2, F3] → Integration, conditional. Region: work where people control their own hours. Observation that places a case in it: can a person move a task to another day without anyone waiting on them? (INFERRED)

- **Final position:** A four-day week kept output steady in the one trial in the ledger, so the ledger does not support the claim that it raises output (C1, F1, F2). In shift work, output tracks staffed hours (C2, F3, F4).
- **Decision record entry:** Decision: which result to trust. Options: the trial report; press summaries of it. Evidence: C1. Chosen: the trial report. Rejected: the press summaries, because they are not in the ledger (INFERRED). Uncertainty: C1 is one trial (C1).
- **Wrong, and why:** `F5 [C1] "output held steady" → and several other trials found a bigger gain.` The other trials are not in the ledger, so the conclusion adds a fact. Add each trial as a row with its quote, then write a line from that row, or cut it.
- **Wrong, and why:** a sentence under the findings that starts "Worth noting, the trial was run by a group that promotes the idea." It is not a numbered line and has no row. Make the stake a ledger row (RECALLED if unchecked), then write a line from it.
- **Limitations:** "The shift-work result (C2) is recalled, not checked in this session." This passes the decision test, because a reader citing it in a paper would check first.

## Sources

# Sources

All entries retrieved 29 September 2026.

[S1] Peak State Global. (2026). *SOURCED: Seven checks on any artefact that contains model output* [Computer software]. GitHub. Retrieved September 29, 2026, from https://github.com/peakstate-global/sourced

[S2] Nygard, M. (2011, November 15). *Documenting architecture decisions*. Cognitect. Retrieved September 29, 2026, from https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions

[S3] Thornton, S. (2026). Karl Popper. In E. N. Zalta & U. Nodelman (Eds.), *The Stanford encyclopedia of philosophy*. Retrieved September 29, 2026, from https://plato.stanford.edu/entries/popper/

[S4] American Psychological Association. (n.d.). *Reference examples*. APA Style. Retrieved September 29, 2026, from https://apastyle.apa.org/style-grammar-guidelines/references/examples
