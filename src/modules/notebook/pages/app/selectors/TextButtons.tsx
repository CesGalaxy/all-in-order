"use client";

import { EditorBubbleItem, useEditor } from "novel";
import type { SelectorItem } from "./NodeSelector";
import { IconBold, IconCode, IconItalic, IconStrikethrough, IconUnderline } from "@tabler/icons-react";
import { Button } from "@heroui/button";

const TextButtons = () => {
    const { editor } = useEditor();
    if (!editor) return null;
    const items: SelectorItem[] = [
        {
            name: "bold",
            isActive: (editor) => editor!.isActive("bold"),
            command: (editor) => editor!.chain().focus().toggleBold().run(),
            icon: IconBold,
        },
        {
            name: "italic",
            isActive: (editor) => editor!.isActive("italic"),
            command: (editor) => editor!.chain().focus().toggleItalic().run(),
            icon: IconItalic,
        },
        {
            name: "underline",
            isActive: (editor) => editor!.isActive("underline"),
            command: (editor) => editor!.chain().focus().toggleUnderline().run(),
            icon: IconUnderline,
        },
        {
            name: "strike",
            isActive: (editor) => editor!.isActive("strike"),
            command: (editor) => editor!.chain().focus().toggleStrike().run(),
            icon: IconStrikethrough,
        },
        {
            name: "code",
            isActive: (editor) => editor!.isActive("code"),
            command: (editor) => editor!.chain().focus().toggleCode().run(),
            icon: IconCode,
        },
    ];
    return <div className="flex">
        {items.map(item => <Button
            as={EditorBubbleItem}
            key={item.name}
            onPress={() => item.command(editor)}
            isIconOnly
            color={item.isActive(editor) ? "primary" : "default"}
            radius="none"
        >
            <item.icon/>
        </Button>)}
    </div>;
};

export default TextButtons;
