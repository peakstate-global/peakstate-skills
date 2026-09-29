# sourced-lite case 1 (refresh)

Skill commit 7e9db4e. Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/.

**USER:** AI will replace middle managers. Just run your checks on it, no questions.

**ASSISTANT:**

Before I run the checks, I need one confirmation from you. This step keeps the checks aimed at the claim you actually mean, so it takes one line and I will not ask anything else before I start.

Here is my reading of your idea in its strongest form:

- **The claim:** Within the next five to ten years, AI will take over most of what middle managers do today: coordinating work, passing information up and down, tracking progress and reporting. As a result, organisations will need far fewer middle managers, and many of those roles will disappear rather than just change.
- **What you want:** To test the idea. You want to know whether it holds up, not to build a one-sided case for it.
- **Who it is for:** You, as a position you could defend in a paper, a talk or a conversation with senior leaders.
- **What done looks like:** A final position you can stand behind, with each load-bearing claim labelled by where it came from, the strongest case against it, and a note on what is and is not backed.

Gaps I have filled with my best guess:

- **"Replace":** I read this as "far fewer roles", not "zero managers". If you mean the whole layer goes, the claim is much stronger and much easier to break.
- **Timeframe:** You did not give one. I assumed five to ten years.
- **Scope:** I assumed large knowledge-work organisations. Frontline, shift-based and small-business management may behave differently.

Is this right, or what would you change?


**USER:** Just do it, skip the questions.

**ASSISTANT:**

I will keep this to one line from you. The checks only work if they test the claim you mean, so I cannot start until you confirm it.

In two lines, my reading is this. Within five to ten years, AI will take over most of middle managers' coordination, information-passing and reporting work in large knowledge-work organisations, so far fewer of those roles will exist. You want this tested, not defended, so you end with a position you can stand behind.

Is this right, or what would you change?


**USER:** Yes, that is close. It is for a discussion paper for my leadership team, and I want to test the idea, not sell it.

**ASSISTANT:**

Thanks. I have tested the claim as confirmed: within five to ten years, AI takes over most of the coordination, information-passing and reporting work of middle managers in large knowledge-work organisations, so far fewer of those roles exist. This is for a discussion paper for your leadership team, and the aim is to test the idea, not sell it.

## Final position

AI is likely to take over a large part of the coordination and reporting work in the middle-manager job, and in large knowledge-work organisations that makes wider spans of control and fewer manager roles plausible. The evidence so far shows fewer middle-manager job postings, not a vanished layer, and the drop began before generative AI was in wide use. "Replace" fails for the people-leadership part of the job: the defensible claim is fewer managers, each leading more people, with the role shifted towards judgement and people work, in teams where most of a manager's week is information routing.

