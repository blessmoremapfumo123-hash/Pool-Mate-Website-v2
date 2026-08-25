import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as useCurrentUserState, t as Logo } from "./logo-C19bMx66.mjs";
import { t as RedirectToSignIn } from "./gates-fnFB1ke-.mjs";
import { i as patchTrip, n as getMyProfile, r as listMyTrips, t as createTrip } from "./api-DYIBkhsC.mjs";
import { T as ArrowLeft, d as Power } from "../_libs/lucide-react.mjs";
import { t as AccountSlot } from "./account-menu-Dm5Xl5SX.mjs";
import { t as Skeleton } from "./skeleton-BsNcxRSm.mjs";
import { d as formatKw, i as DRIVER_JOBS } from "./catalog-BM8DsjeW.mjs";
import { t as Badge } from "./badge-DhhlYkNw.mjs";
import { t as Button } from "./button-BUGr8b6B.mjs";
import { t as CityMap } from "./city-map-Nl3qwt4b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/drive-BUJfYpCZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DrivePage() {
	const { user, isPending } = useCurrentUserState();
	const qc = useQueryClient();
	const [online, setOnline] = (0, import_react.useState)(true);
	const [active, setActive] = (0, import_react.useState)(null);
	const [feed, setFeed] = (0, import_react.useState)(DRIVER_JOBS);
	const profile = useQuery({
		queryKey: ["profile"],
		queryFn: () => getMyProfile(),
		enabled: Boolean(user)
	});
	const trips = useQuery({
		queryKey: ["trips"],
		queryFn: () => listMyTrips(),
		enabled: Boolean(user)
	});
	const accept = useMutation({
		mutationFn: async (job) => {
			const trip = await createTrip({ data: {
				service: job.service,
				pickup: job.pickup,
				dropoff: job.dropoff,
				vehicleClass: job.vehicleClass,
				fare: job.fare,
				notes: "Driver job",
				payMethod: "mobile_money"
			} });
			return await patchTrip({ data: {
				id: trip.id,
				status: "matched",
				driverName: user?.displayName ?? "You",
				driverVehicle: "Your vehicle"
			} }) ?? trip;
		},
		onSuccess: (t) => {
			setActive(t);
			setFeed((f) => f.filter((j) => !(j.pickup === t.pickup && j.dropoff === t.dropoff)));
			qc.invalidateQueries({ queryKey: ["trips"] });
		}
	});
	const finish = useMutation({
		mutationFn: (id) => patchTrip({ data: {
			id,
			status: "completed"
		} }),
		onSuccess: () => {
			setActive(null);
			qc.invalidateQueries({ queryKey: ["trips"] });
		}
	});
	const earned = (0, import_react.useMemo)(() => (trips.data ?? []).filter((t) => t.status === "completed").reduce((s, t) => s + t.fare, 0), [trips.data]);
	if (isPending || user && profile.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-paper p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-80 w-full max-w-3xl rounded-2xl" })
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (!profile.data?.role) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/select-role" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh flex-col overflow-hidden bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex h-16 items-center justify-between gap-3 border-b border-line px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard",
					className: "grid size-11 place-items-center rounded-lg hover:bg-cream",
					"aria-label": "Back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { to: "/" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSlot, {})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid min-h-0 w-full max-w-6xl flex-1 gap-0 overflow-hidden lg:grid-cols-[22rem_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex min-h-0 flex-col overflow-y-auto border-b border-line p-4 lg:border-b-0 lg:border-r",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-brand",
							children: "Driver"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-semibold tracking-tight",
							children: "Go online"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setOnline((v) => !v),
							className: cn("inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold", online ? "bg-ok text-ok-fg" : "bg-cream text-ink-soft"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Power, { className: "size-4" }), online ? "Online" : "Offline"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-cream p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "Today"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl font-semibold tabular-nums",
								children: formatKw(earned)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-cream p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "Jobs done"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl font-semibold tabular-nums",
								children: trips.data?.filter((t) => t.status === "completed").length ?? 0
							})]
						})]
					}),
					active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 rounded-2xl bg-ink p-4 text-brand-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "brand",
								children: "Active job"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-lg font-semibold",
								children: active.pickup
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-brand-fg/70",
								children: ["to ", active.dropoff]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-2xl font-semibold tabular-nums",
								children: formatKw(active.fare)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-4 w-full",
								variant: "cream",
								disabled: finish.isPending,
								onClick: () => finish.mutate(active.id),
								children: "Complete trip"
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-6 font-display text-sm font-semibold",
						children: "Incoming"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 space-y-2",
						children: !online ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl bg-cream px-4 py-6 text-center text-sm text-muted",
							children: "You're offline. Go online to see corridor jobs."
						}) : feed.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-xl bg-cream px-4 py-6 text-center text-sm text-muted",
							children: "Quiet stretch. New jobs will land here."
						}) : feed.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-xl bg-paper p-3 shadow-card",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-semibold uppercase tracking-wider text-brand",
										children: [
											job.service,
											" · ",
											job.vehicleClass
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-semibold",
										children: job.pickup
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: ["to ", job.dropoff]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold tabular-nums",
									children: formatKw(job.fare)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								className: "mt-3 w-full",
								disabled: Boolean(active) || accept.isPending,
								onClick: () => accept.mutate(job),
								children: "Accept"
							})]
						}, `${job.pickup}-${job.dropoff}`))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative min-h-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityMap, {
					pickup: active?.pickup ?? "Cairo Road, CBD",
					dropoff: active?.dropoff ?? "Kenneth Kaunda Airport",
					moving: Boolean(active),
					className: "absolute inset-0 h-full min-h-64"
				})
			})]
		})]
	});
}
//#endregion
export { DrivePage as component };
