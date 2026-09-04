import { chromium } from 'playwright';
const url = 'file://' + process.argv[2] + '/test.html';
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
await page.goto(url);
// topbar injected
const okTopbar = (await page.locator('.topbar h1').textContent()).startsWith('Brief runtime test');
const okProgress = (await page.locator('#progress').textContent()) === '0/1 questions resolved';
// answer persist
await page.fill('#ans-Q1', 'my test answer');
// tick
await page.check('section[data-q="Q1"] .tick input');
/* Collapsing animates over .22s, so asserting straight after check() catches
   the body mid-fold and reports it visible. Wait for the settled height rather
   than for a duration: it is the thing the assertion actually means. */
await page.locator('section[data-q="Q1"] .q-body')
  .evaluate((e) => new Promise((done) => {
    const t = setTimeout(done, 1000);
    const tick = () => (e.getBoundingClientRect().height === 0
      ? (clearTimeout(t), done())
      : requestAnimationFrame(tick));
    tick();
  }));
const collapsed = await page.locator('section[data-q="Q1"] .q-body').isHidden();
const okProgress2 = (await page.locator('#progress').textContent()) === '1/1 questions resolved';
// selection comment
await page.locator('section[data-sec="overview"] .sec-body p').first().selectText();
await page.mouse.up();
await page.waitForSelector('#cpop', { timeout: 3000 });
// the popover must NOT steal the selection — plain copy has to keep working
const selectionSurvives = await page.evaluate(() => {
  const s = window.getSelection();
  return !!s && !s.isCollapsed && s.toString().trim().length > 0;
});
await page.fill('#cpop textarea', 'a test comment');
await page.click('#cpop [data-act="save"]');
const markCount = await page.locator('mark.cmt').count();
// copy JSON via button
await page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
await page.click('#copyBtn');
const json = JSON.parse(await page.evaluate(() => navigator.clipboard.readText()));
// download JSON via button — same payload, named file
const [download] = await Promise.all([page.waitForEvent('download'), page.click('#downloadBtn')]);
const dlName = download.suggestedFilename();
const okDownload = /^[a-z0-9-]+-responses-\d{4}-\d{2}-\d{2}\.json$/.test(dlName);
// reload persistence
await page.reload();
const persistTick = await page.locator('section[data-q="Q1"]').evaluate(el => el.classList.contains('done'));
await page.uncheck('section[data-q="Q1"] .tick input');
/* Un-ticking now animates the body back open over .22s. Selecting text before
   it settles scrolls to a position the layout is about to move, which leaves
   the pointer over the topbar and the comment popover never opens. */
await page.waitForTimeout(400);
const persistAns = await page.inputValue('#ans-Q1');
const reanchored = await page.locator('mark.cmt').count();
// cross-element selection: the .assume paragraph wraps <strong> children, so the
// old surroundContents() path threw and the comment was saved but never marked.
await page.locator('section[data-q="Q1"] p.assume').selectText();
await page.mouse.up();
await page.waitForSelector('#cpop', { timeout: 3000 });
await page.fill('#cpop textarea', 'crosses an element boundary');
await page.click('#cpop [data-act="save"]');
const crossMarks = await page.locator('mark.cmt').count() - reanchored;
// draft recovery: type, then dismiss without saving
await page.locator('section[data-sec="overview"] .sec-body p').last().selectText();
await page.mouse.up();
await page.waitForSelector('#cpop', { timeout: 3000 });
await page.fill('#cpop textarea', 'an abandoned draft');
await page.keyboard.press('Escape');
const popGone = await page.locator('#cpop').count() === 0;
await page.reload();
const crossReanchored = await page.locator('mark.cmt[data-cid]').count() >= 2;
// drawer lists saved comments and the recovered draft
await page.click('#cmtBtn');
await page.waitForSelector('#cdrawer .drow', { timeout: 3000 });
const drawerRows = await page.locator('#cdrawer .drow').count();
const draftRows = await page.locator('#cdrawer .drow.draft').count();
const draftText = await page.locator('#cdrawer .drow.draft .db').first().textContent();
// tooltips carry the shortcut, and no title attributes are used
const tipText = await page.locator('#copyBtn').getAttribute('data-tip');
const noTitleAttrs = await page.locator('.topbar [title]').count() === 0;
await page.click('#cdrawer [data-d="close"]');
await page.click('#copyBtn');
const json2 = JSON.parse(await page.evaluate(() => navigator.clipboard.readText()));
const draftInJSON = (json2.drafts || []).some(d => d.comment === 'an abandoned draft');
console.log(JSON.stringify({ crossMarks, popGone, crossReanchored, drawerRows, draftRows,
  draftText, tipText, noTitleAttrs, draftInJSON }, null, 1));
