import { Container } from "./container"
import { Section, SectionHeading } from "./section"
import { Star, GitFork } from "lucide-react"

interface Repository {
  name: string
  description: string
  url: string
  stars: number
  forks: number
  language: string
  languageColor?: string
}

interface RepositoryCardProps {
  repository: Repository
  className?: string
  showDescription?: boolean
  showLanguage?: boolean
  showStats?: boolean
  style?: string
}

export function RepositoryCard({
  repository,
  className,
  showDescription = true,
  showLanguage = true,
  showStats = true,
  style = "default",
}: RepositoryCardProps) {
  return (
    <Container className={`p-4 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex flex-col h-full">
        <div className="mb-2">
          <a
            href={repository.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold hover:underline"
          >
            {repository.name}
          </a>
        </div>

        {showDescription && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
            {repository.description || "No description provided"}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto">
          {showLanguage && repository.language && (
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <span
                  className="w-3 h-3 rounded-full mr-1"
                  style={{ backgroundColor: repository.languageColor || "#ccc" }}
                ></span>
                <span className="text-xs">{repository.language}</span>
              </div>
            </div>
          )}

          {showStats && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-xs">
                <Star size={14} className="mr-1" />
                <span>{repository.stars}</span>
              </div>
              <div className="flex items-center text-xs">
                <GitFork size={14} className="mr-1" />
                <span>{repository.forks}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

interface RepositoriesGridProps {
  repositories: Repository[]
  title?: string
  primaryColor?: string
  gridColumns?: number
  cardStyle?: string
  showDescription?: boolean
  showLanguage?: boolean
  showStats?: boolean
}

export function RepositoriesGrid({
  repositories,
  title = "Featured Repositories",
  primaryColor,
  gridColumns = 2,
  cardStyle = "default",
  showDescription = true,
  showLanguage = true,
  showStats = true,
}: RepositoriesGridProps) {
  if (!repositories || repositories.length === 0) return null

  return (
    <Section>
      <SectionHeading level={2} color={primaryColor}>
        {title}
      </SectionHeading>
      <div className={`grid grid-cols-1 md:grid-cols-${gridColumns} gap-4`}>
        {repositories.map((repo, index) => (
          <RepositoryCard
            key={index}
            repository={repo}
            showDescription={showDescription}
            showLanguage={showLanguage}
            showStats={showStats}
            style={cardStyle}
          />
        ))}
      </div>
    </Section>
  )
}
