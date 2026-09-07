import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/files")({
  component: FilesPage,
});

const PAGES = [
  { href: "/website/index.html", file: "index.html", label: "Home", body: "Landing page — start here." },
  { href: "/website/login.html", file: "login.html", label: "Log in", body: "Create an account or sign in." },
  { href: "/website/role.html", file: "role.html", label: "Choose role", body: "Passenger or driver." },
  { href: "/website/dashboard.html", file: "dashboard.html", label: "Passenger app", body: "Book a corridor ride." },
  { href: "/website/drive.html", file: "drive.html", label: "Driver app", body: "Go online and accept jobs." },
  { href: "/website/activity.html", file: "activity.html", label: "Activity", body: "Trip history for the signed-in account." },
  { href: "/website/database.html", file: "database.html", label: "Database", body: "Passengers, drivers, and Firebase keys." },
] as const;

function FilesPage() {
  return (
    <div className="min-h-dvh bg-paper">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Badge variant="brand">School pack</Badge>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          HTML files
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          Click a file to open it. These are the same pages on GitHub for your lecturer. Sign in, pick
          a role, then open Database to see passengers and drivers.
        </p>
        <ul className="mt-8 space-y-3">
          {PAGES.map((p) => (
            <li key={p.file}>
              <a
                href={p.href}
                className="block rounded-2xl bg-paper p-5 shadow-card transition-[box-shadow] hover:shadow-lift"
              >
                <p className="font-display text-lg font-semibold">{p.label}</p>
                <p className="mt-1 font-mono text-xs text-brand">{p.file}</p>
                <p className="mt-2 text-sm text-muted">{p.body}</p>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          <Link to="/" className="font-semibold text-brand hover:text-brand-dark">
            ← Back to the live app
          </Link>
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
