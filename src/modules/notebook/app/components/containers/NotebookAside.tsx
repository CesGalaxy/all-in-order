"use client";

import { ReactNode } from "react";
import { Button } from "@heroui/button";
import { IconArrowBack, IconX } from "@tabler/icons-react";
import { useTransitionRouter } from "next-view-transitions";

export interface NotebookAside {
    title?: ReactNode;
    footer?: ReactNode;
    children?: ReactNode;
}

export default function NotebookAside({ children, title, footer }: NotebookAside) {
    const router = useTransitionRouter();

    return <aside
        className="max-w-xl w-1/4 bg-background border-l-2 border-divider flex flex-col shrink-0 sticky top-16 h-[calc(100vh-64px)]">
        <header className="flex items-center gap-4 justify-between border-b border-divider">
            <nav className="flex items-center gap-4 p-2">
                <Button isIconOnly variant="light" radius="full" onPress={() => router.back()}>
                    <IconArrowBack/>
                </Button>
                {title}
            </nav>
            <Button isIconOnly variant="flat" radius="full" className="mr-2">
                <IconX/>
            </Button>
        </header>
        <div className="flex-grow min-h-0 overflow-y-auto">
            {children}
        </div>
        {footer && <footer className="border-t border-divider">
            {footer}
        </footer>}
    </aside>

}