import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql } from "@/lib/db";
import type { Profile, Trip, TripStatus } from "./types";

const roleSchema = z.enum(["rider", "driver"]);
const serviceSchema = z.enum(["rides", "cargo", "food", "delivery"]);
const statusSchema = z.enum([
  "requested",
  "matched",
  "enroute",
  "arrived",
  "completed",
  "cancelled",
]);
const paySchema = z.enum(["mobile_money", "cash", "card"]);

type TripRow = {
  id: string;
  user_id: string;
  service: Trip["service"];
  pickup: string;
  dropoff: string;
  vehicle_class: string;
  fare: number;
  status: TripStatus;
  driver_name: string | null;
  driver_vehicle: string | null;
  notes: string | null;
  pay_method: Trip["payMethod"];
  created_at: string;
};

function mapTrip(row: TripRow): Trip {
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
    createdAt:
      typeof row.created_at === "string"
        ? row.created_at
        : new Date(row.created_at as unknown as string).toISOString(),
  };
}

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<Profile | null> => {
    const sql = await getSql();
    const rows = await sql<{
      user_id: string;
      role: Profile["role"];
      display_name: string | null;
    }>`select user_id, role, display_name from profiles where user_id = ${context.userId}`;
    const row = rows[0];
    if (!row) return null;
    return { userId: row.user_id, role: row.role, displayName: row.display_name };
  });

export const saveMyRole = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) =>
    z.object({ role: roleSchema, displayName: z.string().trim().max(80).optional() }).parse(input),
  )
  .handler(async ({ context, data }): Promise<Profile> => {
    const sql = await getSql();
    const name = data.displayName || null;
    await sql`
      insert into profiles (user_id, role, display_name)
      values (${context.userId}, ${data.role}, ${name})
      on conflict (user_id) do update set
        role = excluded.role,
        display_name = coalesce(excluded.display_name, profiles.display_name)
    `;
    return { userId: context.userId, role: data.role, displayName: name };
  });

const createTripSchema = z.object({
  service: serviceSchema,
  pickup: z.string().trim().min(2).max(120),
  dropoff: z.string().trim().min(2).max(120),
  vehicleClass: z.string().trim().min(1).max(40),
  fare: z.number().int().min(1).max(100000),
  notes: z.string().trim().max(240).optional(),
  payMethod: paySchema.optional(),
});

export const createTrip = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => createTripSchema.parse(input))
  .handler(async ({ context, data }): Promise<Trip> => {
    const sql = await getSql();
    const id = crypto.randomUUID();
    const pay = data.payMethod ?? "mobile_money";
    const notes = data.notes ?? null;
    const rows = await sql<TripRow>`
      insert into trips (
        id, user_id, service, pickup, dropoff, vehicle_class, fare, status, notes, pay_method
      ) values (
        ${id}, ${context.userId}, ${data.service}, ${data.pickup}, ${data.dropoff},
        ${data.vehicleClass}, ${data.fare}, ${"requested"}, ${notes}, ${pay}
      )
      returning id, user_id, service, pickup, dropoff, vehicle_class, fare, status,
        driver_name, driver_vehicle, notes, pay_method, created_at
    `;
    return mapTrip(rows[0]!);
  });

export const listMyTrips = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }): Promise<Trip[]> => {
    const sql = await getSql();
    const rows = await sql<TripRow>`
      select id, user_id, service, pickup, dropoff, vehicle_class, fare, status,
        driver_name, driver_vehicle, notes, pay_method, created_at
      from trips
      where user_id = ${context.userId}
      order by created_at desc
      limit 40
    `;
    return rows.map(mapTrip);
  });

const patchSchema = z.object({
  id: z.string().min(1),
  status: statusSchema,
  driverName: z.string().trim().max(80).optional(),
  driverVehicle: z.string().trim().max(80).optional(),
});

export const patchTrip = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: unknown) => patchSchema.parse(input))
  .handler(async ({ context, data }): Promise<Trip | null> => {
    const sql = await getSql();
    const driverName = data.driverName ?? null;
    const driverVehicle = data.driverVehicle ?? null;
    const rows = await sql<TripRow>`
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
