// Premium brand anchor between the two rows of feature cards — a slowly
// rotating dashed ring, two static concentric rings, and a gently floating
// monogram badge at the center. All animation is frozen automatically under
// prefers-reduced-motion (see the global override in globals.css).
export function CenterMedallion() {
  return (
    <div
      className="relative flex h-32 w-32 items-center justify-center md:h-40 md:w-40"
      role="img"
      aria-label="Bhavya Chawla"
    >
      <div
        aria-hidden="true"
        className="orbit-spin absolute inset-0 rounded-full border border-dashed border-border-strong"
      />
      <div
        aria-hidden="true"
        className="absolute inset-3 rounded-full border border-border md:inset-4"
      />
      <div
        aria-hidden="true"
        className="absolute inset-7 rounded-full border border-border/60 md:inset-9"
      />

      <div className="gentle-float flex h-16 w-16 items-center justify-center rounded-full border border-border-strong bg-surface-raised font-display text-lg font-medium text-ink shadow-[0_20px_40px_-24px_rgba(0,0,0,0.3)] md:h-20 md:w-20 md:text-xl">
        BC
      </div>
    </div>
  );
}
