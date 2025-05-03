import type React from "react";

import { cn } from "@/lib/utils";

interface StatCardProps {
  value: number | string;
  label: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

export function StatCard({
  value,
  label,
  className,
  valueClassName,
  labelClassName,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-center",
        className
      )}
    >
      <div className={cn("text-xl font-bold", valueClassName)}>{value}</div>
      <div className={cn("text-xs text-gray-500", labelClassName)}>{label}</div>
    </div>
  );
}

interface StatsGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function StatsGrid({
  children,
  className,
  columns = 4,
}: StatsGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        {
          "grid-cols-1": columns === 1,
          "grid-cols-2": columns === 2,
          "grid-cols-3": columns === 3,
          "grid-cols-2 md:grid-cols-4": columns === 4,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
