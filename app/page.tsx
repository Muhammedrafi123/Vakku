import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  CircleDashed,
  Clock,
} from "lucide-react";
import { DaysCounter } from "@/components/days-counter";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StatCard } from "@/components/stat-card";
import { SupportChai } from "@/components/support-chai";
import { T } from "@/components/t";
import { brand } from "@/lib/brand";
import { meta, promises } from "@/lib/data";
import {
  breadcrumbSchema,
  buildSeoMetadata,
  categoryToSlug,
  datasetSchema,
  faqSchema,
  graph,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";
import { allTimelineEntries, categoryStats, daysSince } from "@/lib/utils";

export const metadata: Metadata = buildSeoMetadata({
  title: `${brand.name} - Kerala UDF Manifesto Promise Tracker`,
  description:
    "Track UDF manifesto promises, Kerala election promises, government project status, evidence timelines, departments, ministers, and verified public accountability updates.",
  path: "/",
  keywords: ["Kerala manifesto tracking", "UDF promise status", "Kerala public accountability"],
});

export default function HomePage() {
  const timelineEntries = allTimelineEntries(promises);
  const recentUpdates   = timelineEntries.slice(0, 4);
  const daysInPower     = daysSince(meta.sworn_in_date);

  const total          = meta.total_promises;
  const fulfilledPct   = total ? +((meta.fulfilled / total) * 100).toFixed(1) : 0;
  const inProgressPct  = total ? +((meta.in_progress / total) * 100).toFixed(1) : 0;
  const announcedPct   = total ? +((meta.announced   / total) * 100).toFixed(1) : 0;
  const notStartedPct  = total ? +((meta.not_started / total) * 100).toFixed(1) : 0;
  const activePct      = +(inProgressPct + announcedPct).toFixed(1);
  const actedPct       = +(fulfilledPct + activePct).toFixed(1);
  const activeCount    = meta.in_progress + meta.announced + (meta.partial ?? 0);
  const waitingCount   = meta.not_started + (meta.delayed ?? 0) + (meta.abandoned ?? 0);

  // Donut degrees
  const fulfilledDeg  = (meta.fulfilled  / total) * 360;
  const activeEndDeg  = fulfilledDeg + (activeCount / total) * 360;

  // Top 6 categories by promise count
  const catStats    = categoryStats(promises).filter((s) => s.total > 0).slice(0, 6);
  const maxCatTotal = catStats[0]?.total ?? 1;

  const jsonLd = graph([
    organizationSchema(),
    websiteSchema(),
    datasetSchema(meta.total_promises, meta.last_checked),
    breadcrumbSchema([{ name: "Home", path: "/" }]),
    faqSchema([
      {
        question: "What is Vakku?",
        answer:
          "Vakku is a Kerala civic-tech promise tracker that organizes UDF manifesto promises, progress status, evidence timelines, departments, ministers, and source pages in one searchable public record.",
      },
      {
        question: "Does Vakku automatically mark UDF promises as fulfilled?",
        answer:
          "No. Promise statuses are updated only after a human editorial review of public evidence such as manifesto source pages, government orders, budget documents, official releases, or credible reports.",
      },
      {
        question: "How can citizens use this UDF manifesto tracker?",
        answer:
          "Citizens can search every promise, filter by category or status, inspect individual promise pages, review evidence timelines, and submit sourced updates for editorial review.",
      },
    ]),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══════════════════════════════════════════════
          HERO — unchanged
      ══════════════════════════════════════════════ */}
      <section className="hero-root" aria-label="Hero">
        <div
          className="hero-crowd-bg"
          aria-hidden
          role="presentation"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage: 'url("/assets/hero-bg.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
            filter: "grayscale(100%) brightness(0.22) contrast(1.2)",
            opacity: 0.92,
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 25%, rgba(0,0,0,0.55) 44%, black 65%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 25%, rgba(0,0,0,0.55) 44%, black 65%)",
            pointerEvents: "none",
          }}
        />

        <div className="page-shell hero-inner">
          <div className="hero-left">
            <div className="hero-gov-badge">
              <span className="hero-gov-dot" aria-hidden />
              UDF GOVERNMENT OF KERALA
            </div>
            <h1 className="hero-headline malayalam" aria-label="UDF vaaku — paranjath enth, cheythath enth">
              <span className="hero-headline-white">യുഡിഎഫിന്റെ</span>
              <span className="hero-headline-line2">
                <span className="hero-headline-orange">വാക്ക്</span>
              </span>
              <span className="hero-headline-sub malayalam">
                പറഞ്ഞത് എന്ത്, ചെയ്തത് എന്ത്
              </span>
            </h1>
            <div className="hero-rule" aria-hidden />
            <p className="hero-subtext">
              Tracking Every Promise Made by UDF
              <br />
              to the People of Kerala
            </p>
            <div className="hero-counter-wrap">
              <DaysCounter swornInDate={meta.sworn_in_date} />
            </div>
          </div>

          <div className="hero-right" aria-hidden>
            <div className="hero-glow-rings">
              <span className="ring ring-1" />
              <span className="ring ring-2" />
              <span className="ring ring-3" />
            </div>
            <div className="hero-glow-orb" />
            <div className="hero-cm-image">
              <Image
                src="/assets/satheesan-caricature.png"
                alt="V.D. Satheesan – Chief Minister of Kerala"
                fill
                priority
                sizes="(max-width: 768px) 80vw, 42vw"
                className="object-contain object-center drop-shadow-2xl"
              />
            </div>
            <div className="brush-quote malayalam" aria-label="Vaagdaanam, Vikasanam" style={{ fontFamily: "var(--font-malabar)" }}>
              <span className="brush-quote-mark">&quot;</span>
              വാഗ്ദാനം, വികസനം
              <span className="brush-quote-mark">&quot;</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STAT CARDS — unchanged
      ══════════════════════════════════════════════ */}
      <section className="stats-root" aria-label="Promise statistics">
        <div className="page-shell stats-grid">
          <StatCard
            label="Total Promises"        labelMl="ആകെ വാഗ്ദാനങ്ങൾ"
            value={meta.total_promises.toLocaleString()}
            detail="Made to the people of Kerala" detailMl="കേരള ജനതയ്ക്ക് നൽകിയത്"
            icon={<BarChart3 size={20} />}
            accent="orange"
          />
          <StatCard
            label="Fulfilled"             labelMl="നിറവേറ്റിയത്"
            value={meta.fulfilled}
            percent={`${fulfilledPct}%`}
            detail="Promises delivered"   detailMl="പൂർത്തിയാക്കിയ വാഗ്ദാനങ്ങൾ"
            icon={<CheckCircle2 size={20} />}
            accent="green"
          />
          <StatCard
            label="In Progress"           labelMl="പുരോഗതിയിൽ"
            value={meta.in_progress + meta.announced}
            percent={`${actedPct}%`}
            detail="Acted upon so far"    detailMl="ഇതുവരെ നടപടി സ്വീകരിച്ചത്"
            icon={<CircleDashed size={20} />}
            accent="amber"
          />
          <StatCard
            label="Not Started"           labelMl="ആരംഭിച്ചിട്ടില്ല"
            value={meta.not_started}
            percent={`${notStartedPct}%`}
            detail="Still waiting to begin" detailMl="ഇനിയും കാത്തിരിക്കുന്നത്"
            icon={<Clock size={20} />}
            accent="gray"
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          1 — PROGRESS SNAPSHOT
      ══════════════════════════════════════════════ */}
      <section className="hp-progress-section" aria-label="Overall progress">
        <div className="page-shell">
          <ScrollReveal>
            <div className="hp-progress-card">
              <div className="hp-progress-top">
                <div className="hp-progress-headline">
                  <span className="hp-progress-pct">{actedPct}%</span>
                  <span className="hp-progress-context">
                    <T en="of promises acted upon in" ml="വാഗ്ദാനങ്ങൾ നടപടിയിൽ," />{" "}
                    <strong>{daysInPower}</strong>{" "}
                    <T en="days in office" ml="ദിവസം" />
                  </span>
                </div>
                <div className="hp-progress-pills">
                  <span className="hp-pill hp-pill--green">
                    <span className="hp-pill-dot" />
                    {meta.fulfilled} <T en="fulfilled" ml="നിറവേറ്റിയത്" />
                  </span>
                  <span className="hp-pill hp-pill--amber">
                    <span className="hp-pill-dot" />
                    {activeCount} <T en="active" ml="സജീവം" />
                  </span>
                  <span className="hp-pill hp-pill--gray">
                    <span className="hp-pill-dot" />
                    {meta.not_started} <T en="waiting" ml="കാത്തിരിക്കുന്നത്" />
                  </span>
                </div>
              </div>
              <div
                className="hp-seg-bar"
                role="progressbar"
                aria-label={`${actedPct}% acted upon`}
                aria-valuenow={actedPct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="hp-seg-fulfilled" style={{ width: `${fulfilledPct}%` }} />
                <div className="hp-seg-active"    style={{ width: `${activePct}%` }} />
                <div className="hp-seg-waiting"   style={{ width: `${notStartedPct}%` }} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2 — NAVIGATE
      ══════════════════════════════════════════════ */}
      <section className="hp-nav-section" aria-label="Explore the tracker">
        <div className="page-shell">
          <p className="hp-nav-label"><T en="Explore" ml="പര്യവേക്ഷണം ചെയ്യുക" /></p>
          <div className="hp-nav-grid">

            <Link href="/promises" className="hp-nav-tile">
              <div className="hp-nav-tile-num-row">
                <span className="hp-nav-tile-num">{meta.total_promises.toLocaleString()}</span>
                <span className="hp-nav-tile-unit">promises</span>
              </div>
              <p className="hp-nav-tile-title"><T en="Browse all promises" ml="എല്ലാ വാഗ്ദാനങ്ങളും കാണുക" /></p>
              <p className="hp-nav-tile-desc">
                <T en="Search and filter every manifesto commitment by sector, status, or importance" ml="മേഖല, പദവി, പ്രാധാന്യം അനുസരിച്ച് തിരയുക" />
              </p>
              <span className="hp-nav-tile-arrow" aria-hidden>→</span>
            </Link>

            <Link href="/categories" className="hp-nav-tile">
              <div className="hp-nav-tile-num-row">
                <span className="hp-nav-tile-num">18</span>
                <span className="hp-nav-tile-unit">sectors</span>
              </div>
              <p className="hp-nav-tile-title"><T en="Promise areas" ml="വാഗ്ദാന മേഖലകൾ" /></p>
              <p className="hp-nav-tile-desc">
                <T en="See how each sector of governance — health, education, jobs — tracks over time" ml="ആരോഗ്യം, വിദ്യാഭ്യാസം, തൊഴിൽ — ഓരോ ഭരണ മേഖലയും ട്രാക്ക് ചെയ്യുക" />
              </p>
              <span className="hp-nav-tile-arrow" aria-hidden>→</span>
            </Link>

            <Link href="/timeline" className="hp-nav-tile">
              <div className="hp-nav-tile-num-row">
                <span className="hp-nav-tile-num">{timelineEntries.length.toLocaleString()}</span>
                <span className="hp-nav-tile-unit">updates</span>
              </div>
              <p className="hp-nav-tile-title"><T en="Evidence timeline" ml="തെളിവ് ടൈംലൈൻ" /></p>
              <p className="hp-nav-tile-desc">
                <T en="Every recorded government action, GO, budget allocation, and news update" ml="രേഖപ്പെടുത്തിയ ഓരോ സർക്കാർ നടപടിയും, GO, ബജറ്റ് വകയിരുത്തലും" />
              </p>
              <span className="hp-nav-tile-arrow" aria-hidden>→</span>
            </Link>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3 — RECENT EVIDENCE
      ══════════════════════════════════════════════ */}
      {recentUpdates.length > 0 && (
        <section className="hp-updates-section" aria-label="Recent updates">
          <div className="page-shell">
            <div className="hp-updates-head">
              <div>
                <p className="hp-updates-eyebrow"><T en="Latest evidence" ml="ഏറ്റവും പുതിയ തെളിവ്" /></p>
                <h2 className="hp-updates-title"><T en="Recently updated" ml="അടുത്തിടെ അപ്ഡേറ്റ് ചെയ്തത്" /></h2>
              </div>
              <Link href="/timeline" className="hp-updates-viewall">
                <T en="Full timeline →" ml="പൂർണ ടൈംലൈൻ →" />
              </Link>
            </div>
            <div className="hp-updates-list">
              {recentUpdates.map((entry, i) => (
                <ScrollReveal key={i}>
                  <Link href={`/promise/${entry.promiseId}`} className="hp-update-row">
                    <time className="hp-update-date" dateTime={entry.date}>
                      {entry.date}
                    </time>
                    <div className="hp-update-body">
                      <p className="hp-update-event">
                        {entry.title ?? entry.summary ?? (entry as Record<string, unknown>).event as string ?? "Update recorded"}
                      </p>
                      <p className="hp-update-promise line-clamp-1">
                        {entry.promiseTitle}
                      </p>
                    </div>
                    <span className="hp-update-id">{entry.promiseId}</span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════
          4 — STATISTICS (above footer)
      ══════════════════════════════════════════════ */}
      <section className="hp-support-section" aria-label="Support the tracker">
        <div className="page-shell">
          <ScrollReveal>
            <SupportChai />
          </ScrollReveal>
        </div>
      </section>

      <section className="seo-faq-section" aria-labelledby="home-seo-faq-title">
        <div className="page-shell">
          <div className="seo-faq-grid">
            <div>
              <p className="seo-eyebrow">Kerala promise tracker</p>
              <h2 id="home-seo-faq-title">UDF manifesto tracking, built for public accountability.</h2>
              <p>
                Vakku helps citizens search Kerala UDF manifesto promises, check current promise status,
                follow evidence timelines, and understand which departments or ministers are connected to
                each public commitment.
              </p>
            </div>
            <div className="seo-faq-list">
              <details>
                <summary>What does this UDF promise tracker measure?</summary>
                <p>It measures manifesto promises, status, progress, source pages, departments, ministers, and verified timeline updates.</p>
              </details>
              <details>
                <summary>How are promise statuses updated?</summary>
                <p>Status changes require sourced evidence and human editorial review before the public record changes.</p>
              </details>
              <details>
                <summary>Can the public submit evidence?</summary>
                <p>Yes. Promise detail pages accept sourced public submissions, which are reviewed before any official tracker update.</p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section className="hp-stats-section" aria-label="Statistics overview">
        <div className="page-shell">
          <div className="hp-stats-head">
            <p className="hp-stats-eyebrow"><T en="Statistics" ml="സ്ഥിതിവിവരക്കണക്കുകൾ" /></p>
            <h2 className="hp-stats-title"><T en="By the numbers" ml="സംഖ്യകളിൽ" /></h2>
          </div>
          <div className="hp-stats-grid">

            <div className="hp-donut-panel">
              <p className="hp-stats-panel-title"><T en="Promises by status" ml="പദവി അനുസരിച്ച് വാഗ്ദാനങ്ങൾ" /></p>
              <div className="hp-donut-wrap">
                <div
                  className="hp-donut"
                  style={{
                    "--fulfilled-deg": `${fulfilledDeg.toFixed(2)}deg`,
                    "--active-end-deg": `${activeEndDeg.toFixed(2)}deg`,
                  } as React.CSSProperties}
                >
                  <div className="hp-donut-hole">
                    <span className="hp-donut-center-num">{total.toLocaleString()}</span>
                    <span className="hp-donut-center-label"><T en="Total" ml="ആകെ" /></span>
                  </div>
                </div>
              </div>
              <div className="hp-donut-legend">
                <div className="hp-legend-row">
                  <span className="hp-legend-dot hp-legend-dot--green" />
                  <span className="hp-legend-label"><T en="Fulfilled" ml="നിറവേറ്റിയത്" /></span>
                  <span className="hp-legend-count">{meta.fulfilled}</span>
                  <span className="hp-legend-pct">{fulfilledPct}%</span>
                </div>
                <div className="hp-legend-row">
                  <span className="hp-legend-dot hp-legend-dot--amber" />
                  <span className="hp-legend-label"><T en="Active" ml="സജീവം" /></span>
                  <span className="hp-legend-count">{activeCount}</span>
                  <span className="hp-legend-pct">{activePct}%</span>
                </div>
                <div className="hp-legend-row">
                  <span className="hp-legend-dot hp-legend-dot--gray" />
                  <span className="hp-legend-label"><T en="Waiting" ml="കാത്തിരിക്കുന്നത്" /></span>
                  <span className="hp-legend-count">{waitingCount}</span>
                  <span className="hp-legend-pct">{notStartedPct}%</span>
                </div>
              </div>
            </div>

            <div className="hp-cats-panel">
              <div className="hp-cats-head">
                <p className="hp-stats-panel-title"><T en="Top promise areas" ml="മുൻനിര വാഗ്ദാന മേഖലകൾ" /></p>
                <Link href="/categories" className="hp-cats-viewall"><T en="All sectors →" ml="എല്ലാ മേഖലകളും →" /></Link>
              </div>
              <div className="hp-cats-list">
                {catStats.map((cat) => (
                  <Link
                    key={cat.category}
                    href={`/category/${categoryToSlug(cat.category)}`}
                    className="hp-cat-row"
                  >
                    <span className="hp-cat-name">{cat.category}</span>
                    <div className="hp-cat-bar-wrap">
                      <div
                        className="hp-cat-bar"
                        style={{ width: `${(cat.total / maxCatTotal) * 100}%` }}
                      />
                    </div>
                    <span className="hp-cat-count">{cat.total}</span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