console.log(JSON.stringify({ okTopbar, okProgress, collapsed, okProgress2, markCount, selectionSurvives,
  jsonAnswer: json.answers[0], jsonComment: json.comments[0], okDownload, dlName,
  persistTick, persistAns, reanchored, errors }, null, 1));

// ── editable document: click-to-edit, toolbar, rail, tables ──────────────
// Only runs when the page carries a [data-doc]; a brief without one skips it.
if (await page.locator('[data-doc]').count()) {
  const doc = page.locator('[data-doc]').first();
  const railBars = await doc.locator('.doc-bar-i').count();          // rail built while reading
  const toolsHiddenAtRest = await doc.locator('.doc-tools').isHidden();

  // click the rendered text: it enters edit mode AND lands the caret there
  const para = doc.locator('.doc-view p').first();
  await para.scrollIntoViewIfNeeded();
  const box = await para.boundingBox();
  await page.mouse.click(box.x + box.width - 60, box.y + box.height / 2);
  const editable = await doc.locator('.doc-view').getAttribute('contenteditable');
  const toolsVisible = await doc.locator('.doc-tools').isVisible();
  const caretInPara = await page.evaluate(() => {
    const s = getSelection(); if (!s.rangeCount) return false;
    let n = s.getRangeAt(0).startContainer;
    while (n && n.nodeName !== 'P') n = n.parentNode;
    return !!n;
  });
  // the caret is where the click was, not at the start of the block
  const caretOffset = await page.evaluate(() => getSelection().getRangeAt(0).startOffset);
  await page.keyboard.type('EDITED-IN-PLACE');
  await page.waitForTimeout(120);
  const flag = await doc.locator('.doc-flag').textContent();

  // toolbar reflects the caret's context: put it in the H1, H1 lights up
  await page.evaluate(() => {
    const h = document.querySelector('[data-doc] .doc-view h1');
    const r = document.createRange(); r.setStart(h.firstChild, 1); r.collapse(true);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    document.querySelector('[data-doc] .doc-view').dispatchEvent(new Event('keyup', { bubbles: true }));
  });
  await page.waitForTimeout(80);
  const h1Active = await doc.locator('.doc-tool', { hasText: 'H1' }).first().evaluate(el => el.classList.contains('on'));

  // bold via the toolbar, on a selection, survives the round-trip to markdown
  await page.evaluate(() => {
    const el = document.querySelector('[data-doc] .doc-view p');
    const r = document.createRange(); r.setStart(el.firstChild, 0); r.setEnd(el.firstChild, 5);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
  });
  await doc.locator('.doc-tool.t-b').click();
  await page.waitForTimeout(120);

  // Raw MD carries the same document, as markdown — including the table
  await doc.locator('.doc-srcbtn').click();
  const md = await doc.locator('.doc-src').inputValue();
  const mdHasEdit = md.includes('EDITED-IN-PLACE');
  const mdHasHeading = /^# Heading one/m.test(md);
  const mdHasList = /^- one$/m.test(md);
  const mdHasQuote = /^> a quote/m.test(md);
  const mdHasBold = /\*\*/.test(md);
  const mdHasTable = /^\| Col A \| Col B \|/m.test(md) && /^\|\s*---/m.test(md);
  const srcBtnLabel = await doc.locator('.doc-srcbtn').textContent();

  // back to rich, Done, reload: the edit persists, stored as markdown
  await doc.locator('.doc-srcbtn').click();
  const tableRendered = await doc.locator('.doc-view table td').count();
  await doc.locator('.doc-done').click();
  await page.reload();
  const persisted = (await doc.locator('.doc-view').textContent()).includes('EDITED-IN-PLACE');
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem(Object.keys(localStorage).find(k => k.includes('test-brief')))));
  const editStored = Object.values(stored.edits || {}).some(v => typeof v === 'string' && v.includes('EDITED-IN-PLACE'));

  // heading rail: hovering opens the flyout of titles, active bar is marked
  await doc.locator('.doc-bar-i').first().hover();
  await page.waitForTimeout(100);
  const flyoutOpen = await doc.locator('.doc-fly').isVisible();
  const flyoutItems = await doc.locator('.doc-fly-i').count();
  const hasActiveBar = await doc.locator('.doc-bar-i.on').count();

  await doc.locator('.doc-revert').click();
  const afterRevert = await doc.locator('.doc-view').textContent();
  console.log(JSON.stringify({ railBars, toolsHiddenAtRest, editable, toolsVisible, caretInPara,
    caretMidBlock: caretOffset > 0, flag, h1Active, mdHasEdit, mdHasHeading, mdHasList, mdHasQuote,
    mdHasBold, mdHasTable, tableRendered, srcBtnLabel, persisted, editStored, flyoutOpen,
    flyoutItems, hasActiveBar, revertClean: !afterRevert.includes('EDITED-IN-PLACE') }, null, 1));
}

