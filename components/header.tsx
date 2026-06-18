"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { useLang } from "@/contexts/language-context";
import { brand } from "@/lib/brand";
import { t } from "@/lib/i18n";

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

const navKeys = [
  { href: "/",           key: "nav_home" },
  { href: "/promises",   key: "nav_promises" },
  { href: "/categories", key: "nav_categories" },
  { href: "/ministers",  key: "nav_ministers" },
  { href: "/timeline",   key: "nav_timeline_label" },
  { href: "/about",      key: "nav_about" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { lang, setLang } = useLang();
  const isMl = lang === "ml";

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0a0a0a]/95 backdrop-blur-md">
      <div className="page-shell flex min-h-16 items-center justify-between gap-5 py-2">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label={`${brand.name} home`}>
          <BrandMark size={40} priority />
          <div className="leading-none">
            <span className="block text-[13px] font-bold text-white tracking-wide">{brand.name}</span>
            <span className="block text-[9px] font-semibold uppercase tracking-[0.15em] text-white/40 mt-0.5">Promise Tracker</span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-0.5 text-[13px] font-medium">
          {navKeys.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2.5 rounded-sm transition-colors duration-150${isMl ? " malayalam" : ""} ${
                  active ? "text-[#E8821A]" : "text-white/55 hover:text-white/90"
                }`}
              >
                {t(lang, item.key)}
                {active && (
                  <span className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] bg-[#E8821A] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/promises"
            className="hidden sm:flex text-white/50 hover:text-white transition-colors p-1.5"
            aria-label="Search promises"
          >
            <Search size={17} />
          </Link>

          {/* Language toggle */}
          <button
            type="button"
            onClick={() => setLang(isMl ? "en" : "ml")}
            className="lang-toggle"
            aria-label={isMl ? "Switch to English" : "Switch to Malayalam"}
            title={isMl ? "Switch to English" : "Switch to Malayalam"}
          >
            <GlobeIcon />
            <span className={`lang-toggle-label${isMl ? " malayalam" : ""}`}>
              {isMl ? "മലയാളം" : "EN"}
            </span>
          </button>

          <Link
            href="/promises"
            className={`hidden sm:flex items-center gap-2 border border-[#E8821A]/70 text-[#E8821A] hover:bg-[#E8821A] hover:text-white hover:border-[#E8821A] transition-all duration-200 px-4 py-2 text-[13px] font-semibold rounded-sm${isMl ? " malayalam" : ""}`}
          >
            {t(lang, "header_explore")}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}
