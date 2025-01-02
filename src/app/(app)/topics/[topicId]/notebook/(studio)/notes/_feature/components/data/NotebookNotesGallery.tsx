"use client";

import useNotebookNotes
    from "@/app/(app)/topics/[topicId]/notebook/(studio)/notes/_feature/reactivity/hooks/useNotebookNotes";
import BlankView from "@/components/views/BlankView";
import AddNotesPicture from "@/assets/pictures/add_notes.svg";
import ContentGallery from "@/components/navigation/ContentGallery";
import NbNoteCard from "@/app/(app)/topics/[topicId]/notebook/(studio)/notes/_feature/components/molecules/NbNoteCard";

export default function NotebookNotesGallery() {
    const { filteredNotes } = useNotebookNotes();

    return <ContentGallery
        className="grid grid-cols-5 gap-4"
        items={filteredNotes}
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