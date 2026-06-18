"use client";

import Link from "next/link";
import { ProgressBar } from "@/components/progress-bar";
import { StatusBadge } from "@/components/status-badge";
import type { PromiseItem } from "@/lib/types";
import { statusBorder } from "@/lib/utils";
import { t } from "@/lib/i18n";
import { useLang } from "@/contexts/language-context";

export function PromiseCard({ promise }: { promise: PromiseItem }) {
  const { lang } = useLang();
  const isMl = lang === "ml";
  const title = isMl && promise.promise_ml ? promise.promise_ml : promise.promise_en;

  return (
    <Link
      href={`/promise/${promise.id}`}
      className="pc"
      style={{ "--pc-border": statusBorder(promise.status) } as React.CSSProperties}
    >
      <div className="pc-top">
        <span className="pc-id">{promise.id}</span>
        <StatusBadge status={promise.status} />
      </div>

      <h3 className={`pc-title line-clamp-3${isMl ? " malayalam" : ""}`}>{title}</h3>

      <div className="pc-chips">
        <span className="pc-chip">{promise.category}</span>
        {promise.importance === "high" && (
          <span className="pc-chip pc-chip--high">{t(lang, "pc_high_impact")}</span>
        )}
        {promise.has_deadline && (
          <span className="pc-chip pc-chip--deadline">{t(lang, "pc_deadline")}</span>
        )}
      </div>

      <div className="pc-foot">
        <div className="pc-progress-row">
          <span className={isMl ? "malayalam" : ""}>{t(lang, "pc_progress")}</span>
          <span>{promise.progress}%</span>
        </div>
        <ProgressBar progress={promise.progress} status={promise.status} />
      </div>
    </Link>
  );
}
