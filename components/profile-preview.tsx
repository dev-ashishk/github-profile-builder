"use client";
import { MapPin, Building, Globe } from "lucide-react";

import { Avatar } from "@/components/ui/atomic/avatar";
import { Container } from "@/components/ui/atomic/container";
import { ProgressBar } from "@/components/ui/atomic/progress-bar";
import { Section, SectionHeading } from "@/components/ui/atomic/section";
import {
  SkillBadge,
  SkillsContainer,
} from "@/components/ui/atomic/skill-badge";
import {
  SocialLink,
  SocialLinksContainer,
} from "@/components/ui/atomic/social-link";
import { StatCard, StatsGrid } from "@/components/ui/atomic/stat-card";
import {
  GitHubTrophies,
  GitHubContributionGraph,
} from "@/components/ui/atomic/github-stats";
import { RepositoriesGrid } from "@/components/ui/atomic/repository-card";
import { ProjectShowcase } from "@/components/ui/atomic/project-showcase";
import { BlogPreview } from "@/components/ui/atomic/blog-preview";
import { Timeline } from "@/components/ui/atomic/timeline";
import { EducationSection } from "@/components/ui/atomic/education-section";
import { ContactSection } from "@/components/ui/atomic/contact-section";

export function ProfilePreview({ profileData, template }) {
  if (template === "modern") {
    return <ModernTemplate data={profileData} />;
  } else if (template === "minimal") {
    return <MinimalTemplate data={profileData} />;
  } else if (template === "creative") {
    return <CreativeTemplate data={profileData} />;
  } else if (template === "developer") {
    return <DeveloperTemplate data={profileData} />;
  } else if (template === "professional") {
    return <ProfessionalTemplate data={profileData} />;
  } else if (template === "elegant") {
    return <ElegantTemplate data={profileData} />;
  }

  return <ModernTemplate data={profileData} />;
}

