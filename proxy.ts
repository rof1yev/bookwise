import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "./database/drizzle";
import { users } from "./database/schema";
import { eq } from "drizzle-orm";

const authRoutes = ["/sign-in", "/sign-up"];
const protectedRoutes = ["/", "/admin/*", "/my-profile"];

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

  if (isLoggedIn) {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, session?.user?.email as string));

    if (!user.length) {
      const res = NextResponse.redirect(new URL("/sign-in", request.url));

      res.cookies.set("authjs.session-token", "", {
        maxAge: 0,
        path: "/",
      });

      return res;
    }
  }

  return NextResponse.next();
}
