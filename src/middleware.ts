import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import {  NextRequest, NextResponse } from "next/server";
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', "/", "/api(.*)","/product"]);


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

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const isProtectedRoute = createRouteMatcher([
//     '/',

// ])

// export default clerkMiddleware((auth,request)=>{
//     if(isProtectedRoute(request)){
//         auth().protect()
//     }
//     return NextResponse.next()
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };