"use server";

import getTopicData from "@/app/topics/[topicId]/(hub)/_feature/queries/getTopicData";
import TopicSettingsForm from "@/app/topics/[topicId]/(hub)/settings/form";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import PageContainer from "@/components/containers/Page";

export default async function Page({ params: { topicId } }: { params: { topicId: string } }) {
    const { data, error } = await getTopicData(parseInt(topicId));

    if (error) return <ErrorView message={error.message}/>;
    const { practices, ...topic } = required(data);

    return <PageContainer>
        <h1 className="font-bold text-3xl mb-4">Edit topic</h1>
        <TopicSettingsForm topic={topic}/>
    </PageContainer>;
}