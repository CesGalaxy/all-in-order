import { type NextRequest, NextResponse } from 'next/server'

export async function _middleware(request: NextRequest) {
    const now = Date.now().toString() + "-middleware";

    console.time(now);

    // update user's auth session
    //const session = await updateSession(request)

    console.timeEnd(now);

    //return session;
    return NextResponse.next({ request });
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - manifest.json (PWA manifest file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}