import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const programsPath = path.join(__dirname, "..", "content", "programs.json");
const programs = JSON.parse(fs.readFileSync(programsPath, "utf8"));
const prohibitedLabels =
  ".eyebrow, .kicker, .overline, [class*='eyebrow'], [class*='kicker'], [class*='overline']";

test("home page leads with Washington Tier 2 support and independence", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveTitle(/A Sustainable Future/i);
  await expect(page.getByRole("heading", { level: 1, name: /Free Washington Tier 2 readiness help/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ask for free help" })).toHaveAttribute("href", /^mailto:support@asustainablefuture\.org/);
  await expect(page.getByText(/Not affiliated with or endorsed by the Washington State Department of Commerce/i).first()).toBeVisible();
  await expect(page.getByText("July 1, 2027", { exact: true })).toBeVisible();
});

test("Washington guide exposes current requirements and Commerce sources", async ({ page }) => {
  await page.goto("/washington-tier-2/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1, name: /Prepare for Washington Tier 2 by July 1, 2027/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: /Benchmark energy use/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: /Implement an O&M program/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 3, name: /Create an energy management plan/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Commerce Tier 2 compliance/i })).toHaveAttribute("href", /commerce\.wa\.gov/);
  await expect(page.getByText(/not currently required to meet a performance metric/i)).toBeVisible();
  await expect(page.getByText(/requires a qualified energy manager/i)).toBeVisible();
});

test("Oregon guide remains available as a secondary resource", async ({ page }) => {
  await page.goto("/oregon-building-support/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1, name: /Know what applies/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /ODOE Building Performance Standard/i })).toHaveAttribute("href", /oregon\.gov/);
});

test("mobile navigation remains usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.locator("summary[aria-label='Open navigation']").click();
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Get free help" })).toBeVisible();
});

test("programs page shows free banner and cards", async ({ page }) => {
  await page.goto("/programs", { waitUntil: "domcontentloaded" });
  await expect(page.locator("section.programs-free")).toBeVisible();
  await expect(page.locator("text=All Programs Are Free")).toBeVisible();
  await expect(page.locator(".program-card")).toHaveCount(programs.length);
});

test("paid program pages are free placeholders", async ({ page }) => {
  const first = programs[0];
  const pathname = new URL(first.url).pathname;
  await page.goto(pathname, { waitUntil: "domcontentloaded" });
  await expect(page.locator(".badge", { hasText: "Now Free" })).toBeVisible();
  await expect(
    page.locator("text=Program materials will be added")
  ).toBeVisible();
});

test("Paper Consumption Model points to the dedicated paper site", async ({ page }) => {
  await page.goto("/paper-consumption-model/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { level: 1, name: /dedicated home/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open the Paper Consumption Model/i })).toHaveAttribute(
    "href",
    "https://paper.asustainablefuture.org/paper-consumption-model/",
  );
});

test("serif typography and flat layouts hold at all audited widths", async ({ page }) => {
  test.setTimeout(240_000);
  await page.route("**/*", (route) => {
    if (route.request().resourceType() === "image") {
      return route.abort();
    }
    return route.continue();
  });
  const routes = [
    "/",
    "/washington-tier-2/",
    "/oregon-building-support/",
    "/paper-consumption-model/",
    "/programs/",
    "/about/",
    "/environmental-help-center/",
    "/archive/",
    "/resources/",
  ];
  const viewports = [
    { width: 1920, height: 1080 },
    { width: 1024, height: 1024 },
    { width: 768, height: 1024 },
    { width: 412, height: 915 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);

      const layout = await page.evaluate(() => ({
        bodyFont: getComputedStyle(document.body).fontFamily,
        viewportWidth: document.documentElement.clientWidth,
        contentWidth: document.documentElement.scrollWidth,
        regularLoaded: document.fonts.check('400 19px "Cormorant Garamond"'),
        boldLoaded: document.fonts.check('700 48px "Cormorant Garamond"'),
        roundedElements: [...document.querySelectorAll("*")].filter((element) => {
          const style = getComputedStyle(element);
          return [
            style.borderTopLeftRadius,
            style.borderTopRightRadius,
            style.borderBottomRightRadius,
            style.borderBottomLeftRadius,
          ].some((value) => parseFloat(value) > 0);
        }).length,
      }));

      expect(layout.bodyFont).toContain("Cormorant Garamond");
      expect(layout.regularLoaded).toBe(true);
      expect(layout.boldLoaded).toBe(true);
      expect(layout.contentWidth).toBeLessThanOrEqual(layout.viewportWidth);
      expect(layout.roundedElements).toBe(0);
      await expect(page.locator(prohibitedLabels)).toHaveCount(0);
    }
  }
});

test("shared spacing stays bounded and content images reserve exact geometry", async ({ page }) => {
  test.slow();
  const viewports = [
    { width: 1440, height: 1000 },
    { width: 1000, height: 1000 },
    { width: 390, height: 844 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    await page.goto("/programs/", { waitUntil: "domcontentloaded" });
    const contentImages = await page.locator(".content-image img").evaluateAll((images) =>
      images.map((image) => {
        const rect = image.getBoundingClientRect();
        return {
          width: Number(image.getAttribute("width")),
          height: Number(image.getAttribute("height")),
          renderedWidth: rect.width,
          renderedHeight: rect.height,
        };
      })
    );
    expect(contentImages.length).toBeGreaterThan(25);
    expect(contentImages.every((image) => image.width > 0 && image.height > 0)).toBe(true);
    await expect.poll(
      async () => page.locator(".content-image img").evaluateAll((images) =>
        images.every((image) => {
          const rect = image.getBoundingClientRect();
          return rect.width > 0 && rect.height > 0;
        })
      ),
      { timeout: 15_000 }
    ).toBe(true);

    await page.goto("/environmental-help-center/", { waitUntil: "domcontentloaded" });
    const genericGeometry = await page.evaluate(() => {
      const figures = [...document.querySelectorAll(".content-image")];
      const blocks = [...document.querySelectorAll(".content-blocks > *")];
      const blockGaps = blocks.slice(1).map((block, index) => {
        const previous = blocks[index].getBoundingClientRect();
        const current = block.getBoundingClientRect();
        return current.top - previous.bottom;
      });
      return {
        rowGap: parseFloat(getComputedStyle(document.querySelector(".content-blocks")).rowGap),
        maxBlockGap: Math.max(...blockGaps),
        figures: figures.map((figure) => {
          const image = figure.querySelector("img");
          return {
            figureWidth: figure.getBoundingClientRect().width,
            sourceWidth: Number(image.getAttribute("width")),
          };
        }),
      };
    });
    expect(genericGeometry.rowGap).toBeLessThanOrEqual(24);
    expect(genericGeometry.maxBlockGap).toBeLessThanOrEqual(24.1);
    expect(genericGeometry.figures.every(
      ({ figureWidth, sourceWidth }) => figureWidth <= sourceWidth + 2.1
    )).toBe(true);

    await page.goto("/", { waitUntil: "domcontentloaded" });
    const homeGeometry = await page.evaluate(() => ({
      sectionPadding: Math.max(
        ...[...document.querySelectorAll(".section")].map((section) =>
          parseFloat(getComputedStyle(section).paddingTop)
        )
      ),
      heroMinHeight: parseFloat(getComputedStyle(document.querySelector(".hero")).minHeight),
      serviceMinHeight: Math.max(
        ...[...document.querySelectorAll(".service-card")].map((card) =>
          parseFloat(getComputedStyle(card).minHeight)
        )
      ),
    }));
    expect(homeGeometry.sectionPadding).toBeLessThanOrEqual(64);
    expect(homeGeometry.heroMinHeight).toBe(0);
    expect(homeGeometry.serviceMinHeight).toBe(0);

    await page.goto("/oregon-building-support/", { waitUntil: "domcontentloaded" });
    const guideGeometry = await page.evaluate(() => ({
      pagePadding: parseFloat(getComputedStyle(document.querySelector(".guide-page")).paddingTop),
      sectionPadding: Math.max(
        ...[...document.querySelectorAll(".guide-section")].map((section) =>
          parseFloat(getComputedStyle(section).paddingBottom)
        )
      ),
    }));
    expect(guideGeometry.pagePadding).toBeLessThanOrEqual(64);
    expect(guideGeometry.sectionPadding).toBeLessThanOrEqual(64);

    await page.goto("/archive/", { waitUntil: "domcontentloaded" });
    const archiveAlignment = await page.locator(".post-list").evaluate(
      (element) => getComputedStyle(element).alignItems
    );
    expect(archiveAlignment).toBe("start");
    expect(await page.locator(".post-card").count()).toBeGreaterThan(60);
    await expect(page.locator(".post-card__placeholder")).toHaveCount(0);
  }
});
