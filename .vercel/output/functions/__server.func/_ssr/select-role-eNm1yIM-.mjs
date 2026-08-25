import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as useCurrentUserState, t as Logo } from "./logo-C19bMx66.mjs";
import { t as RedirectToSignIn } from "./gates-fnFB1ke-.mjs";
import { a as saveMyRole, n as getMyProfile } from "./api-DYIBkhsC.mjs";
import { a as UserRound, x as CarFront } from "../_libs/lucide-react.mjs";
import { t as Skeleton } from "./skeleton-BsNcxRSm.mjs";
import { t as Button } from "./button-BUGr8b6B.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/select-role-eNm1yIM-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SelectRolePage() {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const [picked, setPicked] = (0, import_react.useState)(null);
	const profile = useQuery({
		queryKey: ["profile"],
		queryFn: () => getMyProfile(),
		enabled: Boolean(user)
	});
	const save = useMutation({
		mutationFn: (role) => saveMyRole({ data: {
			role,
			displayName: user?.displayName ?? void 0
		} }),
		onSuccess: async (p) => {
			await qc.invalidateQueries({ queryKey: ["profile"] });
			navigate({ to: p.role === "driver" ? "/drive" : "/dashboard" });
		}
	});
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-paper p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-64 w-full max-w-xl rounded-2xl" })
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-dvh bg-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-3xl flex-col px-4 py-8 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mt-14 w-full max-w-2xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.18em] text-brand",
							children: "Choose how you use PoolMate"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl",
							children: "Rider or driver?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted",
							children: "You can switch later. Riders book the super app. Drivers earn on the corridors they already drive."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleCard, {
						active: picked === "rider",
						onClick: () => setPicked("rider"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-6" }),
						title: "Ride with PoolMate",
						body: "Book corridor pools, private cars, cargo, food and parcels. Pay with Mobile Money or cash."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleCard, {
						active: picked === "driver",
						onClick: () => setPicked("driver"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CarFront, { className: "size-6" }),
						title: "Drive with PoolMate",
						body: "Go online, accept jobs on your route, and get paid locally. Keep the seats filled."
					})]
				}),
				save.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-sm text-danger",
					children: "Could not save your role. Try again."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						disabled: !picked || save.isPending,
						onClick: () => picked && save.mutate(picked),
						children: save.isPending ? "Saving…" : "Continue"
					})
				}),
				profile.data?.role ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-center text-xs text-muted",
					children: [
						"Currently set as ",
						profile.data.role,
						". Pick again to switch."
					]
				}) : null
			]
		})
	});
}
function RoleCard({ active, onClick, icon, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("rounded-2xl bg-paper p-6 text-left shadow-card transition-[box-shadow,transform] duration-150", "hover:shadow-lift", active && "ring-2 ring-brand ring-offset-2 ring-offset-paper"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("grid size-12 place-items-center rounded-xl", active ? "bg-brand text-brand-fg" : "bg-cream text-brand"),
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-5 font-display text-xl font-semibold tracking-tight",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: body
			})
		]
	});
}
//#endregion
export { SelectRolePage as component };
