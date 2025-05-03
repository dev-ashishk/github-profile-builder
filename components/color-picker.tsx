"use client"

import { useState, useEffect } from "react"
import { Check, Paintbrush } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const colorPresets = [
  {
    name: "Default",
    primary: "#3b82f6", // blue-500
    secondary: "#10b981", // emerald-500
    accent: "#8b5cf6", // violet-500
  },
  {
    name: "Ocean",
    primary: "#0ea5e9", // sky-500
    secondary: "#06b6d4", // cyan-500
    accent: "#0284c7", // sky-600
  },
  {
    name: "Forest",
    primary: "#16a34a", // green-600
    secondary: "#65a30d", // lime-600
    accent: "#059669", // emerald-600
  },
  {
    name: "Sunset",
    primary: "#f97316", // orange-500
    secondary: "#f59e0b", // amber-500
    accent: "#ef4444", // red-500
  },
  {
    name: "Berry",
    primary: "#d946ef", // fuchsia-500
    secondary: "#ec4899", // pink-500
    accent: "#8b5cf6", // violet-500
  },
  {
    name: "Midnight",
    primary: "#6366f1", // indigo-500
    secondary: "#4f46e5", // indigo-600
    accent: "#8b5cf6", // violet-500
  },
  {
    name: "Monochrome",
    primary: "#525252", // neutral-600
    secondary: "#737373", // neutral-500
    accent: "#404040", // neutral-700
  },
  {
    name: "Candy",
    primary: "#ec4899", // pink-500
    secondary: "#8b5cf6", // violet-500
    accent: "#3b82f6", // blue-500
  },
]

export function ColorPicker({ colors, onChange }) {
  const [selectedPreset, setSelectedPreset] = useState("Default")
  const [customColors, setCustomColors] = useState({
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
  })

  // Update custom colors when colors prop changes
  useEffect(() => {
    setCustomColors({
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
    })
  }, [colors])

  const handlePresetChange = (preset) => {
    const selectedPreset = colorPresets.find((p) => p.name === preset)
    if (selectedPreset) {
      setSelectedPreset(preset)
      setCustomColors({
        primary: selectedPreset.primary,
        secondary: selectedPreset.secondary,
        accent: selectedPreset.accent,
      })
      onChange({
        primary: selectedPreset.primary,
        secondary: selectedPreset.secondary,
        accent: selectedPreset.accent,
      })
    }
  }

  const handleCustomColorChange = (type, value) => {
    const newColors = { ...customColors, [type]: value }
    setCustomColors(newColors)
    onChange(newColors)
  }

  const handleApplyCustomColors = () => {
    onChange(customColors)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Paintbrush className="mr-2 h-4 w-4" />
          <span>Template Colors</span>
          <div className="ml-auto flex gap-1">
            <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: colors.primary }} />
            <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: colors.secondary }} />
            <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: colors.accent }} />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <Tabs defaultValue="presets">
          <TabsList className="w-full">
            <TabsTrigger value="presets" className="flex-1">
              Presets
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex-1">
              Custom
            </TabsTrigger>
          </TabsList>
          <TabsContent value="presets" className="space-y-4 py-2">
            <div className="grid grid-cols-4 gap-2">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  className={cn(
                    "flex flex-col items-center justify-center rounded-md p-1 text-xs",
                    selectedPreset === preset.name && "ring-2 ring-primary",
                  )}
                  onClick={() => handlePresetChange(preset.name)}
                >
                  <div className="flex gap-1 mb-1">
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: preset.primary }} />
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: preset.secondary }} />
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: preset.accent }} />
                  </div>
                  <span className="text-[10px]">{preset.name}</span>
                </button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="custom" className="space-y-4 py-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: customColors.primary }} />
                  <Input
                    id="primary-color"
                    type="text"
                    value={customColors.primary}
                    onChange={(e) => handleCustomColorChange("primary", e.target.value)}
                    className="h-8 w-20"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: customColors.secondary }} />
                  <Input
                    id="secondary-color"
                    type="text"
                    value={customColors.secondary}
                    onChange={(e) => handleCustomColorChange("secondary", e.target.value)}
                    className="h-8 w-20"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="accent-color">Accent Color</Label>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: customColors.accent }} />
                  <Input
                    id="accent-color"
                    type="text"
                    value={customColors.accent}
                    onChange={(e) => handleCustomColorChange("accent", e.target.value)}
                    className="h-8 w-20"
                  />
                </div>
              </div>
            </div>
            <Button size="sm" className="w-full" onClick={handleApplyCustomColors}>
              <Check className="mr-2 h-4 w-4" />
              Apply Colors
            </Button>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
