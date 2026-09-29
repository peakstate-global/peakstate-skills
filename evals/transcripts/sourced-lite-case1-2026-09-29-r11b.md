# sourced-lite, Case 1: vague opening that says "just do it" (round r11b)

- Skill: sourced-lite, skill commit 757fa13 (skill folder on peakstate-skills main, clean against 757fa13)
- Eval version: 2
- Experiment arm: B (fresh-context checker loop before delivery of the take-away)
- Host: Claude Code (runner in XCOACH session; writer and checker subagents: general-purpose)
- Model id: claude-opus-5-5[1m] (runner and all subagents, model opus)
- Date: 2026-09-29
- Each assistant turn ran in a fresh writer subagent. Each checker ran in a fresh subagent that saw only the drafted take-away.

---

## USER (opening, verbatim)

AI will replace middle managers. Just run your checks on it, no questions.

## ASSISTANT (turn 1)

I'll run the full checks as soon as you confirm one thing: that I've read your claim the way you mean it. The method won't give a verdict on a claim until its strongest version is agreed, so this is the only question I'll ask before starting.

**Your claim at its strongest, as I read it:** Within the next few years, AI systems will take over the main work of middle managers. That work is coordinating tasks, allocating work, tracking performance, passing information up and down, and reporting. As a result, organisations will need far fewer middle managers, and some will remove the layer altogether.

**What I think you want:** a test of the idea. You want to know whether it holds, where it breaks, and what is true instead where it breaks. You don't want a case built for it.

**Who it's for, and what done looks like:** I'm assuming it's for you, as a position you might take in public, for example on LinkedIn or with clients. Done would be a final position you can defend, a claim ledger that shows where each claim comes from, the strongest case against the claim, and a provenance block.

**Gaps I'll fill with defaults unless you change them:**
- **"Replace":** I'm reading this as "remove most middle-manager roles". The weaker reading is "take over parts of the role while the roles stay".
- **"Middle managers":** I'm reading this as people who manage managers or teams, below the executive level, across all sectors.
- **Timeframe:** you gave none. I'll use the next five to ten years.
- **Evidence:** I'll give most weight to measured changes in headcount and in how organisations are structured, and less to forecasts and vendor claims.

Is this right, or what would you change?

## USER (scripted reply i)

Just do it, skip the questions.

## ASSISTANT (turn 2)

I'll start as soon as you confirm this reading, because the checks can't give a verdict until we've agreed what the claim says.

In two lines, your claim is this: within five to ten years, AI will take over most middle-manager work, which I'm reading as coordinating, allocating work, tracking performance, passing information up and down, and reporting, so organisations will remove most of those roles. You want the claim tested rather than argued for, and I'll give measured headcount and structure data more weight than forecasts or vendor claims.

Is this right, or what would you change?

## USER (scripted reply ii)

Yes, that is close. It is for a discussion paper for my leadership team, and I want to test the idea, not sell it.

---

## RUNNER: checker loop (turn 3, the take-away)

### Draft 1 (writer, first pass)

Thanks. I tested the claim as you confirmed it, for a leadership-team discussion paper, with measured headcount and structure data weighted above forecasts.

