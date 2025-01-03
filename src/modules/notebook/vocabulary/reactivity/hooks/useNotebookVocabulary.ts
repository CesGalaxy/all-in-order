import { useContext } from "react";
import notebookVocabularyContext from "@/modules/notebook/vocabulary/reactivity/context/NotebookVocabularyContext";

export default function useNotebookVocabulary() {
    const context = useContext(notebookVocabularyContext);
    if (!context) throw new Error("useNotebookVocabulary must be used within a NotebookVocabularyProvider");
    return context;
}