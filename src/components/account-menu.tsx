import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CarFront, LayoutDashboard, LogOut, UserRound } from "lucide-react";
import { signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

export function AccountSlot({ className }: { className?: string }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className={cn("size-9 animate-pulse rounded-full bg-sand", className)} />;
  }
  if (!user) {
    return (
      <Link
        to="/login"
        className={cn(
          "inline-flex h-11 items-center rounded-lg px-4 text-sm font-medium text-ink hover:bg-cream",
          className,
        )}
      >
        Log in
      </Link>
    );
  }
  return <SignedInChip className={className} />;
}

function SignedInChip({ className }: { className?: string }) {
  const { user } = useCurrentUserState();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  if (!user) return null;
  const label = user.displayName ?? user.primaryEmail ?? "Account";
  const initial = label.charAt(0).toUpperCase();

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 items-center gap-2 rounded-lg px-1.5 pr-3 hover:bg-cream"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt=""
            className="size-8 rounded-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
          />
        ) : (
          <span className="grid size-8 place-items-center rounded-full bg-brand text-xs font-semibold text-brand-fg">
            {initial}
          </span>
        )}
        <span className="hidden max-w-28 truncate text-sm font-medium sm:inline">{label}</span>
      </button>
      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            role="menu"
            className="absolute right-0 z-50 mt-1 w-52 overflow-hidden rounded-xl bg-paper py-1 shadow-lift"
          >
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-cream"
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard className="size-4 text-muted" />
              Dashboard
            </Link>
            <Link
              to="/drive"
              className="flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-cream"
              onClick={() => setOpen(false)}
            >
              <CarFront className="size-4 text-muted" />
              Drive
            </Link>
            <Link
              to="/select-role"
              className="flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-cream"
              onClick={() => setOpen(false)}
            >
              <UserRound className="size-4 text-muted" />
              Switch role
            </Link>
            <button
              type="button"
              disabled={signingOut}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-cream disabled:opacity-60"
              onClick={() => {
                setSigningOut(true);
                void signOut().catch(() => setSigningOut(false));
              }}
            >
              <LogOut className="size-4 text-muted" />
              {signingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
