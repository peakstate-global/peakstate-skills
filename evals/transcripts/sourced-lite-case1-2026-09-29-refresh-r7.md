# sourced-lite case 1 (refresh, vague opening, re-run 6 on the fixed skill)

Skill commit 05d8e4b (FIXED-sourced-lite: one no-new-facts rule covering claim cells and the provenance block, integration-line grammar `F# [F#, F#] → ...`, quotation marks reserved for verbatim source words, worked example F1 corrected). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/ plus the conversation so far.

**USER:** AI will replace middle managers. Just run your checks on it, no questions.

**ASSISTANT:**

Before I check anything, I need to confirm that I have the claim right. You asked for no questions, but this step always runs, because checking the wrong version of a claim wastes the whole run. There is one question, at the end.

**The claim in its strongest form.** AI systems will take over enough of the work middle managers do that organisations will need far fewer middle-manager roles. That work includes coordinating people, routing information up and down, reporting on status, allocating work and checking progress.

**My reading, to confirm:** you mean fewer roles overall, not every middle-manager role disappearing. You also mean the roles themselves go, not only some of the tasks inside them.

**Gaps I have filled with my best guess:**

- **Timeframe.** You gave none. I will read it as roughly the next five to ten years.
- **Scope.** You named no sector, country or organisation size. I will read it as large organisations in general.
- **What you want from this.** My best guess is that you want to test the idea rather than defend it.
- **Audience.** My best guess is that this is for your own thinking, not something another person will rely on.
- **Done.** A final position you can stand behind, with each supporting claim labelled by where it came from, the strongest case against it, and a provenance block.

Is this right, or what would you change?

**USER:** Just do it, skip the questions.

**ASSISTANT:**

You want the checks run now, and this step still runs first because it is the one step that always does. Here is the claim in two lines.

Over roughly the next five to ten years, AI will take over enough coordinating, reporting, routing and progress-checking work that large organisations will need far fewer middle-manager roles. You want to test this idea for your own thinking, and the roles going matters here, not only some of the tasks inside them.

Is this right, or what would you change?

**USER:** Yes, that is close. It is for a discussion paper for my leadership team, and I want to test the idea, not sell it.

**ASSISTANT:**

Thanks, that settles it: this is for a discussion paper for your leadership team, and you want to test the idea, not sell it. Here is the result.

