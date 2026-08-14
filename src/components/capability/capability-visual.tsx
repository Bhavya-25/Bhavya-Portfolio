import type { CapabilityVisualKind } from "@/data/capabilities";

// Large, distinct abstract compositions per capability — not screenshots,
// not logos. Each communicates its domain through form alone, using the
// site's existing ink/accent tokens.

function FullStackVisual() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full">
      <rect x="60" y="40" width="360" height="150" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      <rect x="60" y="40" width="360" height="34" rx="10" fill="currentColor" opacity="0.06" />
      <circle cx="80" cy="57" r="4" fill="currentColor" opacity="0.35" />
      <circle cx="95" cy="57" r="4" fill="currentColor" opacity="0.35" />
      <circle cx="110" cy="57" r="4" fill="currentColor" opacity="0.35" />
      <rect x="84" y="96" width="220" height="16" rx="4" className="fill-accent" opacity="0.85" />
      <rect x="84" y="122" width="280" height="10" rx="3" fill="currentColor" opacity="0.15" />
      <rect x="84" y="140" width="180" height="10" rx="3" fill="currentColor" opacity="0.15" />
      <line x1="240" y1="190" x2="240" y2="228" stroke="currentColor" strokeOpacity="0.25" />
      <rect x="100" y="228" width="280" height="34" rx="6" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      <rect x="100" y="272" width="280" height="34" rx="6" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      <circle cx="120" cy="245" r="4" className="fill-accent" opacity="0.7" />
      <circle cx="120" cy="289" r="4" fill="currentColor" opacity="0.35" />
      <rect x="140" y="238" width="160" height="7" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="140" y="282" width="120" height="7" rx="2" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

function UiUxVisual() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full">
      <rect x="50" y="50" width="180" height="130" rx="6" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      <circle cx="62" cy="62" r="3" fill="currentColor" opacity="0.3" />
      <line x1="66" y1="80" x2="214" y2="80" stroke="currentColor" strokeOpacity="0.15" />
      <rect x="66" y="94" width="80" height="50" rx="4" fill="currentColor" opacity="0.08" />
      <rect x="154" y="94" width="60" height="50" rx="4" className="fill-accent" opacity="0.2" stroke="currentColor" strokeOpacity="0.3" />
      <rect x="180" y="130" width="200" height="150" rx="6" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <rect x="196" y="150" width="100" height="12" rx="3" className="fill-accent" opacity="0.85" />
      <rect x="196" y="174" width="168" height="8" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="196" y="190" width="140" height="8" rx="2" fill="currentColor" opacity="0.15" />
      <rect x="196" y="222" width="70" height="26" rx="13" fill="currentColor" opacity="0.1" />
      <rect x="276" y="222" width="70" height="26" rx="13" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      <path d="M40 300 L60 280 L80 300" fill="none" stroke="currentColor" strokeOpacity="0.2" />
      <circle cx="400" cy="90" r="10" fill="none" stroke="currentColor" strokeOpacity="0.25" />
      <line x1="407" y1="97" x2="418" y2="108" stroke="currentColor" strokeOpacity="0.25" />
    </svg>
  );
}

function MobileVisual() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full">
      <rect x="150" y="40" width="130" height="260" rx="20" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <rect x="166" y="64" width="98" height="150" rx="6" fill="currentColor" opacity="0.08" />
      <rect x="166" y="222" width="98" height="18" rx="4" className="fill-accent" opacity="0.85" />
      <rect x="166" y="248" width="70" height="10" rx="3" fill="currentColor" opacity="0.15" />
      <rect x="166" y="264" width="50" height="10" rx="3" fill="currentColor" opacity="0.15" />
      <rect x="260" y="70" width="110" height="220" rx="18" fill="none" stroke="currentColor" strokeOpacity="0.2" />
      <rect x="274" y="90" width="82" height="120" rx="5" fill="currentColor" opacity="0.05" />
      <circle cx="315" cy="240" r="14" fill="none" stroke="currentColor" strokeOpacity="0.25" />
      <path d="M100 90 Q 130 170 150 250" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="4 6" />
    </svg>
  );
}

