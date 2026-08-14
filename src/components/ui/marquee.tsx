import type { ReactNode } from "react";

/**
 * Seamless infinite scroller. Renders `children` twice as siblings in one
 * flex track (uniform gap across the whole row, including the loop
 * junction) and translates the track exactly -50%, so the repeat is
 * invisible. Pauses on hover via the shared `.marquee-track` keyframe
 * (globals.css).
 */
export function Marquee({
  children,
  durationSeconds = 32,
  reverse = false,
  className,
  gapClassName = "gap-8",
}: {
  children: ReactNode;
  durationSeconds?: number;
  reverse?: boolean;
  className?: string;
  gapClassName?: string;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div
        className={`marquee-track flex w-max shrink-0 items-center ${gapClassName}`}
        style={{
          animationDuration: `${durationSeconds}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        <div className="flex shrink-0 items-center" aria-hidden="true" style={{ gap: "inherit" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
