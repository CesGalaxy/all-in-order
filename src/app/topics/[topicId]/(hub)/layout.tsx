"use server";

import type { ReactNode } from "react";
import getTopicData from "@/app/topics/[topicId]/(hub)/_feature/queries/getTopicData";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import TopicSidebar from "@/app/topics/[topicId]/(hub)/_feature/components/navigation/TopicSidebar";

export default async function Layout({ children, aside, params: { topicId } }: {
    children: ReactNode,
    aside: ReactNode,
    params: { topicId: string }
}) {
    const dbRequest = getTopicData(parseInt(topicId));

    const { data, error } = await dbRequest;
    if (error) return <ErrorView message={error.message}/>;
    const { id, title, description } = required(data);

    return <div className="w-full h-full flex flex-col lg:flex-row p-2 md:p-4 lg:p-8 gap-4 overflow-y-auto">
        <aside className="w-full lg:h-full lg:w-1/4 lg:max-w-96 lg:min-w-48">
            <TopicSidebar topicId={id} topicTitle={title} topicDescription={description}/>
        </aside>
        <div className="w-full h-full flex-grow bg-content2 text-content2-foreground rounded-xl">
            {children}
        </div>
        {aside}
    </div>;
}