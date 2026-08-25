import { Link, Outlet, createFileRoute, Navigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  CarFront,
  Clock3,
  LayoutDashboard,
  Menu,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyProfile } from "@/lib/poolmate/api";
import { Logo } from "@/components/logo";
import { AccountSlot } from "@/components/account-menu";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

const NAV = [
  { to: "/dashboard", label: "Book", icon: LayoutDashboard },
  { to: "/dashboard/history", label: "Activity", icon: Clock3 },
  { to: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { to: "/drive", label: "Drive", icon: CarFront },
] as const;

function DashboardLayout() {
  const { user, isPending } = useCurrentUserState();
  const [open, setOpen] = useState(false);
  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(),
    enabled: Boolean(user),
  });

  if (isPending || (user && profile.isPending)) {
    return (
      <div className="grid min-h-dvh grid-cols-1 bg-paper md:grid-cols-[16rem_1fr]">
        <Skeleton className="hidden h-full md:block" />
        <Skeleton className="m-6 rounded-2xl" />
      </div>
    );
  }
  if (!user) return <RedirectToSignIn />;
  if (!profile.data?.role) return <Navigate to="/select-role" />;

  return (
    <div className="flex h-dvh overflow-hidden bg-paper">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-paper md:flex">
        <div className="flex h-16 items-center px-4">
          <Logo to="/dashboard" />
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-cream hover:text-ink [&.active]:bg-cream [&.active]:text-ink"
              activeOptions={{ exact: item.to === "/dashboard" }}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="px-5 pb-5 text-xs text-muted">Lusaka · live corridors</p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center justify-between gap-3 border-b border-line px-4">
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              className="grid size-11 place-items-center rounded-lg hover:bg-cream"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <Logo to="/dashboard" />
          </div>
          <p className="hidden text-sm font-medium text-ink-soft md:block">
            Good to go, {user.displayName?.split(" ")[0] ?? "there"}.
          </p>
          <AccountSlot />
        </header>
        {open ? (
          <div className="border-b border-line bg-paper px-3 py-2 md:hidden">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <Outlet />
        </div>
        <nav className="grid grid-cols-4 border-t border-line bg-paper md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex flex-col items-center gap-1 py-2.5 text-xs font-medium text-muted [&.active]:text-brand"
              activeOptions={{ exact: item.to === "/dashboard" }}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
