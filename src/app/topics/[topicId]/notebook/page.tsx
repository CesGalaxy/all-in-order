"use server";

import NotebookIndex from "@/app/topics/[topicId]/notebook/_feature/components/navigation/NotebookIndex";
import getNotebook from "@/app/topics/[topicId]/notebook/_feature/cache/getNotebook";
import ErrorView from "@/components/views/ErrorView";

export default async function Page({ params }: { params: Promise<{ topicId: number }> }) {
    const { topicId } = await params;

    const { files, error } = await getNotebook(topicId)

    if (error) return <ErrorView message={"Unknown error:" + error}/>;

    return <div className="w-full h-full flex-grow overflow-auto flex items-center justify-center">
        <NotebookIndex files={files!}/>
    </div>
}