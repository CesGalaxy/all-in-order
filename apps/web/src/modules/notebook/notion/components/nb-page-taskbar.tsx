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
    SidebarMenuItem
} from "@repo/ui/components/sidebar";
import { Sparkles } from "lucide-react";
import { useTasks } from "@repo/ui/context/taskbar";
import { cn } from "@repo/ui/lib/utils";

export default function NbPageTaskbar() {
    const { tasks, toggleTask, openTask, closeTask, currentTask, currentTaskId } = useTasks();

    return <div
        className="flex w-auto overflow-hidden"
    >
        <div className={cn(
            "flex h-full shrink-0 flex-col transition-all duration-300 ease-in-out",
            currentTaskId ? "w-96" : "w-0",
        )}>
            {currentTask?.component}
        </div>
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
                                        onClick={() => toggleTask(item.id)}
                                        isActive={currentTaskId === item.id}
                                        className="px-2.5 md:px-2"
                                        onContextMenu={(e) => {
                                            e.preventDefault();
                                            closeTask(item.id);
                                        }}
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
    </div>
}