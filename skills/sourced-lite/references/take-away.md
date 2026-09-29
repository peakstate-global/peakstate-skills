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

    ## Evidence check
    | Phrase in the output | Where | Row | Ledger words that hold it |
    |---|---|---|---|
    | <name, number, date, place, method, source type or scope word> | Final position | C1 | "<words copied exactly from C1's claim or evidence cell>" |

A phrase goes in the evidence check only if its line does not already quote it. The last column is copied, never reworded. A phrase with no ledger words to copy is cut from the output before delivery, so it never appears in the table.

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

- **Evidence check rows:**

      | six-month | Final position | C1 | "output held steady across the six-month trial" |
      | shift work | Final position | C2 | In shift work, output tracks staffed hours |

- **Wrong, and why:** `| run by a consultancy | F2 | C1 | "output held steady across the six-month trial" |`. The copied words do not contain the phrase, so the phrase comes out of F2, or it gets its own row first.
- **Final position:** A four-day week kept output steady in the one trial in the ledger, so the ledger does not support the claim that it raises output (C1, F1, F2). In shift work, output tracks staffed hours (C2, F3, F4).
- **Decision record entry:** Decision: which result to trust. Options: the trial report; press summaries of it. Evidence: C1. Chosen: the trial report. Rejected: the press summaries, because they are not in the ledger (INFERRED). Uncertainty: C1 is one trial (C1).
- **Wrong, and why:** `F5 [C1] "output held steady" → and several other trials found a bigger gain.` The other trials are not in the ledger, so the conclusion adds a fact. Add each trial as a row with its quote, then write a line from that row, or cut it.
- **Wrong, and why:** a sentence under the findings that starts "Worth noting, the trial was run by a group that promotes the idea." It is not a numbered line and has no row. Make the stake a ledger row (RECALLED if unchecked), then write a line from it.
- **Limitations:** "The shift-work result (C2) is recalled, not checked in this session." This passes the decision test, because a reader citing it in a paper would check first.
