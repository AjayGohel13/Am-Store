import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import {  NextRequest, NextResponse } from "next/server";
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', "/", "/api(.*)","/product","/category(.*)"]);


export default clerkMiddleware(async (auth, request: NextRequest) => {
  const response = NextResponse.next();
  if (!isPublicRoute(request)) {
    auth().protect()
  }
  return response;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};