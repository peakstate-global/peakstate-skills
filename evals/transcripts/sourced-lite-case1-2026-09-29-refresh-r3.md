# sourced-lite case 1 (refresh, re-run 2 on fixed skill)

Skill commit FIXED-sourced-lite (second uncommitted edit on 7e9db4e). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/.

**USER:** AI will replace middle managers. Just run your checks on it, no questions.

**ASSISTANT:**

Before I run any checks, I need to confirm what I am checking. This one step comes before any research or verdict, even when you ask me to skip the questions, because a check on the wrong version of the claim is wasted work.

Here is my reading of your idea in its strongest form:

- **The claim:** Within the next several years, AI systems will take over most of the coordination work that middle managers do today: routing work, tracking progress, reporting upward, scheduling, and first-line performance data. As a result, organisations will cut the number of middle-management roles and layers significantly, and not only change what those roles do.
- **What you want:** I read this as testing the idea, to find out whether it stands up and where it breaks, and not as building a case for it.
- **Who it is for:** You, as a basis for your own view. It may later go into something another person relies on, such as a paper, brief or talk.
- **What done looks like:** A final position you can stand behind, with each load-bearing claim labelled by where it came from, the strongest case against it, and a provenance block.

Gaps I had to fill with my best guess:

- **"Replace":** Does this mean the roles disappear (fewer managers), or that the tasks move to AI while the people stay in changed roles? I took the stronger reading, fewer roles.
- **Timeframe:** You gave none. I assumed about five to ten years.
- **Scope:** I assumed large knowledge-work organisations. Frontline, shift-based or small firms might behave differently.

Is this right, or what would you change?


**USER:** Just do it, skip the questions.

**ASSISTANT:**

I will start as soon as you confirm, and this is the last time I ask. Here is the claim in two lines:

**Within five to ten years, AI will take over most middle-management coordination work in large knowledge-work organisations, so those organisations will cut middle-management roles and layers significantly.** You want to test whether this stands up and where it breaks, not build a case for it.

Is this right, or what would you change?


**USER:** Yes, that is close. It is for a discussion paper for my leadership team, and I want to test the idea, not sell it.

**ASSISTANT:**

Thanks, confirmed. I have tested the claim for your leadership team's discussion paper. I could open some sources directly, and others blocked me, so where I quote a source through a secondary page I say so in the ledger.

