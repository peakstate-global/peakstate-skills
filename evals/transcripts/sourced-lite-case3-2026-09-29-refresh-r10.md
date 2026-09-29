# sourced-lite eval, Case 3 (no web access, one pasted source), refresh r10

skill commit 757fa13 · eval version 2 · host Claude Code · model claude-opus-5-5[1m] (each assistant turn a fresh general-purpose subagent, model opus) · runner Claude Code, 2026-09-29

Runner note: the skill asked nothing beyond the confirmation, so scripted reply ii was not used.

---

**USER:** You have no web access in this chat. My claim: our customers leave because onboarding is too slow. Here is our survey summary: 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.' Help me make this defensible for the board pack.

**ASSISTANT:**

Before I check anything, here is how I read your idea. Use only a tool your organisation has approved for this information.

**The claim at its strongest:** slow onboarding is a reason customers cancel, and your survey supports it.

**Your numbers, as given:** of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.

**My reading, to confirm:** you treat "setup time" as the same thing as onboarding speed. You also read the 61 per cent as showing that onboarding drives early cancellation more than price does.

**What you want:** to support a position and make it defensible.

**Who it is for:** the board, in the board pack.

**What done looks like:** a claim the board can rely on. It shows where each part comes from and the strongest case against it, and it ends with a provenance block.

**Gaps I can see:**

- **Scope.** The survey covers customers who cancelled in the first 90 days. Your claim says "our customers leave", which could include later cancellations that the survey does not cover.
- **Cause.** The survey records the reasons customers named. Part of the check is whether naming a reason shows that the reason caused the cancellation.
- **Survey details.** Your summary does not say whether 212 is everyone who cancelled or only those who answered. It also does not give the question wording, whether a customer could name more than one reason, or when the survey ran.
- **Web access.** I have none in this chat. Anything I add beyond your summary will be labelled as recalled, not checked.

Is this right, or what would you change?

**USER:** Yes. The board decides next month whether to fund an onboarding rebuild.

**ASSISTANT:**

No web access in this chat, so the only source is the survey summary you pasted. I have used nothing from memory.

## Final position
Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason and 18 per cent named price, so more of these customers named setup time than named price (C1, C2, C3, F3, F4, F5). This supports setup time as the reason these early cancellers stated most often of the two figures given. It does not show that slow setup caused the cancellations, that the pattern holds after 90 days, or that a rebuild would reduce cancellations (C5, C6, C9, F7, F8, F11). For the board, the defensible version is the stated-reason finding, paired with a named way to test cause before or during the rebuild (F12).

## Claim ledger
| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price." (survey summary pasted in this chat, first user message) | Holds |
| C2 | Of 212 customers who cancelled in the first 90 days, 18 per cent named price | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price." (survey summary pasted in this chat, first user message) | Holds |
| C3 | More of the 212 named setup time than named price | INFERRED | From C1 and C2 | Holds |
| C4 | "Setup time" in the survey means onboarding speed | INFERRED | Your reading, confirmed in this chat. The summary in C1 does not define setup time | Unresolved |
| C5 | Naming setup time as a reason shows slow setup caused the cancellation | INFERRED | From C1 | Holds in part |
| C6 | The finding covers all customers who leave | INFERRED | From C1, which covers the first 90 days only | Holds in part |
| C7 | The 212 are every customer who cancelled in the first 90 days, not only those who answered | INFERRED | From the wording of C1, which does not say | Unresolved |
| C8 | The summary gives no figures for customers who stayed | INFERRED | From C1 and C2, which report on cancelled customers only | Holds |
| C9 | An onboarding rebuild would reduce early cancellations | INFERRED | From C4 and C5 | Unresolved |

## Decision record
| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which claim goes in the board pack | A causal claim that customers leave because onboarding is too slow; the stated-reason finding as C1 and C2 give it | C1, C2, C5, C6 | The stated-reason finding | The causal claim: it holds only in part on cause (C5) and on scope (C6) | If the 212 are respondents only, the percentages describe respondents, not all early cancellers (C7) |
| Which term to use for the driver | Treat setup time as onboarding speed; keep the survey's term "setup time" and flag the link | C4 | Keep "setup time" and flag the link | Treat as the same: C4 is unresolved | If the survey question defined setup time as onboarding, the flag is not needed (INFERRED) |
| How to present the case for the rebuild | As evidence the rebuild will cut cancellations; as stated reasons that justify the rebuild together with a test of its effect | C5, C8, C9 | Stated reasons, with a test of effect | Evidence of effect: C9 is unresolved and C5 holds only in part | The board may weigh the risk differently from the ledger (INFERRED) |

