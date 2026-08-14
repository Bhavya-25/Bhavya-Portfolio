import Link from "next/link";
import { footerNavigation } from "@/data/footer-navigation";

export function FooterNavigation() {
  return (
    <div className="footer-col">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
        Navigation
      </p>
      <ul className="mt-3 flex flex-col gap-2">
        {footerNavigation.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/65 transition-colors duration-300 ease-out hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
