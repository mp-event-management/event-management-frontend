import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

// TODO : need to define later, the right paths
const PUBLIC_PATHS = ["/", "*"];
const PROTECTED_PATHS = [""];
const ROLE_PATHS = {
  ORGANIZER: ["/", "/events/manage", "/events/create"],

  // Customer can access all excepts organizer menu
  CUSTOMER: ["/", "*"],
};

async function getSession() {
  return await auth();
}

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}

function isProtectedPath(pathname: string) {
  return PROTECTED_PATHS.some((path) => pathname.startsWith(path));
}

function hasRequiredRole(userRoles: string[], pathname: string) {
  if (userRoles.includes("ADMIN")) {
    return true;
  }

  for (const [role, paths] of Object.entries(ROLE_PATHS)) {
    if (
      paths.some((path) => pathname.startsWith(path)) &&
      userRoles.includes(role)
    ) {
      return true;
    }
  }
  return false;
}

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (pathname === "/login" && session?.user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isProtectedPath(pathname)) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const userRoles = session.user?.roles || [];

    if (!hasRequiredRole(userRoles, pathname)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}
