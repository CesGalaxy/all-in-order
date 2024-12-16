"use server";

import type { ReactNode } from "react";
import NotebookSidebar from "@/app/topics/[topicId]/notebook/_feature/components/navigation/NotebookSidebar";
import getNotebook from "@/app/topics/[topicId]/notebook/_feature/cache/getNotebook";
import ErrorView from "@/components/views/ErrorView";
import NotebookProvider from "@/app/topics/[topicId]/notebook/_feature/reactivity/providers/NotebookProvider";
import { getUser } from "@/supabase/auth/user";

export default async function Layout({ params, children, aside }: Readonly<{
    params: Promise<{ topicId: string }>,
    children: ReactNode,
    aside: ReactNode
}>) {
    const { topicId } = await params;
    const nb = await getNotebook(topicId);

    if ("error" in nb) return <ErrorView message={"Unknown error @ " + nb.error}>
        <pre className="bg-slate-800 mt-4 max-w-3xl text-wrap rounded-xl py-2 px-4 text-danger-400 shadow-xl">
            {JSON.stringify(nb.errorData, null, 2)}
        </pre>
    </ErrorView>;

    const user = await getUser();
    const { data, files } = nb;

    return <NotebookProvider topicId={parseInt(topicId)} initialPages={files} initialData={data} userId={user.id}>
        <div className="flex w-full h-full flex-grow">
            <NotebookSidebar/>
            <div className="flex-grow overflow-auto flex flex-col bg-content2">
                <div className="bg-background rounded-bl-3xl flex-grow">
                    {children}
                </div>
                {/* Footer will go here */}
            </div>
            {aside}
        </div>
    </NotebookProvider>
}