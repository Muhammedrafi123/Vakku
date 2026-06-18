import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle,
  Circle,
  Clock,
  ExternalLink,
  Hash,
  Layers,
  LayoutList,
  Star,
  XCircle,
} from "lucide-react";
import { PromiseCard } from "@/components/promise-card";
import { PromiseComments } from "@/components/promise-comments";
import { PromiseReactions } from "@/components/promise-reactions";
import { PromiseSubmit } from "@/components/promise-submit";
import { SupportChai } from "@/components/support-chai";
import { ViewTracker } from "@/components/view-tracker";
import { T } from "@/components/t";
import { brand } from "@/lib/brand";
import { getPromiseById, promises } from "@/lib/data";
import { breadcrumbSchema, buildSeoMetadata, categoryToSlug, faqSchema, graph, promiseArticleSchema, statusToSlug } from "@/lib/seo";
import { formatDate, relatedPromises, statusConfig } from "@/lib/utils";
import type { Status } from "@/lib/types";

type PageProps = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return promises.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const promise = getPromiseById(id);
  if (!promise) return { title: "Promise not found" };
  return buildSeoMetadata({
    title: `${promise.id}: ${promise.promise_en.slice(0, 72)}`,
    description: `${promise.simple_explanation} Status: ${statusConfig[promise.status].label}. Category: ${promise.category}. Source: UDF Manifesto 2026 page ${promise.source_pages.join(", ")}.`,
    path: `/promise/${promise.id}`,
    type: "article",
    keywords: [
      promise.category,
      promise.department,
      promise.minister,
      `${statusConfig[promise.status].label} UDF promise`,
      "UDF manifesto promise status",
    ].filter(Boolean),
  });
}

const STATUS_ICONS: Record<Status, React.ReactNode> = {
  fulfilled:   <CheckCircle   size={18} strokeWidth={2} />,
  in_progress: <Clock         size={18} strokeWidth={2} />,
  announced:   <Bell          size={18} strokeWidth={2} />,
  partial:     <Layers        size={18} strokeWidth={2} />,
  not_started: <Circle        size={18} strokeWidth={2} />,
  delayed:     <AlertTriangle size={18} strokeWidth={2} />,
  abandoned:   <XCircle       size={18} strokeWidth={2} />,
};

const STATUS_PALETTE: Record<Status, { bg: string; border: string; text: string; fill: string }> = {
  fulfilled:   { bg: "#f0fdf4", border: "#86efac", text: "#15803d", fill: "#16a34a" },
  in_progress: { bg: "#fff7ed", border: "#fdba74", text: "#c46d12", fill: "#e8821a" },
  announced:   { bg: "#eff6ff", border: "#93c5fd", text: "#1d4ed8", fill: "#2563eb" },
  partial:     { bg: "#eef2ff", border: "#a5b4fc", text: "#4338ca", fill: "#4f46e5" },
  not_started: { bg: "#f9fafb", border: "#d1d5db", text: "#4b5563", fill: "#9ca3af" },
  delayed:     { bg: "#fffbeb", border: "#fcd34d", text: "#b45309", fill: "#d97706" },
  abandoned:   { bg: "#fef2f2", border: "#fca5a5", text: "#b91c1c", fill: "#dc2626" },
};

function docType(title?: string) {
  if (!title) return "link";
  const t = title.toLowerCase();
  if (t.includes("pdf") || t.includes("report") || t.includes("survey")) return "pdf";
  if (t.includes("go(ms)") || t.includes("government order") || t.includes("g.o") || t.includes("gazette")) return "go";
  if (t.includes("budget") || t.includes("speech") || t.includes("finance")) return "budget";
  if (
    t.includes("the hindu") || t.includes("mathrubhumi") || t.includes("manorama") ||
    t.includes("kaumudi") || t.includes("deccan") || t.includes("indian express") ||
    t.includes("news") || t.includes("times") || t.includes("media")
  ) return "news";
  return "link";
}

