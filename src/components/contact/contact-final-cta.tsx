"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/section";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function ContactFinalCta() {
  const root = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      gsap.from(".contact-cta-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: EASE.out,
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      if (prefersReducedMotion) return;

      gsap.to(".contact-cta-float-1", {
        y: -18,
        x: 10,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".contact-cta-float-2", {
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
    <Section ref={root} dataProgress="Prefer Direct Contact">
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
          className="contact-cta-float-1 pointer-events-none absolute left-[8%] top-[20%] h-20 w-20 rounded-full bg-accent/20 blur-2xl"
        />
        <span
          aria-hidden="true"
          className="contact-cta-float-2 pointer-events-none absolute right-[10%] bottom-[18%] h-28 w-28 rounded-full bg-white/10 blur-2xl"
        />

        <div className="relative z-10 mx-auto max-w-2xl">
          <p className="contact-cta-reveal font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
            08 / Prefer Direct Contact?
          </p>
          <h2 className="contact-cta-reveal mt-6 font-display text-[clamp(2.25rem,5.5vw,4rem)] font-medium leading-[1.05] tracking-tight text-white">
            Skip the form. Just email me.
          </h2>
          <p className="contact-cta-reveal mt-6 text-base text-white/60 md:text-lg">
            Some ideas are easier explained directly. Reach out on email or
            LinkedIn and I&apos;ll reply personally, same as everyone else.
          </p>
          <div className="contact-cta-reveal mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Button href="mailto:bhavvyawork@gmail.com" variant="inverse" dataCursor="Email">
                bhavvyawork@gmail.com
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                href="https://www.linkedin.com/in/bhavya-chawla-4396661a5/"
                target="_blank"
                rel="noreferrer"
                variant="inverse-outline"
              >
                Message on LinkedIn
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </Section>
  );
}
