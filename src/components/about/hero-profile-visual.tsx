"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AboutParticlePortraitVisual } from "@/components/three/about-particle-portrait-visual";
import { AiToolIcon, type AiToolIconKind } from "@/components/footer/ai-tool-icon";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

// Fixed angles around the circle, not scattered randomly — these need to
// stay clear of the frame's own bounds at every breakpoint, so unlike the
// floating cards (which do use randomized motion) these positions are
// deliberate, not generated.
const ORBIT_CHIPS: { icon: AiToolIconKind; angleDeg: number; floatDelay: number }[] = [
  { icon: "cursor", angleDeg: -35, floatDelay: 0 },
  { icon: "vercel", angleDeg: 55, floatDelay: 0.6 },
  { icon: "claude", angleDeg: 150, floatDelay: 1.1 },
  { icon: "github", angleDeg: 220, floatDelay: 0.3 },
];

// Math.sin/cos are not guaranteed bit-identical across JS engines (Node's
// V8 on the server vs. the browser's V8 on the client can differ in the
// last few bits — implementation-defined per the ECMAScript spec). Left
// unrounded, that showed up as a real hydration mismatch: the server and
// client rendered very slightly different percentage strings for the same
// fixed angle. Rounding to 2 decimal places is well within visual
// tolerance and makes both renders serialize identically.
function chipPosition(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const radius = 52; // percent of frame radius
  const round = (n: number) => Math.round(n * 100) / 100;
  return {
    left: `${round(50 + radius * Math.cos(rad))}%`,
    top: `${round(50 + radius * Math.sin(rad))}%`,
  };
}

/**
 * The "profile visual" — not a photo. No real headshot exists in this
 * project's assets, and a fabricated placeholder photo would read as fake
 * (this codebase's convention is to be honest about placeholder content,
 * not disguise it). Instead this houses the already-working particle
 * portrait scene inside a glass-morphic circular frame with animated
 * rings, a cursor-tracked 3D tilt, and orbiting tech chips — the same
 * "alive" quality the brief asks for, built from one coherent system
 * instead of a literal image-in-a-frame.
 */
export function HeroProfileVisual() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.utils.toArray<HTMLElement>(".hero-orbit-chip").forEach((chip, i) => {
        gsap.to(chip, {
          y: -10,
          duration: 2.2 + i * 0.3,
          delay: ORBIT_CHIPS[i]?.floatDelay ?? 0,
          ease: EASE.inOut,
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: wrapperRef, dependencies: [prefersReducedMotion] }
  );

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || prefersReducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rotateX = gsap.quickTo(el, "rotateX", { duration: 0.6, ease: "power3.out" });
    const rotateY = gsap.quickTo(el, "rotateY", { duration: 0.6, ease: "power3.out" });

    const handleMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      rotateY(relX * 16);
      rotateX(relY * -16);
    };
    const handleLeave = () => {
      rotateX(0);
      rotateY(0);
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative mx-auto h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] md:h-[420px] md:w-[420px]" style={{ perspective: "1000px" }}>
      {/* Outer rotating dashed ring — reuses the orbit-spin keyframe already
          built for Home's BrandOrbit medallion. The only other place on the
          site using it, so it reads as a shared design-system motif rather
          than a duplicated composition. */}
      <div
        aria-hidden="true"
        className="orbit-spin absolute -inset-6 rounded-full border border-dashed border-white/15 md:-inset-8"
      />
      {/* Inner static ring */}
      <div aria-hidden="true" className="absolute -inset-2 rounded-full border border-white/10" />

      <div
        ref={wrapperRef}
        data-cursor="View"
        className="relative h-full w-full rounded-full border border-white/10 bg-white/5 backdrop-blur-xl [transform-style:preserve-3d]"
      >
        <div className="absolute inset-3 overflow-hidden rounded-full text-white/60">
          <AboutParticlePortraitVisual />
        </div>
      </div>

      {ORBIT_CHIPS.map((chip) => (
        <div
          key={chip.icon}
          aria-hidden="true"
          className="hero-orbit-chip absolute -translate-x-1/2 -translate-y-1/2"
          style={chipPosition(chip.angleDeg)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/70 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] backdrop-blur-md">
            <span className="h-4 w-4">
              <AiToolIcon kind={chip.icon} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
