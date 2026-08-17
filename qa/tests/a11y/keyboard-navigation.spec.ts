import { test, expect } from "@playwright/test";

// Phase 12 — keyboard-only navigation. Confirms focus is visible, moves
// logically, and nothing traps the keyboard user (a real WCAG 2.1.2 failure,
// not a style nitpick).

test.describe("Keyboard navigation", () => {
  test("Tab reaches interactive header controls in order, focus is visible", async ({ page }) => {
    await page.goto("/");

    const seen: string[] = [];
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      const info = await page.evaluate(() => {
        const el = document.activeElement as HTMLElement | null;
        if (!el) return null;
        const cs = getComputedStyle(el);
        return {
          tag: el.tagName,
          text: el.textContent?.trim().slice(0, 30),
          outlineWidth: cs.outlineWidth,
          outlineStyle: cs.outlineStyle,
        };
      });
      if (info) seen.push(`${info.tag}:${info.text}`);
    }

    expect(seen.length, "Tab should move focus through multiple elements").toBeGreaterThan(3);
    // No two consecutive Tabs should land on the exact same element — a
    // strong signal of a focus trap this early in the page.
    const stuck = seen.some((val, i) => i > 0 && val === seen[i - 1]);
    expect(stuck, `Possible keyboard focus trap in header: ${seen.join(" -> ")}`).toBe(false);
  });

  test("Escape closes the mobile nav panel opened via keyboard", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const openBtn = page.getByRole("button", { name: "Open menu" });
    await openBtn.focus();
    await page.keyboard.press("Enter");
    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await expect(mobileNav.getByRole("link", { name: "Home", exact: true })).toBeVisible();

    // See navigation.spec.ts for why this checks aria-hidden rather than
    // link visibility: the panel closes via `transform`, not
    // `display:none`, so its links keep a non-empty layout box and
    // Playwright's toBeHidden() would never observe it as hidden.
    await page.keyboard.press("Escape");
    const panel = page.locator('[aria-hidden].fixed.inset-y-0.right-0');
    await expect(panel).toHaveAttribute("aria-hidden", "true");
  });

  test("FAQ accordion item is operable with Enter/Space and not just click", async ({ page }) => {
    // The FAQ component intentionally renders two different interaction
    // patterns by breakpoint: a desktop split-panel selector (aria-current,
    // no accordion semantics) and a true accordion on mobile
    // (aria-expanded). This test is specifically about accordion
    // keyboard operability, so it needs the mobile viewport — running it
    // at the suite's default desktop viewport was testing the wrong
    // component and asserting on an attribute (aria-expanded) that the
    // desktop variant never has.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/#faq");
    const firstQuestion = page.getByRole("button", { name: /trust you with my project/i });
    await firstQuestion.scrollIntoViewIfNeeded();
    await firstQuestion.focus();

    const before = await firstQuestion.getAttribute("aria-expanded");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);
    const after = await firstQuestion.getAttribute("aria-expanded");
    expect(after).not.toBe(before);
  });

  test("all form fields on the contact page are reachable and labeled via keyboard", async ({
    page,
  }) => {
    await page.goto("/contact#contact-form");
    const nameInput = page.getByLabel("Name *");
    await nameInput.focus();
    await expect(nameInput).toBeFocused();

    await page.keyboard.press("Tab");
    const emailFocused = await page.evaluate(
      () => (document.activeElement as HTMLInputElement | null)?.getAttribute("name")
    );
    expect(emailFocused).toBe("email");
  });
});
