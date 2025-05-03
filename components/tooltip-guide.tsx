"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

export function TooltipGuide({ steps, isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Calculate position for the tooltip based on the target element
  useEffect(() => {
    if (!isOpen || !steps || steps.length === 0) return;

    const calculatePosition = () => {
      const targetElement = document.querySelector(steps[currentStep].target);

      if (!targetElement) return;

      const rect = targetElement.getBoundingClientRect();
      const tooltipWidth = 280;
      const tooltipHeight = 120;

      let top = 0;
      let left = 0;

      switch (steps[currentStep].position) {
        case "top":
          top = rect.top - tooltipHeight - 10;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          break;
        case "bottom":
          top = rect.bottom + 10;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2 - tooltipHeight / 2;
          left = rect.left - tooltipWidth - 10;
          break;
        case "right":
          top = rect.top + rect.height / 2 - tooltipHeight / 2;
          left = rect.right + 10;
          break;
        default:
          top = rect.bottom + 10;
          left = rect.left + rect.width / 2 - tooltipWidth / 2;
      }

      // Ensure tooltip stays within viewport
      if (left < 10) left = 10;
      if (left + tooltipWidth > window.innerWidth - 10)
        left = window.innerWidth - tooltipWidth - 10;
      if (top < 10) top = 10;
      if (top + tooltipHeight > window.innerHeight - 10)
        top = window.innerHeight - tooltipHeight - 10;

      setPosition({ top, left });

      // Highlight the target element
      targetElement.classList.add("ring-2", "ring-primary", "ring-offset-2");

      return () => {
        targetElement.classList.remove(
          "ring-2",
          "ring-primary",
          "ring-offset-2"
        );
      };
    };

    const cleanup = calculatePosition();
    window.addEventListener("resize", calculatePosition);

    return () => {
      cleanup && cleanup();
      window.removeEventListener("resize", calculatePosition);
    };
  }, [isOpen, currentStep, steps]);

  // Handle next step or close
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  // Handle close
  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  if (!isOpen || !steps || steps.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed z-50 w-[280px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Step {currentStep + 1} of {steps.length}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={handleClose}
                >
                  <X size={14} />
                </Button>
              </div>

              <p className="text-sm mb-4">{steps[currentStep].content}</p>

              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="text-xs"
                >
                  Skip tour
                </Button>
                <Button size="sm" onClick={handleNext} className="text-xs">
                  {currentStep < steps.length - 1 ? "Next" : "Finish"}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
