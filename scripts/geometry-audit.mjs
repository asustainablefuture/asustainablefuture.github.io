import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const baseURL = process.env.ASF_BASE_URL || "https://www.asustainablefuture.org";
const label = process.env.ASF_AUDIT_LABEL || "live-before";
const outputRoot = path.resolve("artifacts", `geometry-${label}`);
const routes = [
  { name: "home", path: "/" },
  { name: "oregon-guide", path: "/oregon-building-support/" },
  { name: "programs", path: "/programs/" },
  { name: "about", path: "/about/" },
  { name: "help-center", path: "/environmental-help-center/" },
  { name: "archive", path: "/archive/" },
  { name: "resources", path: "/resources/" },
];
const viewports = [
  { name: "wide", width: 1440, height: 1000 },
  { name: "square", width: 1000, height: 1000 },
  { name: "phone", width: 390, height: 844 },
];

await fs.mkdir(outputRoot, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
});
const results = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();

  for (const route of routes) {
    const url = new URL(route.path, baseURL).href;
    const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
    await page.evaluate(() => document.fonts.ready);

    const geometry = await page.evaluate(() => {
      const round = (value) => Math.round(value * 10) / 10;
      const selector = (element) => {
        if (element.id) return `${element.tagName.toLowerCase()}#${element.id}`;
        const classes = [...element.classList].slice(0, 3).join(".");
        return `${element.tagName.toLowerCase()}${classes ? `.${classes}` : ""}`;
      };
      const describe = (element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          selector: selector(element),
          top: round(rect.top + scrollY),
          bottom: round(rect.bottom + scrollY),
          height: round(rect.height),
          width: round(rect.width),
          text: (element.textContent || "").replace(/\s+/g, " ").trim().slice(0, 90),
          display: style.display,
          minHeight: style.minHeight,
          marginTop: style.marginTop,
          marginBottom: style.marginBottom,
          paddingTop: style.paddingTop,
          paddingBottom: style.paddingBottom,
          rowGap: style.rowGap,
        };
      };

      const occupied = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const node = walker.currentNode;
        if (!node.textContent.trim()) continue;
        const parent = node.parentElement;
        if (!parent) continue;
        const style = getComputedStyle(parent);
        if (style.display === "none" || style.visibility === "hidden") continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        for (const rect of range.getClientRects()) {
          if (rect.width > 0 && rect.height > 0) {
            occupied.push({ top: rect.top + scrollY, bottom: rect.bottom + scrollY, type: "text" });
          }
        }
      }
      for (const element of document.querySelectorAll("main img, main svg, main video, main canvas, main input, main textarea, main button")) {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        if (rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden") {
          occupied.push({ top: rect.top + scrollY, bottom: rect.bottom + scrollY, type: element.tagName.toLowerCase() });
        }
      }
      occupied.sort((a, b) => a.top - b.top || a.bottom - b.bottom);
      const merged = [];
      for (const interval of occupied) {
        const last = merged.at(-1);
        if (!last || interval.top > last.bottom) merged.push({ ...interval });
        else last.bottom = Math.max(last.bottom, interval.bottom);
      }
      const main = document.querySelector("main");
      const footer = document.querySelector("footer");
      const mainTop = main?.getBoundingClientRect().top + scrollY || 0;
      const mainBottom = footer?.getBoundingClientRect().top + scrollY || document.documentElement.scrollHeight;
      const inMain = merged.filter((range) => range.bottom >= mainTop && range.top <= mainBottom);
      const blankGaps = [];
      let previous = mainTop;
      for (const interval of inMain) {
        if (interval.top > previous) {
          blankGaps.push({ top: round(previous), bottom: round(interval.top), height: round(interval.top - previous) });
        }
        previous = Math.max(previous, interval.bottom);
      }
      if (mainBottom > previous) {
        blankGaps.push({ top: round(previous), bottom: round(mainBottom), height: round(mainBottom - previous) });
      }
      blankGaps.sort((a, b) => b.height - a.height);

      const structural = [...document.querySelectorAll(
        "main > *, .hero, .section, .guide-page, .guide-hero, .guide-nav, .guide-section, .page, .content-blocks, .content-blocks > *, .programs-free, .program-grid, .archive-header, .archive-categories, .post-list, .post-card, .post-card__image, .post-card__body, .post-card__tags, .site-footer"
      )].map(describe);

      const contentBlocks = [...document.querySelectorAll(".content-blocks > *")].map((element, index) => ({
        index,
        ...describe(element),
        childCount: element.querySelectorAll("*").length,
        image: element.querySelector("img") ? {
          complete: element.querySelector("img").complete,
          naturalWidth: element.querySelector("img").naturalWidth,
          naturalHeight: element.querySelector("img").naturalHeight,
        } : null,
      }));

      return {
        title: document.title,
        documentHeight: document.documentElement.scrollHeight,
        viewportWidth: document.documentElement.clientWidth,
        contentWidth: document.documentElement.scrollWidth,
        bodyFont: getComputedStyle(document.body).fontFamily,
        blankGaps: blankGaps.slice(0, 12),
        structural,
        contentBlocks,
      };
    });

    await page.evaluate(async () => {
      const step = Math.max(400, Math.floor(innerHeight * 0.8));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
      scrollTo(0, 0);
    });
    await page.waitForTimeout(150);

    const screenshot = `${route.name}-${viewport.name}.png`;
    await page.screenshot({ path: path.join(outputRoot, screenshot), fullPage: true });
    results.push({
      route: route.path,
      routeName: route.name,
      viewport,
      status: response?.status(),
      screenshot,
      ...geometry,
    });
    process.stdout.write(`${route.name} ${viewport.name}: ${geometry.documentHeight}px, largest blank ${geometry.blankGaps[0]?.height || 0}px\n`);
  }

  await context.close();
}

await browser.close();
await fs.writeFile(path.join(outputRoot, "geometry.json"), `${JSON.stringify(results, null, 2)}\n`);

