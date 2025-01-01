"use server";

import NotebookIndex from "@/app/(app)/topics/[topicId]/notebook/_feature/components/navigation/NotebookIndex";
import getNotebook from "@/app/(app)/topics/[topicId]/notebook/_feature/cache/getNotebook";
import ErrorView from "@/components/views/ErrorView";

export default async function Page({ params }: { params: Promise<{ topicId: number }> }) {
    const { topicId } = await params;

    const nb = await getNotebook(topicId)

    if ("error" in nb) return <ErrorView message={"Unknown error: " + nb.error}/>;
    const { files } = nb;

    return <div className="w-full h-full flex-grow overflow-auto flex items-center justify-center">
        <NotebookIndex files={files!}/>
    </div>
}