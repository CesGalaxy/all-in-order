"use client"

import * as React from "react"
import { Suspense, use } from "react"
import { ChevronDown, GalleryVerticalEnd, Plus } from "lucide-react"

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
import { getMyWorkspaces } from "@/modules/app/workspace/queries";
import { Skeleton } from "@repo/ui/components/skeleton";

export default function WorkspaceSwitcher({ currentWorkspaceId, workspacesQuery }: {
    currentWorkspaceId: string;
    workspacesQuery: ReturnType<typeof getMyWorkspaces>;
}) {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="w-fit px-1.5 group-data-[state=collapsed]:p-1.5!">
                            <div
                                className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                                <GalleryVerticalEnd className="size-3"/>
                            </div>
                            <Suspense fallback={<Skeleton className="h-5 w-20"/>}>
                                <WorkspaceSwitcherName id={currentWorkspaceId} query={workspacesQuery}/>
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
                            Workspaces
                        </DropdownMenuLabel>
                        <Suspense><WorkspaceSwitcherList query={workspacesQuery}/></Suspense>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className="gap-2 p-2">
                            <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                <Plus className="size-4"/>
                            </div>
                            <div className="font-medium text-muted-foreground">Add workspace</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export function WorkspaceSwitcherName({ id, query }: { id: string, query: ReturnType<typeof getMyWorkspaces> }) {
    const { data, error } = use(query);

    return error
        ? <span className="truncate font-semibold text-destructive-foreground">{error.message}</span>
        : <span className="truncate font-semibold">
            {data?.find(workspace => workspace.id === id)!.name}
        </span>;
}

export function WorkspaceSwitcherList({query}: { query: ReturnType<typeof getMyWorkspaces> }) {
    const { data, error } = use(query);

    return error
        ? <span className="truncate font-semibold text-destructive-foreground">{error.message}</span>
        : data.map((workspace, index) => (
        <DropdownMenuItem
            key={workspace.id}
            // onClick={() => setActiveTeam(team)}
            className="gap-2 p-2"
            asChild
        >
            <Link href={"/w/" + workspace.id}>
                <div className="flex size-6 items-center justify-center rounded-sm border">
                    <GalleryVerticalEnd className="size-4 shrink-0"/>
                </div>
                {workspace.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
            </Link>
        </DropdownMenuItem>
    ))
}
