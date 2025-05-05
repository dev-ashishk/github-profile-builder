import { Inter } from "next/font/google";
import type React from "react";
import { Suspense } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import GoogleAnalytics from "@/components/google-analytics";

import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GitHub Profile README Builder",
  description: "Create beautiful GitHub profile READMEs with ease",
  keywords:
    "GitHub profile, README generator, GitHub README, profile builder, GitHub stats, GitHub contribution graph, GitHub trophy, markdown generator, developer profile",
  openGraph: {
    title: "GitHub Profile README Builder",
    description: "Create beautiful GitHub profile READMEs with ease",
    url: "https://dev-ashishk.github.io/github-profile-builder",
    siteName: "GitHub Profile README Builder",
    images: [
      {
        url: "https://dev-ashishk.github.io/github-profile-builder/github-profile-builder-preview.png",
        width: 1200,
        height: 630,
        alt: "GitHub Profile README Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Profile README Builder",
    description: "Create beautiful GitHub profile READMEs with ease",
    images: [
      "https://dev-ashishk.github.io/github-profile-builder/github-profile-builder-preview.png",
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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense>{children}</Suspense>
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
