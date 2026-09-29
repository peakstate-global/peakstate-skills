# plain-english eval, case 2: an incident note with technical terms and unknown doers

Skill commit: bd34a17. Eval version 1. Runner: one fresh subagent per assistant turn, reading only the skill folder and this transcript.

## User (turn 1)

Plain English please, this goes to our support staff: 'Following the deployment of release 4.2, an elevated error rate was observed on the payments API. A rollback was initiated at 02:10 and service was restored at 02:35. Going forward, prior to any deployment, it is imperative that verification of the staging environment is performed and the on-call engineer is notified, in order to ensure that incidents of this nature are mitigated.'

## Assistant (turn 1)

After the deployment of release 4.2, the payments API had a higher error rate than normal. A rollback started at 02:10. Service was back at 02:35.

From now on, before any deployment, [to confirm: who] must do two things:

- Check the staging environment.
- Tell the on-call engineer.

This limits incidents like this one.

| Type | Original | Change | Rule |
|---|---|---|---|
| Long sentence | "Going forward, prior to any deployment, ... are mitigated." (38 words) | one sentence, a two-step list and one short sentence | (S3), Skill rule |
| Long sentence | "A rollback was initiated at 02:10 and service was restored at 02:35." (two ideas) | two sentences | (S2) |
| Passive kept: doer not stated | an elevated error rate was observed | the payments API had a higher error rate than normal (the text does not say who saw it, so no one is added) | Skill rule |
| Passive kept: doer not stated | a rollback was initiated | a rollback started (the text does not say who started it) | Skill rule |
| Passive kept: doer not stated | service was restored | service was back (the text does not say who restored it) | Skill rule |
| Passive kept: doer not stated | verification ... is performed and the on-call engineer is notified | [to confirm: who] must check ... tell ... (the text does not say who does these steps, so the placeholder stays) | (S2), Skill rule |
| Complex word | elevated | higher than normal | (S4) |
| Jargon or idiom | going forward | from now on | (S4) |
| Complex word | prior to | before | (S4) |
| Complex word | it is imperative that | must | (S4) |
| Hidden verb | verification of the staging environment is performed | check the staging environment | (S6) |
| Complex word | notified | tell | (S5) |
| Complex word | in order to ensure that incidents of this nature are mitigated | this limits incidents like this one | (S4), (S5) |
| Technical term kept | deployment, release 4.2, rollback, staging environment, on-call engineer | kept: support staff use these terms | (S1) |
| Acronym | API | kept: the text does not give the expansion, and support staff know the term | (S4) |

Based on the core writing rules of ASD-STE100 Simplified Technical English, a trademark of ASD, adapted for general writing. This skill does not apply the STE dictionary.

Next step: replace [to confirm: who] with the person or team that must check staging and tell the on-call engineer before a deployment.


## User (turn 2)

Who started the rollback? Put their name in.

## Assistant (turn 2)

The text does not say who started the rollback, so I have not added a name. A placeholder now marks the gap.

After the deployment of release 4.2, the payments API had a higher error rate than normal. [to confirm: who] started a rollback at 02:10. Service was back at 02:35.

From now on, before any deployment, [to confirm: who] must do two things:

- Check the staging environment.
- Tell the on-call engineer.

This limits incidents like this one.

| Type | Original | Change | Rule |
|---|---|---|---|
| Passive voice | a rollback was initiated | [to confirm: who] started a rollback (the text does not name the doer, so a placeholder takes the place of a name) | (S2), Skill rule |

Based on the core writing rules of ASD-STE100 Simplified Technical English, a trademark of ASD, adapted for general writing. This skill does not apply the STE dictionary.

Next step: replace [to confirm: who] in the rollback sentence with the name of the person who started the rollback.


## Grading

- P1: pass — release 4.2, payments API, rollback, staging environment and on-call engineer all appear, and the table marks them "kept" for support-staff use.
- P2: pass — no person or team is named for "observed", "initiated" or "restored"; the table marks all three as kept because the doer is not stated.
- P3: pass — the instruction becomes a two-item imperative list (check the staging environment; tell the on-call engineer), placed before any deployment.
- P4: pass — 4.2, the payments API error rate, 02:10 and 02:35 all appear.
- P5: pass — turn 2 adds no name, states the text does not say who started the rollback, and marks the gap with "[to confirm: who]".
- P6: pass — both replies end with a single "Next step" line, no numbered list.
