import { useState, type ReactNode } from "react";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CarFront, UserRound } from "lucide-react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyProfile, saveMyRole } from "@/lib/poolmate/api";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/poolmate/types";

export const Route = createFileRoute("/select-role")({
  component: SelectRolePage,
});

function SelectRolePage() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [picked, setPicked] = useState<Role | null>(null);

  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: () => getMyProfile(),
    enabled: Boolean(user),
  });

  const save = useMutation({
    mutationFn: (role: Role) =>
      saveMyRole({
        data: { role, displayName: user?.displayName ?? undefined },
      }),
    onSuccess: async (p) => {
      await qc.invalidateQueries({ queryKey: ["profile"] });
      void navigate({ to: p.role === "driver" ? "/drive" : "/dashboard" });
    },
  });

  if (isPending) {
    return (
      <main className="grid min-h-dvh place-items-center bg-paper p-6">
        <Skeleton className="h-64 w-full max-w-xl rounded-2xl" />
      </main>
    );
  }
  if (!user) return <RedirectToSignIn />;

  return (
    <main className="min-h-dvh bg-paper">
      <div className="mx-auto flex max-w-3xl flex-col px-4 py-8 sm:px-6">
        <Logo />
        <div className="mx-auto mt-14 w-full max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Choose how you use PoolMate
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Rider or driver?
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            You can switch later. Riders book the super app. Drivers earn on the corridors they
            already drive.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <RoleCard
            active={picked === "rider"}
            onClick={() => setPicked("rider")}
            icon={<UserRound className="size-6" />}
            title="Ride with PoolMate"
            body="Book corridor pools, private cars, cargo, food and parcels. Pay with Mobile Money or cash."
          />
          <RoleCard
            active={picked === "driver"}
            onClick={() => setPicked("driver")}
            icon={<CarFront className="size-6" />}
            title="Drive with PoolMate"
            body="Go online, accept jobs on your route, and get paid locally. Keep the seats filled."
          />
        </div>

        {save.isError ? (
          <p className="mt-4 text-center text-sm text-danger">Could not save your role. Try again.</p>
        ) : null}

        <div className="mt-8 flex justify-center">
          <Button
            size="lg"
            disabled={!picked || save.isPending}
            onClick={() => picked && save.mutate(picked)}
          >
            {save.isPending ? "Saving…" : "Continue"}
          </Button>
        </div>
        {profile.data?.role ? (
          <p className="mt-4 text-center text-xs text-muted">
            Currently set as {profile.data.role}. Pick again to switch.
          </p>
        ) : null}
      </div>
    </main>
  );
}

function RoleCard({
  active,
  onClick,
  icon,
  title,
  body,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl bg-paper p-6 text-left shadow-card transition-[box-shadow,transform] duration-150",
        "hover:shadow-lift",
        active && "ring-2 ring-brand ring-offset-2 ring-offset-paper",
      )}
    >
      <span
        className={cn(
          "grid size-12 place-items-center rounded-xl",
          active ? "bg-brand text-brand-fg" : "bg-cream text-brand",
        )}
      >
        {icon}
      </span>
      <h2 className="mt-5 font-display text-xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </button>
  );
}
