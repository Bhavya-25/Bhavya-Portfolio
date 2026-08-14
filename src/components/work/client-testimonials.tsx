"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/section";
import { ReviewPlatformRow } from "./review-platform-row";
import { TestimonialShowcase } from "./testimonial-showcase";

export function ClientTestimonials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".testimonials-eyebrow", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: EASE.out,
        scrollTrigger: { trigger: root.current, start: "top 78%" },
      });
      gsap.from(".review-platform-card", {
        opacity: 0,
        y: 16,
        duration: 0.5,
        ease: EASE.out,
        stagger: 0.06,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".testimonials-showcase-wrap", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: EASE.out,
        scrollTrigger: { trigger: root.current, start: "top 62%" },
      });
    },
    { scope: root }
  );

  return (
    <Section ref={root} dataProgress="What Clients Say" className="border-y border-border">
      <p className="testimonials-eyebrow font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
        04 / What Clients Say
      </p>

      <h2 className="testimonials-eyebrow mt-5 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.05] tracking-tight text-ink">
        Trusted by the people I&apos;ve built for.
      </h2>

      <p className="testimonials-eyebrow mt-5 max-w-xl text-base text-ink-muted md:text-lg">
        A track record across full-stack products, Shopify storefronts,
        mobile apps, and design systems — rated the same way on every
        platform I work through.
      </p>

      <div className="mt-10 md:mt-14">
        <ReviewPlatformRow />
      </div>

      <div className="testimonials-showcase-wrap mt-10 md:mt-12">
        <TestimonialShowcase />
      </div>
    </Section>
  );
}