function CreativeVisual() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full">
      <polygon
        points="240,50 340,120 310,230 170,230 140,120"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      <line x1="240" y1="50" x2="240" y2="230" stroke="currentColor" strokeOpacity="0.15" />
      <line x1="140" y1="120" x2="340" y2="120" stroke="currentColor" strokeOpacity="0.15" />
      <line x1="170" y1="230" x2="310" y2="230" stroke="currentColor" strokeOpacity="0.15" />
      <circle cx="240" cy="50" r="5" className="fill-accent" />
      <circle cx="340" cy="120" r="5" className="fill-accent" opacity="0.75" />
      <circle cx="310" cy="230" r="5" className="fill-accent" opacity="0.55" />
      <circle cx="170" cy="230" r="5" fill="currentColor" opacity="0.3" />
      <circle cx="140" cy="120" r="5" fill="currentColor" opacity="0.3" />
      <circle cx="90" cy="90" r="3" className="fill-accent" opacity="0.4" />
      <circle cx="400" cy="80" r="3" className="fill-accent" opacity="0.4" />
      <circle cx="380" cy="270" r="3" fill="currentColor" opacity="0.3" />
      <circle cx="70" cy="250" r="3" fill="currentColor" opacity="0.3" />
      <path d="M60 300 Q 240 340 420 300" fill="none" stroke="currentColor" strokeOpacity="0.1" />
    </svg>
  );
}

function EcommerceVisual() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full">
      <rect x="60" y="50" width="110" height="110" rx="8" fill="currentColor" opacity="0.07" />
      <rect x="185" y="50" width="110" height="110" rx="8" className="fill-accent" opacity="0.85" />
      <rect x="310" y="50" width="110" height="110" rx="8" fill="currentColor" opacity="0.07" />
      <rect x="60" y="175" width="110" height="20" rx="4" fill="currentColor" opacity="0.12" />
      <rect x="185" y="175" width="110" height="20" rx="4" fill="currentColor" opacity="0.12" />
      <rect x="310" y="175" width="110" height="20" rx="4" fill="currentColor" opacity="0.12" />
      <path
        d="M110 240 h240 l-20 70 h-200 z"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.3"
      />
      <line x1="110" y1="240" x2="90" y2="220" stroke="currentColor" strokeOpacity="0.3" />
      <circle cx="160" cy="330" r="9" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="300" cy="330" r="9" fill="none" stroke="currentColor" strokeOpacity="0.35" />
    </svg>
  );
}

function CmsVisual() {
  return (
    <svg viewBox="0 0 480 360" className="h-full w-full">
      <rect x="60" y="60" width="160" height="70" rx="6" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      <rect x="60" y="150" width="160" height="70" rx="6" fill="none" stroke="currentColor" strokeOpacity="0.3" />
      <rect x="60" y="240" width="160" height="60" rx="6" className="fill-accent" opacity="0.85" />
      <line x1="220" y1="95" x2="290" y2="95" stroke="currentColor" strokeOpacity="0.25" />
      <line x1="220" y1="185" x2="290" y2="185" stroke="currentColor" strokeOpacity="0.25" />
      <line x1="220" y1="270" x2="290" y2="270" stroke="currentColor" strokeOpacity="0.25" />
      <line x1="290" y1="95" x2="290" y2="270" stroke="currentColor" strokeOpacity="0.25" />
      <circle cx="330" cy="95" r="16" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="330" cy="182" r="16" className="fill-accent" opacity="0.15" stroke="currentColor" strokeOpacity="0.35" />
      <circle cx="330" cy="270" r="16" fill="none" stroke="currentColor" strokeOpacity="0.35" />
      <line x1="346" y1="95" x2="400" y2="140" stroke="currentColor" strokeOpacity="0.15" />
      <line x1="346" y1="270" x2="400" y2="200" stroke="currentColor" strokeOpacity="0.15" />
      <circle cx="410" cy="170" r="6" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

const VISUALS: Record<CapabilityVisualKind, () => React.JSX.Element> = {
  "full-stack": FullStackVisual,
  "ui-ux": UiUxVisual,
  mobile: MobileVisual,
  creative: CreativeVisual,
  ecommerce: EcommerceVisual,
  cms: CmsVisual,
};

export function CapabilityVisual({ kind }: { kind: CapabilityVisualKind }) {
  const Visual = VISUALS[kind];
  return (
    <div className="text-ink">
      <Visual />
    </div>
  );
}
