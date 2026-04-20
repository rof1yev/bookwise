import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/sign-in", "/sign-up"];
const protectedRoutes = ["/", "/admin", "/my-profile"];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth();
  const isLoggedIn = !!session?.user;

  const isAuthRoute = authRoutes.includes(pathname);
  const isProtectedRoute = protectedRoutes.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route),
  );

  if (isLoggedIn && isAuthRoute)
    return NextResponse.redirect(new URL("/", request.url));

  if (!isLoggedIn && isProtectedRoute)
    return NextResponse.redirect(new URL("/sign-in", request.url));

  return NextResponse.next();
}
