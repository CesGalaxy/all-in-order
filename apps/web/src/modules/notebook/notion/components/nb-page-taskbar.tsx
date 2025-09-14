"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@repo/ui/components/sidebar";
import { Sparkles } from "lucide-react";
import { useIsMobile } from "@repo/ui/hooks/use-mobile";
import { useTasks } from "@repo/ui/context/taskbar";

export default function NbPageTaskbar() {
    const isMobile = useIsMobile();
    const { tasks, toggleTask, openTask, closeTask, currentTask, currentTaskId } = useTasks();

    const {toggleSidebar} = useSidebar();

    return <Sidebar
        collapsible="icon"
        className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
        name="nb-page-taskbar"
        side="right"
    >
        {/* This is the second sidebar */}
        {/* We disable collapsible and let it fill remaining space */}
        <Sidebar collapsible="none" className="hidden flex-1 md:flex" name="nb-page-taskbar-content">
            {/*<SidebarHeader className="gap-3.5 border-b p-4">*/}
            {/*    <div className="flex w-full items-center justify-between">*/}
            {/*        <div className="text-foreground text-base font-medium">*/}
            {/*            {currentTask?.name}*/}
            {/*        </div>*/}
            {/*        <Label className="flex items-center gap-2 text-sm">*/}
            {/*            <span>Unreads</span>*/}
            {/*        </Label>*/}
            {/*    </div>*/}
            {/*    <SidebarInput placeholder="Type to search..." />*/}
            {/*</SidebarHeader>*/}
            <SidebarContent>
                {currentTask?.component}
            </SidebarContent>
        </Sidebar>
        {/* This is the first sidebar */}
        {/* We disable collapsible and adjust width to icon. */}
        {/* This will make the sidebar appear as icons. */}
        <Sidebar
            collapsible="none"
            className="w-[calc(var(--sidebar-width-icon)+1px)]! border-l"
            name="nb-page-taskbar-icons"
        >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                            <a href="#">
                                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Sparkles className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Acme Inc</span>
                                    <span className="truncate text-xs">Enterprise</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent className="px-1.5 md:px-0">
                        <SidebarMenu>
                            {tasks.map((item) => (
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton
                                        tooltip={{
                                            children: item.name,
                                            hidden: false,
                                        }}
                                        onClick={() => {
                                            toggleTask(item.id)
                                            toggleSidebar(["nb-page-taskbar"])
                                        }}
                                        isActive={currentTaskId === item.id}
                                        className="px-2.5 md:px-2"
                                    >
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {/*<NavUser user={data.user} />*/}
                hellooo
            </SidebarFooter>
        </Sidebar>
    </Sidebar>
}