function ModernTemplate({ data }) {
  const { colors } = data;

  return (
    <div className="markdown-preview font-sans">
      <Section>
        <SectionHeading level={1}>Hi there, I'm {data.name} 👋</SectionHeading>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          {data.title}
        </h2>

        <div className="flex items-center mb-4">
          <div className="mr-4">
            <Avatar
              src={data.avatarUrl}
              alt={data.name}
              size={100}
              border
              borderColor="gray"
            />
          </div>
          <p className="flex-1">{data.about}</p>
        </div>

        <div className="flex flex-wrap gap-y-2 mb-4">
          {data.location && (
            <div className="flex items-center mr-6">
              <MapPin size={16} className="mr-1 text-gray-500" />
              <span>Based in {data.location}</span>
            </div>
          )}
          {data.company && (
            <div className="flex items-center mr-6">
              <Building size={16} className="mr-1 text-gray-500" />
              <span>Currently working at {data.company}</span>
            </div>
          )}
          {data.website && (
            <div className="flex items-center">
              <Globe size={16} className="mr-1 text-gray-500" />
              <span>
                Check out my website{" "}
                <a
                  href={data.website}
                  className="text-blue-500 hover:underline"
                >
                  {data.website.replace(/^https?:\/\//, "")}
                </a>
              </span>
            </div>
          )}
        </div>
      </Section>

      <Section>
        <SectionHeading level={3}>Connect with me:</SectionHeading>
        <SocialLinksContainer>
          {data.github && (
            <SocialLink platform="github" username={data.github} />
          )}
          {data.twitter && (
            <SocialLink
              platform="twitter"
              username={data.twitter}
              color={colors.primary}
            />
          )}
          {data.linkedin && (
            <SocialLink
              platform="linkedin"
              username={data.linkedin}
              color={colors.secondary}
            />
          )}
          {data.website && (
            <SocialLink
              platform="website"
              url={data.website}
              color={colors.accent}
            />
          )}
        </SocialLinksContainer>
      </Section>

      <Section>
        <SectionHeading level={3}>Languages and Tools:</SectionHeading>
        <SkillsContainer>
          {data.skills.map((skill, index) => (
            <SkillBadge
              key={index}
              skill={skill}
              backgroundColor={`${colors.accent}20`}
              color={colors.accent}
            />
          ))}
        </SkillsContainer>
      </Section>

      {data.stats && (
        <Section>
          <SectionHeading level={3}>GitHub Stats:</SectionHeading>
          <Container>
            {data.githubDataFetched ? (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span>Public Repos:</span>
                  <span className="font-bold">{data.publicRepos || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Followers:</span>
                  <span className="font-bold">{data.followers || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Following:</span>
                  <span className="font-bold">{data.following || 0}</span>
                </div>
                {data.totalStars !== undefined && (
                  <div className="flex justify-between">
                    <span>Total Stars:</span>
                    <span className="font-bold">{data.totalStars}</span>
                  </div>
                )}
                {data.totalForks !== undefined && (
                  <div className="flex justify-between">
                    <span>Total Forks:</span>
                    <span className="font-bold">{data.totalForks}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                {data.github
                  ? "Click 'Fetch Data' to load GitHub stats"
                  : "Enter GitHub username to see stats"}
              </div>
            )}
          </Container>
        </Section>
      )}

      {data.topLangs && (
        <Section>
          <SectionHeading level={3}>Top Languages:</SectionHeading>
          <Container>
            {data.githubDataFetched && data.languages ? (
              <div className="space-y-2">
                {Object.entries(data.languages)
                  .slice(0, 5)
                  .map(([lang, percentage]) => (
                    <ProgressBar
                      key={lang}
                      label={lang}
                      valueLabel={`${percentage}%`}
                      value={percentage as number}
                      color={colors.primary}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                {data.github
                  ? "Click 'Fetch Data' to load language stats"
                  : "Enter GitHub username to see languages"}
              </div>
            )}
          </Container>
        </Section>
      )}

      {data.streak && (
        <Section>
          <SectionHeading level={3}>GitHub Streak:</SectionHeading>
          <Container>
            {data.githubDataFetched && data.currentStreak !== undefined ? (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span>Current Streak:</span>
                  <span className="font-bold">{data.currentStreak} days</span>
                </div>
                <div className="flex justify-between">
                  <span>Longest Streak:</span>
                  <span className="font-bold">
                    {data.longestStreak || 0} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Contributions:</span>
                  <span className="font-bold">
                    {data.totalContributions || 0} days
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                {data.github
                  ? "Click 'Fetch Data' to load streak stats"
                  : "Enter GitHub username to see streak"}
              </div>
            )}
          </Container>
        </Section>
      )}

      {data.visitors && (
        <div className="text-sm text-gray-500 mt-4">
          Profile views: {data.profileViews || "1,234"}
        </div>
      )}
      {data.showRepos && data.repositories && data.repositories.length > 0 && (
        <Section>
          <SectionHeading level={3}>Featured Repositories:</SectionHeading>
          <RepositoriesGrid
            repositories={data.repositories}
            title=""
            primaryColor={data.colors.primary}
          />
        </Section>
      )}

      {data.showContribGraph && (
        <Section>
          <SectionHeading level={3}>Contribution Graph:</SectionHeading>
          <GitHubContributionGraph
            username={data.github}
            theme={
              data.colors.primary === "#3b82f6"
                ? "github"
                : data.colors.primary === "#0ea5e9"
                ? "github-dark"
                : data.colors.primary === "#16a34a"
                ? "github-light"
                : data.colors.primary === "#f97316"
                ? "halloween"
                : data.colors.primary === "#d946ef"
                ? "pink"
                : data.colors.primary === "#6366f1"
                ? "dracula"
                : data.colors.primary === "#525252"
                ? "github-dark"
                : "github"
            }
          />
        </Section>
      )}

      {data.showTrophies && (
        <Section>
          <SectionHeading level={3}>GitHub Achievements:</SectionHeading>
          <GitHubTrophies username={data.github} theme="flat" />
        </Section>
      )}

      {data.showProjects && data.projects && data.projects.length > 0 && (
        <ProjectShowcase
          projects={data.projects}
          primaryColor={data.colors.primary}
          secondaryColor={data.colors.secondary}
        />
      )}

      {data.showBlog && data.blogPosts && data.blogPosts.length > 0 && (
        <BlogPreview
          posts={data.blogPosts}
          primaryColor={data.colors.primary}
        />
      )}

      {data.showTimeline && data.timeline && data.timeline.length > 0 && (
        <Timeline
          items={data.timeline}
          primaryColor={data.colors.primary}
          secondaryColor={data.colors.secondary}
        />
      )}

      {data.showEducation && data.education && data.education.length > 0 && (
        <EducationSection
          educationList={data.education}
          primaryColor={data.colors.primary}
          secondaryColor={data.colors.secondary}
        />
      )}

      {data.showContact && data.contactInfo && (
        <ContactSection
          contactInfo={data.contactInfo}
          showForm={false}
          primaryColor={data.colors.primary}
          secondaryColor={data.colors.secondary}
        />
      )}
    </div>
  );
}

function MinimalTemplate({ data }) {
  const { colors } = data;

  return (
    <div className="markdown-preview font-mono">
      <Section>
        <div className="flex items-start gap-4 mb-4">
          <Avatar src={data.avatarUrl} alt={data.name} size={80} rounded="md" />
          <div>
            <h1 className="text-2xl font-bold mb-1">{data.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              &gt; {data.title}
            </p>
          </div>
        </div>

        <p className="mb-6">{data.about}</p>
      </Section>

      {(data.location || data.company) && (
        <Section>
          <SectionHeading level={2}>About</SectionHeading>
          <ul className="list-disc list-inside mb-4 space-y-1">
            {data.location && (
              <li className="text-gray-700 dark:text-gray-300">
                📍 {data.location}
              </li>
            )}
            {data.company && (
              <li className="text-gray-700 dark:text-gray-300">
                💼 {data.company}
              </li>
            )}
            {data.website && (
              <li className="text-gray-700 dark:text-gray-300">
                🔗{" "}
                <a
                  href={data.website}
                  style={{ color: colors.primary }}
                  className="hover:underline"
                >
                  {data.website.replace(/^https?:\/\//, "")}
                </a>
              </li>
            )}
          </ul>
        </Section>
      )}

      {(data.github || data.twitter || data.linkedin) && (
        <Section>
          <SectionHeading level={2}>Links</SectionHeading>
          <ul className="list-disc list-inside mb-4 space-y-1">
            {data.github && (
              <li>
                <a
                  href={`https://github.com/${data.github}`}
                  style={{ color: colors.primary }}
                  className="hover:underline"
                >
                  GitHub
                </a>
              </li>
            )}
            {data.twitter && (
              <li>
                <a
                  href={`https://twitter.com/${data.twitter}`}
                  style={{ color: colors.secondary }}
                  className="hover:underline"
                >
                  Twitter
                </a>
              </li>
            )}
            {data.linkedin && (
              <li>
                <a
                  href={`https://linkedin.com/in/${data.linkedin}`}
                  style={{ color: colors.accent }}
                  className="hover:underline"
                >
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </Section>
      )}

      {data.skills.length > 0 && (
        <Section>
          <SectionHeading level={2}>Skills</SectionHeading>
          <Container padding="sm">
            <div className="font-mono">{data.skills.join(" • ")}</div>
          </Container>
        </Section>
      )}

      {data.stats && data.githubDataFetched && (
        <Section>
          <SectionHeading level={2}>Stats</SectionHeading>
          <Container>
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {`repos: ${data.publicRepos || 0}
followers: ${data.followers || 0}
following: ${data.following || 0}
stars: ${data.totalStars || 0}
contributions: ${data.totalContributions || 0}`}
            </pre>
          </Container>
        </Section>
      )}

      {data.topLangs && data.githubDataFetched && data.languages && (
        <Section>
          <SectionHeading level={2}>Languages</SectionHeading>
          <Container>
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {Object.entries(data.languages)
                .slice(0, 5)
                .map(
                  ([lang, percentage]) =>
                    `${lang}: ${"█".repeat(
                      Math.floor((percentage as number) / 5)
                    )} ${percentage}%`
                )
                .join("\n")}
            </pre>
          </Container>
        </Section>
      )}
      {data.showRepos && data.repositories && data.repositories.length > 0 && (
        <Section>
          <SectionHeading level={3}>Featured Repositories:</SectionHeading>
          <RepositoriesGrid
            repositories={data.repositories}
            title="Featured Repositories"
            primaryColor={data.colors.primary}
            gridColumns={data.repoSettings?.gridColumns || 2}
            cardStyle={data.repoSettings?.cardStyle || "default"}
            showDescription={data.repoSettings?.showDescription !== false}
            showLanguage={data.repoSettings?.showLanguage !== false}
            showStats={data.repoSettings?.showStats !== false}
          />
        </Section>
      )}

      {data.showContribGraph && (
        <Section>
          <SectionHeading level={3}>Contribution Graph:</SectionHeading>
          <GitHubContributionGraph
            username={data.github}
            theme={
              data.colors.primary === "#3b82f6"
                ? "github"
                : data.colors.primary === "#0ea5e9"
                ? "github-dark"
                : data.colors.primary === "#16a34a"
                ? "github-light"
                : data.colors.primary === "#f97316"
                ? "halloween"
                : data.colors.primary === "#d946ef"
                ? "pink"
                : data.colors.primary === "#6366f1"
                ? "dracula"
                : data.colors.primary === "#525252"
                ? "github-dark"
                : "github"
            }
          />
        </Section>
      )}

      {data.showTrophies && (
        <Section>
          <SectionHeading level={3}>GitHub Achievements:</SectionHeading>
          <GitHubTrophies username={data.github} theme="flat" />
        </Section>
      )}
    </div>
  );
}

function CreativeTemplate({ data }) {
  const { colors } = data;

  return (
    <div className="markdown-preview text-center">
      <div
        className="h-16 rounded-t-lg mb-8 relative"
        style={{
          background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
        }}
      >
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 rounded-full p-1">
          <Avatar src={data.avatarUrl} alt={data.name} size={64} />
        </div>
      </div>

      <Section className="mt-10">
        <SectionHeading level={1}>{data.name}</SectionHeading>
        <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
          👨‍💻 {data.title}
        </h2>
        <p className="mb-6 max-w-2xl mx-auto">{data.about}</p>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {data.location && (
            <SkillBadge skill={`🌏 ${data.location}`} variant="outline" />
          )}
          {data.company && (
            <SkillBadge skill={`🏢 ${data.company}`} variant="outline" />
          )}
          {data.website && (
            <SkillBadge
              skill={
                <>
                  🌐{" "}
                  <a href={data.website} className="hover:underline">
                    {data.website.replace(/^https?:\/\//, "")}
                  </a>
                </>
              }
              variant="outline"
            />
          )}
        </div>
      </Section>

      <Section>
        <SectionHeading level={3}>🔗 Connect with me</SectionHeading>
        <SocialLinksContainer centered>
          {data.github && (
            <SocialLink platform="github" username={data.github} />
          )}
          {data.twitter && (
            <SocialLink
              platform="twitter"
              username={data.twitter}
              color={colors.primary}
            />
          )}
          {data.linkedin && (
            <SocialLink
              platform="linkedin"
              username={data.linkedin}
              color={colors.secondary}
            />
          )}
        </SocialLinksContainer>
      </Section>

      <Section>
        <SectionHeading level={3}>💻 Tech Stack</SectionHeading>
        <SkillsContainer centered>
          {data.skills.map((skill, index) => (
            <SkillBadge
              key={index}
              skill={skill}
              variant="outline"
              borderColor={colors.accent}
              color={colors.accent}
            />
          ))}
        </SkillsContainer>
      </Section>

      {data.stats && (
        <Section>
          <SectionHeading level={3}>📊 GitHub Stats</SectionHeading>
          {data.githubDataFetched ? (
            <Container className="max-w-md mx-auto">
              <StatsGrid columns={2}>
                <StatCard value={data.publicRepos || 0} label="Repositories" />
                <StatCard value={data.followers || 0} label="Followers" />
                <StatCard value={data.totalStars || 0} label="Stars" />
                <StatCard
                  value={data.totalContributions || 0}
                  label="Contributions"
                />
              </StatsGrid>
            </Container>
          ) : (
            <Container className="max-w-md mx-auto">
              <div className="text-center text-gray-500">
                {data.github
                  ? "Click 'Fetch Data' to load GitHub stats"
                  : "Enter GitHub username to see stats"}
              </div>
            </Container>
          )}
        </Section>
      )}

      {data.topLangs && data.githubDataFetched && data.languages && (
        <Section>
          <SectionHeading level={3}>🔝 Top Languages</SectionHeading>
          <Container className="max-w-md mx-auto">
            <div className="space-y-3">
              {Object.entries(data.languages)
                .slice(0, 5)
                .map(([lang, percentage]) => (
                  <ProgressBar
                    key={lang}
                    label={lang}
                    valueLabel={`${percentage}%`}
                    value={percentage as number}
                    color={`linear-gradient(to right, ${colors.primary}, ${colors.secondary})`}
                  />
                ))}
            </div>
          </Container>
        </Section>
      )}

      {data.streak && data.githubDataFetched && (
        <Section>
          <SectionHeading level={3}>🔥 GitHub Streak</SectionHeading>
          <Container className="max-w-md mx-auto">
            <StatsGrid columns={3}>
              <StatCard
                value={data.currentStreak || 0}
                label="Current Streak"
              />
              <StatCard
                value={data.longestStreak || 0}
                label="Longest Streak"
              />
              <StatCard
                value={data.totalContributions || 0}
                label="Contributions"
              />
            </StatsGrid>
          </Container>
        </Section>
      )}

      {data.visitors && (
        <Section>
          <SectionHeading level={3}>👀 Visitor count</SectionHeading>
          <Container className="inline-block">
            <div className="text-center">{data.profileViews || "1,234"}</div>
          </Container>
        </Section>
      )}

      <div
        className="h-4 rounded-b-lg mt-6"
        style={{
          background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
        }}
      ></div>
      {data.showRepos && data.repositories && data.repositories.length > 0 && (
        <Section>
          <SectionHeading level={3}>Featured Repositories:</SectionHeading>
          <RepositoriesGrid
            repositories={data.repositories}
            title="Featured Repositories"
            primaryColor={data.colors.primary}
            gridColumns={data.repoSettings?.gridColumns || 2}
            cardStyle={data.repoSettings?.cardStyle || "default"}
            showDescription={data.repoSettings?.showDescription !== false}
            showLanguage={data.repoSettings?.showLanguage !== false}
            showStats={data.repoSettings?.showStats !== false}
          />
        </Section>
      )}

      {data.showContribGraph && (
        <Section>
          <SectionHeading level={3}>Contribution Graph:</SectionHeading>
          <GitHubContributionGraph
            username={data.github}
            theme={
              data.colors.primary === "#3b82f6"
                ? "github"
                : data.colors.primary === "#0ea5e9"
                ? "github-dark"
                : data.colors.primary === "#16a34a"
                ? "github-light"
                : data.colors.primary === "#f97316"
                ? "halloween"
                : data.colors.primary === "#d946ef"
                ? "pink"
                : data.colors.primary === "#6366f1"
                ? "dracula"
                : data.colors.primary === "#525252"
                ? "github-dark"
                : "github"
            }
          />
        </Section>
      )}

      {data.showTrophies && (
        <Section>
          <SectionHeading level={3}>GitHub Achievements:</SectionHeading>
          <GitHubTrophies username={data.github} theme="flat" />
        </Section>
      )}
    </div>
  );
}

function DeveloperTemplate({ data }) {
  const { colors } = data;

  return (
    <div className="markdown-preview font-mono">
      <Section>
        <h1 className="text-center text-2xl font-bold mb-2 flex items-center justify-center">
          <code>{data.name}</code>
          <span className="ml-2">👋</span>
        </h1>

        <p className="text-center mb-4">
          <code>{data.title}</code>
        </p>
      </Section>

      <Section>
        <Container>
          <pre className="whitespace-pre-wrap text-xs">
            {`interface Developer {
  name: string;
  title: string;
  location: string;
  company?: string;
  website?: string;
  skills: string[];
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}

const ${data.name.replace(/\s+/g, "")}: Developer = {
  name: "${data.name}",
  title: "${data.title}",
  location: "${data.location}",
  ${data.company ? `company: "${data.company}",` : ""}
  ${data.website ? `website: "${data.website}",` : ""}
  skills: [${data.skills.map((skill) => `"${skill}"`).join(", ")}],
  socials: {
    ${data.github ? `github: "${data.github}",` : ""}
    ${data.twitter ? `twitter: "${data.twitter}",` : ""}
    ${data.linkedin ? `linkedin: "${data.linkedin}"` : ""}
  }
};`}
          </pre>
        </Container>
      </Section>

      <Section>
        <p className="mb-6">{data.about}</p>
      </Section>

      <Section>
        <SectionHeading level={2} className="flex items-center">
          <span className="mr-2">💻</span> Tech Stack
        </SectionHeading>

        <SkillsContainer>
          {data.skills.map((skill, index) => (
            <code
              key={index}
              className="px-2 py-1 rounded text-sm"
              style={{
                backgroundColor: `${colors.primary}20`,
                color: colors.primary,
              }}
            >
              {skill}
            </code>
          ))}
        </SkillsContainer>
      </Section>

      {data.stats && data.githubDataFetched && (
        <Section>
          <SectionHeading level={2} className="flex items-center">
            <span className="mr-2">📊</span> GitHub Stats
          </SectionHeading>
          <Container>
            <StatsGrid columns={2}>
              <StatCard value={data.publicRepos || 0} label="Repositories" />
              <StatCard value={data.followers || 0} label="Followers" />
              <StatCard value={data.totalStars || 0} label="Stars" />
              <StatCard
                value={data.totalContributions || 0}
                label="Contributions"
              />
            </StatsGrid>
          </Container>
        </Section>
      )}

      {data.topLangs && data.githubDataFetched && data.languages && (
        <Section>
          <SectionHeading level={2} className="flex items-center">
            <span className="mr-2">🔝</span> Top Languages
          </SectionHeading>
          <Container>
            <pre className="whitespace-pre-wrap font-mono text-sm">
              {Object.entries(data.languages)
                .slice(0, 5)
                .map(
                  ([lang, percentage]) =>
                    `${lang}: ${"█".repeat(
                      Math.floor((percentage as number) / 5)
                    )} ${percentage}%`
                )
                .join("\n")}
            </pre>
          </Container>
        </Section>
      )}

      <Section>
        <SectionHeading level={2} className="flex items-center">
          <span className="mr-2">🔗</span> Connect
        </SectionHeading>

        <SocialLinksContainer>
          {data.github && (
            <SocialLink platform="github" username={data.github} />
          )}
          {data.twitter && (
            <SocialLink
              platform="twitter"
              username={data.twitter}
              color={colors.primary}
            />
          )}
          {data.linkedin && (
            <SocialLink
              platform="linkedin"
              username={data.linkedin}
              color={colors.secondary}
            />
          )}
          {data.website && (
            <SocialLink
              platform="website"
              url={data.website}
              color={colors.accent}
            />
          )}
        </SocialLinksContainer>
      </Section>

      {data.visitors && (
        <div className="text-center text-sm text-gray-500 mt-6">
          <code>visitors: {data.profileViews || "1,234"}</code>
        </div>
      )}
      {data.showRepos && data.repositories && data.repositories.length > 0 && (
        <Section>
          <SectionHeading level={3}>Featured Repositories:</SectionHeading>
          <RepositoriesGrid
            repositories={data.repositories}
            title="Featured Repositories"
            primaryColor={data.colors.primary}
            gridColumns={data.repoSettings?.gridColumns || 2}
            cardStyle={data.repoSettings?.cardStyle || "default"}
            showDescription={data.repoSettings?.showDescription !== false}
            showLanguage={data.repoSettings?.showLanguage !== false}
            showStats={data.repoSettings?.showStats !== false}
          />
        </Section>
      )}

      {data.showContribGraph && (
        <Section>
          <SectionHeading level={3}>Contribution Graph:</SectionHeading>
          <GitHubContributionGraph
            username={data.github}
            theme={
              data.colors.primary === "#3b82f6"
                ? "github"
                : data.colors.primary === "#0ea5e9"
                ? "github-dark"
                : data.colors.primary === "#16a34a"
                ? "github-light"
                : data.colors.primary === "#f97316"
                ? "halloween"
                : data.colors.primary === "#d946ef"
                ? "pink"
                : data.colors.primary === "#6366f1"
                ? "dracula"
                : data.colors.primary === "#525252"
                ? "github-dark"
                : "github"
            }
          />
        </Section>
      )}

      {data.showTrophies && (
        <Section>
          <SectionHeading level={3}>GitHub Achievements:</SectionHeading>
          <GitHubTrophies username={data.github} theme="flat" />
        </Section>
      )}
    </div>
  );
}

function ProfessionalTemplate({ data }) {
  const { colors } = data;

  return (
    <div className="markdown-preview font-sans">
      <Section className="text-center">
        <SectionHeading level={1} color={colors.primary}>
          {data.name}
        </SectionHeading>
        <p className="text-lg text-gray-600 dark:text-gray-400">{data.title}</p>
      </Section>

      <Section className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Avatar
            src={data.avatarUrl}
            alt={data.name}
            size={200}
            rounded="lg"
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-2/3">
          <SectionHeading level={2} color={colors.primary}>
            About Me
          </SectionHeading>
          <p className="mb-4">{data.about}</p>

          <ul className="space-y-1 mb-4">
            {data.location && (
              <li className="flex items-center">
                <MapPin size={16} className="mr-2 text-gray-500" />
                <span>
                  Based in <strong>{data.location}</strong>
                </span>
              </li>
            )}
            {data.company && (
              <li className="flex items-center">
                <Building size={16} className="mr-2 text-gray-500" />
                <span>
                  Working at <strong>{data.company}</strong>
                </span>
              </li>
            )}
            {data.website && (
              <li className="flex items-center">
                <Globe size={16} className="mr-2 text-gray-500" />
                <a
                  href={data.website}
                  style={{ color: colors.primary }}
                  className="hover:underline"
                >
                  {data.website.replace(/^https?:\/\//, "")}
                </a>
              </li>
            )}
          </ul>

          <SocialLinksContainer>
            {data.github && (
              <SocialLink platform="github" username={data.github} />
            )}
            {data.linkedin && (
              <SocialLink
                platform="linkedin"
                username={data.linkedin}
                color={colors.primary}
              />
            )}
            {data.twitter && (
              <SocialLink
                platform="twitter"
                username={data.twitter}
                color={colors.secondary}
              />
            )}
          </SocialLinksContainer>
        </div>
      </Section>

      <Section>
        <SectionHeading level={2} color={colors.primary}>
          Professional Skills
        </SectionHeading>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <SectionHeading level={3} color={colors.secondary}>
              Languages & Frameworks
            </SectionHeading>
            <SkillsContainer>
              {data.skills
                .slice(0, Math.ceil(data.skills.length / 2))
                .map((skill, index) => (
                  <SkillBadge
                    key={index}
                    skill={skill}
                    variant="outline"
                    borderColor={colors.primary}
                    color={colors.primary}
                  />
                ))}
            </SkillsContainer>
          </div>
          <div>
            <SectionHeading level={3} color={colors.secondary}>
              Tools & Platforms
            </SectionHeading>
            <SkillsContainer>
              {data.skills
                .slice(Math.ceil(data.skills.length / 2))
                .map((skill, index) => (
                  <SkillBadge
                    key={index}
                    skill={skill}
                    variant="outline"
                    borderColor={colors.secondary}
                    color={colors.secondary}
                  />
                ))}
            </SkillsContainer>
          </div>
        </div>
      </Section>

      {data.stats && data.githubDataFetched && (
        <Section>
          <SectionHeading level={2} color={colors.primary}>
            GitHub Statistics
          </SectionHeading>
          <StatsGrid>
            <StatCard value={data.publicRepos || 0} label="Repositories" />
            <StatCard value={data.followers || 0} label="Followers" />
            <StatCard value={data.totalStars || 0} label="Stars" />
            <StatCard
              value={data.totalContributions || 0}
              label="Contributions"
            />
          </StatsGrid>
        </Section>
      )}

      {data.topLangs && data.githubDataFetched && data.languages && (
        <Section>
          <SectionHeading level={2} color={colors.primary}>
            Top Languages
          </SectionHeading>
          <Container>
            <div className="space-y-3">
              {Object.entries(data.languages)
                .slice(0, 5)
                .map(([lang, percentage]) => (
                  <ProgressBar
                    key={lang}
                    label={lang}
                    valueLabel={`${percentage}%`}
                    value={percentage as number}
                    color={colors.secondary}
                  />
                ))}
            </div>
          </Container>
        </Section>
      )}

      {data.visitors && (
        <div className="text-center text-sm text-gray-500 mt-8">
          Profile views: {data.profileViews || "1,234"}
        </div>
      )}
      {data.showRepos && data.repositories && data.repositories.length > 0 && (
        <Section>
          <SectionHeading level={3}>Featured Repositories:</SectionHeading>
          <RepositoriesGrid
            repositories={data.repositories}
            title="Featured Repositories"
            primaryColor={data.colors.primary}
            gridColumns={data.repoSettings?.gridColumns || 2}
            cardStyle={data.repoSettings?.cardStyle || "default"}
            showDescription={data.repoSettings?.showDescription !== false}
            showLanguage={data.repoSettings?.showLanguage !== false}
            showStats={data.repoSettings?.showStats !== false}
          />
        </Section>
      )}

      {data.showContribGraph && (
        <Section>
          <SectionHeading level={3}>Contribution Graph:</SectionHeading>
          <GitHubContributionGraph
            username={data.github}
            theme={
              data.colors.primary === "#3b82f6"
                ? "github"
                : data.colors.primary === "#0ea5e9"
                ? "github-dark"
                : data.colors.primary === "#16a34a"
                ? "github-light"
                : data.colors.primary === "#f97316"
                ? "halloween"
                : data.colors.primary === "#d946ef"
                ? "pink"
                : data.colors.primary === "#6366f1"
                ? "dracula"
                : data.colors.primary === "#525252"
                ? "github-dark"
                : "github"
            }
          />
        </Section>
      )}

      {data.showTrophies && (
        <Section>
          <SectionHeading level={3}>GitHub Achievements:</SectionHeading>
          <GitHubTrophies username={data.github} theme="flat" />
        </Section>
      )}
    </div>
  );
}

function ElegantTemplate({ data }) {
  const { colors } = data;

  return (
    <div className="markdown-preview font-serif">
      <Section className="text-center">
        <SectionHeading level={1} color={colors.primary}>
          ✨ {data.name} ✨
        </SectionHeading>
        <p className="text-lg italic text-gray-600 dark:text-gray-400">
          {data.title}
        </p>
      </Section>

      <blockquote
        className="border-l-4 pl-4 py-2 mb-6 italic"
        style={{ borderColor: colors.accent }}
      >
        {data.about}
      </blockquote>

      <Section className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Avatar
            src={data.avatarUrl}
            alt={data.name}
            size={200}
            rounded="lg"
            className="w-full h-auto"
          />
        </div>
        <div className="md:w-2/3">
          <SectionHeading
            level={2}
            className="border-b pb-2"
            style={{ borderColor: colors.secondary }}
            color={colors.primary}
          >
            About
          </SectionHeading>

          <ul className="space-y-2 mb-4">
            {data.location && (
              <li className="flex items-center">
                <MapPin size={16} className="mr-2 text-gray-500" />
                <span>
                  Based in <strong>{data.location}</strong>
                </span>
              </li>
            )}
            {data.company && (
              <li className="flex items-center">
                <Building size={16} className="mr-2 text-gray-500" />
                <span>
                  Working at <strong>{data.company}</strong>
                </span>
              </li>
            )}
            {data.website && (
              <li className="flex items-center">
                <Globe size={16} className="mr-2 text-gray-500" />
                <a
                  href={data.website}
                  style={{ color: colors.primary }}
                  className="hover:underline"
                >
                  {data.website.replace(/^https?:\/\//, "")}
                </a>
              </li>
            )}
            <li className="flex items-center">
              <span className="mr-2">💼</span>
              <span>Open for collaborations and projects</span>
            </li>
            <li className="flex items-center">
              <span className="mr-2">🌱</span>
              <span>Continuously learning and growing</span>
            </li>
          </ul>
        </div>
      </Section>

      <Section>
        <SectionHeading
          level={2}
          className="border-b pb-2"
          style={{ borderColor: colors.secondary }}
          color={colors.primary}
        >
          Expertise
        </SectionHeading>
        <Container className="text-center">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="inline-block mx-1"
              style={{ color: colors.secondary }}
            >
              {skill}
              {index < data.skills.length - 1 ? " • " : ""}
            </span>
          ))}
        </Container>
      </Section>

      <Section>
        <SectionHeading
          level={2}
          className="border-b pb-2"
          style={{ borderColor: colors.secondary }}
          color={colors.primary}
        >
          Connect
        </SectionHeading>
        <SocialLinksContainer centered>
          {data.github && (
            <SocialLink platform="github" username={data.github} />
          )}
          {data.linkedin && (
            <SocialLink
              platform="linkedin"
              username={data.linkedin}
              color={colors.primary}
            />
          )}
          {data.twitter && (
            <SocialLink
              platform="twitter"
              username={data.twitter}
              color={colors.secondary}
            />
          )}
        </SocialLinksContainer>
      </Section>

      {(data.stats || data.topLangs || data.streak) &&
        data.githubDataFetched && (
          <Section>
            <SectionHeading
              level={2}
              className="border-b pb-2"
              style={{ borderColor: colors.secondary }}
              color={colors.primary}
            >
              GitHub Metrics
            </SectionHeading>

            {data.stats && (
              <StatsGrid className="mb-4">
                <StatCard value={data.publicRepos || 0} label="Repositories" />
                <StatCard value={data.followers || 0} label="Followers" />
                <StatCard value={data.totalStars || 0} label="Stars" />
                <StatCard
                  value={data.totalContributions || 0}
                  label="Contributions"
                />
              </StatsGrid>
            )}

            {data.topLangs && data.languages && (
              <Container className="mb-4">
                <SectionHeading
                  level={3}
                  className="text-center"
                  color={colors.secondary}
                >
                  Top Languages
                </SectionHeading>
                <div className="space-y-3">
                  {Object.entries(data.languages)
                    .slice(0, 5)
                    .map(([lang, percentage]) => (
                      <ProgressBar
                        key={lang}
                        label={lang}
                        valueLabel={`${percentage}%`}
                        value={percentage as number}
                        color={colors.accent}
                      />
                    ))}
                </div>
              </Container>
            )}
          </Section>
        )}

      {data.visitors && (
        <div className="text-center text-sm text-gray-500 mt-8 mb-4">
          <span className="inline-block bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            {data.profileViews || "1,234"} visitors
          </span>
        </div>
      )}

      <div className="text-center text-sm mt-8">
        <p style={{ color: colors.primary }}>
          ✨ Thank you for visiting my profile ✨
        </p>
      </div>
      {data.showRepos && data.repositories && data.repositories.length > 0 && (
        <Section>
          <SectionHeading level={3}>Featured Repositories:</SectionHeading>
          <RepositoriesGrid
            repositories={data.repositories}
            title="Featured Repositories"
            primaryColor={data.colors.primary}
            gridColumns={data.repoSettings?.gridColumns || 2}
            cardStyle={data.repoSettings?.cardStyle || "default"}
            showDescription={data.repoSettings?.showDescription !== false}
            showLanguage={data.repoSettings?.showLanguage !== false}
            showStats={data.repoSettings?.showStats !== false}
          />
        </Section>
      )}

      {data.showContribGraph && (
        <Section>
          <SectionHeading level={3}>Contribution Graph:</SectionHeading>
          <GitHubContributionGraph
            username={data.github}
            theme={
              data.colors.primary === "#3b82f6"
                ? "github"
                : data.colors.primary === "#0ea5e9"
                ? "github-dark"
                : data.colors.primary === "#16a34a"
                ? "github-light"
                : data.colors.primary === "#f97316"
                ? "halloween"
                : data.colors.primary === "#d946ef"
                ? "pink"
                : data.colors.primary === "#6366f1"
                ? "dracula"
                : data.colors.primary === "#525252"
                ? "github-dark"
                : "github"
            }
          />
        </Section>
      )}

      {data.showTrophies && (
        <Section>
          <SectionHeading level={3}>GitHub Achievements:</SectionHeading>
          <GitHubTrophies username={data.github} theme="flat" />
        </Section>
      )}
    </div>
  );
}
