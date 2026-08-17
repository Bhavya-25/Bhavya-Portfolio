// Phase 14 — Lighthouse against the "important pages" subset. A plain Node
// script rather than a Playwright test: Lighthouse drives its own
// chrome-launcher instance and doesn't fit Playwright's test runner model.
// Requires the dev server already running (npm run dev) on QA_BASE_URL /
// localhost:3000 — the qa:performance npm script starts one automatically.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.env.QA_BASE_URL ?? "http://localhost:3000";

// All 8 static pages, plus a deliberate sample of the dynamic families
// (services/projects/resources) rather than every single one of the ~40
// total routes. Every /services/[slug] page shares one template/component
// tree and one JS bundle — only the text content differs — so Lighthouse
// scores across siblings are expected to track closely together; the
// sample below spans visibly different content shapes within each family
// (e.g. text-only vs. image-heavy service pages) to catch anything content
// -specific, without paying ~15-30s x 40 pages for near-duplicate signal.
// Real coverage gaps from this choice are called out explicitly in
// QA-REPORT.md rather than left implicit.
const IMPORTANT_PAGES = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/services", label: "Services (index)" },
  { path: "/projects", label: "Projects (index)" },
  { path: "/blog", label: "Blog" },
  { path: "/resources", label: "Resources (index)" },
  { path: "/resume", label: "Resume" },
  { path: "/contact", label: "Contact" },
  { path: "/services/nextjs-development", label: "Service — Next.js Development" },
  { path: "/services/mobile-app-development", label: "Service — Mobile App Development" },
  { path: "/services/ui-ux-design", label: "Service — UI/UX Design" },
  { path: "/services/shopify-development", label: "Service — Shopify Development" },
  { path: "/projects/placeholder-product-platform", label: "Project — Product Platform" },
  { path: "/projects/placeholder-mobile-app", label: "Project — Mobile Application" },
  { path: "/resources/design-process", label: "Resource — Design Process" },
  { path: "/resources/ui-inspiration", label: "Resource — UI Inspiration" },
];

// The routes NOT included above, for the report's "not individually tested"
// accounting — same-template siblings of the ones that were.
export const SKIPPED_ROUTES_NOTE =
  "16 of ~40 routes ran through Lighthouse individually (all 8 static pages, plus 4 services / 2 projects / 2 resources spanning each dynamic family's different content shapes). The remaining 16 services, 3 projects, and 5 resources share the same template/component/bundle as the ones tested and were not run individually.";

const OUTPUT_DIR = path.join(__dirname, "..", "reports", "performance");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function scoreOf(lhr, category) {
  const raw = lhr.categories[category]?.score;
  return raw === null || raw === undefined ? null : Math.round(raw * 100);
}

async function auditPage(chrome, page) {
  const result = await lighthouse(
    `${BASE_URL}${page.path}`,
    {
      port: chrome.port,
      output: "json",
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    }
  );

  const { lhr } = result;
  const audits = lhr.audits;

  return {
    path: page.path,
    label: page.label,
    scores: {
      performance: scoreOf(lhr, "performance"),
      accessibility: scoreOf(lhr, "accessibility"),
      bestPractices: scoreOf(lhr, "best-practices"),
      seo: scoreOf(lhr, "seo"),
    },
    metrics: {
      firstContentfulPaint: audits["first-contentful-paint"]?.displayValue,
      largestContentfulPaint: audits["largest-contentful-paint"]?.displayValue,
      totalBlockingTime: audits["total-blocking-time"]?.displayValue,
      cumulativeLayoutShift: audits["cumulative-layout-shift"]?.displayValue,
      speedIndex: audits["speed-index"]?.displayValue,
    },
    opportunities: Object.values(audits)
      .filter((a) => a.score !== null && a.score < 0.9 && a.details?.type === "opportunity")
      .map((a) => ({ id: a.id, title: a.title, displayValue: a.displayValue })),
  };
}

async function main() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new"] });
  const results = [];

  try {
    for (const page of IMPORTANT_PAGES) {
      process.stdout.write(`Lighthouse: ${page.path} ... `);
      try {
        const result = await auditPage(chrome, page);
        results.push(result);
        console.log(
          `perf ${result.scores.performance} / a11y ${result.scores.accessibility} / best-practices ${result.scores.bestPractices} / seo ${result.scores.seo}`
        );
      } catch (err) {
        console.log(`FAILED (${err.message})`);
        results.push({ path: page.path, label: page.label, error: err.message });
      }
    }
  } finally {
    await chrome.kill();
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, "lighthouse-results.json"),
    JSON.stringify({ pages: results, coverageNote: SKIPPED_ROUTES_NOTE }, null, 2)
  );

  const failed = results.filter((r) => r.error || (r.scores?.performance ?? 100) < 50);
  console.log(`\nLighthouse complete. ${results.length} pages audited, ${failed.length} flagged.`);
  console.log(`Results written to qa/reports/performance/lighthouse-results.json`);
}

main().catch((err) => {
  console.error("Lighthouse run failed:", err);
  process.exit(1);
});
