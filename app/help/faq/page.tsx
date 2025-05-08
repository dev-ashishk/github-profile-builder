import type { Metadata } from "next";

import { EXTERNAL_LINKS } from "@/constants/app-link";

export const metadata: Metadata = {
  title: "FAQ - GitHub Profile README Builder",
  description:
    "Frequently asked questions about GitHub Profile READMEs and our builder tool",
};

export default function FAQPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="prose dark:prose-invert max-w-none">
        <h2>General Questions</h2>

        <h3>What is a GitHub Profile README?</h3>
        <p>
          A GitHub Profile README is a special repository that appears at the
          top of your GitHub profile page. It's created by making a new
          repository with the same name as your GitHub username and adding a
          README.md file to it.
        </p>

        <h3>Do I need to know Markdown to use this tool?</h3>
        <p>
          No! That's the beauty of this tool. You can create a beautiful README
          without knowing any Markdown. Our builder generates all the Markdown
          code for you.
        </p>

        <h3>Is this tool free to use?</h3>
        <p>Yes, this tool is completely free to use.</p>

        <h2>Technical Questions</h2>

        <h3>How do I add GitHub stats to my README?</h3>
        <p>
          Our tool automatically generates the necessary code to display your
          GitHub stats. Just enter your GitHub username in the form, and we'll
          handle the rest.
        </p>

        <h3>Can I customize the theme of my GitHub stats?</h3>
        <p>
          Yes, you can customize the theme of your GitHub stats cards. We offer
          several themes to choose from, and you can also customize the colors.
        </p>

        <h3>How do I update my README after creating it?</h3>
        <p>
          You can come back to this tool anytime, make your changes, and copy
          the new markdown. Then, update your README.md file on GitHub with the
          new content.
        </p>

        <h3>Why aren't my GitHub stats showing up?</h3>
        <p>
          GitHub stats are generated using an external API. If they're not
          showing up, it could be due to:
        </p>
        <ul>
          <li>The API is temporarily down</li>
          <li>Your GitHub username is entered incorrectly</li>
          <li>Your GitHub profile is set to private</li>
        </ul>

        <h2>Troubleshooting</h2>

        <h3>The copy button isn't working</h3>
        <p>
          This could be due to browser permissions. Make sure you've allowed the
          site to access your clipboard.
        </p>

        <h3>
          My README doesn't look the same on GitHub as it does in the preview
        </h3>
        <p>
          GitHub's markdown renderer might have some differences from our
          preview. Some advanced formatting or custom HTML might not render
          exactly the same.
        </p>

        <h3>I found a bug or have a feature request</h3>
        <p>
          Please report bugs or suggest features by opening an issue on our
          <a
            href={EXTERNAL_LINKS.GITHUB.REPOSITORY_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository
          </a>
          .
        </p>
      </div>
    </div>
  );
}
