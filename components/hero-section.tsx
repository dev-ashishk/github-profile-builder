"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Star, GitFork, Code, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function HeroSection() {
  const [stars, setStars] = useState(0)
  const [forks, setForks] = useState(0)

  // Simulate fetching GitHub stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setStars(Math.floor(Math.random() * 500) + 100)
      setForks(Math.floor(Math.random() * 100) + 20)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 py-12 md:py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
      </div>

      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="bg-primary/10 p-3 rounded-full"
            >
              <Github size={40} className="text-primary" />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            GitHub Profile README Builder
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8"
          >
            Create an impressive GitHub profile page in minutes with our interactive builder
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <Button size="lg" className="gap-2">
              <Sparkles size={18} />
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href="https://github.com/dev-ashishk/github-profile-builder" target="_blank" rel="noopener noreferrer">
                <Github size={18} />
                View on GitHub
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex justify-center gap-6"
          >
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Star size={16} className="text-yellow-500" />
              <span className="font-medium">{stars}</span>
              <span className="text-sm">stars</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <GitFork size={16} className="text-blue-500" />
              <span className="font-medium">{forks}</span>
              <span className="text-sm">forks</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Code size={16} className="text-green-500" />
              <span className="font-medium">6</span>
              <span className="text-sm">templates</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-12 relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-30"></div>
          <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden">
            <img
              src="/placeholder.svg?key=209zd"
              alt="GitHub Profile README Builder Preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
