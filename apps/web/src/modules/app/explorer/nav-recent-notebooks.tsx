"use client"

import { ArrowUpRight, Link as LinkIcon, MoreHorizontal, StarOff, Trash2, } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@repo/ui/components/sidebar"
import { getMyNotebooks } from "@/modules/app/notebook/queries";
import { use } from "react";
import ErrorCard from "@repo/ui/components/molecules/error-card";
import { CreateNotebookButton } from "@/modules/app/explorer/create-notebook-button";
import Link from "next/link";
import { toast } from "sonner";

const favorites = [
    {
        name: "Project Management & Task Tracking",
        url: "#",
        emoji: "📊",
    },
    {
        name: "Family Recipe Collection & Meal Planning",
        url: "#",
        emoji: "🍳",
    },
    {
        name: "Fitness Tracker & Workout Routines",
        url: "#",
        emoji: "💪",
    },
    {
        name: "Book Notes & Reading List",
        url: "#",
        emoji: "📚",
    },
    {
        name: "Sustainable Gardening Tips & Plant Care",
        url: "#",
        emoji: "🌱",
    },
    {
        name: "Language Learning Progress & Resources",
        url: "#",
        emoji: "🗣️",
    },
    {
        name: "Home Renovation Ideas & Budget Tracker",
        url: "#",
        emoji: "🏠",
    },
    {
        name: "Personal Finance & Investment Portfolio",
        url: "#",
        emoji: "💰",
    },
    {
        name: "Movie & TV Show Watchlist with Reviews",
        url: "#",
        emoji: "🎬",
    },
    {
        name: "Daily Habit Tracker & Goal Setting",
        url: "#",
        emoji: "✅",
    },
];

export default function NavRecentNotebooks({workspaceId, notebooksQuery}: { workspaceId: string, notebooksQuery: ReturnType<typeof getMyNotebooks>}) {
    const {data, error} = use(notebooksQuery);
    const { isMobile } = useSidebar();

    if (error) return <ErrorCard title="Error getting notebooks!" message={error.message} className="group-data-[collapsible=icon]:hidden"/>;

    if (data.length === 0) {
        return (
            <SidebarGroup>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <CreateNotebookButton workspaceId={workspaceId}/>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroup>
        );
    }

    return (
        <SidebarGroup className="--group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Notebooks</SidebarGroupLabel>
            <SidebarMenu>
                {data.map((item) => (
                    <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton asChild>
                            <Link href={"/notebooks/" + item.id} title={item.name}>
                                <span>✏️</span>
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction showOnHover>
                                    <MoreHorizontal/>
                                    <span className="sr-only">More</span>
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56 rounded-lg"
                                side={isMobile ? "bottom" : "right"}
                                align={isMobile ? "end" : "start"}
                            >
                                <DropdownMenuItem>
                                    <StarOff className="text-muted-foreground"/>
                                    <span>Remove from Favorites</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(window.location.origin + "/notebooks/" + item.id).then(() => toast("Link copied to clipboard!"))}>
                                    <LinkIcon className="text-muted-foreground"/>
                                    <span>Copy Link</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={"/notebooks/" + item.id} target="_blank">
                                        <ArrowUpRight className="text-muted-foreground"/>
                                        <span>Open in New Tab</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem variant="destructive">
                                    <Trash2 className="text-muted-foreground"/>
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                        <MoreHorizontal/>
                        <span>More</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    )
}
