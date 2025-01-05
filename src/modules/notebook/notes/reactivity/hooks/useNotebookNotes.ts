"use client";

import { use } from "react";
import NotebookNotesContext from "@/modules/notebook/notes/reactivity/context/NotebookNotesContext";

export default function useNotebookNotes() {
    const context = use(NotebookNotesContext);
    if (!context) throw new Error("useNotebookNotes must be used within a NotebookNotesProvider");
    return context;
}