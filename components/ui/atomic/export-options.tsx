"use client";

import {
  Download,
  Copy,
  FileText,
  FileImage,
  Share2,
  Check,
  Github,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface ExportOptionsProps {
  markdown: string;
  onExportPDF?: () => void;
  onExportImage?: () => void;
  onShareLink?: () => void;
  onOpenInGitHub?: () => void;
  className?: string;
}

export function ExportOptions({
  markdown,
  onExportPDF,
  onExportImage,
  onShareLink,
  onOpenInGitHub,
  className,
}: ExportOptionsProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description:
          "You can now paste this into your GitHub profile README.md file",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="flex items-center gap-1"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Copied" : "Copy Markdown"}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Download size={16} />
            Export
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              const blob = new Blob([markdown], { type: "text/markdown" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "README.md";
              a.click();
              URL.revokeObjectURL(url);

              toast({
                title: "Downloaded README.md",
                description: "Your markdown file has been downloaded",
              });
            }}
          >
            <FileText size={16} className="mr-2" />
            Download as Markdown
          </DropdownMenuItem>

          {onExportPDF && (
            <DropdownMenuItem onClick={onExportPDF}>
              <FileText size={16} className="mr-2" />
              Export as PDF
            </DropdownMenuItem>
          )}

          {onExportImage && (
            <DropdownMenuItem onClick={onExportImage}>
              <FileImage size={16} className="mr-2" />
              Export as Image
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {onShareLink && (
        <Button
          variant="outline"
          size="sm"
          onClick={onShareLink}
          className="flex items-center gap-1"
        >
          <Share2 size={16} />
          Share
        </Button>
      )}

      {onOpenInGitHub && (
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenInGitHub}
          className="flex items-center gap-1"
        >
          <Github size={16} />
          Open in GitHub
        </Button>
      )}
    </div>
  );
}
