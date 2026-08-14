"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function GsapProvider({ children }: { children: ReactNode }) {
  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    gsap.defaults({
      ease: "power4.out",
      duration: prefersReducedMotion ? 0.01 : 0.7,
    });

    ScrollTrigger.config({ ignoreMobileResize: true });
  }, []);

  return <>{children}</>;
}
