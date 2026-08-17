"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EASE } from "@/lib/motion";

/**
 * A linear fill bar that animates in once, on scroll-into-view. No shared
 * "progress bar" primitive existed before this — ScrollProgress and
 * ProjectProgress both serve unrelated purposes (page-scroll reader, image
 * pagination).
 */
export function ProgressBar({
  value,
  label,
  className,
}: {
  value: number;
  label: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        fillRef.current,
        { scaleX: 0 },
        {
          scaleX: value / 100,
          duration: 0.8,
          ease: EASE.out,
          scrollTrigger: { trigger: trackRef.current, start: "top 90%" },
        }
      );
    },
    { scope: trackRef, dependencies: [value] }
  );

  return (
    <div
      ref={trackRef}
      className={`h-1 w-full overflow-hidden rounded-full bg-border ${className ?? ""}`}
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div ref={fillRef} className="h-full w-full origin-left rounded-full bg-accent" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
