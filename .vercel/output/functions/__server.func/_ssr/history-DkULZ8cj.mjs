import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as listMyTrips } from "./api-DYIBkhsC.mjs";
import { t as Skeleton } from "./skeleton-BsNcxRSm.mjs";
import { d as formatKw } from "./catalog-BM8DsjeW.mjs";
import { t as Badge } from "./badge-DhhlYkNw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-DkULZ8cj.js
var import_jsx_runtime = require_jsx_runtime();
function HistoryPage() {
	const trips = useQuery({
		queryKey: ["trips"],
		queryFn: () => listMyTrips()
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-3xl px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight",
				children: "Activity"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Rides, cargo, food and parcels on your account."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-3",
				children: [
					trips.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-24 rounded-2xl" })] }) : null,
					trips.data && trips.data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-cream px-5 py-10 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-semibold",
							children: "No trips yet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Request a PoolMate from the Book tab."
						})]
					}) : null,
					trips.data?.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl bg-paper p-4 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-brand",
									children: t.service
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-base font-semibold",
									children: t.pickup
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: ["to ", t.dropoff]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold tabular-nums",
									children: formatKw(t.fare)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: t.status === "completed" ? "ok" : t.status === "cancelled" ? "default" : "brand",
									className: "mt-1 capitalize",
									children: t.status
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: cn("mt-3 text-xs text-muted"),
							children: [
								t.vehicleClass,
								t.driverName ? ` · ${t.driverName}` : "",
								" · ",
								new Date(t.createdAt).toLocaleString()
							]
						})]
					}, t.id))
				]
			})
		]
	});
}
//#endregion
export { HistoryPage as component };
