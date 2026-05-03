import { chromium } from "playwright";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1080, height: 1080 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
for (let i = 1; i <= 5; i++) {
  const n = String(i).padStart(2, "0");
  const url = "file://" + join(__dirname, "slides", `slide-${n}.html`);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.screenshot({
    path: join(__dirname, "slides", `slide-${n}.png`),
    omitBackground: false,
    fullPage: false,
  });
  console.log(`rendered slide-${n}.png`);
}

// Variation-specific carousels: v2-v6 (Phase 1 variations), v7-v13 (Phase 2 unique sets)
for (const setName of [
  "v2",
  "v3",
  "v4",
  "v5",
  "v6",
  "v7",
  "v8",
  "v9",
  "v10",
  "v11",
  "v12",
  "v13",
  "v14",
  "v15",
  "v16",
  "v17",
  "v18",
  "v19",
  "v20",
  "v21",
  "v22",
  "v23",
  "v24",
  "v25",
  "v26",
]) {
  for (let i = 1; i <= 3; i++) {
    const n = String(i).padStart(2, "0");
    const url = "file://" + join(__dirname, "slides", `${setName}-${n}.html`);
    await page.goto(url, { waitUntil: "networkidle" });
    await page.screenshot({
      path: join(__dirname, "slides", `${setName}-${n}.png`),
      omitBackground: false,
      fullPage: false,
    });
    console.log(`rendered ${setName}-${n}.png`);
  }
}
await browser.close();
