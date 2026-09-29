# Take-away template

Fill every part. Keep the order. Entries follow the method library (S1).

    ## Final position
    <The answer in one to three sentences, citing the findings it rests on, such as (F2, F7). Conditions go in the sentence, not a footnote.>

    ## Claim ledger
    | # | Claim | Label | Evidence and locator | Status |
    |---|---|---|---|---|
    | C1 | ... | SOURCED | "<quote or precise paraphrase>" (<URL>, <section>) | Holds |
    | C2 | ... | RECALLED | Recalled, not checked in this session. Search: <terms> | Holds in part |
    | C3 | ... | INFERRED | From C1 and C2 | Fails |
    | C4 | ... | RECALLED | Recalled, not checked in this session. Search: <terms> | Unresolved |

    ## Decision record
    | Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
    |---|---|---|---|---|---|
    | ... | <option>; <option> | C1, C3 | <option> | <option>: <reason citing C2> | <what could make it wrong, citing a row, or ending (INFERRED)> |

    ## Adversarial findings
    F1 [C2] "<exact words from C2>" → Strongest case against: ... (INFERRED)
    F2 [C1] "<exact words from C1>" + [C3] "<exact words from C3>" → Against the research: ... (INFERRED)
    F3 [C1] "<exact words from C1>" → C1 would be false if <an observation to check>.
    F4 [C2] "<exact words from C2>" → C2 holds in part. Holds: ... Fails: ... Instead: ... (INFERRED)
    F5 [C3] "<exact words from C3>" → C3 fails. Holds: ... Fails: ... Instead: ... (INFERRED)
    F6 [C4] "<exact words from C4>" → C4 unresolved. Would be settled by: ... Not used in the final position.
    F7 From F3 and F4 → Integration, conditional. Region: ... Observation that places a case in it: ... (INFERRED)

    ## Provenance
    Attribution:  ...
    Accountable:  [name to confirm]
    Limitations:  ...
    References:   ...

    Decision for a person: <the decision>, after checking <what>.

The quoted words in a finding line are copied from that row: the evidence cell for a SOURCED row, the claim cell for any other row. The findings hold nothing but these lines, and the integration line is always the last one.

## Worked example (short)

The user asks whether a four-day week raises output. They confirm they want to test the idea for a leadership paper. The quotes below are placeholders for what a real retrieval returns.

    | C1 | A four-day week kept output steady in one trial | SOURCED | "output held steady across the six-month trial" (<trial report URL>, results) | Holds |
    | C2 | In shift work, output tracks staffed hours | RECALLED | Recalled, not checked in this session. Search: shift work output staffed hours | Holds |
    | C3 | A four-day week raises output everywhere | INFERRED | From C1 and C2 | Fails |

    F1 [C3] "A four-day week raises output everywhere" + [C2] "In shift work, output tracks staffed hours" → C3 fails. Holds: in the setting the trial measured. Fails: in shift work. Instead: in shift work, holding output needs more staff. (INFERRED)
    F2 [C1] "output held steady across the six-month trial" → C1 would be false if a repeat trial in similar roles showed output falling.
    F3 [C2] "In shift work, output tracks staffed hours" → C2 would be false if shift teams on a four-day week held output with no extra staff.
    F4 From F1, F2 and F3 → Integration, conditional. Region: work where people control their own hours. Observation that places a case in it: can a person move a task to another day without anyone waiting on them? (INFERRED)

- **Final position:** A four-day week kept output steady in the one trial that measured it, and the claim that it raises output everywhere fails for shift work (F1, F2, F4).
- **Decision record entry:** Decision: which result to trust. Options: the trial report; press summaries of it. Evidence: C1. Chosen: the trial report. Rejected: the press summaries, because they are not in the ledger. Uncertainty: C1 is one trial (C1).
- **Wrong, and why:** `F5 [C1] "output held steady" → and several other trials found a bigger gain.` The other trials are not in the ledger, so the conclusion adds a fact. Add each trial as a row with its quote, then write a line from that row, or cut it.
- **Wrong, and why:** a sentence under the findings that starts "Worth noting, the trial was run by a group that promotes the idea." It is not a numbered line and has no row. Make the stake a ledger row (RECALLED if unchecked), then write a line from it.
- **Limitations:** "The shift-work result (C2) is recalled, not checked in this session." This passes the decision test, because a reader citing it in a paper would check first.
