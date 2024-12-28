import { cache } from "react";
import getSupabase from "@/supabase/server";

export const getSubjectPageData = cache(async (subjectId: string) => {
    const supabaseClient = await getSupabase();
    return await supabaseClient
        .from("subjects")
        .select("id, name, description, topics(id, title, description), notes:subject_notes(*)")
        .eq("id", parseInt(subjectId))
        .maybeSingle();
})