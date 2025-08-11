"use client";

import { ReactNode } from "react";
import { SidebarTrigger } from "@repo/ui/components/sidebar";
import { Separator } from "@repo/ui/components/separator";
import { useIsMobile } from "@repo/ui/hooks/use-mobile";
import { NavNotebookActions } from "@/modules/notebook/app/components/nav-notebook-actions";
import { QueryData } from "@supabase/supabase-js";
import { getNotebook } from "@/modules/notebook/app/queries";

export function NotebookLayout({ children, breadcrumb, data }: {
    children: ReactNode,
    breadcrumb?: ReactNode,
    data: QueryData<ReturnType<typeof getNotebook>>
}) {
    const isMobile = useIsMobile();

    return <>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background z-10 justify-between">
            <div className="flex flex-1 items-center gap-2 px-3">
                <SidebarTrigger name={isMobile ? ["left"] : ["left", "right"]}/>
                <Separator orientation="vertical" className="mr-2 h-4"/>
                {breadcrumb}
            </div>
            <div className="ml-auto px-3">
                <NavNotebookActions data={data}/>
            </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
            {children}
        </div>
    </>;
}