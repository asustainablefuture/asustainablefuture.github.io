import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const programsPath = path.join(__dirname, "..", "content", "programs.json");
const programs = JSON.parse(fs.readFileSync(programsPath, "utf8"));

test("home page presents Oregon support and independence", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/A Sustainable Future/i);
  await expect(page.getByRole("heading", { level: 1, name: /Turn energy reporting into energy saved/i })).toBeVisible();
  await expect(page.getByRole("link", { name: "Request free support" })).toHaveAttribute("href", /^mailto:/);
  await expect(page.getByText(/We do not represent or speak for the State of Oregon/i)).toBeVisible();
});

test("Oregon building guide exposes deadlines and primary sources", async ({ page }) => {
  await page.goto("/oregon-building-support/");
  await expect(page.getByRole("heading", { level: 1, name: /Know what applies/i })).toBeVisible();
  await expect(page.getByText("June 1, 2028", { exact: true })).toBeVisible();
  await expect(page.getByText("July 1, 2028", { exact: true }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /ODOE Building Performance Standard/i })).toHaveAttribute("href", /oregon\.gov/);
});

test("mobile navigation remains usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator("summary[aria-label='Open navigation']").click();
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Get free help" })).toBeVisible();
});

test("programs page shows free banner and cards", async ({ page }) => {
  await page.goto("/programs");
  await expect(page.locator("section.programs-free")).toBeVisible();
  await expect(page.locator("text=All Programs Are Free")).toBeVisible();
  await expect(page.locator(".program-card")).toHaveCount(programs.length);
});

test("paid program pages are free placeholders", async ({ page }) => {
  const first = programs[0];
  const pathname = new URL(first.url).pathname;
  await page.goto(pathname);
  await expect(page.locator(".badge", { hasText: "Now Free" })).toBeVisible();
  await expect(
    page.locator("text=Program materials will be added")
  ).toBeVisible();
});

test("serif typography loads and public layouts do not overflow", async ({ page }) => {
  const routes = ["/", "/oregon-building-support/", "/archive/", "/programs/"];
  const viewports = [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);

      const layout = await page.evaluate(() => ({
        bodyFont: getComputedStyle(document.body).fontFamily,
        viewportWidth: document.documentElement.clientWidth,
        contentWidth: document.documentElement.scrollWidth,
        regularLoaded: document.fonts.check('400 19px "Cormorant Garamond"'),
        boldLoaded: document.fonts.check('700 48px "Cormorant Garamond"'),
      }));

      expect(layout.bodyFont).toContain("Cormorant Garamond");
      expect(layout.regularLoaded).toBe(true);
      expect(layout.boldLoaded).toBe(true);
      expect(layout.contentWidth).toBeLessThanOrEqual(layout.viewportWidth);
      await expect(page.locator(".eyebrow")).toHaveCount(0);
    }
  }
});
