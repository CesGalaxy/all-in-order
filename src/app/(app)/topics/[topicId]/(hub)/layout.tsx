"use server";

import type { ReactNode } from "react";
import getTopicData from "@/app/(app)/topics/[topicId]/(hub)/query";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import TopicSidebar from "@/app/(app)/topics/[topicId]/(hub)/_components/navigation/TopicSidebar";
import { AnimatePresence } from "framer-motion";

export default async function Layout({ children, params }: {
    children: ReactNode,
    params: Promise<{ topicId: string }>
}) {
    // FIXME: This doesn't work with the intercepted route if it doesn't have the segment on it
    const p = await params;
    const { topicId } = p;
    console.log("LAYOUT:", p);

    const dbRequest = getTopicData(parseInt(topicId));

    const { data, error } = await dbRequest;
    if (error) return <ErrorView message={error.message}>
        <p>TOPIC ID: {topicId}</p>
    </ErrorView>;
    const { id, title, description } = required(data);

    // Note: it works, don't touch it
    return <div className="w-full flex flex-col lg:flex-row p-2 md:p-4 lg:p-8 gap-x-4 gap-y-8">
        <aside className="w-full lg:w-1/4 lg:max-w-96 lg:min-w-48 sticky top-24 h-min">
            <TopicSidebar topicId={id} topicTitle={title} topicDescription={description}/>
        </aside>
        <div className="w-full flex-grow bg-content2 text-content2-foreground rounded-xl relative">
            <AnimatePresence>
                {children}
            </AnimatePresence>
        </div>

    </div>;
}