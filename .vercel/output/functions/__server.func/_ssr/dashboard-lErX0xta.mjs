import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { m as Outlet, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { r as useCurrentUserState, t as Logo } from "./logo-C19bMx66.mjs";
import { t as RedirectToSignIn } from "./gates-fnFB1ke-.mjs";
import { n as getMyProfile } from "./api-DYIBkhsC.mjs";
import { _ as LayoutDashboard, m as Menu, n as Wallet, t as X, x as CarFront, y as Clock3 } from "../_libs/lucide-react.mjs";
import { t as AccountSlot } from "./account-menu-Dm5Xl5SX.mjs";
import { t as Skeleton } from "./skeleton-BsNcxRSm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-lErX0xta.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/dashboard",
		label: "Book",
		icon: LayoutDashboard
	},
	{
		to: "/dashboard/history",
		label: "Activity",
		icon: Clock3
	},
	{
		to: "/dashboard/wallet",
		label: "Wallet",
		icon: Wallet
	},
	{
		to: "/drive",
		label: "Drive",
		icon: CarFront
	}
];
function DashboardLayout() {
	const { user, isPending } = useCurrentUserState();
	const [open, setOpen] = (0, import_react.useState)(false);
	const profile = useQuery({
		queryKey: ["profile"],
		queryFn: () => getMyProfile(),
		enabled: Boolean(user)
	});
	if (isPending || user && profile.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-dvh grid-cols-1 bg-paper md:grid-cols-[16rem_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "hidden h-full md:block" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "m-6 rounded-2xl" })]
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (!profile.data?.role) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/select-role" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh overflow-hidden bg-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden w-60 shrink-0 flex-col border-r border-line bg-paper md:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-16 items-center px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { to: "/dashboard" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex flex-1 flex-col gap-1 px-3 py-2",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-soft hover:bg-cream hover:text-ink [&.active]:bg-cream [&.active]:text-ink",
						activeOptions: { exact: item.to === "/dashboard" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
					}, item.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-5 pb-5 text-xs text-muted",
					children: "Lusaka · live corridors"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex h-16 items-center justify-between gap-3 border-b border-line px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 md:hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid size-11 place-items-center rounded-lg hover:bg-cream",
								onClick: () => setOpen((v) => !v),
								"aria-label": "Menu",
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { to: "/dashboard" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "hidden text-sm font-medium text-ink-soft md:block",
							children: [
								"Good to go, ",
								user.displayName?.split(" ")[0] ?? "there",
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSlot, {})
					]
				}),
				open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-line bg-paper px-3 py-2 md:hidden",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: "flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-medium",
						onClick: () => setOpen(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
					}, item.to))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-0 flex-1 flex-col overflow-y-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "grid grid-cols-4 border-t border-line bg-paper md:hidden",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: "flex flex-col items-center gap-1 py-2.5 text-xs font-medium text-muted [&.active]:text-brand",
						activeOptions: { exact: item.to === "/dashboard" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
					}, item.to))
				})
			]
		})]
	});
}
//#endregion
export { DashboardLayout as component };
