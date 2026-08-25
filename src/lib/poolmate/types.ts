export type ServiceId = "rides" | "cargo" | "food" | "delivery";
export type Role = "rider" | "driver";
export type TripStatus =
  | "requested"
  | "matched"
  | "enroute"
  | "arrived"
  | "completed"
  | "cancelled";
export type PayMethod = "mobile_money" | "cash" | "card";

export type Profile = {
  userId: string;
  role: Role | null;
  displayName: string | null;
};

export type Trip = {
  id: string;
  userId: string;
  service: ServiceId;
  pickup: string;
  dropoff: string;
  vehicleClass: string;
  fare: number;
  status: TripStatus;
  driverName: string | null;
  driverVehicle: string | null;
  notes: string | null;
  payMethod: PayMethod;
  createdAt: string;
};

export type Location = {
  id: string;
  name: string;
  area: string;
  x: number;
  y: number;
};

export type RideClass = {
  id: string;
  name: string;
  blurb: string;
  eta: string;
  rate: number;
  min: number;
  seats: string;
};

export type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  area: string;
  mins: number;
  rating: number;
  items: { id: string; name: string; price: number }[];
};
