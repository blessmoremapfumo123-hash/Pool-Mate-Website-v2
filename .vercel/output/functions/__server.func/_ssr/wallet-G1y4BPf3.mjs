import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { r as listMyTrips } from "./api-DYIBkhsC.mjs";
import { C as Banknote, c as Smartphone, r as WalletCards } from "../_libs/lucide-react.mjs";
import { t as Skeleton } from "./skeleton-BsNcxRSm.mjs";
import { d as formatKw } from "./catalog-BM8DsjeW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet-G1y4BPf3.js
var import_jsx_runtime = require_jsx_runtime();
function WalletPage() {
	const trips = useQuery({
		queryKey: ["trips"],
		queryFn: () => listMyTrips()
	});
	const spent = (trips.data?.filter((t) => t.status === "completed") ?? []).reduce((s, t) => s + t.fare, 0);
	const saved = Math.round(spent * .32);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-3xl px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold tracking-tight",
				children: "Wallet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Local pay, locked fares, corridor savings."
			}),
			trips.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-6 h-36 rounded-2xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-ink p-5 text-brand-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-brand-fg/70",
						children: "Spent on completed trips"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-3xl font-semibold tabular-nums",
						children: formatKw(spent)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-cream p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted",
							children: "Estimated corridor savings"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl font-semibold tabular-nums text-brand",
							children: formatKw(saved)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: "vs street-hail on the same stretches"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-10 font-display text-lg font-semibold",
				children: "Payment methods"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 rounded-xl bg-paper px-4 py-3 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Airtel Money"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Default · Lusaka"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 rounded-xl bg-paper px-4 py-3 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletCards, { className: "size-4 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "MTN MoMo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Linked"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 rounded-xl bg-paper px-4 py-3 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "size-4 text-brand" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "Cash"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: "Pay the driver at drop-off"
						})] })]
					})
				]
			})
		]
	});
}
//#endregion
export { WalletPage as component };
