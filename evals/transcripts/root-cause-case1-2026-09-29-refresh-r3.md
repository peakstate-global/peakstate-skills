# root-cause case 1 (refresh, re-run 2 on fixed skill)

Skill commit FIXED-root-cause (second uncommitted edit on 7e9db4e). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/root-cause/.

**USER:** Our payroll run paid 38 staff twice last Thursday, about $91,000 extra. It was Sam in payroll: the screen froze, so he clicked Run again. I want the root cause fixed. Honestly I think Sam needs a formal warning.

**ASSISTANT:**

Payroll data can be sensitive, so use only a tool your organisation has approved for this information.

Before we look for a cause, here is the problem as I understand it. I have written it about events, not people. The question for the root cause is what let a second click on Run turn into a second payment. A different person facing the same frozen screen could have done the same thing, so a warning for one person would leave the gap open. We can come back to the people side once the facts are in.

**Problem statement (draft)**

Last Thursday's payroll run was started twice after the screen froze. 38 staff received their pay twice, about $91,000 in extra payments.

| Question | Is | Is not |
|---|---|---|
| What | A payroll run started a second time after the screen froze; duplicate payments went out | [to confirm] |
| Where | The payroll system, last Thursday's pay run | [to confirm] other pay runs or pay groups that were fine |
| When | Last Thursday | [to confirm] whether this has happened in any earlier run |
| How much | 38 staff, about $91,000 extra | |

Gaps, each [to confirm]:
- How many staff were in the run in total, and whether only 38 of them were paid twice.
- Whether any earlier run has frozen or been started twice.
- Which payroll system and payment method (for example, a bank file or direct payment) were used.

One question first, because the answer shapes everything after it:

**Were all the staff in that run paid twice, or only 38 of a larger group? If only some, what is different about those 38 (for example, pay group, bank, or payment timing)?**


**USER:** It happened once, on the fortnightly staff run on Thursday 24 September. The monthly contractor run was fine. We use the payroll vendor's web app. The bank file went to the bank before anyone noticed, and staff emailed us on Friday. It has never happened before as far as I know.

**ASSISTANT:**

Thank you, that fills most of the gaps. Here is the updated problem statement.

**Problem statement**

On Thursday 24 September, the fortnightly staff pay run in the payroll vendor's web app was started a second time after the screen froze. The bank file went to the bank before anyone noticed. 38 staff received their pay twice, about $91,000 in extra payments. Staff reported it by email on Friday. As far as you know, this has not happened before.

| Question | Is | Is not |
|---|---|---|
| What | A pay run started twice after a screen freeze; a duplicate payment reached the bank | The monthly contractor run, which paid correctly |
| Where | The fortnightly staff run in the vendor's web app | The monthly contractor run in the same app |
| When | Thursday 24 September; first known occurrence | Earlier runs, as far as you know |
| How much | 38 staff, about $91,000 extra | |

Gaps, each [to confirm]:
- How many staff were in the fortnightly run in total, and whether only 38 of them were paid twice.
- Whether the second click made a second bank file, or the same file was sent twice.
- Whether the vendor's logs show any earlier run that froze or was started twice.

**Containment (now, before the cause is known)**

The duplicate payments have gone out, so there are two kinds of harm to limit: the money already paid, and the chance it happens again on the next staff run. If the runs are fortnightly, the next one is Thursday 8 October [to confirm], so the gap is not yet closed. I suggest:

1. **Before the next staff run:** you (or whoever releases the bank file) check the batch before it goes to the bank. Compare the number of payments and the total against the expected staff count and payroll total, and confirm there is only one file for the run. If the screen freezes, nobody clicks Run again: check the run status in the app, or with the vendor, first. This stays in place until the first fix has passed its rollback period.
2. **For the money already paid:** you ask your bank today whether the duplicate file can still be recalled, and tell the 38 staff in writing what happened and how the overpayment will be recovered. Recovering pay from staff can have rules attached, so check the right way to do it with whoever advises you on employment matters.

**What is in place now for the next staff run, and can you set up the pre-release check before then?**


**USER:** Nothing yet. The extra money is still in their accounts. The next run is in eleven days.

**ASSISTANT:**

Thank you. Nothing is in place yet and the next staff run is in eleven days, so the pre-release check is the first thing to set up. It needs no cause to be known. Here is the full analysis.

I can write files here, so the fishbone is an SVG file at `/tmp/root-cause-eval/case1/payroll-fishbone.svg`. The text tree below carries the same content.

**Problem statement**

On Thursday 24 September, the fortnightly staff pay run in the payroll vendor's web app was started a second time after the screen froze. The bank file went to the bank before anyone noticed. 38 staff received their pay twice, about $91,000 in extra payments, and the money is still in their accounts. Staff reported it by email on Friday. As far as you know, this has not happened before.

Is not: the monthly contractor run in the same app, which paid correctly; earlier staff runs, as far as you know.

