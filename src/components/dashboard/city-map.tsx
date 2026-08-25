import { LOCATIONS, findLocation } from "@/lib/poolmate/catalog";
import { cn } from "@/lib/utils";

export function CityMap({
  pickup,
  dropoff,
  moving = false,
  className,
}: {
  pickup?: string;
  dropoff?: string;
  moving?: boolean;
  className?: string;
}) {
  const a = pickup ? findLocation(pickup) : undefined;
  const b = dropoff ? findLocation(dropoff) : undefined;
  const path =
    a && b
      ? `M ${a.x} ${a.y} C ${(a.x + b.x) / 2} ${a.y - 8}, ${(a.x + b.x) / 2} ${b.y + 8}, ${b.x} ${b.y}`
      : "";

  return (
    <div className={cn("relative h-full min-h-64 overflow-hidden bg-sand", className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="100" height="100" fill="#f3e0cc" />
        <rect x="38" y="42" width="18" height="16" rx="1" fill="#e8d2b8" />
        <rect x="62" y="30" width="22" height="14" rx="1" fill="#e8d2b8" />
        <rect x="24" y="28" width="14" height="12" rx="1" fill="#d9c4a8" />
        <path d="M 20 36 L 88 28" fill="none" stroke="#d6c0a4" strokeWidth="3.2" />
        <path d="M 36 90 L 48 48 L 86 16" fill="none" stroke="#cbb394" strokeWidth="4" />
        <path d="M 10 52 L 90 52" fill="none" stroke="#d6c0a4" strokeWidth="2.4" />
        <path d="M 40 95 L 40 20" fill="none" stroke="#d6c0a4" strokeWidth="2.2" />
        <path d="M 8 78 L 70 78 L 78 60" fill="none" stroke="#cbb394" strokeWidth="3" />
        <circle cx="46" cy="50" r="5.5" fill="#fff1e6" />
        <text x="46" y="51.5" textAnchor="middle" fontSize="3.2" fill="#78716c" fontFamily="Sora, sans-serif">
          CBD
        </text>
        <text x="78" y="14" textAnchor="middle" fontSize="2.8" fill="#78716c" fontFamily="Manrope, sans-serif">
          Airport
        </text>
        <text x="30" y="34" fontSize="2.6" fill="#78716c" fontFamily="Manrope, sans-serif">
          Matero
        </text>
        <text x="42" y="88" fontSize="2.6" fill="#78716c" fontFamily="Manrope, sans-serif">
          Kafue Rd
        </text>
        {path ? (
          <path d={path} fill="none" stroke="#f05a10" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="2 1.4" />
        ) : (
          <path
            d="M 40 78 C 42 60, 48 52, 64 40 C 72 34, 78 24, 82 18"
            fill="none"
            stroke="#f05a10"
            strokeWidth="1.4"
            opacity="0.55"
          />
        )}
        {LOCATIONS.map((l) => (
          <circle key={l.id} cx={l.x} cy={l.y} r="0.7" fill="#c4b09a" />
        ))}
        {a ? (
          <g>
            <circle cx={a.x} cy={a.y} r="2.4" fill="#1c1917" />
            <circle cx={a.x} cy={a.y} r="1.1" fill="#fffbf7" />
          </g>
        ) : null}
        {b ? (
          <g>
            <circle cx={b.x} cy={b.y} r="2.6" fill="#f05a10" />
            <circle cx={b.x} cy={b.y} r="1.1" fill="#fffbf7" />
          </g>
        ) : null}
      </svg>
      {moving && a && b ? (
        <div
          className="pointer-events-none absolute size-2.5 rounded-full bg-brand shadow-lift"
          style={{
            left: `${(a.x + b.x) / 2}%`,
            top: `${(a.y + b.y) / 2}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : null}
      <div className="pointer-events-none absolute left-4 top-4 rounded-lg bg-paper/90 px-3 py-1.5 text-xs font-medium text-ink shadow-card">
        Lusaka
      </div>
    </div>
  );
}
