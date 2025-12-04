import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Add your route protection logic here
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*", "/api/generate/:path*"],
}
