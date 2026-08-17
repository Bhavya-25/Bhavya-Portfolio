"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { heroHighlights } from "@/data/hero-highlights";
import { ServiceIcon } from "@/components/contact/service-icon";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

// Desktop-only absolute positions, flanking the profile visual at staggered
// depths. Kept modest (well inside the hero's own bounds) — a wide scatter
// here caused real horizontal overflow on an earlier pass of this page's
// Tools Wall section (see tools-wall.tsx), so these positions are fixed
// percentages of the hero, not randomized offsets that could push a card
// past the viewport edge before it's ever animated.
const DESKTOP_LAYOUT: Record<string, { top: string; left?: string; right?: string; z: number; scale: number }> = {
  years: { top: "12%", left: "6%", z: 20, scale: 1 },
  projects: { top: "68%", left: "2%", z: 10, scale: 0.92 },
  clients: { top: "8%", right: "4%", z: 10, scale: 0.92 },
  rated: { top: "70%", right: "7%", z: 20, scale: 1 },
  fullstack: { top: "38%", left: "-2%", z: 15, scale: 0.85 },
  design: { top: "42%", right: "-2%", z: 15, scale: 0.85 },
};

// Generated once at module load, not during render — same convention as
// hero-scene.tsx's NODE_POSITIONS. Small, so cards drift without ever
// risking overflow.
const FLOAT_SEEDS = heroHighlights.map(() => ({
  duration: 3 + Math.random() * 2,
  delay: Math.random() * 1.5,
  rotate: (Math.random() - 0.5) * 4,
}));

function HighlightCard({ highlight }: { highlight: (typeof heroHighlights)[number] }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      {highlight.kind === "skill" && highlight.icon ? (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/80">
          <span className="h-4 w-4">
            <ServiceIcon kind={highlight.icon} />
          </span>
        </span>
      ) : (
        <span className="shrink-0 font-display text-lg font-medium tracking-tight text-white">
          {highlight.value}
        </span>
      )}
      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-white/60">
        {highlight.label}
      </span>
    </div>
  );
}

export function HeroFloatingCards() {
  const root = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.utils.toArray<HTMLElement>(".hero-highlight-card", root.current).forEach((card, i) => {
        const seed = FLOAT_SEEDS[i];
        gsap.to(card, {
          y: -12,
          rotate: seed.rotate,
          duration: seed.duration,
          delay: seed.delay,
          ease: EASE.inOut,
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: root, dependencies: [prefersReducedMotion] }
  );

  // Pointer-proximity reaction — subtler than the Magnetic component's full
  // pull, just a small nudge + glow when the cursor passes near a card.
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cards = gsap.utils.toArray<HTMLElement>(".hero-highlight-card", el);
    const nudges = cards.map((card) => ({
      x: gsap.quickTo(card, "x", { duration: 0.5, ease: "power3.out" }),
      y: gsap.quickTo(card, "y", { duration: 0.5, ease: "power3.out" }),
      scale: gsap.quickTo(card, "scale", { duration: 0.4, ease: "power3.out" }),
    }));

    const handleMove = (event: PointerEvent) => {
      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = event.clientX - cx;
        const dy = event.clientY - cy;
        const dist = Math.hypot(dx, dy);
        const proximity = Math.max(0, 1 - dist / 180);
        nudges[i].x(-dx * 0.06 * proximity);
        nudges[i].y(-dy * 0.06 * proximity);
        nudges[i].scale(1 + proximity * 0.06);
      });
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [prefersReducedMotion]);

  return (
    <div ref={root}>
      {/* Desktop: absolutely positioned, flanking the profile visual */}
      <div aria-hidden="false" className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
        {heroHighlights.map((highlight) => {
          const pos = DESKTOP_LAYOUT[highlight.id];
          if (!pos) return null;
          return (
            <div
              key={highlight.id}
              className="hero-highlight-card pointer-events-auto absolute"
              style={{
                top: pos.top,
                left: pos.left,
                right: pos.right,
                zIndex: pos.z,
                transform: `scale(${pos.scale})`,
              }}
            >
              <HighlightCard highlight={highlight} />
            </div>
          );
        })}
      </div>

      {/* Mobile/tablet: a compact horizontal scroll row instead of absolute
          scatter — "reposition intelligently", not just shrink in place. */}
      <div className="mt-10 flex gap-3 overflow-x-auto px-1 pb-2 lg:hidden">
        {heroHighlights.map((highlight) => (
          <div key={highlight.id} className="shrink-0">
            <HighlightCard highlight={highlight} />
          </div>
        ))}
      </div>
    </div>
  );
}
