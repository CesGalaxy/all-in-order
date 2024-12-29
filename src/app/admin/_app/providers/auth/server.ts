"use server";

import authProvider from "@/app/admin/_app/providers/auth/index";
import { createSupabaseServerClient } from "@/supabase/server";

export default async function authProviderServer() {
    const supabaseClient = await createSupabaseServerClient();
    return authProvider(() => supabaseClient);
}