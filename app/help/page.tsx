import type { Metadata } from "next";
import Link from "next/link";

import { APP_ROUTES, EXTERNAL_LINKS } from "@/constants/app-link";

export const metadata: Metadata = {
  title: "Getting Started - GitHub Profile README Builder",
  description:
    "Learn how to get started with the GitHub Profile README Builder and create an impressive GitHub profile",
};

export default function GettingStartedPage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Getting Started</h1>

      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to GitHub Profile README Builder
          </h2>
          <p className="mb-4">
            This tool helps you create beautiful and informative GitHub profile
            READMEs without writing a single line of markdown. Follow this guide
            to get started with creating your own stunning GitHub profile.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-medium mb-2">
              What is a GitHub Profile README?
            </h3>
            <p className="mb-4">
              A GitHub Profile README is a special feature introduced by GitHub
              that allows you to showcase information about yourself directly on
              your GitHub profile page. It appears prominently at the top of
              your profile, giving visitors an immediate impression of who you
              are and what you do.
            </p>
            <p>
              As GitHub describes it in their{" "}
              <a
                href={EXTERNAL_LINKS.GITHUB_BLOG}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                official docs
              </a>
              , it's "a new feature that allows you to share information about
              yourself with the community on GitHub.com."
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Use This Tool</h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
            <ol className="list-decimal pl-6 space-y-4">
              <li className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="mb-2">
                  <Link
                    href={APP_ROUTES.HOME}
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    Fill out the form with your information
                  </Link>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete the profile form with your personal information,
                  skills, projects, and social links. The more information you
                  provide, the more comprehensive your README will be.
                </p>
              </li>

              <li className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="mb-2">
                  <Link
                    href={APP_ROUTES.HOME}
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    Preview your README in real-time
                  </Link>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  As you fill out the form, the preview section will update
                  automatically to show how your README will look on GitHub.
                  This allows you to make adjustments and see the results
                  immediately.
                </p>
              </li>

              <li className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="mb-2">
                  <Link
                    href={APP_ROUTES.HOME}
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    Copy the generated markdown
                  </Link>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Once you're satisfied with your README, click the "Copy
                  Markdown" button to copy the code to your clipboard. This is
                  the code you'll paste into your GitHub README.md file.
                </p>
              </li>

              <li className="pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="mb-2">
                  <a
                    href={EXTERNAL_LINKS.GITHUB.NEW_REPO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    Create a special repository on GitHub with your username
                  </a>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  On GitHub, create a new repository with the same name as your
                  GitHub username. This special repository will display your
                  README on your profile page. Make sure it's public and
                  initialized with a README.
                </p>
              </li>

              <li>
                <div className="mb-2">
                  <Link
                    href={APP_ROUTES.HELP.STEP_BY_STEP}
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  >
                    Paste the markdown into the README.md file
                  </Link>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  In your new repository, edit the README.md file and paste the
                  copied markdown. Commit the changes to see your profile README
                  live on your GitHub profile.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Real-time Preview</h3>
              <p>
                See how your README will look as you build it, making it easy to
                design the perfect profile.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">
                Customizable Sections
              </h3>
              <p>
                Add only the sections that matter to you, creating a
                personalized profile that highlights your strengths.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">
                GitHub Stats Integration
              </h3>
              <p>
                Include your GitHub statistics to showcase your activity and
                contributions to the community.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Markdown Generation</h3>
              <p>
                Generate clean, well-formatted markdown code without having to
                write it yourself.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Why Use a Profile README?
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <p className="mb-4">
              A GitHub profile README allows you to showcase your skills,
              projects, and personality directly on your GitHub profile page.
              It's a great way to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Introduce yourself to the GitHub community and potential
                collaborators
              </li>
              <li>
                Highlight your best projects and contributions to open source
              </li>
              <li>
                Display your technical skills and expertise in various
                technologies
              </li>
              <li>Share your current learning journey and goals</li>
              <li>
                Make your profile stand out to potential employers or clients
              </li>
              <li>Express your personality and interests beyond just code</li>
            </ul>
            <p className="mt-4">
              According to GitHub's documentation, "Your profile README is the
              first thing people will see when they visit your GitHub profile."
              This makes it an essential tool for developers looking to make a
              strong impression.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Need More Help?</h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <p className="mb-4">
              Check out our detailed guides for more information:
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href={APP_ROUTES.HELP.PROFILE_README}
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Profile README Guide - Learn about GitHub Profile READMEs and
                  best practices
                </Link>
              </li>
              <li>
                <Link
                  href={APP_ROUTES.HELP.STEP_BY_STEP}
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                  Step-by-Step Tutorial - Detailed walkthrough of creating your
                  profile README
                </Link>
              </li>
              <li>
                <Link
                  href={APP_ROUTES.HELP.FAQ}
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Frequently Asked Questions - Answers to common questions about
                  profile READMEs
                </Link>
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.GITHUB.PROFILE_README_GUIDE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  GitHub's Official Guide - GitHub's documentation on profile
                  READMEs
                </a>
              </li>
              <li>
                <a
                  href={EXTERNAL_LINKS.GITHUB.AWESOME_PROFILES}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Awesome GitHub Profile READMEs - Collection of inspiring
                  profile READMEs
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
