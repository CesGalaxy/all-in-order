import { NextRequest, NextResponse } from 'next/server'
import { notionAuthCallback, notionMCPAuthCallback } from "@/modules/integrations/notion/callback";

export async function GET(request: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
    const { provider } = await params;
    const { searchParams, origin } = new URL(request.url);

    // if "next" is in param, use it as the redirect URL (only relative paths allowed)
    let next = searchParams.get('next') ?? '/'
    if (!next.startsWith('/')) next = '/';

    switch (provider) {
        case "notion":
            return await notionAuthCallback(request, next, searchParams);
        case "notion-mcp":
            return await notionMCPAuthCallback(request, searchParams);
        default:
            // return the user to an error page with instructions
            return NextResponse.redirect(`${origin}/auth/auth-code-error?message=${encodeURIComponent("Unknown provider")}`)
    }
}