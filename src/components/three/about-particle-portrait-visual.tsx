"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { SceneErrorBoundary } from "./scene-error-boundary";
import { AboutHeroFallback } from "./about-hero-fallback";

const AboutParticlePortraitScene = dynamic(
  () => import("./about-particle-portrait-scene").then((mod) => mod.AboutParticlePortraitScene),
  { ssr: false, loading: () => null }
);

export function AboutParticlePortraitVisual() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative h-full w-full">
      <AboutHeroFallback />
      {!prefersReducedMotion && (
        <SceneErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <AboutParticlePortraitScene reducedMotion={prefersReducedMotion} />
          </Suspense>
        </SceneErrorBoundary>
      )}
    </div>
  );
}
