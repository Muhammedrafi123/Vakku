import type { Metadata } from "next";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { SupportChai } from "@/components/support-chai";
import { brand } from "@/lib/brand";
import { breadcrumbSchema, buildSeoMetadata, faqSchema, graph } from "@/lib/seo";
import { statusOptions } from "@/lib/types";
import { statusConfig } from "@/lib/utils";

export const metadata: Metadata = buildSeoMetadata({
  title: `About ${brand.name}`,
  description: `Mission, methodology, editorial policy, verification rules, and data standards behind ${brand.name}, Kerala's UDF manifesto tracker and public accountability platform.`,
  path: "/about",
  keywords: ["UDF manifesto methodology", "Kerala civic tech", "public accountability tracker"],
});

/* ── Status colour map (matches promise-detail palette) ── */
const STATUS_DOT: Record<string, string> = {
  fulfilled:   "#16a34a",
  in_progress: "#e8821a",
  announced:   "#2563eb",
  partial:     "#4f46e5",
  not_started: "#9ca3af",
  delayed:     "#d97706",
  abandoned:   "#dc2626",
};

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <SeoJsonLd
        data={graph([
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          faqSchema([
            {
              question: "Is Vakku affiliated with a political party?",
              answer:
                "No. Vakku is an independent public-interest civic tracker and is not affiliated with a political party or government body.",
            },
            {
              question: "What sources does Vakku use for UDF manifesto promise updates?",
              answer:
                "Vakku uses public sources such as manifesto pages, government orders, budget documents, official releases, and credible news reports. Ambiguous claims remain unchanged until verified.",
            },
            {
              question: "Can public submissions change a promise status automatically?",
              answer:
                "No. Public submissions are reviewed by a human editor before any status, progress, or timeline record changes.",
            },
          ]),
        ])}
      />
      <section className="ab-hero">
        <div className="page-shell">
          <p className="label" style={{ color: "#E8821A" }}>About</p>
          <h1 className="ab-hero-h1">
            Public promises need<br />
            <span className="ab-hero-accent">public memory.</span>
          </h1>
          <p className="ab-hero-sub">
            {brand.name} is an independent civic-tech platform that
            documents every manifesto commitment made by the United Democratic
            Front to the people of Kerala — promise by promise, source by source.
          </p>
          <div className="ab-hero-badges">
            <span className="ab-badge"><span className="ab-badge-dot" />Independent & non-partisan</span>
            <span className="ab-badge"><span className="ab-badge-dot" />Source-verified only</span>
            <span className="ab-badge"><span className="ab-badge-dot" />1,280 promises tracked</span>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────── */}
      <section className="ab-body">
        <div className="page-shell">

          {/* Mission + How it works */}
          <div className="ab-grid">
            <div className="ab-card ab-card--accent">
              <div className="ab-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                </svg>
              </div>
              <p className="ab-card-title">Our mission</p>
              <p className="ab-card-body">
                We exist to make government accountability <strong>effortless for ordinary citizens</strong>.
                Elections come and go — but promises made to the public deserve a permanent, searchable record
                that anyone can access, share, and verify. No spin, no PR, just the manifesto and the facts.
              </p>
            </div>

            <div className="ab-card">
              <div className="ab-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                </svg>
              </div>
              <p className="ab-card-title">How tracking works</p>
              <p className="ab-card-body">
                Every promise is extracted directly from the <strong>official UDF 2026 manifesto PDF</strong>.
                Status updates are added only when backed by a verifiable source — a Government Order, budget
                speech, official press release, or a credible news report. Each update is timestamped and
                linked to its source before it goes live.
              </p>
            </div>
          </div>

          {/* Editorial policy */}
          <div className="ab-grid" style={{ marginTop: 16 }}>
            <div className="ab-card">
              <div className="ab-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </div>
              <p className="ab-card-title">Editorial policy</p>
              <ul className="ab-policy-list">
                {[
                  "Every status change requires a cited, publicly accessible source.",
                  "No promise is marked fulfilled based on a government announcement alone — delivery must be documented.",
                  "Progress percentages reflect documented milestones, not projections or promises of promises.",
                  "We do not accept PR submissions from political parties or government departments.",
                  "If a claim is ambiguous or unverifiable, the status stays unchanged until clarity is established.",
                ].map((item) => (
                  <li key={item} className="ab-policy-item">
                    <span className="ab-policy-bullet">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                        <path d="M1.5 4L3.5 6L6.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="ab-card">
              <div className="ab-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                </svg>
              </div>
              <p className="ab-card-title">Data sources</p>
              <p className="ab-card-body" style={{ marginBottom: 14 }}>
                The primary source is the <strong>UDF Election Manifesto 2026</strong> (PDF).
                Updates are sourced from:
              </p>
              <ul className="ab-policy-list">
                {[
                  "Government Orders (GO/MS) published on Kerala Government official portals",
                  "Kerala Budget speeches and Finance Department circulars",
                  "Verified reports from The Hindu, Mathrubhumi, Manorama, and Deccan Chronicle",
                  "Official press releases from concerned ministries",
                ].map((item) => (
                  <li key={item} className="ab-policy-item">
                    <span className="ab-policy-bullet">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                        <path d="M1.5 4L3.5 6L6.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Status system */}
          <div className="ab-grid" style={{ marginTop: 16 }}>
            <div className="ab-card ab-grid--full">
              <div className="ab-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
                </svg>
              </div>
              <p className="ab-card-title">Status system</p>
              <p className="ab-card-body" style={{ marginBottom: 16 }}>
                Each promise carries one of seven statuses — updated only when a qualifying source is verified.
              </p>
              <div className="ab-status-grid">
                {statusOptions.map((s) => (
                  <div key={s} className="ab-status-row">
                    <span className="ab-status-dot" style={{ background: STATUS_DOT[s] }} />
                    <span className="ab-status-name">{statusConfig[s].label}</span>
                    <span className="ab-status-key">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Report an error */}
          <div className="ab-grid" style={{ marginTop: 16 }}>
            <div className="ab-card ab-grid--full">
              <div className="ab-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <p className="ab-card-title">Report an error or suggest an update</p>
              <p className="ab-card-body">
                Spotted something wrong, or have a sourced update for a promise? Send us the{" "}
                <strong>promise ID</strong>, <strong>source URL</strong>, <strong>date</strong>, and a short
                explanation. Every valid submission is reviewed by a human editor before anything changes.
                Reach us on WhatsApp — we respond promptly.
              </p>
            </div>
          </div>

          {/* ── Team ─────────────────────────────────── */}
          <p className="ab-section-label">The team</p>

          <div className="ab-team-grid">
            <a
              href="https://instagram.com/muhemmed.rafi__"
              target="_blank"
              rel="noopener noreferrer"
              className="ab-member-card"
              aria-label="Rafi on Instagram"
            >
              <span className="ab-member-avatar" style={{ background: "linear-gradient(135deg,#E8821A,#c46d12)" }}>R</span>
              <div className="ab-member-info">
                <span className="ab-member-name">Muhemmed Rafi</span>
                <span className="ab-member-handle">@muhemmed.rafi__</span>
              </div>
              <span className="ab-member-ig">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </span>
            </a>

            <a
              href="https://instagram.com/muhd5aad"
              target="_blank"
              rel="noopener noreferrer"
              className="ab-member-card"
              aria-label="Saad on Instagram"
            >
              <span className="ab-member-avatar" style={{ background: "linear-gradient(135deg,#3b82f6,#1d4ed8)" }}>S</span>
              <div className="ab-member-info">
                <span className="ab-member-name">Saad</span>
                <span className="ab-member-handle">@muhd5aad</span>
              </div>
              <span className="ab-member-ig">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </span>
            </a>
          </div>

          {/* ── Vellmont ─────────────────────────────── */}
          <p className="ab-section-label">Built by</p>

          <a
            href="https://wa.me/919895618442"
            target="_blank"
            rel="noopener noreferrer"
            className="ab-agency-card"
            aria-label="Contact Vellmont on WhatsApp"
          >
            <span className="ab-agency-wp">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </span>
            <div className="ab-agency-info">
              <span className="ab-agency-name">Vellmont</span>
              <span className="ab-agency-desc">Premium web design &amp; development agency · Kerala, India</span>
            </div>
            <span className="ab-agency-cta">WhatsApp us →</span>
          </a>

          <SupportChai />

          {/* Disclaimer */}
          <p className="ab-disclaimer">
            This tracker is an independent, non-partisan public-interest project. It is not affiliated with
            the United Democratic Front, any political party, or any government body. All data is sourced
            exclusively from publicly available documents. Accuracy is our priority — errors, once reported
            and verified, are corrected promptly.
          </p>

        </div>
      </section>
    </>
  );
}
