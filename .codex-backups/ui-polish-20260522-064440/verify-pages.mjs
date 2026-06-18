import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const checks = [
  { name: "home-desktop", url: "http://localhost:3000/", width: 1440, height: 1100, text: "Total Promises" },
  { name: "home-mobile", url: "http://localhost:3000/", width: 390, height: 1000, text: "Total Promises" },
  { name: "promises", url: "http://localhost:3000/promises", width: 1280, height: 900, text: "Showing" },
  { name: "detail", url: "http://localhost:3000/promise/P001", width: 1280, height: 900, text: "Manifesto page" },
];

await mkdir(".verification", { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

for (const check of checks) {
  const page = await browser.newPage({ viewport: { width: check.width, height: check.height } });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  const response = await page.goto(check.url, { waitUntil: "domcontentloaded", timeout: 45_000 });
  await page.waitForTimeout(700);
  const textFound = await page.getByText(check.text, { exact: false }).first().isVisible().catch(() => false);
  const screenshot = `.verification/${check.name}.png`;
  await page.screenshot({ path: screenshot, fullPage: false });

  results.push({ name: check.name, status: response?.status(), textFound, errors, screenshot });
  await page.close();
}

await browser.close();
await writeFile(".verification/results.json", `${JSON.stringify(results, null, 2)}\n`, "utf8");
console.log(JSON.stringify(results, null, 2));
