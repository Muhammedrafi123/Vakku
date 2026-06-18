const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'app', 'globals.css');
let css = fs.readFileSync(file, 'utf8');

const MARKER = '/* ================================================================\n   MINISTER DETAIL';
const cut = css.indexOf(MARKER);
if (cut === -1) { console.error('mdet marker not found'); process.exit(1); }

const before = css.slice(0, cut);

const newCss = `/* ================================================================
   MINISTER DETAIL  contained banner + white layout
================================================================ */

.mdet-root {
  background: #fff;
  padding-bottom: 100px;
}

/* Back link */
.mdet-back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #a1a1aa;
  text-decoration: none;
  padding: 28px 0 20px;
  transition: color 150ms;
}
.mdet-back-link:hover { color: #111; }

/* Contained banner image — within page-shell grid */
.mdet-banner {
  width: 100%;
  aspect-ratio: 16 / 6;
  position: relative;
  overflow: hidden;
  background: #f5f3ef;
  border-radius: 10px;
  margin-bottom: 36px;
}
.mdet-banner-mono {
  width: 100%;
  aspect-ratio: 16 / 6;
  background: #f5f3ef;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 36px;
}
.mdet-banner-mono-ltr {
  font-size: 6rem;
  font-weight: 900;
  color: #ccc8c2;
  letter-spacing: -0.06em;
  line-height: 1;
}
@media (max-width: 640px) {
  .mdet-banner, .mdet-banner-mono {
    aspect-ratio: 4 / 3;
    border-radius: 8px;
  }
  .mdet-banner-mono-ltr { font-size: 3.5rem; }
}

/* Identity block */
.mdet-id-section {
  padding-bottom: 32px;
  border-bottom: 1px solid #edeae5;
  margin-bottom: 32px;
}
.mdet-id-badges {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}
.mdet-badge-cm {
  font-size: 0.57rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #E8821A;
  background: rgba(232,130,26,0.08);
  border: 1px solid rgba(232,130,26,0.2);
  border-radius: 100px;
  padding: 3px 10px;
}
.mdet-badge-party {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a1a1aa;
}
.mdet-hname {
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  font-weight: 900;
  color: #111;
  letter-spacing: -0.04em;
  line-height: 1.0;
  margin-bottom: 8px;
}
.mdet-hrole {
  font-size: 0.95rem;
  color: #71717a;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 12px;
}
.mdet-hmeta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.mdet-hmeta-item { display: flex; align-items: center; gap: 5px; font-size: 0.7rem; color: #a1a1aa; }

/* Scorecard */
.mdet-scorecard {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 0;
  margin-bottom: 14px;
  justify-content: start;
}
@media (max-width: 500px) {
  .mdet-scorecard { grid-template-columns: repeat(2, 1fr); gap: 20px 0; }
}
.mdet-score-cell {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-right: 24px;
  border-right: 1px solid #edeae5;
}
.mdet-score-cell:last-child { border-right: none; padding-right: 0; }
.mdet-score-cell:not(:first-child) { padding-left: 24px; }
.mdet-score-n {
  font-size: 2.8rem;
  font-weight: 900;
  color: #111;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.04em;
}
.mdet-score-green { color: #16a34a; }
.mdet-score-amber { color: #d97706; }
.mdet-score-muted { color: #d4d0ca; }
.mdet-score-lbl {
  font-size: 0.57rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #a1a1aa;
}
.mdet-score-pct { font-size: 0.62rem; color: #d4d0ca; }

/* Progress bar */
.mdet-bar { height: 2px; background: #edeae5; display: flex; overflow: hidden; margin-bottom: 8px; }
.mdet-bar-seg { height: 100%; transition: width 700ms ease; }
.mdet-bar-green { background: #16a34a; }
.mdet-bar-amber { background: #d97706; }
.mdet-bar-dim   { background: #e2dfd9; }
.mdet-bar-caption {
  font-size: 0.6rem;
  color: #a1a1aa;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #edeae5;
}

/* Portfolio chips */
.mdet-portf-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-bottom: 52px;
}
.mdet-portf-lbl {
  font-size: 0.57rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: #a1a1aa;
  margin-right: 4px;
}
.mdet-portf-chip {
  font-size: 0.68rem;
  font-weight: 500;
  color: #71717a;
  background: #f7f5f2;
  border: 1px solid #edeae5;
  border-radius: 5px;
  padding: 4px 10px;
  text-decoration: none;
  transition: background 140ms, color 140ms;
}
.mdet-portf-chip:hover { background: #edeae5; color: #111; }

/* Section labels */
.mdet-sec-eye {
  font-size: 0.57rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #a1a1aa;
  margin-bottom: 6px;
}
.mdet-sec-h {
  font-size: 1.5rem;
  font-weight: 800;
  color: #111;
  letter-spacing: -0.02em;
  margin-bottom: 20px;
}
.mdet-sec-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}
.mdet-sec-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #E8821A;
  text-decoration: none;
  transition: gap 140ms;
}
.mdet-sec-link:hover { gap: 8px; }

/* Dept cards */
.mdet-dg {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
  margin-bottom: 52px;
}
.mdet-dc {
  background: #faf9f6;
  border: 1px solid #eae8e3;
  border-radius: 8px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  transition: border-color 160ms;
}
.mdet-dc:hover { border-color: #ccc8c2; }
.mdet-dc-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 6px; }
.mdet-dc-name { font-size: 0.78rem; font-weight: 700; color: #111; line-height: 1.3; }
.mdet-dc-n {
  font-size: 1.35rem;
  font-weight: 900;
  color: #111;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.03em;
  line-height: 1;
  flex-shrink: 0;
}
.mdet-dc-bar { height: 2px; background: #edeae5; border-radius: 1px; overflow: hidden; }
.mdet-dc-bar-fill { height: 100%; background: #E8821A; border-radius: 1px; transition: width 500ms ease; }
.mdet-dc-pills { display: flex; flex-wrap: wrap; gap: 7px; }
.mdet-dc-done   { font-size: 0.62rem; font-weight: 600; color: #16a34a; display: flex; align-items: center; gap: 3px; }
.mdet-dc-active { font-size: 0.62rem; font-weight: 600; color: #d97706; display: flex; align-items: center; gap: 3px; }
.mdet-dc-wait   { font-size: 0.62rem; color: #a1a1aa; display: flex; align-items: center; gap: 3px; }
.mdet-dc-lnk {
  font-size: 0.67rem;
  font-weight: 700;
  color: #E8821A;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
  transition: gap 140ms;
}
.mdet-dc-lnk:hover { gap: 7px; }

/* Quote */
.mdet-qt {
  padding: 32px 0;
  border-top: 1px solid #edeae5;
  margin-bottom: 52px;
}
.mdet-qt-eye { font-size: 0.57rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #a1a1aa; margin-bottom: 14px; }
.mdet-qt-text {
  font-size: 1.08rem;
  font-style: italic;
  color: #111;
  font-weight: 400;
  line-height: 1.82;
  border-left: 2px solid #E8821A;
  padding-left: 18px;
  margin: 0 0 10px;
  quotes: none;
}
.mdet-qt-cite { font-size: 0.68rem; color: #a1a1aa; font-style: normal; font-weight: 600; padding-left: 20px; }

/* Promises */
.mdet-ph {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}
.mdet-ph-leg { display: flex; flex-wrap: wrap; gap: 14px; }
.mdet-ph-leg-item { display: flex; align-items: center; gap: 5px; font-size: 0.68rem; color: #71717a; }
`;

fs.writeFileSync(file, before + newCss, 'utf8');
console.log('mdet CSS updated — white, contained banner.');
