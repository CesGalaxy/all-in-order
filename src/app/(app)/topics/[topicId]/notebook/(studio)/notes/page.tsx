"use server";

import getNotebookNotes from "@/app/(app)/topics/[topicId]/notebook/_feature/cache/getNotebookNotes";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import PageContainer from "@/components/containers/PageContainer";
import NbNotesPageNavbar
    from "@/app/(app)/topics/[topicId]/notebook/(studio)/notes/_feature/components/organisms/NbNotesPageNavbar";
import NotebookNotesProvider
    from "@/app/(app)/topics/[topicId]/notebook/(studio)/notes/_feature/reactivity/providers/NotebookNotesProvider";
import NotebookNotesGallery
    from "@/app/(app)/topics/[topicId]/notebook/(studio)/notes/_feature/components/data/NotebookNotesGallery";

export default async function Page({ params }: { params: Promise<{ topicId: string }> }) {
    const { topicId } = await params;
    const topicPath = "/topics/" + topicId

    const { data, error } = await getNotebookNotes(topicId);
    if (error) return <ErrorView message={error.message}/>
    const { notes } = required(data, topicPath);

    return <NotebookNotesProvider notes={notes}>
        <PageContainer>
            <NbNotesPageNavbar/>
            <NotebookNotesGallery/>
        </PageContainer>
    </NotebookNotesProvider>
}