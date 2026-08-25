import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type ?? "text"}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-lg bg-paper px-3.5 text-sm text-ink shadow-card",
        "placeholder:text-muted",
        "transition-[box-shadow] duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
