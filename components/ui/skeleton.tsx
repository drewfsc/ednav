import type React from "react";
import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("bg-base-300 animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
