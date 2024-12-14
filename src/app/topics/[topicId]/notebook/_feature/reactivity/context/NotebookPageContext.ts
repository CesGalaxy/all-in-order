import { createContext, type Dispatch, type SetStateAction } from "react";
import type { JSONContent } from "novel";
import type NotebookPageData from "@/app/topics/[topicId]/notebook/_feature/lib/storage/NotebookPageData";
import { TableOfContentData } from "@tiptap-pro/extension-table-of-contents";

export interface NotebookPageContextData {
    data: NotebookPageData;
    setData: Dispatch<SetStateAction<NotebookPageData>>;
    setContent: Dispatch<SetStateAction<JSONContent>>;
    saveContent: () => Promise<boolean>;
    tocItems: TableOfContentData;
    setTocItems: Dispatch<SetStateAction<TableOfContentData>>;
}

const NotebookPageContext = createContext<NotebookPageContextData | null>(null);

export default NotebookPageContext;