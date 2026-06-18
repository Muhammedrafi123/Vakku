"use client";

import type { Status } from "@/lib/types";
import { statusConfig } from "@/lib/utils";
import { statusLabel } from "@/lib/i18n";
import { useLang } from "@/contexts/language-context";

export function StatusBadge({ status }: { status: Status }) {
  const { lang } = useLang();
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold${lang === "ml" ? " malayalam" : ""}`}
      style={{ backgroundColor: config.bg, color: config.text }}
    >
      {statusLabel(lang, status)}
    </span>
  );
}
