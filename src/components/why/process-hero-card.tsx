"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CollaborationVisual } from "./collaboration-visual";
import { Button } from "@/components/ui/button";
import { useIsTouchDevice, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function ProcessHeroCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;
    const card = cardRef.current;
    const visual = visualRef.current;
    if (!card || !visual) return;

    const xTo = gsap.quickTo(visual, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(visual, "y", { duration: 0.7, ease: "power3.out" });

    const handleMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      xTo(relX * 16);
      yTo(relY * 16);
    };
    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    card.addEventListener("pointermove", handleMove);
    card.addEventListener("pointerleave", handleLeave);
    return () => {
      card.removeEventListener("pointermove", handleMove);
      card.removeEventListener("pointerleave", handleLeave);
    };
  }, [isTouch, prefersReducedMotion]);

  return (
    <div
      ref={cardRef}
      className="process-hero-card relative h-[420px] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-surface-raised via-surface to-surface-raised md:h-[480px]"
    >
      <div ref={visualRef} className="absolute inset-0 flex items-center justify-center p-10 opacity-90 md:p-16">
        <CollaborationVisual />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-8 md:flex-row md:items-end md:justify-between md:p-12">
        <div>
          <p className="font-display text-3xl font-medium tracking-tight text-white md:text-5xl">
            Ready to build your next product?
          </p>
          <p className="mt-4 max-w-md text-sm text-white/70 md:text-base">
            From the first sketch to the deployed build — let&apos;s talk about
            what you&apos;re building and how it comes together.
          </p>
        </div>

        <Button href="#contact" variant="inverse">
          Start Your Project
        </Button>
      </div>
    </div>
  );
}