export default async function PromiseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const promise = getPromiseById(id);
  if (!promise) notFound();

  const related = relatedPromises(promise, promises);
  const palette  = STATUS_PALETTE[promise.status];
  const label    = statusConfig[promise.status].label;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(graph([
            promiseArticleSchema(promise),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Promises", path: "/promises" },
              { name: promise.category, path: `/category/${categoryToSlug(promise.category)}` },
              { name: promise.id, path: `/promise/${promise.id}` },
            ]),
            faqSchema([
              {
                question: `What is the status of promise ${promise.id}?`,
                answer: `${promise.id} is currently marked ${statusConfig[promise.status].label} with ${promise.progress}% progress on ${brand.name}.`,
              },
              {
                question: "Where is this promise sourced from?",
                answer: `This record is sourced from UDF Manifesto 2026 page ${promise.source_pages.join(", ")}. Timeline entries include additional public sources when available.`,
              },
              {
                question: "Can citizens submit evidence for this promise?",
                answer: "Yes. Citizens can submit source URLs on this promise page. Submissions are reviewed before status, progress, or timeline data changes.",
              },
            ]),
          ])).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="pd-hero">
        <div className="page-shell">
          <Link href="/promises" className="pd-back">
            <ArrowLeft size={13} strokeWidth={2.5} />
            <T en="Back to Promises" ml="വാഗ്ദാനങ്ങളിലേക്ക്" />
          </Link>

          {/* Status pill */}
          <div
            className="pd-status"
            style={{ background: palette.bg, borderColor: palette.border, color: palette.text }}
          >
            <span className="pd-status-icon">{STATUS_ICONS[promise.status]}</span>
            <div className="pd-status-text">
              <span className="pd-status-name">{label}</span>
              <span className="pd-status-sub">{promise.progress}% <T en="completed" ml="പൂർത്തിയായി" /></span>
            </div>
          </div>

          <h1 className="pd-title">{promise.promise_en}</h1>
          <p className="pd-title-ml malayalam">{promise.promise_ml}</p>

          {/* Progress row */}
          <div className="pd-progress-row">
            <div className="pd-progress-track">
              <div
                className="pd-progress-fill"
                style={{ width: `${promise.progress}%`, background: palette.fill }}
              />
            </div>
            <div className="pd-progress-meta">
              <span className="pd-progress-pct" style={{ color: palette.fill }}>
                {promise.progress}%
              </span>
              <span className="pd-progress-label"><T en="Overall Progress" ml="ആകെ പുരോഗതി" /></span>
            </div>
          </div>

          {/* Reactions + view count */}
          <div className="pd-engage-row">
            <PromiseReactions promiseId={promise.id} />
            <ViewTracker promiseId={promise.id} />
          </div>
        </div>
      </section>

      {/* ── Body ────────────────────────────────────────── */}
      <section className="pd-body">
        <div className="page-shell">
          <div className="pd-grid">

            {/* Left column */}
            <div className="pd-col-left">
              <div className="pd-card">
                <p className="pd-card-heading"><T en="Promise Details" ml="വാഗ്ദാന വിശദാംശങ്ങൾ" /></p>
                <div className="pd-details">
                  <DetailRow icon={<LayoutList size={13} />} label={<T en="Category" ml="വിഭാഗം" />}        value={promise.category} />
                  {promise.department && (
                    <DetailRow icon={<Building2 size={13} />} label={<T en="Department" ml="വകുപ്പ്" />}     value={promise.department} />
                  )}
                  {promise.minister && (
                    <DetailRow icon={<Briefcase size={13} />} label={<T en="Minister" ml="മന്ത്രി" />}       value={promise.minister} />
                  )}
                  <DetailRow icon={<BookOpen  size={13} />} label={<T en="Manifesto page" ml="മാനിഫെസ്റ്റോ പേജ്" />} value={`Page ${promise.source_pages.join(", ")}`} />
                  <DetailRow icon={<Star      size={13} />} label={<T en="Importance" ml="പ്രാധാന്യം" />}    value={promise.importance.charAt(0).toUpperCase() + promise.importance.slice(1)} />
                  <DetailRow icon={<Hash      size={13} />} label={<T en="Promise ID" ml="വാഗ്ദാന ID" />}    value={promise.id} mono />
                  {promise.has_deadline && promise.deadline_note && (
                    <DetailRow icon={<Clock   size={13} />} label={<T en="Deadline" ml="സമയപരിധി" />}       value={promise.deadline_note} />
                  )}
                </div>
              </div>

              <div className="pd-card">
                <p className="pd-card-heading"><T en="About This Promise" ml="ഈ വാഗ്ദാനത്തെ കുറിച്ച്" /></p>
                {promise.simple_explanation && (
                  <AboutBlock title={<T en="What this means" ml="ഇതിന്റെ അർഥം" />} text={promise.simple_explanation} />
                )}
                {promise.why_it_matters && (
                  <AboutBlock title={<T en="Why it matters" ml="ഇത് പ്രധാനമായ കാരണം" />} text={promise.why_it_matters} />
                )}
                {promise.if_not_done && (
                  <AboutBlock title={<T en="If unfulfilled" ml="നിറവേറ്റിയില്ലെങ്കിൽ" />} text={promise.if_not_done} />
                )}
              </div>

              <div className="pd-card">
                <h2 className="pd-card-heading">Official source and tracker facts</h2>
                <div className="pd-details">
                  <DetailRow icon={<BookOpen size={13} />} label="Primary source" value={`UDF Manifesto 2026, page ${promise.source_pages.join(", ")}`} />
                  <DetailRow icon={<LayoutList size={13} />} label="Category record" value={promise.category} />
                  <DetailRow icon={<Clock size={13} />} label="Current status" value={statusConfig[promise.status].label} />
                </div>
                <div className="pd-source-links">
                  <Link href={`/category/${categoryToSlug(promise.category)}`}>More {promise.category} promises</Link>
                  <Link href={`/status/${statusToSlug(promise.status)}`}>More {statusConfig[promise.status].label.toLowerCase()} promises</Link>
                  <Link href="/manifesto/2026">UDF Manifesto 2026 overview</Link>
                </div>
              </div>
            </div>

            {/* Right column — Timeline */}
            <div className="pd-col-right">
              <div className="pd-card pd-card--tl">
                <div className="pd-tl-head">
                  <p className="pd-card-heading" style={{ margin: 0, paddingBottom: 0, borderBottom: "none" }}>
                    <T en="Evidence Timeline" ml="തെളിവ് ടൈംലൈൻ" />
                  </p>
                  <span className="pd-tl-count">{promise.timeline.length} <T en="entries" ml="എൻട്രികൾ" /></span>
                </div>

                {promise.timeline.length > 0 ? (
                  <div className="pd-tl-list">
                    {promise.timeline.map((entry, i) => {
                      const type = docType(entry.source_title);
                      return (
                        <div key={`${entry.date}-${i}`} className="pd-tl-entry">
                          <div className="pd-tl-dot" style={{ borderColor: palette.fill }}>
                            <div className="pd-tl-dot-core" style={{ background: palette.fill }} />
                          </div>
                          <div className="pd-tl-content">
                            <p className="pd-tl-date">{formatDate(entry.date)}</p>
                            <p className="pd-tl-entry-title">{entry.title}</p>
                            {entry.summary && (
                              <p className="pd-tl-entry-summary">{entry.summary}</p>
                            )}
                            {entry.source_url && (
                              <a
                                href={entry.source_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pd-tl-source"
                              >
                                <ExternalLink size={10} />
                                Source
                              </a>
                            )}
                            {entry.source_title && (
                              <div className="pd-doc">
                                <span className={`pd-doc-badge pd-doc-badge--${type}`}>
                                  {type.toUpperCase()}
                                </span>
                                <span className="pd-doc-text">{entry.source_title}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="pd-tl-empty-state">
                    <p className="pd-tl-empty-label"><T en="No updates recorded yet" ml="ഇതുവരെ അപ്ഡേറ്റുകളൊന്നുമില്ല" /></p>
                    <p className="pd-tl-empty-sub">
                      <T en="Updates will appear here as this promise moves through government processes." ml="ഈ വാഗ്ദാനം സർക്കാർ പ്രക്രിയകളിലൂടെ നീങ്ങുമ്പോൾ അപ്ഡേറ്റുകൾ ഇവിടെ ദൃശ്യമാകും." />
                    </p>
                    <div className="pd-tl-milestones">
                      <p className="pd-tl-ms-heading">Typical milestone pattern</p>
                      {[
                        "Budget allocation",
                        "Government Order (GO) issued",
                        "Tender / procurement",
                        "Implementation begins",
                        "Progress report published",
                        "Promise fulfilled",
                      ].map((step) => (
                        <div key={step} className="pd-tl-ms-row">
                          <span className="pd-tl-ms-dot" />
                          <span className="pd-tl-ms-text">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pd-tl-footer">
                  <Clock size={11} />
                  <T en="Last updated:" ml="അവസാനം അപ്ഡേറ്റ് ചെയ്തത്:" /> {formatDate(promise.last_updated)}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Community ────────────────────────────────────── */}
      <section className="pd-community">
        <div className="page-shell">
          <div className="pd-community-grid">
            <PromiseComments promiseId={promise.id} />
            <PromiseSubmit   promiseId={promise.id} />
          </div>
          <SupportChai variant="compact" />
        </div>
      </section>

      {/* ── Related ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="pd-related">
          <div className="page-shell">
            <p className="label"><T en="More in this category" ml="ഈ വിഭാഗത്തിൽ കൂടുതൽ" /></p>
            <h2 className="pd-related-title">{promise.category}</h2>
            <div className="pd-related-grid">
              {related.map((item) => (
                <PromiseCard key={item.id} promise={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function DetailRow({
  icon, label, value, mono = false,
}: {
  icon: React.ReactNode;
  label: React.ReactNode;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="pd-detail-row">
      <span className="pd-detail-icon">{icon}</span>
      <div className="pd-detail-body">
        <p className="pd-detail-label">{label}</p>
        <p className={`pd-detail-value${mono ? " pd-detail-value--mono" : ""}`}>{value}</p>
      </div>
    </div>
  );
}

function AboutBlock({ title, text }: { title: React.ReactNode; text: string }) {
  return (
    <div className="pd-about-block">
      <p className="pd-about-title">{title}</p>
      <p className="pd-about-text">{text}</p>
    </div>
  );
}
