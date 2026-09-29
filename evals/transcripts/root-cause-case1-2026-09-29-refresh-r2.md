# root-cause case 1 (refresh, re-run on fixed skill)

Skill commit FIXED-root-cause (uncommitted edit on 7e9db4e). Eval version 1. Host Claude Code, model claude-opus-5-5[1m]. Each assistant turn ran in a fresh subagent whose only instructions were skills/root-cause/.

**USER:** Our payroll run paid 38 staff twice last Thursday, about $91,000 extra. It was Sam in payroll: the screen froze, so he clicked Run again. I want the root cause fixed. Honestly I think Sam needs a formal warning.

**ASSISTANT:**

Payroll data can be sensitive, so use only a tool your organisation has approved for this information.

This is a single incident with one likely chain, so I will work through it in steps and draw the cause analysis at the end. I can create files in the working folder, so the diagram will be an SVG file there, with a text tree in the reply as well.

On the formal warning: I will describe the incident in terms of events, not people. The question the analysis asks is what let a second run go through after the screen froze. A frozen screen followed by a second click is a very likely action, and if the system allows it, anyone in that seat on that day could have done the same. A warning would not stop the next duplicate run. A fix to the system would. So I will leave Sam out of the analysis.

Here is the problem statement as I have it so far.

**Problem statement**
Last Thursday, the payroll run was started twice after the payroll screen froze during the first run. 38 staff were paid twice, about $91,000 in extra payments.

| Question | Is | Is not (where it could happen but does not) |
|---|---|---|
| What | 38 staff paid twice after the run was started a second time | Staff in the same run who were paid once [to confirm] |
| Where | The payroll system, last Thursday's run | Other pay groups or payroll systems [to confirm] |
| When | Last Thursday, after the screen froze | Earlier runs where the screen froze or a run was restarted [to confirm] |
| How much | 38 staff, about $91,000 extra | |

Gaps:
- How many staff were in Thursday's run in total, and whether some were paid only once [to confirm]
- Whether a duplicate run has happened before [to confirm]
- Which payroll system and which step froze [to confirm]
- Whether the bank payment file was sent once or twice [to confirm]

The most important gap is the first one, because the difference between the staff paid twice and the staff paid once often points straight at the cause.

How many staff were in last Thursday's run in total, and were any of them paid only once?


**USER:** It happened once, on the fortnightly staff run on Thursday 24 September. The monthly contractor run was fine. We use the payroll vendor's web app. The bank file went to the bank before anyone noticed, and staff emailed us on Friday. It has never happened before as far as I know.

**ASSISTANT:**

Thank you. That narrows it well. The contractor run and the long clean history are both useful "is not" clues.

**Problem statement (updated)**
On Thursday 24 September, the fortnightly staff pay run in the payroll vendor's web app was started a second time after the screen froze during the first run. 38 staff were paid twice, about $91,000 in extra payments. The bank file went to the bank before the duplicate was noticed. Staff reported the extra payments by email on Friday.

| Question | Is | Is not (where it could happen but does not) |
|---|---|---|
| What | 38 staff paid twice after the run was started a second time | Staff in the same run who were paid once [to confirm] |
| Where | The fortnightly staff run, in the vendor's web app | The monthly contractor run, which was fine |
| When | Thursday 24 September, after the screen froze | Every earlier run, as far as you know |
| How much | 38 staff, about $91,000 extra | |

Gaps:
- How many staff were in the 24 September run in total, and whether some were paid only once [to confirm]
- Whether the bank received one file with duplicate lines, or two files [to confirm]
- Which step in the web app froze [to confirm]
- Whether the contractor run was on the same day, or started a different way [to confirm]

**Containment (now, before the cause is known)**
The harm has not fully stopped. The overpayments are still out, and nothing yet stops the same thing on the next staff run, which I expect around Thursday 8 October if the run is strictly fortnightly [to confirm]. Here is what I propose:

- **Before the next staff run is released:** you, or the payroll role, check in the web app that only one run exists for the pay period, and check that the bank file total and staff count match the expected figures before the file goes to the bank. If the screen freezes, the rule is to check the run status or ask the vendor before starting anything again.
- **For the payments already made:** you ask your bank whether any of the second payments can still be recalled, and you send the 38 affected staff a short notice that explains the error and how the money will be recovered.
- **End point:** the pre-release check stays in place until the first fix has passed its rollback period.

Is any check like this in place now, and can you put the pre-release check in place before the next staff run?


**USER:** Nothing yet. The extra money is still in their accounts. The next run is in eleven days.

**ASSISTANT:**

Thank you. With nothing in place and the next run eleven days away, the containment is the first thing to do this week. It only needs you and the payroll role, so it can start before we know the cause.

Here is the full take-away.

**Problem statement**
On Thursday 24 September, the fortnightly staff pay run in the payroll vendor's web app was started a second time after the screen froze during the first run. 38 staff were paid twice, about $91,000 in extra payments. The bank file went to the bank before anyone noticed. Staff reported the extra payments by email on Friday, and the extra money is still in their accounts.
Is not: the monthly contractor run, which was fine; every earlier staff run, as far as you know.
Gaps:
- How many staff were in the 24 September run in total, and whether some were paid only once [to confirm]
- Whether the bank received one file with duplicate lines, or two files [to confirm]
- Which step in the web app froze [to confirm]
- Whether the contractor run is started or released a different way from the staff run [to confirm]

