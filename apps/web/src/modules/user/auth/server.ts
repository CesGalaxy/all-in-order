"use server";

import { cache } from "react";
import { sbServerClient } from "@/lib/supabase/server";
import { AuthError } from "@supabase/supabase-js";

export const getMyProfile = cache(async () => {
    const sb = await sbServerClient();
    const user = await sb.auth.getUser();

    if (user.error) return { data: null, user: null, error: user.error } as {data: null, user: null, error: AuthError};

    const query = await sb.from("profiles").select("*").eq("id", user.data.user.id).single();

    return { user: user.data.user, ...query };
})