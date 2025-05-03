"use client"

import { motion } from "framer-motion"
import { Palette, Layout, BarChart, Github, Award, LineChart, Sparkles, Smartphone } from "lucide-react"

const features = [
  {
    icon: <Palette className="h-10 w-10 text-primary" />,
    title: "Multiple Templates",
    description: "Choose from 6 professionally designed templates to match your style",
  },
  {
    icon: <Layout className="h-10 w-10 text-primary" />,
    title: "Customizable Sections",
    description: "Add, remove, and reorder sections to create your perfect profile",
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "GitHub Stats",
    description: "Automatically display your GitHub statistics, languages, and streak",
  },
  {
    icon: <Github className="h-10 w-10 text-primary" />,
    title: "GitHub Integration",
    description: "Fetch your repositories, contributions, and other GitHub data",
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Achievement Trophies",
    description: "Showcase your GitHub achievements with customizable trophy displays",
  },
  {
    icon: <LineChart className="h-10 w-10 text-primary" />,
    title: "Contribution Graph",
    description: "Display your GitHub contribution activity with customizable themes",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: "Real-time Preview",
    description: "See your changes instantly with a live markdown preview",
  },
  {
    icon: <Smartphone className="h-10 w-10 text-primary" />,
    title: "Responsive Design",
    description: "Works perfectly on desktop, tablet, and mobile devices",
  },
]

export function FeatureSection() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to create an impressive GitHub profile README
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
