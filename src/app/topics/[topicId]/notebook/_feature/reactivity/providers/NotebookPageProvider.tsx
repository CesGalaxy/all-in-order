"use client";

import { ReactNode, useCallback, useState } from "react";
import NotebookPageContext from "@/app/topics/[topicId]/notebook/_feature/reactivity/context/NotebookPageContext";
import { JSONContent } from "novel";
import NotebookPageData from "@/app/topics/[topicId]/notebook/_feature/lib/storage/NotebookPageData";
import { TableOfContentData } from "@tiptap-pro/extension-table-of-contents";
import { createSupabaseClient } from "@/supabase/client";

export interface NotebookPageProviderProps {
    initialData: NotebookPageData;
    children?: ReactNode;
    path: string;
}

function NotebookPageProvider({ initialData, children, path }: NotebookPageProviderProps) {
    const [data, setData] = useState<NotebookPageData>(initialData);
    const [tocItems, setTocItems] = useState<TableOfContentData>([]);

    const setContent = useCallback((content: JSONContent) => setData({ ...data, content }), [data]);
    const saveContent = useCallback(async () => await createSupabaseClient()
        .storage
        .from("notebooks")
        .update(path, JSON.stringify(data))
        .then(({ error }) => !error), [data, path]);

    return <NotebookPageContext.Provider value={{ data, setData, setContent, saveContent, tocItems, setTocItems }}>
        {children}
    </NotebookPageContext.Provider>
}

export default NotebookPageProvider;
