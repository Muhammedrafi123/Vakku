import type { Metadata } from "next";
import Link from "next/link";
import { PromiseCard } from "@/components/promise-card";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { meta, promises, unresolvedHighImportance } from "@/lib/data";
import {
  breadcrumbSchema,
  buildSeoMetadata,
  categoryToSlug,
  collectionPageSchema,
  datasetSchema,
  faqSchema,
  graph,
  statusToSlug,
} from "@/lib/seo";
import { categoryOptions, statusOptions } from "@/lib/types";
import { categoryStats, statusConfig } from "@/lib/utils";

export const metadata: Metadata = buildSeoMetadata({
  title: "Kerala UDF Manifesto 2026 Promise Tracker",
  description:
    "Explore the Kerala UDF Manifesto 2026 as a structured public accountability tracker with every promise, category, department, minister, status, source page, and evidence timeline.",
  path: "/manifesto/2026",
  keywords: ["Kerala UDF Manifesto 2026", "UDF election manifesto 2026", "Kerala manifesto promises"],
});

export default function Manifesto2026Page() {
  const stats = categoryStats(promises).filter((item) => item.total > 0);
  const featured = unresolvedHighImportance(9);

  return (
    <>
      <SeoJsonLd
        data={graph([
          datasetSchema(meta.total_promises, meta.last_checked),
          collectionPageSchema({
            name: "Kerala UDF Manifesto 2026 Promise Tracker",
            description: "Structured index of every tracked Kerala UDF Manifesto 2026 promise.",
            path: "/manifesto/2026",
            itemCount: meta.total_promises,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Manifesto 2026", path: "/manifesto/2026" },
          ]),
          faqSchema([
            {
              question: "What is included in the UDF Manifesto 2026 tracker?",
              answer:
                "The tracker includes every extracted manifesto promise, source page, category, status, progress value, department, minister, and evidence timeline update where verified evidence exists.",
            },
            {
              question: "Are UDF manifesto promise status changes automatic?",
              answer:
                "No. Status, progress, and timeline changes require verified public evidence and human editorial review before the public record changes.",
            },
            {
              question: "How does Vakku help AI search engines answer Kerala promise tracker queries?",
              answer:
                "Vakku provides stable URLs, semantic headings, structured data, concise factual summaries, breadcrumb schema, dataset schema, and internal links for promise, category, status, minister, and manifesto pages.",
            },
          ]),
        ])}
      />
      <section className="seo-index-hero">
        <div className="page-shell seo-index-grid">
          <div>
            <p className="seo-eyebrow">Kerala UDF manifesto</p>
            <h1>UDF Manifesto 2026 promise tracker</h1>
            <p>
              Vakku converts the UDF Manifesto 2026 into a searchable civic accountability record:
              every promise, source page, status, category, department, minister, progress value, and
              evidence timeline in one public tracker.
            </p>
          </div>
          <div className="seo-stat-panel">
            <span>{meta.total_promises.toLocaleString()}</span>
            <p>Total promises</p>
            <span>{meta.overall_progress_percent}%</span>
            <p>Overall progress</p>
            <span>{meta.last_checked}</span>
            <p>Last verified</p>
          </div>
        </div>
      </section>

      <section className="seo-link-band">
        <div className="page-shell seo-chip-row">
          <Link href="/promises">Search all promises</Link>
          <Link href="/timeline">Evidence timeline</Link>
          {statusOptions.map((status) => (
            <Link key={status} href={`/status/${statusToSlug(status)}`}>{statusConfig[status].label}</Link>
          ))}
        </div>
      </section>

      <section className="seo-results-section">
        <div className="page-shell">
          <h2>Manifesto promise areas</h2>
          <p className="seo-section-sub">
            Category pages create a stable SEO index for Kerala development tracking, UDF project tracking,
            and long-tail promise status searches.
          </p>
          <div className="seo-category-list">
            {categoryOptions.map((category) => {
              const stat = stats.find((item) => item.category === category);
              return (
                <Link key={category} href={`/category/${categoryToSlug(category)}`}>
                  <span>{category}</span>
                  <strong>{stat?.total ?? 0}</strong>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="seo-results-section">
        <div className="page-shell">
          <h2>High-importance UDF promise records</h2>
          <p className="seo-section-sub">
            These high-importance records help citizens quickly inspect major manifesto commitments and
            follow evidence-backed status changes over time.
          </p>
          <div className="pd-related-grid">
            {featured.map((promise) => (
              <PromiseCard key={promise.id} promise={promise} />
            ))}
          </div>
        </div>
      </section>

      <section className="seo-faq-section" aria-labelledby="manifesto-faq-title">
        <div className="page-shell">
          <div className="seo-faq-grid">
            <div>
              <p className="seo-eyebrow">AI-readable civic record</p>
              <h2 id="manifesto-faq-title">How this manifesto tracker works</h2>
              <p>
                The tracker is designed for citizens, journalists, researchers, and AI search systems that
                need concise, structured, source-aware information about Kerala election promises.
              </p>
            </div>
            <div className="seo-faq-list">
              <details>
                <summary>What is included in the UDF Manifesto 2026 tracker?</summary>
                <p>Every extracted manifesto promise, source page, category, status, progress value, department, minister, and timeline update where evidence exists.</p>
              </details>
              <details>
                <summary>Are status changes automatic?</summary>
                <p>No. Verified editorial review is required before promise status, progress, or timeline records change.</p>
              </details>
              <details>
                <summary>Can this tracker support AI search answers?</summary>
                <p>Yes. Pages use semantic headings, stable URLs, structured data, concise facts, and internal links that help answer engines retrieve the public record accurately.</p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
