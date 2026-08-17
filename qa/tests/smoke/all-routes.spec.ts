import { test, expect } from "@playwright/test";
import { ALL_ROUTES } from "../../utils/routes";
import {
  attachDiagnostics,
  filterIgnorableConsoleErrors,
  hasHorizontalOverflow,
  findBrokenImages,
  screenshotWithRetry,
  slugForFilename,
} from "../../utils/page-helpers";

// Phase 4 — every discovered route gets the full smoke checklist. A 200
// response is treated as necessary, not sufficient: title, console health,
// network health, broken images/links, and overflow all have to pass too.
for (const route of ALL_ROUTES) {
  test(`smoke: ${route.path} — ${route.label}`, async ({ page }) => {
    const diagnostics = attachDiagnostics(page);

    const response = await page.goto(route.path, { waitUntil: "networkidle" });
    expect(response, `No response received for ${route.path}`).not.toBeNull();
    expect(
      response!.status(),
      `Expected 2xx/3xx for ${route.path}, got ${response!.status()}`
    ).toBeLessThan(400);

    // Page actually rendered something, not a blank shell.
    const title = await page.title();
    expect(title.trim().length, `Empty <title> on ${route.path}`).toBeGreaterThan(0);
    expect(title, `Generic/error-looking title on ${route.path}`).not.toMatch(
      /^(error|404|not found)$/i
    );

    const bodyText = await page.locator("body").innerText();
    expect(
      bodyText.trim().length,
      `Body appears empty/blank on ${route.path}`
    ).toBeGreaterThan(20);

    const h1Count = await page.locator("h1").count();
    expect(h1Count, `No <h1> found on ${route.path}`).toBeGreaterThan(0);

    const overflow = await hasHorizontalOverflow(page);
    expect(
      overflow.overflowing,
      `Horizontal overflow on ${route.path}: document ${overflow.documentWidth}px > viewport ${overflow.viewportWidth}px`
    ).toBe(false);

    const brokenImages = await findBrokenImages(page);
    expect(brokenImages, `Broken <img> elements on ${route.path}: ${brokenImages.join(", ")}`).toEqual([]);

    const { real: realConsoleErrors } = filterIgnorableConsoleErrors(diagnostics.consoleErrors);
    expect(
      realConsoleErrors,
      `Console errors on ${route.path}: ${realConsoleErrors.map((e) => e.text).join(" | ")}`
    ).toEqual([]);

    expect(
      diagnostics.pageErrors,
      `Uncaught page errors on ${route.path}: ${diagnostics.pageErrors.join(" | ")}`
    ).toEqual([]);

    expect(
      diagnostics.networkFailures,
      `Same-origin network failures on ${route.path}: ${diagnostics.networkFailures
        .map((f) => `${f.method} ${f.url} -> ${f.status}`)
        .join(" | ")}`
    ).toEqual([]);

    await screenshotWithRetry(page, {
      path: `qa/screenshots/smoke/${slugForFilename(route.path)}.png`,
      fullPage: true,
    });

    // Broken-internal-link checking deliberately does NOT happen here — see
    // qa/tests/smoke/broken-links.spec.ts. Checking every link on every one
    // of ~40 pages meant re-checking the same global nav/footer links up to
    // ~40x redundantly (up to ~1600 sequential requests total against a
    // single-process dev server), which timed out under contention and
    // produced false failures on the very pages with the most links (Home,
    // About, Services, Projects) — a QA test-infrastructure bug, not a real
    // broken link. Fixed by deduping to one check per unique URL, run once.
  });
}
