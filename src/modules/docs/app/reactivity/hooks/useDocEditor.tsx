"use client";

import { use } from "react";
import DocEditorContext from "@/modules/docs/app/reactivity/context/DocEditorContext";

export default function useDocEditor() {
    const context = use(DocEditorContext);
    if (!context) throw new Error("useDocEditor must be used within a DocEditorProvider!");
    return context;
}