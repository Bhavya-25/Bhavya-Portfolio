import { socialLinks } from "@/data/social-links";
import { SocialIcon } from "./social-icon";

export function SocialLinks() {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-4 border-t border-white/10 py-4">
      {socialLinks.map((social) => (
        <li key={social.label} className="footer-social-icon">
          <a
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel={social.href.startsWith("http") ? "noreferrer" : undefined}
            aria-label={social.label}
            data-cursor={social.label}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-white/60 backdrop-blur-sm transition-[transform,color,border-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-white/30 hover:text-white hover:shadow-[0_12px_28px_-12px_rgba(255,122,66,0.45)]"
          >
            <span className="h-5 w-5 transition-transform duration-300 ease-out group-hover:scale-110">
              <SocialIcon kind={social.icon} />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
