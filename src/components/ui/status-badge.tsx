export function StatusBadge({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-border-strong bg-surface-raised px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {label}
    </div>
  );
}
