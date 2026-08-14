"use client";

import { useEffect } from "react";

/**
 * Handles same-page hash-anchor navigation (`href="#id"`) with a single,
 * self-contained `scrollIntoView({ behavior: "smooth" })` call per click —
 * instead of the CSS `scroll-behavior: smooth` property.
 *
 * That CSS property is documented by GSAP as incompatible with
 * ScrollTrigger: the browser's native smooth-scroll animation and
 * ScrollTrigger's per-frame scroll-position reads both try to drive the
 * scroll position, and they fight. Confirmed directly while debugging the
 * pinned-section white-screen bug: `window.scrollTo(0, 8956)` landed the
 * page at `scrollY 17548` — the in-flight native smooth-scroll (plus
 * ScrollTrigger's own snap-driven scroll adjustment) overrode the explicit
 * target. A blanket CSS property intercepts every scroll-position change on
 * the page, including ScrollTrigger's internal ones; a single explicit JS
 * call does not.
 *
 * `scroll-margin-top` (the `scroll-mt-24` utility already on every section)
 * is respected natively by `scrollIntoView`, so the fixed header offset
 * still applies with no extra math here.
 */
export function SmoothAnchorScroll() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;

      const anchor = (event.target as HTMLElement)?.closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return; // no matching id on this page — let the browser no-op as before

      event.preventDefault();
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      history.pushState(null, "", hash);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
