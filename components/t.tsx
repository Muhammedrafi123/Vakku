"use client";

import { useLang } from "@/contexts/language-context";

/**
 * Inline bilingual text switcher.
 * Safe to use inside server components — it's a client island.
 *
 * <T en="Total Promises" ml="ആകെ വാഗ്ദാനങ്ങൾ" />
 */
export function T({
  en,
  ml,
  className,
  mlClass = "malayalam",
}: {
  en: string;
  ml: string;
  className?: string;
  mlClass?: string;
}) {
  const { lang } = useLang();
  const isMl = lang === "ml";
  const text = isMl ? ml : en;
  const cls = [className, isMl ? mlClass : ""].filter(Boolean).join(" ") || undefined;
  if (cls) return <span className={cls}>{text}</span>;
  return <>{text}</>;
}
