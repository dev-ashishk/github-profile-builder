import { APP_ROUTES } from "@/constants/app-link";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  const date = new Date().toISOString();

  const routes = [
    {
      url: APP_ROUTES.HOME,
      changefreq: "daily",
      priority: 1.0,
    },
    {
      url: APP_ROUTES.HELP.ROOT,
      changefreq: "weekly",
      priority: 0.8,
    },
    {
      url: APP_ROUTES.HELP.PROFILE_README,
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      url: APP_ROUTES.HELP.STEP_BY_STEP,
      changefreq: "weekly",
      priority: 0.7,
    },
    {
      url: APP_ROUTES.HELP.FAQ,
      changefreq: "weekly",
      priority: 0.7,
    },
  ];

  // Generate XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
    <url>
      <loc>${baseUrl}${route.url}</loc>
      <lastmod>${date}</lastmod>
      <changefreq>${route.changefreq}</changefreq>
      <priority>${route.priority}</priority>
    </url>
  `
    )
    .join("")}
</urlset>`;

  // Return the XML with appropriate headers
  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
