import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  valueLabel?: string;
  color?: string;
  backgroundColor?: string;
  className?: string;
  height?: "sm" | "md" | "lg";
}

export function ProgressBar({
  value,
  max = 100,
  label,
  valueLabel,
  color,
  backgroundColor,
  className,
  height = "md",
}: ProgressBarProps) {
  const percentage = (value / max) * 100;

  const heightClass = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={cn("space-y-1", className)}>
      {(label || valueLabel) && (
        <div className="flex justify-between text-sm">
          {label && <span>{label}</span>}
          {valueLabel && <span>{valueLabel}</span>}
        </div>
      )}
      <div
        className={cn(
          "w-full bg-gray-300 dark:bg-gray-600 rounded-full",
          heightClass[height]
        )}
        style={{ backgroundColor }}
      >
        <div
          className={cn("rounded-full", heightClass[height])}
          style={{
            width: `${percentage}%`,
            backgroundColor: color || "#3b82f6",
          }}
        ></div>
      </div>
    </div>
  );
}
