// Abstract stand-in for a "collaboration / planning" photo — laptop with an
// interface mockup, surrounded by loose planning notes and connecting
// lines. Not a stock photo: consistent with the abstract visual language
// used everywhere else on the site (Hero, Technology, Capabilities).
export function CollaborationVisual() {
  return (
    <svg viewBox="0 0 600 400" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <rect
        x="90"
        y="90"
        width="60"
        height="60"
        rx="8"
        fill="currentColor"
        opacity="0.08"
        transform="rotate(-8 120 120)"
      />
      <rect
        x="450"
        y="80"
        width="60"
        height="60"
        rx="8"
        className="fill-accent"
        opacity="0.18"
        transform="rotate(6 480 110)"
      />
      <rect
        x="440"
        y="230"
        width="70"
        height="50"
        rx="8"
        fill="currentColor"
        opacity="0.08"
        transform="rotate(-4 475 255)"
      />

      <line
        x1="150"
        y1="120"
        x2="200"
        y2="178"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeDasharray="4 6"
      />
      <line
        x1="450"
        y1="110"
        x2="400"
        y2="178"
        stroke="currentColor"
        strokeOpacity="0.2"
        strokeDasharray="4 6"
      />
      <circle cx="120" cy="120" r="3" className="fill-accent" opacity="0.7" />
      <circle cx="480" cy="255" r="3" fill="currentColor" opacity="0.35" />

      <rect x="180" y="140" width="240" height="150" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.4" />
      <rect x="196" y="156" width="208" height="100" rx="4" fill="currentColor" opacity="0.06" />
      <rect x="210" y="172" width="120" height="10" rx="3" className="fill-accent" opacity="0.85" />
      <rect x="210" y="190" width="160" height="7" rx="2" fill="currentColor" opacity="0.18" />
      <rect x="210" y="204" width="130" height="7" rx="2" fill="currentColor" opacity="0.18" />
      <rect x="210" y="222" width="90" height="7" rx="2" fill="currentColor" opacity="0.18" />
      <path d="M158 290 h284 l16 22 h-316 z" fill="none" stroke="currentColor" strokeOpacity="0.35" />
    </svg>
  );
}
