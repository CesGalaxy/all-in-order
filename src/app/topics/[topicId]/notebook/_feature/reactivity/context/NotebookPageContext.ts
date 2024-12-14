import { createContext, type Dispatch, type SetStateAction } from "react";
import type { JSONContent } from "novel";
import type NotebookPageData from "@/app/topics/[topicId]/notebook/_feature/lib/storage/NotebookPageData";

export interface NotebookPageContextData {
    data: NotebookPageData;
    setData: Dispatch<SetStateAction<NotebookPageData>>;
    setContent: (content: JSONContent) => void;
    saveContent: () => Promise<boolean>;
}

const NotebookPageContext = createContext<NotebookPageContextData | null>(null);

export default NotebookPageContext;