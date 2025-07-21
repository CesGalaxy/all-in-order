import React from "react"
import { Blocks, Calendar, MessageCircleQuestion, Trash2 } from "lucide-react"

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "@repo/ui/components/sidebar"
import { SettingsDialog } from "@/modules/app/settings/components/workspace-settings";

export default function ExplorerNavSecondary({ ...props }: {} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
    return (
        <SidebarMenu>
            <SidebarMenuItem key={"Calendar"}>
                <SidebarMenuButton asChild>
                    <a href={""}>
                        <Calendar/>
                        <span>{"Calendar"}</span>
                    </a>
                </SidebarMenuButton>
                {/*{"badge" in item && <SidebarMenuBadge>{item.badge as any}</SidebarMenuBadge>}*/}
            </SidebarMenuItem>
            <SidebarMenuItem key={"Settings"}>
                <SettingsDialog/>
            </SidebarMenuItem>
            <SidebarMenuItem key={"Templates"}>
                <SidebarMenuButton asChild>
                    <a href={""}>
                        <Blocks/>
                        <span>{"Templates"}</span>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem key={"Trash"}>
                <SidebarMenuButton asChild>
                    <a href={""}>
                        <Trash2/>
                        <span>{"Trash"}</span>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem key={"Help"}>
                <SidebarMenuButton asChild>
                    <a href={""}>
                        <MessageCircleQuestion/>
                        <span>{"Help"}</span>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
