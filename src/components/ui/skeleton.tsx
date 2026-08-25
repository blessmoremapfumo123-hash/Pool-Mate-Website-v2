import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-md bg-sand/80",
        "bg-[linear-gradient(90deg,transparent,rgb(255_251_247/0.7),transparent)] bg-size-[200%_100%]",
        "animate-[pm-shimmer_1.4s_linear_infinite]",
        className,
      )}
    />
  );
}
