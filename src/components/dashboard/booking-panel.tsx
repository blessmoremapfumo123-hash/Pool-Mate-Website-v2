import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  Banknote,
  Bike,
  Check,
  Clock,
  Package,
  Phone,
  ShieldCheck,
  Truck,
  UtensilsCrossed,
  WalletCards,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  CARGO_CLASSES,
  DELIVERY_CLASSES,
  RESTAURANTS,
  RIDE_CLASSES,
  classesFor,
  formatKw,
  pickDriver,
  quoteFare,
  suggestLocations,
} from "@/lib/poolmate/catalog";
import { createTrip, patchTrip } from "@/lib/poolmate/api";
import type { PayMethod, ServiceId, Trip } from "@/lib/poolmate/types";
import { cn } from "@/lib/utils";

const SERVICE_ICONS = {
  rides: Bike,
  cargo: Truck,
  food: UtensilsCrossed,
  delivery: Package,
} as const;

type Draft = {
  service: ServiceId;
  pickup: string;
  dropoff: string;
};

function readDraft(): Draft | null {
  try {
    const raw = sessionStorage.getItem("pm.draft");
    if (!raw) return null;
    const v = JSON.parse(raw) as Draft;
    if (!v || !v.service) return null;
    return v;
  } catch {
    return null;
  }
}

