"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { philosophyCards } from "@/data/philosophy-cards";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * An asymmetric bento grid, not the uniform 3-column grid the old
 * skills-section.tsx used. Each card reveals on its own ScrollTrigger (a
 * clip-path wipe, staggered only by scroll position — not a shared
 * timeline), and independently tilts in 3D toward the cursor. Distinct hover
 * mechanism from every other card treatment on this page (tech showcase =
 * cursor-follow glow, tools wall = scatter-to-grid spring, client deck =
 * stacked fan) — this one is the only cursor-tracked tilt.
 */
export function PhilosophyCards() {
  const root = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".philosophy-card", root.current).forEach((card) => {
        gsap.from(card, {
          clipPath: "inset(0 0 100% 0)",
          opacity: 0,
          duration: 0.7,
          ease: EASE.out,
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    },
    { scope: root }
  );

  useEffect(() => {
    const container = root.current;
    if (!container || prefersReducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cards = gsap.utils.toArray<HTMLElement>(".philosophy-card", container);
    const tilts = cards.map((card) => ({
      rotateX: gsap.quickTo(card, "rotateX", { duration: 0.5, ease: "power3.out" }),
      rotateY: gsap.quickTo(card, "rotateY", { duration: 0.5, ease: "power3.out" }),
    }));

    const handlers = cards.map((card, i) => {
      const handleMove = (event: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        const relX = (event.clientX - rect.left) / rect.width - 0.5;
        const relY = (event.clientY - rect.top) / rect.height - 0.5;
        tilts[i].rotateY(relX * 14);
        tilts[i].rotateX(relY * -14);
      };
      const handleLeave = () => {
        tilts[i].rotateX(0);
        tilts[i].rotateY(0);
      };
      card.addEventListener("pointermove", handleMove);
      card.addEventListener("pointerleave", handleLeave);
      return { card, handleMove, handleLeave };
    });

    return () => {
      handlers.forEach(({ card, handleMove, handleLeave }) => {
        card.removeEventListener("pointermove", handleMove);
        card.removeEventListener("pointerleave", handleLeave);
      });
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={root}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      style={{ perspective: "1200px" }}
    >
      {philosophyCards.map((card, i) => (
        <div
          key={card.id}
          className={`philosophy-card rounded-[1.75rem] border border-border bg-surface-raised p-8 transition-[border-color,box-shadow] duration-300 ease-out hover:border-accent/30 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.25)] ${
            card.size === "wide" ? "sm:col-span-2 lg:col-span-2" : ""
          }`}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
            {card.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted md:text-base">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  );
}
