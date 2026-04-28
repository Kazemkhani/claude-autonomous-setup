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
await browser.close();
