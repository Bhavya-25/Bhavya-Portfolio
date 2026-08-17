import { test, expect } from "@playwright/test";
import { KEY_ROUTES } from "../../utils/routes";
import { slugForFilename } from "../../utils/page-helpers";

// Phase 13 — visual regression. First run on a fresh checkout creates the
// baseline snapshots (no prior image to diff against) and passes; every run
// after that compares against them and fails on real pixel drift. Baselines
// live in qa/tests/visual/baselines.spec.ts-snapshots/ — commit that folder
// once you're happy with a baseline, and re-run with `--update-snapshots`
// deliberately whenever a real, intended visual change ships.
//
// maxDiffPixelRatio gives GSAP/animation timing and anti-aliasing a small,
// deliberate tolerance instead of failing on noise, per Phase 13's own
// instruction not to treat anti-aliasing as a bug.
for (const route of KEY_ROUTES) {
  test(`visual: ${route.path} — ${route.label}`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: "networkidle" });
    // Let entrance animations (GSAP fade/reveal) settle before capturing —
    // otherwise every run diffs against whatever mid-animation frame the
    // previous run happened to catch, which is noise, not a regression.
    await page.waitForTimeout(1200);

    await expect(page).toHaveScreenshot(`${slugForFilename(route.path)}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
      animations: "disabled",
    });
  });
}
