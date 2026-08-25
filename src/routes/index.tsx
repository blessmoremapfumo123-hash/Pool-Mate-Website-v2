import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Banknote,
  Bike,
  MapPinned,
  Package,
  ShieldCheck,
  Smartphone,
  Truck,
  UtensilsCrossed,
  WalletCards,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BookingWidget } from "@/components/home/booking-widget";
import { HeroVisual } from "@/components/home/hero-visual";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SERVICES } from "@/lib/poolmate/catalog";

export const Route = createFileRoute("/")({ component: Home });

const ICONS = {
  rides: Bike,
  cargo: Truck,
  food: UtensilsCrossed,
  delivery: Package,
} as const;

function Home() {
  return (
    <div className="min-h-dvh bg-paper">
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <Why />
        <How />
        <DriveCta />
        <Download />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
        <div className="pm-rise">
          <Badge variant="brand">Lusaka · corridor pooling</Badge>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Same road.
            <span className="text-brand"> Split the fare.</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
            PoolMate matches you on Lusaka’s busiest corridors — then cargo, food and parcels,
            paid with Mobile Money.
          </p>
          <div className="mt-8 max-w-md">
            <BookingWidget />
          </div>
        </div>
        <div className="pm-rise" style={{ animationDelay: "80ms" }}>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-cream/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Services</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          One app. Four ways to move.
        </h2>
        <p className="mt-3 max-w-xl text-ink-soft">
          Built like a super app, priced for daily travel. Pick a service, set pickup and where to,
          and go.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => {
            const Icon = ICONS[s.id];
            return (
              <article
                key={s.id}
                className="flex flex-col rounded-2xl bg-paper p-5 shadow-card transition-[box-shadow] duration-150 hover:shadow-lift"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-cream text-brand">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.name}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-brand">{s.tag}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{s.blurb}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Why() {
  const items = [
    {
      icon: MapPinned,
      title: "Corridor pooling",
      body: "Share rides on fixed popular routes and cut your daily transport cost — without the chaos of street-hailing.",
    },
    {
      icon: ShieldCheck,
      title: "Safety first",
      body: "Verified drivers, vehicle checks, live route sharing and a one-tap emergency line.",
    },
    {
      icon: WalletCards,
      title: "Local payments",
      body: "Airtel Money, MTN MoMo or cash. The fare is locked before you sit down.",
    },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Why choose PoolMate?
          </h2>
          <p className="mt-3 text-ink-soft">Built for real daily travel needs.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="rounded-2xl bg-paper p-6 shadow-card">
              <span className="grid size-11 place-items-center rounded-xl bg-cream text-brand">
                <item.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-brand">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function How() {
  const steps = [
    {
      n: "01",
      title: "Set pickup and where to",
      body: "Choose a corridor stop or any Lusaka landmark. See the fare before you confirm.",
    },
    {
      n: "02",
      title: "Match on the stretch",
      body: "Pool with others heading the same way, or take Economy, Comfort or XL to yourself.",
    },
    {
      n: "03",
      title: "Pay the way you already pay",
      body: "Mobile Money or cash. Rate the trip. Your history and wallet stay in the app.",
    },
  ];
  return (
    <section id="how" className="scroll-mt-20 bg-ink py-20 text-brand-fg">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">How it works</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Three steps. Then you’re moving.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <article key={s.n} className="rounded-2xl bg-white/5 p-6">
              <p className="font-display text-sm font-semibold text-brand">{s.n}</p>
              <h3 className="mt-4 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-fg/70">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DriveCta() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-8 overflow-hidden rounded-2xl bg-cream p-8 shadow-card md:grid-cols-2 md:p-12">
          <div>
            <Badge variant="brand">Earn</Badge>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">
              Drive the corridor you already know.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              Go online, fill empty seats, and take cargo or parcels on the way. Payouts land in
              Mobile Money.
            </p>
            <Button asChild className="mt-6" size="lg">
              <Link to="/login">
                Become a driver
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <ul className="space-y-3">
            {[
              "Keep your own hours on Great East, Kafue and the CBD loop",
              "See the fare before you accept",
              "Vehicle checks and in-app support",
            ].map((t) => (
              <li key={t} className="rounded-xl bg-paper px-4 py-3 text-sm shadow-card">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Download() {
  return (
    <section id="download" className="scroll-mt-20 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-stretch gap-8 overflow-hidden rounded-2xl bg-brand text-brand-fg md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-fg/70">
              Get the app
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              PoolMate in your pocket.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-fg/80">
              Book rides, send cargo, order food and dispatch parcels. Scan the code or use the
              buttons — then sign in with the same account.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <StoreButton store="App Store" sub="Download on the" />
              <StoreButton store="Google Play" sub="Get it on" />
            </div>
            <p className="mt-6 flex items-center gap-2 text-xs text-brand-fg/70">
              <Smartphone className="size-3.5" />
              4.9 · 58k ratings
              <Banknote className="size-3.5" />
              Mobile Money ready
            </p>
          </div>
          <div className="relative flex items-center justify-center px-8 py-10">
            <PhoneMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function StoreButton({ store, sub }: { store: string; sub: string }) {
  return (
    <a
      href="#download"
      className="inline-flex items-center gap-3 rounded-xl bg-ink px-4 py-2.5 text-brand-fg transition-opacity hover:opacity-90"
    >
      <span className="grid size-8 place-items-center rounded-md bg-brand-fg/10">
        <Smartphone className="size-4" />
      </span>
      <span className="text-left">
        <span className="block text-xs uppercase tracking-wider text-brand-fg/70">{sub}</span>
        <span className="block text-sm font-semibold">{store}</span>
      </span>
    </a>
  );
}

function PhoneMock() {
  return (
    <div className="relative w-52 rounded-3xl bg-ink p-2 shadow-lift">
      <div className="overflow-hidden rounded-2xl bg-paper text-ink">
        <div className="flex items-center justify-between px-4 pt-4">
          <span className="font-display text-sm font-semibold">PoolMate</span>
          <span className="text-[10px] text-muted">Lusaka</span>
        </div>
        <div className="mx-3 mt-3 h-28 rounded-xl bg-cream">
          <svg viewBox="0 0 100 60" className="size-full" aria-hidden="true">
            <path
              d="M8 50 C 28 40, 40 32, 70 18"
              fill="none"
              stroke="#f05a10"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="8" cy="50" r="3" fill="#1c1917" />
            <circle cx="70" cy="18" r="3" fill="#f05a10" />
          </svg>
        </div>
        <div className="space-y-2 p-3 pb-5">
          <div className="rounded-lg bg-cream px-3 py-2 text-[11px]">
            <p className="text-muted">Pickup</p>
            <p className="font-medium">Cairo Road, CBD</p>
          </div>
          <div className="rounded-lg bg-cream px-3 py-2 text-[11px]">
            <p className="text-muted">Where to</p>
            <p className="font-medium">Kenneth Kaunda Airport</p>
          </div>
          <div className="rounded-lg bg-brand px-3 py-2 text-center text-[11px] font-semibold text-brand-fg">
            Request Pool · K 42
          </div>
        </div>
      </div>
    </div>
  );
}
