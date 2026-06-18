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
  slugToCategory,
  statusToSlug,
} from "@/lib/seo";
import { categoryOptions, statusOptions } from "@/lib/types";
import { statusConfig } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categoryOptions.map((category) => ({ slug: categoryToSlug(category) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slugToCategory(slug);
  if (!category) return { title: "Category not found" };
  const count = promises.filter((promise) => promise.category === category).length;
  return buildSeoMetadata({
    title: `${category} UDF Manifesto Promises`,
    description: `Track ${count.toLocaleString()} ${category} promises from the Kerala UDF manifesto on Vakku. Check promise status, progress, departments, ministers, source pages, and evidence timelines.`,
    path: `/category/${slug}`,
    keywords: [`${category} UDF promises`, `${category} Kerala election promises`, "Kerala development tracker"],
  });
}

export default async function CategorySeoPage({ params }: PageProps) {
  const { slug } = await params;
  const category = slugToCategory(slug);
  if (!category) notFound();

  const items = promises.filter((promise) => promise.category === category);
  const active = items.filter((promise) => promise.status !== "not_started").length;
  const avgProgress = items.length ? Math.round(items.reduce((sum, promise) => sum + promise.progress, 0) / items.length) : 0;
  const featured = items.slice(0, 12);

  return (
    <>
      <SeoJsonLd
        data={graph([
          collectionPageSchema({
            name: `${category} UDF Manifesto Promises`,
            description: `Status and evidence records for ${category} promises in the Kerala UDF manifesto.`,
            path: `/category/${slug}`,
            itemCount: items.length,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Promise Areas", path: "/categories" },
            { name: category, path: `/category/${slug}` },
          ]),
        ])}
      />
      <section className="seo-index-hero">
        <div className="page-shell seo-index-grid">
          <div>
            <p className="seo-eyebrow">Kerala UDF manifesto category</p>
            <h1>{category} promises</h1>
            <p>
              Track every {category.toLowerCase()} commitment in the UDF Manifesto 2026, including
              current status, progress, source pages, departments, ministers, and public evidence updates.
            </p>
          </div>
          <div className="seo-stat-panel">
            <span>{items.length.toLocaleString()}</span>
            <p>Promises in this area</p>
            <span>{active.toLocaleString()}</span>
            <p>With recorded action</p>
            <span>{avgProgress}%</span>
            <p>Average progress</p>
          </div>
        </div>
      </section>

      <section className="seo-link-band">
        <div className="page-shell seo-chip-row">
          <Link href={`/promises?category=${encodeURIComponent(category)}`}>Search this category</Link>
          <Link href="/manifesto/2026">UDF Manifesto 2026</Link>
          {statusOptions.map((status) => (
            <Link key={status} href={`/status/${statusToSlug(status)}`}>{statusConfig[status].label}</Link>
          ))}
        </div>
      </section>

      <section className="seo-results-section">
        <div className="page-shell">
          <h2>Featured {category.toLowerCase()} promise records</h2>
          <p className="seo-section-sub">
            These records are part of the full {meta.total_promises.toLocaleString()} promise dataset. Each
            card links to a promise page with source attribution and timeline evidence when available.
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
