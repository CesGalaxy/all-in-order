"use server";

import PageContainer from "@/components/containers/PageContainer";
import getSupabase from "@/lib/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import { getMyProfile } from "@/lib/supabase/auth/profile";
import { notFound } from "next/navigation";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default async function Page({ params }: { params: Promise<{ practiceId: string, attemptId: string }> }) {
    const { practiceId, attemptId } = await params;

    const profile = await getMyProfile();
    const supabaseClient = await getSupabase();
    const { data, error } = await supabaseClient
        .from("practice_attempts")
        .select("id, practice:practice_id(id, topic:topics(id, title)), perfection, started_at, ended_at")
        .eq("id", parseInt(attemptId))
        .eq("practice.id", practiceId)
        .eq("profile_id", profile.id)
        .maybeSingle();

    if (error) return <ErrorView message={error.message}/>;
    if (!data) return notFound();
    const { perfection, practice: { topic } } = data;
    const duration = (new Date(data.ended_at).getTime() - new Date(data.started_at).getTime()) / 1000;
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;

    return <PageContainer className="h-full flex-grow flex flex-col items-center justify-center gap-4">
        <h1 className="text-9xl font-bold">{perfection}%</h1>
        <Divider/>
        <p className="text-3xl">{minutes}m {seconds}s</p>
        <Divider/>
        <nav className="flex items-center justify-center gap-4">
            <Button as={Link} href={`/topics/${topic.id}`} size="lg" color="primary">Back to topic</Button>
            <Button as={Link} href={`/practices/${practiceId}`} size="lg">Practice details</Button>
        </nav>
    </PageContainer>
}