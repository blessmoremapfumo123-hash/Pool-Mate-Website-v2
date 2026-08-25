import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { AccountSlot } from "@/components/account-menu";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#how", label: "How it works" },
  { href: "/#download", label: "Get the app" },
];

export function SiteHeader({ solid = false }: { solid?: boolean }) {
  const [open, setOpen] = useState(false);
  const { isPending } = useCurrentUserState();

  return (
    <header
      className={cn(
        "sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur-md",
        solid && "bg-paper",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-cream hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <AccountSlot />
          {!isPending ? (
            <SignedOut>
              <Button asChild size="sm" className="hidden sm:inline-flex">
                <Link to="/login">Get started</Link>
              </Button>
            </SignedOut>
          ) : null}
          <SignedIn>
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/dashboard">Open app</Link>
            </Button>
          </SignedIn>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg hover:bg-cream md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-line bg-paper px-4 py-3 md:hidden">
          <div className="flex flex-col">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              to="/login"
              className="rounded-lg px-3 py-3 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              Log in
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
