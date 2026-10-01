---
name: plain-english
description: Jargon and long sentences make readers stop, misread or ignore important text. This skill rewrites it so a wide audience understands it the first time, and shows each change so you learn the rules. Rewrites text to the core rules of Simplified Technical English (short sentences, one idea each, active voice, commands for instructions, everyday words) and flags every jargon word, passive verb and long sentence it found, with the rule behind each change. Keeps every fact and adds none. Use when someone says "plain English", "make this plain", "simplify this", "make this easier to read", "remove the jargon", "Simplified Technical English", "STE", "check this is plain English", or pastes formal, bureaucratic or technical text for a wider audience.
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

## Reference: rules.md

# Rules checklist

Each rule carries a source id that resolves in `SOURCES.md`. "Skill rule" marks a rule from this skill, not a library. The flag type to use in the table is in brackets.

## Sentences

- [ ] One topic per sentence. (S2) [Long sentence]
- [ ] Average about 15 words a sentence, and no sentence over 25 words. Break a longer one into two sentences or a list. (S3) [Long sentence]
- [ ] Subject, then verb, then object. (S3)
- [ ] Positive and unambiguous: write exactly what you mean. No double negatives. (S3, S4) [Double negative]
- [ ] Cut words that add no meaning, such as "it should be noted that" or "there is". (S3, S5) [Complex word]

## Voice

- [ ] Active voice: the doer comes first, so the reader knows who does what. (S2, S3) [Passive voice]
- [ ] Use the passive only when it is necessary. (S2)
- [ ] If the text does not name the doer, keep the passive or use a `[to confirm: who]` placeholder. Never guess a person or team. (Skill rule) [Passive kept: doer not stated]
- [ ] Use "you" for the reader when the text speaks to the reader. (Skill rule)

## Instructions

- [ ] Write an instruction as a command: "Install the component", not "The component must be installed". (S2) [Passive voice]
- [ ] One action per step. Put a condition before its action: "If the test fails, stop." (Skill rule) [Long sentence]

## Words

- [ ] Everyday words, not complicated expressions. Use `word-swaps.md`. (S4, S5) [Complex word]
- [ ] No jargon, slang or idioms, such as "in light of" or "going forward". (S4) [Jargon or idiom]
- [ ] No hidden verbs: "review the accounts", not "carry out a review of the accounts". Watch for -ment, -tion, -sion and -ance nouns with make, give, take, reach or effect. (S6) [Hidden verb]
- [ ] One word, one meaning. Use the same word for the same thing every time. (S1, S2)
- [ ] Expand an acronym on first use, if the text gives the expansion or you are sure of it. If you are not sure, keep it and flag it. (S4) [Acronym]
- [ ] Keep the technical terms the readers' field uses (product names, system names, trade terms), even where a swap exists. STE allows company and project technical words. (S1) [Technical term kept]

## Meaning

- [ ] Every fact, number, date, name, amount, condition and caveat stays, unchanged. (Skill rule)
- [ ] Add no fact, doer, owner, date or advice. (Skill rule)
- [ ] A shorter version removes words, never facts. (Skill rule)

## Reference: take-away.md

# Reply template

    [Sensitive-information line, once, only if it applies.]

    [The whole rewrite. Or, when nothing needed a change: "This text already meets the rules." and the text unchanged.]

    | Type | Original | Change | Rule |
    |---|---|---|---|
    | [Complex word, Jargon or idiom, Passive voice, Passive kept: doer not stated, Long sentence, Hidden verb, Acronym, Double negative, or Technical term kept] | [the original words] | [the new words, or "kept" and why] | (Sn) or Skill rule |
    | [Or, when nothing was found:] None found | - | - | - |

    Based on the core writing rules of ASD-STE100 Simplified Technical English, a trademark of ASD, adapted for general writing. This skill does not apply the STE dictionary.

    Next step: [one thing to check: a placeholder, a kept passive, or a technical term].

After a follow-up edit, use the same template: the whole text again, a row for each new change, and the Next step line. If a requested length would drop a fact, list the facts and ask which to drop instead of the rewrite.

# Worked example

The user pasted:

> Upon completion of the induction module, a certificate will be issued, and staff are required to make a submission of the certificate to their manager prior to commencing shifts on the ward, notwithstanding any prior experience.

The reply:

    When you finish the induction module, you get a certificate. Before you start shifts on the ward, send the certificate to your manager. This applies even if you have worked on a ward before.

    | Type | Original | Change | Rule |
    |---|---|---|---|
    | Long sentence | the whole sentence (36 words) | three sentences | (S3) |
    | Complex word | upon completion of | when you finish | (S4) |
    | Passive voice | a certificate will be issued | you get a certificate (no issuer is named, so none is added) | (S3), Skill rule |
    | Hidden verb | make a submission of | send | (S6) |
    | Complex word | prior to commencing | before you start | (S4) |
    | Complex word | notwithstanding any prior experience | even if you have worked on a ward before | (S4) |

    Next step: check whether "any prior experience" means ward experience only; the rewrite reads it that way.

