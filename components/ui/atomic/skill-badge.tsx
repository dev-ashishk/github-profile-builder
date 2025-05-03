import type React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  skill: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "destructive";
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
}

export function SkillBadge({
  skill,
  className,
  variant = "default",
  color,
  backgroundColor,
  borderColor,
}: SkillBadgeProps) {
  const styles = {
    color: color || undefined,
    backgroundColor: backgroundColor || undefined,
    borderColor: borderColor || undefined,
  };

  return (
    <Badge
      variant={variant}
      className={cn("px-3 py-1", className)}
      style={styles}
    >
      {skill}
    </Badge>
  );
}

interface SkillsContainerProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export function SkillsContainer({
  children,
  className,
  centered = false,
}: SkillsContainerProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 mb-4",
        {
          "justify-center": centered,
        },
        className
      )}
    >
      {children}
    </div>
  );
}