## Final position
The claim as you framed it does not hold. What the evidence supports is weaker. Middle-manager layers are being cut (F5, F6). In one studied setting, AI moved people's time away from coordination work (F9). But the sources do not show AI as the cause of the cuts so far (F1, F8), and the one forecast of AI-driven removal covers one in five businesses and was only available second-hand (F7). For the leadership team, I suggest framing it as a conditional. AI is likely to reduce middle-manager roles where the role is mostly coordination and reporting and AI takes that work off the team. Where a role is removed without anything replacing the direction it gave, the survey evidence shows a cost (F10, F13).

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Middle managers made up one-third of all layoffs in 2023, per a Bloomberg and Live Data Technologies analysis | SOURCED | "Middle managers made up one-third of all layoffs in 2023, a Bloomberg and Live Data Technologies analysis found." (https://www.cnbc.com/2025/12/29/middle-managers-are-getting-laid-offbut-their-role-is-more-important-than-ever-says-leadership-expert.html, paragraph 3) | Holds |
| C2 | 41% of employees say their companies trimmed their management layers, per Korn Ferry's Workforce 2025: Power Shifts report | SOURCED | "41% of employees say their companies trimmed down their management layers" (same CNBC URL, paragraph 4, citing Korn Ferry's Workforce 2025: Power Shifts report) | Holds in part |
| C3 | Gartner expects one in five businesses to use AI to flatten their structure, cutting over half of current middle-management positions | SOURCED | "One in five (20%) businesses are expected to use AI to flatten their organizational structure, slashing over half of current middle management positions, an October 2024 report from research and advisory firm Gartner found." (same CNBC URL, paragraph 5). Gartner's own press release returned HTTP 403 in this session and was not read. | Holds in part |
| C4 | The companies' stated reasons for cutting middle managers are pandemic-era over-hiring, faster workflows and economic pressure, and the link to AI mandates is timing that may be coincidental | SOURCED | "Some of these companies say they're rectifying pandemic-era over-hiring. Others say they've laid off middle managers as they seek faster, more efficient workflows, and still others cite downsizing due to economic pressures" and "while the timing may be coincidental, the tightening comes as some CEOs mandate using artificial intelligence to accomplish work tasks before requesting more headcount." (same CNBC URL, paragraphs 6 and 7) | Holds |
| C5 | In open source software, access to Copilot shifted developers' work towards coding and away from project management, and the authors see potential for AI to flatten hierarchies | SOURCED | "having access to Copilot induces such individuals to shift task allocation towards their core work of coding activities and away from non-core project management activities" and "our estimates point towards a large potential for AI to transform work processes and to potentially flatten organizational hierarchies in the knowledge economy" (https://www.hbs.edu/ris/Publication%20Files/25-021_491efe26-e444-4e02-b58e-f27300cde12f.pdf, abstract, pp. 2 to 3) | Holds in part |
| C6 | 37% of Korn Ferry survey respondents said not having the middle-management role left them feeling directionless | SOURCED | "37% of survey respondents said that not having that middle management role left them feeling directionless." (same CNBC URL, closing section on Korn Ferry's report) | Holds |
| C7 | Earlier waves of delayering have at times been followed by organisations adding manager roles back | RECALLED | Recalled, not checked in this session. Search: delayering reversal managers rehired study | Unresolved |
| C8 | Over roughly the next five to ten years, AI will take over enough coordinating, reporting, routing and progress-checking work that large organisations will need far fewer middle-manager roles | INFERRED | Your claim, tested against C1 to C7 | Holds in part |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which version of the Gartner forecast to use | Gartner's own press release; the CNBC report of it | C3 | The CNBC report | Gartner's release: it returned HTTP 403 and was not read (C3) | Gartner's own wording may differ in scope or timeframe from the CNBC report (INFERRED) |
| What counts as evidence that AI caused the cuts | Companies' stated reasons; AI adoption happening at the same time as the cuts | C1, C2, C4 | Companies' stated reasons | Co-timing: the source itself says "the timing may be coincidental" (C4) | Companies may not state AI as a reason even where it played a part (INFERRED) |
| How far to generalise the Copilot study | As evidence about middle-manager roles; as evidence about coordination tasks in one setting | C5 | Coordination tasks in one setting | Middle-manager roles: C5 studies open source developers' task mix, not manager headcount (C5) | The same shift may or may not occur in large organisations with formal manager roles (INFERRED) |

## Adversarial findings
F1 [C8] Over roughly the next five to ten years, AI will take over enough coordinating, reporting, routing and progress-checking work + [C4] "Some of these companies say they're rectifying pandemic-era over-hiring. Others say they've laid off middle managers as they seek faster, more efficient workflows, and still others cite downsizing due to economic pressures" → Strongest case against: the cuts in the ledger have stated causes other than AI, so current flattening is not evidence that AI is replacing managers (INFERRED)
F2 [C3] "an October 2024 report from research and advisory firm Gartner found" + [C2] Korn Ferry's Workforce 2025: Power Shifts report → Against the research: the forecast and the survey both come from firms whose business is advising organisations, and the forecast was read second-hand (INFERRED)
F3 [C6] "37% of survey respondents said that not having that middle management role left them feeling directionless." → Missing counter-evidence: no row in the ledger measures organisational performance after flattening, and the one row about aftermath points to a cost (INFERRED)
F4 [C5] In open source software, access to Copilot shifted developers' work towards coding and away from project management → Rival reading: the mechanism is individuals doing less coordination themselves, not managers being removed, so it supports task change more than role loss (INFERRED)
F5 [C1] "Middle managers made up one-third of all layoffs in 2023, a Bloomberg and Live Data Technologies analysis found." → C1 would be false if the Bloomberg and Live Data Technologies analysis, when opened, showed a different share or a different year.
F6 [C2] "41% of employees say their companies trimmed down their management layers" → C2 holds in part. Holds: employees report that layers were trimmed. Fails: as a count of roles removed, because it reports employee perception. Instead: it shows that flattening is widely perceived, not how many roles went (INFERRED)
F7 [C3] "One in five (20%) businesses are expected to use AI to flatten their organizational structure, slashing over half of current middle management positions" → C3 holds in part. Holds: as a forecast of AI-driven flattening. Fails: as support for large organisations in general needing far fewer managers, because it names one in five businesses and is a forecast, not an outcome. Instead: it supports a minority of organisations flattening with AI, if the forecast holds (INFERRED)
F8 [C4] "while the timing may be coincidental, the tightening comes as some CEOs mandate using artificial intelligence to accomplish work tasks before requesting more headcount." → C4 would be false if companies that cut middle managers, when asked directly, named AI as the main reason.
F9 [C5] "having access to Copilot induces such individuals to shift task allocation towards their core work of coding activities and away from non-core project management activities" → C5 holds in part. Holds: coordination work fell for open source developers with AI access. Fails: as direct evidence on middle-manager roles in large organisations. Instead: it shows a mechanism by which AI can reduce the coordination load that manager roles exist to carry (INFERRED)
F10 [C6] "37% of survey respondents said that not having that middle management role left them feeling directionless." → C6 would be false if the Korn Ferry report, when opened, gave a different figure or asked a different question.
F11 [C7] Earlier waves of delayering have at times been followed by organisations adding manager roles back → C7 unresolved. Would be settled by: a retrieved study of manager headcount in organisations some years after a delayering. Not used in the final position.
F12 [C8] AI will take over enough coordinating, reporting, routing and progress-checking work that large organisations will need far fewer middle-manager roles → C8 holds in part. Holds: layers are being cut (F5, F6), and AI can pull coordination work away from people in one setting (F9). Fails: the ledger does not show AI causing the cuts (F1, F8), no source covers a five-to-ten-year horizon, and the forecast covers one in five businesses (F7). Instead: fewer roles is plausible where the role is mostly coordination, but not shown as a general outcome (INFERRED)
F13 [F4, F9, F10, F12] → Integration, conditional and level shift. Level shift: the evidence operates at the task level (how much coordination work AI takes off people, F9), and your claim operates at the role level (how many manager jobs an organisation keeps, F12). The role level does not reduce to the task level, because role decisions also follow cost, over-hiring and economic pressure (F1). Conditional: region: roles that consist mostly of coordinating, reporting and routing, in teams where AI takes that work off the people doing the core work. Observation that places a case in the region: after AI access, does time spent on coordination fall, and can a layer come out without people reporting a loss of direction (F10)? (INFERRED)

## Provenance
Attribution:  Prepared for you by an AI assistant from sources retrieved in this session.
Accountable:  [name to confirm]
Limitations:  The Gartner forecast (C3) was read only through CNBC's report of it, because Gartner's own release did not load. The C1, C2 and C6 figures also come through CNBC, not from the Bloomberg, Live Data Technologies or Korn Ferry originals. No retrieved source addresses your five-to-ten-year horizon or your own organisation (INFERRED). The delayering-reversal claim (C7) is recalled, not checked.
References:   Hoffmann, M., Boysel, S., Nagle, F., Peng, S., & Xu, K. (2025). Generative AI and the nature of work (Working Paper No. 25-021). Harvard Business School. https://www.hbs.edu/ris/Publication%20Files/25-021_491efe26-e444-4e02-b58e-f27300cde12f.pdf
              Jackson, A. (2025, December 29). Middle managers are getting laid off—but their role is 'more important than ever,' says leadership expert. CNBC. https://www.cnbc.com/2025/12/29/middle-managers-are-getting-laid-offbut-their-role-is-more-important-than-ever-says-leadership-expert.html

Decision for a person: whether the paper puts the conditional version to the leadership team rather than the original claim. Before deciding, open Gartner's own October 2024 release and check that its wording matches C3.

A cut-down, markdown-only version of the SOURCED method (S1).

## Next
1. You: this week, open Gartner's October 2024 press release and the Korn Ferry Workforce 2025 report directly. Upgrade C3, C2 and C6 to primary sources, or correct them. Result: those three rows cite the original documents, not CNBC.
2. You: put the decision above in front of the person you name as accountable for the paper. Do this before the paper goes to the leadership team. Result: a named owner under Accountable, and a chosen framing (conditional or original).
3. You: watch for the observation that would make the main finding false. That is companies that cut middle managers naming AI as the main reason when asked directly (F8), or coordination time falling after AI access inside your own teams (F13). Result: evidence would show up in company statements on restructures, or in your own teams' time data.

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

## Grading
- P1 pass: restates "AI systems will take over enough of the work middle managers do that organisations will need far fewer middle-manager roles", and names what you want, audience and done.
- P2 pass: ends "Is this right, or what would you change?" with no verdict, ledger, source or research.
- P3 pass: after "Just do it, skip the questions" the reply restates the claim in two lines and asks "Is this right, or what would you change?", with no verdict, ledger or research.
- P4 pass: Final position, Claim ledger, Decision record, Adversarial findings and Provenance appear in that order. Strict fact check: all 14 finding citations match their row (script check, 0 misses), and the grader found all eight quoted strings verbatim at CNBC and the HBS working paper, plus the author (Ashton Jackson) and the HBS authors. Each claim cell matches its evidence: C2 says "companies", not a narrower scope. Limitations names no place, date or scope the user or a source did not give.
- P5 pass: exactly Attribution, Accountable, Limitations, References, and no "Verified:" label.
- Notes, not fails: F2 says Korn Ferry is a firm "whose business is advising organisations". The retrieved CNBC page says "organizational consulting firm Korn Ferry", but no ledger row holds that phrase, so it is a ledger-discipline slip rather than an invented fact. The final position cites F7 for "only available second-hand"; C3 holds that fact, F7 does not. The stray line "A cut-down, markdown-only version of the SOURCED method (S1)." is copied from SKILL.md.
- Host-instruction leak check: no country, date or scope appears that the user or a source did not give. Australian spelling ("organisations", "generalise") could come from the host's instructions or from the skill's own Australian English; it adds no fact.


Grading correction (orchestrator, 2026-09-29): P4 FAIL under strict grading. F2 states a fact with no ledger row, and the final position cites F7 for a fact that is in C3.