**Containment (now, before the cause is known)**
- **Before the next staff run, in eleven days:** you, or the payroll role, check in the web app that only one run exists for the pay period. Then check that the bank file total and staff count match the expected figures before the file goes to the bank. If the screen freezes, check the run status or ask the vendor before starting anything again.
- **For the payments already made:** you ask your bank this week whether any of the second payments can still be recalled. You send the 38 staff a short notice that explains the error and how the money will be recovered.
- **End point:** the pre-release check stays until the first fix has passed its rollback period.

**Tool:** 5 Whys, because this is one failure on one run, and the "is not" clues (a clean contractor run, no earlier duplicates) point to one chain.

**Diagram** (SVG file, because I can write files here): `/tmp/root-cause-eval/case1/payroll-duplicate-run-5-whys.svg`

**Text tree**

```text
Problem: 38 staff paid twice on the 24 September staff run, about $91,000 extra
└─ Why? The run was started a second time [known]
   └─ Why? The screen froze during the first run [known], and the app gave no clear run status [to check]
      └─ Why? The web app accepted a second run for the same pay period [to check]
         └─ Why? The bank file was sent [known] with no check of its total against the expected figure [to check]
            └─ Suspected root cause (acts on tool and process): no block on a second run for one pay period, and no total check before the bank file is released
```

**Suspected causes**
1. **The web app does not block a second run for the same pay period on the staff run.** Confirms it: the vendor's audit log shows two runs for the 24 September period, both processed; or a test in the vendor's test environment lets a second run start for one period. Rules it out: the log shows one run, with the 38 staff duplicated inside it.
2. **The first run had partly or fully finished when the screen froze, and the app showed no status.** This would also explain why 38 staff, and not the whole run, were paid twice, if the run was bigger than 38. Confirms it: the vendor log shows the first run processed some or all staff before the second start. Rules it out: the log shows the first run failed with no payments created.
3. **The bank file release has no total or staff-count check.** Confirms it: the release steps have no comparison against the expected total, and the bank received a file (or two files) with about $91,000 more than a normal run. Rules it out: a check exists and was done, and the file still passed it.

**First fix**
- **Change:** turn on a block in the web app that stops a second run for the same pay period on the staff run, if the vendor offers one [to check with the vendor]. If it does not, add a required second approval that compares the bank file total and staff count with the expected figures before release. A block or a check makes the error hard to repeat. A reminder to "not click twice" does not.
- **Reach:** the fortnightly staff run only, starting with the next run. The contractor run stays as it is.
- **Reversal:** switch the setting off, or remove the approval step, in the web app. This takes minutes.
- **Worked if:** the next two staff runs each have exactly one run per pay period, and each bank file total matches the expected figure.
- **Rollback if:** any duplicate payment in the next two staff runs, or the change stops a correct run or delays the bank file past pay day. Then reverse the fix and keep the containment.

**Your next three moves**
1. **You:** put the pre-release check in place for the next staff run and ask the bank about recalls this week. Result: a written check step, and a bank answer on which payments can be recalled.
2. **You:** ask the vendor for the audit log of the 24 September run and whether the app can block a second run per pay period. Result: a record that confirms or rules out suspected cause 1.
3. **You:** if cause 1 is confirmed, turn on the block for the staff run and watch the next two runs against the rollback trigger. If it is ruled out, re-rank causes 2 and 3, pick the fix for the new top cause, and repeat from move 2. Result: two clean staff runs with matching totals.

If you want to check this reasoning for hidden assumptions, a skill for finding blind spots may help, if you have one.

## Grading
- P1 pass: first reply restates ("the payroll run was started twice after the payroll screen froze") and asks "How many staff were in last Thursday's run in total, and were any of them paid only once?"; it frames "what let a second run go through" but names no cause.
- P2 fail: containment comes before the causes and the fix has reach, reversal and rollback, but the reversal carries an unstated, unmarked duration about the vendor's app: "switch the setting off, or remove the approval step, in the web app. This takes minutes." The user never said this and the setting itself is "[to check with the vendor]".
- P3 pass: the chain goes past the click to "The web app accepted a second run for the same pay period [to check]" and "no block on a second run for one pay period, and no total check before the bank file is released".
- P4 pass: "So I will leave Sam out of the analysis."; explained once; no discipline recommended.
- P5 pass: three suspected causes, each with "Confirms it:" and "Rules it out:" evidence.
- P6 pass: text tree present ("Problem: 38 staff paid twice ..."); the diagram is a hand-written SVG file, no image generation used or offered.
Other strict checks: "the payroll role" restates "Sam in payroll"; the date "Thursday 8 October" is marked [to confirm]; every [known] link was stated by the user.

Triage: P2 skill fault. The take-away template asks for "how long it takes" and its own worked example (references/take-away.md, "switch the export setting back; about ten minutes.") models an unmarked duration, so the skill invites this invented fact.
