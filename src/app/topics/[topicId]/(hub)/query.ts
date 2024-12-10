import { cache } from "react";
import getSupabase from "@/supabase/server";

const QUERY_SUBJECT = "subject:subjects(id, name, course:courses(id, name))";
const QUERY_PRACTICES = "practices(*, activities:topic_activities(count), attempts:practice_attempts(perfection))";

const getTopicData = cache(async (topicId: number) => {
    const supabaseClient = await getSupabase();
    return await supabaseClient
        .from("topics")
        .select(`*, ${QUERY_SUBJECT}, ${QUERY_PRACTICES}`)
        .limit(10, { referencedTable: 'practices.practice_attempts' })
        .eq("id", topicId)
        .maybeSingle()
});

export default getTopicData;