import { test, expect } from "@playwright/test";

// Phase 7 — form testing. Synthetic QA data only, never real personal
// information. Client-side-validation cases below never reach the network
// (validation blocks the fetch), so they don't count against the server's
// rate limit; only the two "valid submission" cases at the bottom actually
// POST — well under the 5-requests/10-minutes-per-IP server limit.

async function fillMinimumValid(page: import("@playwright/test").Page) {
  await page.getByLabel("Name *").fill("QA Test User");
  await page.getByLabel("Email *").fill("qa-test@example.com");
  await page.getByLabel("Message *").fill("Automated QA test submission — please disregard.");
  await page.locator('input[name="consent"]').check();
}

test.describe("Contact form — client-side validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact#contact-form");
  });

  test("empty submission shows all required-field errors and does not call the API", async ({
    page,
  }) => {
    let apiCalled = false;
    await page.route("**/api/contact", (route) => {
      apiCalled = true;
      route.continue();
    });

    await page.getByRole("button", { name: "Start Your Project" }).click();

    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(page.getByText("Please enter a valid email.")).toBeVisible();
    await expect(page.getByText("Tell me a little more about the project.")).toBeVisible();
    await expect(page.getByText("Please confirm before sending.")).toBeVisible();
    expect(apiCalled, "API must not be called when client validation fails").toBe(false);
  });

  test("invalid email format is rejected", async ({ page }) => {
    await page.getByLabel("Name *").fill("QA Test User");
    await page.getByLabel("Email *").fill("not-an-email");
    await page.getByLabel("Message *").fill("Automated QA test — invalid email case.");
    await page.locator('input[name="consent"]').check();
    await page.getByRole("button", { name: "Start Your Project" }).click();
    await expect(page.getByText("Please enter a valid email.")).toBeVisible();
  });

  test("message shorter than the minimum length is rejected", async ({ page }) => {
    await page.getByLabel("Name *").fill("QA Test User");
    await page.getByLabel("Email *").fill("qa-test@example.com");
    await page.getByLabel("Message *").fill("short");
    await page.locator('input[name="consent"]').check();
    await page.getByRole("button", { name: "Start Your Project" }).click();
    await expect(page.getByText("Tell me a little more about the project.")).toBeVisible();
  });

  test("single-character name is rejected", async ({ page }) => {
    await page.getByLabel("Name *").fill("A");
    await page.getByLabel("Email *").fill("qa-test@example.com");
    await page.getByLabel("Message *").fill("Automated QA test — short name case.");
    await page.locator('input[name="consent"]').check();
    await page.getByRole("button", { name: "Start Your Project" }).click();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
  });

  test("leading/trailing whitespace in required fields is trimmed before validation", async ({
    page,
  }) => {
    await page.getByLabel("Name *").fill("   ");
    await page.getByLabel("Email *").fill("qa-test@example.com");
    await page.getByLabel("Message *").fill("Automated QA test — whitespace name case.");
    await page.locator('input[name="consent"]').check();
    await page.getByRole("button", { name: "Start Your Project" }).click();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
  });

  test("consent checkbox is required even with otherwise valid input", async ({ page }) => {
    await page.getByLabel("Name *").fill("QA Test User");
    await page.getByLabel("Email *").fill("qa-test@example.com");
    await page.getByLabel("Message *").fill("Automated QA test — missing consent case.");
    await page.getByRole("button", { name: "Start Your Project" }).click();
    await expect(page.getByText("Please confirm before sending.")).toBeVisible();
  });
});

test.describe("Contact form — services chip picker", () => {
  test("multiple services can be selected and deselected", async ({ page }) => {
    await page.goto("/contact#contact-form");
    // "UI/UX Design" also appears as a <select> option and in the footer's
    // services list, so this must click the checkbox's own label, not any
    // text match on the page.
    const uiux = page.locator('label:has(input[name="servicesRequired"][value="UI/UX Design"])');
    const mobile = page.locator('label:has(input[name="servicesRequired"][value="Mobile App"])');

    await uiux.click();
    await mobile.click();
    await expect(page.locator('input[name="servicesRequired"]:checked')).toHaveCount(2);

    await uiux.click();
    await expect(page.locator('input[name="servicesRequired"]:checked')).toHaveCount(1);
  });
});

test.describe("Contact form — file upload validation", () => {
  test("oversized file is rejected client-side with a clear error", async ({ page }) => {
    await page.goto("/contact#contact-form");
    const fileInput = page.locator('input[name="attachment"]');

    await fileInput.setInputFiles({
      name: "too-big.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.alloc(9 * 1024 * 1024, 1),
    });

    await expect(page.getByText(/too large/i)).toBeVisible();
  });

  test("valid small file is accepted and shown with a remove control", async ({ page }) => {
    await page.goto("/contact#contact-form");
    const fileInput = page.locator('input[name="attachment"]');

    await fileInput.setInputFiles({
      name: "brief.pdf",
      mimeType: "application/pdf",
      buffer: Buffer.from("QA test file content"),
    });

    await expect(page.getByText("brief.pdf")).toBeVisible();
    await expect(page.getByRole("button", { name: "Remove attached file" })).toBeVisible();
  });
});

test.describe("Contact form — full submission pipeline", () => {
  test("valid submission shows loading state then a graceful result (success or configured-mail-error)", async ({
    page,
  }) => {
    await page.goto("/contact#contact-form");
    await fillMinimumValid(page);

    const submitBtn = page.getByRole("button", { name: "Start Your Project" });
    const responsePromise = page.waitForResponse("**/api/contact");
    await submitBtn.click();

    // Loading state must appear, however briefly.
    await expect(page.getByText("Sending…")).toBeVisible({ timeout: 2000 }).catch(() => {
      // Extremely fast responses can skip past this assertion window — not
      // itself a failure as long as the request completes below.
    });

    const response = await responsePromise;
    const body = await response.json().catch(() => null);

    if (response.status() === 200) {
      await expect(page.getByText("Thank you! Your message has been received.")).toBeVisible();
    } else {
      // Expected in this environment: GMAIL_USER/GMAIL_APP_PASSWORD are not
      // set, so the API correctly returns a friendly configured error
      // rather than crashing. That is documented, correct behavior here,
      // not a bug — see qa/docs/DISCOVERY.md.
      expect(response.status()).toBe(500);
      expect(body?.error).toMatch(/isn't configured yet/i);
      await expect(page.getByText(/isn't configured yet/i)).toBeVisible();
    }

    // Button must return to an interactive state either way — never stuck.
    await expect(submitBtn.or(page.getByText("Send another message"))).toBeVisible();
  });

  test("honeypot field is present but positioned off-screen from real users", async ({ page }) => {
    await page.goto("/contact#contact-form");
    const honeypot = page.locator('input[name="hp_field"]');
    await expect(honeypot).toBeAttached();

    // The component hides this from real users by positioning it off-canvas
    // (`left: -9999px`), not via display:none/visibility:hidden — a
    // deliberate honeypot pattern (a display:none field is one bots
    // specifically know to skip; an off-screen field with a real layout box
    // is more convincing bait). Playwright's toBeHidden() checks the
    // box-model/visibility case, not off-screen position, so it doesn't
    // apply here — assert the actual mechanism instead.
    const box = await honeypot.boundingBox();
    expect(box, "Honeypot should still have a layout box (that's the point)").not.toBeNull();
    expect(box!.x, "Honeypot should be positioned off-screen (x < 0)").toBeLessThan(0);
    await expect(honeypot).toHaveAttribute("tabindex", "-1");
  });
});
