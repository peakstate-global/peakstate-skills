# Take-away template

Use one line or block per element. Keep every heading.

```text
Problem statement
{{One paragraph: what, where, when, how much.}}
Is not: {{where it could happen but does not}}
Gaps: {{each "[to confirm]" item, or "none"}}

Containment (now, before the cause is known)
{{The action, who does it (you or a named role), and when it ends}}
or: No containment needed: {{reason}}

Tool: {{Pareto / fishbone / 5 Whys}}, because {{one line}}

Diagram ({{rung taken}}, because {{one line}})
{{SVG, Mermaid block, or nothing extra at the text rung}}

Text tree
{{text tree or Pareto table from references/diagrams.md}}

Suspected causes
1. {{cause}}. Confirms it: {{evidence}}. Rules it out: {{evidence}}.
2. {{cause}}. Confirms it: {{evidence}}. Rules it out: {{evidence}}.
3. {{optional}}

First fix
Change: {{the smallest change that acts on cause 1}}
Reach: {{what and who it touches}}
Reversal: {{how to undo it, and how long it takes, marked [to confirm] unless the user said}}
Worked if: {{result, number, period}}
Rollback if: {{result, number, period}}. Then reverse the fix and keep the containment.

Your next three moves
1. {{owner}}: {{first action this week}}. Result: {{observable result}}.
2. ...
3. ...
```

## Worked example (short)

A warehouse shipped 14 orders to old addresses last week. The user said labels print from the
overnight order export and named a dispatch lead.

```text
Problem statement
14 orders last week went to a customer's previous address. All were repeat customers who
had changed address in their account within 48 hours of ordering.
Is not: new customers; customers who changed address more than 48 hours before ordering.
Gaps: whether it happened before last week [to confirm]

Containment (now, before the cause is known)
The dispatch lead holds any order where the address changed in the last 48 hours and checks
it by hand. Ends when the first fix passes its rollback period.

Tool: 5 Whys, because the is / is-not pattern points to one chain.

Text tree
Problem: orders sent to old addresses
└─ Why? Labels printed from the overnight order export [known]
   └─ Why? The export reads the address cached at the last nightly sync [to check]
      └─ Suspected root cause (acts on process): address changes reach dispatch only after a nightly sync

Suspected causes
1. The export uses a nightly cached address. Confirms it: all 14 changes fall after the last
   sync before dispatch. Rules it out: any of the 14 changed before that sync.
2. The account page saves the new address only to billing. Confirms it: the database shows
   the old delivery address after a test change. Rules it out: the test change updates both.

First fix
Change: the export reads the live delivery address at print time.
Reach: label printing at one warehouse for one week.
Reversal: switch the export setting back; about ten minutes [to confirm].
Worked if: zero wrong-address orders in one week, from at least 5 recent address changes.
Rollback if: any wrong-address order, or label printing slower than 2 seconds a label.
```
