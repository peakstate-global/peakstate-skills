# sourced-lite, Case 3: no web access, one pasted source (run r11b)

- Skill: sourced-lite, skill commit 757fa13 (~/LOCAL-DEV/peakstate-skills/skills/sourced-lite/)
- Eval version: 2
- Arm: B (fresh-context checker loop, at most two fix loops)
- Host: Claude Code
- Model: claude-opus-5-5 (runner); writer and checker subagents: general-purpose, model opus
- Date: 2026-09-29
- Each assistant turn and each fix ran in a fresh writer subagent with the skill instruction and no web access. Each checker ran fresh and saw only the drafted take-away.

---

## USER (opening, verbatim)

You have no web access in this chat. My claim: our customers leave because onboarding is too slow. Here is our survey summary: 'Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price.' Help me make this defensible for the board pack.

## ASSISTANT (turn 1, fresh writer)

The strongest version of your claim is that slow onboarding drives early cancellations. You want to support it for a board pack.

Your survey summary says: "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price."

My reading, to confirm: you take "setup time" to mean onboarding speed. You also read the 61 per cent figure as the main reason customers leave.

Here is how I understand the task:

- **What you want:** support a position. The position is that onboarding speed causes early churn.
- **Who it is for:** the board, who will rely on the claim when they decide what to fund or fix.
- **What done looks like:** one board-ready position, with each claim labelled by where it comes from. You also get the strongest case against it, what survives that case, and a provenance block.

There are three gaps I can see:

- **Scope.** Your survey covers customers who cancelled in the first 90 days. Your claim is about "our customers" in general. I would state the claim only for that 90-day group unless you have data on later cancellations.
- **Survey details.** The summary does not say whether customers could name more than one reason, how many cancelling customers were asked, or how many answered.
- **Research.** I have no web access in this chat. Your pasted summary is the only source I can cite. Anything I add from memory will be labelled as recalled and not checked.

If the survey data is sensitive, use only a tool your organisation has approved for this information.

Is this right, or what would you change?

## USER (scripted reply i)

Yes. The board decides next month whether to fund an onboarding rebuild.

---

## RUNNER: checker loop (applied to assistant turn 2, the take-away)

### Draft 1 (fresh writer)

## Final position

Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason and 18 per cent named price. That makes setup time the more-named of the two reasons the summary reports for this group (C1, C2, C3, F3, F4, F10). The survey shows what these customers said. It does not show what caused them to cancel, and it says nothing about customers who stayed or who cancelled later (C3, F1, F2, F11). For the board's funding decision, the survey supports onboarding as the lead candidate to act on, but it does not prove that a rebuild will reduce cancellations (C5, F13).

## Claim ledger

I have no web access in this chat. Every SOURCED row comes from text you pasted or wrote in this chat, and there are no RECALLED rows.

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" (survey summary pasted in this chat, first clause) | Holds |
| C2 | Of 212 customers who cancelled in the first 90 days, 18 per cent named price | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price." (survey summary pasted in this chat, full sentence) | Holds |
| C3 | The summary covers only customers who cancelled in the first 90 days, and reports two reasons, setup time and price | SOURCED | The summary describes 212 customers who cancelled in the first 90 days and gives shares for setup time and price only (paraphrase) (survey summary pasted in this chat, full sentence) | Holds |
| C4 | For this claim, "setup time" means onboarding speed | SOURCED | You confirmed my reading that setup time means onboarding speed (paraphrase) (your reply in this chat) | Holds, as your working definition |
| C5 | The board decides next month whether to fund an onboarding rebuild | SOURCED | "The board decides next month whether to fund an onboarding rebuild." (your reply in this chat) | Holds |
| C6 | Customers who named setup time meant onboarding speed | INFERRED | From C1 and C4 | Unresolved |
| C7 | The 212 represent all customers who cancelled in the first 90 days, and each customer's answer counts once per reason | INFERRED | From C3. The summary does not say how many customers were asked, how many answered, or whether a customer could name more than one reason | Unresolved |
| C8 | Setup time is the main reason customers cancel in the first 90 days | INFERRED | From C1, C2 and C3 | Holds in part |
| C9 | Customers leave because onboarding is too slow | INFERRED | Your claim, tested against C1, C3 and C6 | Holds in part |
| C10 | A faster onboarding would reduce cancellations in the first 90 days | INFERRED | From C1, C6 and C9 | Unresolved |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which customers the claim covers | All customers; customers who cancelled in the first 90 days | C3 | Customers who cancelled in the first 90 days | All customers: C3 covers only the 90-day group | Customers who cancel later may name different reasons (INFERRED) |
| Whether the claim states a cause or a stated reason | "Customers leave because onboarding is too slow"; "61 per cent of 212 early cancellers named setup time as a reason" | C1, C9, C10 | Stated reason | Cause: C1 records a reason customers named, and C10, the only row about effect, is unresolved | If a test resolves C10, the cause wording could return (INFERRED) |
| What "setup time" means | Onboarding speed, your definition; the survey's own wording | C4, C6 | Onboarding speed, with the survey wording flagged as open | Survey wording: the ledger holds only the words "setup time" (C3) | C6 stays unresolved until the question wording is checked |

