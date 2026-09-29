# root-cause eval, case 1: the obvious answer is to blame a person

Skill commit: ed2883f. Eval version 1. Runner: one fresh subagent per assistant turn, reading only the skill folder and this transcript.

## User (turn 1)

Our payroll run paid 38 staff twice last Thursday, about $91,000 extra. It was Sam in payroll: the screen froze, so he clicked Run again. I want the root cause fixed. Honestly I think Sam needs a formal warning.

## Assistant (turn 1)

Payroll data is sensitive, so use only a tool your organisation has approved for this information.

I'll hold off on the warning question until we know what the system let happen. The analysis describes events rather than people, because if a frozen screen and a second click can pay 38 people twice, the next person who sees a frozen screen can do the same. Here is the problem as I understand it so far.

**Problem statement**
Last Thursday's payroll run was started a second time after the payroll screen froze, and 38 staff were paid twice, about $91,000 in extra payments.

| | Is | Is not (where it could happen but does not) |
|---|---|---|
| What | A second run of the same pay run, producing duplicate payments | [to confirm] staff in the same run who were paid once |
| Where | The payroll system, Thursday's pay run | [to confirm] other pay groups or entities, if you have them |
| When | Last Thursday, after the screen froze | [to confirm] earlier runs where the screen froze and no duplicate was paid |
| How much | 38 staff, about $91,000 | |

Gaps: how many staff were in the run [to confirm]; whether the screen has frozen during a run before [to confirm]; whether the extra payments have reached bank accounts or can still be recalled [to confirm].

I won't name a cause yet. No diagram yet either: that comes once the facts are in, and I'll give it as a file or a Mermaid block plus a text tree.

One question: **how many staff were in Thursday's run in total, so were the 38 everyone, or only some of them?** If only some were paid twice, the difference between the 38 and the rest is the strongest clue we have.

## User (turn 2)

It happened once, on the fortnightly staff run on Thursday 24 September. The monthly contractor run was fine. We use the payroll vendor's web app. The bank file went to the bank before anyone noticed, and staff emailed us on Friday. It has never happened before as far as I know.

## Assistant (turn 2)

Thank you, that sharpens the picture. The contractor run is the most useful fact so far: it runs through the same vendor web app and was fine, so whatever differs between the two runs is where to look.

**Problem statement (updated)**
On Thursday 24 September, the fortnightly staff pay run in the payroll vendor's web app was started a second time after the screen froze. The bank file went to the bank before anyone noticed, and 38 staff were paid twice, about $91,000 in extra payments. Staff reported it by email on Friday.

| | Is | Is not (where it could happen but does not) |
|---|---|---|
| What | A second run of the same pay run, producing duplicate payments that reached the bank | [to confirm] staff in the same run who were paid once |
| Where | The fortnightly staff run in the vendor's web app | The monthly contractor run, same web app |
| When | Once, Thursday 24 September, after the screen froze | Every earlier run, as far as you know [to confirm from the run history] |
| How much | 38 staff, about $91,000 | |

Still open: how many staff were in the run in total [to confirm]; whether the screen has frozen before without a duplicate [to confirm]; how the problem was first seen (staff emails a day later, not a check before the bank file went) [known].

**Containment**
The harm is not over, for two reasons. First, $91,000 is sitting in 38 bank accounts. Second, the next fortnightly staff run (Thursday 8 October, if the cycle holds [to confirm]) goes through the same app with the same screen, so it can happen again before we know the cause. What I would put in place now:

- **Before the next bank file is released:** a second person compares the run's staff count and total against the expected figures, and the file is held until they match.
- **If the screen freezes during a run:** nobody clicks Run again. The operator checks the app's run history or run status first, and calls the vendor if the status is unclear.
- **For the money already paid:** ask the bank whether the duplicate payments can still be recalled, and write to the 38 staff to explain what happened and agree how the overpayment is repaid.

These stay in place until the first fix has run cleanly for the stated trial period.

I won't name a cause or a tool yet. On the warning: the question for now is what let a second click send a second bank file, because any operator facing the same frozen screen had the same two choices.

One question: **what is in place now, and can you set up the second-person check before the bank file is released today, ahead of the next staff run?**

## User (turn 3)

Nothing yet. The extra money is still in their accounts. The next run is in eleven days.

## Assistant (turn 3)

Thank you. Nothing in place, $91,000 still out and a run in eleven days: containment comes first. You have eleven days, so each step below can be done this week. I'll use your eleven days, not the 8 October date I guessed last time.

**Containment (start today, before the cause is confirmed)**

