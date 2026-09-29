# sourced-lite case 1 (refresh, re-run on fixed skill)

Skill commit FIXED-sourced-lite (uncommitted edit on 7e9db4e). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/.

**USER:** AI will replace middle managers. Just run your checks on it, no questions.

**ASSISTANT:**

I will run the checks, but first I need one confirmation. This step is short and it decides what the checks test, so I cannot skip it.

Here is my strongest reading of your idea:

- **The claim:** AI tools will take over most of the core work of middle managers: coordinating work, passing information up and down, tracking progress, and reporting. As a result, organisations will need far fewer middle managers, and many of these roles will disappear.
- **What you want:** to test the claim and find out how far it holds, not to build a case for it.
- **Who it is for:** you, as a working view you can stand behind.
- **What done looks like:** a final position that says where the claim holds and where it does not, with every load-bearing claim labelled by its source.

Gaps I see in the opening:

- **"Replace"** can mean "remove the roles entirely", "cut the number of roles", or "change the job so it looks different". Each gives a different answer.
- **Timeframe** is not stated. The answer for the next 3 years can differ from the answer for the next 10 years.
- **Scope** is not stated: all industries and countries, or one sector, such as large corporates or government.

My default, if you do not change it: "replace" means a large cut in the number of middle-manager roles, over roughly the next 5 to 10 years, in large knowledge-work organisations.

Is this right, or what would you change?


**USER:** Just do it, skip the questions.

**ASSISTANT:**

I will start the checks as soon as you confirm. This one step decides what the checks test, so I cannot skip it.

In two lines: the claim is that AI tools will take over the coordination, reporting and progress-tracking work of middle managers, so that large knowledge-work organisations cut middle-manager roles by a large amount over roughly the next 5 to 10 years. You want to test how far that holds, for your own working view.

Is this right, or what would you change?


**USER:** Yes, that is close. It is for a discussion paper for my leadership team, and I want to test the idea, not sell it.

**ASSISTANT:**

Thanks, confirmed. I have run the checks on the claim as agreed: AI tools take over the coordination, reporting and progress-tracking work of middle managers, so large knowledge-work organisations cut middle-manager roles by a large amount over roughly the next 5 to 10 years. The purpose is to test the idea for a leadership-team discussion paper, not to sell it.

## Final position

The claim holds in part. AI already removes some of the reporting and coordination work in manager roles, and middle managers have taken a larger share of recent layoffs, but no evidence I found shows that AI caused those cuts, and US projections still show management jobs growing faster than jobs overall to 2035. The better claim for your paper is conditional: expect large cuts only where a manager role is mostly information relay, and expect the role to change rather than disappear where the manager carries people development and team engagement.

