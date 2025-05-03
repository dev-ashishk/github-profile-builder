import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import GoogleAnalytics from "@/components/google-analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "GitHub Profile README Builder",
  description: "Create beautiful GitHub profile READMEs with ease",
  keywords:
    "GitHub profile, README generator, GitHub README, profile builder, GitHub stats, GitHub contribution graph, GitHub trophy, markdown generator, developer profile",
  openGraph: {
    title: "GitHub Profile README Builder",
    description: "Create beautiful GitHub profile READMEs with ease",
    url: "https://github-profile-builder-dev-ashishk.vercel.app",
    siteName: "GitHub Profile README Builder",
    images: [
      {
        url: "https://github-profile-builder-dev-ashishk.vercel.app/og-image.png",
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
    images: ["https://github-profile-builder-dev-ashishk.vercel.app/og-image.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense>{children}</Suspense>
          <Toaster />
          {/* Add Google Analytics */}
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ""} />
        </ThemeProvider>
      </body>
    </html>
  )
}