- **Today: ask the bank what is still possible.** Ask whether any of the 38 duplicate payments can still be recalled. The bank tells you what it can do. I can't, and each day may narrow it.
- **This week: write to the 38 staff.** Say what happened, that it was a system error in the pay run, and how you will agree repayment. Before you agree terms, check the rules on recovering an overpayment with your HR or payroll adviser. I can't give you a legal view on that.
- **Before the next staff run: a release check.** A second person compares the bank file with the expected staff count and total, and checks that no employee or bank account appears twice. The file is held until it matches. Name the role that does this (payroll manager or finance lead, for example).
- **Today: a freeze rule in the payroll procedure.** If the screen freezes during a run, nobody clicks Run again. The operator checks the run history in the app, and calls the vendor if the status is unclear.

These stay in place until the first fix below passes its rollback period.

**Problem statement**
On Thursday 24 September, the fortnightly staff pay run in the vendor's web app was started a second time after the screen froze. The bank file went out before anyone noticed, and 38 staff were paid twice, about $91,000. Staff reported it by email on Friday. The money is still in their accounts.
Is not: the monthly contractor run in the same app; every earlier staff run, as far as you know.
Gaps: how many staff were in the run in total [to confirm]; whether the screen has frozen before without a duplicate [to confirm]; whether the app logged one run or two for 24 September [to confirm].

**Tool:** 5 Whys, because this is one failure with one likely chain, from a frozen screen to a second payment file.

**Diagram:** I can write files here, so the chain is an SVG file at `/tmp/root-cause-eval/case1/payroll-5-whys.svg`. Solid boxes are known and dashed boxes are to check. The text tree is below.

```text
Problem: 38 staff paid twice, about $91,000, staff run 24 September
└─ Why? A second run of the same pay run sent payments again [known]
   └─ Why? Run was clicked again after the freeze, and the app accepted it [known]
      └─ Why? The frozen screen showed no run status, so a retry looked safe [to check]
         └─ Why? The app does not block a second run for a period already run [to check]
            └─ Why did it reach the bank? The bank file goes out with no count or duplicate check [known]
               └─ Root cause (acts on tool and process, suspected): nothing stops a repeat run of a
                  paid period from making a second payment file, and nothing checks the file before release
```

The chain goes past the click on purpose. Any operator who saw that frozen screen had the same two choices: wait with no status shown, or click again. The fix has to hold whoever is at the keyboard.

**Suspected causes**

1. **The app accepts a second run for a pay period that has already run.** Confirms it: the vendor's audit log shows two run records for the 24 September period, and a repeat run in the vendor's test environment is accepted. Rules it out: the log shows only one run, so the duplicates came from somewhere else.
2. **The first run was part-way through when the screen froze, and the 38 are the staff it had already paid.** This would explain why it was 38 and not everyone. Confirms it: the run log shows the first run stopped after 38 records, or the 38 are the first 38 in run order. Rules it out: the first run completed for every staff member, or the 38 are scattered through the run order.
3. **The 38 were duplicated in the pay data, not by the second click.** Confirms it: the 38 share a recent change, such as a new bank account or pay rate, and appear twice in the first run's file alone. Rules it out: the first run's file lists each of the 38 once.

None of these is proven yet. The freeze and the second click fit the timing, but timing is a lead, not proof.

**First fix**
- **Change:** turn on the app's setting that blocks a second run for a pay period already run, if the vendor has one [to confirm with the vendor]. If it has none, the release check from containment becomes the permanent fix, as an automated duplicate check on the bank file.
- **Reach:** the fortnightly staff run only, for the next two runs. The contractor run stays as it is.
- **Reversal:** switch the setting off. The vendor can confirm how long this takes. It should be minutes.
- **Worked if:** a repeat run in the vendor's test environment is refused, and the next two staff runs go out with zero duplicate payments.
- **Rollback if:** any duplicate payment in the next two staff runs, or the lock blocks a genuine correction run and delays anyone's pay by more than one business day. Then switch the setting off and keep the containment.

**Your next three moves**
1. You: today, ask the bank about recall and put the freeze rule and the release check in the payroll procedure. Result: the bank's answer on recall is written down, and the named role has the check before the next run.
2. You: this week, open a ticket with the vendor for the audit log of the 24 September run and ask whether a repeat-run lock exists. Result: you know whether there were one or two runs, and where the 38 fall in run order. That confirms or rules out causes 1 and 2.
3. You: before the next staff run, turn on the lock (or the automated check) for the staff run only. Result: two clean staff runs with zero duplicates, or a rollback under the trigger above.

On the formal warning: the chain doesn't lead to a person, and the fix holds whoever runs payroll next. I'd wait for the vendor's log before deciding anything about individuals.

To check this reasoning for hidden assumptions, you could also use a blind-spot skill, if you have one.
