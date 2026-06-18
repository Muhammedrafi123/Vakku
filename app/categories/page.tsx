import type { Metadata } from "next";
import { CategoryCard } from "@/components/category-card";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { brand } from "@/lib/brand";
import { promises } from "@/lib/data";
import { breadcrumbSchema, buildSeoMetadata, collectionPageSchema, graph } from "@/lib/seo";
import { categoryStats } from "@/lib/utils";

export const metadata: Metadata = buildSeoMetadata({
  title: "Kerala UDF Manifesto Promise Areas",
  description: `Explore category-level fulfillment rates and status counts for UDF manifesto promises on ${brand.name}, including healthcare, education, employment, transport, welfare, and governance.`,
  path: "/categories",
  keywords: ["Kerala UDF manifesto categories", "Kerala development tracker", "UDF project tracker"],
});

export default function CategoriesPage() {
  const stats = categoryStats(promises).filter((s) => s.total > 0);
  const totalPromises  = stats.reduce((s, i) => s + i.total, 0);
  const totalFulfilled = stats.reduce((s, i) => s + i.fulfilled, 0);
  const totalActive    = stats.reduce((s, i) => s + i.in_progress + i.announced, 0);

  return (
    <>
      <SeoJsonLd
        data={graph([
          collectionPageSchema({
            name: "Kerala UDF Manifesto Promise Areas",
            description: "Category-level status and progress pages for UDF manifesto promises in Kerala.",
            path: "/categories",
            itemCount: stats.length,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Promise Areas", path: "/categories" },
          ]),
        ])}
      />
      {/* Hero */}
      <section className="cat-page-hero">
        <div className="page-shell cat-page-hero-inner">
          <p className="cat-page-label">Promise areas</p>
          <h1 className="cat-page-title">
            Where do the<br />
            <em>promises stand?</em>
          </h1>
          <div className="cat-page-meta">
            <div className="cat-page-meta-item">
              <span className="cat-page-meta-val">{totalPromises.toLocaleString()}</span>
              <span className="cat-page-meta-key">Total promises</span>
            </div>
            <div className="cat-page-meta-sep" />
            <div className="cat-page-meta-item">
              <span className="cat-page-meta-val">{stats.length}</span>
              <span className="cat-page-meta-key">Sectors</span>
            </div>
            <div className="cat-page-meta-sep" />
            <div className="cat-page-meta-item">
              <span className="cat-page-meta-val">{totalFulfilled.toLocaleString()}</span>
              <span className="cat-page-meta-key">Fulfilled</span>
            </div>
            <div className="cat-page-meta-sep" />
            <div className="cat-page-meta-item">
              <span className="cat-page-meta-val">{totalActive.toLocaleString()}</span>
              <span className="cat-page-meta-key">In motion</span>
            </div>
          </div>
        </div>
      </section>

      {/* Card grid */}
      <section className="cat-page-body">
        <div className="page-shell">
          <div className="cat-grid">
            {stats.map((item, i) => (
              <CategoryCard
                key={item.category}
                category={item.category}
                total={item.total}
                fulfilled={item.fulfilled}
                inProgress={item.in_progress + item.announced}
                notStarted={item.not_started}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
