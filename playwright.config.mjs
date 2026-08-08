import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  retries: 1,
  workers: 1,
  use: {
    browserName: "chromium",
    headless: true,
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
    baseURL: "http://127.0.0.1:4173",
  },
  webServer: {
    command: "npm run dev -- --port 4173",
    port: 4173,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
