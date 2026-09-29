# sourced-lite case 2 (refresh, re-run 3 on fixed skill)

Skill commit FIXED-sourced-lite (third uncommitted edit on 7e9db4e: step 0 number-restatement example, take-away template and worked example carry ledger ids or labels on every fact). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/sourced-lite/.

**USER:** Open-plan offices increase face-to-face collaboration. I want to back this up for a proposal to move my team to open plan.

**ASSISTANT:**

Before I look at any evidence, I want to check I have your idea right.

**My reading of your idea, in its strongest form:**

- **The claim.** Moving a team from its current layout to an open-plan office leads to more face-to-face collaboration between team members than the team has now.
- **What you want.** You want to support a position. You plan to put a proposal to move your team to open plan, and you want evidence that holds up when someone checks it.
- **Who it is for.** I assume the reader is a manager or budget holder who approves the move. That person may also have to answer to team members who do not want the change.
- **What done looks like.** A position you can put in the proposal, with each claim labelled by where it came from. It also shows the strongest case against the move, and how the proposal deals with it.

**Gaps I cannot fill from your message:**

- What layout does your team have now: private offices, cubicles, or a hybrid or remote arrangement? The comparison changes the answer.
- What does "collaboration" mean for this team? It could mean more conversations, faster decisions, better quality work, or stronger relationships. These are measured differently.
- Is face-to-face collaboration the main goal of the move, or is cost or space also a reason?

One thing to know before we start: I will test the claim as well as support it. If the evidence shows the claim holds only in some conditions, I will tell you where it holds and where it does not. That way you can write a proposal that survives a challenge.

Is this right, or what would you change?

**USER:** Yes, that is right. The proposal goes to my manager next week.

**ASSISTANT:**

Thanks for confirming. You did not say what layout your team has now or what "collaboration" means for it, so I made the call: I assume the team now works in offices or cubicles, and I treat "collaboration" as the amount of face-to-face interaction. If either assumption is wrong, tell me and I will redo the parts it touches.

Here is the short version first. The best direct evidence goes against the claim as you wrote it. So I have written the position in a form that I think your manager will accept and that holds up if someone checks it.

## Final position

Moving a team to open plan does not reliably increase face-to-face collaboration. In the two before-and-after field studies I found, face-to-face interaction fell by about 70 per cent and electronic messages went up (C2). A proposal can still claim more collaboration if it puts the right people close together and adds designed spaces for working together, such as meeting areas with whiteboards (C4, C5), while keeping quiet space for focused work (C3). The claim to put in front of your manager is "seat the people who need each other together, and design for it", not "remove the walls" (C6, INFERRED).

## Claim ledger

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Moving your team to open plan will increase face-to-face collaboration (your original claim) | INFERRED | Tested against C2, C3, C4 and C5 | Fails as a general claim; holds in part (see findings) |
| C2 | In two companies that moved to more open offices, face-to-face interaction fell and electronic interaction rose | SOURCED | "the volume of face-to-face interaction decreased significantly (approx. 70%) in both cases, with an associated increase in electronic interaction" and "open architecture appeared to trigger a natural human response to socially withdraw from officemates and interact instead over email and IM" (Bernstein and Turban, 2018, abstract, via Harvard DASH record) | Holds |
| C3 | Open plan makes interaction feel easier, but people rate that gain as smaller than the loss of quiet and privacy | SOURCED | "Benefits of enhanced 'ease of interaction' were smaller than the penalties of increased noise level and decreased privacy resulting from open-plan office configuration." Data: occupant survey data from the Center for the Built Environment (Kim and de Dear, 2013, abstract, Macquarie University record) | Holds |
| C4 | Being located near each other makes groups much more likely to work together, most of all groups who would not otherwise find each other | SOURCED | "colocation increases the likelihood of joint research by 3.5 times, an effect that is mostly driven by lab pairs that face higher search costs ex ante" (Catalini, 2018, abstract, MIT DSpace record). The setting is research labs on one Paris campus, moved because asbestos was removed from buildings (Catalini, 2018, abstract as returned by search; full page not opened) | Holds in part (applies to an office team only by analogy) |
| C5 | Designed features in shared areas can raise interaction | SOURCED | One company found "open meeting areas with moveable whiteboards generated 50 percent more interactions than open meeting areas without them" (Harvard Gazette, 2019, section on what companies can do) | Holds (one company, reported in a news article) |
| C6 | Closeness to the right colleagues, plus designed spaces for working together, drives collaboration; removing walls on its own does not | INFERRED | From C2, C4 and C5 | Holds in part |
| C7 | Your team would react like the teams in C2 | INFERRED | No data on your team yet | Unresolved |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| What to compare open plan against | Offices or cubicles; hybrid or remote working | You did not say | Offices or cubicles | Hybrid or remote: if people are rarely in the same building, any shared office may add face-to-face time, which is a different question (INFERRED) | Your current layout. If the team works mostly remotely, C2 matters less |
| Which evidence to weight most | Before-and-after field studies of real moves (C2); satisfaction surveys (C3); campus co-location study (C4) | C2, C3, C4 | C2 carries most weight, because it measured behaviour before and after an actual move to open plan | C3 as the main evidence: it measures how people rate their space, not what they do. C4 as the main evidence: it is about labs on a campus, not an office floor | C2 covers two companies only (C2) |
| Keep the claim as written, or change it | Argue "open plan increases face-to-face collaboration"; argue "co-locate and design for collaboration" | C2, C4, C5, C6 | Change the claim | Keep it as written: the most direct evidence (C2) says the opposite, and a manager who searches for it will find that result | C6 is my inference, and it has not been tested on a team like yours |

