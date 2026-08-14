"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqItems } from "@/data/faq";
import { EASE } from "@/lib/motion";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { FAQNavigation } from "@/components/faq/faq-navigation";
import { FAQContent } from "@/components/faq/faq-content";
import { FAQMobileAccordion } from "@/components/faq/faq-mobile-accordion";
import { Section } from "@/components/ui/section";

export function Faq({ index = "08" }: { index?: string }) {
  const root = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(faqItems[0].id);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      gsap.from(".section-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: EASE.out,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      if (prefersReducedMotion) return;

      gsap.utils.toArray<HTMLElement>(".faq-nav-item").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          x: -16,
          duration: 0.5,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <Section ref={root} dataProgress="FAQ">
        <SectionHeading
          index={index}
          label="Frequently Asked Questions"
          title={
            <>
              Still deciding?
              <br />
              Here&apos;s what usually settles it.
            </>
          }
        />

        {isDesktop ? (
          <div className="mt-10 grid grid-cols-[35%_1fr] gap-10 md:mt-14 lg:gap-16">
            <FAQNavigation items={faqItems} activeId={activeId} onSelect={setActiveId} />
            <FAQContent items={faqItems} activeId={activeId} onSelect={setActiveId} />
          </div>
        ) : (
          <FAQMobileAccordion items={faqItems} />
        )}
    </Section>
  );
}
