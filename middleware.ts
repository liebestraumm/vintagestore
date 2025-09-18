import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Check session
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });


  // Redirect unauthenticated users away from protected pages
  if (!token && !request.nextUrl.pathname.startsWith("/sign-in")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Cart cookie logic
  if (!request.cookies.get("sessionCartId")) {
    const sessionCartId = crypto.randomUUID();
    const response = NextResponse.next();
    response.cookies.set("sessionCartId", sessionCartId, { path: "/" });
    return response;
  }

  return NextResponse.next();
}

// Configure paths where middleware runs
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)).*)",
  ],
};