## Adversarial findings

F1 [C9] Customers leave because onboarding is too slow + [C1] "61 per cent named setup time as a reason" → Strongest case against: a named reason records what cancelling customers said, not what caused them to cancel. A customer who left for another reason could still name setup time. (INFERRED)

F2 [C3] The summary covers only customers who cancelled in the first 90 days → Against the research: with no data on customers who stayed, the ledger cannot show whether setup time separates customers who cancel from customers who stay. (INFERRED)

F3 [C1] "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" → C1 holds. It would be false if the raw survey responses give a share other than 61 per cent of 212.

F4 [C2] "and 18 per cent named price" → C2 holds. It would be false if the raw survey responses give a share other than 18 per cent for price.

F5 [C3] The summary covers only customers who cancelled in the first 90 days, and reports two reasons → C3 holds. It would be false if the full survey report covers other customer groups or lists more reasons.

F6 [C4] For this claim, "setup time" means onboarding speed → C4 holds as your working definition. It would be false if you revise the definition.

F7 [C5] "The board decides next month whether to fund an onboarding rebuild." → C5 holds. It would be false if the board's decision or its timing changes.

F8 [C6] Customers who named setup time meant onboarding speed → C6 unresolved. Would be settled by the exact survey question and answer options, or free-text answers, for setup time. Not used in the final position.

F9 [C7] The 212 represent all customers who cancelled in the first 90 days → C7 unresolved. Would be settled by the total number of customers who cancelled in the first 90 days, how many were asked, how many answered, and whether a customer could name more than one reason. Not used in the final position.

F10 [C8] Setup time is the main reason customers cancel in the first 90 days + [C1] "61 per cent named setup time as a reason" + [C2] "and 18 per cent named price" + [C3] reports two reasons → C8 holds in part. Holds: of the two reasons the summary reports, setup time was named by 61 per cent and price by 18 per cent. Fails: C3 reports only two reasons, so the ledger cannot show that setup time leads among all reasons. Instead: setup time was named by a larger share of the 212 than price. (INFERRED)

F11 [C9] Customers leave because onboarding is too slow + [C1] "61 per cent named setup time as a reason" + [C3] covers only customers who cancelled in the first 90 days → C9 holds in part. Holds: 61 per cent of 212 customers who cancelled in the first 90 days named setup time as a reason. Fails: for customers outside the 90-day group (C3), and as a cause (F1). Instead: setup time is a reason that 61 per cent of the 212 early cancellers named. (INFERRED)

F12 [C10] A faster onboarding would reduce cancellations in the first 90 days → C10 unresolved. Would be settled by comparing 90-day cancellation rates for customers who get a faster setup with rates for customers who do not. Not used in the final position.

F13 [F1, F2, F10, F11, F12] → Integration, conditional and level shift. The claim works at two levels. The first level is what early cancellers say, and the survey supports it. The second level is what changes cancellation behaviour, and no row tests it. The first level does not reduce to the second, because a stated reason can be named without being the cause. Region where the rebuild case holds: customers who cancel in the first 90 days, where "setup time" in the survey refers to onboarding. Observation that places a case in that region: the survey question wording (C6), and then a comparison of 90-day cancellation rates with and without a faster setup (C10). (INFERRED)

## Provenance

Attribution:  An AI assistant drafted this from the survey summary and replies you gave in this chat. No web search or other source was used.
Accountable:  [name to confirm]
Limitations:  The only survey evidence is a one-sentence summary. It does not say how many customers were asked or answered, or whether a customer could name more than one reason (C3, C7). What "setup time" meant to respondents is unresolved (C6). No row tests whether a faster onboarding reduces cancellations (C10). The ledger gives each claim's address, and the reader checks the cited rows before relying on them.
References:   Internal customer cancellation survey summary [pasted in this session; author, title, date, question wording and number surveyed not given].
              Your messages in this chat [the claim, the confirmation of the restatement, and the board decision; not a published source].

