import { createContext } from "react";

export interface NotebookPageContextData {
    content: any;
    setContent: (content: any) => void;
}

const NotebookPageContext = createContext<NotebookPageContextData | null>(null);

export default NotebookPageContext;