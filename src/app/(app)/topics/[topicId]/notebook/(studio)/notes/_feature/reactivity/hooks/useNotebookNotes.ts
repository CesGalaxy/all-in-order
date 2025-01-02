"use client";

import { use } from "react";
import NotebookNotesContext
    from "@/app/(app)/topics/[topicId]/notebook/(studio)/notes/_feature/reactivity/context/NotebookNotesContext";

export default function useNotebookNotes() {
    const context = use(NotebookNotesContext);
    if (!context) throw new Error("useNotebookNotes must be used within a NotebookNotesProvider");
    return context;
}