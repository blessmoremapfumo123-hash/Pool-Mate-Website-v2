import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as signOut } from "./client-B40BzJxt.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as useCurrentUserState } from "./logo-C19bMx66.mjs";
import { _ as LayoutDashboard, a as UserRound, g as LogOut, x as CarFront } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/account-menu-Dm5Xl5SX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AccountSlot({ className }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("size-9 animate-pulse rounded-full bg-sand", className) });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/login",
		className: cn("inline-flex h-11 items-center rounded-lg px-4 text-sm font-medium text-ink hover:bg-cream", className),
		children: "Log in"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedInChip, { className });
}
function SignedInChip({ className }) {
	const { user } = useCurrentUserState();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	const initial = label.charAt(0).toUpperCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen((v) => !v),
			className: "flex h-11 items-center gap-2 rounded-lg px-1.5 pr-3 hover:bg-cream",
			"aria-expanded": open,
			"aria-haspopup": "menu",
			children: [user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "size-8 rounded-full object-cover outline outline-1 -outline-offset-1 outline-ink/10"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-8 place-items-center rounded-full bg-brand text-xs font-semibold text-brand-fg",
				children: initial
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "hidden max-w-28 truncate text-sm font-medium sm:inline",
				children: label
			})]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "fixed inset-0 z-40 cursor-default",
			"aria-label": "Close menu",
			onClick: () => setOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "menu",
			className: "absolute right-0 z-50 mt-1 w-52 overflow-hidden rounded-xl bg-paper py-1 shadow-lift",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/dashboard",
					className: "flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-cream",
					onClick: () => setOpen(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "size-4 text-muted" }), "Dashboard"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/drive",
					className: "flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-cream",
					onClick: () => setOpen(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarFront, { className: "size-4 text-muted" }), "Drive"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/select-role",
					className: "flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-cream",
					onClick: () => setOpen(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-4 text-muted" }), "Switch role"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: signingOut,
					className: "flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-cream disabled:opacity-60",
					onClick: () => {
						setSigningOut(true);
						signOut().catch(() => setSigningOut(false));
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4 text-muted" }), signingOut ? "Signing out…" : "Sign out"]
				})
			]
		})] }) : null]
	});
}
//#endregion
export { AccountSlot as t };
