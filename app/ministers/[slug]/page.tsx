import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  CircleDashed,
  Clock,
  MapPin,
} from "lucide-react";
import { DeptPromiseList } from "@/components/dept-promise-list";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { brand } from "@/lib/brand";
import { promises } from "@/lib/data";
import { getAllMinisterSlugs, getMinisterBySlug, ministerInitials } from "@/lib/ministers";
import { breadcrumbSchema, buildSeoMetadata, graph } from "@/lib/seo";

export function generateStaticParams() {
  return getAllMinisterSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const profile = getMinisterBySlug(slug);
  if (!profile) return { title: "Cabinet member not found" };

  const count = promises.filter((promise) => promise.minister === profile.name).length;

  return buildSeoMetadata({
    title: `${profile.name} UDF Promise Accountability`,
    description: `${profile.name}, ${profile.role}. Track ${count.toLocaleString()} Kerala UDF manifesto promises under this portfolio with departments, status, progress, and evidence records.`,
    path: `/ministers/${slug}`,
    keywords: [
      profile.name,
      profile.role,
      "Kerala UDF ministers",
      "UDF cabinet promises",
      "Kerala minister accountability",
    ],
    image: profile.imagePath ?? brand.appIcon,
  });
}

export default async function MinisterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const profile = getMinisterBySlug(slug);

  if (!profile) {
    return (
      <section className="py-24 text-center">
        <p className="text-xl font-bold text-[#111]">Not found.</p>
        <Link href="/ministers" className="mt-4 inline-block text-[#E8821A] hover:underline">
          Back to Cabinet
        </Link>
      </section>
    );
  }

  const mine = promises.filter((p) => p.minister === profile.name);
  const depts = [...new Set(mine.map((p) => p.department))];

  const total = mine.length;
  const fulfilled = mine.filter((p) => p.status === "fulfilled").length;
  const active = mine.filter(
    (p) => p.status === "in_progress" || p.status === "announced",
  ).length;
  const notStarted = mine.filter((p) => p.status === "not_started").length;
  const fulfilledPct = total ? +((fulfilled / total) * 100).toFixed(1) : 0;
  const activePct   = total ? +((active    / total) * 100).toFixed(1) : 0;
  const waitingPct  = total ? +((notStarted / total) * 100).toFixed(1) : 0;

  const deptCards = depts
    .map((dept) => {
      const items = mine.filter((p) => p.department === dept);
      const f = items.filter((p) => p.status === "fulfilled").length;
      const a = items.filter(
        (p) => p.status === "in_progress" || p.status === "announced",
      ).length;
      const n = items.filter((p) => p.status === "not_started").length;
      const pct = items.length
        ? Math.round(items.reduce((s, p) => s + p.progress, 0) / items.length)
        : 0;
      return { dept, total: items.length, fulfilled: f, active: a, notStarted: n, pct };
    })
    .sort((a, b) => b.total - a.total);

  const initials = ministerInitials(profile.name);
  const hasImage =
    !!profile.imagePath &&
    fs.existsSync(path.join(process.cwd(), "public", profile.imagePath));

  return (
    <div className="mdet-root">
      <SeoJsonLd
        data={graph([
          {
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.role,
            image: profile.imagePath ? `${brand.siteUrl}${profile.imagePath}` : undefined,
            url: `${brand.siteUrl}/ministers/${profile.slug}`,
            worksFor: { "@type": "Organization", name: "Government of Kerala" },
            knowsAbout: ["UDF manifesto", "Kerala election promises", ...depts],
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Cabinet", path: "/ministers" },
            { name: profile.name, path: `/ministers/${profile.slug}` },
          ]),
        ])}
      />
      <div className="page-shell">

        {/* Back link */}
        <Link href="/ministers" className="mdet-back-link">
          <ArrowLeft size={11} strokeWidth={2.5} />
          Cabinet
        </Link>

        {/* Contained banner — sits within page-shell grid */}
        {hasImage ? (
          <div className="mdet-banner">
            <Image
              src={profile.imagePath!}
              alt={profile.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 1200px"
              className="object-cover"
              style={{ objectPosition: "15% 20%" }}
              quality={90}
              priority
            />
          </div>
        ) : (
          <div className="mdet-banner-mono">
            <span className="mdet-banner-mono-ltr">{initials}</span>
          </div>
        )}

        {/* Identity */}
        <div className="mdet-id-section">
          <div className="mdet-id-badges">
            {profile.isChiefMinister && (
              <span className="mdet-badge-cm">Chief Minister</span>
            )}
            <span className="mdet-badge-party">
              {profile.partyShort} · {profile.party}
            </span>
          </div>
          <h1 className="mdet-hname">{profile.name}</h1>
          <p className="mdet-hrole">{profile.role}</p>
          {(profile.constituency || profile.memberSince) && (
            <div className="mdet-hmeta">
              {profile.constituency && (
                <span className="mdet-hmeta-item">
                  <MapPin size={11} />
                  {profile.constituency}
                </span>
              )}
              {profile.memberSince && (
                <span className="mdet-hmeta-item">
                  <Calendar size={11} />
                  MLA since {profile.memberSince}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Scorecard */}
        <div className="mdet-scorecard">
          <div className="mdet-score-cell">
            <span className="mdet-score-n">{total}</span>
            <span className="mdet-score-lbl">Total</span>
          </div>
          <div className="mdet-score-cell">
            <span className="mdet-score-n mdet-score-green">{fulfilled}</span>
            <span className="mdet-score-lbl">Done</span>
            <span className="mdet-score-pct">{fulfilledPct}%</span>
          </div>
          <div className="mdet-score-cell">
            <span className="mdet-score-n mdet-score-amber">{active}</span>
            <span className="mdet-score-lbl">Active</span>
            <span className="mdet-score-pct">{activePct}%</span>
          </div>
          <div className="mdet-score-cell">
            <span className="mdet-score-n mdet-score-muted">{notStarted}</span>
            <span className="mdet-score-lbl">Waiting</span>
            <span className="mdet-score-pct">{waitingPct}%</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mdet-bar">
          <div className="mdet-bar-seg mdet-bar-green" style={{ width: `${fulfilledPct}%` }} />
          <div className="mdet-bar-seg mdet-bar-amber" style={{ width: `${activePct}%` }} />
          <div className="mdet-bar-seg mdet-bar-dim"   style={{ width: `${waitingPct}%` }} />
        </div>
        <p className="mdet-bar-caption">
          {fulfilledPct > 0 ? `${fulfilledPct}% done · ` : ""}
          {activePct > 0 ? `${activePct}% active · ` : ""}
          {waitingPct}% waiting
        </p>

        {/* Portfolio chips */}
        <div className="mdet-portf-row">
          <span className="mdet-portf-lbl">Portfolios</span>
          {depts.map((d) => (
            <a key={d} href="#promises" className="mdet-portf-chip">{d}</a>
          ))}
        </div>

        {/* Department cards */}
        {deptCards.length > 0 && (
          <div>
            <div className="mdet-sec-row">
              <div>
                <p className="mdet-sec-eye">Portfolio</p>
                <h2 className="mdet-sec-h">Departments</h2>
              </div>
              <Link href="#promises" className="mdet-sec-link">
                All {total} promises <ArrowRight size={12} strokeWidth={2.5} />
              </Link>
            </div>

            <div className="mdet-dg">
              {deptCards.map((d) => (
                <div key={d.dept} className="mdet-dc">
                  <div className="mdet-dc-head">
                    <h3 className="mdet-dc-name">{d.dept}</h3>
                    <span className="mdet-dc-n">{d.total}</span>
                  </div>
                  <div className="mdet-dc-bar">
                    <div
                      className="mdet-dc-bar-fill"
                      style={{ width: `${d.pct > 0 ? Math.max(d.pct, 3) : 0}%` }}
                    />
                  </div>
                  <div className="mdet-dc-pills">
                    {d.fulfilled > 0 && (
                      <span className="mdet-dc-done">
                        <CheckCircle2 size={10} /> {d.fulfilled} done
                      </span>
                    )}
                    {d.active > 0 && (
                      <span className="mdet-dc-active">
                        <CircleDashed size={10} /> {d.active} active
                      </span>
                    )}
                    <span className="mdet-dc-wait">
                      <Clock size={10} /> {d.notStarted} waiting
                    </span>
                  </div>
                  <a href="#promises" className="mdet-dc-lnk">
                    View promises <ArrowRight size={10} strokeWidth={2.5} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quote */}
        {profile.quote && (
          <div className="mdet-qt">
            <p className="mdet-qt-eye">In their words</p>
            <blockquote className="mdet-qt-text">{profile.quote}</blockquote>
            <cite className="mdet-qt-cite">— {profile.name}</cite>
          </div>
        )}

        {/* Promises */}
        <section id="promises">
          <div className="mdet-ph">
            <div>
              <p className="mdet-sec-eye">{profile.name}</p>
              <h2 className="mdet-sec-h">
                All {total} Promise{total !== 1 ? "s" : ""}
              </h2>
            </div>
            <div className="mdet-ph-leg">
              <span className="mdet-ph-leg-item">
                <CheckCircle2 size={12} className="text-green-500" />
                {fulfilled} done
              </span>
              <span className="mdet-ph-leg-item">
                <CircleDashed size={12} className="text-amber-400" />
                {active} active
              </span>
              <span className="mdet-ph-leg-item">
                <Clock size={12} className="text-zinc-500" />
                {notStarted} waiting
              </span>
            </div>
          </div>
          <DeptPromiseList promises={mine} depts={depts} />
        </section>

      </div>
    </div>
  );
}
