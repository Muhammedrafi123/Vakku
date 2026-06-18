"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Home,
  LayoutList,
  LayoutGrid,
  UserRound,
  MoreHorizontal,
  X,
  Clock,
  Info,
  Search,
  ArrowRight,
} from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { useLang } from "@/contexts/language-context";
import { brand } from "@/lib/brand";
import { t } from "@/lib/i18n";

/* ── Bottom nav items (5 max) ── */
const bottomItems = [
  { href: "/",           key: "nav_home",       Icon: Home },
  { href: "/promises",   key: "nav_promises",   Icon: LayoutList },
  { href: "/categories", key: "nav_categories", Icon: LayoutGrid },
  { href: "/ministers",  key: "nav_ministers",  Icon: UserRound },
] as const;

/* ── Drawer items (full list) ── */
const drawerItems = [
  { href: "/",           key: "nav_home",           Icon: Home },
  { href: "/promises",   key: "nav_promises",       Icon: LayoutList },
  { href: "/categories", key: "nav_categories",     Icon: LayoutGrid },
  { href: "/ministers",  key: "nav_ministers",      Icon: UserRound },
  { href: "/timeline",   key: "nav_timeline_label", Icon: Clock },
  { href: "/about",      key: "nav_about",          Icon: Info },
] as const;

export function MobileNav() {
  const pathname = usePathname();
  const { lang } = useLang();
  const [drawerOpen, setDrawerOpen] = useState(false);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const showFab = !pathname.startsWith("/promises");

  return (
    <>
      {/* ══════════════════════════════════════════
          BOTTOM NAVIGATION BAR
      ══════════════════════════════════════════ */}
      <nav className="mob-nav" aria-label="Mobile navigation">
        {/* 4 main items */}
        {bottomItems.map(({ href, key, Icon }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`mob-nav-item ${active ? "mob-nav-item--active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <span className="mob-nav-icon">
                <Icon size={22} strokeWidth={active ? 2.2 : 1.8} />
              </span>
              <span className={`mob-nav-label${lang === "ml" ? " malayalam" : ""}`}>{t(lang, key)}</span>
              {active && <span className="mob-nav-indicator" aria-hidden />}
            </Link>
          );
        })}

        {/* More → opens drawer */}
        <button
          type="button"
          className={`mob-nav-item ${drawerOpen ? "mob-nav-item--active" : ""}`}
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
          aria-expanded={drawerOpen}
        >
          <span className="mob-nav-icon">
            <MoreHorizontal size={22} strokeWidth={1.8} />
          </span>
          <span className={`mob-nav-label${lang === "ml" ? " malayalam" : ""}`}>{t(lang, "nav_more")}</span>
        </button>
      </nav>

      {/* ══════════════════════════════════════════
          DRAWER BACKDROP
      ══════════════════════════════════════════ */}
      <div
        className={`mob-drawer-backdrop ${drawerOpen ? "mob-drawer-backdrop--open" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden
      />

      {/* ══════════════════════════════════════════
          DRAWER PANEL
      ══════════════════════════════════════════ */}
      <aside
        className={`mob-drawer ${drawerOpen ? "mob-drawer--open" : ""}`}
        style={{ transform: drawerOpen ? "translateY(0)" : "translateY(100%)" }}
        aria-label="Navigation drawer"
        aria-hidden={!drawerOpen}
      >
        {/* Header */}
        <div className="mob-drawer-header">
          <div className="mob-drawer-logo">
            <div className="mob-drawer-logo-icon">
              <BrandMark size={34} />
            </div>
            <div>
              <p className="mob-drawer-logo-name">{brand.name}</p>
              <p className="mob-drawer-logo-sub">Promise Tracker</p>
            </div>
          </div>
          <button
            type="button"
            className="mob-drawer-close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="mob-drawer-nav">
          {drawerItems.map(({ href, key, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={`mob-drawer-link ${active ? "mob-drawer-link--active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={() => setDrawerOpen(false)}
              >
                <Icon
                  size={20}
                  strokeWidth={active ? 2.2 : 1.8}
                  className="mob-drawer-link-icon"
                />
                <span className={lang === "ml" ? "malayalam" : ""}>{t(lang, key)}</span>
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="mob-drawer-footer">
          <Link
            href="/promises"
            className={`mob-drawer-cta${lang === "ml" ? " malayalam" : ""}`}
            onClick={() => setDrawerOpen(false)}
          >
            {t(lang, "header_explore")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </aside>

      {/* ══════════════════════════════════════════
          FLOATING SEARCH FAB
      ══════════════════════════════════════════ */}
      {showFab && (
        <Link
          href="/promises"
          className="mob-fab"
          aria-label="Search promises"
        >
          <Search size={20} strokeWidth={2.2} />
        </Link>
      )}
    </>
  );
}
