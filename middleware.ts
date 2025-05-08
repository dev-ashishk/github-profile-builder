import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
export function middleware(request: NextRequest) {
  // Handle /robots.txt requests
  if (request.nextUrl.pathname === basePath + "/robots.txt") {
    return NextResponse.rewrite(new URL("/api/robots.txt", request.url));
  }

  // Handle /sitemap.xml requests
  if (request.nextUrl.pathname === basePath + "/sitemap.xml") {
    return NextResponse.rewrite(new URL("/api/sitemap.xml", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/robots.txt", "/sitemap.xml"],
};
