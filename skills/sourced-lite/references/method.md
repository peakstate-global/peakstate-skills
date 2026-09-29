# Method library

Each entry carries a source id, such as (S1), that resolves in `SOURCES.md`.

## Claim labels (S1)

| Label | Use when | What the ledger must show |
|---|---|---|
| SOURCED | You retrieved the source in this session | The verbatim sentence or a precise paraphrase, and a locator (URL plus section, page or paragraph) |
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
| Evidence | The ledger rows or facts that bore on it |
| Chosen | The option taken |
| Rejected, and why | Each option not taken, with the reason in one clause |
| Uncertainty | What could still make the choice wrong |

## Adversarial review (S3)

- Argue against the conclusion first, then against the research: weak or single sources, sources with a stake, missing counter-evidence, and a rival explanation for the same facts.
- For each claim that survives, write the observation that would make it false. A claim with no such observation is not a claim you can test; say so.
- A claim that fails, or holds only in part, is not deleted. Record:
  - **Holds:** the region where it is still true.
  - **Fails:** the region where it breaks, with the evidence.
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
    Limitations:  What is not backed, and how far each claim is from its source.
    References:   The sources, full APA 7 entries, alphabetical.

- **Decision test:** keep a Limitations sentence only if a reader would decide differently knowing it. "None material." is a complete line.
- Never add a "Verified:" label. A review adds accountability, not accuracy.
- A reference lists only sources retrieved in this session. RECALLED facts go in Limitations, not References.
- If a full APA 7 entry is not possible, such as for a pasted internal extract with no author, title or date, write a descriptive entry and state each unknown field, for example: "Internal survey summary, n = 212 [pasted in this session; author, title and date not given]."
