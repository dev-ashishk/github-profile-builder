"use client";

import { motion } from "framer-motion";
import { BookOpen, Github, FileCode, HelpCircle, X, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/utils/analytics";

interface HelpDocsNavProps {
  onClose: () => void;
}

export function HelpDocsNav({ onClose }: HelpDocsNavProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    trackEvent("help_navigation", "documentation", path);
    setIsMenuOpen(false);
  };

  const navItems = [
    {
      href: "/help",
      label: "Getting Started",
      icon: <BookOpen size={16} className="mr-2" />,
    },
    {
      href: "/help/profile-readme",
      label: "Profile README",
      icon: <Github size={16} className="mr-2" />,
    },
    {
      href: "/help/step-by-step",
      label: "Step-by-Step Guide",
      icon: <FileCode size={16} className="mr-2" />,
    },
    {
      href: "/help/faq",
      label: "FAQ",
      icon: <HelpCircle size={16} className="mr-2" />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2"
            onClick={() => onClose()}
          >
            <Github className="h-6 w-6" />
            <span className="font-bold">README Builder</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
              onClick={() => handleNavigation(item.href)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" onClick={onClose}>
            <X size={18} className="mr-2" />
            Close Help
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-b pb-2"
        >
          <nav className="flex flex-col space-y-2 px-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium p-2 rounded-md transition-colors",
                  pathname === item.href
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                )}
                onClick={() => handleNavigation(item.href)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
}
