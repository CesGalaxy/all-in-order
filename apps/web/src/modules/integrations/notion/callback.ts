"use server";

import { sbAdminClient, sbServerClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_CALLBACK_ERROR_URL } from "@/app/auth/callback/[provider]/route";
import { exchangeNotionMCPCodeForToken } from "@/modules/integrations/notion/ai/oauth";
import { cookies } from "next/headers";

export async function notionAuthCallback(request: NextRequest, next: string, searchParams: URLSearchParams) {
    const code = searchParams.get('code');
    if (code) {
        const supabase = await sbServerClient()
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            // Get the Notion access token from the session
            const { session, user } = data;
            const notion_access_token = session?.provider_token;

            // if there is no Notion access token, redirect to the error page
            if (!notion_access_token) return NextResponse.redirect(`${origin}${AUTH_CALLBACK_ERROR_URL}?message=${encodeURIComponent('No Notion access token found')}`);

            // Update the user's identity with the Notion access token
            const sbAdmin = await sbAdminClient();
            const { error: updateError } = await sbAdmin.auth.admin.updateUserById(user.id, {
                app_metadata: {notion_access_token},
            });

            if (updateError) return NextResponse.redirect(`${origin}${AUTH_CALLBACK_ERROR_URL}?message=${encodeURIComponent("Can't save Notion access token")}`);

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
            const response = NextResponse.redirect(`${origin}${AUTH_CALLBACK_ERROR_URL}?message=${encodeURIComponent(error.message)}`);
            response.headers.set('X-Error-Message', error.message);
            response.headers.set('X-Error-Code', error.code || 'unknown');
            return response;
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

export async function notionMCPAuthCallback(request: NextRequest, searchParams: URLSearchParams) {
    const code = searchParams.get('code');

    if (!code) return NextResponse.redirect(`${origin}${AUTH_CALLBACK_ERROR_URL}?message=${encodeURIComponent('No code found')}`);

    const token = await exchangeNotionMCPCodeForToken(code);
    console.log("TOKEN ==============");
    console.log(token);

    const cookieStore = await cookies();
    cookieStore.set('nt-mcp-token', token.access_token, { path: '/' });

    const state = searchParams.get('state');
    const redirectTo = state ? decodeURIComponent(state) : `${origin}/`;

    return NextResponse.redirect(`${redirectTo}`);
}