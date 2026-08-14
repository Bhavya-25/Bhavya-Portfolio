"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/section";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function PortfolioCta() {
  const root = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      gsap.from(".portfolio-cta-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: EASE.out,
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      if (prefersReducedMotion) return;

      gsap.to(".portfolio-cta-float-1", {
        y: -18,
        x: 10,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".portfolio-cta-float-2", {
        y: 16,
        x: -8,
        duration: 5.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: root, dependencies: [prefersReducedMotion] }
  );

  return (
    <Section ref={root} dataProgress="Start a Project">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b0a09] px-8 py-20 text-center text-white md:px-16 md:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, rgba(255,122,66,0.22), transparent 70%)",
          }}
        />
        <span
          aria-hidden="true"
          className="portfolio-cta-float-1 pointer-events-none absolute left-[8%] top-[20%] h-20 w-20 rounded-full bg-accent/20 blur-2xl"
        />
        <span
          aria-hidden="true"
          className="portfolio-cta-float-2 pointer-events-none absolute right-[10%] bottom-[18%] h-28 w-28 rounded-full bg-white/10 blur-2xl"
        />

        <div className="relative z-10 mx-auto max-w-2xl">
          <p className="portfolio-cta-reveal font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
            06 / Start a Project
          </p>
          <h2 className="portfolio-cta-reveal mt-6 font-display text-[clamp(2.25rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-tight text-white">
            Have a project that needs to actually ship?
          </h2>
          <p className="portfolio-cta-reveal mt-6 text-base text-white/60 md:text-lg">
            Tell me the scope and the timeline. I&apos;ll reply personally with
            a realistic plan — no sales team, no bloated proposal.
          </p>
          <div className="portfolio-cta-reveal mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Button href="/contact" variant="inverse" dataCursor="Talk">
                Start a Project
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/about" variant="inverse-outline">
                More About Me
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </Section>
  );
}
