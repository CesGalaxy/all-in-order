"use client";

import { ReactNode, useCallback, useState } from "react";
import NotebookPageContext from "@/app/topics/[topicId]/notebook/_feature/reactivity/context/NotebookPageContext";
import { JSONContent } from "novel";

export interface NotebookPageProviderProps {
    initialContent: JSONContent;
    saveAction: (content: JSONContent) => Promise<boolean>;
    children?: ReactNode;
}

function NotebookPageProvider({ initialContent, saveAction, children }: NotebookPageProviderProps) {
    const [content, setContent] = useState<JSONContent>(initialContent);

    const saveContent = useCallback(() => saveAction(content), [saveAction, content]);

    return <NotebookPageContext.Provider value={{ content, setContent, saveContent }}>
        {children}
    </NotebookPageContext.Provider>
}

export default NotebookPageProvider;
