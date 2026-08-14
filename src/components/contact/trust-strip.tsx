const TRUST_ITEMS = [
  "50+ Projects Delivered",
  "15+ Happy Clients",
  "4+ Years Experience",
  "Top Rated Freelancer",
];

export function TrustStrip() {
  return (
    <ul className="trust-strip-item flex flex-wrap items-center gap-x-6 gap-y-3">
      {TRUST_ITEMS.map((item) => (
        <li
          key={item}
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-white/70"
        >
          <span className="text-[#ff7a42]">✔</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
