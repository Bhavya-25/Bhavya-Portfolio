"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { SceneErrorBoundary } from "./scene-error-boundary";

const ParticleFieldScene = dynamic(
  () => import("./particle-field-scene").then((mod) => mod.ParticleFieldScene),
  { ssr: false, loading: () => null }
);

export function ParticleFieldVisual() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,122,66,0.35) 1px, transparent 1.5px)",
          backgroundSize: "22px 22px",
        }}
      />
    );
  }

  return (
    <SceneErrorBoundary fallback={null}>
      <Suspense fallback={null}>
        <ParticleFieldScene />
      </Suspense>
    </SceneErrorBoundary>
  );
}
