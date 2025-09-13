import { AUTH_ROUTES, PROTECTED_ROUTES } from "@common/config/routes.config";
import { NextResponse, type NextRequest } from "next/server";

async function getSession(request: NextRequest) {
  try {
    const sessionUrl = new URL("/api/auth/get-session", request.url);
    const req = await fetch(sessionUrl, {
      cache: "no-store",
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    });

    if (!req.ok) return null;

    const text = await req.text();
    if (!text) return null;

    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse session response:", err);
      return null;
    }
  } catch (err) {
    console.error("Session fetch error:", err);
    return null;
  }
}

export default async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    currentPath.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTES.includes(currentPath);

  if (isProtectedRoute || isAuthRoute) {
    const session = await getSession(request);

    if (session) {
      if (session.user && !session.user.usernameSet && currentPath !== "/auth/setup-username") {
        return NextResponse.redirect(new URL("/auth/setup-username", request.url));
      }
      
      if (AUTH_ROUTES.includes(currentPath) && currentPath !== "/auth/setup-username") {
        return NextResponse.redirect(new URL("/workspace", request.url));
      }
    } else {
      if (!isAuthRoute) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|403|404|500|images).*)",
  ],
};
