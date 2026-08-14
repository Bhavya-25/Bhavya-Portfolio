"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ContactHeroVisual } from "./contact-hero-visual";
import { ServiceMarquee } from "./service-marquee";
import { TrustStrip } from "./trust-strip";
import { useIsTouchDevice, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function ContactHero() {
  const panelRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouchDevice();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return;
    const panel = panelRef.current;
    const visual = visualRef.current;
    if (!panel || !visual) return;

    const xTo = gsap.quickTo(visual, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(visual, "y", { duration: 0.7, ease: "power3.out" });

    const handleMove = (event: PointerEvent) => {
      const rect = panel.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      xTo(relX * 14);
      yTo(relY * 14);
    };
    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    panel.addEventListener("pointermove", handleMove);
    panel.addEventListener("pointerleave", handleLeave);
    return () => {
      panel.removeEventListener("pointermove", handleMove);
      panel.removeEventListener("pointerleave", handleLeave);
    };
  }, [isTouch, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const imageWrap = imageWrapRef.current;
    const visual = visualRef.current;
    if (!imageWrap || !visual) return;

    const tween = gsap.fromTo(
      visual,
      { scale: 1.08 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: imageWrap,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={panelRef}
      className="cta-left relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-surface-raised shadow-[var(--shadow-soft)]"
    >
      <div className="relative z-10 order-2 px-8 pt-10 md:order-1 md:px-10 md:pt-12">
        <h2 className="cta-headline max-w-md font-display text-[clamp(2rem,3.4vw,2.75rem)] font-medium leading-[1.05] tracking-tight text-ink">
          Ready to build something extraordinary?
        </h2>
        <p className="cta-sub mt-4 max-w-sm text-sm text-ink-muted md:text-base">
          Every great product starts with one conversation. Share your idea
          and I&apos;ll help shape it into a scalable digital experience.
        </p>
      </div>

      <div
        ref={imageWrapRef}
        className="cta-image relative order-1 mt-8 min-h-[320px] flex-1 overflow-hidden md:order-2 md:min-h-[420px]"
      >
        <div ref={visualRef} className="absolute inset-[-6%]">
          <ContactHeroVisual />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/92 via-black/25 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-6 md:p-8">
          <div className="cta-marquee">
            <ServiceMarquee />
          </div>
          <div className="cta-trust">
            <TrustStrip />
          </div>
        </div>
      </div>
    </div>
  );
}
