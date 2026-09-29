# plain-english eval, case 1: a bureaucratic notice, then "make it shorter"

Skill commit: bd34a17. Eval version 1. Runner: one fresh subagent per assistant turn, reading only the skill folder and this transcript.

## User (turn 1)

Put this into plain English: 'In accordance with the revised procurement framework, it is requested that all business units utilise the approved supplier panel for any acquisition exceeding $5,000, and it should be noted that purchases that are made outside the panel without prior written authorisation from the Chief Financial Officer will not be reimbursed, notwithstanding any previous arrangements that may have been in place prior to 1 July 2026.'

## Assistant (turn 1)

Under the revised procurement framework, please use the approved supplier panel for any purchase over $5,000. This request applies to all business units. Purchases made outside the panel will not be reimbursed unless the Chief Financial Officer gave written authorisation first. This applies even if previous arrangements were in place before 1 July 2026.

| Type | Original | Change | Rule |
|---|---|---|---|
| Long sentence | the whole sentence (66 words) | four sentences | (S3) |
| Complex word | In accordance with | Under | (S5) |
| Complex word | it is requested that all business units | please ... This request applies to all business units. | (S4, S5) |
| Complex word | utilise | use | (S4) |
| Complex word | acquisition exceeding $5,000 | purchase over $5,000 | (S4) |
| Complex word | it should be noted that | (omitted) | (S3, S5) |
| Complex word | purchases that are made | purchases made | (S3) |
| Passive kept: doer not stated | purchases ... made outside the panel | kept: the text does not say who makes the purchases | Skill rule |
| Passive kept: doer not stated | will not be reimbursed | kept: the text does not say who reimburses | Skill rule |
| Double negative | without prior written authorisation ... will not be reimbursed | will not be reimbursed unless the Chief Financial Officer gave written authorisation first | (S3, S4) |
| Complex word | notwithstanding | even if | (S4) |
| Complex word | that may have been in place prior to 1 July 2026 | were in place before 1 July 2026 | (S4) |
| Technical term kept | revised procurement framework, approved supplier panel | kept: names of the organisation's own framework and panel | (S1) |

Based on the core writing rules of ASD-STE100 Simplified Technical English, a trademark of ASD, adapted for general writing. This skill does not apply the STE dictionary.

Next step: check whether the no-reimbursement rule covers only purchases over $5,000 or all purchases outside the panel; the original does not say, so the rewrite keeps it open.

## User (turn 2)

Can you make it shorter?

## Assistant (turn 2)

Under the revised procurement framework, all business units are asked to use the approved supplier panel for purchases over $5,000. Purchases outside the panel are reimbursed only if the Chief Financial Officer gave written authorisation first. This applies despite any arrangements in place before 1 July 2026.

| Type | Original | Change | Rule |
|---|---|---|---|
| Complex word | please use ... This request applies to all business units. | all business units are asked to use (two sentences become one, 22 words) | (S3) |
| Passive kept: doer not stated | are asked | kept: the text does not say who makes the request | Skill rule |
| Complex word | any purchase over $5,000 | purchases over $5,000 | (S3) |
| Double negative | will not be reimbursed unless | are reimbursed only if | (S3, S4) |
| Passive kept: doer not stated | are reimbursed | kept: the text does not say who reimburses | Skill rule |
| Complex word | even if previous arrangements were in place | despite any arrangements in place | (S4) |

Based on the core writing rules of ASD-STE100 Simplified Technical English, a trademark of ASD, adapted for general writing. This skill does not apply the STE dictionary.

Next step: check who makes the request and who reimburses; if you know, name them so both passives can become active.
