"use client";

import "./styles.css";
import useNotebookPage from "@/modules/notebook/pages/reactivity/hooks/useNotebookPage";
import {
    EditorBubble,
    EditorCommand,
    EditorCommandEmpty,
    EditorCommandItem,
    EditorCommandList,
    EditorContent,
    EditorRoot
} from "novel";
import { handleCommandNavigation } from "novel/extensions";
import { slashCommand, suggestionItems } from "@/modules/notebook/pages/app/suggestions";
import NodeSelector from "@/modules/notebook/pages/app/selectors/NodeSelector";
import TextButtons from "@/modules/notebook/pages/app/selectors/TextButtons";
import { Divider } from "@nextui-org/divider";
import { useMemo } from "react";
import configureExtensions from "@/modules/notebook/pages/app/configureExtensions";

export default function NbPageEditor() {
    const { data: { appearance, content }, setContent, setTocItems } = useNotebookPage();

    const extensions = useMemo(() => [...configureExtensions({ setTocItems }), slashCommand], [setTocItems]);

    return <EditorRoot>
        <EditorContent
            initialContent={content}
            onUpdate={({ editor }) => {
                const json = editor.getJSON();
                setContent(json);
            }}
            extensions={extensions}
            editorContainerProps={{
                className: "w-full h-full flex-grow flex flex-col max-w-[1024px] mx-auto",
            }}
            editorProps={{
                handleDOMEvents: {
                    keydown: (_view, event) => handleCommandNavigation(event),
                },
                attributes: {
                    class: "prose prose-lg dark:prose-invert -prose-headings:font-title -font-default " +
                        "focus:outline-none max-w-full h-full flex-grow " +
                        (appearance.font.family),
                },
            }}
            immediatelyRender={false}
            className="relative flex-grow w-full border-muted rounded-3xl vt-name-[doc-e-wrapper] flex flex-col px-4 py-16"
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
            <EditorBubble
                tippyOptions={{
                    placement: "top",
                }}
                className='flex w-fit max-w-[90vw] overflow-hidden rounded-full bg-background'>
                <NodeSelector/>
                <Divider orientation="vertical"/>
                <TextButtons/>
            </EditorBubble>
        </EditorContent>
    </EditorRoot>;
}