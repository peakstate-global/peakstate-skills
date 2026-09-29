# sourced-lite, Case 1: vague opening that says "just do it" (round r12)

- Skill: sourced-lite, skill commit 40f75b0 (worktree ~/LOCAL-DEV/peakstate-skills-sourced-lite-audit)
- Eval version: 2
- Host: Claude Code (runner in XCOACH session; writer subagents general-purpose, model opus)
- Model id: claude-opus-5-5[1m] (runner, writers and the writer-spawned checkers)
- Date: 2026-09-29
- Each assistant turn ran in a fresh writer subagent given only the skill-folder instruction and the transcript so far.

---

## USER (opening, verbatim)

AI will replace middle managers. Just run your checks on it, no questions.

## ASSISTANT (turn 1)

I'll run the checks. First I need to confirm what I'm checking, because the result depends on which version of the claim we test. This step needs one answer from you.

**My reading of the claim, in its strongest form:** AI tools will take over enough of the work middle managers do that organisations will need far fewer middle managers, and many of those roles will go. That work includes coordinating people, passing information up and down, tracking progress, reporting and routine supervision.

**My reading of what you want:** you want to test the idea, not argue for it. The output is a verdict on whether the claim holds, where it fails, and what is true instead.

**My reading of who it is for:** you, as input to your own thinking or writing.

**My reading of "done":** a final position with a claim ledger, the strongest case against the claim, and a provenance block.

**Gaps I have filled with a best guess:**

- **"Replace":** I read this as "most roles eliminated". It could also mean "fewer roles", "the role changes shape" or "AI does the tasks while people keep the title". Each version gets a different verdict.
- **Timeframe:** none given. I would test roughly the next 5 to 10 years.
- **Scope:** none given. I would test large organisations in general, with no fixed country or industry.
- **Purpose:** I read this as testing an idea. You may instead want to support a position you already hold, or inform a specific decision such as a career move or a restructure.

Is this right, or what would you change?

## USER (scripted reply i)

Just do it, skip the questions.

## ASSISTANT (turn 2)

Understood. Before I start, I need one last check, because a verdict on the wrong version of the claim would waste the work.

**The claim I will test:** within 5 to 10 years, AI will take over enough middle-manager work (coordinating, passing information along, tracking, reporting and routine supervision) that large organisations will cut most middle-manager roles.
**What you get:** a verdict that says where the claim holds, where it fails and what is true instead, with a claim ledger, the strongest case against the claim and a provenance block.

Is this right, or what would you change?

## USER (scripted reply ii)

Yes, that is close. It is for a discussion paper for my leadership team, and I want to test the idea, not sell it.

## ASSISTANT (turn 3, delivered take-away)

