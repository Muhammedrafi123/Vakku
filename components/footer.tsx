import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { SupportChai } from "@/components/support-chai";
import { brand } from "@/lib/brand";
import { meta } from "@/lib/data";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}

export function Footer() {
  const fulfillRate = meta.total_promises
    ? Math.round((meta.fulfilled / meta.total_promises) * 100)
    : 0;
  const activeCount = meta.announced + meta.in_progress + meta.partial;
  const waitingCount = meta.not_started + meta.delayed + meta.abandoned;

  return (
    <footer className="ftr-root">
      <div className="ftr-accent-bar" aria-hidden />

      <div className="page-shell">
        <div className="ftr-grid">
          <div className="ftr-brand">
            <div className="ftr-logo">
              <div className="ftr-logo-mark" aria-hidden>
                <BrandMark size={34} />
              </div>
              <div>
                <span className="ftr-logo-name">{brand.name}</span>
                <span className="ftr-logo-sub">UDF PROMISE TRACKER</span>
              </div>
            </div>

            <p className="ftr-tagline">
              {brand.domain} is Kerala&apos;s public promise ledger for tracking manifesto commitments,
              evidence, and progress without changing records unless verified.
            </p>

            <div className="ftr-trust">
              <span>Verified evidence trail</span>
              <span>Human editorial review</span>
              <span>Public community signals</span>
            </div>

            <div className="ftr-snapshot">
              <div className="ftr-snap-item">
                <span className="ftr-snap-num">{meta.total_promises.toLocaleString()}</span>
                <span className="ftr-snap-label">Promises</span>
              </div>
              <div className="ftr-snap-divider" />
              <div className="ftr-snap-item">
                <span className="ftr-snap-num">{activeCount}</span>
                <span className="ftr-snap-label">Active</span>
              </div>
              <div className="ftr-snap-divider" />
              <div className="ftr-snap-item">
                <span className="ftr-snap-num">{waitingCount}</span>
                <span className="ftr-snap-label">Waiting</span>
              </div>
            </div>
          </div>

          <div className="ftr-col">
            <p className="ftr-col-heading">Explore</p>
            <ul className="ftr-links">
              <li><Link href="/promises" className="ftr-link">All Promises</Link></li>
              <li><Link href="/categories" className="ftr-link">By Category</Link></li>
              <li><Link href="/ministers" className="ftr-link">By Minister</Link></li>
              <li><Link href="/timeline" className="ftr-link">Evidence Timeline</Link></li>
              <li><Link href="/manifesto/2026" className="ftr-link">Manifesto 2026</Link></li>
            </ul>
          </div>

          <div className="ftr-col">
            <p className="ftr-col-heading">Info</p>
            <ul className="ftr-links">
              <li><Link href="/about" className="ftr-link">About the Tracker</Link></li>
              <li><Link href="/about" className="ftr-link">Editorial Policy</Link></li>
              <li><Link href="/about" className="ftr-link">Methodology</Link></li>
              <li>
                <a
                  href="https://wa.me/919895618442"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ftr-link ftr-link--external"
                >
                  Report an Error <ExternalLinkIcon />
                </a>
              </li>
            </ul>
          </div>

          <div className="ftr-col">
            <p className="ftr-col-heading">Built by</p>

            <div className="ftr-agency">
              <a
                href="https://wa.me/919895618442"
                target="_blank"
                rel="noopener noreferrer"
                className="ftr-agency-cta"
                aria-label="Contact Vellmont on WhatsApp"
              >
                <span className="ftr-agency-wp"><WhatsAppIcon /></span>
                <div>
                  <span className="ftr-agency-name">Vellmont</span>
                  <span className="ftr-agency-label">Get in touch</span>
                </div>
              </a>
            </div>

            <p className="ftr-team-label">Team</p>
            <div className="ftr-team">
              <a
                href="https://instagram.com/muhemmed.rafi__"
                target="_blank"
                rel="noopener noreferrer"
                className="ftr-member"
                aria-label="Rafi on Instagram"
              >
                <span className="ftr-member-avatar">R</span>
                <span className="ftr-member-name">Rafi</span>
                <span className="ftr-member-ig"><InstagramIcon /></span>
              </a>
              <a
                href="https://instagram.com/muhd5aad"
                target="_blank"
                rel="noopener noreferrer"
                className="ftr-member"
                aria-label="Saad on Instagram"
              >
                <span className="ftr-member-avatar">S</span>
                <span className="ftr-member-name">Saad</span>
                <span className="ftr-member-ig"><InstagramIcon /></span>
              </a>
            </div>

            <SupportChai variant="footer" />
          </div>
        </div>

        <div className="ftr-verify-row">
          <div>
            <span className="ftr-verify-label">Current public record</span>
            <strong>{fulfillRate}% fulfilled</strong>
          </div>
          <Link href="/promises" className="ftr-verify-link">
            Browse records <ExternalLinkIcon />
          </Link>
        </div>

        <div className="ftr-bottom">
          <p className="ftr-copy">
            (c) {new Date().getFullYear()} {brand.name} - Data sourced from UDF Manifesto 2026
          </p>
          <p className="ftr-last-checked">
            Last verified: <time dateTime={meta.last_checked}>{meta.last_checked}</time>
          </p>
        </div>
      </div>
    </footer>
  );
}
