import { cache } from "react";
import getSupabase from "@/lib/supabase/server";

export const getSubjectWithContent = cache(async (subjectId: number) => {
    const supabaseClient = await getSupabase();
    return supabaseClient
        .from("subjects")
        .select("id, name, description, topics(id, title, description), notes:subject_notes(*)")
        .eq("id", subjectId)
        .maybeSingle();
})