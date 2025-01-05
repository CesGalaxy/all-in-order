import { useContext } from "react";
import NotebookPageContext from "@/modules/notebook/pages/reactivity/context/NotebookPageContext";

export default function useNotebookPage() {
    const context = useContext(NotebookPageContext);
    if (!context) throw new Error("useNotebookPage must be used within a NotebookPageProvider");
    return context;
}