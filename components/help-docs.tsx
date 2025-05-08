"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { trackEvent } from "@/utils/analytics";
import { HelpDocsNav } from "@/components/help-doc-nav";

export function HelpDocs({ onClose }) {
  const router = useRouter();
  const pathname = usePathname();
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleNavigate = (path) => {
    router.push(path);
    trackEvent("help_navigation", "documentation", path);
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    trackEvent("help_text_copied", "documentation", `step_${index}`);
  };

  const handleExternalLinkClick = (linkName) => {
    trackEvent("external_link_clicked", "documentation", linkName);
  };

  const renderGettingStarted = () => (
    <motion.div
      key="getting-started"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Welcome to GitHub Profile README Builder</CardTitle>
          <CardDescription>
            Learn how to create an impressive GitHub profile page that showcases
            your skills and projects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              What is a GitHub Profile README?
            </h3>
            <p>
              A GitHub Profile README is a special repository that appears at
              the top of your GitHub profile page. It's a great way to introduce
              yourself, showcase your skills, and highlight your best work to
              visitors of your profile.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                The README appears on your profile when you create a repository
                with the same name as your GitHub username and add a README.md
                file to it.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">How This Tool Helps You</h3>
            <p>
              Our GitHub Profile README Builder makes it easy to create a
              professional and visually appealing profile page without writing
              any markdown code. Here's what you can do:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Choose from 6 professionally designed templates</li>
              <li>
                Automatically fetch your GitHub stats, repositories, and
                contribution data
              </li>
              <li>
                Customize sections like skills, projects, experience, and
                education
              </li>
              <li>Personalize with custom color schemes</li>
              <li>Preview your profile in real-time</li>
              <li>Copy the generated markdown with a single click</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Start</h3>
            <ol className="list-decimal list-inside space-y-3 ml-4">
              <li>
                <span className="font-medium">Fill in your information</span> -
                Enter your name, title, bio, and other details in the Profile
                tab
              </li>
              <li>
                <span className="font-medium">Connect GitHub</span> - Enter your
                GitHub username to automatically fetch your stats
              </li>
              <li>
                <span className="font-medium">Customize sections</span> - Add
                skills, projects, work experience, and more
              </li>
              <li>
                <span className="font-medium">Choose a template</span> - Select
                from 6 beautiful templates
              </li>
              <li>
                <span className="font-medium">Preview & copy</span> - Preview
                your profile and copy the generated markdown
              </li>
              <li>
                <span className="font-medium">Create on GitHub</span> - Follow
                the instructions in the "Profile README" tab to create your
                GitHub profile README
              </li>
            </ol>
          </div>

          <div className="flex justify-center mt-4">
            <Button
              onClick={() => handleNavigate("/help/profile-readme")}
              className="gap-2"
            >
              <span>Learn how to create your GitHub Profile README</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderProfileReadme = () => (
    <motion.div
      key="profile-readme"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Creating Your GitHub Profile README</CardTitle>
          <CardDescription>
            Follow these steps to create a special repository for your GitHub
            profile README
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Your GitHub profile README is created by making a special
              repository that has the exact same name as your GitHub username.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Step 1: Create a new repository
            </h3>
            <p>
              Go to GitHub and create a new repository with the same name as
              your GitHub username. This is case sensitive, so make sure it
              matches exactly.
            </p>
            <div className="flex justify-center">
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
                onClick={() => handleExternalLinkClick("create_new_repo")}
              >
                Create a new repository on GitHub
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                For example, if your username is "johndoe", the repository
                should be named "johndoe".
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Step 2: Initialize with a README
            </h3>
            <p>
              When creating the repository, check the option "Initialize this
              repository with a README" to automatically create a README.md
              file.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                GitHub will show a special message saying "You found a secret!
                username/username is a special repository that you can use to
                add a README.md to your GitHub profile."
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Step 3: Edit the README.md file
            </h3>
            <p>
              After creating the repository, click on the "Edit" button (pencil
              icon) on the README.md file. Delete all the content and paste the
              markdown generated by our tool.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Step 4: Commit your changes
            </h3>
            <p>
              After pasting the markdown, scroll down and click the "Commit
              changes" button to save your profile README.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You can add a commit message like "Update profile README" to
                describe your changes.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Step 5: View your profile</h3>
            <p>
              Go to your GitHub profile page (github.com/username) to see your
              new profile README. It will appear at the top of your profile
              page.
            </p>
            <div className="flex justify-center">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
                onClick={() => handleExternalLinkClick("view_github_profile")}
              >
                Go to GitHub
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Button
              onClick={() => handleNavigate("/help/step-by-step")}
              className="gap-2"
            >
              <span>View detailed step-by-step guide</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderStepByStep = () => (
    <motion.div
      key="step-by-step"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Detailed Step-by-Step Guide</CardTitle>
          <CardDescription>
            Follow these detailed instructions with code examples to create your
            GitHub profile README
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Step 1: Generate your markdown
            </h3>
            <p>
              Use our builder to create your profile README. Fill in your
              information, customize the sections, and choose a template. Then
              copy the generated markdown.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex justify-between items-start">
              <div className="text-sm text-gray-600 dark:text-gray-300 font-mono overflow-auto max-h-32">
                <pre>
                  {`# Hi there, I'm John Doe 👋

Full Stack Developer passionate about creating elegant solutions

## 🔧 Skills & Technologies
JavaScript | React | Node.js | TypeScript`}
                </pre>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 flex-shrink-0"
                onClick={() =>
                  handleCopy(
                    `# Hi there, I'm John Doe 👋\n\nFull Stack Developer passionate about creating elegant solutions\n\n## 🔧 Skills & Technologies\nJavaScript | React | Node.js | TypeScript`,
                    1
                  )
                }
              >
                {copiedIndex === 1 ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Step 2: Create a special repository
            </h3>
            <p>
              Go to GitHub and create a new repository with the exact same name
              as your GitHub username. Make sure to check "Initialize this
              repository with a README".
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                Repository name: <strong>username</strong> (replace with your
                actual GitHub username)
              </p>
            </div>
            <div className="flex justify-center">
              <a
                href="https://github.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline"
                onClick={() =>
                  handleExternalLinkClick("create_repo_step_by_step")
                }
              >
                Create a new repository on GitHub
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Step 3: Edit the README.md file
            </h3>
            <p>
              After creating the repository, you'll be taken to the repository
              page. Click on the README.md file, then click the edit button
              (pencil icon) in the top right of the file view.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Delete any existing content in the file and paste your generated
                markdown.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Step 4: Preview and commit your changes
            </h3>
            <p>
              After pasting your markdown, click the "Preview" tab to see how it
              will look. If everything looks good, scroll down and click the
              "Commit changes" button.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex justify-between items-start">
              <div className="text-sm text-gray-600 dark:text-gray-300 font-mono">
                <pre>
                  {`Commit message: Update profile README
Description: Add personalized GitHub profile README
[x] Commit directly to the main branch`}
                </pre>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 flex-shrink-0"
                onClick={() =>
                  handleCopy(
                    `Commit message: Update profile README\nDescription: Add personalized GitHub profile README\n[x] Commit directly to the main branch`,
                    4
                  )
                }
              >
                {copiedIndex === 4 ? <Check size={16} /> : <Copy size={16} />}
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Step 5: Verify your profile README
            </h3>
            <p>
              Go to your GitHub profile page by clicking on your profile picture
              in the top right corner and selecting "Your profile", or by
              navigating to github.com/username (replace "username" with your
              GitHub username).
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Your profile README should now appear at the top of your profile
                page. If you don't see it, make sure the repository name exactly
                matches your username.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Step 6: Update your profile README anytime
            </h3>
            <p>
              You can update your profile README anytime by editing the
              README.md file in your username repository. You can use our
              builder to generate new markdown whenever you want to refresh your
              profile.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Tip: Bookmark our GitHub Profile README Builder for easy access
                whenever you want to update your profile.
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Button
              onClick={() => handleNavigate("/help/faq")}
              className="gap-2"
            >
              <span>View Frequently Asked Questions</span>
              <ArrowRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderFAQ = () => (
    <motion.div
      key="faq"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Find answers to common questions about GitHub profile READMEs and
            our builder
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What is a GitHub profile README?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  A GitHub profile README is a special feature that allows you
                  to showcase information about yourself directly on your GitHub
                  profile page. It appears as a prominent section at the top of
                  your profile.
                </p>
                <p>
                  To create one, you need to make a new repository with the same
                  name as your GitHub username and add a README.md file to it.
                  GitHub will automatically display the contents of this README
                  at the top of your profile page.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                Why doesn't my profile README show up on my GitHub profile?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  If your profile README isn't showing up, check these common
                  issues:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Make sure the repository name{" "}
                    <strong>exactly matches</strong> your GitHub username (it's
                    case sensitive)
                  </li>
                  <li>
                    Ensure the README file is named "README.md" (case sensitive)
                  </li>
                  <li>
                    Verify that the README file is in the root directory of the
                    repository
                  </li>
                  <li>
                    Check that the repository is public (private repositories
                    won't display the README on your profile)
                  </li>
                  <li>
                    Try refreshing your profile page or logging out and back in
                    if you've just created the repository
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                Can I use HTML in my GitHub profile README?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Yes, GitHub profile READMEs support a subset of HTML along
                  with Markdown. You can use basic HTML tags like{" "}
                  <code>&lt;h1&gt;</code>, <code>&lt;p&gt;</code>,{" "}
                  <code>&lt;a&gt;</code>, <code>&lt;img&gt;</code>,{" "}
                  <code>&lt;table&gt;</code>, and more.
                </p>
                <p className="mb-2">
                  You can also use HTML for more advanced formatting, such as
                  centering content with <code>&lt;div align="center"&gt;</code>{" "}
                  or creating complex layouts with tables.
                </p>
                <p>
                  However, for security reasons, GitHub sanitizes the HTML and
                  doesn't allow certain tags or attributes, particularly those
                  related to JavaScript or styling that could be used
                  maliciously.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                How do I add images to my GitHub profile README?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  There are several ways to add images to your GitHub profile
                  README:
                </p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>
                    <strong>Upload directly to the repository</strong>: You can
                    upload images to your username repository and reference them
                    using relative paths.
                    <br />
                    <code>![Alt text](./image.png)</code>
                  </li>
                  <li>
                    <strong>Use GitHub Issues</strong>: Upload an image to a
                    GitHub issue (even a draft), then copy the URL and use it in
                    your README.
                    <br />
                    <code>
                      ![Alt text](https://user-images.githubusercontent.com/...)
                    </code>
                  </li>
                  <li>
                    <strong>Use external image hosting</strong>: Host your
                    images on services like Imgur or Cloudinary and link to
                    them.
                    <br />
                    <code>![Alt text](https://i.imgur.com/...)</code>
                  </li>
                  <li>
                    <strong>Use GitHub's asset hosting</strong>: Drag and drop
                    images directly into the README editor on GitHub, and it
                    will automatically upload and link them.
                  </li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                How do I add GitHub stats to my profile README?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Our builder automatically generates the markdown for GitHub
                  stats when you enable them in the Settings tab. These stats
                  are powered by several popular open-source projects:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <a
                      href="https://github.com/anuraghazra/github-readme-stats"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={() =>
                        handleExternalLinkClick("github_readme_stats")
                      }
                    >
                      GitHub README Stats
                    </a>{" "}
                    - Shows your GitHub statistics, top languages, and more
                  </li>
                  <li>
                    <a
                      href="https://github.com/DenverCoder1/github-readme-streak-stats"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={() =>
                        handleExternalLinkClick("github_streak_stats")
                      }
                    >
                      GitHub Streak Stats
                    </a>{" "}
                    - Displays your contribution streak
                  </li>
                  <li>
                    <a
                      href="https://github.com/ryo-ma/github-profile-trophy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={() =>
                        handleExternalLinkClick("github_profile_trophy")
                      }
                    >
                      GitHub Profile Trophy
                    </a>{" "}
                    - Shows achievement trophies based on your GitHub activity
                  </li>
                </ul>
                <p className="mt-2">
                  These services generate dynamic images based on your GitHub
                  username, which are then embedded in your README.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>
                How often are GitHub stats updated?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  The GitHub stats shown in your profile README are dynamically
                  generated each time someone views your profile. However, there
                  are some caching mechanisms in place:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    GitHub's image cache typically refreshes every few hours
                    (usually 2-6 hours)
                  </li>
                  <li>
                    Some stat providers have their own caching mechanisms
                    (typically refreshed daily)
                  </li>
                  <li>
                    Browser caching might also affect how frequently visitors
                    see updated stats
                  </li>
                </ul>
                <p className="mt-2">
                  In general, your GitHub stats should update at least once per
                  day, reflecting your recent activity.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>
                Can I customize the colors and themes of my GitHub stats?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Yes! Our builder allows you to customize the colors of your
                  GitHub stats by changing the color theme in the Settings tab.
                  The color theme you select will be applied to your GitHub
                  stats cards.
                </p>
                <p className="mb-2">
                  For more advanced customization, you can manually edit the
                  markdown after copying it. Each GitHub stats service supports
                  various parameters for customization:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <code>theme</code> - Choose from predefined themes like
                    dark, radical, merko, etc.
                  </li>
                  <li>
                    <code>bg_color</code> - Set a custom background color
                  </li>
                  <li>
                    <code>title_color</code> - Change the title text color
                  </li>
                  <li>
                    <code>text_color</code> - Change the body text color
                  </li>
                  <li>
                    <code>icon_color</code> - Change the icon colors
                  </li>
                </ul>
                <p className="mt-2">
                  For example:{" "}
                  <code>
                    ![GitHub
                    Stats](https://github-readme-stats.vercel.app/api?username=yourusername&theme=radical)
                  </code>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>
                How do I add a visitor counter to my profile?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Our builder includes an option to add a visitor counter to
                  your profile README. You can enable this in the Settings tab
                  under "GitHub Stats & Widgets" by toggling "Profile Visitors".
                </p>
                <p className="mb-2">
                  The visitor counter is powered by services like{" "}
                  <a
                    href="https://github.com/antonkomarev/github-profile-views-counter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    onClick={() =>
                      handleExternalLinkClick("profile_views_counter")
                    }
                  >
                    GitHub Profile Views Counter
                  </a>
                  , which tracks how many times your profile has been viewed.
                </p>
                <p>
                  The markdown for a visitor counter looks like this:{" "}
                  <code>
                    ![Profile
                    Views](https://komarev.com/ghpvc/?username=yourusername&color=blueviolet)
                  </code>
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger>
                Is there a limit to how long my profile README can be?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  GitHub doesn't impose a strict character limit on profile
                  READMEs, but there are some practical considerations:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Very long READMEs may be visually overwhelming and users
                    might not scroll through all the content
                  </li>
                  <li>
                    GitHub's UI displays a certain amount of content before
                    adding a "Show more" button, so keep your most important
                    information near the top
                  </li>
                  <li>
                    Extremely large READMEs with many images or widgets might
                    load slowly for some users
                  </li>
                </ul>
                <p className="mt-2">
                  As a best practice, aim for a concise, well-organized README
                  that highlights your most important information without
                  overwhelming visitors.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger>
                Can I save my profile configuration for later use?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Yes! Our GitHub Profile README Builder automatically saves
                  your profile configuration to your browser's local storage.
                  This means you can:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    Close the browser and return later to continue where you
                    left off
                  </li>
                  <li>Make incremental changes to your profile over time</li>
                  <li>
                    Experiment with different templates and settings without
                    losing your data
                  </li>
                </ul>
                <p className="mt-2">
                  Your data is stored locally in your browser and is not sent to
                  any server (except when you explicitly fetch GitHub data). If
                  you clear your browser data or switch to a different browser,
                  you'll need to re-enter your information.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11">
              <AccordionTrigger>
                Where can I learn more about GitHub profile READMEs?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Here are some excellent resources to learn more about GitHub
                  profile READMEs:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <a
                      href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={() => handleExternalLinkClick("github_docs")}
                    >
                      GitHub Docs: Managing your profile README
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/abhisheknaiidu/awesome-github-profile-readme"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={() =>
                        handleExternalLinkClick("awesome_profile_readme")
                      }
                    >
                      Awesome GitHub Profile README
                    </a>{" "}
                    - A curated list of awesome profile READMEs
                  </li>
                  <li>
                    <a
                      href="https://github.com/coderjojo/creative-profile-readme"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={() =>
                        handleExternalLinkClick("creative_profile_readme")
                      }
                    >
                      Creative Profile README
                    </a>{" "}
                    - A collection of creative profile READMEs
                  </li>
                  <li>
                    <a
                      href="https://github.blog/2020-07-27-github-profile-readme-files-are-here/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={() => handleExternalLinkClick("github_blog")}
                    >
                      GitHub Blog: GitHub Profile README files are here!
                    </a>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12">
              <AccordionTrigger>
                How can I add dynamic content to my GitHub profile README?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  You can add dynamic content to your GitHub profile README
                  using GitHub Actions. This allows you to automatically update
                  your README with:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Latest blog posts from your RSS feed</li>
                  <li>Recent GitHub activity</li>
                  <li>Twitter/X posts</li>
                  <li>Weather information</li>
                  <li>Spotify currently playing/recently played tracks</li>
                  <li>Daily quotes or jokes</li>
                </ul>
                <p className="mt-2">To implement this, you'll need to:</p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>
                    Create a GitHub Actions workflow file in your repository
                  </li>
                  <li>
                    Set up the workflow to run on a schedule (e.g., every 6
                    hours)
                  </li>
                  <li>
                    Use a script to fetch the dynamic content and update your
                    README
                  </li>
                </ol>
                <p className="mt-2">Check out these resources for examples:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <a
                      href="https://github.com/gautamkrishnar/blog-post-workflow"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={() =>
                        handleExternalLinkClick("blog_post_workflow")
                      }
                    >
                      Blog Post Workflow
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/jamesgeorge007/github-activity-readme"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={() =>
                        handleExternalLinkClick("github_activity_readme")
                      }
                    >
                      GitHub Activity README
                    </a>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-13">
              <AccordionTrigger>
                What are some creative elements I can add to my GitHub profile
                README?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  There are many creative elements you can add to make your
                  GitHub profile README stand out:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Animated GIFs</strong> - Add personality with a
                    relevant animated GIF
                  </li>
                  <li>
                    <strong>ASCII art</strong> - Create text-based art for a
                    unique header
                  </li>
                  <li>
                    <strong>Badges</strong> - Show off your skills,
                    certifications, or social profiles with badges from
                    <a
                      href="https://shields.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline ml-1"
                      onClick={() => handleExternalLinkClick("shields_io")}
                    >
                      shields.io
                    </a>
                  </li>
                  <li>
                    <strong>Typing animation</strong> - Create a typing effect
                    using GIFs from services like
                    <a
                      href="https://readme-typing-svg.herokuapp.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline ml-1"
                      onClick={() =>
                        handleExternalLinkClick("readme_typing_svg")
                      }
                    >
                      Readme Typing SVG
                    </a>
                  </li>
                  <li>
                    <strong>Spotify Now Playing</strong> - Show what you're
                    currently listening to on Spotify
                  </li>
                  <li>
                    <strong>Visitor counter</strong> - Track how many people
                    have viewed your profile
                  </li>
                  <li>
                    <strong>GitHub Skyline</strong> - 3D visualization of your
                    contributions
                  </li>
                  <li>
                    <strong>Custom SVG animations</strong> - Create interactive
                    or animated SVG content
                  </li>
                </ul>
                <p className="mt-2">
                  Remember that while creative elements can make your profile
                  more engaging, it's important to maintain readability and not
                  overload your README with too many elements.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-14">
              <AccordionTrigger>
                How can I organize a large GitHub profile README?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  If you have a lot of content to include in your GitHub profile
                  README, here are some organization tips:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Use clear section headers</strong> - Divide your
                    README into logical sections with descriptive headers
                  </li>
                  <li>
                    <strong>Create a table of contents</strong> - Add a
                    clickable table of contents at the top that links to each
                    section
                  </li>
                  <li>
                    <strong>Use collapsible sections</strong> - Implement
                    GitHub's <code>&lt;details&gt;</code> and{" "}
                    <code>&lt;summary&gt;</code> tags to create expandable
                    sections
                  </li>
                  <li>
                    <strong>Prioritize content</strong> - Put the most important
                    information at the top where it's immediately visible
                  </li>
                  <li>
                    <strong>Use visual hierarchy</strong> - Utilize different
                    header sizes, bold text, and dividers to create visual
                    structure
                  </li>
                  <li>
                    <strong>Consider a multi-column layout</strong> - Use HTML
                    tables or aligned divs to create a multi-column layout for
                    certain sections
                  </li>
                </ul>
                <p className="mt-2">Example of a collapsible section:</p>
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex justify-between items-start">
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-mono overflow-auto max-h-32">
                    <pre>
                      {`<details>
  <summary>🔧 Technologies & Tools</summary>
  
  ![](https://img.shields.io/badge/Code-JavaScript-informational?style=flat&logo=javascript)
  ![](https://img.shields.io/badge/Code-React-informational?style=flat&logo=react)
  ![](https://img.shields.io/badge/Code-Python-informational?style=flat&logo=python)
</details>`}
                    </pre>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 flex-shrink-0"
                    onClick={() =>
                      handleCopy(
                        `<details>\n  <summary>🔧 Technologies & Tools</summary>\n  \n  ![](https://img.shields.io/badge/Code-JavaScript-informational?style=flat&logo=javascript)\n  ![](https://img.shields.io/badge/Code-React-informational?style=flat&logo=react)\n  ![](https://img.shields.io/badge/Code-Python-informational?style=flat&logo=python)\n</details>`,
                        14
                      )
                    }
                  >
                    {copiedIndex === 14 ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-15">
              <AccordionTrigger>
                How can I track the performance of my GitHub profile README?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  While GitHub doesn't provide built-in analytics for profile
                  READMEs, there are several ways to track engagement:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Profile view counter</strong> - Add a visitor
                    counter badge from services like
                    <a
                      href="https://github.com/antonkomarev/github-profile-views-counter"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline ml-1"
                      onClick={() =>
                        handleExternalLinkClick(
                          "profile_views_counter_analytics"
                        )
                      }
                    >
                      GitHub Profile Views Counter
                    </a>
                  </li>
                  <li>
                    <strong>Link tracking</strong> - Use URL shorteners with
                    analytics for any links in your README
                  </li>
                  <li>
                    <strong>GitHub Traffic</strong> - Check the traffic to your
                    username repository in GitHub Insights
                  </li>
                  <li>
                    <strong>Image proxy analytics</strong> - Use an image proxy
                    service that provides view statistics
                  </li>
                  <li>
                    <strong>Monitor followers</strong> - Track changes in your
                    follower count over time
                  </li>
                </ul>
                <p className="mt-2">
                  You can also create a simple GitHub Action workflow that
                  periodically records metrics like follower count, repository
                  stars, and profile views to track changes over time.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-16">
              <AccordionTrigger>
                What are GitHub profile README limitations I should be aware of?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  While GitHub profile READMEs are powerful, they do have some
                  limitations:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>No JavaScript</strong> - GitHub sanitizes HTML and
                    doesn't allow JavaScript execution for security reasons
                  </li>
                  <li>
                    <strong>Limited CSS</strong> - Only a subset of CSS is
                    supported through HTML style attributes
                  </li>
                  <li>
                    <strong>Image restrictions</strong> - Some image hosting
                    services may be blocked
                  </li>
                  <li>
                    <strong>Rate limiting</strong> - Services that generate
                    dynamic content may have API rate limits
                  </li>
                  <li>
                    <strong>Size considerations</strong> - Very large READMEs
                    with many images can load slowly
                  </li>
                  <li>
                    <strong>Mobile display</strong> - Complex layouts may not
                    display well on mobile devices
                  </li>
                  <li>
                    <strong>Markdown compatibility</strong> - Some advanced
                    Markdown features may render differently than expected
                  </li>
                </ul>
                <p className="mt-2">
                  To work around these limitations, focus on creating clean,
                  well-structured content that looks good across devices and
                  browsers. Test your README on different screen sizes to ensure
                  it's readable everywhere.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-17">
              <AccordionTrigger>
                How can I make my GitHub profile README accessible?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Making your GitHub profile README accessible ensures it can be
                  used by people with disabilities. Here are some accessibility
                  best practices:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Add alt text to images</strong> - Always include
                    descriptive alt text for images using the format:{" "}
                    <code>![Alt text](image-url)</code>
                  </li>
                  <li>
                    <strong>Use semantic headers</strong> - Organize content
                    with proper heading levels (##, ###, etc.) in a logical
                    hierarchy
                  </li>
                  <li>
                    <strong>Ensure sufficient color contrast</strong> - Choose
                    colors with enough contrast for readability
                  </li>
                  <li>
                    <strong>Don't rely solely on color</strong> - Use additional
                    indicators besides color to convey information
                  </li>
                  <li>
                    <strong>Make link text descriptive</strong> - Use meaningful
                    link text instead of generic phrases like "click here"
                  </li>
                  <li>
                    <strong>Use simple tables</strong> - If using tables, keep
                    them simple with proper headers
                  </li>
                  <li>
                    <strong>Test with a screen reader</strong> - Check how your
                    README sounds when read aloud
                  </li>
                </ul>
                <p className="mt-2">
                  By making your profile README accessible, you ensure that all
                  visitors, including those using assistive technologies, can
                  access and understand your content.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-18">
              <AccordionTrigger>
                What are some common mistakes to avoid in GitHub profile
                READMEs?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  Here are some common mistakes to avoid when creating your
                  GitHub profile README:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Overcrowding</strong> - Adding too much information
                    makes your profile overwhelming and hard to read
                  </li>
                  <li>
                    <strong>Outdated information</strong> - Not updating your
                    README regularly with current skills and projects
                  </li>
                  <li>
                    <strong>Broken links/images</strong> - Links that lead
                    nowhere or images that don't load
                  </li>
                  <li>
                    <strong>Poor organization</strong> - Lack of clear sections
                    or logical flow
                  </li>
                  <li>
                    <strong>Overusing animations/GIFs</strong> - Too many moving
                    elements can be distracting
                  </li>
                  <li>
                    <strong>Ignoring mobile users</strong> - Creating layouts
                    that break on smaller screens
                  </li>
                  <li>
                    <strong>Missing context</strong> - Not providing enough
                    information about who you are and what you do
                  </li>
                  <li>
                    <strong>Typos and grammatical errors</strong> - Not
                    proofreading your content
                  </li>
                  <li>
                    <strong>Inconsistent styling</strong> - Mixing different
                    visual styles throughout your README
                  </li>
                </ul>
                <p className="mt-2">
                  Remember that your profile README is often the first
                  impression people have of you on GitHub, so it's worth taking
                  the time to make it polished and professional.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-19">
              <AccordionTrigger>
                How can I showcase my GitHub contributions effectively?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  There are several ways to effectively showcase your GitHub
                  contributions in your profile README:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Contribution graph</strong> - Display your
                    contribution calendar using services like
                    <a
                      href="https://github.com/Ashutosh00710/github-readme-activity-graph"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline ml-1"
                      onClick={() =>
                        handleExternalLinkClick("github_activity_graph")
                      }
                    >
                      GitHub Activity Graph
                    </a>
                  </li>
                  <li>
                    <strong>Contribution streak</strong> - Show your current and
                    longest contribution streaks with
                    <a
                      href="https://github.com/DenverCoder1/github-readme-streak-stats"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline ml-1"
                      onClick={() =>
                        handleExternalLinkClick(
                          "github_streak_stats_contributions"
                        )
                      }
                    >
                      GitHub Streak Stats
                    </a>
                  </li>
                  <li>
                    <strong>Top languages</strong> - Display your most used
                    programming languages
                  </li>
                  <li>
                    <strong>Contribution metrics</strong> - Show total commits,
                    PRs, issues, and code reviews
                  </li>
                  <li>
                    <strong>Highlight specific contributions</strong> - Feature
                    notable pull requests or issues you've worked on
                  </li>
                  <li>
                    <strong>Contribution trophies</strong> - Display achievement
                    badges based on your GitHub activity using
                    <a
                      href="https://github.com/ryo-ma/github-profile-trophy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline ml-1"
                      onClick={() =>
                        handleExternalLinkClick(
                          "github_profile_trophy_contributions"
                        )
                      }
                    >
                      GitHub Profile Trophy
                    </a>
                  </li>
                  <li>
                    <strong>Recent activity</strong> - Show your most recent
                    GitHub activity automatically
                  </li>
                </ul>
                <p className="mt-2">
                  Our builder includes options to add many of these contribution
                  visualizations to your profile README. You can enable them in
                  the Settings tab under "GitHub Stats & Widgets".
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-20">
              <AccordionTrigger>
                How often should I update my GitHub profile README?
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">
                  There's no strict rule for how often you should update your
                  GitHub profile README, but here are some guidelines:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>
                    <strong>Major career changes</strong> - Update when you
                    change jobs, roles, or career focus
                  </li>
                  <li>
                    <strong>New skills</strong> - Add new technologies or skills
                    as you learn them
                  </li>
                  <li>
                    <strong>Significant projects</strong> - Feature new major
                    projects you've completed
                  </li>
                  <li>
                    <strong>Quarterly review</strong> - Consider a quarterly
                    review to ensure information is current
                  </li>
                  <li>
                    <strong>Dynamic content</strong> - Set up GitHub Actions to
                    automatically update certain parts of your README (like blog
                    posts or activity)
                  </li>
                </ul>
                <p className="mt-2">
                  The most important thing is to ensure your README accurately
                  represents your current skills, interests, and projects.
                  Outdated information can give visitors the wrong impression
                  about your current focus and expertise.
                </p>
                <p className="mt-2">
                  Using our GitHub Profile README Builder makes updates easy -
                  just return to the tool, make your changes, and copy the new
                  markdown to update your README.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </motion.div>
  );

  // Render content based on current path
  const renderContent = () => {
    if (pathname === "/help/profile-readme") {
      return renderProfileReadme();
    } else if (pathname === "/help/step-by-step") {
      return renderStepByStep();
    } else if (pathname === "/help/faq") {
      return renderFAQ();
    } else {
      return renderGettingStarted();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <HelpDocsNav onClose={onClose} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {renderContent()}

        <div className="flex justify-center mt-8">
          <Button variant="outline" onClick={onClose} className="gap-2">
            <ArrowLeft size={16} />
            <span>Back to Profile Builder</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
