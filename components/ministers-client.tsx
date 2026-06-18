"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Crown,
  Users,
  ArrowRight,
} from "lucide-react";
import { ministerInitials } from "@/lib/ministers";

export interface MinisterCardData {
  slug: string;
  name: string;
  role: string;
  partyShort: string;
  partyColor: string;
  imagePath?: string;
  portfolios: string[];
  isChiefMinister: boolean;
  hasPhoto: boolean;
  total: number;
  fulfilled: number;
  active: number;
  progress: number;
}

/* Small ring circumference r=17 */
const CIRC = 2 * Math.PI * 17;

function badgeLabel(m: MinisterCardData): string {
  if (m.isChiefMinister) return "Chief Minister";
  const first = m.portfolios[0] ?? "";
  return first.length > 18 ? first.slice(0, 17) + "…" : first;
}

function badgeClass(m: MinisterCardData): string {
  if (m.isChiefMinister) return "mlist-lead-badge--cm";
  return "mlist-lead-badge--dept";
}

export function MinistersClient({
  leadership,
  ministers,
}: {
  leadership: MinisterCardData[];
  ministers: MinisterCardData[];
}) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? ministers.filter(
        (m) =>
          m.name.toLowerCase().includes(query.toLowerCase()) ||
          m.role.toLowerCase().includes(query.toLowerCase()) ||
          m.portfolios.some((p) =>
            p.toLowerCase().includes(query.toLowerCase()),
          ),
      )
    : ministers;

  return (
    <>
      {/* ── Search strip ── */}
      <div className="mlist-search-strip">
        <div className="page-shell">
          <div className="mlist-search-row">
            <div className="mlist-search-wrap">
              <span className="mlist-search-icon" aria-hidden>
                <Search size={15} />
              </span>
              <input
                type="text"
                className="mlist-search-input"
                placeholder="Search ministers or departments..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search ministers"
              />
            </div>
            <button className="mlist-filter-btn" type="button" aria-label="Filter by department">
              All Departments <ChevronDown size={13} />
            </button>
            <button className="mlist-filter-btn" type="button" aria-label="Open filters">
              <SlidersHorizontal size={13} /> Filters
            </button>
          </div>
        </div>
      </div>

      {/* ── Cabinet Leadership ── */}
      <section className="mlist-lead-section" aria-label="Cabinet leadership">
        <div className="page-shell">
          <div className="mlist-lead-hdr">
            <div className="mlist-lead-hdr-left">
              <div className="mlist-lead-hdr-icon" aria-hidden>
                <Crown size={13} />
              </div>
              <span className="mlist-lead-hdr-title">Cabinet Leadership</span>
            </div>
            <Link href="/ministers" className="mlist-lead-viewall">
              View all <ArrowRight size={12} />
            </Link>
          </div>

          <div className="mlist-lead-scroll" role="list">
            {leadership.map((m) => {
              const offset = CIRC - (m.progress / 100) * CIRC;
              const initials = ministerInitials(m.name);
              const deptRole = m.role
                .replace("Minister for ", "")
                .replace("Minister of ", "");

              return (
                <Link
                  key={m.slug}
                  href={`/ministers/${m.slug}`}
                  className="mlist-lead-card"
                  role="listitem"
                >
                  {/* Photo + content row */}
                  <div className="mlist-lead-body">
                    {/* Photo column */}
                    <div className="mlist-lead-photo-col">
                      {m.hasPhoto && m.imagePath ? (
                        <Image
                          src={m.imagePath}
                          alt={m.name}
                          fill
                          sizes="104px"
                          className="object-cover"
                          style={{ objectPosition: "15% top" }}
                        />
                      ) : (
                        <div className="mlist-lead-initials">{initials}</div>
                      )}
                      <span className={`mlist-lead-badge ${badgeClass(m)}`}>
                        {badgeLabel(m)}
                      </span>
                    </div>

                    {/* Content column */}
                    <div className="mlist-lead-content-col">
                      <p className="mlist-lead-name">{m.name}</p>
                      <p className="mlist-lead-role">{deptRole}</p>
                      <div className="mlist-lead-sep" />
                      <div className="mlist-lead-stats">
                        <div className="mlist-lead-stat-block">
                          <span className="mlist-lead-stat-num">{m.total}</span>
                          <span className="mlist-lead-stat-lbl">Promises</span>
                        </div>

                        {/* Mini ring */}
                        <div className="mlist-lead-ring-wrap">
                          <svg
                            className="mlist-lead-ring-svg"
                            viewBox="0 0 42 42"
                            aria-hidden
                          >
                            <circle
                              className="mlist-lead-ring-track"
                              cx="21"
                              cy="21"
                              r="17"
                            />
                            <circle
                              className="mlist-lead-ring-fill"
                              cx="21"
                              cy="21"
                              r="17"
                              strokeDasharray={CIRC}
                              strokeDashoffset={offset}
                            />
                          </svg>
                          <div className="mlist-lead-ring-pct">
                            {m.progress}%
                          </div>
                        </div>

                        <div className="mlist-lead-inprog">
                          In<br />Progress
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer link */}
                  <div className="mlist-lead-footer">
                    View Profile <ArrowRight size={11} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── All Ministers ── */}
      <section className="mlist-all-section" aria-label="All ministers">
        <div className="page-shell">
          <div className="mlist-all-hdr">
            <div className="mlist-all-hdr-left">
              <div className="mlist-all-hdr-icon" aria-hidden>
                <Users size={13} />
              </div>
              <span className="mlist-all-title">All Ministers</span>
              {query.trim() && (
                <span className="mlist-count-badge">
                  {filtered.length} of {ministers.length}
                </span>
              )}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <button className="mlist-sort-btn" type="button">
                Sort by: Promise Count <ChevronDown size={12} />
              </button>
            </div>
          </div>

          {/* 6-col compact grid */}
          <div className="mlist-min-grid">
            {filtered.length === 0 ? (
              <div className="mlist-no-results">
                No ministers match &ldquo;{query}&rdquo;
              </div>
            ) : (
              filtered.map((m) => {
                const initials = ministerInitials(m.name);
                const dept = m.portfolios[0] ?? m.role.replace("Minister for ", "");

                return (
                  <Link
                    key={m.slug}
                    href={`/ministers/${m.slug}`}
                    className="mlist-min-card"
                  >
                    <div className="mlist-min-photo">
                      {m.hasPhoto && m.imagePath ? (
                        <Image
                          src={m.imagePath}
                          alt={m.name}
                          fill
                          sizes="(max-width:480px) 50vw, (max-width:720px) 33vw, (max-width:1100px) 25vw, 17vw"
                          className="object-cover"
                          style={{ objectPosition: "15% top" }}
                        />
                      ) : (
                        <div className="mlist-min-initials">{initials}</div>
                      )}
                    </div>
                    <div className="mlist-min-info">
                      <p className="mlist-min-name">{m.name}</p>
                      <p className="mlist-min-dept">{dept}</p>
                      <p className="mlist-min-promises">{m.total} Promises</p>
                    </div>
                    <div className="mlist-min-footer">
                      View Profile <ArrowRight size={10} />
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          <div className="mlist-view-all-wrap">
            <button className="mlist-view-all-btn" type="button">
              View All Ministers <ChevronDown size={15} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
