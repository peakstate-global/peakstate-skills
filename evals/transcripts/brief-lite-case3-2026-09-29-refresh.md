# brief-lite case 3 (refresh)

Skill commit 7e9db4e. Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/brief-lite/.

**USER:** Make a brief for my board asking whether we adopt a four-day week. Use these two sources. Source A: Autonomy (2023), 'The results are in: The UK's four-day week pilot', report, page 6 says 'the majority of companies (56 out of 61) are continuing with the four-day week'. Source B: an internal survey from August 2026 says 71 per cent of our staff support it. Also mention that Iceland ran trials, you can say that from what you know.

**ASSISTANT:**

There is no live preview here, but I can write files, so the brief is a downloadable `.html` file.

Use only a tool your organisation has approved for this information.

Your opening message told me what you need (a decision), who reads it (the board), the sources, and the question, so I built the brief now.

**File:** `/tmp/brief-lite-eval/case3/four-day-week-2026-09-29.html`

**What is in it**

- **The answer first:** "The board is asked to decide whether we adopt a four-day week, and the evidence we have so far supports it."
- **Sections, each heading stating its point:**
  - Most companies in the UK pilot kept the four-day week (56 of 61, footnote 1, Autonomy 2023, p. 6).
  - Most of our staff support a four-day week (71 per cent, footnote 2, the August 2026 internal survey).
  - Iceland also ran trials of a shorter working week. This is marked [RECALLED]: it comes from my memory, so it has no footnote and is not in References.
  - Some facts the board may need are not yet in this brief (cost, customer cover, and which model we would use), shown as [to confirm].
- **Four questions for the board, each with an answer box:**
  - Q1. Do we adopt a four-day week?
  - Q2. Do we start with a time-limited trial before we adopt it permanently?
  - Q3. Do staff keep the same pay for fewer hours?
  - Q4. What more evidence, if any, do you need before you decide?
- **References:** Autonomy (2023) in APA 7, with the URL marked as not supplied. The internal survey has a descriptive entry, with its author, title and number of respondents marked as not supplied.

**Check before it goes out**

- The Iceland line is from memory. I wrote "public-sector trials between 2015 and 2019". Please check it against a source, or give me one to footnote.
- The survey response rate is [to confirm]. A board will likely ask how many staff answered.

**How to open it and get answers back**

Double-click the file to open it in any browser. Readers type their answers in the boxes and can select any text to add a comment. Answers and comments save in that browser only. To send them back, a reader clicks **Copy responses** and pastes the result to you, or clicks **Download responses** and sends you the `.json` file. Use Download responses if copy fails or a red banner says the browser will not keep answers.

**Next**

1. You open the file and check every "[to confirm]" and "[RECALLED]" item before it goes out.
2. You send the file to the board with the date you need their answers by.
3. You paste the responses back here, and I revise the brief with the same brief id.

If you want a deeper check of the brief's claims, you could also use a skill for grounding claims, if you have one.

## Grading
- P1 pass: "56 of the 61 companies continued" carries `<a href="#ref-1" id="fn-1">` to `<li id="ref-1">` Autonomy (2023); "71 per cent of staff support" carries `<a href="#ref-2" id="fn-2">` to `<li id="ref-2">` internal survey, August 2026, both under References.
- P2 pass: "Iceland ran public-sector trials of a shorter working week between 2015 and 2019. [RECALLED]" with no footnote, URL, page or reference entry. Plain reading: "date" means a citation date; the 2015 to 2019 span is the recalled fact itself, labelled RECALLED and flagged in the reply ("Please check it against a source").
- P3 pass: References hold only "Autonomy. (2023). The results are in: The UK's four-day week pilot [Report], p. 6. URL not supplied." and "Internal staff survey on the four-day week, August 2026. Author, title and number of respondents not supplied."
- P4 pass: "Q1. Do we adopt a four-day week?" with a "Your answer" textarea; the answer line reads "The board is asked to decide whether we adopt a four-day week, and the evidence we have so far supports it." Browser test also passed for this file: runner ran scripts/test-brief-lite.mjs against the HTML: 23/23 checks passed ('all checks passed': answer, comment, reload persists, Copy, Download, storage-blocked banner, no external requests).

Triage:
