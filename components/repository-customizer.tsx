"use client";

import { Info } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function RepositoryCustomizer({ repoSettings, setRepoSettings }) {
  const [activeTab, setActiveTab] = useState("layout");

  const handleSwitchChange = (name, checked) => {
    setRepoSettings({
      ...repoSettings,
      [name]: checked,
    });
  };

  const handleSelectChange = (name, value) => {
    setRepoSettings({
      ...repoSettings,
      [name]: value,
    });
  };

  const handleColorChange = (name, color) => {
    setRepoSettings({
      ...repoSettings,
      [name]: color,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          Repository Card Customization
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info size={16} className="text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Customize how your repository cards appear in your GitHub
                  profile README
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>

          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardStyle">Card Style</Label>
              <Select
                value={repoSettings.cardStyle}
                onValueChange={(value) =>
                  handleSelectChange("cardStyle", value)
                }
              >
                <SelectTrigger id="cardStyle">
                  <SelectValue placeholder="Select card style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gridColumns">Grid Columns</Label>
              <RadioGroup
                value={repoSettings.gridColumns.toString()}
                onValueChange={(value) =>
                  handleSelectChange("gridColumns", Number.parseInt(value))
                }
                className="flex space-x-2"
                id="gridColumns"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="columns-1" />
                  <Label htmlFor="columns-1">1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="columns-2" />
                  <Label htmlFor="columns-2">2</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="columns-3" />
                  <Label htmlFor="columns-3">3</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alignment">Card Alignment</Label>
              <Select
                value={repoSettings.alignment}
                onValueChange={(value) =>
                  handleSelectChange("alignment", value)
                }
              >
                <SelectTrigger id="alignment">
                  <SelectValue placeholder="Select alignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="showDescription">Description</Label>
                <p className="text-sm text-muted-foreground">
                  Show repository description
                </p>
              </div>
              <Switch
                id="showDescription"
                checked={repoSettings.showDescription}
                onCheckedChange={(checked) =>
                  handleSwitchChange("showDescription", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="showLanguage">Language</Label>
                <p className="text-sm text-muted-foreground">
                  Show primary language
                </p>
              </div>
              <Switch
                id="showLanguage"
                checked={repoSettings.showLanguage}
                onCheckedChange={(checked) =>
                  handleSwitchChange("showLanguage", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="showStats">Stats</Label>
                <p className="text-sm text-muted-foreground">
                  Show stars and forks
                </p>
              </div>
              <Switch
                id="showStats"
                checked={repoSettings.showStats}
                onCheckedChange={(checked) =>
                  handleSwitchChange("showStats", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="showOwner">Owner</Label>
                <p className="text-sm text-muted-foreground">
                  Show repository owner
                </p>
              </div>
              <Switch
                id="showOwner"
                checked={repoSettings.showOwner}
                onCheckedChange={(checked) =>
                  handleSwitchChange("showOwner", checked)
                }
              />
            </div>
          </TabsContent>

          <TabsContent value="style" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Card Theme</Label>
              <Select
                value={repoSettings.theme}
                onValueChange={(value) => handleSelectChange("theme", value)}
              >
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="radical">Radical</SelectItem>
                  <SelectItem value="merko">Merko</SelectItem>
                  <SelectItem value="gruvbox">Gruvbox</SelectItem>
                  <SelectItem value="tokyonight">Tokyo Night</SelectItem>
                  <SelectItem value="onedark">One Dark</SelectItem>
                  <SelectItem value="cobalt">Cobalt</SelectItem>
                  <SelectItem value="synthwave">Synthwave</SelectItem>
                  <SelectItem value="highcontrast">High Contrast</SelectItem>
                  <SelectItem value="dracula">Dracula</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Border Style</Label>
              <Select
                value={repoSettings.borderStyle}
                onValueChange={(value) =>
                  handleSelectChange("borderStyle", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select border style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Custom Icon Size</Label>
              <Select
                value={repoSettings.iconSize}
                onValueChange={(value) => handleSelectChange("iconSize", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select icon size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setRepoSettings(defaultRepoSettings)}
        >
          Reset to Default
        </Button>
        <Button variant="default">Apply Changes</Button>
      </CardFooter>
    </Card>
  );
}

export const defaultRepoSettings = {
  cardStyle: "default",
  gridColumns: 2,
  alignment: "center",
  showDescription: true,
  showLanguage: true,
  showStats: true,
  showOwner: false,
  theme: "default",
  borderStyle: "default",
  iconSize: "medium",
};
