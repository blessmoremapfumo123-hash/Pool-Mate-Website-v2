import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink text-brand-fg">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-fg/70">
            Corridor pooling for Lusaka — rides, cargo, food and parcels. Built for daily travel,
            paid the way you already pay.
          </p>
        </div>
        <div>
          <p className="font-display text-sm font-semibold">Product</p>
          <ul className="mt-3 space-y-2 text-sm text-brand-fg/70">
            <li>
              <a href="/#services" className="hover:text-brand-fg">
                Services
              </a>
            </li>
            <li>
              <a href="/#how" className="hover:text-brand-fg">
                How it works
              </a>
            </li>
            <li>
              <a href="/#download" className="hover:text-brand-fg">
                Download
              </a>
            </li>
            <li>
              <a href="/files" className="hover:text-brand-fg">
                HTML files
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-brand-fg">
                Log in
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-sm font-semibold">Safety & pay</p>
          <ul className="mt-3 space-y-2 text-sm text-brand-fg/70">
            <li>Verified drivers</li>
            <li>Live route sharing</li>
            <li>Airtel Money · MTN · cash</li>
            <li>24/7 support</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-brand-fg/50 sm:px-6">
          <p>© {new Date().getFullYear()} PoolMate. Lusaka, Zambia.</p>
          <p>Share the stretch. Keep the change.</p>
        </div>
      </div>
    </footer>
  );
}
