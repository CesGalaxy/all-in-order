"use client";

import { JSONContent } from "novel";
import { useState } from "react";

export interface UseSmartDocEditor {
    content?: JSONContent;
    setContent: (content: JSONContent) => void;
}

export default function useSmartDocEditor({ initialContent }: {
    initialContent?: JSONContent
}): UseSmartDocEditor {
    const [content, setContent] = useState<JSONContent | undefined>(initialContent);

    return {
        content,
        setContent,
    } satisfies UseSmartDocEditor;
}