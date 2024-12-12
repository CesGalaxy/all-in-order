import { useContext } from "react";
import NotebookPageContext from "@/app/topics/[topicId]/notebook/_feature/reactivity/context/NotebookPageContext";

export default function useNotebookPage() {
    const context = useContext(NotebookPageContext);
    if (!context) throw new Error("useNotebook must be used within a NotebookProvider");
    return context;
}