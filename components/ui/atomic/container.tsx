import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  backgroundColor?: string;
  padding?: "none" | "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg";
}

export function Container({
  children,
  className,
  backgroundColor,
  padding = "md",
  rounded = "md",
}: ContainerProps) {
  const paddingClass = {
    none: "",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };

  const roundedClass = {
    none: "",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
  };

  const style = backgroundColor ? { backgroundColor } : {};

  return (
    <div
      className={cn(
        "bg-gray-100 dark:bg-gray-800",
        paddingClass[padding],
        roundedClass[rounded],
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
