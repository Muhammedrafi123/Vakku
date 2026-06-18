import type { Metadata } from "next";
import { Suspense } from "react";
import { PromiseExplorer } from "@/components/promise-explorer";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { brand } from "@/lib/brand";
import { meta, promises } from "@/lib/data";
import { breadcrumbSchema, buildSeoMetadata, collectionPageSchema, graph } from "@/lib/seo";

export const metadata: Metadata = buildSeoMetadata({
  title: "UDF Manifesto Promise Database",
  description: `Search, filter, and sort every tracked UDF manifesto promise on ${brand.name}. Check Kerala election promises by category, status, importance, source page, department, and minister.`,
  path: "/promises",
  keywords: ["UDF promise database", "UDF status checker", "Kerala election promise search"],
});

export default function PromisesPage() {
  const moving = meta.partial + meta.in_progress + meta.announced;
  const fulfillRate = Math.round((meta.fulfilled / meta.total_promises) * 100);

  return (
    <>
      <SeoJsonLd
        data={graph([
          collectionPageSchema({
            name: "UDF Manifesto Promise Database",
            description: "Searchable public database of Kerala UDF manifesto promises, statuses, categories, ministers, departments, and source pages.",
            path: "/promises",
            itemCount: meta.total_promises,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Promises", path: "/promises" },
          ]),
        ])}
      />
      <section className="pl-hero">
        <div className="page-shell pl-hero-inner">
          <p className="pl-hero-label">Promise explorer</p>
          <h1 className="pl-hero-title">
            Every promise,<br />
            <em>tracked.</em>
          </h1>
          <div className="pl-hero-kpis">
            <div className="pl-kpi">
              <span className="pl-kpi-val">{meta.total_promises.toLocaleString()}</span>
              <span className="pl-kpi-key">Total promises</span>
            </div>
            <div className="pl-kpi-sep" />
            <div className="pl-kpi">
              <span className="pl-kpi-val">{meta.fulfilled.toLocaleString()}</span>
              <span className="pl-kpi-key">Fulfilled</span>
            </div>
            <div className="pl-kpi-sep" />
            <div className="pl-kpi">
              <span className="pl-kpi-val">{moving.toLocaleString()}</span>
              <span className="pl-kpi-key">In motion</span>
            </div>
            <div className="pl-kpi-sep" />
            <div className="pl-kpi">
              <span className="pl-kpi-val">{fulfillRate}%</span>
              <span className="pl-kpi-key">Fulfillment rate</span>
            </div>
          </div>
        </div>
      </section>

      <section className="pl-body">
        <div className="page-shell">
          <Suspense fallback={<div className="pe-loading">Loading promises…</div>}>
            <PromiseExplorer promises={promises} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
