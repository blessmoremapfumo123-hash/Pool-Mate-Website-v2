import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as useCurrentUserState, t as Logo } from "./logo-C19bMx66.mjs";
import { n as SignedIn, r as SignedOut } from "./gates-fnFB1ke-.mjs";
import { C as Banknote, S as Bike, c as Smartphone, h as MapPinned, i as UtensilsCrossed, l as ShoppingBag, m as Menu, o as Truck, p as Package, r as WalletCards, t as X, u as ShieldCheck, w as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as AccountSlot } from "./account-menu-Dm5Xl5SX.mjs";
import { c as SERVICES, m as suggestLocations, n as CORRIDORS } from "./catalog-BM8DsjeW.mjs";
import { t as Badge } from "./badge-DhhlYkNw.mjs";
import { t as Button } from "./button-BUGr8b6B.mjs";
import { t as Input } from "./input-DjaqlN96.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-soF3JsKd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		href: "/#services",
		label: "Services"
	},
	{
		href: "/#how",
		label: "How it works"
	},
	{
		href: "/#download",
		label: "Get the app"
	}
];
function SiteHeader({ solid = false }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { isPending } = useCurrentUserState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("sticky top-0 z-30 border-b border-line/80 bg-paper/90 backdrop-blur-md", solid && "bg-paper"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-1 md:flex",
					children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						className: "rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-cream hover:text-ink",
						children: item.label
					}, item.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSlot, {}),
						!isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							className: "hidden sm:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Get started"
							})
						}) }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							className: "hidden sm:inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/dashboard",
								children: "Open app"
							})
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "grid size-11 place-items-center rounded-lg hover:bg-cream md:hidden",
							onClick: () => setOpen((v) => !v),
							"aria-label": open ? "Close menu" : "Open menu",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-line bg-paper px-4 py-3 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col",
				children: [NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: item.href,
					className: "rounded-lg px-3 py-3 text-sm font-medium",
					onClick: () => setOpen(false),
					children: item.label
				}, item.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "rounded-lg px-3 py-3 text-sm font-medium",
					onClick: () => setOpen(false),
					children: "Log in"
				})]
			})
		}) : null]
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-line bg-ink text-brand-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { light: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-sm text-sm leading-relaxed text-brand-fg/70",
						children: "Corridor pooling for Lusaka — rides, cargo, food and parcels. Built for daily travel, paid the way you already pay."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm font-semibold",
					children: "Product"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm text-brand-fg/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#services",
							className: "hover:text-brand-fg",
							children: "Services"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#how",
							className: "hover:text-brand-fg",
							children: "How it works"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#download",
							className: "hover:text-brand-fg",
							children: "Download"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/login",
							className: "hover:text-brand-fg",
							children: "Log in"
						}) })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-sm font-semibold",
					children: "Safety & pay"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-3 space-y-2 text-sm text-brand-fg/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Verified drivers" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Live route sharing" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Airtel Money · MTN · cash" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "24/7 support" })
					]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-white/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-brand-fg/50 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" PoolMate. Lusaka, Zambia."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Share the stretch. Keep the change." })]
			})
		})]
	});
}
var ICONS$1 = {
	rides: Bike,
	cargo: Truck,
	food: UtensilsCrossed,
	delivery: Package
};
function BookingWidget({ compact = false }) {
	const navigate = useNavigate();
	const [service, setService] = (0, import_react.useState)("rides");
	const [pickup, setPickup] = (0, import_react.useState)("");
	const [dropoff, setDropoff] = (0, import_react.useState)("");
	const [focus, setFocus] = (0, import_react.useState)(null);
	const pickupHints = (0, import_react.useMemo)(() => focus === "pickup" ? suggestLocations(pickup, dropoff) : [], [
		focus,
		pickup,
		dropoff
	]);
	const dropHints = (0, import_react.useMemo)(() => focus === "dropoff" ? suggestLocations(dropoff, pickup) : [], [
		focus,
		dropoff,
		pickup
	]);
	function go() {
		const draft = {
			service,
			pickup,
			dropoff
		};
		try {
			sessionStorage.setItem("pm.draft", JSON.stringify(draft));
		} catch {}
		navigate({ to: "/login" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-2xl bg-paper p-2 shadow-lift", compact ? "p-2" : "p-2 sm:p-2.5"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-4 gap-1 rounded-xl bg-cream p-1",
			children: SERVICES.map((s) => {
				const Icon = ICONS$1[s.id];
				const on = service === s.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setService(s.id),
					className: cn("flex flex-col items-center gap-1 rounded-lg px-1 py-2.5 text-xs font-semibold", "transition-colors duration-150", on ? "bg-paper text-ink shadow-card" : "text-ink-soft hover:text-ink"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-4", on ? "text-brand" : "text-muted") }), s.name]
				}, s.id);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-3 space-y-2 px-1 pb-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: service === "food" ? "Restaurant area" : "Pickup",
					value: pickup,
					onChange: setPickup,
					placeholder: service === "food" ? "Kamwala, Levy, East Park…" : "Cairo Road, CBD",
					onFocus: () => setFocus("pickup"),
					onBlur: () => setTimeout(() => setFocus((f) => f === "pickup" ? null : f), 120),
					hints: pickupHints.map((l) => l.name),
					onPick: (v) => {
						setPickup(v);
						setFocus(null);
					},
					dot: "brand"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: service === "food" ? "Deliver to" : "Where to",
					value: dropoff,
					onChange: setDropoff,
					placeholder: "Kenneth Kaunda Airport",
					onFocus: () => setFocus("dropoff"),
					onBlur: () => setTimeout(() => setFocus((f) => f === "dropoff" ? null : f), 120),
					hints: dropHints.map((l) => l.name),
					onPick: (v) => {
						setDropoff(v);
						setFocus(null);
					},
					dot: "ink"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "lg",
					className: "mt-2 w-full",
					onClick: go,
					children: [service === "food" ? "Find kitchens" : "Request PoolMate", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center justify-center gap-1.5 pt-1 text-center text-xs text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-3.5" }), "Mobile Money, Airtel Money or cash"]
				})
			]
		})]
	});
}
function Field({ label, value, onChange, placeholder, onFocus, onBlur, hints, onPick, dot }) {
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
				className: "absolute z-20 mt-1 w-full overflow-hidden rounded-xl bg-paper py-1 shadow-lift",
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
function HeroVisual() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-2xl bg-brand text-brand-fg shadow-lift",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 100 100",
			className: "absolute inset-0 size-full",
			"aria-hidden": "true",
			preserveAspectRatio: "xMidYMid slice",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: "100",
					height: "100",
					fill: "#e24e0c"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M-10 70 L40 48 L110 62 L110 100 L-10 100 Z",
					fill: "#c2410c",
					opacity: "0.55"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M-10 20 L60 8 L110 22 L110 0 L-10 0 Z",
					fill: "#ff7a38",
					opacity: "0.35"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M8 92 C 22 70, 30 58, 48 50 C 62 44, 74 30, 92 16",
					fill: "none",
					stroke: "white",
					strokeWidth: "3.2",
					strokeLinecap: "round",
					opacity: "0.95"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M14 96 C 26 74, 34 62, 52 54 C 66 48, 78 34, 96 20",
					fill: "none",
					stroke: "white",
					strokeWidth: "3.2",
					strokeLinecap: "round",
					opacity: "0.45"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "48",
					cy: "50",
					r: "3.2",
					fill: "white"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "92",
					cy: "16",
					r: "3.2",
					fill: "white",
					opacity: "0.85"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex min-h-80 flex-col justify-between p-6 sm:min-h-96 sm:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-brand-fg/70",
				children: "Live corridors"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl",
				children: "Lusaka is pooling right now."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 space-y-2",
				children: CORRIDORS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 rounded-xl bg-ink/15 px-3.5 py-3 backdrop-blur-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: c.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-brand-fg/70",
						children: [
							c.from,
							" → ",
							c.to
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-semibold tabular-nums",
							children: [c.pooling, " pooling"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-brand-fg/70",
							children: c.save
						})]
					})]
				}, c.name))
			})]
		})]
	});
}
var ICONS = {
	rides: Bike,
	cargo: Truck,
	food: UtensilsCrossed,
	delivery: Package
};
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Services, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Why, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(How, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriveCta, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pm-rise",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "brand",
						children: "Lusaka · corridor pooling"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]",
						children: ["Same road.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-brand",
							children: " Split the fare."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg",
						children: "PoolMate matches you on Lusaka’s busiest corridors — then cargo, food and parcels, paid with Mobile Money."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 max-w-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingWidget, {})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pm-rise",
				style: { animationDelay: "80ms" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroVisual, {})
			})]
		})
	});
}
function Services() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "services",
		className: "scroll-mt-20 bg-cream/60 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-brand",
					children: "Services"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl",
					children: "One app. Four ways to move."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-ink-soft",
					children: "Built like a super app, priced for daily travel. Pick a service, set pickup and where to, and go."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
					children: SERVICES.map((s) => {
						const Icon = ICONS[s.id];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "flex flex-col rounded-2xl bg-paper p-5 shadow-card transition-[box-shadow] duration-150 hover:shadow-lift",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-11 place-items-center rounded-xl bg-cream text-brand",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-5 font-display text-lg font-semibold",
									children: s.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-medium uppercase tracking-wider text-brand",
									children: s.tag
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 flex-1 text-sm leading-relaxed text-ink-soft",
									children: s.blurb
								})
							]
						}, s.id);
					})
				})
			]
		})
	});
}
function Why() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-2xl text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-semibold tracking-tight sm:text-4xl",
					children: "Why choose PoolMate?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-ink-soft",
					children: "Built for real daily travel needs."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-4 md:grid-cols-3",
				children: [
					{
						icon: MapPinned,
						title: "Corridor pooling",
						body: "Share rides on fixed popular routes and cut your daily transport cost — without the chaos of street-hailing."
					},
					{
						icon: ShieldCheck,
						title: "Safety first",
						body: "Verified drivers, vehicle checks, live route sharing and a one-tap emergency line."
					},
					{
						icon: WalletCards,
						title: "Local payments",
						body: "Airtel Money, MTN MoMo or cash. The fare is locked before you sit down."
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-2xl bg-paper p-6 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-11 place-items-center rounded-xl bg-cream text-brand",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-5 font-display text-lg font-semibold text-brand",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-ink-soft",
							children: item.body
						})
					]
				}, item.title))
			})]
		})
	});
}
function How() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "how",
		className: "scroll-mt-20 bg-ink py-20 text-brand-fg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-brand",
					children: "How it works"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl",
					children: "Three steps. Then you’re moving."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 md:grid-cols-3",
					children: [
						{
							n: "01",
							title: "Set pickup and where to",
							body: "Choose a corridor stop or any Lusaka landmark. See the fare before you confirm."
						},
						{
							n: "02",
							title: "Match on the stretch",
							body: "Pool with others heading the same way, or take Economy, Comfort or XL to yourself."
						},
						{
							n: "03",
							title: "Pay the way you already pay",
							body: "Mobile Money or cash. Rate the trip. Your history and wallet stay in the app."
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "rounded-2xl bg-white/5 p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm font-semibold text-brand",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-display text-xl font-semibold",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-brand-fg/70",
								children: s.body
							})
						]
					}, s.n))
				})
			]
		})
	});
}
function DriveCta() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-center gap-8 overflow-hidden rounded-2xl bg-cream p-8 shadow-card md:grid-cols-2 md:p-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "brand",
						children: "Earn"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-3xl font-semibold tracking-tight",
						children: "Drive the corridor you already know."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-md text-sm leading-relaxed text-ink-soft",
						children: "Go online, fill empty seats, and take cargo or parcels on the way. Payouts land in Mobile Money."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-6",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/login",
							children: ["Become a driver", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: [
						"Keep your own hours on Great East, Kafue and the CBD loop",
						"See the fare before you accept",
						"Vehicle checks and in-app support"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-xl bg-paper px-4 py-3 text-sm shadow-card",
						children: t
					}, t))
				})]
			})
		})
	});
}
function Download() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "download",
		className: "scroll-mt-20 pb-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-6xl px-4 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-stretch gap-8 overflow-hidden rounded-2xl bg-brand text-brand-fg md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center p-8 md:p-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.18em] text-brand-fg/70",
							children: "Get the app"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl",
							children: "PoolMate in your pocket."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-md text-sm leading-relaxed text-brand-fg/80",
							children: "Book rides, send cargo, order food and dispatch parcels. Scan the code or use the buttons — then sign in with the same account."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreButton, {
								store: "App Store",
								sub: "Download on the"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreButton, {
								store: "Google Play",
								sub: "Get it on"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 flex items-center gap-2 text-xs text-brand-fg/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-3.5" }),
								"4.9 · 58k ratings",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "size-3.5" }),
								"Mobile Money ready"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative flex items-center justify-center px-8 py-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneMock, {})
				})]
			})
		})
	});
}
function StoreButton({ store, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: "#download",
		className: "inline-flex items-center gap-3 rounded-xl bg-ink px-4 py-2.5 text-brand-fg transition-opacity hover:opacity-90",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid size-8 place-items-center rounded-md bg-brand-fg/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-xs uppercase tracking-wider text-brand-fg/70",
				children: sub
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-sm font-semibold",
				children: store
			})]
		})]
	});
}
function PhoneMock() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative w-52 rounded-3xl bg-ink p-2 shadow-lift",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "overflow-hidden rounded-2xl bg-paper text-ink",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-4 pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-sm font-semibold",
						children: "PoolMate"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-muted",
						children: "Lusaka"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-3 mt-3 h-28 rounded-xl bg-cream",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 100 60",
						className: "size-full",
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M8 50 C 28 40, 40 32, 70 18",
								fill: "none",
								stroke: "#f05a10",
								strokeWidth: "3",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "8",
								cy: "50",
								r: "3",
								fill: "#1c1917"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: "70",
								cy: "18",
								r: "3",
								fill: "#f05a10"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2 p-3 pb-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-cream px-3 py-2 text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: "Pickup"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Cairo Road, CBD"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-cream px-3 py-2 text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: "Where to"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Kenneth Kaunda Airport"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg bg-brand px-3 py-2 text-center text-[11px] font-semibold text-brand-fg",
							children: "Request Pool · K 42"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { Home as component };
