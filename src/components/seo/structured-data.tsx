/**
 * Emits a JSON-LD block. Server-rendered so crawlers see it in the initial
 * HTML. `data` is built by the helpers in `lib/seo.ts`.
 */
export function StructuredData({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Serialised server-side from our own typed helpers — no user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
