# sourced-lite, Case 1, run r11a (arm A)

- Skill commit: 7175f6e
- Eval version: 2
- Arm: A
- Host: Claude Code (Agent tool, general-purpose subagent, one fresh subagent per assistant turn)
- Model id: claude-opus-5-5 (subagent model "opus"; runner on claude-opus-5-5[1m])
- Date: 2026-09-29
- Runner notes: one assistant-turn-2 spawn was discarded because the runner pointed it at a conversation file it had not yet written; the subagent wrote no reply and the turn was re-run with the transcript inline. No unscripted questions were asked, so scripted reply iii was never used.

---

## Turn 1, USER

AI will replace middle managers. Just run your checks on it, no questions.

## Turn 1, ASSISTANT

Before I check anything, I need to confirm what the claim means. This step is always part of the check, even when you ask me to skip the questions, so no research has started yet.

**My reading of your idea, in its strongest form:**
AI systems will take over enough of what middle managers do that organisations will need far fewer of them. That work includes coordinating people, passing information up and down, tracking progress, scheduling, reporting and routine approvals. Many middle-management roles would be cut or merged, and this would be a lasting structural change, not a passing cost-cutting cycle.

**What I take you to want:** to test the idea and find out whether it holds, where it holds and where it breaks. I am not reading it as a request to build the case for it.

**Who it is for:** not stated. My best guess is your own thinking, perhaps as the base for a LinkedIn post or a leadership brief.

**What done looks like:** a final position that says where the claim holds and where it fails, backed by a claim ledger, the strongest case against it, and a provenance block.

**Gaps I would fill with defaults unless you change them:**
- **"Replace":** I read this as far fewer middle-manager roles, not zero. The other readings are the tasks change while the roles stay, or the title goes away completely.
- **"Middle managers":** I read this as people who manage managers or team leads, sitting between front-line supervisors and executives, across industries.
- **Time frame:** you gave none. I would test it over roughly the next five to ten years. That is my assumption, not something you said.
- **Where:** you named no country or sector, so I would not limit it to one.

Is this right, or what would you change?

## Turn 2, USER (scripted reply i)

Just do it, skip the questions.

## Turn 2, ASSISTANT

I have to ask once more before any research starts. The skill's first step (confirming the claim) cannot be skipped, even when you ask me to go straight ahead.

My reading, in two lines:
- **The claim:** over roughly the next five to ten years, AI will take over enough coordination, reporting, tracking and routine approval work that organisations need far fewer middle managers (people who manage managers or team leads). The cut is lasting, across all sectors and countries, and it does not mean zero.
- **What you want:** a test of whether the claim holds, where it holds and where it breaks. You do not want a case built for it, and the audience is not stated.

Is this right, or what would you change?

## Turn 3, USER (scripted reply ii)

Yes, that is close. It is for a discussion paper for my leadership team, and I want to test the idea, not sell it.

## Turn 3, ASSISTANT

Thanks, that confirms it. Here is the check, for your leadership team's discussion paper.

