"use server";

import getNotebookNotes from "@/modules/notebook/app/cache/getNotebookNotes";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import PageContainer from "@/components/containers/PageContainer";
import NbNotesPageNavbar from "@/modules/notebook/notes/components/organisms/NbNotesPageNavbar";
import NotebookNotesProvider from "@/modules/notebook/notes/reactivity/providers/NotebookNotesProvider";
import NotebookNotesGallery from "@/modules/notebook/notes/components/data/NotebookNotesGallery";

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