"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { HeroVisual } from "@/components/three/hero-visual";
import { Button } from "@/components/ui/button";
import { EASE } from "@/lib/motion";

const HEADLINE_LINES = ["Digital products,", "designed and engineered."];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.15 });

      tl.from(".hero-eyebrow", {
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: EASE.out,
      })
        .from(
          ".hero-line-inner",
          {
            yPercent: 110,
            duration: 0.9,
            ease: EASE.out,
            stagger: 0.1,
          },
          "-=0.25"
        )
        .from(
          ".hero-sub",
          { opacity: 0, y: 16, duration: 0.6, ease: EASE.out },
          "-=0.5"
        )
        .from(
          ".hero-cta",
          { opacity: 0, y: 12, duration: 0.5, ease: EASE.out, stagger: 0.08 },
          "-=0.4"
        )
        .from(
          ".hero-visual",
          { opacity: 0, scale: 0.96, duration: 1.1, ease: EASE.out },
          "-=0.9"
        )
        .from(
          ".hero-scroll-indicator",
          { opacity: 0, duration: 0.5, ease: EASE.out },
          "-=0.2"
        );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-progress="Hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      <div className="hero-visual absolute inset-y-0 right-0 w-full opacity-90 md:w-3/5">
        <HeroVisual />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-transparent md:via-surface/60" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10">
        <p className="hero-eyebrow font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          Full-Stack Developer · Creative Technologist
        </p>

        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,7.5vw,6.5rem)] font-medium leading-[0.98] tracking-tight text-ink">
          {HEADLINE_LINES.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span className="hero-line-inner block">{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero-sub mt-8 max-w-lg text-balance text-base text-ink-muted md:text-lg">
          I take ideas from concept to launch — interface, motion, and code
          treated as one discipline. Four years building full-stack products,
          mobile apps, and interactive experiences for founders and teams.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="#work" dataCursor="View" className="hero-cta">
            Selected Work
          </Button>
          <Button href="#contact" variant="secondary" className="hero-cta">
            Let&apos;s Talk
          </Button>
        </div>
      </div>

      <div className="hero-scroll-indicator absolute bottom-10 left-1/2 z-10 -translate-x-1/2 md:left-10 md:translate-x-0">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-faint">
          <span className="block h-8 w-px bg-gradient-to-b from-transparent via-ink-faint to-transparent" />
          Scroll
        </div>
      </div>
    </section>
  );
}
