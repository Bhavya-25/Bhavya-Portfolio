import type { ConsoleMessage, Page, Request, Response } from "@playwright/test";

export interface CapturedConsoleError {
  type: string;
  text: string;
}

export interface CapturedNetworkFailure {
  method: string;
  url: string;
  status: number;
}

/** Attaches console/network/pageerror listeners and returns live arrays that
 * fill in as the test drives the page — call before navigating. */
export function attachDiagnostics(page: Page) {
  const consoleErrors: CapturedConsoleError[] = [];
  const pageErrors: string[] = [];
  const networkFailures: CapturedNetworkFailure[] = [];
  const failedRequests: { url: string; failure: string }[] = [];

  page.on("console", (msg: ConsoleMessage) => {
    if (msg.type() === "error") {
      consoleErrors.push({ type: msg.type(), text: msg.text() });
    }
  });

  page.on("pageerror", (err: Error) => {
    pageErrors.push(err.message);
  });

  page.on("requestfailed", (request: Request) => {
    failedRequests.push({
      url: request.url(),
      failure: request.failure()?.errorText ?? "unknown",
    });
  });

  page.on("response", (response: Response) => {
    const status = response.status();
    if (status >= 400) {
      const req = response.request();
      // Same-origin only — third-party ad/analytics 404s aren't this app's bug.
      try {
        const url = new URL(response.url());
        const base = new URL(page.url());
        if (url.origin !== base.origin) return;
      } catch {
        // ignore malformed URLs
      }
      networkFailures.push({ method: req.method(), url: response.url(), status });
    }
  });

  return { consoleErrors, pageErrors, networkFailures, failedRequests };
}

/** Known-benign console noise to filter out — documented, not silently dropped. */
const IGNORABLE_CONSOLE_PATTERNS: { pattern: RegExp; reason: string }[] = [
  {
    pattern: /THREE\.Clock.*deprecated/i,
    reason:
      "Originates inside @react-three/fiber's internal store (third-party dependency code), not this app's code — confirmed during earlier scroll-architecture debugging in this project. No fix available without patching node_modules.",
  },
  {
    pattern: /Download the React DevTools/i,
    reason: "React's own dev-mode informational log, not an error condition.",
  },
];

export function filterIgnorableConsoleErrors(errors: CapturedConsoleError[]) {
  const real = errors.filter(
    (e) => !IGNORABLE_CONSOLE_PATTERNS.some((i) => i.pattern.test(e.text))
  );
  const ignored = errors.filter((e) =>
    IGNORABLE_CONSOLE_PATTERNS.some((i) => i.pattern.test(e.text))
  );
  return { real, ignored };
}

/** Detects horizontal overflow — the DOM is wider than the viewport. */
export async function hasHorizontalOverflow(page: Page): Promise<{
  overflowing: boolean;
  documentWidth: number;
  viewportWidth: number;
}> {
  return page.evaluate(() => {
    const documentWidth = document.documentElement.scrollWidth;
    const viewportWidth = document.documentElement.clientWidth;
    return { overflowing: documentWidth > viewportWidth + 1, documentWidth, viewportWidth };
  });
}

/** Every <img> whose natural size is 0 after load — i.e. actually broken. */
export async function findBrokenImages(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const broken: string[] = [];
    document.querySelectorAll("img").forEach((img) => {
      const el = img as HTMLImageElement;
      if (el.complete && el.naturalWidth === 0) {
        broken.push(el.src || el.getAttribute("data-src") || "(no src)");
      }
    });
    return broken;
  });
}

/** Every same-origin internal <a href> on the page, deduped, normalized. */
export async function collectInternalLinks(page: Page, origin: string): Promise<string[]> {
  const hrefs = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a[href]")).map((a) => a.getAttribute("href") ?? "")
  );
  const set = new Set<string>();
  for (const href of hrefs) {
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
      continue;
    }
    try {
      const url = new URL(href, origin);
      if (url.origin !== origin) continue;
      set.add(url.pathname);
    } catch {
      // ignore malformed hrefs
    }
  }
  return Array.from(set);
}

/**
 * page.screenshot() occasionally throws "Protocol error (Page.captureScreenshot):
 * Unable to capture screenshot" under heavy parallel worker load — a
 * Chromium/CDP flake, confirmed non-reproducible when the same test runs in
 * isolation (see QA-REPORT.md). One retry absorbs it without masking a real
 * rendering failure, since a genuinely broken page would fail on retry too.
 */
export async function screenshotWithRetry(
  page: Page,
  options: Parameters<Page["screenshot"]>[0]
): Promise<void> {
  try {
    await page.screenshot(options);
  } catch {
    await page.waitForTimeout(500);
    await page.screenshot(options);
  }
}

export function slugForFilename(path: string): string {
  return path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "_");
}
