import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { listMyTrips } from "@/lib/poolmate/api";
import { formatKw } from "@/lib/poolmate/catalog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/history")({
  component: HistoryPage,
});

function HistoryPage() {
  const trips = useQuery({ queryKey: ["trips"], queryFn: () => listMyTrips() });

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-2xl font-semibold tracking-tight">Activity</h1>
      <p className="mt-1 text-sm text-muted">Rides, cargo, food and parcels on your account.</p>
      <div className="mt-6 space-y-3">
        {trips.isPending ? (
          <>
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-24 rounded-2xl" />
          </>
        ) : null}
        {trips.data && trips.data.length === 0 ? (
          <div className="rounded-2xl bg-cream px-5 py-10 text-center">
            <p className="font-display text-lg font-semibold">No trips yet</p>
            <p className="mt-1 text-sm text-muted">Request a PoolMate from the Book tab.</p>
          </div>
        ) : null}
        {trips.data?.map((t) => (
          <article key={t.id} className="rounded-2xl bg-paper p-4 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">{t.service}</p>
                <h2 className="mt-1 font-display text-base font-semibold">{t.pickup}</h2>
                <p className="text-sm text-muted">to {t.dropoff}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold tabular-nums">{formatKw(t.fare)}</p>
                <Badge
                  variant={t.status === "completed" ? "ok" : t.status === "cancelled" ? "default" : "brand"}
                  className="mt-1 capitalize"
                >
                  {t.status}
                </Badge>
              </div>
            </div>
            <p className={cn("mt-3 text-xs text-muted")}>
              {t.vehicleClass}
              {t.driverName ? ` · ${t.driverName}` : ""}
              {" · "}
              {new Date(t.createdAt).toLocaleString()}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
