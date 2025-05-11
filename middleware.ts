import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Handle /robots.txt requests
  if (request.nextUrl.pathname === "/robots.txt") {
    return NextResponse.rewrite(new URL("/api/robots.txt", request.url));
  }

  // Handle /sitemap.xml requests
  if (request.nextUrl.pathname === "/sitemap.xml") {
    return NextResponse.rewrite(new URL("/api/sitemap.xml", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/robots.txt", "/sitemap.xml"],
};
