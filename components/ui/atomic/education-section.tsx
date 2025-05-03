import { Container } from "./container"
import { Section, SectionHeading } from "./section"
import { GraduationCap, Calendar, MapPin } from "lucide-react"
import Image from "next/image"

interface Education {
  institution: string
  degree: string
  field?: string
  location?: string
  startDate: string
  endDate?: string
  description?: string
  logo?: string
  gpa?: string | number
  achievements?: string[]
}

interface EducationCardProps {
  education: Education
  className?: string
  primaryColor?: string
  secondaryColor?: string
}

export function EducationCard({ education, className, primaryColor, secondaryColor }: EducationCardProps) {
  return (
    <Container className={`p-4 ${className}`}>
      <div className="flex">
        <div className="mr-4 flex-shrink-0">
          {education.logo ? (
            <Image
              src={education.logo || "/placeholder.svg"}
              alt={education.institution}
              width={64}
              height={64}
              className="w-16 h-16 object-contain"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${primaryColor || "#3b82f6"}20`, color: primaryColor || "#3b82f6" }}
            >
              <GraduationCap size={32} />
            </div>
          )}
        </div>

        <div className="flex-grow">
          <h3 className="text-lg font-semibold" style={{ color: primaryColor }}>
            {education.degree}
            {education.field && <span className="font-normal"> in {education.field}</span>}
          </h3>

          <div className="text-base font-medium mb-1">{education.institution}</div>

          <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
            <div className="flex items-center mr-4">
              <Calendar size={14} className="mr-1" />
              <span>
                {education.startDate} - {education.endDate || "Present"}
              </span>
            </div>

            {education.location && (
              <div className="flex items-center">
                <MapPin size={14} className="mr-1" />
                <span>{education.location}</span>
              </div>
            )}

            {education.gpa && (
              <div className="ml-4">
                <span
                  className="px-2 py-0.5 rounded text-xs"
                  style={{
                    backgroundColor: `${secondaryColor || "#3b82f6"}20`,
                    color: secondaryColor || "#3b82f6",
                  }}
                >
                  GPA: {education.gpa}
                </span>
              </div>
            )}
          </div>

          {education.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{education.description}</p>
          )}

          {education.achievements && education.achievements.length > 0 && (
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 pl-1">
              {education.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Container>
  )
}

interface EducationSectionProps {
  educationList: Education[]
  title?: string
  primaryColor?: string
  secondaryColor?: string
}

export function EducationSection({
  educationList,
  title = "Education",
  primaryColor,
  secondaryColor,
}: EducationSectionProps) {
  if (!educationList || educationList.length === 0) return null

  return (
    <Section>
      <SectionHeading level={2} color={primaryColor}>
        {title}
      </SectionHeading>
      <div className="space-y-4">
        {educationList.map((education, index) => (
          <EducationCard
            key={index}
            education={education}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
        ))}
      </div>
    </Section>
  )
}
