const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  retries: 1,
  workers: 1,
  use: {
    browserName: "chromium",
    headless: true,
    executablePath: "/usr/bin/chromium",
    baseURL: "http://127.0.0.1:4173",
  },
  webServer: {
    command: "node server.js",
    port: 4173,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
