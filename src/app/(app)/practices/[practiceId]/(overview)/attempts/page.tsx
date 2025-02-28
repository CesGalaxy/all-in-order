"use server";

import PageContainer from "@/components/containers/PageContainer";
import getSupabase from "@/lib/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import SimpleAttemptsTable from "@/app/(app)/practices/[practiceId]/(overview)/_components/SimpleAttemptsTable";

export default async function Page({ params }: { params: Promise<{ practiceId: string }> }) {
    const { practiceId } = await params;

    // TODO: Add loading state
    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .from("practices")
        .select("id, attempts:practice_attempts(id, perfection, started_at, ended_at)")
        .order("started_at", { referencedTable: 'practice_attempts', ascending: true })
        .limit(10, { referencedTable: 'practice_attempts' })
        .eq("id", parseInt(practiceId))
        .maybeSingle();

    if (error) return <ErrorView message={error.message}/>;

    const { id, attempts } = required(data);

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
        <SimpleAttemptsTable practiceId={id} attempts={attemptsRows} {...{ averagePerfection, averageDuration }}/>
    </PageContainer>
}