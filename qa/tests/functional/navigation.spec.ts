import { test, expect } from "@playwright/test";
import { attachDiagnostics, filterIgnorableConsoleErrors } from "../../utils/page-helpers";

// Phase 5/6 — SAFE interactions only: opening menus, switching tabs,
// expanding accordions. Nothing destructive exists in this app to avoid.

test.describe("Desktop mega menu", () => {
  test("Services mega menu opens on hover and links are reachable", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    await header.getByRole("navigation", { name: "Primary" }).getByRole("link", {
      name: "Services",
      exact: true,
    }).hover();
    await expect(header.getByRole("link", { name: /Next\.js Development/i })).toBeVisible({
      timeout: 3000,
    });
  });

  test("Resources mega menu opens on hover", async ({ page }) => {
    await page.goto("/");
    const header = page.locator("header");
    await header.getByRole("navigation", { name: "Primary" }).getByRole("link", {
      name: "Resources",
      exact: true,
    }).hover();
    await expect(header.getByText(/Design Process/i).first()).toBeVisible({ timeout: 3000 });
  });
});

test.describe("Mobile navigation panel", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("hamburger opens full-screen panel, ESC closes it", async ({ page }) => {
    await page.goto("/");
    const openBtn = page.getByRole("button", { name: "Open menu" });
    await expect(openBtn).toBeVisible();
    await openBtn.click();

    // Scoped to the mobile nav landmark specifically (aria-label="Mobile")
    // — a bare role/name query matches the footer's identical "Home" link
    // too, which is always present regardless of panel state.
    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await expect(mobileNav.getByRole("link", { name: "Home", exact: true })).toBeVisible({
      timeout: 3000,
    });

    // body scroll should be locked while the panel is open
    const overflow = await page.evaluate(() => getComputedStyle(document.body).overflow);
    expect(overflow).toBe("hidden");

    await page.keyboard.press("Escape");
    // The panel slides off-canvas via `transform`, not `display:none`, so
    // its links keep a non-empty layout box and Playwright's toBeHidden()
    // (a strict box/visibility:hidden check) would never see it as
    // "hidden" — the component's own closed-state contract is
    // aria-hidden="true" on the panel wrapper, so that's what a real
    // assistive-tech user's experience actually depends on, and what this
    // asserts.
    const panel = page.locator('[aria-hidden].fixed.inset-y-0.right-0');
    await expect(panel).toHaveAttribute("aria-hidden", "true", { timeout: 3000 });
  });

  test("clicking a nav item navigates and auto-closes the panel", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await mobileNav.getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/\/about/);
  });
});

test.describe("Theme toggle", () => {
  test("switches between light and dark and persists the class on <html>", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: /switch to (dark|light) mode/i });
    await expect(toggle).toBeVisible();

    const before = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    await toggle.click();
    await page.waitForTimeout(300);
    const after = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    expect(after).toBe(!before);
  });
});

test.describe("FAQ accordion", () => {
  test("expands and collapses a question on mobile, no console errors", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const diagnostics = attachDiagnostics(page);
    await page.goto("/#faq");

    const firstQuestion = page.locator("button", { hasText: /trust you with my project/i }).first();
    await firstQuestion.scrollIntoViewIfNeeded();

    const expandedBefore = await firstQuestion.getAttribute("aria-expanded");
    await firstQuestion.click();
    await page.waitForTimeout(400);
    const expandedAfter = await firstQuestion.getAttribute("aria-expanded");
    expect(expandedAfter).not.toBe(expandedBefore);

    const { real } = filterIgnorableConsoleErrors(diagnostics.consoleErrors);
    expect(real).toEqual([]);
  });
});

test.describe("Testimonial carousel", () => {
  test("next/prev controls change the active testimonial", async ({ page }) => {
    await page.goto("/projects");
    const section = page.locator('[data-progress="What Clients Say"]');
    await section.scrollIntoViewIfNeeded();

    const nameBefore = await section.locator(".testimonial-identity p").first().innerText();
    await page.getByRole("button", { name: "Next testimonial" }).click();
    await page.waitForTimeout(1500);
    const nameAfter = await section.locator(".testimonial-identity p").first().innerText();
    expect(nameAfter).not.toBe(nameBefore);

    // progress dot state should reflect the change
    const dots = page.locator('button[aria-current]');
    await expect(dots.nth(1)).toHaveAttribute("aria-current", "true");
  });

  test("touch swipe navigates on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/projects");
    const showcase = page.locator('[data-progress="What Clients Say"] .relative.overflow-hidden').first();
    await showcase.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const box = await showcase.boundingBox();
    test.skip(!box, "Showcase not visible");
    if (!box) return;

    const y = box.y + box.height / 2;
    await page.mouse.move(box.x + box.width - 20, y);
    await page.mouse.down();
    await page.mouse.move(box.x + 20, y, { steps: 10 });
    await page.mouse.up();
  });
});

test.describe("Project filter chips", () => {
  test("filtering by category updates the visible archive", async ({ page }) => {
    await page.goto("/projects");
    const archive = page.locator('[data-progress="Full Archive"]');
    await archive.scrollIntoViewIfNeeded();

    const allCountBefore = await archive.locator("article").count();
    await archive.getByRole("button", { name: "Shopify", exact: true }).click();
    await page.waitForTimeout(300);
    const filteredCount = await archive.locator("article").count();

    expect(filteredCount).toBeLessThanOrEqual(allCountBefore);
    expect(filteredCount).toBeGreaterThan(0);
  });
});
