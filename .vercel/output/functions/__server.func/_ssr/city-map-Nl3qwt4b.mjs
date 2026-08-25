import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { a as LOCATIONS, u as findLocation } from "./catalog-BM8DsjeW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/city-map-Nl3qwt4b.js
var import_jsx_runtime = require_jsx_runtime();
function CityMap({ pickup, dropoff, moving = false, className }) {
	const a = pickup ? findLocation(pickup) : void 0;
	const b = dropoff ? findLocation(dropoff) : void 0;
	const path = a && b ? `M ${a.x} ${a.y} C ${(a.x + b.x) / 2} ${a.y - 8}, ${(a.x + b.x) / 2} ${b.y + 8}, ${b.x} ${b.y}` : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative h-full min-h-64 overflow-hidden bg-sand", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 100 100",
				className: "absolute inset-0 size-full",
				preserveAspectRatio: "xMidYMid slice",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: "100",
						height: "100",
						fill: "#f3e0cc"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "38",
						y: "42",
						width: "18",
						height: "16",
						rx: "1",
						fill: "#e8d2b8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "62",
						y: "30",
						width: "22",
						height: "14",
						rx: "1",
						fill: "#e8d2b8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "24",
						y: "28",
						width: "14",
						height: "12",
						rx: "1",
						fill: "#d9c4a8"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 20 36 L 88 28",
						fill: "none",
						stroke: "#d6c0a4",
						strokeWidth: "3.2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 36 90 L 48 48 L 86 16",
						fill: "none",
						stroke: "#cbb394",
						strokeWidth: "4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 10 52 L 90 52",
						fill: "none",
						stroke: "#d6c0a4",
						strokeWidth: "2.4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 40 95 L 40 20",
						fill: "none",
						stroke: "#d6c0a4",
						strokeWidth: "2.2"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 8 78 L 70 78 L 78 60",
						fill: "none",
						stroke: "#cbb394",
						strokeWidth: "3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "46",
						cy: "50",
						r: "5.5",
						fill: "#fff1e6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "46",
						y: "51.5",
						textAnchor: "middle",
						fontSize: "3.2",
						fill: "#78716c",
						fontFamily: "Sora, sans-serif",
						children: "CBD"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "78",
						y: "14",
						textAnchor: "middle",
						fontSize: "2.8",
						fill: "#78716c",
						fontFamily: "Manrope, sans-serif",
						children: "Airport"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "30",
						y: "34",
						fontSize: "2.6",
						fill: "#78716c",
						fontFamily: "Manrope, sans-serif",
						children: "Matero"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
						x: "42",
						y: "88",
						fontSize: "2.6",
						fill: "#78716c",
						fontFamily: "Manrope, sans-serif",
						children: "Kafue Rd"
					}),
					path ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: path,
						fill: "none",
						stroke: "#f05a10",
						strokeWidth: "1.8",
						strokeLinecap: "round",
						strokeDasharray: "2 1.4"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M 40 78 C 42 60, 48 52, 64 40 C 72 34, 78 24, 82 18",
						fill: "none",
						stroke: "#f05a10",
						strokeWidth: "1.4",
						opacity: "0.55"
					}),
					LOCATIONS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: l.x,
						cy: l.y,
						r: "0.7",
						fill: "#c4b09a"
					}, l.id)),
					a ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: a.x,
						cy: a.y,
						r: "2.4",
						fill: "#1c1917"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: a.x,
						cy: a.y,
						r: "1.1",
						fill: "#fffbf7"
					})] }) : null,
					b ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: b.x,
						cy: b.y,
						r: "2.6",
						fill: "#f05a10"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: b.x,
						cy: b.y,
						r: "1.1",
						fill: "#fffbf7"
					})] }) : null
				]
			}),
			moving && a && b ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute size-2.5 rounded-full bg-brand shadow-lift",
				style: {
					left: `${(a.x + b.x) / 2}%`,
					top: `${(a.y + b.y) / 2}%`,
					transform: "translate(-50%, -50%)"
				}
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute left-4 top-4 rounded-lg bg-paper/90 px-3 py-1.5 text-xs font-medium text-ink shadow-card",
				children: "Lusaka"
			})
		]
	});
}
//#endregion
export { CityMap as t };
