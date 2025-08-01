"use client"

import * as React from "react"
import { Suspense, use } from "react"
import { Book, BookPlus, ChevronDown } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@repo/ui/components/sidebar"
import Link from "next/link";
import { Skeleton } from "@repo/ui/components/skeleton";
import { getMyNotebooks } from "@/modules/app/notebook/queries";

export default function NotebookSwitcher({ currentNotebookId, notebookQuery }: {
    currentNotebookId: string;
    notebookQuery: ReturnType<typeof getMyNotebooks>;
}) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="w-fit px-1.5 group-data-[state=collapsed]:p-1.5!">
                            <div
                                className="flex aspect-square size-5 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                <Book className="size-3"/>
                            </div>
                            <Suspense fallback={<Skeleton className="h-5 w-20"/>}>
                                <NotebookSwitcherName id={currentNotebookId} query={notebookQuery}/>
                            </Suspense>
                            <ChevronDown className="opacity-50"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-64 rounded-lg"
                        align="start"
                        side="bottom"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            Notebooks
                        </DropdownMenuLabel>
                        <Suspense><NotebookSwitcherList query={notebookQuery}/></Suspense>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <BookPlus className="size-4"/>
                            </div>
                            <div className="font-medium text-muted-foreground">Add notebook</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export function NotebookSwitcherName({ id, query }: { id: string, query: ReturnType<typeof getMyNotebooks> }) {
    const { data, error } = use(query);

    return error
        ? <span className="truncate font-semibold text-destructive-foreground">{error.message}</span>
        : <span className="truncate font-semibold">
            {data?.find(notebook => notebook.id === id)!.name}
        </span>;
}

export function NotebookSwitcherList({query}: { query: ReturnType<typeof getMyNotebooks> }) {
    const { data, error } = use(query);

    return error
        ? <span className="truncate font-semibold text-destructive-foreground">{error.message}</span>
        : data.map((notebook, index) => (
            <DropdownMenuItem key={notebook.id} className="gap-2 p-2" asChild>
                <Link href={"/notebooks/" + notebook.id}>
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                        <Book className="size-4 shrink-0"/>
                    </div>
                    {notebook.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </Link>
            </DropdownMenuItem>
    ))
}
