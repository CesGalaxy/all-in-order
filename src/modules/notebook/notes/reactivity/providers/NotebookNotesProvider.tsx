"use client";

import { ReactNode, useCallback, useMemo, useOptimistic } from "react";
import NotebookNotesContext from "@/modules/notebook/notes/reactivity/context/NotebookNotesContext";
import { Modal, useDisclosure } from "@heroui/modal";
import NbAddNoteModal from "@/modules/notebook/notes/components/modals/NbAddNoteModal";
import createNotebookNote from "@/modules/notebook/notes/actions/createNotebookNote";
import useNotebook from "@/modules/notebook/app/reactivity/hooks/useNotebook";
import { NotebookNoteEntity } from "@/modules/notebook/app/supabase/db/NotebookData";

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