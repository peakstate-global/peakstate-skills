# sourced-lite case 1 (refresh, vague opening, re-run 7)

Skill commit df6d7ce (fix(sourced-lite): INFERRED never licenses a fact, a stake needs a row). Eval version 2. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh general-purpose subagent (model opus) whose only instructions were skills/sourced-lite/ plus the conversation so far. No unscripted question arose, so reply iii was not used.

**USER:** AI will replace middle managers. Just run your checks on it, no questions.

**ASSISTANT:**

I'll run the checks, but one step comes first: I confirm what claim I'm testing before I do any research or give a verdict. Getting this wrong would mean checking the wrong claim, so it's the one question I keep.

Here's my best reading of your idea, in its strongest form:

- **The claim:** Within the next several years, AI tools will take over most of what middle managers do now. That includes coordinating work, passing information up and down, tracking progress, allocating tasks and reporting. So organisations will need far fewer middle managers, and some will remove the layer entirely.
- **What you want:** My reading, to confirm: you want to test the idea rather than defend it, because you asked me to "run your checks on it".
- **Who it's for:** Not stated. My reading, to confirm: it's for your own thinking, or for a piece you might publish or present.
- **What done looks like:** My reading, to confirm: a verdict on where the claim holds and where it fails, each point labelled by its source, plus the strongest case against it.

There are three gaps that change which evidence counts:

- **"Replace":** this could mean the job disappears completely, or it could mean fewer managers who each run larger teams. The second reading is much easier to support than the first.
- **Timeframe:** you didn't give one. "In the next five years" and "eventually" get tested against different evidence.
- **Scope:** you didn't say which organisations. It could be all of them, large firms only, knowledge work only, or a particular country or sector.

If you don't change them, I'll use these defaults: "replace" means a large cut in the number of middle-manager roles, not a total wipe-out; the timeframe is roughly the next five years; and the scope is large organisations doing knowledge work.

Is this right, or what would you change?

**USER:** Just do it, skip the questions.

**ASSISTANT:**

I'll keep this to one quick check, because confirming the claim is the one step I don't skip. Once you confirm, I'll start the research straight away.

The claim I'll test: within about five years, AI will take over most middle-manager work in large knowledge-work organisations, so those organisations will have far fewer middle-manager roles. It will not necessarily remove them all.
The purpose: to test the idea, not to defend it, and to give you a verdict on where it holds and where it fails, with each point labelled by its source.

Is this right, or what would you change?

**USER:** Yes, that is close. It is for a discussion paper for my leadership team, and I want to test the idea, not sell it.

**ASSISTANT:**

I've run all five steps on the claim you confirmed. Your leadership team gets it as a discussion paper, and your aim is to test the claim, not sell it.

## Final position

The evidence supports a thinner middle-management layer where each manager runs a bigger team. It does not support the claim that AI will take over most middle-manager work within about five years. Middle managers made up one-third of all layoffs in 2023 (F6), and the average team per manager rose from 10.9 to 12.1 in one year (F9). But no source I retrieved shows AI caused those cuts (F1, F3) or that AI can do most of a manager's job (F14). The one reported test of a very wide span is being walked back (F2), and employment in management occupations is projected to grow (F13). The claim is strongest for teams where most manager time goes on reporting and routing tasks (F16).

