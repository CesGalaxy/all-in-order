"use client";

import { ReactNode } from "react";
import { SidebarTrigger } from "@repo/ui/components/sidebar";
import { Separator } from "@repo/ui/components/separator";
import { useIsMobile } from "@repo/ui/hooks/use-mobile";
import NavNotebookPageActions from "@/modules/notebook/notion/components/nav-notebook-page-actions";
import { QueryData } from "@supabase/supabase-js";
import { getNotebook, getNotebookPage } from "@/modules/notebook/app/queries";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@repo/ui/components/breadcrumb";
import Link from "next/link";

export default function NotebookPageLayout({ children, notebookData, pageData, pageTitle }: {
    children: ReactNode,
    notebookData: QueryData<ReturnType<typeof getNotebook>>,
    pageData: QueryData<ReturnType<typeof getNotebookPage>>,
    pageTitle: string,
}) {
    const isMobile = useIsMobile();

    return <>
        <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background z-10 justify-between">
            <div className="flex flex-1 items-center gap-2 px-3">
                <SidebarTrigger name={isMobile ? ["left"] : ["left", "right"]}/>
                <Separator orientation="vertical" className="mr-2 h-4"/>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={"/w/" + notebookData.workspace.id}>
                                    {notebookData.workspace.name}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={"/notebooks/" + notebookData.id}>
                                    {notebookData.name}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="line-clamp-1">
                                {pageTitle}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="ml-auto px-3">
                <NavNotebookPageActions notebook={notebookData} page={pageData} pageTitle={pageTitle}/>
            </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
            {children}
        </div>
    </>;
}