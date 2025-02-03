"use client";

import { useCallback } from "react";
import { TableOfContentData } from "@tiptap-pro/extension-table-of-contents";
import { Link } from "@heroui/link";
import { EditorInstance } from "novel";

const LEVEL_CLASS = [
    "text-xl",
    "text-lg ms-2",
    "text-base ms-4",
    "text-sm ms-6",
    "text-xs ms-8",
    "text-xs ms-10",
]

export interface NbPageTableOfContentsProps {
    items?: TableOfContentData;
    editor?: EditorInstance;
}

export default function NbPageTableOfContents({ items = [], editor }: NbPageTableOfContentsProps) {
    const onItemClick = useCallback((e: any, id: string) => {
        // e.preventDefault();
        if (!editor) return;

        const element = editor.view.dom.querySelector(`[data-toc-id="${id}"`)
        if (!element) return;
        const pos = editor.view.posAtDOM(element, 0)

        const tr = editor.view.state.tr
        tr.setSelection(editor.view.state.selection.constructor(tr.doc.resolve(pos)))
        // tr.setSelection(new TextSelection(tr.doc.resolve(pos)))
        editor.view.dispatch(tr);
        editor.view.focus();

        // if (history.pushState) history.pushState(null, "", `#${id}`);

        window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 50,
            behavior: 'smooth',
        });
    }, [editor]);

    if (items.length === 0) return <div className="empty-state bg-red-50">
        <p>Start editing your document to see the outline.</p>
    </div>;

    return items.map(item => <Link
        key={item.id}
        className={
            `${
                item.isActive && !item.isScrolledOver ? 'bg-primary-200 hover:bg-primary-500' : 'hover:bg-default-100'
            } ${
                item.isScrolledOver ? '--text-primary' : ''
            } block py-2 px-4 rounded-xl ${LEVEL_CLASS[item.level - 1]}`
        }
        color="foreground"
        href={`#${item.id}`}
        underline="hover"
        onPress={e => onItemClick(e, item.id)}
        data-item-index={item.itemIndex}
    >
        {item.textContent}
    </Link>);
}