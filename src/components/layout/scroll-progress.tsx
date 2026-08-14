"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Reads every top-level `<section data-progress="Label">` inside `<main>`
 * and reports "NN / total — Label" for whichever is nearest the reading
 * line. Purely observational — sections don't know it exists.
 */
export function ScrollProgress() {
  const [state, setState] = useState({ index: 0, total: 0, label: "" });
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section[data-progress]")
    );
    if (sections.length === 0) return;

    let frame = 0;
    const update = () => {
      const line = window.innerHeight * 0.4;
      let activeIndex = 0;
      sections.forEach((section, i) => {
        if (section.getBoundingClientRect().top <= line) activeIndex = i;
      });
      const active = sections[activeIndex];
      setState({
        index: activeIndex + 1,
        total: sections.length,
        label: active?.dataset.progress ?? "",
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  if (state.total === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-6 right-6 z-40 hidden select-none font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint md:block"
    >
      <span
        className={
          prefersReducedMotion ? "" : "transition-opacity duration-300 ease-out"
        }
      >
        {String(state.index).padStart(2, "0")} / {String(state.total).padStart(2, "0")}
        {state.label ? ` — ${state.label}` : ""}
      </span>
    </div>
  );
}
