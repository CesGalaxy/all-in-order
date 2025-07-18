import { ChevronRight, MoreHorizontal, Plus } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@repo/ui/components/collapsible"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@repo/ui/components/sidebar"

export default function ExplorerNavSubjects({
                                                workspaces,
                                            }: {
    workspaces: {
        name: string
        emoji: React.ReactNode
        pages: {
            name: string
            emoji: React.ReactNode
        }[]
    }[]
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Subjects</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {workspaces.map((workspace) => (
                        <Collapsible key={workspace.name}>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <a href="#">
                                        <span>{workspace.emoji}</span>
                                        <span>{workspace.name}</span>
                                    </a>
                                </SidebarMenuButton>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuAction
                                        className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                                        showOnHover
                                    >
                                        <ChevronRight/>
                                    </SidebarMenuAction>
                                </CollapsibleTrigger>
                                <SidebarMenuAction showOnHover>
                                    <Plus/>
                                </SidebarMenuAction>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {workspace.pages.map((page) => (
                                            <SidebarMenuSubItem key={page.name}>
                                                <SidebarMenuSubButton asChild>
                                                    <a href="#">
                                                        <span>{page.emoji}</span>
                                                        <span>{page.name}</span>
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    ))}
                    <SidebarMenuItem>
                        <SidebarMenuButton className="text-sidebar-foreground/70">
                            <MoreHorizontal/>
                            <span>More</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
