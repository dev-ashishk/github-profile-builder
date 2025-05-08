import type { Metadata } from "next";
import Link from "next/link";

import { APP_ROUTES, EXTERNAL_LINKS } from "@/constants/app-link";

export const metadata: Metadata = {
  title: "Step-by-Step Guide - GitHub Profile README Builder",
  description:
    "A comprehensive step-by-step guide to creating your GitHub Profile README using our builder tool",
};

export default function StepByStepGuidePage() {
  return (
    <div className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Step-by-Step Guide</h1>

      <div className="prose dark:prose-invert max-w-none">
        <p className="lead mb-6">
          This comprehensive guide will walk you through the entire process of
          creating and publishing your GitHub profile README using our builder
          tool.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Before You Begin</h2>
          <p className="mb-4">Make sure you have:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              A GitHub account (if you don't have one,{" "}
              <a
                href="https://github.com/join"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                sign up here
              </a>
              )
            </li>
            <li>
              Some basic information about yourself, your skills, and projects
            </li>
            <li>A few minutes to complete the process</li>
          </ul>
        </div>

        <div className="space-y-12">
          <section className="border-l-4 border-blue-500 pl-6 relative">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
              1
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              Fill Out the Profile Form
            </h2>
            <div className="space-y-4">
              <p>
                Start by filling out the profile form with your personal
                information, skills, and projects.
              </p>

              <h3 className="text-xl font-medium">Basic Information</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Enter your name, GitHub username, and a brief bio</li>
                <li>Add your location and website if you want to share them</li>
                <li>Upload a profile picture or avatar (optional)</li>
              </ul>

              <h3 className="text-xl font-medium">Skills & Technologies</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  Add programming languages, frameworks, and tools you're
                  proficient in
                </li>
                <li>
                  You can organize them by categories (Frontend, Backend, etc.)
                </li>
                <li>Choose how you want them displayed (badges, text, etc.)</li>
              </ul>

              <h3 className="text-xl font-medium">Projects</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Add your best or most recent projects</li>
                <li>Include project name, description, and repository link</li>
                <li>List the technologies used in each project</li>
                <li>Add a demo link if available</li>
              </ul>

              <h3 className="text-xl font-medium">GitHub Stats</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Enter your GitHub username to generate stats</li>
                <li>
                  Select which stats you want to display (languages,
                  contributions, etc.)
                </li>
                <li>Customize the appearance of your stats cards</li>
              </ul>

              <h3 className="text-xl font-medium">Social Links</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Add links to your social media profiles</li>
                <li>Include professional networks like LinkedIn</li>
                <li>Add your email if you want to be contacted directly</li>
              </ul>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-lg mb-2">
                  Tips for Filling Out the Form:
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be concise but informative in your descriptions</li>
                  <li>
                    Focus on your most relevant skills and impressive projects
                  </li>
                  <li>Use professional language that represents you well</li>
                  <li>
                    Include enough detail to give context, but avoid
                    overwhelming visitors
                  </li>
                  <li>
                    Consider your target audience (employers, collaborators,
                    etc.)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="border-l-4 border-green-500 pl-6 relative">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              2
            </div>
            <h2 className="text-2xl font-semibold mb-4">Preview Your README</h2>
            <div className="space-y-4">
              <p>
                As you fill out the form, check the preview section to see how
                your README will look on GitHub.
              </p>

              <h3 className="text-xl font-medium">Preview Features</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Real-time updates as you make changes</li>
                <li>Accurate representation of how it will appear on GitHub</li>
                <li>
                  Toggle between light and dark themes to see how it looks in
                  both modes
                </li>
              </ul>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-lg mb-2">
                  What to Look For in the Preview:
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Overall layout and visual appeal</li>
                  <li>Proper formatting of text and sections</li>
                  <li>Correct display of badges and links</li>
                  <li>Balance of content (not too sparse or overwhelming)</li>
                  <li>Logical flow of information</li>
                  <li>Any formatting issues or errors</li>
                </ul>
              </div>

              <p>
                Take your time to review the preview and make adjustments until
                you're satisfied with how your README looks.
              </p>
            </div>
          </section>

          <section className="border-l-4 border-purple-500 pl-6 relative">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
              3
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              Copy the Generated Markdown
            </h2>
            <div className="space-y-4">
              <p>
                Once you're satisfied with your README, copy the generated
                markdown code.
              </p>

              <h3 className="text-xl font-medium">How to Copy the Markdown</h3>
              <ol className="list-decimal pl-6 space-y-1">
                <li>Scroll to the "Markdown" section below the preview</li>
                <li>Click the "Copy Markdown" button</li>
                <li>The code will be copied to your clipboard</li>
              </ol>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-lg mb-2">About Markdown:</h4>
                <p className="mb-2">
                  Markdown is a lightweight markup language that GitHub uses to
                  format text. The generator creates valid markdown code that
                  GitHub will render correctly.
                </p>
                <p>
                  <a
                    href={EXTERNAL_LINKS.MARKDOWN_GUIDE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Learn more about Markdown syntax →
                  </a>
                </p>
              </div>

              <p>
                If you want to make manual adjustments to the markdown code, you
                can do so before copying it. This is optional, as the generated
                code should work well as-is.
              </p>
            </div>
          </section>

          <section className="border-l-4 border-orange-500 pl-6 relative">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
              4
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              Create a Special Repository on GitHub
            </h2>
            <div className="space-y-4">
              <p>
                On GitHub, create a new repository that has the same name as
                your GitHub username.
              </p>

              <h3 className="text-xl font-medium">
                Step-by-Step Repository Creation
              </h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  Go to{" "}
                  <a
                    href={EXTERNAL_LINKS.GITHUB.NEW_REPO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    GitHub's new repository page
                  </a>
                </li>
                <li>
                  In the "Repository name" field, enter your GitHub username
                  exactly
                </li>
                <li>
                  Add an optional description (this won't affect your profile
                  README)
                </li>
                <li>Set the repository to "Public"</li>
                <li>
                  Check the box to "Initialize this repository with a README"
                </li>
                <li>Click "Create repository"</li>
              </ol>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-lg mb-2">Important Notes:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    The repository name <strong>must</strong> match your GitHub
                    username exactly (case-sensitive)
                  </li>
                  <li>
                    The repository must be public for the README to appear on
                    your profile
                  </li>
                  <li>
                    GitHub will show a special message indicating this is a
                    special repository
                  </li>
                  <li>
                    If you don't see this message, double-check that the
                    repository name matches your username
                  </li>
                </ul>
              </div>

              <p>
                This special repository is what enables the profile README
                feature. GitHub will automatically display the README.md file
                from this repository on your profile page.
              </p>
            </div>
          </section>

          <section className="border-l-4 border-teal-500 pl-6 relative">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white font-bold">
              5
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              Paste the Markdown into the README.md File
            </h2>
            <div className="space-y-4">
              <p>
                Edit the README.md file in your new repository and paste the
                copied markdown code.
              </p>

              <h3 className="text-xl font-medium">Updating the README File</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>In your new repository, click on the README.md file</li>
                <li>
                  Click the pencil icon (Edit this file) in the upper right
                  corner
                </li>
                <li>Delete any existing content in the file</li>
                <li>Paste the markdown code you copied from our tool</li>
                <li>Scroll down and click "Commit changes"</li>
                <li>Optionally, add a commit message describing your update</li>
                <li>Click "Commit changes" again to save</li>
              </ol>

              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                <h4 className="font-medium text-lg mb-2">Final Steps:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Visit your GitHub profile page to see your new README</li>
                  <li>Check that everything looks as expected</li>
                  <li>Make any additional adjustments if needed</li>
                  <li>Share your profile with others!</li>
                </ul>
              </div>

              <p>
                After committing the changes, GitHub will automatically update
                your profile page to display your new README. It may take a few
                moments for the changes to appear.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            Maintaining Your Profile README
          </h2>
          <p className="mb-4">
            Your GitHub profile README is a living document. Here are some tips
            for keeping it up-to-date:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Update it when you complete new projects</li>
            <li>Add new skills as you learn them</li>
            <li>Refresh your bio and goals periodically</li>
            <li>
              Consider adding dynamic content like GitHub stats that update
              automatically
            </li>
            <li>
              Review it every few months to ensure it accurately represents your
              current skills and interests
            </li>
            <li>
              Return to this tool anytime to regenerate your README with new
              information
            </li>
          </ul>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-xl font-medium mb-2">Pro Tip:</h3>
            <p>
              You can bookmark your repository's edit page for quick access
              whenever you want to update your README.
            </p>
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
            href={APP_ROUTES.HELP.FAQ}
            className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          >
            FAQ
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
