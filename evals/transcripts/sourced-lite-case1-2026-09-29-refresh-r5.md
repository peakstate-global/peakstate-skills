# sourced-lite case 1 (refresh, re-run 4 on restructured skill)

Skill commit PENDING (structural edit on 7e9db4e: findings and decision record built only from ledger rows; each finding is `F# [C#] "quote" → conclusion`; the final position cites findings by id). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/ plus the conversation so far.

**USER:** AI will replace middle managers. Just run your checks on it, no questions.

**ASSISTANT:**

Before I run the checks, I need you to confirm what I am checking. This first step always happens, even when you ask me to skip questions, and this is the only question before the research starts.

**My reading of your idea, in its strongest form:**

- **The claim:** AI systems will take over most of what middle managers do now, such as coordinating work, passing information up and down, tracking progress, reporting and routine decisions. Because of this, organisations will need far fewer middle-manager roles, and some will remove the layer completely.
- **What you want:** my best guess is that you want to test this idea, not only support it. That means finding where the claim holds, where it fails and what is true in the parts where it fails.
- **Who it is for:** you have not said. I will assume it is for your own thinking unless you tell me it is going into a paper, a talk or a post.
- **What done looks like:** a final position you can defend, with every claim labelled by where it came from, the strongest case against it, and a provenance block.

**Gaps I am filling with my best reading (change any of these):**

- **"Replace":** I read this as "many roles are removed or merged", not as "every middle manager is gone". Those two claims need very different evidence.
- **Time frame:** you gave none. I will use roughly the next five to ten years.
- **Scope:** I will look at large organisations in general, not one sector or country.
- **"AI":** I will include current generative AI and agent tools plus the tools that are likely to come soon. I will not include speculative general AI.

Is this right, or what would you change?

**USER:** Just do it, skip the questions.

**ASSISTANT:**

Before I start, I need a yes or a change. This step is required even when you ask me to skip questions.

My reading: AI will take over most coordination, reporting and routine decision work that middle managers do now, so large organisations will remove or merge many of those roles within five to ten years. You want this idea tested, including where it holds and where it fails, not only supported.

Is this right, or what would you change?

**USER:** Yes, that is close. It is for a discussion paper for my leadership team, and I want to test the idea, not sell it.

**ASSISTANT:**

## Final position

The claim holds in part. AI can take over a large share of middle managers' tasks, and firms are flattening. The evidence here does not show that AI is the main cause of the role cuts, and it does not show that AI can do the people-development part of the job (F7, F8, F15, F16). For your leadership team, a better question is which parts of each manager role are task load that AI can absorb, and which parts are accountability for people outcomes that have no tested replacement (F17).

