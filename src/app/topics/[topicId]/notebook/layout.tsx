"use server";

import type { ReactNode } from "react";
import NotebookSidebar from "@/app/topics/[topicId]/notebook/_feature/components/navigation/NotebookSidebar";
import getNotebook from "@/app/topics/[topicId]/notebook/_feature/cache/getNotebook";
import ErrorView from "@/components/views/ErrorView";
import NotebookProvider from "@/app/topics/[topicId]/notebook/_feature/reactivity/providers/NotebookProvider";


export default async function Layout({ params, children }: Readonly<{
    params: Promise<{ topicId: string }>,
    children: ReactNode
}>) {
    const { topicId } = await params;
    const { error, files } = await getNotebook(topicId);

    if (error) return <ErrorView message={"Unknown error:" + error}/>;

    console.log("[Server] Files:", files?.map(file => file.name));

    return <NotebookProvider topicId={topicId} initialPages={files}>
        <div className="flex w-full h-full flex-grow">
            <NotebookSidebar/>
            <div className="flex-grow overflow-auto flex flex-col bg-content2">
                <div className="bg-background rounded-bl-3xl flex-grow">
                    {children}
                </div>
                {/* Footer will go here */}
            </div>
        </div>
    </NotebookProvider>
}