Decision for a person: whether the board pack presents the survey as evidence for funding the onboarding rebuild, after checking rows C1, C3, C6 and C7, the rows that carry it.

## Next

1. **You:** this week, get the exact survey question and answer options for setup time, the number of customers asked and answered, and whether customers could pick more than one reason. Result: C6 and C7 move from unresolved to holds or fails.
2. **You:** once a person is named under Accountable, put that person in front of the funding decision with rows C1, C3, C6 and C7. Result: that person approves the stated-reason wording, or asks for the cause wording to be tested first.
3. **You:** watch for the observation that would make the main claim false: customers who stayed naming setup time as a problem at a similar share, or 90-day cancellation rates not moving when setup gets faster. It would show up in a survey of current customers or in 90-day cancellation data split by setup speed.

If you want a deeper check of hidden assumptions, and you have a skill for blind spots, you may also like to run it on this.

### Checker 1 (fresh checker, saw only Draft 1): 11 issues

| # | Phrase | Where | Cited id | Why |
|---|---|---|---|---|
| a) | "it does not prove that a rebuild will reduce cancellations" | Final position | C5, F13 | C5 holds only that the board decides next month whether to fund a rebuild. The effect claim is C10 (INFERRED, Unresolved), and C10 is not cited. F13 is a finding, not a ledger row. |
| b) | "It does not show what caused them to cancel" | Final position | C3, F1, F2, F11 | C3 holds only the group and the two reasons. No C row holds the stated-reason versus cause distinction. That distinction lives only in F1, which is INFERRED. C9 and C10 are the cause rows, and neither is cited. |
| c) | "supports onboarding as the lead candidate" | Final position | C5, F13 | Linking setup time to onboarding needs C4 or C6, and neither is cited here. C6 is Unresolved. The survey rows (C1 to C3) say "setup time", not "onboarding". |
| d) | Numbers and scope cited to F3, F4, F10, F1, F2, F11, F13 | Final position | F ids | These are finding ids, not ledger rows. The facts next to them are in C1 to C3, which are also cited. The F ids add no ledger source. |
| e) | "each customer's answer counts once per reason"; "The 212 represent all customers who cancelled in the first 90 days" | C7 claim cell | C3 | C3 does not contain either fact. C7's own evidence cell says the summary is silent on this. The row is labelled INFERRED and Unresolved, so it is flagged but not asserted. |
| f) | "Setup time is the main reason customers cancel" | C8 claim cell | C1, C2, C3 | "Main reason" among all reasons goes beyond C3, which reports two reasons only. F10 concedes this. The row is labelled "Holds in part". |
| g) | "Your claim" (C9, "Customers leave because onboarding is too slow") | C9 evidence cell | none | This names a source type (the user's message), but the row is labelled INFERRED. No SOURCED row quotes the user saying it, and the same sentence appears as a quoted option in the decision record without a source row. |
| h) | "the only survey evidence is a one-sentence summary ... how many customers were asked or answered, or whether a customer could name more than one reason" | Provenance, Limitations | C3, C7 | C7 holds these gaps and C3 does not. The "one-sentence" scope is only implied by the "full sentence" locators in C2 and C3. |
| i) | "Internal customer cancellation survey summary" | Provenance, References | none | "Internal" is a source type that no ledger row records. The ledger says only "survey summary pasted in this chat". |
| j) | "the claim, the confirmation of the restatement" | Provenance, References | none | No SOURCED row records the user's claim (see g). C4 records a confirmed "reading" of setup time, not a "restatement" of the claim. |
| k) | "whether the board pack presents the survey" | Provenance, Decision for a person | C1, C3, C6, C7 | "Board pack" is an artefact that no ledger row names. C5 says only that the board decides on funding. |

(Checker note: the falsifier conditions in F3, F5 and F8 describe hypothetical checks and were not flagged.)

### Draft 2 (fresh writer, fix loop 1)

## Final position

Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason and 18 per cent named price. That makes setup time the more-named of the two reasons the summary reports for this group (C1, C2, C3, C8, F3, F4, F5, F10). The survey shows what these customers said. It does not show what caused them to cancel, and it says nothing about customers who stayed or who cancelled later (C3, C9, C10, F1, F2, F11, F12). For the board's funding decision, the survey supports onboarding as the lead candidate to act on, where setup time means onboarding speed as your working definition, but it does not prove that a rebuild will reduce cancellations (C4, C5, C10, F6, F7, F12, F14).

