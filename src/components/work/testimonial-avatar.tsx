// Abstract initials avatar — the site doesn't have (and won't fabricate)
// real client photography, so identity is represented the same honest way
// products like Linear or GitHub show a user with no profile photo: a
// deterministic gradient with initials, not a synthetic face.

function hueFromName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % 360;
  }
  return hash;
}

function initialsFromName(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TestimonialAvatar({
  name,
  size = 64,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const hue = hueFromName(name);

  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-display font-medium text-white ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background: `linear-gradient(135deg, hsl(${hue} 70% 42%), hsl(${(hue + 40) % 360} 70% 30%))`,
      }}
    >
      {initialsFromName(name)}
    </div>
  );
}
