"use client";

import SmartDocNovelEditor from "@/modules/docs/smartdoc/SmartDocNovelEditor";
import SmartDocEditorHeader from "@/modules/docs/smartdoc/components/SmartDocEditorHeader";
import useSmartDocEditor from "@/modules/docs/smartdoc/reactivity/hooks/useSmartDocEditor";
import useDocEditor from "@/modules/docs/app/reactivity/hooks/useDocEditor";

export default function EditSmartDoc() {
    const { initialContent } = useDocEditor();

    const sdEditor = useSmartDocEditor({});

    return <SmartDocNovelEditor
        sdEditor={sdEditor}
        editorContentProps={{
            slotBefore: <SmartDocEditorHeader/>,
            slotAfter: <p className="bg-content3 h-8 mt-4 flex items-center px-4 gap-8 text-content3-foreground">
                <span>Words: 1948</span>
                <span>Latest update: Now</span>
            </p>
        }}
    />;
}