"use client"

import * as React from "react"
import {
    Bell,
    CornerUpRight,
    FileText,
    GalleryVerticalEnd,
    LineChart,
    Link,
    MoreHorizontal,
    Printer,
    Settings,
    Star,
    Trash,
    Trash2,
} from "lucide-react"

import { Button } from "@repo/ui/components/button"
import { Popover, PopoverContent, PopoverTrigger, } from "@repo/ui/components/popover"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@repo/ui/components/sidebar"

const data = [
    [
        { label: "Customize", icon: Settings },
        { label: "Generate PDF", icon: FileText },
        { label: "Print", icon: Printer },
    ],
    [
        { label: "Copy Link", icon: Link },
        { label: "Move to", icon: CornerUpRight },
        { label: "Move to Trash", icon: Trash2 },
    ],
    [
        { label: "View analytics", icon: LineChart },
        { label: "Version History", icon: GalleryVerticalEnd },
        { label: "Show deleted pages", icon: Trash },
        { label: "Notifications", icon: Bell },
    ],
]

export function NavNotebookActions() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="flex items-center gap-2 text-sm">
            <div className="text-muted-foreground hidden font-medium md:inline-block">
                Edit Oct 08
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7">
                <Star />
            </Button>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="data-[state=open]:bg-accent h-7 w-7"
                    >
                        <MoreHorizontal />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 overflow-hidden rounded-lg p-0" align="end">
                    <Sidebar name="notebook-actions-sidebar" collapsible="none" className="bg-transparent">
                        <SidebarContent>
                            {data.map((group, index) => (
                                <SidebarGroup key={index} className="border-b last:border-none">
                                    <SidebarGroupContent className="gap-0">
                                        <SidebarMenu>
                                            {group.map((item, index) => (
                                                <SidebarMenuItem key={index}>
                                                    <SidebarMenuButton>
                                                        <item.icon /> <span>{item.label}</span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}
                                        </SidebarMenu>
                                    </SidebarGroupContent>
                                </SidebarGroup>
                            ))}
                        </SidebarContent>
                    </Sidebar>
                </PopoverContent>
            </Popover>
        </div>
    )
}