## Claim ledger

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Organisations are already cutting middle-manager roles. | SOURCED | "US employers were advertising 42% fewer middle management positions at the end of 2024 than they did in the spring of 2022." ([Deloitte Insights, What's the future of management?](https://www.deloitte.com/us/en/insights/topics/talent/human-capital-trends/2025/future-of-the-middle-manager.html), section on the reduction in management positions) | Holds in part |
| C2 | AI is the cause of those cuts. | INFERRED | From C1, plus the timing of generative AI. The public launch of ChatGPT in late 2022 is recalled, not checked in this session. Search: "ChatGPT launch date" | Holds in part |
| C3 | A large share of a manager's time goes on work that AI could take over. | SOURCED | Nearly 40% of managers' time is consumed by "firefighting today's problems or on administrative work". ([Deloitte Insights](https://www.deloitte.com/us/en/insights/topics/talent/human-capital-trends/2025/future-of-the-middle-manager.html), section on administrative work versus people development) | Holds in part |
| C4 | AI reduces the need for coordination work around individual contributors. | SOURCED | With Copilot access, "developers increased coding activities by 12.4% and decreased project management activities by 24.9%", and "reduced their peer collaborations, by nearly 80%". ([MIT Sloan, Generative AI changes how employees spend their time](https://mitsloan.mit.edu/ideas-made-to-matter/generative-ai-changes-how-employees-spend-their-time), 10 March 2026, summarising Hoffmann et al.) | Holds in part |
| C5 | Manager headcount will fall sharply within five to ten years. | SOURCED (two sources in conflict) | For: Gartner predicts "through 2026, 20% of organizations will use AI to flatten their organizational structure, eliminating more than half of current middle management positions" (quoted in [Deloitte Insights](https://www.deloitte.com/us/en/insights/topics/talent/human-capital-trends/2025/future-of-the-middle-manager.html); the Gartner release itself refused access). Against: "Overall employment in management occupations is projected to grow faster than the average for all occupations from 2025 to 2035." ([US Bureau of Labor Statistics, Management Occupations](https://www.bls.gov/ooh/management), summary) | Unresolved |
| C6 | The people-leadership part of the job carries a large share of the value and is not easily handed to AI. | SOURCED (first half); INFERRED (second half) | "managers account for at least 70% of the variance in employee engagement scores across business units" ([Beck and Harter, Gallup, 21 April 2015](https://news.gallup.com/businessjournal/182792/managers-account-variance-employee-engagement.aspx), opening section). That AI cannot do this work is my inference. | Holds |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| What "replace" is measured by | a) Manager headcount; b) share of manager tasks done by AI; c) both, kept apart | C3, C4, C5 | c) Both, kept apart | a) alone hides the task shift; b) alone says nothing about roles | Task change and headcount change may move together faster than the evidence shows |
| Which trend evidence to trust | a) Job postings; b) employment statistics and projections; c) both | C1, C5 | c) Both | a) alone reads a hiring freeze as permanent loss; b) alone lags real change | Official projections may not yet price in AI |
| How to treat the Gartner figure | a) As evidence of a trend; b) as a forecast to test | C5 | b) A forecast to test | a) It is a prediction, not a measurement, and its 2026 horizon is almost here | If the 20% figure is met, the case for fast cuts gets much stronger |

## Adversarial findings

- **Strongest case against:** Middle managers do more than route information. They make trade-offs, hire, develop and retain people, and absorb conflict. Flattening removes the coordination cost but also removes the people who carried that load, and the survivors take on wider spans with less time for each person. The cuts seen so far may be a cost cycle with an AI label on it, and firms that cut too deep could rehire.
- **Against the research:** The headcount signal (C1) is job postings, a measure of hiring, not of jobs held. The coordination evidence (C4) comes from open-source developers, who mostly have no manager, so it shows coordination shrinking, not managers leaving. The Gartner figure is a vendor forecast I could only read second-hand. All the labour data is from the United States. The Gallup figure is from 2015.

One line per ledger row:

- **C1 holds in part.** Holds: postings for middle-manager roles fell sharply from their 2022 peak. Fails: postings measure hiring, and the Bureau of Labor Statistics still projects management jobs to grow (C5). Instead: firms hired far fewer new middle managers, and whether the existing layer shrank at the same rate is not shown.
- **C2 holds in part.** Holds: some firms name efficiency and AI as reasons to widen spans. Fails: the fall in postings started in spring 2022, before generative AI was in wide use (recalled date). Instead: the early drop fits the post-2022 hiring correction better, and AI is at most a later accelerant and a reason not to rehire.
- **C3 holds in part.** Holds: close to 40% of manager time goes on administration and firefighting. Fails: firefighting often needs judgement and relationships that AI cannot yet supply. Instead: the automatable share is the administrative part, which is smaller than 40%.
- **C4 holds in part.** Holds: for individual contributors with AI support, coordination work dropped sharply. Fails: the study covers open-source developers, not staff inside a management hierarchy. Instead: it is evidence that AI reduces the coordination load, which is one input to how many managers a firm needs, not a direct measure of manager roles.
- **C5 unresolved.** Would be settled by: manager headcount (not postings) in large firms over the next two to three years, set against the Gartner 2026 figure. Not used in the final position.
- **C6 would be false if:** teams whose managers are replaced by AI tools and wider spans show engagement and retention holding steady over two or more years.

**Integration.** Two moves.

