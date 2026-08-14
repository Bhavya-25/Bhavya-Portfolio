/** Static CSS stand-in for the hero 3D scene — used during load, when WebGL is
 * unavailable, and as the base layer the canvas fades in on top of. */
export function HeroSceneFallback() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 68% 42%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 70%)",
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.25]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="hero-grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path
              d="M 8 0 L 0 0 0 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.15"
              className="text-ink"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#hero-grid)" />
      </svg>
    </div>
  );
}
