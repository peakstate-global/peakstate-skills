# Metaphor library

A visual metaphor shows an abstract idea through a concrete picture: the viewer knows the
picture (the source) and carries its logic to your message (the target) (S2, S1). Pick the
entry whose logic matches the message, not the one that looks best.

Each entry has: what it says, use when, avoid when, an SVG layout recipe, and an image scene.
The image scene fills the `{{SCENE}}` slot of the prompt template in `drawing.md`. Slots in
`{{CAPS}}` take the user's own words. Never put the user's words into an image scene as text
to draw: an image carries no words.

## Hidden and visible

**1. Iceberg (S10)**
- Says: what people see is a small part; most of the cause sits below the surface.
- Use when: symptoms get attention and root causes do not. Avoid when: nothing is hidden.
- SVG: a water line across the middle; a small peak above labelled `{{VISIBLE}}`, a large mass below with up to three labels `{{HIDDEN}}`.
- Image scene: an iceberg in calm sea, a small tip above the water and a huge mass clearly visible below.

**2. Elephant in the room (S13)**
- Says: a large, obvious problem that everyone avoids naming.
- Use when: the message is "we must talk about this". Avoid when: the audience owns the problem and may feel accused.
- SVG: a meeting table with small figures; a large elephant outline beside it labelled `{{PROBLEM}}`.
- Image scene: people in a meeting room looking away from a large elephant standing beside the table.

**3. Blind men and the elephant (S14)**
- Says: each group sees one part and takes it for the whole.
- Use when: teams disagree because each holds a partial view. Avoid when: one view is simply wrong.
- SVG: an elephant outline; four figures at trunk, leg, ear and tail, each labelled with one `{{VIEW}}`.
- Image scene: several blindfolded people each touching a different part of one elephant.

## Movement and progress

**4. Road with milestones (S1, S17)**
- Says: progress is a route with stages, from here to a goal.
- Use when: a plan or change has an order of stages. Avoid when: the work has no order.
- SVG: a winding road from bottom left to top right; circles on it for each `{{STAGE}}`, a flag at `{{GOAL}}`. Carries exact labels, so it suits the diagram ladder.
- Image scene: a winding road across open country toward a distant flag, with markers along the way.

**5. Mountain climb (S3, S1)**
- Says: the goal is hard, the effort goes uphill, and there are camps on the way.
- Use when: the message is about sustained effort to a high goal. Avoid when: the work is easy or flat.
- SVG: a triangle peak; a dotted path up it with camp markers `{{STAGE}}`; the summit labelled `{{GOAL}}`.
- Image scene: climbers roped together on a path up a mountain toward a clear summit.

**6. Stepping stones (S29)**
- Says: small safe steps across something risky reach the far side.
- Use when: an incremental plan crosses a gap. Avoid when: the change is one leap.
- SVG: a river band; stones across it labelled `{{STEP}}` in order; banks labelled `{{FROM}}` and `{{TO}}`. Carries exact labels.
- Image scene: a person crossing a river on a line of flat stepping stones.

**7. Crossroads (S23)**
- Says: we are at a decision point and the paths lead to different places.
- Use when: the message is a choice between options. Avoid when: the choice is already made.
- SVG: a road splitting into two or three; each branch ends in a sign `{{OPTION}}`.
- Image scene: a traveller standing where a country road forks into several paths.

**8. Launch pad (S30)**
- Says: this is the starting point that lets something bigger take off.
- Use when: a foundation piece enables a later push. Avoid when: the thing is already running.
- SVG: a rocket on a pad; the pad labelled `{{FOUNDATION}}`, the rocket `{{AMBITION}}`.
- Image scene: a rocket on a launch pad at dawn, ready to lift off.

**9. Moving target (S31)**
- Says: the goal keeps changing, so aiming once is not enough.
- Use when: requirements or markets shift. Avoid when: the target is fixed.
- SVG: a target shown in three faded positions with arrows between them, labelled `{{GOAL}}`.
- Image scene: an archer aiming at a target that slides along a track.

