import { useContext } from "react";
import NotebookContext from "@/app/(app)/topics/[topicId]/notebook/_feature/reactivity/context/NotebookContext";

export default function useNotebook() {
    const context = useContext(NotebookContext);
    if (!context) throw new Error("useNotebook must be used within a NotebookProvider");
    return context;
}