## Claim ledger

I have no web access in this chat. Every SOURCED row comes from text you pasted or wrote in this chat, and there are no RECALLED rows.

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" (survey summary pasted in this chat, first clause) | Holds |
| C2 | Of 212 customers who cancelled in the first 90 days, 18 per cent named price | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price." (survey summary pasted in this chat, full sentence) | Holds |
| C3 | The summary covers only customers who cancelled in the first 90 days, and reports two reasons, setup time and price | SOURCED | The summary describes 212 customers who cancelled in the first 90 days and gives shares for setup time and price only (paraphrase) (survey summary pasted in this chat, full sentence) | Holds |
| C4 | For this claim, "setup time" means onboarding speed | SOURCED | You confirmed my reading that setup time means onboarding speed (paraphrase) (your reply in this chat) | Holds, as your working definition |
| C5 | The board decides next month whether to fund an onboarding rebuild | SOURCED | "The board decides next month whether to fund an onboarding rebuild." (your reply in this chat) | Holds |
| C6 | Customers who named setup time meant onboarding speed | INFERRED | From C1 and C4 | Unresolved |
| C7 | The 212 represent all customers who cancelled in the first 90 days, and each customer's answer counts once per reason | INFERRED | Not stated in C3. It is an assumption needed to read C1 and C2 as shares of all early cancellers. The summary does not say how many customers were asked, how many answered, or whether a customer could name more than one reason | Unresolved |
| C8 | Setup time is the main reason customers cancel in the first 90 days | INFERRED | Your confirmed reading (C11), tested against C1, C2 and C3 | Holds in part |
| C9 | Customers leave because onboarding is too slow | INFERRED | Your claim (C11), tested against C1, C3 and C6 | Holds in part |
| C10 | A faster onboarding would reduce cancellations in the first 90 days | INFERRED | From C1, C6 and C9 | Unresolved |
| C11 | You claimed that customers leave because onboarding is too slow, and confirmed my reading that the 61 per cent figure is the main reason customers leave | SOURCED | "our customers leave because onboarding is too slow" (your first message in this chat); you replied "Yes." to my restatement, which read the 61 per cent figure as the main reason customers leave (paraphrase) (your reply in this chat) | Holds, as your stated claim |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which customers the claim covers | All customers; customers who cancelled in the first 90 days | C3 | Customers who cancelled in the first 90 days | All customers: C3 covers only the 90-day group | Customers who cancel later may name different reasons (INFERRED) |
| Whether the claim states a cause or a stated reason | "Customers leave because onboarding is too slow"; "61 per cent of 212 early cancellers named setup time as a reason" | C1, C9, C10, C11 | Stated reason | Cause: C1 records a reason customers named, and C10, the only row about effect, is unresolved | If a test resolves C10, the cause wording could return (INFERRED) |
| What "setup time" means | Onboarding speed, your definition; the survey's own wording | C4, C6 | Onboarding speed, with the survey wording flagged as open | Survey wording: the ledger holds only the words "setup time" (C3) | C6 stays unresolved until the question wording is checked |

## Adversarial findings

F1 [C9] Customers leave because onboarding is too slow + [C1] "61 per cent named setup time as a reason" → Strongest case against: a named reason records what cancelling customers said, not what caused them to cancel. A customer who left for another reason could still name setup time. (INFERRED)

F2 [C3] The summary covers only customers who cancelled in the first 90 days → Against the research: with no data on customers who stayed, the ledger cannot show whether setup time separates customers who cancel from customers who stay. (INFERRED)

F3 [C1] "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" → C1 holds. It would be false if the raw survey responses give a share other than 61 per cent of 212.

F4 [C2] "and 18 per cent named price" → C2 holds. It would be false if the raw survey responses give a share other than 18 per cent for price.

F5 [C3] The summary covers only customers who cancelled in the first 90 days, and reports two reasons → C3 holds. It would be false if the full survey report covers other customer groups or lists more reasons.

F6 [C4] For this claim, "setup time" means onboarding speed → C4 holds as your working definition. It would be false if you revise the definition.

F7 [C5] "The board decides next month whether to fund an onboarding rebuild." → C5 holds. It would be false if the board's decision or its timing changes.

F8 [C6] Customers who named setup time meant onboarding speed → C6 unresolved. Would be settled by the exact survey question and answer options, or free-text answers, for setup time. Not used in the final position.

F9 [C7] The 212 represent all customers who cancelled in the first 90 days → C7 unresolved. Would be settled by the total number of customers who cancelled in the first 90 days, how many were asked, how many answered, and whether a customer could name more than one reason. Not used in the final position.

