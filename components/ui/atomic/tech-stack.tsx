import { Container } from "./container"
import { Section, SectionHeading } from "./section"
import Image from "next/image"

interface TechItem {
  name: string
  icon?: string
  category?: string
  proficiency?: number
}

interface TechStackProps {
  items: TechItem[]
  title?: string
  className?: string
  primaryColor?: string
  secondaryColor?: string
  showProficiency?: boolean
  categorized?: boolean
}

export function TechStack({
  items,
  title = "Tech Stack",
  className,
  primaryColor,
  secondaryColor,
  showProficiency = false,
  categorized = false,
}: TechStackProps) {
  if (!items || items.length === 0) return null

  // Group by category if categorized is true
  const groupedItems = categorized
    ? items.reduce(
        (acc, item) => {
          const category = item.category || "Other"
          if (!acc[category]) acc[category] = []
          acc[category].push(item)
          return acc
        },
        {} as Record<string, TechItem[]>,
      )
    : { All: items }

  return (
    <Section className={className}>
      <SectionHeading level={2} color={primaryColor}>
        {title}
      </SectionHeading>

      {categorized ? (
        Object.entries(groupedItems).map(([category, categoryItems]) => (
          <div key={category} className="mb-6 last:mb-0">
            <SectionHeading level={3} color={secondaryColor}>
              {category}
            </SectionHeading>
            <Container className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categoryItems.map((item, index) => (
                  <TechItem key={index} item={item} showProficiency={showProficiency} primaryColor={primaryColor} />
                ))}
              </div>
            </Container>
          </div>
        ))
      ) : (
        <Container className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {items.map((item, index) => (
              <TechItem key={index} item={item} showProficiency={showProficiency} primaryColor={primaryColor} />
            ))}
          </div>
        </Container>
      )}
    </Section>
  )
}

interface TechItemProps {
  item: TechItem
  showProficiency: boolean
  primaryColor?: string
}

function TechItem({ item, showProficiency, primaryColor }: TechItemProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {item.icon ? (
        <div className="w-12 h-12 mb-2 flex items-center justify-center">
          <Image
            src={item.icon || "/placeholder.svg"}
            alt={item.name}
            width={48}
            height={48}
            className="max-w-full max-h-full"
          />
        </div>
      ) : (
        <div
          className="w-12 h-12 rounded-full mb-2 flex items-center justify-center text-white text-lg font-bold"
          style={{ backgroundColor: primaryColor || "#3b82f6" }}
        >
          {item.name.charAt(0)}
        </div>
      )}

      <span className="text-sm font-medium">{item.name}</span>

      {showProficiency && item.proficiency !== undefined && (
        <div className="w-full mt-1 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full"
            style={{
              width: `${item.proficiency}%`,
              backgroundColor: primaryColor || "#3b82f6",
            }}
          ></div>
        </div>
      )}
    </div>
  )
}
