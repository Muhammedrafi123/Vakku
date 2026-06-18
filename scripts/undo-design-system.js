/**
 * undo-design-system.js
 * Reverses all changes made by apply-design-system.js
 */

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'app', 'globals.css');
let css = fs.readFileSync(file, 'utf8');

// ─── 1. Remove the appended design system block ───────────────
const cutMarker = '\n\n/* ================================================================\n   DESIGN SYSTEM — EDITORIAL CIVIC AESTHETIC';
const cutIdx = css.indexOf(cutMarker);
if (cutIdx !== -1) {
  css = css.slice(0, cutIdx);
  console.log('Removed appended design system CSS block.');
} else {
  console.log('Warning: appended block not found (may already be removed).');
}

// ─── 2. Revert @theme ─────────────────────────────────────────
css = css.replace('--color-background: #f5f2ec;', '--color-background: #ffffff;');
css = css.replace('--color-foreground: #18120e;', '--color-foreground: #111111;');
css = css.replace('\n  --font-serif: var(--font-playfair, "Playfair Display", Georgia, "Times New Roman", serif);', '');

// ─── 3. Revert hero background ────────────────────────────────
css = css.replace('background: #17120d;', 'background: #080808;');

// ─── 4. Revert hero gov dot ───────────────────────────────────
css = css.replace(
  '.hero-gov-dot { display: none; }',
  `.hero-gov-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #e8821a;
  animation: pulse-dot 2s ease-in-out infinite;
  flex-shrink: 0;
}`
);