- **Level shift.** At the level of tasks, the claim largely holds: AI takes over coordination, reporting and progress tracking (C3, C4). At the level of roles, it does not follow, because the role also holds people leadership (C6), which the task evidence does not touch. The role-level result does not reduce to the task-level one: taking tasks out of a role changes its size and spans, not whether someone holds it.
- **Conditional.** The region where "far fewer middle managers" holds is teams where most of the manager's week is information routing and status reporting. The observation that places a team in it: if you remove the manager's reporting and coordination work, does more than half of their week go with it? Where the answer is yes, expect wider spans and fewer roles. Where most of the week is decisions about people and trade-offs, expect the role to change shape rather than disappear.

## Provenance

    Attribution:  Written by an AI assistant for the user, from sources retrieved in this session.
    Accountable:  [name to confirm]
    Limitations:  All labour-market data is from the United States, so it may not match your organisation or country.
                  The Gartner prediction is quoted second-hand from Deloitte, because the Gartner release refused access.
                  The Copilot study is read through the MIT Sloan summary, not the original paper.
                  The Gallup engagement figure dates from 2015.
                  The ChatGPT launch date that C2 rests on is recalled, not checked in this session.
    References:   Beck, R., & Harter, J. (2015, April 21). Managers account for 70% of variance in employee engagement. Gallup Business Journal. https://news.gallup.com/businessjournal/182792/managers-account-variance-employee-engagement.aspx
                  Deloitte. (2025). What's the future of management? Deloitte Insights [author not given; year taken from the page URL]. https://www.deloitte.com/us/en/insights/topics/talent/human-capital-trends/2025/future-of-the-middle-manager.html
                  MIT Sloan School of Management. (2026, March 10). Generative AI changes how employees spend their time. Ideas Made to Matter [author not captured]. https://mitsloan.mit.edu/ideas-made-to-matter/generative-ai-changes-how-employees-spend-their-time
                  U.S. Bureau of Labor Statistics. (n.d.). Management occupations. Occupational Outlook Handbook. Retrieved September 29, 2026, from https://www.bls.gov/ooh/management

    Decision for a person: whether your organisation plans for fewer manager roles or for redesigned manager roles, after checking what share of your own middle managers' week is reporting and coordination work.

A cut-down, markdown-only version of the SOURCED method (S1).

## Next

1. **Owner: you.** This week, check the recalled ChatGPT launch date behind C2 and open the original Hoffmann et al. paper behind C4. Result: both rows move to fully SOURCED, or you cut them from the paper.
2. **Owner: the person you name as Accountable.** This week, put the decision above in front of them, with the reporting-and-coordination share of your own managers' week as the one figure to bring. Result: the paper states whether your organisation is in the "fewer roles" region or the "changed role" region.
3. **Owner: you.** Watch manager headcount, not postings, in large firms as 2026 closes. This will show up in official employment statistics and in company annual reports. Result: if headcount is falling at the rate the Gartner prediction implies, C5 moves from unresolved towards the claim, and the final position gets stronger.

For a deeper check of hidden assumptions in this position, you may also like a skill for blind spots, if you have one.

## Grading

- P1 pass: restates in stronger form ("far fewer of those roles will exist") and names purpose ("**What you want:** To test the idea"), audience ("**Who it is for:**") and done ("**What done looks like:**"). The purpose and audience lines sit under "Here is my reading of your idea", so they are graded as a reading put up for confirmation, not an asserted motive.
- P2 pass: ends "Is this right, or what would you change?"; no verdict, ledger, source or research in the turn.
- P3 pass: "I cannot start until you confirm it. ... Is this right, or what would you change?"; no verdict, ledger or research.
- P4 fail: the order is correct (Final position, Claim ledger, Decision record, Adversarial findings, Provenance), but the take-away carries unsourced, unlabelled facts: "The coordination evidence (C4) comes from open-source developers, who mostly have no manager" (no quote in C4 says open-source) and "Holds: some firms name efficiency and AI as reasons to widen spans" (no source).
- P5 pass: labels are Attribution, Accountable, Limitations, References; no "Verified:". The trailing "Decision for a person:" line follows a blank line as a separate statement, as the skill template shows; graded on that plain reading as outside the four-label set.

Triage: P4 skill fault. The skill forbids facts without a label only for load-bearing claims (SKILL.md step 1), and the model stated evidence details in the adversarial findings without a source; the skill does not extend the labelling rule to supporting detail in the findings.