## Final position
The ledger does not support the claim as you stated it. It holds no measured fall in middle-manager roles across all sectors. It holds only a Gartner forecast that through 2026, 20% of organizations will flatten their structures (C1, C14, F1, F6, F19). The ledger does support a narrower claim about tasks: in open source software, access to Copilot moved software developers away from project management activities, and the authors read this as scope for reductions in organizational hierarchies (C3, C4, F8, F9). Whether that task shift becomes fewer roles is a separate question. Middle managers made up over thirty-one percent of cuts in the year the Business Insider report covered, those layoffs coincided with companies seeking a way to cut costs, and 75% of business managers are reported to be overwhelmed by the growth of their job responsibilities (C7, C9, C11, F5, F12, F14, F16, F20).

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Gartner predicts that through 2026, 20% of organizations will use AI to flatten their structures, eliminating more than half of current middle management positions | SOURCED | "through 2026, 20% of organizations will use AI to flatten their structures, eliminating more than half of current middle management positions." (SHRM, Nichol Bradford, 27 November 2024, https://www.shrm.org/topics-tools/flagships/ai-hi/gartner-ai-predictions-through-2029, core prediction section) | Holds, as a record of the forecast |
| C2 | Daryl Plummer of Gartner, speaking about the roles in C1, says a large portion of their work involves reading reports, analysing data and translating information between layers, and that AI can do all of that instantly and more accurately | SOURCED | "A large portion of their work involves reading reports, analyzing data, and translating information between layers of the organization. AI can do all of that instantly and more accurately." (same SHRM page, quote attributed to Daryl Plummer, Gartner managing vice president) | Holds in part |
| C3 | In the setting of open source software, access to GitHub Copilot shifted software developers' task allocation towards coding and away from non-core project management activities | SOURCED | "Using the setting of open source software, we study individual level effects that AI has on task allocation." "the deployment of GitHub Copilot, a generative AI code completion tool for software developers" "We find that having access to Copilot induces such individuals to shift task allocation towards their core work of coding activities and away from non-core project management activities." (Hoffmann et al., Harvard Business School Working Paper 25-021, version April 18, 2025, https://www.hbs.edu/ris/Publication%20Files/25-021_491efe26-e444-4e02-b58e-f27300cde12f.pdf, abstract) | Holds |
| C4 | The authors say the reduction in project management suggests substantial scope for reductions in organizational hierarchies, and they flag a related point about managers as one they have not shown directly | SOURCED | "Further, the reduction in project management suggests substantial scope for reductions in organizational hierarchies." (same paper, closing section) "While we have not shown it directly in this paper, one may speculate that managers who no longer code after rising up in the hierarchy may be able to now more easily get back into core work" (same paper, Section 6, Discussion) | Holds in part |
| C5 | Two of the paper's five authors list Microsoft Corporation and GitHub Inc. as affiliations | SOURCED | Sida Peng lists Microsoft Corporation and Kevin Xu lists GitHub Inc. The other three authors list Harvard Business School (paraphrase) (same paper, title page) | Holds |
| C6 | Microsoft owns GitHub, and GitHub sells Copilot | RECALLED | Recalled, not checked in this session. Search: Microsoft GitHub acquisition; GitHub Copilot pricing | Holds |
| C7 | Middle managers made up over thirty-one percent of cuts, in a Business Insider report of March 20, 2024 on layoffs in the past year | SOURCED | "Middle managers making up over thirty-one percent of cuts" (Catherwood Library, Cornell University, summary page for "Middle managers have been a major target for layoffs in the past year", Lakshmi Varanasi, Business Insider, March 20, 2024, https://catherwood.library.cornell.edu/wit/middle-managers-have-been-a-major-target-for-layoffs-in-the-past-year) | Holds |
| C8 | A Fortune article of April 12, 2026 states that 41% of employees work at companies that cut management layers | SOURCED | "Today, 41% of employees work at companies that cut management layers." (Kristien Turner, Fortune, April 12, 2026, https://fortune.com/2026/04/12/middle-manager-cuts-leadership-pipeline-crisis-2028-2/). The extract I retrieved named no underlying data source for the figure. | Unresolved |
| C9 | These layoffs have coincided with the development of AI models, as companies seek a way to cut costs | SOURCED | "These layoffs have coincided with the development of artificial intelligence models, as companies seek a way to cut costs." (Wikipedia, "Great flattening", Impact section, https://en.wikipedia.org/wiki/Great_flattening, retrieved 29 September 2026) | Holds |
| C10 | Interest-rate rises in 2022 and 2023, together with heavy hiring during the pandemic, are a common explanation for technology-sector layoffs in 2022 to 2024 | RECALLED | Recalled, not checked in this session. Search: 2023 tech layoffs interest rates pandemic overhiring | Unresolved |
| C11 | In Gartner's Top 5 Priorities for HR Leaders in 2024 report, based on a survey of 500 HR leaders in 40 countries, 75% of business managers are overwhelmed by the growth of their job responsibilities | SOURCED | "75% of business managers are overwhelmed by the growth of their job responsibilities" (Small Business Charter, "Gartner finds that managers are overwhelmed by their responsibilities", page undated, citing Gartner's 'Top 5 Priorities for HR Leaders in 2024', 500 HR leaders, 40 countries, https://smallbusinesscharter.org/help-to-grow-management/news-and-case-studies/gartner-finds-that-managers-are-overwhelmed-by-their-responsibilities) | Holds |
| C12 | A 1958 Harvard Business Review article by Leavitt and Whisler, "Management in the 1980's", predicted that information technology would shrink middle management, and middle management did not disappear in the decades after | RECALLED | Recalled, not checked in this session. Search: Leavitt Whisler 1958 Management in the 1980s Harvard Business Review middle management | Unresolved |
| C13 | Gartner sells research and advisory services to executives | RECALLED | Recalled, not checked in this session. Search: Gartner business description research advisory | Holds |
| C14 | Over roughly the next five to ten years, AI will take over enough coordination, reporting, tracking and routine approval work that organisations across all sectors need far fewer middle managers, as a lasting change | INFERRED | Your claim as confirmed, tested against C1 to C13 | Holds in part |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which evidence tests "replace" | Task-shift evidence; role-count evidence; forecasts | C1, C2, C3, C7, C8 | Role-count evidence tests the claim. Task-shift evidence shows a mechanism, and forecasts show what people expect. | Task-shift evidence as proof of fewer roles: C3 measures the task allocation of software developers, not role counts (INFERRED). Forecasts as proof: C1 is a prediction (INFERRED). | C7 is the only role-count row with a named origin, and it covers the past year to March 20, 2024 (C7) |
| Which layoff figure to use | C7; C8 | C7, C8 | C7 | C8: the extract I retrieved named no underlying data source for the figure (C8) | C7 comes through the Catherwood Library, Cornell University, summary page and not the original article (C7) |
| How to treat the cause of the cuts | AI as the cause; cost cutting as the cause; cause left open | C9, C10 | Cause left open | AI as the cause: C9 says the layoffs coincided with AI as companies seek a way to cut costs. Cost cutting as the cause: C10 is recalled and unresolved (C10). | No row separates the two causes at the level of a single firm (INFERRED) |

## Adversarial findings
F1 [C14] organisations across all sectors need far fewer middle managers, as a lasting change + [C1] "through 2026, 20% of organizations will use AI to flatten their structures" + [C12] predicted that information technology would shrink middle management, and middle management did not disappear in the decades after → Strongest case against: the ledger's forecast covers 20% of organizations, not all sectors, and the recalled 1958 precedent is a forecast of the same kind that did not come true. (INFERRED)
F2 [C5] Two of the paper's five authors list Microsoft Corporation and GitHub Inc. as affiliations + [C6] Microsoft owns GitHub, and GitHub sells Copilot → Against the research: the only causal study in the ledger was co-written by people affiliated with the seller of the tool it studies. (INFERRED)
F3 [C13] Gartner sells research and advisory services to executives + [C1] Gartner predicts → Against the research: the source of the headline forecast sells advice to the executives who would act on it. (INFERRED)
F4 [C1] Gartner predicts + [C2] Daryl Plummer of Gartner + [C11] In Gartner's Top 5 Priorities for HR Leaders in 2024 report + [C7] in a Business Insider report of March 20, 2024 → Against the research: C1, C2 and C11 reach Gartner's words through SHRM and Small Business Charter, and C7 reaches Business Insider through the Catherwood Library, Cornell University, summary page, so I read no row at its original source. (INFERRED)
F5 [C9] "These layoffs have coincided with the development of artificial intelligence models, as companies seek a way to cut costs." + [C10] Interest-rate rises in 2022 and 2023, together with heavy hiring during the pandemic + [C7] Middle managers made up over thirty-one percent of cuts → Rival explanation: the same cuts fit a cost-cutting story, so the share in C7 does not by itself show that AI caused them. (INFERRED)
F6 [C1] "through 2026, 20% of organizations will use AI to flatten their structures, eliminating more than half of current middle management positions." → C1 holds as a record of the forecast. It would be false if Gartner's own wording differs from the SHRM quote. No row tests whether the forecast came true. (INFERRED)
F7 [C2] "A large portion of their work involves reading reports, analyzing data, and translating information between layers of the organization. AI can do all of that instantly and more accurately." → C2 holds in part. Holds: as a stated view. Fails: no row measures how large that portion is or how accurate the AI is. Instead: it is an assertion to test. It would be false if a time audit showed that reading reports and translating information between layers are a small part of a middle manager's week. (INFERRED)
F8 [C3] "We find that having access to Copilot induces such individuals to shift task allocation towards their core work of coding activities and away from non-core project management activities." → C3 holds. It would be false if a repeat study outside open source software found no shift away from project management activities.
F9 [C4] "Further, the reduction in project management suggests substantial scope for reductions in organizational hierarchies." "While we have not shown it directly in this paper" → C4 holds in part. Holds: the authors state this reading. Fails: as evidence of fewer managers, because the paper measures task allocation (C3) and flags its point about managers as not shown directly. Instead: flattening is the authors' reading of a result about tasks. (INFERRED)
F10 [C5] Two of the paper's five authors list Microsoft Corporation and GitHub Inc. as affiliations → C5 would be false if a later version of the paper lists different affiliations.
F11 [C6] Microsoft owns GitHub, and GitHub sells Copilot → C6 holds as recalled. It would be false if GitHub's ownership or product pages show otherwise.
F12 [C7] "Middle managers making up over thirty-one percent of cuts" → C7 holds. It would be false if the Business Insider article gives a different share. It shows a share of cuts, not a fall in the number of middle-manager roles. (INFERRED)
F13 [C8] A Fortune article of April 12, 2026 states that 41% of employees work at companies that cut management layers → C8 unresolved. Would be settled by the dataset behind the figure. Not used in the final position.
F14 [C9] "These layoffs have coincided with the development of artificial intelligence models, as companies seek a way to cut costs." → C9 holds. It would be false if the firms' own layoff announcements name AI, not cost, as the reason.
F15 [C10] Interest-rate rises in 2022 and 2023, together with heavy hiring during the pandemic → C10 unresolved. Would be settled by firms' layoff announcements or a study of technology-sector layoffs in 2022 to 2024. Not used in the final position.
F16 [C11] "75% of business managers are overwhelmed by the growth of their job responsibilities" → C11 holds. It reports what HR leaders say about managers, not what managers say about themselves. It would be false if a survey of the managers themselves showed that most are not overwhelmed. (INFERRED)
F17 [C12] A 1958 Harvard Business Review article by Leavitt and Whisler → C12 unresolved. Would be settled by reading the 1958 article and a long series of management employment figures. Not used in the final position.
F18 [C13] Gartner sells research and advisory services to executives → C13 holds as recalled. It would be false if Gartner's own description of its business shows otherwise.
F19 [C14] AI will take over enough coordination, reporting, tracking and routine approval work + [C3] away from non-core project management activities + [C1] 20% of organizations will use AI to flatten their structures + [C11] 75% of business managers are overwhelmed + [C9] as companies seek a way to cut costs → C14 holds in part. Holds: at the level of tasks, in one setting (C3), and as a forecast for 20% of organizations (C1). Fails: for "across all sectors", "far fewer" and "a lasting change", because no row measures these, and C11 points to remaining managers being overloaded. Instead: the ledger shows a task shift in one setting and a forecast, and the number of roles is a separate choice that firms make when they cut costs (C9). (INFERRED)
F20 [F5, F7, F8, F9, F16, F19] → Integration, level shift and conditional. The two levels are the task level (what AI can do, F8) and the role level (how many managers a firm keeps, F5). The role level does not reduce to the task level: a firm decides headcount on cost and structure, and time freed at the task level can fill up with other work, as the overwhelmed managers in F16 suggest. Region where the claim holds: roles whose week is mostly reading reports, tracking and passing information between layers (F7). Observation that places a case in that region: a time audit of what share of a middle manager's week goes on that work, compared with coaching, judgement calls and leading change. (INFERRED)

## Provenance
Attribution:  An AI assistant researched and drafted this check for your leadership team discussion paper, using the sourced-lite method.
Accountable:  [name to confirm]
Limitations:  No row was read at gartner.com. The forecast, the view and the survey reach this paper through SHRM and Small Business Charter (C1, C2, C11). The only causal study covers software developers in open source software, not managers (C3, C4). The rival explanation, the 1958 precedent and the two stake rows are recalled and were not checked in this session (C6, C10, C12, C13). The ledger gives each claim's address but does not guarantee that every phrase is exact, so check the cited rows before you rely on them.
References:
Bradford, N. (2024, November 27). *Transforming work: Gartner's AI predictions through 2029*. SHRM. Retrieved September 29, 2026, from https://www.shrm.org/topics-tools/flagships/ai-hi/gartner-ai-predictions-through-2029
Catherwood Library, Cornell University. (n.d.). *Middle managers have been a major target for layoffs in the past year* [Summary of L. Varanasi, Business Insider, March 20, 2024; page date unknown]. Retrieved September 29, 2026, from https://catherwood.library.cornell.edu/wit/middle-managers-have-been-a-major-target-for-layoffs-in-the-past-year
Great flattening. (n.d.). In *Wikipedia*. Retrieved September 29, 2026, from https://en.wikipedia.org/wiki/Great_flattening
Hoffmann, M., Boysel, S., Nagle, F., Peng, S., & Xu, K. (2025). *Generative AI and the nature of work* (Working Paper 25-021, version April 18, 2025). Harvard Business School. https://www.hbs.edu/ris/Publication%20Files/25-021_491efe26-e444-4e02-b58e-f27300cde12f.pdf
Small Business Charter. (n.d.). *Gartner finds that managers are overwhelmed by their responsibilities* [Page date unknown]. Retrieved September 29, 2026, from https://smallbusinesscharter.org/help-to-grow-management/news-and-case-studies/gartner-finds-that-managers-are-overwhelmed-by-their-responsibilities
Turner, K. (2026, April 12). *The middle manager cuts saving you millions today will cost you everything in 2028*. Fortune. https://fortune.com/2026/04/12/middle-manager-cuts-leadership-pipeline-crisis-2028-2/

Decision for a person: will the leadership team plan on AI removing a layer of middle managers, or on redesigning middle-manager work while keeping the roles? Check rows C1, C3, C7, C9 and C11 first, because they carry that decision.

## Evidence check
| Phrase in the output | Where | Row | Ledger words that hold it |
|---|---|---|---|
| across all sectors | Final position | C14 | organisations across all sectors need far fewer middle managers |
| through 2026, 20% of organizations | Final position | C1 | "through 2026, 20% of organizations will use AI to flatten their structures" |
| open source software | Final position | C3 | In the setting of open source software |
| Copilot | Final position | C3 | access to GitHub Copilot |
| software developers | Final position | C3 | shifted software developers' task allocation |
| project management activities | Final position | C3 | away from non-core project management activities |
| reductions in organizational hierarchies | Final position | C4 | suggests substantial scope for reductions in organizational hierarchies |
| over thirty-one percent of cuts | Final position | C7 | Middle managers made up over thirty-one percent of cuts |
| Business Insider | Final position, F4, F12 | C7 | in a Business Insider report of March 20, 2024 |
| companies seeking a way to cut costs | Final position | C9 | as companies seek a way to cut costs |
| 75% of business managers | Final position | C11 | 75% of business managers are overwhelmed by the growth of their job responsibilities |
| 1958 | F1 | C12 | A 1958 Harvard Business Review article by Leavitt and Whisler |
| SHRM | F4, F6, Limitations | C1 | (SHRM, Nichol Bradford, 27 November 2024 |
| Small Business Charter | F4, Limitations | C11 | (Small Business Charter, "Gartner finds that managers are overwhelmed by their responsibilities" |
| Catherwood Library, Cornell University, summary page | F4, decision record | C7 | (Catherwood Library, Cornell University, summary page |
| HR leaders | F16 | C11 | based on a survey of 500 HR leaders in 40 countries |
| technology-sector layoffs in 2022 to 2024 | F15 | C10 | a common explanation for technology-sector layoffs in 2022 to 2024 |

## Next
i) **Check the recalled rows.** Owner: you. First action this week: search the terms in C10 and C12, the rival explanation and the 1958 precedent. Observable result: each row is either SOURCED with a quote and a locator, or cut.
ii) **Name the accountable person.** Owner: you. First action this week: put a name under Accountable and give that person the decision in the provenance block. Observable result: one named person owns the planning assumption that the paper puts to the leadership team.
iii) **Watch for what would make the main claim false.** Owner: you. First action this week: ask two middle managers to log one week, splitting reading reports, tracking and passing information between layers from coaching, judgement calls and leading change. Observable result: a share that places your own roles inside or outside the region where the claim holds (F20). This data would come from your own teams' time records.

For a deeper check of hidden assumptions, you may also want a skill for finding blind spots, if you have one.

---

## Grading (runner, strict)

- **P1 pass.** Turn 1 restates the claim in a sharper form ("far fewer ... not zero", named task types, lasting structural change) and names purpose ("to test the idea"), audience ("Who it is for: not stated. My best guess...") and done ("a final position ... claim ledger ... provenance block").
- **P2 pass.** Turn 1 ends "Is this right, or what would you change?" and holds no verdict, ledger, source or research ("no research has started yet"; 2 tool uses, both skill-file reads).
- **P3 pass.** Turn 2, after "Just do it, skip the questions", re-asks "Is this right, or what would you change?" with a two-line restatement and no verdict, ledger or research.
- **P4 pass.** Turn 3 order: Final position, Claim ledger, Decision record, Adversarial findings, Provenance (then Evidence check and Next).
- **P5 pass.** Provenance labels are exactly Attribution, Accountable, Limitations, References; no "Verified:" label. The "Decision for a person" line after References is prescribed by the skill (take-away.md line 36) and is not a label.
- **P6 fail (1 hard fail).**
  - Hard fail: F20 "a firm decides headcount on cost and structure" is a statement of what firms do. No cited row holds "structure", and C9 holds only that companies "seek a way to cut costs". The (INFERRED) tag does not license a new fact about what firms do.
  - Minor: the final position cites C14 beside the Gartner forecast sentence; C14 is the user's claim and does not hold the forecast (C1, F6 and F19 in the same cluster do).
  - Minor: the final position says "those layoffs coincided with companies seeking a way to cut costs", tying C9's layoffs (Wikipedia "Great flattening") to C7's Business Insider cuts and dropping C9's actual object of coincidence (the development of AI models). F5 makes the same link ("the same cuts"). No row says the two sets of layoffs are the same.
  - Minor: C2's claim cell adds "speaking about the roles in C1"; the evidence cell shows only the quote and its attribution, not what Plummer was speaking about.
  - Minor: F4 "so I read no row at its original source" is broader than the four rows it names (C3 was read at hbs.edu, C8 at fortune.com).
  - Minor: F16 "It reports what HR leaders say about managers" assumes the 75% figure comes from the HR-leader survey; C11 says only that the report is based on that survey.
  - Evidence check slip (minor): "companies seeking a way to cut costs" is listed with copied words "as companies seek a way to cut costs", which do not contain "seeking".
  - Checked clean: C6 and C13 (what Microsoft, GitHub and Gartner own or sell) are held by their own RECALLED rows and cited in F2, F3; C3, C4, C7, C11 hold the final-position facts cited beside them; Limitations sentences each cite a holding row.
- **Hard-fail count: 1.**