// ─── 5. Revert copper accent refs back to orange ──────────────
// Hero gov badge colors
css = css.replace('border: 1px solid rgba(196,122,34,0.35);', 'border: 1px solid rgba(232, 130, 26, 0.4);');
css = css.replace(/color: #c47a22;/g, 'color: #e8821a;');
css = css.replace('background: rgba(196,122,34,0.07);', 'background: rgba(232, 130, 26, 0.06);');

// Glow orb
css = css.replace(/rgba\(196,122,34,0\.32\)/g, 'rgba(232, 130, 26, 0.48)');
css = css.replace(/rgba\(196,122,34,0\.14\)/g, 'rgba(232, 130, 26, 0.22)');
css = css.replace(/rgba\(196,122,34,0\.04\)/g, 'rgba(232, 130, 26, 0.06)');

// Hero rings
css = css.replace('border: 1px solid rgba(196,122,34,0.09);', 'border: 1px solid rgba(232, 130, 26, 0.12);');

// Brush quote
css = css.replace('border-left: 2px solid #c47a22;', 'border-left: 2px solid #e8821a;');

// Days counter
css = css.replace('background: #c47a22;', 'background: #e8821a;');

// ─── 6. Revert stats-root ─────────────────────────────────────
css = css.replace(
  `.stats-root {
  background: var(--paper, #f5f2ec);
  padding: 0;
  border-top: none;
}`,
  `.stats-root {
  background: #0d0d0d;
  padding: 32px 0 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}`
);

css = css.replace(
  `.stats-grid {
  display: none; /* replaced by home-stats-strip */
}`,
  `.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}`
);

// ─── 7. Revert progress-root ──────────────────────────────────
css = css.replace(
  `.progress-root {
  background: var(--paper, #f5f2ec);
  padding: 40px 0;
  border-top: 1px solid var(--rule, #dedad4);
}`,
  `.progress-root {
  background: #111111;
  padding: 40px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}`
);

css = css.replace(
  `.progress-card {
  background: var(--white, #fff);
  border: 1px solid var(--rule, #dedad4);
  border-radius: 4px;
  padding: 32px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}`,
  `.progress-card {
  background: #161616;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 6px;
  padding: 28px 28px 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}`
);

// Progress text colors
css = css.replace('color: var(--ink-3, #9b9590);', 'color: rgba(255, 255, 255, 0.4);');
css = css.replace('color: var(--ink, #18120e);', 'color: #ffffff;');
// Note: there are multiple of these so we need to handle them
css = css.replace(/color: var\(--ink-3, #9b9590\);/g, 'color: rgba(255, 255, 255, 0.4);');
css = css.replace(/color: var\(--ink, #18120e\);/g, 'color: #ffffff;');
css = css.replace('color: var(--copper, #9c6e2e);', 'color: #e8821a;');

// Seg bar
css = css.replace('background: var(--rule, #dedad4);\n  border-radius: 99px', 'background: #2a2a2a;\n  border-radius: 999px');
css = css.replace('height: 8px;\n  background: var(--rule, #dedad4);\n  border-radius: 999px', 'height: 14px;\n  background: #2a2a2a;\n  border-radius: 999px');
css = css.replace('background: var(--s-fulfilled, #2d6a4f);', 'background: #16a34a;');
css = css.replace('background: var(--s-active, #9a4f1e);', 'background: #e8821a;');
css = css.replace(/background: var\(--rule, #dedad4\);/g, 'background: #2e2e2e;');

// Seg labels
css = css.replace(/color: var\(--ink-2, #57504a\);/g, 'color: rgba(255, 255, 255, 0.4);');
css = css.replace('color: var(--s-fulfilled, #2d6a4f);', 'color: #4ade80;');
css = css.replace('color: var(--s-active, #9a4f1e);', 'color: #fb923c;');
css = css.replace(/color: var\(--ink-3, #9b9590\);/g, 'color: #6b7280;');

// Activity strip
css = css.replace('background: var(--copper-lt, #f0e8d6);', 'background: #f5f0e8;');

// ─── 8. Revert mobile nav ─────────────────────────────────────
css = css.replace(
  'background: #18120e;\n  border-top: 1px solid rgba(255,255,255,0.07);',
  'background: #0d0d0d;\n  border-top: 1px solid rgba(255,255,255,0.08);'
);
css = css.replace(
  '.mob-nav-item--active {\n    color: #c47a22;',
  '.mob-nav-item--active {\n    color: #E8821A;'
);
css = css.replace(
  'background: #18120e;\n  border-top: 1px solid rgba(255,255,255,0.08);',
  'background: #111111;\n  border-top: 1px solid rgba(255,255,255,0.1);'
);

// ─── 9. Revert background orange changes ──────────────────────
css = css.replace(/background: var\(--copper, #9c6e2e\);/g, 'background: #E8821A;');
css = css.replace(/background: var\(--copper-dk, #7a5522\);/g, 'background: #c46d12;');
css = css.replace(/color: var\(--copper, #9c6e2e\);/g, 'color: #E8821A;');
css = css.replace('background: linear-gradient(135deg, #9c6e2e, #7a5522)', 'background: linear-gradient(135deg, #E8821A, #c46d12)');

// Dept list cards
css = css.replace('border-color: var(--rule-2, #c8c3bb);', 'border-color: rgba(232,130,26,0.4);');
css = css.replace('color: var(--copper, #9c6e2e);', 'color: #E8821A;');

// dept-filter active
css = css.replace('border-color: var(--copper, #9c6e2e);\n  color: var(--copper, #9c6e2e);', 'border-color: #E8821A;\n  color: #E8821A;');
css = css.replace('background: var(--copper, #9c6e2e);\n  color: #fff;\n  border-color: var(--copper, #9c6e2e);', 'background: #E8821A;\n  color: #fff;\n  border-color: #E8821A;');

// Mlist hover
css = css.replace('.mlist-card:hover .mlist-name { color: var(--copper, #9c6e2e); }', '.mlist-card:hover .mlist-name { color: #E8821A; }');

// mdet overrides (rgba ones)
css = css.replace(/background: var\(--copper-tint, rgba\(156,110,46,0\.08\)\)/g, 'background: rgba(232,130,26,0.08)');
css = css.replace(/border: 1px solid rgba\(156,110,46,0\.2\)/g, 'border: 1px solid rgba(232,130,26,0.2)');
css = css.replace(/background: var\(--copper-tint, rgba\(156,110,46,0\.08\)\)/g, 'background: rgba(232,130,26,0.09)');

// mlist cm-mark
css = css.replace('background: var(--copper, #9c6e2e);', 'background: #E8821A;');

// catch any remaining var(--copper) stragglers
css = css.replace(/var\(--copper, #9c6e2e\)/g, '#E8821A');
css = css.replace(/var\(--copper-dk, #7a5522\)/g, '#c46d12');
css = css.replace(/var\(--rule, #dedad4\)/g, '#e5e7eb');
css = css.replace(/var\(--rule-2, #c8c3bb\)/g, '#9ca3af');
css = css.replace(/var\(--ink, #18120e\)/g, '#111111');
css = css.replace(/var\(--ink-2, #57504a\)/g, '#4b5563');
css = css.replace(/var\(--ink-3, #9b9590\)/g, '#9ca3af');
css = css.replace(/var\(--white, #fff\)/g, '#ffffff');
css = css.replace(/var\(--paper, #f5f2ec\)/g, '#f8f7f4');
css = css.replace(/var\(--s-fulfilled, #2d6a4f\)/g, '#16a34a');
css = css.replace(/var\(--s-active, #9a4f1e\)/g, '#d97706');
css = css.replace(/var\(--copper-lt, #f0e8d6\)/g, '#f5f0e8');
css = css.replace(/var\(--copper-tint, rgba\(156,110,46,0\.08\)\)/g, 'rgba(232,130,26,0.08)');

fs.writeFileSync(file, css, 'utf8');
console.log('globals.css fully restored to original state.');
