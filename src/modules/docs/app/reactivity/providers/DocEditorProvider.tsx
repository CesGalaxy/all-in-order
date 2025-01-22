"use client";

import DocEditorContext from "@/modules/docs/app/reactivity/context/DocEditorContext";
import { type ReactNode, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useThrottledCallback } from "use-debounce";

function DocEditorProvider({ name, initialContent, children, saveAction }: {
    name: string,
    children: ReactNode,
    initialContent: string,
    saveAction: (content: string) => Promise<boolean>
}) {
    const rename = useCallback(async (newName: string) => {
        toast("Cannot rename document: " + newName);
    }, []);

    const [unsavedContent, setUnsavedContent] = useState(initialContent);
    const [latestSave, setLatestSave] = useState<number>();
    const [changesSinceSave, setChangesSinceSave] = useState<boolean>(false);

    const save = useThrottledCallback(async (force: boolean = false) => {
        if (!force && !changesSinceSave) return;
        setChangesSinceSave(false);
        const success = saveAction(unsavedContent);

        if (force) await toast.promise(success, {
            pending: "Saving content...",
            success: {
                render: async () => await success ? "File saved successfully!" : "There was an error saving the file!",
                type: "info"
            },
            error: "There was an error saving the file!"
        });

        if (await success) {
            setLatestSave(Date.now());
        } else if (!force) {
            toast.error("Error while saving content!");
        }
    }, 1000);

    const updateContent = useThrottledCallback((newContent: string) => {
        setUnsavedContent(newContent);
        if (!changesSinceSave) setChangesSinceSave(true);
        save();
    }, 1000);

    return <DocEditorContext.Provider value={{
        name, rename, initialContent, unsavedContent, updateContent, save,
    }}>
        {children}
    </DocEditorContext.Provider>
}

export default DocEditorProvider;