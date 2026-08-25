import { CORRIDORS } from "@/lib/poolmate/catalog";

export function HeroVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-brand text-brand-fg shadow-lift">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="100" height="100" fill="#e24e0c" />
        <path d="M-10 70 L40 48 L110 62 L110 100 L-10 100 Z" fill="#c2410c" opacity="0.55" />
        <path d="M-10 20 L60 8 L110 22 L110 0 L-10 0 Z" fill="#ff7a38" opacity="0.35" />
        <path
          d="M8 92 C 22 70, 30 58, 48 50 C 62 44, 74 30, 92 16"
          fill="none"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M14 96 C 26 74, 34 62, 52 54 C 66 48, 78 34, 96 20"
          fill="none"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
          opacity="0.45"
        />
        <circle cx="48" cy="50" r="3.2" fill="white" />
        <circle cx="92" cy="16" r="3.2" fill="white" opacity="0.85" />
      </svg>
      <div className="relative flex min-h-80 flex-col justify-between p-6 sm:min-h-96 sm:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-fg/70">
            Live corridors
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Lusaka is pooling right now.
          </h2>
        </div>
        <ul className="mt-8 space-y-2">
          {CORRIDORS.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between gap-3 rounded-xl bg-ink/15 px-3.5 py-3 backdrop-blur-sm"
            >
              <div>
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-xs text-brand-fg/70">
                  {c.from} → {c.to}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold tabular-nums">{c.pooling} pooling</p>
                <p className="text-xs text-brand-fg/70">{c.save}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
