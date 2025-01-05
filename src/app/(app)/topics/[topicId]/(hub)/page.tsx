"use server";

import required from "@/lib/helpers/required";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import { getMyProfile } from "@/supabase/auth/profile";
import { redirect } from "next/navigation";
import getTopicData from "@/app/(app)/topics/[topicId]/(hub)/query";
import TopicRecentPracticesSection
    from "@/app/(app)/topics/[topicId]/(hub)/_components/templates/TopicRecentPracticesSection";
import PageContainer from "@/components/containers/PageContainer";
import getTopicDocuments from "@/supabase/storage/query/getTopicDocuments";
import TopicRecentDocsSection from "@/app/(app)/topics/[topicId]/(hub)/_components/templates/TopicRecentDocsSection";

interface Params {
    topicId: string;
}

interface SearchParams {
    practicesOrderBy?: string;
    docsOrderBy?: string;
}

export default async function Page({ params, searchParams }: {
    params: Promise<Params>,
    searchParams: Promise<SearchParams>
}) {
    const { topicId } = await params;

    // Fetch the topic data, documents, and translations
    const dbRequest = getTopicData(parseInt(topicId));
    const docsRequest = getTopicDocuments(parseInt(topicId));

    // Handle the received topic data
    const { data, error } = await dbRequest;
    if (error) return <ErrorView message={error.message}/>;
    const { practices, ...topic } = required(data, false);

    // Handle the received documents
    const { privateError, privateData, publicError, publicData } = await docsRequest;
    if (privateError || publicError) return <ErrorView message={privateError?.message || publicError?.message}/>;

    async function createPracticeAction(title: string, description: string) {
        "use server";

        const { id } = await getMyProfile();

        const supabaseClient = await getSupabase();
        const { data, error } = await supabaseClient
            .from("practices")
            // Idea for deltaX: suggest using topicId, so it doesn't have to wait for dbRequest before creating the function
            .insert({ topic_id: topic.id, title, description, created_by: id })
            .select("id")
            .maybeSingle();

        if (error) return error.message;

        redirect("/practices/" + data!.id);
    }

    return <PageContainer className="flex-grow flex flex-col xl:flex-row items-stretch gap-8">
        <TopicRecentPracticesSection
            practices={practices}
            createPracticeAction={createPracticeAction}
            topicId={topic.id}
        />
        <TopicRecentDocsSection privDocs={privateData as any[]} pubDocs={publicData as any[]} topicId={topic.id}/>
    </PageContainer>;
}