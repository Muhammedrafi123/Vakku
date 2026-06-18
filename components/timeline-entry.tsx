"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";

export interface TimelineEntryView {
  date: string;
  title: string;
  summary: string;
  promiseId: string;
  category: string;
  promiseTitle: string;
  status_from?: string;
  status_to?: string;
  source_title?: string;
  source_url?: string;
}

const STATUS_COLOR: Record<string, string> = {
  fulfilled:   "#16a34a",
  in_progress: "#e8821a",
  announced:   "#2563eb",
  partial:     "#4f46e5",
  not_started: "#9ca3af",
  delayed:     "#d97706",
  abandoned:   "#dc2626",
};

const MONTH_SHORT: Record<string, string> = {
  "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr",
  "05": "May", "06": "Jun", "07": "Jul", "08": "Aug",
  "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
};

export function TimelineEntry({
  entry,
  isLast,
}: {
  entry: TimelineEntryView;
  isLast?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [, month, day] = entry.date.split("-");

  const toColor   = entry.status_to   ? (STATUS_COLOR[entry.status_to]   ?? "#9ca3af") : null;
  const fromColor = entry.status_from ? (STATUS_COLOR[entry.status_from] ?? "#9ca3af") : null;
  const hasContent = !!(entry.title || entry.summary);

  /* Scroll-reveal via IntersectionObserver */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([ev]) => {
        if (ev.isIntersecting) {
          el.classList.add("tl-entry--visible");
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`tl-entry${isLast ? " tl-entry--last" : ""}`}>

      {/* ── Date badge ── */}
      <div className="tl-entry-date">
        <span className="tl-entry-day">{day}</span>
        <span className="tl-entry-mon">{MONTH_SHORT[month]}</span>
      </div>

      {/* ── Connector: dot + vertical line ── */}
      <div className="tl-connector">
        <div
          className="tl-dot"
          style={
            toColor
              ? {
                  borderColor: toColor,
                  background: `${toColor}18`,
                  boxShadow: `0 0 8px ${toColor}50`,
                }
              : undefined
          }
        />
        {!isLast && <div className="tl-line" />}
      </div>

      {/* ── Card ── */}
      <div className="tl-card">
        {/* Meta row */}
        <div className="tl-card-meta">
          <Link href={`/promise/${entry.promiseId}`} className="tl-id-badge">
            {entry.promiseId}
          </Link>
          <span className="tl-cat-badge">{entry.category}</span>
        </div>

        {/* Body */}
        {hasContent ? (
          <>
            {entry.title   && <h2 className="tl-card-title">{entry.title}</h2>}
            {entry.summary && <p className="tl-card-summary">{entry.summary}</p>}
          </>
        ) : (
          entry.promiseTitle && (
            <p className="tl-card-ref">{entry.promiseTitle}</p>
          )
        )}

        {/* Status transition */}
        {entry.status_from && entry.status_to && (
          <div className="tl-status-row">
            <span
              className="tl-status-chip"
              style={{
                color: fromColor ?? "#9ca3af",
                borderColor: `${fromColor ?? "#9ca3af"}45`,
                background:  `${fromColor ?? "#9ca3af"}12`,
              }}
            >
              {entry.status_from.replace(/_/g, " ")}
            </span>
            <svg
              width="14" height="8" viewBox="0 0 14 8"
              fill="none" className="tl-status-arrow" aria-hidden
            >
              <path
                d="M1 4H13M9 1L13 4L9 7"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
            <span
              className="tl-status-chip tl-status-chip--to"
              style={{
                color: toColor ?? "#9ca3af",
                borderColor: `${toColor ?? "#9ca3af"}45`,
                background:  `${toColor ?? "#9ca3af"}12`,
              }}
            >
              {entry.status_to.replace(/_/g, " ")}
            </span>
          </div>
        )}

        {/* Source */}
        {entry.source_url && (
          <a
            href={entry.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="tl-source-link"
          >
            <ExternalLink size={11} />
            {entry.source_title ?? "Source"}
          </a>
        )}
      </div>
    </div>
  );
}
