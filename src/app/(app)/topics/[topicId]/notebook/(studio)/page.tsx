"use server";

import NotebookIndex from "@/modules/notebook/pages/components/navigation/NotebookIndex";
import getNotebook from "@/modules/notebook/app/cache/getNotebook";
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