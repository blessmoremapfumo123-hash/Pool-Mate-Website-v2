import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookingPanel } from "@/components/dashboard/booking-panel";
import { CityMap } from "@/components/dashboard/city-map";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const [pickup, setPickup] = useState<string | undefined>();
  const [dropoff, setDropoff] = useState<string | undefined>();
  const [moving, setMoving] = useState(false);

  const onRouteChange = useCallback((p?: string, d?: string, m?: boolean) => {
    setPickup(p);
    setDropoff(d);
    setMoving(Boolean(m));
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col-reverse overflow-hidden lg:flex-row">
      <div className="flex min-h-0 w-full flex-col overflow-y-auto border-t border-line bg-paper p-4 lg:max-w-md lg:border-r lg:border-t-0 lg:p-5">
        <BookingPanel onRouteChange={onRouteChange} />
      </div>
      <div className="relative min-h-56 w-full flex-1">
        <CityMap
          pickup={pickup}
          dropoff={dropoff}
          moving={moving}
          className="absolute inset-0 h-full min-h-56"
        />
      </div>
    </div>
  );
}
