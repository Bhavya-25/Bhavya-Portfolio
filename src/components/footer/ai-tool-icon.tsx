export type AiToolIconKind =
  | "chatgpt"
  | "claude"
  | "cursor"
  | "copilot"
  | "vercel"
  | "openrouter"
  | "windsurf"
  | "bolt"
  | "v0"
  | "figma"
  | "vscode"
  | "postman"
  | "github";

const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Abstract pictograms standing in for each tool — not brand marks — kept in
// the same house icon style as the rest of the site.

function ChatgptIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M4 6h13a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H9l-4 3v-3H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
      <path d="M8 11.5h8M8 14.2h5" />
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 3.5 13.6 9l5.4 1.6-5.4 1.6L12 17.7l-1.6-5.5L5 10.6 10.4 9Z" />
    </svg>
  );
}

function CursorIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M6 4.5 18 12l-5.2 1.2L11 19Z" />
    </svg>
  );
}

function CopilotIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 4c-3.5 0-6 2.3-6 5.5 0 1.6.7 2.7 1.5 3.7L6 17h3l1-2h4l1 2h3l-1.5-3.8c.8-1 1.5-2.1 1.5-3.7C18 6.3 15.5 4 12 4Z" />
      <circle cx="9.7" cy="9.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.3" cy="9.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function VercelIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 5 20 19H4Z" />
    </svg>
  );
}

function OpenrouterIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="5.5" cy="6" r="1.8" />
      <circle cx="18.5" cy="6" r="1.8" />
      <circle cx="12" cy="18" r="1.8" />
      <path d="M7.1 7.1 10.5 16.3M16.9 7.1 13.5 16.3M7.3 6h9.4" />
    </svg>
  );
}

function WindsurfIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 4v11" />
      <path d="M12 4c3.5 1 5.5 3.6 5.5 7.2-1.8.8-4-.1-5.5-2.2" />
      <path d="M4 18.5c2.4-1.6 5.2-2 8-2s5.6.4 8 2" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M13 3 5 13.5h5.5L11 21l8-10.5h-5.5Z" />
    </svg>
  );
}

function V0Icon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M6 8v3.5c0 2.5 1.4 4.5 3 4.5s3-2 3-4.5V8" />
      <path d="M15 8l1.6 8L18 12l1.4 4L21 8" />
    </svg>
  );
}

function FigmaIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M9 3h4a3 3 0 0 1 0 6H9Z" />
      <path d="M9 9h4a3 3 0 0 1 0 6H9Z" />
      <path d="M9 15h4a3 3 0 1 1-3 3v-3Z" />
      <path d="M9 3a3 3 0 0 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

function VscodeIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M16.5 3.5 8 10.5 4.5 8 3 9l4 4-4 4 1.5 1 3.5-2.5 8.5 7 3.5-1.7V5.2Z" />
      <path d="M16.5 3.5v17" />
    </svg>
  );
}

function PostmanIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="8" />
      <path d="m14.5 9.5-5 5M15 14l1.5 1.5M9.5 9 8 7.5" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M9 19c-4 1.2-4-2-5.5-2.5M17 22v-2.9c0-.8-.3-1.5-.7-2 2.5-.3 5-1.5 5-5.7 0-1.2-.5-2.2-1.2-3 .1-.3.5-1.5-.1-3.2 0 0-1-.3-3.2 1.2a11 11 0 0 0-5.6 0C9 5 8 5.3 8 5.3c-.6 1.7-.2 2.9-.1 3.2A4.6 4.6 0 0 0 6.7 11.5c0 4.1 2.5 5.4 5 5.7-.3.4-.6 1-.7 1.8-.6.3-2.2.8-3.2-1-.6-1-1.6-1.1-1.6-1.1" />
    </svg>
  );
}

const ICONS: Record<AiToolIconKind, () => React.JSX.Element> = {
  chatgpt: ChatgptIcon,
  claude: ClaudeIcon,
  cursor: CursorIcon,
  copilot: CopilotIcon,
  vercel: VercelIcon,
  openrouter: OpenrouterIcon,
  windsurf: WindsurfIcon,
  bolt: BoltIcon,
  v0: V0Icon,
  figma: FigmaIcon,
  vscode: VscodeIcon,
  postman: PostmanIcon,
  github: GithubIcon,
};

export function AiToolIcon({ kind }: { kind: AiToolIconKind }) {
  const Icon = ICONS[kind];
  return <Icon />;
}
