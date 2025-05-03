import type React from "react"
import { Container } from "./container"
import { Section, SectionHeading } from "./section"
import { StatsGrid } from "./stat-card"
import { Activity } from "lucide-react"

interface AnalyticsCardProps {
  title: string
  value: number | string
  change?: number
  changeLabel?: string
  icon?: React.ReactNode
  className?: string
  primaryColor?: string
}

export function AnalyticsCard({
  title,
  value,
  change,
  changeLabel = "vs. previous period",
  icon,
  className,
  primaryColor,
}: AnalyticsCardProps) {
  const isPositiveChange = typeof change === "number" && change > 0
  const isNegativeChange = typeof change === "number" && change < 0

  return (
    <Container className={`p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</div>
          <div className="text-2xl font-bold">{value}</div>

          {change !== undefined && (
            <div className="flex items-center mt-1">
              <span
                className={`text-xs font-medium ${
                  isPositiveChange ? "text-green-500" : isNegativeChange ? "text-red-500" : "text-gray-500"
                }`}
              >
                {isPositiveChange ? "+" : ""}
                {change}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{changeLabel}</span>
            </div>
          )}
        </div>

        {icon && (
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: `${primaryColor || "#3b82f6"}20`,
              color: primaryColor || "#3b82f6",
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </Container>
  )
}

interface AnalyticsSectionProps {
  title?: string
  metrics: Array<{
    title: string
    value: number | string
    change?: number
    icon?: React.ReactNode
  }>
  primaryColor?: string
  columns?: 2 | 3 | 4
}

export function AnalyticsSection({ title = "Analytics", metrics, primaryColor, columns = 4 }: AnalyticsSectionProps) {
  if (!metrics || metrics.length === 0) return null

  return (
    <Section>
      <SectionHeading level={2} color={primaryColor}>
        {title}
      </SectionHeading>
      <StatsGrid columns={columns}>
        {metrics.map((metric, index) => (
          <AnalyticsCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon || <Activity size={20} />}
            primaryColor={primaryColor}
          />
        ))}
      </StatsGrid>
    </Section>
  )
}
