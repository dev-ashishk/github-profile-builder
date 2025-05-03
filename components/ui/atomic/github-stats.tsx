import { Container } from "./container"
import { Section, SectionHeading } from "./section"
import Image from "next/image"

interface GitHubStatsProps {
  username: string
  showStats?: boolean
  showLanguages?: boolean
  showStreak?: boolean
  showContributions?: boolean
  showTrophies?: boolean
  theme?: "default" | "dark" | "radical" | "merko" | "gruvbox" | "tokyonight" | "onedark" | "cobalt" | "synthwave"
  primaryColor?: string
  trophyTypes?: TrophyType[]
}

export function GitHubStatsCard({ username, theme = "default" }: GitHubStatsProps) {
  if (!username) return null

  return (
    <Container className="overflow-hidden">
      <Image
        src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme}&hide_border=true`}
        alt={`${username}'s GitHub stats`}
        width={450}
        height={170}
        className="w-full h-auto"
      />
    </Container>
  )
}

export function GitHubLanguagesCard({ username, theme = "default" }: GitHubStatsProps) {
  if (!username) return null

  return (
    <Container className="overflow-hidden">
      <Image
        src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${theme}&hide_border=true`}
        alt={`${username}'s most used languages`}
        width={450}
        height={170}
        className="w-full h-auto"
      />
    </Container>
  )
}

export function GitHubStreakCard({ username, theme = "default" }: GitHubStatsProps) {
  if (!username) return null

  return (
    <Container className="overflow-hidden">
      <Image
        src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme}&hide_border=true`}
        alt={`${username}'s GitHub streak`}
        width={450}
        height={170}
        className="w-full h-auto"
      />
    </Container>
  )
}

export function GitHubContributionGraph({ username, theme = "github" }: { username: string; theme?: string }) {
  if (!username) return null

  // Map color theme names to contribution chart themes
  const themeMapping = {
    default: "github",
    ocean: "github-dark",
    forest: "github-light",
    sunset: "halloween",
    berry: "pink",
    midnight: "dracula",
    monochrome: "github-dark",
  }

  // Use the mapped theme or default to "github"
  const chartTheme = themeMapping[theme.toLowerCase()] || "github"

  return (
    <Container className="overflow-hidden">
      <Image
        src={`https://ghchart.rshah.org/${username}`}
        alt={`${username}'s GitHub contribution graph`}
        width={720}
        height={300}
        className="w-full h-auto"
      />
    </Container>
  )
}

type TrophyType =
  | "Stars"
  | "Followers"
  | "Commits"
  | "PullRequest"
  | "Issues"
  | "Repositories"
  | "MultiLanguage"
  | "LongTimeUser"
  | "AncientUser"
  | "Organizations"
  | "JoinedGitHub"

interface GitHubTrophiesProps extends GitHubStatsProps {
  trophyTypes?: TrophyType[]
}

export function GitHubTrophies({
  username,
  theme = "default",
  trophyTypes = ["Stars", "Commits", "PullRequest", "Repositories", "MultiLanguage"],
}: GitHubTrophiesProps) {
  if (!username) return null

  // Join trophy types with commas for the API
  const titles = trophyTypes.join(",")

  return (
    <Container className="overflow-hidden">
      <Image
        src={`https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme}&no-frame=true&column=4&margin-w=15&margin-h=15&title=${titles}`}
        alt={`${username}'s GitHub trophies`}
        width={800}
        height={200}
        className="w-full h-auto"
        unoptimized={true}
      />
    </Container>
  )
}

export function GitHubMetricsSection({
  username,
  showStats = true,
  showLanguages = true,
  showStreak = true,
  showContributions = true,
  showTrophies = true,
  theme = "default",
  primaryColor,
  trophyTypes = ["Stars", "Commits", "PullRequest", "Repositories", "MultiLanguage"],
}: GitHubStatsProps) {
  if (!username) return null

  return (
    <Section>
      <SectionHeading level={2} color={primaryColor}>
        GitHub Metrics
      </SectionHeading>
      <div className="space-y-4">
        {showStats && <GitHubStatsCard username={username} theme={theme} />}
        {showLanguages && <GitHubLanguagesCard username={username} theme={theme} />}
        {showStreak && <GitHubStreakCard username={username} theme={theme} />}
        {showContributions && <GitHubContributionGraph username={username} theme={theme} />}
        {showTrophies && <GitHubTrophies username={username} theme={theme} trophyTypes={trophyTypes} />}
      </div>
    </Section>
  )
}
