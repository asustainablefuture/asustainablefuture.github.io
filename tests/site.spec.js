import { test, expect } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const programsPath = path.join(__dirname, "..", "content", "programs.json");
const programs = JSON.parse(fs.readFileSync(programsPath, "utf8"));

test("home page renders hero", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/A Sustainable Future/i);
  await expect(page.locator("h1", { hasText: "A Sustainable Future" })).toBeVisible();
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
