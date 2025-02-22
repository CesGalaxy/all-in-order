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
    return <div className="w-full grow flex flex-col">
        <aside className="w-full sticky top-0 z-20 border-b border-b-divider">
            <TopicSidebar topicId={id} topicTitle={title} topicDescription={description}/>
        </aside>
        <div className="w-full min-h-full grow bg-content2 text-content2-foreground rounded-xl flex flex-col">
            {children}
        </div>
    </div>;
}