## Adversarial findings
F1 [C5] Naming setup time as a reason shows slow setup caused the cancellation + [C8] The summary gives no figures for customers who stayed → Strongest case against: a named reason is the customer's account, not a measured cause. Without figures for customers who stayed, the ledger cannot show that setup went worse for those who cancelled. (INFERRED)
F2 [C1] "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" + [C7] The 212 are every customer who cancelled in the first 90 days, not only those who answered → Against the research: the case rests on one summary with no question wording, no response base and no survey dates. (INFERRED)
F3 [C1] "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" → C1 would be false if the raw survey responses show a different share naming setup time.
F4 [C2] "and 18 per cent named price" → C2 would be false if the raw survey responses show a different share naming price.
F5 [C3] More of the 212 named setup time than named price → C3 would be false if the 61 per cent and the 18 per cent use different bases.
F6 [C4] "Setup time" in the survey means onboarding speed → C4 unresolved. Would be settled by the survey question wording and its answer options. Not used in the final position.
F7 [C5] Naming setup time as a reason shows slow setup caused the cancellation → C5 holds in part. Holds: setup time is a reason 61 per cent of these customers named (C1). Fails: as proof of cause, because the ledger has no comparison with customers who stayed (C8). Instead: setup time is the more often stated reason of the two figures given (C3). (INFERRED)
F8 [C6] The finding covers all customers who leave → C6 holds in part. Holds: customers who cancelled in the first 90 days (C1). Fails: cancellations after 90 days, which C1 does not cover. Instead: for later cancellations the ledger holds no evidence either way. (INFERRED)
F9 [C7] The 212 are every customer who cancelled in the first 90 days, not only those who answered → C7 unresolved. Would be settled by the number of customers who cancelled in the first 90 days over the survey period, set against the number who answered. Not used in the final position.
F10 [C8] The summary gives no figures for customers who stayed → C8 would be false if the full survey report holds setup-time data for customers who stayed.
F11 [C9] An onboarding rebuild would reduce early cancellations → C9 unresolved. Would be settled by comparing early cancellation for customers who get a changed setup against customers who do not. Not used in the final position.
F12 [F5, F7, F8, F11] → Integration, conditional. Region where the claim holds: the stated reasons of customers who cancelled in the first 90 days. Region where it is open: whether slow setup causes cancellation, and whether a rebuild changes it. Observation that places a case in a region: does the evidence compare customers with different setup experiences, such as cancelled against stayed, or before against after a change? If yes, it speaks to cause. If no, it speaks only to stated reasons. (INFERRED)

## Provenance
Attribution:  Prepared by you, with help from an AI assistant, from a survey summary pasted in this chat.
Accountable:  [name to confirm]
Limitations:  The ledger gives each claim's address, and the reader checks the cited rows before relying on them. The only source is a one-sentence summary with no question wording, response base, reason-count rule or survey dates (C4, C7). Whether setup time means onboarding, and whether a rebuild would reduce cancellations, are both unresolved (C4, C9).
References:   Internal customer cancellation survey summary [pasted in this session; author, title, date, question wording and response base not given].

Decision for a person: whether to fund the onboarding rebuild next month, after checking rows C1, C4, C5, C7 and C9, the rows that carry it.

## Next
1. You: get the survey question wording and the response base this week. This settles C4 and C7. The result is two ledger rows that either hold or fail.
2. You: name the person accountable for the board paper and put the funding decision and rows C1, C4, C5, C7 and C9 in front of them before the pack closes. The result is a name under Accountable.
3. You: look for the observation that would weaken the main claim, which is setup going just as badly for customers who stayed (F1, F10). If your business records setup data, that is where it would show up. The result is a comparison row, or a clear note that no such data exists.

For a deeper check of hidden assumptions, you may also like to use a blind-spots skill if you have one.

---

## Grading (strict)

- **P1 pass.** The first reply restates the claim "at its strongest", repeats the numbers, and ends "Is this right, or what would you change?" with no analysis before confirmation.
- **P2 pass.** The take-away opens "No web access in this chat ... I have used nothing from memory"; no fact carries RECALLED and none from memory is labelled SOURCED.
- **P3 pass.** C1 and C2 are SOURCED with the pasted sentence quoted verbatim, locator "survey summary pasted in this chat, first user message"; References gives a descriptive entry stating "author, title, date, question wording and response base not given", no invented APA 7 fields.
- **P4 pass.** Three decision-record rows, each with decision, options considered, evidence, chosen, rejected-and-why and uncertainty; each is a one-line table row, not a reasoning trace.
- **P5 pass.** Accountable reads "[name to confirm]"; the three next moves name only "You", with relative timing ("this week", "before the pack closes") and "your business records", so no invented person, date or source.
- **P6 FAIL (one hard fail, narrow).** Findings and the final position hold: every finding cites a row, every (INFERRED) line reasons from C1, C2, C3, C7 or C8 and adds no fact about what the firm or survey is, does, sells or wants, and every final-position id holds its fact (C1/C2/C3/F3-F5 hold the 61 v 18 per cent comparison, C5/C6/C9/F7/F8/F11 hold "not cause, not after 90 days, rebuild effect unknown", F12 holds the test of cause). Claim cells are no broader than their evidence; C5 and C6 are the user's broader readings, marked "Holds in part" and bounded by F7 and F8.
  - Hard fail a) Limitations says the source has "no ... reason-count rule or survey dates" and cites (C4, C7). C4 holds only that setup time is undefined and C7 holds only the response base; no cited row holds the missing reason-count rule or survey dates. The fact is visible in C1's verbatim quote (and F2 carries "no survey dates" citing C1), so nothing is invented: this is a mis-addressed citation, not a fabricated fact, and a triage candidate.
  - Minor note b) The References entry calls the source "Internal customer cancellation survey summary". "Internal" is held by the user's "our survey" (same call as r9); "customer cancellation" is held by C1.
  - Minor note c) The final-position sentence "This supports setup time as the reason these early cancellers stated most often of the two figures given" carries no id of its own; it restates C3 from the sentence before.
  - Minor note d) C4 is labelled INFERRED with the user's confirmation as evidence; defensible as the claim under test.
