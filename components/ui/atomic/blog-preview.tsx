import { Container } from "./container"
import { Section, SectionHeading } from "./section"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import Image from "next/image"

interface BlogPost {
  title: string
  excerpt: string
  date: string
  readTime?: string
  url: string
  image?: string
  tags?: string[]
}

interface BlogCardProps {
  post: BlogPost
  className?: string
  primaryColor?: string
}

export function BlogCard({ post, className, primaryColor }: BlogCardProps) {
  return (
    <Container className={`overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      {post.image && (
        <div className="h-40 overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
          <div className="flex items-center">
            <Calendar size={12} className="mr-1" />
            <span>{post.date}</span>
          </div>
          {post.readTime && (
            <div className="flex items-center">
              <Clock size={12} className="mr-1" />
              <span>{post.readTime}</span>
            </div>
          )}
        </div>

        <a href={post.url} target="_blank" rel="noopener noreferrer" className="block mb-2">
          <h3 className="text-lg font-semibold hover:underline" style={{ color: primaryColor }}>
            {post.title}
          </h3>
        </a>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{post.excerpt}</p>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

interface BlogPreviewProps {
  posts: BlogPost[]
  title?: string
  primaryColor?: string
  maxPosts?: number
}

export function BlogPreview({ posts, title = "Latest Blog Posts", primaryColor, maxPosts = 3 }: BlogPreviewProps) {
  if (!posts || posts.length === 0) return null

  const displayPosts = posts.slice(0, maxPosts)

  return (
    <Section>
      <SectionHeading level={2} color={primaryColor}>
        {title}
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayPosts.map((post, index) => (
          <BlogCard key={index} post={post} primaryColor={primaryColor} />
        ))}
      </div>

      {posts.length > maxPosts && (
        <div className="text-center mt-4">
          <a href="#" className="text-sm font-medium hover:underline" style={{ color: primaryColor }}>
            View all posts
          </a>
        </div>
      )}
    </Section>
  )
}
