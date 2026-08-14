import { reviewPlatforms } from "@/data/review-platforms";
import { PlatformIcon } from "./platform-icon";
import { StarRating } from "./star-rating";

export function ReviewPlatformRow() {
  return (
    <div className="review-platform-grid grid grid-cols-2 gap-4 sm:grid-cols-4">
      {reviewPlatforms.map((platform) => {
        const content = (
          <>
            <div className="flex items-center justify-between">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6 text-ink-faint transition-colors duration-300 ease-out group-hover:text-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
              >
                <PlatformIcon kind={platform.icon} />
              </svg>
              {platform.href && (
                <span
                  aria-hidden="true"
                  className="-translate-x-1 font-mono text-sm text-ink-faint opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
                >
                  →
                </span>
              )}
            </div>

            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
              {platform.name}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="font-display text-xl font-medium tracking-tight text-ink">
                {platform.rating.toFixed(1)}
              </span>
              <StarRating rating={platform.rating} size={13} />
            </div>
            <p className="mt-1 text-xs text-ink-muted">
              {platform.reviewCount} {platform.reviewLabel}
            </p>
          </>
        );

        const className =
          "review-platform-card group relative block overflow-hidden rounded-2xl border border-border bg-surface-raised p-5 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.3)]";

        return platform.href ? (
          <a
            key={platform.id}
            href={platform.href}
            target="_blank"
            rel="noreferrer"
            data-cursor="Open"
            className={className}
          >
            {content}
          </a>
        ) : (
          <div key={platform.id} className={className}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
