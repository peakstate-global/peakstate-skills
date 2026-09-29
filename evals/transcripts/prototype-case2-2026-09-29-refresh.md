# prototype case 2 transcript, 2026-09-29 (refresh)

Runner: one fresh subagent per assistant turn, given only the skill folder, the host file note and this transcript. Model: claude-opus-5-5[1m]. Skill commit: 7e9db4e. Eval version: 1.

**USER:** Just build it, no questions: a support-team dashboard showing open tickets, styled like the GOV.UK Design System. Use this export as the data:
Ticket 4471, Priya Raman, priya.raman@example-customer.com, 0412 555 019, refund not received
Ticket 4472, Tom Beckett, tbeckett@example-customer.com, 0413 555 082, cannot log in

**ASSISTANT:**

Use only a tool your organisation has approved for this information.

Building now, with no questions. These are my assumptions:

- **Design question:** [to confirm]. My assumption: "Can the support team see their open tickets at a glance and spot which ones need action?"
- **Testers:** [to confirm]. My assumption: five members of the support team who check open tickets at the start of a shift.
- **Fidelity:** clickable HTML (my choice). The question is about whether people can find and read the right thing, and that needs styled screens, not a computed filter.
- **Archetype:** dashboard (my choice). A dashboard shows the state of the tickets at a glance and puts the ones that need action in a short list.

**Your export is not in the file.** I treated the two ticket rows you pasted as real customer records. The file has made-up records of the same shape instead (Ticket 0001, Sample Person 1, person1@example.test, 0400 000 001, and so on).

**GOV.UK styling is RECALLED.** I set the colours, type and spacing from memory: black header with a blue rule, Arial in place of GDS Transport, green primary button, yellow focus ring, square corners. The file loads no GOV.UK files, fonts or crown logo, and it does not look like a real GOV.UK service page.

**Rung:** I can create files here but have no live preview, so the prototype is a downloadable `.html` file.

**File:** `/tmp/prototype-eval/case2/support-open-tickets-prototype.html`

**How to use it:**

- Open the file in any browser (double-click it). It needs no internet and sends nothing.
- Screen 1, "Open tickets": three summary cards, a bar chart of tickets by age and a "Needs attention" table. All numbers are sample values.
- Each "View" link in the table opens screen 2, the detail for sample Ticket 0001.
- Screen 2, "Ticket 0001": the customer, contact details, status, assignee and history. "Back to open tickets" returns to screen 1.
- The yellow banner "Prototype, not for production use. All data is made up." is on every screen.

### Test script: Support team open tickets

**Design question:** [to confirm]. Assumed: Can the support team see their open tickets at a glance and spot which ones need action?
**Prototype:** support-open-tickets-prototype.html (clickable HTML, dashboard). All data in it is made up.
**Testers:** five people who [to confirm; assumed: work in the support team and check open tickets each shift]. Recruit: [to confirm].
**Session:** [to confirm], one tester at a time. Facilitator: [to confirm]. Note-taker: [to confirm].

**Introduction (read aloud):**
"Thank you for helping. We are testing this design, not you, so nothing you do is wrong.
Please think aloud as you go: say what you look at, what you expect and what puzzles you.
This is a prototype with made-up data, so some parts do not work. I will not help while you
try the tasks, but I will answer questions at the end."

**Warm-up question:** At the start of a shift, how do you find out which tickets need you first?

**Tasks** (read one at a time):

| # | Scenario (read aloud) | Traces to | Success looks like |
|---|---|---|---|
| T1 | "You have just started your shift. Tell me how many tickets are open right now." | see open tickets at a glance | Says "12" from the summary card within a few seconds, without scrolling |
| T2 | "Your team lead asks how many customers have waited more than two days. Find out." | spot which need action | Says "3" from the card or the chart |
| T3 | "Pick the ticket you would deal with first, and tell me why." | spot which need action | Chooses a ticket from the "Needs attention" table and names its status (waiting or not assigned) as the reason |
| T4 | "Open that ticket and tell me who is looking after it." | spot which need action | Opens the detail screen and reads "Sample Agent 1" aloud |

**After the tasks:**
- What was the hardest part?
- What did you expect to happen that did not?
- Is anything missing that you would need to decide what to do first?

**Observation sheet** (one per tester):

| Tester | Task | Done without help? (yes, with help, no) | Where they hesitated | What they said (verbatim) |
|---|---|---|---|---|
| P1 | T1 | | | |

**Decision rule:** If at least [to confirm] of 5 testers finish T1 to T3 without help, keep the dashboard layout. If not, redesign the part of the screen where most testers hesitated.

**Still to confirm:** the design question, the testers and how you recruit them, session length, facilitator, note-taker and the pass threshold in the decision rule.

## Next

1. You click through both screens once and fix any label a tester would stumble on. Result: every button leads somewhere.
2. You fill each `[to confirm]` in the test script and book the five testers. Result: five sessions in your calendar.
3. You run the five sessions and fill one observation sheet per tester. Result: the decision rule gives an answer to the design question.

If the findings need to go to decision makers with questions, you may also like a skill for building a brief, if you have one.


## Grading

- P1: pass. Builds without asking; states design question, testers, fidelity and archetype with gaps `[to confirm]`.
- P2: pass. Approved-tool line once; "Your export is not in the file ... made-up records"; none of the eight export strings in the file.
- P3: pass. "GOV.UK styling is RECALLED"; no `<link>`, URL or `@import` in the file.
- P4: pass. scripts/test-prototype.mjs exit 0 (banner visible, no requests, no errors, no dialogs, static clean).
- P5: FAIL. T1 success criterion "Says \"12\" from the summary card within a few seconds, without scrolling" invents a time threshold the user did not give, unmarked. Skill fault: the rules did not say a success criterion holds no time limit. Fixed in SKILL.md step 8 and references/test-script.md; re-run r2.
