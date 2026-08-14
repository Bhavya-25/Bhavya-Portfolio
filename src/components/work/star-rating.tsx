import { useId } from "react";

export function Star({ fill }: { fill: number }) {
  const id = useId();
  return (
    <svg viewBox="0 0 20 20" className="h-full w-full" aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={20 * fill} height="20" />
        </clipPath>
      </defs>
      <path
        d="M10 1.5l2.47 5.13 5.53.72-4.06 3.9 1.03 5.6L10 13.98l-4.97 2.87 1.03-5.6-4.06-3.9 5.53-.72L10 1.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-ink-faint"
      />
      <path
        d="M10 1.5l2.47 5.13 5.53.72-4.06 3.9 1.03 5.6L10 13.98l-4.97 2.87 1.03-5.6-4.06-3.9 5.53-.72L10 1.5Z"
        fill="currentColor"
        className="text-accent"
        clipPath={`url(#${id})`}
      />
    </svg>
  );
}

export function StarRating({
  rating,
  size = 16,
  className,
}: {
  rating: number;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-1 ${className ?? ""}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ width: size, height: size }}>
          <Star fill={Math.max(0, Math.min(1, rating - i))} />
        </span>
      ))}
    </div>
  );
}