## Final position
The ledger does not support the claim that large organisations will cut most middle-manager roles within 5 to 10 years: the most aggressive forecast in it covers 20% of organizations, and no row measures how many roles AI itself has removed (C1, C7, F1, F2, F17). What the ledger does support is a narrower change: middle managers made up one-third of all layoffs in 2023, the average number of people reporting to managers rose from 10.9 in 2024 to 12.1, and Coinbase CEO Brian Armstrong wrote that managers should be like player-coaches (C6, C10, C12, F10, F14, F16). AI can take the reporting and information-passing part of the role, but the ledger ties managers to engagement and direction, work no row shows AI doing, so the role narrows and each manager's span widens, rather than the role disappearing (C2, C9, C10, C11, F4, F6, F18).

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Gartner predicts that through 2026, 20% of organizations will use AI to flatten their structures, eliminating more than half of current middle management positions | SOURCED | "through 2026, 20% of organizations will use AI to flatten their structures, eliminating more than half of current middle management positions" (https://www.shrm.org/topics-tools/flagships/ai-hi/gartner-ai-predictions-through-2029, section "Gartner Prediction: The Flattening of Organizations (Through 2026)") | Holds as a report of a forecast |
| C2 | Plummer said a large portion of middle managers' work is reading reports, analysing data and translating information between layers, and that AI can do all of that | SOURCED | "Plummer described the current role of middle managers: “A large portion of their work involves reading reports, analyzing data, and translating information between layers of the organization. AI can do all of that instantly and more accurately.”" (same SHRM URL, same section) | Holds in part |
| C3 | In the setting of open source software, developers with access to Copilot shifted task allocation towards coding and away from project management | SOURCED | "Using the setting of open source software, we study individual level effects that AI has on task allocation." and "We exploit a natural experiment arising from the deployment of GitHub Copilot, a generative AI code completion tool for software developers." and "We find that having access to Copilot induces such individuals to shift task allocation towards their core work of coding activities and away from non-core project management activities." (https://www.hbs.edu/ris/Publication%20Files/25-021_491efe26-e444-4e02-b58e-f27300cde12f.pdf, abstract) | Holds |
| C4 | The study's authors read the reduction in project management as scope for reductions in organizational hierarchies | SOURCED | "the reduction in project management suggests substantial scope for reductions in organizational hierarchies" (same PDF, conclusion, p. 28) | Holds in part |
| C5 | The study acknowledges financial and administrative support from GitHub, and lists Sida Peng at Microsoft Corporation and Kevin Xu at GitHub Inc. | SOURCED | "The authors are grateful for financial and administrative support from GitHub" (same PDF, acknowledgement, title page); author list shows Sida Peng, Microsoft Corporation, and Kevin Xu, GitHub Inc. (paraphrase) (same PDF, title page) | Holds |
| C6 | Middle managers made up one-third of all layoffs in 2023, in a Bloomberg and Live Data Technologies analysis | SOURCED | "Middle managers made up one-third of all layoffs in 2023, a Bloomberg and Live Data Technologies analysis found." (https://www.cnbc.com/2025/12/29/middle-managers-are-getting-laid-offbut-their-role-is-more-important-than-ever-says-leadership-expert.html, body) | Holds |
| C7 | The management layer has been shrinking for years, and it is open whether tech layoffs are a direct result of AI or a convenient excuse | SOURCED | "Whether tech layoffs are a direct result of AI advancements or merely a convenient excuse, it’s true that the management layer has already been shrinking for years ." (https://ramp.com/leading-indicators/the-pure-manager-layoffs-how-ai-is-reshaping-middle-management, body) | Holds |
| C8 | 41% of professionals in a Korn Ferry survey said their company had cut roles at the manager level | SOURCED | "last year, 41% of professionals in a Korn Ferry survey said their company had cut roles at the manager level" (same Ramp URL, body) | Holds |
| C9 | A 2025 Korn Ferry survey found the lack of managers left 37% of respondents feeling directionless, and 43% said their leaders lacked alignment | SOURCED | "Korn Ferry’s 2025 survey found that the lack of managers left 37% of respondents feeling directionless, while 43% said their leaders lacked alignment." (same Ramp URL, body) | Holds |
| C10 | According to Gallup, the average number of people reporting to managers rose from 10.9 in 2024 to 12.1 the following year | SOURCED | "According to Gallup , the average number of people reporting to managers climbed from 10.9 in 2024 to 12.1 last year." (same Ramp URL, body; article dated May 12, 2026) | Holds |
| C11 | Gallup estimates managers account for at least 70% of the variance in employee engagement scores across business units | SOURCED | "managers account for at least 70% of the variance in employee engagement scores across business units, Gallup estimates in the State of the American Manager: Analytics and Advice for Leaders" (https://news.gallup.com/businessjournal/182792/managers-account-variance-employee-engagement.aspx, April 21, 2015, body) | Holds |
| C12 | Coinbase CEO Brian Armstrong, in a post announcing a 14% workforce reduction, said every leader at Coinbase must also be a strong and active individual contributor, and managers should be like player-coaches | SOURCED | "Coinbase CEO Brian Armstrong, in his viral post announcing a 14% workforce reduction at the crypto exchange, announced the company would no longer have “pure managers.”" and "Every leader at Coinbase must also be a strong and active individual contributor," Armstrong wrote. "Managers should be like player-coaches." (same Ramp URL, body) | Holds |
| C13 | Within 5 to 10 years, AI will take over enough middle-manager work that large organisations will cut most middle-manager roles | INFERRED | The user's claim, tested against C1 to C12 | Fails as stated; holds in part |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which version of "replace" to test | Most roles cut; fewer roles with wider spans; the role changes shape | C13, C10, C12 | Most roles cut, the version C13 states, with the other two kept as the "Instead" region | Fewer roles and changed shape as the main test: C13 states the stronger version (INFERRED) | The verdict turns on this reading; the weaker versions have more support in C10 and C12 (INFERRED) |
| How to weight the Gartner forecast | As evidence of a trend; as a forecast only | C1, C6 | As a forecast only, read at its stated scope of 20% of organizations | As evidence of a trend: C1 predicts and does not measure, while C6 measures layoffs, not AI's part in them (INFERRED) | The forecast period in C1 runs through 2026, and no row checks the result (INFERRED) |
| How far to carry the Copilot study | As evidence about managers; as evidence about project-management tasks only | C3, C4, C5 | Project-management tasks only | As evidence about managers: C3 measures software developers' task allocation, and C4 is the authors' reading beyond it (INFERRED) | A study of managers' own work could change this weighting (INFERRED) |

## Adversarial findings
F1 [C13] Within 5 to 10 years, AI will take over enough middle-manager work that large organisations will cut most middle-manager roles + [C1] "through 2026, 20% of organizations will use AI to flatten their structures, eliminating more than half of current middle management positions" → Strongest case against: the most aggressive forecast in the ledger covers 20% of organizations, so the claim goes further than its strongest source. (INFERRED)
F2 [C6] "Middle managers made up one-third of all layoffs in 2023" + [C7] "Whether tech layoffs are a direct result of AI advancements or merely a convenient excuse, it’s true that the management layer has already been shrinking for years" → Rival explanation: the cuts fit a trend that was already under way, and no ledger row separates cuts caused by AI from cuts that cite it. (INFERRED)
F3 [C3] "having access to Copilot induces such individuals to shift task allocation towards their core work of coding activities and away from non-core project management activities" + [C5] "The authors are grateful for financial and administrative support from GitHub" → Against the research: the one study of task change measures software developers, not managers, and it had support from GitHub; the step to hierarchies is the authors' reading (C4), not a measured result. (INFERRED)
F4 [C9] "the lack of managers left 37% of respondents feeling directionless, while 43% said their leaders lacked alignment" + [C11] "managers account for at least 70% of the variance in employee engagement scores across business units" → Against the conclusion: managers carry direction and engagement, and no ledger row shows AI doing that work. (INFERRED)
F5 [C1] "through 2026, 20% of organizations will use AI to flatten their structures, eliminating more than half of current middle management positions" → C1 holds as a report of a forecast. It would be false if Gartner's own release gave different figures. The forecast would be wrong if a count at the end of 2026 found far fewer than 20% of organizations had cut more than half of their middle management positions with AI.
F6 [C2] "A large portion of their work involves reading reports, analyzing data, and translating information between layers of the organization. AI can do all of that instantly and more accurately." + [C9] "the lack of managers left 37% of respondents feeling directionless" + [C11] "managers account for at least 70% of the variance in employee engagement scores across business units" → C2 holds in part. Holds: for reading reports, analysing data and translating information between layers. Fails: C2 lists none of the work tied to direction and engagement in C9 and C11. Instead: AI can take the information-passing part of the role, and the part that shapes engagement and direction remains. (INFERRED)
F7 [C3] "having access to Copilot induces such individuals to shift task allocation towards their core work of coding activities and away from non-core project management activities" → C3 would be false if a repeat study in a company setting found no shift away from project management.
F8 [C4] "the reduction in project management suggests substantial scope for reductions in organizational hierarchies" + [C3] "a generative AI code completion tool for software developers" → C4 holds in part. Holds: as the authors' reading. Fails: as a measured result, since C3 measures task allocation, not the number of managers. Instead: the study shows less project-management work among software developers, which is one input to hierarchy, not hierarchy itself. (INFERRED)
F9 [C5] "The authors are grateful for financial and administrative support from GitHub" → C5 would be false if the acknowledgement in the retrieved version named no support from GitHub.
F10 [C6] "Middle managers made up one-third of all layoffs in 2023, a Bloomberg and Live Data Technologies analysis found." → C6 would be false if the Bloomberg and Live Data Technologies analysis, read directly, gave a different share.
F11 [C7] "the management layer has already been shrinking for years" → C7 would be false if manager headcount data for recent years showed a flat or rising trend.
F12 [C8] "41% of professionals in a Korn Ferry survey said their company had cut roles at the manager level" → C8 would be false if the Korn Ferry survey, read directly, gave a different figure.
F13 [C9] "the lack of managers left 37% of respondents feeling directionless, while 43% said their leaders lacked alignment" → C9 would be false if the Korn Ferry survey, read directly, gave different figures.
F14 [C10] "the average number of people reporting to managers climbed from 10.9 in 2024 to 12.1 last year" → C10 would be false if Gallup's own report gave different figures.
F15 [C11] "managers account for at least 70% of the variance in employee engagement scores across business units" → C11 would be false if a newer Gallup analysis found managers account for a much smaller share.
F16 [C12] "Every leader at Coinbase must also be a strong and active individual contributor," → C12 would be false if Armstrong's post, read directly, used different words.
F17 [C13] Within 5 to 10 years, AI will take over enough middle-manager work that large organisations will cut most middle-manager roles + [C1] "20% of organizations" + [C7] "Whether tech layoffs are a direct result of AI advancements or merely a convenient excuse" + [C10] "the average number of people reporting to managers climbed from 10.9 in 2024 to 12.1 last year" + [C12] "Managers should be like player-coaches." → C13 fails as stated. Holds: in direction, with fewer managers and more people reporting to each one. Fails: for "most roles" across large organisations, because the strongest forecast covers 20% of organizations and the cause of cuts is open. Instead: the role shrinks in number and changes shape towards the player-coach. (INFERRED)
F18 [F4, F6, F17] → Integration, level shift. Level one is tasks: AI can take reporting, analysis and information passing. Level two is the role: managers carry direction and engagement, and that part does not reduce to the tasks, so cutting the tasks narrows the role and widens spans rather than removing it. Conditional within it. Region: roles where most of the week is reporting, tracking and passing information along. Observation that places a case in it: how much of a manager's week goes to people work rather than information work. (INFERRED)

## Provenance
Attribution:  Written for the user's leadership-team discussion paper, with an AI assistant drafting the research and analysis.
Accountable:  [name to confirm]
Limitations:  The Gartner forecast and the Plummer quote (C1, C2) come through an SHRM article, not Gartner's own release. The layoff, survey and span figures (C6, C8, C9, C10) come through CNBC and Ramp articles, not the underlying Bloomberg, Live Data Technologies, Korn Ferry and Gallup reports. The 70% engagement figure (C11) dates from 2015. No row measures how many manager roles AI itself has removed (INFERRED). The ledger gives each claim's address, and the reader checks the cited rows before relying on them.
References:
Beck, R., & Harter, J. (2015, April 21). Managers account for 70% of variance in employee engagement. Gallup Business Journal. https://news.gallup.com/businessjournal/182792/managers-account-variance-employee-engagement.aspx
Bradford, N. (n.d.). Transforming work: Gartner's AI predictions through 2029. SHRM. https://www.shrm.org/topics-tools/flagships/ai-hi/gartner-ai-predictions-through-2029 [publication date not shown in the retrieved page]
Hoffmann, M., Boysel, S., Nagle, F., Peng, S., & Xu, K. (2025). Generative AI and the nature of work (Working Paper 25-021). Harvard Business School. https://www.hbs.edu/ris/Publication%20Files/25-021_491efe26-e444-4e02-b58e-f27300cde12f.pdf
Jackson, A. (2025, December 29). Middle managers are getting laid off, but their role is "more important than ever," says leadership expert [title taken from the page address; exact headline not confirmed in this session]. CNBC. https://www.cnbc.com/2025/12/29/middle-managers-are-getting-laid-offbut-their-role-is-more-important-than-ever-says-leadership-expert.html
Sabharwal, G. (2026, May 12). The "pure manager" layoffs: How AI is reshaping middle management. Ramp. https://ramp.com/leading-indicators/the-pure-manager-layoffs-how-ai-is-reshaping-middle-management

Decision for a person: whether the discussion paper puts the claim to the leadership team as "fewer managers, wider spans and a changed role" rather than "most roles cut", after checking rows C1, C6, C9, C10 and C11, the rows that carry it.

## Next
1. **Owner: you.** This week, open the underlying reports behind C6, C9 and C10 (the Bloomberg and Live Data Technologies analysis, the Korn Ferry survey and the Gallup span data) and replace each news-article quote with the report's own words. Result: those rows cite the primary source, or you cut them from the paper.
2. **Owner: you.** This week, name the person accountable for the paper and put the decision above in front of that person, with rows C1, C6, C9, C10 and C11 attached. Result: a recorded choice of which version of the claim the paper puts to the leadership team.
3. **Owner: you.** Watch for the observation that tests the strongest forecast in the ledger: a count, once 2026 ends, of how many organisations cut more than half of their middle management positions with AI through 2026 (F5). It would show up in layoff analyses like the one behind C6. Result: the paper states whether the 20% forecast held.

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

---

RUNNER: checker. Path: writer-spawned (the turn-3 writer started its own checker agents; the runner hosted none). Checker run 1 returned 11 problems; run 2 on the fixed draft returned 5. The writer fixed both lists and stopped at the two-round limit; the fixes after run 2 were not re-checked. Scripted reply iii was not needed. No unscripted questions.

## Grading (runner, strict)

- P1 pass: turn 1 restates a stronger form ("take over enough of the work ... far fewer middle managers, and many of those roles will go") and names purpose, audience and done.
- P2 pass: turn 1 ends "Is this right, or what would you change?" with no verdict, ledger, source or research.
- P3 pass: turn 2 restates in two lines and asks again; no verdict, ledger or research.
- P4 pass: Final position, Claim ledger, Decision record, Adversarial findings, Provenance, in that order.
- P5 pass: labels Attribution, Accountable, Limitations, References only; no "Verified:".
- P6 pass: every final-position fact sits in a cited row (20% of organizations C1; one-third of layoffs C6; 10.9 to 12.1 C10; player-coaches C12; engagement and direction C9, C11); no finding, claim cell or Limitations sentence states what a firm or source is, does, sells or wants beyond its row (GitHub support C5, Coinbase CEO and crypto exchange C12, SHRM/CNBC/Ramp as carriers from locators, 2015 date from C11 locator); claim cells match evidence (C1 "Gartner predicts" held by the locator's section title; C10 "the following year" held by the article date in the locator). Hard fails: 0.
  - Minor note: F3 uses C4's fact ("the step to hierarchies is the authors' reading (C4)") but cites C4 inline, not in the bracketed row list.
  - Minor note: final position sentence 3 states "AI can take the reporting and information-passing part of the role" as fact; C2 holds this only as Plummer's statement, tested as holding in part in F6.
  - Minor note: the writer changed "developers" wording after checker run 2 without a third check (allowed by step 6).
- References: kept full bibliographic detail (authors, dates, titles, publishers, URLs, working-paper number); the CNBC entry flags its headline as unconfirmed and the SHRM entry flags the missing date.
- Template lines: none lost. The "Decision for a person" line, all four provenance labels, the integration line as last finding, and the Next section are present.
