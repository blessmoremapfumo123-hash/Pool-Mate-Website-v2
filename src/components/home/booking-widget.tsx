import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Bike, Package, ShoppingBag, Truck, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SERVICES, suggestLocations } from "@/lib/poolmate/catalog";
import type { ServiceId } from "@/lib/poolmate/types";
import { cn } from "@/lib/utils";

const ICONS: Record<ServiceId, typeof Bike> = {
  rides: Bike,
  cargo: Truck,
  food: UtensilsCrossed,
  delivery: Package,
};

export function BookingWidget({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceId>("rides");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [focus, setFocus] = useState<"pickup" | "dropoff" | null>(null);

  const pickupHints = useMemo(
    () => (focus === "pickup" ? suggestLocations(pickup, dropoff) : []),
    [focus, pickup, dropoff],
  );
  const dropHints = useMemo(
    () => (focus === "dropoff" ? suggestLocations(dropoff, pickup) : []),
    [focus, dropoff, pickup],
  );

  function go() {
    const draft = { service, pickup, dropoff };
    try {
      sessionStorage.setItem("pm.draft", JSON.stringify(draft));
    } catch {
      /* ignore */
    }
    void navigate({ to: "/login" });
  }

  return (
    <div
      className={cn(
        "rounded-2xl bg-paper p-2 shadow-lift",
        compact ? "p-2" : "p-2 sm:p-2.5",
      )}
    >
      <div className="grid grid-cols-4 gap-1 rounded-xl bg-cream p-1">
        {SERVICES.map((s) => {
          const Icon = ICONS[s.id];
          const on = service === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setService(s.id)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg px-1 py-2.5 text-xs font-semibold",
                "transition-colors duration-150",
                on ? "bg-paper text-ink shadow-card" : "text-ink-soft hover:text-ink",
              )}
            >
              <Icon className={cn("size-4", on ? "text-brand" : "text-muted")} />
              {s.name}
            </button>
          );
        })}
      </div>

      <div className="relative mt-3 space-y-2 px-1 pb-1">
        <Field
          label={service === "food" ? "Restaurant area" : "Pickup"}
          value={pickup}
          onChange={setPickup}
          placeholder={service === "food" ? "Kamwala, Levy, East Park…" : "Cairo Road, CBD"}
          onFocus={() => setFocus("pickup")}
          onBlur={() => setTimeout(() => setFocus((f) => (f === "pickup" ? null : f)), 120)}
          hints={pickupHints.map((l) => l.name)}
          onPick={(v) => {
            setPickup(v);
            setFocus(null);
          }}
          dot="brand"
        />
        <Field
          label={service === "food" ? "Deliver to" : "Where to"}
          value={dropoff}
          onChange={setDropoff}
          placeholder="Kenneth Kaunda Airport"
          onFocus={() => setFocus("dropoff")}
          onBlur={() => setTimeout(() => setFocus((f) => (f === "dropoff" ? null : f)), 120)}
          hints={dropHints.map((l) => l.name)}
          onPick={(v) => {
            setDropoff(v);
            setFocus(null);
          }}
          dot="ink"
        />
        <Button size="lg" className="mt-2 w-full" onClick={go}>
          {service === "food" ? "Find kitchens" : "Request PoolMate"}
          <ArrowRight className="size-4" />
        </Button>
        <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-xs text-muted">
          <ShoppingBag className="size-3.5" />
          Mobile Money, Airtel Money or cash
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  onFocus,
  onBlur,
  hints,
  onPick,
  dot,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  onFocus: () => void;
  onBlur: () => void;
  hints: string[];
  onPick: (v: string) => void;
  dot: "brand" | "ink";
}) {
  return (
    <label className="relative block">
      <span className="mb-1 flex items-center gap-2 text-xs font-medium text-muted">
        <span
          className={cn(
            "size-2 rounded-full",
            dot === "brand" ? "bg-brand" : "bg-ink",
          )}
        />
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
        <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-xl bg-paper py-1 shadow-lift">
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
