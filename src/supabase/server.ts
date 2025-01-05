"use server";

import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Database } from "@aio/db/supabase";

const getSupabase = cache(createSupabaseServerClient);

export async function createSupabaseServerClient(forceNoCache: boolean = false) {
    const cookieStore = await cookies();

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
            global: forceNoCache ? {
                fetch: createFetch({
                    cache: "no-store",
                    next: {
                        revalidate: 0,
                    }
                }),
            } : undefined,
        }
    )
}

const createFetch = (options: Pick<RequestInit, "next" | "cache">) =>
    (url: RequestInfo | URL, init?: RequestInit) => fetch(
        typeof url === "string" ? (url + (url.includes("?") ? "&" : "?") + "noCacheVersion=" + Date.now()) : url, {
            ...init,
            ...options,
        });

export default getSupabase;