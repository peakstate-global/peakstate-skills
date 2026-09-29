# sourced-lite case 2 (refresh, re-run on fixed skill)

Skill commit FIXED-sourced-lite (uncommitted edit on 7e9db4e). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/.

**USER:** Open-plan offices increase face-to-face collaboration. I want to back this up for a proposal to move my team to open plan.

**ASSISTANT:**

Before I look at any evidence, here is how I read what you want. Please check it.

**The claim, in its strongest form:** Moving your team into an open-plan layout will increase how often team members talk and work together face to face, and that extra contact is a good reason to make the move.

**What you want:** To support a position. You have a proposal to move your team to open plan, and you want evidence behind this claim so the proposal can rely on it.

**Who it is for:** My best guess is the person or group who approves the move, such as your manager, a facilities or property team, or a leadership group. You have not said who, so I am assuming a decision-maker who will read the proposal and may push back on it.

**What done looks like:** A final position on the claim that you can put in the proposal, with each supporting claim labelled by where it came from, the strongest case against it, and a short provenance block saying what is and is not backed.

**Gaps I can see:**

- Who reads the proposal, and what they care about most (cost, output, culture, space).
- What your team does now. For example, are they in private offices, cubicles, or split across floors or sites, and how much of their work needs close collaboration versus focused solo work?
- Whether "face-to-face collaboration" is the end goal, or a means to something else, such as faster decisions or better ideas.
- One thing to know up front: I will test the claim, not only look for support. If the evidence points the other way in some settings, I will show you where it holds and where it does not, so the proposal does not rest on a claim a sceptical reader can knock over.

Is this right, or what would you change?


**USER:** Yes, that is right. The proposal goes to my manager next week.

**ASSISTANT:**

Thanks. Here is the result. The short version: the evidence does not back this claim, and in the best-measured cases it points the other way. I would not put it in the proposal as written.

## Final position

Moving a team into open plan does not reliably increase face-to-face collaboration: in the two field studies that measured it directly with sensors, moving from cubicles to open plan cut face-to-face time by about 70% and pushed people onto email and instant messaging. The claim can only hold for a team that is currently physically apart (split across floors or sites), and that case is not tested by the evidence here. If the proposal needs a collaboration argument, it should rest on bringing people closer, with quiet space designed in, and not on removing walls.

## Claim ledger

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Open-plan offices increase face-to-face collaboration (your claim) | INFERRED | From C2, C3, C4 and C5 | Fails |
| C2 | In two companies that moved from cubicles to open plan, face-to-face interaction fell by about 70% | SOURCED | "Contrary to common belief, the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases, with an associated increase in electronic interaction." Study 1: "the 52 participants now spent 72% less time interacting F2F." Study 2: "The 100 employees ... spent between 67% ... and 71% ... less time interacting F2F." (Bernstein & Turban, 2018, abstract and Results of Study 1 and Study 2; full text via Europe PMC, PMC6030579) | Holds |
| C3 | Electronic messaging rose after the move, so contact shifted channel instead of growing | SOURCED | Study 1: "participants collectively sent 56% (66) more emails ... IM message activity increased by 67%". Study 2: "they emailed each other between 22% ... and 50% ... more." (Bernstein & Turban, 2018, Results) | Holds |
| C4 | A well-designed open-plan office can produce good communication outcomes | SOURCED | "Positive outcomes relating to aesthetics, collegiality, and communication were achieved through good technical design and thoughtful ergonomic assessment of the needs of employees and the requirements of their tasks." One law firm, surveyed 6 and 14 months after the move, 24 interviews. (Morrison & Smollan, 2020, abstract) | Holds in part |
| C5 | People talk more face to face with colleagues who sit physically closer | SOURCED | "repeated studies have shown that people talk more to those who are physically closer to them", but in their own data "the effect of physical distance on F2F interaction is small ... relative to that of openness." (Bernstein & Turban, 2018, Study 2 Results) | Holds in part |
| C6 | The drop in face-to-face contact came with lower productivity | SOURCED | "OpenCo1 executives reported to us qualitatively that productivity, as defined by the metrics used by their internal performance management system, had declined after the redesign" (Bernstein & Turban, 2018, Study 1) | Holds in part |
| C7 | For a team now split across floors or sites, open plan in one space would raise face-to-face contact | INFERRED | From C5 only. No study retrieved in this session measured this case | Unresolved |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which evidence to weight most | Sensor-measured before/after field studies; occupant surveys and interviews; press summaries | C2, C3, C4 | Sensor-measured before/after studies (C2, C3) as the main test, the survey study (C4) as the counter-case | Surveys, because they measure how people feel about communication, not how much it happens; press summaries, because they repeat the same study with drifting numbers | Both sensor studies were large corporate headquarters moving from cubicles, which may not match your team |
| What "collaboration" means in the final position | Any contact, including email and chat; face-to-face contact only | C3 | Face-to-face contact, because that is the claim in your proposal | "Any contact", because email rose, so the claim would be rescued only by changing what it says | Your manager may care about total contact, not face-to-face |
| How to treat the case of a team now split apart | Treat it as supported; treat it as unresolved | C5, C7 | Unresolved, kept out of the final position | "Supported", because the only evidence is a general proximity effect that the main study found to be small | Your team's current layout is not known yet (you have not said) |

