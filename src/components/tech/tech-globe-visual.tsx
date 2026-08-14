"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { useMounted } from "@/hooks/useMounted";
import { SceneErrorBoundary } from "@/components/three/scene-error-boundary";

const TechGlobeScene = dynamic(
  () => import("@/components/three/tech-globe-scene").then((mod) => mod.TechGlobeScene),
  { ssr: false, loading: () => null }
);

// Mirrors the --color-accent tokens in globals.css — kept in sync manually
// since Three.js materials need a real hex value, not a CSS variable.
const ACCENT_HEX = { light: "#d94f1e", dark: "#ff7a42" } as const;

function GlowFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className="h-40 w-40 rounded-full"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-accent) 55%, transparent) 0%, transparent 72%)",
        }}
      />
    </div>
  );
}

export function TechGlobeVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { resolvedTheme } = useTheme();
  const mounted = useMounted();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const accentHex = mounted && resolvedTheme === "dark" ? ACCENT_HEX.dark : ACCENT_HEX.light;

  return (
    <div ref={containerRef} className="relative h-full w-full">
      <GlowFallback />
      {isVisible && (
        <SceneErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <TechGlobeScene accentHex={accentHex} reducedMotion={prefersReducedMotion} />
          </Suspense>
        </SceneErrorBoundary>
      )}
    </div>
  );
}
