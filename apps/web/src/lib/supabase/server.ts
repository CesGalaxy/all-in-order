"use server";

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { type Database } from "@/lib/supabase/database.types";
import { createClient } from "@supabase/supabase-js";
import "server-only";

export async function sbServerClient() {
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
                        console.error("FUck")
                    }
                },
            },
            // auth: {
            //     debug: (msg, ...args) => {
            //         console.log(args[0]);
            //         if (args[0] === "#_recoverAndRefresh()") {
            //             console.log("Supabase auth debug:", msg, ...args);
            //         }
            //     }
            // }
        }
    );
}

export async function sbAdminClient() {
    return createClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
            },
        }
    );
}
