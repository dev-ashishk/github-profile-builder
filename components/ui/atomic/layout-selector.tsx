"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { LayoutGrid, Check } from "lucide-react";
import type React from "react";

import { Button } from "@/components/ui/button";

interface LayoutOption {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
}

interface LayoutSelectorProps {
  layouts: LayoutOption[];
  currentLayout: string;
  onLayoutChange: (layoutId: string) => void;
  className?: string;
}

export function LayoutSelector({
  layouts,
  currentLayout,
  onLayoutChange,
  className,
}: LayoutSelectorProps) {
  const selectedLayout =
    layouts.find((layout) => layout.id === currentLayout) || layouts[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-2 ${className}`}
        >
          <LayoutGrid size={16} />
          <span>Layout: {selectedLayout.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Select Layout</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {layouts.map((layout) => (
          <DropdownMenuItem
            key={layout.id}
            onClick={() => onLayoutChange(layout.id)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {layout.icon}
              <div>
                <div>{layout.name}</div>
                {layout.description && (
                  <div className="text-xs text-gray-500">
                    {layout.description}
                  </div>
                )}
              </div>
            </div>
            {currentLayout === layout.id && <Check size={16} />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
