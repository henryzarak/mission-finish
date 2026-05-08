import { NextRequest, NextResponse } from "next/server"

const protectedRoutes = ["/dashboard"]
const publicRoutes = ["/login", "/signup", "/"]
const authRoutes = ["/login", "/signup"]

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname

  // Allow static files, API routes, and auth callback
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.startsWith("/auth") ||
    path.match(/\.(svg|png|jpg|ico|woff2?)$/)
  ) {
    return NextResponse.next()
  }

  const isProtectedRoute = protectedRoutes.some((r) => path.startsWith(r))
  const isAuthRoute = authRoutes.some((r) => path.startsWith(r))

  // Check for session cookie (Supabase uses sb-* cookies)
  const accessToken = req.cookies.get("sb-access-token")?.value
  const refreshToken = req.cookies.get("sb-refresh-token")?.value
  const isAuthenticated = !!(accessToken || refreshToken)

  // Redirect to login if trying to access protected routes without auth
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to dashboard if already authenticated and on auth pages
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