## Reference: word-swaps.md

# Word swaps

Use the everyday word unless the complex one is a technical term your readers use. "(omit)" means cut the words. Each row carries a source id that resolves in `SOURCES.md`. Spelling follows Australian English.

| Instead of | Write | Source |
|---|---|---|
| a number of | some, many, few (or say how many) | (S4) |
| accompany | go with | (S5) |
| accordingly | so | (S5) |
| acquire | buy, get | (S4) |
| additional | more, extra | (S4) |
| adjacent to | next to | (S5) |
| advise | tell, recommend | (S5) |
| anticipate | expect | (S5) |
| approximately | about | (S4) |
| as a consequence of | because | (S4) |
| ascertain | find out | (S4) |
| assist, assistance | help, support | (S4) |
| at a later date | later (or give a timeframe) | (S4) |
| at this point in time | now | (S4) |
| attempt (verb) | try | (S4) |
| cease | stop, end | (S4) |
| collaborate with | work with | (S4) |
| commence | start, begin | (S4) |
| comply with | follow | (S5) |
| concerning | about | (S4) |
| consequently | so | (S4) |
| demonstrate | show | (S5) |
| despite the fact that | although | (S4) |
| determine | decide, find | (S5) |
| disburse | pay | (S4) |
| discontinue | stop, end | (S4) |
| due to the fact that | because | (S4) |
| endeavour | try | (S5) |
| ensure | make sure | (S5) |
| facilitate | help | (S5) |
| finalise | finish, complete | (S5) |
| furnish | give, send | (S5) |
| give consideration to | consider | (S4) |
| impact on (verb) | affect | (S4) |
| implement | apply, do, start | (S4) |
| in accordance with | under, following | (S5) |
| in order to | to | (S4) |
| in receipt of | get, have, receive | (S4) |
| in relation to, in respect of | about, on | (S4) |
| in the event that | if, when | (S4) |
| initiate | start | (S5) |
| inquire | ask | (S4) |
| is unable to | cannot | (S4) |
| it is requested that you | (omit), please | (S4, S5) |
| leverage | use, build on | (S4) |
| make an application | apply | (S4) |
| methodology | method | (S4) |
| notify | tell | (S5) |
| notwithstanding | even though, despite | (S4) |
| obtain | get | (S4) |
| perform | do | (S5) |
| prior to | before | (S4) |
| provide assistance with | help | (S4) |
| pursuant to | under | (S4) |
| reach a decision | decide | (S4) |
| regarding | about | (S5) |
| require | need, must | (S4) |
| submit | send, give | (S5) |
| subsequently | after, then | (S4) |
| sufficient | enough | (S5) |
| terminate | end, stop | (S5) |
| until such time as | until | (S4) |
| utilise | use | (S4) |
| whilst | while | (S4) |
| with reference to, with regard to | about | (S4) |

## Sources

# Sources

All entries retrieved 29 September 2026.

[S1] ASD Simplified Technical English Maintenance Group. (n.d.). *About ASD-STE100*. ASD-STE100. Retrieved September 29, 2026, from https://www.asd-ste100.org/about.html

[S2] ASD Simplified Technical English Maintenance Group. (n.d.). *Frequently asked questions*. ASD-STE100. Retrieved September 29, 2026, from https://www.asd-ste100.org/faq.html

[S3] Australian Government. (2024, December 20). *Sentences*. Style Manual. Retrieved September 29, 2026, from https://www.stylemanual.gov.au/writing-and-designing-content/clear-language-and-writing-style/sentences

[S4] Australian Government. (2024, December 20). *Plain language and word choice*. Style Manual. Retrieved September 29, 2026, from https://www.stylemanual.gov.au/writing-and-designing-content/clear-language-and-writing-style/plain-language-and-word-choice

[S5] U.S. General Services Administration. (n.d.). *Use simple words and phrases* [Archived PlainLanguage.gov guideline]. GitHub. Retrieved September 29, 2026, from https://github.com/GSA/plainlanguage.gov/blob/main/_pages/guidelines/words/use-simple-words-phrases.md

[S6] U.S. General Services Administration. (n.d.). *Avoid hidden verbs* [Archived PlainLanguage.gov guideline]. GitHub. Retrieved September 29, 2026, from https://github.com/GSA/plainlanguage.gov/blob/main/_pages/guidelines/words/avoid-hidden-verbs.md
