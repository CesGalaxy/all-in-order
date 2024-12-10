"use server";

import getTopicData from "@/app/topics/[topicId]/(hub)/query";
import TopicSettingsForm from "@/app/topics/[topicId]/(hub)/settings/form";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import PageContainer from "@/components/containers/PageContainer";

export default async function Page({ params }: { params: Promise<{ topicId: string }> }) {
    const { topicId } = await params;

    const { data, error } = await getTopicData(parseInt(topicId));

    if (error) return <ErrorView message={error.message}/>;
    const { practices, ...topic } = required(data);

    return <PageContainer>
        <h1 className="font-bold text-3xl mb-4">Edit topic</h1>
        <TopicSettingsForm topic={topic}/>
    </PageContainer>;
}