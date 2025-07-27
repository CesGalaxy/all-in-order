import { NextResponse } from 'next/server'
import { sbAdminClient, sbServerClient } from "@/lib/supabase/server";

const ERROR_URL = '/auth/auth-code-error';

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    let next = searchParams.get('next') ?? '/'
    if (!next.startsWith('/')) {
        // if "next" is not a relative URL, use the default
        next = '/'
    }

    if (code) {
        const supabase = await sbServerClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            // Get the Notion access token from the session
            const { session, user } = data;
            const notion_access_token = session?.provider_token;

            // if there is no Notion access token, redirect to the error page
            if (!notion_access_token) return NextResponse.redirect(`${origin}${ERROR_URL}?message=${encodeURIComponent('No Notion access token found')}`);

            // Update the user's identity with the Notion access token
            const sbAdmin = await sbAdminClient();
            const { error: updateError } = await sbAdmin.auth.admin.updateUserById(user.id, {
                app_metadata: {notion_access_token},
            });

            if (updateError) return NextResponse.redirect(`${origin}${ERROR_URL}?message=${encodeURIComponent("Can't save Notion access token")}`);

            // Redirect the user to the next page
            const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
            // eslint-disable-next-line turbo/no-undeclared-env-vars
            const isLocalEnv = process.env.NODE_ENV === 'development';
            if (isLocalEnv) {
                // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        } else {
            // if there is an error, log it and return to the error page
            const response = NextResponse.redirect(`${origin}${ERROR_URL}?message=${encodeURIComponent(error.message)}`);
            response.headers.set('X-Error-Message', error.message);
            response.headers.set('X-Error-Code', error.code || 'unknown');
            return response;
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}