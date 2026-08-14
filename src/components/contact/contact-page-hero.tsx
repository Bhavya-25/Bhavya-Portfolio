"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { StructuredData } from "@/components/seo/structured-data";
import { breadcrumbSchema } from "@/lib/seo";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(SplitText);

export function ContactPageHero() {
  const root = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      const split = new SplitText(".contact-hero-title", {
        type: "words,lines",
        linesClass: "overflow-hidden",
      });

      const tl = gsap.timeline({ delay: 0.1 });

      tl.from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.5, ease: EASE.out })
        .from(".breadcrumb-item", { opacity: 0, y: 8, duration: 0.4, ease: EASE.out }, "<")
        .from(
          split.words,
          { yPercent: 120, opacity: 0, duration: 0.9, ease: EASE.out, stagger: 0.04 },
          "-=0.25"
        )
        .from(".hero-sub", { opacity: 0, y: 16, duration: 0.6, ease: EASE.out }, "-=0.5")
        .from(
          ".hero-cta",
          { opacity: 0, y: 12, duration: 0.5, ease: EASE.out, stagger: 0.08 },
          "-=0.4"
        )
        .from(".hero-badge", { opacity: 0, y: 12, duration: 0.5, ease: EASE.out }, "-=0.3")
        .from(
          ".hero-scroll-indicator",
          { opacity: 0, duration: 0.5, ease: EASE.out },
          "-=0.2"
        );

      return () => split.revert();
    },
    { scope: root }
  );

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion) return;

    const blobs = gsap.utils.toArray<HTMLElement>(".hero-blob", el);
    const blobTo = blobs.map((blob, i) => ({
      x: gsap.quickTo(blob, "x", { duration: 0.9, ease: "power3.out" }),
      y: gsap.quickTo(blob, "y", { duration: 0.9, ease: "power3.out" }),
      factor: 18 + i * 10,
    }));

    const handleMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      blobTo.forEach(({ x, y, factor }) => {
        x(relX * factor);
        y(relY * factor);
      });
    };

    el.addEventListener("pointermove", handleMove);
    return () => el.removeEventListener("pointermove", handleMove);
  }, [prefersReducedMotion]);

  return (
    <section
      ref={root}
      data-progress="Contact"
      className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden bg-[#0b0a09] px-6 pt-32 pb-16 text-white md:px-10"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-blob absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,122,66,0.32),transparent_70%)] blur-3xl" />
        <div className="hero-blob absolute right-[-10%] top-1/3 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,122,66,0.16),transparent_70%)] blur-3xl" />
        <div className="hero-blob absolute bottom-[-15%] left-1/3 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        <StructuredData
          data={breadcrumbSchema([
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact" },
          ])}
        />
        <nav aria-label="Breadcrumb" className="breadcrumb-item">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">
            <li className="flex items-center gap-2">
              <Link href="/" className="transition-colors duration-300 ease-out hover:text-white">
                Home
              </Link>
              <span aria-hidden="true">/</span>
            </li>
            <li>
              <span aria-current="page" className="text-white/70">
                Contact
              </span>
            </li>
          </ol>
        </nav>

        <p className="hero-eyebrow mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
          Let&apos;s Talk
        </p>

        <h1 className="contact-hero-title mt-6 max-w-4xl font-display text-[clamp(2.75rem,7.5vw,6.5rem)] font-medium leading-[0.98] tracking-tight text-white">
          Tell me about your project.
        </h1>

        <p className="hero-sub mt-8 max-w-xl text-balance text-base text-white/60 md:text-lg">
          One form, one person, one honest reply — usually within 24 hours.
          No account managers, no discovery-call gatekeeping before we
          actually talk.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic className="hero-cta">
            <Button href="#contact-form" variant="inverse" dataCursor="Start">
              Start the Conversation
            </Button>
          </Magnetic>
          <Magnetic className="hero-cta">
            <Button href="mailto:bhavvyawork@gmail.com" variant="inverse-outline">
              Email Directly
            </Button>
          </Magnetic>
        </div>

        <div className="hero-badge mt-10 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-white/70 w-fit">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Available for selected projects
        </div>
      </div>

      <div className="hero-scroll-indicator absolute bottom-10 left-1/2 z-10 -translate-x-1/2 md:left-10 md:translate-x-0">
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white/40">
          <span className="block h-8 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent" />
          Scroll
        </div>
      </div>
    </section>
  );
}
