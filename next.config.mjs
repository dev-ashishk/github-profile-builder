/** @type {import('next').NextConfig} */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "github.com",
      "avatars.githubusercontent.com",
      "raw.githubusercontent.com",
    ],
    unoptimized: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: basePath + "/sitemap.xml",
  //       destination: "/api/sitemap.xml",
  //     },
  //     {
  //       source: basePath + "/robots.txt",
  //       destination: "/api/robots.txt",
  //     },
  //   ];
  // },
  reactStrictMode: true,
  devIndicators: false,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  output: "export",
};

export default nextConfig;
