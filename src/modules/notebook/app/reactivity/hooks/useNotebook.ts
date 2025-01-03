import { useContext } from "react";
import NotebookContext from "@/modules/notebook/app/reactivity/context/NotebookContext";

export default function useNotebook() {
    const context = useContext(NotebookContext);
    if (!context) throw new Error("useNotebook must be used within a NotebookProvider");
    return context;
}