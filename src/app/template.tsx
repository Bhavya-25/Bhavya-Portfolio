"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * App Router remounts `template.tsx` on every navigation, which makes it the
 * right place for enter transitions.
 *
 * ── Why this animates `opacity` only, never `x`/`y`/`scale` ──────────────
 *
 * This wrapper is a direct child of `<main>`, which makes it an ancestor of
 * every pinned ScrollTrigger section on the page (Selected Work, What I
 * Build). That used to matter: an earlier version animated `y` here for a
 * subtle rise-in, and it caused a real bug — a white viewport flash while
 * scrolling through those pinned sections. Root cause, confirmed by
 * inspecting live computed styles rather than guessing:
 *
 *   1. GSAP tweens `y` via `transform`, and never removes the property once
 *      the tween settles — even at `y: 0` the element keeps an inline
 *      `transform: translate(0px, 0px)`. That is NOT the same as
 *      `transform: none`; per the CSS spec it still establishes a new
 *      containing block for `position: fixed` descendants.
 *   2. `useGSAP` (used by the pinned sections) runs in a `useLayoutEffect`.
 *      React flushes every layout effect in the tree, parent AND child,
 *      before it flushes any plain `useEffect` — so ProjectStack's and
 *      WhatIBuild's `ScrollTrigger.create()` calls, and their pinType
 *      auto-detection, always run BEFORE this component's `useEffect`.
 *      At that moment there's no transform on this wrapper yet, so
 *      ScrollTrigger correctly saw an untransformed ancestor chain and
 *      locked in `pinType: "fixed"`.
 *   3. This effect then ran and left a permanent `transform` on an
 *      ancestor, invalidating that decision after the fact. `refresh()`
 *      (below) recomputes pin start/end and spacer height, but it does not
 *      re-run pinType detection — so the mismatch persisted for the life
 *      of the page.
 *   4. Result, verified via `getBoundingClientRect()` while scrolled into
 *      Selected Work: the pinned element had `position: fixed; top: 90px`
 *      (correct CSS) but rendered ~2350px above the actual viewport,
 *      because `top` was resolving against this transformed ancestor's box
 *      instead of the viewport. GSAP's scroll-progress math kept updating
 *      normally the whole time — only the visual pin was broken — so the
 *      user scrolled through the reserved pin distance staring at blank
 *      page background.
 *
 * Dropping `y`/`x`/`scale` here isn't a workaround for that one incident;
 * it's the actual constraint: nothing on this wrapper may ever apply a
 * transform, because it unavoidably wraps every pinned section on every
 * page. `opacity` never creates a containing block, so this fix holds
 * regardless of effect ordering, scroll position, or navigation timing —
 * there's no race condition left to reintroduce.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1 });
    } else {
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power4.out" });
    }

    // Let the new layout settle, then re-measure every scroll-driven section.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(raf);
  }, [pathname, prefersReducedMotion]);

  return <div ref={ref}>{children}</div>;
}
