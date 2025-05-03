import { Container } from "./container"
import { Section, SectionHeading } from "./section"
import { Award, Medal, Trophy, Star } from "lucide-react"
import Image from "next/image"

interface Achievement {
  title: string
  description?: string
  date?: string
  icon?: "award" | "medal" | "trophy" | "star" | string
  image?: string
  url?: string
}

interface AchievementCardProps {
  achievement: Achievement
  className?: string
  primaryColor?: string
}

export function AchievementCard({ achievement, className, primaryColor }: AchievementCardProps) {
  const getIcon = () => {
    switch (achievement.icon) {
      case "award":
        return <Award size={24} />
      case "medal":
        return <Medal size={24} />
      case "trophy":
        return <Trophy size={24} />
      case "star":
        return <Star size={24} />
      default:
        return null
    }
  }

  return (
    <Container className={`p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${primaryColor || "#3b82f6"}20`, color: primaryColor || "#3b82f6" }}
        >
          {achievement.image ? (
            <Image
              src={achievement.image || "/placeholder.svg"}
              alt={achievement.title}
              width={24}
              height={24}
              className="max-w-full max-h-full"
            />
          ) : (
            getIcon()
          )}
        </div>

        <div className="flex-grow">
          <div className="flex items-start justify-between">
            <h3 className="text-base font-semibold" style={{ color: primaryColor }}>
              {achievement.url ? (
                <a href={achievement.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {achievement.title}
                </a>
              ) : (
                achievement.title
              )}
            </h3>
            {achievement.date && (
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{achievement.date}</span>
            )}
          </div>

          {achievement.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{achievement.description}</p>
          )}
        </div>
      </div>
    </Container>
  )
}

interface AchievementsProps {
  achievements: Achievement[]
  title?: string
  primaryColor?: string
  layout?: "grid" | "list"
}

export function Achievements({
  achievements,
  title = "Achievements & Certifications",
  primaryColor,
  layout = "list",
}: AchievementsProps) {
  if (!achievements || achievements.length === 0) return null

  return (
    <Section>
      <SectionHeading level={2} color={primaryColor}>
        {title}
      </SectionHeading>

      {layout === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} primaryColor={primaryColor} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} primaryColor={primaryColor} />
          ))}
        </div>
      )}
    </Section>
  )
}
