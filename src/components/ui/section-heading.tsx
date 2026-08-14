interface SectionHeadingProps {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

export function SectionHeading({
  index,
  label,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={`section-reveal grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 ${className ?? ""}`}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted md:col-span-3">
        {index} / {label}
      </p>
      <div className="md:col-span-9">
        <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-ink">
          {title}
        </h2>
        {description && (
          <p className="mt-6 max-w-2xl text-base text-ink-muted md:text-lg">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
