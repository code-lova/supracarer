import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { ROLES } from "@types";

const ROUTES = {
  LOGIN: "/signin",
  SIGNUP: "/signup",
  ADMIN: "/admin",
  NURSE: "/nurse",
  CLIENT: "/client",
  UNAUTHORIZED: "/unauthorized",
};

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  //Allow access to login and signup pages
  // if (![ROUTES.LOGIN, ROUTES.SIGNUP].includes(pathname)) {
  //   if (!accessToken) {
  //     return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  //   }
  // }

  // const redirectToLogin = () => 
  //   NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));

  try {
    // Verify the JWT using jose
    const { payload } = await jwtVerify(accessToken, JWT_SECRET);
    const userRole = payload.aud;

    // Redirect logged-in users trying to access login/signup to their dashboard
    if ([ROUTES.LOGIN, ROUTES.SIGNUP].includes(pathname)) {
      const redirectDashboard =
        userRole === ROLES.ADMIN
          ? ROUTES.ADMIN
          : userRole === ROLES.NURSE
          ? ROUTES.NURSE
          : ROUTES.CLIENT;
      return NextResponse.redirect(new URL(redirectDashboard, request.url));
    }

    // Role-based access control
    if (pathname.startsWith(ROUTES.ADMIN) && userRole !== ROLES.ADMIN) {
      return NextResponse.redirect(new URL(ROUTES.UNAUTHORIZED, request.url));
    }

    if (pathname.startsWith(ROUTES.NURSE) && userRole !== ROLES.NURSE) {
      return NextResponse.redirect(new URL(ROUTES.UNAUTHORIZED, request.url));
    }

    if (pathname.startsWith(ROUTES.CLIENT) && userRole !== ROLES.CLIENT) {
      return NextResponse.redirect(new URL(ROUTES.UNAUTHORIZED, request.url));
    }

    // Allow access if all checks pass
    return NextResponse.next();
    
  } catch (error) {
   // Token is invalid or expired - allow refresh attempt
    const response = NextResponse.next();
    response.headers.set("InvalidAccessToken", "true");
    return response;
  }
}

export const config = {
  matcher: [
    "/admin/:path*", 
    "/nurse/:path*", 
    "/client/:path*", 
    "/signin", 
    "/signup", 
  ],
};