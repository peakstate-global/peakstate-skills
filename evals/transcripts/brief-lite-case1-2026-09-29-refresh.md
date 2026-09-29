# brief-lite case 1 (refresh)

Skill commit 7e9db4e. Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/brief-lite/.

**USER:** I need my support team leads to decide between two rosters: a four-day roster (four ten-hour days) and the current five-day roster. The four-day trial in March cut overtime by 18 per cent, but cover drops on Fridays. I need their decision and who will own a review. Build me a brief they can answer.

**ASSISTANT:**

I can build this. Your message already tells me what you need (a roster decision and a review owner), who reads it (your support team leads) and the two questions to ask. One gap is left before I build: the facts and their sources.

Where do the March trial figures come from, and how far does Friday cover drop? For example, a trial report or a rostering export with its title and date, and the Friday cover under each roster (such as staff on shift or calls answered).

If you do not have these to hand, say "just build it". I will build the brief now and show each missing figure and source as "[to confirm]", so nothing in it is invented.


**USER:** I don't know, your call.

**ASSISTANT:**

I have built the brief now. Every missing figure and source shows as "[to confirm]", so nothing in it is invented. I can write files here but cannot show a live preview, so the brief is a downloadable `.html` file.

**File:** `/tmp/brief-lite-eval/case1/support-roster-options-2026-09-29.html`

**What it says first:** "Choose between the four-day roster and the current five-day roster, and name who will own a review of your choice."

**Sections, each heading states its point:**
- You need to choose one roster and name one person to own its review.
- The four-day roster cut overtime by 18 per cent in the March trial.
- The four-day roster leaves less cover on Fridays.
- The choice trades lower overtime against thinner Friday cover.

**Questions for your team leads:**
- Q1. Which roster should the support team run from here?
- Q2. What is the lowest Friday cover you can accept?
- Q3. If you choose the four-day roster, how should the team cover Fridays?
- Q4. Who will own the review of the roster you choose?
- Q5. When should the review happen, and what should it check?

Each question states my assumption first, so a reader can agree quickly or say what changes.

**Still to confirm before it goes out:**
- The source of the March trial figures (author, date, title and where it is kept). References shows this as one entry marked "[to confirm]".
- The comparison period for the 18 per cent, and whether it is overtime hours or overtime cost.
- How far Friday cover drops: staff on shift and calls answered on a Friday under each roster.

**How to use it:** Open the file in a browser. Answers and comments save in that browser only. To comment, select any text and type in the box that appears. When readers finish, they click Copy responses and paste the result back to you. If copy fails, or a red banner says the browser will not keep answers, they click Download responses and send you the `.json` file.

**Next:**
1. You open the file and replace each "[to confirm]" item before it goes out.
2. You send the file to your team leads with the date you need their answers by.
3. You paste the responses back here, and I revise the brief with the same brief id.

If you want a deeper check of the brief's claims, you may like a skill for grounding claims, if you have one.

## Grading
- P1 pass: one intake reply before the build, "Where do the March trial figures come from, and how far does Friday cover drop?", then built after "I don't know, your call." Plain reading: this is one intake question (the skill's "facts and sources" item) under one question mark, though it has two clauses.
- P2 pass: HTML body text runs title "Support team roster: four-day or five-day?", the Copy/Download toolbar, then "Choose between the four-day roster and the current five-day roster, and name who will own a review of your choice." before any section; sections precede Q1 to Q5.
- P3 pass: Q1 to Q5, each with its own textarea labelled "Your answer"; "Q4. Who will own the review of the roster you choose?"
- P4 pass: Copy responses and Download responses buttons present; `id="bl-banner" class="banner" role="alert" hidden`; `data-brief-id="support-roster-options-2026-09-29"` on body; grep finds 0 occurrences of "http" in the file.
- P5 pass: runner ran scripts/test-brief-lite.mjs against the HTML: 23/23 checks passed ('all checks passed': answer, comment, reload persists, Copy, Download, storage-blocked banner, no external requests).
- P6 pass: "1. You open the file ... 2. You send the file to your team leads ... 3. You paste the responses back here"; no named person.

Triage:
