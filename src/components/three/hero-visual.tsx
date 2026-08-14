"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { SceneErrorBoundary } from "./scene-error-boundary";
import { HeroSceneFallback } from "./hero-scene-fallback";

const HeroScene = dynamic(() => import("./hero-scene").then((mod) => mod.HeroScene), {
  ssr: false,
  loading: () => null,
});

export function HeroVisual() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative h-full w-full">
      <HeroSceneFallback />
      {!prefersReducedMotion && (
        <SceneErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <HeroScene reducedMotion={prefersReducedMotion} />
          </Suspense>
        </SceneErrorBoundary>
      )}
    </div>
  );
}
