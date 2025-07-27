"use client";

import { ReactNode } from "react";
import { SidebarTrigger } from "@repo/ui/components/sidebar";
import { Separator } from "@repo/ui/components/separator";
import { useIsMobile } from "@repo/ui/hooks/use-mobile";
import { NavNotebookActions } from "@/modules/app/notebook/components/nav-notebook-actions";

export function NotebookPage({ children, breadcrumb }: { children: ReactNode, breadcrumb?: ReactNode }) {
    const isMobile = useIsMobile();

    return <>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background justify-between">
            <div className="flex flex-1 items-center gap-2 px-3">
                <SidebarTrigger name={isMobile ? ["left"] : ["left", "right"]}/>
                <Separator orientation="vertical" className="mr-2 h-4"/>
                {breadcrumb}
            </div>
            <div className="ml-auto px-3">
                <NavNotebookActions/>
            </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
            {children}
        </div>
    </>;
}