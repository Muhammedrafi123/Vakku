const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'app', 'globals.css');
let css = fs.readFileSync(file, 'utf8');

const MARKER = '/* ================================================================\n   MINISTERS LISTING PAGE';
const cut = css.indexOf(MARKER);
if (cut === -1) {
  // Try alternate marker
  const alt = css.indexOf('MINISTERS LISTING');
  console.error('Marker not found at expected position, found at:', alt);
  process.exit(1);
}

const before = css.slice(0, cut);

const newCss = `/* ================================================================
   MINISTERS LISTING
================================================================ */

.mlist-root {
  background: #fff;
  min-height: 70vh;
  padding: 72px 0 120px;
}
.mlist-header { margin-bottom: 64px; }
.mlist-eyebrow {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #a1a1aa;
  margin-bottom: 16px;
}
.mlist-title {
  font-size: clamp(3.5rem, 7.5vw, 7rem);
  font-weight: 900;
  color: #111;
  letter-spacing: -0.045em;
  line-height: 0.93;
}
.mlist-sub {
  margin-top: 16px;
  font-size: 0.875rem;
  color: #a1a1aa;
}

.mlist-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 52px 28px;
}
@media (max-width: 1100px) { .mlist-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 760px)  { .mlist-grid { grid-template-columns: repeat(2, 1fr); gap: 40px 20px; } }
@media (max-width: 440px)  { .mlist-grid { grid-template-columns: 1fr 1fr; gap: 32px 12px; } }

.mlist-card--cm { grid-column: span 2; }

.mlist-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-decoration: none;
}

.mlist-photo-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background: #f5f3ef;
}
.mlist-card--cm .mlist-photo-wrap { aspect-ratio: 4 / 3; }
.mlist-photo-wrap img { transition: transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.mlist-card:hover .mlist-photo-wrap img { transform: scale(1.04); }

.mlist-mono-wrap {
  width: 100%;
  aspect-ratio: 2 / 3;
  background: #f5f3ef;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mlist-card--cm .mlist-mono-wrap { aspect-ratio: 4 / 3; }
.mlist-mono-ltr {
  font-size: 2.4rem;
  font-weight: 900;
  color: #c8c4be;
  letter-spacing: -0.05em;
}

.mlist-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0 1px;
}
.mlist-meta-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}
.mlist-cm-mark {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #E8821A;
  flex-shrink: 0;
}
.mlist-party-tag {
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #b4b0aa;
}
.mlist-name {
  font-size: 0.97rem;
  font-weight: 800;
  color: #111;
  letter-spacing: -0.02em;
  line-height: 1.2;
  transition: color 200ms ease;
}
.mlist-card:hover .mlist-name { color: #E8821A; }
.mlist-card--cm .mlist-name { font-size: 1.3rem; }
.mlist-role-text {
  font-size: 0.68rem;
  color: #8c8882;
  line-height: 1.45;
}
.mlist-nums {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: 6px;
}
.mlist-num-total {
  font-size: 0.73rem;
  font-weight: 700;
  color: #111;
  font-variant-numeric: tabular-nums;
}
.mlist-num-div {
  width: 1px;
  height: 9px;
  background: #e2dfd9;
  flex-shrink: 0;
}
.mlist-num-done   { font-size: 0.68rem; color: #16a34a; font-weight: 600; }
.mlist-num-active { font-size: 0.68rem; color: #d97706; font-weight: 600; }

/* ================================================================
   MINISTER DETAIL  sticky split portrait left / content right
================================================================ */

.mdet-root { background: #fff; }

.mdet-split {
  display: grid;
  grid-template-columns: 40% 1fr;
  align-items: start;
}
@media (max-width: 860px) { .mdet-split { grid-template-columns: 1fr; } }

.mdet-portrait {
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  overflow: hidden;
  background: #f5f3ef;
}
.mdet-portrait-mono {
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  background: #f5f3ef;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mdet-portrait-mono-ltr {
  font-size: 6.5rem;
  font-weight: 900;
  color: #c8c4be;
  letter-spacing: -0.06em;
  line-height: 1;
}
@media (max-width: 860px) {
  .mdet-portrait { position: relative; top: 0; height: auto; aspect-ratio: 4 / 3; }
  .mdet-portrait-mono { position: relative; top: 0; height: auto; aspect-ratio: 4 / 3; }
  .mdet-portrait-mono-ltr { font-size: 3.5rem; }
}

.mdet-body {
  padding: 52px 60px 100px;
  max-width: 680px;
}
@media (max-width: 1100px) { .mdet-body { padding: 44px 40px 80px; } }
@media (max-width: 860px)  { .mdet-body { padding: 36px 24px 72px; max-width: none; } }

.mdet-back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #b4b0aa;
  text-decoration: none;
  margin-bottom: 44px;
  transition: color 150ms;
}
.mdet-back-link:hover { color: #111; }

.mdet-id-badges {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}
.mdet-badge-cm {
  font-size: 0.57rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #E8821A;
  background: rgba(232,130,26,0.09);
  border: 1px solid rgba(232,130,26,0.22);
  border-radius: 100px;
  padding: 3px 10px;
}
.mdet-badge-party {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #b4b0aa;
}

.mdet-hname {
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  font-weight: 900;
  color: #111;
  letter-spacing: -0.04em;
  line-height: 1.0;
  margin-bottom: 10px;
}
.mdet-hrole {
  font-size: 1rem;
  color: #8c8882;
  font-weight: 400;
  line-height: 1.55;
  margin-bottom: 14px;
}
.mdet-hmeta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding-bottom: 36px;
  margin-bottom: 36px;
  border-bottom: 1px solid #edeae5;
}
.mdet-hmeta-item { display: flex; align-items: center; gap: 5px; font-size: 0.7rem; color: #b4b0aa; }

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
  color: #b4b0aa;
}
.mdet-score-pct { font-size: 0.62rem; color: #d4d0ca; }

.mdet-bar { height: 2px; background: #edeae5; display: flex; overflow: hidden; margin-bottom: 8px; }
.mdet-bar-seg { height: 100%; transition: width 700ms ease; }
.mdet-bar-green { background: #16a34a; }
.mdet-bar-amber { background: #d97706; }
.mdet-bar-dim   { background: #e2dfd9; }
.mdet-bar-caption {
  font-size: 0.6rem;
  color: #b4b0aa;
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #edeae5;
}

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
  color: #b4b0aa;
  margin-right: 4px;
}
.mdet-portf-chip {
  font-size: 0.68rem;
  font-weight: 500;
  color: #8c8882;
  background: #f5f3ef;
  border: 1px solid #edeae5;
  border-radius: 5px;
  padding: 4px 10px;
  text-decoration: none;
  transition: background 140ms, color 140ms;
}
.mdet-portf-chip:hover { background: #edeae5; color: #111; }

.mdet-sec-eye {
  font-size: 0.57rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #b4b0aa;
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
.mdet-dc-wait   { font-size: 0.62rem; color: #b4b0aa; display: flex; align-items: center; gap: 3px; }
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

.mdet-qt {
  padding: 32px 0;
  border-top: 1px solid #edeae5;
  margin-bottom: 52px;
}
.mdet-qt-eye { font-size: 0.57rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #b4b0aa; margin-bottom: 14px; }
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
.mdet-qt-cite { font-size: 0.68rem; color: #b4b0aa; font-style: normal; font-weight: 600; padding-left: 20px; }

.mdet-ph {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}
.mdet-ph-leg { display: flex; flex-wrap: wrap; gap: 14px; }
.mdet-ph-leg-item { display: flex; align-items: center; gap: 5px; font-size: 0.68rem; color: #8c8882; }
`;

fs.writeFileSync(file, before + newCss, 'utf8');
console.log('CSS updated. Lines before cut:', before.split('\n').length);
