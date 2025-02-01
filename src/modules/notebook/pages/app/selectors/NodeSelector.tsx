"use client";

import { EditorBubbleItem, useEditor } from "novel";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { Button } from "@heroui/button";
import {
    IconCheck,
    IconCheckbox,
    IconChevronDown,
    IconCode,
    IconH1,
    IconH2,
    IconH3,
    IconList,
    IconListNumbers,
    IconMist,
    IconQuote
} from "@tabler/icons-react";

export type SelectorItem = {
    name: string;
    icon: any;
    command: (editor: ReturnType<typeof useEditor>["editor"]) => void;
    isActive: (editor: ReturnType<typeof useEditor>["editor"]) => boolean;
};

const items: SelectorItem[] = [
    {
        name: "Text",
        icon: IconMist,
        command: (editor) => editor!.chain().focus().toggleNode("paragraph", "paragraph").run(),
        // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
        isActive: (editor) =>
            editor!.isActive("paragraph") &&
            !editor!.isActive("bulletList") &&
            !editor!.isActive("orderedList"),
    },
    {
        name: "Heading 1",
        icon: IconH1,
        command: (editor) => editor!.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: (editor) => editor!.isActive("heading", { level: 1 }),
    },
    {
        name: "Heading 2",
        icon: IconH2,
        command: (editor) => editor!.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: (editor) => editor!.isActive("heading", { level: 2 }),
    },
    {
        name: "Heading 3",
        icon: IconH3,
        command: (editor) => editor!.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: (editor) => editor!.isActive("heading", { level: 3 }),
    },
    {
        name: "To-do List",
        icon: IconCheckbox,
        command: (editor) => editor!.chain().focus().toggleTaskList().run(),
        isActive: (editor) => editor!.isActive("taskItem"),
    },
    {
        name: "Bullet List",
        icon: IconList,
        command: (editor) => editor!.chain().focus().toggleBulletList().run(),
        isActive: (editor) => editor!.isActive("bulletList"),
    },
    {
        name: "Numbered List",
        icon: IconListNumbers,
        command: (editor) => editor!.chain().focus().toggleOrderedList().run(),
        isActive: (editor) => editor!.isActive("orderedList"),
    },
    {
        name: "Quote",
        icon: IconQuote,
        command: (editor) =>
            editor!.chain().focus().toggleNode("paragraph", "paragraph").toggleBlockquote().run(),
        isActive: (editor) => editor!.isActive("blockquote"),
    },
    {
        name: "Code",
        icon: IconCode,
        command: (editor) => editor!.chain().focus().toggleCodeBlock().run(),
        isActive: (editor) => editor!.isActive("codeBlock"),
    },
];

const NodeSelector = () => {
    const { editor } = useEditor();
    if (!editor) return null;
    const activeItem = items.filter(item => item.isActive(editor)).pop() ?? {
        name: "Multiple",
    };

    return <Popover>
        <PopoverTrigger>
            <Button endContent={<IconChevronDown className='h-4 w-4'/>} radius="none">
                <span className='whitespace-nowrap text-sm'>{activeItem.name}</span>
            </Button>
        </PopoverTrigger>
        <PopoverContent className='w-48 p-1 items-start'>
            {items.map((item, index) => (
                <EditorBubbleItem
                    key={index}
                    onSelect={(editor) => {
                        item.command(editor);
                    }}
                    className='flex cursor-pointer justify-between rounded px-2 py-1 text-sm hover:bg-content2 items-center'>
                    <div className='flex gap-x-2'>
                        <div className='rounded-sm border p-1'>
                            <item.icon className='h-3 w-3'/>
                        </div>
                        <span>{item.name}</span>
                    </div>
                    {activeItem.name === item.name && <IconCheck className='h-4 w-4'/>}
                </EditorBubbleItem>
            ))}
        </PopoverContent>
    </Popover>;
};

export default NodeSelector;