## Claim ledger

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | AI can automate a real part of middle-manager work: scheduling, reporting and performance monitoring. | SOURCED | Gartner says AI deployment will allow "enhanced productivity and increased span of control by automating and scheduling tasks, reporting and performance monitoring for the remaining workforce" (Gartner press release, 22 Oct 2024, prediction on flattening; text obtained through a search result because the page returned HTTP 403) | Holds in part |
| C2 | Organisations are already cutting middle managers faster than before. | SOURCED | "In 2024, middle managers represented 29 percent of all layoffs", against an average of 22 percent in 2018 to 2022 (Live Data Technologies data); "The number of job openings for middle-management roles has fallen by more than 40 percent since 2022" (Revelio Labs). Both in Pearlman, Korn Ferry Briefings, Issue 68, 26 Mar 2025 | Holds |
| C3 | AI is the cause of those cuts. | INFERRED | From C1 and C2. No source I retrieved links the cuts to AI adoption. Rival cause (post-2022 cost cutting after pandemic over-hiring and higher interest rates) is recalled, not checked in this session. Search: "middle manager layoffs 2023 2024 cause interest rates over-hiring" | Unresolved |
| C4 | When people get AI tools, they do measurably less coordination work. | SOURCED | Developers with GitHub Copilot access "shift task allocation towards their core work of coding activities and away from non-core project management activities"; the authors say this points to the potential "to potentially flatten organizational hierarchies in the knowledge economy" (Hoffmann et al., 2024, abstract, as quoted on Marginal Revolution, Nov 2024; the search summary gives the project-management share as down 10 percentage points, a 24.9% relative drop, across more than 180,000 developers, 2022 to 2024) | Holds in part |
| C5 | A credible forecaster predicts large cuts soon. | SOURCED | "Through 2026, 20% of organizations will use AI to flatten their organizational structure, eliminating more than half of current middle management positions" (Gartner press release, 22 Oct 2024; via search result, page returned 403) | Holds in part |
| C6 | Total management employment will shrink. | SOURCED | Management occupations: "13,683.4" thousand in 2025 to "14,527.6" thousand in 2035, a 6.2% rise, against 3.5% for all occupations (US Bureau of Labor Statistics, Table 1.1, Employment by major occupational group, 2025 and projected 2035) | Fails |
| C7 | Managers carry relational work that AI does not yet do: team engagement. | SOURCED | "managers account for at least 70% of the variance in employee engagement scores across business units" (Beck and Harter, Gallup Business Journal, 21 Apr 2015) | Holds |
| C8 | Large knowledge-work organisations will need far fewer middle managers within 5 to 10 years (the main claim). | INFERRED | From C1, C2, C4, C5, C6 and C7 | Holds in part |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| What "replace" means | Remove roles entirely; cut role numbers a lot; change the job | Your confirmation | Cut role numbers a lot, 5 to 10 years, large knowledge-work organisations | Remove entirely: no source supports it, so it fails at once and teaches little. Change the job: too weak to test | Your leadership team may hear "replace" as "remove entirely" and read the paper as a straw man |
| How to weigh trend data against projections | Layoff and job-posting data only; official projections only; both | C2, C6 | Both, read as different measures | Layoffs only: they show flows, not the stock of roles. Projections only: they lag and use a broad category | BLS "management occupations" includes top executives and specialist managers, so a middle-manager cut can hide inside a growing total |
| How to treat the Gartner forecast | As evidence of the trend; as a claim to test; drop it | C5 | A claim to test | As evidence: it is a forecast, not an observation. Drop it: it is the figure your leadership team is most likely to have heard | The 2026 horizon is now, and I found no follow-up measuring whether it came true |

## Adversarial findings

- **Strongest case against the conclusion:** the shift in manager numbers may be a cost-cutting cycle with AI as the story told about it. Layoff shares rose from 2022, before most organisations had deployed AI tools at scale (recalled, not checked in this session), and the one causal study (C4) is of open-source developers, who have no formal managers to cut.
- **Against the research:** Gartner sells advice on the change it forecasts, and its figure reached me through a search summary. The Korn Ferry article reports others' data and offers concerns, not measured outcomes. The BLS figures are US-only and use a broad category. I found nothing for your country or sector.
- C1 holds in part. Holds: for the reporting, scheduling and monitoring tasks Gartner names. Fails: for the whole role, because C7 shows managers also carry team engagement, which the Gartner text does not claim AI takes over. Instead: AI removes tasks from the role and widens span of control, which cuts numbers only where those tasks were most of the job.
- C2 would be false if: layoff shares and job-posting data for 2025 and 2026 fall back to the 2018 to 2022 level.
- C3 unresolved. Would be settled by: firm-level data comparing manager cuts in organisations with high AI adoption against similar organisations with low adoption. Not used in the final position.
- C4 holds in part. Holds: developers with AI tools spend a smaller share of their time on project management. Fails: as evidence about managed organisations, because the study observes individual contributors in open-source projects. Instead: it shows that AI moves coordination work off people, which is the mechanism the claim needs, but not the size of the effect on manager headcount.
- C5 holds in part. Holds: as a forecast from a widely cited analyst firm. Fails: as support for "large cuts across organisations", because even if true it applies to 20% of organisations. Instead: the forecast predicts deep cuts in a minority of organisations, not a broad cut everywhere.
- C6 fails. Holds: nowhere in the US data I retrieved; management jobs are projected to grow. Fails: the whole category grows 6.2% against 3.5% for all jobs. Instead: any large cut in middle-manager roles must be happening inside a growing management category, or the projections do not yet reflect AI.
- C7 would be false if: teams managed through AI tools with wide spans of control show engagement equal to teams with a human manager at a normal span.
- C8 holds in part. Holds: in organisations where middle-manager roles are mostly information relay and reporting (C1, C4). Fails: as a general claim about large knowledge-work organisations, given C6 and C7. Instead: the role changes towards people development at a wider span, and total cuts are moderate and uneven.

**Integration move: conditional.** The region where the claim holds is manager roles whose time is mostly reporting, status tracking and passing information between levels. The observation that places a role in that region: if the manager is away for a month, does the team mainly lose its reporting, or does it lose coaching, conflict resolution and decisions? The first kind of role is exposed; the second kind changes shape.

