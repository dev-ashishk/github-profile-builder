import { Inter } from "next/font/google";
import type React from "react";
import { Suspense } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { MainHeader } from "@/components/main-header";
import GoogleAnalytics from "@/components/google-analytics";

import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GitHub Profile README Builder",
  description:
    "Create an impressive GitHub profile README that showcases your skills, projects, and contributions. Our intuitive builder helps you stand out with beautiful templates and real-time previews.",
  keywords:
    "GitHub profile, README generator, GitHub README, profile builder, GitHub stats, GitHub contribution graph, GitHub trophy, markdown generator, developer profile",
  openGraph: {
    title: "GitHub Profile README Builder",
    description:
      "Create an impressive GitHub profile README that showcases your skills, projects, and contributions. Our intuitive builder helps you stand out with beautiful templates and real-time previews.",
    url: "https://github-readme-builder.hyper2x.com",
    siteName: "GitHub Profile README Builder",
    images: [
      {
        url: "https://github-readme-builder.hyper2x.com/github-profile-builder-preview.png",
        width: 1200,
        height: 630,
        alt: "GitHub Profile README Builder",
      },
    ],
    locale: "en_US",
    author: "Ashish Kumar",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GitHub Profile README Builder",
    description:
      "Create an impressive GitHub profile README that showcases your skills, projects, and contributions. Our intuitive builder helps you stand out with beautiful templates and real-time previews.",
    images: [
      "https://github-readme-builder.hyper2x.com/github-profile-builder-preview.png",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="uw_QH5CWz-ork8-az_GFhMs-b4qD_4j27Qz7qSIJUjo"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense>
            <MainHeader />
            {children}
          </Suspense>
          <Toaster />
          <Suspense>
            <GoogleAnalytics
              GA_MEASUREMENT_ID={
                process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""
              }
            />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
