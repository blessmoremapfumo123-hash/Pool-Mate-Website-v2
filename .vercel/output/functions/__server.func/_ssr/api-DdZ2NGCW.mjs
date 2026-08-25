import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-DDv8C0qH.mjs";
import { t as authMiddleware } from "./middleware-DDpDggPa.mjs";
import { cn as _enum, gn as object, hn as number, yn as string } from "../_libs/@better-auth/core+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-DdZ2NGCW.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
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
function mapTrip(row) {
	return {
		id: row.id,
		userId: row.user_id,
		service: row.service,
		pickup: row.pickup,
		dropoff: row.dropoff,
		vehicleClass: row.vehicle_class,
		fare: Number(row.fare),
		status: row.status,
		driverName: row.driver_name,
		driverVehicle: row.driver_vehicle,
		notes: row.notes,
		payMethod: row.pay_method,
		createdAt: typeof row.created_at === "string" ? row.created_at : new Date(row.created_at).toISOString()
	};
}
var getMyProfile_createServerFn_handler = createServerRpc({
	id: "3457561740fa67d06d4cd584c53e94b0e881e7c68c1e3733c1a12b4c46feb1af",
	name: "getMyProfile",
	filename: "src/lib/poolmate/api.ts"
}, (opts) => getMyProfile.__executeServer(opts));
var getMyProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyProfile_createServerFn_handler, async ({ context }) => {
	const row = (await (await getSql())`select user_id, role, display_name from profiles where user_id = ${context.userId}`)[0];
	if (!row) return null;
	return {
		userId: row.user_id,
		role: row.role,
		displayName: row.display_name
	};
});
var saveMyRole_createServerFn_handler = createServerRpc({
	id: "77429f7d7bce703d49601fd7c715f6cfbea1c584c633d68b47742bdfd91e95b0",
	name: "saveMyRole",
	filename: "src/lib/poolmate/api.ts"
}, (opts) => saveMyRole.__executeServer(opts));
var saveMyRole = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => object({
	role: roleSchema,
	displayName: string().trim().max(80).optional()
}).parse(input)).handler(saveMyRole_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const name = data.displayName || null;
	await sql`
      insert into profiles (user_id, role, display_name)
      values (${context.userId}, ${data.role}, ${name})
      on conflict (user_id) do update set
        role = excluded.role,
        display_name = coalesce(excluded.display_name, profiles.display_name)
    `;
	return {
		userId: context.userId,
		role: data.role,
		displayName: name
	};
});
var createTripSchema = object({
	service: serviceSchema,
	pickup: string().trim().min(2).max(120),
	dropoff: string().trim().min(2).max(120),
	vehicleClass: string().trim().min(1).max(40),
	fare: number().int().min(1).max(1e5),
	notes: string().trim().max(240).optional(),
	payMethod: paySchema.optional()
});
var createTrip_createServerFn_handler = createServerRpc({
	id: "fe730404e488612ecf0679ac92905b0afbf2134b8ce2c9027d24d032e7683ea8",
	name: "createTrip",
	filename: "src/lib/poolmate/api.ts"
}, (opts) => createTrip.__executeServer(opts));
var createTrip = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => createTripSchema.parse(input)).handler(createTrip_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const id = crypto.randomUUID();
	const pay = data.payMethod ?? "mobile_money";
	const notes = data.notes ?? null;
	return mapTrip((await sql`
      insert into trips (
        id, user_id, service, pickup, dropoff, vehicle_class, fare, status, notes, pay_method
      ) values (
        ${id}, ${context.userId}, ${data.service}, ${data.pickup}, ${data.dropoff},
        ${data.vehicleClass}, ${data.fare}, ${"requested"}, ${notes}, ${pay}
      )
      returning id, user_id, service, pickup, dropoff, vehicle_class, fare, status,
        driver_name, driver_vehicle, notes, pay_method, created_at
    `)[0]);
});
var listMyTrips_createServerFn_handler = createServerRpc({
	id: "0c43127253ff3ddf0fc5271e1e11cf5ff5b3a545bd03fbfb926e046073ba8141",
	name: "listMyTrips",
	filename: "src/lib/poolmate/api.ts"
}, (opts) => listMyTrips.__executeServer(opts));
var listMyTrips = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyTrips_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select id, user_id, service, pickup, dropoff, vehicle_class, fare, status,
        driver_name, driver_vehicle, notes, pay_method, created_at
      from trips
      where user_id = ${context.userId}
      order by created_at desc
      limit 40
    `).map(mapTrip);
});
var patchSchema = object({
	id: string().min(1),
	status: statusSchema,
	driverName: string().trim().max(80).optional(),
	driverVehicle: string().trim().max(80).optional()
});
var patchTrip_createServerFn_handler = createServerRpc({
	id: "2c423f300cc00639b0b06a7d02c739d0e078febd3b07f98a593dd3655926bff6",
	name: "patchTrip",
	filename: "src/lib/poolmate/api.ts"
}, (opts) => patchTrip.__executeServer(opts));
var patchTrip = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => patchSchema.parse(input)).handler(patchTrip_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const driverName = data.driverName ?? null;
	const driverVehicle = data.driverVehicle ?? null;
	const rows = await sql`
      update trips set
        status = ${data.status},
        driver_name = coalesce(${driverName}, driver_name),
        driver_vehicle = coalesce(${driverVehicle}, driver_vehicle)
      where id = ${data.id} and user_id = ${context.userId}
      returning id, user_id, service, pickup, dropoff, vehicle_class, fare, status,
        driver_name, driver_vehicle, notes, pay_method, created_at
    `;
	return rows[0] ? mapTrip(rows[0]) : null;
});
//#endregion
export { createTrip_createServerFn_handler, getMyProfile_createServerFn_handler, listMyTrips_createServerFn_handler, patchTrip_createServerFn_handler, saveMyRole_createServerFn_handler };
