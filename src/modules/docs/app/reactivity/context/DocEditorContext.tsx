"use client";

// import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";

export interface DocEditorContextValue {
    /// The name of the document
    name: string;

    /// Renames the document
    rename: (newName: string) => Promise<void>;

    /// The initial content the document had when it was opened
    initialContent: string;

    /// The current content of the document (aka. liveContent)
    unsavedContent: string;

    /// Updates the content of the document, and saves it
    updateContent: (newContent: string) => void;
    save: (force?: boolean) => (Promise<void> | undefined);
    latestSave?: number;
    changesSinceSave: boolean;
    signedUrl: string;
}

const DocEditorContext = createContext<DocEditorContextValue | null>(null);

export default DocEditorContext;