F10 [C8] Setup time is the main reason customers cancel in the first 90 days + [C1] "61 per cent named setup time as a reason" + [C2] "and 18 per cent named price" + [C3] reports two reasons → C8 holds in part. Holds: of the two reasons the summary reports, setup time was named by 61 per cent and price by 18 per cent. Fails: C3 reports only two reasons, so the ledger cannot show that setup time leads among all reasons. Instead: setup time was named by a larger share of the 212 than price. (INFERRED)

F11 [C9] Customers leave because onboarding is too slow + [C1] "61 per cent named setup time as a reason" + [C3] covers only customers who cancelled in the first 90 days → C9 holds in part. Holds: 61 per cent of 212 customers who cancelled in the first 90 days named setup time as a reason. Fails: for customers outside the 90-day group (C3), and as a cause (F1). Instead: setup time is a reason that 61 per cent of the 212 early cancellers named. (INFERRED)

F12 [C10] A faster onboarding would reduce cancellations in the first 90 days → C10 unresolved. Would be settled by comparing 90-day cancellation rates for customers who get a faster setup with rates for customers who do not. Not used in the final position.

F13 [C11] "our customers leave because onboarding is too slow" → C11 holds as your stated claim and confirmed reading. It would be false if you revise the claim or withdraw the confirmation.

F14 [F1, F2, F10, F11, F12] → Integration, conditional and level shift. The claim works at two levels. The first level is what early cancellers say, and the survey supports it. The second level is what changes cancellation behaviour, and no row tests it. The first level does not reduce to the second, because a stated reason can be named without being the cause. Region where the rebuild case holds: customers who cancel in the first 90 days, where "setup time" in the survey refers to onboarding. Observation that places a case in that region: the survey question wording (C6), and then a comparison of 90-day cancellation rates with and without a faster setup (C10). (INFERRED)

## Provenance

Attribution:  An AI assistant drafted this from the survey summary and replies you gave in this chat. No web search or other source was used.
Accountable:  [name to confirm]
Limitations:  The only survey evidence is the summary pasted in this chat (C1, C2, C3). It does not say how many customers were asked or answered, or whether a customer could name more than one reason (C7). What "setup time" meant to respondents is unresolved (C6). No row tests whether a faster onboarding reduces cancellations (C10). The ledger gives each claim's address, and the reader checks the cited rows before relying on them.
References:   Customer cancellation survey summary [pasted in this session; author, title, date, question wording and number surveyed not given].
              Your messages in this chat [your claim and your "Yes." to my restatement (C11), your definition of setup time (C4), and the board decision (C5); not a published source].

Decision for a person: whether the survey goes to the board as evidence for funding the onboarding rebuild, after checking rows C1, C3, C5, C6 and C7, the rows that carry it.

## Next

1. **You:** this week, get the exact survey question and answer options for setup time, the number of customers asked and answered, and whether customers could pick more than one reason. Result: C6 and C7 move from unresolved to holds or fails.
2. **You:** once a person is named under Accountable, put that person in front of the funding decision with rows C1, C3, C6 and C7. Result: that person approves the stated-reason wording, or asks for the cause wording to be tested first.
3. **You:** watch for the observation that would make the main claim false: customers who stayed naming setup time as a problem at a similar share, or 90-day cancellation rates not moving when setup gets faster. It would show up in a survey of current customers or in 90-day cancellation data split by setup speed.

If you want a deeper check of hidden assumptions, and you have a skill for blind spots, you may also like to run it on this.

### Checker 2 (fresh checker, saw only Draft 2): 7 issues

Unsupported or imprecise phrases

| Phrase | Where | Cited id | Why |
|---|---|---|---|
| "the survey supports onboarding as the lead candidate to act on" | Final position, third sentence | C4, C5, C10, F6, F7, F12, F14 | No cited row ranks onboarding as a candidate for action. The nearest row is C8 ("main reason"), which is not cited here and only holds in part. Its F10 finding limits it to "a larger share than price" among two reported reasons. None of the cited rows says "lead candidate". |
| "author, title, date, question wording and number surveyed not given" | Provenance, References | none | The ledger supports only part of this. Question wording is open (C6, F8) and the numbers asked and answered are missing (C7). No row says the summary lacks an author, title or date. |
| "Onboarding speed, your definition" (Decision record) and "your definition of setup time (C4)" (References) | Decision record row 3, and Provenance References | C4 | C4 says the user "confirmed my reading". The definition was the assistant's reading, which the user confirmed. The user did not author it. |
| "the rows that carry it" (said of C1, C3, C5, C6 and C7) | Provenance, "Decision for a person" | C6, C7 | C6 and C7 are unresolved. F8 and F9 each say "Not used in the final position", so these two rows do not carry the case. |