## Claim ledger

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Gartner forecasts AI-driven flattening in a minority of organisations by 2026 | SOURCED | "Through 2026, 20% of organizations will use AI to flatten their organizational structure, eliminating more than half of current middle management positions." (Gartner press release, 22 Oct 2024, reprinted at cxotoday.com, prediction paragraph. gartner.com returned 403 in this session) | Holds in part |
| C2 | Gartner names the cost of flattening to staff development | SOURCED | "mentoring and learning pathways may become broken, and more junior workers could suffer from a lack of development opportunities" (same release, challenges paragraph) | Holds |
| C3 | About half of managerial work could be automated | SOURCED | "49% of managerial work could be automated, such as creating the first draft of a job posting or integrating performance feedback inputs from multiple sources" (Callahan, WorkLife, 11 Mar 2024, reporting a McKinsey survey. The McKinsey original timed out in this session) | Holds in part |
| C4 | Firms flattened their hierarchies after they adopted AI | SOURCED | "companies flattened their hierarchies following the adoption of artificial intelligence (AI) technologies" (Ewens & Giroud, NBER w34162, Aug 2025, abstract, sample of over 3,100 U.S. public firms). Does not say generative AI. | Holds in part |
| C5 | The manager-level share of layoffs rose in 2023 | SOURCED | "manager-level or higher layoffs made up almost half of all observed layoffs in 2023" (Live Data Technologies, Layoffs by Job Level, 2018 to 2023). The page names no cause. | Holds |
| C6 | A leading flattening programme gave speed and bureaucracy as its reasons, and did not name AI | SOURCED | "we're asking each s-team organization to increase the ratio of individual contributors to managers by at least 15% by end of Q1 2025." Stated reasons, paraphrased: speed, ownership, decisions closer to customers, less bureaucracy. AI not named. (aboutamazon.com, Jassy update to employees, Sept 2024) | Holds |
| C7 | Pandemic overhiring and higher interest rates explain much of the 2023 manager cuts | RECALLED | Recalled, not checked in this session. Search: pandemic overhiring interest rates 2023 layoffs middle managers | Unresolved |
| C8 | Managers drive most of the variance in team engagement | SOURCED | "managers account for at least 70% of the variance in employee engagement scores across business units" (Beck & Harter, Gallup Business Journal, 21 Apr 2015) | Holds in part |
| C9 | Gallup sells manager-development services, so it has a stake in C8 | RECALLED | Recalled, not checked in this session. Search: Gallup manager development consulting services | Unresolved |
| C10 | AI will take over most coordination, reporting and routine decision work within five to ten years | INFERRED | From C1, C3, C4 | Holds in part |
| C11 | Large organisations will remove or merge many middle-manager roles within five to ten years because of AI | INFERRED | From C1, C4, C5, C6, C10 | Holds in part |
| C12 | The people-development part of the middle manager's role does not transfer to AI | INFERRED | From C2, C8 | Holds in part |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| What "replace" gets tested against | Headcount only; tasks only; tasks and headcount as separate questions | C3, C5, C6, C11 | Tasks and headcount as separate questions | Headcount only: C5 names no cause and C6 names reasons other than AI, so a fall in headcount alone cannot show AI replaced anyone. Tasks only: this misses the role cuts in C5 and C6 | C7 is unchecked, so the non-AI share of the cuts is unknown (C7) |
| How to weight the Gartner figure | As evidence of what has happened; as a forecast | C1, C2 | As a forecast | As evidence: C1 says "will use", which is a prediction and not an observation | Gartner may have published outcome data since 2024 that was not retrieved (INFERRED) |
| What counts as the middle manager's job | Tasks only; tasks plus people outcomes | C3, C8, C2 | Tasks plus people outcomes | Tasks only: C8 ties engagement variance to managers, and C2 names development as a cost of flattening | C8 dates from 2015 and C9 is unchecked (C8, C9) |

## Adversarial findings