**10. North Star (S24)**
- Says: one fixed guide keeps many choices pointed the same way.
- Use when: the message is a purpose or measure that guides decisions. Avoid when: there are several equal goals.
- SVG: a star at the top labelled `{{GUIDE}}`; several small paths below all bending toward it.
- Image scene: travellers at night on different paths, all looking up at one bright star.

## Momentum and chain reactions

**11. Flywheel (S9)**
- Says: many small pushes build momentum until the wheel turns on its own.
- Use when: repeated effort compounds. Avoid when: the gains do not build on each other.
- SVG: a large wheel with a curved arrow around it; up to five `{{PUSH}}` labels on the rim.
- Image scene: a person pushing a huge heavy wheel that is starting to spin faster.

**12. Snowball (S11)**
- Says: something small grows faster and faster as it rolls.
- Use when: growth or risk accelerates. Avoid when: growth is steady or linear.
- SVG: a slope with three snowballs, small to large, labelled `{{START}}` and `{{RESULT}}`.
- Image scene: a snowball rolling down a long hill, growing larger as it goes.

**13. Dominoes (S5)**
- Says: one event sets off a chain of others.
- Use when: the message is knock-on effects. Avoid when: the effects are independent.
- SVG: a row of domino rectangles, the first tipping; each may carry an `{{EVENT}}` label. Carries exact labels.
- Image scene: a long row of dominoes, the first one falling into the next.

**14. Tipping point (S6)**
- Says: small changes build up until the system flips.
- Use when: a threshold is near. Avoid when: change is gradual with no threshold.
- SVG: a seesaw with weights piling on one side; the pivot labelled `{{THRESHOLD}}`.
- Image scene: a seesaw on the edge of tipping as one more small weight lands on it.

**15. Perfect storm (S22)**
- Says: several separate factors meet and together cause a crisis.
- Use when: the cause is a combination, not one thing. Avoid when: one cause dominates.
- SVG: three cloud shapes converging on a small boat; each cloud labelled `{{FACTOR}}`.
- Image scene: a small boat where three storm fronts meet over a dark sea.

## Flow and capacity

**16. Funnel (S7)**
- Says: many go in at the top and fewer come out at each stage.
- Use when: the message is drop-off between stages. Avoid when: numbers do not fall.
- SVG: a funnel of stacked bands narrowing downward, each band labelled `{{STAGE}}`. Carries exact labels.
- Image scene: many small balls poured into a wide funnel, a few coming out the narrow end.

**17. Bottleneck (S8)**
- Says: one narrow point limits the whole flow.
- Use when: a single constraint slows everything. Avoid when: the slowdown is spread out.
- SVG: a bottle on its side; many dots inside, few passing the neck labelled `{{CONSTRAINT}}`.
- Image scene: traffic backed up on a wide road that narrows to one lane.

**18. Bathtub (S19)**
- Says: the level depends on what flows in and what drains out, not the inflow alone.
- Use when: people push inflow and ignore loss (staff, customers, backlog). Avoid when: there is no build-up.
- SVG: a tub with a tap labelled `{{INFLOW}}`, a drain labelled `{{OUTFLOW}}`, water level `{{STOCK}}`.
- Image scene: a bathtub filling from a tap while water drains out of the plughole.

## Balance and tension

**19. Scales (S28)**
- Says: two sets of factors are weighed against each other.
- Use when: a trade-off or a case for and against. Avoid when: one side is trivial.
- SVG: a balance beam on a stand; a pan each side labelled `{{SIDE_A}}` and `{{SIDE_B}}`.
- Image scene: an old brass balance scale with a pan on each side.

**20. Tug of war (S21)**
- Says: two groups pull in opposite directions and the rope barely moves.
- Use when: the message is conflicting goals. Avoid when: the groups actually agree.
- SVG: a rope with a centre marker; a team figure at each end labelled `{{GROUP_A}}` and `{{GROUP_B}}`.
- Image scene: two teams straining at opposite ends of a rope.

