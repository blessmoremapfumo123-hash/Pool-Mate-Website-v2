import { useMemo, useState } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Power } from "lucide-react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { createTrip, getMyProfile, listMyTrips, patchTrip } from "@/lib/poolmate/api";
import { DRIVER_JOBS, formatKw } from "@/lib/poolmate/catalog";
import { Logo } from "@/components/logo";
import { AccountSlot } from "@/components/account-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CityMap } from "@/components/dashboard/city-map";
import { cn } from "@/lib/utils";
import type { Trip } from "@/lib/poolmate/types";

export const Route = createFileRoute("/drive")({
  component: DrivePage,
});

function DrivePage() {
  const { user, isPending } = useCurrentUserState();
  const qc = useQueryClient();
  const [online, setOnline] = useState(true);
  const [active, setActive] = useState<Trip | null>(null);
  const [feed, setFeed] = useState(DRIVER_JOBS);

  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(),
    enabled: Boolean(user),
  });
  const trips = useQuery({
    queryKey: ["trips"],
    queryFn: () => listMyTrips(),
    enabled: Boolean(user),
  });

  const accept = useMutation({
    mutationFn: async (job: (typeof DRIVER_JOBS)[number]) => {
      const trip = await createTrip({
        data: {
          service: job.service,
          pickup: job.pickup,
          dropoff: job.dropoff,
          vehicleClass: job.vehicleClass,
          fare: job.fare,
          notes: "Driver job",
          payMethod: "mobile_money",
        },
      });
      const named = await patchTrip({
        data: {
          id: trip.id,
          status: "matched",
          driverName: user?.displayName ?? "You",
          driverVehicle: "Your vehicle",
        },
      });
      return named ?? trip;
    },
    onSuccess: (t) => {
      setActive(t);
      setFeed((f) => f.filter((j) => !(j.pickup === t.pickup && j.dropoff === t.dropoff)));
      void qc.invalidateQueries({ queryKey: ["trips"] });
    },
  });

  const finish = useMutation({
    mutationFn: (id: string) => patchTrip({ data: { id, status: "completed" } }),
    onSuccess: () => {
      setActive(null);
      void qc.invalidateQueries({ queryKey: ["trips"] });
    },
  });

  const earned = useMemo(
    () =>
      (trips.data ?? [])
        .filter((t) => t.status === "completed")
        .reduce((s, t) => s + t.fare, 0),
    [trips.data],
  );

  if (isPending || (user && profile.isPending)) {
    return (
      <main className="grid min-h-dvh place-items-center bg-paper p-6">
        <Skeleton className="h-80 w-full max-w-3xl rounded-2xl" />
      </main>
    );
  }
  if (!user) return <RedirectToSignIn />;
  if (!profile.data?.role) return <Navigate to="/select-role" />;

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-paper">
      <header className="flex h-16 items-center justify-between gap-3 border-b border-line px-4">
        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="grid size-11 place-items-center rounded-lg hover:bg-cream"
            aria-label="Back"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <Logo to="/" />
        </div>
        <AccountSlot />
      </header>

      <div className="mx-auto grid min-h-0 w-full max-w-6xl flex-1 gap-0 overflow-hidden lg:grid-cols-[22rem_1fr]">
        <section className="flex min-h-0 flex-col overflow-y-auto border-b border-line p-4 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand">Driver</p>
              <h1 className="font-display text-2xl font-semibold tracking-tight">Go online</h1>
            </div>
            <button
              type="button"
              onClick={() => setOnline((v) => !v)}
              className={cn(
                "inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold",
                online ? "bg-ok text-ok-fg" : "bg-cream text-ink-soft",
              )}
            >
              <Power className="size-4" />
              {online ? "Online" : "Offline"}
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-cream p-3">
              <p className="text-xs text-muted">Today</p>
              <p className="font-display text-xl font-semibold tabular-nums">{formatKw(earned)}</p>
            </div>
            <div className="rounded-xl bg-cream p-3">
              <p className="text-xs text-muted">Jobs done</p>
              <p className="font-display text-xl font-semibold tabular-nums">
                {trips.data?.filter((t) => t.status === "completed").length ?? 0}
              </p>
            </div>
          </div>

          {active ? (
            <div className="mt-5 rounded-2xl bg-ink p-4 text-brand-fg">
              <Badge variant="brand">Active job</Badge>
              <h2 className="mt-3 font-display text-lg font-semibold">{active.pickup}</h2>
              <p className="text-sm text-brand-fg/70">to {active.dropoff}</p>
              <p className="mt-3 font-display text-2xl font-semibold tabular-nums">
                {formatKw(active.fare)}
              </p>
              <Button
                className="mt-4 w-full"
                variant="cream"
                disabled={finish.isPending}
                onClick={() => finish.mutate(active.id)}
              >
                Complete trip
              </Button>
            </div>
          ) : null}

          <h2 className="mt-6 font-display text-sm font-semibold">Incoming</h2>
          <div className="mt-2 space-y-2">
            {!online ? (
              <p className="rounded-xl bg-cream px-4 py-6 text-center text-sm text-muted">
                You're offline. Go online to see corridor jobs.
              </p>
            ) : feed.length === 0 ? (
              <p className="rounded-xl bg-cream px-4 py-6 text-center text-sm text-muted">
                Quiet stretch. New jobs will land here.
              </p>
            ) : (
              feed.map((job) => (
                <article key={`${job.pickup}-${job.dropoff}`} className="rounded-xl bg-paper p-3 shadow-card">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                        {job.service} · {job.vehicleClass}
                      </p>
                      <p className="mt-1 text-sm font-semibold">{job.pickup}</p>
                      <p className="text-xs text-muted">to {job.dropoff}</p>
                    </div>
                    <p className="text-sm font-semibold tabular-nums">{formatKw(job.fare)}</p>
                  </div>
                  <Button
                    size="sm"
                    className="mt-3 w-full"
                    disabled={Boolean(active) || accept.isPending}
                    onClick={() => accept.mutate(job)}
                  >
                    Accept
                  </Button>
                </article>
              ))
            )}
          </div>
        </section>
        <div className="relative min-h-64">
          <CityMap
            pickup={active?.pickup ?? "Cairo Road, CBD"}
            dropoff={active?.dropoff ?? "Kenneth Kaunda Airport"}
            moving={Boolean(active)}
            className="absolute inset-0 h-full min-h-64"
          />
        </div>
      </div>
    </div>
  );
}
