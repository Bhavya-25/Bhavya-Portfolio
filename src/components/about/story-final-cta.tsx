"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Static-height panel — no pin, unlike Sections 2 and 4 (see the pin-safety
 * note in story-scrollytelling.tsx; this page already has its two pins).
 * Cursor-follow spotlight + rotating conic-gradient border frame + a
 * gradient-text sweep headline — the third and last distinct headline
 * reveal technique on this page (hero = char-flip, story = crossfade, this
 * one = gradient sweep), and a genuinely new "glowing frame" motif not used
 * anywhere else on the site.
 */
export function StoryFinalCta() {
  const root = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      gsap.from(".cta-reveal", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: EASE.out,
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });

      if (prefersReducedMotion) return;

      gsap.to(".cta-border", { rotate: 360, duration: 20, repeat: -1, ease: "none" });
      gsap.to(".cta-headline", {
        backgroundPosition: "200% center",
        duration: 4,
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true,
      });
    },
    { scope: root, dependencies: [prefersReducedMotion] }
  );

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Direct style writes, not a GSAP tween — CSS custom-property
    // interpolation via gsap.quickTo isn't reliably supported across GSAP
    // versions, and an instantly-following spotlight reads correctly here
    // anyway (a laggy spotlight would feel wrong for something meant to
    // track the cursor precisely).
    const handleMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };

    el.addEventListener("pointermove", handleMove);
    return () => el.removeEventListener("pointermove", handleMove);
  }, [prefersReducedMotion]);

  return (
    <div
      ref={root}
      className="relative overflow-hidden rounded-[2rem] bg-[#0b0a09] p-[1.5px]"
      style={{ "--spot-x": "50%", "--spot-y": "50%" } as React.CSSProperties}
    >
      <div
        aria-hidden="true"
        className="cta-border pointer-events-none absolute -inset-[40%]"
        style={{
          background:
            "conic-gradient(from 0deg, transparent, rgba(255,122,66,0.6), transparent 30%)",
        }}
      />

      <div className="relative overflow-hidden rounded-[2rem] bg-[#0b0a09] px-8 py-16 text-center text-white md:px-16 md:py-24">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(420px circle at var(--spot-x) var(--spot-y), rgba(255,122,66,0.16), transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <p className="cta-reveal font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
            Let&apos;s Work Together
          </p>

          <h2
            className="cta-reveal cta-headline mx-auto mt-6 max-w-2xl bg-clip-text font-display text-3xl font-medium leading-tight tracking-tight text-transparent md:text-5xl"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #ffffff, #ff7a42, #ffffff, #ff7a42)",
              backgroundSize: "200% auto",
            }}
          >
            Now you know how I got here. Let&apos;s see what we build next.
          </h2>

          <p className="cta-reveal mx-auto mt-6 max-w-xl text-base text-white/60 md:text-lg">
            15 minutes is usually enough to know if we&apos;re a fit. No deck,
            no sales script — just a conversation about what you&apos;re
            building.
          </p>

          <div className="cta-reveal mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Button href="/contact" variant="inverse" dataCursor="Contact">
                Book a Call
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/projects" variant="inverse-outline">
                See the Work
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
}
