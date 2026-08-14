"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Pointer-follow "magnetic" pull for CTAs. The element eases toward the
 * cursor within `strength` px while hovered, then springs back on leave.
 * No-ops under reduced motion or touch (pointer:coarse) so it never fights
 * tap targets on mobile.
 */
export function useMagnetic<T extends HTMLElement>(strength = 18) {
  const ref = useRef<T>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const handleMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      xTo((relX / rect.width) * strength);
      yTo((relY / rect.height) * strength);
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [prefersReducedMotion, strength]);

  return ref;
}
