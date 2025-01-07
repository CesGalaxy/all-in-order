"use server";

import PageContainer from "@/components/containers/PageContainer";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import PracticeDetailsCard from "@/app/(app)/practices/[practiceId]/(overview)/_components/PracticeDetailsCard";
import SimpleAttemptsTable from "@/app/(app)/practices/[practiceId]/(overview)/_components/SimpleAttemptsTable";
import PracticePageActivities from "@/app/(app)/practices/[practiceId]/(overview)/_components/PracticePageActivities";

const DATA = "id, title, description, created_at";
const TOPIC = "topic:topics(id, title)";
const AUTHOR = "author:profiles(id, name, avatar_url)";
const ATTEMPTS = "attempts:practice_attempts(id, perfection, started_at, ended_at)";
const ACTIVITIES = "activities:topic_activities(*)"

export default async function Page({ params }: { params: Promise<{ practiceId: string }> }) {
    const { practiceId } = await params;

    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .from("practices")
        .select(`${DATA}, ${TOPIC}, ${AUTHOR}, ${ATTEMPTS}, ${ACTIVITIES}`)
        .order("started_at", { referencedTable: 'practice_attempts', ascending: true })
        .limit(10, { referencedTable: 'practice_attempts' })
        .eq("id", parseInt(practiceId))
        .maybeSingle();

    if (error) return <ErrorView message={error.message}/>;

    const { id, title, description, topic, author, created_at, attempts, activities } = required(data);

    const attemptsCount = attempts.length;
    const averagePerfection = attempts
            .reduce((accumulator, attempt) => accumulator + attempt.perfection, 0)
        / attemptsCount;
    const averageDuration = attempts
            .reduce((accumulator, attempt) => accumulator + (new Date(attempt.ended_at).getTime() - new Date(attempt.started_at).getTime()), 0)
        / attemptsCount
        / 1000;

    const attemptsRows = attempts.map(attempt => ({
        id: attempt.id,
        score: attempt.perfection,
        date: new Date(attempt.started_at).getTime(),
        duration: (new Date(attempt.ended_at).getTime() - new Date(attempt.started_at).getTime()) / 1000
    }));

    return <PageContainer className="">
        <header className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
            <PracticeDetailsCard {...{
                id,
                title,
                description,
                attemptsCount,
                averagePerfection,
                averageDuration,
                created_at,
                author,
                topic: topic!,
                activities: activities as any,
            }}/>
            <aside className=""></aside>
        </header>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 -mx-2">
                <PracticePageActivities activities={activities as any}/>
            </div>
            <SimpleAttemptsTable practiceId={id} attempts={attemptsRows} {...{ averagePerfection, averageDuration }}/>
        </div>
    </PageContainer>
}