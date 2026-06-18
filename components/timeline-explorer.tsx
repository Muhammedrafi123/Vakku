"use client";

import { useMemo, useState } from "react";
import { TimelineEntry, type TimelineEntryView } from "@/components/timeline-entry";
import { categoryOptions } from "@/lib/types";

const MONTH_NAMES: Record<string, string> = {
  "01": "January",  "02": "February", "03": "March",    "04": "April",
  "05": "May",      "06": "June",     "07": "July",     "08": "August",
  "09": "September","10": "October",  "11": "November", "12": "December",
};

export function TimelineExplorer({ entries }: { entries: TimelineEntryView[] }) {
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () => entries.filter((e) => category === "all" || e.category === category),
    [entries, category],
  );

  const usedCategories = useMemo(
    () => categoryOptions.filter((o) => entries.some((e) => e.category === o)),
    [entries],
  );

  /* Group by YYYY-MM, newest first */
  const grouped = useMemo(() => {
    const groups: Record<string, TimelineEntryView[]> = {};
    for (const entry of filtered) {
      const key = entry.date.slice(0, 7);
      if (!groups[key]) groups[key] = [];
      groups[key].push(entry);
    }
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }, [filtered]);

  return (
    <div className="tl-explorer">
      {/* ── Category filter pills ── */}
      <div className="tl-filter-bar">
        <button
          onClick={() => setCategory("all")}
          className={`tl-pill${category === "all" ? " tl-pill--on" : ""}`}
        >
          All <span className="tl-pill-count">{entries.length}</span>
        </button>
        {usedCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`tl-pill${category === cat ? " tl-pill--on" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Count row ── */}
      <p className="tl-count-row">
        <span className="tl-count-num">{filtered.length}</span> entries
        {category !== "all" && (
          <> in <strong style={{ color: "rgba(255,255,255,0.55)" }}>{category}</strong></>
        )}
      </p>

      {/* ── Timeline ── */}
      {filtered.length > 0 ? (
        <div className="tl-timeline">
          {grouped.map(([monthKey, monthEntries]) => {
            const [year, month] = monthKey.split("-");
            return (
              <div key={monthKey} className="tl-month-group">
                {/* Month heading */}
                <div className="tl-month-label">
                  <span className="tl-month-name">{MONTH_NAMES[month]}</span>
                  <span className="tl-month-year">{year}</span>
                  <span className="tl-month-count">{monthEntries.length} entries</span>
                </div>

                {/* Entries */}
                <div className="tl-month-entries">
                  {monthEntries.map((entry, i) => (
                    <TimelineEntry
                      key={`${entry.promiseId}-${entry.date}-${i}`}
                      entry={entry}
                      isLast={i === monthEntries.length - 1}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="tl-empty">
          <p className="tl-empty-t">No entries in this category</p>
          <p className="tl-empty-s">Try a different filter above</p>
        </div>
      )}
    </div>
  );
}
