import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const cookie = request.cookies.get("session");
    if (!cookie) {
        // fella has no cookies and this means that he is not authorised!
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/home", "/bulletin", "/bulletin/document"],
};