## Adversarial findings

- Strongest case against the conclusion: the sensor studies looked at two Fortune 500 headquarters moving from cubicles, where people already sat about 2 m apart. Your team may be in private offices or on different floors, where removing distance could matter more than removing walls. The badges also count minutes of contact, not whether that contact was useful.
- Against the research: the case against open plan rests mainly on one research team across two companies. The main counter-case (C4) is one law firm, self-reported, with no before-and-after count of contact. Neither side has a large, varied sample, and I found no retrieved study measuring face-to-face contact before and after a move from separate floors or sites.
- A rival explanation for the same facts: people may have moved conversations to meeting rooms or away from badge range, rather than stopped talking. The study reports robustness checks on the sensor settings, but I did not find a check for this in what I read.

One line per ledger row:

- C1 fails. Holds: possibly for a team moving from separate floors or sites into one space, and in open plan designed around the team's tasks (C4, C7). Fails: for a move from cubicles to open plan, where face-to-face time fell about 70% in both measured cases (C2). Instead: in that region, contact shifts to email and messaging (C3), so open plan does not deliver more face-to-face collaboration.
- C2 would be false if: a comparable sensor-measured study of a cubicle-to-open move found face-to-face time flat or rising.
- C3 would be false if: server logs in the same studies showed email and messaging flat or falling after the move.
- C4 holds in part. Holds: people in a carefully designed open plan can report good communication and collegiality. Fails: it does not show more face-to-face contact than before, because there is no before-and-after measure and the data is self-report from one firm. Instead: it supports "design decides the outcome", not "open plan increases contact".
- C5 holds in part. Holds: nearer desks do mean somewhat more face-to-face contact. Fails: the effect is small next to the effect of openness in the one study that measured both. Instead: bringing people closer may help a little, and removing walls can outweigh it.
- C6 holds in part. Holds: one company's executives reported lower productivity after the move. Fails: this is a qualitative internal report from one company, not a measured result. Instead: treat it as a warning sign, not evidence.
- C7 unresolved. Would be settled by: a before-and-after measure of face-to-face contact in a team moved from separate floors or sites into one open space, or a trial with your own team. Not used in the final position.

## Provenance

Attribution:  Prepared by you with help from an AI assistant, which searched for and read the sources in this session.
Accountable:  [name to confirm]
Limitations:  The strongest evidence comes from two large corporate headquarters moving from cubicles, so it may not match a team in private offices or split across sites. The main counter-case is one law firm's self-reported survey. No retrieved study tested the split-team case (C7).
References:
  Bernstein, E. S., & Turban, S. (2018). The impact of the 'open' workspace on human collaboration. Philosophical Transactions of the Royal Society B: Biological Sciences, 373(1753), Article 20170239. https://doi.org/10.1098/rstb.2017.0239
  Morrison, R. L., & Smollan, R. K. (2020). Open plan office space? If you're going to do it, do it right: A fourteen-month longitudinal case study. Applied Ergonomics, 82, Article 102933. https://doi.org/10.1016/j.apergo.2019.102933

Decision for a person: whether the proposal keeps "more face-to-face collaboration" as a reason for the move, after checking where your team sits now and whether they are moving from cubicles or from separate offices, floors or sites.

## Next

1. Owner: you. First action this week: write down where each team member sits now and how often they need to work together in person. Observable result: you know whether your team is in the "cubicles to open" region (where the claim fails) or the "split apart" region (unresolved).
2. Owner: you, once you confirm who is accountable for the proposal. First action this week: take the decision above to that person, with the rewritten collaboration claim. Observable result: the proposal to your manager no longer rests on a claim the evidence contradicts.
3. Owner: you. First action this week: add a before-and-after check to the proposal, such as counting in-person working sessions for two weeks before and after the move. Observable result: if in-person sessions fall after the move, the main claim is false for your team, and you see it in your own count.

For a deeper check of hidden assumptions in the proposal, you may also like a skill for blind spots, if you have one.

## Grading
- P1 pass: first reply restates the claim ("Moving your team into an open-plan layout will increase how often team members talk and work together face to face") and ends "Is this right, or what would you change?", with no research or verdict. The guessed audience is labelled "My best guess".
- P2 pass: C1 "Open-plan offices increase face-to-face collaboration (your claim)" has the status "Fails".
- P3 pass: "C1 fails. Holds: possibly for a team moving from separate floors or sites into one space ... Fails: for a move from cubicles to open plan ... Instead: in that region, contact shifts to email and messaging (C3)".
- P4 pass: the surviving rows C2 and C3 each have a "would be false if" line, for example "C2 would be false if: a comparable sensor-measured study of a cubicle-to-open move found face-to-face time flat or rising."
- P5 fail: under the plain reading every SOURCED row (C2 to C6) has a quote and a locator, and no unretrieved claim is labelled SOURCED. The strict rule fails it: "the sensor studies looked at two Fortune 500 headquarters moving from cubicles, where people already sat about 2 m apart". "Fortune 500" and "2 m apart" appear in no ledger quote and carry no label. "The study reports robustness checks on the sensor settings" is also unquoted and unlabelled.

Triage:
- P5 skill fault: SKILL.md step 1 forbids study details that are outside the quotes and have no label, but the self-check list does not repeat the rule, so the model does not catch the details in the adversarial findings.
