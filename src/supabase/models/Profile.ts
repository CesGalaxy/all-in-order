"use server";

import { cache } from "react";
import { getMaybeUser } from "@/lib/helpers/user";
import { Tables } from "@/supabase/database";
import getSupabase from "@/supabase/server";
import required from "@/lib/helpers/required";

export type Profile = Tables<"profiles">

export const getMyProfile = cache(async (redirectPath = "/login") => required(await getMaybeMyProfile(), redirectPath));

export const getMaybeMyProfile = cache(async (): Promise<Profile | null> => {
    const user = await getMaybeUser();
    if (!user) return null;
    return await getProfileByUserId(user.id);
});

// export const getProfileById = cache(async (id: number): Promise<Profile | null> => {
//     const { data } = await getSupabase()
//         .from("profiles")
//         .select()
//         .eq("id", id)
//         .single();
//
//     return data;
// });

export const getProfileByUserId = cache(async (user_id: string): Promise<Profile | null> => {
    const { data } = await getSupabase()
        .from("profiles")
        .select()
        .eq("user_id", user_id)
        .single();

    return data;
});
