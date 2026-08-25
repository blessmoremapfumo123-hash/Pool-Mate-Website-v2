import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("size-9", className)}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="currentColor" />
      <path
        d="M10 26c6-1 8-8 10-14"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M16 28c6-1 9-8 11-14"
        fill="none"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="20" cy="12" r="2.1" fill="white" />
      <circle cx="27" cy="14" r="2.1" fill="white" opacity="0.7" />
    </svg>
  );
}

export function Logo({
  className,
  to = "/",
  light = false,
}: {
  className?: string;
  to?: string;
  light?: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "inline-flex items-center gap-2.5 text-ink no-underline",
        light && "text-brand-fg",
        className,
      )}
    >
      <LogoMark className={light ? "text-brand-fg" : "text-brand"} />
      <span className="font-display text-lg font-semibold tracking-tight">PoolMate</span>
    </Link>
  );
}
