import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as LogoMark, r as useCurrentUserState, t as Logo } from "./logo-C19bMx66.mjs";
import { t as Button } from "./button-BUGr8b6B.mjs";
import { t as Input } from "./input-DjaqlN96.mjs";
import { t as GROK_PROVIDERS } from "./server-_qUMzQhk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DBUuJcAX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AFTER_LOGIN = "/select-role";
function LoginPage() {
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	if (!isPending && user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/select-role" });
	async function onProvider(id) {
		setError(null);
		setBusy(id);
		try {
			await signIn(id, {
				callbackURL: AFTER_LOGIN,
				errorCallbackURL: "/login"
			});
		} catch (e) {
			setError(e instanceof Error ? e.message : "Sign-in failed");
			setBusy(null);
		}
	}
	async function onEmail(e) {
		e.preventDefault();
		setError(null);
		setBusy("email");
		try {
			if (mode === "up") {
				const { error: err } = await authClient.signUp.email({
					email,
					password,
					name: name || email.split("@")[0] || "Rider",
					callbackURL: AFTER_LOGIN
				});
				if (err) throw new Error(err.message || "Could not create account");
			} else {
				const { error: err } = await authClient.signIn.email({
					email,
					password,
					callbackURL: AFTER_LOGIN
				});
				if (err) throw new Error(err.message || "Could not sign in");
			}
			window.location.assign(AFTER_LOGIN);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
			setBusy(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "grid min-h-dvh lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative hidden overflow-hidden bg-brand text-brand-fg lg:flex lg:flex-col lg:p-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { light: true }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 my-auto max-w-md py-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-widest text-brand-fg/70",
							children: "Lusaka · corridor pooling"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-4 font-display text-4xl font-semibold leading-tight tracking-tight",
							children: [
								"Same road.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Split the fare."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-base leading-relaxed text-brand-fg/80",
							children: "Sign in to book a Pool, send cargo, order food or dispatch a parcel — paid with Mobile Money."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "relative z-10 text-sm text-brand-fg/60",
					children: "Verified drivers · live tracking · local pay"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { className: "pointer-events-none absolute -right-8 -bottom-8 size-64 text-brand-fg/10" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "flex flex-col bg-paper px-5 py-8 sm:px-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10 flex items-center justify-between lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-muted hover:text-ink",
					children: "Back"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-sm flex-1 flex-col justify-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold tracking-tight",
						children: mode === "in" ? "Welcome back" : "Create your account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: mode === "in" ? "Log in to request a PoolMate." : "One account for rides, cargo, food and delivery."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 space-y-2",
						children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							className: "w-full",
							disabled: busy !== null,
							onClick: () => void onProvider(p.providerId),
							children: ["Continue with ", p.label]
						}, p.providerId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" }),
							"or email",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-line" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-3",
						onSubmit: (e) => void onEmail(e),
						children: [
							mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-xs font-medium text-muted",
									children: "Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: name,
									onChange: (e) => setName(e.target.value),
									placeholder: "Chanda Mwale",
									autoComplete: "name"
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-xs font-medium text-muted",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									required: true,
									value: email,
									onChange: (e) => setEmail(e.target.value),
									placeholder: "you@email.com",
									autoComplete: "email"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1 block text-xs font-medium text-muted",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "password",
									required: true,
									minLength: 8,
									value: password,
									onChange: (e) => setPassword(e.target.value),
									placeholder: "At least 8 characters",
									autoComplete: mode === "up" ? "new-password" : "current-password"
								})]
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-danger",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full",
								disabled: busy !== null,
								children: busy === "email" ? "Please wait…" : mode === "in" ? "Log in with email" : "Create account"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-center text-sm text-muted",
						children: [
							mode === "in" ? "New to PoolMate?" : "Already have an account?",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("font-semibold text-brand hover:text-brand-dark"),
								onClick: () => {
									setMode((m) => m === "in" ? "up" : "in");
									setError(null);
								},
								children: mode === "in" ? "Create an account" : "Log in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-center text-xs text-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hover:text-ink",
							children: "← Back to homepage"
						})
					})
				]
			})]
		})]
	});
}
//#endregion
export { LoginPage as component };
