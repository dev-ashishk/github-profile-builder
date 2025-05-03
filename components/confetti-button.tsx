"use client";

import confetti from "canvas-confetti";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function ConfettiButton({
  children,
  onClick,
  confettiColors = ["#5E81AC", "#88C0D0", "#EBCB8B"],
  ...props
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e) => {
    // Get button position for confetti origin
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const originX =
      (buttonRect.left + buttonRect.width / 2) / window.innerWidth;
    const originY =
      (buttonRect.top + buttonRect.height / 2) / window.innerHeight;

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: originX, y: originY },
      colors: confettiColors,
      disableForReducedMotion: true,
    });

    // Animate button
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 700);

    // Call original onClick handler
    if (onClick) onClick(e);
  };

  return (
    <Button
      onClick={handleClick}
      className={`transition-transform ${isAnimating ? "scale-105" : ""}`}
      {...props}
    >
      {children}
    </Button>
  );
}
