"use client";

export function BackToTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      data-cursor="Top"
      className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-white/50 transition-colors duration-300 ease-out hover:text-white"
    >
      Back to Top
      <span className="transition-transform duration-300 ease-out group-hover:-translate-y-1">
        ↑
      </span>
    </button>
  );
}
