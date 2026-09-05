# Prose in a brief: writing for a reader who arrives cold

A brief is read by someone who was not in the session that produced it. They cannot resolve
a reference, they did not read the section you are citing, and they will stop reading at the
first sentence whose meaning is stored somewhere else. Everything here follows from that.

## A pointer is never the content

A section number, ticket, migration, commit, id or filename is an address. State the
substance in the sentence, then put the pointer in brackets after it.

- Bad: `§3.193 described two gaps. §3.195 closed the second.`
- Good: `The earlier estimate (§3.193) assumed two gaps: a missing calculation method, and a
  missing route between two account types. The second turned out not to exist (§3.195),
  which is why the estimate is now smaller.`

If you cannot say what a reference holds without looking it up, look it up before you write
the sentence. Never emit a claim whose meaning depends on a retrieval the reader cannot do.

The same rule covers names. A bare entity name means nothing on its own. `the one record
using the old class, Acme Holdings` is a sentence; `Acme Holdings` is not.

## Lead with the answer

The first line states the conclusion and the recommendation. Everything after it is
evidence. A reader who stops after line one still has what they need. If the recommendation
is conditional, state the condition first.

Use the `:::verdict` fence for that line, so it is visually the answer rather than the first
paragraph of an argument.

    :::verdict
    **Verdict: build the new class, but treat it as groundwork. Nothing in production
    needs it today.**
    :::

## Say the mechanism, not the outcome

- Bad: `The report already handles it and needs no change at all.`
- Good: `The report needs no change: it computes the total as cost minus the sum of the
  entries, so a record with no entries already reports correctly.`

An estimate that moves always states why it moved. A scope change with no stated cause reads
as arbitrary.

## Structure and emphasis

After the lead, break into short labelled bullets. One claim per sentence, one idea per
bullet. Do not stack five claims into a paragraph and rely on bolding to signpost them.

Bold marks structure: the verdict line, and the label that opens each bullet. It is not a
highlighter for interesting phrases. Italics never, except a real title.

    **Verdict: <the answer and the recommendation, one sentence>**

    - **<label>.** <claim, with its references resolved inline>
    - **<label>.** <claim>

    **What's left:** <the residual work, concretely>

## Register

- No em dash anywhere, and no em-dash aside.
- No `not X, but Y` inversions.
- No colon-then-reveal.
- No figurative language about a system, such as "in the ledger's eyes" or "rows waiting
  for a class".
- No scare quotes around a label you have just invented.
- Plain declarative sentences. Short beats clever.

## Backticks

Wrap in backticks: table, column and field names; function, job and script names; enum
values, config keys, file paths, CLI commands; migration and commit identifiers.

Do not wrap: business entity names, section references such as §3.193, or prose emphasis. A
business name formatted as code makes the register harder to read, not easier.

**First use of any identifier gets a one-clause gloss**, then it goes bare: `gl_rebuild`
(the job that projects the schedule forward). One gloss per brief, at first mention.
