import { services } from "@/data/services";
import { ServiceIcon } from "./service-icon";

function Badge({ title, icon }: { title: string; icon: (typeof services)[number]["icon"] }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 backdrop-blur-sm transition-[transform,background-color] duration-300 ease-out hover:scale-105 hover:bg-white/10">
      <span className="h-4 w-4 shrink-0 text-white/70">
        <ServiceIcon kind={icon} />
      </span>
      <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-white/85">
        {title}
      </span>
    </div>
  );
}

export function ServiceMarquee() {
  return (
    <div
      className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max items-center gap-3">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-3 pr-3">
            {services.map((service, i) => (
              <Badge key={`${copy}-${service.title}-${i}`} title={service.title} icon={service.icon} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
