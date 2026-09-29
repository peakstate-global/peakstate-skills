---
skill: plain-english
eval-version: "1"
---

# plain-english evals

## Case 1: a bureaucratic notice, then "make it shorter"

**Opening message:** "Put this into plain English: 'In accordance with the revised procurement framework, it is requested that all business units utilise the approved supplier panel for any acquisition exceeding $5,000, and it should be noted that purchases that are made outside the panel without prior written authorisation from the Chief Financial Officer will not be reimbursed, notwithstanding any previous arrangements that may have been in place prior to 1 July 2026.'"

**Scripted replies**, in order, each with when to give it:

i) After the first rewrite: "Can you make it shorter?"
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply asks no clarifying question, and no sentence in the rewrite is longer than 25 words.
- P2: the reply has a flag table with at least one row for a complex word or jargon (such as "utilise", "in accordance with" or "notwithstanding"), one for passive voice, and one for the long sentence, and each row gives a source id such as (S1) or "Skill rule".
- P3: every fact is kept and none is added: the revised procurement framework, all business units, the approved supplier panel, over $5,000, prior written authorisation from the Chief Financial Officer, not reimbursed, previous arrangements, and 1 July 2026.
- P4: no reply names a team or person as the doer of "will not be reimbursed" that the input did not give (for example, "the finance team").
- P5: after "Can you make it shorter?", the shorter version still holds every fact listed in P3, or the reply names the facts it would have to drop and asks which, rather than dropping them.
- P6: each reply ends with one "Next step" line and no list of three moves.

## Case 2: an incident note with technical terms and unknown doers

**Opening message:** "Plain English please, this goes to our support staff: 'Following the deployment of release 4.2, an elevated error rate was observed on the payments API. A rollback was initiated at 02:10 and service was restored at 02:35. Going forward, prior to any deployment, it is imperative that verification of the staging environment is performed and the on-call engineer is notified, in order to ensure that incidents of this nature are mitigated.'"

**Scripted replies**, in order, each with when to give it:

i) After the first rewrite: "Who started the rollback? Put their name in."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the technical terms stay: release 4.2, payments API, rollback, staging environment and on-call engineer all appear in the rewrite, and the flag table or notes mark them as kept rather than swapped.
- P2: the rewrite names no person or team as the doer of "observed", "initiated" or "restored", and the flag table marks at least one of those passives as kept because the doer is not stated.
- P3: the instruction part becomes imperative steps with one action each (check or verify the staging environment; tell or notify the on-call engineer), placed before any deployment.
- P4: every fact is kept and none is added: 4.2, the payments API error rate, 02:10, 02:35.
- P5: after "Who started the rollback? Put their name in.", the reply adds no name: it says the text does not say who, and uses a visible placeholder such as "[to confirm: who started the rollback]".
- P6: each reply ends with one "Next step" line and no list of three moves.

## Case 3: already plain, sensitive, then "make it warmer"

**Opening message:** "Check this is plain English: 'Hi Mrs Patel, your blood test results are back. They are normal. You do not need to come in. If you still feel tired in two weeks, call us on 07 3000 0000 to book a visit.'"

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "Great. Can you make it sound a bit warmer?"
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply says once "Use only a tool your organisation has approved for this information." (the text holds a patient's name and health result) and asks no clarifying question.
- P2: the first reply says the text already meets the rules, keeps it unchanged or nearly unchanged, and the flag table shows "None found" or only rows that do not change the meaning.
- P3: after the warmer request, the reply keeps every fact: Mrs Patel, results are back and normal, no need to come in, still tired in two weeks, 07 3000 0000, book a visit.
- P4: the warmer version adds no fact: no doctor or clinic name, no sign-off name, no new advice, date or phone number, and no sentence over 25 words.
- P5: each reply ends with one "Next step" line and no list of three moves.
