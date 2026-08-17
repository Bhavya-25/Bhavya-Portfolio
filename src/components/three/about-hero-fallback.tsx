/**
 * Static fallback for SSR / reduced-motion / WebGL failure — a line-art
 * silhouette outline, deliberately NOT another radial-gradient blob (that
 * exact fallback shape is already used twice on Home: HeroSceneFallback and
 * TechGlobeVisual's GlowFallback). Traces roughly the same bust contour the
 * live scene assembles into, so the fallback reads as "the same portrait,
 * just still" rather than a generic placeholder.
 */
export function AboutHeroFallback() {
  return (
    <svg
      viewBox="-1 -1.6 2 3.2"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* SVG y grows downward; the Three.js scene's y-up bust math (head at
          +1.05, shoulders below at negative y) is mirrored here so the two
          line up: head near the top of the viewBox (negative y), shoulders
          filling out the lower two-thirds (positive y). */}
      <ellipse
        cx="0"
        cy="-1.05"
        rx="0.42"
        ry="0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.012"
        className="text-accent/40"
      />
      <path
        d="M -0.55 -0.5 C -0.55 -0.15 -0.3 -0.32 -0.16 -0.42 L -0.16 -0.72 L 0.16 -0.72 L 0.16 -0.42 C 0.3 -0.32 0.55 -0.15 0.55 -0.5 L 0.55 0.95 L -0.55 0.95 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.012"
        className="text-accent/40"
      />
    </svg>
  );
}
