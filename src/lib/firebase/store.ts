/**
 * Shared driver / passenger directory.
 * Same localStorage keys as public/website so HTML files and this app
 * see one database. Writes to Firestore when a live config is saved.
 */
const LS_DB = "poolmate.v1.db";
const LS_CONFIG = "poolmate.v1.firebase";

export type DirectoryRole = "passenger" | "driver";

export type DirectoryPerson = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: DirectoryRole;
  area?: string;
  vehicle?: string;
  plate?: string;
  status?: string;
  createdAt: string;
};

type LocalDb = {
  users: Record<string, DirectoryPerson & { passwordHash?: string; demo?: boolean }>;
  passengers: Record<string, DirectoryPerson>;
  drivers: Record<string, DirectoryPerson>;
  trips: Record<string, unknown>;
};

function emptyDb(): LocalDb {
  return { users: {}, passengers: {}, drivers: {}, trips: {} };
}

function readDb(): LocalDb {
  try {
    const raw = typeof localStorage === "undefined" ? null : localStorage.getItem(LS_DB);
    const db = raw ? ({ ...emptyDb(), ...JSON.parse(raw) } as LocalDb) : emptyDb();
    return ensureSeed(db);
  } catch {
    return ensureSeed(emptyDb());
  }
}

function ensureSeed(db: LocalDb): LocalDb {
  if (typeof localStorage === "undefined") return db;
  if (localStorage.getItem("poolmate.v1.seeded")) return db;
  const now = new Date().toISOString();
  const passengers = [
    { id: "seed-p-1", name: "Chipo Daka", email: "chipo@email.com", phone: "097 111 2201", area: "Roma Park" },
    { id: "seed-p-2", name: "Mwansa Phiri", email: "mwansa@email.com", phone: "096 442 1180", area: "Kabulonga" },
  ];
  const drivers = [
    { id: "seed-d-1", name: "Chanda Mwale", email: "chanda.driver@email.com", phone: "097 555 0144", vehicle: "Toyota Corolla", plate: "BAC 4412", status: "online" },
    { id: "seed-d-2", name: "Mutale Banda", email: "mutale.driver@email.com", phone: "096 220 8891", vehicle: "Honda Fit", plate: "ALD 8821", status: "online" },
    { id: "seed-d-3", name: "Thandi Phiri", email: "thandi.driver@email.com", phone: "095 773 4410", vehicle: "Suzuki Swift", plate: "AAE 1904", status: "offline" },
  ];
  for (const p of passengers) {
    db.passengers[p.id] = { ...p, role: "passenger", createdAt: now };
    db.users[p.id] = { ...db.passengers[p.id], demo: true };
  }
  for (const d of drivers) {
    db.drivers[d.id] = { ...d, role: "driver", createdAt: now };
    db.users[d.id] = { ...db.drivers[d.id], demo: true };
  }
  writeDb(db);
  localStorage.setItem("poolmate.v1.seeded", "1");
  return db;
}

function writeDb(db: LocalDb) {
  localStorage.setItem(LS_DB, JSON.stringify(db));
}

export function mapAppRole(role: "rider" | "driver" | "passenger"): DirectoryRole {
  return role === "driver" ? "driver" : "passenger";
}

export function upsertDirectoryProfile(input: {
  id: string;
  name: string;
  email: string;
  role: DirectoryRole;
  phone?: string;
  vehicle?: string;
  plate?: string;
}): DirectoryPerson {
  const now = new Date().toISOString();
  const person: DirectoryPerson = {
    id: input.id,
    name: input.name || input.email.split("@")[0] || "Member",
    email: input.email,
    phone: input.phone || "",
    role: input.role,
    createdAt: now,
    area: "Lusaka",
    vehicle: input.vehicle,
    plate: input.plate,
    status: input.role === "driver" ? "online" : undefined,
  };
  const db = readDb();
  db.users[input.id] = { ...db.users[input.id], ...person };
  if (input.role === "passenger") {
    db.passengers[input.id] = { ...db.passengers[input.id], ...person };
    delete db.drivers[input.id];
  } else {
    db.drivers[input.id] = {
      ...db.drivers[input.id],
      ...person,
      vehicle: input.vehicle || db.drivers[input.id]?.vehicle || "Toyota Corolla",
      plate: input.plate || db.drivers[input.id]?.plate || "LUSAKA",
      status: "online",
    };
    delete db.passengers[input.id];
  }
  writeDb(db);
  void syncFirestore(person);
  return person;
}

export function listPassengers(): DirectoryPerson[] {
  return Object.values(readDb().passengers);
}

export function listDrivers(): DirectoryPerson[] {
  return Object.values(readDb().drivers);
}

function liveConfig(): Record<string, string> | null {
  try {
    const raw = localStorage.getItem(LS_CONFIG);
    const cfg = raw ? JSON.parse(raw) : null;
    if (!cfg?.apiKey || !cfg?.projectId) return null;
    if (String(cfg.apiKey).startsWith("PASTE")) return null;
    if (String(cfg.projectId).startsWith("YOUR_")) return null;
    return cfg;
  } catch {
    return null;
  }
}

function firestoreFields(person: DirectoryPerson) {
  const fields: Record<string, { stringValue: string }> = {
    name: { stringValue: person.name },
    email: { stringValue: person.email },
    phone: { stringValue: person.phone || "" },
    role: { stringValue: person.role },
    createdAt: { stringValue: person.createdAt },
  };
  if (person.area) fields.area = { stringValue: person.area };
  if (person.vehicle) fields.vehicle = { stringValue: person.vehicle };
  if (person.plate) fields.plate = { stringValue: person.plate };
  if (person.status) fields.status = { stringValue: person.status };
  return fields;
}

async function syncFirestore(person: DirectoryPerson) {
  const cfg = liveConfig();
  if (!cfg) return;
  const col = person.role === "driver" ? "drivers" : "passengers";
  const base = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(cfg.projectId)}/databases/(default)/documents`;
  const body = JSON.stringify({ fields: firestoreFields(person) });
  const opts = { method: "PATCH", headers: { "Content-Type": "application/json" }, body };
  try {
    await fetch(`${base}/users/${encodeURIComponent(person.id)}?key=${encodeURIComponent(cfg.apiKey)}`, opts);
    await fetch(`${base}/${col}/${encodeURIComponent(person.id)}?key=${encodeURIComponent(cfg.apiKey)}`, opts);
  } catch {
    // Preview still has the local collections if Firestore rejects unauthenticated writes.
  }
}
