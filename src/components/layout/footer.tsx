"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { NewsletterCta } from "@/components/footer/newsletter-cta";
import { FooterBrand } from "@/components/footer/footer-brand";
import { FooterServices } from "@/components/footer/footer-services";
import { FooterNavigation } from "@/components/footer/footer-navigation";
import { FooterContact } from "@/components/footer/footer-contact";
import { AiToolsRow } from "@/components/footer/ai-tools-row";
import { SocialLinks } from "@/components/footer/social-links";
import { FooterBottom } from "@/components/footer/footer-bottom";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

export function Footer() {
  const root = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 85%" },
      });

      tl.from(".footer-newsletter", { opacity: 0, y: 32, duration: 0.5, ease: EASE.out })
        .from(
          ".footer-col",
          { opacity: 0, y: 20, duration: 0.4, ease: EASE.out, stagger: 0.08 },
          "-=0.25"
        )
        .from(
          ".footer-ai-icon",
          { opacity: 0, y: 10, duration: 0.3, ease: EASE.out, stagger: 0.03 },
          "-=0.2"
        )
        .from(
          ".footer-social-icon",
          { opacity: 0, scale: 0.8, duration: 0.3, ease: EASE.out, stagger: 0.03 },
          "-=0.2"
        )
        .from(".footer-bottom-row", { opacity: 0, y: 10, duration: 0.35, ease: EASE.out }, "-=0.1");
    },
    { scope: root, dependencies: [prefersReducedMotion] }
  );

  return (
    <footer
      ref={root}
      className="relative overflow-hidden bg-[#0b0a09] px-6 py-10 text-white md:px-10 md:py-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, rgba(255,122,66,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px]">
        <NewsletterCta />

        <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mt-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-8">
          <FooterBrand />
          <FooterServices />
          <FooterNavigation />
          <FooterContact />
        </div>

        <AiToolsRow />
        <SocialLinks />
        <FooterBottom />
      </div>
    </footer>
  );
}
