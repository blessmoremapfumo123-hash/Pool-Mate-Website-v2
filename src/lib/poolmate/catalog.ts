import type { Location, Restaurant, RideClass, ServiceId } from "./types";

export const CITY = "Lusaka";
export const CURRENCY = "K";

export const LOCATIONS: Location[] = [
  { id: "cairo", name: "Cairo Road, CBD", area: "City Centre", x: 46, y: 50 },
  { id: "kamwala", name: "Kamwala Market", area: "City Centre", x: 44, y: 58 },
  { id: "levy", name: "Levy Junction", area: "Great East Road", x: 64, y: 40 },
  { id: "manda", name: "Manda Hill", area: "Great East Road", x: 70, y: 44 },
  { id: "arcades", name: "Arcades Mall", area: "Great East Road", x: 68, y: 48 },
  { id: "eastpark", name: "East Park Mall", area: "Great East Road", x: 72, y: 36 },
  { id: "airport", name: "Kenneth Kaunda Airport", area: "North-East", x: 82, y: 18 },
  { id: "chelston", name: "Chelston", area: "Great East Road", x: 84, y: 32 },
  { id: "roma", name: "Roma Park", area: "North", x: 56, y: 34 },
  { id: "olympia", name: "Olympia Park", area: "East", x: 60, y: 50 },
  { id: "woodlands", name: "Woodlands", area: "South-East", x: 58, y: 64 },
  { id: "kabulonga", name: "Kabulonga", area: "South-East", x: 64, y: 70 },
  { id: "unza", name: "University of Zambia", area: "Great East Road", x: 54, y: 72 },
  { id: "chilenje", name: "Chilenje", area: "South", x: 50, y: 76 },
  { id: "kafue", name: "Kafue Roundabout", area: "Kafue Road", x: 40, y: 80 },
  { id: "crossroads", name: "Crossroads", area: "Kafue Road", x: 36, y: 66 },
  { id: "garden", name: "Garden Compound", area: "West", x: 32, y: 48 },
  { id: "matero", name: "Matero", area: "North-West", x: 28, y: 36 },
  { id: "northmead", name: "Northmead", area: "North", x: 50, y: 40 },
  { id: "showgrounds", name: "Showgrounds", area: "City Centre", x: 52, y: 54 },
];

export const SERVICES: {
  id: ServiceId;
  name: string;
  tag: string;
  blurb: string;
}[] = [
  {
    id: "rides",
    name: "Rides",
    tag: "Corridor + private",
    blurb: "Share a fixed route or take a car of your own. Live tracking, verified drivers.",
  },
  {
    id: "cargo",
    name: "Cargo",
    tag: "Vans & trucks",
    blurb: "Move furniture, stock or site materials with a sized vehicle and a helper.",
  },
  {
    id: "food",
    name: "Food",
    tag: "From kitchens nearby",
    blurb: "Order from Lusaka kitchens and have it at your gate, still hot.",
  },
  {
    id: "delivery",
    name: "Delivery",
    tag: "Parcels in the city",
    blurb: "Send a package across town the way you would book a ride.",
  },
];

export const RIDE_CLASSES: RideClass[] = [
  {
    id: "pool",
    name: "Pool",
    blurb: "Share the corridor, split the fare",
    eta: "5 min",
    rate: 7,
    min: 22,
    seats: "Shared",
  },
  {
    id: "economy",
    name: "Economy",
    blurb: "A car to yourself, everyday price",
    eta: "4 min",
    rate: 11,
    min: 34,
    seats: "4 seats",
  },
  {
    id: "comfort",
    name: "Comfort",
    blurb: "Newer cars, extra legroom, AC",
    eta: "6 min",
    rate: 16,
    min: 52,
    seats: "4 seats",
  },
  {
    id: "xl",
    name: "XL",
    blurb: "Six seats for the whole crew",
    eta: "8 min",
    rate: 22,
    min: 78,
    seats: "6 seats",
  },
];

export const CARGO_CLASSES: RideClass[] = [
  {
    id: "pickup",
    name: "Pickup",
    blurb: "Open bed for bags, tools, market stock",
    eta: "12 min",
    rate: 18,
    min: 85,
    seats: "1 helper",
  },
  {
    id: "van",
    name: "Van",
    blurb: "Covered load, two-seater cab",
    eta: "14 min",
    rate: 28,
    min: 140,
    seats: "2 helpers",
  },
  {
    id: "truck",
    name: "Truck",
    blurb: "Furniture, site materials, bulk",
    eta: "20 min",
    rate: 42,
    min: 220,
    seats: "Crew",
  },
];

