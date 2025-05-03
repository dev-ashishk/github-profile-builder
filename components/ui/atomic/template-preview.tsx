"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Code, Download, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TemplatePreviewProps {
  markdown: string
  visualPreview: React.ReactNode
  className?: string
}

export function TemplatePreview({ markdown, visualPreview, className }: TemplatePreviewProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      toast({
        title: "Copied to clipboard",
        description: "You can now paste this into your GitHub profile README.md file",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
      })
    }
  }

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "README.md"
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded README.md",
      description: "Your markdown file has been downloaded",
    })
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Preview</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy} className="flex items-center gap-1">
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy Markdown"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} className="flex items-center gap-1">
            <Download size={16} />
            Download
          </Button>
        </div>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preview" className="flex items-center gap-1">
            <Eye size={16} />
            Visual Preview
          </TabsTrigger>
          <TabsTrigger value="markdown" className="flex items-center gap-1">
            <Code size={16} />
            Markdown
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-4 bg-white dark:bg-gray-950 border rounded-md min-h-[500px]">
          {visualPreview}
        </TabsContent>

        <TabsContent value="markdown" className="mt-4">
          <div className="relative">
            <textarea
              className="font-mono text-sm h-[500px] resize-none p-4 w-full rounded-md border bg-background"
              value={markdown}
              readOnly
            />
            <Button variant="ghost" size="sm" className="absolute top-2 right-2" onClick={handleCopy}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
