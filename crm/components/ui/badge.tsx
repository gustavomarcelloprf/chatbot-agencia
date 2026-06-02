import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default:
          "border-border bg-muted text-foreground",
        outline: "border-border bg-transparent text-muted-foreground",
        neutral:
          "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300",
        info: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-950 dark:bg-blue-950/40 dark:text-blue-300",
        success:
          "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-950 dark:bg-emerald-950/40 dark:text-emerald-300",
        warning:
          "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-950 dark:bg-amber-950/40 dark:text-amber-300",
        danger:
          "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-950 dark:bg-rose-950/40 dark:text-rose-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
