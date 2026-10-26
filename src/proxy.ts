import { auth } from "@auth/auth";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "@common/config/routes.config";
import { NextResponse, type NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    currentPath.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.includes(currentPath);

  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    if (isAuthRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (!session.user.usernameSet && currentPath !== "/auth/setup-username") {
    return NextResponse.redirect(new URL("/auth/setup-username", request.url));
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|403|404|500|images).*)",
  ],
};