export const DELIVERY_CLASSES: RideClass[] = [
  {
    id: "express",
    name: "Express",
    blurb: "Courier on a bike, under an hour",
    eta: "25 min",
    rate: 9,
    min: 28,
    seats: "Up to 5 kg",
  },
  {
    id: "standard",
    name: "Standard",
    blurb: "Same-day across Lusaka",
    eta: "2 hr",
    rate: 6,
    min: 18,
    seats: "Up to 15 kg",
  },
  {
    id: "bulk",
    name: "Bulk",
    blurb: "Multiple parcels, one run",
    eta: "3 hr",
    rate: 12,
    min: 45,
    seats: "Up to 40 kg",
  },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: "nshima-house",
    name: "Nshima House",
    cuisine: "Zambian",
    area: "Kamwala",
    mins: 28,
    rating: 4.8,
    items: [
      { id: "nh1", name: "Nshima, chicken & relish", price: 65 },
      { id: "nh2", name: "Ifisashi & village chicken", price: 78 },
      { id: "nh3", name: "Kapenta platter", price: 55 },
    ],
  },
  {
    id: "levy-grill",
    name: "Levy Grill",
    cuisine: "Grill",
    area: "Levy Junction",
    mins: 22,
    rating: 4.6,
    items: [
      { id: "lg1", name: "Flame beef burger", price: 89 },
      { id: "lg2", name: "Half chicken + chips", price: 95 },
      { id: "lg3", name: "Beef wrap", price: 62 },
    ],
  },
  {
    id: "east-noodle",
    name: "East Park Noodle",
    cuisine: "Asian",
    area: "East Park",
    mins: 30,
    rating: 4.7,
    items: [
      { id: "en1", name: "Chicken fried rice", price: 70 },
      { id: "en2", name: "Beef chow mein", price: 82 },
      { id: "en3", name: "Spring rolls (6)", price: 40 },
    ],
  },
  {
    id: "kabulonga-oven",
    name: "Kabulonga Oven",
    cuisine: "Pizza",
    area: "Kabulonga",
    mins: 26,
    rating: 4.5,
    items: [
      { id: "ko1", name: "Margherita 12\"", price: 98 },
      { id: "ko2", name: "Meat feast 12\"", price: 135 },
      { id: "ko3", name: "Garlic bread", price: 32 },
    ],
  },
];

export const CORRIDORS = [
  { name: "Great East Road", from: "CBD", to: "Airport", pooling: 14, save: "up to 40%" },
  { name: "Kafue Road", from: "Crossroads", to: "Kafue Roundabout", pooling: 9, save: "up to 35%" },
  { name: "Cairo Road loop", from: "Showgrounds", to: "Kamwala", pooling: 18, save: "up to 45%" },
  { name: "UNZA run", from: "Great East", to: "University", pooling: 11, save: "up to 38%" },
];

export const DRIVERS = [
  { name: "Chanda Mwale", vehicle: "Toyota Corolla · BAC 4412" },
  { name: "Mutale Banda", vehicle: "Honda Fit · ALD 8821" },
  { name: "Thandi Phiri", vehicle: "Suzuki Swift · AAE 1904" },
  { name: "Joseph Zulu", vehicle: "Hyundai i20 · BAX 3308" },
  { name: "Grace Tembo", vehicle: "Kia Rio · ALC 7765" },
  { name: "Peter Mulenga", vehicle: "Toyota Hiace · BAC 2201" },
];

export const DRIVER_JOBS = [
  { service: "rides" as const, pickup: "Cairo Road, CBD", dropoff: "Kenneth Kaunda Airport", vehicleClass: "Comfort", fare: 186 },
  { service: "rides" as const, pickup: "Matero", dropoff: "Levy Junction", vehicleClass: "Pool", fare: 42 },
  { service: "cargo" as const, pickup: "Kamwala Market", dropoff: "Kabulonga", vehicleClass: "Van", fare: 210 },
  { service: "delivery" as const, pickup: "East Park Mall", dropoff: "Woodlands", vehicleClass: "Express", fare: 38 },
  { service: "rides" as const, pickup: "University of Zambia", dropoff: "Northmead", vehicleClass: "Economy", fare: 55 },
  { service: "food" as const, pickup: "Levy Grill", dropoff: "Roma Park", vehicleClass: "Food", fare: 114 },
];

export function findLocation(name: string): Location | undefined {
  const n = name.trim().toLowerCase();
  return LOCATIONS.find(
    (l) => l.name.toLowerCase() === n || l.name.toLowerCase().includes(n) || l.area.toLowerCase() === n,
  );
}

export function suggestLocations(query: string, exclude?: string): Location[] {
  const q = query.trim().toLowerCase();
  const list = LOCATIONS.filter((l) => l.name !== exclude);
  if (!q) return list.slice(0, 6);
  return list
    .filter((l) => l.name.toLowerCase().includes(q) || l.area.toLowerCase().includes(q))
    .slice(0, 6);
}

export function distanceOf(aName: string, bName: string): number {
  const a = findLocation(aName);
  const b = findLocation(bName);
  if (!a || !b) return 12;
  return Math.max(4, Math.hypot(a.x - b.x, a.y - b.y));
}

export function quoteFare(cls: RideClass, pickup: string, dropoff: string): number {
  const d = distanceOf(pickup, dropoff);
  return Math.max(cls.min, Math.round(cls.rate * d));
}

export function formatKw(n: number): string {
  return `${CURRENCY} ${n.toLocaleString("en-ZM")}`;
}

export function classesFor(service: ServiceId): RideClass[] {
  if (service === "cargo") return CARGO_CLASSES;
  if (service === "delivery") return DELIVERY_CLASSES;
  return RIDE_CLASSES;
}

export function pickDriver(seed = Date.now()) {
  return DRIVERS[seed % DRIVERS.length]!;
}
