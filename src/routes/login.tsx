import { useState, type FormEvent } from "react";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Logo, LogoMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

const AFTER_LOGIN = "/select-role";

function LoginPage() {
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isPending && user) {
    return <Navigate to="/select-role" />;
  }

  async function onProvider(id: string) {
    setError(null);
    setBusy(id);
    try {
      await signIn(id, { callbackURL: AFTER_LOGIN, errorCallbackURL: "/login" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign-in failed");
      setBusy(null);
    }
  }

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy("email");
    try {
      if (mode === "up") {
        const { error: err } = await authClient.signUp.email({
          email,
          password,
          name: name || email.split("@")[0] || "Rider",
          callbackURL: AFTER_LOGIN,
        });
        if (err) throw new Error(err.message || "Could not create account");
      } else {
        const { error: err } = await authClient.signIn.email({
          email,
          password,
          callbackURL: AFTER_LOGIN,
        });
        if (err) throw new Error(err.message || "Could not sign in");
      }
      window.location.assign(AFTER_LOGIN);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setBusy(null);
    }
  }

  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-brand text-brand-fg lg:flex lg:flex-col lg:p-10">
        <Logo light />
        <div className="relative z-10 my-auto max-w-md py-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-fg/70">
            Lusaka · corridor pooling
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-tight">
            Same road.
            <br />
            Split the fare.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-brand-fg/80">
            Sign in to book a Pool, send cargo, order food or dispatch a parcel — paid with Mobile
            Money.
          </p>
        </div>
        <p className="relative z-10 text-sm text-brand-fg/60">
          Verified drivers · live tracking · local pay
        </p>
        <LogoMark className="pointer-events-none absolute -right-8 -bottom-8 size-64 text-brand-fg/10" />
      </section>

      <section className="flex flex-col bg-paper px-5 py-8 sm:px-10">
        <div className="mb-10 flex items-center justify-between lg:hidden">
          <Logo />
          <Link to="/" className="text-sm text-muted hover:text-ink">
            Back
          </Link>
        </div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            {mode === "in" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {mode === "in"
              ? "Log in to request a PoolMate."
              : "One account for rides, cargo, food and delivery."}
          </p>

          <div className="mt-8 space-y-2">
            {authEnabled ? (
              GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  type="button"
                  variant="outline"
                  className="w-full"
                  disabled={busy !== null}
                  onClick={() => void onProvider(p.providerId)}
                >
                  Continue with {p.label}
                </Button>
              ))
            ) : (
              <p className="text-sm text-muted">Sign-in is disabled.</p>
            )}
          </div>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted">
            <span className="h-px flex-1 bg-line" />
            or email
            <span className="h-px flex-1 bg-line" />
          </div>

          <form className="space-y-3" onSubmit={(e) => void onEmail(e)}>
            {mode === "up" ? (
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-muted">Name</span>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Chanda Mwale"
                  autoComplete="name"
                />
              </label>
            ) : null}
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted">Email</span>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                autoComplete="email"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted">Password</span>
              <Input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                autoComplete={mode === "up" ? "new-password" : "current-password"}
              />
            </label>
            {error ? <p className="text-sm text-danger">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={busy !== null}>
              {busy === "email"
                ? "Please wait…"
                : mode === "in"
                  ? "Log in with email"
                  : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            {mode === "in" ? "New to PoolMate?" : "Already have an account?"}{" "}
            <button
              type="button"
              className={cn("font-semibold text-brand hover:text-brand-dark")}
              onClick={() => {
                setMode((m) => (m === "in" ? "up" : "in"));
                setError(null);
              }}
            >
              {mode === "in" ? "Create an account" : "Log in"}
            </button>
          </p>
          <p className="mt-8 text-center text-xs text-muted">
            <Link to="/" className="hover:text-ink">
              ← Back to homepage
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
