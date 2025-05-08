import type { Metadata } from "next";
import Link from "next/link";

import { APP_ROUTES, EXTERNAL_LINKS } from "@/constants/app-link";

export const metadata: Metadata = {
  title: "Profile README Guide - GitHub Profile README Builder",
  description:
    "Learn about GitHub Profile READMEs and how to create an effective one that showcases your skills and projects",
};

export default function ProfileReadmePage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile README Guide</h1>

      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            What is a GitHub Profile README?
          </h2>
          <p className="mb-4">
            A GitHub Profile README is a special feature that allows you to
            showcase information about yourself directly on your GitHub profile
            page. It appears prominently at the top of your profile, giving
            visitors an immediate impression of who you are and what you do.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-medium mb-2">How It Works</h3>
            <p className="mb-4">
              GitHub has a special repository naming convention that enables
              this feature. When you create a repository with the same name as
              your GitHub username, the README.md file in that repository will
              be displayed at the top of your GitHub profile page.
            </p>
            <p className="mb-4">
              For example, if your GitHub username is "devjane", creating a
              repository named "devjane" with a README.md file will display that
              README on your profile.
            </p>
            <p>
              This feature was introduced by GitHub in July 2020 and has quickly
              become a popular way for developers to personalize their profiles.
              You can read more about it in the{" "}
              <a
                href={EXTERNAL_LINKS.GITHUB_BLOG}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                official announcement
              </a>
              .
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Why Create a Profile README?
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <p className="mb-4">
              A well-crafted profile README offers numerous benefits:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Makes your GitHub profile more engaging and informative</li>
              <li>
                Showcases your skills, projects, and contributions in a
                customized way
              </li>
              <li>
                Helps you stand out to potential employers or collaborators
              </li>
              <li>Provides context about your work and interests</li>
              <li>Demonstrates your ability to present information clearly</li>
              <li>
                Shows your personality beyond just your code contributions
              </li>
            </ul>
            <p className="mt-4">
              According to GitHub, profiles with READMEs tend to receive more
              engagement and visibility in the community.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Elements of an Effective Profile README
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">1. Introduction</h3>
              <p className="mb-2">
                Start with a brief introduction about yourself. This could
                include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Your name and/or preferred title (e.g., "Full Stack
                  Developer")
                </li>
                <li>
                  Current role or status (e.g., "Computer Science Student at XYZ
                  University")
                </li>
                <li>A brief statement about your interests or specialties</li>
                <li>A friendly greeting or personal touch</li>
                <li>A concise mission statement or career objective</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Pro tip: Keep your introduction concise but informative. Aim for
                2-3 sentences that capture who you are professionally.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">
                2. Skills & Technologies
              </h3>
              <p className="mb-2">
                Showcase your technical skills and the technologies you work
                with. This can be presented as:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Lists of programming languages</li>
                <li>Frameworks and tools you're proficient in</li>
                <li>Categories like "Frontend," "Backend," "DevOps," etc.</li>
                <li>
                  Badges from{" "}
                  <a
                    href={EXTERNAL_LINKS.SHIELDS_IO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    shields.io
                  </a>{" "}
                  or{" "}
                  <a
                    href={EXTERNAL_LINKS.SIMPLEICONS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    simpleicons.org
                  </a>
                </li>
                <li>
                  Icons from{" "}
                  <a
                    href={EXTERNAL_LINKS.DEV_ICONS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    devicon.dev
                  </a>
                </li>
              </ul>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Pro tip: Group related skills together and consider using visual
                elements like badges to make this section more engaging.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">3. Projects</h3>
              <p className="mb-2">
                Highlight your best or most recent projects. For each project,
                consider including:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Project name with a link to the repository</li>
                <li>Brief description of what the project does</li>
                <li>Technologies used</li>
                <li>Your role in the project (if it was collaborative)</li>
                <li>A link to a live demo if available</li>
                <li>
                  A screenshot or GIF demonstrating the project (optional)
                </li>
              </ul>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Pro tip: Quality over quantity. Showcase 3-5 of your best
                projects rather than listing everything you've ever worked on.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">4. GitHub Statistics</h3>
              <p className="mb-2">
                Add GitHub stats to showcase your activity:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  GitHub stats card from{" "}
                  <a
                    href={EXTERNAL_LINKS.GITHUB.GITHUB_STATS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    github-readme-stats
                  </a>
                </li>
                <li>Top languages used in your repositories</li>
                <li>
                  Contribution streak from{" "}
                  <a
                    href={EXTERNAL_LINKS.GITHUB.STREAK_STATS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    github-readme-streak-stats
                  </a>
                </li>
                <li>
                  GitHub trophies from{" "}
                  <a
                    href={EXTERNAL_LINKS.GITHUB.PROFILE_TROPHY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    github-profile-trophy
                  </a>
                </li>
              </ul>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Pro tip: These dynamic elements update automatically, keeping
                your profile fresh without any manual updates.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">
                5. Contact Information & Social Links
              </h3>
              <p className="mb-2">
                Make it easy for people to connect with you:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Social media profiles (LinkedIn, Twitter, etc.)</li>
                <li>Professional website or portfolio</li>
                <li>Email address (consider using a badge or icon)</li>
                <li>Blog or Medium profile</li>
                <li>Discord username or community server</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Pro tip: Use badges or icons for social links to make them
                visually appealing. You can find social badges at{" "}
                <a
                  href={EXTERNAL_LINKS.GITHUB.MARKDOWN_BADGES}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  markdown-badges
                </a>
                .
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">
                6. Additional Elements (Optional)
              </h3>
              <p className="mb-2">
                Depending on your preferences, you might also include:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Current learning goals or "Currently learning..."</li>
                <li>"Looking to collaborate on..." statement</li>
                <li>Fun facts about yourself</li>
                <li>Quotes or personal mottos</li>
                <li>Recent blog posts (can be automated)</li>
                <li>Visitor counter</li>
                <li>Certifications or achievements</li>
                <li>Support or donation links</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Pro tip: These personal touches can make your profile more
                memorable and give visitors insight into your personality.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Do</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Keep it concise and scannable</li>
                <li>Use headings and sections to organize content</li>
                <li>Include visual elements like badges and icons</li>
                <li>Showcase your personality</li>
                <li>Highlight your best work</li>
                <li>Include a clear structure</li>
                <li>Update it regularly</li>
                <li>Check how it looks on both light and dark themes</li>
                <li>Use proper markdown formatting</li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Don't</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Overload with too much information</li>
                <li>Include sensitive personal details</li>
                <li>Copy someone else's README without attribution</li>
                <li>Let it become outdated</li>
                <li>Make it too complex to maintain</li>
                <li>Use too many animated GIFs (can be distracting)</li>
                <li>Include content that might be controversial</li>
                <li>Forget to test all links</li>
                <li>Ignore spelling and grammar</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Examples & Inspiration
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <p className="mb-4">
              Looking at other developers' profile READMEs can provide
              inspiration for your own. Here are some resources to explore:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <a
                  href={EXTERNAL_LINKS.GITHUB.AWESOME_PROFILES}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Awesome GitHub Profile READMEs
                </a>{" "}
                - A curated list of awesome GitHub Profile READMEs with hundreds
                of examples
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.GITHUB.GITHUB_TOPICS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  GitHub Topics: Profile README
                </a>{" "}
                - Browse repositories tagged with "profile-readme" for more
                examples
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.GPRM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  GPRM (GitHub Profile README Maker)
                </a>{" "}
                - Another tool for inspiration
              </li>
            </ul>
            <p className="mt-4">
              Remember to add your own unique touch rather than directly copying
              these examples. Your README should reflect your personal brand and
              style.
            </p>
          </div>
        </section>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to Create Your Profile README?
          </h2>
          <p className="mb-4">
            Use our tool to generate a professional GitHub profile README in
            minutes! Our builder makes it easy to create a README that showcases
            your skills and projects without having to write any markdown code.
          </p>
          <div className="flex space-x-4">
            <Link
              href={APP_ROUTES.HOME}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Create Your README
            </Link>
            <Link
              href={APP_ROUTES.HELP.STEP_BY_STEP}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-lg transition-colors duration-200"
            >
              View Step-by-Step Guide
            </Link>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Link
            href={APP_ROUTES.HELP.ROOT}
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Help Home
          </Link>
          <Link
            href={APP_ROUTES.HELP.STEP_BY_STEP}
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          >
            Step-by-Step Guide
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
