"use server";

import getNotebookNotes from "@/app/(app)/topics/[topicId]/notebook/_feature/cache/getNotebookNotes";
import ErrorView from "@/components/views/ErrorView";
import required from "@/lib/helpers/required";
import PageContainer from "@/components/containers/PageContainer";
import NbNotesPageNavbar
    from "@/app/(app)/topics/[topicId]/notebook/(studio)/notes/_feature/components/organisms/NbNotesPageNavbar";
import ContentGallery from "@/components/navigation/ContentGallery";
import BlankView from "@/components/views/BlankView";
import AddNotesPicture from "@/assets/pictures/add_notes.svg";

export default async function Page({ params }: { params: Promise<{ topicId: string }> }) {
    const { topicId } = await params;
    const topicPath = "/topics/" + topicId

    const { data, error } = await getNotebookNotes(topicId);
    if (error) return <ErrorView message={error.message}/>
    const { notes } = required(data, topicPath);

    return <PageContainer>
        <NbNotesPageNavbar/>
        <ContentGallery
            items={notes}
            getItemKey={note => note.id}
            renderItem={note => <div>{note.content}</div>}
            emptyView={<div className="p-32">
                <BlankView
                    image={AddNotesPicture}
                    alt="No notes"
                    title={"There are no notes - yet!"}
                    content="Start creating from the button at the top right corner"/>
            </div>}
        />
    </PageContainer>
}