"use server";

import PageContainer from "@/components/containers/PageContainer";
import getSupabase from "@/lib/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ topicId: string }> }) {
    const { topicId } = await params;

    const sb = await getSupabase();
    const { data, error } = await sb.from('topics').select().eq('id', parseInt(topicId)).maybeSingle();

    if (error) return <ErrorView message={error.message}/>;
    if (!data) return notFound();

    return <PageContainer>
        <h1 className="text-3xl font-semibold">{data.title}</h1>
        <p>
            This is a resume page. It should contain information about the user resume.
        </p>
    </PageContainer>;
}