import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Define role-based access control for specific routes
const roleBasedRoutes: Record<string, string[]> = {
  "/client": ["client"],
  "/nurse": ["nurse"],
  "/admin": ["admin"],
};

export default withAuth(
  function middleware(req) {
    const { nextUrl, nextauth } = req;
    const user = nextauth?.token as { role?: string};

    const pathname = nextUrl.pathname;

    if (user && (pathname === "/signin" || pathname === "/signup")) {
      const role = user?.role;

      // Redirect based on user role
      const roleDashboardMap: Record<string, string> = {
        client: "/client",
        nurse: "/nurse",
        admin: "/admin",
      };

      const redirectUrl = roleDashboardMap[role] || "/";
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    if (!user) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    // Check if the user has access to the requested route
    for (const [route, allowedRoles] of Object.entries(roleBasedRoutes)) {
      if (
        nextUrl.pathname.startsWith(route) &&
        typeof user.role === "string" &&
        !allowedRoles.includes(user.role)
      ) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Ensure the user is authenticated
    },
    pages: {
      signIn: "/signin",
    },
  }
);

export const config = {
  matcher: [
    "/client/:path*",
    "/nurse/:path*",
    "/admin/:path*",
    "/signin",
    
  ],
};
