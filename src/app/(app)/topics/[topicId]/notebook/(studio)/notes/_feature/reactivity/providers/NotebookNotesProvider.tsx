"use client";

import { ReactNode, useCallback, useMemo, useOptimistic } from "react";
import NotebookNotesContext
    from "@/app/(app)/topics/[topicId]/notebook/(studio)/notes/_feature/reactivity/context/NotebookNotesContext";
import { Modal, useDisclosure } from "@nextui-org/modal";
import NbAddNoteModal
    from "@/app/(app)/topics/[topicId]/notebook/(studio)/notes/_feature/components/modals/NbAddNoteModal";
import createNotebookNote
    from "@/app/(app)/topics/[topicId]/notebook/(studio)/notes/_feature/actions/createNotebookNote";
import useNotebook from "@/app/(app)/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebook";
import { NotebookNoteEntity } from "@/app/(app)/topics/[topicId]/notebook/_feature/lib/db/NotebookData";

type Note = Omit<NotebookNoteEntity, "notebook">;

export interface NotebookNotesProviderProps {
    notes: Note[];
    children?: ReactNode;
}

export default function NotebookNotesProvider({ notes, children }: NotebookNotesProviderProps) {
    const { entity: { id: notebookId } } = useNotebook();
    const filteredNotes = useMemo(() => notes, [notes]);

    const [optimisticNotes, addOptimisticNote] = useOptimistic<Note[], Note>(filteredNotes, (state, newNote) => [...state, newNote]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const createNote = useCallback((formData: FormData) => {
        addOptimisticNote({
            id: "optimistic",
            title: null,
            content: "",
            tags: [],
            style: {},
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            ...Object.fromEntries(formData.entries())
        })
        return createNotebookNote(notebookId, formData);
    }, [addOptimisticNote, notebookId]);

    return <NotebookNotesContext.Provider value={{
        filteredNotes: optimisticNotes, showAddNoteModal: onOpen, createNote
    }}>
        {children}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
            <NbAddNoteModal/>
        </Modal>
    </NotebookNotesContext.Provider>
}