Gaps:
- How many staff were in the fortnightly run in total, and why 38 were paid twice [to confirm].
- Whether the second click made a second bank file, or the same file was sent twice [to confirm].
- Whether the vendor's logs show any earlier run that froze or was started twice [to confirm].

**Containment (now, before the cause is known)**

- **Before the next staff run, in eleven days:** you set up a check before the bank file is released. Compare the number of payments and the total with the expected staff count and payroll total, and confirm there is one file for the pay period. If the screen freezes, nobody clicks Run again: check the run status in the app, or with the vendor, first. This stays in place until the first fix has passed its rollback period.
- **For the money already paid:** you ask your bank today whether any recall is still possible, and tell the 38 staff in writing what happened and how the overpayment will be recovered. Check the right way to recover pay with whoever advises you on employment matters.

**Tool:** fishbone, because several things had to happen together: the screen froze, the app accepted a second Run, and the file reached the bank with no check in between.

**Diagram** (SVG file, because I can write files here): `/tmp/root-cause-eval/case1/payroll-fishbone.svg`

**Text tree**

```text
Problem: staff run paid twice, 38 staff, about $91,000, 24 September
├─ People: no set steps for a frozen screen during a run [to check]
├─ Process: no check of count and total before bank release [to check] (suspected); file sent before anyone noticed [known]
├─ Tools: app accepts a second Run for the same pay period [to check] (suspected); screen froze mid-run [known]
└─ Measurement: duplicate found by staff emails the next day [known]
```

The people branch holds a condition, not a person. A frozen screen with no instruction and no block on a second Run makes a second click likely for anyone at that desk. That is why the fix goes on the app and the release step.

**Suspected causes**

1. **The vendor app accepts a second Run for a pay period that already has a run.** Confirms it: the vendor's run log shows two runs, or two payment batches, for the 24 September staff period, and a test in the vendor's test environment [to confirm that one exists] accepts a second Run. Rules it out: the log shows one run, and the same file was sent to the bank twice.
2. **Nothing checks the payment count and total before the bank file is released.** Confirms it: the release steps have no comparison with the expected count and total, or the file goes to the bank automatically. Rules it out: a check exists and was done on 24 September.
3. **There are no set steps for what to do when the screen freezes during a run.** Confirms it: no written procedure or vendor guidance covers a freeze. Rules it out: a procedure exists and says to check the run status before running again.

These are suspected, not proven. The timing fits all three, and timing alone is a lead.

**First fix**

- **Change:** turn on the vendor's block on a second run for the same pay period, if the app has one [to confirm with the vendor]. If it does not, make release of the bank file need a second approval in the app, with the count and total shown [to confirm this setting exists].
- **Reach:** the fortnightly staff run only, and the people in your payroll team who start or release it. Leave the monthly contractor run as it is for now.
- **Reversal:** switch the setting off in the app; time to do this [to confirm with the vendor].
- **Worked if:** the next two staff runs each make one payment batch, the count and total match the expected figures, and no staff member reports a double payment.
- **Rollback if:** the block stops a legitimate run from going out on the day, or any duplicate payment happens, in the next two staff runs. Then reverse the fix and keep the containment check.

**Your next three moves**

1. You: set up the pre-release check this week, before the next staff run in eleven days, and ask your bank about recall today. Result: a written check with a named step before release, and the bank's answer on recall recorded.
2. You: ask the vendor this week for the run log for the 24 September staff period and whether the app blocks a second run. Result: a record of whether suspected cause 1 is confirmed or ruled out.
3. You: if cause 1 is confirmed, turn on the block for the staff run and watch the next two runs against the rollback trigger. If it is ruled out, move to cause 2, make the second approval the fix, and repeat from move 2. Result: two clean staff runs, or a rollback with the containment check still in place.

To check this reasoning for hidden assumptions, you may also like a skill for finding blind spots, if you have one.

## Grading
- P1 pass: first reply restates ("Last Thursday's payroll run was started twice after the screen froze. 38 staff received their pay twice") and asks "Were all the staff in that run paid twice, or only 38 of a larger group?" before any cause is named.
- P2 pass: "Containment (now, before the cause is known)" precedes "Suspected causes"; first fix has "Reach: the fortnightly staff run only", "Reversal: switch the setting off in the app", "Rollback if: the block stops a legitimate run ... or any duplicate payment happens".
- P3 pass: tree goes to "Tools: app accepts a second Run for the same pay period" and "Process: no check of count and total before bank release"; Sam is not a node.
- P4 pass: take-away names no person and no discipline; explains once: "The people branch holds a condition, not a person."
- P5 pass: three suspected causes, each with "Confirms it:" evidence (e.g. "the vendor's run log shows two runs, or two payment batches").
- P6 pass: "Text tree" block present; the fishbone is a hand-written SVG file, not image generation, and no image generation is offered (plain reading: hand-written SVG is not image generation).
- Strict check pass: "Thursday 8 October [to confirm]" is marked; every [known] link restates the user ("screen froze", "file sent before anyone noticed", "staff emails the next day"); owners are "you"; "next two staff runs" is a labelled fix proposal, not an estimate.

Triage:
