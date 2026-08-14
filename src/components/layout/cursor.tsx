"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useIsTouchDevice, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Global custom cursor. Any element can opt in with `data-cursor="view"` (or
 * any label) to swap the dot for a labeled pill while hovered — see the
 * Selected Work project rows for the primary use case.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();
  const disabled = isTouch || prefersReducedMotion;

  useEffect(() => {
    document.documentElement.classList.toggle("custom-cursor", !disabled);
    if (disabled) return;

    const dot = dotRef.current;
    if (!dot) return;

    const xTo = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3.out" });

    const handleMove = (event: PointerEvent) => {
      xTo(event.clientX);
      yTo(event.clientY);
    };

    const handleOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      setLabel(target?.dataset.cursor ?? null);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerover", handleOver);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2"
    >
      <div
        className="flex items-center justify-center rounded-full border border-ink/10 bg-ink text-[11px] font-mono uppercase tracking-[0.08em] text-surface transition-[width,height,opacity] duration-300 ease-out"
        style={
          label
            ? { width: 72, height: 72, opacity: 1 }
            : { width: 8, height: 8, opacity: 0.85 }
        }
      >
        <span
          className="transition-opacity duration-200"
          style={{ opacity: label ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
