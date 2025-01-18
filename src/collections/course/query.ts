import { cache } from "react";
import getSupabase from "@/lib/supabase/server";
import { getMyProfile } from "@/lib/supabase/auth/profile";

export const getAllMyCourses = cache(async () => {
    const profile = await getMyProfile();
    const supabaseClient = await getSupabase();
    return supabaseClient
        .from("courses")
        .select("id, name, description, is_public, subjects(id, name, color, topics(id, title)), members:course_members(profile, is_admin)")
        .eq("course_members.profile", profile.id);
})