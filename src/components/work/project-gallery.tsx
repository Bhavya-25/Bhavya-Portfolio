"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Project detail's signature interaction — a full-bleed parallax gallery.
 * Each frame's image moves at a slightly different rate than its container
 * as it crosses the viewport, distinct from every other page's animation.
 */
export function ProjectGallery({ image, title }: { image: string; title: string }) {
  const root = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const frames = gsap.utils.toArray<HTMLElement>(".gallery-frame-img");
      frames.forEach((frame) => {
        gsap.fromTo(
          frame,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: frame.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });
    },
    { scope: root, dependencies: [prefersReducedMotion] }
  );

  return (
    <div ref={root} className="flex flex-col gap-6">
      <div className="relative h-[50vh] min-h-[360px] w-full overflow-hidden rounded-[1.75rem] border border-border">
        <div className="gallery-frame-img absolute inset-[-6%]">
          <Image src={image} alt={`${title} — overview`} fill className="object-cover" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="relative h-[32vh] min-h-[260px] w-full overflow-hidden rounded-[1.75rem] border border-border"
          >
            <div className="gallery-frame-img absolute inset-[-6%]">
              <Image
                src={image}
                alt={`${title} — detail ${i + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
