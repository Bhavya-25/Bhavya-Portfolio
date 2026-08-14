import { aiTools } from "@/data/ai-tools";
import { AiToolIcon } from "./ai-tool-icon";

export function AiToolsRow() {
  return (
    <div className="flex flex-col items-start gap-4 border-t border-white/10 py-4 md:flex-row md:items-center md:justify-between">
      <p className="footer-ai-label font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">
        Powered by modern developer tools
      </p>

      <ul className="flex flex-wrap items-center gap-3">
        {aiTools.map((tool) => (
          <li key={tool.name} className="footer-ai-icon">
            <a
              href={tool.href}
              target="_blank"
              rel="noreferrer"
              aria-label={tool.name}
              data-cursor={tool.name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-[transform,color,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:rotate-6 hover:scale-110 hover:border-white/30 hover:text-white hover:shadow-[0_0_20px_-4px_rgba(255,122,66,0.5)]"
            >
              <span className="h-4 w-4">
                <AiToolIcon kind={tool.icon} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
