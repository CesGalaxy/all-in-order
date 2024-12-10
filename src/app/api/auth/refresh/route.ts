import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    )
                },
            },
        }
    )

    // refreshing the auth token
    await supabase.auth.getUser()

    cookieStore.set("AIO_USER_REFRESHED", Date.now().toString(), {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
    });

    // Return a JSON response
    return NextResponse.json({ message: "Refreshed token" });
}