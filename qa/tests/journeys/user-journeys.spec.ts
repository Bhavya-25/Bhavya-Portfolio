import { test, expect } from "@playwright/test";
import { attachDiagnostics, filterIgnorableConsoleErrors } from "../../utils/page-helpers";

// Phase 15 — realistic multi-step flows through the actual site, not
// isolated component checks. Each journey mirrors how the app itself is
// structured to be used (see mainNavigation, the mega menus, and the CTA
// chain the portfolio/service pages are built around).
//
// Header interactions are deliberately scoped to `header` throughout: the
// footer repeats the same nav labels ("Home", "Projects", "Services", ...)
// in its own link list, so an unscoped role/name query can match either —
// scoping to header is what makes these journeys reliably test the actual
// primary-nav interaction instead of occasionally hitting a footer link.

test.describe("Journey: discover a service, then start a project", () => {
  test("Home -> Services mega menu -> service detail -> Contact CTA -> form visible", async ({
    page,
  }) => {
    const diagnostics = attachDiagnostics(page);
    const header = page.locator("header");

    await page.goto("/");
    await header.getByRole("link", { name: "Services", exact: true }).hover();
    const serviceLink = header.getByRole("link", { name: /Next\.js Development/i });
    await expect(serviceLink).toBeVisible({ timeout: 3000 });
    await serviceLink.click();
    await expect(page).toHaveURL(/\/services\/nextjs-development/);

    // Service detail page should have a path back to Contact.
    const contactCta = page.getByRole("link", { name: /contact|start a project|let's talk/i }).first();
    await contactCta.scrollIntoViewIfNeeded();
    await contactCta.click();
    await expect(page).toHaveURL(/\/contact/);

    await expect(page.getByLabel("Name *")).toBeVisible();

    const { real } = filterIgnorableConsoleErrors(diagnostics.consoleErrors);
    expect(real, `Console errors during journey: ${real.map((e) => e.text).join(" | ")}`).toEqual([]);
  });
});

test.describe("Journey: browse work, open a case study, reach contact", () => {
  test("Home -> Projects -> filter -> case study -> Next Project -> Contact", async ({ page }) => {
    const header = page.locator("header");
    await page.goto("/");
    await header.getByRole("link", { name: "Projects", exact: true }).click();
    await expect(page).toHaveURL(/\/projects$/);

    const archive = page.locator('[data-progress="Full Archive"]');
    await archive.scrollIntoViewIfNeeded();
    await archive.getByRole("button", { name: "Mobile", exact: true }).click();
    await page.waitForTimeout(300);

    const caseStudyLink = archive.getByRole("link", { name: /View Case Study/i }).first();
    await expect(caseStudyLink).toBeVisible();
    await caseStudyLink.click();
    await expect(page).toHaveURL(/\/projects\/.+/);

    const nextProject = page.getByRole("link", { name: /View Project/i }).last();
    await nextProject.scrollIntoViewIfNeeded();
    await expect(nextProject).toBeVisible();

    await page.goto("/contact");
    await expect(page.getByRole("heading", { name: /tell me about your project/i })).toBeVisible();
  });
});

test.describe("Journey: read the FAQ, then commit via the final CTA", () => {
  test("Home -> FAQ -> expand a question -> final CTA -> contact form reachable", async ({
    page,
  }) => {
    await page.goto("/");
    // The FAQ section has no #faq id in the DOM (only the nav's in-page
    // anchor link target would need one, and none exists) — scroll to it
    // via its own visible heading text instead of a nonexistent selector.
    await page.getByText("Frequently Asked Questions").scrollIntoViewIfNeeded();

    const question = page.getByText("Will I work directly with you?").first();
    await question.click();
    await page.waitForTimeout(300);
    await expect(page.getByText(/talking to the person who actually designs/i)).toBeVisible();

    const finalCta = page.locator("#contact");
    await finalCta.scrollIntoViewIfNeeded();
    await expect(finalCta).toBeVisible();
    await expect(finalCta.getByRole("button", { name: /send|start your project/i })).toBeVisible();
  });
});

test.describe("Journey: resources hub to a resource detail page", () => {
  test("Home -> Resources mega menu -> resource detail renders real content", async ({ page }) => {
    const header = page.locator("header");
    await page.goto("/");
    await header.getByRole("link", { name: "Resources", exact: true }).hover();
    const link = header.getByRole("link", { name: /Design Process/i });
    await expect(link).toBeVisible({ timeout: 3000 });
    await link.click();
    await expect(page).toHaveURL(/\/resources\/design-process/);
    await expect(page.locator("h1")).toBeVisible();
  });
});