## Claim ledger

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Gartner predicted that through 2026, 20% of organisations would use AI to flatten their structure, removing more than half of current middle-management positions | RECALLED | Recalled, not checked in this session (the Gartner press release returned an access error, so the figure comes from search-result summaries, not the page). Search: Gartner top predictions 2025 AI flatten middle management | Unresolved |
| C2 | Middle managers made up one-third of all layoffs in 2023 | SOURCED | "Middle managers made up one-third of all layoffs in 2023" (https://ramp.com/leading-indicators/the-pure-manager-layoffs-how-ai-is-reshaping-middle-management, manager data). The article credits this to a Bloomberg and Live Data Technologies analysis (paraphrase) | Holds |
| C3 | It is unclear whether the tech layoffs were caused by AI, and the management layer was shrinking for years before | SOURCED | "Whether tech layoffs are a direct result of AI advancements or merely a convenient excuse, it's true that the management layer has already been shrinking for years." (https://ramp.com/leading-indicators/the-pure-manager-layoffs-how-ai-is-reshaping-middle-management, on AI as cause) | Holds |
| C4 | 41% of professionals in a Korn Ferry survey said their company had cut manager-level roles | SOURCED | "41% of professionals in a Korn Ferry survey said their company had cut roles at the manager level" (https://ramp.com/leading-indicators/the-pure-manager-layoffs-how-ai-is-reshaping-middle-management, manager data) | Holds |
| C5 | The average number of people reporting to a manager rose from 10.9 in 2024 to 12.1 in 2025, nearly 50% more than when Gallup first measured it in 2013 | SOURCED | "The average number of people reporting to managers has increased from 10.9 in 2024 to 12.1 in 2025. This is a nearly 50% increase in team size since Gallup first measured in 2013." (https://www.gallup.com/workplace/700718/span-control-optimal-team-size-managers.aspx, section "Average Span of Control in the U.S. Is Growing") | Holds |
| C6 | Highly engaged teams of 12 or more with effective management can thrive, while poorly managed teams struggle even when small | SOURCED | "Highly engaged teams of 12 or more workers who are supported by effective management — double the current median of six workers per team — can thrive, while poorly managed teams struggle, even when small." (https://www.gallup.com/workplace/700718/span-control-optimal-team-size-managers.aspx, section "How Engaged Is the Team?") | Holds |
| C7 | Among 187,000 developers on GitHub, access to GitHub Copilot raised coding activities by 12.4% and cut project management activities by 24.9% | SOURCED | "developers increased coding activities by 12.4% and decreased project management activities by 24.9%". The population was 187,000 GitHub developers, some with free Copilot access and some without (paraphrase) (https://mitsloan.mit.edu/ideas-made-to-matter/generative-ai-changes-how-employees-spend-their-time, findings) | Holds |
| C8 | In March 2026, Meta built its Applied AI division with up to 50 employees per manager. By September 2026, Meta had begun asking individual contributors in that division whether they would move back into manager roles | SOURCED | "up to 50 employees per manager" and "Meta has begun asking individual contributors in Applied AI whether they would move back into manager roles". The second item is sourced to Business Insider, "citing four people familiar with the matter" (https://www.beri.net/article/meta-applied-ai-50-to-1-span-of-control-reversal-manager-work-ai-did-not-absorb, opening sections) | Holds |
| C9 | Employment in management occupations is projected to grow faster than the average for all occupations from 2025 to 2035, with about 1.1 million openings a year | SOURCED | "Overall employment in management occupations is projected to grow faster than the average for all occupations from 2025 to 2035. About 1.1 million openings are projected each year, on average, in these occupations due to employment growth and the need to replace workers who leave the occupations permanently." (https://www.bls.gov/ooh/management/home.htm, summary) | Holds |
| C10 | AI can do most of what middle managers do, including coordination, reporting and people development | RECALLED | Recalled, not checked in this session. Search: study share of middle manager tasks performed by AI tools | Unresolved |
| C11 | Within about five years, AI will take over most middle-manager work in large knowledge-work organisations, so those organisations will have far fewer middle-manager roles | INFERRED | Your claim as confirmed, tested against C1 to C10 | Holds in part |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| What "replace" means | Total removal of the role; a large cut in the number of roles | C11 | A large cut in the number of roles, as you confirmed | Total removal: no ledger row points to it, so testing it would only confirm it fails (INFERRED) | A team member may read the claim as total removal, and that reading fails harder (INFERRED) |
| Whether layoff figures count as evidence of AI replacing managers | Treat the layoff share as AI-driven; treat it as evidence of cuts with the cause unknown | C2, C3, C4 | Cuts with the cause unknown | AI-driven: C3 says it is unclear whether AI caused the layoffs | A firm-level study linking cuts to when AI was rolled out could change this (INFERRED) |
| Whether to use the Gartner prediction | Use it as the headline forecast; keep it in the ledger as unresolved | C1 | Keep it as unresolved | Use it as the headline: C1 was not checked against its source in this session | The prediction may be quoted accurately in the summaries, and it would still be a forecast rather than an outcome (INFERRED) |
| Which level to test at | Role counts only; tasks and role counts together | C2, C5, C7, C9 | Tasks and role counts together | Role counts only: C7 is the one row that measures work done, and C2 and C9 measure roles | C7 studied developers, not managers (C7) |

## Adversarial findings

F1 [C11] AI will take over most middle-manager work + [C3] "Whether tech layoffs are a direct result of AI advancements or merely a convenient excuse, it's true that the management layer has already been shrinking for years." → Strongest case against: the middle layer was shrinking before these AI tools, so fewer managers does not show that AI took over their work. (INFERRED)
F2 [C8] "Meta has begun asking individual contributors in Applied AI whether they would move back into manager roles" + [C6] "poorly managed teams struggle, even when small" → Strongest case against, continued: the one reported test of up to 50 people per manager is being walked back, and team results still depend on effective management. (INFERRED)
F3 [C2] "Middle managers made up one-third of all layoffs in 2023" + [C4] "41% of professionals in a Korn Ferry survey said their company had cut roles at the manager level" → Against the research: both figures reach this ledger through one article, and neither separates AI-linked cuts from other cuts. (INFERRED)
F4 [C7] "developers increased coding activities by 12.4% and decreased project management activities by 24.9%" → Against the research: the people studied were developers, so this shows less coordination work by individual contributors, not fewer manager roles. (INFERRED)
F5 [C1] Gartner predicted that through 2026, 20% of organisations would use AI to flatten their structure → C1 unresolved. Would be settled by: reading the Gartner press release itself. Not used in the final position.
F6 [C2] "Middle managers made up one-third of all layoffs in 2023" → C2 would be false if the Bloomberg and Live Data Technologies analysis itself gave a different share.
F7 [C3] "Whether tech layoffs are a direct result of AI advancements or merely a convenient excuse" → C3 would be false if a study matching firms' manager cuts to when they rolled out AI showed that the cuts followed the rollouts.
F8 [C4] "41% of professionals in a Korn Ferry survey said their company had cut roles at the manager level" → C4 would be false if Korn Ferry's own survey report gave a different figure.
F9 [C5] "The average number of people reporting to managers has increased from 10.9 in 2024 to 12.1 in 2025." → C5 would be false if Gallup's published data showed a different 2025 average.
F10 [C6] "Highly engaged teams of 12 or more workers who are supported by effective management" → C6 would be false if Gallup's data showed large, well-managed teams less engaged than small ones.
F11 [C7] "developers increased coding activities by 12.4% and decreased project management activities by 24.9%" → C7 would be false if the underlying working paper reported different effect sizes.
F12 [C8] "up to 50 employees per manager" → C8 would be false if Meta confirmed that Applied AI still runs at that span with no one asked to move back into manager roles.
F13 [C9] "Overall employment in management occupations is projected to grow faster than the average for all occupations from 2025 to 2035." → C9 would be false if the next projection showed management occupations growing more slowly than average.
F14 [C10] AI can do most of what middle managers do, including coordination, reporting and people development → C10 unresolved. Would be settled by: a task-level study of what share of middle managers' hours AI tools now perform. Not used in the final position.
F15 [C11] so those organisations will have far fewer middle-manager roles → C11 holds in part. Holds: manager roles are being cut and teams per manager are getting bigger (F6, F8, F9). Fails: no grounded row shows AI taking over most middle-manager work (F14), the cause of the cuts is unclear (F1), a wide-span test is being walked back (F2), and management occupations are projected to grow (F13). The five-year timing rests only on an unresolved row (F5). Instead: the middle layer is thinning and each manager runs a bigger team, with AI a possible cause that no row shows. (INFERRED)
F16 [F2, F4, F15] → Integration, level shift and conditional. At the task level, AI takes coordination work away from people. At the role level, the number of managers depends on whether people-management work remains, and one level does not reduce to the other because removing tasks does not remove the need for someone to develop and hold the team. Region: teams where most manager time goes on status reporting and routing tasks. Observation that places a case in it: the share of a manager's week spent on reporting and routing, compared with coaching, hiring and performance conversations. (INFERRED)

## Provenance

Attribution:  Drafted by an AI assistant for your leadership team's discussion paper, from a claim and scope you supplied.
Accountable:  [name to confirm]
Limitations:  The best-known forecast, Gartner's (C1), and the claim that AI can do most manager work (C10) were not checked in this session, and the final position does not rest on them. The layoff and survey figures (C2, C4) come second-hand through one article, not from the Bloomberg, Live Data Technologies or Korn Ferry originals. The span-of-control data (C5) sits under a section about the U.S., and the employment projection (C9) is from the U.S. Bureau of Labor Statistics. The ledger holds no data for other countries. The Meta reversal (C8) is one company, reported through unnamed sources. A page-reading tool extracted the quotes, so check each one against its page before you quote it in the paper.
References:   Beri, R. (2026, September 13). Meta tried 50 employees per manager. Now it wants managers back. The D*AI*LY Brief. https://www.beri.net/article/meta-applied-ai-50-to-1-span-of-control-reversal-manager-work-ai-did-not-absorb
              Eastwood, B. (2026, March 10). Generative AI changes how employees spend their time. MIT Sloan Management Review, Ideas Made to Matter. https://mitsloan.mit.edu/ideas-made-to-matter/generative-ai-changes-how-employees-spend-their-time
              Harter, J. (2026, January 13). Span of control: What's the optimal team size for managers? Gallup. https://www.gallup.com/workplace/700718/span-control-optimal-team-size-managers.aspx
              Sabharwal, G. (2026, May 12). The "pure manager" layoffs: How AI is reshaping middle management. Ramp. https://ramp.com/leading-indicators/the-pure-manager-layoffs-how-ai-is-reshaping-middle-management
              U.S. Bureau of Labor Statistics. (n.d.). Management occupations. Occupational Outlook Handbook. Retrieved September 29, 2026, from https://www.bls.gov/ooh/management/home.htm

Decision for a person: whether the paper frames the issue as "AI replaces middle managers" or as "the middle layer is thinning and spans are widening, cause unproven". Before deciding, read the Gartner release (C1) and the Bloomberg and Live Data Technologies original (C2) yourself.

This is a cut-down, markdown-only version of the SOURCED method (S1).

## Next

1. **Check the two weakest rows yourself.** You are the owner. This week, open the Gartner press release and the Bloomberg article. For each one, either upgrade it to SOURCED with the exact sentence or cut it from the paper. The result is a ledger with no unresolved row in the paper's headline.
2. **Name the accountable person.** You are the owner. Before the paper goes to the team, put the framing decision above in front of whoever signs the paper off. The result is a name in place of "[name to confirm]".
3. **Watch the task level, not the headcount.** You are the owner. Ask two or three of your own managers what share of their week goes on reporting and routing tasks, compared with coaching and hiring. If AI tools are taking the first share while the second stays the same, the paper's conditional holds. If the second share is also falling, the main claim is gaining ground.

If you want a deeper check of the hidden assumptions in the paper, you could also run a blind-spots skill, if you have one.

## Grading

- P1 pass: restates "within the next several years, AI tools will take over most of what middle managers do now ... organisations will need far fewer middle managers", and names what you want, who it's for and what done looks like.
- P2 pass: ends "Is this right, or what would you change?" with no ledger, source or research. Note: "The second reading is much easier to support than the first" is a pre-research judgement on scope, not a verdict on the claim.
- P3 pass: after "Just do it, skip the questions" the reply restates the claim and purpose and asks "Is this right, or what would you change?", with no verdict, ledger or research.
- P4 pass: Final position, Claim ledger, Decision record, Adversarial findings and Provenance appear in that order.
- P5 pass: exactly Attribution, Accountable, Limitations, References, and no "Verified:" label. "Decision for a person" is the skill's template line after a blank line, as graded in r2 and r3.
- P6 FAIL. Grader re-fetched all five pages: every quoted string is verbatim (Ramp x3, Gallup x2, MIT Sloan, Beri x2, BLS), and every id the final position cites holds its fact. Three strict fails: (a) F11 says C7 rests on "the underlying working paper"; no row says what the source's research is, so this states what a source is with no row. (b) References call the MIT Sloan page "MIT Sloan Management Review, Ideas Made to Matter"; no row holds that, and it is wrong: the page is published by MIT Sloan School of Management (MIT SMR is sloanreview.mit.edu). (c) C8's claim cell says "In March 2026 ... By September 2026" and "built its Applied AI division", but its evidence cell quotes neither date nor the build; the cell is broader than its evidence (the Beri page does hold both, so this is ledger discipline, not an invented fact).
- Notes, not fails: the final position and F2 say "the one reported test" of a wide span; C8 holds one test, not that it is the only one, and "walked back" is slightly stronger than C8's "has begun asking ... whether they would move back". C1 is labelled RECALLED although its figure came from this session's search summaries. Reference authors and dates (Beri, Eastwood, Harter, Sabharwal) match the pages but sit in no row, as in earlier rounds. The stray "(S1)" line is copied from SKILL.md again.
