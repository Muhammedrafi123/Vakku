"use client";

import type { ReactNode } from "react";
import { useLang } from "@/contexts/language-context";

type Accent = "orange" | "green" | "amber" | "gray";

const accentMap: Record<Accent, { icon: string; value: string; bar: string }> = {
  orange: { icon: "rgba(232,130,26,0.18)", value: "#ffffff",    bar: "#E8821A" },
  green:  { icon: "rgba(22,163,74,0.18)",  value: "#4ade80",    bar: "#16a34a" },
  amber:  { icon: "rgba(217,119,6,0.18)",  value: "#fbbf24",    bar: "#d97706" },
  gray:   { icon: "rgba(107,114,128,0.18)",value: "#9ca3af",    bar: "#4b5563" },
};

export function StatCard({
  label,
  labelMl,
  value,
  detail,
  detailMl,
  percent,
  icon,
  accent = "orange",
}: {
  label: string;
  labelMl?: string;
  value: string | number;
  detail?: string;
  detailMl?: string;
  percent?: string;
  icon?: ReactNode;
  accent?: Accent;
}) {
  const { lang } = useLang();
  const isMl = lang === "ml";
  const displayLabel  = isMl && labelMl  ? labelMl  : label;
  const displayDetail = isMl && detailMl ? detailMl : detail;
  const c = accentMap[accent];

  return (
    <div className="stat-card-new">
      <div className="stat-icon-circle" style={{ background: c.icon }}>
        <span style={{ color: accentMap[accent].bar }}>{icon}</span>
      </div>
      <p className={`stat-label${isMl ? " malayalam" : ""}`}>{displayLabel}</p>
      <div className="stat-value-row">
        <span className="stat-value-num" style={{ color: c.value }}>{value}</span>
        {percent && (
          <span className="stat-value-pct" style={{ color: accentMap[accent].bar }}>({percent})</span>
        )}
      </div>
      {displayDetail && <p className={`stat-detail${isMl ? " malayalam" : ""}`}>{displayDetail}</p>}
      <div className="stat-bottom-bar" style={{ background: c.bar }} />
    </div>
  );
}
