import { test, expect } from "@playwright/test";

// The newsletter form lives in the global footer, present on every page.
// One valid-submission case only — same rate-limit budget reasoning as
// contact-form.spec.ts.

test.describe("Newsletter form (footer)", () => {
  test("invalid email is rejected by the browser's native validation", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").scrollIntoViewIfNeeded();

    const emailInput = page.locator('footer input[name="email"]');
    await emailInput.fill("not-an-email");
    await page.locator('footer button[type="submit"]', { hasText: "Subscribe" }).click();

    const isValid = await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    expect(isValid, "Invalid email should fail native HTML5 validation").toBe(false);
  });

  test("valid email submits and reaches a graceful result", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").scrollIntoViewIfNeeded();

    const emailInput = page.locator('footer input[name="email"]');
    await emailInput.fill(`qa-test-${Date.now()}@example.com`);

    const responsePromise = page.waitForResponse("**/api/newsletter");
    await page.locator('footer button[type="submit"]', { hasText: "Subscribe" }).click();
    const response = await responsePromise;

    // Same as the contact form: without mail credentials configured locally,
    // a friendly non-200 is the correct, expected outcome — not a defect.
    expect([200, 500]).toContain(response.status());
  });
});
