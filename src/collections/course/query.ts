import { cache } from "react";
import getSupabase from "@/lib/supabase/server";
import { getMyProfile } from "@/lib/supabase/auth/profile";

const COURSE_QUERY = "id, name, description, is_public, subjects(id, name, color, topics(id, title)), members:course_members(profile, is_admin)";

export const getAllMyCourses = cache(async () => {
    const profile = await getMyProfile();
    const supabaseClient = await getSupabase();
    return supabaseClient
        .from("courses")
        .select(COURSE_QUERY)
        .eq("course_members.profile", profile.id);
});

export const getAllPublicCourses = cache(async () => {
    const supabaseClient = await getSupabase();
    return supabaseClient
        .from("courses")
        .select(COURSE_QUERY)
        .eq("is_public", true);
});

export const getAllCourses = cache(async () => {
    const supabaseClient = await getSupabase();
    return supabaseClient
        .from("courses")
        .select(COURSE_QUERY);
});

export const getCourse = cache(async (courseId: number) => {
    const supabaseClient = await getSupabase();
    return supabaseClient
        .from("courses")
        .select("id, name, description, is_public, updated_at, created_at, subjects(id, name, color, topics(id, title))")
        .eq("id", courseId)
        .maybeSingle();
})

export const getCourseMembers = cache(async (courseId: number) => {
    const supabaseClient = await getSupabase();
    return supabaseClient
        .from("course_members")
        .select("profile:profiles(id, name, username), is_admin, created_at")
        .eq("course", courseId);
})