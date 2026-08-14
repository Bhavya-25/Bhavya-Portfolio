import { Button } from "@/components/ui/button";

export function FooterContact() {
  return (
    <div className="footer-col">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
        Contact
      </p>

      <div className="mt-3 flex flex-col gap-2">
        <a
          href="mailto:bhavvyawork@gmail.com"
          className="text-sm text-white/65 transition-colors duration-300 ease-out hover:text-white"
        >
          bhavvyawork@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/bhavya-chawla-4396661a5/"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-white/65 transition-colors duration-300 ease-out hover:text-white"
        >
          LinkedIn
        </a>
        <a
          href="https://www.upwork.com/freelancers/~01148682312bc485f3?mp_source=share"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-white/65 transition-colors duration-300 ease-out hover:text-white"
        >
          Upwork
        </a>
      </div>

      <div className="mt-3 flex flex-col gap-1.5 border-t border-white/10 pt-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">
          India
        </p>
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-white/40">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff7a42] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ff7a42]" />
          </span>
          Available for Selected Projects
        </p>
      </div>

      <Button href="#contact" dataCursor="Book" variant="inverse-outline" className="mt-3">
        Book a Call
      </Button>
    </div>
  );
}
