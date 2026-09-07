window.PM_DATA = {
  locations: [
    { name: "Cairo Road, CBD", area: "City Centre" },
    { name: "Kamwala Market", area: "City Centre" },
    { name: "Levy Junction", area: "Great East Road" },
    { name: "Manda Hill", area: "Great East Road" },
    { name: "Arcades Mall", area: "Great East Road" },
    { name: "East Park Mall", area: "Great East Road" },
    { name: "Kenneth Kaunda Airport", area: "North-East" },
    { name: "Chelston", area: "Great East Road" },
    { name: "Roma Park", area: "North" },
    { name: "Olympia Park", area: "East" },
    { name: "Woodlands", area: "South-East" },
    { name: "Kabulonga", area: "South-East" },
    { name: "University of Zambia", area: "Great East Road" },
    { name: "Chilenje", area: "South" },
    { name: "Kafue Roundabout", area: "Kafue Road" },
    { name: "Crossroads", area: "Kafue Road" },
    { name: "Garden Compound", area: "West" },
    { name: "Matero", area: "North-West" },
    { name: "Northmead", area: "North" },
    { name: "Showgrounds", area: "City Centre" },
  ],
  classes: [
    { id: "pool", name: "Pool", blurb: "Share the corridor, split the fare", min: 22, rate: 7 },
    { id: "economy", name: "Economy", blurb: "A car to yourself", min: 34, rate: 11 },
    { id: "comfort", name: "Comfort", blurb: "Newer cars, extra legroom", min: 52, rate: 16 },
    { id: "xl", name: "XL", blurb: "Six seats for the crew", min: 78, rate: 22 },
  ],
  jobs: [
    { pickup: "Cairo Road, CBD", dropoff: "Kenneth Kaunda Airport", klass: "Comfort", fare: 186 },
    { pickup: "Matero", dropoff: "Levy Junction", klass: "Pool", fare: 42 },
    { pickup: "Kamwala Market", dropoff: "Kabulonga", klass: "Van", fare: 210 },
    { pickup: "East Park Mall", dropoff: "Woodlands", klass: "Express", fare: 38 },
    { pickup: "University of Zambia", dropoff: "Northmead", klass: "Economy", fare: 55 },
  ],
  seedPassengers: [
    { name: "Chipo Daka", email: "chipo@email.com", phone: "097 111 2201", area: "Roma Park" },
    { name: "Mwansa Phiri", email: "mwansa@email.com", phone: "096 442 1180", area: "Kabulonga" },
  ],
  seedDrivers: [
    { name: "Chanda Mwale", email: "chanda.driver@email.com", phone: "097 555 0144", vehicle: "Toyota Corolla", plate: "BAC 4412", status: "online" },
    { name: "Mutale Banda", email: "mutale.driver@email.com", phone: "096 220 8891", vehicle: "Honda Fit", plate: "ALD 8821", status: "online" },
    { name: "Thandi Phiri", email: "thandi.driver@email.com", phone: "095 773 4410", vehicle: "Suzuki Swift", plate: "AAE 1904", status: "offline" },
  ],
};

window.PM_DATA.suggest = function (q, exclude) {
  const n = (q || "").trim().toLowerCase();
  return this.locations
    .filter((l) => l.name !== exclude)
    .filter((l) => !n || l.name.toLowerCase().includes(n) || l.area.toLowerCase().includes(n))
    .slice(0, 6);
};

window.PM_DATA.quote = function (klassId, pickup, dropoff) {
  const k = this.classes.find((c) => c.id === klassId) || this.classes[0];
  const a = this.locations.findIndex((l) => l.name === pickup);
  const b = this.locations.findIndex((l) => l.name === dropoff);
  const dist = a < 0 || b < 0 ? 12 : Math.max(4, Math.abs(a - b) * 3.2);
  return Math.max(k.min, Math.round(k.rate * dist));
};

window.PM_DATA.kw = function (n) {
  return "K " + Number(n || 0).toLocaleString("en-ZM");
};
