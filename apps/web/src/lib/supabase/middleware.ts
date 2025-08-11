import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function autoUpdateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {data: {session}, error} = await supabase.auth.getSession();

    if (error) console.error("Error getting session:", error);
    else if (!session) console.debug("No session found, user might not be authenticated.");
    else if (session.expires_at && new Date(session.expires_at * 1000) < new Date()) {
        console.debug("Session expired, refreshing it...", session.expires_at);

        const {error} = await supabase.auth.refreshSession();

        if (error) console.error("Error refreshing session:", error);
    }
    // else console.log("SESSION IS VALID");

    return supabaseResponse;
}