"use client";

import { useState } from "react";
import { PromiseCard } from "@/components/promise-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { PromiseItem, Status } from "@/lib/types";

const STATUS_FILTERS: { value: "all" | Status; label: string }[] = [
  { value: "all",         label: "All" },
  { value: "not_started", label: "Not Started" },
  { value: "announced",   label: "Announced" },
  { value: "in_progress", label: "In Progress" },
  { value: "fulfilled",   label: "Fulfilled" },
  { value: "delayed",     label: "Delayed" },
  { value: "abandoned",   label: "Abandoned" },
];

interface Props {
  promises: PromiseItem[];
  depts?: string[]; // optional dept tabs (for minister pages with multiple depts)
}

export function DeptPromiseList({ promises, depts }: Props) {
  const [activeDept, setActiveDept] = useState<string>("all");
  const [activeStatus, setActiveStatus] = useState<"all" | Status>("all");

  const deptFiltered =
    activeDept === "all" ? promises : promises.filter((p) => p.department === activeDept);

  const filtered =
    activeStatus === "all"
      ? deptFiltered
      : deptFiltered.filter((p) => p.status === activeStatus);

  const visibleStatuses = STATUS_FILTERS.filter((f) => {
    if (f.value === "all") return true;
    return deptFiltered.some((p) => p.status === f.value);
  });

  const showDeptTabs = depts && depts.length > 1;

  return (
    <>
      {/* Dept tabs (only shown on minister pages with 2+ depts) */}
      {showDeptTabs && (
        <div className="dept-filters dept-filters--dept mb-2">
          <button
            onClick={() => { setActiveDept("all"); setActiveStatus("all"); }}
            className={`dept-filter-tab ${activeDept === "all" ? "dept-filter-tab--active" : ""}`}
          >
            All Departments
            <span className="dept-filter-count">{promises.length}</span>
          </button>
          {depts.map((d) => {
            const count = promises.filter((p) => p.department === d).length;
            return (
              <button
                key={d}
                onClick={() => { setActiveDept(d); setActiveStatus("all"); }}
                className={`dept-filter-tab ${activeDept === d ? "dept-filter-tab--active" : ""}`}
              >
                {d}
                <span className="dept-filter-count">{count}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Status filter tabs */}
      <div className="dept-filters">
        {visibleStatuses.map((f) => {
          const count =
            f.value === "all"
              ? deptFiltered.length
              : deptFiltered.filter((p) => p.status === f.value).length;
          return (
            <button
              key={f.value}
              onClick={() => setActiveStatus(f.value)}
              className={`dept-filter-tab ${activeStatus === f.value ? "dept-filter-tab--active" : ""}`}
            >
              {f.label}
              <span className="dept-filter-count">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="dept-results-count">
        {filtered.length} promise{filtered.length !== 1 ? "s" : ""}
        {activeStatus !== "all"
          ? ` · ${STATUS_FILTERS.find((f) => f.value === activeStatus)?.label}`
          : ""}
        {activeDept !== "all" ? ` · ${activeDept}` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="dept-empty">No promises match this filter.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((promise) => (
            <ScrollReveal key={promise.id}>
              <PromiseCard promise={promise} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </>
  );
}