export function BookingPanel({
  onRouteChange,
}: {
  onRouteChange: (pickup?: string, dropoff?: string, moving?: boolean) => void;
}) {
  const draft = useMemo(() => (typeof window === "undefined" ? null : readDraft()), []);
  const [service, setService] = useState<ServiceId>(draft?.service ?? "rides");
  const [pickup, setPickup] = useState(draft?.pickup ?? "");
  const [dropoff, setDropoff] = useState(draft?.dropoff ?? "");
  const [klass, setKlass] = useState("pool");
  const [pay, setPay] = useState<PayMethod>("mobile_money");
  const [notes, setNotes] = useState("");
  const [foodIds, setFoodIds] = useState<string[]>([]);
  const [restaurant, setRestaurant] = useState<string | null>(null);
  const [trip, setTrip] = useState<Trip | null>(null);
  const [focus, setFocus] = useState<"pickup" | "dropoff" | null>(null);
  const qc = useQueryClient();

  const classes =
    service === "food"
      ? []
      : service === "cargo"
        ? CARGO_CLASSES
        : service === "delivery"
          ? DELIVERY_CLASSES
          : RIDE_CLASSES;

  useEffect(() => {
    const first = classesFor(service)[0]?.id;
    if (first) setKlass(first);
    if (service !== "food") {
      setRestaurant(null);
      setFoodIds([]);
    }
  }, [service]);

  useEffect(() => {
    onRouteChange(pickup || undefined, dropoff || undefined, Boolean(trip && trip.status !== "completed"));
  }, [pickup, dropoff, trip, onRouteChange]);

  const rest = RESTAURANTS.find((r) => r.id === restaurant);
  const foodTotal = rest
    ? rest.items.filter((i) => foodIds.includes(i.id)).reduce((s, i) => s + i.price, 0) + 25
    : 0;

  const selectedClass = classes.find((c) => c.id === klass) ?? classes[0];
  const fare =
    service === "food"
      ? foodTotal
      : selectedClass && pickup && dropoff
        ? quoteFare(selectedClass, pickup, dropoff)
        : selectedClass?.min ?? 0;

  const pickupHints = focus === "pickup" ? suggestLocations(pickup, dropoff) : [];
  const dropHints = focus === "dropoff" ? suggestLocations(dropoff, pickup) : [];

  const create = useMutation({
    mutationFn: () =>
      createTrip({
        data: {
          service,
          pickup: service === "food" ? (rest?.name ?? pickup) : pickup,
          dropoff,
          vehicleClass: service === "food" ? "Food" : selectedClass?.name ?? "Economy",
          fare,
          notes: notes || (service === "food" ? foodIds.join(",") : undefined),
          payMethod: pay,
        },
      }),
    onSuccess: (t) => {
      setTrip(t);
      try {
        sessionStorage.removeItem("pm.draft");
      } catch {
        /* ignore */
      }
      void qc.invalidateQueries({ queryKey: ["trips"] });
      toast("Request sent. Finding a PoolMate…");
    },
    onError: () => toast("Could not create the request. Try again."),
  });

  const patch = useMutation({
    mutationFn: (input: {
      id: string;
      status: Trip["status"];
      driverName?: string;
      driverVehicle?: string;
    }) => patchTrip({ data: input }),
    onSuccess: (t) => {
      if (t) setTrip(t);
      void qc.invalidateQueries({ queryKey: ["trips"] });
    },
  });

  useEffect(() => {
    if (!trip || trip.status === "completed" || trip.status === "cancelled") return;
    const driver = pickDriver(trip.id.charCodeAt(0));
    const timers: number[] = [];
    if (trip.status === "requested") {
      timers.push(
        window.setTimeout(() => {
          patch.mutate({
            id: trip.id,
            status: "matched",
            driverName: driver.name,
            driverVehicle: driver.vehicle,
          });
        }, 1600),
      );
    }
    if (trip.status === "matched") {
      timers.push(
        window.setTimeout(() => {
          patch.mutate({ id: trip.id, status: "enroute" });
        }, 2800),
      );
    }
    if (trip.status === "enroute") {
      timers.push(
        window.setTimeout(() => {
          patch.mutate({ id: trip.id, status: "arrived" });
        }, 3200),
      );
    }
    return () => timers.forEach((id) => window.clearTimeout(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- drive the status machine off trip.status only
  }, [trip?.id, trip?.status]);

  const canRequest =
    service === "food"
      ? Boolean(rest && foodIds.length && dropoff && fare > 0)
      : Boolean(pickup && dropoff && selectedClass);

  if (trip) {
    return (
      <LiveTrip
        trip={trip}
        onCancel={() => {
          patch.mutate({ id: trip.id, status: "cancelled" });
          setTrip(null);
        }}
        onComplete={() => {
          patch.mutate({ id: trip.id, status: "completed" });
        }}
        onNew={() => setTrip(null)}
      />
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="grid grid-cols-4 gap-1 rounded-xl bg-cream p-1">
        {(["rides", "cargo", "food", "delivery"] as ServiceId[]).map((id) => {
          const Icon = SERVICE_ICONS[id];
          const on = service === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setService(id)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg py-2.5 text-xs font-semibold capitalize",
                on ? "bg-paper text-ink shadow-card" : "text-ink-soft hover:text-ink",
              )}
            >
              <Icon className={cn("size-4", on ? "text-brand" : "text-muted")} />
              {id}
            </button>
          );
        })}
      </div>

      <div className="mt-4 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
        {service === "food" ? (
          <FoodPicker
            restaurant={restaurant}
            setRestaurant={(id) => {
              setRestaurant(id);
              const r = RESTAURANTS.find((x) => x.id === id);
              if (r) setPickup(r.area);
            }}
            foodIds={foodIds}
            setFoodIds={setFoodIds}
          />
        ) : (
          <>
            <PlaceField
              label="Pickup"
              value={pickup}
              onChange={setPickup}
              hints={pickupHints.map((l) => l.name)}
              focus={focus === "pickup"}
              onFocus={() => setFocus("pickup")}
              onBlur={() => setTimeout(() => setFocus((f) => (f === "pickup" ? null : f)), 120)}
              onPick={(v) => {
                setPickup(v);
                setFocus(null);
              }}
              placeholder="Cairo Road, CBD"
              dot="brand"
            />
            <PlaceField
              label="Where to"
              value={dropoff}
              onChange={setDropoff}
              hints={dropHints.map((l) => l.name)}
              focus={focus === "dropoff"}
              onFocus={() => setFocus("dropoff")}
              onBlur={() => setTimeout(() => setFocus((f) => (f === "dropoff" ? null : f)), 120)}
              onPick={(v) => {
                setDropoff(v);
                setFocus(null);
              }}
              placeholder="Kenneth Kaunda Airport"
              dot="ink"
            />
          </>
        )}

        {service === "food" ? (
          <PlaceField
            label="Deliver to"
            value={dropoff}
            onChange={setDropoff}
            hints={dropHints.map((l) => l.name)}
            focus={focus === "dropoff"}
            onFocus={() => setFocus("dropoff")}
            onBlur={() => setTimeout(() => setFocus((f) => (f === "dropoff" ? null : f)), 120)}
            onPick={(v) => {
              setDropoff(v);
              setFocus(null);
            }}
            placeholder="Woodlands, Kabulonga…"
            dot="ink"
          />
        ) : null}

        {service !== "food" && selectedClass ? (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted">Choose a class</p>
            {classes.map((c) => {
              const on = c.id === klass;
              const q = pickup && dropoff ? quoteFare(c, pickup, dropoff) : c.min;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setKlass(c.id)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left shadow-card",
                    on ? "ring-2 ring-brand ring-offset-2 ring-offset-paper" : "bg-paper hover:bg-cream",
                  )}
                >
                  <div>
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-xs text-muted">{c.blurb}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums">{formatKw(q)}</p>
                    <p className="text-xs text-muted">{c.eta}</p>
                  </div>
                </button>
              );
            })}
          </div>
        ) : null}

        {service !== "rides" && service !== "food" ? (
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted">Notes</span>
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={service === "cargo" ? "Fridge, two helpers needed" : "Leave at the gate"}
            />
          </label>
        ) : null}

        <div>
          <p className="mb-2 text-xs font-medium text-muted">Pay with</p>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                ["mobile_money", "MoMo"],
                ["cash", "Cash"],
                ["card", "Card"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setPay(id)}
                className={cn(
                  "rounded-lg py-2 text-xs font-semibold shadow-card",
                  pay === id ? "bg-ink text-brand-fg" : "bg-paper text-ink-soft hover:bg-cream",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-line pt-4">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-xs text-muted">Estimated fare</p>
            <p className="font-display text-2xl font-semibold tabular-nums">{formatKw(fare || 0)}</p>
          </div>
          <p className="flex items-center gap-1 text-xs text-muted">
            <WalletCards className="size-3.5" />
            Locked at request
          </p>
        </div>
        <Button
          className="w-full"
          size="lg"
          disabled={!canRequest || create.isPending}
          onClick={() => create.mutate()}
        >
          {create.isPending ? "Requesting…" : "Request PoolMate"}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function PlaceField({
  label,
  value,
  onChange,
  hints,
  onPick,
  placeholder,
  dot,
  onFocus,
  onBlur,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hints: string[];
  onPick: (v: string) => void;
  placeholder: string;
  dot: "brand" | "ink";
  focus: boolean;
  onFocus: () => void;
  onBlur: () => void;
}) {
  return (
    <label className="relative block">
      <span className="mb-1 flex items-center gap-2 text-xs font-medium text-muted">
        <span className={cn("size-2 rounded-full", dot === "brand" ? "bg-brand" : "bg-ink")} />
        {label}
      </span>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete="off"
        type="text"
      />
      {hints.length > 0 ? (
        <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-xl bg-paper py-1 shadow-lift">
          {hints.map((h) => (
            <li key={h}>
              <button
                type="button"
                className="w-full px-3 py-2.5 text-left text-sm hover:bg-cream"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onPick(h)}
              >
                {h}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </label>
  );
}

function FoodPicker({
  restaurant,
  setRestaurant,
  foodIds,
  setFoodIds,
}: {
  restaurant: string | null;
  setRestaurant: (id: string) => void;
  foodIds: string[];
  setFoodIds: (ids: string[]) => void;
}) {
  const rest = RESTAURANTS.find((r) => r.id === restaurant);
  if (!rest) {
    return (
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted">Kitchens nearby</p>
        {RESTAURANTS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRestaurant(r.id)}
            className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left shadow-card hover:bg-cream"
          >
            <div>
              <p className="text-sm font-semibold">{r.name}</p>
              <p className="text-xs text-muted">
                {r.cuisine} · {r.area}
              </p>
            </div>
            <div className="text-right text-xs text-muted">
              <p className="tabular-nums">{r.rating.toFixed(1)}</p>
              <p>{r.mins} min</p>
            </div>
          </button>
        ))}
      </div>
    );
  }
  return (
    <div>
      <button type="button" className="text-xs font-medium text-brand" onClick={() => setRestaurant("")}>
        ← All kitchens
      </button>
      <h3 className="mt-2 font-display text-lg font-semibold">{rest.name}</h3>
      <p className="text-xs text-muted">
        {rest.cuisine} · {rest.area} · {rest.mins} min
      </p>
      <ul className="mt-3 space-y-2">
        {rest.items.map((item) => {
          const on = foodIds.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                setFoodIds(on ? foodIds.filter((x) => x !== item.id) : [...foodIds, item.id])
              }
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left shadow-card",
                on && "ring-2 ring-brand ring-offset-2 ring-offset-paper",
              )}
            >
              <span className="text-sm font-medium">{item.name}</span>
              <span className="text-sm tabular-nums">{formatKw(item.price)}</span>
            </button>
          );
        })}
      </ul>
      <p className="mt-2 text-xs text-muted">Delivery fee {formatKw(25)} added at checkout.</p>
    </div>
  );
}

