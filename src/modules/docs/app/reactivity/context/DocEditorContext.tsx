"use client";

// import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

export interface DocEditorContextValue {
    name: string;
    rename: (newName: string) => Promise<void>;
    initialContent: string;
    unsavedContent: string;
    updateContent: (newContent: string) => void;
    save: (force?: boolean) => (Promise<void> | undefined);
}

const DocEditorContext = createContext<DocEditorContextValue | null>(null);

export default DocEditorContext;