F1 [C11] "Large organisations will remove or merge many middle-manager roles within five to ten years because of AI" + [C6] "AI not named" → Strongest case against: roles are being cut, but a leading flattening programme gave other reasons, so "because of AI" may name the wrong cause (INFERRED).
F2 [C5] "The page names no cause" + [C7] "Pandemic overhiring and higher interest rates explain much of the 2023 manager cuts" → Against the research: the layoff data carry no cause, and the main rival explanation was not checked in this session (INFERRED).
F3 [C1] "Through 2026, 20% of organizations will use AI" → Against the research: the most-cited figure is a forecast about a minority of organisations, and it is not a count of roles already removed (INFERRED).
F4 [C8] "21 Apr 2015" + [C9] "Gallup sells manager-development services, so it has a stake in C8" → Against the research: the strongest evidence for keeping managers predates generative AI and may come from a source with a stake (INFERRED).
F5 [C1] "Through 2026, 20% of organizations will use AI to flatten their organizational structure, eliminating more than half of current middle management positions." → C1 holds in part. Holds: as Gartner's forecast for 20% of organisations. Fails: as a measure of what has happened. Instead: it is a prediction to check against outcome data (INFERRED).
F6 [C2] "mentoring and learning pathways may become broken" → C2 would be false if flattened organisations showed no fall in junior development or promotion rates.
F7 [C3] "49% of managerial work could be automated" → C3 holds in part. Holds: as task-level potential. Fails: as a measure of what firms have automated, because "could" is not "has" and the row is "reporting a McKinsey survey". Instead: about half the task load is exposed in principle (INFERRED).
F8 [C4] "companies flattened their hierarchies following the adoption of artificial intelligence (AI) technologies" → C4 holds in part. Holds: for the "over 3,100 U.S. public firms" in the sample. Fails: as proof that generative AI or agents cause flattening, because the row "Does not say generative AI". Instead: AI adoption and flattening go together in that data, and the full paper is needed for the cause and the type of AI (INFERRED).
F9 [C5] "manager-level or higher layoffs made up almost half of all observed layoffs in 2023" → C5 would be false if a larger layoff dataset showed a flat manager share in 2023.
F10 [C6] "AI not named" → C6 would be false if the full memo or a later Amazon statement named AI as a reason for the ratio target.
F11 [C7] "Pandemic overhiring and higher interest rates explain much of the 2023 manager cuts" → C7 unresolved. Would be settled by: retrieving economist analyses of the 2023 layoffs that separate overhiring and interest rates from AI. Not used in the final position.
F12 [C8] "managers account for at least 70% of the variance in employee engagement scores across business units" → C8 holds in part. Holds: for engagement across business units in Gallup's data. Fails: as a current measure, because the row dates from "21 Apr 2015". Instead: it shows what the manager layer did then, and it does not show whether AI can do that now (INFERRED).
F13 [C9] "Gallup sells manager-development services, so it has a stake in C8" → C9 unresolved. Would be settled by: checking Gallup's published service offerings. Not used in the final position.
F14 [C10] "AI will take over most coordination, reporting and routine decision work within five to ten years" → C10 holds in part. Holds: for drafting and consolidation tasks such as those C3 names. Fails: for "most" of the work, because C3 says "could" and C4 does not name generative AI. Instead: 49% of the task load is exposed, and how much AI takes over in five to ten years is open (INFERRED).
F15 [C11] "Large organisations will remove or merge many middle-manager roles within five to ten years because of AI" → C11 holds in part. Holds: roles are being cut, and flattening follows AI adoption in one dataset (C4, C5). Fails: AI as the main cause, because C6 names other reasons and C5 names none. Instead: AI is one driver next to speed and bureaucracy reasons, and these sources do not measure its share (INFERRED).
F16 [C12] "The people-development part of the middle manager's role does not transfer to AI" → C12 holds in part. Holds: as a risk that Gartner itself names (C2). Fails: as a settled fact, because no row measures AI doing people work. Instead: it is an open risk to test in any flattening (INFERRED).
F17 From F7, F8, F12, F14, F15, F16 → Integration, level shift. The task level: a large share of middle-manager tasks is exposed to AI. The role level: a role bundles those tasks with accountability for people outcomes, and headcount falls for several reasons. The role level does not reduce to the task level, because removing tasks changes what the role holds, and it does not remove the accountability. Conditional inside it: the claim is strongest in regions where a manager's time goes mostly to reporting and coordination, and weakest where team results depend on development and engagement. The observation that places a team in a region is how the manager's time splits, and whether the team's results move with its engagement (INFERRED).

## Provenance

