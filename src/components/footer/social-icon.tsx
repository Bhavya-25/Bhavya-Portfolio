export type SocialIconKind =
  | "github"
  | "linkedin"
  | "upwork"
  | "instagram"
  | "twitter"
  | "dribbble"
  | "behance"
  | "medium"
  | "youtube"
  | "email";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Deliberately abstract pictograms rather than literal brand marks — kept
// consistent with the site's existing icon language (see service-icon.tsx,
// feature-icon.tsx), which avoids reproducing external logos.

function GithubIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="4" y="6" width="16" height="12" rx="3" />
      <path d="M9 18v-2.2c-1.6.3-2.3-.5-2.3-2.3S8 11.5 9 11.5M15 18v-2.2c1.6.3 2.3-.5 2.3-2.3S15 11.5 15 11.5" />
      <path d="M9 13h6" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="7" cy="7" r="1.8" />
      <path d="M7 11v8M12 19v-5.5c0-1.7 1.1-2.7 2.6-2.7 1.4 0 2.4 1 2.4 2.7V19" />
    </svg>
  );
}

function UpworkIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M5 20V9M5 13.5c0 3 1.8 5 4.5 5s4.5-2 4.5-5V9" />
      <path d="M14 20l1.6-6.2a3.4 3.4 0 1 1 3.3 4.2c-1.3 0-2.4-.6-3.1-1.6" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.3" cy="7.7" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

function DribbbleIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="8" />
      <path d="M5 9.5c3 1 10 1 13.5-.5M4.7 15c4-1.5 9-.6 12 2M9 4.2c2.5 3 4 7 4 11.8" />
    </svg>
  );
}

function BehanceIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3.5" y="9" width="8" height="7" rx="2" />
      <path d="M3.5 12.3h8M13.5 15a3 3 0 0 0 6 .3M13.5 12.5a2.8 2.8 0 0 1 5.6-.3c.06.35.07.6.06.8h-5.66Z" />
      <path d="M14 6.5h5" />
    </svg>
  );
}

function MediumIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 6v12M9 6l4 6.2L9 18M9 6h5M9 18h5M18 6v12M14 6l4 12" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3.5" y="6.5" width="17" height="11" rx="3.5" />
      <path d="M10.5 9.8v4.4l4-2.2Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg {...ICON_PROPS}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="3" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </svg>
  );
}

const ICONS: Record<SocialIconKind, () => React.JSX.Element> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  upwork: UpworkIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  dribbble: DribbbleIcon,
  behance: BehanceIcon,
  medium: MediumIcon,
  youtube: YoutubeIcon,
  email: EmailIcon,
};

export function SocialIcon({ kind }: { kind: SocialIconKind }) {
  const Icon = ICONS[kind];
  return <Icon />;
}
