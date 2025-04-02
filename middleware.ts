import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This middleware is simplified since we're using client-side auth
export function middleware(request: NextRequest) {
  // For now, we'll let client-side code handle auth redirects
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
