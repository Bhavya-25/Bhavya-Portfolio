"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { techCategories, getCategoryItems } from "@/data/technologies";
import { EASE } from "@/lib/motion";
import { TechGlobeVisual } from "@/components/tech/tech-globe-visual";
import { TechCard } from "@/components/tech/tech-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { useIsTouchDevice } from "@/hooks/useMediaQuery";

export function TechStack() {
  const root = useRef<HTMLElement>(null);
  const isTouch = useIsTouchDevice();

  useGSAP(
    () => {
      const headerTrigger = { trigger: root.current, start: "top 75%" };

      gsap.from(".tech-eyebrow", {
        opacity: 0,
        y: 12,
        duration: 0.4,
        ease: EASE.out,
        scrollTrigger: headerTrigger,
      });
      gsap.from(".tech-headline-inner", {
        yPercent: 110,
        duration: 0.7,
        ease: EASE.out,
        stagger: 0.05,
        delay: 0.15,
        scrollTrigger: headerTrigger,
      });
      gsap.from(".tech-copy", {
        opacity: 0,
        y: 14,
        duration: 0.5,
        ease: EASE.out,
        stagger: 0.08,
        delay: 0.35,
        scrollTrigger: headerTrigger,
      });
      gsap.from(".tech-globe-visual", {
        opacity: 0,
        scale: 0.92,
        duration: 0.8,
        ease: EASE.out,
        scrollTrigger: headerTrigger,
      });
      gsap.from(".tech-badge", {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: EASE.out,
        delay: 0.3,
        scrollTrigger: headerTrigger,
      });
      gsap.from(".tech-card", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: EASE.out,
        scrollTrigger: { trigger: "#tech-grid", start: "top 85%" },
      });
      gsap.from(".tech-hint", {
        opacity: 0,
        duration: 0.4,
        ease: EASE.out,
        scrollTrigger: { trigger: ".tech-hint", start: "top 95%" },
      });
    },
    { scope: root }
  );

  return (
    <Section ref={root} dataProgress="Technology">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="tech-eyebrow font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              05 / Technology
            </p>

            <h2 className="mt-6 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-ink">
              <span className="block overflow-hidden">
                <span className="tech-headline-inner block">A working ecosystem,</span>
              </span>
              <span className="block overflow-hidden">
                <span className="tech-headline-inner block text-accent">
                  not a logo wall.
                </span>
              </span>
            </h2>

            <p className="tech-copy mt-6 max-w-md text-base text-ink-muted md:text-lg">
              Six areas I move between depending on what the product actually
              needs — full-stack, creative, and everything in between.
            </p>

            <Button href="#tech-grid" className="tech-copy mt-8 w-fit">
              Explore Tech
            </Button>
          </div>

          <div className="relative h-[280px] md:h-[360px] lg:col-span-6">
            <div className="tech-globe-visual absolute inset-0">
              <TechGlobeVisual />
            </div>

            <div className="tech-badge absolute bottom-0 right-0 w-52 rounded-xl border border-border bg-surface/90 p-4 backdrop-blur-sm">
              <StatusBadge label="Always evolving" />
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-muted">
                Learning. Building. Shipping.
              </p>
            </div>
          </div>
        </div>

        <div
          id="tech-grid"
          className="mt-12 grid scroll-mt-24 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5"
        >
          {techCategories.map((category, index) => (
            <TechCard
              key={category.id}
              category={category}
              items={getCategoryItems(category.id)}
              index={index}
            />
          ))}
        </div>

        <div className="tech-hint mt-12 flex items-center justify-center gap-2 text-center font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
            <rect x="7" y="2.5" width="10" height="17" rx="5" stroke="currentColor" strokeWidth={1.4} />
            <path d="M12 6.5v3" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
          </svg>
          <span>
            {isTouch ? "Tap" : "Hover"} cards to{" "}
            <span className="text-accent">explore</span>
          </span>
        </div>
    </Section>
  );
}
