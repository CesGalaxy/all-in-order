"use server";

import { getTranslations } from "next-intl/server";
import SectionContainer from "@/components/containers/SectionContainer";
import getNotebookNotes from "@/modules/notebook/app/cache/getNotebookNotes";
import { Suspense } from "react";
import LoadingSpinnerPage from "@/components/pages/LoadingSpinnerPage";
import ErrorView from "@/components/views/ErrorView";
import ContentGallery from "@/components/navigation/ContentGallery";
import NbNoteCard from "@/modules/notebook/notes/components/molecules/NbNoteCard";
import BlankView from "@/components/views/BlankView";
import AddNotesPicture from "@/assets/pictures/add_notes.svg";

export default async function TopicRecentNotesSection({ topicId }: { topicId: number }) {
    const t = await getTranslations();


    return <SectionContainer
        expanded
        title={t("App.notes")}
        className="w-full"
        // trailing={}
    >
        <Suspense fallback={<LoadingSpinnerPage/>}><Data topicId={topicId}/></Suspense>
    </SectionContainer>;
}

async function Data({ topicId }: { topicId: number }) {
    const { data, error } = await getNotebookNotes(topicId);

    if (error) return <ErrorView message={error.message}/>;

    return <ContentGallery
        className="grid grid-cols-5 gap-4"
        items={data?.notes}
        getItemKey={note => note.id}
        renderItem={note => <NbNoteCard note={note}/>}
        emptyView={<div className="p-32">
            <BlankView
                image={AddNotesPicture}
                alt="No notes"
                title={"There are no notes - yet!"}
                content="Start creating from the button at the top right corner"/>
        </div>}
    />;
}
