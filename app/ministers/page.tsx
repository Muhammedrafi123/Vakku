import "./ministers.css";
import type { Metadata } from "next";
import Image from "next/image";
import fs from "fs";
import path from "path";
import { Users, FileText, CheckCircle, TrendingUp } from "lucide-react";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { brand } from "@/lib/brand";
import { promises } from "@/lib/data";
import { getAllMinisterProfiles } from "@/lib/ministers";
import { breadcrumbSchema, buildSeoMetadata, collectionPageSchema, graph } from "@/lib/seo";
import { MinistersClient } from "@/components/ministers-client";
import type { MinisterCardData } from "@/components/ministers-client";

export const metadata: Metadata = buildSeoMetadata({
  title: "Kerala UDF Cabinet Promise Accountability",
  description: `Track all 21 UDF government ministers in Kerala, their departments, manifesto promise portfolios, progress status, and accountability records on ${brand.name}.`,
  path: "/ministers",
  keywords: ["Kerala UDF ministers", "UDF cabinet promises", "Kerala minister accountability"],
});

export default function MinistersPage() {
  const allProfiles = getAllMinisterProfiles();

  /* Per-minister stats */
  const ministerStats: MinisterCardData[] = allProfiles.map((profile) => {
    const mine = promises.filter((p) => p.minister === profile.name);
    const fulfilled = mine.filter((p) => p.status === "fulfilled").length;
    const active = mine.filter(
      (p) => p.status === "in_progress" || p.status === "announced",
    ).length;
    const hasPhoto =
      !!profile.imagePath &&
      fs.existsSync(path.join(process.cwd(), "public", profile.imagePath));
    const progress =
      mine.length > 0 ? Math.round((fulfilled / mine.length) * 100) : 0;

    return {
      slug: profile.slug,
      name: profile.name,
      role: profile.role,
      partyShort: profile.partyShort,
      partyColor: profile.partyColor,
      imagePath: profile.imagePath,
      portfolios: profile.portfolios ?? [],
      isChiefMinister: !!profile.isChiefMinister,
      hasPhoto,
      total: mine.length,
      fulfilled,
      active,
      progress,
    };
  });

  /* CM first, then sorted by promise count */
  const sorted: MinisterCardData[] = [
    ...ministerStats.filter((m) => m.isChiefMinister),
    ...ministerStats
      .filter((m) => !m.isChiefMinister)
      .sort((a, b) => b.total - a.total),
  ];

  /* Aggregate stats */
  const totalMinisters = allProfiles.length;
  const totalPromises = ministerStats.reduce((s, m) => s + m.total, 0);
  const totalFulfilled = ministerStats.reduce((s, m) => s + m.fulfilled, 0);
  const totalActive = ministerStats.reduce((s, m) => s + m.active, 0);

  /* Leadership: CM + top 6 by total */
  const leadership: MinisterCardData[] = [
    ...sorted.filter((m) => m.isChiefMinister),
    ...sorted.filter((m) => !m.isChiefMinister).slice(0, 6),
  ];

  return (
    <div className="mlist-root">
      <SeoJsonLd
        data={graph([
          collectionPageSchema({
            name: "Kerala UDF Cabinet Promise Accountability",
            description: "Minister-level accountability pages for Kerala UDF manifesto promises and department portfolios.",
            path: "/ministers",
            itemCount: allProfiles.length,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Cabinet", path: "/ministers" },
          ]),
        ])}
      />

      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="mlist-hero" aria-label="Cabinet hero">

        {/* Illustration — direct child of section so position:absolute
            resolves cleanly to the section bounds (top:0 → bottom:0).
            Rendered before page-shell so it sits below the text in z-order. */}
        <div className="mlist-hero-img-wrap" aria-hidden>
          <Image
            src="/assets/ministers/hero.png"
            alt="Kerala UDF Cabinet Ministers"
            fill
            priority
            sizes="(max-width: 880px) 90vw, 52vw"
            className="object-cover"
            style={{ objectPosition: "center top" }}
          />
        </div>

        <div className="page-shell">
          {/* Left — text block (max-width keeps it clear of the illustration) */}
          <div className="mlist-hero-left">
            <p className="mlist-hero-eye">Kerala Government &middot; 2026</p>

            <h1 className="mlist-hero-hed">The Cabinet</h1>

            {/* Bold stacked taglines */}
            <div className="mlist-hero-taglines">
              <p className="mlist-hero-tag-line">{totalMinisters} ministers.</p>
              <p className="mlist-hero-tag-line">{totalPromises} promises.</p>
              <p className="mlist-hero-tag-line">Every department tracked.</p>
            </div>

            <p className="mlist-hero-desc">
              Track the ministers, departments, and promises shaping
              Kerala&rsquo;s next five years.
            </p>

            {/* Stat chips */}
            <div className="mlist-hero-chips">
              <div className="mlist-hero-chip">
                <div className="mlist-hero-chip-icon mlist-hero-chip-icon--orange">
                  <Users size={15} />
                </div>
                <div>
                  <span className="mlist-hero-chip-num">{totalMinisters}</span>
                  <span className="mlist-hero-chip-lbl">Cabinet Members</span>
                </div>
              </div>

              <div className="mlist-hero-chip">
                <div className="mlist-hero-chip-icon mlist-hero-chip-icon--blue">
                  <FileText size={15} />
                </div>
                <div>
                  <span className="mlist-hero-chip-num">{totalPromises}</span>
                  <span className="mlist-hero-chip-lbl">Promises Assigned</span>
                </div>
              </div>

              <div className="mlist-hero-chip">
                <div className="mlist-hero-chip-icon mlist-hero-chip-icon--green">
                  <CheckCircle size={15} />
                </div>
                <div>
                  <span className="mlist-hero-chip-num">{totalFulfilled}</span>
                  <span className="mlist-hero-chip-lbl">Fulfilled</span>
                </div>
              </div>

              <div className="mlist-hero-chip">
                <div className="mlist-hero-chip-icon mlist-hero-chip-icon--amber">
                  <TrendingUp size={15} />
                </div>
                <div>
                  <span className="mlist-hero-chip-num">{totalActive}</span>
                  <span className="mlist-hero-chip-lbl">In Progress</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Client component: search strip + leadership cards + all ministers grid */}
      <MinistersClient leadership={leadership} ministers={sorted} />

    </div>
  );
}
