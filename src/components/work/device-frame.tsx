import Image from "next/image";

/**
 * Frames a project image in a browser-chrome (desktop/web categories) or
 * phone-chrome (Mobile category) mockup — a cheap, honest way to read as a
 * "device mockup" without fabricating real device photography.
 */
export function DeviceFrame({
  image,
  alt,
  kind,
  priority,
}: {
  image: string;
  alt: string;
  kind: "browser" | "phone";
  priority?: boolean;
}) {
  if (kind === "phone") {
    return (
      <div className="relative mx-auto aspect-[9/17.5] w-full max-w-[280px] overflow-hidden rounded-[2.25rem] border-[6px] border-[#171512] bg-[#171512] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.5)] dark:border-white/10">
        <span className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#171512] dark:bg-black/80" />
        <div className="relative h-full w-full overflow-hidden rounded-[1.75rem]">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            sizes="280px"
            priority={priority}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border-strong bg-surface-raised shadow-[0_30px_60px_-24px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-1.5 border-b border-border-strong bg-surface-raised px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded-full bg-surface px-3 py-1 text-center font-mono text-[10px] text-ink-faint">
          {alt}
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          sizes="(min-width: 1024px) 55vw, 92vw"
          priority={priority}
        />
      </div>
    </div>
  );
}