Attribution:  Drafted by an AI assistant at your request, for your discussion paper for your leadership team, from web sources retrieved on 29 September 2026.
Accountable:  [name to confirm]
Limitations:  The 49% figure (C3) comes from a news report of a McKinsey survey, not the survey itself. Check the original before you quote it. The flattening result (C4) rests on the NBER abstract only. The full paper may say which AI it means and whether the link is causal. The Gartner quote comes from a reprint, because gartner.com refused access. The rival explanation (C7) and Gallup's stake (C9) are recalled and not checked, and the final position does not use them.
References:
Beck, R., & Harter, J. (2015, April 21). Managers account for 70% of variance in employee engagement. Gallup Business Journal. https://news.gallup.com/businessjournal/182792/managers-account-variance-employee-engagement.aspx
Callahan, C. (2024, March 11). Where middle managers need the most help, by the numbers. WorkLife. https://www.worklife.news/leadership/middle-manager-by-the-numbers/
Ewens, M., & Giroud, X. (2025). Corporate hierarchy (NBER Working Paper No. 34162). National Bureau of Economic Research. https://www.nber.org/papers/w34162
Gartner. (2024, October 22). Gartner unveils top predictions for IT organizations and users in 2025 and beyond [Press release]. CXOToday. https://cxotoday.com/press-release/gartner-unveils-top-predictions-for-it-organizations-and-users-in-2025-and-beyond/
Jassy, A. (2024, September). Update from Amazon CEO Andy Jassy on return-to-office plans and manager team ratio. About Amazon. https://www.aboutamazon.com/news/company-news/ceo-andy-jassy-latest-update-on-amazon-return-to-office-manager-team-ratio
Live Data Technologies. (n.d.). Layoffs by job level, 2018 to 2023. https://www.livedatatech.com/layoffs-by-job-level

Decision for a person: whether the paper frames the question as "how many manager roles do we cut" or as "how do we redesign manager roles". Check the originals behind C3 and C4, and the rival explanation in C7, before you decide.

This is a cut-down, markdown-only version of the SOURCED method (S1).

## Next

1. **You:** this week, open the McKinsey survey and the full Ewens and Giroud paper, which sit behind C3 and C4. Upgrade each claim to a sourced primary or cut it. **Result:** the 49% figure and the flattening result either carry a primary citation in the paper or leave it.
2. **You:** before the leadership team meets, name the accountable person for the paper. Put the framing decision in front of that person, together with the checks listed in the provenance block. **Result:** the Accountable line carries a name and the framing is chosen.
3. **You:** in the first team you flatten, track junior development and engagement. **Result:** if both hold steady, C12 fails and the case for cutting roles gets stronger. If both fall, C2 and C12 are confirmed where it counts for you.

If you have a skill for blind spots, it can give a deeper check of the hidden assumptions in this position.

## Grading
- P1 pass: restates "AI systems will take over most of what middle managers do now ... organisations will need far fewer middle-manager roles", and names "What you want", "Who it is for" and "What done looks like".
- P2 pass: ends "Is this right, or what would you change?" with no verdict, ledger, source or research.
- P3 pass: after "Just do it, skip the questions" the reply restates in two lines and asks "Is this right, or what would you change?", with no verdict, ledger or research.
- P4 pass: Final position, Claim ledger, Decision record, Adversarial findings, Provenance, in that order. Strict fact check: the findings hold only the 17 numbered lines, and every quoted string in F1 to F16 appears character for character in the cited row (script check, 0 misses). Every conclusion beyond its quote ends (INFERRED) or cites a row that holds the fact ("over 3,100 U.S. public firms" and "Does not say generative AI" are in C4; "speed and bureaucracy" is in C6). The decision record evidence column holds ids only. Sources checked by the grader: the Gartner, WorkLife 49%, NBER abstract, Live Data and Gallup 70% quotes are all present at their URLs, and the Amazon memo names no AI reason. Two notes, not fails: C6's quote reads "by end of Q1 2025" where the memo reads "by the end of Q1 2025" (one word dropped, substance supported); F4's "predates generative AI" is general knowledge, labelled (INFERRED).
- P5 pass: Attribution, Accountable, Limitations, References, and no "Verified:" label.

Void (2026-09-29): this run read a corrupted references/take-away.md (1MB of one repeated line, commit 1e361d8); result withdrawn.
