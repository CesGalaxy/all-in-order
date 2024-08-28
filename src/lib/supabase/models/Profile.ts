"use server";

import { cache } from "react";
import { getMaybeUser, getUser } from "@/lib/helpers/user";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default interface Profile {
    id: number;
    user_id: string;
    name: string;
    username: string;
    avatar_url?: string;
    updated_at: string;
    created_at: string;
}

export const getMyProfile = cache(async (redirectPath = "/login") => await getMaybeMyProfile() || redirect(redirectPath));

export const getMaybeMyProfile = cache(async (): Promise<Profile | null> => {
    const user = await getMaybeUser();

    if (!user) return null;

    const client = createSupabaseServerClient();

    const { data } = await client
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

    return data;
})
