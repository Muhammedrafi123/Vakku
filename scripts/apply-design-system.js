/**
 * apply-design-system.js
 * Full redesign: warm civic editorial aesthetic
 * - Refines hero (warm charcoal + golden copper)
 * - Replaces stats section dark cards → paper typographic strip
 * - Replaces progress section dark → paper
 * - Adds all new design-system CSS classes
 * - Updates mobile nav accent colors
 * - Rebuilds dept-filter → plist editorial style
 * - Updates minister page colors
 */

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'app', 'globals.css');
let css = fs.readFileSync(file, 'utf8');

// ─────────────────────────────────────────────────────────────
// 1. HERO: warm charcoal background + golden copper accent
// ─────────────────────────────────────────────────────────────
css = css.replace(/\.hero-root \{[\s\S]*?background: #080808;/, (m) =>
  m.replace('#080808', '#17120d')
);

// Hero gov badge: remove pulsing dot refs, warm copper border
css = css.replace(/\.hero-gov-badge \{[\s\S]*?\}/m, (m) => {
  return m
    .replace(/border: 1px solid rgba\(232, 130, 26, 0\.4\);/, 'border: 1px solid rgba(196,122,34,0.35);')
    .replace(/color: #e8821a;/, 'color: #c47a22;')
    .replace(/background: rgba\(232, 130, 26, 0\.06\);/, 'background: rgba(196,122,34,0.07);');
});

// Remove pulsing dot animation (clean up hero-gov-dot)
css = css.replace(/\.hero-gov-dot \{[\s\S]*?\n\}/m, '.hero-gov-dot { display: none; }');

// Hero headline accent (orange → golden copper)
css = css.replace(/\.hero-headline-orange \{[\s\S]*?\}/m, (m) =>
  m.replace(/color: #e8821a;/, 'color: #c47a22;')
);

// Hero rule
css = css.replace(/\.hero-rule \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #e8821a;/, 'background: #c47a22;')
);

// Hero glow orb: softer, copper-toned
css = css.replace(/rgba\(232, 130, 26, 0\.48\)/g, 'rgba(196,122,34,0.32)');
css = css.replace(/rgba\(232, 130, 26, 0\.22\)/g, 'rgba(196,122,34,0.14)');
css = css.replace(/rgba\(232, 130, 26, 0\.06\)/g, 'rgba(196,122,34,0.04)');

// Hero rings: softer
css = css.replace(/border: 1px solid rgba\(232, 130, 26, 0\.12\);/, 'border: 1px solid rgba(196,122,34,0.09);');

// Brush quote copper border
css = css.replace(/border-left: 2px solid #e8821a;/, 'border-left: 2px solid #c47a22;');
css = css.replace(/\.brush-quote-mark \{[\s\S]*?\}/m, (m) =>
  m.replace(/color: #e8821a;/, 'color: #c47a22;')
);

// Hero CTA buttons
css = css.replace(/\.hero-cta-primary \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #e8821a;/, 'background: #9c6e2e;')
    .replace(/background: #c46d12;/, 'background: #7a5522;')
);
css = css.replace(/\.hero-cta-ghost:hover \{[\s\S]*?\}/m, (m) =>
  m.replace(/border-color: #e8821a;/, 'border-color: #c47a22;')
    .replace(/color: #e8821a;/, 'color: #c47a22;')
);

// Days counter accent
css = css.replace(/\.dc-unit \{[\s\S]*?\}/m, (m) =>
  m.replace(/color: #e8821a;/, 'color: #c47a22;')
);
css = css.replace(/\.dc-since-dot \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #e8821a;/, 'background: #c47a22;')
);

// ─────────────────────────────────────────────────────────────
// 2. STATS SECTION: dark cards → paper background
// ─────────────────────────────────────────────────────────────
css = css.replace(/\.stats-root \{[\s\S]*?\}/m,
`.stats-root {
  background: var(--paper, #f5f2ec);
  padding: 0;
  border-top: none;
}`
);

css = css.replace(/\.stats-grid \{[\s\S]*?\}/m,
`.stats-grid {
  display: none; /* replaced by home-stats-strip */
}`
);

// ─────────────────────────────────────────────────────────────
// 3. PROGRESS SECTION: dark → paper
// ─────────────────────────────────────────────────────────────
css = css.replace(/\.progress-root \{[\s\S]*?\}/m,
`.progress-root {
  background: var(--paper, #f5f2ec);
  padding: 40px 0;
  border-top: 1px solid var(--rule, #dedad4);
}`
);

css = css.replace(/\.progress-card \{[\s\S]*?\}/m,
`.progress-card {
  background: var(--white, #fff);
  border: 1px solid var(--rule, #dedad4);
  border-radius: 4px;
  padding: 32px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}`
);

// Progress text colors (dark → ink)
css = css.replace(/\.progress-eyebrow \{[\s\S]*?\}/m, (m) =>
  m.replace(/color: rgba\(255, 255, 255, 0\.4\);/, 'color: var(--ink-3, #9b9590);')
);
css = css.replace(/\.progress-big-num \{[\s\S]*?\}/m, (m) =>
  m.replace(/color: #ffffff;/, 'color: var(--ink, #18120e);')
);
css = css.replace(/\.progress-caption \{[\s\S]*?\}/m, (m) =>
  m.replace(/color: rgba\(255, 255, 255, 0\.4\);/, 'color: var(--ink-3, #9b9590);')
);
css = css.replace(/\.progress-days-orange \{[\s\S]*?\}/m, (m) =>
  m.replace(/color: #e8821a;/, 'color: var(--copper, #9c6e2e);')
);

// Segmented bar on paper
css = css.replace(/\.seg-bar \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #2a2a2a;/, 'background: var(--rule, #dedad4);')
    .replace(/height: 14px;/, 'height: 8px;')
);
css = css.replace(/\.seg-bar-fulfilled \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #16a34a;/, 'background: var(--s-fulfilled, #2d6a4f);')
);
css = css.replace(/\.seg-bar-progress \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #e8821a;/, 'background: var(--s-active, #9a4f1e);')
);
css = css.replace(/\.seg-bar-rest \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #2e2e2e;/, 'background: var(--rule, #dedad4);')
);

// Seg labels on paper
css = css.replace(/\.seg-label \{[\s\S]*?\}/m, (m) =>
  m.replace(/color: rgba\(255, 255, 255, 0\.4\);/, 'color: var(--ink-2, #57504a);')
);
css = css.replace(/\.seg-label-green strong \{[\s\S]*?\}/m, (m) =>
  m.replace(/color: #4ade80;/, 'color: var(--s-fulfilled, #2d6a4f);')
);
css = css.replace(/\.seg-label-orange strong \{[\s\S]*?\}/m, (m) =>
  m.replace(/color: #fb923c;/, 'color: var(--s-active, #9a4f1e);')
);
css = css.replace(/\.seg-label-gray strong \{[\s\S]*?\}/m, (m) =>
  m.replace(/color: #6b7280;/, 'color: var(--ink-3, #9b9590);')
);

// Activity strip
css = css.replace(/\.activity-strip \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #f5f0e8;/, 'background: var(--copper-lt, #f0e8d6);')
    .replace(/background: #f5f0e8;/, 'background: var(--copper-lt, #f0e8d6);')
);

// ─────────────────────────────────────────────────────────────
// 4. MOBILE NAV: warm accent colors
// ─────────────────────────────────────────────────────────────
// Bottom bar background stays dark, update accent to copper
css = css.replace(/background: #0d0d0d;\n  border-top: 1px solid rgba\(255,255,255,0\.08\);/,
  'background: #18120e;\n  border-top: 1px solid rgba(255,255,255,0.07);');

// Active item color
css = css.replace(/\.mob-nav-item--active \{\n    color: #E8821A;/,
  '.mob-nav-item--active {\n    color: #c47a22;');

// Nav indicator
css = css.replace(/background: #E8821A;\n  \}[\s\S]*?\/\* --- Backdrop ---/m, (m) =>
  m.replace(/background: #E8821A;/, 'background: #c47a22;')
);

// Drawer background
css = css.replace(/background: #111111;\n  border-top: 1px solid rgba\(255,255,255,0\.1\);/,
  'background: #18120e;\n  border-top: 1px solid rgba(255,255,255,0.08);');

// Drawer logo icon
css = css.replace(/\.mob-drawer-logo-icon \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #E8821A;/, 'background: #9c6e2e;')
);

// Drawer active link
css = css.replace(/\.mob-drawer-link--active \{[\s\S]*?\}/m, (m) =>
  m.replace(/color: #E8821A;/, 'color: #c47a22;')
    .replace(/background: rgba\(232,130,26,0\.1\);/, 'background: rgba(196,122,34,0.12);')
);

// Drawer CTA button
css = css.replace(/\.mob-drawer-cta \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #E8821A;/, 'background: #9c6e2e;')
);
css = css.replace(/\.mob-drawer-cta:active \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #c46d12;/, 'background: #7a5522;')
);

// FAB
css = css.replace(/\.mob-fab \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #E8821A;/, 'background: #9c6e2e;')
    .replace(/box-shadow: 0 4px 20px rgba\(232,130,26,0\.45\);/, 'box-shadow: 0 4px 20px rgba(156,110,46,0.35);')
);
css = css.replace(/\.mob-fab:active \{[\s\S]*?\}/m, (m) =>
  m.replace(/box-shadow: 0 2px 10px rgba\(232,130,26,0\.3\);/, 'box-shadow: 0 2px 10px rgba(156,110,46,0.2);')
);

// ─────────────────────────────────────────────────────────────
// 5. DEPT LIST CARDS: update orange → copper
// ─────────────────────────────────────────────────────────────
css = css.replace(/background: linear-gradient\(135deg, #E8821A, #c46d12\)/g,
  'background: linear-gradient(135deg, #9c6e2e, #7a5522)');
css = css.replace(/\.dept-list-card:hover \{[\s\S]*?\}/m, (m) =>
  m.replace(/border-color: rgba\(232,130,26,0\.4\);/, 'border-color: var(--rule-2, #c8c3bb);')
);
css = css.replace(/\.dept-list-snippet-id \{[\s\S]*?\}/m, (m) =>
  m.replace(/color: #E8821A;/, 'color: var(--copper, #9c6e2e);')
);
css = css.replace(/\.dept-list-view-btn \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #E8821A;/, 'background: var(--copper, #9c6e2e);')
);
css = css.replace(/\.dept-list-view-btn:hover \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #c46d12;/, 'background: var(--copper-dk, #7a5522);')
);

// ─────────────────────────────────────────────────────────────
// 6. MINISTER LISTING COLORS: update to new palette
// ─────────────────────────────────────────────────────────────
css = css.replace(/\.mlist-card:hover \.mlist-name \{ color: #E8821A; \}/,
  '.mlist-card:hover .mlist-name { color: var(--copper, #9c6e2e); }');
css = css.replace(/\.mlist-cm-mark \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #E8821A;/, 'background: var(--copper, #9c6e2e);')
);

// Minister detail accent colors
css = css.replace(/color: #E8821A;/g, 'color: var(--copper, #9c6e2e);');
css = css.replace(/color: #e8821a;/g, 'color: var(--copper, #9c6e2e);');
css = css.replace(/background: rgba\(232,130,26,0\.08\)/g, 'background: var(--copper-tint, rgba(156,110,46,0.08))');
css = css.replace(/background: rgba\(232,130,26,0\.09\)/g, 'background: var(--copper-tint, rgba(156,110,46,0.08))');
css = css.replace(/border: 1px solid rgba\(232,130,26,0\.2\)/g, 'border: 1px solid rgba(156,110,46,0.2)');
css = css.replace(/border: 1px solid rgba\(232,130,26,0\.22\)/g, 'border: 1px solid rgba(156,110,46,0.2)');
css = css.replace(/background: #E8821A;/g, 'background: var(--copper, #9c6e2e);');

// dept-filter active → copper
css = css.replace(/\.dept-filter-tab:hover \{[\s\S]*?\}/m, (m) =>
  m.replace(/color: #E8821A;/, 'color: var(--copper, #9c6e2e);')
    .replace(/border-color: #E8821A;/, 'border-color: var(--copper, #9c6e2e);')
);
css = css.replace(/\.dept-filter-tab--active \{[\s\S]*?\}/m, (m) =>
  m.replace(/background: #E8821A;/, 'background: var(--copper, #9c6e2e);')
    .replace(/border-color: #E8821A;/, 'border-color: var(--copper, #9c6e2e);')
);

// ─────────────────────────────────────────────────────────────
// 7. APPEND NEW DESIGN SYSTEM CSS
// ─────────────────────────────────────────────────────────────
const newCss = `

/* ================================================================
   DESIGN SYSTEM — EDITORIAL CIVIC AESTHETIC
   Warm paper · Deep copper · Authoritative typography
================================================================ */

/* ── Typography utilities ── */
.serif-hed {
  font-family: var(--font-playfair, 'Playfair Display', Georgia, 'Times New Roman', serif);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: var(--ink, #18120e);
}

.section-eye {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--ink-3, #9b9590);
  margin-bottom: 8px;
}

/* ── Site header ── */
.site-hdr {
  position: sticky;
  top: 0;
  z-index: 40;
  background: #ffffff;
  border-bottom: 1px solid var(--rule, #dedad4);
}
.site-hdr-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: 60px;
}
.site-hdr-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
}
.site-hdr-mark {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--copper, #9c6e2e);
  flex-shrink: 0;
}
.site-hdr-wordmark {
  display: flex;
  flex-direction: column;
  gap: 0px;
  line-height: 1;
}
.site-hdr-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--ink, #18120e);
  letter-spacing: -0.01em;
}
.site-hdr-sub {
  font-size: 0.58rem;
  color: var(--ink-3, #9b9590);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 2px;
}
.site-hdr-nav {
  display: none;
  align-items: center;
  gap: 0;
}
@media (min-width: 768px) {
  .site-hdr-nav { display: flex; }
}
.site-hdr-link {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--ink-2, #57504a);
  text-decoration: none;
  padding: 6px 11px;
  border-radius: 3px;
  transition: color 160ms, background 160ms;
  position: relative;
}
.site-hdr-link:hover {
  color: var(--ink, #18120e);
  background: var(--paper, #f5f2ec);
}
.site-hdr-link--active {
  color: var(--copper, #9c6e2e);
  font-weight: 600;
}
.site-hdr-link--active::after {
  content: "";
  position: absolute;
  bottom: 2px;
  left: 11px;
  right: 11px;
  height: 1.5px;
  background: var(--copper, #9c6e2e);
  border-radius: 1px;
}
.site-hdr-cta {
  display: none;
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--copper, #9c6e2e);
  text-decoration: none;
  border: 1.5px solid var(--copper, #9c6e2e);
  padding: 6px 16px;
  border-radius: 3px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: background 160ms, color 160ms;
  flex-shrink: 0;
}
@media (min-width: 640px) {
  .site-hdr-cta { display: block; }
}
.site-hdr-cta:hover {
  background: var(--copper, #9c6e2e);
  color: #fff;
}

/* ── Site footer ── */
.site-ftr {
  background: var(--paper-2, #ede9e1);
  border-top: 1px solid var(--rule, #dedad4);
}
.site-ftr-inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  padding: 52px 0 40px;
}
@media (min-width: 768px) {
  .site-ftr-inner {
    grid-template-columns: 2fr 1fr 1fr;
    gap: 48px;
  }
}
.site-ftr-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--ink, #18120e);
  margin-bottom: 12px;
  font-family: var(--font-playfair, Georgia, serif);
}
.site-ftr-desc {
  font-size: 0.82rem;
  color: var(--ink-2, #57504a);
  line-height: 1.7;
  max-width: 360px;
  margin-bottom: 16px;
}
.site-ftr-meta {
  font-size: 0.68rem;
  color: var(--ink-3, #9b9590);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
}
.site-ftr-stat-eye {
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink-3, #9b9590);
  margin-bottom: 10px;
}
.site-ftr-stat-n {
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--ink, #18120e);
  letter-spacing: -0.04em;
  line-height: 1;
  font-variant-numeric: tabular-nums;
  margin-bottom: 6px;
}
.site-ftr-stat-lbl {
  font-size: 0.75rem;
  color: var(--ink-2, #57504a);
  line-height: 1.4;
}
.site-ftr-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 6px;
}
.site-ftr-link {
  font-size: 0.82rem;
  color: var(--ink-2, #57504a);
  text-decoration: none;
  transition: color 150ms;
  width: fit-content;
  border-bottom: 1px solid transparent;
  padding-bottom: 1px;
}
.site-ftr-link:hover {
  color: var(--copper, #9c6e2e);
  border-bottom-color: var(--copper, #9c6e2e);
}
.site-ftr-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding: 16px 0;
  border-top: 1px solid var(--rule, #dedad4);
}
.site-ftr-copy {
  font-size: 0.72rem;
  color: var(--ink-3, #9b9590);
}
.site-ftr-verified {
  font-size: 0.72rem;
  color: var(--ink-3, #9b9590);
}

/* ── Status tag (replaces colorful badge pills) ── */
.status-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.68rem;
  font-weight: 600;
  padding: 3px 9px;
  border-radius: 3px;
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* ── Promise card — document record ── */
.pcard {
  display: block;
  padding: 24px 0;
  border-bottom: 1px solid var(--rule, #dedad4);
  text-decoration: none;
  position: relative;
  transition: background 180ms;
}
.pcard:first-child {
  border-top: none;
}
.pcard::before {
  content: "";
  position: absolute;
  left: -18px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--copper, #9c6e2e);
  transform: scaleY(0);
  transition: transform 220ms cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  border-radius: 1px;
}
.pcard:hover::before {
  transform: scaleY(1);
}
.pcard-top {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 10px;
}
.pcard-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.pcard-status {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.pcard-pct {
  font-size: 0.65rem;
  font-weight: 600;
  color: var(--copper, #9c6e2e);
  margin-left: auto;
  letter-spacing: 0.04em;
}
.pcard-title {
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--ink, #18120e);
  line-height: 1.6;
  margin-bottom: 8px;
  transition: color 160ms;
}
.pcard:hover .pcard-title {
  color: var(--copper, #9c6e2e);
}
.pcard-ml {
  font-size: 0.88rem;
  color: var(--ink-2, #57504a);
  line-height: 1.75;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
.pcard-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  color: var(--ink-3, #9b9590);
}
.pcard-sep { color: var(--rule-2, #c8c3bb); }

/* ── Promise list toolbar & filters ── */
.plist-dept-row {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 16px;
}
.plist-dept-tab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 2px;
  background: var(--white, #fff);
  color: var(--ink-2, #57504a);
  border: 1px solid var(--rule, #dedad4);
  cursor: pointer;
  transition: color 160ms, border-color 160ms, background 160ms;
}
.plist-dept-tab:hover {
  border-color: var(--copper, #9c6e2e);
  color: var(--copper, #9c6e2e);
}
.plist-dept-tab--on {
  background: var(--copper, #9c6e2e);
  color: #fff;
  border-color: var(--copper, #9c6e2e);
}
.plist-dept-count {
  font-size: 0.6rem;
  font-weight: 700;
  background: rgba(0,0,0,0.1);
  border-radius: 99px;
  padding: 1px 5px;
  min-width: 16px;
  text-align: center;
}
.plist-dept-tab--on .plist-dept-count {
  background: rgba(255,255,255,0.2);
}

.plist-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 14px 0 12px;
  border-top: 2px solid var(--ink, #18120e);
  border-bottom: 1px solid var(--rule, #dedad4);
  margin-bottom: 0;
}
.plist-count {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--ink-3, #9b9590);
}
.plist-filters {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.plist-filter {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--ink-3, #9b9590);
  background: none;
  border: none;
  border-bottom: 1.5px solid transparent;
  cursor: pointer;
  padding: 2px 0;
  transition: color 160ms, border-color 160ms;
}
.plist-filter:hover {
  color: var(--ink, #18120e);
}
.plist-filter--on {
  color: var(--copper, #9c6e2e);
  border-bottom-color: var(--copper, #9c6e2e);
}
.plist-records {
  /* full-width editorial list, no grid */
}
.plist-empty {
  padding: 48px 0;
  text-align: center;
  color: var(--ink-3, #9b9590);
  font-size: 0.9rem;
  border-top: 1px solid var(--rule, #dedad4);
  border-bottom: 1px solid var(--rule, #dedad4);
}

/* ── Typographic stats ── */
.home-stats-section {
  background: var(--paper, #f5f2ec);
  padding: 0;
}
.home-stats-strip {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: 2px solid var(--ink, #18120e);
  padding: 32px 0;
  gap: 0;
}
@media (min-width: 640px) {
  .home-stats-strip {
    grid-template-columns: repeat(4, 1fr);
  }
}
.tstat {
  padding: 20px 24px 20px 0;
  border-right: 1px solid var(--rule, #dedad4);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.tstat:last-child {
  border-right: none;
  padding-right: 0;
}
.tstat:first-child {
  padding-left: 0;
}
@media (max-width: 639px) {
  .tstat {
    padding: 16px 16px 16px 0;
    border-right: none;
    border-bottom: 1px solid var(--rule, #dedad4);
  }
  .tstat:nth-child(odd) {
    padding-left: 0;
    border-right: 1px solid var(--rule, #dedad4);
  }
  .tstat:last-child { border-bottom: none; }
}
.tstat-n-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}
.tstat-n {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 800;
  color: var(--ink, #18120e);
  line-height: 1;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
}
.tstat-pct {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--copper, #9c6e2e);
  letter-spacing: 0;
}
.tstat-lbl {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink-3, #9b9590);
}
.tstat-detail {
  font-size: 0.72rem;
  color: var(--ink-3, #9b9590);
  line-height: 1.4;
}

/* ── Home progress section ── */
.home-progress-section {
  background: var(--paper, #f5f2ec);
  padding: 48px 0;
  border-top: 1px solid var(--rule, #dedad4);
}
.home-progress-inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  background: var(--white, #fff);
  border: 1px solid var(--rule, #dedad4);
  border-radius: 4px;
  padding: 32px;
}
@media (min-width: 640px) {
  .home-progress-inner {
    grid-template-columns: 200px 1fr;
    align-items: center;
  }
}
.home-progress-eye {
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--ink-3, #9b9590);
  margin-bottom: 8px;
}
.home-progress-pct {
  font-size: clamp(2.4rem, 5vw, 3.2rem);
  font-weight: 800;
  color: var(--ink, #18120e);
  line-height: 1;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
  margin-bottom: 8px;
}
.home-progress-caption {
  font-size: 0.78rem;
  color: var(--ink-3, #9b9590);
  line-height: 1.5;
}
.home-seg-bar {
  height: 8px;
  background: var(--rule, #dedad4);
  border-radius: 99px;
  overflow: hidden;
  display: flex;
  margin-bottom: 14px;
}
.home-seg-done {
  height: 100%;
  background: var(--s-fulfilled, #2d6a4f);
  border-radius: 99px 0 0 99px;
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 0;
}
.home-seg-active {
  height: 100%;
  background: var(--s-active, #9a4f1e);
  transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
  min-width: 0;
}
.home-seg-wait {
  height: 100%;
  background: var(--rule, #dedad4);
  border-radius: 0 99px 99px 0;
  flex: 1;
}
.home-seg-labels {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}
.home-seg-lbl {
  font-size: 0.72rem;
  color: var(--ink-2, #57504a);
  display: flex;
  align-items: center;
  gap: 5px;
}
.home-seg-lbl strong {
  font-weight: 700;
  font-size: 0.78rem;
}

/* ── Home page sections ── */
.home-section {
  background: var(--paper, #f5f2ec);
  padding: 72px 0;
  border-top: 1px solid var(--rule, #dedad4);
}
.home-section--white {
  background: var(--white, #fff);
}
.home-section-hdr {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 40px;
}
.home-eye {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--ink-3, #9b9590);
  margin-bottom: 8px;
}
.home-eye--copper { color: var(--copper, #9c6e2e); }
.home-hed {
  font-family: var(--font-playfair, 'Playfair Display', Georgia, 'Times New Roman', serif);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 700;
  color: var(--ink, #18120e);
  letter-spacing: -0.02em;
  line-height: 1.15;
}
.home-hed--sm {
  font-size: clamp(1.3rem, 2.5vw, 1.7rem);
  margin-bottom: 24px;
}
.home-see-all {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--copper, #9c6e2e);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 1px;
  transition: border-color 160ms;
  white-space: nowrap;
  flex-shrink: 0;
}
.home-see-all:hover { border-bottom-color: var(--copper, #9c6e2e); }

/* Category grid */
.home-ccat-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}
@media (min-width: 540px) {
  .home-ccat-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 900px) {
  .home-ccat-grid { grid-template-columns: repeat(4, 1fr); }
}

/* Promise records on home */
.home-records {
  /* single-column editorial list */
}

/* Editorial timeline */
.home-timeline {
  border-top: 2px solid var(--ink, #18120e);
}
.home-timeline-entry {
  padding: 20px 0 20px 20px;
  border-bottom: 1px solid var(--rule, #dedad4);
  border-left: 2px solid var(--rule, #dedad4);
  margin-left: 1px;
  position: relative;
}
.home-timeline-entry::before {
  content: "";
  position: absolute;
  left: -5px;
  top: 24px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--copper, #9c6e2e);
  border: 2px solid var(--white, #fff);
}
.home-timeline-date {
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--copper, #9c6e2e);
  margin-bottom: 4px;
}
.home-timeline-event {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink, #18120e);
  line-height: 1.5;
  margin-bottom: 4px;
}
.home-timeline-link {
  font-size: 0.8rem;
  color: var(--ink-2, #57504a);
  text-decoration: none;
  display: block;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;
  transition: color 150ms;
}
.home-timeline-link:hover { color: var(--copper, #9c6e2e); }
.home-verified {
  font-size: 0.68rem;
  color: var(--ink-3, #9b9590);
  margin-top: 20px;
}

/* ── Category card — editorial ── */
.ccat {
  display: block;
  padding: 18px 0;
  border-bottom: 1px solid var(--rule, #dedad4);
  text-decoration: none;
  transition: background 160ms;
  position: relative;
}
.ccat::before {
  content: "";
  position: absolute;
  left: -18px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--copper, #9c6e2e);
  transform: scaleY(0);
  transition: transform 200ms;
  transform-origin: center;
}
.ccat:hover::before { transform: scaleY(1); }
.ccat-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}
.ccat-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink, #18120e);
  line-height: 1.3;
  transition: color 160ms;
}
.ccat:hover .ccat-name { color: var(--copper, #9c6e2e); }
.ccat-total {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--ink, #18120e);
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.03em;
  flex-shrink: 0;
}
.ccat-track {
  height: 2px;
  background: var(--rule, #dedad4);
  border-radius: 1px;
  overflow: hidden;
  margin-bottom: 8px;
}
.ccat-fill {
  height: 100%;
  background: var(--copper, #9c6e2e);
  border-radius: 1px;
  transition: width 600ms ease;
}
.ccat-foot {
  display: flex;
  gap: 16px;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.ccat-done  { color: var(--s-fulfilled, #2d6a4f); }
.ccat-wait  { color: var(--ink-3, #9b9590); }

/* ── Minister detail accent update ── */
.mdet-badge-cm {
  color: var(--copper, #9c6e2e) !important;
  background: var(--copper-tint, rgba(156,110,46,0.08)) !important;
  border: 1px solid rgba(156,110,46,0.2) !important;
}
.mdet-sec-link  { color: var(--copper, #9c6e2e) !important; }
.mdet-dc-lnk    { color: var(--copper, #9c6e2e) !important; }
.mdet-dc-bar-fill { background: var(--copper, #9c6e2e) !important; }
.mdet-qt-text   { border-left: 2px solid var(--copper, #9c6e2e) !important; }
.mdet-portf-chip:hover { color: var(--ink, #18120e) !important; }
.mdet-back-link:hover  { color: var(--ink, #18120e) !important; }

/* ── Progress bar component (used in old components) ── */
.progress-bar-fill-fulfilled { background: var(--s-fulfilled, #2d6a4f) !important; }
.progress-bar-fill-in_progress { background: var(--s-active, #9a4f1e) !important; }
`;

css += newCss;

fs.writeFileSync(file, css, 'utf8');
console.log('Design system applied. New editorial civic aesthetic active.');
