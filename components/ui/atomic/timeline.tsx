import type React from "react"
import { Container } from "./container"
import { Section, SectionHeading } from "./section"

interface TimelineItem {
  title: string
  organization?: string
  period: string
  description?: string
  tags?: string[]
  icon?: React.ReactNode
}

interface TimelineItemProps {
  item: TimelineItem
  isLast: boolean
  primaryColor?: string
  secondaryColor?: string
}

export function TimelineItemComponent({ item, isLast, primaryColor, secondaryColor }: TimelineItemProps) {
  return (
    <div className="relative pl-8 pb-8">
      {/* Timeline line */}
      {!isLast && (
        <div
          className="absolute left-3 top-5 w-0.5 h-full -translate-x-1/2"
          style={{ backgroundColor: secondaryColor || "#e5e7eb" }}
        ></div>
      )}

      {/* Timeline dot */}
      <div
        className="absolute left-3 top-5 w-5 h-5 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{ backgroundColor: primaryColor || "#3b82f6" }}
      >
        {item.icon || <div className="w-2 h-2 rounded-full bg-white"></div>}
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
          <h3 className="text-base font-semibold" style={{ color: primaryColor }}>
            {item.title}
            {item.organization && <span className="font-normal"> • {item.organization}</span>}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{item.period}</span>
        </div>

        {item.description && <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.description}</p>}

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: `${secondaryColor || "#3b82f6"}20`,
                  color: secondaryColor || "#3b82f6",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface TimelineProps {
  items: TimelineItem[]
  title?: string
  className?: string
  primaryColor?: string
  secondaryColor?: string
}

export function Timeline({ items, title = "Experience", className, primaryColor, secondaryColor }: TimelineProps) {
  if (!items || items.length === 0) return null

  return (
    <Section className={className}>
      <SectionHeading level={2} color={primaryColor}>
        {title}
      </SectionHeading>
      <Container className="p-6">
        {items.map((item, index) => (
          <TimelineItemComponent
            key={index}
            item={item}
            isLast={index === items.length - 1}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        ))}
      </Container>
    </Section>
  )
}
