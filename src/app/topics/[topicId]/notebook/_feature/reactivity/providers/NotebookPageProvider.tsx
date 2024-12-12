"use client";

import { ReactNode, useCallback, useState } from "react";
import NotebookPageContext from "@/app/topics/[topicId]/notebook/_feature/reactivity/context/NotebookPageContext";

export interface NotebookPageProviderProps {
    initialContent: any;
    saveAction: (content: any) => Promise<void>;
    children?: ReactNode;
}

function NotebookPageProvider({ initialContent, saveAction, children }: NotebookPageProviderProps) {
    const [content, setContent] = useState(initialContent);

    const save = useCallback(async () => {
        await saveAction(content);
    }, [saveAction, content]);

    return <NotebookPageContext.Provider value={{ content, setContent }}>
        {children}
    </NotebookPageContext.Provider>
}

export default NotebookPageProvider;
