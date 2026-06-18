import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PromiseCard } from "@/components/promise-card";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { meta, promises } from "@/lib/data";
import {
  breadcrumbSchema,
  buildSeoMetadata,
  categoryToSlug,
  collectionPageSchema,
  graph,
  slugToStatus,
  statusToSlug,
} from "@/lib/seo";
import { categoryOptions, statusOptions } from "@/lib/types";
import { statusConfig } from "@/lib/utils";

type PageProps = { params: Promise<{ status: string }> };

export function generateStaticParams() {
  return statusOptions.map((status) => ({ status: statusToSlug(status) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { status: slug } = await params;
  const status = slugToStatus(slug);
  if (!status) return { title: "Status not found" };
  const label = statusConfig[status].label;
  const count = promises.filter((promise) => promise.status === status).length;
  return buildSeoMetadata({
    title: `${label} UDF Promises`,
    description: `Check ${count.toLocaleString()} ${label.toLowerCase()} UDF manifesto promises in Kerala on Vakku. Review source pages, categories, progress, departments, ministers, and evidence timelines.`,
    path: `/status/${slug}`,
    keywords: [`${label} UDF promises`, "UDF status checker", "Kerala promise status"],
  });
}

export default async function StatusSeoPage({ params }: PageProps) {
  const { status: slug } = await params;
  const status = slugToStatus(slug);
  if (!status) notFound();

  const label = statusConfig[status].label;
  const items = promises.filter((promise) => promise.status === status);
  const featured = items.slice(0, 12);
  const avgProgress = items.length ? Math.round(items.reduce((sum, promise) => sum + promise.progress, 0) / items.length) : 0;

  return (
    <>
      <SeoJsonLd
        data={graph([
          collectionPageSchema({
            name: `${label} UDF Promises`,
            description: `Promise records currently marked ${label} in the Kerala UDF manifesto tracker.`,
            path: `/status/${slug}`,
            itemCount: items.length,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Promises", path: "/promises" },
            { name: label, path: `/status/${slug}` },
          ]),
        ])}
      />
      <section className="seo-index-hero">
        <div className="page-shell seo-index-grid">
          <div>
            <p className="seo-eyebrow">UDF status checker</p>
            <h1>{label} UDF promises</h1>
            <p>
              Review Kerala UDF manifesto promises currently marked {label.toLowerCase()}, with
              source page references, progress percentages, departments, ministers, and evidence status.
            </p>
          </div>
          <div className="seo-stat-panel">
            <span>{items.length.toLocaleString()}</span>
            <p>Promises with this status</p>
            <span>{avgProgress}%</span>
            <p>Average progress</p>
            <span>{meta.total_promises.toLocaleString()}</span>
            <p>Total tracked promises</p>
          </div>
        </div>
      </section>

      <section className="seo-link-band">
        <div className="page-shell seo-chip-row">
          <Link href={`/promises?status=${status}`}>Search this status</Link>
          <Link href="/manifesto/2026">UDF Manifesto 2026</Link>
          {categoryOptions.slice(0, 8).map((category) => (
            <Link key={category} href={`/category/${categoryToSlug(category)}`}>{category}</Link>
          ))}
        </div>
      </section>

      <section className="seo-results-section">
        <div className="page-shell">
          <h2>Featured {label.toLowerCase()} promise records</h2>
          <p className="seo-section-sub">
            These records are drawn from the full public promise dataset and link to individual evidence
            pages with manifesto source references.
          </p>
          <div className="pd-related-grid">
            {featured.map((promise) => (
              <PromiseCard key={promise.id} promise={promise} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
