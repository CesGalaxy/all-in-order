import required from "@/lib/helpers/required";
import { getAllTopicDocuments } from "@/supabase/storage/topic_documents";
import { getTranslations } from "next-intl/server";
import getSupabase from "@/supabase/server";
import ErrorView from "@/components/views/ErrorView";
import { getMyProfile } from "@/supabase/auth/Profile";
import { redirect } from "next/navigation";
import getTopicData from "@/app/topics/[topicId]/(hub)/_feature/queries/getTopicData";
import TopicRecentPracticesSection
    from "@/app/topics/[topicId]/(hub)/_feature/components/organisms/TopicRecentPracticesSection";
import TopicRecentDocsSection from "@/app/topics/[topicId]/(hub)/_feature/components/organisms/TopicRecentDocsSection";
import PageContainer from "@/components/containers/Page";

export default async function Page({ params: { topicId } }: { params: { topicId: string } }) {
    // Fetch the topic data, documents, and translations
    const dbRequest = getTopicData(parseInt(topicId));
    const docsRequest = getAllTopicDocuments(parseInt(topicId));
    const tRequest = getTranslations();

    // Handle the received topic data
    const { data, error } = await dbRequest;
    if (error) return <ErrorView message={error.message}/>;
    const { practices, ...topic } = required(data);

    // Handle the received documents
    const docs = required(await docsRequest, "/topic/" + topic.id);

    async function createPracticeAction(title: string, description: string) {
        "use server";

        const { id } = await getMyProfile();

        const { data, error } = await getSupabase()
            .from("practices")
            .insert({ topic_id: topic.id, title, description, created_by: id })
            .select("id")
            .maybeSingle();

        if (error) return error.message;

        redirect("/practices/" + data!.id);
    }

    const t = await tRequest;

    return <PageContainer className="flex-grow flex flex-col xl:flex-row items-stretch gap-8">
        <TopicRecentPracticesSection
            practices={practices}
            createPracticeAction={createPracticeAction}
            topicId={topic.id}
        />
        <TopicRecentDocsSection docs={docs} topicId={topic.id}/>
    </PageContainer>;
}