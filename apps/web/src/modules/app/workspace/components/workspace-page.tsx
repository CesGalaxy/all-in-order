"use client";

import { ReactNode } from "react";
import { SidebarTrigger } from "@repo/ui/components/sidebar";
import { Separator } from "@repo/ui/components/separator";
import { useIsMobile } from "@repo/ui/hooks/use-mobile";

export function WorkspacePage({ children, breadcrumb }: { children: ReactNode, breadcrumb?: ReactNode }) {
    const isMobile = useIsMobile();

    return <>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background">
            <div className="flex flex-1 items-center gap-2 px-3">
                <SidebarTrigger name={isMobile ? ["left"] : ["left", "right"]}/>
                <Separator orientation="vertical" className="mr-2 h-4"/>
                {breadcrumb}
            </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
            {children}
        </div>
    </>;
}