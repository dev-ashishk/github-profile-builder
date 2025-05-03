"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

import { Avatar } from "@/components/ui/atomic/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?key=vkcvp",
    content:
      "This tool saved me hours of work! I was able to create a professional GitHub profile in minutes that truly represents my skills and projects.",
    stars: 5,
  },
  {
    name: "Sarah Chen",
    role: "Full Stack Engineer",
    avatar: "/placeholder.svg?key=c0v2a",
    content:
      "The templates are beautiful and the customization options are exactly what I needed. My GitHub profile now stands out from the crowd!",
    stars: 5,
  },
  {
    name: "Michael Rodriguez",
    role: "Open Source Contributor",
    avatar: "/placeholder.svg?key=jfqwt",
    content:
      "As someone who contributes to many open source projects, having a great GitHub profile is essential. This builder made it effortless.",
    stars: 4,
  },
];

export function TestimonialSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Developers Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Join thousands of developers who have enhanced their GitHub profiles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      size={48}
                      className="mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {Array(testimonial.stars)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-500 fill-yellow-500"
                        />
                      ))}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
