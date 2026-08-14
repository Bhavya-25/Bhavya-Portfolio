import type { PlatformIconKind } from "@/data/review-platforms";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Abstract pictograms, not literal brand marks — consistent with
// social-icon.tsx elsewhere in the codebase.

function UpworkMark() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M5 20V9M5 13.5c0 3 1.8 5 4.5 5s4.5-2 4.5-5V9" />
      <path d="M14 20l1.6-6.2a3.4 3.4 0 1 1 3.3 4.2c-1.3 0-2.4-.6-3.1-1.6" />
    </svg>
  );
}

function LinkedinMark() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="7" cy="7" r="1.8" />
      <path d="M7 11v8M12 19v-5.5c0-1.7 1.1-2.7 2.6-2.7 1.4 0 2.4 1 2.4 2.7V19" />
    </svg>
  );
}

function ClutchMark() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
      <path d="m9 12.5 2 2 4-4.5" />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

export function PlatformIcon({ kind }: { kind: PlatformIconKind }) {
  switch (kind) {
    case "upwork":
      return <UpworkMark />;
    case "linkedin":
      return <LinkedinMark />;
    case "clutch":
      return <ClutchMark />;
    case "google":
      return <GoogleMark />;
  }
}
