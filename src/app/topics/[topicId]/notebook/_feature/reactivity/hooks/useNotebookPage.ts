import { useContext } from "react";
import NotebookPageContext from "@/app/topics/[topicId]/notebook/_feature/reactivity/context/NotebookPageContext";

export default function useNotebookPage() {
    const context = useContext(NotebookPageContext);
    if (!context) throw new Error("useNotebookPage must be used within a NotebookPageProvider");
    return context;
}