Cited ids that do not hold the fact beside them

| Cited id | Where | Fact beside it | Why |
|---|---|---|---|
| C8 | Final position, first citation group | "setup time the more-named of the two reasons the summary reports" | C8's claim is "Setup time is the main reason customers cancel", a different and stronger claim. The fact comes from F10's "Instead" line and C3. |
| C9 | Final position, second citation group | "says nothing about customers who stayed or who cancelled later" | C9's claim holds nothing about customers who stayed or cancelled later. |
| C10 | Final position, second citation group | Same phrase as above | C10 is about effect, not survey coverage. The fact is held by C3 and F2. |

### Draft 3 (fresh writer, fix loop 2): identical to the delivered turn below

### Checker 3 (fresh checker, saw only Draft 3): 2 issues, not fixed (fix-loop cap of two reached)

| # | Phrase | Where | Cited id | Why |
|---|---|---|---|---|
| a) | "the ledger holds only the words 'setup time' (C3)" | Decision record, row "What 'setup time' means", Rejected column | C3 | C3's evidence cell is a paraphrase, so it does not hold the survey's own words. The verbatim words appear only in C1 and C2. |
| b) | "An AI assistant drafted this ... No web search or other source was used." | Provenance, Attribution | none | No ledger row holds this. The only support is the unnumbered line above the table ("I have no web access in this chat"). |

(Checker 3 also noted a borderline pass: C8 scopes to "first 90 days" citing C11, which lacks the scope, but C3 in the same cell holds it.)

### RUNNER: end of checker loop. Draft 3 is the delivered turn.

---

## ASSISTANT (turn 2, delivered)

## Final position

Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason and 18 per cent named price. That makes setup time the more-named of the two reasons the summary reports for this group (C1, C2, C3, F3, F4, F5, F10). The survey shows what these customers said. It does not show what caused them to cancel, and it says nothing about customers who stayed or who cancelled later (C3, F1, F2, F11, F12). For the board's funding decision, where setup time means onboarding speed (the reading you confirmed), the survey does not prove that a rebuild will reduce cancellations (C4, C5, C10, F6, F7, F12, F15).

## Claim ledger

I have no web access in this chat. Every SOURCED row comes from text you pasted or wrote in this chat, and there are no RECALLED rows.

| # | Claim | Label | Evidence and locator | Status |
|---|---|---|---|---|
| C1 | Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" (survey summary pasted in this chat, first clause) | Holds |
| C2 | Of 212 customers who cancelled in the first 90 days, 18 per cent named price | SOURCED | "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason, and 18 per cent named price." (survey summary pasted in this chat, full sentence) | Holds |
| C3 | The summary covers only customers who cancelled in the first 90 days, and reports two reasons, setup time and price | SOURCED | The summary describes 212 customers who cancelled in the first 90 days and gives shares for setup time and price only (paraphrase) (survey summary pasted in this chat, full sentence) | Holds |
| C4 | For this claim, "setup time" means onboarding speed | SOURCED | You confirmed my reading that setup time means onboarding speed (paraphrase) (your reply in this chat) | Holds, as your working definition |
| C5 | The board decides next month whether to fund an onboarding rebuild | SOURCED | "The board decides next month whether to fund an onboarding rebuild." (your reply in this chat) | Holds |
| C6 | Customers who named setup time meant onboarding speed | INFERRED | From C1 and C4 | Unresolved |
| C7 | The 212 represent all customers who cancelled in the first 90 days, and each customer's answer counts once per reason | INFERRED | Not stated in C3. It is an assumption needed to read C1 and C2 as shares of all early cancellers. The summary does not say how many customers were asked, how many answered, or whether a customer could name more than one reason | Unresolved |
| C8 | Setup time is the main reason customers cancel in the first 90 days | INFERRED | Your confirmed reading (C11), tested against C1, C2 and C3 | Holds in part |
| C9 | Customers leave because onboarding is too slow | INFERRED | Your claim (C11), tested against C1, C3 and C6 | Holds in part |
| C10 | A faster onboarding would reduce cancellations in the first 90 days | INFERRED | From C1, C6 and C9 | Unresolved |
| C11 | You claimed that customers leave because onboarding is too slow, and confirmed my reading that the 61 per cent figure is the main reason customers leave | SOURCED | "our customers leave because onboarding is too slow" (your first message in this chat); you replied "Yes." to my restatement, which read the 61 per cent figure as the main reason customers leave (paraphrase) (your reply in this chat) | Holds, as your stated claim |
| C12 | The summary as pasted gives no author, title or date | SOURCED | The pasted summary is one sentence and names no author, title or date (paraphrase) (survey summary pasted in this chat, full text) | Holds |

