import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { ALL_ROUTES } from "../../utils/routes";

// Phase 12 — automated accessibility scan on every route. Scoped to
// WCAG 2.0/2.1 A & AA rule sets, which is what axe's default tags cover:
// alt text, labels, heading order, ARIA validity, contrast, landmarks,
// button/link accessible names, and more — all in one pass per page.
for (const route of ALL_ROUTES) {
  test(`a11y: ${route.path} — ${route.label}`, async ({ page }) => {
    await page.goto(route.path, { waitUntil: "networkidle" });

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    if (results.violations.length > 0) {
      const summary = results.violations
        .map(
          (v) =>
            `[${v.impact}] ${v.id} — ${v.help} (${v.nodes.length} node(s)): ${v.nodes
              .slice(0, 3)
              .map((n) => n.target.join(" "))
              .join("; ")}`
        )
        .join("\n");
      expect(results.violations, `axe violations on ${route.path}:\n${summary}`).toEqual([]);
    }
  });
}
