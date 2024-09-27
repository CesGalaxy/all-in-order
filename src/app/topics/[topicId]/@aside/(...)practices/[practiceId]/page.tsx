"use server";

import getSupabase from "@/supabase/server";
import AsideModalContainer from "@/components/containers/AsideModal";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import NoPracticeActivities from "@/collections/practiceActivity/NoPracticeActivities";

export default async function Page({ params: { topicId, practiceId } }: {
    params: { topicId: string, practiceId: string }
}) {
    const { data, error } = await getSupabase()
        .from("practices")
        .select("*, activities:topic_activities(*)")
        .eq("id", parseInt(practiceId))
        .maybeSingle();

    const topicPath = "/topics/" + topicId;

    if (error) return <AsideModalContainer closeUrl={topicPath}>
        <ErrorView message={error.message}/>
    </AsideModalContainer>;

    const { activities, id, title } = required(data, topicPath);

    return <AsideModalContainer title={title} className="sm:w-1/2">
        {activities.length === 0
            ? <NoPracticeActivities practiceId={id}/>
            : <p>hello world!</p>}
    </AsideModalContainer>;
}