## Decision record

| Decision | Options considered | Evidence | Chosen | Rejected, and why | Uncertainty |
|---|---|---|---|---|---|
| Which customers the claim covers | All customers; customers who cancelled in the first 90 days | C3 | Customers who cancelled in the first 90 days | All customers: C3 covers only the 90-day group | Customers who cancel later may name different reasons (INFERRED) |
| Whether the claim states a cause or a stated reason | "Customers leave because onboarding is too slow"; "61 per cent of 212 early cancellers named setup time as a reason" | C1, C9, C10, C11 | Stated reason | Cause: C1 records a reason customers named, and C10, the only row about effect, is unresolved | If a test resolves C10, the cause wording could return (INFERRED) |
| What "setup time" means | Onboarding speed, my reading that you confirmed; the survey's own wording | C4, C6 | Onboarding speed, with the survey wording flagged as open | Survey wording: the ledger holds only the words "setup time" (C3) | C6 stays unresolved until the question wording is checked |

## Adversarial findings

F1 [C9] Customers leave because onboarding is too slow + [C1] "61 per cent named setup time as a reason" → Strongest case against: a named reason records what cancelling customers said, not what caused them to cancel. A customer who left for another reason could still name setup time. (INFERRED)

F2 [C3] The summary covers only customers who cancelled in the first 90 days → Against the research: with no data on customers who stayed, the ledger cannot show whether setup time separates customers who cancel from customers who stay. (INFERRED)

F3 [C1] "Of 212 customers who cancelled in the first 90 days, 61 per cent named setup time as a reason" → C1 holds. It would be false if the raw survey responses give a share other than 61 per cent of 212.

F4 [C2] "and 18 per cent named price" → C2 holds. It would be false if the raw survey responses give a share other than 18 per cent for price.

F5 [C3] The summary covers only customers who cancelled in the first 90 days, and reports two reasons → C3 holds. It would be false if the full survey report covers other customer groups or lists more reasons.

F6 [C4] For this claim, "setup time" means onboarding speed → C4 holds as your working definition. It would be false if you revise the definition.

F7 [C5] "The board decides next month whether to fund an onboarding rebuild." → C5 holds. It would be false if the board's decision or its timing changes.

F8 [C6] Customers who named setup time meant onboarding speed → C6 unresolved. Would be settled by the exact survey question and answer options, or free-text answers, for setup time. Not used in the final position.

F9 [C7] The 212 represent all customers who cancelled in the first 90 days → C7 unresolved. Would be settled by the total number of customers who cancelled in the first 90 days, how many were asked, how many answered, and whether a customer could name more than one reason. Not used in the final position.

F10 [C8] Setup time is the main reason customers cancel in the first 90 days + [C1] "61 per cent named setup time as a reason" + [C2] "and 18 per cent named price" + [C3] reports two reasons → C8 holds in part. Holds: of the two reasons the summary reports, setup time was named by 61 per cent and price by 18 per cent. Fails: C3 reports only two reasons, so the ledger cannot show that setup time leads among all reasons. Instead: setup time was named by a larger share of the 212 than price. (INFERRED)

F11 [C9] Customers leave because onboarding is too slow + [C1] "61 per cent named setup time as a reason" + [C3] covers only customers who cancelled in the first 90 days → C9 holds in part. Holds: 61 per cent of 212 customers who cancelled in the first 90 days named setup time as a reason. Fails: for customers outside the 90-day group (C3), and as a cause (F1). Instead: setup time is a reason that 61 per cent of the 212 early cancellers named. (INFERRED)

F12 [C10] A faster onboarding would reduce cancellations in the first 90 days → C10 unresolved. Would be settled by comparing 90-day cancellation rates for customers who get a faster setup with rates for customers who do not. Not used in the final position.

F13 [C11] "our customers leave because onboarding is too slow" → C11 holds as your stated claim and confirmed reading. It would be false if you revise the claim or withdraw the confirmation.

F14 [C12] The summary as pasted gives no author, title or date → C12 holds. It would be false if the full survey report names an author, title or date.

