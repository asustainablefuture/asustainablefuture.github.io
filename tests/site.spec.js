const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

const paidProgramsPath = path.join(__dirname, "..", "data", "paid-programs.json");
const paidPrograms = JSON.parse(fs.readFileSync(paidProgramsPath, "utf8"));

test("home page renders hero", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/A Sustainable Future/i);
  await expect(page.locator("h1", { hasText: "A Sustainable Future" })).toBeVisible();
});

test("programs page shows free banner and cards", async ({ page }) => {
  await page.goto("/programs");
  await expect(page.locator("section.asf-programs-free")).toBeVisible();
  await expect(page.locator("text=All Programs Are Free")).toBeVisible();
  await expect(page.locator(".asf-program-card")).toHaveCount(paidPrograms.length);
});

test("paid program pages are free placeholders", async ({ page }) => {
  const first = paidPrograms[0];
  const pathname = new URL(first.url).pathname;
  await page.goto(pathname);
  await expect(page.locator(".badge", { hasText: "Now Free" })).toBeVisible();
  await expect(
    page.locator("text=Program materials will be added")
  ).toBeVisible();
});
