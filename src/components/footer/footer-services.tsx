import { footerServices } from "@/data/footer-services";

export function FooterServices() {
  return (
    <div className="footer-col">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
        Services
      </p>
      <ul className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2">
        {footerServices.map((service) => (
          <li key={service} className="text-sm text-white/65">
            {service}
          </li>
        ))}
      </ul>
    </div>
  );
}