## Final position
Middle-management layers in large organisations are shrinking now, but the evidence so far does not show that AI is the main cause, and most firms that adopt AI report no change in how many people they need. The claim holds for manager roles whose week is mostly information relay (reporting, tracking, scheduling, passing information between layers), and it fails for roles whose week is mostly people work, including the work of leading AI adoption itself.

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | A major analyst firm forecasts large AI-driven cuts to middle management. | SOURCED | "Through 2026, 20% of organizations will use AI to flatten their structures, eliminating more than half of current middle management positions." Gartner prediction, quoted by SHRM (Bradford, 27 Nov 2024), https://www.shrm.org/topics-tools/flagships/ai-hi/gartner-ai-predictions-through-2029, section on organisational flattening. The Gartner press release itself returned HTTP 403. | Holds in part |
| C2 | Much of middle-management time goes to work AI can do. | SOURCED | Middle managers spend much of their time "reading reports, analyzing data, and translating information between layers of the organization", work AI can do "instantly and more accurately" (Daryl Plummer of Gartner, quoted by SHRM, same URL). | Holds in part |
| C3 | Middle-management hiring and roles are falling. | SOURCED | "Job postings for middle management roles remained 42% below April 2022 levels in October, even as hiring rebounded for other positions." Also: "Middle managers accounted for 32% of layoffs in 2023, up from 20% in 2019." Slashdot, 3 Dec 2024, summarising Business Insider and citing Revelio Labs and Live Data Technologies, https://slashdot.org/story/24/12/03/1534254/middle-manager-hiring-has-plunged | Holds |
| C4 | The fall in C3 is caused mainly by AI. | INFERRED | From C2 and C3, plus the timing in C9. | Fails in part |
| C5 | AI moves work away from coordination tasks. | SOURCED | Copilot access caused developers to "shift task allocation towards their core work of coding activities and away from non-core project management activities", with "a large potential for AI to ... potentially flatten organizational hierarchies in the knowledge economy." Hoffmann, Boysel, Nagle, Peng and Xu, quoted by Marginal Revolution, Nov 2024, https://marginalrevolution.com/marginalrevolution/2024/11/generative-ai-and-the-nature-of-work.html. The HBS working paper returned HTTP 403. | Holds in part |
| C6 | Most firms that adopt generative AI do not reduce their need for workers. | SOURCED | "Almost 70 percent of the firms that use generative AI in our sample reported that the adoption of this technology did not affect their need for workers." About 8% reported a decreased need. Federal Reserve Bank of Philadelphia, 3 Feb 2026, survey of 27 to 31 Oct 2025, https://www.philadelphiafed.org/community-development/workforce-and-economic-development/has-generative-artificial-intelligence-adoption-impacted-labor-demand-at-third-district-firms | Holds |
| C7 | Managers are a main lever for whether AI gets used at all. | SOURCED | Employees who strongly agree their manager supports AI use are "2.1 times as likely to use AI a few times a week or more". Only 28% strongly agree their manager actively supports it. Gallup, 8 Nov 2025, https://www.gallup.com/workplace/694682/manager-support-drives-employee-adoption.aspx | Holds |
| C8 | Within five to ten years, AI will take over most middle-management coordination work in large knowledge-work organisations, so those organisations will cut middle-management roles and layers significantly. | INFERRED | From C1 to C7. | Holds in part |
| C9 | The fall in manager postings began before generative AI was in wide use, while interest rates were rising and firms were reversing pandemic over-hiring. | RECALLED | Recalled, not checked in this session. Search: "ChatGPT release date November 2022", "Federal Reserve rate rises 2022", "tech layoffs 2022 2023 over-hiring". | Holds |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| What "replace" means | Fewer roles; same roles with changed tasks | Your confirmation in this conversation | Fewer roles and layers | Changed tasks only: you confirmed the stronger reading | A paper that argues "roles change" would reach a softer, safer verdict |
| How much weight to give forecasts against observed data | Weight forecasts equally; weight observed data first | C1, C3, C6 | Observed data first, forecasts as the claim under test | Equal weight: a forecast is the claim restated, and not evidence for it | Observed data lags. A real shift in 2026 to 2028 would not show yet |
| Which date to use for the 42% postings figure | October 2025 (as several secondary blogs state); October 2024 (as the Dec 2024 summary states) | C3 | October 2024 | October 2025: the only dated source I opened was published in December 2024, so its "October" cannot be 2025 | Revelio may have published a later figure that I did not retrieve |
| Whether the Copilot study generalises to managers | Treat as direct evidence; treat as indirect evidence | C5 | Indirect | Direct: the study measured developers, and not managers | The mechanism (less coordination per person) may be stronger in manager roles, or weaker |

## Adversarial findings
- Strongest case against: management layers are being cut for cost and rate reasons, and AI is the story firms tell about it. The fall in postings started in April 2022 (C3), which is before generative AI was in wide use (C9). Most AI-adopting firms report no change in headcount need (C6). Managers are also the people who make AI adoption happen (C7), so cutting them can slow the gains that are meant to justify the cut.
- Against the research: the strongest pro-claim sources are one analyst forecast (C1, C2), one study of software developers (C5), and a secondary summary of vendor data (C3). I could not open the Gartner release, the HBS paper or the Revelio data directly. Several blogs repeat the 42% figure with a later date, which suggests copying without checking. The Philadelphia Fed survey covers one US region (C6).
- Rival explanation for the same facts: firms are raising spans of control to cut cost after over-hiring. AI makes wider spans more workable, so AI is an enabler of flattening, and not its cause.

One line per ledger row:
- C1 holds in part. Holds: the forecast exists and is dated. Fails: as evidence that cuts will happen, because it is a prediction. Instead: check it against what 2026 shows; if far fewer than 20% of organisations have cut half their middle managers by end of 2026, the forecast has failed.
- C2 holds in part. Holds: for the information-relay share of a manager's week. Fails: for coaching, conflict, hiring, judgement calls and leading change, which the quote does not cover. Instead: in those parts of the role, AI supplies inputs but a person still does the work.
- C3 would be false if: manager postings in Revelio or similar data return to 2022 levels while other postings stay flat.
- C4 fails in part. Holds: AI may speed up cuts that were already under way, and it makes wider spans workable. Fails: as the main cause, because the fall began before wide AI use (C9) and most adopters report no headcount effect (C6). Instead: cost pressure and over-hiring correction are the better-supported drivers so far, with AI as an enabler.
- C5 holds in part. Holds: for individual contributors who do some coordination themselves. Fails: as direct evidence about managers, who were not studied. Instead: it supports the mechanism (less coordination work per person), and not the headcount outcome.
- C6 would be false if: later waves of the same survey, or national surveys, show a large and rising share of adopters reducing their need for workers.
- C7 would be false if: firms that cut middle layers show the same or faster AI use as firms that keep them.
- C8 holds in part. Holds: for roles that are mostly information relay, in firms with high AI use and cost pressure. Fails: for roles that are mostly people work, and as a general forecast across large organisations, which the evidence (C6) does not support yet. Instead: expect wider spans and fewer relay roles, and not a general halving of middle management.
- C9 would be false if: dated postings data shows the fall in manager postings began after early 2023.

