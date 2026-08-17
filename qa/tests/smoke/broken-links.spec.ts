import { test, expect } from "@playwright/test";
import { STATIC_ROUTES, SERVICE_ROUTES, PROJECT_ROUTES, RESOURCE_ROUTES } from "../../utils/routes";
import { collectInternalLinks } from "../../utils/page-helpers";

// Broken-internal-link check, done right: visit one page per route family
// (nav/footer are global, so Home alone surfaces those; one dynamic page per
// family surfaces that family's own internal links, e.g. "next project"),
// union + dedupe every internal href found across them into a single set,
// then check each unique URL exactly once, in parallel. This replaces the
// old per-route check in all-routes.spec.ts, which re-checked the same
// global links up to ~40x redundantly and timed out under server load.
const SAMPLE_PAGES = [
  STATIC_ROUTES[0], // Home — surfaces global nav + footer links
  STATIC_ROUTES[2], // Services index
  STATIC_ROUTES[3], // Projects index
  STATIC_ROUTES[5], // Resources index
  SERVICE_ROUTES[0],
  PROJECT_ROUTES[0],
  RESOURCE_ROUTES[0],
];

test("no broken internal links across the sampled site surface", async ({ page, baseURL }) => {
  const origin = new URL(baseURL ?? "http://localhost:3000").origin;
  const allLinks = new Set<string>();

  for (const route of SAMPLE_PAGES) {
    await page.goto(route.path, { waitUntil: "domcontentloaded" });
    const links = await collectInternalLinks(page, origin);
    links.forEach((l) => allLinks.add(l));
  }

  const uniqueLinks = Array.from(allLinks);
  const results = await Promise.all(
    uniqueLinks.map(async (link) => {
      const res = await page.request.get(`${origin}${link}`).catch((err) => ({ error: err }));
      if ("error" in res) return { link, status: "no response" as const };
      return { link, status: res.status() };
    })
  );

  const broken = results.filter((r) => r.status === "no response" || (r.status as number) >= 400);
  expect(
    broken,
    `Broken internal links (checked ${uniqueLinks.length} unique URLs): ${broken
      .map((b) => `${b.link} -> ${b.status}`)
      .join(", ")}`
  ).toEqual([]);
});
