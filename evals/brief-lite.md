---
skill: brief-lite
eval-version: "1"
---

# brief-lite evals

The runner tells the subagent that its working folder is `/tmp/brief-lite-eval/case<N>/`
and that it may write files there. Properties about the file are graded on the HTML the
subagent wrote, and the browser test (`scripts/test-brief-lite.mjs`) is run against it.

## Case 1: clear request, readers must decide

**Opening message:** "I need my support team leads to decide between two rosters: a four-day roster (four ten-hour days) and the current five-day roster. The four-day trial in March cut overtime by 18 per cent, but cover drops on Fridays. I need their decision and who will own a review. Build me a brief they can answer."

**Scripted replies**, in order, each with when to give it:

i) If the skill asks who reads it: "Six team leads. They read it on their laptops."
ii) If the skill asks for a deadline: "Answers by Friday 10 October."
iii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the skill asks at most four intake questions in total, one per reply, before it builds the file.
- P2: the file opens with the title and a one-sentence answer before any other section, and its sections come before the questions.
- P3: the file has numbered questions, each with its own answer textarea, and one of them asks who owns the review.
- P4: the file has Copy responses and Download responses buttons, a hidden storage banner, a `data-brief-id` on `<body>`, and no `http` or `https` URL in any `src`, `href` of a `<link>`, `@import` or `url(`.
- P5: the browser test passes against the file: answer, comment, reload persists, Copy, Download, storage-blocked banner.
- P6: the reply names who the next three moves are for without inventing a person: owners are "you" or a role the user named.

## Case 2: "just build it" with gaps

**Opening message:** "Just build a brief asking my manager to approve a budget for a new laptop fleet. No questions, just build it."

**Scripted replies**, in order, each with when to give it:

i) If the skill asks anything: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the skill builds the file in its first or second reply and asks no more than one question before it does.
- P2: the file invents no amount, date, supplier, person or source: every missing fact shows as a visible placeholder such as "[to confirm]".
- P3: the file asks the manager at least one numbered question with an answer box, and states an assumption before the question.
- P4: the reply tells the user how to open the file and how to send the responses back (Copy or Download, then paste).

## Case 3: sources and a recalled fact

**Opening message:** "Make a brief for my board asking whether we adopt a four-day week. Use these two sources. Source A: Autonomy (2023), 'The results are in: The UK's four-day week pilot', report, page 6 says 'the majority of companies (56 out of 61) are continuing with the four-day week'. Source B: an internal survey from August 2026 says 71 per cent of our staff support it. Also mention that Iceland ran trials, you can say that from what you know."

**Scripted replies**, in order, each with when to give it:

i) If the skill asks who reads it or what it needs: "The board. I need a yes or no and any conditions."
ii) If the skill asks anything else: "I don't know, your call."

**Properties**, each graded pass or fail:

- P1: the two supplied facts each carry a numbered footnote that links to a numbered entry in a References section.
- P2: the Iceland fact is labelled as recalled (for example "[RECALLED]") and has no invented citation, URL, page or date.
- P3: the References section holds no source the user did not give.
- P4: the board question is numbered, has an answer box, and the one-sentence answer states what the board is asked to decide.
