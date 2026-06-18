import metaJson from "@/data/meta.json";
import promisesJson from "@/data/promises.json";
import type { Meta, PromiseItem } from "@/lib/types";

export const promises = promisesJson as PromiseItem[];
export const meta = metaJson as Meta;

export function getPromiseById(id: string) {
  return promises.find((promise) => promise.id.toLowerCase() === id.toLowerCase());
}

export function unresolvedHighImportance(limit = 6) {
  return promises
    .filter((promise) => promise.importance === "high" && promise.status !== "fulfilled")
    .slice(0, limit);
}
