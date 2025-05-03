"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Layers, MoveUp, MoveDown, Eye, EyeOff, Plus } from "lucide-react";
import type React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Section {
  id: string;
  name: string;
  icon?: React.ReactNode;
  visible: boolean;
}

interface SectionManagerProps {
  sections: Section[];
  onToggleSection: (sectionId: string) => void;
  onMoveSection: (sectionId: string, direction: "up" | "down") => void;
  onAddSection?: (sectionType: string) => void;
  availableSections?: Array<{
    type: string;
    name: string;
    description?: string;
    icon?: React.ReactNode;
  }>;
  className?: string;
}

export function SectionManager({
  sections,
  onToggleSection,
  onMoveSection,
  onAddSection,
  availableSections = [],
  className,
}: SectionManagerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Layers size={16} />
            <span>Manage Sections</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Sections</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <ScrollArea className="h-[300px]">
            {sections.map((section, index) => (
              <DropdownMenuCheckboxItem
                key={section.id}
                checked={section.visible}
                onCheckedChange={() => onToggleSection(section.id)}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  {section.icon}
                  <span>{section.name}</span>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSection(section.id);
                    }}
                  >
                    {section.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveSection(section.id, "up");
                    }}
                    disabled={index === 0}
                  >
                    <MoveUp size={14} />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveSection(section.id, "down");
                    }}
                    disabled={index === sections.length - 1}
                  >
                    <MoveDown size={14} />
                  </Button>
                </div>
              </DropdownMenuCheckboxItem>
            ))}
          </ScrollArea>

          {onAddSection && availableSections.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Plus size={16} className="mr-2" />
                    Add New Section
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Section</DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[400px] mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {availableSections.map((section) => (
                        <Button
                          key={section.type}
                          variant="outline"
                          className="h-auto p-4 flex flex-col items-start justify-start text-left"
                          onClick={() => {
                            onAddSection(section.type);
                            setDialogOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {section.icon}
                            <span className="font-medium">{section.name}</span>
                          </div>
                          {section.description && (
                            <p className="text-xs text-gray-500">
                              {section.description}
                            </p>
                          )}
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
