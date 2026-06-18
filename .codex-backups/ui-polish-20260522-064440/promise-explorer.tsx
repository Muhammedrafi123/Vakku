"use client";

import { ChevronLeft, ChevronRight, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import { useRef, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { PromiseCard } from "@/components/promise-card";
import { categoryOptions, statusOptions, type PromiseItem } from "@/lib/types";
import { filterPromises } from "@/lib/utils";
import { t, statusLabel } from "@/lib/i18n";
import { useLang } from "@/contexts/language-context";

const PAGE_SIZE = 20;

type Collection = {
  id: string;
  labelKey: string;
  predicate: (p: PromiseItem) => boolean;
};

const collections: Collection[] = [
  { id: "all",         labelKey: "pe_tab_all",        predicate: () => true },
  { id: "started",     labelKey: "pe_tab_started",    predicate: (p) => p.status !== "not_started" },
  { id: "high-impact", labelKey: "pe_tab_highimpact", predicate: (p) => p.importance === "high" && p.status !== "fulfilled" },
  { id: "women",       labelKey: "pe_tab_women",      predicate: (p) => p.category === "Women Empowerment" },
  { id: "students",    labelKey: "pe_tab_students",   predicate: (p) => p.category === "Education" || p.category === "Youth Development" || /student|college|school/i.test(p.promise_en) },
  { id: "jobs",        labelKey: "pe_tab_jobs",       predicate: (p) => p.category === "Employment" || /worker|job|employment/i.test(p.promise_en) },
  { id: "health",      labelKey: "pe_tab_health",     predicate: (p) => p.category === "Healthcare" },
  { id: "deadlines",   labelKey: "pe_tab_deadlines",  predicate: (p) => p.has_deadline },
];

export function PromiseExplorer({ promises }: { promises: PromiseItem[] }) {
  const { lang } = useLang();
  const isMl = lang === "ml";

  const searchParams = useSearchParams();
  const topRef = useRef<HTMLDivElement>(null);

  const [query,       setQuery]       = useState(searchParams.get("q")          ?? "");
  const [category,    setCategory]    = useState(searchParams.get("category")   ?? "all");
  const [status,      setStatus]      = useState(searchParams.get("status")     ?? "all");
  const [importance,  setImportance]  = useState(searchParams.get("importance") ?? "all");
  const [sort,        setSort]        = useState(searchParams.get("sort")       ?? "id");
  const [collection,  setCollection]  = useState(searchParams.get("collection") ?? "all");
  const [page,        setPage]        = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const active = collections.find((c) => c.id === collection) ?? collections[0];

  const counts = useMemo(
    () =>
      collections.reduce<Record<string, number>>((acc, c) => {
        acc[c.id] = promises.filter(c.predicate).length;
        return acc;
      }, {}),
    [promises],
  );

  const results = useMemo(
    () =>
      filterPromises(promises.filter(active.predicate), {
        query,
        category,
        status,
        importance,
        sort,
      }),
    [promises, active, query, category, status, importance, sort],
  );

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const pageItems  = results.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const filterCount = [
    category   !== "all",
    status     !== "all",
    importance !== "all",
    sort       !== "id",
  ].filter(Boolean).length;

  function goToPage(n: number) {
    setPage(n);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function resetAll() {
    setQuery("");
    setCategory("all");
    setStatus("all");
    setImportance("all");
    setSort("id");
    setCollection("all");
    setPage(1);
  }

  function pageNumbers(): (number | "…")[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "…")[] = [1];
    if (safePage > 3) pages.push("…");
    for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++)
      pages.push(i);
    if (safePage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  }

  return (
    <div className="pe-wrapper" ref={topRef}>

      {/* Collection tabs */}
      <div className="pe-tabs" role="tablist">
        {collections.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={c.id === collection}
            className={`pe-tab${c.id === collection ? " pe-tab--active" : ""}${isMl ? " malayalam" : ""}`}
            onClick={() => { setCollection(c.id); setPage(1); }}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {t(lang, c.labelKey as any)}
            <span className="pe-tab-count">{counts[c.id]}</span>
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="pe-toolbar">
        <label className="pe-search">
          <span className="sr-only">{t(lang, "pe_search_placeholder")}</span>
          <Search className="pe-search-icon" size={16} />
          <input
            className={`pe-search-input${isMl ? " malayalam" : ""}`}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder={t(lang, "pe_search_placeholder")}
          />
          {query && (
            <button
              type="button"
              className="pe-search-clear"
              onClick={() => { setQuery(""); setPage(1); }}
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </label>

        <button
          type="button"
          className={`pe-filter-btn${filtersOpen ? " pe-filter-btn--open" : ""}${isMl ? " malayalam" : ""}`}
          onClick={() => setFiltersOpen(!filtersOpen)}
          aria-expanded={filtersOpen}
        >
          <SlidersHorizontal size={15} />
          {t(lang, "pe_filters")}
          {filterCount > 0 && (
            <span className="pe-filter-badge">{filterCount}</span>
          )}
        </button>

        {(filterCount > 0 || query) && (
          <button
            type="button"
            className="pe-reset-btn"
            onClick={resetAll}
            title="Reset all filters"
          >
            <RotateCcw size={14} />
          </button>
        )}
      </div>

      {/* Collapsible filter panel */}
      {filtersOpen && (
        <div className="pe-filters">
          <PeSelect label={t(lang, "pe_filter_category")} value={category} onChange={(v) => { setCategory(v); setPage(1); }} isMl={isMl}>
            <option value="all">{t(lang, "pe_all_categories")}</option>
            {categoryOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </PeSelect>
          <PeSelect label={t(lang, "pe_filter_status")} value={status} onChange={(v) => { setStatus(v); setPage(1); }} isMl={isMl}>
            <option value="all">{t(lang, "pe_all_statuses")}</option>
            {statusOptions.map((o) => (
              <option key={o} value={o}>{statusLabel(lang, o)}</option>
            ))}
          </PeSelect>
          <PeSelect label={t(lang, "pe_filter_importance")} value={importance} onChange={(v) => { setImportance(v); setPage(1); }} isMl={isMl}>
            <option value="all">{t(lang, "pe_any_importance")}</option>
            <option value="high">{t(lang, "imp_high")}</option>
            <option value="medium">{t(lang, "imp_medium")}</option>
            <option value="low">{t(lang, "imp_low")}</option>
          </PeSelect>
          <PeSelect label={t(lang, "pe_filter_sort")} value={sort} onChange={(v) => { setSort(v); setPage(1); }} isMl={isMl}>
            <option value="id">{t(lang, "pe_sort_id")}</option>
            <option value="source_page">{t(lang, "pe_sort_page")}</option>
            <option value="importance">{t(lang, "pe_sort_importance")}</option>
            <option value="progress_desc">{t(lang, "pe_sort_progress_desc")}</option>
            <option value="progress_asc">{t(lang, "pe_sort_progress_asc")}</option>
          </PeSelect>
        </div>
      )}

      {/* Results info */}
      <div className={`pe-info${isMl ? " malayalam" : ""}`}>
        <span className="pe-info-count">
          <strong>{results.length.toLocaleString()}</strong>{" "}
          {results.length === 1 ? t(lang, "pe_promise") : t(lang, "pe_promises")}
        </span>
        {results.length < promises.length && (
          <span className="pe-info-of">{t(lang, "pe_of")} {promises.length.toLocaleString()} {t(lang, "pe_total")}</span>
        )}
        {totalPages > 1 && (
          <span className="pe-info-page">· {t(lang, "pe_page")} {safePage} / {totalPages}</span>
        )}
      </div>

      {/* Grid */}
      {pageItems.length > 0 ? (
        <div className="pe-grid">
          {pageItems.map((p) => (
            <PromiseCard key={p.id} promise={p} />
          ))}
        </div>
      ) : (
        <div className="pe-empty">
          <p className={isMl ? "malayalam" : ""}>{t(lang, "pe_no_results")}</p>
          <button type="button" onClick={resetAll} className={isMl ? "malayalam" : ""}>{t(lang, "pe_clear")}</button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="pe-pagination" aria-label="Pagination">
          <button
            type="button"
            className="pe-pg-btn"
            disabled={safePage === 1}
            onClick={() => goToPage(safePage - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {pageNumbers().map((n, i) =>
            n === "…" ? (
              <span key={`e-${i}`} className="pe-pg-ellipsis">…</span>
            ) : (
              <button
                key={n}
                type="button"
                className={`pe-pg-btn${n === safePage ? " pe-pg-btn--active" : ""}`}
                onClick={() => goToPage(n as number)}
                aria-current={n === safePage ? "page" : undefined}
              >
                {n}
              </button>
            ),
          )}

          <button
            type="button"
            className="pe-pg-btn"
            disabled={safePage === totalPages}
            onClick={() => goToPage(safePage + 1)}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </nav>
      )}

    </div>
  );
}

function PeSelect({
  label,
  value,
  onChange,
  children,
  isMl,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: ReactNode;
  isMl?: boolean;
}) {
  return (
    <label className="pe-select-wrap">
      <span className={`pe-select-label${isMl ? " malayalam" : ""}`}>{label}</span>
      <select
        className={`pe-select${isMl ? " malayalam" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {children}
      </select>
    </label>
  );
}
