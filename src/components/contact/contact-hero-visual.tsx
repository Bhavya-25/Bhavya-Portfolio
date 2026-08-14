// Abstract stand-in for a "workspace / product build" photo — a laptop
// running a code editor, a floating product-preview card, and a companion
// device, rendered in the site's existing abstract visual language rather
// than stock photography (see collaboration-visual.tsx for the same idea
// used elsewhere). Deliberately fixed to a dark palette regardless of site
// theme, the way a real photograph would read the same in light or dark UI.
export function ContactHeroVisual() {
  return (
    <svg
      viewBox="0 0 700 800"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="contact-visual-glow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ff7a42" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#ff7a42" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="contact-visual-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1c1712" />
          <stop offset="100%" stopColor="#0b0a09" />
        </linearGradient>
      </defs>

      <rect width="700" height="800" fill="url(#contact-visual-bg)" />
      <rect width="700" height="800" fill="url(#contact-visual-glow)" />

      {/* ambient grid dots */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 7 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={70 + col * 95}
            cy={70 + row * 95}
            r="1.4"
            fill="#f4f1ea"
            opacity="0.08"
          />
        ))
      )}

      {/* floating mobile device */}
      <g opacity="0.9">
        <rect x="86" y="470" width="108" height="196" rx="16" fill="#161411" stroke="#3a342b" />
        <rect x="98" y="492" width="84" height="140" rx="4" fill="#211d18" />
        <rect x="118" y="510" width="44" height="6" rx="3" fill="#ff7a42" opacity="0.8" />
        <rect x="118" y="524" width="60" height="5" rx="2.5" fill="#f4f1ea" opacity="0.18" />
        <rect x="118" y="536" width="50" height="5" rx="2.5" fill="#f4f1ea" opacity="0.18" />
        <rect x="118" y="556" width="60" height="40" rx="4" fill="#f4f1ea" opacity="0.06" />
      </g>

      {/* connecting line */}
      <path
        d="M194 540 C 260 500, 300 430, 360 400"
        fill="none"
        stroke="#f4f1ea"
        strokeOpacity="0.15"
        strokeDasharray="3 8"
      />

      {/* laptop base */}
      <path d="M180 686 L520 686 L560 726 L140 726 Z" fill="#171310" stroke="#3a342b" />
      <rect x="330" y="694" width="40" height="6" rx="3" fill="#3a342b" />

      {/* laptop screen */}
      <rect x="205" y="420" width="290" height="266" rx="14" fill="#161411" stroke="#3a342b" />
      <rect x="221" y="436" width="258" height="234" rx="6" fill="#100e0b" />

      {/* window controls */}
      <circle cx="236" cy="450" r="3" fill="#f4f1ea" opacity="0.25" />
      <circle cx="248" cy="450" r="3" fill="#f4f1ea" opacity="0.25" />
      <circle cx="260" cy="450" r="3" fill="#ff7a42" opacity="0.7" />

      {/* code lines */}
      <rect x="236" y="468" width="70" height="7" rx="3" fill="#ff7a42" opacity="0.85" />
      <rect x="236" y="484" width="120" height="6" rx="3" fill="#f4f1ea" opacity="0.22" />
      <rect x="252" y="498" width="150" height="6" rx="3" fill="#f4f1ea" opacity="0.14" />
      <rect x="252" y="512" width="96" height="6" rx="3" fill="#f4f1ea" opacity="0.14" />
      <rect x="236" y="528" width="60" height="6" rx="3" fill="#f4f1ea" opacity="0.22" />
      <rect x="252" y="542" width="170" height="6" rx="3" fill="#f4f1ea" opacity="0.14" />
      <rect x="252" y="556" width="110" height="6" rx="3" fill="#f4f1ea" opacity="0.14" />
      <rect x="236" y="572" width="90" height="6" rx="3" fill="#ff7a42" opacity="0.6" />
      <rect x="236" y="592" width="180" height="52" rx="6" fill="#f4f1ea" opacity="0.05" />

      {/* connecting line to product card */}
      <path
        d="M470 440 C 520 400, 540 340, 560 300"
        fill="none"
        stroke="#f4f1ea"
        strokeOpacity="0.15"
        strokeDasharray="3 8"
      />
      <circle cx="470" cy="440" r="4" fill="#ff7a42" />

      {/* floating product preview card */}
      <g>
        <rect x="404" y="146" width="230" height="164" rx="14" fill="#171310" stroke="#3a342b" />
        <rect x="420" y="164" width="90" height="9" rx="4" fill="#f4f1ea" opacity="0.75" />
        <rect x="420" y="182" width="140" height="6" rx="3" fill="#f4f1ea" opacity="0.16" />
        <rect x="420" y="204" width="198" height="72" rx="6" fill="#100e0b" />
        <polyline
          points="430,262 458,240 486,252 514,222 542,232 570,208 598,214"
          fill="none"
          stroke="#ff7a42"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <circle cx="600" cy="130" r="4" fill="#ff7a42" opacity="0.7" />
      <circle cx="130" cy="360" r="3" fill="#f4f1ea" opacity="0.3" />
      <circle cx="640" cy="420" r="3" fill="#f4f1ea" opacity="0.3" />
    </svg>
  );
}
