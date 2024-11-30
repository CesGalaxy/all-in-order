"use server";

import PageContainer from "@/components/containers/Page";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import PracticeDetailsCard from "@/app/practices/[practiceId]/(overview)/_components/PracticeDetailsCard";
import SimpleAttemptsTable from "@/app/practices/[practiceId]/(overview)/_components/SimpleAttemptsTable";

export default async function Page({ params: { practiceId } }: { params: { practiceId: string } }) {
    const { data, error } = await getSupabase()
        .from("practices")
        .select("*, topic:topics(id, title), author:profiles(id, name, avatar_url), attempts:practice_attempts(id, perfection, started_at, ended_at)")
        .order("started_at", { referencedTable: 'practice_attempts', ascending: true })
        .limit(10, { referencedTable: 'practice_attempts' })
        .eq("id", practiceId)
        .maybeSingle();

    if (error) return <ErrorView message={error.message}/>;

    const { id, title, description, topic, author, created_at, updated_at, attempts } = required(data);

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

    return <PageContainer>
        <header className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <PracticeDetailsCard {...{
                id,
                title,
                description,
                attemptsCount,
                averagePerfection,
                averageDuration,
                created_at,
                author,
                topic: topic!
            }}/>
            <aside className=""></aside>
        </header>
        <br/>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3">
            <SimpleAttemptsTable practiceId={id} attempts={attemptsRows} {...{ averagePerfection, averageDuration }}/>
        </div>
    </PageContainer>
}