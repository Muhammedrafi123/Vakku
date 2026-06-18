import { readFile, writeFile } from "node:fs/promises";

const promises = JSON.parse(await readFile("data/promises.json", "utf8"));
const current = JSON.parse(await readFile("data/meta.json", "utf8"));
const statuses = ["fulfilled", "announced", "in_progress", "partial", "not_started", "delayed", "abandoned"];

const next = {
  ...current,
  total_promises: promises.length,
  overall_progress_percent: promises.length
    ? Math.round(promises.reduce((sum, promise) => sum + Number(promise.progress || 0), 0) / promises.length)
    : 0,
};

for (const status of statuses) {
  next[status] = promises.filter((promise) => promise.status === status).length;
}

await writeFile("data/meta.json", `${JSON.stringify(next, null, 2)}\n`, "utf8");
console.log(`Regenerated metadata for ${promises.length} promises.`);
