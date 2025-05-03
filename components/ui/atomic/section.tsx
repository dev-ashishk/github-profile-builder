import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <div id={id} className={cn("mb-6", className)}>
      {children}
    </div>
  );
}

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
  color?: string;
  level?: 1 | 2 | 3;
}

export function SectionHeading({
  children,
  className,
  color,
  level = 2,
}: SectionHeadingProps) {
  const styles = {
    color: color || undefined,
  };

  switch (level) {
    case 1:
      return (
        <h1 className={cn("text-3xl font-bold mb-4", className)} style={styles}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2
          className={cn("text-xl font-semibold mb-3", className)}
          style={styles}
        >
          {children}
        </h2>
      );
    case 3:
      return (
        <h3
          className={cn("text-lg font-medium mb-2", className)}
          style={styles}
        >
          {children}
        </h3>
      );
    default:
      return (
        <h2
          className={cn("text-xl font-semibold mb-3", className)}
          style={styles}
        >
          {children}
        </h2>
      );
  }
}

interface SectionContentProps {
  children: ReactNode;
  className?: string;
}

export function SectionContent({ children, className }: SectionContentProps) {
  return <div className={cn("space-y-4", className)}>{children}</div>;
}

interface SectionDividerProps {
  className?: string;
  color?: string;
}

export function SectionDivider({ className, color }: SectionDividerProps) {
  const styles = {
    borderColor: color || undefined,
  };

  return <hr className={cn("my-6 border-t", className)} style={styles} />;
}
