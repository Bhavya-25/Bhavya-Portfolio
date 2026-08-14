import { BackToTopButton } from "./back-to-top-button";

const YEAR = new Date().getFullYear();

export function FooterBottom() {
  return (
    <div className="footer-bottom-row flex flex-col items-center gap-4 py-3 text-center md:flex-row md:justify-between md:text-left">
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/35">
        © {YEAR} Bhavya Chawla. All Rights Reserved.
      </p>
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/35">
        Crafted with Next.js, GSAP &amp; Three.js
      </p>
      <BackToTopButton />
    </div>
  );
}
