import { type NextRequest } from 'next/server'
import { autoUpdateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
    // update user's auth session
    return await autoUpdateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!\\.well-known|_next/static|_next/image|_next/internal|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}