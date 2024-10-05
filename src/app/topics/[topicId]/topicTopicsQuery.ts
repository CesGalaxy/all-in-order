import { cache } from "react";
import getSupabase from "@/supabase/server";

export default cache(async (topicId: number) => getSupabase()
    .from("topics")
    .select("*, subject:subjects(id, name, course:courses(id, name)), practices(*, activities:topic_activities(count), attempts:practice_attempts(perfection))")
    .limit(10, { referencedTable: 'practices.practice_attempts' })
    .eq("id", topicId)
    .maybeSingle());