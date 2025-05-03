"use client";

import { Sparkles, Download, Copy, RefreshCw } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Define theme types
type ContributionTheme =
  | "github"
  | "github-dark"
  | "github-light"
  | "halloween"
  | "teal"
  | "leftpad"
  | "dracula"
  | "blue"
  | "panda"
  | "sunny"
  | "pink"
  | "yingnbu"
  | "solarized-dark"
  | "solarized-light";

interface ThemeOption {
  id: ContributionTheme;
  name: string;
  colors: string[];
}

export function ContributionChartGenerator() {
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState<ContributionTheme>("github");
  const [chartUrl, setChartUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  // Theme options with preview colors
  const themeOptions: ThemeOption[] = [
    {
      id: "github",
      name: "GitHub",
      colors: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    },
    {
      id: "github-dark",
      name: "GitHub Dark",
      colors: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
    },
    {
      id: "github-light",
      name: "GitHub Classic",
      colors: ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"],
    },
    {
      id: "halloween",
      name: "Halloween",
      colors: ["#ebedf0", "#ffee4a", "#ffc501", "#fe9600", "#03001c"],
    },
    {
      id: "teal",
      name: "Teal",
      colors: ["#ebedf0", "#bef5cb", "#85e0ab", "#34b27a", "#137356"],
    },
    {
      id: "leftpad",
      name: "Leftpad",
      colors: ["#ebedf0", "#c8e6c9", "#a5d6a7", "#66bb6a", "#4caf50"],
    },
    {
      id: "dracula",
      name: "Dracula",
      colors: ["#282a36", "#44475a", "#6272a4", "#bd93f9", "#ff79c6"],
    },
    {
      id: "blue",
      name: "Blue",
      colors: ["#ebedf0", "#b0e0e6", "#87ceeb", "#4682b4", "#0000cd"],
    },
    {
      id: "panda",
      name: "Panda",
      colors: ["#ebedf0", "#c8e6c9", "#a5d6a7", "#66bb6a", "#000000"],
    },
    {
      id: "sunny",
      name: "Sunny",
      colors: ["#ebedf0", "#fff9c4", "#fff59d", "#fff176", "#ffeb3b"],
    },
    {
      id: "pink",
      name: "Pink",
      colors: ["#ebedf0", "#f8bbd0", "#f48fb1", "#f06292", "#e91e63"],
    },
    {
      id: "yingnbu",
      name: "YlGnBu",
      colors: ["#ebedf0", "#eaf5f9", "#c7e9b4", "#41b6c4", "#253494"],
    },
    {
      id: "solarized-dark",
      name: "Solarized Dark",
      colors: ["#002b36", "#073642", "#586e75", "#657b83", "#839496"],
    },
    {
      id: "solarized-light",
      name: "Solarized Light",
      colors: ["#fdf6e3", "#eee8d5", "#93a1a1", "#839496", "#657b83"],
    },
  ];

  const generateChart = async () => {
    if (!username) {
      toast({
        title: "Username required",
        description: "Please enter a GitHub username",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Generate the URL for the contribution chart
      const url = `https://github-contributions-api.vercel.app/${username}?theme=${theme}`;

      // Check if the username exists by making a request to GitHub API
      const response = await fetch(`https://api.github.com/users/${username}`);

      if (!response.ok) {
        throw new Error(`GitHub user not found: ${username}`);
      }

      setChartUrl(url);
      setIsGenerated(true);

      toast({
        title: "Chart generated",
        description: "Your GitHub contributions chart has been generated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to generate chart",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyImageUrl = () => {
    navigator.clipboard.writeText(chartUrl);
    toast({
      title: "URL copied",
      description: "Chart URL copied to clipboard",
    });
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(chartUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${username}-github-contributions.svg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Download started",
        description: "Your chart is being downloaded",
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download the chart",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">
          GitHub Contributions Chart Generator
        </CardTitle>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          Generate a beautiful visualization of your GitHub contributions
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="github-username">GitHub Username</Label>
          <div className="flex gap-2">
            <Input
              id="github-username"
              placeholder="Enter your GitHub username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button onClick={generateChart} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw size={16} className="mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} className="mr-2" />
                  Generate!
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Select a Theme</Label>
          <RadioGroup
            value={theme}
            onValueChange={(value) => setTheme(value as ContributionTheme)}
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4"
          >
            {themeOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label
                  htmlFor={option.id}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className="flex h-4">
                    {option.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 border border-gray-200 dark:border-gray-700"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span>{option.name}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {isGenerated && chartUrl && (
          <div className="space-y-4">
            <div className="border rounded-md p-4 bg-white dark:bg-gray-800 overflow-hidden">
              <Image
                src={chartUrl || "/placeholder.svg"}
                alt={`${username}'s GitHub contributions`}
                width={800}
                height={128}
                className="w-full h-auto"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={copyImageUrl}>
                <Copy size={16} className="mr-2" />
                Copy URL
              </Button>
              <Button variant="outline" size="sm" onClick={downloadImage}>
                <Download size={16} className="mr-2" />
                Download SVG
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Not affiliated with GitHub Inc. Powered by GitHub Contributions API.
        </p>
      </CardFooter>
    </Card>
  );
}
