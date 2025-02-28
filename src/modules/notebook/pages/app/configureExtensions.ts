import {
    GlobalDragHandle,
    HighlightExtension,
    HorizontalRule,
    Placeholder,
    StarterKit,
    TaskItem,
    TaskList,
    TiptapImage,
    TiptapLink,
} from "novel/extensions";
import { getHierarchicalIndexes, TableOfContents } from '@tiptap-pro/extension-table-of-contents'

export interface Props {
    setTocItems: (content: any) => void;
}

export default function configureExtensions({ setTocItems }: Props): any[] {
    // You can overwrite the placeholder with your own configuration
    const placeholder = Placeholder;

    const tiptapLink = TiptapLink.configure({
        HTMLAttributes: {
            class: "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer",
        },
    });

    const taskList = TaskList.configure({
        HTMLAttributes: { class: "not-prose pl-2", },
    });

    const taskItem = TaskItem.configure({
        HTMLAttributes: { class: "flex items-start my-4", },
        nested: true,
    });

    const horizontalRule = HorizontalRule.configure({
        HTMLAttributes: { class: "mt-4 mb-6 border-t border-muted-foreground", },
    });

    const starterKit = StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc list-outside leading-3 -mt-2" } },
        orderedList: { HTMLAttributes: { class: "list-decimal list-outside leading-3 -mt-2" } },
        listItem: { HTMLAttributes: { class: "leading-normal -mb-2" } },
        blockquote: { HTMLAttributes: { class: "border-l-4 border-primary" } },
        codeBlock: { HTMLAttributes: { class: "rounded-sm bg-muted border p-5 font-mono font-medium" } },
        code: {
            HTMLAttributes: {
                class: "rounded-md bg-muted  px-1.5 py-1 font-mono font-medium",
                spellcheck: "false"
            }
        },
        heading: { HTMLAttributes: { class: "scroll-mt-20" } },
        horizontalRule: false,
        dropcursor: { color: "#DBEAFE", width: 4, },
        gapcursor: false,
    });

    const toc = TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        onUpdate(content) {
            setTocItems(content)
        },
    });

    return [
        starterKit,
        placeholder,
        TiptapLink,
        TiptapImage,
        // updatedImage,
        taskList,
        taskItem,
        horizontalRule,
        HighlightExtension,
        GlobalDragHandle,
        // TiptapUnderline,
        toc,
    ];
}
