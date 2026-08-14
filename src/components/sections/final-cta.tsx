"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/section";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function FinalCta() {
  const root = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      gsap.from(".cta-eyebrow", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: EASE.out,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });

      tl.from(".cta-left", { opacity: 0, y: 28, duration: 0.45, ease: EASE.out })
        .from(
          [".cta-headline", ".cta-sub"],
          { opacity: 0, y: 14, duration: 0.35, ease: EASE.out, stagger: 0.05 },
          "-=0.25"
        )
        .from(".cta-image", { opacity: 0, scale: 1.06, duration: 0.45, ease: EASE.out }, "-=0.2")
        .from(".cta-marquee", { opacity: 0, y: 8, duration: 0.3, ease: EASE.out }, "-=0.2")
        .from(".cta-trust", { opacity: 0, y: 8, duration: 0.3, ease: EASE.out }, "-=0.18")
        .from(".cta-right", { opacity: 0, y: 28, duration: 0.45, ease: EASE.out }, "-=0.3")
        .from(
          ".cta-field",
          { opacity: 0, y: 12, duration: 0.3, ease: EASE.out, stagger: 0.04 },
          "-=0.25"
        )
        .from(".cta-submit", { opacity: 0, y: 8, duration: 0.3, ease: EASE.out }, "-=0.1");
    },
    { scope: root, dependencies: [prefersReducedMotion] }
  );

  return (
    <Section id="contact" ref={root} dataProgress="Let's Build">
        <p className="cta-eyebrow font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          09 / Let&apos;s Build
        </p>

        <div className="mt-10 rounded-[2rem] border border-border bg-surface p-3 shadow-[var(--shadow-soft)] md:mt-14 md:p-4">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:items-stretch md:gap-4">
            <ContactHero />

            <div className="cta-right flex h-full flex-col rounded-[1.75rem] border border-border bg-surface-raised p-8 shadow-[var(--shadow-soft)] md:p-10">
              <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.05] tracking-tight text-ink">
                Let&apos;s Build Something Great
              </h3>
              <p className="mt-3 max-w-md text-sm text-ink-muted md:text-base">
                Share a few details about your project — I read every message
                myself and reply personally.
              </p>

              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
    </Section>
  );
}
