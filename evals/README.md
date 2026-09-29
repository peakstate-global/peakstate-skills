# Skill evals

Each skill under the contract has one eval file here, `evals/<skill-name>.md`. Evals
live at the repo root and never inside a skill folder, so they do not ship to a host
or use one of the skill's companion slots.

## Fixture format

An eval file holds exactly three cases. Each case is a multi-turn fixture:

```md
---
skill: <skill-name>
eval-version: "1"
---

# <skill-name> evals

## Case 1: <short name>

**Opening message:** the first thing the user says, verbatim.

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "<the user's reply, verbatim>"
ii) When the skill asks for X: "<reply>"

**Properties**, each graded pass or fail:

- P1: the first reply restates the idea and asks for confirmation before any research.
- P2: <another observable property of the transcript or the take-away>.

## Case 2: ...

## Case 3: ...
```

- A property must be checkable from the transcript alone. "The reply is good" is not a
  property. "The take-away has a table with one row per option" is.
- Replies are scripted, so the run is repeatable. If the skill asks something the script
  does not cover, the runner answers "I don't know, your call" and notes it.
- Bump `eval-version` whenever a case, reply or property changes.

## Runner procedure

i) Start a fresh subagent whose only instructions are the skill folder
   (`skills/<skill-name>/`). It gets nothing from this repo or this conversation.
ii) Send the opening message. Give each scripted reply at the point its case names.
iii) Save the full transcript to `evals/transcripts/<skill-name>-<case>-<yyyy-mm-dd>.md`.
iv) Grade each property pass or fail against the transcript, with one line of evidence.
v) Append one row per case to `RESULTS.md`.

One run per case per round. Run `scripts/release-check.sh` before a round, so the
skill under test is the one that passes the contract.

## Triage and the pass bar

A failed property is triaged before anything changes: it is a **skill fault** (the
skill did the wrong thing) or an **eval fault** (the property or script was wrong).
Record the verdict in the row. Fix the skill for a skill fault. For an eval fault,
revise the eval, bump `eval-version` and re-run the case in the same round.

A skill ticket passes when every case passes, or when every failure is triaged as an
eval fault and the revised case passes in the same round.

## RESULTS.md columns

| Column | What it holds |
|---|---|
| Date | Run date, `yyyy-mm-dd` |
| Skill | The skill folder name |
| Case | The case number and short name |
| Host | Where the run happened, such as Claude Code |
| Model | The exact model id the subagent ran on |
| Skill commit | Short SHA of the commit that holds the skill under test |
| Eval version | The `eval-version` of the eval file |
| Transcript | Path under `evals/transcripts/` |
| Properties | One verdict per property, such as `P1 pass, P2 fail` |
| Triage | Blank if all pass; else `skill fault` or `eval fault` per failed property, with the fix |
