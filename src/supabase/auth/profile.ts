"use server";

import { cache } from "react";
import { getMaybeUser } from "@/supabase/auth/user";
import getSupabase from "@/supabase/server";
import required from "@/lib/helpers/required";
import { Profile } from "@aio/db/entities";

export const getMyProfile = cache(async (redirectPath = "/login") => required(await getMaybeMyProfile(), redirectPath));

export const getMaybeMyProfile = cache(async (): Promise<Profile | null> => {
    const user = await getMaybeUser();
    if (!user) return null;
    return await getProfileByUser(user.id);
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

export const getProfileByUser = cache(async (user_id: string): Promise<Profile | null> => {
    const supabaseClient = await getSupabase();
    const { data } = await supabaseClient
        .from("profiles")
        .select()
        .eq("user_id", user_id)
        .single();

    return data;
});
