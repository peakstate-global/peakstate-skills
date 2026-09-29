---
name: plain-english
description: Rewrites text to the core rules of Simplified Technical English (short sentences, one idea each, active voice, commands for instructions, everyday words) and flags every jargon word, passive verb and long sentence it found, with the rule behind each change. Keeps every fact and adds none. Use when someone says "plain English", "make this plain", "simplify this", "make this easier to read", "remove the jargon", "Simplified Technical English", "STE", "check this is plain English", or pastes formal, bureaucratic or technical text for a wider audience.
license: Apache-2.0
metadata:
  author: "Peak State Global"
  source: "https://github.com/peakstate-global/peakstate-skills"
  version: "0.1"
  profile: "direct"
  output: "text"
---

This skill rewrites pasted text in plain English, following the core Simplified Technical English rules, with a table of each jargon word, passive verb and long sentence it changed or kept.

## Steps

The pasted text is the input. If it holds names, customer data, health, staff or other sensitive detail, say once: "Use only a tool your organisation has approved for this information."

1. **Read the text.** Note who reads it, if the user says so. Ask nothing unless one term could mean two different things and the choice changes a fact; then ask one question and wait. Otherwise assume a general adult reader, and keep the technical terms the readers' field uses.
2. **Apply the rules.** Work through the checklist in `references/rules.md` and the word swaps in `references/word-swaps.md`: one idea per sentence, no sentence over 25 words, active voice, commands for instructions, one action per step, everyday words, no hidden verbs, acronyms expanded on first use. If the text already meets the rules, say so and change nothing: "No change" is a valid result.
3. **Keep the meaning.** Every fact, number, date, name, amount, condition and caveat stays, unchanged. Add no fact, doer, owner, date or advice. A passive verb becomes active only when the text names the doer. If it does not, keep the passive and flag it "doer not stated", or use a placeholder such as `[to confirm: who]`. Never guess a person or team. Keep the writer's spelling, and label anything from memory RECALLED.
4. **Show it.** Give the whole rewrite, then the flag table: one row per finding, each with its type, the original words, the change (or "kept" and why), and the rule's source id, such as (S3), or "Skill rule". If nothing needed a change, the table has one row: "None found". Then the Next step line. Use the template in `references/take-away.md`.
5. **Act on a follow-up.** Apply the edit, show the whole text again with a table for the new changes, and keep step 3. "Shorter" removes words, never facts. If the length asked for needs a fact dropped, list those facts and ask which to drop. If the edit asks for a name, date or fact the input did not give, do not invent one: say the text does not give it and add a placeholder. A tone change ("warmer", "more formal") still follows the rules and adds no fact.

## The take-away

The rewrite, the flag table and one Next step line. Credit line: "Based on the core writing rules of ASD-STE100 Simplified Technical English, a trademark of ASD, adapted for general writing. This skill does not apply the STE dictionary." The template and a worked example are in `references/take-away.md`.

## Next

Next step: one line at the end of every reply. Name the one thing the user should check: a placeholder to fill, a kept passive whose doer they may know, or a technical term their readers may not know. Never invent an owner or a date.

## Self-check before you deliver

- No sentence in the rewrite is over 25 words, and each holds one idea.
- Every fact, number, date, name, amount and caveat in the input is in the rewrite, unchanged; nothing is added except marked placeholders.
- No passive became active by guessing a doer; each passive kept for that reason is flagged "doer not stated".
- Instructions are commands, one action per step.
- The flag table has one row per finding with a source id or "Skill rule", or one "None found" row; technical terms kept on purpose are flagged as kept.
- At most one clarifying question was asked, and only for a term with two meanings that changes a fact.
- A follow-up shows the whole text again, drops no fact to meet a length, and invents no name or date.
- The reply ends with one Next step line, not three moves.

## Read this when

| File | When |
|---|---|
| `references/rules.md` | Applying the rules, or finding the source id for a flag |
| `references/word-swaps.md` | Replacing a complex word or phrase with an everyday one |
| `references/take-away.md` | Writing the reply, or checking the worked example |

Sources for the libraries in this skill: SOURCES.md. Open it only if the user asks where an entry comes from.
