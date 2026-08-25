import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-DDpDggPa.mjs";
import { cn as _enum, gn as object, hn as number, yn as string } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-DYIBkhsC.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var roleSchema = _enum(["rider", "driver"]);
var serviceSchema = _enum([
	"rides",
	"cargo",
	"food",
	"delivery"
]);
var statusSchema = _enum([
	"requested",
	"matched",
	"enroute",
	"arrived",
	"completed",
	"cancelled"
]);
var paySchema = _enum([
	"mobile_money",
	"cash",
	"card"
]);
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("3457561740fa67d06d4cd584c53e94b0e881e7c68c1e3733c1a12b4c46feb1af"));
var saveMyRole = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	role: roleSchema,
	displayName: string().trim().max(80).optional()
}).parse(input)).handler(createSsrRpc("77429f7d7bce703d49601fd7c715f6cfbea1c584c633d68b47742bdfd91e95b0"));
var createTripSchema = object({
	service: serviceSchema,
	pickup: string().trim().min(2).max(120),
	dropoff: string().trim().min(2).max(120),
	vehicleClass: string().trim().min(1).max(40),
	fare: number().int().min(1).max(1e5),
	notes: string().trim().max(240).optional(),
	payMethod: paySchema.optional()
});
var createTrip = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => createTripSchema.parse(input)).handler(createSsrRpc("fe730404e488612ecf0679ac92905b0afbf2134b8ce2c9027d24d032e7683ea8"));
var listMyTrips = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("0c43127253ff3ddf0fc5271e1e11cf5ff5b3a545bd03fbfb926e046073ba8141"));
var patchSchema = object({
	id: string().min(1),
	status: statusSchema,
	driverName: string().trim().max(80).optional(),
	driverVehicle: string().trim().max(80).optional()
});
var patchTrip = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => patchSchema.parse(input)).handler(createSsrRpc("2c423f300cc00639b0b06a7d02c739d0e078febd3b07f98a593dd3655926bff6"));
//#endregion
export { saveMyRole as a, patchTrip as i, getMyProfile as n, listMyTrips as r, createTrip as t };
