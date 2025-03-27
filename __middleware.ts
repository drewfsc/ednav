import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./sharedFunctions";
import { getToken } from "next-auth/jwt";

export async function __middleware(request: NextRequest) {
    // Check for Next-Auth session
    const token = await getToken({
        req: request,
        secret: process.env.JWT_SECRET
    });

    const path = request.nextUrl.pathname;

    // Protect dashboard routes
    if (path.startsWith('/dashboard') && !token) {
        return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    // Redirect authenticated users away from auth pages
    if ((path.startsWith('/auth') || path === '/') && token) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Handle legacy session updates
    return await updateSession(request);
}

// Add paths that should be matched by the __middleware
export const config = {
    matcher: ['/', '/dashboard/:path*', '/auth/:path*']
};
