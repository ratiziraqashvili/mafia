import { auth } from "./lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const proxy = async (req: NextRequest) => {
    const session = await auth.api.getSession({ headers: req.headers });

    const publicRoutes = ["/login", "/register"];

    if (!session && !publicRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (session && publicRoutes.includes(req.nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
};

export const config = {
      matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}