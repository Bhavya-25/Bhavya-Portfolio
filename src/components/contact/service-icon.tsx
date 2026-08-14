export type ServiceIconKind =
  | "code"
  | "design"
  | "mobile"
  | "three-d"
  | "motion"
  | "commerce"
  | "cms"
  | "api"
  | "gauge"
  | "search";

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

function DesignIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4a8 8 0 0 0 0 16 4 4 0 0 0 0-8 2 2 0 0 1 0-4" />
    </svg>
  );
}

function MobileIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

function ThreeDIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </svg>
  );
}

function MotionIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3 12c2-5 4-5 6 0s4 5 6 0 4-5 6 0" />
    </svg>
  );
}

function CommerceIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
      <path d="M8.5 8V6a3.5 3.5 0 0 1 7 0v2" />
    </svg>
  );
}

function CmsIcon() {
  return (
    <svg {...ICON_PROPS}>
      <ellipse cx="12" cy="6" rx="7" ry="2.5" />
      <path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" />
      <path d="M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
    </svg>
  );
}

function ApiIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3" y="9" width="6" height="6" rx="1.5" />
      <rect x="15" y="9" width="6" height="6" rx="1.5" />
      <path d="M9 12h6" />
    </svg>
  );
}

function GaugeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 15a8 8 0 1 1 16 0" />
      <path d="M12 15 16 9" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.8-4.8" />
    </svg>
  );
}

const ICONS: Record<ServiceIconKind, () => React.JSX.Element> = {
  code: CodeIcon,
  design: DesignIcon,
  mobile: MobileIcon,
  "three-d": ThreeDIcon,
  motion: MotionIcon,
  commerce: CommerceIcon,
  cms: CmsIcon,
  api: ApiIcon,
  gauge: GaugeIcon,
  search: SearchIcon,
};

export function ServiceIcon({ kind }: { kind: ServiceIconKind }) {
  const Icon = ICONS[kind];
  return <Icon />;
}
