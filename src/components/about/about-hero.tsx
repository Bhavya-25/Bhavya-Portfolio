"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { HeroProfileVisual } from "@/components/about/hero-profile-visual";
import { HeroFloatingCards } from "@/components/about/hero-floating-cards";

gsap.registerPlugin(SplitText);

// A single inline SVG feTurbulence pattern, data-URI encoded — a subtle
// film-grain layer. CSS-only, no runtime cost, so it doesn't work against
// this section's "keep animations lightweight" constraint.
const NOISE_DATA_URI =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>";

/**
 * About's hero — a complete rebuild of the prior version, not an iteration.
 * Multi-layer editorial composition: headline → sub-copy → CTAs → the
 * profile visual (glass-framed particle portrait with orbiting chips) →
 * floating stat cards → scroll indicator, over a background system of an
 * auto-rotating gradient mesh, two independently-drifting blurred orbs, a
 * faint grid, and a film-grain noise layer. Genuinely distinct from the
 * site's other cinematic heroes (Home's node-cluster; /projects and
 * /contact's blob-parallax) via the char-flip headline reveal (kept from
 * the prior build — already proven and already unique) and this new
 * background/visual system.
 */
export function AboutHero() {
  const root = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      // "words,chars" (not "chars" alone) — SplitText wraps each word in its
      // own span first, which keeps the browser's normal word-boundary
      // wrapping intact. Splitting to bare chars without the word grouping
      // lets the browser break a line between any two letters, mid-word.
      const split = new SplitText(".about-hero-title", { type: "words,chars" });

      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(".about-hero-eyebrow", { opacity: 0, y: 12, duration: 0.5, ease: EASE.out })
        .from(
          split.chars,
          {
            opacity: 0,
            rotateX: -90,
            yPercent: 60,
            transformOrigin: "50% 100%",
            duration: 0.7,
            ease: EASE.out,
            stagger: 0.016,
          },
          "-=0.2"
        )
        .from(".about-hero-sub", { opacity: 0, y: 16, duration: 0.6, ease: EASE.out }, "-=0.35")
        .from(
          ".about-hero-cta",
          { opacity: 0, y: 12, duration: 0.5, ease: EASE.out, stagger: 0.08 },
          "-=0.4"
        )
        .from(".about-hero-visual-group", { opacity: 0, scale: 0.92, duration: 0.9, ease: EASE.out }, "-=0.6")
        .from(".about-hero-scroll", { opacity: 0, duration: 0.5, ease: EASE.out }, "-=0.2");

      // Scroll-out transition — the hero itself is a sibling of the pinned
      // Story section below it (never an ancestor), so scrubbing transforms
      // here can't touch that section's pin-safety (see template.tsx / the
      // note in story-scrollytelling.tsx).
      gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      })
        .to(".about-hero-headline-group", { yPercent: -18, opacity: 0.25, ease: "none" }, 0)
        .to(".about-hero-visual-group", { scale: 0.88, opacity: 0.4, ease: "none" }, 0)
        .to(".about-hero-mesh", { opacity: 0.15, ease: "none" }, 0);

      if (!prefersReducedMotion) {
        // Slow, autonomous mesh rotation — not pointer-driven, so this reads
        // as a distinct technique from the other heroes' blob-parallax.
        gsap.to(".about-hero-mesh", { rotate: 360, duration: 48, repeat: -1, ease: "none" });

        gsap.to(".about-hero-scroll-dot", { y: 28, duration: 1.4, repeat: -1, ease: EASE.inOut, yoyo: true });

        // Two orbs drifting independently — a separate layer from the mesh
        // rotation, different rhythm so they don't read as the same motion.
        gsap.to(".about-hero-orb-1", { x: 60, y: -40, duration: 16, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(".about-hero-orb-2", { x: -50, y: 50, duration: 20, repeat: -1, yoyo: true, ease: "sine.inOut" });
      }

      return () => split.revert();
    },
    { scope: root, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={root}
      data-progress="About"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#0b0a09] px-6 pt-32 pb-16 text-white md:px-10"
    >
      {/* Background system: rotating mesh, two drifting orbs, grid, noise. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="about-hero-mesh h-[140vmax] w-[140vmax] opacity-70"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(255,122,66,0.14), transparent 20%, rgba(255,255,255,0.05) 40%, transparent 60%, rgba(255,122,66,0.1) 80%, transparent 100%)",
          }}
        />
        <div className="about-hero-orb-1 absolute left-[10%] top-[15%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,122,66,0.22),transparent_70%)] blur-3xl" />
        <div className="about-hero-orb-2 absolute right-[8%] bottom-[10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: `url("${NOISE_DATA_URI}")` }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <div className="about-hero-headline-group text-center">
          <p className="about-hero-eyebrow font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
            About — Bhavya Chawla
          </p>

          <h1
            className="about-hero-title mx-auto mt-6 max-w-3xl font-display text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[0.98] tracking-tight text-white"
            style={{ perspective: "600px" }}
          >
            Where design meets engineering.
          </h1>

          <p className="about-hero-sub mx-auto mt-8 max-w-xl text-balance text-base text-white/60 md:text-lg">
            Four years building products end to end — the person who designs
            it is the person who ships it. This is what that actually looks
            like.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic className="about-hero-cta">
              <Button href="#story" variant="inverse" dataCursor="Explore">
                Start the Story
              </Button>
            </Magnetic>
            <Magnetic className="about-hero-cta">
              <Button href="/contact" variant="inverse-outline">
                Work With Me
              </Button>
            </Magnetic>
          </div>
        </div>

        <div className="about-hero-visual-group relative mt-14 md:mt-16">
          <HeroProfileVisual />
          <HeroFloatingCards />
        </div>
      </div>

      <div className="about-hero-scroll absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white/40">
          Scroll to begin
          <span className="relative block h-10 w-px overflow-hidden bg-white/15">
            <span className="about-hero-scroll-dot absolute left-0 top-0 h-2.5 w-px bg-accent" />
          </span>
        </div>
      </div>
    </section>
  );
}