// comments drawer: one click opens it, one closes it. Re-rendering the button's
// icon used to detach the click target and close the drawer on the same click.
const cbtn = page.locator('#cmtBtn');
await cbtn.click(); await page.waitForTimeout(80);
const drawerOpensInOneClick = await page.locator('#cdrawer').isVisible();
await cbtn.click(); await page.waitForTimeout(80);
const drawerClosesInOneClick = await page.locator('#cdrawer').isHidden();
console.log(JSON.stringify({ drawerOpensInOneClick, drawerClosesInOneClick, jsErrors: errors }, null, 1));

// ── summary page: placement, and "Copy summary as markdown" ─────────────
/* The copy path only exists on a page carrying a .summary-page, so the fixture
   losing one would skip this whole block — and a skipped check reads exactly
   like a passing one. Refuse to finish instead. */
const summaryCount = await page.locator('.summary-page').count();
const tocCount = await page.locator('section[data-sec="toc"]').count();
if (!summaryCount || !tocCount) {
  console.error('FIXTURE BROKEN: test.html must carry a .summary-page and a ' +
    'section[data-sec="toc"]. The summary copy assertions cannot run without them.');
  await browser.close();
  process.exit(1);
}

// the contents sit ABOVE the summary page, and the definitions INSIDE it
const contentsAboveSummary = await page.evaluate(() =>
  document.querySelector('section[data-sec="toc"]')
    .compareDocumentPosition(document.querySelector('.summary-page'))
    === Node.DOCUMENT_POSITION_FOLLOWING);
const definitionsInsideSummary =
  await page.locator('.summary-page section[data-sec="definitions"]').count() === 1;
// the part lede that cites sources carries its own collapsed evidence block
const ledeHasEvidence =
  await page.locator('.summary-page > details.l5').count() === 1;

await page.click('.summary-page .pagecopy');
const smd = await page.evaluate(() => navigator.clipboard.readText());
const refsBlock = (smd.split('## References')[1] || '').trim();
const summaryHasRefs = /\n## References\n/.test(smd);
// only the sources this part cites — 1 and 3, never the uncited 2
const refNumbers = refsBlock.split('\n').filter(l => /^\d+\. /.test(l.trim()))
  .map(l => parseInt(l.trim(), 10));
const refsOnlyCited = JSON.stringify(refNumbers) === JSON.stringify([1, 3]);
const uncitedAbsent = !/Uncited Author/.test(smd);
// the collapsed evidence block is DROPPED, not flattened into the paste
const evidenceDropped = !/dropped from the paste/.test(smd)
  && !/likewise dropped/.test(smd) && !/2 quotes/.test(smd);
const summaryHasVerdict = /The runtime ships the summary copy button/.test(smd);
const summaryHasDefinitions = /Summary page/.test(smd.split('## References')[0]);
console.log(JSON.stringify({ contentsAboveSummary, definitionsInsideSummary, ledeHasEvidence,
  summaryHasRefs, refNumbers, refsOnlyCited, uncitedAbsent, evidenceDropped,
  summaryHasVerdict, summaryHasDefinitions }, null, 1));

await browser.close();
