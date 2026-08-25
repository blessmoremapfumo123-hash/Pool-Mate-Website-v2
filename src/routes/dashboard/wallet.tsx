import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Banknote, Smartphone, WalletCards } from "lucide-react";
import { listMyTrips } from "@/lib/poolmate/api";
import { formatKw } from "@/lib/poolmate/catalog";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/dashboard/wallet")({
  component: WalletPage,
});

function WalletPage() {
  const trips = useQuery({ queryKey: ["trips"], queryFn: () => listMyTrips() });
  const completed = trips.data?.filter((t) => t.status === "completed") ?? [];
  const spent = completed.reduce((s, t) => s + t.fare, 0);
  const saved = Math.round(spent * 0.32);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Wallet</h1>
      <p className="mt-1 text-sm text-muted">Local pay, locked fares, corridor savings.</p>

      {trips.isPending ? (
        <Skeleton className="mt-6 h-36 rounded-2xl" />
      ) : (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <article className="rounded-2xl bg-ink p-5 text-brand-fg">
            <p className="text-xs font-medium text-brand-fg/70">Spent on completed trips</p>
            <p className="mt-2 font-display text-3xl font-semibold tabular-nums">{formatKw(spent)}</p>
          </article>
          <article className="rounded-2xl bg-cream p-5">
            <p className="text-xs font-medium text-muted">Estimated corridor savings</p>
            <p className="mt-2 font-display text-3xl font-semibold tabular-nums text-brand">
              {formatKw(saved)}
            </p>
            <p className="mt-1 text-xs text-muted">vs street-hail on the same stretches</p>
          </article>
        </div>
      )}

      <h2 className="mt-10 font-display text-lg font-semibold">Payment methods</h2>
      <ul className="mt-3 space-y-2">
        <li className="flex items-center gap-3 rounded-xl bg-paper px-4 py-3 shadow-card">
          <Smartphone className="size-4 text-brand" />
          <div>
            <p className="text-sm font-semibold">Airtel Money</p>
            <p className="text-xs text-muted">Default · Lusaka</p>
          </div>
        </li>
        <li className="flex items-center gap-3 rounded-xl bg-paper px-4 py-3 shadow-card">
          <WalletCards className="size-4 text-brand" />
          <div>
            <p className="text-sm font-semibold">MTN MoMo</p>
            <p className="text-xs text-muted">Linked</p>
          </div>
        </li>
        <li className="flex items-center gap-3 rounded-xl bg-paper px-4 py-3 shadow-card">
          <Banknote className="size-4 text-brand" />
          <div>
            <p className="text-sm font-semibold">Cash</p>
            <p className="text-xs text-muted">Pay the driver at drop-off</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
