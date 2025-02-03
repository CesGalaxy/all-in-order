"use server";

import type { ReactNode } from "react";
import getTopicData from "@/app/(app)/topics/[topicId]/(hub)/query";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import TopicSidebar from "@/app/(app)/topics/[topicId]/(hub)/_components/navigation/TopicSidebar";

export default async function Layout({ children, params }: {
    children: ReactNode,
    params: Promise<{ topicId: string }>
}) {
    const { topicId } = await params;

    const dbRequest = getTopicData(parseInt(topicId));

    const { data, error } = await dbRequest;
    if (error) return <ErrorView message={error.message}/>;
    const { id, title, description } = required(data, false);

    // Note: it works, don't touch it
    return <div className="w-full grow flex flex-col lg:flex-row p-2 md:p-4 lg:pr-8 gap-x-4 gap-y-8">
        <aside className="w-full lg:w-fit lg:max-w-96 lg:pr-8 sticky top-24 h-min">
            <TopicSidebar topicId={id} topicTitle={title} topicDescription={description}/>
        </aside>
        <div className="w-full lg:min-h-full grow bg-content2 text-content2-foreground rounded-xl z-10">
            {children}
        </div>
    </div>;
}