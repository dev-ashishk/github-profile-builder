import { Github, Twitter, Linkedin, Globe } from "lucide-react";
import type React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SocialPlatform = "github" | "twitter" | "linkedin" | "website";

interface SocialLinkProps {
  platform: SocialPlatform;
  username?: string;
  url?: string;
  className?: string;
  color?: string;
  showIcon?: boolean;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function SocialLink({
  platform,
  username,
  url,
  className,
  color,
  showIcon = true,
  showLabel = true,
  size = "md",
}: SocialLinkProps) {
  if (!username && !url) return null;

  const getIcon = () => {
    switch (platform) {
      case "github":
        return <Github size={size === "sm" ? 12 : size === "md" ? 14 : 16} />;
      case "twitter":
        return <Twitter size={size === "sm" ? 12 : size === "md" ? 14 : 16} />;
      case "linkedin":
        return <Linkedin size={size === "sm" ? 12 : size === "md" ? 14 : 16} />;
      case "website":
        return <Globe size={size === "sm" ? 12 : size === "md" ? 14 : 16} />;
    }
  };

  const getLabel = () => {
    switch (platform) {
      case "github":
        return "GitHub";
      case "twitter":
        return "Twitter";
      case "linkedin":
        return "LinkedIn";
      case "website":
        return "Website";
    }
  };

  const getUrl = () => {
    switch (platform) {
      case "github":
        return `https://github.com/${username}`;
      case "twitter":
        return `https://twitter.com/${username}`;
      case "linkedin":
        return `https://linkedin.com/in/${username}`;
      case "website":
        return url;
    }
  };

  const getDefaultColor = () => {
    switch (platform) {
      case "github":
        return "#24292e";
      case "twitter":
        return "#1DA1F2";
      case "linkedin":
        return "#0A66C2";
      case "website":
        return "#4285F4";
    }
  };

  const styles = {
    backgroundColor: color || getDefaultColor(),
    color: "white",
  };

  return (
    <a
      href={getUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Badge className="px-3 py-1 flex items-center gap-1" style={styles}>
        {showIcon && getIcon()}
        {showLabel && <span>{getLabel()}</span>}
      </Badge>
    </a>
  );
}

interface SocialLinksContainerProps {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}

export function SocialLinksContainer({
  children,
  className,
  centered = false,
}: SocialLinksContainerProps) {
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
