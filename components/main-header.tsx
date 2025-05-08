"use client";

import { Github, Menu, X, BookOpen, HelpCircle, FileCode } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/utils/analytics";

export function MainHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (section: string) => {
    trackEvent("navigation", "header", section);
    setIsMenuOpen(false);
  };

  const mainNavItems = [
    {
      href: "/",
      label: "Profile Builder",
      icon: <Github size={16} className="mr-2" />,
    },
  ];

  const helpNavItems = [
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

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2"
            onClick={() => handleNavigation("home")}
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

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                isActive(item.href) ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => handleNavigation(item.label)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

          <div className="h-4 w-px bg-border mx-2" />

          {helpNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                isActive(item.href) ? "text-primary" : "text-muted-foreground"
              )}
              onClick={() => handleNavigation(item.label)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-b pb-2">
          <nav className="flex flex-col space-y-2 px-4">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium p-2 rounded-md transition-colors",
                  isActive(item.href)
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                )}
                onClick={() => handleNavigation(item.label)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}

            <div className="h-px bg-border my-2" />

            {helpNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium p-2 rounded-md transition-colors",
                  isActive(item.href)
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-primary"
                )}
                onClick={() => handleNavigation(item.label)}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