## Structure and parts

**21. Silos (S12)**
- Says: each group works inside its own walls and nobody sees across.
- Use when: handoffs fail between teams. Avoid when: the teams already share work well.
- SVG: three tall silo shapes side by side, each labelled `{{GROUP}}`; a gap with a question mark above labelled `{{WHOLE}}`.
- Image scene: three tall farm silos standing apart in a field, with no bridge between them.

**22. Bridge (S20)**
- Says: a connection joins two places that were apart.
- Use when: the message is closing a gap between groups or states. Avoid when: the gap is not the point.
- SVG: two cliffs labelled `{{FROM}}` and `{{TO}}`; a bridge between them labelled `{{CONNECTION}}`.
- Image scene: a strong bridge spanning a deep gap between two cliffs.

**23. Jigsaw puzzle (S25)**
- Says: the parts fit together into one picture, and one piece may be missing.
- Use when: the message is how parts combine, or a missing piece. Avoid when: the parts do not depend on each other.
- SVG: four interlocking pieces labelled `{{PART}}`, one gap labelled `{{MISSING}}`.
- Image scene: a nearly complete jigsaw puzzle with one piece missing.

**24. Building blocks (S27)**
- Says: each layer stands on the one below it.
- Use when: capabilities build in order. Avoid when: the parts are independent.
- SVG: stacked rectangles, bottom to top, each labelled `{{LAYER}}`. Carries exact labels.
- Image scene: a tower of wooden blocks built layer by layer.

**25. Keystone (S16)**
- Says: one piece holds the whole structure; remove it and the rest falls.
- Use when: one person, system or decision is critical. Avoid when: the load is shared.
- SVG: a stone arch; the top centre stone highlighted and labelled `{{KEY}}`.
- Image scene: a stone arch with its central keystone lit.

**26. Tree with roots (S1)**
- Says: what shows above ground depends on roots nobody sees.
- Use when: visible results rest on hidden foundations. Avoid when: the message is speed.
- SVG: a trunk and canopy labelled `{{RESULTS}}`; roots below a ground line labelled `{{FOUNDATIONS}}`.
- Image scene: a large tree with its roots shown spreading deep below the soil.

**27. Seed to harvest (S1)**
- Says: what you plant now grows slowly and pays later.
- Use when: an early investment with a delayed return. Avoid when: the result must come now.
- SVG: three stages left to right, seed, sprout, full plant, labelled `{{NOW}}` and `{{LATER}}`.
- Image scene: a row showing a seed, a small sprout and a full grown plant.

## Risk and protection

**28. Swiss cheese (S4)**
- Says: every defence has holes; harm gets through only when the holes line up.
- Use when: layered controls and how failures slip through. Avoid when: there is one control.
- SVG: four slices in a row, each with holes; an arrow through aligned holes labelled `{{HAZARD}}`.
- Image scene: slices of Swiss cheese lined up, a beam of light passing through holes that align.

**29. Safety net (S26)**
- Says: if something falls, this catches it.
- Use when: a fallback or support. Avoid when: the aim is to prevent the fall.
- SVG: a figure on a high wire labelled `{{RISK}}`; a net below labelled `{{SUPPORT}}`.
- Image scene: a tightrope walker high above a wide safety net.

## Choosing and thinking

**30. Low-hanging fruit (S15)**
- Says: the easy wins are within reach now.
- Use when: the message is quick wins first. Avoid when: it could sound dismissive of hard work.
- SVG: a tree with fruit low and high; the low fruit labelled `{{QUICK_WIN}}`.
- Image scene: a fruit tree with ripe fruit hanging low within easy reach.

**31. Ladder of inference (S18)**
- Says: people climb from data to conclusions in steps they do not notice.
- Use when: the message is checking assumptions. Avoid when: the audience wants a result, not reflection.
- SVG: a ladder; rungs from bottom to top labelled with the user's steps. Carries exact labels.
- Image scene: a person climbing a tall ladder above a pile of papers.
