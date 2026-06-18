import { categoryOptions, type PromiseItem, type Status } from "@/lib/types";

export const statusConfig: Record<
  Status,
  { label: string; bg: string; text: string; border: string; tone: string }
> = {
  fulfilled: { label: "Fulfilled", bg: "#16a34a", text: "#ffffff", border: "#16a34a", tone: "green" },
  in_progress: { label: "In progress", bg: "#d97706", text: "#ffffff", border: "#d97706", tone: "amber" },
  announced: { label: "Announced", bg: "#2563eb", text: "#ffffff", border: "#2563eb", tone: "blue" },
  partial: { label: "Partial", bg: "#4f46e5", text: "#ffffff", border: "#2563eb", tone: "indigo" },
  not_started: { label: "Not started", bg: "#e5e7eb", text: "#111111", border: "#9ca3af", tone: "gray" },
  delayed: { label: "Delayed", bg: "#f59e0b", text: "#ffffff", border: "#f59e0b", tone: "orange" },
  abandoned: { label: "Abandoned", bg: "#dc2626", text: "#ffffff", border: "#dc2626", tone: "red" },
};

export const statusLabels = Object.fromEntries(
  Object.entries(statusConfig).map(([key, value]) => [key, value.label]),
) as Record<Status, string>;

export function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00+05:30`));
}

export function daysSince(date: string, now = new Date()) {
  const start = new Date(`${date}T00:00:00+05:30`).getTime();
  return Math.max(0, Math.floor((now.getTime() - start) / 86_400_000));
}

export function statusBorder(status: Status) {
  return statusConfig[status].border;
}

export function categoryStats(promises: PromiseItem[]) {
  return categoryOptions.map((category) => {
    const items = promises.filter((promise) => promise.category === category);
    const progress = items.length
      ? Math.round(items.reduce((sum, item) => sum + item.progress, 0) / items.length)
      : 0;
    return {
      category,
      total: items.length,
      progress,
      fulfilled: items.filter((item) => item.status === "fulfilled").length,
      in_progress: items.filter((item) => item.status === "in_progress").length,
      announced: items.filter((item) => item.status === "announced").length,
      not_started: items.filter((item) => item.status === "not_started").length,
      partial: items.filter((item) => item.status === "partial").length,
      delayed: items.filter((item) => item.status === "delayed").length,
      abandoned: items.filter((item) => item.status === "abandoned").length,
    };
  });
}

export function departmentStats(promises: PromiseItem[]) {
  const map = new Map<string, PromiseItem[]>();
  for (const promise of promises) {
    const key = promise.department || "Department not assigned";
    map.set(key, [...(map.get(key) ?? []), promise]);
  }

  return [...map.entries()]
    .map(([department, items]) => ({
      department,
      minister: items.find((item) => item.minister)?.minister ?? "",
      total: items.length,
      progress: items.length
        ? Math.round(items.reduce((sum, item) => sum + item.progress, 0) / items.length)
        : 0,
      topPromises: items.slice(0, 3),
      fulfilled: items.filter((item) => item.status === "fulfilled").length,
      in_progress: items.filter((item) => item.status === "in_progress").length,
      not_started: items.filter((item) => item.status === "not_started").length,
    }))
    .sort((a, b) => b.total - a.total || a.department.localeCompare(b.department));
}

export function relatedPromises(current: PromiseItem, promises: PromiseItem[], limit = 4) {
  return promises
    .filter((promise) => promise.id !== current.id && promise.category === current.category)
    .slice(0, limit);
}

export function allTimelineEntries(promises: PromiseItem[]) {
  return promises
    .flatMap((promise) =>
      promise.timeline.map((entry) => ({
        ...entry,
        promiseId: promise.id,
        category: promise.category,
        promiseTitle: promise.promise_en,
      })),
    )
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function deptToSlug(dept: string): string {
  return dept
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function filterPromises(
  promises: PromiseItem[],
  filters: {
    query?: string;
    category?: string;
    status?: string;
    importance?: string;
    sort?: string;
  },
) {
  const query = normalizeSearch(filters.query ?? "");
  const filtered = promises.filter((promise) => {
    const text = normalizeSearch(
      `${promise.id} ${promise.promise_en} ${promise.promise_ml} ${promise.category} ${promise.department}`,
    );
    const matchesQuery = !query || text.includes(query);
    const matchesCategory = !filters.category || filters.category === "all" || promise.category === filters.category;
    const matchesStatus = !filters.status || filters.status === "all" || promise.status === filters.status;
    const matchesImportance =
      !filters.importance || filters.importance === "all" || promise.importance === filters.importance;
    return matchesQuery && matchesCategory && matchesStatus && matchesImportance;
  });

  return filtered.sort((a, b) => {
    switch (filters.sort) {
      case "progress_desc":
        return b.progress - a.progress || a.id.localeCompare(b.id);
      case "progress_asc":
        return a.progress - b.progress || a.id.localeCompare(b.id);
      case "importance":
        return importanceRank(b.importance) - importanceRank(a.importance) || a.id.localeCompare(b.id);
      case "source_page":
        return a.source_page - b.source_page || a.id.localeCompare(b.id);
      default:
        return a.id.localeCompare(b.id);
    }
  });
}

function importanceRank(importance: PromiseItem["importance"]) {
  if (importance === "high") return 3;
  if (importance === "medium") return 2;
  return 1;
}