## Adversarial findings

- **Strongest case against the move.** The only direct test I found of the exact claim, a move to open plan with face-to-face interaction measured before and after, found a drop of about 70 per cent in both companies (C2). People who rate their own space also say the easier interaction does not make up for the noise and lack of privacy (C3). If your proposal cites "open plan increases collaboration", the first reviewer who searches for it will probably find C2.
- **Against the research.** C2 covers two companies, and I could open only the abstract, not the full paper. C3 measures satisfaction, not behaviour. C4 studies research labs, not a single team on one floor. C5 is one company, reported in a news article. The evidence is thin on every side, but the direct evidence all points the same way.
- **A rival explanation.** Open plan may remove the walls that stopped people talking, but it also removes the privacy that made people willing to talk. On that reading, people speak less when everyone can hear them, so they send messages instead (C2). That fits C3 too.

One line per ledger row:

- C1 holds in part. Holds: where the move also seats people who need each other side by side and adds shared spaces designed for working together (C4, C5, INFERRED). Fails: as a general effect of removing walls, where face-to-face interaction fell by about 70 per cent (C2). Instead: a move to open plan, on its own, tends to replace talking with email and messages (C2).
- C2 would be false if: a larger set of before-and-after moves to open plan showed face-to-face interaction rising or staying the same.
- C3 would be false if: people in open plan rated the gain in ease of interaction as larger than the loss of quiet and privacy, in a similar survey.
- C4 holds in part. Holds: research labs on one campus, where finding a collaborator was the main barrier (C4). Fails: it does not test a move from walls to open plan, so it cannot support C1 directly. Instead: it supports putting the right people near each other, whatever the layout (C6, INFERRED).
- C5 would be false if: other workplaces added whiteboards to open meeting areas and saw no rise in interaction.
- C6 holds in part. Holds: it fits C2, C4 and C5 together. Fails: no study I found tests the full combination on a team like yours. Instead: treat C6 as a design to trial, not a proven result.
- C7 unresolved. Would be settled by: measuring your team's face-to-face interaction before a change and again after a trial (not used in the final position).

**Integration move: reframe.** Both "open plan brings people together" and "open plan drives people apart" share one hidden assumption: that removing walls is the way to bring people close. Drop that assumption and the argument goes away. Closeness comes from who sits near whom (C4) and what the shared spaces invite people to do (C5). Walls, or a lack of them, are a separate choice about noise and privacy (C3).

## Provenance

Attribution: Drafted by an AI assistant for the proposal author, from sources retrieved in this session.
Accountable: [name to confirm]
Limitations: I read the abstracts and summaries of C2, C3 and C4, not the full papers, so I cannot state their sample sizes or methods. The 70 per cent drop (C2) comes from two companies, so your team may differ (C7). If your team works mostly remotely now, this analysis compares the wrong layouts and needs redoing.
References:
Bernstein, E. S., & Turban, S. (2018). The impact of the 'open' workspace on human collaboration. Philosophical Transactions of the Royal Society B: Biological Sciences, 373(1753), 20170239. https://doi.org/10.1098/rstb.2017.0239
Catalini, C. (2018). Microgeography and the direction of inventive activity. Management Science, 64(9), 4348–4364. https://doi.org/10.1287/mnsc.2017.2798
Harvard Gazette. (2019, November). Why open offices hurt collaboration and what can be done about it. Harvard University. Retrieved September 29, 2026, from https://news.harvard.edu/gazette/story/2019/11/why-open-offices-hurt-collaboration-and-what-can-be-done-about-it/
Kim, J., & de Dear, R. (2013). Workspace satisfaction: The privacy-communication trade-off in open-plan offices. Journal of Environmental Psychology, 36, 18–26. https://doi.org/10.1016/j.jenvp.2013.06.007

Decision for a person: whether to propose a move to open plan, or a co-location and collaboration-space design, after checking the team's current layout and how much face-to-face interaction it has now.

## Next

1. **Owner: you. This week:** write down the team's current layout and one simple baseline, such as how many face-to-face working conversations happen in a typical week. **Result:** C7 has data behind it, and the proposal compares against your real starting point.
2. **Owner: you, then your manager. This week:** reframe the proposal as "seat the people who need each other together, and design shared spaces for working together, with quiet space kept", and say openly that the study on open plan (C2) found a drop. Name the person accountable for the decision before it goes to your manager next week. **Result:** your manager sees the counter-evidence from you, not from a reviewer.
3. **Owner: you. After any change:** propose a time-boxed trial and measure face-to-face interaction against the baseline. The main claim would be false if face-to-face interaction falls and messages rise, as they did in C2. You would see it in fewer conversations at desks and more chat and email traffic. **Result:** you learn whether your team follows C2 or the design in C6.

For a deeper check of hidden assumptions, you may also like a skill for blind spots, if you have one.

## Grading
- P1 pass: restates "Moving a team from its current layout to an open-plan office leads to more face-to-face collaboration" and ends "Is this right, or what would you change?" with no research or verdict.
- P2 pass: C1 status "Fails as a general claim; holds in part".
- P3 pass: "C1 holds in part. Holds: where the move also seats people who need each other side by side ... Fails: as a general effect of removing walls ... Instead: a move to open plan, on its own, tends to replace talking with email and messages (C2)."
- P4 pass: each row with status Holds (C2, C3, C5) has a "would be false if" line.
- P5 pass: C2, C3, C4, C5 are SOURCED with quotes and locators (abstract records, Harvard Gazette section); INFERRED rows C1, C6, C7 are not labelled SOURCED.
