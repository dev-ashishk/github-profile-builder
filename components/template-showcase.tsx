"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const templates = [
  {
    name: "Modern",
    description: "Clean and professional layout with a focus on readability",
    image: "/placeholder.svg?key=etd64",
  },
  {
    name: "Minimal",
    description: "Simple and elegant design with minimalist aesthetics",
    image: "/placeholder.svg?key=1suhh",
  },
  {
    name: "Creative",
    description: "Eye-catching and unique style with colorful elements",
    image: "/placeholder.svg?key=icalx",
  },
  {
    name: "Developer",
    description:
      "Code-focused design with technical elements and syntax highlighting",
    image: "/placeholder.svg?key=sueab",
  },
  {
    name: "Professional",
    description: "Business-oriented layout with a corporate, polished feel",
    image: "/placeholder.svg?key=d06ok",
  },
  {
    name: "Elegant",
    description:
      "Sophisticated and refined design with subtle, tasteful elements",
    image: "/placeholder.svg?key=64s5l",
  },
];

export function TemplateShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTemplate = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % templates.length);
  };

  const prevTemplate = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + templates.length) % templates.length
    );
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Beautiful Templates
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose from 6 professionally designed templates to make your GitHub
            profile stand out
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
              onClick={prevTemplate}
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous template</span>
            </Button>
          </div>

          <div className="overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="aspect-w-16 aspect-h-9 bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                  <img
                    src={templates[currentIndex].image || "/placeholder.svg"}
                    alt={templates[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {templates[currentIndex].name}
                  </h3>
                  <p>{templates[currentIndex].description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
              onClick={nextTemplate}
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next template</span>
            </Button>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {templates.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to template ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
