import Image from "next/image"
import { cn } from "@/lib/utils"

interface AvatarProps {
  src?: string
  alt: string
  fallback?: string
  size?: number
  className?: string
  rounded?: "none" | "sm" | "md" | "lg" | "full"
  border?: boolean
  borderColor?: string
}

export function Avatar({
  src,
  alt,
  fallback,
  size = 100,
  className,
  rounded = "full",
  border = false,
  borderColor,
}: AvatarProps) {
  const roundedClass = {
    none: "",
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  }

  const borderClass = border ? "border-2" : ""
  const borderStyle = border && borderColor ? { borderColor } : {}

  if (src) {
    return (
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={size}
        height={size}
        className={cn(roundedClass[rounded], borderClass, className)}
        style={borderStyle}
      />
    )
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gray-200 dark:bg-gray-700",
        roundedClass[rounded],
        borderClass,
        className,
      )}
      style={{
        width: size,
        height: size,
        ...borderStyle,
      }}
    >
      <span className="text-2xl font-bold">{fallback || alt.charAt(0)}</span>
    </div>
  )
}
