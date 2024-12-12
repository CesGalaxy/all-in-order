"use client";

import "./styles.css";
import useNotebookPage from "@/app/topics/[topicId]/notebook/_feature/reactivity/hooks/useNotebookPage";
import {
    EditorCommand,
    EditorCommandEmpty,
    EditorCommandItem,
    EditorCommandList,
    EditorContent,
    EditorRoot
} from "novel";
import { defaultExtensions } from "@/app/topics/[topicId]/notebook/_feature/app/extensions";
import { handleCommandNavigation } from "novel/extensions";
import { slashCommand, suggestionItems } from "@/app/topics/[topicId]/notebook/_feature/app/suggestions";

export default function NbPageEditor() {
    const { content, setContent } = useNotebookPage();

    return <EditorRoot>
        <EditorContent
            initialContent={content}
            onUpdate={({ editor }) => {
                const json = editor.getJSON();
                setContent(json);
            }}
            extensions={[...defaultExtensions, slashCommand]}
            editorContainerProps={{
                className: "w-full h-full flex-grow flex flex-col max-w-[1024px] mx-auto",
            }}
            editorProps={{
                handleDOMEvents: {
                    keydown: (_view, event) => handleCommandNavigation(event),
                },
                attributes: {
                    class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full h-full flex-grow`,
                }
            }}
            immediatelyRender={false}
            className="relative flex-grow w-full border-muted bg-content1 rounded-3xl vt-name-[doc-e-wrapper] flex flex-col pt-4 pb-16"
        >
            <EditorCommand
                className='z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-divider bg-background px-1 py-2 shadow-md transition-all'>
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
                                className='flex h-10 w-10 items-center justify-center rounded-md border border-divider bg-background'>
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