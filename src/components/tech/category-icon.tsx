import type { TechCategoryId } from "@/data/technologies";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function CodeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M9 6 4 12l5 6M15 6l5 6-5 6" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="M3 13.5 12 18.5l9-5" />
      <path d="M3 16 12 21l9-5" />
    </svg>
  );
}

function AtomIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M10.5 18.5h3" />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 20l1-4.5L15.5 5A2.1 2.1 0 0 1 18.5 8L8 18.5 4 20Z" />
      <path d="M13.5 6.5l4 4" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

const ICONS: Record<TechCategoryId, () => React.JSX.Element> = {
  frontend: CodeIcon,
  backend: LayersIcon,
  creative: AtomIcon,
  mobile: PhoneIcon,
  design: PenIcon,
  cms: BagIcon,
};

export function CategoryIcon({ categoryId }: { categoryId: TechCategoryId }) {
  const Icon = ICONS[categoryId];
  return <Icon />;
}
