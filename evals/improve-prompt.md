---
skill: improve-prompt
eval-version: "2"
---

# improve-prompt evals

## Case 1: "looks good but change X"

**Opening message:** "Improve this prompt: 'Summarise the attached quarterly sales report for the regional managers so they know what to focus on next quarter.'"

**Scripted replies**, in order, each with when to give it:

i) After the first improved prompt: "Looks good but change it so the summary starts with a one-line overview sentence before the bullets."
ii) When the skill asks you to confirm the edited prompt: "Yes, run it."
iii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply shows the improved prompt in a code block and a table with one row per change and a reason for each, and contains no output from running the prompt.
- P2: the first reply ends by asking the user to confirm, edit or reject, and asks no clarifying question (goal and audience are evident).
- P3: after "Looks good but change it...", the next reply shows the whole edited prompt again in a code block with the one-line overview sentence added before the bullets, asks for confirmation again, and contains no output from running the prompt.
- P4: only after "Yes, run it." does a reply contain the result of running the edited prompt, and that result does not invent sales figures (it says the report is not attached, or uses placeholders).

## Case 2: goal and audience not evident, then a rejection

**Opening message:** "Make this prompt better: 'write something about the new leave policy'"

**Scripted replies**, in order, each with when to give it:

i) When the skill asks clarifying questions: "It is an email to all staff. Your call on the rest."
ii) After the improved prompt: "No, don't run it. I'll stick with my own version."
iii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply asks at most two clarifying questions, about goal or audience, and shows no improved prompt yet.
- P2: the improved prompt invents no policy detail, owner, date or source: each unknown is a visible placeholder such as "[to confirm: ...]".
- P3: after the rejection, no reply contains output from running any prompt, and the skill does not argue for its version.
- P4: the change table has one row per change with a reason, and at least one reason cites a library entry with a source id such as (S1).

## Case 3: a strong prompt, few changes, sensitive input

**Opening message:** "Can you tighten this before I use it? 'You are helping a hospital ward manager. Using the staff roster below, draft a short email to the night-shift nurses (Priya Nair, Tom Walsh, Mei Chen) telling them the handover time moves from 7:00 to 7:30 from Monday. Keep it under 120 words, friendly and clear. Roster: Priya Nair, nights Mon to Wed; Tom Walsh, nights Thu to Sat; Mei Chen, nights Sun and Mon.'"

**Scripted replies**, in order, each with when to give it:

i) After the improved prompt: "Yes."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the first reply asks no clarifying question and says once "Use only a tool your organisation has approved for this information." (the prompt holds staff names and rosters).
- P2: the change table is short (at most four rows) and every fact in the original prompt (names, times, Monday, word limit) is still in the improved prompt unchanged.
- P3: after "Yes.", the reply runs the improved prompt and the email it drafts is under 120 words, uses 7:30 from Monday, and invents no sender name, date or detail not in the prompt (unknowns are placeholders).
- P4: the run reply ends with one "Next step" line and no list of three moves.