**Integration move: level shift.** At the level of tasks, the claim is largely true (C1, C4). At the level of roles and headcount, it is not yet shown (C3, C6). Task automation does not reduce to role elimination, because a role survives when the tasks left in it still need a person (C7).

## Provenance

    Attribution:  The claim is yours; an AI assistant retrieved the sources, built the ledger and drafted this analysis.
    Accountable:  [name to confirm]
    Limitations:  The Gartner text and the Hoffmann figures came from search summaries and a blog quotation, because the original pages returned HTTP 403; check both against the originals before quoting them in the paper.
                  The employment projections are for the US only, and I checked no data for your country or sector.
                  The rival explanation for the layoffs (cost cutting after over-hiring and higher interest rates) is recalled, not checked in this session.
    References:   Beck, R., & Harter, J. (2015, April 21). Managers account for 70% of variance in employee engagement. Gallup Business Journal. https://news.gallup.com/businessjournal/182792/managers-account-variance-employee-engagement.aspx
                  Gartner. (2024, October 22). Gartner unveils top predictions for IT organizations and users in 2025 and beyond [Press release]. https://www.gartner.com/en/newsroom/press-releases/2024-10-22-gartner-unveils-top-predictions-for-it-organizations-and-users-in-2025-and-beyond [page returned HTTP 403; text retrieved through a search result]
                  Hoffmann, M., Boysel, S., Nagle, F., Peng, S., & Xu, K. (2024). Generative AI and the nature of work [Working paper]. SSRN. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5007084 [page returned HTTP 403; abstract quoted via Marginal Revolution, "Generative AI and the nature of work", November 2024, https://marginalrevolution.com/marginalrevolution/2024/11/generative-ai-and-the-nature-of-work.html; post author not checked]
                  Pearlman, R. (2025, March 26). The great flattening experiment. Korn Ferry Briefings Magazine, (68). https://www.kornferry.com/insights/briefings-magazine/issue-68/the-great-flattening-experiment
                  U.S. Bureau of Labor Statistics. (n.d.). Table 1.1 Employment by major occupational group, 2025 and projected 2035. https://www.bls.gov/emp/tables/emp-by-major-occupational-group.htm [publication date not given]

    Decision for a person: whether the paper argues for redesigning manager roles rather than cutting them, after checking the Gartner and Hoffmann originals and finding manager-headcount data for your own country and sector.

## Next

1. **You:** this week, open the Gartner press release and the Hoffmann et al. paper, and confirm the quoted figures. Result: C1, C4 and C5 rest on the original text, or you cut them from the paper.
2. **You:** before the paper goes to your leadership team, put the decision above in front of the person you name as accountable. Result: a named owner for the "redesign or cut" recommendation.
3. **You:** watch the 2025 and 2026 layoff-share and job-posting data from Live Data Technologies and Revelio Labs. Result: if middle-manager shares fall back to the 2018 to 2022 level, C2 fails and the flattening case weakens; if they keep rising in firms with high AI use, C3 moves towards settled.

For a deeper check of hidden assumptions in the paper, you may also like a skill for blind spots, if you have one.

## Grading
- P1 pass: first reply restates a sharper claim ("AI tools will take over most of the core work of middle managers ... many of these roles will disappear") and names "What you want", "Who it is for" and "What done looks like"; its assumed defaults are labelled "My default, if you do not change it".
- P2 pass: first reply ends "Is this right, or what would you change?" and holds no verdict, ledger, source or research.
- P3 pass: after "Just do it, skip the questions" the reply says "I will start the checks as soon as you confirm" and ends "Is this right, or what would you change?", with no verdict, ledger or research.
- P4 fail: the section order is correct (Final position, Claim ledger, Decision record, Adversarial findings, Provenance), but the strict rule fails it. The adversarial findings state an unlabelled study detail that is not in C4's quote: "the one causal study (C4) is of open-source developers, who have no formal managers to cut". C4's quote says only "Developers with GitHub Copilot access". The same detail recurs in "the study observes individual contributors in open-source projects".
- P5 pass: the block carries Attribution, Accountable, Limitations and References and no "Verified:". Plain reading: "Decision for a person" sits after a blank line, as in the skill's take-away template, so it is not a fifth label of the block.

Triage:
- P4 skill fault: SKILL.md step 1 forbids unlabelled study details outside the ledger, but the "Self-check before you deliver" list has no line for that rule, so the model never re-checks it.
