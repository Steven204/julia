import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Handle admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // You can add authentication checks here later
    return NextResponse.next()
  }

  // Handle API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next()
  }

  // Handle blog routes
  if (request.nextUrl.pathname.startsWith("/blog")) {
    return NextResponse.next()
  }

  // Redirect root to admin
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
