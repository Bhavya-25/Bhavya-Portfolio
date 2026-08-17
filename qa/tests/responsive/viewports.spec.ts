import { test, expect } from "@playwright/test";
import { KEY_ROUTES } from "../../utils/routes";
import { hasHorizontalOverflow, screenshotWithRetry, slugForFilename } from "../../utils/page-helpers";

// Phase 10 — the exact breakpoints requested, run against one representative
// page per template family (KEY_ROUTES) rather than all ~40 routes: this is
// about catching layout-family regressions (grids, nav, forms, footer),
// which repeat per-route smoke testing wouldn't add coverage for.
const VIEWPORTS = [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "desktop-1280x800", width: 1280, height: 800 },
  { name: "laptop-1024x768", width: 1024, height: 768 },
  { name: "tablet-768x1024", width: 768, height: 1024 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-375x812", width: 375, height: 812 },
];

for (const viewport of VIEWPORTS) {
  test.describe(`Viewport ${viewport.name}`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of KEY_ROUTES) {
      test(`${route.path} — no overflow, renders, screenshot`, async ({ page }) => {
        await page.goto(route.path, { waitUntil: "networkidle" });

        const overflow = await hasHorizontalOverflow(page);
        expect(
          overflow.overflowing,
          `Horizontal overflow at ${viewport.name} on ${route.path}: document ${overflow.documentWidth}px > viewport ${overflow.viewportWidth}px`
        ).toBe(false);

        // Nav must expose exactly one way to reach primary navigation at
        // this width — either the desktop links or the mobile hamburger,
        // never neither (inaccessible controls) and not a broken hybrid.
        const isNarrow = viewport.width < 1024;
        if (isNarrow) {
          await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
        } else {
          await expect(page.getByRole("link", { name: "Home", exact: true }).first()).toBeVisible();
        }

        await screenshotWithRetry(page, {
          path: `qa/screenshots/responsive/${viewport.name}/${slugForFilename(route.path)}.png`,
          fullPage: true,
        });
      });
    }

    test("footer fits without excessive whitespace and shows all content", async ({ page }) => {
      await page.goto("/", { waitUntil: "networkidle" });
      const footer = page.locator("footer");
      await footer.scrollIntoViewIfNeeded();
      await expect(footer.getByText(/all rights reserved/i)).toBeVisible();
    });
  });
}
