import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { listDrivers, listPassengers } from "@/lib/firebase/store";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/people")({
  component: PeoplePage,
});

function PeoplePage() {
  const passengers = useMemo(() => listPassengers(), []);
  const drivers = useMemo(() => listDrivers(), []);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-2xl font-semibold tracking-tight">People</h1>
      <p className="mt-1 text-sm text-muted">
        Passengers and drivers saved when someone logs in and picks a role. Same collections as the
        HTML database page.
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-semibold">Passengers</h2>
            <Badge>{passengers.length}</Badge>
          </div>
          <ul className="mt-3 space-y-2">
            {passengers.length === 0 ? (
              <li className="rounded-2xl bg-cream px-4 py-8 text-center text-sm text-muted">
                No passengers yet. Create an account and choose Ride.
              </li>
            ) : (
              passengers.map((p) => (
                <li key={p.id} className="rounded-2xl bg-paper px-4 py-3 shadow-card">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-muted">
                    {p.email}
                    {p.area ? ` · ${p.area}` : ""}
                  </p>
                </li>
              ))
            )}
          </ul>
        </section>
        <section>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-semibold">Drivers</h2>
            <Badge>{drivers.length}</Badge>
          </div>
          <ul className="mt-3 space-y-2">
            {drivers.length === 0 ? (
              <li className="rounded-2xl bg-cream px-4 py-8 text-center text-sm text-muted">
                No drivers yet. Create an account and choose Drive.
              </li>
            ) : (
              drivers.map((d) => (
                <li key={d.id} className="rounded-2xl bg-paper px-4 py-3 shadow-card">
                  <p className="font-semibold">{d.name}</p>
                  <p className="text-xs text-muted">
                    {[d.vehicle, d.plate, d.status].filter(Boolean).join(" · ")}
                  </p>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
