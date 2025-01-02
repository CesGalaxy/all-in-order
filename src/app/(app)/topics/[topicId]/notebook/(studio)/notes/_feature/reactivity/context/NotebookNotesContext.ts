"use client";

import { createContext } from "react";
import { ActionResponse } from "@/lib/helpers/form";
import { NotebookNoteEntity } from "@/app/(app)/topics/[topicId]/notebook/_feature/lib/db/NotebookData";

export interface NotebookNotesContextValue {
    filteredNotes: Omit<NotebookNoteEntity, "notebook">[];
    showAddNoteModal: () => void;
    createNote: (formData: FormData) => Promise<ActionResponse<any>>
}

const NotebookNotesContext = createContext<NotebookNotesContextValue | null>(null);
export default NotebookNotesContext;