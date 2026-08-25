create table if not exists profiles (
  user_id text primary key,
  role text check (role in ('rider', 'driver')),
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists trips (
  id text primary key,
  user_id text not null,
  service text not null check (service in ('rides', 'cargo', 'food', 'delivery')),
  pickup text not null,
  dropoff text not null,
  vehicle_class text not null,
  fare integer not null,
  status text not null check (status in ('requested', 'matched', 'enroute', 'arrived', 'completed', 'cancelled')),
  driver_name text,
  driver_vehicle text,
  notes text,
  pay_method text not null default 'mobile_money',
  created_at timestamptz not null default now()
);

create index if not exists trips_user_id_idx on trips (user_id);
create index if not exists trips_user_created_idx on trips (user_id, created_at desc);
