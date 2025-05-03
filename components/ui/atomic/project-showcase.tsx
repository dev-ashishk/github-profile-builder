import { Container } from "./container"
import { Section, SectionHeading } from "./section"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

interface Project {
  title: string
  description: string
  image?: string
  technologies: string[]
  liveUrl?: string
  repoUrl?: string
}

interface ProjectCardProps {
  project: Project
  className?: string
  primaryColor?: string
  secondaryColor?: string
}

export function ProjectCard({ project, className, primaryColor, secondaryColor }: ProjectCardProps) {
  return (
    <Container className={`overflow-hidden ${className}`}>
      <div className="flex flex-col h-full">
        {project.image && (
          <div className="h-48 overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={400}
              height={200}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2" style={{ color: primaryColor }}>
            {project.title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs"
                style={{ borderColor: secondaryColor, color: secondaryColor }}
              >
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2 mt-auto">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm hover:underline"
                style={{ color: primaryColor }}
              >
                <Github size={14} className="mr-1" />
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm hover:underline ml-4"
                style={{ color: primaryColor }}
              >
                <ExternalLink size={14} className="mr-1" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

interface ProjectShowcaseProps {
  projects: Project[]
  title?: string
  primaryColor?: string
  secondaryColor?: string
}

export function ProjectShowcase({
  projects,
  title = "Featured Projects",
  primaryColor,
  secondaryColor,
}: ProjectShowcaseProps) {
  if (!projects || projects.length === 0) return null

  return (
    <Section>
      <SectionHeading level={2} color={primaryColor}>
        {title}
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} primaryColor={primaryColor} secondaryColor={secondaryColor} />
        ))}
      </div>
    </Section>
  )
}
