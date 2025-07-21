"use client"

import { Home, Inbox, type LucideIcon, Search, Sparkles } from "lucide-react"

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@repo/ui/components/sidebar"

const ITEMS = [
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Ask AI",
        url: "#",
        icon: Sparkles,
    },
    {
        title: "Home",
        url: "#",
        icon: Home,
        isActive: true,
    },
    {
        title: "Inbox",
        url: "#",
        icon: Inbox,
        // badge: "10",
    },
] satisfies {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
}[];

export default function ExplorerNavMain() {
    return (
        <SidebarMenu>
            {ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                        <a href={item.url}>
                            <item.icon/>
                            <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}
