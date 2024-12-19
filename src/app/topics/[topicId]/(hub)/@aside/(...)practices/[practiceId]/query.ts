import getSupabase from "@/supabase/server";
import { cache } from "react";

export const getTopicAsidePractice = cache(async (practiceId: string | number) => {
    const supabaseClient = await getSupabase();
    return await supabaseClient
        .from("practices")
        .select("id, title, topic_id, activities:topic_activities(*)")
        .eq("id", practiceId)
        .maybeSingle();
});