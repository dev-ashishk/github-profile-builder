"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Paintbrush, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ThemeOption {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background?: string;
  text?: string;
}

interface ThemeSelectorProps {
  themes: ThemeOption[];
  currentTheme: string;
  onThemeChange: (theme: ThemeOption) => void;
  className?: string;
}

export function ThemeSelector({
  themes,
  currentTheme,
  onThemeChange,
  className,
}: ThemeSelectorProps) {
  const selectedTheme =
    themes.find((theme) => theme.name === currentTheme) || themes[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-2 ${className}`}
        >
          <Paintbrush size={16} />
          <span>Theme: {selectedTheme.name}</span>
          <div className="ml-auto flex gap-1">
            <div
              className="h-4 w-4 rounded-full border"
              style={{ backgroundColor: selectedTheme.primary }}
            />
            <div
              className="h-4 w-4 rounded-full border"
              style={{ backgroundColor: selectedTheme.secondary }}
            />
            <div
              className="h-4 w-4 rounded-full border"
              style={{ backgroundColor: selectedTheme.accent }}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => onThemeChange(theme)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <div
                  className="h-4 w-4 rounded-full border"
                  style={{ backgroundColor: theme.primary }}
                />
                <div
                  className="h-4 w-4 rounded-full border"
                  style={{ backgroundColor: theme.secondary }}
                />
                <div
                  className="h-4 w-4 rounded-full border"
                  style={{ backgroundColor: theme.accent }}
                />
              </div>
              <span>{theme.name}</span>
            </div>
            {currentTheme === theme.name && <Check size={16} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
