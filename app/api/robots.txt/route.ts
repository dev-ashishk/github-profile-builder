export async function GET() {
  // Base URL - replace with your actual domain in production
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/api/sitemap.xml
`;

  // Return the text with appropriate headers
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
