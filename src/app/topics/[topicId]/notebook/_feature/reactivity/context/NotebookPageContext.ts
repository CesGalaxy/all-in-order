import { createContext } from "react";
import { JSONContent } from "novel";

export interface NotebookPageContextData {
    content: JSONContent;
    setContent: (content: JSONContent) => void;
    saveContent: () => Promise<boolean>;
}

const NotebookPageContext = createContext<NotebookPageContextData | null>(null);

export default NotebookPageContext;