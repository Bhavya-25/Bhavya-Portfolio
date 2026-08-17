import type { Ref } from "react";

/**
 * A progress rail sitting above the horizontal timeline track, in normal
 * flow (not overlapping card content). `ref` is exposed so the parent can
 * scrub its fill via a direct style write (`scaleX`) inside the same
 * ScrollTrigger `onUpdate` that drives the track's translate — one
 * scroll-driven source of truth, two visual effects (track position + line
 * fill), so they can never drift out of sync.
 */
export function TimelineConnectorLine({ ref }: { ref: Ref<HTMLDivElement> }) {
  return (
    <div aria-hidden="true" className="relative mb-10 h-px w-full bg-border md:mb-14">
      <div
        ref={ref}
        className="absolute inset-y-0 left-0 h-px w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
      <span className="absolute -top-1.5 left-0 h-4 w-px bg-border" />
      <span className="absolute -top-1.5 right-0 h-4 w-px bg-border" />
    </div>
  );
}