function LiveTrip({
  trip,
  onCancel,
  onComplete,
  onNew,
}: {
  trip: Trip;
  onCancel: () => void;
  onComplete: () => void;
  onNew: () => void;
}) {
  const steps: { id: Trip["status"]; label: string }[] = [
    { id: "requested", label: "Finding a match" },
    { id: "matched", label: "Driver assigned" },
    { id: "enroute", label: "On the way" },
    { id: "arrived", label: "Arrived" },
    { id: "completed", label: "Completed" },
  ];
  const idx = Math.max(
    0,
    steps.findIndex((s) => s.id === trip.status),
  );
  const done = trip.status === "completed";
  const cancelled = trip.status === "cancelled";

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge variant={done ? "ok" : cancelled ? "default" : "brand"}>
            {cancelled ? "Cancelled" : done ? "Completed" : trip.vehicleClass}
          </Badge>
          <h2 className="mt-2 font-display text-xl font-semibold tracking-tight">
            {trip.pickup}
          </h2>
          <p className="text-sm text-muted">to {trip.dropoff}</p>
        </div>
        <p className="font-display text-xl font-semibold tabular-nums">{formatKw(trip.fare)}</p>
      </div>

      <ol className="mt-6 space-y-3">
        {steps.map((s, i) => (
          <li key={s.id} className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-7 place-items-center rounded-full text-xs font-semibold",
                i < idx
                  ? "bg-ok text-ok-fg"
                  : i === idx
                    ? "bg-brand text-brand-fg"
                    : "bg-cream text-muted",
              )}
            >
              {i < idx ? <Check className="size-3.5" /> : i + 1}
            </span>
            <span className={cn("text-sm", i === idx ? "font-semibold text-ink" : "text-muted")}>
              {s.label}
            </span>
          </li>
        ))}
      </ol>

      {trip.driverName ? (
        <div className="mt-6 rounded-xl bg-cream p-4">
          <p className="text-xs font-medium text-muted">Your PoolMate</p>
          <p className="mt-1 font-display text-lg font-semibold">{trip.driverName}</p>
          <p className="text-sm text-ink-soft">{trip.driverVehicle}</p>
          <div className="mt-3 flex gap-2">
            <span className="inline-flex items-center gap-1 rounded-lg bg-paper px-2.5 py-1.5 text-xs font-medium shadow-card">
              <Phone className="size-3.5" />
              In-app call
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-paper px-2.5 py-1.5 text-xs font-medium shadow-card">
              <ShieldCheck className="size-3.5" />
              Verified
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-xl bg-cream p-4">
          <p className="flex items-center gap-2 text-sm font-medium">
            <Clock className="size-4 text-brand" />
            Matching you on this corridor…
          </p>
        </div>
      )}

      <div className="mt-auto space-y-2 pt-6">
        <p className="flex items-center gap-1.5 text-xs text-muted">
          <Banknote className="size-3.5" />
          {trip.payMethod === "mobile_money"
            ? "Airtel Money / MTN"
            : trip.payMethod === "cash"
              ? "Pay cash to the driver"
              : "Card on file"}
        </p>
        {trip.status === "arrived" ? (
          <Button className="w-full" size="lg" onClick={onComplete}>
            I'm on board — finish trip
          </Button>
        ) : null}
        {done ? (
          <Button className="w-full" size="lg" onClick={onNew}>
            Book another
          </Button>
        ) : null}
        {!done && !cancelled && trip.status !== "arrived" ? (
          <Button variant="ghost" className="w-full text-danger" onClick={onCancel}>
            <X className="size-4" />
            Cancel request
          </Button>
        ) : null}
      </div>
    </div>
  );
}
