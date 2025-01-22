"use client";

import "./styles.css";
import {
    EditorCommand,
    EditorCommandEmpty,
    EditorCommandItem,
    EditorCommandList,
    EditorContent,
    EditorRoot
} from "novel";
import { ComponentProps } from "react";
import { defaultExtensions } from "@/modules/docs/smartdoc/tiptap/extensions";
import { handleCommandNavigation } from "novel/extensions";
import { slashCommand, suggestionItems } from "@/modules/docs/smartdoc/tiptap/sugestions";
import { UseSmartDocEditor } from "@/modules/docs/smartdoc/reactivity/hooks/useSmartDocEditor";

export interface NovelEditorProps {
    editorContentProps?: Pick<ComponentProps<typeof EditorContent>, "slotBefore" | "slotAfter">;
    sdEditor: UseSmartDocEditor;
}

export default function SmartDocNovelEditor({ editorContentProps }: NovelEditorProps) {
    return <EditorRoot>
        <EditorContent
            immediatelyRender={false}
            className="relative flex-grow w-full border-muted bg-content2 rounded-t-3xl vt-name-[doc-e-wrapper] flex flex-col"
            initialContent={undefined}
            onUpdate={({ editor }) => {
                const json = editor.getJSON();
                console.log(editor.getText());
            }}
            extensions={[...defaultExtensions as any, slashCommand as any]}
            editorContainerProps={{
                className: "w-full h-full flex-grow flex flex-col",
            }}
            editorProps={{
                handleDOMEvents: {
                    keydown: (_view, event) => handleCommandNavigation(event),
                },
                attributes: {
                    class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full h-full flex-grow`,
                }
            }}
            {...editorContentProps}
        >
            <EditorCommand
                className='z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all'>
                <EditorCommandEmpty className='px-2 text-muted-foreground'>No results</EditorCommandEmpty>
                <EditorCommandList>
                    {suggestionItems.map((item) => (
                        <EditorCommandItem
                            value={item.title}
                            onCommand={(val) => item.command?.(val)}
                            className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm
                            cursor-pointer transition-colors hover:bg-content1 aria-selected:bg-content2"
                            key={item.title}>
                            <div
                                className='flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background'>
                                {item.icon}
                            </div>
                            <div>
                                <p className='font-medium'>{item.title}</p>
                                <p className='text-xs text-muted-foreground'>{item.description}</p>
                            </div>
                        </EditorCommandItem>
                    ))}
                </EditorCommandList>
            </EditorCommand>
        </EditorContent>
    </EditorRoot>;
}