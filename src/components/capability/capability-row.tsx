import type { Capability } from "@/data/capabilities";

interface CapabilityRowProps {
  capability: Capability;
  isActive: boolean;
  onSelect: () => void;
}

export function CapabilityRow({ capability, isActive, onSelect }: CapabilityRowProps) {
  return (
    <li className="relative border-b border-border">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-[2px] origin-top bg-accent transition-transform duration-500 ease-out"
        style={{ transform: isActive ? "scaleY(1)" : "scaleY(0)" }}
      />
      <button
        type="button"
        onClick={onSelect}
        onFocus={onSelect}
        aria-current={isActive}
        className="group flex w-full items-center gap-5 py-6 pl-6 text-left transition-transform duration-500 ease-out md:gap-8 md:py-8"
        style={{ transform: isActive ? "translateX(8px)" : "translateX(0)" }}
      >
        <span
          className={`font-mono text-sm transition-colors duration-300 ${
            isActive ? "text-accent" : "text-ink-faint"
          }`}
        >
          {capability.index}
        </span>

        <span
          className={`font-display font-medium tracking-tight transition-[font-size,color] duration-300 ease-out ${
            isActive ? "text-2xl text-ink md:text-4xl" : "text-xl text-ink-faint md:text-2xl"
          }`}
        >
          {capability.title}
        </span>

        <span
          className="ml-auto font-mono text-lg transition-[color,opacity,transform] duration-300 ease-out"
          style={{
            color: isActive ? "var(--color-accent)" : "var(--color-ink-faint)",
            opacity: isActive ? 1 : 0,
            transform: isActive ? "translateX(0)" : "translateX(-6px)",
          }}
        >
          →
        </span>
      </button>
    </li>
  );
}
