"use client"

import { type LucideIcon } from "lucide-react"

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@repo/ui/components/sidebar"

export default function ExplorerNavMain({
                                            items,
                                        }: {
    items: {
        title: string
        url: string
        icon: LucideIcon
        isActive?: boolean
    }[]
}) {
    return (
        <SidebarMenu>
            {items.map((item) => (
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
