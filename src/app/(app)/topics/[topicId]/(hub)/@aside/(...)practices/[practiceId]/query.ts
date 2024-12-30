import getSupabase from "@/supabase/server";
import { cache } from "react";
import { getMyProfile } from "@/supabase/auth/profile";

export const getTopicAsidePractice = cache(async (practiceId: string | number) => {
    const profile = await getMyProfile();
    const supabaseClient = await getSupabase();
    return supabaseClient
        .from("practices")
        .select("id, title, topic_id, activities:topic_activities(*), attempts:practice_attempts(*)")
        .eq("id", Number(practiceId))
        .eq("attempts.profile_id", profile.id)
        .maybeSingle();
});