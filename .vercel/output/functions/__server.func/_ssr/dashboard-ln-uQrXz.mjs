import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as patchTrip, t as createTrip } from "./api-DYIBkhsC.mjs";
import { C as Banknote, S as Bike, b as Check, f as Phone, i as UtensilsCrossed, o as Truck, p as Package, r as WalletCards, t as X, u as ShieldCheck, v as Clock, w as ArrowRight } from "../_libs/lucide-react.mjs";
import { d as formatKw, f as pickDriver, l as classesFor, m as suggestLocations, o as RESTAURANTS, p as quoteFare, r as DELIVERY_CLASSES, s as RIDE_CLASSES, t as CARGO_CLASSES } from "./catalog-BM8DsjeW.mjs";
import { t as Badge } from "./badge-DhhlYkNw.mjs";
import { t as Button } from "./button-BUGr8b6B.mjs";
import { t as Input } from "./input-DjaqlN96.mjs";
import { t as CityMap } from "./city-map-Nl3qwt4b.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-ln-uQrXz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SERVICE_ICONS = {
	rides: Bike,
	cargo: Truck,
	food: UtensilsCrossed,
	delivery: Package
};
function readDraft() {
	try {
		const raw = sessionStorage.getItem("pm.draft");
		if (!raw) return null;
		const v = JSON.parse(raw);
		if (!v || !v.service) return null;
		return v;
	} catch {
		return null;
	}
}
function BookingPanel({ onRouteChange }) {
	const draft = (0, import_react.useMemo)(() => typeof window === "undefined" ? null : readDraft(), []);
	const [service, setService] = (0, import_react.useState)(draft?.service ?? "rides");
	const [pickup, setPickup] = (0, import_react.useState)(draft?.pickup ?? "");
	const [dropoff, setDropoff] = (0, import_react.useState)(draft?.dropoff ?? "");
	const [klass, setKlass] = (0, import_react.useState)("pool");
	const [pay, setPay] = (0, import_react.useState)("mobile_money");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [foodIds, setFoodIds] = (0, import_react.useState)([]);
	const [restaurant, setRestaurant] = (0, import_react.useState)(null);
	const [trip, setTrip] = (0, import_react.useState)(null);
	const [focus, setFocus] = (0, import_react.useState)(null);
	const qc = useQueryClient();
	const classes = service === "food" ? [] : service === "cargo" ? CARGO_CLASSES : service === "delivery" ? DELIVERY_CLASSES : RIDE_CLASSES;
	(0, import_react.useEffect)(() => {
		const first = classesFor(service)[0]?.id;
		if (first) setKlass(first);
		if (service !== "food") {
			setRestaurant(null);
			setFoodIds([]);
		}
	}, [service]);
	(0, import_react.useEffect)(() => {
		onRouteChange(pickup || void 0, dropoff || void 0, Boolean(trip && trip.status !== "completed"));
	}, [
		pickup,
		dropoff,
		trip,
		onRouteChange
	]);
	const rest = RESTAURANTS.find((r) => r.id === restaurant);
	const foodTotal = rest ? rest.items.filter((i) => foodIds.includes(i.id)).reduce((s, i) => s + i.price, 0) + 25 : 0;
	const selectedClass = classes.find((c) => c.id === klass) ?? classes[0];
	const fare = service === "food" ? foodTotal : selectedClass && pickup && dropoff ? quoteFare(selectedClass, pickup, dropoff) : selectedClass?.min ?? 0;
	const pickupHints = focus === "pickup" ? suggestLocations(pickup, dropoff) : [];
	const dropHints = focus === "dropoff" ? suggestLocations(dropoff, pickup) : [];
	const create = useMutation({
		mutationFn: () => createTrip({ data: {
			service,
			pickup: service === "food" ? rest?.name ?? pickup : pickup,
			dropoff,
			vehicleClass: service === "food" ? "Food" : selectedClass?.name ?? "Economy",
			fare,
			notes: notes || (service === "food" ? foodIds.join(",") : void 0),
			payMethod: pay
		} }),
		onSuccess: (t) => {
			setTrip(t);
			try {
				sessionStorage.removeItem("pm.draft");
			} catch {}
			qc.invalidateQueries({ queryKey: ["trips"] });
			toast("Request sent. Finding a PoolMate…");
		},
		onError: () => toast("Could not create the request. Try again.")
	});
	const patch = useMutation({
		mutationFn: (input) => patchTrip({ data: input }),
		onSuccess: (t) => {
			if (t) setTrip(t);
			qc.invalidateQueries({ queryKey: ["trips"] });
		}
	});
	(0, import_react.useEffect)(() => {
		if (!trip || trip.status === "completed" || trip.status === "cancelled") return;
		const driver = pickDriver(trip.id.charCodeAt(0));
		const timers = [];
		if (trip.status === "requested") timers.push(window.setTimeout(() => {
			patch.mutate({
				id: trip.id,
				status: "matched",
				driverName: driver.name,
				driverVehicle: driver.vehicle
			});
		}, 1600));
		if (trip.status === "matched") timers.push(window.setTimeout(() => {
			patch.mutate({
				id: trip.id,
				status: "enroute"
			});
		}, 2800));
		if (trip.status === "enroute") timers.push(window.setTimeout(() => {
			patch.mutate({
				id: trip.id,
				status: "arrived"
			});
		}, 3200));
		return () => timers.forEach((id) => window.clearTimeout(id));
	}, [trip?.id, trip?.status]);
	const canRequest = service === "food" ? Boolean(rest && foodIds.length && dropoff && fare > 0) : Boolean(pickup && dropoff && selectedClass);
	if (trip) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveTrip, {
		trip,
		onCancel: () => {
			patch.mutate({
				id: trip.id,
				status: "cancelled"
			});
			setTrip(null);
		},
		onComplete: () => {
			patch.mutate({
				id: trip.id,
				status: "completed"
			});
		},
		onNew: () => setTrip(null)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-1 rounded-xl bg-cream p-1",
				children: [
					"rides",
					"cargo",
					"food",
					"delivery"
				].map((id) => {
					const Icon = SERVICE_ICONS[id];
					const on = service === id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setService(id),
						className: cn("flex flex-col items-center gap-1 rounded-lg py-2.5 text-xs font-semibold capitalize", on ? "bg-paper text-ink shadow-card" : "text-ink-soft hover:text-ink"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-4", on ? "text-brand" : "text-muted") }), id]
					}, id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 min-h-0 flex-1 space-y-3 overflow-y-auto pr-1",
				children: [
					service === "food" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FoodPicker, {
						restaurant,
						setRestaurant: (id) => {
							setRestaurant(id);
							const r = RESTAURANTS.find((x) => x.id === id);
							if (r) setPickup(r.area);
						},
						foodIds,
						setFoodIds
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceField, {
						label: "Pickup",
						value: pickup,
						onChange: setPickup,
						hints: pickupHints.map((l) => l.name),
						focus: focus === "pickup",
						onFocus: () => setFocus("pickup"),
						onBlur: () => setTimeout(() => setFocus((f) => f === "pickup" ? null : f), 120),
						onPick: (v) => {
							setPickup(v);
							setFocus(null);
						},
						placeholder: "Cairo Road, CBD",
						dot: "brand"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceField, {
						label: "Where to",
						value: dropoff,
						onChange: setDropoff,
						hints: dropHints.map((l) => l.name),
						focus: focus === "dropoff",
						onFocus: () => setFocus("dropoff"),
						onBlur: () => setTimeout(() => setFocus((f) => f === "dropoff" ? null : f), 120),
						onPick: (v) => {
							setDropoff(v);
							setFocus(null);
						},
						placeholder: "Kenneth Kaunda Airport",
						dot: "ink"
					})] }),
					service === "food" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceField, {
						label: "Deliver to",
						value: dropoff,
						onChange: setDropoff,
						hints: dropHints.map((l) => l.name),
						focus: focus === "dropoff",
						onFocus: () => setFocus("dropoff"),
						onBlur: () => setTimeout(() => setFocus((f) => f === "dropoff" ? null : f), 120),
						onPick: (v) => {
							setDropoff(v);
							setFocus(null);
						},
						placeholder: "Woodlands, Kabulonga…",
						dot: "ink"
					}) : null,
					service !== "food" && selectedClass ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted",
							children: "Choose a class"
						}), classes.map((c) => {
							const on = c.id === klass;
							const q = pickup && dropoff ? quoteFare(c, pickup, dropoff) : c.min;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setKlass(c.id),
								className: cn("flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left shadow-card", on ? "ring-2 ring-brand ring-offset-2 ring-offset-paper" : "bg-paper hover:bg-cream"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold",
									children: c.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: c.blurb
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold tabular-nums",
										children: formatKw(q)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: c.eta
									})]
								})]
							}, c.id);
						})]
					}) : null,
					service !== "rides" && service !== "food" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block text-xs font-medium text-muted",
							children: "Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: notes,
							onChange: (e) => setNotes(e.target.value),
							placeholder: service === "cargo" ? "Fridge, two helpers needed" : "Leave at the gate"
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-medium text-muted",
						children: "Pay with"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-2",
						children: [
							["mobile_money", "MoMo"],
							["cash", "Cash"],
							["card", "Card"]
						].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPay(id),
							className: cn("rounded-lg py-2 text-xs font-semibold shadow-card", pay === id ? "bg-ink text-brand-fg" : "bg-paper text-ink-soft hover:bg-cream"),
							children: label
						}, id))
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border-t border-line pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Estimated fare"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-semibold tabular-nums",
						children: formatKw(fare || 0)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletCards, { className: "size-3.5" }), "Locked at request"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "w-full",
					size: "lg",
					disabled: !canRequest || create.isPending,
					onClick: () => create.mutate(),
					children: [create.isPending ? "Requesting…" : "Request PoolMate", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})]
			})
		]
	});
}
function PlaceField({ label, value, onChange, hints, onPick, placeholder, dot, onFocus, onBlur }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "relative block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mb-1 flex items-center gap-2 text-xs font-medium text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 rounded-full", dot === "brand" ? "bg-brand" : "bg-ink") }), label]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value,
				onChange: (e) => onChange(e.target.value),
				placeholder,
				onFocus,
				onBlur,
				autoComplete: "off",
				type: "text"
			}),
			hints.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-xl bg-paper py-1 shadow-lift",
				children: hints.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "w-full px-3 py-2.5 text-left text-sm hover:bg-cream",
					onMouseDown: (e) => e.preventDefault(),
					onClick: () => onPick(h),
					children: h
				}) }, h))
			}) : null
		]
	});
}
function FoodPicker({ restaurant, setRestaurant, foodIds, setFoodIds }) {
	const rest = RESTAURANTS.find((r) => r.id === restaurant);
	if (!rest) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-medium text-muted",
			children: "Kitchens nearby"
		}), RESTAURANTS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setRestaurant(r.id),
			className: "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left shadow-card hover:bg-cream",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold",
				children: r.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					r.cuisine,
					" · ",
					r.area
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right text-xs text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tabular-nums",
					children: r.rating.toFixed(1)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [r.mins, " min"] })]
			})]
		}, r.id))]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "text-xs font-medium text-brand",
			onClick: () => setRestaurant(""),
			children: "← All kitchens"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mt-2 font-display text-lg font-semibold",
			children: rest.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-xs text-muted",
			children: [
				rest.cuisine,
				" · ",
				rest.area,
				" · ",
				rest.mins,
				" min"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: rest.items.map((item) => {
				const on = foodIds.includes(item.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setFoodIds(on ? foodIds.filter((x) => x !== item.id) : [...foodIds, item.id]),
					className: cn("flex w-full items-center justify-between rounded-xl px-3 py-3 text-left shadow-card", on && "ring-2 ring-brand ring-offset-2 ring-offset-paper"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-medium",
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm tabular-nums",
						children: formatKw(item.price)
					})]
				}, item.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-xs text-muted",
			children: [
				"Delivery fee ",
				formatKw(25),
				" added at checkout."
			]
		})
	] });
}
function LiveTrip({ trip, onCancel, onComplete, onNew }) {
	const steps = [
		{
			id: "requested",
			label: "Finding a match"
		},
		{
			id: "matched",
			label: "Driver assigned"
		},
		{
			id: "enroute",
			label: "On the way"
		},
		{
			id: "arrived",
			label: "Arrived"
		},
		{
			id: "completed",
			label: "Completed"
		}
	];
	const idx = Math.max(0, steps.findIndex((s) => s.id === trip.status));
	const done = trip.status === "completed";
	const cancelled = trip.status === "cancelled";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: done ? "ok" : cancelled ? "default" : "brand",
						children: cancelled ? "Cancelled" : done ? "Completed" : trip.vehicleClass
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-xl font-semibold tracking-tight",
						children: trip.pickup
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: ["to ", trip.dropoff]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-semibold tabular-nums",
					children: formatKw(trip.fare)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-6 space-y-3",
				children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("grid size-7 place-items-center rounded-full text-xs font-semibold", i < idx ? "bg-ok text-ok-fg" : i === idx ? "bg-brand text-brand-fg" : "bg-cream text-muted"),
						children: i < idx ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-sm", i === idx ? "font-semibold text-ink" : "text-muted"),
						children: s.label
					})]
				}, s.id))
			}),
			trip.driverName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-xl bg-cream p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-muted",
						children: "Your PoolMate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-lg font-semibold",
						children: trip.driverName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-ink-soft",
						children: trip.driverVehicle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-lg bg-paper px-2.5 py-1.5 text-xs font-medium shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }), "In-app call"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-lg bg-paper px-2.5 py-1.5 text-xs font-medium shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5" }), "Verified"]
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 rounded-xl bg-cream p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4 text-brand" }), "Matching you on this corridor…"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto space-y-2 pt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-1.5 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "size-3.5" }), trip.payMethod === "mobile_money" ? "Airtel Money / MTN" : trip.payMethod === "cash" ? "Pay cash to the driver" : "Card on file"]
					}),
					trip.status === "arrived" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						size: "lg",
						onClick: onComplete,
						children: "I'm on board — finish trip"
					}) : null,
					done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						size: "lg",
						onClick: onNew,
						children: "Book another"
					}) : null,
					!done && !cancelled && trip.status !== "arrived" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						className: "w-full text-danger",
						onClick: onCancel,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), "Cancel request"]
					}) : null
				]
			})
		]
	});
}
function DashboardHome() {
	const [pickup, setPickup] = (0, import_react.useState)();
	const [dropoff, setDropoff] = (0, import_react.useState)();
	const [moving, setMoving] = (0, import_react.useState)(false);
	const onRouteChange = (0, import_react.useCallback)((p, d, m) => {
		setPickup(p);
		setDropoff(d);
		setMoving(Boolean(m));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-1 flex-col-reverse overflow-hidden lg:flex-row",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-0 w-full flex-col overflow-y-auto border-t border-line bg-paper p-4 lg:max-w-md lg:border-r lg:border-t-0 lg:p-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingPanel, { onRouteChange })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative min-h-56 w-full flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityMap, {
				pickup,
				dropoff,
				moving,
				className: "absolute inset-0 h-full min-h-56"
			})
		})]
	});
}
//#endregion
export { DashboardHome as component };
