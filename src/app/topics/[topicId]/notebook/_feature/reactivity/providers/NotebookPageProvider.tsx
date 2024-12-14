"use client";

import { ReactNode, useCallback, useState } from "react";
import NotebookPageContext from "@/app/topics/[topicId]/notebook/_feature/reactivity/context/NotebookPageContext";
import { JSONContent } from "novel";
import NotebookPageData from "@/app/topics/[topicId]/notebook/_feature/lib/storage/NotebookPageData";
import { TableOfContentData } from "@tiptap-pro/extension-table-of-contents";

export interface NotebookPageProviderProps {
    initialData: NotebookPageData;
    saveAction: (content: string) => Promise<boolean>;
    children?: ReactNode;
}

function NotebookPageProvider({ initialData, saveAction, children }: NotebookPageProviderProps) {
    const [data, setData] = useState<NotebookPageData>(initialData);
    const [tocItems, setTocItems] = useState<TableOfContentData>([]);

    const setContent = useCallback((content: JSONContent) => setData({ ...data, content }), [data]);
    const saveContent = useCallback(() => saveAction(JSON.stringify(data)), [saveAction, data]);

    return <NotebookPageContext.Provider value={{ data, setData, setContent, saveContent, tocItems, setTocItems }}>
        {children}
    </NotebookPageContext.Provider>
}

export default NotebookPageProvider;