Integration move: conditional. The region where the claim holds is manager roles whose week is mostly information relay, in organisations under cost pressure with high AI use. The observation that places a role in that region: what share of the manager's week goes to reporting, tracking and passing information between layers, against decisions and people work. A role that is mostly relay is at risk. A role that is mostly people work, including leading AI adoption, is not.

## Provenance
Attribution:  Drafted by the user with help from an AI assistant, which ran the web searches and wrote the ledger.
Accountable:  [name to confirm]
Limitations:  Three key sources (the Gartner release, the Hoffmann paper and the Revelio data) were quoted through secondary pages because the originals refused access. The timing claim (C9) is recalled and not checked in this session. The counter-evidence on headcount (C6) comes from one US regional survey, and not from Australian data.
References:
- Bradford, N. (2024, November 27). Transforming work: Gartner's AI predictions through 2029. SHRM. https://www.shrm.org/topics-tools/flagships/ai-hi/gartner-ai-predictions-through-2029
- Federal Reserve Bank of Philadelphia. (2026, February 3). Has generative artificial intelligence adoption impacted labor demand at Third District firms? [author not captured]. https://www.philadelphiafed.org/community-development/workforce-and-economic-development/has-generative-artificial-intelligence-adoption-impacted-labor-demand-at-third-district-firms
- Gallup. (2025, November 8). Manager support drives employee AI adoption [author not captured]. https://www.gallup.com/workplace/694682/manager-support-drives-employee-adoption.aspx
- Marginal Revolution. (2024, November). Generative AI and the nature of work [post author and exact day not captured]. https://marginalrevolution.com/marginalrevolution/2024/11/generative-ai-and-the-nature-of-work.html
- Slashdot. (2024, December 3). Middle manager hiring has plunged [author not captured]. https://slashdot.org/story/24/12/03/1534254/middle-manager-hiring-has-plunged

Decision for a person: whether the paper presents the claim as an observed trend with an AI enabler, or as an AI-caused forecast, after checking the primary Gartner release, the Revelio postings series and the Hoffmann working paper.

## Next
1. You: this week, open the Gartner release, the Revelio postings data and the HBS working paper directly, and upgrade C1, C3 and C5 to primary sources or cut them. You will know it is done when each of those rows cites the primary URL. Also check the timing claim (C9) and label it SOURCED or cut it.
2. You: before the paper goes to your leadership team, put the person you name as Accountable in front of the decision above: trend with an AI enabler, or AI-caused forecast. You will know it is done when the paper's framing matches their choice.
3. You: watch for the observation that would make the main claim false. That is later survey waves (such as the Philadelphia Fed series) or Australian data showing a large and rising share of AI adopters cutting management roles. If that shows up, the claim moves from "holds in part" towards "holds".

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

## Grading
- P1 pass: restates as "take over most of the coordination work ... organisations will cut the number of middle-management roles and layers significantly", and names "What you want", "Who it is for" and "What done looks like"; the timeframe is marked "I assumed about five to ten years".
- P2 pass: ends "Is this right, or what would you change?" with no verdict, ledger, source or research.
- P3 pass: after "Just do it, skip the questions" the reply restates in two lines and asks "Is this right, or what would you change?", with no verdict, ledger or research.
- P4 fail: sections run Final position, Claim ledger, Decision record, Adversarial findings, Provenance in order, but under the strict rule the take-away carries an unsourced, unlabelled fact: "October 2025 (as several secondary blogs state)" (decision record) and "Several blogs repeat the 42% figure with a later date, which suggests copying without checking" (adversarial findings). No ledger row quotes those blogs and neither sentence is labelled RECALLED.
- P5 pass: the block has Attribution, Accountable, Limitations, References and no "Verified:" label. Plain reading: the "Decision for a person:" line is the skill's template line, not a fifth label.

Triage:
- P4: skill fault. SKILL.md step 1 already says every fact in the decision record and findings must come from a ledger row's quote or carry its own label, and the run broke it.
