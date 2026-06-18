import type { Metadata } from "next";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { TimelineExplorer } from "@/components/timeline-explorer";
import { brand } from "@/lib/brand";
import { meta, promises } from "@/lib/data";
import { breadcrumbSchema, buildSeoMetadata, collectionPageSchema, graph } from "@/lib/seo";
import { allTimelineEntries, daysSince } from "@/lib/utils";

export const metadata: Metadata = buildSeoMetadata({
  title: "UDF Promise Evidence Timeline",
  description: `Chronological update feed for verified UDF promise status changes on ${brand.name}, including government updates, source references, departments, and manifesto promise evidence.`,
  path: "/timeline",
  keywords: ["UDF promise evidence", "Kerala government updates", "Kerala development timeline"],
});

export default function TimelinePage() {
  const entries = allTimelineEntries(promises);
  const latestDate = entries[0]?.date;
  const days = latestDate ? daysSince(latestDate) : 0;
  const activeCategories = new Set(entries.map((e) => e.category)).size;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <SeoJsonLd
        data={graph([
          collectionPageSchema({
            name: "UDF Promise Evidence Timeline",
            description: "Chronological evidence feed for verified updates to Kerala UDF manifesto promises.",
            path: "/timeline",
            itemCount: entries.length,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Evidence Timeline", path: "/timeline" },
          ]),
        ])}
      />
      <section className="tl-hero">
        <div className="page-shell">
          <p className="label" style={{ color: "#E8821A" }}>Evidence Timeline</p>
          <h1 className="tl-hero-h1">
            Every Government Action,<br />
            <span className="tl-hero-accent">On Record.</span>
          </h1>
          <p className="tl-hero-sub">
            Verified status changes, government orders, and announcements —
            sourced and timestamped.
          </p>

          {/* Stats strip */}
          <div className="tl-hero-stats">
            <div className="tl-hs-item">
              <span className="tl-hs-num">{entries.length}</span>
              <span className="tl-hs-label">Total Entries</span>
            </div>
            <div className="tl-hs-divider" />
            <div className="tl-hs-item">
              <span className="tl-hs-num">{days}</span>
              <span className="tl-hs-label">Days Since Last Action</span>
            </div>
            <div className="tl-hs-divider" />
            <div className="tl-hs-item">
              <span className="tl-hs-num">{activeCategories}</span>
              <span className="tl-hs-label">Categories Active</span>
            </div>
            <div className="tl-hs-divider" />
            <div className="tl-hs-item">
              <span className="tl-hs-num tl-hs-num--sm">{meta.last_checked}</span>
              <span className="tl-hs-label">Last Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline Explorer ────────────────────────── */}
      <section className="tl-body">
        <div className="page-shell">
          <TimelineExplorer entries={entries} />
        </div>
      </section>
    </>
  );
}