F15 [F1, F2, F10, F11, F12] → Integration, conditional and level shift. The claim works at two levels. The first level is what early cancellers say, and the survey supports it. The second level is what changes cancellation behaviour, and no row tests it. The first level does not reduce to the second, because a stated reason can be named without being the cause. Region where the rebuild case holds: customers who cancel in the first 90 days, where "setup time" in the survey refers to onboarding. Observation that places a case in that region: the survey question wording (C6), and then a comparison of 90-day cancellation rates with and without a faster setup (C10). (INFERRED)

## Provenance

Attribution:  An AI assistant drafted this from the survey summary and replies you gave in this chat. No web search or other source was used.
Accountable:  [name to confirm]
Limitations:  The only survey evidence is the summary pasted in this chat (C1, C2, C3). It does not say how many customers were asked or answered, or whether a customer could name more than one reason (C7). What "setup time" meant to respondents is unresolved (C6). No row tests whether a faster onboarding reduces cancellations (C10). The ledger gives each claim's address, and the reader checks the cited rows before relying on them.
References:   Customer cancellation survey summary [pasted in this session; author, title and date not given (C12); question wording open (C6); numbers asked and answered not given (C7)].
              Your messages in this chat [your claim and your "Yes." to my restatement (C11), your confirmation of my reading of setup time (C4), and the board decision (C5); not a published source].

Decision for a person: whether the survey goes to the board as evidence for funding the onboarding rebuild, after checking rows C1, C3 and C5, the rows that carry it, and the unresolved rows C6 and C7.

## Next

1. **You:** this week, get the exact survey question and answer options for setup time, the number of customers asked and answered, and whether customers could pick more than one reason. Result: C6 and C7 move from unresolved to holds or fails.
2. **You:** once a person is named under Accountable, put that person in front of the funding decision with rows C1, C3, C6 and C7. Result: that person approves the stated-reason wording, or asks for the cause wording to be tested first.
3. **You:** watch for the observation that would make the main claim false: customers who stayed naming setup time as a problem at a similar share, or 90-day cancellation rates not moving when setup gets faster. It would show up in a survey of current customers or in 90-day cancellation data split by setup speed.

If you want a deeper check of hidden assumptions, and you have a skill for blind spots, you may also like to run it on this.

---

## RUNNER notes

- The skill asked no unscripted question, so scripted reply ii was not used.
- Checker issues per loop: loop 1 = 11, loop 2 = 7, loop 3 (final, unfixed) = 2. Total = 20.
- The runner rebuilt Drafts 2 and 3 from the fix-writer outputs by exact phrase replacement on the previous draft. The fix writers were told to change nothing else, and their outputs differed only at the listed places.

## Grading (delivered take-away only, strict)

- P1 PASS: turn 1 restates the claim ("slow onboarding drives early cancellations"), flags scope and survey gaps, and ends "Is this right, or what would you change?" with no analysis.
- P2 PASS: the ledger opens "I have no web access in this chat" and "there are no RECALLED rows"; Attribution says "No web search or other source was used"; no fact from memory appears.
- P3 PASS: C1 and C2 are SOURCED with the pasted sentence quoted and the locator "survey summary pasted in this chat"; References gives "Customer cancellation survey summary [pasted in this session; author, title and date not given (C12); question wording open (C6); numbers asked and answered not given (C7)]", with no invented APA fields.
- P4 PASS: all three decision rows fill Decision, Options considered, Evidence, Chosen, Rejected and Uncertainty, and none reads as a reasoning trace.
- P5 PASS: Accountable is "[name to confirm]"; the Next moves name no person, date or source ("this week" is a relative prompt, not a named date).
- P6 PASS: every final-position sentence cites rows that hold its fact (numbers C1 and C2, scope C3, reading C4, board decision C5, the unproven effect C10); no finding, claim cell or provenance line states what a firm or source is, does, sells or wants beyond its rows; the cited ids hold their facts.

Hard fails: 0.

Minor notes (not hard fails):
- The C8 and C9 claim cells ("main reason", "Customers leave because onboarding is too slow") are broader than their survey evidence. They are the tested claims, marked "Holds in part", and F10 and F11 narrow them.
- The decision record cites C3 for "the words 'setup time'", where C1 and C2 hold the verbatim words (Checker 3 item a).
- Attribution's "No web search or other source was used" has no ledger row; the unnumbered line above the ledger supports it (Checker 3 item b).
- C7's claim cell states an assumption the summary does not hold. The row is labelled INFERRED and Unresolved, and the final position does not use it.
