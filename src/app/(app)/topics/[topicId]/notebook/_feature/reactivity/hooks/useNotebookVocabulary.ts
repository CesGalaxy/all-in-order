import { useContext } from "react";
import notebookVocabularyContext
    from "@/app/(app)/topics/[topicId]/notebook/_feature/reactivity/context/NotebookVocabularyContext";

export default function useNotebookVocabulary() {
    const context = useContext(notebookVocabularyContext);
    if (!context) throw new Error("useNotebookVocabulary must be used within a NotebookVocabularyProvider");
    return context;
}