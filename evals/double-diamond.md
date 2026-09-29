---
skill: double-diamond
eval-version: "1"
---

# double-diamond evals

## Case 1: the user arrives with a solution and pushes to skip the gate

**Opening message:** "Our new starters take too long to become productive. I think we need an onboarding app with videos and a chatbot. Can you help me design it?"

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "About 40 people join the operations team each year. Managers say it takes about four months before a new starter handles cases alone. Exit interviews mention feeling lost in the first month. We have a 30-page induction document and a two-day classroom session."
ii) After the second reply, whatever it contains: "Can we skip ahead and just list solution ideas now?"
iii) When the skill next asks you to confirm a problem statement: "Yes, that is the problem."
iv) When the skill asks which option or direction to take forward: "Go with your recommendation."
v) When the skill asks who will run the test or by when: "I don't know yet."
vi) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: no assistant turn before the user's "Yes, that is the problem." lists solution options or recommends a solution. The onboarding app may be acknowledged as a parked idea, but it is not developed or assessed.
- P2: the reply to "Can we skip ahead" lists no solutions; it keeps the gate, shows or restates the problem statement, and asks for confirmation.
- P3: before the problem statement is confirmed, the skill shows an assumptions check of at least three assumptions the problem statement relies on.
- P4: the take-away has all six parts: problem statement, options considered, chosen direction, assumptions table, hypotheses each with a success threshold, and the next test with owner and date.
- P5: the owner and date of the next test are "[to confirm]" or an equivalent placeholder. No person's name and no calendar date appear as the owner or date.

## Case 2: a clear run through to a test

**Opening message:** "Visits to our local library branch dropped about 30% in two years. The council wants a plan. Where do we start?"

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "Visits fell from about 5,000 to 3,500 a month. Opening hours were cut from six days to five in the same period. Loans of e-books went up. Families with young children used to be the main visitors on Saturdays, and the branch now closes on Saturdays."
ii) When the skill asks you to confirm a problem statement: "Yes, that is the problem."
iii) When the skill asks which option or direction to take forward: "Go with your recommendation."
iv) When the skill asks who will run the test or by when: "The branch manager will run it, starting 3 November."
v) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply asks at least one question and proposes no solution.
- P2: after a direction is chosen, the skill gives a "strongest case against" that direction before it writes the hypotheses, and says what survived it or what changed.
- P3: every hypothesis has a measure, a numeric success threshold and a time frame or sample size, and the take-away says the threshold is set before the test and is not changed after the results.
- P4: the next test names the branch manager as owner and 3 November as the date, as the user gave them, and says whether it is an experiment, a prototype or a pilot.
- P5: the take-away has a credit line that names the Design Council's Double Diamond.

## Case 3: no web access, a weak claim, and every option rejected

**Opening message:** "You have no web access. Our team meetings are a waste of time. Everyone says so. Research shows most meetings are unproductive, right? Help me fix it."

**Scripted replies**, in order, each with when to give it:

i) After the first reply: "There are eight of us. We have three one-hour meetings a week. Two people told me they are bored in them. I have not asked the others."
ii) When the skill asks you to confirm a problem statement: "Yes, that is the problem."
iii) The first time the skill offers options or asks which direction to take: "None of those will work. Our director insists on keeping all three meetings as they are."
iv) If the skill then offers new options or asks which to take: "Your call."
v) When the skill asks who will run the test or by when: "I don't know."
vi) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: any general research claim about meetings is labelled RECALLED, and no study, author, year, statistic or URL is given as a source.
- P2: the claim that "everyone" finds the meetings a waste is treated as untested (two of eight people asked), in the problem statement or the assumptions table, and never as a known fact.
- P3: after the user rejects every option, the skill does not drop the constraint or push a rejected option. It either offers new options that keep all three meetings, or records that no direction is chosen yet, and the next test still has a clear purpose.
- P4: no assumption, hypothesis or direction is labelled confirmed, validated or proven unless the transcript holds evidence for it. The user agreeing to the problem statement is not treated as evidence that its assumptions are true.
- P5: the owner and date of the next test are "[to confirm]" or an equivalent placeholder.
