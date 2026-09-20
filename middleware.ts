import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const username = process.env.ADMIN_ROUTE_USERNAME;
    const password = process.env.ADMIN_ROUTE_PASSWORD;

    if (!username || !password) {
        if (process.env.NODE_ENV === "development") {
            return NextResponse.next();
        }

        return new NextResponse("Not Found", { status: 404 });
    }

    const authorization = request.headers.get("authorization");
    if (authorization?.startsWith("Basic ")) {
        try {
            const credentials = atob(authorization.slice("Basic ".length));
            const separatorIndex = credentials.indexOf(":");
            const suppliedUsername = credentials.slice(0, separatorIndex);
            const suppliedPassword = credentials.slice(separatorIndex + 1);

            if (suppliedUsername === username && suppliedPassword === password) {
                return NextResponse.next();
            }
        } catch {
            // Treat malformed authorization headers as unauthenticated.
        }
    }

    return new NextResponse("Authentication required", {
        status: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Admin itineraries"' },
    });
}

export const config = {
    matcher: "/itinerary/listAll-adminonly/:path*",
};