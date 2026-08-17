import { defineConfig, devices } from "@playwright/test";

const PORT = 3000;
const BASE_URL = process.env.QA_BASE_URL ?? `http://localhost:${PORT}`;
// Reuse an already-running `next dev` in interactive/local use; CI always
// boots its own to avoid testing against a stale server.
const REUSE_EXISTING_SERVER = !process.env.CI;

export default defineConfig({
  testDir: "./qa/tests",
  timeout: 30_000,
  expect: { timeout: 8_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ["html", { outputFolder: "qa/reports/html", open: "never" }],
    ["json", { outputFile: "qa/reports/results.json" }],
    ["list"],
  ],
  outputDir: "qa/reports/test-results",

  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  // A single project at a standard desktop viewport. Responsive coverage
  // (the 7 required breakpoints) is handled explicitly inside
  // qa/tests/responsive via page.setViewportSize() per case, rather than
  // via Playwright device projects — that gives exact control over the
  // specific viewport sizes the brief asks for instead of approximating
  // them with named device presets.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
  ],

  webServer: {
    command: "npm run dev",
    url: BASE_URL,
    reuseExistingServer: REUSE_EXISTING_SERVER,
    timeout: 60_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
