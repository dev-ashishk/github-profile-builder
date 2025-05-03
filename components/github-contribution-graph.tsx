"use client"

import Image from "next/image"
import { Container } from "@/components/ui/atomic/container"

interface GitHubContributionGraphProps {
  username: string
  theme?: string
}

export function GitHubContributionGraph({ username, theme = "github" }: GitHubContributionGraphProps) {
  if (!username) return null

  return (
    <Container className="overflow-hidden">
      <Image
        src={`https://github-contributions-api.vercel.app/${username}?theme=${theme}`}
        alt={`${username}'s GitHub contribution graph`}
        width={720}
        height={300}
        className="w-full h-auto"
      />
    </Container>
  )
}
