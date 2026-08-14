export type FeatureIconKind = "thread" | "pen" | "layers" | "chat";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ThreadIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="5" cy="6" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="19" cy="18" r="1.6" fill="currentColor" stroke="none" />
      <path d="M5 6c0 6 14 4 14 12" />
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

function LayersIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="M3 13.5 12 18.5l9-5" />
      <path d="M3 16 12 21l9-5" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 5h16v11H9l-4 4V5Z" />
      <path d="M8 9.5h8M8 13h5" />
    </svg>
  );
}

const ICONS: Record<FeatureIconKind, () => React.JSX.Element> = {
  thread: ThreadIcon,
  pen: PenIcon,
  layers: LayersIcon,
  chat: ChatIcon,
};

export function FeatureIcon({ kind }: { kind: FeatureIconKind }) {
  const Icon = ICONS[kind];
  return <Icon />;
}