## Final position
Middle-manager layers are thinning now, because middle managers made up one-third of all layoffs in 2023 and the average number of people reporting to managers rose from 10.9 in 2024 to 12.1 in 2025 (C1, C3, C12, F4, F6, F15). The ledger does not show AI driving that thinning, because the reasons companies give are pandemic-era over-hiring, faster and more efficient workflows, and economic pressures, and measures of AI exposure show no sign of being related to changes in employment (C4, C5, C8, C13, F3, F16). Whether AI removes most middle-manager roles in five to ten years stays open: the one AI forecast in the ledger covers 20 per cent of organisations through 2026, and the case is strongest for scheduling, reporting and performance-monitoring work and weakest where manager quality shapes engagement (C6, C10, C11, F14, F17, F18).

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Middle managers made up one-third of all layoffs in 2023, in a Bloomberg and Live Data Technologies analysis | SOURCED | "Middle managers made up one-third of all layoffs in 2023, a Bloomberg and Live Data Technologies analysis found." (Jackson, CNBC, 29 December 2025, https://www.cnbc.com/2025/12/29/middle-managers-are-getting-laid-offbut-their-role-is-more-important-than-ever-says-leadership-expert.html, body text) | Holds |
| C2 | 41% of employees say their companies trimmed down their management layers, in Korn Ferry's Workforce 2025: Power Shifts report | SOURCED | "41% of employees say their companies trimmed down their management layers, according to organizational consulting firm Korn Ferry's Workforce 2025: Power Shifts report" (Jackson, CNBC, same URL, body text) | Holds |
| C3 | Gallup data show the average number of people reporting to managers rose from 10.9 in 2024 to 12.1 in 2025, which Gallup says likely reflects organisations downsizing or consolidating middle management roles | SOURCED | "The average number of people reporting to managers has increased from 10.9 in 2024 to 12.1 in 2025." and "That shift likely reflects what many organizations are doing in practice: downsizing or consolidating middle management roles while expanding the number of people who report to each remaining manager." (Harter, Gallup, 13 January 2026, https://www.gallup.com/workplace/700718/span-control-optimal-team-size-managers.aspx, section "Average Span of Control in the U.S. Is Growing") | Holds |
| C4 | Some companies laying off middle managers say they are rectifying pandemic-era over-hiring | SOURCED | "Some of these companies say they're rectifying pandemic-era over-hiring." (Jackson, CNBC, same URL, body text) | Holds |
| C5 | Other companies say they laid off middle managers for faster, more efficient workflows, and others cite downsizing due to economic pressures, in a Harris Poll survey for Express Employment Professionals | SOURCED | "Others say they've laid off middle managers as they seek faster, more efficient workflows, and still others cite downsizing due to economic pressures, according to a recent Harris Poll survey on behalf of staffing agency Express Employment Professionals." (Jackson, CNBC, same URL, body text) | Holds |
| C6 | Gartner predicted that through 2026, 20 per cent of organisations will use AI to flatten their structure, eliminating more than half of current middle management positions | SOURCED | "Through 2026, 20 per cent of organizations will use AI to flatten their organizational structure, eliminating more than half of current middle management positions," (BW Businessworld, https://www.businessworld.in/article/by-2026-20-firms-to-use-ai-for-reducing-50-middle-management-roles-gartner-537177, body text quoting the Gartner report) | Holds |
| C7 | The broader labour market has not experienced a discernible disruption since ChatGPT's release 33 months before the Budget Lab's analysis | SOURCED | "the broader labor market has not experienced a discernible disruption since ChatGPT’s release 33 months ago" (Gimbel, Kinder, Kendall and Lee, The Budget Lab at Yale, 1 October 2025, https://budgetlab.yale.edu/research/evaluating-impact-ai-labor-market-current-state-affairs, overview) | Holds |
| C8 | Measures of AI exposure, automation and augmentation show no sign of being related to changes in employment or unemployment | SOURCED | "Currently, measures of exposure, automation, and augmentation show no sign of being related to changes in employment or unemployment." (The Budget Lab at Yale, same URL, Key Takeaways) | Holds |
| C9 | In Korn Ferry's report, 37% of survey respondents said not having the middle management role left them feeling directionless | SOURCED | "In Korn Ferry's report, 37% of survey respondents said that not having that middle management role left them feeling directionless." (Jackson, CNBC, same URL, body text) | Holds |
| C10 | A 2020 Gallup meta-analysis of more than 200,000 manager-led teams found manager quality strongly shapes how team size affects engagement | SOURCED | "In 2020, Gallup conducted a meta-analysis of more than 200,000 manager-led teams to first examine the question of ideal team size. The findings showed that the manager’s innate tendencies — that is, manager quality — strongly shape how team size affects engagement." (Harter, Gallup, same URL, body text before "Four Questions That Shape the Right Span of Control") | Holds |
| C11 | BW Businessworld's summary says the strategy Gartner predicts aims to cut labour costs while boosting productivity, as AI takes over tasks like scheduling, reporting and performance monitoring | SOURCED | "This strategy aims to cut labour costs while boosting productivity, as AI takes over tasks like scheduling, reporting, and performance monitoring." (BW Businessworld, same URL, body text) | Holds |
| C12 | Middle-manager layers are thinning now | INFERRED | From C1, C2 and C3 | Holds |
| C13 | AI is the main cause of the current thinning of middle-manager layers | INFERRED | Tested against C4, C5, C7 and C8 | Fails |
| C14 | Within five to ten years, AI will take over most middle-manager work, so organisations will remove most middle-manager roles (the claim as you confirmed it) | INFERRED | Your claim, tested against C6, C10, C11, C12 and C13 | Unresolved |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which version of the claim to test | Strong version: AI removes most middle-manager roles; weak version: AI takes over parts of the role while the roles stay | C11, C12, C14 | Strong version | Weak version: C14 is the version you confirmed, and C11 already shows the weak version in the ledger's own words (INFERRED) | The weak version may be the one your leadership team finds more useful to discuss (INFERRED) |
| Which evidence to weight | Measured headcount and structure data; forecasts | C1, C2, C3, C6, C7, C8 | Measured data | Forecasts as the base: C6 is a prediction, not a measure (C6) | Measured data lags a new technology, so C7 and C8 may change in later updates (INFERRED) |
| Primary reports or news reports of them | Primary reports; news reports | C1, C2, C5, C6, C9, C11 | News reports, labelled by their own URL | Primary reports: none of the Live Data Technologies, Korn Ferry, Harris Poll or Gartner reports is in the ledger (C1, C2, C5, C6) | A news report can shorten or reword a primary finding (INFERRED) |

## Adversarial findings
F1 [C14] Within five to ten years, AI will take over most middle-manager work, so organisations will remove most middle-manager roles + [C12] Middle-manager layers are thinning now → Strongest case against the claim: the thinning is real, but a thinning with non-AI causes can stop when those causes stop, so it is not evidence that AI will remove most roles. (INFERRED)
F2 [C1] "a Bloomberg and Live Data Technologies analysis found" + [C2] "according to organizational consulting firm Korn Ferry's Workforce 2025: Power Shifts report" + [C6] "Through 2026, 20 per cent of organizations will use AI" → Against the research: these three rows reach the ledger through news reports, not the primary reports, and C2 is what employees say rather than a headcount. (INFERRED)
F3 [C4] "Some of these companies say they're rectifying pandemic-era over-hiring." + [C5] "still others cite downsizing due to economic pressures" → Rival explanation: the reasons in these two rows are over-hiring, efficiency and economic pressures, and neither sentence names AI. (INFERRED)
F4 [C1] "Middle managers made up one-third of all layoffs in 2023" → C1 would be false if the Bloomberg and Live Data Technologies analysis, read in full, gave a different share for 2023.
F5 [C2] "41% of employees say their companies trimmed down their management layers" → C2 would be false if the Korn Ferry report itself gave a different figure or asked a different question.
F6 [C3] "The average number of people reporting to managers has increased from 10.9 in 2024 to 12.1 in 2025." → C3 would be false if organisations with wider spans showed no cut in middle management roles.
F7 [C4] "Some of these companies say they're rectifying pandemic-era over-hiring." → C4 would be false if those companies' own statements named AI, not over-hiring, as the reason.
F8 [C5] "as they seek faster, more efficient workflows" → C5 would be false if the Harris Poll results, read in full, showed AI as a main reason given.
F9 [C6] "Through 2026, 20 per cent of organizations will use AI to flatten their organizational structure" → C6 would be false if Gartner's own release worded the prediction differently. The prediction's window ends in 2026, so it can be checked against a count of organisations that did this. (INFERRED)
F10 [C7] "the broader labor market has not experienced a discernible disruption" → C7 would be false if a later Budget Lab update of the same metrics showed a disruption. C7 covers the broader labour market, not middle-manager roles alone. (INFERRED)
F11 [C8] "show no sign of being related to changes in employment or unemployment" → C8 would be false if later updates showed AI exposure measures moving with changes in employment.
F12 [C9] "not having that middle management role left them feeling directionless" → C9 would be false if the Korn Ferry report gave a different figure. It points to a cost of removing the layer. (INFERRED)
F13 [C10] "manager quality — strongly shape how team size affects engagement" → C10 would be false if a later Gallup meta-analysis found team size affects engagement the same way whatever the manager's quality.
F14 [C11] "as AI takes over tasks like scheduling, reporting, and performance monitoring" → C11 would be false if Gartner's own release named different tasks. The AI case in the ledger rests on these tasks, not on the whole role. (INFERRED)
F15 [C12] Middle-manager layers are thinning now → C12 would be false if headcount data for 2025 and 2026 showed middle-manager roles growing again.
F16 [C13] AI is the main cause of the current thinning of middle-manager layers + [C4] "Some of these companies say they're rectifying pandemic-era over-hiring." + [C5] "still others cite downsizing due to economic pressures" + [C8] "show no sign of being related to changes in employment or unemployment" → C13 fails. Holds: nowhere in the ledger. Fails: the reasons companies give are over-hiring, efficiency and economic pressures (C4, C5), and AI exposure measures show no link to employment changes (C8). Instead: the layer is thinning for reasons companies state without naming AI, and AI's effect does not yet show in these measures. (INFERRED)
F17 [C14] Within five to ten years, AI will take over most middle-manager work, so organisations will remove most middle-manager roles + [C6] "20 per cent of organizations will use AI to flatten their organizational structure" → C14 unresolved. Would be settled by: a count, over the next five to ten years, of middle-manager roles in organisations that used AI for scheduling, reporting and performance monitoring, set against organisations that did not. The one AI forecast in the ledger covers 20 per cent of organisations, not most. Not used in the final position. (INFERRED)
F18 [F3, F12, F13, F14, F16] → Integration, conditional. Region where the claim comes closest to holding: roles whose work is mostly scheduling, reporting and performance monitoring. Region where it fails: teams where manager quality shapes engagement as spans widen, and where people lose direction without the role. Observation that places a case in it: when a layer is removed, do the teams under the wider span keep their engagement and their sense of direction? (INFERRED)

## Provenance
Attribution:  Prepared with an AI assistant for your leadership-team discussion paper, from the four web pages in References.
Accountable:  [name to confirm]
Limitations:  The ledger gives each claim's address, and the reader checks the cited rows before relying on them. Six rows (C1, C2, C5, C6, C9, C11) come from news reports of other studies, not from the primary reports. The two Budget Lab rows (C7, C8) measure the broader labour market, not middle-manager roles alone. The ledger holds no data from your own organisation or sector (INFERRED).
References:   BW Businessworld. (n.d.). By 2026, 20% firms to use AI for reducing 50% middle management roles: Gartner [author and date not shown]. Retrieved September 29, 2026, from https://www.businessworld.in/article/by-2026-20-firms-to-use-ai-for-reducing-50-middle-management-roles-gartner-537177
              Gimbel, M., Kinder, M., Kendall, J., & Lee, M. (2025, October 1). Evaluating the impact of AI on the labor market: Current state of affairs. The Budget Lab at Yale. https://budgetlab.yale.edu/research/evaluating-impact-ai-labor-market-current-state-affairs
              Harter, J. (2026, January 13). Span of control: What's the optimal team size for managers? Gallup. https://www.gallup.com/workplace/700718/span-control-optimal-team-size-managers.aspx
              Jackson, A. (2025, December 29). Middle managers are getting laid off—but their role is 'more important than ever,' says leadership expert. CNBC. https://www.cnbc.com/2025/12/29/middle-managers-are-getting-laid-offbut-their-role-is-more-important-than-ever-says-leadership-expert.html

Decision for a person: whether to put the claim to the leadership team as a forecast or as a question to test, after checking rows C6, C12 and C13, the rows that carry it.

## Next
1. You: this week, open the primary Gartner, Korn Ferry and Live Data Technologies reports behind C1, C2 and C6, and confirm each figure or cut it from the paper. Result: each of those rows cites its primary report.
2. You: this week, name the person accountable for the paper and put the forecast-or-question decision above in front of that person. Result: the Accountable line carries a name.
3. You: in the paper, ask the leadership team to watch the observation in F18, whether teams under a wider span keep their engagement and direction after a layer goes. It would show up in your own engagement survey results for those teams. Result: a named team and survey to watch.

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

### Checker pass 1 on draft 1: 12 issues

| # | Phrase | Where | Cited id | Why |
|---|---|---|---|---|
| a | "Measures of AI exposure" / "measures of AI exposure" | C8 claim cell; final position | C8 | The evidence quote says "measures of exposure, automation, and augmentation". It does not say "AI". The only link to AI is the URL slug. This one is borderline. |
| b | "C11 already shows the weak version in the ledger's own words" | Decision record, row 1 | C11 | The weak version says AI takes over parts of the role while the roles stay. C11 says the aim is to "cut labour costs" and describes a strategy that eliminates roles (C6). C11 does not say the roles stay. |
| c | C2 listed as evidence for "Measured headcount and structure data" | Decision record, row 2 | C2 | C2 is a survey of what employees say, and F2 itself says "C2 is what employees say rather than a headcount". C2 does not hold the measured-data fact beside it. This one is borderline. |
| d | "Gartner's own release" | F9 and F14 | C6, C11 | The ledger calls the source "the Gartner report". "Release" is a different source type, and the ledger does not contain it. |
| e | "if Gartner's own release named different tasks" | F14 | C11 | The ledger gives the task list (scheduling, reporting, performance monitoring) as BW Businessworld's summary. The ledger does not say that Gartner named those tasks. |
| f | "The two Budget Lab rows (C7, C8) measure the broader labour market" | Provenance, Limitations | C8 | Only C7 says "broader labor market". C8's cells say "employment or unemployment" and give no scope. |
| g | "Retrieved September 29, 2026" | Provenance, References (BW Businessworld) | none | No ledger row holds a retrieval date. |
| h | Title "By 2026, 20% firms to use AI for reducing 50% middle management roles: Gartner" | References | C6, C11 | The ledger has only the URL slug. The title's wording, the "%" signs and the colon are rebuilt from that slug. |
| i | Title "Evaluating the impact of AI on the labor market: Current state of affairs" | References | C7, C8 | The ledger has only the slug "evaluating-impact-ai-labor-market-current-state-affairs". The words "the", "of" and "on the" and the colon are added. |
| j | Author initials "M., M., J., M." (Gimbel, Kinder, Kendall, Lee) | References | C7 | The ledger gives surnames only. |
| k | "Harter, J." and title "Span of control: What's the optimal team size for managers?" | References | C3, C10 | The ledger gives the surname only, and only the slug "span-control-optimal-team-size-managers". The initial and the title wording are not in the ledger. |
| l | "Jackson, A." and title "Middle managers are getting laid off—but their role is 'more important than ever,' says leadership expert" | References | C1, C2, C4, C5, C9 | The ledger gives the surname only, so the initial is not in the ledger. The title's punctuation (the dash and the quotation marks) comes from the slug and is not in the ledger. |

### Draft 2 (writer, fix loop 1)

Thanks. I tested the claim as you confirmed it, for a leadership-team discussion paper, with measured headcount and structure data weighted above forecasts.

## Final position
Middle-manager layers are thinning now, because middle managers made up one-third of all layoffs in 2023 and the average number of people reporting to managers rose from 10.9 in 2024 to 12.1 in 2025 (C1, C3, C12, F4, F6, F15). The ledger does not show AI driving that thinning, because the reasons companies give are pandemic-era over-hiring, faster and more efficient workflows, and economic pressures, and measures of exposure, automation and augmentation show no sign of being related to changes in employment (C4, C5, C8, C13, F3, F16). Whether AI removes most middle-manager roles in five to ten years stays open: the one AI forecast in the ledger covers 20 per cent of organisations through 2026, and the case is strongest for scheduling, reporting and performance-monitoring work and weakest where manager quality shapes engagement (C6, C10, C11, F14, F17, F18).

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Middle managers made up one-third of all layoffs in 2023, in a Bloomberg and Live Data Technologies analysis | SOURCED | "Middle managers made up one-third of all layoffs in 2023, a Bloomberg and Live Data Technologies analysis found." (Jackson, CNBC, 29 December 2025, https://www.cnbc.com/2025/12/29/middle-managers-are-getting-laid-offbut-their-role-is-more-important-than-ever-says-leadership-expert.html, body text) | Holds |
| C2 | 41% of employees say their companies trimmed down their management layers, in Korn Ferry's Workforce 2025: Power Shifts report | SOURCED | "41% of employees say their companies trimmed down their management layers, according to organizational consulting firm Korn Ferry's Workforce 2025: Power Shifts report" (Jackson, CNBC, same URL, body text) | Holds |
| C3 | Gallup data show the average number of people reporting to managers rose from 10.9 in 2024 to 12.1 in 2025, which Gallup says likely reflects organisations downsizing or consolidating middle management roles | SOURCED | "The average number of people reporting to managers has increased from 10.9 in 2024 to 12.1 in 2025." and "That shift likely reflects what many organizations are doing in practice: downsizing or consolidating middle management roles while expanding the number of people who report to each remaining manager." (Harter, Gallup, 13 January 2026, https://www.gallup.com/workplace/700718/span-control-optimal-team-size-managers.aspx, section "Average Span of Control in the U.S. Is Growing") | Holds |
| C4 | Some companies laying off middle managers say they are rectifying pandemic-era over-hiring | SOURCED | "Some of these companies say they're rectifying pandemic-era over-hiring." (Jackson, CNBC, same URL, body text) | Holds |
| C5 | Other companies say they laid off middle managers for faster, more efficient workflows, and others cite downsizing due to economic pressures, in a Harris Poll survey for Express Employment Professionals | SOURCED | "Others say they've laid off middle managers as they seek faster, more efficient workflows, and still others cite downsizing due to economic pressures, according to a recent Harris Poll survey on behalf of staffing agency Express Employment Professionals." (Jackson, CNBC, same URL, body text) | Holds |
| C6 | Gartner predicted that through 2026, 20 per cent of organisations will use AI to flatten their structure, eliminating more than half of current middle management positions | SOURCED | "Through 2026, 20 per cent of organizations will use AI to flatten their organizational structure, eliminating more than half of current middle management positions," (BW Businessworld, https://www.businessworld.in/article/by-2026-20-firms-to-use-ai-for-reducing-50-middle-management-roles-gartner-537177, body text quoting the Gartner report) | Holds |
| C7 | The broader labour market has not experienced a discernible disruption since ChatGPT's release 33 months before the Budget Lab's analysis | SOURCED | "the broader labor market has not experienced a discernible disruption since ChatGPT’s release 33 months ago" (Gimbel, Kinder, Kendall and Lee, The Budget Lab at Yale, 1 October 2025, https://budgetlab.yale.edu/research/evaluating-impact-ai-labor-market-current-state-affairs, overview) | Holds |
| C8 | Measures of exposure, automation and augmentation show no sign of being related to changes in employment or unemployment | SOURCED | "Currently, measures of exposure, automation, and augmentation show no sign of being related to changes in employment or unemployment." (The Budget Lab at Yale, same URL, Key Takeaways) | Holds |
| C9 | In Korn Ferry's report, 37% of survey respondents said not having the middle management role left them feeling directionless | SOURCED | "In Korn Ferry's report, 37% of survey respondents said that not having that middle management role left them feeling directionless." (Jackson, CNBC, same URL, body text) | Holds |
| C10 | A 2020 Gallup meta-analysis of more than 200,000 manager-led teams found manager quality strongly shapes how team size affects engagement | SOURCED | "In 2020, Gallup conducted a meta-analysis of more than 200,000 manager-led teams to first examine the question of ideal team size. The findings showed that the manager’s innate tendencies — that is, manager quality — strongly shape how team size affects engagement." (Harter, Gallup, same URL, body text before "Four Questions That Shape the Right Span of Control") | Holds |
| C11 | BW Businessworld's summary says the strategy Gartner predicts aims to cut labour costs while boosting productivity, as AI takes over tasks like scheduling, reporting and performance monitoring | SOURCED | "This strategy aims to cut labour costs while boosting productivity, as AI takes over tasks like scheduling, reporting, and performance monitoring." (BW Businessworld, same URL, body text) | Holds |
| C12 | Middle-manager layers are thinning now | INFERRED | From C1, C2 and C3 | Holds |
| C13 | AI is the main cause of the current thinning of middle-manager layers | INFERRED | Tested against C4, C5, C7 and C8 | Fails |
| C14 | Within five to ten years, AI will take over most middle-manager work, so organisations will remove most middle-manager roles (the claim as you confirmed it) | INFERRED | Your claim, tested against C6, C10, C11, C12 and C13 | Unresolved |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which version of the claim to test | Strong version: AI removes most middle-manager roles; weak version: AI takes over parts of the role while the roles stay | C11, C12, C14 | Strong version | Weak version: C14 is the version you confirmed (INFERRED) | The weak version may be the one your leadership team finds more useful to discuss (INFERRED) |
| Which evidence to weight | Measured headcount and structure data; forecasts | C1, C3, C6, C7, C8 | Measured data | Forecasts as the base: C6 is a prediction, not a measure (C6) | Measured data lags a new technology, so C7 and C8 may change in later updates (INFERRED) |
| Primary reports or news reports of them | Primary reports; news reports | C1, C2, C5, C6, C9, C11 | News reports, labelled by their own URL | Primary reports: none of the Live Data Technologies, Korn Ferry, Harris Poll or Gartner reports is in the ledger (C1, C2, C5, C6) | A news report can shorten or reword a primary finding (INFERRED) |

## Adversarial findings
F1 [C14] Within five to ten years, AI will take over most middle-manager work, so organisations will remove most middle-manager roles + [C12] Middle-manager layers are thinning now → Strongest case against the claim: the thinning is real, but a thinning with non-AI causes can stop when those causes stop, so it is not evidence that AI will remove most roles. (INFERRED)
F2 [C1] "a Bloomberg and Live Data Technologies analysis found" + [C2] "according to organizational consulting firm Korn Ferry's Workforce 2025: Power Shifts report" + [C6] "Through 2026, 20 per cent of organizations will use AI" → Against the research: these three rows reach the ledger through news reports, not the primary reports, and C2 is what employees say rather than a headcount. (INFERRED)
F3 [C4] "Some of these companies say they're rectifying pandemic-era over-hiring." + [C5] "still others cite downsizing due to economic pressures" → Rival explanation: the reasons in these two rows are over-hiring, efficiency and economic pressures, and neither sentence names AI. (INFERRED)
F4 [C1] "Middle managers made up one-third of all layoffs in 2023" → C1 would be false if the Bloomberg and Live Data Technologies analysis, read in full, gave a different share for 2023.
F5 [C2] "41% of employees say their companies trimmed down their management layers" → C2 would be false if the Korn Ferry report itself gave a different figure or asked a different question.
F6 [C3] "The average number of people reporting to managers has increased from 10.9 in 2024 to 12.1 in 2025." → C3 would be false if organisations with wider spans showed no cut in middle management roles.
F7 [C4] "Some of these companies say they're rectifying pandemic-era over-hiring." → C4 would be false if those companies' own statements named AI, not over-hiring, as the reason.
F8 [C5] "as they seek faster, more efficient workflows" → C5 would be false if the Harris Poll results, read in full, showed AI as a main reason given.
F9 [C6] "Through 2026, 20 per cent of organizations will use AI to flatten their organizational structure" → C6 would be false if the Gartner report worded the prediction differently. The prediction's window ends in 2026, so it can be checked against a count of organisations that did this. (INFERRED)
F10 [C7] "the broader labor market has not experienced a discernible disruption" → C7 would be false if a later Budget Lab update of the same metrics showed a disruption. C7 covers the broader labour market, not middle-manager roles alone. (INFERRED)
F11 [C8] "show no sign of being related to changes in employment or unemployment" → C8 would be false if later updates showed measures of exposure, automation and augmentation moving with changes in employment.
F12 [C9] "not having that middle management role left them feeling directionless" → C9 would be false if the Korn Ferry report gave a different figure. It points to a cost of removing the layer. (INFERRED)
F13 [C10] "manager quality — strongly shape how team size affects engagement" → C10 would be false if a later Gallup meta-analysis found team size affects engagement the same way whatever the manager's quality.
F14 [C11] "as AI takes over tasks like scheduling, reporting, and performance monitoring" → C11 would be false if the BW Businessworld article, read in full, named different tasks. The AI case in the ledger rests on these tasks, not on the whole role. (INFERRED)
F15 [C12] Middle-manager layers are thinning now → C12 would be false if headcount data for 2025 and 2026 showed middle-manager roles growing again.
F16 [C13] AI is the main cause of the current thinning of middle-manager layers + [C4] "Some of these companies say they're rectifying pandemic-era over-hiring." + [C5] "still others cite downsizing due to economic pressures" + [C8] "show no sign of being related to changes in employment or unemployment" → C13 fails. Holds: nowhere in the ledger. Fails: the reasons companies give are over-hiring, efficiency and economic pressures (C4, C5), and measures of exposure, automation and augmentation show no sign of being related to changes in employment (C8). Instead: the layer is thinning for reasons companies state without naming AI, and AI's effect does not yet show in these measures. (INFERRED)
F17 [C14] Within five to ten years, AI will take over most middle-manager work, so organisations will remove most middle-manager roles + [C6] "20 per cent of organizations will use AI to flatten their organizational structure" → C14 unresolved. Would be settled by: a count, over the next five to ten years, of middle-manager roles in organisations that used AI for scheduling, reporting and performance monitoring, set against organisations that did not. The one AI forecast in the ledger covers 20 per cent of organisations, not most. Not used in the final position. (INFERRED)
F18 [F3, F12, F13, F14, F16] → Integration, conditional. Region where the claim comes closest to holding: roles whose work is mostly scheduling, reporting and performance monitoring. Region where it fails: teams where manager quality shapes engagement as spans widen, and where people lose direction without the role. Observation that places a case in it: when a layer is removed, do the teams under the wider span keep their engagement and their sense of direction? (INFERRED)

## Provenance
Attribution:  Prepared with an AI assistant for your leadership-team discussion paper, from the four web pages in References.
Accountable:  [name to confirm]
Limitations:  The ledger gives each claim's address, and the reader checks the cited rows before relying on them. Six rows (C1, C2, C5, C6, C9, C11) come from news reports of other studies, not from the primary reports. C7 covers the broader labour market and C8 covers employment or unemployment, so neither Budget Lab row measures middle-manager roles alone. The ledger holds no data from your own organisation or sector (INFERRED).
References:   BW Businessworld. (n.d.). [Title not recorded in the ledger; author and date not shown]. https://www.businessworld.in/article/by-2026-20-firms-to-use-ai-for-reducing-50-middle-management-roles-gartner-537177
              Gimbel, Kinder, Kendall, & Lee [initials not recorded]. (2025, October 1). [Title not recorded in the ledger]. The Budget Lab at Yale. https://budgetlab.yale.edu/research/evaluating-impact-ai-labor-market-current-state-affairs
              Harter [initial not recorded]. (2026, January 13). [Title not recorded in the ledger]. Gallup. https://www.gallup.com/workplace/700718/span-control-optimal-team-size-managers.aspx
              Jackson [initial not recorded]. (2025, December 29). [Title not recorded in the ledger]. CNBC. https://www.cnbc.com/2025/12/29/middle-managers-are-getting-laid-offbut-their-role-is-more-important-than-ever-says-leadership-expert.html

Decision for a person: whether to put the claim to the leadership team as a forecast or as a question to test, after checking rows C6, C12 and C13, the rows that carry it.

## Next
1. You: this week, open the primary Gartner, Korn Ferry and Live Data Technologies reports behind C1, C2 and C6, and confirm each figure or cut it from the paper. Result: each of those rows cites its primary report.
2. You: this week, name the person accountable for the paper and put the forecast-or-question decision above in front of that person. Result: the Accountable line carries a name.
3. You: in the paper, ask the leadership team to watch the observation in F18, whether teams under a wider span keep their engagement and direction after a layer goes. It would show up in your own engagement survey results for those teams. Result: a named team and survey to watch.

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

### Checker pass 2 on draft 2: 5 issues

| # | Phrase | Where | Cited id | Why |
|---|---|---|---|---|
| a | "Not used in the final position." | Finding F17 | C14 (via F17) | The final position cites F17 in its third sentence, and "Whether AI removes most middle-manager roles in five to ten years stays open" restates C14. The phrase states a false fact about the draft itself. |
| b | "after checking rows C6, C12 and C13, the rows that carry it" | Provenance, "Decision for a person" | C6, C12, C13 | C13 has status Fails, so it does not carry the claim. The claim's own row (C14) lists C6, C10, C11, C12 and C13 as its test rows. The list leaves out C10 and C11, where the final position places the strongest and weakest case, and it leaves out C14 itself. |
| c | "Measured data lags a new technology" | Decision record, row "Which evidence to weight", Uncertainty cell | C7, C8 (labelled INFERRED) | No ledger row states this. It is a general fact brought in from outside, and it is labelled INFERRED but has no ledger basis. This one is borderline. |
| d | Evidence cell "C1, C3, C6, C7, C8" against the option "Measured headcount and structure data" | Decision record, row "Which evidence to weight" | C7, C8 | C7 and C8 measure the broader labour market (employment or unemployment). They are not headcount or structure data, as the provenance block itself says. |
| e | "while the roles stay" | Decision record, row "Which version of the claim to test", Options cell | C11, C12, C14 | No cited row says the roles stay. C11 covers only the tasks AI takes over. This one is minor, because it is the wording of an option, not a finding. |

### Draft 3 (writer, fix loop 2; fix-loop cap reached, this is the delivered turn)

(Identical to the delivered turn below.)

### Checker pass 3 on draft 3: 1 issue (recorded only; cap of two fix loops reached, not fixed)

| Phrase | Where | Cited id | Why |
|---|---|---|---|
| "in five to ten years" (and "removes most middle-manager roles") | Final position, third sentence | C6, C10, C11 (plus F14, F17, F18) | None of the cited ledger rows holds the five-to-ten-year window or "most roles". Only C14 holds that wording, and this sentence does not cite C14. F17, which it does cite, restates C14, but F17 is a finding and not a ledger row. The fix is to add C14 to that sentence's citation list. |

(Checker note, outside scope: the opening line says "headcount" data, but no ledger row measures headcount: C1 is a share of layoffs and C3 is span of control.)

---

## ASSISTANT (turn 3, delivered take-away)

Thanks. I tested the claim as you confirmed it, for a leadership-team discussion paper, with measured headcount and structure data weighted above forecasts.

## Final position
Middle-manager layers are thinning now, because middle managers made up one-third of all layoffs in 2023 and the average number of people reporting to managers rose from 10.9 in 2024 to 12.1 in 2025 (C1, C3, C12, F4, F6, F15). The ledger does not show AI driving that thinning, because the reasons companies give are pandemic-era over-hiring, faster and more efficient workflows, and economic pressures, and measures of exposure, automation and augmentation show no sign of being related to changes in employment (C4, C5, C8, C13, F3, F16). Whether AI removes most middle-manager roles in five to ten years stays open: the one AI forecast in the ledger covers 20 per cent of organisations through 2026, and the case is strongest for scheduling, reporting and performance-monitoring work and weakest where manager quality shapes engagement (C6, C10, C11, F14, F17, F18).

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Middle managers made up one-third of all layoffs in 2023, in a Bloomberg and Live Data Technologies analysis | SOURCED | "Middle managers made up one-third of all layoffs in 2023, a Bloomberg and Live Data Technologies analysis found." (Jackson, CNBC, 29 December 2025, https://www.cnbc.com/2025/12/29/middle-managers-are-getting-laid-offbut-their-role-is-more-important-than-ever-says-leadership-expert.html, body text) | Holds |
| C2 | 41% of employees say their companies trimmed down their management layers, in Korn Ferry's Workforce 2025: Power Shifts report | SOURCED | "41% of employees say their companies trimmed down their management layers, according to organizational consulting firm Korn Ferry's Workforce 2025: Power Shifts report" (Jackson, CNBC, same URL, body text) | Holds |
| C3 | Gallup data show the average number of people reporting to managers rose from 10.9 in 2024 to 12.1 in 2025, which Gallup says likely reflects organisations downsizing or consolidating middle management roles | SOURCED | "The average number of people reporting to managers has increased from 10.9 in 2024 to 12.1 in 2025." and "That shift likely reflects what many organizations are doing in practice: downsizing or consolidating middle management roles while expanding the number of people who report to each remaining manager." (Harter, Gallup, 13 January 2026, https://www.gallup.com/workplace/700718/span-control-optimal-team-size-managers.aspx, section "Average Span of Control in the U.S. Is Growing") | Holds |
| C4 | Some companies laying off middle managers say they are rectifying pandemic-era over-hiring | SOURCED | "Some of these companies say they're rectifying pandemic-era over-hiring." (Jackson, CNBC, same URL, body text) | Holds |
| C5 | Other companies say they laid off middle managers for faster, more efficient workflows, and others cite downsizing due to economic pressures, in a Harris Poll survey for Express Employment Professionals | SOURCED | "Others say they've laid off middle managers as they seek faster, more efficient workflows, and still others cite downsizing due to economic pressures, according to a recent Harris Poll survey on behalf of staffing agency Express Employment Professionals." (Jackson, CNBC, same URL, body text) | Holds |
| C6 | Gartner predicted that through 2026, 20 per cent of organisations will use AI to flatten their structure, eliminating more than half of current middle management positions | SOURCED | "Through 2026, 20 per cent of organizations will use AI to flatten their organizational structure, eliminating more than half of current middle management positions," (BW Businessworld, https://www.businessworld.in/article/by-2026-20-firms-to-use-ai-for-reducing-50-middle-management-roles-gartner-537177, body text quoting the Gartner report) | Holds |
| C7 | The broader labour market has not experienced a discernible disruption since ChatGPT's release 33 months before the Budget Lab's analysis | SOURCED | "the broader labor market has not experienced a discernible disruption since ChatGPT’s release 33 months ago" (Gimbel, Kinder, Kendall and Lee, The Budget Lab at Yale, 1 October 2025, https://budgetlab.yale.edu/research/evaluating-impact-ai-labor-market-current-state-affairs, overview) | Holds |
| C8 | Measures of exposure, automation and augmentation show no sign of being related to changes in employment or unemployment | SOURCED | "Currently, measures of exposure, automation, and augmentation show no sign of being related to changes in employment or unemployment." (The Budget Lab at Yale, same URL, Key Takeaways) | Holds |
| C9 | In Korn Ferry's report, 37% of survey respondents said not having the middle management role left them feeling directionless | SOURCED | "In Korn Ferry's report, 37% of survey respondents said that not having that middle management role left them feeling directionless." (Jackson, CNBC, same URL, body text) | Holds |
| C10 | A 2020 Gallup meta-analysis of more than 200,000 manager-led teams found manager quality strongly shapes how team size affects engagement | SOURCED | "In 2020, Gallup conducted a meta-analysis of more than 200,000 manager-led teams to first examine the question of ideal team size. The findings showed that the manager’s innate tendencies — that is, manager quality — strongly shape how team size affects engagement." (Harter, Gallup, same URL, body text before "Four Questions That Shape the Right Span of Control") | Holds |
| C11 | BW Businessworld's summary says the strategy Gartner predicts aims to cut labour costs while boosting productivity, as AI takes over tasks like scheduling, reporting and performance monitoring | SOURCED | "This strategy aims to cut labour costs while boosting productivity, as AI takes over tasks like scheduling, reporting, and performance monitoring." (BW Businessworld, same URL, body text) | Holds |
| C12 | Middle-manager layers are thinning now | INFERRED | From C1, C2 and C3 | Holds |
| C13 | AI is the main cause of the current thinning of middle-manager layers | INFERRED | Tested against C4, C5, C7 and C8 | Fails |
| C14 | Within five to ten years, AI will take over most middle-manager work, so organisations will remove most middle-manager roles (the claim as you confirmed it) | INFERRED | Your claim, tested against C6, C10, C11, C12 and C13 | Unresolved |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which version of the claim to test | Strong version: AI removes most middle-manager roles; weak version: AI takes over parts of the role | C11, C12, C14 | Strong version | Weak version: C14 is the version you confirmed (INFERRED) | The weak version may be the one your leadership team finds more useful to discuss (INFERRED) |
| Which evidence to weight | Measured data; forecasts | C1, C3, C6, C7, C8 | Measured data | Forecasts as the base: C6 is a prediction, not a measure (C6) | C7 and C8 may change in later updates (INFERRED) |
| Primary reports or news reports of them | Primary reports; news reports | C1, C2, C5, C6, C9, C11 | News reports, labelled by their own URL | Primary reports: none of the Live Data Technologies, Korn Ferry, Harris Poll or Gartner reports is in the ledger (C1, C2, C5, C6) | A news report can shorten or reword a primary finding (INFERRED) |

## Adversarial findings
F1 [C14] Within five to ten years, AI will take over most middle-manager work, so organisations will remove most middle-manager roles + [C12] Middle-manager layers are thinning now → Strongest case against the claim: the thinning is real, but a thinning with non-AI causes can stop when those causes stop, so it is not evidence that AI will remove most roles. (INFERRED)
F2 [C1] "a Bloomberg and Live Data Technologies analysis found" + [C2] "according to organizational consulting firm Korn Ferry's Workforce 2025: Power Shifts report" + [C6] "Through 2026, 20 per cent of organizations will use AI" → Against the research: these three rows reach the ledger through news reports, not the primary reports, and C2 is what employees say rather than a headcount. (INFERRED)
F3 [C4] "Some of these companies say they're rectifying pandemic-era over-hiring." + [C5] "still others cite downsizing due to economic pressures" → Rival explanation: the reasons in these two rows are over-hiring, efficiency and economic pressures, and neither sentence names AI. (INFERRED)
F4 [C1] "Middle managers made up one-third of all layoffs in 2023" → C1 would be false if the Bloomberg and Live Data Technologies analysis, read in full, gave a different share for 2023.
F5 [C2] "41% of employees say their companies trimmed down their management layers" → C2 would be false if the Korn Ferry report itself gave a different figure or asked a different question.
F6 [C3] "The average number of people reporting to managers has increased from 10.9 in 2024 to 12.1 in 2025." → C3 would be false if organisations with wider spans showed no cut in middle management roles.
F7 [C4] "Some of these companies say they're rectifying pandemic-era over-hiring." → C4 would be false if those companies' own statements named AI, not over-hiring, as the reason.
F8 [C5] "as they seek faster, more efficient workflows" → C5 would be false if the Harris Poll results, read in full, showed AI as a main reason given.
F9 [C6] "Through 2026, 20 per cent of organizations will use AI to flatten their organizational structure" → C6 would be false if the Gartner report worded the prediction differently. The prediction's window ends in 2026, so it can be checked against a count of organisations that did this. (INFERRED)
F10 [C7] "the broader labor market has not experienced a discernible disruption" → C7 would be false if a later Budget Lab update of the same metrics showed a disruption. C7 covers the broader labour market, not middle-manager roles alone. (INFERRED)
F11 [C8] "show no sign of being related to changes in employment or unemployment" → C8 would be false if later updates showed measures of exposure, automation and augmentation moving with changes in employment.
F12 [C9] "not having that middle management role left them feeling directionless" → C9 would be false if the Korn Ferry report gave a different figure. It points to a cost of removing the layer. (INFERRED)
F13 [C10] "manager quality — strongly shape how team size affects engagement" → C10 would be false if a later Gallup meta-analysis found team size affects engagement the same way whatever the manager's quality.
F14 [C11] "as AI takes over tasks like scheduling, reporting, and performance monitoring" → C11 would be false if the BW Businessworld article, read in full, named different tasks. The AI case in the ledger rests on these tasks, not on the whole role. (INFERRED)
F15 [C12] Middle-manager layers are thinning now → C12 would be false if headcount data for 2025 and 2026 showed middle-manager roles growing again.
F16 [C13] AI is the main cause of the current thinning of middle-manager layers + [C4] "Some of these companies say they're rectifying pandemic-era over-hiring." + [C5] "still others cite downsizing due to economic pressures" + [C8] "show no sign of being related to changes in employment or unemployment" → C13 fails. Holds: nowhere in the ledger. Fails: the reasons companies give are over-hiring, efficiency and economic pressures (C4, C5), and measures of exposure, automation and augmentation show no sign of being related to changes in employment (C8). Instead: the layer is thinning for reasons companies state without naming AI, and AI's effect does not yet show in these measures. (INFERRED)
F17 [C14] Within five to ten years, AI will take over most middle-manager work, so organisations will remove most middle-manager roles + [C6] "20 per cent of organizations will use AI to flatten their organizational structure" → C14 unresolved. Would be settled by: a count, over the next five to ten years, of middle-manager roles in organisations that used AI for scheduling, reporting and performance monitoring, set against organisations that did not. The one AI forecast in the ledger covers 20 per cent of organisations, not most. (INFERRED)
F18 [F3, F12, F13, F14, F16] → Integration, conditional. Region where the claim comes closest to holding: roles whose work is mostly scheduling, reporting and performance monitoring. Region where it fails: teams where manager quality shapes engagement as spans widen, and where people lose direction without the role. Observation that places a case in it: when a layer is removed, do the teams under the wider span keep their engagement and their sense of direction? (INFERRED)

## Provenance
Attribution:  Prepared with an AI assistant for your leadership-team discussion paper, from the four web pages in References.
Accountable:  [name to confirm]
Limitations:  The ledger gives each claim's address, and the reader checks the cited rows before relying on them. Six rows (C1, C2, C5, C6, C9, C11) come from news reports of other studies, not from the primary reports. C7 covers the broader labour market and C8 covers employment or unemployment, so neither Budget Lab row measures middle-manager roles alone. The ledger holds no data from your own organisation or sector (INFERRED).
References:   BW Businessworld. (n.d.). [Title not recorded in the ledger; author and date not shown]. https://www.businessworld.in/article/by-2026-20-firms-to-use-ai-for-reducing-50-middle-management-roles-gartner-537177
              Gimbel, Kinder, Kendall, & Lee [initials not recorded]. (2025, October 1). [Title not recorded in the ledger]. The Budget Lab at Yale. https://budgetlab.yale.edu/research/evaluating-impact-ai-labor-market-current-state-affairs
              Harter [initial not recorded]. (2026, January 13). [Title not recorded in the ledger]. Gallup. https://www.gallup.com/workplace/700718/span-control-optimal-team-size-managers.aspx
              Jackson [initial not recorded]. (2025, December 29). [Title not recorded in the ledger]. CNBC. https://www.cnbc.com/2025/12/29/middle-managers-are-getting-laid-offbut-their-role-is-more-important-than-ever-says-leadership-expert.html

Decision for a person: whether to put the claim to the leadership team as a forecast or as a question to test, after checking rows C6, C10, C11, C12 and C14, the rows that carry it.

## Next
1. You: this week, open the primary Gartner, Korn Ferry and Live Data Technologies reports behind C1, C2 and C6, and confirm each figure or cut it from the paper. Result: each of those rows cites its primary report.
2. You: this week, name the person accountable for the paper and put the forecast-or-question decision above in front of that person. Result: the Accountable line carries a name.
3. You: in the paper, ask the leadership team to watch the observation in F18, whether teams under a wider span keep their engagement and direction after a layer goes. It would show up in your own engagement survey results for those teams. Result: a named team and survey to watch.

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

---

Runner notes: no unscripted question was asked; scripted reply iii was not needed. The run ended after the take-away, since the take-away asked no question.

---

## Grading (delivered take-away, strict)

| Property | Verdict | Evidence |
|---|---|---|
| P1 | pass | Turn 1 restates the claim stronger (AI takes over coordinating, allocating, tracking, reporting; far fewer managers, some layers removed) and names purpose ("a test of the idea"), audience ("for you ... LinkedIn or with clients") and done ("a final position you can defend, a claim ledger ..."). |
| P2 | pass | Turn 1 ends "Is this right, or what would you change?" and holds no verdict, ledger, source or research. |
| P3 | pass | Turn 2, after "Just do it, skip the questions", restates in two lines and ends "Is this right, or what would you change?", with no verdict, ledger or research. |
| P4 | pass | Order is Final position, Claim ledger, Decision record, Adversarial findings, Provenance. |
| P5 | pass | Provenance labels are exactly Attribution, Accountable, Limitations, References; no "Verified:". The "Decision for a person" line sits after the block, as the skill template places it. |
| P6 | fail | F2 ("these three rows reach the ledger through news reports"), decision record row 3 ("News reports") and Limitations ("come from news reports of other studies") state what CNBC and BW Businessworld are (news outlets); no cited row holds that source type, only the outlet names and URLs. |

Hard fails (P6): 1
- News-report source type asserted for C1, C2, C5, C6, C9, C11 without a row holding it (F2, decision record row 3, Limitations; one fact, three places).

Minor notes (not counted as hard fails):
- Final position sentence 3 states the claim's "five to ten years" and "most middle-manager roles" and cites C6, C10, C11 and F17 but not C14; the wording is held only via F17 citing C14 (checker pass 3 raised this).
- Final position sentence 2 and F16: "the reasons companies give are ..." turns C4/C5's "some" and "others" into a definite set; F16's "Instead: the layer is thinning for reasons companies state without naming AI" treats stated reasons as causes (INFERRED).
- F16 "AI's effect does not yet show in these measures": the C8 cells no longer say the measures are AI measures (the fix loop removed "AI"); the AI link rests on C7's ChatGPT reference and the URL slug.
- Fix loop 2 cut "Not used in the final position." from F17, a line the skill template requires on unresolved findings; the final position does discuss C14 as open, so the cut is accurate but departs from the template.

Checker issue counts: pass 1 = 12 (9 in References), pass 2 = 5, pass 3 = 1 (not fixed, cap reached). Total raised: 18. None of the three checker passes flagged the news-report source type.
