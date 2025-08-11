"use server";

import { cache } from "react";
import { sbServerClient } from "@/lib/supabase/server";
import { AuthError } from "@supabase/supabase-js";

export const getMyUser = cache(async () => {
    console.log("CALLED getMyUser");
    const sb = await sbServerClient();
    return sb.auth.getUser();
});

export const getMyProfile = cache(async () => {
    console.log("CALLED getMyProfile");
    const sb = await sbServerClient();
    const user = await getMyUser();

    if (user.error) return { data: null, user: null, error: user.error } as {data: null, user: null, error: AuthError};

    const query = await sb.from("profiles").select("*").eq("id", user.data.user.id).single();

    return { user: user.data.user, ...query };
});

export const getMyIdentities = cache(async () => {
    const sb = await sbServerClient();
    return await sb.auth.getUserIdentities();
});